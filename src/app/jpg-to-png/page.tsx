import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free Online',
  description: 'Convert JPEG images to PNG instantly in your browser. No upload, no server — 100% private. Lossless PNG output with transparency support.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPG to PNG Converter',
      url: 'https://imagepdf.tools/jpg-to-png',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG images to PNG format. Lossless output with transparency support. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG to PNG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG or JPG file onto the converter.' },
        { '@type': 'HowToStep', text: 'The output format is set to PNG automatically.' },
        { '@type': 'HowToStep', text: 'Download your converted PNG file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why would I convert a JPG to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'The most common reason is to enable transparency. PNG supports transparent backgrounds, while JPEG does not. PNG is also lossless, so re-saving it does not introduce further compression artefacts.' } },
        { '@type': 'Question', name: 'Will converting JPG to PNG improve quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Converting a JPEG to PNG does not recover quality lost during the original JPEG compression. The PNG output is a lossless snapshot of the current JPEG — no better in terms of pixel quality. But future saves will not introduce additional degradation.' } },
        { '@type': 'Question', name: 'Will the PNG file be larger than the JPG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG uses lossless compression, which means the files are typically 2-4x larger than their JPEG equivalents for photographs.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple JPGs to PNG at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.' } },
        { '@type': 'Question', name: 'Is JPG to PNG conversion truly lossless?', acceptedAnswer: { '@type': 'Answer', text: 'The conversion step is lossless — no quality is lost going from JPEG to PNG. However, any quality already lost in the original JPEG encoding is permanent. PNG cannot restore that.' } },
        { '@type': 'Question', name: 'Can I add a transparent background after converting to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Not with this converter — it converts the format but does not remove backgrounds. Once you have the PNG, use a tool like Adobe Express, Canva, or remove.bg to remove the background.' } },
        { '@type': 'Question', name: 'Why do designers prefer PNG over JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is preferred for logos, icons, and UI elements because it supports transparency, preserves sharp edges and text, and never degrades quality on re-save. JPEG is preferred for photos where file size matters more than lossless precision.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your JPEG',
    desc: 'Drag and drop JPEG or JPG files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M17 8l-5-5-5 5" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Output format: PNG',
    desc: 'The format is set to PNG automatically. PNG is lossless — no quality settings needed. Your image will be exported exactly as-is.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your PNG',
    desc: 'Your converted PNG file is ready instantly. Download it directly or save the whole batch as a ZIP.',
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
  { q: 'Why would I convert a JPG to PNG?', a: 'The most common reason is to enable transparency. PNG supports transparent backgrounds, while JPEG does not. If you need to overlay an image onto a different background — for a logo, a watermark, or a design composite — you need PNG. PNG is also lossless, so it does not introduce further compression artefacts when you edit and re-save.' },
  { q: 'Will converting JPG to PNG improve quality?', a: 'No. Converting a JPEG to PNG does not recover quality lost during the original JPEG compression. The PNG output is a lossless snapshot of the current JPEG — no better or worse in terms of pixel quality. But re-saving it as PNG means future edits and re-saves will not introduce additional JPEG degradation.' },
  { q: 'Is JPG to PNG conversion truly lossless?', a: 'The conversion step itself is lossless — no additional quality is lost when going from JPEG to PNG. However, any quality already lost during the original JPEG encoding is permanent and cannot be recovered. PNG will faithfully preserve whatever quality the JPEG currently has.' },
  { q: 'Will the PNG file be larger than the JPG?', a: 'Yes. PNG uses lossless compression, which means files are typically 2–4× larger than their JPEG equivalents for photographs. This is the trade-off for lossless quality and transparency support.' },
  { q: 'Can I add a transparent background after converting to PNG?', a: 'Not with this converter — it converts the format without removing backgrounds. Once you have the PNG, use a background removal tool like Adobe Express, Canva, or remove.bg to make the background transparent.' },
  { q: 'Why do designers prefer PNG over JPEG for UI work?', a: 'PNG is preferred for logos, icons, and UI elements because it supports transparency, preserves sharp text and edges without blurring, and never degrades on re-save. JPEG is preferred for photographs where file size matters more than lossless precision.' },
  { q: 'Is my image uploaded to a server?', a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' },
  { q: 'Can I convert multiple JPGs to PNG at once?', a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.' },
];

export default function JpgToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .j2p-h1    { opacity: 0; transform: translateY(10px); }
            .j2p-sub   { opacity: 0; transform: translateY(10px); }
            .j2p-trust { opacity: 0; }
          }
          .j2p-h1 { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1); }
          .j2p-sub { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms, transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms; }
          .j2p-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        <section id="j2p-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />

          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">JPG to PNG</span>
            <h1 className="j2p-h1 serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Convert JPG to PNG.<br /><span className="text-accent">Lossless. Free.</span>
            </h1>
            <p className="j2p-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert JPEG images to lossless PNG — perfect for graphics that need transparency or exact colour reproduction. Nothing uploaded.
            </p>
            <p className="j2p-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · Lossless PNG output</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', 'Lossless output', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={C}><CompressorUI initialFormat="image/png" /></div>

        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Instant results.</em>
            </h2>
            <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
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
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2 className="serif italic text-fg-1 m-0 mb-5" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Why convert JPG to PNG?
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">JPEG has one fundamental limitation: it does not support transparency. Every pixel in a JPEG image has a solid colour. PNG, by contrast, supports full alpha channel transparency — making it the go-to format for logos, icons, watermarks, and any graphic that needs to sit over a different background.</p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">Converting your JPG to PNG is also the right choice when you need to edit and re-save an image repeatedly — JPEG degrades on every save, PNG does not.</p>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Creating logos with transparent backgrounds.', text: 'If you have a logo as a JPEG and need to remove the background for design work, converting to PNG first is required.' },
                { label: 'Watermarks and overlays.', text: 'Adding a semi-transparent watermark to photos requires a PNG source file. The converter gives you the PNG you need.' },
                { label: 'Design composites in Figma or Photoshop.', text: 'Designers often need PNG assets to layer correctly in design tools. Converting a JPEG ensures it can be positioned over other elements without a white background box.' },
                { label: 'Preserving quality through multiple edits.', text: 'JPEG re-encodes the image every time you save, introducing progressive artefacts. Working in PNG means subsequent saves do not degrade the image further.' },
              ].map(({ label, text }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }} aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                  </span>
                  <span className="text-[13.5px] text-fg-2 leading-[1.55]"><strong className="font-medium text-fg-1">{label}</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your files never leave your browser.</h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">The converter uses the browser&apos;s native Canvas API. Your JPEG images are decoded and exported as PNG entirely on your own hardware — nothing is transmitted, stored, or logged.</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {['No server upload — conversion happens on your CPU', 'No account or sign-up required', 'Lossless PNG output — every pixel preserved', 'Works offline once the page has loaded'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg-2">
                    <span className="shrink-0 w-4 h-4 rounded-full grid place-items-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }} aria-hidden="true">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#j2p-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
            Back to converter
          </a>
        </div>

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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/jpg-to-webp', '/png-to-webp', '/webp-to-png']} />
      </main>
    </>
  );
}
