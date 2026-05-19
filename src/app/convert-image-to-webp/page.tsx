import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Convert Image to WebP — Free Online WebP Converter',
  description:
    'Convert JPEG and PNG images to WebP format online for free. Smaller file sizes, same quality — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/convert-image-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image to WebP Converter',
      url: 'https://imagepdf.tools/convert-image-to-webp',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG, PNG, and other images to WebP format. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert an image to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the converter.' },
        { '@type': 'HowToStep', text: 'Select WebP as the output format.' },
        { '@type': 'HowToStep', text: 'Adjust quality if needed, then download your WebP file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is WebP better than JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is typically 25–35% smaller than JPEG at the same visual quality level. It also supports transparency (like PNG) and animation (like GIF). For web use, WebP is the superior format in almost every situation.' } },
        { '@type': 'Question', name: 'Does every browser support WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP is supported by all major browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. As of 2025, global WebP support is above 97%.' } },
        { '@type': 'Question', name: 'Will converting to WebP make my website faster?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Smaller images load faster, which directly improves your Google PageSpeed Insights score and Core Web Vitals (specifically Largest Contentful Paint). Google has recommended WebP for web images since 2018.' } },
        { '@type': 'Question', name: 'Does WebP support transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP supports both lossy and lossless compression, as well as transparency (alpha channel). This makes it a suitable replacement for both JPEG and PNG.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple images to WebP at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch conversion and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'What quality setting should I use for WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 80 is the standard recommendation for web images — files are typically 60–70% smaller than the original JPEG with virtually no visible difference at screen sizes. For archival or print use, quality 90+ is safer.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Drag a JPEG, PNG, or WebP file onto the zone or click to browse. Up to 50 MB per file.',
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
    title: 'Output format: WebP',
    desc: "The converter uses the browser's built-in WebP encoder. Adjust quality with the slider.",
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
    title: 'Download your WebP',
    desc: 'Your browser converts locally. The WebP file downloads directly to your device.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FORMAT_ROWS = [
  { feature: 'Compression',    jpeg: 'Lossy',       png: 'Lossless',   webp: 'Both' },
  { feature: 'Transparency',   jpeg: '✗',           png: '✓',          webp: '✓' },
  { feature: 'Typical size',   jpeg: '100%',        png: '150–300%',   webp: '65–75%' },
  { feature: 'Browser support',jpeg: '100%',        png: '100%',       webp: '97%+' },
  { feature: 'Best for',       jpeg: 'Photos',      png: 'Logos, UI',  webp: 'Everything' },
];

const FAQS = [
  {
    q: 'Is WebP better than JPEG?',
    a: 'WebP is typically 25–35% smaller than JPEG at the same visual quality level. It also supports transparency (like PNG) and animation (like GIF). For web use, WebP is the superior format in almost every situation.',
  },
  {
    q: 'Does every browser support WebP?',
    a: 'Yes. WebP is supported by all major browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. As of 2025, global WebP support is above 97%.',
  },
  {
    q: 'Will converting to WebP make my website faster?',
    a: 'Yes. Smaller images load faster, which directly improves your Google PageSpeed Insights score and Core Web Vitals (specifically Largest Contentful Paint). Google has recommended WebP for web images since 2018.',
  },
  {
    q: 'Does WebP support transparency?',
    a: 'Yes. WebP supports both lossy and lossless compression, as well as transparency (alpha channel). This makes it a suitable replacement for both JPEG and PNG.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple images to WebP at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch conversion and can download everything as a ZIP.',
  },
  {
    q: 'What quality setting should I use for WebP?',
    a: 'Quality 80 is the standard recommendation for web images — files are typically 60–70% smaller than the original JPEG with virtually no visible difference at screen sizes. For archival or print use, quality 90+ is safer.',
  },
];

export default function ConvertToWebpPage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cw-h1  { opacity: 0; transform: translateY(10px); }
            .cw-sub { opacity: 0; transform: translateY(10px); }
            .cw-trust { opacity: 0; }
          }
          .cw-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cw-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cw-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="webp-tool"
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
            <span className="hp-eyebrow">WebP Converter</span>

            <h1
              className="cw-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Convert image to WebP.<br />
              <span className="text-accent">25–35% smaller files.</span>
            </h1>

            <p className="cw-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert any JPEG or PNG to modern WebP — same visual quality, smaller download. Browser-native encoding. Nothing uploaded.
            </p>

            <p className="cw-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · Transparency preserved
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', 'Transparency preserved', 'Free forever'].map((label) => (
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
          <CompressorUI />
        </div>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2
              className="serif italic text-fg-1 text-center m-0 mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Three steps. <em className="text-accent">Under 5 seconds.</em>
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
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">
                    {title}
                  </h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What is WebP ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              What is WebP — <em className="text-accent">and why does it matter?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              WebP is an image format developed by Google and released in 2010. It uses advanced compression algorithms that produce files 25–35% smaller than JPEG and 25% smaller than PNG, while maintaining near-identical visual quality. It supports both lossy and lossless compression, transparency (alpha channel), and even animation.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">
              Google included WebP support in Lighthouse and PageSpeed Insights as a core recommendation, and it is now one of the key factors in the Largest Contentful Paint (LCP) metric — a Core Web Vital that Google uses as a ranking signal.
            </p>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Website owners and bloggers.', text: 'Replacing JPEG hero images with WebP equivalents can shave hundreds of kilobytes per page load, directly improving Google PageSpeed scores.' },
                { label: 'E-commerce store owners.', text: 'Product images are often the largest assets on a page. WebP product photos load faster, reducing bounce rate and improving conversion.' },
                { label: 'WordPress site owners.', text: 'WordPress 5.8+ natively serves WebP images. Converting your existing library is the fastest way to speed up a WordPress site.' },
                { label: 'Developers and designers.', text: 'Including WebP in design handoffs and asset exports helps developers meet performance budgets without extra work on their end.' },
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

        {/* ── Format comparison table ───────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              WebP vs JPEG vs PNG — <em className="text-accent">format comparison.</em>
            </h2>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-elevated">
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Feature</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">JPEG</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">PNG</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-accent px-4 py-3">WebP</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_ROWS.map(({ feature, jpeg, png, webp }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? 'bg-surface' : 'bg-page'}>
                      <td className="px-4 py-3 text-[13px] font-medium text-fg-1">{feature}</td>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{jpeg}</td>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{png}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-accent">{webp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[13px] text-fg-3 mt-4 m-0">
              File sizes relative to JPEG at equivalent visual quality. WebP percentage varies by image content.
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
                Your files never leave your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                Conversion runs entirely via the browser&apos;s built-in Canvas API and WebP encoder. No upload endpoint exists. Your image is converted on your own CPU and downloaded directly.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Browser-native WebP encoding — same as Chrome uses internally',
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
            href="#webp-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to converter
          </a>
        </div>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span data-animate="scroll" className="hp-eyebrow">FAQ</span>
            <h2
              data-animate="scroll"
              className="serif italic text-fg-1 m-0 mb-8"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Frequently asked questions
            </h2>

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

        <RelatedTools hrefs={['/jpg-to-webp', '/png-to-webp', '/webp-to-jpg', '/webp-to-png']} />
      </main>
    </>
  );
}
