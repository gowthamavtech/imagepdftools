import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'SquishIt refund and cancellation policy — 7-day money-back guarantee on annual plans, no partial-month refunds on monthly.',
  alternates: { canonical: 'https://squishit.app/refund' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-2">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function RefundPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">Last updated: April 2026</p>
        </div>

        {/* Overview */}
        <Section title="Overview">
          <p>
            SquishIt offers a Free tier that never expires. Pro upgrades are available in four
            flexible billing periods: 1 day ($0.49), 1 week ($1), 1 month ($3/month), or 1 year
            ($20/year). This policy explains how refunds and cancellations work for each plan type.
          </p>
        </Section>

        {/* Plans table */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">Our plans</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Plan</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Refund</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Free</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$0</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">N/A</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Pro — 1 Day</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$0.49 one-time</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">Non-refundable</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Pro — 1 Week</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$1 one-time</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">Non-refundable</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Pro — Monthly</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$3/month</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">No partial-month refunds</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900/40">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Pro — Annual</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$20/year</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">Full refund within 7 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pro Monthly */}
        <Section title="Pro Monthly refund policy">
          <Ul items={[
            'Monthly subscriptions can be cancelled at any time from the Account page in the app.',
            'Once cancelled, you retain Pro access until the end of your current billing cycle. No further charges will be made.',
            'We do not provide refunds for partial months. For example, if you cancel on day 5 of a 30-day cycle, you still have Pro access for the remaining 25 days.',
            'If you experience a billing issue (double charge, failed cancellation), contact us and we will resolve it promptly.',
          ]} />
        </Section>

        {/* Pro Annual */}
        <Section title="Pro Annual refund policy">
          <Ul items={[
            <span key="7day">Annual purchases are eligible for a <strong className="text-gray-700 dark:text-gray-300">full refund within 7 days</strong> of purchase, no questions asked.</span>,
            'After 7 days, annual purchases are non-refundable as you retain Pro access for the remainder of the subscription year.',
            'Upon refund, your account reverts to the Free tier immediately.',
          ]} />
        </Section>

        {/* Cancellation */}
        <Section title="Cancellation policy">
          <p>
            You can cancel your Pro subscription at any time from the Account page. There are no
            cancellation fees or penalties.
          </p>
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            What happens when you cancel or downgrade:
          </p>
          <Ul items={[
            'Your Pro features remain active until the end of your current billing period.',
            'After expiry, your account reverts to the Free tier.',
            'Your files are never stored on our servers — there is nothing to lose. The Free tier simply re-applies the 5-file session limit.',
            'If you have compressed files saved locally, they remain yours permanently.',
            'You can re-subscribe to Pro at any time to restore full access.',
          ]} />
        </Section>

        {/* Account deletion */}
        <Section title="Account deletion">
          <p>
            You can permanently delete your account from Account → Settings. Deletion is immediate
            and irreversible. Because SquishIt processes images entirely in your browser, no image
            data is stored on our end. Deleting your account removes your email, billing records,
            and plan status. If you have an active Pro subscription, please cancel it first to avoid
            being charged after deletion.
          </p>
        </Section>

        {/* How to request */}
        <Section title="How to request a refund">
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 space-y-3">
            <p>
              Email{' '}
              <a href="mailto:support@squishit.app" className="text-violet-600 dark:text-violet-400 hover:underline">
                support@squishit.app
              </a>{' '}
              with the following details:
            </p>
            <Ul items={[
              'Your registered email address',
              'Order ID or transaction reference',
              'Reason for refund (optional)',
            ]} />
            <p>
              Refunds are processed within{' '}
              <strong className="text-gray-700 dark:text-gray-300">5–7 business days</strong>{' '}
              to the original payment method.
            </p>
          </div>
        </Section>

        {/* Questions */}
        <Section title="Questions?">
          <p>
            For any billing questions, refund requests, or cancellation help, reach out at{' '}
            <a href="mailto:support@squishit.app" className="text-violet-600 dark:text-violet-400 hover:underline">
              support@squishit.app
            </a>. Also see our{' '}
            <Link href="/terms" className="text-violet-600 dark:text-violet-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-violet-600 dark:text-violet-400 hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </Section>

      </div>
    </main>
  );
}
