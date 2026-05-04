'use client';

import Link from 'next/link';
import { useState } from 'react';

const SUBJECTS = [
  { value: 'billing',  label: 'Billing & Subscription' },
  { value: 'refund',   label: 'Refund Request' },
  { value: 'bug',      label: 'Bug Report' },
  { value: 'feature',  label: 'Feature Request' },
  { value: 'privacy',  label: 'Privacy & Data' },
  { value: 'other',    label: 'Other' },
];

const CONTACT_EMAIL = 'contact@imagepdf.tools';

export default function ContactForm() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent,    setSent]    = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subjectLine = SUBJECTS.find((s) => s.value === subject)?.label ?? subject;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`[${subjectLine}] Message from ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const canSubmit = name.trim() && email.trim() && subject && message.trim();

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Contact Us</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We read every message and aim to reply within 24 hours.
          </p>
        </div>

        {/* Direct email card */}
        <div className="border border-violet-200 dark:border-violet-800/60 rounded-2xl p-6 mb-8 bg-violet-50 dark:bg-violet-950/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-0.5">Email us directly</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              For billing, refunds, bugs, or anything urgent.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Contact form */}
        {sent ? (
          <div className="border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-8 bg-emerald-50 dark:bg-emerald-950/20 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">Your email client should have opened</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              If it didn&apos;t, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-600 dark:text-violet-400 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-4 py-3 outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a topic…</option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your issue or question in detail…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-colors shadow-sm shadow-violet-500/20"
            >
              Send Message
            </button>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              This will open your email client with your message pre-filled.
            </p>
          </form>
        )}

        {/* Useful links */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 text-sm">
          <Link href="/support"        className="text-violet-600 dark:text-violet-400 hover:underline">FAQ &amp; Support</Link>
          <Link href="/privacy-policy" className="text-violet-600 dark:text-violet-400 hover:underline">Privacy Policy</Link>
          <Link href="/refund"         className="text-violet-600 dark:text-violet-400 hover:underline">Refund Policy</Link>
          <Link href="/"               className="text-violet-600 dark:text-violet-400 hover:underline">&#8592; Back to app</Link>
        </div>

      </div>
    </main>
  );
}
