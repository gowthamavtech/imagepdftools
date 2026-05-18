import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your ImagePDF.Tools account and subscription.',
};

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const plan = (user.publicMetadata as { plan?: string })?.plan ?? 'free';
  const isPro = plan === 'pro';

  return (
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="max-w-[480px] mx-auto px-8">
        <h1 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Account</h1>

        <div className="bg-surface bd-2 rounded-[14px] p-6 mb-4">
          <h2 className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-4">
            Current Plan
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[20px] font-semibold text-fg-1">
                {isPro ? 'Pro' : 'Free'}
              </p>
              <p className="text-[13px] text-fg-2 mt-0.5">
                {isPro
                  ? 'Unlimited files, ZIP export, ad-free.'
                  : 'Up to 5 files per session, ads shown.'}
              </p>
            </div>
            {isPro && (
              <span className="bg-accent-dim bd-accent text-accent text-[11px] font-semibold px-3 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>

        <div className="bg-surface bd-2 rounded-[14px] p-6 mb-4">
          <h2 className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-4">
            Profile
          </h2>
          <p className="text-[13.5px] text-fg-1">
            {user.emailAddresses?.[0]?.emailAddress ?? 'No email on file'}
          </p>
        </div>

        {isPro ? (
          <div className="bg-surface bd-2 rounded-[14px] p-6">
            <h2 className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-4">
              Billing
            </h2>
            <p className="text-[13.5px] text-fg-2 mb-4 leading-[1.65]">
              Manage your subscription, update payment method, or cancel at any time via the
              Stripe billing portal.
            </p>
            <form action="/api/portal" method="POST">
              <button
                type="submit"
                className="text-[13.5px] font-medium px-5 py-2.5 rounded-[10px] transition-colors bg-surface bd-2 text-fg-1 hover:text-accent hover:bd-accent"
              >
                Open Billing Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-accent-dim bd-accent rounded-[14px] p-6">
            <h2 className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent mb-2">
              Upgrade to Pro
            </h2>
            <p className="text-[13.5px] text-fg-2 mb-4 leading-[1.65]">
              Unlock unlimited files, batch ZIP export, format conversion, and an ad-free
              experience.
            </p>
            <a
              href="/pricing"
              className="inline-block text-[13.5px] font-medium px-5 py-2.5 rounded-[10px] transition-colors text-accent bd-accent hover:bg-surface"
            >
              View Pricing
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
