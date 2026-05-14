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
        { '@type': 'Question', name: 'Can I compress a password-protected PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Password-protected PDFs cannot be rendered by the browser without the password. Unlock the PDF first using your PDF reader, then compress it here.' } },
        { '@type': 'Question', name: 'How long does compressing a large PDF take?', acceptedAnswer: { '@type': 'Answer', text: 'Processing time depends on the number of pages and your device speed. A typical 20-page document with images takes 10–30 seconds. Very large PDFs (100+ pages) may take a few minutes on a standard laptop.' } },
        { '@type': 'Question', name: 'Does compressing reduce the resolution permanently?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each page is re-rendered at the quality level you choose. The original file is unaffected — always keep a backup of the original before compressing.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your PDF',
    desc: 'Drag a PDF file onto the zone or click to browse. No file size limit — all processing is local.',
  },
  {
    n: '02',
    title: 'Choose a quality level',
    desc: 'High, Medium, or Low. Each page is rendered to canvas and re-encoded as a compressed image.',
  },
  {
    n: '03',
    title: 'Download the result',
    desc: 'Per-page progress is shown. The compressed PDF downloads directly to your device when done.',
  },
];

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
  {
    q: 'Can I compress a password-protected PDF?',
    a: 'Password-protected PDFs cannot be rendered by the browser without the password. Unlock the PDF first using your PDF reader, then compress it here.',
  },
  {
    q: 'How long does compressing a large PDF take?',
    a: 'Processing time depends on the number of pages and your device speed. A typical 20-page document with images takes 10–30 seconds. Very large PDFs (100+ pages) may take a few minutes on a standard laptop.',
  },
  {
    q: 'Does compressing reduce the resolution permanently?',
    a: 'Yes. Each page is re-rendered at the quality level you choose. The original file is unaffected — always keep a backup of the original before compressing.',
  },
];

export default function CompressPdfPage() {
  return (
    <>
      {/* Page-load entrance animations — CSS only, respects prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cp-h1  { opacity: 0; transform: translateY(10px); }
            .cp-sub { opacity: 0; transform: translateY(10px); }
            .cp-trust { opacity: 0; }
          }
          .cp-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cp-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cp-trust {
            transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms;
          }
          @keyframes cp-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .cp-fact { animation: cp-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .cp-fact:nth-child(1) { animation-delay: 240ms; }
          .cp-fact:nth-child(2) { animation-delay: 290ms; }
          .cp-fact:nth-child(3) { animation-delay: 340ms; }
          .cp-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div id="pdf-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="cp-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Compress PDF Online
          </h1>
          <p className="cp-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Shrink any PDF by re-rendering each page at your chosen quality level. Everything runs in your browser — your file never leaves your device.
          </p>
          <p className="cp-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        <PdfCompressUI />

        {/* ── Trust strip ──────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {[
                'Zero bytes sent to any server',
                'PDF.js + jsPDF run locally in your browser',
                'Free with no account required',
                'No file size limit',
              ].map((fact) => (
                <li key={fact} className="cp-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section
          aria-labelledby="cp-how-heading"
          className="bg-[#F7F8FC] dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="cp-how-heading"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-10"
            >
              Three steps. Processed entirely on your device.
            </h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}
                >
                  <span
                    className="block text-[11px] font-bold tracking-[0.16em] mb-3"
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content block ────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Why compress a PDF?
              </h2>
              <p className="mb-3">
                PDF files can balloon to enormous sizes when they contain embedded photographs, high-resolution scans, or graphics-heavy slides. A single scanned contract can easily reach 20–30 MB — well above the 10 MB limit most email providers enforce on attachments. Even cloud storage services warn you once your PDFs start consuming gigabytes.
              </p>
              <p>
                Compressing a PDF before sharing it removes that friction entirely. Whether you are sending a quote to a client, submitting a university assignment, uploading to a government portal, or archiving years of invoices, a smaller PDF is universally easier to handle.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Common situations where PDF compression helps
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Gmail, Outlook, and most email providers limit attachments to 10–25 MB. Compress your PDF first and it will attach without issues.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WhatsApp and messaging apps.</strong> WhatsApp limits document sharing to 100 MB, and large files can take minutes to send over mobile data. A compressed PDF sends in seconds.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">University and government portals.</strong> Many online submission systems impose strict file size limits — often 5 MB or less. A compressed PDF almost always fits within these limits.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Embedding PDFs on websites.</strong> Web-embedded PDFs load faster when they are smaller, improving the experience for visitors on mobile connections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Cloud storage savings.</strong> If you archive large volumes of PDF documents, compression can cut your storage footprint by half or more.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Printing companies and prepress workflows.</strong> Many print providers have upload limits on their portals. Compressing your file to fit within those limits saves you from exporting manually.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                How our PDF compressor works
              </h2>
              <p className="mb-3">
                Unlike most online PDF compressors that upload your file to a remote server, process it, and send it back, our tool runs entirely inside your browser tab. When you drop a PDF, the tool uses <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong> (Mozilla&apos;s open-source library) to render each page as a canvas element, then re-encodes every page as a compressed JPEG image before bundling the result into a new PDF using <strong className="text-slate-800 dark:text-slate-200">jsPDF</strong>.
              </p>
              <p>
                This approach means your PDF never leaves your device. There is no upload, no server, and no risk of your confidential documents being stored or accessed by anyone else. The compression is done entirely by your CPU in the browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Choosing the right quality setting
              </h2>
              <p className="mb-5">
                The quality setting controls how aggressively each PDF page is re-compressed. Here is a practical guide:
              </p>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">High quality.</strong> Minimal compression, best for documents you will print, archive, or share with clients where presentation matters — reports, portfolios, brochures.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Medium quality.</strong> Good balance for everyday sharing — email attachments, WhatsApp, general business documents. Typically reduces size by 40–60%.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Low quality.</strong> Maximum compression. Text may appear slightly soft at close zoom levels but is fully legible at normal reading size. Best for internal notes, rough drafts, or situations where you only need the information, not print-perfect visuals.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Tips for the best compression results
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li>If your PDF is mostly text, start with High quality — the file is already compact and aggressive compression adds little benefit.</li>
                <li>For scanned documents (photographs of paper), Medium or Low quality can reduce file size dramatically with no meaningful loss of legibility.</li>
                <li>If your PDF is a presentation with large embedded photos, Medium quality typically achieves the best size-to-quality ratio.</li>
                <li>Compare the original and compressed versions before sending to make sure charts, tables, and fine print are still clearly readable at 100% zoom.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Privacy callout ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: 'oklch(70% 0.158 293)' }}
            >
              Privacy by architecture
            </p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
              Your PDF never leaves your browser.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch] mb-6">
              Most online PDF tools upload your document to a server for processing. This tool is architecturally different: every page is rendered and re-encoded by your own CPU using PDF.js and the Canvas API. There is no server that receives your document at any stage.
            </p>
            <ul className="space-y-2.5">
              {[
                'No file data transmitted over the network at any point',
                'No account, sign-in, or email required to use any feature',
                'Closing the tab clears all data from browser memory completely',
                'Open-source processing: PDF.js (Mozilla) and jsPDF',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Mid-page nudge ────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-[#F7F8FC] dark:bg-[#0C0C1A] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The compressor is at the top of this page.
          </p>
          <a
            href="#pdf-tool"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
            style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cp-faq-heading"
          className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 id="cp-faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">
              Frequently asked questions
            </h2>
            <dl className="divide-y divide-slate-100 dark:divide-white/5">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RelatedTools hrefs={['/image-to-pdf', '/compress-image', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
