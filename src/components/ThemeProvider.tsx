'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.remove('dark');
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    // system — follow OS preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  // On mount: read saved preference; fall back to dark
  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme) ?? 'dark';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(saved);
    applyTheme(saved);
    // Sync to cookie so the server can render the correct class on next request
    document.cookie = `theme=${saved}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  }, []);

  // Listen for OS preference changes (relevant when theme === 'system')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem('theme', t);
    // Keep cookie in sync so the server renders the right class on next navigation
    document.cookie = `theme=${t}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    applyTheme(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
