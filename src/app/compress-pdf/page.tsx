import type { Metadata } from 'next';
import { PdfCompressUI } from '@/components/PdfCompressUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress PDF Online — Free & Private',
  description: 'Reduce PDF file size in your browser. No upload, no server — renders each page and recompresses at your chosen quality. 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PDF Compressor',
      url: 'https://imagepdf.tools/compress-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF compressor that runs entirely in your browser. No upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress a PDF online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF file onto the upload zone or click to browse.' },
        { '@type': 'HowToStep', text: 'Choose a quality level: High, Medium, or Low.' },
        { '@type': 'HowToStep', text: 'Wait for each page to be processed, then download your smaller PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can I reduce my PDF size?', acceptedAnswer: { '@type': 'Answer', text: 'Results vary depending on the content. PDFs with large embedded images (photos, scans) typically compress by 50–80%. PDFs that are mostly text see smaller reductions of 10–30%, because text data is already efficient.' } },
        { '@type': 'Question', name: 'Will the text in my PDF still be selectable after compression?', acceptedAnswer: { '@type': 'Answer', text: 'Our compressor re-renders each page as an image, so the output is a flattened image-based PDF. Text will not be selectable. If you need selectable text, choose the High quality setting to preserve legibility.' } },
        { '@type': 'Question', name: 'Is there a file size limit?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard file size limit since everything runs locally in your browser. Very large PDFs (100+ pages or 200 MB+) may take longer to process depending on your device\'s speed and available memory.' } },
        { '@type': 'Question', name: 'Is my PDF file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs in your browser using WebAssembly and the Canvas API. Your PDF never leaves your device, and we never see its contents.' } },
        { '@type': 'Question', name: 'Which quality setting should I choose?', acceptedAnswer: { '@type': 'Answer', text: 'High quality is best for documents you\'ll print or archive. Medium works well for email attachments and sharing digitally. Low quality gives the smallest file size — ideal when the exact visual quality is less important than file size.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'How much can I reduce my PDF size?',
    a: 'Results vary depending on the content. PDFs with large embedded images (photos, scans) typically compress by 50–80%. PDFs that are mostly text see smaller reductions of 10–30%, because text data is already efficient.',
  },
  {
    q: 'Will the text in my PDF still be selectable after compression?',
    a: 'Our compressor re-renders each page as an image, so the output is a flattened image-based PDF. Text will not be selectable. If you need selectable text, choose the High quality setting to preserve legibility.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'There is no hard file size limit since everything runs locally in your browser. Very large PDFs (100+ pages or 200 MB+) may take longer to process depending on your device\'s speed and available memory.',
  },
  {
    q: 'Is my PDF file uploaded to a server?',
    a: 'No. Everything runs in your browser using WebAssembly and the Canvas API. Your PDF never leaves your device, and we never see its contents.',
  },
  {
    q: 'Which quality setting should I choose?',
    a: 'High quality is best for documents you\'ll print or archive. Medium works well for email attachments and sharing digitally. Low quality gives the smallest file size — ideal when the exact visual quality is less important than file size.',
  },
];

export default function CompressPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-2xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Compress <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">PDF</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Shrink any PDF by re-rendering each page at your chosen quality level. Everything runs in your browser — your file never leaves your device.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['High / Medium / Low quality', 'Per-page progress', 'No file size limit', 'No upload needed', 'Free forever'].map((f) => (
              <span key={f} className="text-xs text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-white/8 px-2.5 py-1 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        <PdfCompressUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why compress a PDF?</h2>
              <p className="mb-3">
                PDF files can balloon to enormous sizes when they contain embedded photographs, high-resolution scans, or graphics-heavy slides. A single scanned contract can easily reach 20–30 MB — well above the 10 MB limit most email providers enforce on attachments. Even cloud storage services warn you once your PDFs start consuming gigabytes.
              </p>
              <p>
                Compressing a PDF before sharing it removes that friction entirely. Whether you are sending a quote to a client, submitting a university assignment, uploading to a government portal, or archiving years of invoices, a smaller PDF is universally easier to handle.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common situations where PDF compression helps</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Gmail, Outlook, and most email providers limit attachments to 10–25 MB. Compress your PDF first and it will attach without issues.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WhatsApp and messaging apps.</strong> WhatsApp limits document sharing to 100 MB, and large files can take minutes to send over mobile data. A compressed PDF sends in seconds.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">University and government portals.</strong> Many online submission systems impose strict file size limits — often 5 MB or less. A compressed PDF almost always fits within these limits.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Embedding PDFs on websites.</strong> Web-embedded PDFs load faster when they are smaller, improving the experience for visitors on mobile connections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Cloud storage savings.</strong> If you archive large volumes of PDF documents, compression can cut your storage footprint by half or more.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Printing companies and prepress workflows.</strong> Many print providers have upload limits on their portals. Compressing your file to fit within those limits saves you from exporting manually.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How our PDF compressor works</h2>
              <p className="mb-3">
                Unlike most online PDF compressors that upload your file to a remote server, process it, and send it back, our tool runs entirely inside your browser tab. When you drop a PDF, the tool uses <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong> (Mozilla&apos;s open-source library) to render each page as a canvas element, then re-encodes every page as a compressed JPEG image before bundling the result into a new PDF using <strong className="text-slate-800 dark:text-slate-200">jsPDF</strong>.
              </p>
              <p>
                This approach means your PDF never leaves your device. There is no upload, no server, and no risk of your confidential documents being stored or accessed by anyone else. The compression is done entirely by your CPU in the browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Choosing the right quality setting</h2>
              <p className="mb-3">
                The quality slider controls how aggressively each PDF page is re-compressed. Here is a practical guide:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">High quality.</strong> Minimal compression, best for documents you will print, archive, or share with clients where presentation matters — reports, portfolios, brochures.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Medium quality.</strong> Good balance for everyday sharing — email attachments, WhatsApp, general business documents. Typically reduces size by 40–60%.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Low quality.</strong> Maximum compression. Text may appear slightly soft at close zoom levels but is fully legible at normal reading size. Best for internal notes, rough drafts, or situations where you only need the information, not print-perfect visuals.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Tips for the best compression results</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li>If your PDF is mostly text, start with High quality — the file is already compact and aggressive compression adds little benefit.</li>
                <li>For scanned documents (photographs of paper), Medium or Low quality can reduce file size dramatically with no meaningful loss of legibility.</li>
                <li>If your PDF is a presentation with large embedded photos, Medium quality typically achieves the best size-to-quality ratio.</li>
                <li>Compare the original and compressed versions before sending to make sure charts, tables, and fine print are still clearly readable at 100% zoom.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {FAQS.map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/image-to-pdf', '/compress-image', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
