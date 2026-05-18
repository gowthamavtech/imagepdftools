import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress Image Online — Free Image Compressor',
  description:
    'Compress JPEG, PNG, WebP and SVG images online for free. Runs in your browser, no upload required. Reduce file sizes by up to 80% with no visible quality loss.',
  alternates: { canonical: 'https://imagepdf.tools/compress-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Compressor',
      url: 'https://imagepdf.tools/compress-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image compressor for JPEG, PNG, WebP and SVG. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress an image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your image onto the upload zone or click to browse. Supports JPEG, PNG, WebP, and SVG.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control the compression level.' },
        { '@type': 'HowToStep', text: 'Click Download to save the compressed image to your device.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can I compress an image without losing quality?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG and WebP at quality 75–85 typically reduce file size by 60–75% with no visible difference at screen sizes. PNG via pngquant achieves 40–70% reduction.' } },
        { '@type': 'Question', name: 'Does compressing an image reduce its pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool reduces file size (bytes) only. A 4000×3000 image remains 4000×3000 after compression. Use the Resize Image tool to change pixel dimensions.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your file',
    desc: 'Loads into browser memory. Nothing transmitted.',
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
    title: 'WebAssembly runs on your CPU',
    desc: 'Compression happens locally. No server involved.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download and done',
    desc: 'Saved to your device. Cleared from memory on close.',
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
  { q: 'How much can I compress without losing quality?',   a: 'JPEG and WebP at quality 75–85 typically reduce file size by 60–75% with no visible difference at screen sizes. PNG via pngquant achieves 40–70% reduction. Use the comparison slider to check before downloading.' },
  { q: 'Does compressing an image reduce its pixel dimensions?', a: 'No. This tool reduces file size (bytes) only. A 4000×3000 image remains 4000×3000 after compression. To change pixel dimensions, use the Resize Image tool.' },
  { q: 'What quality setting should I use for web images?', a: 'Quality 75–85 is the standard recommendation. Files are typically 60–75% smaller than quality 100 with no visible loss at screen sizes. For email attachments, 65–75 is acceptable. For print or archival, use 90 or above.' },
  { q: 'What is the difference between lossy and lossless compression?', a: 'Lossy compression (JPEG, WebP) permanently discards some image data to achieve smaller file sizes. Lossless preserves every pixel. This compressor uses lossy methods: Canvas API for JPEG and WebP, pngquant for PNG.' },
  { q: 'Is there a file size limit?',               a: 'Free tier: up to 50 MB per file. Pro: no limit. All processing runs locally in your browser regardless of file size.' },
  { q: 'Can I compress multiple images at once?',   a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.' },
  { q: 'Is my image uploaded to a server?',         a: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device.' },
  { q: 'Which formats are supported?',              a: "JPEG, PNG, WebP, and SVG. PNG uses pngquant WebAssembly for palette quantisation. JPEG and WebP use the browser's native Canvas encoder. SVG strips metadata and whitespace from the XML source." },
  { q: 'Will the compressed image look different when printed?', a: 'At quality settings above 80, the difference between original and compressed is imperceptible at typical print sizes. For large-format print such as posters or banners, use quality 90 or above.' },
  { q: 'Can I compare the original and compressed image?', a: 'Yes. Each file card shows the original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider.' },
];

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

export default function CompressImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ci-pill { opacity: 0; transform: translateY(8px); }
            .ci-h1   { opacity: 0; transform: translateY(12px); }
            .ci-sub  { opacity: 0; transform: translateY(12px); }
          }
          .ci-pill { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1), transform 400ms cubic-bezier(0.23,1,0.32,1); }
          .ci-h1   { transition: opacity 550ms cubic-bezier(0.23,1,0.32,1) 80ms, transform 550ms cubic-bezier(0.23,1,0.32,1) 80ms; }
          .ci-sub  { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 160ms, transform 500ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          id="compress-tool"
          className="relative text-center"
          style={{ paddingTop: 'clamp(40px, 6vw, 72px)', paddingBottom: 'clamp(24px, 4vw, 40px)' }}
        >
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              right: '-10%', top: '-20%',
              width: 'min(900px, 100vw)', height: 'min(600px, 100vw)',
              background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(48px)',
              opacity: 0.45,
            }}
          />

          <div className={`${C} relative z-[1]`}>
            <span className="ci-pill hp-eyebrow">Free Image Compressor</span>

            <h1
              className="ci-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
            >
              Compress <span className="text-accent">Images</span>
            </h1>

            <p className="ci-sub text-[16px] font-light leading-[1.6] text-fg-2 max-w-[48ch] mx-auto m-0 mb-6">
              Reduce JPEG, PNG, WebP and SVG file sizes directly in your browser.
              Nothing is uploaded — ever.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span
                  key={label}
                  className="ci-pill inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-accent-dim bd-accent text-accent text-[11px] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ─────────────────────────────────────────── */}
        <CompressorUI />

        {/* Muted note below tool */}
        <p className={`${C} pt-3 pb-8 text-[12px] text-fg-3 text-center`}>
          Free · No account required · No upload · Processes entirely in your browser
        </p>

        {/* ── How it works ─────────────────────────────────── */}
        <section
          aria-labelledby="how-it-works-heading"
          className="bd-t-1"
          style={{ padding: 'clamp(48px, 7vw, 88px) 0' }}
        >
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2
              data-animate="scroll"
              id="how-it-works-heading"
              className="serif italic text-fg-1 text-center"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 clamp(28px, 4vw, 48px)' }}
            >
              Three steps. <span className="text-accent">Under 30 seconds.</span>
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
                  <h3 className="text-[17px] font-medium leading-[1.35] text-fg-1 tracking-[-0.005em] m-0 mb-[10px]">{title}</h3>
                  <p className="text-sm font-normal leading-[1.65] text-fg-2 m-0 max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO: Why compress ────────────────────────────── */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              data-animate="scroll"
              className="serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              What is image compression and why does it matter?
            </h2>
            <p className="text-[14.5px] font-normal leading-[1.7] text-fg-2 m-0 mb-4">
              Image compression reduces the file size of an image by discarding or encoding redundant pixel data more efficiently. A photo from a modern smartphone can be 6–15 MB — far too large for most web, email, or social media use. Compressing it brings the file size down to 200 KB–1 MB while keeping the image visually indistinguishable from the original at screen sizes.
            </p>
            <p className="text-[14.5px] font-normal leading-[1.7] text-fg-2 m-0">
              For websites, image compression is one of the highest-impact performance optimisations available. Images are typically the largest assets on a web page, and their file size directly affects how fast the page loads — which affects Google search rankings through Core Web Vitals (LCP).
            </p>
          </div>
        </section>

        {/* ── When to compress ─────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              data-animate="scroll"
              className="serif italic text-fg-1 m-0 mb-6"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              When to compress images — and why
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {[
                { label: 'Websites and landing pages.', body: 'Every extra kilobyte increases page load time. A 3 MB hero image compressed to 200 KB loads 15× faster, and Google notices. Compress every image before uploading to your CMS.' },
                { label: 'Email attachments.', body: 'Gmail limits attachments to 25 MB; Outlook to 20 MB. A batch of uncompressed photos can easily exceed those limits. Compressing first makes attachments send reliably.' },
                { label: 'Social media uploads.', body: 'Instagram, Facebook, and X recompress images on upload, often degrading quality. Uploading a pre-compressed image gives you control over the final quality the platform outputs.' },
                { label: 'E-commerce product photos.', body: 'Shopify, WooCommerce, and Amazon require fast-loading product images. Compressing photos reduces page load time, lowers bounce rate, and improves conversion.' },
                { label: 'App and game assets.', body: 'Sprite sheets, backgrounds, and UI textures must be compact to minimise load time and memory usage on mobile devices.' },
              ].map(({ label, body }) => (
                <li key={label} className="relative text-[14px] leading-[1.65] text-fg-2 pl-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                  >
                    <span
                      className="block w-[9px] h-[5px] -rotate-45"
                      style={{ borderLeft: '1.5px solid var(--accent)', borderBottom: '1.5px solid var(--accent)' }}
                    />
                  </span>
                  <strong className="text-fg-1 font-medium">{label}</strong>{' '}{body}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Format comparison table ──────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              data-animate="scroll"
              className="serif italic text-fg-1 m-0 mb-2"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              JPEG, PNG, WebP, SVG — which format?
            </h2>
            <p className="text-[13.5px] font-normal leading-[1.6] text-fg-2 m-0 mb-6">
              The right format depends on the image type and intended use.
            </p>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr style={{ background: 'var(--bg-elevated)' }}>
                    {['Format', 'Best for', 'Transparency', 'Typical reduction'].map((h) => (
                      <th key={h} className="text-left py-3 pr-4 first:pl-4 font-data text-[10px] font-medium tracking-[0.12em] uppercase text-fg-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['JPEG',  'Photos, gradients, complex imagery',            'No',  '60–80%'],
                    ['PNG',   'Logos, icons, screenshots, transparency',        'Yes', '40–70%'],
                    ['WebP',  'Web delivery — replaces JPEG and PNG',           'Yes', '25–35% vs JPEG'],
                    ['SVG',   'Icons, logos, diagrams (vector only)',           'Yes', '10–50%'],
                  ].map(([fmt, use, tr, red], i) => (
                    <tr key={fmt} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg)' }}>
                      <td className="py-3 pr-4 pl-4 font-data font-medium text-accent">{fmt}</td>
                      <td className="py-3 pr-4 text-fg-2">{use}</td>
                      <td className="py-3 pr-4 text-fg-2">{tr}</td>
                      <td className="py-3 text-fg-2">{red}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Privacy card ─────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <div data-animate="scroll" className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div
                aria-hidden="true"
                className="absolute top-[-1px] left-[8%] right-[8%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }}
              />
              <span className="hp-eyebrow">Privacy by architecture</span>
              <h2
                className="serif italic text-fg-1 m-0 mb-4"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Your files <span className="text-accent">never</span> leave your browser.
              </h2>
              <p className="text-[14px] font-normal leading-[1.7] text-fg-2 m-0 mb-6 max-w-[60ch]">
                Most online tools upload your file to a server, process it remotely, then send it back. This tool is architecturally different — compression runs via WebAssembly on your CPU. There is no server that receives your image. Not even temporarily.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Open-source processing: Canvas API and pngquant WASM',
                ].map((item) => (
                  <li key={item} className="relative text-[13.5px] leading-[1.55] text-fg-2 pl-7">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[2px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                    >
                      <span
                        className="block w-[9px] h-[5px] -rotate-45"
                        style={{ borderLeft: '1.5px solid var(--accent)', borderBottom: '1.5px solid var(--accent)' }}
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Quality guide ────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Choosing the right quality setting
            </h2>
            <p className="text-[14.5px] font-normal leading-[1.7] text-fg-2 m-0 mb-6">
              The quality slider controls how aggressively the encoder discards image data. Higher quality preserves more detail; lower quality produces smaller files.
            </p>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr style={{ background: 'var(--bg-elevated)' }}>
                    {['Quality range', 'Best for', 'Typical reduction'].map((h) => (
                      <th key={h} className="text-left py-3 pr-4 first:pl-4 font-data text-[10px] font-medium tracking-[0.12em] uppercase text-fg-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['85–100', 'Print, archival, source files for future editing', '10–30%'],
                    ['75–85',  'Web images, blog posts, social media',             '50–75%'],
                    ['60–75',  'Email attachments, preview thumbnails',            '65–80%'],
                    ['Below 60','Small thumbnails where size is the only priority','75–90%'],
                  ].map(([range, use, red], i) => (
                    <tr key={range} style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg)' }}>
                      <td className="py-3 pr-4 pl-4 font-data font-medium text-accent">{range}</td>
                      <td className="py-3 pr-4 text-fg-2">{use}</td>
                      <td className="py-3 text-fg-2">{red}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h2
                className="serif italic text-fg-1 m-0 mb-4"
                style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                How the compressor works
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {[
                  { label: 'JPEG and WebP', body: 'Compressed using the browser\'s native Canvas API encoder. The quality slider maps directly to the encoder\'s quality parameter, controlling how aggressively DCT coefficients are quantised.' },
                  { label: 'PNG', body: 'Uses pngquant compiled to WebAssembly — the same algorithm behind TinyPNG. It reduces the colour palette from 16.7 million (24-bit) to up to 256 colours, achieving 40–70% reduction with near-invisible quality loss.' },
                  { label: 'SVG', body: 'Compression strips XML comments, metadata, and unnecessary whitespace from the source file. Paths, dimensions, and rendering instructions are preserved exactly.' },
                  { label: 'Nothing leaves your device.', body: 'All compression runs locally in your browser. Files are never transmitted to any server at any stage of the process.' },
                ].map(({ label, body }) => (
                  <li key={label} className="relative text-[14px] leading-[1.65] text-fg-2 pl-7">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                    >
                      <span
                        className="block w-[9px] h-[5px] -rotate-45"
                        style={{ borderLeft: '1.5px solid var(--accent)', borderBottom: '1.5px solid var(--accent)' }}
                      />
                    </span>
                    <strong className="text-fg-1 font-medium">{label}</strong>{' '}{body}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Back to top nudge ────────────────────────────── */}
        <div className="bd-t-1 text-center" style={{ padding: '32px 0' }}>
          <a
            href="#compress-tool"
            className="inline-flex items-center gap-2 h-[34px] px-4 rounded-full bg-accent-dim bd-accent text-accent text-[12.5px] font-medium no-underline btn-accent-outline"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-heading"
          className="bd-t-1"
          style={{ padding: 'clamp(48px, 7vw, 88px) 0' }}
        >
          <div className={Cnarrow}>
            <h2
              data-animate="scroll"
              id="faq-heading"
              className="serif italic text-fg-1 text-center"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 clamp(28px, 4vw, 48px)' }}
            >
              Questions answered.
            </h2>

            <div data-animate-stagger className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[20px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[14px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/compress-png-online', '/compress-jpeg-online', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
