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

function Check({ dark }: { dark?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-violet-600' : 'text-gray-500 dark:text-gray-400'}`}
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
    <main className="flex-1 py-14 sm:py-20 px-4 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 opacity-60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Choose your right plan!
          </h1>
          <p className="text-gray-400 dark:text-gray-500 max-w-md mx-auto leading-relaxed">
            Select from our flexible plans. Need access for just a day or a full year — we&apos;ve got you covered.
          </p>

          {/* Billing period toggle */}
          <div className="mt-8 inline-flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 gap-1 shadow-sm">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setBilling(plan.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billing === plan.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Free card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-bold px-4 py-1.5 rounded-full">
                Free
              </span>
            </div>

            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-8">
              Everything you need for occasional image compression — no account required.
            </p>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <span className="text-6xl font-bold text-gray-900 dark:text-white">$0</span>
              <span className="text-gray-400 ml-2 text-base">/ forever</span>
            </div>

            {/* Features */}
            <ul className="space-y-4 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="w-full py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Get started
            </button>
          </div>

          {/* Pro card */}
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 rounded-3xl p-8 flex flex-col relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200 dark:bg-violet-800/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block bg-violet-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md shadow-violet-200 dark:shadow-violet-900">
                  Pro
                </span>
                {selected.save && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
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

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-violet-200 dark:border-violet-800/50">
                <span className="text-6xl font-bold text-gray-900 dark:text-white">{selected.price}</span>
                <span className="text-violet-500 dark:text-violet-400 ml-2 text-base">{selected.sub}</span>
                {billing === 'annual' && (
                  <p className="text-xs text-violet-500 dark:text-violet-400 mt-1.5">~$1.67/month — vs $3/month billed monthly</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 flex-1 mb-8">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check dark />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isPro ? (
                <div className="w-full text-center py-3.5 rounded-2xl bg-violet-600/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                  You&apos;re on Pro ✓
                </div>
              ) : (
                <>
                  <Show when="signed-in">
                    <button
                      onClick={handleUpgrade}
                      disabled={loading}
                      className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3.5 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-60 shadow-lg"
                    >
                      {loading ? 'Redirecting…' : `Get started — ${selected.price}`}
                    </button>
                  </Show>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3.5 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg">
                        Sign in to upgrade
                      </button>
                    </SignInButton>
                  </Show>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
          Secure payment via Stripe · Cancel anytime · No questions asked
        </p>
      </div>
    </main>
  );
}

export default function PricingPage() {
  return <PricingContent />;
}
