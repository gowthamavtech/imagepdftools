import type { Metadata } from 'next';
import { OrganizePdfUI } from '@/components/OrganizePdfUI';

export const metadata: Metadata = {
  title: 'Organize PDF Pages — Reorder & Delete Pages Free Online',
  description:
    'Drag and drop to reorder PDF pages, or delete pages you don\'t need — entirely in your browser. No upload required.',
  alternates: { canonical: 'https://imagepdf.tools/organize-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Organize PDF Pages',
      url: 'https://imagepdf.tools/organize-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Reorder and delete PDF pages with drag-and-drop — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to reorder PDF pages online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area. All pages will render as thumbnails.' },
        { '@type': 'HowToStep', position: 2, name: 'Drag to reorder', text: 'Drag page thumbnails to your preferred order. Hover a page and click × to delete it.' },
        { '@type': 'HowToStep', position: 3, name: 'Save', text: 'Click Save PDF to rebuild the file with your new page order.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the reorganized PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does reordering pages affect quality?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Pages are copied as-is from the original PDF — no re-encoding or re-compression. Text, images, and vector graphics are all preserved perfectly.' },
        },
        {
          '@type': 'Question',
          name: 'Can I delete pages?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Hover any page thumbnail and click the × button to remove it. The page is excluded from the saved PDF.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a page limit?',
          acceptedAnswer: { '@type': 'Answer', text: 'No hard limit — the tool works in your browser so performance depends on your device. PDFs with hundreds of pages may take a few seconds to render thumbnails.' },
        },
      ],
    },
  ],
};

export default function OrganizePdfPage() {
  return (
    <main className="flex-1 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Organize{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            PDF Pages
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
          Drag and drop to reorder pages, remove unwanted ones, and save a clean PDF — all in your browser.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-8">
          {['Drag-and-drop UI', 'Delete any page', 'No quality loss', 'Runs in browser'].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {f}
            </span>
          ))}
        </div>
      </div>

      <OrganizePdfUI />

      <div className="max-w-2xl mx-auto px-4 mt-16 space-y-10 text-left">
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your PDF is rendered page-by-page into thumbnail images using pdfjs-dist, giving you a visual preview to work with. When you drag to reorder or delete pages, the UI updates instantly. When you save, pdf-lib copies the original pages in your chosen order into a new PDF document — no re-encoding, full quality preserved.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I undo a deleted page?', a: 'Not within the tool — refresh the page and re-upload your original PDF if you accidentally delete a page.' },
              { q: 'Can I also add pages from another PDF?', a: 'Not yet. For combining PDFs, use the Merge PDF tool, then come back here to reorder as needed.' },
              { q: 'Does this work on mobile?', a: 'Yes. Drag-and-drop works on touch screens. Tap and hold a thumbnail to start dragging.' },
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
