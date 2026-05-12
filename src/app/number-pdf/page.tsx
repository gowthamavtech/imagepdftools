import type { Metadata } from 'next';
import { NumberPdfUI } from '@/components/NumberPdfUI';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF — Free Online Tool',
  description:
    'Add page numbers to any PDF online — choose position, format, and starting number. Runs entirely in your browser, no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/number-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Add Page Numbers to PDF',
      url: 'https://imagepdf.tools/number-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Add customisable page numbers to any PDF — position, format, and start number — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to add page numbers to a PDF',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Set options', text: 'Choose position (bottom center, top right, etc.), number format, and starting number.' },
        { '@type': 'HowToStep', position: 3, name: 'Apply', text: 'Click Add Page Numbers. Numbers are drawn onto every page instantly in your browser.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the numbered PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does this affect existing text in the PDF?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Page numbers are drawn on top of existing content. The original text, images, and layout are unchanged.' },
        },
        {
          '@type': 'Question',
          name: 'Can I choose where numbers appear?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can place numbers at the bottom center, bottom left, bottom right, top center, top left, or top right of every page.' },
        },
        {
          '@type': 'Question',
          name: 'What formats are available?',
          acceptedAnswer: { '@type': 'Answer', text: 'Three formats: plain numbers (1, 2, 3), "Page N" (Page 1, Page 2), or "N of Total" (1 of 10, 2 of 10).' },
        },
      ],
    },
  ],
};

export default function NumberPdfPage() {
  return (
    <main className="flex-1 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Add{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Page Numbers
          </span>
          {' '}to PDF
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
          Stamp page numbers onto every page of your PDF — pick position, format, and start number. No upload needed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-8">
          {['6 positions', '3 number formats', 'Custom start number', 'Runs in browser'].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {f}
            </span>
          ))}
        </div>
      </div>

      <NumberPdfUI />

      <div className="max-w-2xl mx-auto px-4 mt-16 space-y-10 text-left">
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The tool uses pdf-lib to load your PDF in the browser and draw text onto each page at the position you select. Numbers are rendered using Helvetica — a universally supported PDF font — so the result looks clean in every viewer. Nothing is uploaded to a server.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I add numbers starting from a page other than 1?', a: 'Yes. Set any starting number in the "Start At" field. Useful for documents where the first few pages are a cover or table of contents.' },
              { q: 'Will numbers appear on every page?', a: 'Yes. The number is drawn on every page of the PDF, incrementing by 1 per page.' },
              { q: 'Can I remove page numbers later?', a: 'Not with this tool — once drawn, the numbers become part of the PDF content. Use an unmodified version of your PDF if you need to re-number.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 dark:border-slate-700 pb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">{q}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
