// TODO: Replace with @nicolo-ribaudo/pngquant-wasm when available on npm for
// true lossy PNG quantisation (60–80% size reduction). Currently falls back to
// browser-image-compression which uses the Canvas API for PNG output.
import imageCompression from 'browser-image-compression';

/**
 * Compress a PNG file.
 * Quality is 1–100, matching the QualitySlider range.
 * Default quality for PNG is 60 (lower than JPEG/WebP because lossless PNGs
 * don't benefit much from Canvas recompression above that threshold).
 */
export async function compressPng(file: File, quality: number): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 10,
    maxWidthOrHeight: 4096,
    useWebWorker: false,
    fileType: 'image/png',
    initialQuality: quality / 100,
    preserveExif: false,
  });
}
