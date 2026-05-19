import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Reduce Image Size Online — Free Image Resizer & Compressor',
  description:
    'Reduce image size online for free. Compress JPEG, PNG, and WebP images without losing quality. All processing happens in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/reduce-image-size' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Reduce Image Size',
      url: 'https://imagepdf.tools/reduce-image-size',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to reduce image file size for JPEG, PNG, and WebP. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to reduce image size online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the tool.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control the degree of compression.' },
        { '@type': 'HowToStep', text: 'Download your smaller image file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can you reduce image size without losing quality?', acceptedAnswer: { '@type': 'Answer', text: 'For JPEG and WebP images, you can typically reduce file size by 60–80% at quality 75–85 with minimal visible quality loss at screen sizes. PNG can be reduced by 40–70% using colour quantisation. The quality slider lets you find the right balance.' } },
        { '@type': 'Question', name: 'What is the difference between reducing image size and resizing an image?', acceptedAnswer: { '@type': 'Answer', text: 'Reducing image size (compression) makes the file smaller in kilobytes while keeping the same pixel dimensions. Resizing changes the pixel dimensions — the canvas size — which also makes the file smaller but changes how large the image appears. For web performance, you often want both: resize to the correct display dimensions, then compress to reduce the file size further.' } },
        { '@type': 'Question', name: 'Which format gives the smallest file size?', acceptedAnswer: { '@type': 'Answer', text: 'WebP typically produces the smallest files — 25–35% smaller than JPEG and 25% smaller than PNG at equivalent quality. If you are not restricted to a specific format, converting to WebP will give you the smallest file.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All compression happens in your browser using the Canvas API and pngquant WASM for PNG. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I reduce multiple images at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch processing and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Does reducing image size change the pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 pixels after compression. To change pixel dimensions, use the Resize Image tool.' } },
        { '@type': 'Question', name: 'What quality setting should I start with?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 80 is a good starting point for most images. At quality 80, JPEG and WebP files are typically 50–70% smaller than quality 100 with no visible loss at screen sizes. If the result looks identical to the original, try lowering to 70.' } },
        { '@type': 'Question', name: 'Can I preview the quality before downloading?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each file card shows original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider and compare quality before downloading.' } },
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
    desc: 'Drag any JPEG, PNG, WebP, or SVG onto the zone or click to browse. Up to 50 MB per file.',
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
    title: 'Adjust quality',
    desc: 'The slider controls how aggressively image data is discarded. Quality 80 is a good starting point.',
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
    title: 'Download the result',
    desc: 'Your browser compresses locally. Compare sizes before downloading. No data leaves your device.',
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
    q: 'How much can you reduce image size without losing quality?',
    a: 'For JPEG and WebP images, you can typically reduce file size by 60–80% at quality 75–85 with minimal visible quality loss at screen sizes. PNG can be reduced by 40–70% using colour quantisation. The quality slider lets you find the right balance.',
  },
  {
    q: 'What is the difference between reducing image size and resizing an image?',
    a: 'Reducing image size (compression) makes the file smaller in kilobytes while keeping the same pixel dimensions. Resizing changes the pixel dimensions — the canvas size — which also makes the file smaller but changes how large the image appears. For web performance, you often want both: resize to the correct display dimensions, then compress to reduce the file size further.',
  },
  {
    q: 'Which format gives the smallest file size?',
    a: 'WebP typically produces the smallest files — 25–35% smaller than JPEG and 25% smaller than PNG at equivalent quality. If you are not restricted to a specific format, converting to WebP will give you the smallest file.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All compression happens in your browser using the Canvas API and pngquant WASM for PNG. Your file never leaves your device.',
  },
  {
    q: 'Can I reduce multiple images at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch processing and can download everything as a ZIP.',
  },
  {
    q: 'Does reducing image size change the pixel dimensions?',
    a: 'No. This tool reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 pixels after compression. To change pixel dimensions, use the Resize Image tool.',
  },
  {
    q: 'What quality setting should I start with?',
    a: 'Quality 80 is a good starting point for most images. At quality 80, JPEG and WebP files are typically 50–70% smaller than quality 100 with no visible loss at screen sizes. If the result looks identical to the original, try lowering to 70.',
  },
  {
    q: 'Can I preview the quality before downloading?',
    a: 'Yes. Each file card shows original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider and compare quality before downloading.',
  },
];

export default function ReduceImageSizePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ris-h1  { opacity: 0; transform: translateY(10px); }
            .ris-sub { opacity: 0; transform: translateY(10px); }
            .ris-trust { opacity: 0; }
          }
          .ris-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .ris-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ris-trust {
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
          id="reduce-tool"
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
            <span className="hp-eyebrow">Image Size Reducer</span>

            <h1
              className="ris-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Reduce image size online.<br />
              <span className="text-accent">No account needed.</span>
            </h1>

            <p className="ris-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Compress JPEG, PNG, WebP, and SVG images for web, email, or social media. Everything runs in your browser — nothing uploaded.
            </p>

            <p className="ris-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · Supports JPEG · PNG · WebP · SVG
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
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

        {/* ── Why reduce image size ─────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why does <em className="text-accent">image size matter?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              A photo from a modern smartphone is often 4–10 MB. While excellent for printing, it is far more than needed for web use, email, or social media — and sending oversized images creates friction at every step.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">
              Reducing image size eliminates that friction: images attach to emails without rejection, upload to platforms without errors, load faster on web pages, and transfer more quickly over mobile networks.
            </p>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Email attachments.', text: 'Gmail limits attachments to 25 MB; Outlook to 20 MB. A 2 MB image is universally easier to work with than an 8 MB original.' },
                { label: 'Website uploads.', text: 'WordPress, Squarespace, and most CMS platforms have upload size limits (often 2–10 MB). Reducing image size before uploading avoids rejected uploads.' },
                { label: 'Social media.', text: 'Instagram, Facebook, and LinkedIn recompress images on upload. Uploading a pre-compressed image gives you more control over the final quality.' },
                { label: 'Messaging apps.', text: 'WhatsApp compresses images automatically, often significantly. Sharing a pre-compressed image preserves more detail than letting the app crush it.' },
                { label: 'Web performance and SEO.', text: "Google uses page speed as a ranking factor. The largest images on a page directly affect Largest Contentful Paint (LCP). Smaller images improve your search ranking." },
                { label: 'Cloud storage management.', text: 'If you back up photos to Google Photos, iCloud, or Dropbox, reducing sizes before backup can save gigabytes of storage over time.' },
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

        {/* ── Best results tips ─────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              How to get <em className="text-accent">the best results.</em>
            </h2>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                'For photos (JPEG, WebP): start at quality 80. If the result looks identical to the original, try 70. Most people cannot see a difference between quality 75 and 100 on screen.',
                'For graphics, logos, and screenshots (PNG): the compressor uses colour quantisation. Start at quality 80 for transparent PNGs; you can often go lower for solid-colour graphics.',
                'If you need the absolute smallest file and format is flexible, try converting to WebP — it almost always produces smaller files than compressed JPEG or PNG.',
                'Always keep the original file. Compress a copy. Lossy compression is irreversible.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] text-fg-2 leading-[1.55]">{tip}</span>
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
                Most online tools upload your file to a server, process it remotely, then send it back. This tool is architecturally different: compression runs via WebAssembly on your CPU. There is no server that receives your image. Not even temporarily.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Open-source processing: Canvas API and pngquant WASM',
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
            href="#reduce-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to tool
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

        <RelatedTools hrefs={['/compress-image', '/compress-jpeg-online', '/compress-png-online', '/resize-image']} />
      </main>
    </>
  );
}
