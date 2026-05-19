import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter — Free Online',
  description: 'Convert WebP images to lossless PNG format in your browser. Preserve transparency and full quality — no upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/webp-to-png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — WebP to PNG Converter',
      url: 'https://imagepdf.tools/webp-to-png',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert WebP images to PNG format with lossless quality and transparency support. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert WebP to PNG online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Drop your WebP', text: 'Drop your WebP file onto the converter.' },
        { '@type': 'HowToStep', position: 2, name: 'Format: PNG', text: 'The output format is set to PNG (lossless) automatically.' },
        { '@type': 'HowToStep', position: 3, name: 'Download', text: 'Download your PNG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma, or upload it to a platform that does not accept WebP, converting to PNG gives you maximum compatibility.' } },
        { '@type': 'Question', name: 'Does converting WebP to PNG lose quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts.' } },
        { '@type': 'Question', name: 'Is transparency preserved when converting WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your WebP',
    desc: 'Drag and drop WebP files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.',
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
    title: 'Format: PNG (lossless)',
    desc: 'The format is set to PNG (lossless) automatically. Transparency is fully preserved — no additional settings needed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Your converted PNG file is ready instantly. Download it directly or save the whole batch as a ZIP.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const WHEN_TO_CONVERT = [
  {
    title: 'Editing in Photoshop, Illustrator, or GIMP',
    desc: 'While newer versions support WebP natively, many design teams run older versions that do not. Converting to PNG first ensures the file opens correctly.',
  },
  {
    title: 'Figma and design handoff',
    desc: 'PNG is the universally accepted format for design assets. Converting WebP screenshots or assets to PNG ensures compatibility across all design workflows.',
  },
  {
    title: 'Platform upload restrictions',
    desc: 'Some government portals, academic submission systems, and older CMS platforms only accept JPEG and PNG. Converting WebP removes upload rejections.',
  },
  {
    title: 'Archival and lossless storage',
    desc: 'If you want to store an image long-term with guaranteed lossless quality for printing or future re-editing, PNG is more widely supported than WebP for archival purposes.',
  },
  {
    title: 'Windows legacy compatibility',
    desc: 'Older Windows tools like classic Windows Photo Viewer and legacy business applications do not open WebP files. PNG opens in all of them.',
  },
  {
    title: 'Preserving transparency for editing',
    desc: 'If you have a WebP file with a transparent background and need to composite it into a design, converting to PNG preserves the transparency in a universally editable format.',
  },
];

const FAQS = [
  {
    q: 'Why convert WebP to PNG?',
    a: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma — or upload it to a platform that does not accept WebP — converting to PNG gives you maximum compatibility.',
  },
  {
    q: 'Does converting WebP to PNG lose quality?',
    a: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts. The PNG will look identical to the WebP at the same resolution.',
  },
  {
    q: 'Is transparency preserved when converting WebP to PNG?',
    a: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly — which is one of the main reasons to choose PNG over JPEG for this conversion.',
  },
  {
    q: 'Will the PNG file be larger than the WebP?',
    a: 'Yes. PNG uses lossless compression, which is less efficient than WebP for photographs and complex images. A WebP photo converted to PNG will typically be 3–5× larger. PNG is best when you need to edit the file further or need guaranteed lossless quality.',
  },
  {
    q: 'Can I batch convert WebP files to PNG?',
    a: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.',
  },
  {
    q: 'Can I use the converted PNG for printing?',
    a: 'Yes. PNG is a lossless format and is widely accepted by print services and professional software. For best print results, make sure your original WebP image has sufficient resolution for the intended print size.',
  },
  {
    q: 'What is the difference between WebP to PNG and WebP to JPG?',
    a: 'PNG is lossless and preserves transparency — ideal for logos, icons, and images you need to edit further. JPEG is lossy with no transparency support but produces smaller files. Choose PNG when quality and transparency matter, and JPEG when file size is the priority.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.',
  },
];

export default function WebpToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="webp-to-png-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">WebP to PNG</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              WebP to PNG.<br /><span className="text-accent">Lossless. Compatible everywhere.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert WebP images to PNG — full quality preserved, transparency intact. Works with every image editor and platform.
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
        <CompressorUI initialFormat="image/png" />

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Full quality PNG.</em>
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

        {/* ── When to convert ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow">When to convert</span>
            <h2 className="serif italic text-fg-1 m-0 mb-10" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              When WebP to PNG makes sense
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHEN_TO_CONVERT.map(({ title, desc }) => (
                <div key={title} className="rounded-[10px] bg-surface bd-2 p-6">
                  <h3 className="text-[15px] font-medium text-fg-1 m-0 mb-2 leading-[1.4]">{title}</h3>
                  <p className="text-[13.5px] font-normal text-fg-2 m-0 leading-[1.65]">{desc}</p>
                </div>
              ))}
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
              When you drop a WebP file, the browser decodes it using its native WebP decoder and draws it to an HTML Canvas element. The canvas is then exported as PNG using lossless compression. Since PNG is lossless, no quality is lost in the conversion. The alpha channel (transparency) is fully preserved. No data leaves your device — the entire process runs in your browser.
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
                  'Conversion runs locally via the Canvas API — no server upload',
                  'No file data is transmitted, logged, or stored',
                  'Lossless PNG output — every pixel preserved',
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
          <a href="#webp-to-png-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/webp-to-jpg', '/jpg-to-png', '/png-to-webp', '/compress-png-online']} />

      </main>
    </>
  );
}
