import Link from 'next/link';

const LINKS = [
  { href: '/crop-image', label: 'Crop Image' },
  { href: '/metadata-editor', label: 'Metadata Editor' },
  { href: '/remove-metadata', label: 'Remove Metadata' },
  { href: '/support', label: 'Support' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/whats-new', label: "What's New" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-violet-100 dark:border-violet-900/30 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">

        {/* Row 1: brand left · nav right (stacked + centered on mobile) */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">SquishIt</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Row 2: copyright centered */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} SquishIt
        </p>

      </div>
    </footer>
  );
}
