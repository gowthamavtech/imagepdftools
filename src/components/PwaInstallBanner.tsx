'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const LS_KEY = 'pwa-banner-dismissed';

export function PwaInstallBanner() {
  const [prompt, setPrompt]       = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible]     = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already installed as PWA or user previously dismissed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem(LS_KEY)
    ) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setTimeout(() => setVisible(false), 2500);
    });

    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const dismiss = () => {
    localStorage.setItem(LS_KEY, '1');
    setVisible(false);
  };

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]"
      role="dialog"
      aria-label="Install app suggestion"
    >
      <div className="rounded-2xl bg-surface bd-2 shadow-2xl p-4 flex flex-col gap-3">

        {installed ? (
          /* ── Success state ── */
          <div className="flex items-center gap-3 py-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-fg-1">App installed!</p>
              <p className="text-[11px] text-fg-3 mt-0.5">HD files will cache permanently.</p>
            </div>
          </div>
        ) : (
          /* ── Prompt state ── */
          <>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-fg-1 leading-snug">Install ImagePDF as an app</p>
                <p className="text-[11.5px] text-fg-3 mt-1 leading-snug">
                  HD Convert downloads ~250 MB of engine files. Install to cache them permanently — no re-downloading on future visits.
                </p>
              </div>
              <button
                onClick={dismiss}
                className="text-fg-3 hover:text-fg-1 transition-colors shrink-0 p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/5"
                aria-label="Dismiss"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={install}
                className="btn-accent flex-1 h-9 rounded-xl text-[13px] font-semibold tracking-[-0.01em] transition-all cursor-pointer"
              >
                Install App
              </button>
              <button
                onClick={dismiss}
                className="flex-1 h-9 rounded-xl bd-2 text-[13px] font-medium text-fg-2 hover:text-fg-1 transition-colors cursor-pointer"
              >
                Not now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
