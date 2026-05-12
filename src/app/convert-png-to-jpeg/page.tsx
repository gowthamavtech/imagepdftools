import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG to JPEG Converter',
      url: 'https://imagepdf.tools/convert-png-to-jpeg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to JPEG format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to JPEG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the converter below.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider for the JPEG output.' },
        { '@type': 'HowToStep', text: 'Download your converted JPEG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert PNG to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'JPEGs are significantly smaller than PNGs for photographs and complex images because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.' } },
        { '@type': 'Question', name: 'Will I lose transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white. If you need to preserve transparency, keep the PNG format or export to WebP instead.' } },
        { '@type': 'Question', name: 'What quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'For web use, 75–85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple PNGs at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.' } },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: 'Convert PNG to JPEG Online — Free & Private',
  description:
    'Convert PNG images to JPEG instantly in your browser. No upload, no server — 100% private. Reduce file size by up to 80%.',
  alternates: { canonical: 'https://imagepdf.tools/convert-png-to-jpeg' },
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
      <div className="max-w-5xl mx-auto px-4 pt-12 sm:pt-18 pb-8 text-center">

        <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          No upload &middot; 100% Private &middot; Instant
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
          Convert PNG to{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            JPEG
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
          Shrink PNG files by up to 80% by converting to JPEG — all inside your browser.
          Nothing is ever uploaded to a server.
        </p>

        <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-5 py-2 mb-10 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-full">PNG</span>
          <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-sm font-semibold text-white bg-violet-600 px-2.5 py-1 rounded-full">JPEG</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-3 glass border border-black/8 dark:border-white/8 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-50">{step.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-left">
          <CompressorUI initialFormat="image/jpeg" />
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-left">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">PNG vs JPEG — when to use which</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-600">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700/60">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 w-1/3">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">PNG</th>
                  <th className="text-left px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">JPEG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  ['Compression', 'Lossless (larger)', 'Lossy (much smaller)'],
                  ['Transparency', '✓ Supported', '✗ Not supported'],
                  ['Best for', 'Logos, icons, screenshots', 'Photos, complex images'],
                  ['Typical size', '500 KB – 5 MB', '50 KB – 500 KB'],
                  ['Browser support', 'Universal', 'Universal'],
                ].map(([feature, png, jpeg]) => (
                  <tr key={feature} className="bg-white dark:bg-slate-800/40">
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{feature}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{png}</td>
                    <td className="px-4 py-3 text-violet-600 dark:text-violet-400 font-medium">{jpeg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-left">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border border-slate-200 dark:border-slate-600 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-50 mb-1">{q}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <RelatedTools hrefs={['/jpg-to-png', '/png-to-webp', '/webp-to-jpg', '/convert-image-to-webp']} />
    </main>
    </>
  );
}
