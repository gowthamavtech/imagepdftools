import UPNG from 'upng-js';

/**
 * PNG compression via UPNG.js (K-d tree palette quantisation + UZIP DEFLATE).
 *
 * quality 100 → cnum 0 → lossless (no palette, full truecolor)
 * quality  80 → cnum 204 colours   (high quality lossy)
 * quality   1 → cnum   2 colours   (maximum compression)
 */
export async function compressPngUpng(
  file: File,
  quality: number,
  maxDimension = 4096,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        let w = img.naturalWidth;
        let h = img.naturalHeight;

        if (w > maxDimension || h > maxDimension) {
          const scale = maxDimension / Math.max(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);

        const { data } = ctx.getImageData(0, 0, w, h);

        // quality 100 → lossless (cnum=0), quality <100 → 2–255 palette colours
        const cnum =
          quality >= 100 ? 0 : Math.max(2, Math.round((quality / 100) * 256));

        const encoded = UPNG.encode([data.buffer as ArrayBuffer], w, h, cnum);
        resolve(new Blob([encoded], { type: 'image/png' }));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });
}
