import type { Metadata } from 'next';
import { ImageResizeUI } from '@/components/ImageResizeUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Resize Image Online — Free & Private',
  description: 'Resize any image to exact pixel dimensions in your browser. Lock aspect ratio, use presets like HD or 4K, or enter custom width and height. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/resize-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Resizer',
      url: 'https://imagepdf.tools/resize-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image resizer. Set exact pixel dimensions, lock aspect ratio, or use preset sizes. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to resize an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your image by dropping it onto the resize tool.' },
        { '@type': 'HowToStep', text: 'Enter your desired width and height in pixels, or choose a preset.' },
        { '@type': 'HowToStep', text: 'Click Resize and download your resized image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the difference between resizing and cropping?', acceptedAnswer: { '@type': 'Answer', text: 'Resizing scales the entire image — all pixels are kept but scaled up or down. Cropping removes pixels outside a selected region without scaling.' } },
        { '@type': 'Question', name: 'Will resizing reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'Shrinking (downscaling) produces good results. Enlarging (upscaling) beyond original dimensions causes blurring because new pixel data is interpolated.' } },
        { '@type': 'Question', name: 'Can I resize to a specific file size?', acceptedAnswer: { '@type': 'Answer', text: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
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
    desc: 'Drag any JPEG, PNG, or WebP onto the resize tool, or click to browse from your device.',
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
    title: 'Set dimensions',
    desc: 'Enter target width and height in pixels, pick a preset like HD or 4K, or scale by percentage. Lock aspect ratio to avoid distortion.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download resized image',
    desc: 'Click Resize and your image is ready instantly at the exact dimensions you specified — no upload, no wait.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const SIZE_PRESETS = [
  ['Instagram post (square)', '1080 × 1080 px'],
  ['Instagram / TikTok story', '1080 × 1920 px'],
  ['Twitter / X post image', '1600 × 900 px'],
  ['Facebook cover photo', '851 × 315 px'],
  ['LinkedIn profile photo', '400 × 400 px'],
  ['YouTube thumbnail', '1280 × 720 px'],
  ['Website hero image (HD)', '1920 × 1080 px'],
  ['Email attachment (general)', 'Max 1200 px wide'],
  ['A4 print at 300 DPI', '2480 × 3508 px'],
  ['App icon (iOS)', '1024 × 1024 px'],
];

const FAQS = [
  {
    q: 'What is the difference between resizing and cropping?',
    a: 'Resizing scales the entire image — all pixels are kept but scaled up or down to the new dimensions. Cropping removes pixels outside a selected region without scaling. Use resize to change the canvas size; use crop to change the composition.',
  },
  {
    q: 'Will resizing reduce image quality?',
    a: 'Shrinking an image (downscaling) produces very good results with minimal quality loss. Enlarging an image (upscaling) beyond its original dimensions will result in some blurring because new pixel information is interpolated. For best results, start with the largest version of the image available.',
  },
  {
    q: 'Can I resize by percentage instead of pixel dimensions?',
    a: 'Yes. The tool supports both pixel dimensions and percentage scaling. Enter a percentage (e.g. 50% to halve the dimensions) to scale relative to the original image size.',
  },
  {
    q: 'What format will my resized image be saved in?',
    a: 'The output format matches the input format by default. You can also choose to export in a different format — JPEG, PNG, or WebP — using the format selector.',
  },
  {
    q: 'Can I resize to a specific file size rather than pixel dimensions?',
    a: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool which lets you control quality and file size output directly.',
  },
  {
    q: 'Will resizing affect the image DPI for printing?',
    a: 'The tool resizes pixel dimensions, not DPI. For print use, ensure your resized output has sufficient pixels for the intended print size at 300 DPI. For example, A4 at 300 DPI requires 2480 × 3508 pixels.',
  },
  {
    q: 'What is the maximum size I can resize to?',
    a: 'There is no hard limit enforced by the tool, but browsers have memory constraints. Very large output dimensions (above 10,000 × 10,000 pixels) may cause the browser tab to slow down on lower-spec devices.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function ResizeImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ri-h1    { opacity: 0; transform: translateY(10px); }
            .ri-sub   { opacity: 0; transform: translateY(10px); }
            .ri-trust { opacity: 0; }
          }
          .ri-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .ri-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ri-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="resize-tool"
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
            <span className="hp-eyebrow">Image Resizer</span>

            <h1
              className="ri-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Resize images online.<br />
              <span className="text-accent">Exact pixels, instantly.</span>
            </h1>

            <p className="ri-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Set exact pixel dimensions, lock aspect ratio, or pick HD and 4K presets. Everything runs in your browser — no upload ever.
            </p>

            <p className="ri-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · No upload
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
          <ImageResizeUI />
        </div>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2
              className="serif italic text-fg-1 text-center m-0 mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Three steps. <em className="text-accent">Instant results.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
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

        {/* ── Why resize ────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why resize an <em className="text-accent">image?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              Modern cameras and smartphones produce images at 12–200 megapixels — far more resolution than most use cases need. A 50 MP photo produces a file that is 20–50 MB and 8000+ pixels wide. Sending it via email or uploading to a website is slow, wasteful, and sometimes impossible due to file size or dimension limits.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0">
              Resizing brings the image down to the exact dimensions required by the platform, application, or print specification — without cropping any content. Every pixel is retained, just scaled to fit.
            </p>
          </div>
        </section>

        {/* ── Common image sizes table ──────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-2"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Common image sizes by platform
            </h2>
            <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-6">
              Reference dimensions for the most common use cases.
            </p>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-elevated">
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Use case</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Recommended size</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_PRESETS.map(([use, size], i) => (
                    <tr key={use} className={i % 2 === 0 ? 'bg-surface' : 'bg-page'}>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{use}</td>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="font-data text-[11.5px] font-medium text-accent">{size}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Resize vs compress ────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Resize vs. <em className="text-accent">compress</em> — which do you need?
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-5">
              Resizing and compression are complementary, not competing, techniques.
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Resize', text: 'when the image has too many pixels for its intended use — for example, a 6000×4000 px photo displayed at 1200×800 px. Keeping the extra pixels wastes bandwidth.' },
                { label: 'Compress', text: 'when the pixel dimensions are already appropriate but the file size is too large — for example, a correctly sized 1200×800 px JPEG that is still 2 MB because it was saved at 100% quality.' },
                { label: 'Both', text: 'when the image is oversized in both dimensions and file size. Resize first to the correct pixel dimensions, then compress to reduce the file size further.' },
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
                    <strong className="font-medium text-fg-1">{label}:</strong> {text}
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
                Your image never leaves your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                The resize tool uses the browser's native Canvas API. Your images are scaled and exported entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No server upload — resizing happens on your own CPU',
                  'No account or sign-up required to use any feature',
                  'Original image is never modified — only the download is resized',
                  'Works offline once the page has loaded',
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
            href="#resize-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to resize tool
          </a>
        </div>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2
              className="serif italic text-fg-1 m-0 mb-8"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Frequently asked questions
            </h2>

            <div className="bd-t-1">
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

        <RelatedTools hrefs={['/crop-image', '/compress-image', '/convert-image-to-webp', '/reduce-image-size']} />

      </main>
    </>
  );
}
