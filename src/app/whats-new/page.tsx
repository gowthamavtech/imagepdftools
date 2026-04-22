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
  NEW:      'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
  IMPROVED: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800',
  FIXED:    'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800',
};

const CHANGELOG: Month[] = [
  {
    label: 'April 2026',
    releases: [
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

function MonthSection({ month }: { month: Month }) {
  const [open, setOpen] = useState(month.label.includes('April'));

  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{month.label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="pb-6 space-y-3">
          {month.releases.map((release) => (
            <div key={release.title} className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/60 overflow-hidden">
              {/* Release header */}
              <div className="flex items-baseline gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{release.title}</h3>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">{release.date}</span>
              </div>

              {/* Entries */}
              <ul className="px-5 py-3 space-y-2.5">
                {release.entries.map((entry, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
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

export default function WhatsNewPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">What&apos;s New</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">The latest features and improvements in SquishIt.</p>
        </div>

        <div>
          {CHANGELOG.map((month) => (
            <MonthSection key={month.label} month={month} />
          ))}
        </div>

      </div>
    </main>
  );
}
