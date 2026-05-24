import Link from 'next/link';

const C = 'max-w-[1180px] mx-auto px-8';

const CAT_COLS = [
  {
    cat: 'compress',
    title: 'Compress',
    links: [
      { href: '/compress-image',       label: 'Compress Image' },
      { href: '/compress-png-online',  label: 'Compress PNG' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size' },
    ],
  },
  {
    cat: 'convert',
    title: 'Convert',
    links: [
      { href: '/convert-image-to-webp', label: 'Any to WebP' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG' },
      { href: '/jpg-to-png',            label: 'JPG to PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG' },
      { href: '/jpg-to-webp',           label: 'JPG to WebP' },
      { href: '/png-to-webp',           label: 'PNG to WebP' },
      { href: '/webp-to-png',           label: 'WebP to PNG' },
      { href: '/convert/svg-to-png',    label: 'SVG to PNG' },
      { href: '/convert/svg-to-jpg',    label: 'SVG to JPG' },
      { href: '/convert/svg-to-webp',   label: 'SVG to WebP' },
    ],
  },
  {
    cat: 'edit',
    title: 'Edit',
    links: [
      { href: '/crop-image',      label: 'Crop Image' },
      { href: '/resize-image',    label: 'Resize Image' },
      { href: '/flip-image',      label: 'Flip Image' },
      { href: '/rotate-image',    label: 'Rotate Image' },
      { href: '/remove-metadata', label: 'Remove Metadata' },
      { href: '/metadata-editor', label: 'Metadata Editor' },
      { href: '/image-to-text',   label: 'Image to Text' },
    ],
  },
  {
    cat: 'pdf',
    title: 'PDF',
    links: [
      { href: '/word-to-pdf',   label: 'Word to PDF' },
      { href: '/pdf-to-word',   label: 'PDF to Word' },
      { href: '/merge-pdf',     label: 'Merge PDF' },
      { href: '/split-pdf',     label: 'Split PDF' },
      { href: '/compress-pdf',  label: 'Compress PDF' },
      { href: '/image-to-pdf',  label: 'Image to PDF' },
      { href: '/pdf-to-jpg',    label: 'PDF to JPG' },
      { href: '/rotate-pdf',    label: 'Rotate PDF' },
      { href: '/protect-pdf',   label: 'Protect / Unlock PDF' },
      { href: '/number-pdf',    label: 'Add Page Numbers' },
      { href: '/organize-pdf',  label: 'Organize Pages' },
      { href: '/watermark-pdf', label: 'Watermark PDF' },
    ],
  },
  {
    cat: 'about',
    title: 'About',
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

const catColor = (cat: string) => {
  const map: Record<string, string> = {
    compress: 'var(--cat-compress)',
    convert:  'var(--cat-convert)',
    edit:     'var(--cat-edit)',
    pdf:      'var(--fg-2)',
    about:    'var(--fg-3)',
  };
  return map[cat] ?? 'var(--fg-3)';
};

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-1)' }}>

      {/* ── Brand strip ─────────────────────────────────────── */}
      <div className={C} style={{ paddingTop: '52px', paddingBottom: '44px', borderBottom: '1px solid var(--border-1)' }}>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">

          {/* Logo + serif tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--on-accent)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--fg-1)' }}>
                ImagePDF<span style={{ color: 'var(--fg-3)' }}>.Tools</span>
              </span>
            </Link>
            <p
              className="serif italic m-0 max-w-[26ch] leading-[1.35] text-fg-1"
              style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.02em' }}
            >
              Your files <span className="text-accent">never</span> leave your device.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 sm:pt-2">
            {[
              { label: 'No upload',     icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /> },
              { label: '100% private',  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> },
              { label: 'Free forever',  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> },
            ].map(({ label, icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-3 py-1.5 rounded-full text-accent bg-accent-dim bd-accent"
              >
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  {icon}
                </svg>
                {label}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ── Sitemap ─────────────────────────────────────────── */}
      <div className={C} style={{ paddingTop: '44px', paddingBottom: '36px' }}>

        {/* PDF — featured full-width strip */}
        <div
          className="rounded-[14px] p-6 mb-10 bd-2 bg-elevated"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-data text-[11px] font-medium tracking-[0.18em] uppercase text-accent">
              ◆ PDF Tools
            </span>
            <span className="font-data text-[9px] font-medium px-2 py-0.5 rounded-full bg-accent-dim bd-accent text-accent">
              12 tools
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2.5">
            {CAT_COLS.find(c => c.cat === 'pdf')!.links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-normal leading-[1.7] no-underline transition-colors duration-150 text-fg-2 hover:text-(--accent)"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-4 bd-t-1">
            <Link href="/pdf-tools" className="text-[12px] font-medium no-underline text-accent">
              View all PDF tools →
            </Link>
          </div>
        </div>

        {/* Other columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
          {CAT_COLS.filter(c => c.cat !== 'pdf').map(({ cat, title, links }) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: catColor(cat) }} aria-hidden="true" />
                <span
                  className="font-data text-[11px] font-medium tracking-[0.18em] uppercase"
                  style={{ color: catColor(cat) }}
                >
                  ◆ {title}
                </span>
              </div>

              <ul className="list-none p-0 m-0 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    {'highlight' in l && l.highlight ? (
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline text-accent"
                      >
                        {l.label}
                        <span className="font-data text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none bg-accent-dim bd-accent text-accent">
                          PRO
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[13px] font-normal leading-[1.6] no-underline transition-colors duration-150 text-fg-2 hover:text-(--accent)"
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
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className={C} style={{ borderTop: '1px solid var(--border-1)', paddingTop: '20px', paddingBottom: '36px' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 no-underline shrink-0">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'var(--on-accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-fg-2">
              ImagePDF.Tools
            </span>
          </Link>
          <p className="text-xs text-center m-0" style={{ color: 'var(--fg-3)' }}>
            &copy; {new Date().getFullYear()} ImagePDF.Tools &middot; All processing happens in your browser &middot; nothing is uploaded.
          </p>
        </div>
      </div>

    </footer>
  );
}
