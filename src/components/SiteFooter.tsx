import Link from 'next/link';
import { AdBanner } from './AdBanner';

const COLUMNS = [
  {
    title: 'Image Tools',
    links: [
      { href: '/',                     label: 'Compress Image' },
      { href: '/compress-png-online',  label: 'Compress PNG' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size' },
    ],
  },
  {
    title: 'Convert',
    links: [
      { href: '/compress-pdf',           label: 'Compress PDF'    },
      { href: '/convert-image-to-webp', label: 'Convert to WebP' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG' },
      { href: '/jpg-to-png',            label: 'JPG to PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG' },
      { href: '/image-to-pdf',          label: 'Image to PDF' },
    ],
  },
  {
    title: 'Edit',
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
    title: 'About',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms',          label: 'Terms of Service' },
      { href: '/refund',         label: 'Refund Policy' },
      { href: '/support',        label: 'Support' },
      { href: '/whats-new',      label: "What's New" },
      { href: '/pricing',        label: 'Pricing' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-violet-100 dark:border-violet-900/30 bg-white dark:bg-gray-950">

      {/* Ad slot — leaderboard above footer content */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <AdBanner />
      </div>

      {/* 4-column sitemap */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">ImagePDF.Tools</span>
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} ImagePDF.Tools · All image processing happens in your browser — nothing is uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}
