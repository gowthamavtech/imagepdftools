import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Image Tools — Free Online Image Editor',
  description:
    'All free browser-based image tools in one place: compress, convert, crop, resize, flip, rotate, and remove metadata. No uploads required.',
  alternates: { canonical: 'https://imagepdf.tools/image-tools' },
  openGraph: {
    type: 'website',
    url: 'https://imagepdf.tools/image-tools',
    title: 'Image Tools — Free Online Image Editor',
    description: '14 free browser-based image tools. Compress, convert, crop, resize — no uploads ever.',
    siteName: 'ImagePDF.Tools',
  },
};

const C = 'max-w-[1180px] mx-auto px-8';

const GROUPS = [
  {
    cat: 'compress',
    label: 'Compress',
    desc: 'Reduce image file sizes without visible quality loss.',
    tools: [
      { href: '/compress-image',       name: 'Image Compressor',   badge: 'Popular', blurb: 'JPG, PNG, WebP — up to 80% smaller' },
      { href: '/compress-png-online',  name: 'PNG Compressor',                        blurb: 'Lossy quantisation, 40–70% smaller' },
      { href: '/compress-jpeg-online', name: 'JPEG Compressor',                       blurb: 'Fine-grained quality control, batches' },
      { href: '/reduce-image-size',    name: 'Reduce Image Size',                     blurb: 'Target file size, like a budget' },
    ],
  },
  {
    cat: 'convert',
    label: 'Convert',
    desc: 'Change image formats without leaving your browser.',
    tools: [
      { href: '/convert-image-to-webp', name: 'Any → WebP',   badge: 'SEO', blurb: 'Modern format, 25% smaller than JPG' },
      { href: '/convert-png-to-jpeg',   name: 'PNG → JPG',                  blurb: 'Lossless transition, full compatibility' },
      { href: '/jpg-to-png',            name: 'JPG → PNG',                  blurb: 'Lossless, transparent backgrounds preserved' },
      { href: '/webp-to-jpg',           name: 'WebP → JPG',                 blurb: 'Back to broader compatibility' },
      { href: '/jpg-to-webp',           name: 'JPG → WebP',                 blurb: 'Compress with next-gen format' },
      { href: '/webp-to-png',           name: 'WebP → PNG',                 blurb: 'Lossless with transparency' },
      { href: '/png-to-webp',           name: 'PNG → WebP',                 blurb: 'Modern delivery, smaller size' },
      { href: '/convert/svg-to-png',    name: 'SVG → PNG',                  blurb: 'Rasterize at any resolution' },
      { href: '/convert/svg-to-jpg',    name: 'SVG → JPG',                  blurb: 'Flatten vector to photo format' },
      { href: '/convert/svg-to-webp',   name: 'SVG → WebP',                 blurb: 'Vector to modern web format' },
    ],
  },
  {
    cat: 'edit',
    label: 'Edit',
    desc: 'Crop, resize, flip, rotate and manage metadata.',
    tools: [
      { href: '/crop-image',      name: 'Crop Image',        blurb: 'Free-form, aspect ratio, or smart crop' },
      { href: '/resize-image',    name: 'Resize Image',      blurb: 'Exact pixels, percentage, or fit-within' },
      { href: '/rotate-image',    name: 'Rotate Image',      blurb: '90°, lossless for JPEG and PNG' },
      { href: '/flip-image',      name: 'Flip Image',        blurb: 'Mirror horizontally or vertically' },
      { href: '/remove-metadata', name: 'Remove Metadata',   badge: 'Privacy', blurb: 'Strip EXIF, location, camera info' },
      { href: '/metadata-editor', name: 'Metadata Editor',   blurb: 'View and edit EXIF fields' },
    ],
  },
];

const catColor = (cat: string) => {
  const map: Record<string, string> = {
    compress: 'var(--cat-compress)',
    convert:  'var(--cat-convert)',
    edit:     'var(--cat-edit)',
  };
  return map[cat] ?? 'var(--fg-3)';
};

const BASE = 'https://imagepdf.tools';

const IMAGE_TOOLS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Online Image Tools',
  description: '14 free browser-based image tools: compress, convert, crop, resize, flip, rotate, and remove metadata.',
  url: `${BASE}/image-tools`,
  numberOfItems: 14,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'Image Compressor',    url: `${BASE}/compress-image` },
    { '@type': 'ListItem', position: 2,  name: 'PNG Compressor',      url: `${BASE}/compress-png-online` },
    { '@type': 'ListItem', position: 3,  name: 'JPEG Compressor',     url: `${BASE}/compress-jpeg-online` },
    { '@type': 'ListItem', position: 4,  name: 'Reduce Image Size',   url: `${BASE}/reduce-image-size` },
    { '@type': 'ListItem', position: 5,  name: 'Convert to WebP',     url: `${BASE}/convert-image-to-webp` },
    { '@type': 'ListItem', position: 6,  name: 'PNG to JPG',          url: `${BASE}/convert-png-to-jpeg` },
    { '@type': 'ListItem', position: 7,  name: 'JPG to PNG',          url: `${BASE}/jpg-to-png` },
    { '@type': 'ListItem', position: 8,  name: 'WebP to JPG',         url: `${BASE}/webp-to-jpg` },
    { '@type': 'ListItem', position: 9,  name: 'Image Resizer',       url: `${BASE}/resize-image` },
    { '@type': 'ListItem', position: 10, name: 'Image Cropper',       url: `${BASE}/crop-image` },
    { '@type': 'ListItem', position: 11, name: 'Flip Image',          url: `${BASE}/flip-image` },
    { '@type': 'ListItem', position: 12, name: 'Rotate Image',        url: `${BASE}/rotate-image` },
    { '@type': 'ListItem', position: 13, name: 'Remove Metadata',     url: `${BASE}/remove-metadata` },
    { '@type': 'ListItem', position: 14, name: 'Metadata Editor',     url: `${BASE}/metadata-editor` },
  ],
};

export default function ImageToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IMAGE_TOOLS_JSONLD) }}
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
            <span data-animate="hero" className="hp-eyebrow">14 Image Tools</span>

            <h1
              data-animate="hero"
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Every image tool.<br />
              <span className="text-accent">All in your browser.</span>
            </h1>

            <p data-animate="hero" className="text-[17px] font-normal leading-[1.6] text-fg-2 max-w-[48ch] mx-auto m-0 mb-8">
              Compress, convert, crop, resize — 14 tools that run entirely on your device.
              No uploads, no account, no waiting.
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

        {/* ── Tool groups ───────────────────────────────────── */}
        <section style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className={C}>
            {GROUPS.map(({ cat, label, desc, tools }, gi) => (
              <div
                key={cat}
                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start py-7"
                style={{ borderBottom: gi < GROUPS.length - 1 ? '1px solid var(--border-1)' : 'none' }}
              >
                {/* Category head */}
                <div className="flex flex-col gap-1 pt-[10px]">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: catColor(cat) }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-data text-[11px] font-medium tracking-[0.18em] uppercase"
                      style={{ color: catColor(cat) }}
                    >
                      ◆ {label}
                    </span>
                  </div>
                  <p className="text-[12.5px] font-normal leading-[1.5] text-fg-3 pl-5 mt-1">{desc}</p>
                </div>

                {/* Tool cards */}
                <div data-animate-stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {tools.map(({ href, name, badge, blurb }) => (
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
            ))}
          </div>
        </section>

        {/* ── PDF cross-link ────────────────────────────────── */}
        <section style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className={C}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Accent hairline */}
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
                  Need <span className="text-accent">PDF tools</span> too?
                </h2>
                <p className="text-[13.5px] font-normal leading-[1.55] text-fg-2 m-0 max-w-[42ch]">
                  Compress, merge, split, rotate PDFs — also 100% in-browser. No uploads.
                </p>
              </div>

              <Link
                href="/pdf-tools"
                className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-[10px] bg-accent text-[13.5px] font-medium no-underline btn-accent"
                style={{ color: 'var(--on-accent)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                All PDF tools →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
