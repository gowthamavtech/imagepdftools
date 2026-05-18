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
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    name: 'Rust / WebAssembly',
    desc: 'Browser-based compression as fast as native desktop software.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    name: 'Web Canvas API',
    desc: 'Native browser image processing — no plugins, no extensions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    desc: 'World-class edge caching and DDoS protection.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
      </svg>
    ),
  },
];

const VALUES = [
  {
    title: 'Privacy by Default',
    desc: "We don't want your data. We don't even have a database to store it in. Your files process locally and vanish when you close the tab.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Speed as a Feature',
    desc: 'Tools should be instant. No "Processing…" spinners that last minutes. No server queues. No upload wait times.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Accessibility',
    desc: 'Professional-grade tools should be free for everyone — regardless of hardware, location, or income.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

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
    <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
        <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
        <div className="max-w-[780px] mx-auto px-8 text-center relative z-[1]">
          <span data-animate="hero" className="hp-eyebrow">About</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-5" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
            Privacy isn&apos;t a feature.<br /><span className="text-accent">It&apos;s our architecture.</span>
          </h1>
          <p data-animate="hero" className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0">
            We built ImagePDF.Tools because we were tired of &ldquo;free&rdquo; online tools that secretly harvest user data.
            We&apos;ve re-engineered file processing to happen entirely on your device — not our servers.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ padding: 'clamp(20px, 2.5vw, 32px) 0' }}>
        <div className="max-w-[1180px] mx-auto px-8">
          <div data-animate-stagger className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '16+',  label: 'Browser tools' },
              { num: '0',    label: 'Bytes uploaded' },
              { num: '100%', label: 'In-browser' },
              { num: '35%',  label: 'Avg size saved' },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center text-center py-6 px-4 ${i > 0 ? 'border-l border-[var(--border-1)]' : ''}`}
              >
                <span className="serif italic text-accent" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {num}
                </span>
                <span className="font-data text-[11px] uppercase tracking-[0.12em] text-fg-3 mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Mission: Local-First ── */}
      <section className="bd-t-1 bd-b-1 bg-surface" style={{ padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Problem / Solution */}
            <div data-animate="scroll" className="space-y-6">
              <div className="space-y-2">
                <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3">The Problem</p>
                <p className="text-[14px] text-fg-2 leading-[1.75]">
                  Most online converters require you to upload your sensitive documents — personal photos, private PDFs — to a remote server.
                  Once uploaded, <strong className="text-fg-1">you lose control of that data.</strong>
                </p>
              </div>
              <div className="h-px bg-surface bd-t-1" />
              <div className="space-y-2">
                <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent">Our Solution</p>
                <p className="text-[14px] text-fg-2 leading-[1.75]">
                  We use <strong className="text-fg-1">WebAssembly</strong> and the{' '}
                  <strong className="text-fg-1">Web Canvas API</strong> to bring professional-grade
                  image and PDF processing directly into your browser — no server touch, ever.
                </p>
              </div>
            </div>

            {/* Three proof points */}
            <div data-animate-stagger className="space-y-4">
              {[
                {
                  title: 'Zero Uploads',
                  desc: 'Your files never leave your computer. Not even for a millisecond.',
                  icon: (
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                },
                {
                  title: 'Instant Speed',
                  desc: 'No waiting for server queues or throttled upload speeds. Your CPU does the work.',
                  icon: (
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  title: 'Complete Privacy',
                  desc: 'If our servers went offline right now, your tools would still work. That\'s how private we are.',
                  icon: (
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                    </svg>
                  ),
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-page bd-2 rounded-[12px] px-5 py-4">
                  <div className="w-10 h-10 rounded-[10px] bg-accent-dim flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-fg-1 mb-0.5">{title}</p>
                    <p className="text-[12.5px] text-fg-2 leading-[1.65]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How It's Free ── */}
      <section style={{ padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="max-w-[780px] mx-auto px-8">
          <div className="text-center mb-10">
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              No account. No subscription. No catch.
            </h2>
            <p data-animate="scroll" className="text-[14px] text-fg-2 max-w-[44ch] mx-auto leading-[1.7] m-0">
              You&apos;re probably wondering: &ldquo;If they aren&apos;t selling my data, how do they make money?&rdquo;
            </p>
          </div>

          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Low server costs',
                desc: 'We don\'t run your files through servers — your computer does the heavy lifting. Our infrastructure costs are minimal.',
                badge: 'Cost Model',
              },
              {
                label: 'Non-intrusive ads',
                desc: 'Free users see small, tasteful display ads. No tracking, no retargeting, no data harvesting — just a banner.',
                badge: 'Free Tier',
              },
              {
                label: 'Optional Pro tier',
                desc: 'Power users who need unlimited batch processing and an ad-free experience can upgrade to Pro.',
                badge: 'Pro Tier',
              },
            ].map(({ label, desc, badge }) => (
              <div key={label} className="bg-surface bd-2 rounded-[12px] p-6 flex flex-col gap-3">
                <span className="font-data text-[10px] font-medium tracking-[0.14em] uppercase text-accent bg-accent-dim bd-accent px-2.5 py-1 rounded-full w-fit">
                  {badge}
                </span>
                <p className="text-[14px] font-medium text-fg-1 m-0">{label}</p>
                <p className="text-[12.5px] text-fg-2 leading-[1.65] m-0">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Tech Stack ── */}
      <section className="bd-t-1 bd-b-1 bg-surface" style={{ padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="max-w-[780px] mx-auto px-8">
          <div className="text-center mb-10">
            <span data-animate="scroll" className="hp-eyebrow text-center">Tech stack</span>
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Engineered for Performance
            </h2>
            <p data-animate="scroll" className="text-[14px] text-fg-2 max-w-[42ch] mx-auto leading-[1.7] m-0">
              Built by senior frontend engineers, ImagePDF.Tools is a labour of love for the developer community.
            </p>
          </div>

          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STACK.map(({ name, desc, icon }) => (
              <div key={name} className="flex items-start gap-4 bg-page bd-2 rounded-[12px] px-5 py-4">
                <div className="w-10 h-10 rounded-[10px] bg-accent-dim flex items-center justify-center text-accent shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-fg-1 mb-0.5">{name}</p>
                  <p className="text-[12.5px] text-fg-2 leading-[1.65]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Values ── */}
      <section style={{ padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="max-w-[780px] mx-auto px-8">
          <div className="text-center mb-10">
            <span data-animate="scroll" className="hp-eyebrow text-center">Values</span>
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Our Values</h2>
          </div>
          <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map(({ title, desc, icon }) => (
              <div key={title} className="bg-accent-dim bd-accent rounded-[12px] p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-[10px] bg-page bd-2 flex items-center justify-center text-accent">
                  {icon}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-fg-1 mb-1">{title}</p>
                  <p className="text-[12.5px] text-fg-2 leading-[1.65]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Offline Proof Demo ── */}
      <section className="bd-t-1 bd-b-1 bg-surface" style={{ padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="max-w-[780px] mx-auto px-8 text-center">
          <span data-animate="scroll" className="hp-eyebrow text-center">Technical Proof</span>
          <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Still don&apos;t believe us? Go offline.
          </h2>
          <p data-animate="scroll" className="text-[14px] text-fg-2 max-w-[46ch] mx-auto leading-[1.7] mb-10 m-0">
            Disconnect your internet, then click the button below to compress a sample image.
            It will still work — because nothing ever needed a server in the first place.
          </p>

          <OfflineDemo />
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-[780px] mx-auto px-8 text-center">
          <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Ready to experience truly private processing?
          </h2>
          <p data-animate="scroll" className="text-[14px] text-fg-2 mb-8 leading-[1.7] m-0">
            No sign-up. No credit card. No data leaving your device.
          </p>
          <div data-animate="scroll" className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/compress-image"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-[13.5px] font-medium bd-accent text-accent btn-accent-outline"
            >
              Go to Tools
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-[13.5px] font-medium text-fg-2 bd-2 hover:text-accent hover:bd-accent transition-colors"
            >
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
