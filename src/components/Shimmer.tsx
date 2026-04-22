// Reusable shimmer skeleton building blocks

export function ShimmerBlock({ className = '' }: { className?: string }) {
  return <div className={`shimmer rounded-xl ${className}`} />;
}

export function ShimmerLine({ className = '' }: { className?: string }) {
  return <div className={`shimmer rounded-full h-3 ${className}`} />;
}

/** Hero + drop zone skeleton — used on homepage and convert pages */
export function HeroSkeleton() {
  return (
    <div className="relative flex-1">
      <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <ShimmerBlock className="h-7 w-56 rounded-full" />
        </div>
        {/* H1 */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <ShimmerLine className="h-10 w-3/4 sm:w-1/2" />
          <ShimmerLine className="h-10 w-1/2 sm:w-1/3" />
        </div>
        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <ShimmerLine className="h-4 w-2/3 sm:w-96" />
          <ShimmerLine className="h-4 w-1/2 sm:w-72" />
        </div>
        {/* Stats row */}
        <div className="flex justify-center gap-8 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <ShimmerLine className="h-5 w-14" />
              <ShimmerLine className="h-3 w-10" />
            </div>
          ))}
        </div>
        {/* Drop zone */}
        <ShimmerBlock className="w-full h-56 rounded-3xl" />
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

/** Pricing page skeleton — 3 cards */
export function PricingSkeleton() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <ShimmerLine className="h-9 w-48 mx-auto mb-3" />
          <ShimmerLine className="h-4 w-72 mx-auto" />
        </div>
        {/* Tab strip */}
        <div className="flex justify-center mb-8">
          <ShimmerBlock className="h-10 w-72 rounded-full" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ShimmerBlock key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
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
          <div key={m} className="border-b border-gray-100 dark:border-gray-800 py-4">
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
