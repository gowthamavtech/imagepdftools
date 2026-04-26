import type { Metadata } from 'next';
import { PdfCompressUI } from '@/components/PdfCompressUI';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Compress PDF Online — Free & Private',
  description: 'Reduce PDF file size in your browser. No upload, no server — renders each page and recompresses at your chosen quality. 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-pdf' },
};

export default function CompressPdfPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-2xl mx-auto px-4 text-center mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-500 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full mb-3">
          Free · No Upload · Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Compress <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">PDF</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Shrink any PDF by re-rendering each page at your chosen quality level. Everything runs in your browser — your file never leaves your device.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['High / Medium / Low quality', 'Per-page progress', 'No file size limit', 'No upload needed', 'Free forever'].map((f) => (
            <span key={f} className="text-xs text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 px-2.5 py-1 rounded-full">{f}</span>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 mb-6"><AdBanner /></div>
      <PdfCompressUI />
    </main>
  );
}
