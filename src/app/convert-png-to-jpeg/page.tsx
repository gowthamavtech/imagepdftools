import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'Convert PNG to JPEG Online — Free & Private',
  description:
    'Convert PNG images to JPEG instantly in your browser. No upload, no server — 100% private. Reduce file size by up to 80%.',
  alternates: { canonical: 'https://squishit.app/convert-png-to-jpeg' },
};

const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: 'Drop your PNG',
    desc: 'Drag and drop any PNG file onto the converter below.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'Adjust quality',
    desc: 'Set the JPEG quality (default 80). Higher = better detail, larger file.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: 'Download JPEG',
    desc: 'Click Compress All and download your converted .jpg file instantly.',
  },
];

const FAQS = [
  {
    q: 'Why convert PNG to JPEG?',
    a: 'JPEGs are significantly smaller than PNGs for photographs and complex images because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.',
  },
  {
    q: 'Will I lose transparency?',
    a: 'Yes — JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white. If you need to preserve transparency, keep the PNG format or export to WebP instead.',
  },
  {
    q: 'What quality setting should I use?',
    a: 'For web use, 75–85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.',
  },
  {
    q: 'Can I convert multiple PNGs at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.',
  },
];

export default function ConvertPngToJpegPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 opacity-[0.08] dark:opacity-[0.15]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          No upload · 100% Private · Instant
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          Convert PNG to{' '}
          <span className="italic bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            JPEG
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Shrink PNG files by up to 80% by converting to JPEG — all inside your browser.
          Nothing is ever uploaded to a server.
        </p>

        {/* Format pill */}
        <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2 mb-10 shadow-sm">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">PNG</span>
          <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-sm font-semibold text-white bg-violet-600 px-2.5 py-1 rounded-full">JPEG</span>
        </div>

        {/* How it works — 3 steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-3 bg-white/60 dark:bg-gray-900/60 border border-violet-100 dark:border-violet-900/30 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{step.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compressor — JPEG locked as output */}
        <div className="text-left">
          <CompressorUI initialFormat="image/jpeg" />
        </div>

        {/* PNG vs JPEG comparison */}
        <div className="max-w-3xl mx-auto mt-16 text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">PNG vs JPEG — when to use which</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 w-1/3">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">PNG</th>
                  <th className="text-left px-4 py-3 font-semibold text-violet-700 dark:text-violet-400">JPEG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ['Compression', 'Lossless (larger)', 'Lossy (much smaller)'],
                  ['Transparency', '✓ Supported', '✗ Not supported'],
                  ['Best for', 'Logos, icons, screenshots', 'Photos, complex images'],
                  ['Typical size', '500 KB – 5 MB', '50 KB – 500 KB'],
                  ['Browser support', 'Universal', 'Universal'],
                ].map(([feature, png, jpeg]) => (
                  <tr key={feature} className="bg-white dark:bg-gray-900/40">
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">{feature}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{png}</td>
                    <td className="px-4 py-3 text-violet-700 dark:text-violet-400 font-medium">{jpeg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12 text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-900/40">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{q}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
