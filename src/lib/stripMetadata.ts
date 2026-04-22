/**
 * Binary metadata strippers — no re-encoding, no quality loss, no size inflation.
 *
 * JPEG: removes APP0–APP15 and COM segments from the byte stream.
 * PNG:  removes tEXt, zTXt, iTXt, eXIf, tIME chunks from the IHDR/IDAT chain.
 * WebP: removes EXIF and XMP  chunks from the RIFF container and clears the
 *       corresponding flags in the VP8X chunk.
 */

// ── JPEG ──────────────────────────────────────────────────────────────────────

export function stripJpegExif(buffer: ArrayBuffer): ArrayBuffer {
  const src = new Uint8Array(buffer);
  if (src[0] !== 0xff || src[1] !== 0xd8) return buffer;

  const chunks: Uint8Array[] = [];
  chunks.push(src.slice(0, 2)); // SOI
  let i = 2;

  while (i < src.length - 1) {
    if (src[i] !== 0xff) { chunks.push(src.slice(i)); break; }
    const marker = src[i + 1];

    if (marker === 0xda) { chunks.push(src.slice(i)); break; }     // SOS → pixel data
    if (marker === 0xd9) { chunks.push(src.slice(i, i + 2)); break; } // EOI

    const segLen = (src[i + 2] << 8) | src[i + 3];
    const isApp = marker >= 0xe0 && marker <= 0xef;
    const isCom = marker === 0xfe;

    if (isApp || isCom) { i += 2 + segLen; }
    else { chunks.push(src.slice(i, i + 2 + segLen)); i += 2 + segLen; }
  }

  return assemble(chunks);
}

// ── PNG ───────────────────────────────────────────────────────────────────────

const PNG_META_CHUNKS = new Set(['tEXt', 'zTXt', 'iTXt', 'eXIf', 'tIME']);
const PNG_SIG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

export function stripPngMetadata(buffer: ArrayBuffer): ArrayBuffer {
  const src = new Uint8Array(buffer);
  // Verify PNG signature
  for (let k = 0; k < 8; k++) if (src[k] !== PNG_SIG[k]) return buffer;

  const chunks: Uint8Array[] = [src.slice(0, 8)]; // signature
  let i = 8;

  while (i + 12 <= src.length) {
    const length = (src[i] << 24) | (src[i+1] << 16) | (src[i+2] << 8) | src[i+3];
    const type   = String.fromCharCode(src[i+4], src[i+5], src[i+6], src[i+7]);
    const chunkTotal = 12 + length; // 4 len + 4 type + N data + 4 CRC

    if (!PNG_META_CHUNKS.has(type)) {
      chunks.push(src.slice(i, i + chunkTotal));
    }
    i += chunkTotal;
    if (type === 'IEND') break;
  }

  return assemble(chunks);
}

// ── WebP ──────────────────────────────────────────────────────────────────────

export function stripWebpMetadata(buffer: ArrayBuffer): ArrayBuffer {
  const src = new Uint8Array(buffer);
  if (src.length < 12) return buffer;

  const tag  = String.fromCharCode(src[0], src[1], src[2], src[3]);
  const form = String.fromCharCode(src[8], src[9], src[10], src[11]);
  if (tag !== 'RIFF' || form !== 'WEBP') return buffer;

  const chunks: Uint8Array[] = [];
  let i = 12;
  let vp8xChunkIdx = -1; // index into `chunks` for the VP8X chunk

  while (i + 8 <= src.length) {
    const cc   = String.fromCharCode(src[i], src[i+1], src[i+2], src[i+3]);
    const size = src[i+4] | (src[i+5] << 8) | (src[i+6] << 16) | (src[i+7] << 24);
    const padded = size + (size & 1); // round up to even

    if (cc === 'EXIF' || cc === 'XMP ') {
      // Drop chunk
    } else {
      if (cc === 'VP8X') vp8xChunkIdx = chunks.length;
      chunks.push(src.slice(i, i + 8 + padded));
    }
    i += 8 + padded;
  }

  // Clear EXIF (bit 3) and XMP (bit 4) flags in VP8X if present
  if (vp8xChunkIdx >= 0) {
    const vp8x = chunks[vp8xChunkIdx].slice(); // mutable copy
    // VP8X data starts at byte 8, flags are a little-endian uint32
    vp8x[8] = vp8x[8] & ~((1 << 3) | (1 << 4)); // clear bits 3 & 4
    chunks[vp8xChunkIdx] = vp8x;
  }

  // Rebuild RIFF: 4 "RIFF" + 4 size + 4 "WEBP" + chunks
  const bodyLen  = chunks.reduce((s, c) => s + c.length, 0);
  const riffSize = 4 + bodyLen; // "WEBP" + chunks (excludes "RIFF" + 4-byte size itself)
  const out = new Uint8Array(12 + bodyLen);

  out[0] = 0x52; out[1] = 0x49; out[2] = 0x46; out[3] = 0x46; // RIFF
  out[4] = riffSize & 0xff; out[5] = (riffSize >> 8) & 0xff;
  out[6] = (riffSize >> 16) & 0xff; out[7] = (riffSize >> 24) & 0xff;
  out[8] = 0x57; out[9] = 0x45; out[10] = 0x42; out[11] = 0x50; // WEBP

  let pos = 12;
  for (const c of chunks) { out.set(c, pos); pos += c.length; }
  return out.buffer;
}

// ── Dispatch ──────────────────────────────────────────────────────────────────

/**
 * Strips metadata from any supported image format without re-encoding.
 * Falls back to canvas re-encode only if the format is unrecognised.
 */
export async function stripMetadata(file: File): Promise<Blob> {
  const buf = await file.arrayBuffer();

  if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
    return new Blob([stripJpegExif(buf)], { type: 'image/jpeg' });
  }
  if (file.type === 'image/png') {
    return new Blob([stripPngMetadata(buf)], { type: 'image/png' });
  }
  if (file.type === 'image/webp') {
    return new Blob([stripWebpMetadata(buf)], { type: 'image/webp' });
  }

  // Unknown format — canvas fallback
  return canvasStrip(file);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function assemble(chunks: Uint8Array[]): ArrayBuffer {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let pos = 0;
  for (const c of chunks) { out.set(c, pos); pos += c.length; }
  return out.buffer;
}

function canvasStrip(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const canvas = document.createElement('canvas');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
        const type = file.type || 'image/jpeg';
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error('Canvas.toBlob failed')),
          type,
          type === 'image/png' ? undefined : 0.95,
        );
      } catch (err) { reject(err); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}
