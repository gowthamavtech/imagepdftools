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
        { '@type': 'Question', name: 'Is there a file size limit?', acceptedAnswer: { '@type': 'Answer', text: "There is no hard file size limit since everything runs locally in your browser. Very large PDFs (100+ pages or 200 MB+) may take longer to process depending on your device's speed and available memory." } },
        { '@type': 'Question', name: 'Is my PDF file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs in your browser using WebAssembly and the Canvas API. Your PDF never leaves your device, and we never see its contents.' } },
        { '@type': 'Question', name: 'Which quality setting should I choose?', acceptedAnswer: { '@type': 'Answer', text: "High quality is best for documents you'll print or archive. Medium works well for email attachments and sharing digitally. Low quality gives the smallest file size — ideal when the exact visual quality is less important than file size." } },
        { '@type': 'Question', name: 'Can I compress a password-protected PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Password-protected PDFs cannot be rendered by the browser without the password. Unlock the PDF first using your PDF reader, then compress it here.' } },
        { '@type': 'Question', name: 'How long does compressing a large PDF take?', acceptedAnswer: { '@type': 'Answer', text: 'Processing time depends on the number of pages and your device speed. A typical 20-page document with images takes 10–30 seconds. Very large PDFs (100+ pages) may take a few minutes on a standard laptop.' } },
        { '@type': 'Question', name: 'Does compressing reduce the resolution permanently?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each page is re-rendered at the quality level you choose. The original file is unaffected — always keep a backup of the original before compressing.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PDF',
    desc: 'Drag a PDF onto the zone or click to browse. No file size limit — all processing is local.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="12" y2="18" />
        <line x1="15" y1="15" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Choose a quality level',
    desc: 'High, Medium, or Low. Each page is rendered to canvas and re-encoded as a compressed image.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download the result',
    desc: 'Per-page progress is shown. The compressed PDF downloads directly to your device when done.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
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
    a: "There is no hard file size limit since everything runs locally in your browser. Very large PDFs (100+ pages or 200 MB+) may take longer to process depending on your device's speed and available memory.",
  },
  {
    q: 'Is my PDF file uploaded to a server?',
    a: 'No. Everything runs in your browser using WebAssembly and the Canvas API. Your PDF never leaves your device, and we never see its contents.',
  },
  {
    q: 'Which quality setting should I choose?',
    a: "High quality is best for documents you'll print or archive. Medium works well for email attachments and sharing digitally. Low quality gives the smallest file size — ideal when the exact visual quality is less important than file size.",
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

const QUALITY_ROWS = [
  { level: 'High',   use: 'Print, archive, client-facing reports', size: '10–30% smaller' },
  { level: 'Medium', use: 'Email attachments, everyday sharing',   size: '40–60% smaller' },
  { level: 'Low',    use: 'Internal notes, rough drafts',          size: '60–80% smaller' },
];

export default function CompressPdfPage() {
  return (
    <>
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
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="pdf-tool"
          className="relative"
          style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}
        >
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              right: '-10%', top: '-10%',
              width: 'min(900px, 100vw)', height: 'min(600px, 100vw)',
              background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(48px)',
              opacity: 0.5,
            }}
          />

          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PDF Compressor</span>

            <h1
              className="cp-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Compress PDF online.<br />
              <span className="text-accent">No upload ever.</span>
            </h1>

            <p className="cp-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Each page is rendered locally and re-encoded at your chosen quality level. Your file never leaves your browser.
            </p>

            <p className="cp-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · No upload
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ──────────────────────────────────────────── */}
        <div className={C}>
          <PdfCompressUI />
        </div>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2
              className="serif italic text-fg-1 text-center m-0 mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Three steps. <em className="text-accent">Done in your browser.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc, icon }) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                  <span
                    aria-hidden="true"
                    className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none"
                    style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}
                  >
                    {n}
                  </span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">
                    {title}
                  </h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quality guide table ───────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-6"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Choosing the right <em className="text-accent">quality setting.</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.6] m-0 mb-6 max-w-[60ch]">
              The quality setting controls how aggressively each PDF page is re-compressed. Higher quality means larger files; lower quality means smaller files with softer detail.
            </p>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-elevated">
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Quality</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Best for</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Typical reduction</th>
                  </tr>
                </thead>
                <tbody>
                  {QUALITY_ROWS.map(({ level, use, size }, i) => (
                    <tr key={level} className={i % 2 === 0 ? 'bg-surface' : 'bg-page'}>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="font-data text-[11px] font-bold text-accent">{level}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{use}</td>
                      <td className="px-4 py-3 text-[13px] text-fg-2 font-medium">{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Why compress ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why compress a PDF?
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              PDF files can balloon to enormous sizes when they contain embedded photographs, high-resolution scans, or graphics-heavy slides. A single scanned contract can easily reach 20–30 MB — well above the 10 MB limit most email providers enforce on attachments.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">
              Compressing a PDF before sharing removes that friction entirely. Whether you&apos;re sending a quote, submitting an assignment, uploading to a government portal, or archiving invoices — a smaller PDF is universally easier to handle.
            </p>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Email attachments.', text: 'Gmail, Outlook, and most providers limit attachments to 10–25 MB. Compress first and it attaches without issues.' },
                { label: 'WhatsApp and messaging apps.', text: 'WhatsApp limits document sharing to 100 MB, and large files take minutes over mobile data. A compressed PDF sends in seconds.' },
                { label: 'University and government portals.', text: 'Many submission systems impose strict limits — often 5 MB or less. A compressed PDF almost always fits.' },
                { label: 'Embedding PDFs on websites.', text: 'Web-embedded PDFs load faster when smaller, improving the experience for visitors on mobile connections.' },
                { label: 'Cloud storage savings.', text: 'If you archive large volumes of PDFs, compression can cut your storage footprint by half or more.' },
              ].map(({ label, text }) => (
                <li key={label} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] text-fg-2 leading-[1.55]">
                    <strong className="font-medium text-fg-1">{label}</strong> {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works (technical) ──────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              How it works <em className="text-accent">under the hood.</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              Unlike most online compressors that upload your file to a remote server, our tool runs entirely inside your browser tab. When you drop a PDF, it uses{' '}
              <strong className="font-medium text-fg-1">PDF.js</strong> (Mozilla&apos;s open-source library) to render each page as a canvas element, then re-encodes every page as a compressed JPEG image before bundling the result using{' '}
              <strong className="font-medium text-fg-1">jsPDF</strong>.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0">
              Your PDF never leaves your device. There is no upload, no server, and no risk of your confidential documents being stored or accessed by anyone else.
            </p>
          </div>
        </section>

        {/* ── Privacy card ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div
                aria-hidden="true"
                className="absolute top-[-1px] left-[8%] right-[8%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }}
              />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">
                Privacy by architecture
              </p>
              <h2
                className="serif italic text-fg-1 m-0 mb-4"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Your PDF never leaves your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                Most online PDF tools upload your document to a server for processing. This tool is architecturally different: every page is rendered and re-encoded by your own CPU using PDF.js and the Canvas API. No server receives your document at any stage.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Open-source processing: PDF.js (Mozilla) and jsPDF',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg-2">
                    <span
                      className="shrink-0 w-4 h-4 rounded-full grid place-items-center"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                      aria-hidden="true"
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Back to tool nudge ────────────────────────────── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a
            href="#pdf-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2
              className="serif italic text-fg-1 m-0 mb-8"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Frequently asked questions
            </h2>

            <div className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/image-to-pdf', '/compress-image', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
