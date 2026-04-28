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
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    btnClass: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40 border border-violet-200 dark:border-violet-800/50',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
    hoverTitle: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    tools: [
      {
        href: '/compress-image', label: 'Image Compressor', badge: 'Popular',
        desc: 'Compress PNG, JPG, and WebP images up to 80% smaller. Your files never leave your device.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/compress-png-online', label: 'PNG Compressor',
        desc: 'Reduce PNG file size with lossy quantisation — up to 70% smaller, fully in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/compress-jpeg-online', label: 'JPEG Compressor',
        desc: 'Shrink JPEG files with fine-grained quality control. Fast, private, free — nothing uploaded.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/reduce-image-size', label: 'Reduce Image Size',
        desc: 'Reduce any image format to a target file size — JPEG, PNG, WebP, or SVG.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />,
      },
    ],
  },
  {
    label: 'Convert',
    description: 'Change image formats without leaving your browser.',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    btnClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    hoverTitle: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    tools: [
      {
        href: '/convert-image-to-webp', label: 'Convert to WebP', badge: 'SEO Boost',
        desc: 'Convert JPEG, PNG, or any image to WebP — the modern format with smaller file sizes.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/convert-png-to-jpeg', label: 'PNG to JPG',
        desc: 'Convert PNG images to JPEG format instantly — right in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/jpg-to-png', label: 'JPG to PNG',
        desc: 'Convert JPEG to lossless PNG with transparency support — no quality loss.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/webp-to-jpg', label: 'WebP to JPG',
        desc: 'Convert WebP images to JPEG for maximum compatibility — all in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
    ],
  },
  {
    label: 'Edit',
    description: 'Crop, resize, flip, rotate and manage metadata.',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    btnClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    hoverTitle: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    tools: [
      {
        href: '/resize-image', label: 'Image Resizer',
        desc: 'Resize images to exact dimensions or percentages — right in your browser. Maintain aspect ratio or set custom size.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />,
      },
      {
        href: '/crop-image', label: 'Image Cropper',
        desc: 'Crop images to any size — right in your browser. Drag to select the area you want, or choose a preset aspect ratio.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
      },
      {
        href: '/flip-image', label: 'Flip & Rotate Image',
        desc: 'Rotate images 90° clockwise or counter-clockwise, flip horizontal or vertical — right in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.657 48.657 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />,
      },
      {
        href: '/rotate-image', label: 'Rotate Image',
        desc: 'Rotate images 90°, 180°, or any custom angle — precise control, instant results.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
      },
      {
        href: '/remove-metadata', label: 'Remove Metadata', badge: 'Privacy',
        desc: 'Strip EXIF GPS location, camera data, and private info from images before sharing.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z" />,
      },
      {
        href: '/metadata-editor', label: 'Metadata Editor',
        desc: 'View and edit EXIF metadata in your images — camera settings, GPS, timestamps and more.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
      },
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
              <div className="flex items-center gap-3 mb-4">
                <h2 className={`text-[10px] font-bold uppercase tracking-widest ${group.color}`}>
                  {group.label}
                </h2>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs text-slate-400 dark:text-slate-500">{group.description}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group relative flex flex-col gap-3 p-5 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${group.hoverBorder}`}
                  >
                    {/* Badge */}
                    {'badge' in tool && tool.badge && (
                      <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${group.btnClass}`}>
                        {tool.badge}
                      </span>
                    )}

                    {/* Icon + title row */}
                    <div className="flex items-start gap-3 pr-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${group.iconBg}`}>
                        <svg className={`w-5 h-5 ${group.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          {tool.icon}
                        </svg>
                      </div>
                      <p className={`text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug pt-1.5 transition-colors ${group.hoverTitle}`}>
                        {tool.label}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                      {tool.desc}
                    </p>

                    {/* Open tool link */}
                    <span className={`inline-flex items-center gap-1 self-start text-xs font-semibold transition-all group-hover:gap-1.5 ${group.color}`}>
                      Open tool
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
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
