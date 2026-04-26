import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the ImagePDF.Tools Terms of Service — the rules governing use of our browser-based image compression tool.',
  alternates: { canonical: 'https://imagepdf.tools/terms' },
};

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
        {num}. {title}
      </h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-gray-700 dark:text-gray-300">{children}</p>;
}

export default function TermsPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">Terms of Service</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">Last updated: April 2026</p>
        </div>

        {/* Sections */}
        <Section num={1} title="Acceptance of Terms">
          <p>
            By using ImagePDF.Tools ("the Service"), you agree to these Terms of Service. If you do not
            agree, please do not use the Service. ImagePDF.Tools is operated by its creator ("we", "us")
            and is currently in active development.
          </p>
        </Section>

        <Section num={2} title="What the Service Does">
          <p>
            ImagePDF.Tools is a suite of browser-based image tools — including image compression, cropping,
            and EXIF metadata viewing and editing. All processing runs entirely within your browser tab.
            No image data is ever transmitted to or stored on our servers. ImagePDF.Tools is a utility tool
            and any output is provided for informational and practical purposes only.
          </p>
        </Section>

        <Section num={3} title="Your Account">
          <p>If you create an account you agree to the following:</p>
          <Ul items={[
            'You must provide accurate information when creating an account.',
            'You are responsible for keeping your login credentials secure.',
            'One account per person. Accounts are non-transferable.',
            'We may suspend or terminate accounts that violate these terms or are used for fraudulent purposes.',
          ]} />
        </Section>

        <Section num={4} title="Your Data">
          <p>
            You retain full ownership of all images you process through ImagePDF.Tools. Because compression
            runs entirely in your browser, we never receive, store, or have access to your image
            files. You can delete your account at any time from the account settings page.
          </p>
          <p>
            See our{' '}
            <Link href="/privacy-policy" className="text-violet-600 dark:text-violet-400 hover:underline">
              Privacy Policy
            </Link>{' '}
            for full details on what data we do collect (e.g. account email, billing records) and
            how it is handled.
          </p>
        </Section>

        <Section num={5} title="Acceptable Use">
          <p>You agree not to:</p>
          <Ul items={[
            'Use the Service for any illegal activity.',
            'Attempt to access other users\' accounts or data.',
            'Reverse-engineer, scrape, or abuse the Service or its APIs.',
            'Use automated bots or scripts to interact with the Service in a way that degrades performance for others.',
            'Resell or sublicense access to the Service without our written consent.',
          ]} />
        </Section>

        <Section num={6} title="Disclaimer of Warranties">
          <p>
            ImagePDF.Tools is provided "as is" and "as available" without warranties of any kind, whether
            express or implied. We do not guarantee that the Service will be uninterrupted,
            error-free, or that output file sizes will meet any particular target. Use the Service at
            your own risk and always keep backups of your original images.
          </p>
        </Section>

        <Section num={7} title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, ImagePDF.Tools and its operators shall not be liable
            for any indirect, incidental, or consequential damages arising from your use of the
            Service. Our total liability shall not exceed the amount you paid for the Service in the
            12 months preceding the claim.
          </p>
        </Section>

        <Section num={8} title="Plans and Pricing">
          <p>ImagePDF.Tools offers a Free tier and a Pro tier:</p>
          <Ul items={[
            <><strong className="text-gray-700 dark:text-gray-300">Free:</strong> Up to 5 files per session, up to 25 MB each. No payment required.</>,
            <><strong className="text-gray-700 dark:text-gray-300">Pro Monthly:</strong> $4.99 / month. Unlimited files, up to 100 MB each, ZIP export, format conversion, ad-free. Billed monthly via Stripe.</>,
            <><strong className="text-gray-700 dark:text-gray-300">Pro Annual:</strong> $39 / year (~35% savings). Same Pro features, billed annually.</>,
          ]} />
          <p>
            Prices include applicable taxes where required. We reserve the right to change pricing
            with 30 days' notice. Existing subscribers will not be affected by price increases
            during their current billing period.
          </p>
        </Section>

        <Section num={9} title="Refund Policy">
          <SubHeading>Pro Monthly:</SubHeading>
          <p>
            Monthly subscriptions can be cancelled at any time. Once cancelled, you retain Pro access
            until the end of your current billing cycle. We do not provide refunds for partial months.
            If you cancel on day 5 of a 30-day cycle, you still have Pro access for the remaining 25 days.
          </p>

          <SubHeading>Pro Annual:</SubHeading>
          <p>
            Annual purchases are eligible for a full refund within 7 days of purchase if you are
            unsatisfied, no questions asked. After 7 days, annual purchases are non-refundable as
            you retain access for the remainder of the subscription year.
          </p>

          <SubHeading>Free tier:</SubHeading>
          <p>The Free tier requires no payment, so no refund applies.</p>

          <SubHeading>How to request a refund:</SubHeading>
          <p>
            Email{' '}
            <a href="mailto:support@imagepdf.tools" className="text-violet-600 dark:text-violet-400 hover:underline">
              support@imagepdf.tools
            </a>{' '}
            with your registered email address and order details. Refunds are processed within 5–7
            business days to the original payment method.
          </p>
        </Section>

        <Section num={10} title="Cancellation Policy">
          <p>You can cancel your Pro subscription at any time from the Account page in the app.</p>

          <SubHeading>What happens when you cancel:</SubHeading>
          <Ul items={[
            'Your Pro features remain active until the end of your current billing period.',
            'After expiry, your account reverts to the Free tier. You can still access the app — file limits simply apply again.',
            'No data is deleted when you downgrade.',
            'You can re-subscribe to Pro at any time to restore full access.',
          ]} />

          <SubHeading>Account deletion:</SubHeading>
          <p>
            You can permanently delete your account from Account → Settings. This immediately
            cancels any active subscription and removes your account data. Image files are never
            stored on our servers, so there is nothing to purge from our side.
          </p>
        </Section>

        <Section num={11} title="Changes to These Terms">
          <p>
            We may update these terms from time to time. Changes will be posted on this page with an
            updated date. Continued use of ImagePDF.Tools after changes constitutes acceptance of the
            updated terms. We will notify subscribed users of material changes via email.
          </p>
        </Section>

        <Section num={12} title="Governing Law">
          <p>
            These terms are governed by the laws of the jurisdiction in which the operator resides.
            Any disputes shall be subject to the exclusive jurisdiction of the courts in that
            jurisdiction.
          </p>
        </Section>

        <Section num={13} title="Contact">
          <p>
            For any questions about these terms, refunds, or cancellations, email{' '}
            <a href="mailto:support@imagepdf.tools" className="text-violet-600 dark:text-violet-400 hover:underline">
              support@imagepdf.tools
            </a>
            .
          </p>
        </Section>

      </div>
    </main>
  );
}
