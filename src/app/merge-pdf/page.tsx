import type { Metadata } from 'next';
import { MergePdfUI } from '@/components/MergePdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Merge PDF Online — Free & Private',
  description:
    'Combine multiple PDF files into one in your browser. Drag to reorder pages, then download your merged PDF instantly. No upload, no server — 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/merge-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Merge PDF',
      url: 'https://imagepdf.tools/merge-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF merger. Combine multiple PDFs into one in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to merge PDF files online',
      step: [
        { '@type': 'HowToStep', text: 'Drop two or more PDF files onto the tool, or click to browse.' },
        { '@type': 'HowToStep', text: 'Reorder the files using the up/down arrows to set the final page order.' },
        { '@type': 'HowToStep', text: 'Click Merge PDFs and download your combined file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How many PDFs can I merge at once?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit on the number of PDFs. You can merge as many files as your browser\'s memory can handle. Very large batches (100+ pages or 500 MB+ total) may take longer on lower-spec devices.' } },
        { '@type': 'Question', name: 'Will the merged PDF preserve the original quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text, images, and formatting from the original PDFs are preserved exactly.' } },
        { '@type': 'Question', name: 'Can I reorder pages before merging?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the up/down arrows next to each file to change the order. The number badge shows the final position of each file in the merged document.' } },
        { '@type': 'Question', name: 'Is my PDF uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All merging happens locally in your browser using pdf-lib. Your files never leave your device — we never see them.' } },
        { '@type': 'Question', name: 'Can I merge password-protected PDFs?', acceptedAnswer: { '@type': 'Answer', text: 'The tool will attempt to load encrypted PDFs, but password-protected files may fail to merge if the content cannot be read without the password. Remove the password protection first using another tool.' } },
      ],
    },
  ],
};

export default function MergePdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            No upload &middot; 100% Private &middot; Instant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Merge PDFs{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Online
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Combine multiple PDF files into one. Reorder pages, then download. Everything runs in your browser — nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['No file limit', 'Original quality', 'Drag to reorder', 'JPEG · PNG · WebP friendly'].map((f) => (
              <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>

          <MergePdfUI />
        </div>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-4">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why merge PDF files?</h2>
              <p className="mb-3">
                PDF merging is one of the most common document tasks in any workplace. Instead of sending five separate attachments, you send one clean document. Instead of juggling multiple pages from different sources, you have a single file that is easy to navigate, archive, and share.
              </p>
              <p>
                Most online PDF mergers upload your files to a server — which means your documents (contracts, invoices, medical records, financial statements) pass through a third party&apos;s infrastructure. This tool merges PDFs entirely inside your browser using <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong>, a pure JavaScript library. Your files never leave your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases for merging PDFs</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Contracts and agreements.</strong> Combine a contract body, appendices, and signature pages into one document for signing or archival.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Invoices and receipts.</strong> Bundle multiple invoices into a single PDF for accounting, expense reports, or submission to finance teams.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Reports and presentations.</strong> Merge separate chapter exports or slide handouts into one complete document.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Scanned documents.</strong> If your scanner creates one PDF per page, merge them into a single multi-page document.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Application packets.</strong> Combine a CV, cover letter, portfolio, and certificates into one file for job applications.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Research and study notes.</strong> Merge lecture slides, papers, and your own notes into one reference document.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the merger works</h2>
              <p>
                When you drop PDF files into the tool, they are read directly by your browser using the <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong> JavaScript library. pdf-lib copies the internal page objects from each source PDF into a new output document — without re-rendering or re-compressing any content. This means text remains selectable, images retain their original quality, and fonts are preserved exactly as in the originals. The merged PDF is then offered as a direct download from your browser with no server involved at any stage.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'How many PDFs can I merge at once?', a: 'There is no hard limit on the number of PDFs. You can merge as many files as your browser\'s memory can handle. Very large batches (100+ pages or 500 MB+ total) may take longer on lower-spec devices.' },
                  { q: 'Will the merged PDF preserve the original quality?', a: 'Yes. This tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text, images, and formatting from the original PDFs are preserved exactly.' },
                  { q: 'Can I reorder pages before merging?', a: 'Yes. Use the up/down arrows next to each file to change the order. The number badge shows the final position of each file in the merged document.' },
                  { q: 'Is my PDF uploaded to a server?', a: 'No. All merging happens locally in your browser using pdf-lib. Your files never leave your device — we never see them.' },
                  { q: 'Can I merge password-protected PDFs?', a: 'The tool will attempt to load encrypted PDFs, but password-protected files may fail to merge if the content cannot be read without the password. Remove the password protection first using another tool.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/compress-pdf', '/image-to-pdf', '/compress-image', '/remove-metadata']} />
      </main>
    </>
  );
}
