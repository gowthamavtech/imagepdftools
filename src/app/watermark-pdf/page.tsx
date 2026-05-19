import type { Metadata } from 'next';
import { WatermarkPdfUI } from '@/components/WatermarkPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Watermark PDF — Add Text Watermark Free Online',
  description:
    'Add a diagonal text watermark to every page of your PDF — CONFIDENTIAL, DRAFT, SAMPLE, or custom text. Runs entirely in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/watermark-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Watermark PDF',
      url: 'https://imagepdf.tools/watermark-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Overlay a diagonal text watermark on every page of a PDF — colour, opacity, and size are fully customisable.',
    },
    {
      '@type': 'HowTo',
      name: 'How to add a watermark to a PDF',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Set watermark text', text: 'Choose a preset (CONFIDENTIAL, DRAFT, SAMPLE) or type custom text.' },
        { '@type': 'HowToStep', position: 3, name: 'Adjust style', text: 'Set the colour, opacity (5–60%), and font size to your preference.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Click Add Watermark and download your watermarked PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can someone remove my watermark?', acceptedAnswer: { '@type': 'Answer', text: 'The watermark is drawn directly onto the PDF content layer — it is not a separate overlay. Removing it would require editing the PDF at a low level, which is non-trivial.' } },
        { '@type': 'Question', name: 'Will the watermark appear on all pages?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The same watermark is applied to every page of the PDF.' } },
        { '@type': 'Question', name: 'Is my file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The watermark is added entirely in your browser using pdf-lib. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'What opacity should I use?', acceptedAnswer: { '@type': 'Answer', text: '15–25% is a good balance — visible enough to deter copying but light enough that the underlying content remains readable.' } },
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
    desc: 'Drop your PDF onto the upload area or click Browse PDF to select it from your device.',
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
    title: 'Set watermark',
    desc: 'Choose a preset (CONFIDENTIAL, DRAFT, SAMPLE) or type custom text. Adjust colour, opacity (5–60%), and size.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Click Add Watermark. The text is drawn diagonally across every page in your browser — download instantly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const OPACITY_GUIDE = [
  { range: '5–10%', label: 'Very subtle', desc: 'Barely visible — for light indication without disrupting readability.' },
  { range: '15–25%', label: 'Recommended', desc: 'Visible enough to deter copying but light enough that content remains fully readable.' },
  { range: '30–45%', label: 'Prominent', desc: 'Hard to miss — good for DRAFT or CONFIDENTIAL documents where the mark must be obvious.' },
  { range: '50–60%', label: 'Heavy', desc: 'Very strong — for preview documents or samples where the content should be clearly marked.' },
];

const FAQS = [
  {
    q: 'Can someone remove my watermark?',
    a: 'The watermark is drawn directly onto the PDF content layer — it is not a separate overlay. Removing it would require editing the PDF at a low level, which is non-trivial.',
  },
  {
    q: 'Will the watermark appear on all pages?',
    a: 'Yes. The same watermark is applied to every page of the PDF.',
  },
  {
    q: 'Is my file uploaded to a server?',
    a: 'No. The watermark is added entirely in your browser using pdf-lib. Your file never leaves your device.',
  },
  {
    q: 'What opacity should I use?',
    a: '15–25% is a good balance — visible enough to deter copying but light enough that the underlying content remains readable.',
  },
  {
    q: 'Can I add an image watermark instead of text?',
    a: 'Currently, only text watermarks are supported. Image watermarking is on our roadmap.',
  },
  {
    q: 'Can I watermark only specific pages?',
    a: 'Not yet — the watermark is applied to all pages. For selective watermarking, use the Split PDF tool to extract sections, watermark each, then merge back.',
  },
];

export default function WatermarkPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="watermark-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Watermark PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Mark your documents.<br /><span className="text-accent">Protect your content.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Add a diagonal text watermark to every page — CONFIDENTIAL, DRAFT, SAMPLE, or any custom text. Fully in your browser.
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
          <WatermarkPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Every page watermarked.</em>
            </h2>
            <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
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

        {/* ── Opacity guide ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Opacity guide</span>
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Choosing the right opacity
            </h2>
            <div className="space-y-4">
              {OPACITY_GUIDE.map(({ range, label, desc }) => (
                <div key={range} className="flex items-start gap-5 rounded-[10px] bg-surface bd-2 px-6 py-5">
                  <div className="shrink-0 min-w-[64px]">
                    <span className="font-data text-[13px] font-medium text-accent">{range}</span>
                    <span className="block text-[11px] text-fg-3 mt-0.5">{label}</span>
                  </div>
                  <p className="text-[13.5px] leading-[1.7] text-fg-2 m-0">{desc}</p>
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
              How the watermark is applied
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              pdf-lib loads your PDF in the browser, then draws your watermark text diagonally across the centre of each page. The text is rendered in Helvetica Bold with your chosen colour and opacity. Because it is drawn at the PDF content level, the watermark is visible in all standard PDF viewers without any plugins. Nothing is uploaded to a server at any point.
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
                  'All watermarking runs locally in your browser using pdf-lib',
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
          <a href="#watermark-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to tool
          </a>
        </div>

        {/* ── FAQ ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span data-animate="scroll" className="hp-eyebrow">FAQ</span>
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Frequently asked questions</h2>
            <div data-animate-stagger className="bd-t-1">
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

        <RelatedTools hrefs={['/protect-pdf', '/number-pdf', '/compress-pdf', '/merge-pdf']} />

      </main>
    </>
  );
}
