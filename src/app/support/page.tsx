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
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Support</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We aim to respond to all enquiries within 24 hours.
          </p>
        </div>

        {/* Contact card */}
        <div className="border border-violet-200 dark:border-violet-800 rounded-2xl p-6 mb-10 bg-violet-50/50 dark:bg-violet-950/20">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Email support</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            For billing questions, bug reports, refund requests, or anything else — reach us at:
          </p>
          <a
            href="mailto:support@imagepdf.tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@imagepdf.tools
          </a>
        </div>

        {/* FAQs */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900/40">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">{q}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        {/* Useful links */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-violet-600 dark:text-violet-400 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-violet-600 dark:text-violet-400 hover:underline">Terms of Service</Link>
          <Link href="/whats-new" className="text-violet-600 dark:text-violet-400 hover:underline">What&apos;s New</Link>
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">← Back to app</Link>
        </div>

      </div>
    </main>
  );
}
