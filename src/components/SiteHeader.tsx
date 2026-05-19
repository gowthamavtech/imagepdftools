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
      { href: '/compress-png-online',   label: 'Compress PNG',      desc: 'Lossy PNG optimisation' },
      { href: '/compress-jpeg-online',  label: 'Compress JPEG',     desc: 'Shrink JPEG files' },
      { href: '/reduce-image-size',     label: 'Reduce Image Size', desc: 'Any format, any size' },
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
      { href: '/crop-image',      label: 'Crop Image',      desc: 'Trim or crop freely' },
      { href: '/resize-image',    label: 'Resize Image',    desc: 'Custom px dimensions' },
      { href: '/flip-image',      label: 'Flip Image',      desc: 'Mirror H or V' },
      { href: '/rotate-image',    label: 'Rotate Image',    desc: 'Rotate 90° or 180°' },
      { href: '/metadata-editor', label: 'Metadata Editor', desc: 'View & edit EXIF data' },
      { href: '/remove-metadata', label: 'Remove Metadata', desc: 'Strip EXIF for privacy' },
    ],
  },
];

const PDF_TOOLS = [
  { href: '/merge-pdf',     label: 'Merge PDF',          desc: 'Combine PDFs into one' },
  { href: '/split-pdf',     label: 'Split PDF',           desc: 'Extract pages or ranges' },
  { href: '/compress-pdf',  label: 'Compress PDF',        desc: 'Shrink PDF file size' },
  { href: '/image-to-pdf',  label: 'Image to PDF',        desc: 'Bundle images into a PDF' },
  { href: '/pdf-to-jpg',    label: 'PDF to JPG',          desc: 'Convert pages to images' },
  { href: '/rotate-pdf',    label: 'Rotate PDF',          desc: 'Fix page orientation' },
  { href: '/protect-pdf',   label: 'Protect / Unlock',    desc: 'Add or remove password' },
  { href: '/number-pdf',    label: 'Add Page Numbers',    desc: 'Stamp numbers on every page' },
  { href: '/organize-pdf',  label: 'Organize Pages',      desc: 'Drag to reorder or delete' },
  { href: '/watermark-pdf', label: 'Watermark PDF',       desc: 'Overlay text on every page' },
];

type DropdownKey = 'image' | 'pdf' | null;

/* ── Shared font stacks (avoid repeating long strings) ── */
const sans = "var(--font-dm-sans, 'DM Sans', system-ui, sans-serif)";

/* ── Auth section — no style changes needed ───────────── */
function AuthSection() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="w-8 h-8" />;
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/account"
          style={{ fontFamily: sans, fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', textDecoration: 'none', padding: '0 12px', height: '34px', display: 'inline-flex', alignItems: 'center', borderRadius: '30px', transition: 'color 0.15s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
        >
          Account
        </Link>
        <UserButton />
      </div>
    );
  }
  return (
    <Show when="signed-out">
      <SignInButton mode="modal">
        <button className="btn-accent" style={{ fontFamily: sans, fontSize: '13px', fontWeight: 500, height: '34px', padding: '0 16px', borderRadius: '30px', color: 'var(--on-accent)', border: '1px solid transparent', cursor: 'pointer' }}>
          Sign In
        </button>
      </SignInButton>
    </Show>
  );
}

/* ── Dropdown trigger — navigates on click, shows dropdown on hover ── */
function NavLink({ label, href, open }: { label: string; href: string; open: boolean }) {
  return (
    <Link
      href={href}
      style={{ fontFamily: sans, fontSize: '13.5px', fontWeight: 400, color: open ? 'var(--fg-1)' : 'var(--fg-2)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.color = 'var(--fg-2)'; }}
    >
      {label}
      <span style={{ color: 'var(--fg-3)', fontSize: '10px' }}>▾</span>
    </Link>
  );
}

const DRAWER_IMAGE_LINKS = [
  { href: '/compress-image',        label: 'Compress Image' },
  { href: '/compress-png-online',   label: 'Compress PNG' },
  { href: '/convert-image-to-webp', label: 'Convert to WebP' },
  { href: '/crop-image',            label: 'Crop Image' },
  { href: '/resize-image',          label: 'Resize Image' },
  { href: '/rotate-image',          label: 'Rotate Image' },
];
const DRAWER_PDF_LINKS = [
  { href: '/compress-pdf',  label: 'Compress PDF' },
  { href: '/image-to-pdf',  label: 'Image to PDF' },
  { href: '/merge-pdf',     label: 'Merge PDF' },
  { href: '/split-pdf',     label: 'Split PDF' },
  { href: '/pdf-to-jpg',    label: 'PDF to JPG' },
];

export function SiteHeader() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState<DropdownKey>(null);
  const [drawerSection, setDrawerSection] = useState<DropdownKey>(null);
  const outerRef   = useRef<HTMLElement>(null);
  const drawerRef  = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const inHeader = outerRef.current?.contains(e.target as Node);
      const inDrawer = drawerRef.current?.contains(e.target as Node);
      if (!inHeader && !inDrawer) {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpenDropdown(null); setMenuOpen(false); setDrawerSection(null); }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => { if (e.matches) { setMenuOpen(false); setDrawerSection(null); } };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);


  function closeAll() { setOpenDropdown(null); setMenuOpen(false); setDrawerSection(null); }

  function openMenu(key: DropdownKey) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenDropdown(key);
  }

  function scheduleClose() {
    hoverTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  return (
    <>
    <header
      ref={outerRef}
      style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--nav-bg)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', borderBottom: '1px solid var(--border-1)' }}
    >
      <div
        ref={headerRef}
        style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '32px', height: '64px', position: 'relative' }}
      >
        {/* ── Logo ───────────────────────────────────────── */}
        <Link href="/" onClick={closeAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
            </svg>
          </div>
          <span style={{ fontFamily: sans, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--fg-1)' }}>
            ImagePDF<span style={{ color: 'var(--fg-2)' }}>.Tools</span>
          </span>
        </Link>

        {/* ── Desktop nav links ───────────────────────────── */}
        <nav className="hidden lg:flex items-center" style={{ gap: '26px', marginLeft: '18px' }}>
          {/* Image Tools trigger + mega menu */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => openMenu('image')}
            onMouseLeave={scheduleClose}
          >
            <NavLink
              label="Image Tools"
              href="/image-tools"
              open={openDropdown === 'image'}
            />
            {openDropdown === 'image' && (
              <div
                style={{ position: 'absolute', top: '100%', left: '0', width: '560px', zIndex: 50, paddingTop: '8px' }}
                onMouseEnter={() => openMenu('image')}
                onMouseLeave={scheduleClose}
              >
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-2)', borderRadius: '14px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.35)', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '16px', gap: '4px' }}>
                    {IMAGE_TOOLS.map((group, gi) => (
                      <div key={group.group} style={{ borderLeft: gi > 0 ? '1px solid var(--border-1)' : 'none', paddingLeft: gi > 0 ? '12px' : 0 }}>
                        <p style={{ fontFamily: sans, fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '4px 8px 8px', margin: 0 }}>
                          {group.group}
                        </p>
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeAll}
                            style={{ display: 'flex', flexDirection: 'column', padding: '8px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.12s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dim)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span style={{ fontFamily: sans, fontSize: '13.5px', fontWeight: 500, color: 'var(--fg-1)', lineHeight: 1.3 }}>{item.label}</span>
                            <span style={{ fontFamily: sans, fontSize: '11.5px', color: 'var(--fg-2)', lineHeight: 1.4, marginTop: '2px' }}>{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-1)', padding: '10px 16px' }}>
                    <Link
                      href="/image-tools"
                      onClick={closeAll}
                      style={{ fontFamily: sans, fontSize: '12px', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      View all image tools →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PDF Tools trigger + dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => openMenu('pdf')}
            onMouseLeave={scheduleClose}
          >
            <NavLink
              label="PDF Tools"
              href="/pdf-tools"
              open={openDropdown === 'pdf'}
            />
            {openDropdown === 'pdf' && (
              <div
                style={{ position: 'absolute', top: '100%', left: '0', width: '220px', zIndex: 50, paddingTop: '8px' }}
                onMouseEnter={() => openMenu('pdf')}
                onMouseLeave={scheduleClose}
              >
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-2)', borderRadius: '14px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.35)', overflow: 'hidden' }}>
                  <div style={{ padding: '8px' }}>
                    {PDF_TOOLS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        style={{ display: 'flex', flexDirection: 'column', padding: '8px 10px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.12s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dim)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontFamily: sans, fontSize: '13.5px', fontWeight: 500, color: 'var(--fg-1)', lineHeight: 1.3 }}>{item.label}</span>
                        <span style={{ fontFamily: sans, fontSize: '11px', color: 'var(--fg-2)', lineHeight: 1.4, marginTop: '2px' }}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/privacy"
            style={{ fontFamily: sans, fontSize: '13.5px', fontWeight: 400, color: 'var(--fg-2)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
          >
            Privacy
          </Link>
        </nav>

        {/* ── Right cluster ───────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {/* Live badge */}
          <span
            aria-label="All processing runs locally in your browser"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', height: '28px', padding: '0 12px', borderRadius: '30px', background: 'var(--bg-elevated)', border: '1px solid var(--border-2)', fontFamily: sans, fontSize: '11.5px', fontWeight: 500, color: 'var(--fg-2)' }}
          >
            <span
              style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#28c840', boxShadow: '0 0 0 3px rgba(40,200,64,0.2)', flexShrink: 0, animation: 'hp-pulse 1.6s ease-in-out infinite' }}
              aria-hidden="true"
            />
            100% local
          </span>

          <LanguageSelector />
          <ThemeToggle />
          <AuthSection />
        </div>

        {/* ── Mobile right: theme + burger ────────────────── */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', borderRadius: '10px', background: 'transparent', border: '1px solid transparent', color: 'var(--fg-2)', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s, color 0.15s' }}
          >
            {/* Single SVG — lines animate into an X on open */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6"
                style={{ transformBox: 'view-box', transformOrigin: '50% 50%', transition: 'transform 260ms cubic-bezier(0.32, 0.72, 0, 1)', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
              />
              <line x1="3" y1="12" x2="21" y2="12"
                style={{ transition: 'opacity 160ms ease, transform 260ms cubic-bezier(0.32, 0.72, 0, 1)', opacity: menuOpen ? 0 : 1 }}
              />
              <line x1="3" y1="18" x2="21" y2="18"
                style={{ transformBox: 'view-box', transformOrigin: '50% 50%', transition: 'transform 260ms cubic-bezier(0.32, 0.72, 0, 1)', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
              />
            </svg>
          </button>
        </div>

      </div>

    </header>

      {/* ── Mobile drawer — always in DOM; CSS handles enter/exit ── */}

      {/* Scrim: fades in/out */}
      <div
        onClick={() => closeAll()}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 48,
          background: 'rgba(0,0,0,0.35)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 220ms ease-out',
        }}
      />

      {/* Drawer: slides in from right. visibility delay keeps it out of tab order when closed */}
      <div
        ref={drawerRef}
        aria-label="Mobile menu"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', top: '64px', right: 0, bottom: 0,
          width: 'min(320px, 88vw)',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-1)',
          zIndex: 49,
          display: 'flex', flexDirection: 'column',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: menuOpen
            ? 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 0ms'
            : 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1), visibility 0s 300ms',
        }}
      >
            {/* ── Scrollable nav list ─────────────────────── */}
            <div style={{ flex: 1, overflowY: 'auto' }}>

              {/* Image Tools accordion */}
              <button
                onClick={() => setDrawerSection(drawerSection === 'image' ? null : 'image')}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: sans, fontSize: '15px', fontWeight: 500, color: 'var(--fg-1)', borderBottom: '1px solid var(--border-1)', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}
              >
                Image Tools
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--fg-3)', flexShrink: 0, transform: drawerSection === 'image' ? 'rotate(180deg)' : 'none', transition: 'transform 200ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: drawerSection === 'image' ? '1fr' : '0fr', transition: 'grid-template-rows 260ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-1)' }}>
                    {DRAWER_IMAGE_LINKS.map(({ href, label }) => (
                      <Link key={href} href={href} onClick={closeAll}
                        style={{ display: 'block', padding: '10px 24px 10px 32px', fontFamily: sans, fontSize: '14px', fontWeight: 400, color: 'var(--fg-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
                      >{label}</Link>
                    ))}
                    <Link href="/image-tools" onClick={closeAll}
                      style={{ display: 'block', padding: '10px 24px 14px 32px', fontFamily: sans, fontSize: '13px', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}
                    >View all image tools →</Link>
                  </div>
                </div>
              </div>

              {/* PDF Tools accordion */}
              <button
                onClick={() => setDrawerSection(drawerSection === 'pdf' ? null : 'pdf')}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: sans, fontSize: '15px', fontWeight: 500, color: 'var(--fg-1)', borderBottom: '1px solid var(--border-1)', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}
              >
                PDF Tools
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--fg-3)', flexShrink: 0, transform: drawerSection === 'pdf' ? 'rotate(180deg)' : 'none', transition: 'transform 200ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: drawerSection === 'pdf' ? '1fr' : '0fr', transition: 'grid-template-rows 260ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-1)' }}>
                    {DRAWER_PDF_LINKS.map(({ href, label }) => (
                      <Link key={href} href={href} onClick={closeAll}
                        style={{ display: 'block', padding: '10px 24px 10px 32px', fontFamily: sans, fontSize: '14px', fontWeight: 400, color: 'var(--fg-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
                      >{label}</Link>
                    ))}
                    <Link href="/pdf-tools" onClick={closeAll}
                      style={{ display: 'block', padding: '10px 24px 14px 32px', fontFamily: sans, fontSize: '13px', fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}
                    >View all PDF tools →</Link>
                  </div>
                </div>
              </div>

              <Link href="/privacy" onClick={closeAll} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: sans, fontSize: '15px', fontWeight: 500, color: 'var(--fg-1)', borderBottom: '1px solid var(--border-1)', textDecoration: 'none' }}>
                Privacy <span style={{ color: 'var(--fg-3)', fontSize: '12px' }}>→</span>
              </Link>
              <Link href="/pricing" onClick={closeAll} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: sans, fontSize: '15px', fontWeight: 500, color: 'var(--fg-1)', borderBottom: '1px solid var(--border-1)', textDecoration: 'none' }}>
                Pricing <span style={{ color: 'var(--fg-3)', fontSize: '12px' }}>→</span>
              </Link>

              {/* Live badge */}
              <div style={{ padding: '20px 24px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: sans, fontSize: '11.5px', fontWeight: 500, color: 'var(--fg-2)' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#28c840' }} aria-hidden="true" />
                  100% local
                </span>
              </div>
            </div>

            {/* ── Footer — not inside overflow:auto, so LanguageSelector dropdown is never clipped ── */}
            <div style={{ borderTop: '1px solid var(--border-1)', padding: '14px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: sans, fontSize: '12px', fontWeight: 500, color: 'var(--fg-3)', flexShrink: 0 }}>Language</span>
                <LanguageSelector mobileAlign="left" openUp={true} />
              </div>
              <AuthSection />
            </div>
      </div>
    </>
  );
}
