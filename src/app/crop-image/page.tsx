import type { Metadata } from 'next';
import { ImageCropUI } from '@/components/ImageCropUI';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Crop Image Online — Free & Private | ImagePDF.Tools',
  description: 'Crop any image directly in your browser. Select any area, choose aspect ratios like 1:1 or 16:9, and save. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/crop-image' },
};

export default function CropImagePage() {
  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-6">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            No upload &middot; 100% Private &middot; Instant
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 dark:text-slate-50 leading-tight mb-3">
          Crop Image{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Online
          </span>
        </h1>
        <p className="text-center text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-2">
          Drag to select any area. Choose from preset aspect ratios or crop freely. Everything runs in your browser.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Free selection', '1:1 Square', '4:3', '16:9', 'Rule of thirds', 'JPEG · PNG · WebP'].map((f) => (
            <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="mb-6"><AdBanner /></div>
        <ImageCropUI />
      </div>
    </main>
  );
}
