import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Image Tools — Free Online Image Editor',
  description:
    'All free browser-based image tools in one place: compress, convert, crop, resize, flip, rotate, and remove metadata. No uploads required.',
  alternates: { canonical: 'https://imagepdf.tools/image-tools' },
};

const GROUPS = [
  {
    label: 'Compress',
    description: 'Reduce image file sizes without visible quality loss.',
    color: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    tools: [
      { href: '/compress-image',      label: 'Compress Image',      desc: 'JPEG, PNG, WebP and SVG — all in one place', badge: 'Popular' },
      { href: '/compress-png-online',  label: 'Compress PNG',         desc: 'Lossy PNG quantisation via pngquant WASM' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG',        desc: 'Shrink JPEG files with a quality slider' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size',    desc: 'General-purpose size reducer for any format' },
    ],
  },
  {
    label: 'Convert',
    description: 'Change image formats without leaving your browser.',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    tools: [
      { href: '/convert-image-to-webp', label: 'Convert to WebP', desc: 'Modern format — 30% smaller than JPEG at same quality', badge: 'SEO Boost' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG',       desc: 'Convert PNG images to JPEG format' },
      { href: '/jpg-to-png',            label: 'JPG to PNG',        desc: 'Convert JPEG images to lossless PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG',       desc: 'Convert WebP files to widely-compatible JPEG' },
    ],
  },
  {
    label: 'Edit',
    description: 'Crop, resize, flip, rotate and manage metadata.',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    tools: [
      { href: '/crop-image',      label: 'Crop Image',       desc: 'Free crop or lock to a preset aspect ratio' },
      { href: '/resize-image',    label: 'Resize Image',     desc: 'Set exact pixel dimensions or scale by percentage' },
      { href: '/flip-image',      label: 'Flip Image',       desc: 'Mirror horizontally or vertically' },
      { href: '/rotate-image',    label: 'Rotate Image',     desc: 'Rotate 90°, 180°, or any custom angle' },
      { href: '/remove-metadata', label: 'Remove Metadata',  desc: 'Strip EXIF GPS and camera data for privacy', badge: 'Privacy' },
      { href: '/metadata-editor', label: 'Metadata Editor',  desc: 'View and edit all EXIF metadata fields' },
    ],
  },
];

export default function ImageToolsPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            No Uploads &middot; 100% Private &middot; Free
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">Image Tools</h1>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            14 free tools that run entirely in your browser — your images never leave your device.
          </p>
        </div>

        {/* Tool groups */}
        <div className="space-y-12">
          {GROUPS.map((group) => (
            <section key={group.label}>
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className={`text-xs font-bold uppercase tracking-widest ${group.color}`}>
                  {group.label}
                </h2>
                <span className="text-xs text-slate-400 dark:text-slate-500">{group.description}</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative flex flex-col gap-1.5 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all"
                  >
                    {'badge' in tool && tool.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full">
                        {tool.badge}
                      </span>
                    )}
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors pr-12">
                      {tool.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </span>
                    <span className={`text-[11px] font-semibold mt-1 ${group.color}`}>
                      Open tool →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* PDF cross-link */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-0.5">Need PDF tools?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Compress PDFs and convert images to PDF — also 100% in-browser.</p>
          </div>
          <Link
            href="/pdf-tools"
            className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            PDF Tools →
          </Link>
        </div>

      </div>
    </main>
  );
}
