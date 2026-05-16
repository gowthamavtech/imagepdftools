'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

const IMAGE_TOOLS = [
  {
    group: 'Compress',
    items: [
      { href: '/compress-image',        label: 'Compress Image',    desc: 'JPEG, PNG, WebP' },
      { href: '/compress-png-online',  label: 'Compress PNG',      desc: 'Lossy PNG optimisation' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG',     desc: 'Shrink JPEG files' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size', desc: 'Any format, any size' },
    ],
  },
  {
    group: 'Convert',
    items: [
      { href: '/convert-image-to-webp', label: 'Convert to WebP', desc: 'Modern format, tiny size' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG',       desc: 'Convert PNG to JPEG' },
      { href: '/jpg-to-png',            label: 'JPG to PNG',        desc: 'Convert JPEG to PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG',       desc: 'Convert WebP to JPEG' },
    ],
  },
  {
    group: 'Edit',
    items: [
      { href: '/crop-image',      label: 'Crop Image',       desc: 'Trim or crop freely' },
      { href: '/resize-image',    label: 'Resize Image',     desc: 'Custom px dimensions' },
      { href: '/flip-image',      label: 'Flip Image',       desc: 'Mirror H or V' },
      { href: '/rotate-image',    label: 'Rotate Image',     desc: 'Rotate 90° or 180°' },
      { href: '/metadata-editor', label: 'Metadata Editor',  desc: 'View & edit EXIF data' },
      { href: '/remove-metadata', label: 'Remove Metadata',  desc: 'Strip EXIF for privacy' },
    ],
  },
];

const PDF_TOOLS = [
  { href: '/merge-pdf',    label: 'Merge PDF',     desc: 'Combine PDFs into one' },
  { href: '/split-pdf',    label: 'Split PDF',     desc: 'Extract pages or ranges' },
  { href: '/compress-pdf', label: 'Compress PDF',  desc: 'Shrink PDF file size' },
  { href: '/image-to-pdf', label: 'Image to PDF',  desc: 'Bundle images into a PDF' },
  { href: '/pdf-to-jpg',   label: 'PDF to JPG',    desc: 'Convert pages to images' },
  { href: '/rotate-pdf',    label: 'Rotate PDF',       desc: 'Fix page orientation' },
  { href: '/protect-pdf',   label: 'Protect / Unlock', desc: 'Add or remove password' },
  { href: '/number-pdf',    label: 'Add Page Numbers', desc: 'Stamp numbers on every page' },
  { href: '/organize-pdf',  label: 'Organize Pages',   desc: 'Drag to reorder or delete' },
  { href: '/watermark-pdf', label: 'Watermark PDF',    desc: 'Overlay text on every page' },
];

type DropdownKey = 'image' | 'pdf' | null;

function AuthSection() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="w-8 h-8" />;
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/account" className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
          Account
        </Link>
        <UserButton />
      </div>
    );
  }
  return (
    <Show when="signed-out">
      <SignInButton mode="modal">
        <button className="text-sm bg-violet-600 hover:bg-violet-700 dark:hover:bg-violet-500 text-white px-4 py-2 rounded-full font-medium transition-colors duration-150 shadow-sm shadow-violet-900/40">
          Sign In
        </button>
      </SignInButton>
    </Show>
  );
}

function NavButton({ label, open, onClick }: { label: string; open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
        open
          ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30'
          : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-violet-900/20'
      }`}
    >
      {label}
      <span className={`text-base leading-none ${open ? 'text-violet-500 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500'}`}>·</span>
    </button>
  );
}

export function SiteHeader() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [pdfRight,     setPdfRight]     = useState(0);
  const outerRef     = useRef<HTMLElement>(null);  // entire <header> — for outside-click
  const headerRef    = useRef<HTMLDivElement>(null); // inner nav div — for PDF dropdown positioning
  const pdfBtnRef    = useRef<HTMLDivElement>(null);
  const hoverTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (outerRef.current && !outerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpenDropdown(null); setMenuOpen(false); }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function closeAll() { setOpenDropdown(null); setMenuOpen(false); }

  function openMenu(key: DropdownKey) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (key === 'pdf' && pdfBtnRef.current && headerRef.current) {
      const btn    = pdfBtnRef.current.getBoundingClientRect();
      const header = headerRef.current.getBoundingClientRect();
      setPdfRight(header.right - btn.right);
    }
    setOpenDropdown(key);
  }

  function scheduleClose() {
    hoverTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  return (
    <header ref={outerRef} className="border-b border-black/8 dark:border-white/8 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Inner container — mega menu is positioned absolute relative to this */}
      <div ref={headerRef} className="relative max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeAll}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'oklch(70% 0.158 293)' }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
            </svg>
          </div>
          <span className="text-lg font-bold text-violet-600 dark:text-violet-400">ImagePDF</span>
          <span className="text-lg font-medium text-slate-400 dark:text-slate-500">.Tools</span>
        </Link>

        {/* Desktop nav — order: Image Tools | PDF Tools | Privacy | 100% local | LanguageSelector | ThemeToggle | Sign In */}
        <nav className="hidden md:flex items-center gap-1">
          <div
            onMouseEnter={() => openMenu('image')}
            onMouseLeave={scheduleClose}
          >
            <NavButton
              label="Image Tools"
              open={openDropdown === 'image'}
              onClick={() => setOpenDropdown(openDropdown === 'image' ? null : 'image')}
            />
          </div>

          <div
            ref={pdfBtnRef}
            onMouseEnter={() => openMenu('pdf')}
            onMouseLeave={scheduleClose}
          >
            <NavButton
              label="PDF Tools"
              open={openDropdown === 'pdf'}
              onClick={() => { openMenu('pdf'); setOpenDropdown(openDropdown === 'pdf' ? null : 'pdf'); }}
            />
          </div>

          <Link href="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-violet-900/20 transition-colors">
            Privacy
          </Link>

          <div
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 ml-1"
            aria-label="All processing runs locally in your browser"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
            100% local
          </div>

          <LanguageSelector />
          <ThemeToggle />
          <AuthSection />
        </nav>

        {/* Mega menu for Image Tools — centered under the header container */}
        {openDropdown === 'image' && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-140 z-50"
            onMouseEnter={() => openMenu('image')}
            onMouseLeave={scheduleClose}
          >
            <div className="bg-white dark:bg-slate-800 border border-black/8 dark:border-white/8 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
              <div className="grid grid-cols-3 p-4 gap-1">
                {IMAGE_TOOLS.map((group, gi) => (
                  <div key={group.group} className={gi > 0 ? 'border-l border-slate-200 dark:border-slate-700 pl-3' : ''}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-2 mb-1 pt-1">
                      {group.group}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="flex flex-col px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-violet-900/20 transition-colors group"
                      >
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PDF Tools dropdown — headerRef level for flush vertical alignment; right measured from btn */}
        {openDropdown === 'pdf' && (
          <div
            className="absolute top-full w-56 z-50"
            style={{ right: pdfRight }}
            onMouseEnter={() => openMenu('pdf')}
            onMouseLeave={scheduleClose}
          >
            <div className="bg-white dark:bg-slate-800 border border-black/8 dark:border-white/8 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
              <div className="px-3 py-3">
                {PDF_TOOLS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="flex flex-col px-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-violet-900/20 transition-colors group"
                  >
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile right: theme + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-violet-900/20 transition-colors"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-black/8 dark:border-white/8 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100dvh-56px)]">

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1 pb-1 pt-1">
            Image Tools
          </p>
          {IMAGE_TOOLS.map((group, gi) => (
            <div key={group.group}>
              {gi > 0 && <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2" />}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400 px-1 pb-1 pt-2">
                {group.group}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-1 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2" />

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1 pb-1 pt-1">
            PDF Tools
          </p>
          {PDF_TOOLS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-2 px-1 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
            </Link>
          ))}

          <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2" />

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Language</span>
            <LanguageSelector mobileAlign="right" />
          </div>

          <Link
            href="/privacy"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 py-2 transition-colors"
          >
            Privacy & How It Works
          </Link>
          <div className="h-px bg-slate-200 dark:bg-slate-700/50" />
          <AuthSection />
        </div>
      )}
    </header>
  );
}
