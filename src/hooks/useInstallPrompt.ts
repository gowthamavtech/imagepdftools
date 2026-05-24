'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type InstallPlatform = 'native' | 'ios' | 'unsupported';

export function useInstallPrompt() {
  const [prompt,      setPrompt]      = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform,    setPlatform]    = useState<InstallPlatform>('unsupported');

  useEffect(() => {
    // Already running as installed PWA (works on iOS too via navigator.standalone)
    const alreadyInstalled =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (alreadyInstalled) { setIsInstalled(true); return; }

    const ua = navigator.userAgent;
    const isIOS     = /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);
    const isSafari  = /Safari/.test(ua) && !/Chrome|CriOS/.test(ua);

    if (isIOS && isSafari) {
      setPlatform('ios');
      return; // no beforeinstallprompt on iOS — we show manual instructions instead
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setPlatform('native');
    };
    const onInstalled = () => { setIsInstalled(true); setPrompt(null); };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setPrompt(null);
  };

  const showButton = !isInstalled && (platform === 'native' ? !!prompt : platform === 'ios');

  return { showButton, platform, install };
}
