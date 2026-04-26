import type { Metadata } from 'next';
import { ImageResizeUI } from '@/components/ImageResizeUI';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Resize Image Online — Free & Private | ImagePDF.Tools',
  description: 'Resize any image to exact pixel dimensions in your browser. Lock aspect ratio, use presets like HD or 4K, or enter custom width and height. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/resize-image' },
};

export default function ResizeImagePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 opacity-[0.08] dark:opacity-[0.15]" />

      <div className="relative max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            No upload · 100% Private · Instant
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white leading-tight mb-3">
          Resize Image{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Online
          </span>
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-2">
          Set exact pixel dimensions, lock the aspect ratio, or pick from common presets like HD, 4K, and social media sizes. Everything runs in your browser.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Custom dimensions', 'Aspect ratio lock', 'HD · 4K presets', 'Social media sizes', 'JPEG · PNG · WebP'].map((f) => (
            <span key={f} className="text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="mb-6"><AdBanner /></div>
        <ImageResizeUI />
      </div>
    </main>
  );
}
