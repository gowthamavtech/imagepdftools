import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
  description:
    'Free private image compressor & converter online — JPEG, PNG, WebP, PDF. No-upload image tools powered by WebAssembly. Files never leave your browser. 100% secure.',
  keywords: [
    'image compressor', 'compress image online', 'compress PDF online',
    'free image tools', 'reduce image size', 'convert image to webp',
    'resize image online', 'crop image online', 'png compressor',
    'jpeg compressor', 'image to pdf', 'browser image tools',
  ],
  alternates: { canonical: 'https://imagepdf.tools' },
  openGraph: {
    type: 'website',
    url: 'https://imagepdf.tools',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description: 'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads, no account, 100% private.',
    siteName: 'ImagePDF.Tools',
    images: [{ url: 'https://imagepdf.tools/og-image.png', width: 1200, height: 630, alt: 'ImagePDF.Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description: 'Compress, convert, crop, resize images and PDFs — all free, all in your browser.',
    images: ['https://imagepdf.tools/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const jsonLd = [
  {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'ImagePDF.Tools', url: 'https://imagepdf.tools',
    description: 'Free browser-based image and PDF tools. No uploads required.',
  },
  {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'ImagePDF.Tools', url: 'https://imagepdf.tools',
    logo: 'https://imagepdf.tools/icons/logo.svg',
    contactPoint: { '@type': 'ContactPoint', email: 'contact@imagepdf.tools', contactType: 'customer support' },
  },
  {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Are these tools really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All core tools are permanently free with no account required.' } },
      { '@type': 'Question', name: 'Do you upload my files to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API.' } },
    ],
  },
];

const TOOLS = [
  {
    category: 'Compress',
    color: '#9D95F5',
    bg: 'rgba(157,149,245,0.1)',
    items: [
      { href: '/compress-image',       label: 'Image Compressor',  desc: 'JPEG · PNG · WebP — up to 80% smaller' },
      { href: '/compress-png-online',  label: 'PNG Compressor',    desc: 'Lossy quantisation, 40–70% reduction' },
      { href: '/compress-jpeg-online', label: 'JPEG Compressor',   desc: 'Fine-grained quality control, instant' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size', desc: 'Target file size across any format' },
      { href: '/compress-pdf',         label: 'Compress PDF',      desc: 'Ghostscript WASM — no quality loss' },
    ],
  },
  {
    category: 'Convert',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    items: [
      { href: '/convert-image-to-webp', label: 'Any → WebP',    desc: 'Modern format, 35% smaller than JPEG' },
      { href: '/convert-png-to-jpeg',   label: 'PNG → JPG',     desc: 'Universal compatibility, small size' },
      { href: '/jpg-to-png',            label: 'JPG → PNG',     desc: 'Lossless with transparency support' },
      { href: '/webp-to-jpg',           label: 'WebP → JPG',    desc: 'Broad device compatibility' },
      { href: '/convert/svg-to-png',    label: 'SVG → PNG',     desc: 'Rasterise at any resolution' },
    ],
  },
  {
    category: 'Edit',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    items: [
      { href: '/crop-image',      label: 'Crop Image',       desc: 'Free crop or aspect ratio presets' },
      { href: '/resize-image',    label: 'Resize Image',     desc: 'Exact px or percentage scale' },
      { href: '/rotate-image',    label: 'Rotate Image',     desc: 'Any angle, fix EXIF orientation' },
      { href: '/remove-metadata', label: 'Remove Metadata',  desc: 'Strip GPS & camera data before sharing' },
      { href: '/metadata-editor', label: 'Metadata Editor',  desc: 'View and edit full EXIF data' },
    ],
  },
  {
    category: 'PDF',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
    items: [
      { href: '/image-to-pdf', label: 'Image → PDF', desc: 'Bundle images into a single PDF' },
      { href: '/merge-pdf',    label: 'Merge PDF',   desc: 'Combine multiple PDFs into one' },
      { href: '/split-pdf',    label: 'Split PDF',   desc: 'Extract pages or split by range' },
    ],
  },
];

const FAQS = [
  { q: 'Are these tools really free?', a: 'Yes. All core tools — compress, convert, crop, resize, flip, rotate, remove metadata — are permanently free with no account required.' },
  { q: 'Do you upload my images or PDFs to a server?', a: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device.' },
  { q: 'Which formats are supported?', a: 'JPEG, PNG, WebP, and SVG for image tools. PDF tools support standard PDFs and JPEG/PNG/WebP input for Image to PDF.' },
  { q: 'How much can I compress an image?', a: 'JPEG and WebP typically reduce 60–80% at quality 80. PNG uses pngquant lossy quantisation for 40–70% reduction.' },
  { q: 'Does this work on mobile?', a: 'Yes. All tools work on iOS and Android in Chrome, Safari, Firefox, and Edge. No app download needed.' },
  { q: 'Why use WebP instead of JPEG?', a: 'WebP offers 25–35% smaller file sizes at the same visual quality, with support for transparency. All modern browsers support it.' },
];

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main className="flex-1">

          {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-[#F7F6F3] dark:bg-[#08080F] px-4 pt-16 pb-0">
            {/* Subtle top-right glow for dark mode */}
            <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none dark:opacity-100 opacity-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(157,149,245,0.15) 0%, transparent 65%)' }} />

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-end">

                {/* Left — text */}
                <div className="pb-16 lg:pb-24 pt-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-9" style={{ border: '1px solid rgba(157,149,245,0.35)', background: 'rgba(157,149,245,0.08)', color: '#9D95F5' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D95F5] animate-pulse" />
                    100% private · No uploads · Free forever
                  </div>

                  {/* Headline */}
                  <h1
                    className="leading-[1.0] tracking-tight mb-7 text-slate-900 dark:text-white"
                    style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(3.2rem, 7vw, 6rem)' }}
                  >
                    <span className="block">Your files.</span>
                    <span className="block">Your device.</span>
                    <span className="block" style={{ color: '#9D95F5' }}>Your rules.</span>
                  </h1>

                  {/* Subline */}
                  <p className="text-base sm:text-lg leading-relaxed mb-10 text-slate-500 dark:text-slate-400 max-w-md">
                    20+ professional image &amp; PDF tools — all running privately inside your browser. No servers. No sign-up. No waiting.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 mb-10">
                    <Link
                      href="/compress-image"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                      style={{ background: '#9D95F5', boxShadow: '0 4px 20px rgba(157,149,245,0.4)' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                      </svg>
                      Explore all tools
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl transition-all hover:bg-slate-200/60 dark:hover:bg-white/8"
                      style={{ border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.04)' }}
                    >
                      How it works
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: '🔒', label: 'No upload ever' },
                      { icon: '⚡', label: 'Works offline' },
                      { icon: '🆓', label: 'No account needed' },
                      { icon: '📱', label: 'Mobile friendly' },
                    ].map(({ icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)' }}>
                        <span>{icon}</span>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — product mockup */}
                <div className="relative flex items-end justify-center lg:justify-end pb-0">
                  {/* Glow under card */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(157,149,245,0.25) 0%, transparent 70%)' }} />

                  {/* Browser frame */}
                  <div className="relative w-full max-w-lg rounded-t-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(0,0,0,0.10)', borderBottom: 'none', background: '#fff' }}>
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100" style={{ background: '#F0EFEC' }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 border border-slate-200 flex items-center gap-2">
                        <svg className="w-2.5 h-2.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        imagepdf.tools/compress-image
                      </div>
                    </div>

                    {/* App UI */}
                    <div className="p-5 space-y-4" style={{ background: '#FAFAF8' }}>
                      {/* Drop zone */}
                      <div className="rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center" style={{ border: '2px dashed rgba(157,149,245,0.35)', background: 'rgba(157,149,245,0.04)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(157,149,245,0.12)' }}>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} style={{ color: '#9D95F5' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">Drop your image here</p>
                          <p className="text-xs text-slate-400 mt-0.5">JPEG · PNG · WebP · SVG</p>
                        </div>
                        <button className="text-xs font-semibold text-white px-4 py-1.5 rounded-lg" style={{ background: '#9D95F5' }}>
                          Browse files
                        </button>
                      </div>

                      {/* Result cards */}
                      <div className="space-y-2">
                        {[
                          { name: 'hero-photo.jpg', from: '3.2 MB', to: '0.6 MB', pct: '81%', done: true },
                          { name: 'product-shot.png', from: '1.8 MB', to: '0.4 MB', pct: '78%', done: true },
                          { name: 'banner.jpeg', from: '5.1 MB', to: '1.1 MB', pct: '79%', done: false },
                        ].map((f) => (
                          <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: f.done ? 'rgba(52,211,153,0.12)' : 'rgba(157,149,245,0.10)' }}>
                              {f.done ? (
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#9D95F5' }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {f.from} → <span className="text-emerald-600 font-medium">{f.to}</span>
                                {f.done && <span className="ml-1 text-emerald-500 font-semibold">{f.pct} smaller</span>}
                              </p>
                            </div>
                            {f.done && (
                              <button className="text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0" style={{ background: 'rgba(157,149,245,0.12)', color: '#9D95F5' }}>
                                ↓ Save
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Quality slider mock */}
                      <div className="flex items-center gap-3 px-1">
                        <span className="text-[11px] text-slate-400 font-medium w-14 shrink-0">Quality</span>
                        <div className="flex-1 relative h-1.5 rounded-full bg-slate-200">
                          <div className="absolute left-0 top-0 h-full rounded-full w-4/5" style={{ background: '#9D95F5' }} />
                          <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow border-2 border-[#9D95F5]" style={{ left: 'calc(80% - 7px)' }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 w-6 text-right shrink-0">80</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. STATS STRIP ──────────────────────────────────────────────── */}
          <section className="bg-[#F7F6F3] dark:bg-[#08080F] border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-5xl mx-auto px-4 py-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
                {[
                  { value: '0 KB', label: 'Uploaded to any server, ever' },
                  { value: '20+', label: 'Free tools — no account needed' },
                  { value: '100%', label: 'Browser-native processing' },
                  { value: '< 1s', label: 'Average compression time' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 max-w-28 leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. PROBLEM ──────────────────────────────────────────────────── */}
          <section className="bg-[#08080F] py-28 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-6" style={{ color: '#9D95F5' }}>The problem</p>
              <h2
                className="text-center text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
              >
                Every other tool<br />
                <em style={{ color: '#9D95F5' }}>uploads your files.</em>
              </h2>
              <p className="text-center max-w-lg mx-auto text-base leading-relaxed mb-16" style={{ color: '#64748b' }}>
                The moment you drop a file into a typical online tool, it leaves your device — traveling to a server you&apos;ve never audited, processed by code you can&apos;t inspect.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {/* Them */}
                <div className="rounded-2xl p-6" style={{ border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-5">Other tools</p>
                  <ul className="space-y-3.5">
                    {[
                      'Upload your file to their server',
                      'Process on infrastructure you can\'t see',
                      'Store your file — temporarily or permanently',
                      'Require an account to download the result',
                      'Profile you based on file content',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                        <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Us */}
                <div className="rounded-2xl p-6" style={{ border: '1px solid rgba(157,149,245,0.25)', background: 'rgba(157,149,245,0.05)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#9D95F5' }}>ImagePDF.Tools</p>
                  <ul className="space-y-3.5">
                    {[
                      'File stays inside your browser tab, always',
                      'Processed by your CPU via WebAssembly',
                      'Never stored — not even for a millisecond',
                      'Download instantly, no account ever needed',
                      'No tracking, no ad profiling, no exceptions',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#9D95F5' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. PROOF ────────────────────────────────────────────────────── */}
          <section className="bg-[#08080F] pb-28 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="max-w-4xl mx-auto text-center">
              <div
                className="font-bold text-white leading-none mb-4 select-none"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(7rem, 24vw, 16rem)', lineHeight: 1, opacity: 0.95 }}
              >
                0
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Kilobytes sent to our servers.
              </h2>
              <p className="text-base mb-16" style={{ color: '#475569' }}>
                Not today. Not ever. There is no endpoint that accepts file uploads — by architecture.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 text-left">
                {[
                  {
                    tag: 'Compression',
                    title: 'WebAssembly',
                    desc: 'pngquant and Ghostscript compile to WASM and run natively inside your browser tab — same speed as a desktop app, zero network calls.',
                    color: '#9D95F5',
                  },
                  {
                    tag: 'Encoding',
                    title: 'Canvas API',
                    desc: 'Your browser\'s built-in image pipeline handles JPEG, WebP, and PNG encoding without any plugin, server, or extension.',
                    color: '#60a5fa',
                  },
                  {
                    tag: 'Architecture',
                    title: 'Zero-upload design',
                    desc: 'Our server delivers only the app. It physically cannot receive file bytes. The architecture makes data leakage structurally impossible.',
                    color: '#34d399',
                  },
                ].map(({ tag, title, desc, color }) => (
                  <div key={title} className="rounded-2xl p-5" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4" style={{ color, background: color + '18' }}>{tag}</span>
                    <p className="text-sm font-semibold text-white mb-2">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. TOOLS ────────────────────────────────────────────────────── */}
          <section className="bg-white dark:bg-[#0C0C17] py-28 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5" style={{ color: '#9D95F5' }}>Everything you need</p>
              <h2
                className="text-center text-slate-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              >
                20+ tools. One private tab.
              </h2>
              <p className="text-center max-w-md mx-auto text-slate-500 dark:text-slate-400 text-sm mb-16 leading-relaxed">
                Every tool is built around the same promise — your file never leaves your browser.
              </p>

              <div className="space-y-12">
                {TOOLS.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: group.bg }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: group.color }}>{group.category}</span>
                      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {group.items.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="group flex flex-col gap-2.5 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-[#FAFAF8] dark:bg-[#0F0F1C] border border-transparent"
                          style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                        >
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: group.bg }}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} style={{ color: group.color }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-[#9D95F5] transition-colors">{tool.label}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">{tool.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12 gap-3">
                <Link href="/image-tools" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#9D95F5] hover:text-[#9D95F5]">
                  All image tools →
                </Link>
                <Link href="/pdf-tools" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#9D95F5] hover:text-[#9D95F5]">
                  All PDF tools →
                </Link>
              </div>
            </div>
          </section>

          {/* ── 6. HOW IT WORKS ─────────────────────────────────────────────── */}
          <section className="bg-[#08080F] py-28 px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5" style={{ color: '#9D95F5' }}>Done in three steps</p>
              <h2
                className="text-center text-white leading-tight mb-20"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              >
                Pick a tool. Use it. Done.
              </h2>

              <div className="grid sm:grid-cols-3 gap-6 relative">
                {/* Connector */}
                <div className="hidden sm:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px" style={{ background: 'linear-gradient(90deg, rgba(157,149,245,0.5), rgba(96,165,250,0.5), rgba(52,211,153,0.5))' }} />

                {[
                  {
                    n: '01', color: '#9D95F5',
                    title: 'Drop your file',
                    desc: 'Drag and drop or click to browse. Your file loads directly into your browser — nothing leaves the tab.',
                  },
                  {
                    n: '02', color: '#60a5fa',
                    title: 'Adjust & preview',
                    desc: 'Tune quality, format, or dimensions. Every tool gives you a live preview before you commit.',
                  },
                  {
                    n: '03', color: '#34d399',
                    title: 'Download instantly',
                    desc: 'One click. The result goes straight to your downloads — no email, no account, no server.',
                  },
                ].map((step) => (
                  <div key={step.n} className="flex flex-col items-start gap-5 p-6 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative z-10" style={{ background: step.color + '20', border: `1.5px solid ${step.color}50`, color: step.color }}>
                      {step.n}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-2">{step.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 7. AUDIENCE ─────────────────────────────────────────────────── */}
          <section className="bg-white dark:bg-[#0C0C17] py-28 px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5" style={{ color: '#9D95F5' }}>Who it&apos;s for</p>
              <h2
                className="text-center text-slate-900 dark:text-white leading-tight mb-16"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              >
                Built for anyone who values<br />
                <em style={{ color: '#9D95F5' }}>their privacy.</em>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Web Developers',
                    outcome: 'Ship faster, lighter pages.',
                    desc: 'Optimise images before deploying. Compress JPEG and PNG assets to improve Core Web Vitals without writing a single line of code.',
                    color: '#9D95F5',
                    bg: 'rgba(157,149,245,0.06)',
                  },
                  {
                    title: 'Designers & Photographers',
                    outcome: 'Share without exposing yourself.',
                    desc: 'Export compressed versions for client delivery. Strip EXIF GPS data before sharing — your location stays private.',
                    color: '#60a5fa',
                    bg: 'rgba(96,165,250,0.06)',
                  },
                  {
                    title: 'Bloggers & Content Creators',
                    outcome: 'Faster pages. Better SEO.',
                    desc: 'Shrink images before uploading to your CMS. Smaller images mean faster sites and better search rankings.',
                    color: '#34d399',
                    bg: 'rgba(52,211,153,0.06)',
                  },
                  {
                    title: 'E-commerce Sellers',
                    outcome: 'Products that load at light speed.',
                    desc: 'Compress your entire catalogue without installing software. Faster product images mean lower bounce rates and more sales.',
                    color: '#fb923c',
                    bg: 'rgba(251,146,60,0.06)',
                  },
                ].map(({ title, outcome, desc, color, bg }) => (
                  <div key={title} className="rounded-2xl p-6 transition-all" style={{ border: '1px solid rgba(0,0,0,0.07)', background: bg }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>{title}</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-serif-display), Georgia, serif' }}>{outcome}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 8. FAQ ──────────────────────────────────────────────────────── */}
          <section className="bg-[#08080F] py-28 px-4">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-5" style={{ color: '#9D95F5' }}>Questions?</p>
              <h2
                className="text-center text-white leading-tight mb-14"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              >
                Answered.
              </h2>

              <div className="space-y-3">
                {FAQS.map(({ q, a }) => (
                  <div key={q} className="rounded-2xl p-5" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                    <p className="text-sm font-semibold text-white mb-2">{q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 9. FINAL CTA ────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-[#08080F] py-32 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {/* Layered glows */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(157,149,245,0.18), transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,149,245,0.5), transparent)' }} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: '#9D95F5' }}>Start now — it&apos;s free</p>
              <h2
                className="text-white leading-[1.0] tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                Your files.<br />
                Your rules.
              </h2>
              <p className="text-base mb-12" style={{ color: '#475569' }}>
                No sign-up. No download. No upload. Just open a tool and go.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/compress-image"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                  style={{ background: '#9D95F5', boxShadow: '0 0 50px rgba(157,149,245,0.35), 0 4px 15px rgba(157,149,245,0.2)' }}
                >
                  Compress Image
                </Link>
                <Link
                  href="/compress-pdf"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl transition-all hover:bg-white/15"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}
                >
                  Compress PDF
                </Link>
                <Link
                  href="/image-tools"
                  className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-xl transition-all hover:text-slate-300"
                  style={{ color: '#64748b' }}
                >
                  See all 20+ tools →
                </Link>
              </div>
            </div>
          </section>

      </main>
    </>
  );
}
