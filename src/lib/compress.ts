/**
 * Format-specific compression router.
 *
 * Algorithm by output format:
 *   JPEG  — MozJPEG WASM via @jsquash (quality 1–100)
 *   WebP  — libwebp WASM via @jsquash  (quality 1–100)
 *   PNG   — UPNG.js K-d tree palette quantisation (quality 1–100)
 *   SVG   — Metadata strip + coord rounding (precision 0–6 decimals)
 *
 * All processing is client-side — no data leaves the browser.
 */

export interface CompressOptions {
  /** 1–100 — used for JPEG and WebP output */
  quality: number;
  /** 2–256 — used for PNG output (palette quantisation) */
  colors: number;
  /** 0–6 decimal places — used for SVG output */
  precision: number;
  /** MIME type of the desired output format */
  outputFormat: string;
  /** Longest edge limit in pixels before compression (default: 4096) */
  maxDimension?: number;
}

export interface CompressResult {
  blob: Blob;
  name: string;
  size: number;
}

function replaceExtension(filename: string, ext: string): string {
  return filename.replace(/\.[^.]+$/, '') + ext;
}

export async function compressImage(
  file: File,
  options: CompressOptions,
): Promise<CompressResult> {
  const { outputFormat, quality, colors, precision, maxDimension } = options;

  // ── SVG → optimise in-place (no rasterisation) ─────────────────────────
  if (outputFormat === 'image/svg+xml' || file.type === 'image/svg+xml') {
    const { compressSvg } = await import('./svgCompress');
    const blob = await compressSvg(file, precision);
    return { blob, name: file.name, size: blob.size };
  }

  // ── PNG → UPNG.js K-d tree palette quantisation ────────────────────────
  if (outputFormat === 'image/png') {
    const { compressPngUpng } = await import('./upngCompress');
    const blob = await compressPngUpng(file, quality, maxDimension ?? 4096);
    return {
      blob,
      name: replaceExtension(file.name, '.png'),
      size: blob.size,
    };
  }

  // ── JPEG / WebP ─────────────────────────────────────────────────────────
  // MozJPEG (JPEG) / libwebp (WebP) via @jsquash WASM — 10–20% smaller
  // than Canvas toBlob at equivalent quality.
  const { encodeRaster } = await import('./jSquashEncode');

  const isJpeg  = outputFormat === 'image/jpeg' || outputFormat === 'image/jpg';
  const rasterFormat = (outputFormat === 'image/webp' ? 'image/webp' : 'image/jpeg') as
    'image/jpeg' | 'image/webp';
  const blob = await encodeRaster(file, rasterFormat, quality, maxDimension ?? 4096);

  const ext = outputFormat === 'image/webp' ? '.webp'
    : outputFormat === 'image/jpeg' ? '.jpeg'
    : isJpeg ? '.jpg'
    : '.jpg';
  const name = replaceExtension(file.name, ext);

  return { blob, name, size: blob.size };
}
