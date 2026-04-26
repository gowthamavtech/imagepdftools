import type { Metadata } from 'next';
import { FlipRotateUI } from '@/components/FlipRotateUI';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Flip Image Online — Free & Instant',
  description: 'Flip any image horizontally or vertically in your browser — no upload, no server, 100% private. Supports JPEG, PNG and WebP.',
  alternates: { canonical: 'https://imagepdf.tools/flip-image' },
};

export default function FlipImagePage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-2xl mx-auto px-4 text-center mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-500 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full mb-3">
          Free · No Upload · Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Flip Image <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Online</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Mirror your image horizontally or vertically in one click. Supports JPEG, PNG and WebP — all processing happens in your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['Flip Horizontal', 'Flip Vertical', 'Rotate 90° / 180°', 'No upload needed', 'Free forever'].map((f) => (
            <span key={f} className="text-xs text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 px-2.5 py-1 rounded-full">{f}</span>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 mb-6"><AdBanner /></div>
      <FlipRotateUI />
    </main>
  );
}
