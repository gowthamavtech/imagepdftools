import type { Metadata } from 'next';
import { SplitPdfUI } from '@/components/SplitPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Split PDF Online — Free, Private & Instant',
  description:
    'Split a PDF into separate files or extract specific pages — all inside your browser. Pick individual pages or define ranges like 1-5, 8, 12-15. No upload, no account, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/split-pdf' },
  openGraph: {
    title: 'Split PDF Online — Free, Private & Instant',
    description: 'Extract pages or split a PDF into multiple files entirely in your browser. No upload, no server — your file never leaves your device.',
    url: 'https://imagepdf.tools/split-pdf',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Split PDF — ImagePDF.Tools',
      url: 'https://imagepdf.tools/split-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      featureList: [
        'Extract individual pages',
        'Split by custom page ranges',
        'Visual page thumbnail grid',
        'Drag-select pages',
        'Download as ZIP when splitting into multiple parts',
        'No file upload — 100% private',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Free online PDF splitter. Extract pages or split by range — all in your browser. Your file never leaves your device.',
    },
    {
      '@type': 'HowTo',
      name: 'How to split a PDF online',
      totalTime: 'PT1M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF file onto the tool or click Browse PDF. Thumbnails of every page render automatically in your browser.' },
        { '@type': 'HowToStep', position: 2, name: 'Choose pages or ranges', text: 'In Select Pages mode, click thumbnails to pick pages — or drag across multiple thumbnails to select a range. Switch to Split by Range and type ranges like 1-5, 8, 12-15 to produce separate files.' },
        { '@type': 'HowToStep', position: 3, name: 'Save your files', text: 'Click Extract or Split. Single-file results download immediately. Multiple parts are bundled into a ZIP file for easy saving.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I extract just a few pages from a large PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Select Pages mode — click or drag across the page thumbnails to pick any pages, then click Extract. The result is a new PDF containing only your selected pages.' } },
        { '@type': 'Question', name: 'Can I split a PDF into multiple separate files?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Split by Range and type comma-separated ranges, e.g. "1-5, 6-10, 11-20". Each range becomes its own PDF. If you create more than one part, they are also bundled as a ZIP for convenient downloading.' } },
        { '@type': 'Question', name: 'Does splitting affect the PDF quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Pages are copied directly from the source PDF using pdf-lib without any re-rendering. Text stays selectable, images keep their original quality, and fonts are preserved exactly.' } },
        { '@type': 'Question', name: 'Is my PDF uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens locally in your browser using PDF.js and pdf-lib. Your file never leaves your device — we never see it.' } },
        { '@type': 'Question', name: 'Can I split a password-protected PDF?', acceptedAnswer: { '@type': 'Answer', text: 'The tool will prompt you for the password and decrypt the file locally in your browser. If the encryption algorithm is unsupported, remove the password first using another tool, then split.' } },
        { '@type': 'Question', name: 'Can I preview pages before extracting?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every page is rendered as a thumbnail. Tap the eye icon on any thumbnail to open a full-size preview with previous and next navigation before you commit to your selection.' } },
      ],
    },
  ],
};

const features = [
  { icon: '⊞', label: 'Page thumbnail grid' },
  { icon: '⬚', label: 'Drag-select pages' },
  { icon: '◫', label: 'Split by range' },
  { icon: '◎', label: 'Preview before saving' },
  { icon: '⬡', label: 'Download as ZIP' },
  { icon: '✦', label: '100% in-browser' },
];

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
            Extract individual pages or split into multiple parts by range. Preview every page before you save. Everything runs in your browser — nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {features.map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
                <span className="text-blue-500">{icon}</span>
                {label}
              </span>
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
                PDFs are often delivered as single monolithic files — a full contract with appendices, a scanned book, a year&apos;s worth of invoices bundled together. But the recipient usually only needs a specific section, and the full document may be too large to email or impractical to store alongside other records.
              </p>
              <p>
                Splitting lets you extract exactly what you need: the signed page of a contract, a single chapter from a 300-page report, or one month&apos;s invoice from a bundle of twelve. The output is a clean, standalone PDF — identical in quality to the original.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What this tool can do</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Select Pages mode.</strong> Thumbnails of every page render in your browser. Click individual pages to toggle them on or off, or hold and drag across multiple thumbnails to select a run of pages in one gesture — works on desktop and mobile.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Split by Range mode.</strong> Type comma-separated page ranges such as <code className="text-[11px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">1-5, 6-10, 11-20</code>. Each range is saved as its own PDF. If you produce more than one part, they are also bundled into a ZIP for easy downloading.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Page preview lightbox.</strong> Tap the eye icon on any thumbnail to open a full-size preview with prev/next navigation so you can confirm the content before committing to your selection.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Original quality preserved.</strong> pdf-lib copies page objects directly — no re-rendering, no recompression. Text stays selectable and images keep their original resolution.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Password-protected PDFs.</strong> The tool prompts for the password and decrypts the file locally in your browser before splitting. The password is never transmitted.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Extracting a signed page.</strong> Pull just the signature page from a contract to attach to an email without sending the full document.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Splitting a scanned book.</strong> Divide a 300-page scan into chapters for easier reading or distribution.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Isolating individual invoices.</strong> When your accounting software generates one PDF for 12 months of invoices, split them into separate files for each month.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Sharing a specific section.</strong> If a PDF is too large to email, extract only the relevant pages and send that portion instead.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Separating appendices.</strong> Pull supporting annexes from a main report so each can be stored and referenced independently.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Preparing application packets.</strong> Extract specific pages from a multi-section form to submit only the parts required by each recipient.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How it works under the hood</h2>
              <p className="mb-4">
                When you drop a PDF, <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong> reads the file entirely in your browser and renders a thumbnail of each page to a canvas at low resolution — fast enough to show previews for a 100-page document in a few seconds. Tapping the eye icon triggers a hi-res render of that specific page at 1.8× scale, cached so subsequent views are instant. No data leaves your device at any point during thumbnail generation.
              </p>
              <p className="mb-4">
                When you click Extract or Split, <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong> copies the selected page objects from the source PDF into a new output document — without re-rendering or recompressing anything. Text remains selectable, images keep their original resolution, and embedded fonts are preserved exactly. The resulting files are created as Blobs in memory and offered via a Save dialog directly from your browser.
              </p>
              <div className="flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-amber-800 dark:text-amber-300">
                  <strong>Processing happens on your device.</strong> Because no files are uploaded, all the work is done by your computer or phone — not our servers. Large PDFs with many pages may take a moment to render thumbnails, depending on your device&apos;s speed and available memory. If things feel slow, give it a moment — it&apos;s working.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Can I extract just a few pages from a large PDF?', a: 'Yes. Use Select Pages mode — click or drag across the page thumbnails to pick any pages, then click Extract. The result is a new PDF containing only your selected pages.' },
                  { q: 'Can I split a PDF into multiple separate files?', a: 'Yes. Use Split by Range and type comma-separated ranges, e.g. "1-5, 6-10, 11-20". Each range becomes its own PDF. If you create more than one part, they are also bundled as a ZIP for convenient downloading.' },
                  { q: 'Does splitting affect the PDF quality?', a: 'No. Pages are copied directly from the source PDF using pdf-lib without any re-rendering. Text stays selectable, images keep their original quality, and fonts are preserved exactly.' },
                  { q: 'Is my PDF uploaded to a server?', a: 'No. All processing happens locally in your browser using PDF.js and pdf-lib. Your file never leaves your device — we never see it.' },
                  { q: 'Can I split a password-protected PDF?', a: 'The tool will prompt you for the password and decrypt the file locally in your browser. If the encryption algorithm is unsupported, remove the password first using another tool, then split.' },
                  { q: 'Can I preview pages before extracting?', a: 'Yes. Every page is rendered as a thumbnail. Tap the eye icon on any thumbnail to open a full-size preview with previous and next navigation before you commit to your selection.' },
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
