import type { Metadata } from 'next';
import { ImageToPdfUI } from '@/components/ImageToPdfUI';

export const metadata: Metadata = {
  title: 'Image to PDF — Free Online Converter',
  description: 'Convert multiple images to a single PDF in your browser. Choose A4, Letter, or fit-to-image page size. No upload, no server — 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/image-to-pdf' },
};

export default function ImageToPdfPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-2xl mx-auto px-4 text-center mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-500 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full mb-3">
          Free · No Upload · Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Image to <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">PDF</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Bundle multiple images into a single PDF file. Choose your page size, reorder images, and download — all processing stays in your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['Multiple images', 'A4 · Letter · Fit', 'Drag to reorder', 'JPEG · PNG · WebP', 'Free forever'].map((f) => (
            <span key={f} className="text-xs text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 px-2.5 py-1 rounded-full">{f}</span>
          ))}
        </div>
      </div>
      <ImageToPdfUI />
    </main>
  );
}
