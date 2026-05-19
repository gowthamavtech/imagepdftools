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
      description: 'Free online PDF splitter. Extract pages or split by range — all in your browser. Your file never leaves your device.',
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

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Upload your PDF',
    desc: 'Drop your PDF onto the tool or click Browse. Thumbnails of every page render automatically in your browser.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Choose pages or ranges',
    desc: 'Click thumbnails to pick pages, or drag to select a range. Switch to Split by Range and type ranges like 1-5, 8, 12-15.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="6" height="8" rx="1" />
        <rect x="10" y="3" width="6" height="8" rx="1" />
        <rect x="18" y="3" width="4" height="8" rx="1" />
        <rect x="2" y="14" width="4" height="7" rx="1" />
        <rect x="9" y="14" width="6" height="7" rx="1" />
        <rect x="18" y="14" width="4" height="7" rx="1" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Save your files',
    desc: 'Click Extract or Split. Single results download immediately. Multiple parts are bundled into a ZIP file.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FEATURES = [
  { label: 'Select Pages mode', desc: 'Click individual thumbnails or drag across multiple to select a range. Works on desktop and mobile.' },
  { label: 'Split by Range mode', desc: 'Type comma-separated ranges like 1-5, 6-10, 11-20. Each range becomes its own PDF file.' },
  { label: 'Page preview lightbox', desc: 'Tap the eye icon on any thumbnail to open a full-size preview with prev/next navigation before committing.' },
  { label: 'Original quality preserved', desc: 'pdf-lib copies page objects directly — no re-rendering, no recompression. Text stays selectable.' },
  { label: 'Password-protected PDFs', desc: 'The tool prompts for the password and decrypts locally in your browser before splitting.' },
  { label: 'ZIP download', desc: 'When you produce multiple parts, they are bundled into a ZIP for convenient one-click downloading.' },
];

const USE_CASES = [
  { label: 'Extracting a signed page', desc: 'Pull just the signature page from a contract to attach to an email without sending the full document.' },
  { label: 'Splitting a scanned book', desc: 'Divide a 300-page scan into chapters for easier reading or distribution.' },
  { label: 'Isolating individual invoices', desc: 'When your accounting software generates one PDF for 12 months of invoices, split them into separate files.' },
  { label: 'Sharing a specific section', desc: 'If a PDF is too large to email, extract only the relevant pages and send that portion instead.' },
  { label: 'Separating appendices', desc: 'Pull supporting annexes from a main report so each can be stored and referenced independently.' },
  { label: 'Preparing application packets', desc: 'Extract specific pages from a multi-section form to submit only the parts required by each recipient.' },
];

const FAQS = [
  {
    q: 'Can I extract just a few pages from a large PDF?',
    a: 'Yes. Use Select Pages mode — click or drag across the page thumbnails to pick any pages, then click Extract. The result is a new PDF containing only your selected pages.',
  },
  {
    q: 'Can I split a PDF into multiple separate files?',
    a: 'Yes. Use Split by Range and type comma-separated ranges, e.g. "1-5, 6-10, 11-20". Each range becomes its own PDF. If you create more than one part, they are also bundled as a ZIP for convenient downloading.',
  },
  {
    q: 'Does splitting affect the PDF quality?',
    a: 'No. Pages are copied directly from the source PDF using pdf-lib without any re-rendering. Text stays selectable, images keep their original quality, and fonts are preserved exactly.',
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. All processing happens locally in your browser using PDF.js and pdf-lib. Your file never leaves your device — we never see it.',
  },
  {
    q: 'Can I split a password-protected PDF?',
    a: 'The tool will prompt you for the password and decrypt the file locally in your browser. If the encryption algorithm is unsupported, remove the password first using another tool, then split.',
  },
  {
    q: 'Can I preview pages before extracting?',
    a: 'Yes. Every page is rendered as a thumbnail. Tap the eye icon on any thumbnail to open a full-size preview with previous and next navigation before you commit to your selection.',
  },
];

export default function SplitPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="split-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Split PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Extract pages.<br /><span className="text-accent">Split by range.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Pull individual pages or split into multiple parts by range. Preview every page before you save — all inside your browser.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <SplitPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Exactly the pages you need.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc, icon }) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                  <span aria-hidden="true" className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none" style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}>{n}</span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Features</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Two modes. <em className="text-accent">Full control.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(({ label, desc }) => (
                <div key={label} className="rounded-[10px] bg-surface bd-2 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <h3 className="text-[14px] font-semibold text-fg-1 m-0 leading-snug">{label}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Use cases</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              When splitting a PDF <em className="text-accent">is the answer.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {USE_CASES.map(({ label, desc }) => (
                <div key={label} className="rounded-[10px] bg-surface bd-2 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <h3 className="text-[14px] font-semibold text-fg-1 m-0 leading-snug">{label}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Under the hood ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How splitting actually works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              When you drop a PDF, PDF.js reads the file entirely in your browser and renders a thumbnail of each page to a canvas at low resolution — fast enough to show previews for a 100-page document in seconds. Tapping the eye icon triggers a high-res render of that specific page, cached so subsequent views are instant.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-6">
              When you click Extract or Split, pdf-lib copies the selected page objects from the source PDF into a new output document — without re-rendering or recompressing anything. Text remains selectable, images keep their original resolution, and embedded fonts are preserved exactly. The resulting files are created as Blobs in memory and offered via a Save dialog directly from your browser.
            </p>
            <div className="rounded-[10px] bg-surface bd-2 px-6 py-5 flex gap-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[13px] leading-[1.7] text-fg-2 m-0">
                Processing happens on your device. Large PDFs with many pages may take a moment to render thumbnails, depending on your device speed and available memory. If things feel slow, give it a moment — it&apos;s working.
              </p>
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your PDF never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'All splitting and extraction runs locally via PDF.js and pdf-lib',
                  'No file data is transmitted to any server, logged, or stored',
                  'Passwords for encrypted PDFs never leave your device',
                  'Close the tab and your file is gone — nothing persists',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[13.5px] leading-[1.6] text-fg-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Back to tool nudge ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#split-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to tool
          </a>
        </div>

        {/* ── FAQ ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Frequently asked questions</h2>
            <div className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/merge-pdf', '/compress-pdf', '/image-to-pdf', '/remove-metadata']} />

      </main>
    </>
  );
}
