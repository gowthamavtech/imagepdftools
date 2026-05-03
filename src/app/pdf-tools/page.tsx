import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PDF Tools — Free Online PDF Compressor & Converter',
  description:
    'Free browser-based PDF tools: compress PDFs and convert images to PDF. No uploads required — everything runs in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-tools' },
};

const PDF_TOOLS = [
  {
    href: '/merge-pdf',
    label: 'Merge PDF',
    desc: 'Combine multiple PDF files into one. Reorder pages, then download your merged PDF instantly.',
    badge: null,
    details: ['Unlimited PDFs', 'Original quality preserved', 'Drag to reorder'],
  },
  {
    href: '/split-pdf',
    label: 'Split PDF',
    desc: 'Extract individual pages or split into multiple parts by range. Downloads as ZIP when splitting.',
    badge: null,
    details: ['Select pages visually', 'Split by range', 'ZIP multi-part download'],
  },
  {
    href: '/compress-pdf',
    label: 'Compress PDF',
    desc: 'Shrink PDF file size without visible quality loss. Great for email attachments and sharing.',
    badge: 'Popular',
    details: ['Reduces PDF size by up to 80%', 'Preserves text and image quality', 'Works with any PDF file'],
  },
  {
    href: '/image-to-pdf',
    label: 'Image to PDF',
    desc: 'Bundle one or more images into a single PDF document. Supports JPEG, PNG, and WebP.',
    badge: null,
    details: ['Combine multiple images', 'Custom page order', 'Instant download'],
  },
  {
    href: '/pdf-to-jpg',
    label: 'PDF to JPG',
    desc: 'Convert every page of a PDF to a high-quality JPEG image. Download individually or as ZIP.',
    badge: null,
    details: ['Every page → JPG', 'Adjustable quality', 'ZIP for multi-page'],
  },
  {
    href: '/rotate-pdf',
    label: 'Rotate PDF',
    desc: 'Fix page orientation in one click — 90° CW, 90° CCW, or 180°. No re-encoding, no quality loss.',
    badge: null,
    details: ['All pages rotated', 'No quality loss', 'Instant download'],
  },
  {
    href: '/protect-pdf',
    label: 'Protect / Unlock PDF',
    desc: 'Add a password to any PDF, or remove an existing one. AES-128 encryption, fully in your browser.',
    badge: 'New',
    details: ['AES-128 encryption', 'Protect or unlock', 'No upload needed'],
  },
  {
    href: '/number-pdf',
    label: 'Add Page Numbers',
    desc: 'Stamp page numbers onto every page — choose position, format, and starting number.',
    badge: 'New',
    details: ['6 positions', '3 number formats', 'Custom start number'],
  },
  {
    href: '/organize-pdf',
    label: 'Organize Pages',
    desc: 'Drag and drop to reorder PDF pages or delete pages you don\'t need.',
    badge: 'New',
    details: ['Drag-and-drop UI', 'Delete any page', 'No quality loss'],
  },
  {
    href: '/watermark-pdf',
    label: 'Watermark PDF',
    desc: 'Overlay a diagonal text watermark on every page — CONFIDENTIAL, DRAFT, or custom text.',
    badge: 'New',
    details: ['Custom text & colour', 'Adjustable opacity', 'All pages stamped'],
  },
];

const FEATURES = [
  { icon: '🔒', title: 'Zero Uploads', desc: 'PDF processing happens entirely in your browser. Your files never touch a server.' },
  { icon: '⚡', title: 'Instant Results', desc: 'WebAssembly-powered compression — no waiting for a server response.' },
  { icon: '🆓', title: 'Always Free', desc: 'Core PDF tools are permanently free. No account required.' },
  { icon: '📱', title: 'Works Everywhere', desc: 'Chrome, Safari, Firefox, Edge — desktop and mobile.' },
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
    { '@type': 'ListItem', position: 1,  name: 'Merge PDF',            url: `${BASE}/merge-pdf` },
    { '@type': 'ListItem', position: 2,  name: 'Split PDF',            url: `${BASE}/split-pdf` },
    { '@type': 'ListItem', position: 3,  name: 'Compress PDF',         url: `${BASE}/compress-pdf` },
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
    <main className="flex-1 py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PDF_TOOLS_JSONLD) }}
      />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            No Uploads &middot; 100% Private &middot; Free
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">PDF Tools</h1>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            10 free PDF tools that run entirely in your browser — your files never leave your device.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {PDF_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col gap-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all"
            >
              {tool.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  {tool.badge}
                </span>
              )}
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-16">
                  {tool.label}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <ul className="space-y-1">
                {tool.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <span className="text-[11px] font-semibold mt-auto text-blue-600 dark:text-blue-400">
                Open tool →
              </span>
            </Link>
          ))}
        </div>

        {/* Features */}
        <section className="mb-14">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">
            Why use our PDF tools?
          </h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl"
              >
                <div className="text-xl mb-2">{f.icon}</div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1">{f.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Image tools cross-link */}
        <div className="p-6 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/60 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-0.5">Need image tools?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Compress, convert, crop, resize, flip and rotate images — all 100% in-browser.</p>
          </div>
          <Link
            href="/image-tools"
            className="shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            Image Tools →
          </Link>
        </div>

      </div>
    </main>
  );
}
