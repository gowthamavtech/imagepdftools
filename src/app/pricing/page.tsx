'use client';

import { Show, SignInButton } from '@clerk/nextjs';
import { usePlan } from '@/hooks/usePlan';
import { useState } from 'react';

type BillingPeriod = 'daily' | 'weekly' | 'monthly' | 'annual';

const PLANS: { id: BillingPeriod; label: string; price: string; sub: string; save?: string }[] = [
  { id: 'daily',   label: '1 Day',   price: '$0.49', sub: 'one-time' },
  { id: 'weekly',  label: '1 Week',  price: '$1',    sub: 'one-time' },
  { id: 'monthly', label: '1 Month', price: '$3',    sub: '/month' },
  { id: 'annual',  label: '1 Year',  price: '$20',   sub: '/year', save: 'Save 44%' },
];

const FREE_FEATURES = [
  'Up to 20 files per session',
  'JPEG, PNG, WebP, GIF, SVG compression',
  'Individual file downloads',
  'Up to 50 MB per file',
  'Browser-based — zero uploads',
];

const PRO_FEATURES = [
  'Unlimited files per session',
  'Up to 100 MB per file',
  'Batch ZIP export',
  'Format conversion (PNG → WebP…)',
  'Ad-free experience',
  'Priority compression queue',
];

function Check({ accent }: { accent?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 mt-0.5 ${accent ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingContent() {
  const { isSignedIn, isPro } = usePlan();
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [loading, setLoading] = useState(false);

  const selected = PLANS.find((p) => p.id === billing)!;

  async function handleUpgrade() {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 py-14 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Choose your right plan!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Select from our flexible plans. Need access for just a day or a full year — we&apos;ve got you covered.
          </p>

          <div className="mt-8 inline-flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full p-1.5 gap-1 shadow-sm">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setBilling(plan.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billing === plan.id
                    ? 'bg-violet-600 text-white shadow-md shadow-blue-900/20'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {plan.label}
                {plan.save && (
                  <span className="absolute -top-2.5 -right-1 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none whitespace-nowrap">
                    {plan.save}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Free card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold px-4 py-1.5 rounded-full">
                Free
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Everything you need for occasional image compression — no account required.
            </p>

            <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <span className="text-6xl font-bold text-slate-900 dark:text-slate-50">$0</span>
              <span className="text-slate-500 dark:text-slate-400 ml-2 text-base">/ forever</span>
            </div>

            <ul className="space-y-4 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Get started
            </button>
          </div>

          {/* Pro card */}
          <div className="bg-violet-50 dark:bg-blue-950/20 border border-violet-200 dark:border-violet-800/60 rounded-3xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/50 dark:bg-violet-800/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block bg-violet-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md shadow-blue-900/20">
                  Pro
                </span>
                {selected.save && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                    {selected.save}
                  </span>
                )}
              </div>

              <p className="text-sm text-violet-700 dark:text-violet-300 leading-relaxed mb-8">
                {billing === 'daily' && 'Full Pro access for 24 hours — perfect for a one-time batch job.'}
                {billing === 'weekly' && 'Full Pro access for 7 days — great for a project sprint.'}
                {billing === 'monthly' && 'Full Pro access billed monthly — cancel anytime, no lock-in.'}
                {billing === 'annual' && 'Full Pro access for a full year — our best value, lowest monthly cost.'}
              </p>

              <div className="mb-8 pb-8 border-b border-violet-200 dark:border-violet-800/50">
                <span className="text-6xl font-bold text-slate-900 dark:text-slate-50">{selected.price}</span>
                <span className="text-violet-600 dark:text-violet-400 ml-2 text-base">{selected.sub}</span>
                {billing === 'annual' && (
                  <p className="text-xs text-violet-500 dark:text-violet-400 mt-1.5">~$1.67/month — vs $3/month billed monthly</p>
                )}
              </div>

              <ul className="space-y-4 flex-1 mb-8">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <Check accent />
                    {f}
                  </li>
                ))}
              </ul>

              {isPro ? (
                <div className="w-full text-center py-3.5 rounded-2xl bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                  You&apos;re on Pro ✓
                </div>
              ) : (
                <>
                  <Show when="signed-in">
                    <button
                      onClick={handleUpgrade}
                      disabled={loading}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl transition-colors disabled:opacity-60 shadow-lg shadow-violet-500/20"
                    >
                      {loading ? 'Redirecting…' : `Get started — ${selected.price}`}
                    </button>
                  </Show>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-violet-500/20">
                        Sign in to upgrade
                      </button>
                    </SignInButton>
                  </Show>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          Secure payment via Stripe &middot; Cancel anytime &middot; No questions asked
        </p>
      </div>
    </main>
  );
}

export default function PricingPage() {
  return <PricingContent />;
}
