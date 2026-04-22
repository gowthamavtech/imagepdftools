'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth, Show, SignInButton } from '@clerk/nextjs';

interface Props {
  onClose: () => void;
}

const PRO_FEATURES = [
  'Unlimited files per session',
  'Batch ZIP download',
  'Format conversion (PNG → WebP, etc.)',
  'Ad-free experience',
  'Files up to 100 MB',
];

export function UpgradeModal({ onClose }: Props) {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleUpgrade = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-violet-600 via-purple-500 to-pink-500" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-violet-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-violet-200 dark:shadow-violet-900">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 id="upgrade-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            Upgrade to Pro
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            You&apos;ve reached the 5-file limit. Your current files keep processing — Pro unlocks unlimited batches.
          </p>
        </div>

        <ul className="space-y-2.5 mb-6">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="text-center mb-5">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">$4.99</span>
          <span className="text-gray-400 ml-1 text-sm">/ month</span>
          <p className="text-xs text-gray-400 mt-0.5">or $39/year — save 35%</p>
        </div>

        <Show when="signed-in">
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md shadow-violet-200 dark:shadow-violet-900"
          >
            {loading ? 'Redirecting to checkout…' : 'Upgrade to Pro — $4.99/mo'}
          </button>
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="w-full bg-linear-to-r from-violet-600 to-purple-600 text-white font-semibold py-3.5 rounded-2xl shadow-md shadow-violet-200 dark:shadow-violet-900">
              Sign In to Upgrade
            </button>
          </SignInButton>
        </Show>

        <button onClick={onClose} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2">
          Maybe Later
        </button>
      </div>
    </div>
  );
}
