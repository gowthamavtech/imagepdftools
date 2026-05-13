import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
  description:
    'Compress, convert, crop, resize images and PDFs — 30+ free tools, all browser-native. Your files never leave your device.',
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
    contactPoint: { '@type': 'ContactPoint', email: 'support@imagepdf.tools', contactType: 'customer support' },
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
    colorClass: 'text-violet-400',
    dotClass: 'bg-violet-500',
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
    colorClass: 'text-blue-400',
    dotClass: 'bg-blue-500',
    items: [
      { href: '/convert-image-to-webp', label: 'Any → WebP',  desc: 'Modern format, 35% smaller than JPEG' },
      { href: '/convert-png-to-jpeg',   label: 'PNG → JPG',   desc: 'Universal compatibility, small size' },
      { href: '/jpg-to-png',            label: 'JPG → PNG',   desc: 'Lossless with transparency support' },
      { href: '/webp-to-jpg',           label: 'WebP → JPG',  desc: 'Broad device compatibility' },
      { href: '/convert/svg-to-png',    label: 'SVG → PNG',   desc: 'Rasterise at any resolution' },
    ],
  },
  {
    category: 'Edit',
    colorClass: 'text-emerald-400',
    dotClass: 'bg-emerald-500',
    items: [
      { href: '/crop-image',      label: 'Crop Image',       desc: 'Free crop or aspect ratio presets' },
      { href: '/resize-image',    label: 'Resize Image',     desc: 'Exact px or percentage scale' },
      { href: '/rotate-image',    label: 'Rotate Image',     desc: 'Any angle, fix EXIF orientation' },
      { href: '/flip-image',      label: 'Flip Image',       desc: 'Mirror horizontal or vertical' },
      { href: '/remove-metadata', label: 'Remove Metadata',  desc: 'Strip GPS and camera data before sharing' },
    ],
  },
  {
    category: 'PDF',
    colorClass: 'text-orange-400',
    dotClass: 'bg-orange-500',
    items: [
      { href: '/image-to-pdf', label: 'Image → PDF', desc: 'Bundle images into a single PDF' },
      { href: '/merge-pdf',    label: 'Merge PDF',   desc: 'Combine multiple PDFs into one' },
      { href: '/split-pdf',    label: 'Split PDF',   desc: 'Extract pages or split by range' },
      { href: '/compress-pdf', label: 'Compress PDF', desc: 'Ghostscript WASM — no quality loss' },
    ],
  },
];

const FAQS = [
  { q: 'Are these tools really free?', a: 'Yes. All core tools (compress, convert, crop, resize, flip, rotate, remove metadata) are permanently free with no account required.' },
  { q: 'Do you upload my images or PDFs to a server?', a: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device.' },
  { q: 'Which formats are supported?', a: 'JPEG, PNG, WebP, and SVG for image tools. PDF tools support standard PDFs and image input for the Image to PDF tool.' },
  { q: 'Does this work on mobile?', a: 'Yes. All tools work on iOS and Android in Chrome, Safari, Firefox, and Edge. No app download needed.' },
  { q: 'Is there a file size limit?', a: 'There is no server-side limit since files never leave your browser. Very large files over 200 MB depend on your device having enough memory. For the best results with large files, use a desktop browser.' },
  { q: 'Do I need to install anything?', a: 'No. All tools run in your browser using WebAssembly and the Canvas API. No extensions, plugins, or downloads are required. Any modern browser on any operating system works.' },
  { q: 'Which browsers are supported?', a: 'Chrome 111 and later, Firefox 113 and later, Safari 16.2 and later, and Edge 111 and later are fully supported. WebAssembly and the Canvas API are standard in all current browsers.' },
  { q: 'Is there a paid plan?', a: 'Yes. The free tier covers all tools for individual files. Pro removes ads and unlocks batch processing beyond 5 files. It is billed monthly via Stripe and can be cancelled any time from your account page.' },
];

const TRUST_BADGES = [
  {
    label: 'No upload ever',
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    label: 'Browser-native',
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
  },
  {
    label: 'No account needed',
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    label: 'Works offline',
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Pick a tool. Drop your file.',
    desc: 'Choose from 30+ tools for images and PDFs. Drag your file onto the page or click to browse. No account, no form, no waiting.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Your browser handles the rest.',
    desc: 'WebAssembly runs the processing on your own CPU, the same engine used in native desktop apps. No network request is made for your file. Typically done in under 2 seconds.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Download. Close the tab. Done.',
    desc: 'The result downloads directly to your device. When you close the tab, browser memory clears completely. Nothing is stored, cached, or logged.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 3v13.5m0 0l-4.5-4.5M12 16.5l4.5-4.5" />
      </svg>
    ),
  },
];

const FORMATS = [
  {
    fmt: 'JPEG',
    desc: 'Compress JPEG files with quality control from 1 to 100. Resize, crop, rotate, or convert to PNG and WebP. Typical savings: 60 to 80 percent with no visible quality loss at quality 75.',
  },
  {
    fmt: 'PNG',
    desc: 'Lossless PNG compression via pngquant running in WebAssembly. Transparency is preserved throughout. Typical savings: 40 to 70 percent versus the unoptimised original.',
  },
  {
    fmt: 'WebP',
    desc: 'Convert any image to WebP for modern web delivery. WebP is typically 35 percent smaller than JPEG at equivalent visual quality. Convert back to JPEG or PNG when needed.',
  },
  {
    fmt: 'SVG',
    desc: 'Rasterise SVG to PNG at any resolution. Set an exact pixel width or export at the original viewport dimensions. Useful for icons, illustrations, and diagrams.',
  },
  {
    fmt: 'PDF',
    desc: 'Compress PDFs with Ghostscript WASM. Merge multiple files, split by page range, add page numbers or watermarks, or convert a set of images into a single PDF document.',
  },
];

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main className="flex-1">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#F7F8FC] dark:bg-[#0B0B0D] px-4 pt-16 pb-0">
          {/* Violet glow, dark only */}
          <div
            className="absolute top-0 right-0 w-[640px] h-[480px] pointer-events-none opacity-0 dark:opacity-100"
            style={{ background: 'radial-gradient(ellipse at top right, oklch(70% 0.158 293 / 0.10) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-8 items-end">

              {/* Left — text */}
              <div className="pb-16 lg:pb-24 pt-8">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden="true" />
                  100% private · No uploads · Free forever
                </div>

                {/* Headline — Instrument Serif via globals.css h1 rule */}
                <h1
                  className="leading-[1.0] tracking-tight mb-6 text-[#0F0F14] dark:text-[#F0EBE3] text-balance"
                  style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)' }}
                >
                  <span className="block">Your files.</span>
                  <span className="block">Your device.</span>
                  <span className="block" style={{ color: 'oklch(70% 0.158 293)' }}>Your rules.</span>
                </h1>

                {/* Subline — absorbs "how it works" in one sentence */}
                <p className="text-base sm:text-lg leading-relaxed mb-9 text-[#5A5A6A] dark:text-[#7A7A8A] max-w-[38ch]">
                  Drop a file. Every operation runs via WebAssembly on your own device. No server, no sign-up, 30+ tools permanently free.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 mb-9">
                  <Link
                    href="/compress-image"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white dark:text-[#0B0B0D] px-6 py-3 rounded-xl transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                    style={{ background: '#9D95F5', boxShadow: '0 4px 20px rgba(157,149,245,0.35)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Compress an Image
                  </Link>
                  <Link
                    href="/pdf-tools"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#5A5A6A] dark:text-slate-300 px-6 py-3 rounded-xl border border-[#D0D0DA] dark:border-[#2A2A35] bg-transparent transition-colors duration-150 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    All PDF tools
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>

                {/* Trust badges — SVG icons, no emoji */}
                <ul className="flex flex-wrap gap-2" aria-label="Key features">
                  {TRUST_BADGES.map(({ icon, label }) => (
                    <li key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/8 bg-white/80 dark:bg-white/4">
                      {icon}
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — browser mockup */}
              <div className="relative flex items-end justify-center lg:justify-end pb-0">
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-16 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, oklch(70% 0.158 293 / 0.18) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <div
                  className="relative w-full max-w-[440px] rounded-t-2xl overflow-hidden shadow-2xl dark:shadow-black/40"
                  style={{ border: '1px solid rgba(0,0,0,0.09)', borderBottom: 'none', background: '#fff' }}
                  aria-label="Screenshot of the image compressor tool"
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100" style={{ background: '#F0EFEC' }}>
                    <div className="flex gap-1.5" aria-hidden="true">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 border border-slate-200 flex items-center gap-2 overflow-hidden">
                      <svg className="w-2.5 h-2.5 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <span className="truncate">imagepdf.tools/compress-image</span>
                    </div>
                  </div>

                  {/* App UI preview */}
                  <div className="p-5 space-y-3" style={{ background: '#FAFAF8' }}>
                    {/* Drop zone */}
                    <div
                      className="rounded-xl p-7 flex flex-col items-center justify-center gap-3 text-center"
                      style={{ border: '2px dashed oklch(70% 0.158 293 / 0.3)', background: 'oklch(70% 0.158 293 / 0.04)' }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'oklch(70% 0.158 293 / 0.12)' }}>
                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">Drop your image here</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">JPEG · PNG · WebP · SVG</p>
                      </div>
                      <button className="text-xs font-semibold text-white px-4 py-1.5 rounded-lg" style={{ background: 'oklch(70% 0.158 293)' }} tabIndex={-1}>
                        Browse files
                      </button>
                    </div>

                    {/* Result rows */}
                    <div className="space-y-1.5">
                      {[
                        { name: 'hero-photo.jpg',    from: '3.2 MB', to: '0.6 MB', pct: '81%', done: true  },
                        { name: 'product-shot.png',  from: '1.8 MB', to: '0.4 MB', pct: '78%', done: true  },
                        { name: 'banner.jpeg',       from: '5.1 MB', to: null,     pct: null,   done: false },
                      ].map((f) => (
                        <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: f.done ? 'oklch(74% 0.143 162 / 0.12)' : 'oklch(70% 0.158 293 / 0.10)' }}
                          >
                            {f.done ? (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'oklch(74% 0.143 162)' }} aria-label="Done">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'oklch(70% 0.158 293)' }} aria-label="Processing">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-slate-700 truncate">{f.name}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-data">
                              {f.from} →{' '}
                              {f.done
                                ? <span style={{ color: 'oklch(74% 0.143 162)' }}>{f.to}</span>
                                : <span className="text-slate-300">processing</span>
                              }
                              {f.done && f.pct && (
                                <span className="ml-1 font-semibold" style={{ color: 'oklch(74% 0.143 162)' }}>{f.pct} smaller</span>
                              )}
                            </p>
                          </div>
                          {f.done && (
                            <button
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg shrink-0"
                              style={{ background: 'oklch(70% 0.158 293 / 0.12)', color: 'oklch(70% 0.158 293)' }}
                              tabIndex={-1}
                            >
                              ↓
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quality slider */}
                    <div className="flex items-center gap-3 px-1 pt-0.5">
                      <span className="text-[11px] text-slate-400 font-medium w-12 shrink-0">Quality</span>
                      <div className="flex-1 relative h-1.5 rounded-full bg-slate-200">
                        <div className="absolute left-0 top-0 h-full rounded-full w-4/5" style={{ background: 'oklch(70% 0.158 293)' }} />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow border-2"
                          style={{ left: 'calc(80% - 7px)', borderColor: 'oklch(70% 0.158 293)' }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 w-5 text-right shrink-0 font-data">80</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. PROBLEM ────────────────────────────────────────────────────── */}
        <section className="bg-[#08080F] py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-center mb-5" style={{ color: 'oklch(70% 0.158 293)' }}>
              The problem with every other tool
            </p>
            <h2
              className="text-center text-white leading-[1.05] tracking-tight mb-5 text-balance"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
            >
              Every other tool<br />
              <em style={{ color: 'oklch(70% 0.158 293)' }}>uploads your files.</em>
            </h2>
            <p className="text-center max-w-[52ch] mx-auto text-sm leading-relaxed mb-14 text-slate-500">
              The moment you drop a file into a typical online tool, it leaves your device — traveling to a server you have never audited, processed by code you cannot inspect.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl p-6" style={{ border: '1px solid oklch(55% 0.2 27 / 0.22)', background: 'oklch(55% 0.2 27 / 0.04)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-400 mb-5">Other tools</p>
                <ul className="space-y-3" role="list">
                  {[
                    'Upload your file to their server',
                    'Process on infrastructure you cannot see',
                    'Store your file, temporarily or permanently',
                    'Require an account to download the result',
                    'Profile you based on file content',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <svg className="w-3.5 h-3.5 text-red-500/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-6" style={{ border: '1px solid oklch(70% 0.158 293 / 0.2)', background: 'oklch(70% 0.158 293 / 0.04)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: 'oklch(70% 0.158 293)' }}>ImagePDF.Tools</p>
                <ul className="space-y-3" role="list">
                  {[
                    'File stays inside your browser tab, always',
                    'Processed by your CPU via WebAssembly',
                    'Never stored, not even for a millisecond',
                    'Download instantly, no account ever needed',
                    'No tracking, no ad profiling, no exceptions',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">
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

        {/* ── 3. PROOF ──────────────────────────────────────────────────────── */}
        <section className="bg-[#08080F] pb-24 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-4xl mx-auto text-center">
            {/* The bold number — Instrument Serif, page's loudest moment */}
            <div
              className="leading-none select-none"
              style={{
                fontFamily: 'var(--font-serif-display), Georgia, serif',
                fontSize: 'clamp(9rem, 28vw, 18rem)',
                lineHeight: 1,
                color: 'oklch(91% 0.022 293)',
              }}
              aria-label="Zero kilobytes uploaded to our servers"
            >
              0
            </div>
            <h2
              className="text-white mb-3 text-balance"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
            >
              Kilobytes sent to our servers.
            </h2>
            <p className="text-sm mb-14 text-slate-500">
              Not today. Not ever. There is no endpoint that accepts file uploads. By architecture.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 text-left">
              {[
                {
                  tag: 'Compression',
                  title: 'WebAssembly',
                  desc: 'pngquant and Ghostscript compile to WASM and run natively inside your browser tab: same speed as a desktop app, zero network calls.',
                  accent: 'oklch(70% 0.158 293)',
                },
                {
                  tag: 'Encoding',
                  title: 'Canvas API',
                  desc: "Your browser's built-in image pipeline handles JPEG, WebP, and PNG encoding without any plugin, server, or extension.",
                  accent: 'oklch(66% 0.18 245)',
                },
                {
                  tag: 'Architecture',
                  title: 'Zero-upload design',
                  desc: 'Our server delivers only the app. It physically cannot receive file bytes. The architecture makes data leakage structurally impossible.',
                  accent: 'oklch(74% 0.143 162)',
                },
              ].map(({ tag, title, desc, accent }) => (
                <div key={title} className="rounded-2xl p-5" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-4"
                    style={{ color: accent, background: `color-mix(in oklch, ${accent} 15%, transparent)` }}
                  >
                    {tag}
                  </span>
                  <p className="text-sm font-semibold text-white mb-2">{title}</p>
                  <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HOW IT WORKS ───────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] py-24 px-4 border-t border-black/[0.06] dark:border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: 'oklch(70% 0.158 293)' }}>
              // Zero friction
            </p>
            <h2
              className="leading-[1.05] tracking-tight mb-16 text-balance text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Done in three steps.
            </h2>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/5">
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className={`relative overflow-hidden py-10 md:py-0 ${
                    i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10'
                  }`}
                >
                  {/* Ghost number */}
                  <div
                    className="absolute top-0 right-0 select-none pointer-events-none"
                    style={{
                      fontFamily: 'var(--font-serif-display), Georgia, serif',
                      fontSize: 'clamp(5rem, 8vw, 7rem)',
                      lineHeight: 1,
                      color: 'oklch(70% 0.158 293 / 0.08)',
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  {/* Icon */}
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/30">
                    {step.icon}
                  </div>
                  {/* Content */}
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. TOOLS ──────────────────────────────────────────────────────── */}
        <section className="bg-[#F7F8FC] dark:bg-[#0C0C1A] py-24 px-4 border-t border-black/[0.06] dark:border-white/[0.04]">
          <div className="max-w-5xl mx-auto">

            {/* Statement line — Instrument Serif italic, above the tool grid */}
            <p
              className="text-xl sm:text-2xl md:text-[1.75rem] leading-snug text-slate-500 dark:text-slate-300 max-w-[46ch] mb-16"
              style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}
            >
              &ldquo;Built for people who don&rsquo;t want to explain why they won&rsquo;t upload client files to a random website.&rdquo;
            </p>

            {/* Tool directory — leader-line format, not card grid */}
            <div className="space-y-10">
              {TOOLS.map((group) => (
                <div key={group.category}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${group.dotClass}`} aria-hidden="true" />
                    <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${group.colorClass}`}>{group.category}</span>
                    <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800" aria-hidden="true" />
                  </div>

                  {/* Tools as leader-line rows, 2-column on sm+ */}
                  <div className="grid sm:grid-cols-2">
                    {group.items.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="group flex items-center sm:items-baseline gap-2 py-2.5 border-b border-slate-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-900/50 transition-colors duration-150 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
                      >
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-150 shrink-0">
                          {tool.label}
                        </span>
                        {/* Leader line — sm+ only */}
                        <span className="hidden sm:block flex-1 self-end border-b border-dotted border-slate-200 dark:border-slate-700 mb-[3px] min-w-[8px]" aria-hidden="true" />
                        {/* Description — sm+ only */}
                        <span className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">{tool.desc}</span>
                        {/* Mobile chevron */}
                        <svg className="sm:hidden ml-auto w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-violet-400 transition-colors duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hub links */}
            <div className="flex flex-wrap gap-3 mt-12">
              <Link
                href="/image-tools"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                All image tools →
              </Link>
              <Link
                href="/pdf-tools"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                All PDF tools →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. FORMATS ────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] py-20 px-4 border-t border-black/[0.06] dark:border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5 text-slate-400 dark:text-slate-500">
              Supported formats
            </p>
            <h2
              className="tracking-tight mb-12 text-balance text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Every major format. All in the browser.
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
              {FORMATS.map(({ fmt, desc }) => (
                <div key={fmt}>
                  <dt className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{fmt}</dt>
                  <dd className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 7. FAQ ────────────────────────────────────────────────────────── */}
        <section className="bg-[#08080F] py-24 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-white leading-tight mb-12 text-balance"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
            >
              Questions answered.
            </h2>

            <dl>
              {FAQS.map(({ q, a }, i) => (
                <div
                  key={q}
                  className={`py-6 ${i < FAQS.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <dt className="text-sm font-semibold text-white mb-2">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 6. FINAL CTA ──────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-[#08080F] py-28 px-4 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 115%, oklch(70% 0.158 293 / 0.14), transparent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, oklch(70% 0.158 293 / 0.45), transparent)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: 'oklch(70% 0.158 293)' }}>
              Start now. It&apos;s free.
            </p>
            <h2
              className="text-white leading-[1.0] tracking-tight mb-5 text-balance"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              Your files.<br />
              Your rules.
            </h2>
            <p className="text-sm mb-10 text-slate-500">
              No sign-up. No download. No upload. Open a tool and go.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/compress-image"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl transition-all duration-150 hover:opacity-90 hover:-translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                style={{ background: 'oklch(70% 0.158 293)', boxShadow: '0 0 40px oklch(70% 0.158 293 / 0.28), 0 4px 15px oklch(70% 0.158 293 / 0.15)' }}
              >
                Compress Image
              </Link>
              <Link
                href="/compress-pdf"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 px-7 py-3.5 rounded-xl transition-all duration-150 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
                style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}
              >
                Compress PDF
              </Link>
              <Link
                href="/image-tools"
                className="text-sm font-medium px-7 py-3.5 rounded-xl transition-colors duration-150 text-slate-500 hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                See all 30+ tools →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
