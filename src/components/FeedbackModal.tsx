'use client';

import { useState, useRef, useCallback } from 'react';

type FeedbackType = 'bug' | 'feature' | 'other';
type Tab = 'submit' | 'history';

interface HistoryEntry {
  id: string;
  type: FeedbackType;
  text: string;
  date: string;
}

const TYPE_CONFIG: Record<FeedbackType, { label: string; icon: React.ReactNode; activeClass: string }> = {
  bug: {
    label: 'Bug Report',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    activeClass: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800',
  },
  feature: {
    label: 'Feature Request',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    activeClass: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
  },
  other: {
    label: 'Other',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    activeClass: 'bg-blue-950/20 text-violet-600 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800',
  },
};

const MAX_CHARS = 2000;

function SubmitTab({ onSuccess }: { onSuccess: (entry: HistoryEntry) => void }) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feature');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(async () => {
    if (!text.trim()) return;
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 800));
    onSuccess({
      id: Math.random().toString(36).slice(2),
      type: feedbackType,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setSending(false);
  }, [text, feedbackType, onSuccess]);

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wide mb-2">Type</p>
        <div className="flex gap-2">
          {(Object.keys(TYPE_CONFIG) as FeedbackType[]).map((type) => {
            const cfg = TYPE_CONFIG[type];
            const isActive = feedbackType === type;
            return (
              <button
                key={type}
                onClick={() => setFeedbackType(type)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all flex-1 justify-center ${
                  isActive
                    ? cfg.activeClass
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-violet-400 dark:hover:border-gray-600'
                }`}
              >
                {cfg.icon}
                <span className="hidden sm:inline">{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          placeholder="What would you like to see?"
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-gray-500 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-600 focus:border-transparent transition-all"
        />
        <div className="flex items-center justify-between mt-1">
          {/* Attachment */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-violet-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            {fileName ? fileName : 'Attach screenshot or file'}
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.txt"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          {/* Char counter */}
          <span className={`text-xs tabular-nums ${text.length >= MAX_CHARS ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
            {text.length}/{MAX_CHARS}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          {sending ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            'Send Feedback'
          )}
        </button>
      </div>
    </div>
  );
}

function HistoryTab({ entries }: { entries: HistoryEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-400 dark:text-slate-400">No feedback submitted yet</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your submissions will appear here</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => {
        const cfg = TYPE_CONFIG[entry.type];
        return (
          <li key={entry.id} className="border border-slate-200 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-800/60">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${cfg.activeClass}`}>
                {cfg.icon}
                {cfg.label}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">{entry.date}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{entry.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-14 h-14 mx-auto rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-50 mb-1">Thanks for your feedback!</h3>
      <p className="text-sm text-slate-400 dark:text-slate-400 mb-6">We review every submission and use it to improve ImagePDF.Tools.</p>
      <button
        onClick={onClose}
        className="text-sm font-medium text-violet-400 hover:underline"
      >
        Close
      </button>
    </div>
  );
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('submit');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => [entry, ...prev]);
    setShowSuccess(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    // Reset success state after animation
    setTimeout(() => setShowSuccess(false), 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Share Feedback</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 dark:hover:text-slate-300 hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showSuccess ? (
          <div className="px-5 py-5">
            <SuccessState onClose={handleClose} />
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-1 px-5 pt-4">
              <button
                onClick={() => setActiveTab('submit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'submit'
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Submit
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
                {history.length > 0 && (
                  <span className="bg-violet-100 dark:bg-violet-900/50 text-violet-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {history.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab content */}
            <div className="px-5 py-4">
              {activeTab === 'submit' ? (
                <SubmitTab key="submit" onSuccess={handleSuccess} />
              ) : (
                <HistoryTab entries={history} />
              )}
            </div>

            {/* Cancel row — only on submit tab */}
            {activeTab === 'submit' && (
              <div className="px-5 pb-5 -mt-1">
                <button
                  onClick={handleClose}
                  className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300 py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-700 text-sm font-medium px-4 py-2.5 rounded-full shadow-lg shadow-black/10 dark:shadow-black/30 transition-all hover:shadow-xl hover:scale-105 active:scale-100"
        aria-label="Open feedback"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Feedback
      </button>

      <FeedbackModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
