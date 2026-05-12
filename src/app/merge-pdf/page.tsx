import type { Metadata } from 'next';
import { MergePdfUI } from '@/components/MergePdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Merge PDF Online — Combine PDF Files Free',
  description:
    'Merge multiple PDF files into one in seconds. Drag to reorder, rotate pages, preview before saving — all inside your browser. No upload, no account, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/merge-pdf' },
  openGraph: {
    title: 'Merge PDF Online — Combine PDF Files Free',
    description: 'Combine multiple PDF files into one in your browser. Drag to reorder, rotate pages, unlock password-protected PDFs — no upload required.',
    url: 'https://imagepdf.tools/merge-pdf',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Merge PDF — ImagePDF.Tools',
      url: 'https://imagepdf.tools/merge-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      featureList: [
        'Merge unlimited PDF files',
        'Drag-and-drop reordering',
        'Per-page rotation',
        'Password-protected PDF support',
        'Preview before saving',
        'No file upload — 100% private',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Free online PDF merger. Combine multiple PDFs into one in your browser — drag to reorder, rotate pages, unlock encrypted PDFs, preview the result, then save locally.',
    },
    {
      '@type': 'HowTo',
      name: 'How to merge PDF files online',
      totalTime: 'PT1M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Add PDFs', text: 'Drop two or more PDF files onto the tool, or click Browse PDFs. Use the + card to add more files at any time.' },
        { '@type': 'HowToStep', position: 2, name: 'Reorder and rotate', text: 'Drag cards to set the final page order. Use the rotate button on each card to rotate pages 90°. Unlock password-protected PDFs by entering the password directly on the card.' },
        { '@type': 'HowToStep', position: 3, name: 'Merge and save', text: 'Click Merge PDFs. Preview the result, then click Save PDF to download to your device.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many PDFs can I merge at once?',
          acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit. You can merge as many files as your browser memory allows. Very large batches (hundreds of pages or several hundred MB) may take a little longer on lower-spec devices.' },
        },
        {
          '@type': 'Question',
          name: 'Does merging reduce PDF quality?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. The tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text stays selectable, images keep their original quality, and fonts are preserved exactly as in the source files.' },
        },
        {
          '@type': 'Question',
          name: 'Can I merge password-protected PDFs?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enter the password directly on the file card and the tool unlocks it for merging. The password is never sent anywhere — decryption happens locally in your browser.' },
        },
        {
          '@type': 'Question',
          name: 'Can I rotate pages before merging?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each card has a rotate button that rotates that PDF\'s pages by 90° clockwise. The rotation is applied to the output document, not just the preview.' },
        },
        {
          '@type': 'Question',
          name: 'Is my PDF uploaded to a server?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. All processing — merging, rotating, decryption — happens entirely in your browser using pdf-lib and PDF.js. Your files never leave your device.' },
        },
        {
          '@type': 'Question',
          name: 'Can I preview the merged PDF before downloading?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. After merging, click Preview to see the full document in a modal viewer before saving it to your device.' },
        },
      ],
    },
  ],
};

const features = [
  { icon: '⇅', label: 'Drag to reorder' },
  { icon: '↻', label: 'Rotate pages' },
  { icon: '🔒', label: 'Password-protected PDFs' },
  { icon: '◎', label: 'Preview before saving' },
  { icon: '✦', label: 'No file limit' },
  { icon: '⬡', label: '100% in-browser' },
];

export default function MergePdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-12 sm:pt-18 pb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            No upload &middot; 100% Private &middot; Free
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Merge PDF Files{' '}
            <span className="italic bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
              Online
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Combine multiple PDFs into one. Drag to reorder, rotate pages, unlock encrypted files — then preview and save. Everything runs inside your browser. Nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {features.map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
                <span className="text-violet-500">{icon}</span>
                {label}
              </span>
            ))}
          </div>

          <MergePdfUI />
        </div>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 pb-24 mt-6">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why merge PDF files?</h2>
              <p className="mb-3">
                Sending five separate attachments when one clean document would do is a friction point everyone recognises. PDF merging solves it — combine a contract body with its appendices, bundle monthly invoices for your accountant, or collapse a scanner&apos;s one-page-per-file output into a single archive. One file is easier to share, easier to sign, and easier to store.
              </p>
              <p>
                Most online PDF mergers upload your files to a third-party server — meaning contracts, invoices, medical records, and financial statements pass through infrastructure you do not control. This tool runs entirely in your browser using <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong> and <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong>. Your files never leave your device at any point.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What this tool can do</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Drag-and-drop reordering.</strong> Drag any card to change the sequence. A numbered badge always shows the final order so there is no guesswork.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Per-file rotation.</strong> Rotate any PDF&apos;s pages 90° clockwise before merging — useful for scanned pages that came out sideways.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Password-protected PDFs.</strong> Enter the password directly on the card. The tool decrypts the file in your browser using PDF.js and includes it in the merge.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Thumbnail previews.</strong> Every card shows a rendered preview of the first page so you can confirm you have the right file before merging.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Preview before saving.</strong> After merging, open the full document in a modal viewer to check it before committing to a save.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Edit after merging.</strong> Not happy with the result? Click Edit on the result card to go straight back to the file list — no re-uploading required.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Contracts and agreements.</strong> Combine a contract body, appendices, and signature pages into one document for signing or archival.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Invoices and receipts.</strong> Bundle multiple invoices into a single PDF for accounting, expense reports, or submission to a finance team.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Scanned documents.</strong> Scanners often produce one PDF per page — merge them into a single multi-page document.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Application packets.</strong> Combine a CV, cover letter, portfolio, and certificates into one file for job applications.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Reports and presentations.</strong> Merge chapter exports or slide handouts into one complete document for distribution.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Research and study notes.</strong> Merge lecture slides, papers, and personal notes into a single reference file.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How it works under the hood</h2>
              <p className="mb-3">
                When you add files, <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong> renders the first page of each file to a canvas and creates a JPEG thumbnail — entirely in your browser, with no upload. For password-protected files, PDF.js decrypts the content locally using the password you provide.
              </p>
              <p className="mb-4">
                When you click Merge, <strong className="text-slate-800 dark:text-slate-200">pdf-lib</strong> copies the raw page objects from each source PDF into a new output document. No page is re-rendered or re-compressed, so text stays selectable, images keep their original resolution, and fonts are preserved exactly as they appear in the originals. Any rotation you applied is written into the page&apos;s rotation metadata in the output file. The finished PDF is created as a Blob directly in your browser and offered via a Save As dialog — no server involved at any stage.
              </p>
              <div className="flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-amber-800 dark:text-amber-300">
                  <strong>Processing happens on your device.</strong> Because no files are uploaded, all the work is done by your computer or phone — not our servers. Larger files or batches with many pages may take longer depending on your device&apos;s speed and available memory. If things feel slow, give it a moment — it&apos;s working.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How many PDFs can I merge at once?',
                    a: 'There is no hard limit. You can merge as many files as your browser memory allows. Very large batches (hundreds of pages or several hundred MB) may take a little longer on lower-spec devices.',
                  },
                  {
                    q: 'Does merging reduce PDF quality?',
                    a: 'No. The tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text stays selectable, images keep their original resolution, and fonts are preserved exactly as in the source files.',
                  },
                  {
                    q: 'Can I merge password-protected PDFs?',
                    a: 'Yes. Enter the password on the file card and the tool unlocks the file for merging. Decryption happens locally in your browser — the password is never sent anywhere.',
                  },
                  {
                    q: 'Can I rotate pages before merging?',
                    a: "Yes. Each card has a rotate button that rotates that file's pages 90° clockwise. The rotation is written into the output PDF's page metadata, not just the thumbnail preview.",
                  },
                  {
                    q: 'Is my PDF uploaded to a server?',
                    a: 'No. All processing — merging, rotating, decryption, thumbnail rendering — happens entirely in your browser. Your files never leave your device.',
                  },
                  {
                    q: 'Can I preview the merged PDF before downloading?',
                    a: 'Yes. After merging, click Preview to open the full document in a viewer. If you spot an issue, click Edit to go back to the file list without losing your files.',
                  },
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
