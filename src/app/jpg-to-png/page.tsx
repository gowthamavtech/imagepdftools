import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free Online',
  description: 'Convert JPEG images to PNG instantly in your browser. No upload, no server — 100% private. Lossless PNG output with transparency support.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-png' },
};

export default function JpgToPngPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          JPG to PNG <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Convert JPEG images to lossless PNG format in your browser. Perfect for graphics that need transparency or exact colour reproduction.
        </p>
      </div>
      <CompressorUI />
    </main>
  );
}
