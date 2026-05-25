import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'ImagePDF.Tools refund and cancellation policy — 7-day money-back guarantee on annual plans, no partial-month refunds on monthly.',
  alternates: { canonical: 'https://imagepdf.tools/refund' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-animate="scroll" className="mb-8">
      <h2 className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h2>
      <div className="text-[13.5px] text-fg-2 leading-[1.75] space-y-3">
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
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="max-w-[780px] mx-auto px-4 sm:px-8">

        <div className="mb-10">
          <span data-animate="hero" className="hp-eyebrow">Legal</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-2" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Refund &amp; Cancellation Policy
          </h1>
          <p data-animate="hero" className="text-[13px] text-fg-3 m-0">Last updated: April 2026</p>
        </div>

        <div className="bd-t-1 pt-8">

          <Section title="Overview">
            <p>
              ImagePDF.Tools offers a Free tier that never expires. Pro upgrades are available in four
              flexible billing periods: 1 day ($0.49), 1 week ($1), 1 month ($3/month), or 1 year
              ($20/year). This policy explains how refunds and cancellations work for each plan type.
            </p>
          </Section>

          {/* Plans table */}
          <section data-animate="scroll" className="mb-8">
            <h2 className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Our plans</h2>
            <div className="rounded-[10px] overflow-x-auto overflow-hidden bd-2 text-[13.5px]">
              <table style={{ minWidth: '460px' }} className="w-full">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 font-medium text-fg-2">Plan</th>
                    <th className="text-left px-4 py-3 font-medium text-fg-2">Price</th>
                    <th className="text-left px-4 py-3 font-medium text-fg-2">Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Free', '$0', 'N/A'],
                    ['Pro — 1 Day', '$0.49 one-time', 'Non-refundable'],
                    ['Pro — 1 Week', '$1 one-time', 'Non-refundable'],
                    ['Pro — Monthly', '$3/month', 'No partial-month refunds'],
                    ['Pro — Annual', '$20/year', 'Full refund within 7 days'],
                  ].map(([plan, price, refund]) => (
                    <tr key={plan}>
                      <td className="px-4 py-3 text-fg-1 font-medium bd-t-1">{plan}</td>
                      <td className="px-4 py-3 text-fg-2 bd-t-1">{price}</td>
                      <td className="px-4 py-3 text-fg-2 bd-t-1">{refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Section title="Pro Monthly refund policy">
            <Ul items={[
              'Monthly subscriptions can be cancelled at any time from the Account page in the app.',
              'Once cancelled, you retain Pro access until the end of your current billing cycle. No further charges will be made.',
              'We do not provide refunds for partial months. For example, if you cancel on day 5 of a 30-day cycle, you still have Pro access for the remaining 25 days.',
              'If you experience a billing issue (double charge, failed cancellation), contact us and we will resolve it promptly.',
            ]} />
          </Section>

          <Section title="Pro Annual refund policy">
            <Ul items={[
              <span key="7day">Annual purchases are eligible for a <strong className="text-fg-1">full refund within 7 days</strong> of purchase, no questions asked.</span>,
              'After 7 days, annual purchases are non-refundable as you retain Pro access for the remainder of the subscription year.',
              'Upon refund, your account reverts to the Free tier immediately.',
            ]} />
          </Section>

          <Section title="Cancellation policy">
            <p>
              You can cancel your Pro subscription at any time from the Account page. There are no
              cancellation fees or penalties.
            </p>
            <p className="font-medium text-fg-1">
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

          <Section title="Account deletion">
            <p>
              You can permanently delete your account from Account → Settings. Deletion is immediate
              and irreversible. Because ImagePDF.Tools processes images entirely in your browser, no image
              data is stored on our end. Deleting your account removes your email, billing records,
              and plan status. If you have an active Pro subscription, please cancel it first to avoid
              being charged after deletion.
            </p>
          </Section>

          <Section title="How to request a refund">
            <div className="bg-surface bd-2 rounded-[10px] px-5 py-4 space-y-3">
              <p>
                Email{' '}
                <a href="mailto:support@imagepdf.tools" className="text-accent hover:underline">
                  support@imagepdf.tools
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
                <strong className="text-fg-1">5–7 business days</strong>{' '}
                to the original payment method.
              </p>
            </div>
          </Section>

          <Section title="Questions?">
            <p>
              For any billing questions, refund requests, or cancellation help, reach out at{' '}
              <a href="mailto:support@imagepdf.tools" className="text-accent hover:underline">
                support@imagepdf.tools
              </a>. Also see our{' '}
              <Link href="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-accent hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </Section>

        </div>

        <div className="mt-10 pt-6 bd-t-1">
          <Link href="/" className="text-[13px] text-accent hover:underline">&#8592; Back to home</Link>
        </div>

      </div>
    </main>
  );
}
