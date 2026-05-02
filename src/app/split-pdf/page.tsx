import type { Metadata } from 'next';
import { SplitPdfUI } from '@/components/SplitPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Split PDF Online — Free & Private',
  description:
    'Extract pages from a PDF or split it into multiple parts — all in your browser. Select individual pages or define ranges. No upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/split-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Split PDF',
      url: 'https://imagepdf.tools/split-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF splitter. Extract pages or split by range — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to split a PDF online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF file onto the tool.' },
        { '@type': 'HowToStep', text: 'Choose "Select Pages" to pick individual pages, or "Split by Range" to define page ranges like 1-3, 5, 7-10.' },
        { '@type': 'HowToStep', text: 'Click Extract or Split and download your resulting PDF files instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I extract just a few pages from a large PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the Select Pages mode — click any page numbers you want to keep and click Extract. The result is a new PDF containing only your selected pages.' } },
        { '@type': 'Question', name: 'Can I split a PDF into multiple separate files?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Split by Range mode and enter comma-separated ranges, e.g. "1-5, 6-10, 11-20". Each range becomes its own PDF. If you create more than one part, they are also bundled as a ZIP for easy download.' } },
        { '@type': 'Question', name: 'Does splitting affect the PDF quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Pages are copied directly from the source PDF using pdf-lib without any re-rendering. Text stays selectable, images keep their original quality, and fonts are preserved exactly.' } },
        { '@type': 'Question', name: 'Is my PDF uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens locally in your browser using pdf-lib. Your file never leaves your device — we never see it.' } },
        { '@type': 'Question', name: 'Can I split a password-protected PDF?', acceptedAnswer: { '@type': 'Answer', text: 'The tool attempts to open encrypted PDFs but cannot process files locked with a password. Remove the password first using another tool, then split.' } },
      ],
    },
  ],
};

export default function SplitPdfPage() {
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
            Split PDF{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Online
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Extract individual pages or split into multiple parts by range. Everything runs in your browser — nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Select pages', 'Split by range', 'Original quality', 'Download as ZIP'].map((f) => (
              <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>

          <SplitPdfUI />
        </div>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-4">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why split a PDF?</h2>
              <p className="mb-3">
                PDFs are often created as single monolithic files — a complete report, a contract with attachments, a scanned book. But the recipient may only need a specific section, and the full document may be too large to email or share efficiently.
              </p>
              <p>
                Splitting lets you carve out exactly what you need: the signed page of a contract, a specific chapter of a report, or just the invoice from a bundle of receipts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Extracting a signed page.</strong> Pull just the signature page from a contract to attach to an email without sending the full document.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Splitting a scanned book.</strong> Divide a 300-page scan into chapters for easier reading or distribution.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Isolating individual invoices.</strong> When your accounting software generates one PDF for 12 months of invoices, split them into separate files for each month.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Reducing file size for sending.</strong> If a PDF is too large to email, extract only the relevant section and send that instead.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Separating appendices.</strong> Pull supporting annexes from a main report so each can be stored and referenced independently.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
              <p>
                Once you drop your PDF, the tool reads the page count using <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong> directly in your browser. You then choose which pages to extract — either by clicking individual page tiles or typing a range like <code className="text-[11px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">1-5, 8, 12-15</code>. pdf-lib copies the selected page objects into a new PDF without re-rendering anything — meaning text, images, and fonts are bit-for-bit identical to the originals. The output downloads directly from your browser tab. No server contact happens at any point.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Can I extract just a few pages from a large PDF?', a: 'Yes. Use the Select Pages mode — click any page numbers you want to keep and click Extract. The result is a new PDF containing only your selected pages.' },
                  { q: 'Can I split a PDF into multiple separate files?', a: 'Yes. Use Split by Range mode and enter comma-separated ranges, e.g. "1-5, 6-10, 11-20". Each range becomes its own PDF. If you create more than one part, they are also bundled as a ZIP for easy download.' },
                  { q: 'Does splitting affect the PDF quality?', a: 'No. Pages are copied directly from the source PDF using pdf-lib without any re-rendering. Text stays selectable, images keep their original quality, and fonts are preserved exactly.' },
                  { q: 'Is my PDF uploaded to a server?', a: 'No. All processing happens locally in your browser using pdf-lib. Your file never leaves your device — we never see it.' },
                  { q: 'Can I split a password-protected PDF?', a: 'The tool attempts to open encrypted PDFs but cannot process files locked with a password. Remove the password first using another tool, then split.' },
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

        <RelatedTools hrefs={['/merge-pdf', '/compress-pdf', '/image-to-pdf', '/remove-metadata']} />
      </main>
    </>
  );
}
