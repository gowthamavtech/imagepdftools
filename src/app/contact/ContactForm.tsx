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

const inputClass =
  'w-full text-[13.5px] text-fg-1 bg-surface bd-2 focus:border-[var(--accent)] rounded-[10px] px-4 py-3 outline-none transition-colors placeholder:text-fg-3';

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
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="max-w-[640px] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <span data-animate="hero" className="hp-eyebrow">Get in touch</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-2" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Contact Us
          </h1>
          <p data-animate="hero" className="text-[13.5px] text-fg-2 m-0">
            We read every message and aim to reply within 24 hours.
          </p>
        </div>

        {/* Direct email card */}
        <div data-animate="scroll" className="bg-accent-dim bd-accent rounded-[14px] p-5 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-page bd-2 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-fg-1 mb-0.5">Email us directly</p>
            <p className="text-[12.5px] text-fg-2 mb-2">
              For billing, refunds, bugs, or anything urgent.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[13px] font-medium text-accent hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Contact form / success state */}
        <div data-animate="scroll">
        {sent ? (
          <div className="bg-surface bd-2 rounded-[14px] p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-dim flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-fg-1 mb-1">Your email client should have opened</p>
            <p className="text-[13px] text-fg-2 mb-5">
              If it didn&apos;t, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-[13px] text-fg-2 hover:text-fg-1 underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-2">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-2">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-2">
                Subject <span className="text-accent">*</span>
              </label>
              <select
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select a topic…</option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your issue or question in detail…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full text-accent bd-accent hover:bg-surface font-semibold text-[13.5px] py-3.5 rounded-[10px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send Message
            </button>

            <p className="text-center text-[12px] text-fg-3">
              This will open your email client with your message pre-filled.
            </p>
          </form>
        )}
        </div>

        {/* Useful links */}
        <div className="mt-10 pt-6 bd-t-1 flex flex-wrap gap-4 text-[13px]">
          <Link href="/support"        className="text-accent hover:underline">FAQ &amp; Support</Link>
          <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>
          <Link href="/refund"         className="text-accent hover:underline">Refund Policy</Link>
          <Link href="/"               className="text-accent hover:underline">&#8592; Back to app</Link>
        </div>

      </div>
    </main>
  );
}
