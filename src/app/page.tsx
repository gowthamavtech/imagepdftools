import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
  description:
    'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads, no account, 100% private. JPEG, PNG, WebP, PDF supported.',
  keywords: [
    'image compressor',
    'compress image online',
    'compress PDF online',
    'free image tools',
    'reduce image size',
    'convert image to webp',
    'resize image online',
    'crop image online',
    'png compressor',
    'jpeg compressor',
    'image to pdf',
    'browser image tools',
  ],
  alternates: { canonical: 'https://imagepdf.tools' },
  openGraph: {
    type: 'website',
    url: 'https://imagepdf.tools',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description:
      'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads, no account, 100% private.',
    siteName: 'ImagePDF.Tools',
    images: [
      {
        url: 'https://imagepdf.tools/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImagePDF.Tools — Free Image & PDF Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description:
      'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads required.',
    images: ['https://imagepdf.tools/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ImagePDF.Tools',
    url: 'https://imagepdf.tools',
    description: 'Free browser-based image and PDF tools. No uploads required.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://imagepdf.tools/image-tools' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ImagePDF.Tools',
    url: 'https://imagepdf.tools',
    logo: 'https://imagepdf.tools/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@imagepdf.tools',
      contactType: 'customer support',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Image & PDF Tools',
    description: 'Browser-based image and PDF tools — no uploads required.',
    numberOfItems: 16,
    itemListElement: [
      { '@type': 'ListItem', position: 1,  name: 'Compress Image',    url: 'https://imagepdf.tools/compress-image' },
      { '@type': 'ListItem', position: 2,  name: 'Compress PNG',      url: 'https://imagepdf.tools/compress-png-online' },
      { '@type': 'ListItem', position: 3,  name: 'Compress JPEG',     url: 'https://imagepdf.tools/compress-jpeg-online' },
      { '@type': 'ListItem', position: 4,  name: 'Reduce Image Size', url: 'https://imagepdf.tools/reduce-image-size' },
      { '@type': 'ListItem', position: 5,  name: 'Convert to WebP',   url: 'https://imagepdf.tools/convert-image-to-webp' },
      { '@type': 'ListItem', position: 6,  name: 'PNG to JPG',        url: 'https://imagepdf.tools/convert-png-to-jpeg' },
      { '@type': 'ListItem', position: 7,  name: 'JPG to PNG',        url: 'https://imagepdf.tools/jpg-to-png' },
      { '@type': 'ListItem', position: 8,  name: 'WebP to JPG',       url: 'https://imagepdf.tools/webp-to-jpg' },
      { '@type': 'ListItem', position: 9,  name: 'Crop Image',        url: 'https://imagepdf.tools/crop-image' },
      { '@type': 'ListItem', position: 10, name: 'Resize Image',      url: 'https://imagepdf.tools/resize-image' },
      { '@type': 'ListItem', position: 11, name: 'Flip Image',        url: 'https://imagepdf.tools/flip-image' },
      { '@type': 'ListItem', position: 12, name: 'Rotate Image',      url: 'https://imagepdf.tools/rotate-image' },
      { '@type': 'ListItem', position: 13, name: 'Remove Metadata',   url: 'https://imagepdf.tools/remove-metadata' },
      { '@type': 'ListItem', position: 14, name: 'Metadata Editor',   url: 'https://imagepdf.tools/metadata-editor' },
      { '@type': 'ListItem', position: 15, name: 'Compress PDF',      url: 'https://imagepdf.tools/compress-pdf' },
      { '@type': 'ListItem', position: 16, name: 'Image to PDF',      url: 'https://imagepdf.tools/image-to-pdf' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these image and PDF tools really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All core tools — compress, convert, crop, resize, flip, rotate, and remove metadata — are permanently free with no account required. A Pro plan unlocks batch export and an ad-free experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you upload my images or PDFs to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device — no server ever sees them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ImagePDF.Tools supports JPEG, PNG, WebP, and SVG for compression. Conversion tools cover JPEG ↔ PNG ↔ WebP. PDF tools support standard PDF files and JPEG/PNG/WebP input for Image to PDF.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can I compress an image?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Compression results vary by image and format. JPEG and WebP can typically be reduced by 60–80% at quality 80. PNG uses pngquant lossy quantisation for 40–70% reduction. You can fine-tune the quality slider to balance file size and visual quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this work on mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All tools work on mobile browsers — Chrome, Safari, Firefox, and Edge on iOS and Android. No app download is needed.',
        },
      },
    ],
  },
];

const IMAGE_GROUPS = [
  {
    label: 'Compress',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    tools: [
      { href: '/compress-image',      label: 'Compress Image',      desc: 'JPEG · PNG · WebP · SVG' },
      { href: '/compress-png-online',  label: 'Compress PNG',         desc: 'Lossy PNG quantisation' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG',        desc: 'Shrink JPEG files' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size',    desc: 'Any format, any size' },
    ],
  },
  {
    label: 'Convert',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    tools: [
      { href: '/convert-image-to-webp', label: 'Convert to WebP', desc: 'Modern format, tiny size' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG',       desc: 'Convert PNG to JPEG' },
      { href: '/jpg-to-png',            label: 'JPG to PNG',        desc: 'Convert JPEG to PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG',       desc: 'Convert WebP to JPEG' },
    ],
  },
  {
    label: 'Edit',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    tools: [
      { href: '/crop-image',      label: 'Crop Image',       desc: 'Trim freely or by ratio' },
      { href: '/resize-image',    label: 'Resize Image',     desc: 'Custom px dimensions' },
      { href: '/flip-image',      label: 'Flip Image',       desc: 'Mirror horizontal or vertical' },
      { href: '/rotate-image',    label: 'Rotate Image',     desc: 'Rotate 90° or any angle' },
      { href: '/remove-metadata', label: 'Remove Metadata',  desc: 'Strip EXIF for privacy' },
      { href: '/metadata-editor', label: 'Metadata Editor',  desc: 'View & edit EXIF data' },
    ],
  },
];

const PDF_TOOLS = [
  { href: '/compress-pdf', label: 'Compress PDF',  desc: 'Shrink PDF file size without quality loss', icon: '🗜️' },
  { href: '/image-to-pdf', label: 'Image to PDF',  desc: 'Bundle multiple images into a single PDF',  icon: '📄' },
];

const FEATURES = [
  {
    icon: '🔒',
    title: 'Zero Uploads',
    desc: 'Every tool runs entirely inside your browser tab. Your files never leave your device — no server ever sees them.',
  },
  {
    icon: '⚡',
    title: 'Instant Processing',
    desc: 'Compression happens on your CPU using WebAssembly and the Canvas API. No waiting for a server response.',
  },
  {
    icon: '🆓',
    title: 'Free Forever',
    desc: 'Core tools are permanently free with no account required. Pro unlocks batch export and ad-free experience.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    desc: 'All tools work on desktop and mobile — Chrome, Safari, Firefox, Edge. No app download needed.',
  },
];

const FAQS = [
  {
    q: 'Are these image and PDF tools really free?',
    a: 'Yes. All core tools — compress, convert, crop, resize, flip, rotate, and remove metadata — are permanently free with no account required. A Pro plan unlocks batch export and an ad-free experience.',
  },
  {
    q: 'Do you upload my images or PDFs to a server?',
    a: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device — no server ever sees them.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'JPEG, PNG, WebP, and SVG for compression. Conversion tools cover JPEG ↔ PNG ↔ WebP. PDF tools support standard PDFs and JPEG/PNG/WebP input for Image to PDF.',
  },
  {
    q: 'How much can I compress an image?',
    a: 'JPEG and WebP typically reduce by 60–80% at quality 80. PNG uses pngquant lossy quantisation for 40–70% reduction. You can fine-tune the quality slider to balance size and quality.',
  },
  {
    q: 'Does this work on mobile?',
    a: 'Yes. All tools work on mobile browsers — Chrome, Safari, Firefox, and Edge on iOS and Android. No app download is needed.',
  },
];

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-4 pt-14 sm:pt-20 pb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            100% Browser-Based &middot; Zero Uploads &middot; Always Free
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Free Image &amp; PDF Tools
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-1 italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Right in Your Browser
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Compress JPEG, PNG and WebP images. Convert between formats. Crop, resize, flip and rotate.
            Compress PDFs and convert images to PDF — no uploads, no account, no server.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/image-tools"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-violet-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
              Image Tools
            </Link>
            <Link
              href="/pdf-tools"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Tools
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-12">
            {[
              { value: '16+', label: 'Free Tools' },
              { value: '100%', label: 'Private' },
              { value: '0',   label: 'Uploads' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-violet-500 dark:text-violet-400">{value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Image Tools ── */}
        <section className="max-w-5xl mx-auto px-4 pb-14" aria-label="Image tools">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Image Tools</h2>
            <Link href="/image-tools" className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium">
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {IMAGE_GROUPS.map((group) => (
              <div key={group.label}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${group.color}`}>
                  {group.label}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex flex-col gap-1 p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm transition-all"
                    >
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                        {tool.label}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                        {tool.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PDF Tools ── */}
        <section className="max-w-5xl mx-auto px-4 pb-14" aria-label="PDF tools">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">PDF Tools</h2>
            <Link href="/pdf-tools" className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PDF_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all"
              >
                <span className="text-2xl shrink-0">{tool.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {tool.desc}
                  </p>
                </div>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors ml-auto shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40" aria-label="Why ImagePDF.Tools">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center mb-2">
              Why ImagePDF.Tools?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-10">
              Built differently from every other online file tool.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1.5">{f.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 py-14" aria-label="Frequently asked questions">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-10">
            Everything you need to know about ImagePDF.Tools.
          </p>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">{q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="max-w-5xl mx-auto px-4 pb-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Start compressing for free
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            No sign-up. No download. Just open a tool and go.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/compress-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Compress Image
            </Link>
            <Link href="/compress-pdf" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Compress PDF
            </Link>
            <Link href="/convert-image-to-webp" className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-500 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Convert to WebP
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
