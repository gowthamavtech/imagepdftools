import type { Metadata } from 'next';
import { RotatePdfUI } from '@/components/RotatePdfUI';

export const metadata: Metadata = {
  title: 'Rotate PDF — Rotate All Pages Free Online',
  description:
    'Rotate all pages of a PDF 90° clockwise, 90° counter-clockwise, or 180°. No upload required — everything runs in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/rotate-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Rotate PDF',
      url: 'https://imagepdf.tools/rotate-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Rotate PDF pages 90° CW, 90° CCW, or 180° — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to rotate a PDF online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF file onto the upload area or click Browse PDF.' },
        { '@type': 'HowToStep', position: 2, name: 'Choose rotation', text: 'Select 90° CW, 90° CCW, or 180°.' },
        { '@type': 'HowToStep', position: 3, name: 'Rotate', text: 'Click Rotate PDF. The rotation is applied instantly in your browser.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the rotated PDF or open it directly in your browser.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does rotating a PDF affect quality?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. This tool updates the rotation flag in the PDF metadata — no content is re-encoded or re-compressed, so image and text quality is completely unchanged.' },
        },
        {
          '@type': 'Question',
          name: 'Can I rotate individual pages?',
          acceptedAnswer: { '@type': 'Answer', text: 'This tool rotates all pages by the same angle. To rotate specific pages, use Split PDF to extract the pages you want, rotate them, then Merge PDF to reassemble.' },
        },
        {
          '@type': 'Question',
          name: 'Are my files uploaded to a server?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs directly in your browser using pdf-lib. Your PDF never leaves your device.' },
        },
        {
          '@type': 'Question',
          name: 'Is this tool free?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — rotating PDFs is completely free with no account required.' },
        },
        {
          '@type': 'Question',
          name: 'Will the rotated PDF open correctly in all viewers?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. The rotation is stored as standard PDF metadata and is honoured by all major PDF viewers including Adobe Acrobat, macOS Preview, Chrome, and mobile apps.' },
        },
      ],
    },
  ],
};

export default function RotatePdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              No Uploads &middot; 100% Private &middot; Free
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Rotate{' '}
              <span className="bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                PDF
              </span>
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Rotate all pages 90°, 180°, or 270° — no re-encoding, no quality loss, instant download.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
              {['All pages', 'No quality loss', 'Instant', 'Free'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          <RotatePdfUI />

          {/* Content */}
          <div className="mt-16 space-y-10 text-sm text-slate-600 dark:text-slate-400">

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
              <p className="leading-relaxed">
                This tool uses <strong className="text-slate-700 dark:text-slate-300">pdf-lib</strong> to update the rotation
                flag stored in each page&apos;s metadata. Unlike approaches that render pages to images and rebuild the PDF,
                this method is purely metadata — the original text, vectors, and images are completely untouched. The result
                is a byte-for-byte identical PDF where only the display orientation changes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-3">When to rotate a PDF</h2>
              <ul className="space-y-2 list-none">
                {[
                  'Scanned documents saved in the wrong orientation',
                  'PDFs exported from mobile apps in portrait mode that should be landscape',
                  'Presentations or slides that appear sideways in viewers',
                  'Forms that were filled out and saved rotated',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4">FAQ</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Does rotating affect image or text quality?',
                    a: 'No. The rotation is stored as a flag in the PDF — nothing is re-encoded. Your images, fonts, and vectors remain exactly as they were.',
                  },
                  {
                    q: 'Can I rotate only specific pages?',
                    a: 'This tool rotates all pages uniformly. To rotate individual pages, split the PDF first, rotate the extracted pages, then merge them back.',
                  },
                  {
                    q: 'Is my file uploaded anywhere?',
                    a: 'Never. pdf-lib runs entirely in your browser. Your file is processed in memory and never sent to any server.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{q}</p>
                    <p className="leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
