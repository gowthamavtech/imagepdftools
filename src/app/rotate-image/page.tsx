import type { Metadata } from 'next';
import { FlipRotateUI } from '@/components/FlipRotateUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Rotate Image Online — Free & Instant',
  description: 'Rotate any image 90°, 180° or 270° in your browser — no upload, no server, 100% private. Supports JPEG, PNG and WebP.',
  alternates: { canonical: 'https://imagepdf.tools/rotate-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Rotate Image Online',
      url: 'https://imagepdf.tools/rotate-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to rotate images 90°, 180°, or 270°. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to rotate an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your JPEG, PNG, or WebP image.' },
        { '@type': 'HowToStep', text: 'Click Rotate Left or Rotate Right to rotate 90° at a time, or enter a custom angle.' },
        { '@type': 'HowToStep', text: 'Download your correctly oriented image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my photo sideways on some devices?', acceptedAnswer: { '@type': 'Answer', text: 'Photos taken in portrait mode are stored rotated with an EXIF orientation flag. Some software reads this flag; others ignore it. Rotating bakes the correct orientation into the pixel data permanently.' } },
        { '@type': 'Question', name: 'Does rotating reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'For 90°/180°/270° JPEG rotations, quality is technically reduced slightly due to re-encoding. At high quality settings the difference is imperceptible. PNG rotations are lossless.' } },
        { '@type': 'Question', name: 'Can I rotate by a custom angle like 45°?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the angle input to set any degree value between 0 and 360.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All rotation happens in your browser using the Canvas API. Your file never leaves your device.' } },
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
    desc: 'Drag any JPEG, PNG, or WebP onto the rotate tool, or click to browse from your device.',
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
    title: 'Choose rotation',
    desc: 'Click Rotate Left or Rotate Right to rotate 90° at a time. For 180°, click twice. Or enter a custom angle directly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21.5 2v6h-6" />
        <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download rotated image',
    desc: 'Your rotated image is ready instantly — orientation baked into pixels, no EXIF ambiguity, no upload.',
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
    q: 'Why is my photo showing sideways on some devices but correctly on others?',
    a: 'Photos taken in portrait mode are often stored rotated, with an EXIF orientation flag telling software to display them correctly. Some software reads this flag; others ignore it. Rotating the image and re-saving bakes the correct orientation into the pixel data so every viewer shows it the right way.',
  },
  {
    q: 'Does rotating reduce image quality?',
    a: 'For 90°, 180°, and 270° rotations of JPEG images, quality is technically reduced slightly because the image must be re-encoded. At a high quality setting, the difference is imperceptible. PNG rotations are fully lossless.',
  },
  {
    q: 'Can I rotate by a custom angle like 45°?',
    a: 'The main rotation buttons rotate in 90° steps. For custom angles, use the angle input to set any degree value between 0 and 360.',
  },
  {
    q: 'Does rotating strip EXIF metadata?',
    a: 'The rotated output is a fresh canvas export, so most EXIF metadata is stripped. This is helpful — it removes the EXIF orientation flag that was causing display inconsistencies across apps and platforms.',
  },
  {
    q: 'Will rotating affect the file size?',
    a: 'For 90° and 270° rotations, the image dimensions swap (width becomes height and vice versa). The pixel content stays the same, so file size changes are minimal. For 180° rotations, dimensions are unchanged.',
  },
  {
    q: 'Can I rotate a PNG without quality loss?',
    a: 'Yes. PNG uses lossless compression, so rotating a PNG and re-exporting it as PNG introduces no quality loss. Every pixel is preserved exactly.',
  },
  {
    q: 'What happens to background areas when I rotate by a custom angle?',
    a: 'For non-90° angles, the canvas expands to fit the rotated image. Newly created corner areas are filled with white for JPEG output, or with transparency for PNG output.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All rotation happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function RotateImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .rot-h1    { opacity: 0; transform: translateY(10px); }
            .rot-sub   { opacity: 0; transform: translateY(10px); }
            .rot-trust { opacity: 0; }
          }
          .rot-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .rot-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .rot-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="rotate-tool"
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
            <span className="hp-eyebrow">Image Rotator</span>

            <h1
              className="rot-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Rotate images online.<br />
              <span className="text-accent">Fix orientation, instantly.</span>
            </h1>

            <p className="rot-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Rotate 90°, 180°, or 270°, or set a custom angle. Supports JPEG, PNG and WebP — everything runs in your browser.
            </p>

            <p className="rot-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
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
          <FlipRotateUI />
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

        {/* ── Why rotate ────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why rotate an <em className="text-accent">image?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              Photo rotation is one of the most common everyday image editing tasks. Smartphones and cameras embed orientation information in EXIF metadata, but many applications, websites, and sharing platforms do not read this data consistently — so a perfectly composed portrait displays sideways in one app and correctly in another.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0">
              Rotating the image and re-saving permanently embeds the correct pixel orientation, eliminating display inconsistencies across all viewers and platforms.
            </p>
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-6"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Common reasons to rotate
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'EXIF orientation compatibility.', text: 'Photos stored rotated with an EXIF orientation tag appear sideways on websites and older software that ignores EXIF. Rotating bakes the correct orientation into the file permanently.' },
                { label: 'Scanned documents and photos.', text: 'Flatbed scanners frequently produce images rotated 90° or 180° depending on how the original was placed. Rotating the scan corrects this without quality loss for PNG output.' },
                { label: 'Landscape photos taken sideways.', text: 'If you held your phone sideways or the shutter triggered during reorientation, the resulting image may be 90° off. One click fixes it.' },
                { label: 'Social media and CMS uploads.', text: 'Many CMS platforms and social networks do not correctly interpret EXIF orientation. Uploading a pixel-level rotated image guarantees it displays correctly everywhere.' },
                { label: 'Email and messaging apps.', text: 'Outlook, Gmail, and many messaging platforms do not reliably preserve EXIF orientation. Rotating before sending ensures the recipient sees it correctly.' },
                { label: 'Print preparation.', text: 'Printing services and design software sometimes import images with the wrong orientation relative to the page layout. Pre-rotating ensures correct positioning in the final print.' },
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

        {/* ── Which angle ───────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              90°, 180°, 270° — <em className="text-accent">which do you need?</em>
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: '90° clockwise', text: 'your portrait photo appears as landscape with the top on the right side.' },
                { label: '90° counter-clockwise', text: 'your portrait photo appears as landscape with the top on the left side.' },
                { label: '180°', text: 'your image appears completely upside down.' },
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
                    <strong className="font-medium text-fg-1">Use {label}</strong> if {text}
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
                The rotate tool uses the browser&apos;s native Canvas API. Your images are rotated and exported entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No server upload — rotation happens on your own CPU',
                  'Strips the EXIF orientation flag that caused display issues',
                  'No account or sign-up required to use any feature',
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
            href="#rotate-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to rotate tool
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

        <RelatedTools hrefs={['/flip-image', '/crop-image', '/resize-image', '/compress-image']} />

      </main>
    </>
  );
}
