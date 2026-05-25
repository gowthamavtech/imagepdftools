import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompressorUI } from '@/components/CompressorUI';
import Link from 'next/link';

/* ── Conversion config ─────────────────────────────────────────────────── */

interface ConversionConfig {
  from: string;
  to: string;
  toMime: string;
  why: string;
}

export const CONVERSIONS: Record<string, ConversionConfig> = {
  'png-to-jpeg': {
    from: 'PNG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'JPEGs are up to 80% smaller than PNGs for photos — great for web pages, email attachments, and social media.',
  },
  'png-to-jpg': {
    from: 'PNG', to: 'JPG', toMime: 'image/jpeg',
    why: 'JPGs are up to 80% smaller than PNGs for photos — great for web pages, email attachments, and social media.',
  },
  'jpeg-to-png': {
    from: 'JPEG', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless and supports transparency — ideal for logos, icons, and screenshots that need a crisp, clean look.',
  },
  'jpg-to-png': {
    from: 'JPG', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless and supports transparency — ideal for logos, icons, and screenshots that need a crisp, clean look.',
  },
  'png-to-webp': {
    from: 'PNG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP gives you smaller files than PNG while keeping transparency support — the modern choice for web images.',
  },
  'jpeg-to-webp': {
    from: 'JPEG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP beats JPEG by 25–35% in file size at the same visual quality — perfect for faster-loading web pages.',
  },
  'jpg-to-webp': {
    from: 'JPG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP beats JPG by 25–35% in file size at the same visual quality — perfect for faster-loading web pages.',
  },
  'webp-to-jpeg': {
    from: 'WebP', to: 'JPEG', toMime: 'image/jpeg',
    why: 'JPEG is universally supported — convert WebP when you need a file that works in every app and OS.',
  },
  'webp-to-jpg': {
    from: 'WebP', to: 'JPG', toMime: 'image/jpeg',
    why: 'JPG is universally supported — convert WebP when you need a file that works in every app and OS.',
  },
  'webp-to-png': {
    from: 'WebP', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless — convert WebP to PNG when you need to edit the image without any quality degradation.',
  },
  'jpg-to-jpeg': {
    from: 'JPG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'Rename your .jpg file to the standard .jpeg extension — same format, broader compatibility with some tools.',
  },
  'jpeg-to-jpg': {
    from: 'JPEG', to: 'JPG', toMime: 'image/jpeg',
    why: 'Save as .jpg — the shorter extension used by most cameras and Windows apps.',
  },
  'svg-to-png': {
    from: 'SVG', to: 'PNG', toMime: 'image/png',
    why: "Rasterise SVG to a fixed-size PNG when you need a bitmap for apps, presentations, or platforms that don't support SVG.",
  },
  'svg-to-jpg': {
    from: 'SVG', to: 'JPG', toMime: 'image/jpeg',
    why: 'Convert SVG to a compressed JPEG for use in documents, emails, or platforms that require a standard photo format.',
  },
  'svg-to-jpeg': {
    from: 'SVG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'Convert SVG to JPEG for universal compatibility with every app, document, and platform.',
  },
  'svg-to-webp': {
    from: 'SVG', to: 'WebP', toMime: 'image/webp',
    why: 'Convert SVG to WebP for the web — smaller than PNG and JPEG, with broad browser support.',
  },
};

/* ── Static params ─────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(CONVERSIONS).map((slug) => ({ slug }));
}

/* ── Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cfg = CONVERSIONS[slug];
  if (!cfg) return {};
  return {
    title: `Convert ${cfg.from} to ${cfg.to} Online — Free & Private`,
    description: `Convert ${cfg.from} to ${cfg.to} instantly in your browser. No upload, no server — 100% private. ${cfg.why}`,
    alternates: { canonical: `https://imagepdf.tools/convert/${slug}` },
  };
}

/* ── Other-format suggestions ──────────────────────────────────────────── */

function OtherConversions({ current, from }: { current: string; from: string }) {
  const others = Object.entries(CONVERSIONS).filter(
    ([slug, cfg]) => slug !== current && cfg.from === from
  );
  if (others.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
      <span className="text-sm text-fg-2">Also convert {from} to:</span>
      {others.map(([slug, cfg]) => (
        <Link
          key={slug}
          href={`/convert/${slug}`}
          className="inline-flex items-center gap-1 bg-surface bd-2 text-fg-2 hover:text-accent hover:bd-accent px-3 py-1 rounded-full text-xs font-medium transition-colors"
        >
          {cfg.from} → {cfg.to}
        </Link>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default async function ConvertPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cfg = CONVERSIONS[slug];
  if (!cfg) notFound();

  const BASE = 'https://imagepdf.tools';
  const toolUrl = `${BASE}/convert/${slug}`;
  const toolId = `convert-${slug}-tool`;

  const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
  const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `Convert ${cfg.from} to ${cfg.to} Online — Free & Private`,
        description: `Convert ${cfg.from} to ${cfg.to} instantly in your browser. No upload, no server — 100% private. ${cfg.why}`,
        url: toolUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'HowTo',
        name: `How to convert ${cfg.from} to ${cfg.to}`,
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Upload your file', text: `Drop your ${cfg.from} file into the upload area` },
          { '@type': 'HowToStep', position: 2, name: 'Select output format', text: `Output is pre-set to ${cfg.to} — change if needed` },
          { '@type': 'HowToStep', position: 3, name: 'Download converted file', text: 'Click Compress All, then download your converted file' },
        ],
      },
    ],
  };

  const STEPS = [
    { n: '01', title: `Drop your ${cfg.from}`, desc: `Drag and drop your ${cfg.from} file onto the converter, or click to browse.` },
    { n: '02', title: `Output: ${cfg.to}`, desc: `Format is pre-set to ${cfg.to}. Adjust quality if needed.` },
    { n: '03', title: 'Download', desc: 'Your converted file is ready instantly. Download it or save the whole batch as a ZIP.' },
  ];

  const STEP_ICONS = [
    <svg key="upload" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>,
    <svg key="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>,
    <svg key="download" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>,
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id={toolId} className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">{cfg.from} to {cfg.to}</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Convert {cfg.from} to {cfg.to}.<br /><span className="text-accent">Free. Private. Instant.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              {cfg.why}
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
            <OtherConversions current={slug} from={cfg.from} />
          </div>
        </section>

        {/* ── Tool ── */}
        <CompressorUI initialFormat={cfg.toMime} />

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Done.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc }, i) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{STEP_ICONS[i]}</div>
                  <span aria-hidden="true" className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none" style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}>{n}</span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
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
                  'We cannot see, access, or retain your images at any point',
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
          <a href={`#${toolId}`} className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to converter
          </a>
        </div>

      </main>
    </>
  );
}
