import type { Metadata } from 'next';
import Link from 'next/link';
import { OfflineDemo } from './OfflineDemo';

export const metadata: Metadata = {
  title: 'About Us — Privacy-First by Architecture',
  description:
    'ImagePDF.Tools was built because we were tired of free tools that secretly harvest data. Every file you process stays on your device — always.',
  alternates: { canonical: 'https://imagepdf.tools/about' },
};

const STACK = [
  {
    name: 'Next.js & Vercel',
    desc: 'Lightning-fast global delivery with edge rendering.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    name: 'Rust / WebAssembly',
    desc: 'Browser-based compression as fast as native desktop software.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    name: 'Web Canvas API',
    desc: 'Native browser image processing — no plugins, no extensions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    desc: 'World-class edge caching and DDoS protection.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
      </svg>
    ),
  },
];

const VALUES = [
  {
    title: 'Privacy by Default',
    desc: "We don't want your data. We don't even have a database to store it in. Your files process locally and vanish when you close the tab.",
    color: 'emerald',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Speed as a Feature',
    desc: 'Tools should be instant. No "Processing…" spinners that last minutes. No server queues. No upload wait times.',
    color: 'blue',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Accessibility',
    desc: 'Professional-grade tools should be free for everyone — regardless of hardware, location, or income.',
    color: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
  blue:    'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
  violet:  'bg-violet-50 dark:bg-blue-950/30 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/60',
};

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ImagePDF.Tools',
  url: 'https://imagepdf.tools',
  description: 'Free browser-based image and PDF tools. Privacy-first by architecture — your files never leave your device.',
  email: 'contact@imagepdf.tools',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />

      {/* ── 1. Hero ── */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-14 text-center">
        <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Privacy-First Architecture
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-5">
          Privacy isn&apos;t a feature.{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            It&apos;s our architecture.
          </span>
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We built ImagePDF.Tools because we were tired of &ldquo;free&rdquo; online tools that secretly harvest user data.
          We&apos;ve re-engineered file processing to happen entirely on your device — not our servers.
        </p>
      </section>

      {/* ── 2. Mission: Local-First ── */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Problem / Solution */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">The Problem</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Most online converters require you to upload your sensitive documents — personal photos, private PDFs — to a remote server.
                  Once uploaded, <strong className="text-slate-800 dark:text-slate-200">you lose control of that data.</strong>
                </p>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Our Solution</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We use <strong className="text-slate-800 dark:text-slate-200">WebAssembly</strong> and the{' '}
                  <strong className="text-slate-800 dark:text-slate-200">Web Canvas API</strong> to bring professional-grade
                  image and PDF processing directly into your browser — no server touch, ever.
                </p>
              </div>
            </div>

            {/* Three proof points */}
            <div className="space-y-4">
              {[
                {
                  icon: '🔒',
                  title: 'Zero Uploads',
                  desc: 'Your files never leave your computer. Not even for a millisecond.',
                },
                {
                  icon: '⚡',
                  title: 'Instant Speed',
                  desc: 'No waiting for server queues or throttled upload speeds. Your CPU does the work.',
                },
                {
                  icon: '🌐',
                  title: 'Complete Privacy',
                  desc: 'If our servers went offline right now, your tools would still work. That\'s how private we are.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-0.5">{title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How It's Free ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            No account. No subscription. No catch.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            You&apos;re probably wondering: &ldquo;If they aren&apos;t selling my data, how do they make money?&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Low server costs',
              desc: 'We don\'t run your files through servers — your computer does the heavy lifting. Our infrastructure costs are minimal.',
              badge: 'Cost Model',
              badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
            },
            {
              label: 'Non-intrusive ads',
              desc: 'Free users see small, tasteful display ads. No tracking, no retargeting, no data harvesting — just a banner.',
              badge: 'Free Tier',
              badgeColor: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
            },
            {
              label: 'Optional Pro tier',
              desc: 'Power users who need unlimited batch processing and an ad-free experience can upgrade to Pro — coming soon.',
              badge: 'Pro Tier',
              badgeColor: 'bg-violet-50 dark:bg-blue-950/30 text-violet-600 dark:text-violet-400',
            },
          ].map(({ label, desc, badge, badgeColor }) => (
            <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit ${badgeColor}`}>
                {badge}
              </span>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-50">{label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Tech Stack ── */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Engineered for Performance
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              Built by senior frontend engineers, ImagePDF.Tools is a labour of love for the developer community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STACK.map(({ name, desc, icon }) => (
              <div key={name} className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-0.5">{name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Values ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map(({ title, desc, color, icon }) => (
            <div key={title} className={`border rounded-2xl p-6 flex flex-col gap-4 ${colorMap[color]}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
                {icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1">{title}</p>
                <p className="text-xs leading-relaxed opacity-80">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Offline Proof Demo ── */}
      <section className="bg-slate-900 dark:bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-950/40 border border-amber-800/60 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Technical Proof
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Still don&apos;t believe us? Go offline.
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed mb-10">
            Disconnect your internet, then click the button below to compress a sample image.
            It will still work — because nothing ever needed a server in the first place.
          </p>

          <OfflineDemo />
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Ready to experience truly private processing?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          No sign-up. No credit card. No data leaving your device.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/compress-image"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors shadow-lg shadow-violet-500/20"
          >
            Go to Tools
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-semibold px-7 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
          >
            Read our Privacy Policy
          </Link>
        </div>
      </section>

    </main>
  );
}
