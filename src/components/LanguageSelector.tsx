'use client';

import { useState, useRef, useEffect } from 'react';

// iso: ISO 3166-1 alpha-2 country code for flagcdn.com
const LANGUAGES = [
  { code: 'en', label: 'English',    iso: 'gb' },
  { code: 'hi', label: 'हिंदी',       iso: 'in' },
  { code: 'zh', label: '中文',        iso: 'cn' },
  { code: 'ar', label: 'العربية',     iso: 'sa' },
  { code: 'es', label: 'Español',    iso: 'es' },
  { code: 'fr', label: 'Français',   iso: 'fr' },
  { code: 'de', label: 'Deutsch',    iso: 'de' },
  { code: 'pt', label: 'Português',  iso: 'br' },
  { code: 'ru', label: 'Русский',    iso: 'ru' },
  { code: 'ja', label: '日本語',      iso: 'jp' },
  { code: 'ko', label: '한국어',      iso: 'kr' },
  { code: 'it', label: 'Italiano',   iso: 'it' },
  { code: 'tr', label: 'Türkçe',     iso: 'tr' },
  { code: 'pl', label: 'Polski',     iso: 'pl' },
  { code: 'nl', label: 'Nederlands', iso: 'nl' },
  { code: 'uk', label: 'Українська', iso: 'ua' },
  { code: 'el', label: 'Ελληνικά',   iso: 'gr' },
  { code: 'vi', label: 'Tiếng Việt', iso: 'vn' },
  { code: 'id', label: 'Bahasa',     iso: 'id' },
  { code: 'th', label: 'ภาษาไทย',    iso: 'th' },
] as const;

function Flag({ iso, label }: { iso: string; label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/20x15/${iso}.png`}
      srcSet={`https://flagcdn.com/40x30/${iso}.png 2x`}
      width={20}
      height={15}
      alt={label}
      className="rounded-sm object-cover shrink-0"
    />
  );
}

export function LanguageSelector({ mobileAlign }: { mobileAlign?: 'left' | 'right' } = {}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<typeof LANGUAGES[number]>(LANGUAGES[0]);
  const ref        = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // Read from localStorage first (survives both GT DOM mutations and page reloads)
  useEffect(() => {
    const stored = localStorage.getItem('imagepdf-lang');
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    const code = stored ?? match?.[1] ?? 'en';
    setCurrent(LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]);
  }, []);

  function switchLanguage(lang: typeof LANGUAGES[number]) {
    // Update flag immediately and persist so it survives remounts/reloads
    setCurrent(lang);
    localStorage.setItem('imagepdf-lang', lang.code);

    // Map our codes to Google Translate's internal codes ('' = restore original)
    const gtCode = lang.code === 'en' ? '' : lang.code === 'zh' ? 'zh-CN' : lang.code;

    // Update or clear the googtrans cookie
    if (lang.code === 'en') {
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = `googtrans=; path=/; domain=.${location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/`;
      document.cookie = `googtrans=/en/${lang.code}; path=/; domain=.${location.hostname}`;
    }

    // Revert to English: use GT's restore() method
    if (lang.code === 'en') {
      const w = window as unknown as { google?: { translate?: { TranslateElement?: { getInstance?: () => { restore?: () => void } } } } };
      const gt = w.google?.translate?.TranslateElement?.getInstance?.();
      if (gt?.restore) {
        gt.restore();
        return;
      }
      // GT not ready — reload without the cookie so it loads in English
      location.reload();
      return;
    }

    // Trigger GT's hidden combo select for non-English
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = gtCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    // GT not yet initialised — fall back to reload
    location.reload();
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-violet-200 dark:border-violet-800/60 bg-white dark:bg-slate-800 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Flag iso={current.iso} label={current.label} />
        <svg className={`w-3 h-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute z-50 w-44 bg-white dark:bg-slate-800 border border-violet-100 dark:border-violet-900/50 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden ${
            mobileAlign !== undefined
              ? `top-full mt-2 ${mobileAlign === 'left' ? 'left-0' : 'right-0'}`
              : 'right-0'
          }`}
          style={mobileAlign === undefined ? { top: 'calc(100% + 15.5px)' } : undefined}
          role="listbox"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <style>{`
            .lang-scroll::-webkit-scrollbar { width: 4px; }
            .lang-scroll::-webkit-scrollbar-track { background: transparent; }
            .lang-scroll::-webkit-scrollbar-thumb { background: rgb(203 213 225); border-radius: 99px; }
            .dark .lang-scroll::-webkit-scrollbar-thumb { background: rgb(71 85 105); }
          `}</style>
          <div
            className="lang-scroll max-h-56 overflow-y-auto py-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(203 213 225) transparent' }}
            translate="no"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                role="option"
                aria-selected={current.code === lang.code}
                onClick={() => { setOpen(false); switchLanguage(lang); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors text-left ${
                  current.code === lang.code
                    ? 'bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300'
                }`}
              >
                <Flag iso={lang.iso} label={lang.label} />
                <span className="notranslate" translate="no">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
