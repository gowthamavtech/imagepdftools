import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Compress',
    color: 'text-violet-600 dark:text-violet-400',
    links: [
      { href: '/compress-image',       label: 'Compress Image' },
      { href: '/compress-png-online',  label: 'Compress PNG' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size' },
    ],
  },
  {
    title: 'Convert',
    color: 'text-blue-600 dark:text-blue-400',
    links: [
      { href: '/convert-image-to-webp',  label: 'Any to WebP' },
      { href: '/convert-png-to-jpeg',    label: 'PNG to JPG' },
      { href: '/jpg-to-png',             label: 'JPG to PNG' },
      { href: '/webp-to-jpg',            label: 'WebP to JPG' },
      { href: '/jpg-to-webp',            label: 'JPG to WebP' },
      { href: '/png-to-webp',            label: 'PNG to WebP' },
      { href: '/webp-to-png',            label: 'WebP to PNG' },
      { href: '/convert/svg-to-png',     label: 'SVG to PNG' },
      { href: '/convert/svg-to-jpg',     label: 'SVG to JPG' },
      { href: '/convert/svg-to-webp',    label: 'SVG to WebP' },
    ],
  },
  {
    title: 'Edit',
    color: 'text-emerald-600 dark:text-emerald-400',
    links: [
      { href: '/crop-image',      label: 'Crop Image' },
      { href: '/resize-image',    label: 'Resize Image' },
      { href: '/flip-image',      label: 'Flip Image' },
      { href: '/rotate-image',    label: 'Rotate Image' },
      { href: '/remove-metadata', label: 'Remove Metadata' },
      { href: '/metadata-editor', label: 'Metadata Editor' },
    ],
  },
  {
    title: 'PDF',
    color: 'text-blue-600 dark:text-blue-400',
    links: [
      { href: '/merge-pdf',     label: 'Merge PDF' },
      { href: '/split-pdf',     label: 'Split PDF' },
      { href: '/compress-pdf',  label: 'Compress PDF' },
      { href: '/image-to-pdf',  label: 'Image to PDF' },
      { href: '/pdf-to-jpg',    label: 'PDF to JPG' },
      { href: '/rotate-pdf',    label: 'Rotate PDF' },
    ],
  },
  {
    title: 'About',
    color: 'text-slate-500 dark:text-slate-400',
    links: [
      { href: '/pricing',        label: 'Pricing', highlight: true },
      { href: '/about',          label: 'About Us' },
      { href: '/blog',           label: 'Blog' },
      { href: '/whats-new',      label: "What's New" },
      { href: '/support',        label: 'Support' },
      { href: '/contact',        label: 'Contact Us' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms',          label: 'Terms of Service' },
      { href: '/refund',         label: 'Refund Policy' },
    ],
  },
];

const TRUST_BADGES = [
  {
    label: 'No upload',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    label: '100% private',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: 'Free forever',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">

      {/* Brand strip */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-8 border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                </svg>
              </div>
              <span className="text-base font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight">
                ImagePDF.Tools
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Compress &amp; convert files instantly — no uploading, no waiting, no account.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {TRUST_BADGES.map(({ label, icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full"
              >
                {icon}
                {label}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* 4-column sitemap */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${col.color}`}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {'highlight' in l && l.highlight ? (
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                      >
                        {l.label}
                        <span className="text-[9px] font-bold bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-full leading-none">
                          PRO
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 rounded-md bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
            </div>
            <span className="text-sm font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight">
              ImagePDF.Tools
            </span>
          </Link>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
            &copy; {new Date().getFullYear()} ImagePDF.Tools &middot; All processing happens in your browser &middot; nothing is uploaded.
          </p>
        </div>
      </div>

    </footer>
  );
}
