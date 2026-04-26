'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

const TOOLS = [
  {
    group: 'Compress',
    items: [
      { href: '/',                     label: 'Compress Image',    desc: 'JPEG, PNG, WebP' },
      { href: '/compress-png-online',  label: 'Compress PNG',      desc: 'Lossy PNG optimisation' },
      { href: '/compress-jpeg-online', label: 'Compress JPEG',     desc: 'Shrink JPEG files' },
      { href: '/reduce-image-size',    label: 'Reduce Image Size', desc: 'Any format, any size' },
    ],
  },
  {
    group: 'Convert',
    items: [
      { href: '/compress-pdf',           label: 'Compress PDF',    desc: 'Shrink PDF file size'  },
      { href: '/convert-image-to-webp', label: 'Convert to WebP', desc: 'Modern format, tiny size' },
      { href: '/convert-png-to-jpeg',   label: 'PNG to JPG',       desc: 'Convert PNG to JPEG' },
      { href: '/jpg-to-png',            label: 'JPG to PNG',        desc: 'Convert JPEG to PNG' },
      { href: '/webp-to-jpg',           label: 'WebP to JPG',       desc: 'Convert WebP to JPEG' },
      { href: '/image-to-pdf',          label: 'Image to PDF',      desc: 'Bundle images into PDF' },
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

function AuthSection() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="w-8 h-8" />;
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/account" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors">
          Account
        </Link>
        <UserButton />
      </div>
    );
  }
  return (
    <Show when="signed-out">
      <SignInButton mode="modal">
        <button className="text-sm bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-sm shadow-violet-200 dark:shadow-violet-900">
          Sign In
        </button>
      </SignInButton>
    </Show>
  );
}

export function SiteHeader() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef  = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current  && !menuRef.current.contains(e.target as Node))  setMenuOpen(false);
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close tools dropdown on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') setToolsOpen(false); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="border-b border-violet-100 dark:border-violet-900/30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => { setMenuOpen(false); setToolsOpen(false); }}>
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-600 to-pink-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
            </svg>
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            SquishIt
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <ThemeToggle />
          <LanguageSelector />

          {/* Tools dropdown — opens on hover, closes on outside click or Escape */}
          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              onClick={() => setToolsOpen((v) => !v)}
              className={`inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                toolsOpen
                  ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950'
                  : 'text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950'
              }`}
            >
              Tools
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsOpen && (
              <div className="absolute right-0 top-full pt-2 w-72" onMouseEnter={() => setToolsOpen(true)}>
              <div className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/40 rounded-2xl shadow-xl shadow-violet-100/50 dark:shadow-black/30 overflow-hidden">
                {TOOLS.map((group, gi) => (
                  <div key={group.group}>
                    {gi > 0 && <div className="h-px bg-violet-50 dark:bg-violet-900/30 mx-3" />}
                    <div className="px-3 pt-3 pb-1">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-1 mb-1">
                        {group.group}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToolsOpen(false)}
                          className="flex items-start gap-2.5 px-2 py-2 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/60 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight mt-0.5">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="px-3 pb-3" />
              </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors">
            Pricing
          </Link>
          <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors">
            Privacy
          </Link>
          <AuthSection />
        </nav>

        {/* Mobile right: theme + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/60 transition-colors"
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
        <div ref={menuRef} className="md:hidden border-t border-violet-100 dark:border-violet-900/30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-4 space-y-1">

          {/* Tools section */}
          {TOOLS.map((group, gi) => (
            <div key={group.group}>
              {gi === 0 && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-1 pb-1 pt-1">
                  Tools
                </p>
              )}
              {gi > 0 && <div className="h-px bg-violet-50 dark:bg-violet-900/30 my-2" />}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 dark:text-violet-600 px-1 pb-1 pt-2">
                {group.group}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-1 text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="h-px bg-violet-100 dark:bg-violet-900/30 my-2" />

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Language</span>
            <LanguageSelector mobileAlign="right" />
          </div>

          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 py-2 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 py-2 transition-colors"
          >
            Privacy & How It Works
          </Link>
          <div className="h-px bg-violet-100 dark:bg-violet-900/30" />
          <AuthSection />
        </div>
      )}
    </header>
  );
}
