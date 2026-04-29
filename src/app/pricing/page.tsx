import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — Coming Soon',
  description: 'Pro plan coming soon. All ImagePDF.Tools features are free while we prepare our Pro tier.',
  alternates: { canonical: 'https://imagepdf.tools/pricing' },
};

export default function PricingPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full text-center space-y-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs font-bold px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
          Pro is on its way
        </h1>

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base max-w-sm mx-auto">
          We&apos;re putting the finishing touches on our Pro plan — unlimited files, batch export, and an ad-free experience.
        </p>

        {/* Feature preview */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-left space-y-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">What&apos;s coming in Pro</p>
          {[
            'Unlimited files per session',
            'Batch ZIP export',
            'Up to 100 MB per file',
            'Format conversion (PNG → WebP, etc.)',
            'Ad-free experience',
          ].map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <svg className="w-4 h-4 shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </div>
          ))}
        </div>

        {/* Free note */}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Everything is{' '}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% free</span>
          {' '}in the meantime — no account needed.
        </p>

        <Link
          href="/compress-image"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors shadow-lg shadow-violet-500/20"
        >
          Start using free tools
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

      </div>
    </main>
  );
}
