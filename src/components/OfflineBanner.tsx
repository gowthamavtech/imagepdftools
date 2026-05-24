'use client';

import { useState, useEffect } from 'react';

export function OfflineBanner() {
  const [offline, setOffline] = useState(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline  = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online',  goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online',  goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 border border-slate-700 text-slate-100 text-xs font-medium px-4 py-2.5 rounded-full shadow-xl shadow-black/30 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
        You&apos;re offline — cached tools still work
      </div>
    </div>
  );
}
