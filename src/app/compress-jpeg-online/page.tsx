import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'Compress JPEG Online — Free JPEG Compressor',
  description:
    'Compress JPEG images online for free. Reduce file size while keeping great quality — all processing happens in your browser.',
  alternates: { canonical: 'https://squishit.app/compress-jpeg-online' },
};

export default function CompressJpegPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">Compress JPEG Online</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Reduce JPEG file sizes by up to 90% with fine-grained quality control. Private,
          fast, and free — nothing ever leaves your device.
        </p>
      </div>
      <CompressorUI />
    </main>
  );
}
