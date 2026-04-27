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
    <main className="flex-1 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Account</h1>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Current Plan
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {isPro ? 'Pro' : 'Free'}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                {isPro
                  ? 'Unlimited files, ZIP export, ad-free.'
                  : 'Up to 5 files per session, ads shown.'}
              </p>
            </div>
            {isPro && (
              <span className="bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Profile
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {user.emailAddresses?.[0]?.emailAddress ?? 'No email on file'}
          </p>
        </div>

        {isPro ? (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
              Billing
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Manage your subscription, update payment method, or cancel at any time via the
              Stripe billing portal.
            </p>
            <form action="/api/portal" method="POST">
              <button
                type="submit"
                className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Open Billing Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wide mb-2">
              Upgrade to Pro
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Unlock unlimited files, batch ZIP export, format conversion, and an ad-free
              experience for $4.99/month.
            </p>
            <a
              href="/pricing"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              View Pricing
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
