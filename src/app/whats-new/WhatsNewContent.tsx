'use client';

import { useState } from 'react';

type TagType = 'NEW' | 'IMPROVED' | 'FIXED';

interface Entry {
  tag: TagType;
  text: string;
}

interface Release {
  title: string;
  date: string;
  entries: Entry[];
}

interface Month {
  label: string;
  releases: Release[];
}

const TAG_STYLES: Record<TagType, string> = {
  NEW:      'bg-accent-dim text-accent',
  IMPROVED: 'bg-surface bd-2 text-fg-1',
  FIXED:    'bg-surface bd-2 text-fg-2',
};

const CHANGELOG: Month[] = [
  {
    label: 'April 2026',
    releases: [
      {
        title: 'New Tools — Flip, Rotate, JPG→PNG, WebP→JPG & Image to PDF',
        date: '24 Apr 2026',
        entries: [
          { tag: 'NEW', text: 'Flip Image — mirror any image horizontally or vertically, with combined flip + rotate in one tool.' },
          { tag: 'NEW', text: 'Rotate Image — rotate 90° left, 90° right, or 180° with instant preview.' },
          { tag: 'NEW', text: 'JPG to PNG converter at /jpg-to-png — converts JPEG files to lossless PNG format.' },
          { tag: 'NEW', text: 'WebP to JPG converter at /webp-to-jpg — converts WebP files to universally compatible JPEG.' },
          { tag: 'NEW', text: 'Image to PDF at /image-to-pdf — bundle multiple images into a single PDF with A4, Letter, or fit-to-image page sizes, drag-to-reorder, and instant in-browser generation.' },
          { tag: 'NEW', text: 'Undo last step — a back-arrow button in the "Continue with" bar lets you jump back to the previous tool with the previous file, up to 5 steps deep.' },
          { tag: 'IMPROVED', text: 'Footer redesigned into a 4-column sitemap (Image Tools · Convert · Edit · About) matching industry standards.' },
          { tag: 'IMPROVED', text: 'Header Tools dropdown now groups into three categories: Compress, Convert, and Edit.' },
        ],
      },
      {
        title: 'Image Resize Tool — By Size, Percentage & Social Media',
        date: '24 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'Resize Image tool at /resize-image — resize by exact pixel dimensions, percentage, or social media preset.' },
          { tag: 'NEW',      text: 'Social Media tab with 7 platforms (Facebook, Instagram, Twitter/X, YouTube, LinkedIn, Pinterest, TikTok) and 25+ presets — auto-fills width and height.' },
          { tag: 'NEW',      text: 'Background Fill option for social media exports — choose a solid fill colour or transparent (forces PNG output) to pad images that don\'t match the target aspect ratio.' },
          { tag: 'NEW',      text: 'Live preview updates instantly as you change dimensions — see the output aspect ratio before exporting.' },
          { tag: 'IMPROVED', text: 'Aspect ratio and "do not enlarge" controls hidden on the Percentage tab where they don\'t apply.' },
        ],
      },
      {
        title: 'Tool Chaining — Continue Without Re-uploading',
        date: '21 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'After finishing any operation (compress, crop, resize, strip metadata, edit metadata) a "Continue with" bar appears — click any tool to open the result directly in that tool without re-uploading.' },
          { tag: 'IMPROVED', text: 'Metadata Editor now shows "Continue with" suggestions immediately when no metadata is found, or after clicking Apply.' },
        ],
      },
      {
        title: 'Image Editing Tools & Tools Navbar',
        date: '21 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'Crop Image tool — freeform cropping with draggable handles on all four corners and edges, aspect ratio lock (free, 16:9, 4:3, 1:1, 3:4), and rotation.' },
          { tag: 'NEW',      text: 'Metadata Editor — view and edit EXIF fields (GPS co-ordinates, camera make/model, timestamp, focal length, and more) in a clean table UI.' },
          { tag: 'NEW',      text: 'Remove Metadata — strip all EXIF data from an image for privacy in one click, entirely in-browser.' },
          { tag: 'NEW',      text: 'Tools dropdown in the site header — groups all tools by category (Compress and Edit) with hover-to-open behaviour and keyboard-accessible Escape-to-close.' },
        ],
      },
      {
        title: 'Per-File Compression Controls',
        date: '8 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'Each image now has its own quality slider, format selector, and Compress button — no more one-size-fits-all settings.' },
          { tag: 'NEW',      text: 'Format conversion — convert JPEG → PNG, PNG → WebP, and any combination directly in the UI.' },
          { tag: 'IMPROVED', text: 'Before/after Compare view auto-opens as soon as compression finishes.' },
          { tag: 'IMPROVED', text: 'Settings panel per card — gear icon reveals sliders without cluttering the main view.' },
        ],
      },
      {
        title: 'Mobile-First Redesign & Language Switcher',
        date: '5 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'Language switcher — translate the UI into 20+ languages via Google Translate, flag persists across sessions.' },
          { tag: 'NEW',      text: 'Hamburger menu for mobile with backdrop blur overlay.' },
          { tag: 'IMPROVED', text: 'Language dropdown anchors to the right on mobile so it never overflows the screen.' },
          { tag: 'FIXED',    text: 'Switching back to English now correctly restores the original page language.' },
        ],
      },
      {
        title: 'Footer, Policy Pages & Refund Policy',
        date: '3 Apr 2026',
        entries: [
          { tag: 'NEW',      text: 'Site footer with Support, Privacy Policy, Terms of Service, Refund Policy, and What\'s New links.' },
          { tag: 'NEW',      text: 'Full Privacy Policy page with "In short" summary box, ✓/✗ bullet lists, and security cards.' },
          { tag: 'NEW',      text: 'Refund Policy page — 7-day money-back guarantee, cancellation steps, and exception policy.' },
          { tag: 'NEW',      text: 'Terms of Service page.' },
        ],
      },
    ],
  },
  {
    label: 'March 2026',
    releases: [
      {
        title: 'Pricing Overhaul — Daily, Weekly, Monthly & Annual Plans',
        date: '28 Mar 2026',
        entries: [
          { tag: 'NEW',      text: 'Four billing options: Daily ($0.49), Weekly ($1.99), Monthly ($4.99), and Annual ($39 — save 35%).' },
          { tag: 'NEW',      text: 'Three-column pricing grid — Free, Pro, and Enterprise cards.' },
          { tag: 'IMPROVED', text: '"Most Popular" badge always highlights the Monthly plan regardless of active tab.' },
          { tag: 'IMPROVED', text: 'Discount tags visible inside every tab button at all times.' },
        ],
      },
      {
        title: 'SVG Compression Support',
        date: '14 Mar 2026',
        entries: [
          { tag: 'NEW',      text: 'SVG compression — strips <metadata>, <title>, XML comments, and rounds path coordinates.' },
          { tag: 'NEW',      text: 'Decimal Precision slider (0–6) for SVG: controls coordinate rounding granularity.' },
          { tag: 'IMPROVED', text: 'Format selector now shows a conversion arrow badge when input and output formats differ.' },
        ],
      },
    ],
  },
  {
    label: 'February 2026',
    releases: [
      {
        title: 'Initial Launch',
        date: '1 Feb 2026',
        entries: [
          { tag: 'NEW', text: 'Browser-based JPEG, PNG, and WebP compression — no uploads, no server.' },
          { tag: 'NEW', text: 'Drag-and-drop and click-to-upload drop zone with pulsing border animation.' },
          { tag: 'NEW', text: 'Quality slider with live size estimate (debounced, 150 ms).' },
          { tag: 'NEW', text: 'Before/after Compare view with draggable split bar and keyboard accessibility.' },
          { tag: 'NEW', text: 'Free tier: 5 files per session, up to 25 MB each.' },
          { tag: 'NEW', text: 'Pro tier: unlimited files, 100 MB each, ZIP export, ad-free, format conversion.' },
          { tag: 'NEW', text: 'Clerk authentication and Stripe billing with webhook-driven plan sync.' },
        ],
      },
    ],
  },
];

function Tag({ type }: { type: TagType }) {
  return (
    <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${TAG_STYLES[type]}`}>
      {type}
    </span>
  );
}

function MonthSection({ month, isFirst }: { month: Month; isFirst: boolean }) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="serif italic text-fg-1" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {month.label}
          </span>
          {isFirst && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent-dim text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Latest
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-fg-3 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="pb-6 space-y-3">
          {month.releases.map((release) => (
            <div key={release.title} className="bd-2 rounded-[10px] bg-surface overflow-hidden">
              <div className="flex items-baseline gap-3 px-5 py-4 bd-b-1">
                <h3 className="font-semibold text-fg-1 text-[13.5px] flex-1">{release.title}</h3>
                <span className="text-[11px] text-fg-3 whitespace-nowrap shrink-0">{release.date}</span>
              </div>
              <ul className="px-5 py-3 space-y-2.5">
                {release.entries.map((entry, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-fg-2">
                    <Tag type={entry.tag} />
                    <span className="leading-relaxed">{entry.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WhatsNewContent() {
  return (
    <main className="bg-page text-fg-1 relative overflow-hidden" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 relative z-[1]">

        <div className="mb-10">
          <span data-animate="hero" className="hp-eyebrow">Changelog</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-2" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            What&apos;s New
          </h1>
          <p data-animate="hero" className="text-[13.5px] text-fg-2 m-0">The latest features and improvements in ImagePDF.Tools.</p>
        </div>

        {/* Timeline */}
        <div data-animate-stagger>
          {CHANGELOG.map((month, i) => (
            <div key={month.label} className="flex gap-5">
              {/* Timeline column */}
              <div className="flex flex-col items-center w-5 shrink-0 pt-[26px]">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === 0 ? 'bg-accent' : 'bg-surface bd-2'}`}
                />
                {i < CHANGELOG.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: 'var(--border-1)' }} />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <MonthSection month={month} isFirst={i === 0} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
