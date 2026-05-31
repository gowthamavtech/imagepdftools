import type { Metadata } from 'next';
import { FlipRotateUI } from '@/components/FlipRotateUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Flip Image Online — Free & Instant',
  description: 'Flip any image horizontally or vertically in your browser — no upload, no server, 100% private. Supports JPEG, PNG and WebP.',
  alternates: { canonical: 'https://imagepdf.tools/flip-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Flip Image Online',
      url: 'https://imagepdf.tools/flip-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to flip images horizontally or vertically. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to flip an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your JPEG, PNG, or WebP image.' },
        { '@type': 'HowToStep', text: 'Click Flip Horizontal or Flip Vertical.' },
        { '@type': 'HowToStep', text: 'Download your flipped image instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the difference between flip horizontal and flip vertical?', acceptedAnswer: { '@type': 'Answer', text: 'Flip horizontal creates a left-to-right mirror image. Flip vertical flips the image upside down.' } },
        { '@type': 'Question', name: 'Why do selfies often look wrong to others?', acceptedAnswer: { '@type': 'Answer', text: 'Front-facing cameras show a mirrored preview. When the photo is saved, some phones save it mirrored. Use Flip Horizontal to correct it.' } },
        { '@type': 'Question', name: 'Does flipping reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Flipping is a non-destructive pixel transformation — no pixels are added, removed, or recompressed.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All flipping happens in your browser using the Canvas API. Your file never leaves your device.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Drag any JPEG, PNG, or WebP onto the flip tool, or click to browse from your device.',
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
    title: 'Flip or mirror',
    desc: 'Click Flip Horizontal for a left-right mirror, or Flip Vertical to flip upside down. Combine with rotation if needed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3" />
        <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
        <line x1="12" y1="20" x2="12" y2="4" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download flipped image',
    desc: 'Your flipped image is ready instantly. Download in the same format — full quality, no upload.',
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
    q: 'What is the difference between flip horizontal and flip vertical?',
    a: 'Flip horizontal (also called mirror) creates a left-to-right mirror image — like looking at the original in a mirror. Flip vertical flips the image upside down, creating a top-to-bottom mirror.',
  },
  {
    q: 'Why do selfies often look wrong to others?',
    a: 'Front-facing cameras show a mirrored preview so you see yourself as you normally do in a mirror. But when the photo is saved, some phones save it as-is (mirrored). If your selfie looks reversed to others, use Flip Horizontal to correct it.',
  },
  {
    q: 'Does flipping reduce image quality?',
    a: 'No. Flipping is a non-destructive pixel transformation — no pixels are added, removed, or recompressed. The output is identical in quality to the input.',
  },
  {
    q: 'Can I flip and rotate in the same operation?',
    a: 'Yes. The tool supports both flipping and rotating independently. Apply both operations before downloading — the result will include all transformations applied.',
  },
  {
    q: 'Does flipping change the file size?',
    a: 'The output file size will be very similar to the input. The flip operation does not change the amount of pixel data, so any file size difference is minimal.',
  },
  {
    q: 'Will flipping strip EXIF metadata?',
    a: 'The flipped output is a fresh canvas export, so most EXIF metadata is stripped. This is actually helpful — it removes the EXIF orientation flag that was causing display inconsistencies across apps.',
  },
  {
    q: 'Can I flip an animated WebP or GIF?',
    a: 'This tool processes static images. Animated WebP or GIF files are not supported — only the first frame would be processed.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All flipping happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function FlipImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .fi-h1    { opacity: 0; transform: translateY(10px); }
            .fi-sub   { opacity: 0; transform: translateY(10px); }
            .fi-trust { opacity: 0; }
          }
          .fi-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .fi-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .fi-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="flip-tool"
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
            <span className="hp-eyebrow">Image Flipper</span>

            <h1
              className="fi-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Flip images online.<br />
              <span className="text-accent">One click mirror.</span>
            </h1>

            <p className="fi-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Mirror your image horizontally or vertically in one click. Supports JPEG, PNG and WebP — everything runs in your browser.
            </p>

            <p className="fi-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
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

        {/* ── Why flip ──────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              When you need to <em className="text-accent">flip an image</em>
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Fixing mirrored selfies.', text: 'Front-facing cameras often save photos in a mirrored orientation. The preview looks right because it matches what you see in a mirror — but text and details appear reversed to others. Flipping horizontally corrects this in one click.' },
                { label: 'Creating symmetrical compositions.', text: 'Designers and photographers flip one half of an image and layer it over the original to create perfectly symmetrical compositions — common in portrait retouching, abstract art, and architectural photography.' },
                { label: 'Product photography corrections.', text: 'If a product was photographed facing the wrong direction for a layout (a shoe facing left when the template requires right), flipping saves you from a reshoot.' },
                { label: 'Fixing scanner orientation.', text: 'Flatbed scanners sometimes produce images upside down or mirrored depending on how the document was placed. A quick flip corrects the scan instantly.' },
                { label: 'Creating mirror effects for design.', text: 'Reflections, shadows, and symmetry effects all rely on a flipped copy of the original. Flipping is a starting point for more complex design work.' },
                { label: 'Social media templates.', text: 'Some Instagram and Pinterest templates are designed for images facing a specific direction. Flipping ensures the subject faces the correct way within the layout.' },
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

        {/* ── H vs V ────────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Horizontal vs. <em className="text-accent">vertical flip</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              <strong className="font-medium text-fg-1">Flip Horizontal</strong> (left-right mirror) is the most commonly used. It is the correct fix for mirrored selfies, left-right composition issues, and mirror effects.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0">
              <strong className="font-medium text-fg-1">Flip Vertical</strong> (top-bottom mirror) turns the image upside down. This is useful for creating water reflection effects in landscape photography, correcting documents scanned upside down, and certain graphic design techniques.
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
                Your image never leaves your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                The flip tool uses the browser&apos;s native Canvas API. Your images are mirrored and exported entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No server upload — flipping happens on your own CPU',
                  'No account or sign-up required to use any feature',
                  'Non-destructive — your original file is never modified',
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
            href="#flip-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to flip tool
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

        <RelatedTools hrefs={['/rotate-image', '/crop-image', '/resize-image', '/compress-image']} />

      </main>
    </>
  );
}
