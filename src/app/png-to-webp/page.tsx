import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PNG to WebP Converter — Free Online',
  description: 'Convert PNG images to WebP format instantly in your browser. Preserve transparency, reduce file size by up to 75% — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/png-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG to WebP Converter',
      url: 'https://imagepdf.tools/png-to-webp',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to WebP format with transparency support. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to WebP online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Drop your PNG', text: 'Drop your PNG file onto the converter.' },
        { '@type': 'HowToStep', position: 2, name: 'Format: WebP', text: 'The output format is set to WebP. Adjust quality if needed.' },
        { '@type': 'HowToStep', position: 3, name: 'Download', text: 'Download your converted WebP file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does WebP support transparency like PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP supports full alpha-channel transparency, just like PNG. Converting a PNG with a transparent background preserves it completely — with a significantly smaller file.' } },
        { '@type': 'Question', name: 'How much smaller is WebP compared to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP (lossy) is typically 50-75% smaller than PNG for the same image. Even WebP lossless is around 26% smaller than PNG.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs locally in your browser using the Canvas API. Your file never leaves your device.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PNG',
    desc: 'Drag and drop PNG files onto the converter, or click to browse. Logos, screenshots, transparent graphics — all supported.',
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
    title: 'Format: WebP',
    desc: 'The format is set to WebP automatically. Transparency is fully preserved. Adjust quality to balance size and visual fidelity.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Your converted WebP file is ready instantly. Download it directly or save the whole batch as a ZIP.',
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
  {
    title: 'Website logos and icons',
    desc: 'PNG logos with transparent backgrounds are a perfect WebP conversion target. Transparency is preserved and file size drops dramatically.',
  },
  {
    title: 'UI screenshots and product images',
    desc: 'Screenshots taken as PNG (often large because of lossless format) compress well to WebP without the blocky artefacts you get from JPEG.',
  },
  {
    title: 'Game and app assets',
    desc: 'Mobile and web apps with sprite sheets or UI assets as PNG can reduce asset bundle size significantly by converting to WebP.',
  },
  {
    title: 'E-commerce product images',
    desc: 'Product images with removed backgrounds (PNG with transparency) are widely used in e-commerce. WebP reduces page weight and speeds up product pages.',
  },
  {
    title: 'WordPress media library',
    desc: 'WordPress 5.8+ supports WebP uploads. Replacing large PNG assets with WebP equivalents can shave megabytes off page weight across your entire site.',
  },
  {
    title: 'Core Web Vitals improvement',
    desc: 'LCP (Largest Contentful Paint) is heavily influenced by image file size. Converting PNG hero images to WebP is one of the fastest wins available.',
  },
];

const FAQS = [
  {
    q: 'Does WebP support transparency like PNG?',
    a: 'Yes. WebP supports full alpha-channel transparency, just like PNG. Converting a PNG with a transparent background to WebP preserves the transparency completely — with a significantly smaller file size.',
  },
  {
    q: 'How much smaller is WebP compared to PNG?',
    a: 'WebP (lossy) is typically 50–75% smaller than PNG for the same image. Even WebP lossless is around 26% smaller than PNG. This makes PNG-to-WebP one of the most impactful file size reductions available for web images.',
  },
  {
    q: 'Should I use lossy or lossless WebP for my PNG?',
    a: 'For photos or images where minor quality loss is acceptable, lossy WebP at quality 80 gives the best size reduction. For logos, icons, or images with sharp edges where quality must be pixel-perfect, use a higher quality setting (90+) to minimise compression artefacts.',
  },
  {
    q: 'What quality setting should I use for logos and icons?',
    a: 'For logos and icons with flat colours and sharp edges, use quality 85–95. Lower quality settings can introduce visible artefacts along hard edges that are very noticeable on simple graphics. For photographic PNG images, quality 80 is an excellent default.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. Everything runs locally in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple PNGs to WebP at once?',
    a: 'Yes. Drop up to 5 PNG files at once on the Free tier, or unlimited files with Pro.',
  },
  {
    q: 'Does WebP support animation like GIF?',
    a: 'Yes, WebP supports animation. However, this converter processes static PNG images to static WebP. Animated PNGs (APNG) are not converted to animated WebP files.',
  },
  {
    q: 'Will WebP work in all browsers?',
    a: 'WebP is supported by Chrome, Firefox, Safari 14+, Edge, and Opera — covering over 97% of global browser usage. If you need to support very old browsers, provide a PNG fallback using the HTML picture element.',
  },
];

export default function PngToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="png-to-webp-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PNG to WebP</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              PNG to WebP.<br /><span className="text-accent">Up to 75% smaller.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Shrink PNG files by converting to WebP — with full transparency support preserved. All processing stays in your browser.
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
        <CompressorUI initialFormat="image/webp" />

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Smaller WebP, transparency intact.</em>
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
            <span className="hp-eyebrow">Common use cases</span>
            <h2 className="serif italic text-fg-1 m-0 mb-10" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Who converts PNG to WebP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {USE_CASES.map(({ title, desc }) => (
                <div key={title} className="rounded-[10px] bg-surface bd-2 p-6">
                  <h3 className="text-[15px] font-medium text-fg-1 m-0 mb-2 leading-[1.4]">{title}</h3>
                  <p className="text-[13.5px] font-normal text-fg-2 m-0 leading-[1.65]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PNG vs WebP comparison ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Format comparison</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              PNG vs WebP
            </h2>
            <div className="rounded-[10px] overflow-x-auto overflow-hidden bd-2">
              <table style={{ minWidth: '460px' }} className="w-full text-[13.5px]">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 font-medium text-fg-2">Feature</th>
                    <th className="text-left px-4 py-3 font-medium text-fg-2">PNG</th>
                    <th className="text-left px-4 py-3 font-medium text-accent">WebP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Compression', 'Lossless only', 'Lossy + lossless'],
                    ['Transparency', 'Supported', 'Supported'],
                    ['File size', 'Large (lossless)', '50–75% smaller than PNG'],
                    ['Quality loss', 'None (lossless)', 'Minimal at quality 80+'],
                    ['Browser support', 'Universal', '97%+ coverage'],
                  ].map(([f, png, webp], i) => (
                    <tr key={f} className={i % 2 === 0 ? '' : 'bg-surface'}>
                      <td className="px-4 py-3 text-fg-2 font-medium bd-t-1">{f}</td>
                      <td className="px-4 py-3 text-fg-2 bd-t-1">{png}</td>
                      <td className="px-4 py-3 text-accent font-medium bd-t-1">{webp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Your PNG is decoded by the browser and drawn to an HTML Canvas element. The canvas is then exported using the browser&apos;s built-in WebP encoder. The alpha channel (transparency) is preserved throughout this process. All processing happens locally — your file never leaves your browser.
            </p>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your images never leave your browser.</h2>
              <div className="space-y-3">
                {[
                  'Conversion runs locally via the Canvas API and browser WebP encoder',
                  'No file data is transmitted, logged, or stored',
                  'Transparency preserved throughout the conversion',
                  'Works offline once the page has loaded',
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
          <a href="#png-to-webp-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to converter
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

        <RelatedTools hrefs={['/convert-image-to-webp', '/jpg-to-webp', '/jpg-to-png', '/compress-png-online']} />

      </main>
    </>
  );
}
