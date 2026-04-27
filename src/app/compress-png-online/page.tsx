import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Compress PNG Online — Free PNG Compressor',
  description:
    'Reduce PNG file size online for free. No upload needed — compression happens in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/compress-png-online' },
};

export default function CompressPngPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Compress PNG Online</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Shrink PNG files by up to 80% using advanced quantisation — all inside your browser.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 mb-6"><AdBanner /></div>
      <CompressorUI />
    </main>
  );
}
