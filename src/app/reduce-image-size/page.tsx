import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'Reduce Image Size Online — Free Image Resizer & Compressor',
  description:
    'Reduce image size online for free. Compress JPEG, PNG, and WebP images without losing quality. All processing happens in your browser.',
  alternates: { canonical: 'https://squishit.app/reduce-image-size' },
};

export default function ReduceImageSizePage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">Reduce Image Size Online</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Make your images smaller for web, email, or social media. Supports JPEG, PNG, and WebP
          — no account required.
        </p>
      </div>
      <CompressorUI />
    </main>
  );
}
