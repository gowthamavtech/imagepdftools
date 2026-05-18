import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with ImagePDF.Tools — contact us, find answers to common questions, or report a bug.',
  alternates: { canonical: 'https://imagepdf.tools/support' },
};

const FAQS = [
  {
    q: 'Do my images get uploaded to your servers?',
    a: 'No. Every tool on ImagePDF.Tools — compression, cropping, and metadata editing — runs entirely inside your browser tab. Your images never leave your device.',
  },
  {
    q: 'Which file formats are supported?',
    a: 'Compression: JPEG, PNG, WebP, and SVG. Cropping: JPEG and PNG (output as PNG). Metadata Editor: JPEG and PNG.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'Free accounts: up to 25 MB per file, up to 5 files per session. Pro accounts: up to 100 MB per file, unlimited files.',
  },
  {
    q: 'How do I cancel my Pro subscription?',
    a: 'Go to Account → Manage Subscription (Stripe Customer Portal). You can cancel at any time. Your Pro access continues until the end of the current billing period.',
  },
  {
    q: 'I cancelled but I am still being charged.',
    a: 'Please email support@imagepdf.tools with your registered email address and order details and we will investigate immediately.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Pro Annual: full refund within 7 days of purchase, no questions asked. Pro Monthly: no refunds for partial months, but you keep access until the end of your cycle. See our Terms of Service for full details.',
  },
  {
    q: 'The tool is not working — what should I do?',
    a: 'Try a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac). If the issue persists, email us with your browser version and a description of what happened.',
  },
];

export default function SupportPage() {
  return (
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="max-w-[780px] mx-auto px-8">

        <div className="mb-10">
          <span data-animate="hero" className="hp-eyebrow">Help</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-2" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Support</h1>
          <p data-animate="hero" className="text-[13.5px] text-fg-2 m-0">We aim to respond to all enquiries within 24 hours.</p>
        </div>

        {/* Contact card */}
        <div data-animate="scroll" className="rounded-[10px] bg-accent-dim bd-accent p-6 mb-10">
          <h2 className="serif italic text-fg-1 m-0 mb-1" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Email support</h2>
          <p className="text-[13.5px] text-fg-2 mb-4">
            For billing questions, bug reports, refund requests, or anything else — reach us at:
          </p>
          <a
            href="mailto:support@imagepdf.tools"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium text-accent hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@imagepdf.tools
          </a>
        </div>

        {/* FAQs */}
        <span data-animate="scroll" className="hp-eyebrow">FAQ</span>
        <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Frequently asked questions
        </h2>
        <div data-animate-stagger className="bd-t-1">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="hp-faq bd-b-1">
              <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
            </details>
          ))}
        </div>

        {/* Useful links */}
        <div className="mt-10 pt-6 bd-t-1 flex flex-wrap gap-4 text-[13px]">
          <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
          <Link href="/whats-new" className="text-accent hover:underline">What&apos;s New</Link>
          <Link href="/" className="text-accent hover:underline">&#8592; Back to app</Link>
        </div>

      </div>
    </main>
  );
}
