import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress PNG Online — Free PNG Compressor',
  description:
    'Compress PNG files online for free — up to 80% smaller using pngquant lossy quantisation. No upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-png-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG Compressor',
      url: 'https://imagepdf.tools/compress-png-online',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PNG compressor using pngquant WASM. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress a PNG image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the compressor.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control compression aggressiveness.' },
        { '@type': 'HowToStep', text: 'Download your compressed PNG — typically 40–80% smaller.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How does PNG compression work?', acceptedAnswer: { '@type': 'Answer', text: 'This tool uses pngquant, the industry-standard lossy PNG compression algorithm. It reduces the number of colours in the image from 16.7 million (24-bit) to 256 (8-bit) using a technique called quantisation. The result is a smaller file that looks nearly identical to the original at normal viewing sizes.' } },
        { '@type': 'Question', name: 'Will lossy compression ruin my PNG?', acceptedAnswer: { '@type': 'Answer', text: 'At quality settings above 70, the visual difference between the original and the compressed PNG is virtually imperceptible on screen. At lower settings, you may notice slight banding in gradients or flat colour areas. The quality slider lets you find the right balance for your use case.' } },
        { '@type': 'Question', name: 'Should I compress PNG or convert to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'If your image has transparency or is a logo/icon with flat colours, compress the PNG. If your image is a photograph without transparency, converting to JPEG or WebP will give you a much smaller file than any PNG compressor can achieve.' } },
        { '@type': 'Question', name: 'Is my PNG uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The pngquant compression runs in your browser as a WebAssembly module. Your PNG file never leaves your device — not even temporarily.' } },
        { '@type': 'Question', name: 'Can I compress multiple PNGs at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Does compressing a PNG preserve transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. pngquant preserves alpha-channel transparency during compression. Logos and icons with transparent backgrounds will retain their transparency after compression.' } },
        { '@type': 'Question', name: 'How much file size reduction should I expect?', acceptedAnswer: { '@type': 'Answer', text: 'Typical reduction is 40–80% depending on the image content. Flat-colour graphics and logos compress better than photographs. Photos with complex colour gradients compress less because the palette reduction is more visible.' } },
        { '@type': 'Question', name: 'What is the difference between compressing PNG and converting to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Compressing the PNG keeps it as a PNG — useful when you need PNG format for compatibility or transparency. Converting to WebP typically achieves an additional 25–50% size reduction on top of pngquant compression, at the cost of changing the format.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PNG',
    desc: 'Drag a PNG file onto the zone or click to browse. Up to 50 MB per file. Transparency is preserved.',
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
    title: 'Set the quality level',
    desc: 'pngquant runs in your browser via WebAssembly. Higher quality preserves more colour depth.',
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
    title: 'Download your smaller PNG',
    desc: 'Typically 40–80% smaller than the original. Transparency preserved. Nothing sent to any server.',
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
    q: 'How does PNG compression work?',
    a: 'This tool uses pngquant, the industry-standard lossy PNG compression algorithm. It reduces the number of colours in the image from 16.7 million (24-bit) to 256 (8-bit) using a technique called quantisation. The result is a smaller file that looks nearly identical to the original at normal viewing sizes.',
  },
  {
    q: 'Will lossy compression ruin my PNG?',
    a: 'At quality settings above 70, the visual difference between the original and the compressed PNG is virtually imperceptible on screen. At lower settings, you may notice slight banding in gradients or flat colour areas. The quality slider lets you find the right balance for your use case.',
  },
  {
    q: 'Should I compress PNG or convert to JPEG?',
    a: 'If your image has transparency or is a logo/icon with flat colours, compress the PNG. If your image is a photograph without transparency, converting to JPEG or WebP will give you a much smaller file than any PNG compressor can achieve.',
  },
  {
    q: 'Is my PNG uploaded to a server?',
    a: 'No. The pngquant compression runs in your browser as a WebAssembly module. Your PNG file never leaves your device — not even temporarily.',
  },
  {
    q: 'Can I compress multiple PNGs at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.',
  },
  {
    q: 'Does compressing a PNG preserve transparency?',
    a: 'Yes. pngquant preserves alpha-channel transparency during compression. Logos and icons with transparent backgrounds will retain their transparency after compression.',
  },
  {
    q: 'How much file size reduction should I expect?',
    a: 'Typical reduction is 40–80% depending on the image content. Flat-colour graphics and logos compress better than photographs. Photos with complex colour gradients compress less because the palette reduction is more visible.',
  },
  {
    q: 'What is the difference between compressing PNG and converting to WebP?',
    a: 'Compressing the PNG keeps it as a PNG — useful when you need PNG format for compatibility or transparency. Converting to WebP typically achieves an additional 25–50% size reduction on top of pngquant compression, at the cost of changing the format.',
  },
];

export default function CompressPngPage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cpng-h1  { opacity: 0; transform: translateY(10px); }
            .cpng-sub { opacity: 0; transform: translateY(10px); }
            .cpng-trust { opacity: 0; }
          }
          .cpng-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cpng-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cpng-trust {
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
          id="png-tool"
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
            <span className="hp-eyebrow">PNG Compressor</span>

            <h1
              className="cpng-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Compress PNG online.<br />
              <span className="text-accent">Up to 80% smaller.</span>
            </h1>

            <p className="cpng-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Powered by pngquant lossy colour quantisation — the same algorithm behind TinyPNG. Transparency preserved. Nothing uploaded.
            </p>

            <p className="cpng-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · No upload
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
          <CompressorUI
            initialFormat="image/png"
            dropLabel="Drop your PNG files here"
            dropHint="PNG files only · up to 50 MB each · transparency preserved"
            dropFileTypeName="PNG"
            dropAccept={['image/png']}
          />
        </div>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2
              className="serif italic text-fg-1 text-center m-0 mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Three steps. <em className="text-accent">Under 10 seconds.</em>
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

        {/* ── Why compress PNG ──────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why is PNG so large — <em className="text-accent">and how do you fix it?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              PNG uses lossless compression, meaning every pixel is preserved exactly. A 4000 × 3000 px photo saved as PNG can easily be 8–15 MB versus 1–3 MB as JPEG at equivalent quality.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">
              The standard way to compress a PNG without converting it is <strong className="font-medium text-fg-1">colour quantisation</strong> — reducing unique colours from 16.7 million (24-bit) down to 256 (8-bit indexed). For logos, icons, screenshots, and flat-colour graphics, this reduction is nearly invisible to the human eye.
            </p>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Compress the PNG', text: 'when your image has transparency, is a logo, icon, illustration, or screenshot, or when you specifically need PNG format.' },
                { label: 'Convert to JPEG', text: 'when the image is a photograph with no transparency — JPEG achieves far smaller files than PNG compression for photos.' },
                { label: 'Convert to WebP', text: 'when the image is for a website — WebP outperforms both PNG and JPEG while supporting transparency.' },
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
              How the <em className="text-accent">compressor works.</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              This tool runs <strong className="font-medium text-fg-1">pngquant</strong> as a WebAssembly module directly in your browser — the same open-source algorithm used by TinyPNG, Squoosh, and professional image optimisation pipelines.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">
              It uses a modified median-cut algorithm to find the optimal 256-colour palette for each image, minimising visible quality loss. The entire process is local — no PNG data is ever sent to any server.
            </p>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Website performance.', text: 'Large PNGs slow page load times and hurt Core Web Vitals scores. Compressing reduces bytes the browser must download.' },
                { label: 'App and game development.', text: 'Sprite sheets, UI assets, and texture atlases must be as small as possible to minimise bundle size and load times.' },
                { label: 'Email logos and signatures.', text: 'Large embedded PNGs can cause emails to load slowly. A compressed PNG logo under 100 KB loads instantly.' },
                { label: 'Docs and presentations.', text: 'Screenshots saved as PNG are often oversized. Compressing before embedding reduces the document file size significantly.' },
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
                pngquant runs as a WebAssembly module compiled directly into the page. There is no server-side component — no upload endpoint, no remote processing, no data retained. Your PNG is compressed on your own CPU and downloaded directly to your device.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Open-source processing: pngquant WebAssembly',
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
            href="#png-tool"
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

        <RelatedTools hrefs={['/compress-image', '/convert-png-to-jpeg', '/png-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
