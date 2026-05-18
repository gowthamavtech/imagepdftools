import type { Metadata } from 'next';
import { ImageCropUI } from '@/components/ImageCropUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Crop Image Online — Free & Private',
  description: 'Crop any image directly in your browser. Select any area, choose aspect ratios like 1:1 or 16:9, and save. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/crop-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Cropper',
      url: 'https://imagepdf.tools/crop-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image cropping tool with aspect ratio presets. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to crop an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your image by dropping it onto the crop tool.' },
        { '@type': 'HowToStep', text: 'Drag the crop handles to select the area you want to keep, or choose a preset aspect ratio.' },
        { '@type': 'HowToStep', text: 'Click Crop and download your cropped image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I crop to an exact pixel size?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the free crop mode and drag the handles to your desired area. The pixel dimensions of your crop selection are shown in real time.' } },
        { '@type': 'Question', name: 'What aspect ratios are available?', acceptedAnswer: { '@type': 'Answer', text: 'You can crop freely (no ratio lock), or choose from presets: 1:1 (square), 4:3, 16:9 (landscape), 9:16 (portrait/Stories), and others.' } },
        { '@type': 'Question', name: 'Does cropping reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'Cropping itself does not degrade quality — it simply removes the pixels outside the selection. The retained pixels are exported at full quality.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All cropping happens in your browser using the Canvas API. Your file never leaves your device.' } },
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
    desc: 'Drag any JPEG, PNG, or WebP onto the crop tool, or click to browse from your device.',
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
    title: 'Select your crop area',
    desc: 'Drag handles to define your selection. Pick a preset ratio — 1:1, 16:9, 4:3 — or crop freely to any dimensions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 2v14a2 2 0 0 0 2 2h14" />
        <path d="M18 22V8a2 2 0 0 0-2-2H2" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download cropped image',
    desc: 'Click Crop and save your result instantly — same format, full quality, zero upload.',
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
    q: 'Can I crop to an exact pixel size?',
    a: 'Yes. Use the free crop mode and drag the handles to your desired area. The pixel dimensions of your crop selection are shown in real time so you can hit an exact size.',
  },
  {
    q: 'What aspect ratios are available?',
    a: 'You can crop freely (no ratio lock), or choose from presets: 1:1 (square, for Instagram posts), 4:3, 16:9 (landscape video), 9:16 (portrait/Stories), and others.',
  },
  {
    q: 'Does cropping reduce image quality?',
    a: 'Cropping itself does not degrade quality — it simply removes the pixels outside the selection. The retained pixels are exported at full quality.',
  },
  {
    q: 'Can I crop to a custom aspect ratio?',
    a: 'Yes. Use free crop mode and drag to any proportions you need. The tool shows the current pixel dimensions and aspect ratio in real time as you drag.',
  },
  {
    q: 'What happens to the file size after cropping?',
    a: 'File size decreases roughly in proportion to the area removed. Cropping 50% of an image typically reduces file size by 40–60%, depending on the content of the removed region.',
  },
  {
    q: 'Does cropping affect EXIF metadata?',
    a: 'The cropped output is a fresh canvas export, so most EXIF metadata (GPS coordinates, camera settings) is stripped. Only basic properties like dimensions are retained in the output file.',
  },
  {
    q: 'Can I undo a crop?',
    a: 'Yes — re-upload the original image and crop again. The tool never modifies your original file. It only creates a new cropped version when you download.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All cropping happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function CropImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ci-h1   { opacity: 0; transform: translateY(10px); }
            .ci-sub  { opacity: 0; transform: translateY(10px); }
            .ci-trust { opacity: 0; }
          }
          .ci-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .ci-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ci-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="crop-tool"
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
            <span className="hp-eyebrow">Image Cropper</span>

            <h1
              className="ci-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Crop images online.<br />
              <span className="text-accent">Any ratio, instantly.</span>
            </h1>

            <p className="ci-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Drag to select any area, pick a preset ratio, or crop freely. Runs entirely in your browser — no upload ever.
            </p>

            <p className="ci-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
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
          <ImageCropUI />
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

        {/* ── Why crop ──────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why crop an <em className="text-accent">image?</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">
              Cropping is one of the most fundamental image editing operations. It removes unwanted parts, reframes the composition, and adjusts the aspect ratio — without scaling or degrading the remaining pixels. Unlike resizing, which shrinks the whole image, cropping physically removes pixels outside a selected region, leaving the rest at full resolution.
            </p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0">
              Whether you are preparing a profile picture, trimming a product photo for an online listing, or cutting a screenshot to show only the relevant section, cropping is the fastest way to get the framing right.
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
              When to crop — and why
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Social media profile pictures.', text: 'Instagram, LinkedIn, and most platforms display profile photos as squares (1:1). Cropping before upload ensures the important part is centred, not auto-cropped by the platform.' },
                { label: 'YouTube thumbnails.', text: 'Thumbnails must be 16:9 ratio (1280×720 recommended). Cropping to the exact ratio before uploading prevents automatic cuts that can remove your subject.' },
                { label: 'Product photography.', text: 'Platforms like Amazon and Shopify require images with specific aspect ratios. Cropping to a square with the product centred gives you full control over the final display.' },
                { label: 'Removing distracting backgrounds.', text: 'Photos of documents, whiteboards, or artwork often include unwanted surroundings. Cropping removes the distraction and focuses attention on the content.' },
                { label: 'Passport and ID photos.', text: 'Government and visa applications specify exact crop ratios (often 35mm × 45mm, face centred). Cropping to spec avoids rejection.' },
                { label: 'Blog and CMS featured images.', text: 'Most CMS platforms display featured images at a fixed aspect ratio. Cropping before upload prevents the platform from making poor automatic crops.' },
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
                Your image never leaves your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                The crop tool uses the browser's native Canvas API. Your images are processed entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No server upload — cropping happens on your own CPU',
                  'No account or sign-up required to use any feature',
                  'Original image is never modified — only the download is cropped',
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
            href="#crop-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to crop tool
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

        <RelatedTools hrefs={['/resize-image', '/flip-image', '/rotate-image', '/compress-image']} />

      </main>
    </>
  );
}
