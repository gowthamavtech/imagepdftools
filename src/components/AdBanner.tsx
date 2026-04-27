'use client';

import { useEffect } from 'react';
import { usePlan } from '@/hooks/usePlan';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdVariant = 'banner' | 'leaderboard' | 'skyscraper' | 'inline';
type AdSide = 'left' | 'right';

const CONFIG: Record<AdVariant, { minH: number; minW: number; format: string; fullWidth: string }> = {
  banner:      { minH: 90,  minW: 320, format: 'horizontal', fullWidth: 'true'  },
  leaderboard: { minH: 90,  minW: 320, format: 'horizontal', fullWidth: 'true'  },
  skyscraper:  { minH: 600, minW: 160, format: 'vertical',   fullWidth: 'false' },
  inline:      { minH: 90,  minW: 320, format: 'auto',       fullWidth: 'true'  },
};

export function AdBanner({ variant = 'inline', side = 'right' }: { variant?: AdVariant; side?: AdSide }) {
  const { isPro } = usePlan();
  const c = CONFIG[variant];

  useEffect(() => {
    if (isPro) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle may not be loaded yet
    }
  }, [isPro]);

  if (isPro || !process.env.NEXT_PUBLIC_ADSENSE_ID) return null;

  const insEl = (
    <div
      className="ad-container overflow-hidden"
      style={{ minHeight: c.minH, minWidth: c.minW }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot="AUTO"
        data-ad-format={c.format}
        data-full-width-responsive={c.fullWidth}
      />
    </div>
  );

  // Banner: full-width horizontal strip below the header
  if (variant === 'banner') {
    return (
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex justify-center items-center py-1.5 px-4">
        {insEl}
      </div>
    );
  }

  // Leaderboard: full-width horizontal strip above the footer
  if (variant === 'leaderboard') {
    return (
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-center items-center py-1.5 px-4">
        {insEl}
      </div>
    );
  }

  // Skyscraper: sticky sidebar — breakpoint depends on side
  // Right: shows at lg (≥1024px) — standard desktop and up
  // Left:  shows at wide (≥1441px) — widescreen only
  if (variant === 'skyscraper') {
    const isLeft = side === 'left';
    return (
      <aside className={`flex-col items-center w-44 shrink-0 pt-6 ${isLeft ? 'hidden wide:flex pl-4 pr-1' : 'hidden lg:flex pr-4 pl-1'}`}>
        <div className="sticky top-20">
          {insEl}
        </div>
      </aside>
    );
  }

  // Inline: drop-in inside content areas
  return insEl;
}
