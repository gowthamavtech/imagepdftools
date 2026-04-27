import type { Metadata } from 'next';
import { ImageResizeUI } from '@/components/ImageResizeUI';

export const metadata: Metadata = {
  title: 'Resize Image Online — Free & Private | ImagePDF.Tools',
  description: 'Resize any image to exact pixel dimensions in your browser. Lock aspect ratio, use presets like HD or 4K, or enter custom width and height. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/resize-image' },
};

export default function ResizeImagePage() {
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
          Resize Image{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Online
          </span>
        </h1>
        <p className="text-center text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-2">
          Set exact pixel dimensions, lock the aspect ratio, or pick from common presets like HD, 4K, and social media sizes. Everything runs in your browser.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Custom dimensions', 'Aspect ratio lock', 'HD · 4K presets', 'Social media sizes', 'JPEG · PNG · WebP'].map((f) => (
            <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <ImageResizeUI />
      </div>
    </main>
  );
}
