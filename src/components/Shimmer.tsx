import React from 'react';

// Reusable shimmer skeleton building blocks

export function ShimmerBlock({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`shimmer rounded-xl ${className}`} style={style} />;
}

export function ShimmerLine({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`shimmer rounded-full h-3 ${className}`} style={style} />;
}

/** Homepage hero skeleton — 2-column grid matching page.tsx layout */
export function HeroSkeleton() {
  return (
    <div className="relative flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">

          {/* Left column — text */}
          <div className="flex flex-col gap-6">
            {/* Status pill */}
            <ShimmerBlock className="h-7 w-44 rounded-full" />

            {/* H1 — 3 lines, large serif */}
            <div className="flex flex-col gap-3">
              <ShimmerLine className="h-12 sm:h-14 w-full" />
              <ShimmerLine className="h-12 sm:h-14 w-11/12" />
              <ShimmerLine className="h-12 sm:h-14 w-3/4" />
            </div>

            {/* Subtitle */}
            <div className="flex flex-col gap-2.5">
              <ShimmerLine className="h-4 w-5/6" />
              <ShimmerLine className="h-4 w-2/3" />
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <ShimmerBlock className="h-11 w-40 rounded-xl" />
              <ShimmerBlock className="h-11 w-32 rounded-xl" />
            </div>

            {/* Trust chips — 4 pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[96, 80, 88, 72].map((w) => (
                <ShimmerBlock key={w} className={`h-7 rounded-full`} style={{ width: w }} />
              ))}
            </div>
          </div>

          {/* Right column — browser mockup skeleton */}
          <div className="hidden lg:flex flex-col gap-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Chrome bar */}
            <div className="shimmer h-9 rounded-none" />
            {/* Drop zone area */}
            <ShimmerBlock className="h-40 rounded-none" />
            {/* File rows */}
            <div className="flex flex-col gap-px bg-slate-100 dark:bg-slate-800">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900">
                  <ShimmerBlock className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <ShimmerLine className="h-3 w-32" />
                    <ShimmerLine className="h-2.5 w-20" />
                  </div>
                  <ShimmerBlock className="h-7 w-20 rounded-lg shrink-0" />
                </div>
              ))}
            </div>
            {/* Quality footer bar */}
            <div className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <ShimmerLine className="h-3 w-16" />
              <ShimmerBlock className="h-3 flex-1 rounded-full" />
              <ShimmerLine className="h-3 w-8" />
            </div>
          </div>

          {/* Mobile fallback — plain drop zone */}
          <ShimmerBlock className="lg:hidden w-full h-48 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

/** Tool page skeleton — centered layout matching compress-jpeg-online and similar pages */
export function ToolPageSkeleton() {
  return (
    <div className="relative flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 text-center">
        {/* Eyebrow label */}
        <div className="flex justify-center mb-5">
          <ShimmerBlock className="h-6 w-36 rounded-full" />
        </div>

        {/* H1 — 2 lines, large */}
        <div className="flex flex-col items-center gap-3 mb-5">
          <ShimmerLine className="h-10 sm:h-12 w-3/4 sm:w-2/3" />
          <ShimmerLine className="h-10 sm:h-12 w-1/2 sm:w-1/2" />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2 mb-3">
          <ShimmerLine className="h-4 w-2/3 sm:w-96" />
          <ShimmerLine className="h-4 w-1/2 sm:w-72" />
        </div>

        {/* Trust text */}
        <div className="flex justify-center mb-6">
          <ShimmerLine className="h-3 w-40" />
        </div>

        {/* Feature chips — 3 pills */}
        <div className="flex justify-center gap-2.5 flex-wrap mb-8">
          {[120, 100, 110].map((w) => (
            <ShimmerBlock key={w} className="h-8 rounded-full" style={{ width: w }} />
          ))}
        </div>

        {/* Drop zone */}
        <ShimmerBlock className="w-full h-52 rounded-3xl mb-4" />

        {/* Result file rows */}
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <ShimmerBlock className="h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5 text-left">
                <ShimmerLine className="h-3 w-36" />
                <ShimmerLine className="h-2.5 w-24" />
              </div>
              <ShimmerBlock className="h-8 w-24 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Text content page skeleton — used for policy/terms/whats-new pages */
export function ContentSkeleton() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <ShimmerLine className="h-9 w-48 mb-2" />
        <ShimmerLine className="h-3 w-36 mb-10" />

        {/* Sections */}
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="mb-8">
            <ShimmerLine className="h-5 w-40 mb-4" />
            <div className="space-y-2.5">
              <ShimmerLine className="h-3 w-full" />
              <ShimmerLine className="h-3 w-11/12" />
              <ShimmerLine className="h-3 w-4/5" />
              {s % 2 === 0 && <ShimmerLine className="h-3 w-full" />}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/** Pricing page skeleton — "Coming Soon" centered layout */
export function PricingSkeleton() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
      {/* Accent pill */}
      <div className="flex justify-center mb-6">
        <ShimmerBlock className="h-7 w-32 rounded-full" />
      </div>
      {/* H1 */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <ShimmerLine className="h-12 w-72 sm:w-96" />
      </div>
      {/* Subtitle */}
      <div className="flex flex-col items-center gap-2">
        <ShimmerLine className="h-4 w-56 sm:w-80" />
        <ShimmerLine className="h-4 w-40 sm:w-60" />
      </div>
    </main>
  );
}

/** Changelog (What's New) skeleton */
export function ChangelogSkeleton() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ShimmerLine className="h-9 w-36 mb-2" />
        <ShimmerLine className="h-3 w-64 mb-10" />

        {[1, 2, 3].map((m) => (
          <div key={m} className="border-b border-slate-200 dark:border-slate-700 py-4">
            <div className="flex items-center justify-between mb-4">
              <ShimmerLine className="h-5 w-28" />
              <ShimmerBlock className="h-4 w-4 rounded" />
            </div>
            <div className="space-y-3">
              {[1, 2].map((r) => (
                <ShimmerBlock key={r} className="h-24 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
