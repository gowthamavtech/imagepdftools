import type { Metadata } from 'next';
import { NumberPdfUI } from '@/components/NumberPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF — Free Online Tool',
  description:
    'Add page numbers to any PDF online — choose position, format, and starting number. Runs entirely in your browser, no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/number-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Add Page Numbers to PDF',
      url: 'https://imagepdf.tools/number-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Add customisable page numbers to any PDF — position, format, and start number — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to add page numbers to a PDF',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Set options', text: 'Choose position (bottom center, top right, etc.), number format, and starting number.' },
        { '@type': 'HowToStep', position: 3, name: 'Apply', text: 'Click Add Page Numbers. Numbers are drawn onto every page instantly in your browser.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the numbered PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does this affect existing text in the PDF?', acceptedAnswer: { '@type': 'Answer', text: 'No. Page numbers are drawn on top of existing content. The original text, images, and layout are unchanged.' } },
        { '@type': 'Question', name: 'Can I choose where numbers appear?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can place numbers at the bottom center, bottom left, bottom right, top center, top left, or top right of every page.' } },
        { '@type': 'Question', name: 'What formats are available?', acceptedAnswer: { '@type': 'Answer', text: 'Three formats: plain numbers (1, 2, 3), "Page N" (Page 1, Page 2), or "N of Total" (1 of 10, 2 of 10).' } },
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
    title: 'Set options',
    desc: 'Choose position (bottom center, top right, etc.), number format (1, Page N, or N of Total), and starting number.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="14" y2="18" />
        <circle cx="19" cy="18" r="2" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Click Add Page Numbers. Numbers are drawn onto every page instantly in your browser — download immediately.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const OPTIONS = [
  { label: '6 positions', desc: 'Bottom center, bottom left, bottom right, top center, top left, or top right — choose where numbers appear on every page.' },
  { label: '3 number formats', desc: 'Plain numbers (1, 2, 3), "Page N" label (Page 1, Page 2), or "N of Total" fraction (1 of 10, 2 of 10).' },
  { label: 'Custom start number', desc: 'Set any starting number — useful for documents where the first pages are a cover or table of contents.' },
  { label: 'No content displaced', desc: 'Numbers are drawn on top of existing content. Original text, images, and layout are completely unchanged.' },
];

const FAQS = [
  {
    q: 'Does this affect existing text in the PDF?',
    a: 'No. Page numbers are drawn on top of existing content. The original text, images, and layout are unchanged.',
  },
  {
    q: 'Can I choose where numbers appear?',
    a: 'Yes. You can place numbers at the bottom center, bottom left, bottom right, top center, top left, or top right of every page.',
  },
  {
    q: 'What formats are available?',
    a: 'Three formats: plain numbers (1, 2, 3), "Page N" (Page 1, Page 2), or "N of Total" (1 of 10, 2 of 10).',
  },
  {
    q: 'Can I add numbers starting from a page other than 1?',
    a: 'Yes. Set any starting number in the "Start At" field. Useful for documents where the first few pages are a cover or table of contents.',
  },
  {
    q: 'Will numbers appear on every page?',
    a: 'Yes. The number is drawn on every page of the PDF, incrementing by 1 per page.',
  },
  {
    q: 'Can I remove page numbers later?',
    a: 'Not with this tool — once drawn, the numbers become part of the PDF content. Keep an unmodified version of your PDF if you need to re-number.',
  },
  {
    q: 'Is my file uploaded to a server?',
    a: 'No. All processing happens locally in your browser using pdf-lib. Your file never leaves your device.',
  },
];

export default function NumberPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="number-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Add Page Numbers</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Number your pages.<br /><span className="text-accent">Your way.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Stamp page numbers onto every page of your PDF — pick position, format, and start number. No upload needed.
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
          <NumberPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Numbered pages.</em>
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

        {/* ── Options ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Options</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Full control over <em className="text-accent">position and format.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OPTIONS.map(({ label, desc }) => (
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
              How page numbers are added
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              The tool uses pdf-lib to load your PDF in the browser and draw text onto each page at the position you select. Numbers are rendered using Helvetica — a universally supported PDF font — so the result looks clean in every viewer. The original page content is untouched; numbers are simply drawn on top. Nothing is uploaded to a server.
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
                  'All page numbering runs locally in your browser using pdf-lib',
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
          <a href="#number-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/merge-pdf', '/organize-pdf', '/compress-pdf', '/watermark-pdf']} />

      </main>
    </>
  );
}
