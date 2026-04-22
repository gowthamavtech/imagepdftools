/**
 * WASM-based JPEG and WebP encoding via @jsquash.
 *
 * @jsquash/jpeg  — MozJPEG: Mozilla's optimised JPEG encoder, 10–20% smaller
 *                 than Canvas toBlob at the same quality setting.
 * @jsquash/webp  — libwebp: Google's reference WebP encoder, 10–20% smaller
 *                 than Canvas toBlob at the same quality setting.
 *
 * Each codec is dynamically imported on first use — the WASM binary is never
 * in the initial bundle. If WASM fails (CSP, unsupported browser) we fall back
 * to browser-image-compression (Canvas toBlob).
 *
 * All processing is client-side — no data leaves the browser.
 */

// ---------------------------------------------------------------------------
// Canvas decode: File → ImageData (at optionally reduced size)
// ---------------------------------------------------------------------------

export function decodeToImageData(
  file: File,
  maxDim: number,
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        let w = img.naturalWidth, h = img.naturalHeight;
        if (w > maxDim || h > maxDim) {
          const s = maxDim / Math.max(w, h);
          w = Math.round(w * s);
          h = Math.round(h * s);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(ctx.getImageData(0, 0, w, h));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image decode failed'));
    };
    img.src = url;
  });
}

// ---------------------------------------------------------------------------
// MozJPEG encode
// ---------------------------------------------------------------------------

export async function encodeJpeg(
  imageData: ImageData,
  quality: number,
): Promise<Blob> {
  const { encode } = await import('@jsquash/jpeg');
  const output = await encode(imageData, { quality });
  return new Blob([output], { type: 'image/jpeg' });
}

// ---------------------------------------------------------------------------
// libwebp encode
// ---------------------------------------------------------------------------

export async function encodeWebp(
  imageData: ImageData,
  quality: number,
): Promise<Blob> {
  const { encode } = await import('@jsquash/webp');
  const output = await encode(imageData, { quality });
  return new Blob([output], { type: 'image/webp' });
}

// ---------------------------------------------------------------------------
// Canvas fallback (browser-image-compression) — used if WASM fails
// ---------------------------------------------------------------------------

async function canvasFallback(
  file: File,
  outputFormat: string,
  quality: number,
  maxDimension: number,
): Promise<Blob> {
  const { default: imageCompression } = await import('browser-image-compression');
  const compressed = await imageCompression(file, {
    maxSizeMB: 10,
    maxWidthOrHeight: maxDimension,
    useWebWorker: false,
    fileType: outputFormat,
    initialQuality: quality / 100,
    preserveExif: false,
  });
  return new Blob([await compressed.arrayBuffer()], { type: compressed.type });
}

// ---------------------------------------------------------------------------
// Public entry point — tries WASM, falls back to Canvas on error
// ---------------------------------------------------------------------------

export async function encodeRaster(
  file: File,
  outputFormat: 'image/jpeg' | 'image/webp',
  quality: number,
  maxDimension: number,
): Promise<Blob> {
  try {
    const imageData = await decodeToImageData(file, maxDimension);
    if (outputFormat === 'image/webp') {
      return await encodeWebp(imageData, quality);
    }
    return await encodeJpeg(imageData, quality);
  } catch {
    // WASM unavailable — fall back to Canvas API
    return canvasFallback(file, outputFormat, quality, maxDimension);
  }
}
