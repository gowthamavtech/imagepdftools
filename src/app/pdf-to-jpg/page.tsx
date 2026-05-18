import type { Metadata } from 'next';
import { PdfToJpgUI } from '@/components/PdfToJpgUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PDF to JPG — Convert PDF Pages to Images Free',
  description:
    'Convert every page of a PDF to high-quality JPG images — all in your browser. No upload, no server, 100% private. Download individually or as a ZIP.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-to-jpg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PDF to JPG',
      url: 'https://imagepdf.tools/pdf-to-jpg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF to JPG converter. Convert each page to a JPEG image — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert a PDF to JPG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF file onto the tool or click Browse PDF to select it.' },
        { '@type': 'HowToStep', text: 'Choose your desired JPEG quality — Low, Medium, or High — using the slider.' },
        { '@type': 'HowToStep', text: 'Click Convert to JPG. Each page is rendered to a canvas and exported as a JPEG.' },
        { '@type': 'HowToStep', text: 'Download individual JPGs or click Download All as ZIP for multi-page PDFs.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does converting a PDF to JPG upload my file?', acceptedAnswer: { '@type': 'Answer', text: 'No. The entire conversion happens in your browser using PDF.js and the HTML5 Canvas API. Your PDF never leaves your device.' } },
        { '@type': 'Question', name: 'What resolution are the output JPGs?', acceptedAnswer: { '@type': 'Answer', text: 'Pages are rendered at 2× scale (equivalent to roughly 144–150 DPI for a standard A4 PDF). This produces crisp images suitable for social media, presentations, and web use.' } },
        { '@type': 'Question', name: 'Can I convert a multi-page PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every page is converted to its own JPG. For multi-page PDFs, a Download All as ZIP button appears so you can grab all images in one click.' } },
        { '@type': 'Question', name: 'Can I control the JPG quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the quality slider (30–100%) or the Low / Medium / High preset buttons before converting. Higher quality means larger files; lower quality means smaller files.' } },
        { '@type': 'Question', name: 'Will text in the PDF be sharp in the JPG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes at quality 85 and above. PDF.js renders text, vectors, and images faithfully onto a canvas. At lower quality settings (below 60%) JPEG compression artefacts may appear around fine text.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PDF',
    desc: 'Drop your PDF file onto the tool or click Browse PDF to select it from your device.',
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
    title: 'Choose quality',
    desc: 'Set JPEG quality using the slider or Low / Medium / High presets. Higher quality means sharper images and larger files.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Click Convert to JPG. Download individual images or use Download All as ZIP for multi-page PDFs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const USE_CASES = [
  { label: 'Social media', desc: "Share a report, certificate, or infographic as an image post — platforms like Instagram and Twitter don't accept PDFs." },
  { label: 'Thumbnails and previews', desc: 'Generate a cover image from the first page of a document for a blog post or download page.' },
  { label: 'Presentations', desc: 'Import specific PDF pages into PowerPoint, Keynote, or Google Slides as image slides.' },
  { label: 'Email attachments', desc: 'Many email clients block PDF attachments. A JPG attachment passes through every spam filter and preview pane.' },
  { label: 'Document archiving', desc: 'Convert scanned PDFs back to individual image files for use in image management systems.' },
  { label: 'Product mockups', desc: 'Use PDF page renders as high-quality images in product demos, mockups, or design tools.' },
];

const FAQS = [
  {
    q: 'Does converting a PDF to JPG upload my file?',
    a: 'No. The entire conversion happens in your browser using PDF.js and the HTML5 Canvas API. Your PDF never leaves your device.',
  },
  {
    q: 'What resolution are the output JPGs?',
    a: 'Pages are rendered at 2× scale (equivalent to roughly 144–150 DPI for a standard A4 PDF). This produces crisp images suitable for social media, presentations, and web use.',
  },
  {
    q: 'Can I convert a multi-page PDF?',
    a: 'Yes. Every page is converted to its own JPG. For multi-page PDFs, a Download All as ZIP button appears so you can grab all images in one click.',
  },
  {
    q: 'Can I control the JPG quality?',
    a: 'Yes. Use the quality slider (30–100%) or the Low / Medium / High preset buttons before converting. Higher quality means larger files; lower quality means smaller files.',
  },
  {
    q: 'Will text in the PDF be sharp in the JPG?',
    a: 'Yes at quality 85 and above. PDF.js renders text, vectors, and images faithfully onto a canvas. At lower quality settings (below 60%) JPEG compression artefacts may appear around fine text.',
  },
];

export default function PdfToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="pdf-to-jpg-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PDF to JPG</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Every page.<br /><span className="text-accent">A high-quality image.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert every page of your PDF into a high-quality JPEG image. Adjust quality, download individually or as a ZIP — entirely in your browser.
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
          <PdfToJpgUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">PDF pages as images.</em>
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

        {/* ── Use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Use cases</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Why convert a PDF <em className="text-accent">to JPG?</em>
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
              How the conversion works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              The tool uses PDF.js (Mozilla&apos;s open-source PDF rendering engine) to parse your PDF entirely in the browser. Each page is rendered onto an HTML5 canvas element at 2× scale for crisp output. The canvas is then exported to JPEG at your chosen quality setting. For multi-page documents, all JPGs are bundled into a ZIP using JSZip. No file data is ever sent to a server.
            </p>
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
                  'All conversion runs locally via PDF.js and the Canvas API',
                  'No file data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your files at any point',
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
          <a href="#pdf-to-jpg-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/split-pdf', '/merge-pdf', '/compress-pdf', '/image-to-pdf']} />

      </main>
    </>
  );
}
