'use client';

import { useEffect } from 'react';
import { usePlan } from '@/hooks/usePlan';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner() {
  const { isPro } = usePlan();

  useEffect(() => {
    if (isPro) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle may not be loaded yet
    }
  }, [isPro]);

  if (isPro || !process.env.NEXT_PUBLIC_ADSENSE_ID) return null;

  return (
    <div
      className="ad-container w-full overflow-hidden rounded-xl"
      style={{ minHeight: 90, minWidth: 320 }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot="AUTO"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
