import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — Coming Soon',
  description: 'Pro plan coming soon. All ImagePDF.Tools features are free while we prepare our Pro tier.',
  alternates: { canonical: 'https://imagepdf.tools/pricing' },
  robots: { index: false, follow: false },
};

const COMING_FEATURES = [
  'Unlimited files per session',
  'Batch ZIP export',
  'Up to 100 MB per file',
  'Format conversion (PNG → WebP, etc.)',
  'Ad-free experience',
];

export default function PricingPage() {
  return (
    <main className="bg-page text-fg-1" style={{ overflowX: 'clip', minHeight: '80vh' }}>
      <div
        className="flex items-center justify-center px-8"
        style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}
      >
        <div className="max-w-[480px] w-full text-center">

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="fixed pointer-events-none z-0"
            style={{
              left: '50%', top: '20%',
              width: 'min(600px, 100vw)', height: 'min(400px, 100vw)',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(48px)',
              opacity: 0.35,
            }}
          />

          <div className="relative z-[1]">
            {/* Eyebrow */}
            <span
              data-animate="hero"
              className="inline-flex items-center gap-2 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" style={{ animation: 'pulse 2s infinite' }} />
              Coming Soon
            </span>

            {/* Heading */}
            <h1
              data-animate="hero"
              className="serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Pro is on its way.
            </h1>

            <p data-animate="hero" className="text-[15px] font-normal leading-[1.65] text-fg-2 max-w-[42ch] mx-auto m-0 mb-8">
              Unlimited files, batch export, and an ad-free experience. Everything is{' '}
              <span className="text-accent font-medium">100% free</span> in the meantime.
            </p>

            {/* Feature card */}
            <div data-animate="hero" className="relative rounded-[14px] bg-surface bd-2 p-6 mb-8 text-left">
              {/* Accent hairline */}
              <div
                aria-hidden="true"
                className="absolute top-[-1px] left-[12%] right-[12%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }}
              />

              <p className="font-data text-[10px] font-medium tracking-[0.18em] uppercase text-fg-3 m-0 mb-4">
                ◆ What&apos;s coming in Pro
              </p>

              <ul className="m-0 p-0 list-none flex flex-col gap-3">
                {COMING_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full grid place-items-center"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                      aria-hidden="true"
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] font-normal text-fg-2 leading-[1.4]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              data-animate="hero"
              href="/compress-image"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[10px] text-[13.5px] font-medium no-underline btn-accent"
              style={{ color: 'var(--on-accent)' }}
            >
              Start using free tools
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <p className="text-[12px] text-fg-3 mt-4 m-0">No account needed — just open and use.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
