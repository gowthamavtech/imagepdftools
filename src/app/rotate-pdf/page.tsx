import type { Metadata } from 'next';
import { RotatePdfUI } from '@/components/RotatePdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Rotate PDF — Rotate All Pages Free Online',
  description:
    'Rotate all pages of a PDF 90° clockwise, 90° counter-clockwise, or 180°. No upload required — everything runs in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/rotate-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Rotate PDF',
      url: 'https://imagepdf.tools/rotate-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Rotate PDF pages 90° CW, 90° CCW, or 180° — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to rotate a PDF online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF file onto the upload area or click Browse PDF.' },
        { '@type': 'HowToStep', position: 2, name: 'Choose rotation', text: 'Select 90° CW, 90° CCW, or 180°.' },
        { '@type': 'HowToStep', position: 3, name: 'Rotate', text: 'Click Rotate PDF. The rotation is applied instantly in your browser.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the rotated PDF or open it directly in your browser.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does rotating a PDF affect quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool updates the rotation flag in the PDF metadata — no content is re-encoded or re-compressed, so image and text quality is completely unchanged.' } },
        { '@type': 'Question', name: 'Can I rotate individual pages?', acceptedAnswer: { '@type': 'Answer', text: 'This tool rotates all pages by the same angle. To rotate specific pages, use Split PDF to extract the pages you want, rotate them, then Merge PDF to reassemble.' } },
        { '@type': 'Question', name: 'Are my files uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs directly in your browser using pdf-lib. Your PDF never leaves your device.' } },
        { '@type': 'Question', name: 'Is this tool free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — rotating PDFs is completely free with no account required.' } },
        { '@type': 'Question', name: 'Will the rotated PDF open correctly in all viewers?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The rotation is stored as standard PDF metadata and is honoured by all major PDF viewers including Adobe Acrobat, macOS Preview, Chrome, and mobile apps.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Upload your PDF',
    desc: 'Drop your PDF file onto the upload area or click Browse PDF to select it from your device.',
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
    title: 'Choose rotation',
    desc: 'Select 90° clockwise, 90° counter-clockwise, or 180°. All pages rotate by the same angle.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6" />
        <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Click Rotate PDF. The rotation is applied instantly in your browser — download the result immediately.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const WHEN_TO_ROTATE = [
  { label: 'Scanned documents', desc: 'Documents saved in the wrong orientation from a scanner or camera.' },
  { label: 'Mobile exports', desc: 'PDFs exported from mobile apps in portrait mode that should be landscape.' },
  { label: 'Sideways presentations', desc: 'Presentations or slides that appear rotated in viewer apps.' },
  { label: 'Filled forms', desc: 'Forms that were filled out and saved while the PDF was rotated.' },
];

const FAQS = [
  {
    q: 'Does rotating affect image or text quality?',
    a: 'No. The rotation is stored as a flag in the PDF metadata — nothing is re-encoded. Your images, fonts, and vectors remain exactly as they were.',
  },
  {
    q: 'Can I rotate only specific pages?',
    a: 'This tool rotates all pages uniformly. To rotate individual pages, split the PDF first, rotate the extracted pages, then merge them back.',
  },
  {
    q: 'Is my file uploaded anywhere?',
    a: 'Never. pdf-lib runs entirely in your browser. Your file is processed in memory and never sent to any server.',
  },
  {
    q: 'Is this tool free?',
    a: 'Yes — rotating PDFs is completely free with no account required.',
  },
  {
    q: 'Will the rotated PDF open correctly in all viewers?',
    a: 'Yes. The rotation is stored as standard PDF metadata and is honoured by all major PDF viewers including Adobe Acrobat, macOS Preview, Chrome, and mobile apps.',
  },
];

export default function RotatePdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="rotate-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Rotate PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Fix orientation.<br /><span className="text-accent">No quality loss.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Rotate all pages 90°, 180°, or 270° — purely a metadata change, no re-encoding, instant download.
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
          <RotatePdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Correct orientation.</em>
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

        {/* ── When to rotate ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">When to rotate</span>
            <h2 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Common situations that need a rotation fix
            </h2>
            <div className="space-y-4">
              {WHEN_TO_ROTATE.map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-4 rounded-[10px] bg-surface bd-2 px-5 py-4">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <span className="text-[13.5px] font-semibold text-fg-1">{label}: </span>
                    <span className="text-[13.5px] text-fg-2">{desc}</span>
                  </div>
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
              How the rotation works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              This tool uses pdf-lib to update the rotation flag stored in each page&apos;s metadata. Unlike approaches that render pages to images and rebuild the PDF, this method is purely metadata — the original text, vectors, and images are completely untouched. The result is a byte-for-byte identical PDF where only the display orientation changes. No content is re-encoded and no quality is lost.
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
                  'All rotation runs locally in your browser using pdf-lib',
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
          <a href="#rotate-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/merge-pdf', '/split-pdf', '/compress-pdf', '/organize-pdf']} />

      </main>
    </>
  );
}
