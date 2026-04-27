import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'Convert Image to WebP — Free Online WebP Converter',
  description:
    'Convert JPEG and PNG images to WebP format online for free. Smaller file sizes, same quality — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/convert-image-to-webp' },
};

export default function ConvertToWebpPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Convert Image to WebP</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Convert any JPEG or PNG to modern WebP format — up to 35% smaller than JPEG with the
          same visual quality.
        </p>
      </div>
      <CompressorUI />
    </main>
  );
}
