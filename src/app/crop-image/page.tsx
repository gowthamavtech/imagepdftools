import type { Metadata } from 'next';
import { ImageCropUI } from '@/components/ImageCropUI';

export const metadata: Metadata = {
  title: 'Crop Image Online — Free & Private | SquishIt',
  description: 'Crop any image directly in your browser. Select any area, choose aspect ratios like 1:1 or 16:9, and save. No upload, 100% private.',
  alternates: { canonical: 'https://squishit.app/crop-image' },
};

export default function CropImagePage() {
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
          Crop Image{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Online
          </span>
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-2">
          Drag to select any area. Choose from preset aspect ratios or crop freely. Everything runs in your browser.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Free selection', '1:1 Square', '4:3', '16:9', 'Rule of thirds', 'JPEG · PNG · WebP'].map((f) => (
            <span key={f} className="text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <ImageCropUI />
      </div>
    </main>
  );
}
