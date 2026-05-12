import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ImagePDF.Tools privacy policy — your images never leave your browser. Learn exactly what we collect and what we never do.',
  alternates: { canonical: 'https://imagepdf.tools/privacy-policy' },
};

function ShieldCheck() {
  return (
    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3 pb-1 border-b-2 border-violet-400 dark:border-violet-500 inline-block">
      {children}
    </h2>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">Privacy Policy</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: April 2026</p>
        </div>

        {/* In short box */}
        <div className="border border-slate-200 dark:border-slate-600 rounded-xl p-5 mb-10 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">In short</span>
          </div>
          <ul className="space-y-2.5">
            {[
              'We never upload your images to any server. Compression is 100% in your browser.',
              'We never sell, share, or monetise your data. Not to advertisers, not to anyone.',
              'We collect only what is strictly needed: your email for login and subscription status.',
              'You can export or permanently delete your account and all data at any time.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <ShieldCheck />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">

          {/* What makes ImagePDF.Tools different */}
          <section>
            <SectionHeader>What makes ImagePDF.Tools different</SectionHeader>
            <p className="mt-3 mb-4">
              Most image tools upload your files to a server, process them remotely, and store them temporarily.
              ImagePDF.Tools takes the opposite approach:
            </p>
            <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700/60 border-b border-slate-200 dark:border-slate-600">
                    <th className="text-left py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400 w-32">Tool</th>
                    <th className="text-left py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">How it handles your images</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Other apps</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">Upload to server, process remotely, store temporarily</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">ImagePDF.Tools</td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">
                      Compression, cropping, and metadata editing all run in your browser tab. Your images never leave your device.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              This is intentional. We believe your images may be personal, confidential, or proprietary.
              No image tool should need to see them.
            </p>
          </section>

          {/* What we collect */}
          <section>
            <SectionHeader>What we collect</SectionHeader>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Account info</strong> — your name and email address (from Clerk sign-in). Used solely for authentication and account identification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Subscription status</strong> — whether you are on the Free or Pro plan. Stored in Clerk user metadata. No separate database.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Anonymous analytics</strong> — page views to understand which features are used, via Plausible Analytics. No personal identifiers, no cross-site tracking.</span>
              </li>
            </ul>
          </section>

          {/* Why we process */}
          <section>
            <SectionHeader>Why we process your data</SectionHeader>
            <p className="mt-3 mb-3">We only process your data for the following purposes:</p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Account info</strong> — to authenticate you, manage your session, and send essential account-related emails (payment receipts, plan changes).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Subscription status</strong> — to gate Pro features (unlimited files, ZIP export, ad-free). This data is shown back to you in your account page.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check />
                <span><strong className="text-slate-900 dark:text-slate-50">Analytics</strong> — to understand product usage patterns and improve the app. No personal data is used for this.</span>
              </li>
            </ul>
          </section>

          {/* What we do NOT do */}
          <section>
            <SectionHeader>What we do NOT do</SectionHeader>
            <ul className="mt-3 space-y-2.5">
              {[
                ['We never upload your images', 'to any server, cloud storage, or third-party service.'],
                ['We never sell, rent, or share', 'your data with third parties for any reason.'],
                ['We never use your data', 'to profile you, target ads, or build marketing segments.'],
                ['We never store passwords in plain text', 'Authentication is handled by Clerk with industry-standard hashing.'],
                ['We never use tracking cookies', 'advertising pixels, or third-party cookie services.'],
                ['We never train AI models', 'on your images or any data for any purpose.'],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-2.5">
                  <Cross />
                  <span><strong className="text-slate-900 dark:text-slate-50">{bold}</strong> {rest}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How data is protected */}
          <section>
            <SectionHeader>How your data is protected</SectionHeader>
            <p className="mt-3 mb-4">We use industry-standard security practices at every layer:</p>
            <div className="space-y-3">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  ),
                  title: 'No image server',
                  desc: 'Images are never transmitted — there is no server-side image storage to breach.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Authentication security',
                  desc: 'Login is handled by Clerk — OAuth and email/password with bcrypt hashing. Session tokens signed with expiry.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Payments via Stripe',
                  desc: 'Card data is handled entirely by Stripe (PCI DSS Level 1). We never see or store your card details.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  title: 'Edge CDN delivery',
                  desc: 'All pages served over HTTPS via Vercel\'s global edge network. Security headers on every response.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 border border-slate-200 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-800/40">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-950/30 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-50 text-sm">{title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Third party services */}
          <section>
            <SectionHeader>Third party services</SectionHeader>
            <p className="mt-3 mb-3">We use a minimal set of third-party services. None of them receive your images:</p>
            <ul className="space-y-2.5">
              {[
                ['Clerk (authentication)', 'receives your name and email for login. No other data is shared.'],
                ['Stripe (payments)', 'handles Pro subscription payments. We never see your card details.'],
                ['Plausible Analytics', 'anonymous page view analytics. No cookies, no personal identifiers.'],
                ['Google AdSense (free tier only)', 'may use cookies to serve relevant ads. Pro users see zero ads.'],
                ['Vercel (hosting)', 'hosts the web application. Standard server logs may be generated but contain no image data.'],
              ].map(([name, detail]) => (
                <li key={name} className="flex items-start gap-2.5">
                  <Check />
                  <span><strong className="text-slate-900 dark:text-slate-50">{name}</strong> — {detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Your rights */}
          <section>
            <SectionHeader>Your rights</SectionHeader>
            <p className="mt-3 mb-3">You have the following rights over your data:</p>
            <ul className="space-y-2.5">
              {[
                ['Right to access', 'all account data is visible to you in the app at all times.'],
                ['Right to correction', 'you can edit your name and email directly via your account settings.'],
                ['Right to erasure', 'email us at support@imagepdf.tools to permanently delete your account and all associated data. We action this within 30 days.'],
                ['Right to withdraw consent', 'you may stop using ImagePDF.Tools at any time and delete your account. We do not retain data after deletion.'],
              ].map(([right, detail]) => (
                <li key={right} className="flex items-start gap-2.5">
                  <Check />
                  <span><strong className="text-slate-900 dark:text-slate-50">{right}</strong> — {detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Children's data */}
          <section>
            <SectionHeader>Children&apos;s data</SectionHeader>
            <p className="mt-3">
              ImagePDF.Tools is not intended for use by individuals under the age of 13. We do not knowingly collect personal data from children. If we become aware that we have collected data from a minor without appropriate consent, we will delete it promptly.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <SectionHeader>Cookies</SectionHeader>
            <p className="mt-3">ImagePDF.Tools uses the following cookies:</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2.5">
                <Check />
                <span><code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">__clerk_*</code> — session cookies required for authentication. Essential; cannot be disabled if you are signed in.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check />
                <span><code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">googtrans</code> — stores your selected display language for Google Translate. No tracking data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Cross />
                <span>No advertising cookies, no third-party trackers, no analytics cookies are set by ImagePDF.Tools itself.</span>
              </li>
            </ul>
          </section>

          {/* Data breach notification */}
          <section>
            <SectionHeader>Data breach notification</SectionHeader>
            <p className="mt-3">
              In the unlikely event of a data breach affecting your personal data, we will notify you via email within 72 hours of becoming aware of the breach, as required by applicable law. We will describe the nature of the breach, the data affected, and the steps we are taking.
            </p>
          </section>

          {/* Changes */}
          <section>
            <SectionHeader>Changes to this policy</SectionHeader>
            <p className="mt-3">
              If we update this policy, we will post the changes on this page with an updated date. For significant changes, we will notify you via email. Our core promise — that we never upload, sell, or monetise your images — will never change.
            </p>
          </section>

          {/* Contact */}
          <section>
            <SectionHeader>Contact us</SectionHeader>
            <p className="mt-3">
              If you have questions or concerns about your data, reach out at{' '}
              <a href="mailto:support@imagepdf.tools" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
                support@imagepdf.tools
              </a>
              . We will respond to your enquiries within 2 weeks.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Link href="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">&#8592; Back to compressor</Link>
        </div>

      </div>
    </main>
  );
}
