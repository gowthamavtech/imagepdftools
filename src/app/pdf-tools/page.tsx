import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PDF Tools — Free Online PDF Editor',
  description:
    'Free browser-based PDF tools: merge, split, compress, rotate, protect, and more. 10 tools — no uploads, no account, all in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-tools' },
  openGraph: {
    type: 'website',
    url: 'https://imagepdf.tools/pdf-tools',
    title: 'PDF Tools — Free Online PDF Editor',
    description: '10 free browser-based PDF tools. No uploads ever.',
    siteName: 'ImagePDF.Tools',
  },
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';

const PDF_TOOLS = [
  { href: '/compress-pdf',  name: 'Compress PDF',         badge: 'Popular', blurb: 'Down-sample images, dedupe fonts' },
  { href: '/merge-pdf',     name: 'Merge PDF',                              blurb: 'Combine multiple PDFs in order' },
  { href: '/split-pdf',     name: 'Split PDF',                              blurb: 'Extract pages or split into ranges' },
  { href: '/image-to-pdf',  name: 'Image to PDF',                          blurb: 'Bundle images into a single document' },
  { href: '/pdf-to-jpg',    name: 'PDF to JPG',                             blurb: 'Every page exported as JPEG' },
  { href: '/rotate-pdf',    name: 'Rotate PDF',                             blurb: 'Fix orientation, no re-encoding' },
  { href: '/protect-pdf',   name: 'Protect / Unlock PDF', badge: 'New',    blurb: 'AES-128 encryption, in-browser' },
  { href: '/number-pdf',    name: 'Add Page Numbers',     badge: 'New',    blurb: '6 positions, 3 formats, custom start' },
  { href: '/organize-pdf',  name: 'Organize Pages',       badge: 'New',    blurb: 'Drag-and-drop page reorder + delete' },
  { href: '/watermark-pdf', name: 'Watermark PDF',        badge: 'New',    blurb: 'Custom text, opacity, all pages' },
];

const FEATURES = [
  {
    title: 'Zero uploads',
    desc: 'Processing happens entirely in your browser via WebAssembly. Your PDFs never touch a server.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Instant results',
    desc: 'No round-trip to a server. Results are ready in seconds, powered by your own CPU.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Always free',
    desc: 'All core PDF tools are permanently free. No account required to use any of them.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Works everywhere',
    desc: 'Chrome, Safari, Firefox, Edge — desktop and mobile. No extension needed.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

const BASE = 'https://imagepdf.tools';

const PDF_TOOLS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Online PDF Tools',
  description: '10 free browser-based PDF tools: merge, split, compress, image to PDF, PDF to JPG, rotate, protect, page numbers, organize, and watermark.',
  url: `${BASE}/pdf-tools`,
  numberOfItems: 10,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'Compress PDF',         url: `${BASE}/compress-pdf` },
    { '@type': 'ListItem', position: 2,  name: 'Merge PDF',            url: `${BASE}/merge-pdf` },
    { '@type': 'ListItem', position: 3,  name: 'Split PDF',            url: `${BASE}/split-pdf` },
    { '@type': 'ListItem', position: 4,  name: 'Image to PDF',         url: `${BASE}/image-to-pdf` },
    { '@type': 'ListItem', position: 5,  name: 'PDF to JPG',           url: `${BASE}/pdf-to-jpg` },
    { '@type': 'ListItem', position: 6,  name: 'Rotate PDF',           url: `${BASE}/rotate-pdf` },
    { '@type': 'ListItem', position: 7,  name: 'Protect / Unlock PDF', url: `${BASE}/protect-pdf` },
    { '@type': 'ListItem', position: 8,  name: 'Add Page Numbers',     url: `${BASE}/number-pdf` },
    { '@type': 'ListItem', position: 9,  name: 'Organize Pages',       url: `${BASE}/organize-pdf` },
    { '@type': 'ListItem', position: 10, name: 'Watermark PDF',        url: `${BASE}/watermark-pdf` },
  ],
};

export default function PdfToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PDF_TOOLS_JSONLD) }}
      />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          className="relative"
          style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              left: '50%', top: '-10%',
              width: 'min(900px, 100vw)', height: 'min(600px, 100vw)',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(48px)',
              opacity: 0.5,
            }}
          />

          <div className={`${C} relative z-[1] text-center`}>
            <span data-animate="hero" className="hp-eyebrow">10 PDF Tools</span>

            <h1
              data-animate="hero"
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Every PDF tool.<br />
              <span className="text-accent">Right in your browser.</span>
            </h1>

            <p data-animate="hero" className="text-[17px] font-normal leading-[1.6] text-fg-2 max-w-[48ch] mx-auto m-0 mb-8">
              Merge, split, compress, rotate, protect — 10 tools that process your PDFs
              entirely on your device. No uploads, no account.
            </p>

            {/* Trust chips */}
            <div data-animate="hero" className="flex flex-wrap justify-center gap-2">
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

        {/* ── Tool list ─────────────────────────────────────── */}
        <section style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className={C}>

            {/* Featured strip — mirrors footer PDF card */}
            <div className="rounded-[14px] bg-elevated bd-2 p-6 mb-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-data text-[11px] font-medium tracking-[0.18em] uppercase text-accent">
                  ◆ PDF Tools
                </span>
                <span className="font-data text-[9px] font-bold px-2 py-0.5 rounded-full bg-accent-dim bd-accent text-accent">
                  10 tools
                </span>
              </div>

              {/* Tool cards */}
              <div data-animate-stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {PDF_TOOLS.map(({ href, name, badge, blurb }) => (
                  <Link
                    key={href}
                    href={href}
                    className="tool-card relative flex flex-col gap-1.5 p-4 bg-surface bd-2 rounded-[12px] no-underline"
                  >
                    {badge && (
                      <span className="absolute top-3 right-3 font-data text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none bg-accent-dim bd-accent text-accent">
                        {badge}
                      </span>
                    )}
                    <span className="hp-tool-name text-[13.5px] font-medium text-fg-1 tracking-[-0.005em] leading-[1.3] pr-8">
                      {name}
                    </span>
                    <span className="text-[11.5px] font-normal text-fg-3 leading-[1.45]">{blurb}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why section ───────────────────────────────────── */}
        <section style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow">Why ImagePDF.Tools</span>
            <h2
              data-animate="scroll"
              className="serif italic text-fg-1 m-0 mb-10"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Built different. <em className="text-accent">By design.</em>
            </h2>

            <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map(({ title, desc, icon }) => (
                <div key={title} className="bg-surface bd-2 rounded-[14px] py-[26px] px-6">
                  <div className="w-9 h-9 grid place-items-center rounded-[10px] bg-accent-dim bd-accent text-accent mb-4">
                    {icon}
                  </div>
                  <h3 className="text-[15px] font-medium leading-[1.3] text-fg-1 m-0 mb-2 tracking-[-0.005em]">
                    {title}
                  </h3>
                  <p className="text-[13px] font-normal leading-[1.55] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Image tools cross-link ────────────────────────── */}
        <section style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className={C}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div
                aria-hidden="true"
                className="absolute top-[-1px] left-[8%] right-[8%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }}
              />

              <div>
                <span className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-2 block">
                  Also available
                </span>
                <h2
                  className="serif italic text-fg-1 m-0 mb-1"
                  style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                >
                  Need <span className="text-accent">image tools</span> too?
                </h2>
                <p className="text-[13.5px] font-normal leading-[1.55] text-fg-2 m-0 max-w-[42ch]">
                  Compress, convert, crop, resize, flip, rotate images — all 100% in-browser.
                </p>
              </div>

              <Link
                href="/image-tools"
                className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-[10px] bg-accent text-[13.5px] font-medium no-underline btn-accent"
                style={{ color: 'var(--on-accent)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                </svg>
                All image tools →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
