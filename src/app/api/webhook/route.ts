import { clerkClient } from '@clerk/nextjs/server';
import { getStripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const client = await clerkClient();

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata.clerkUserId;
    if (userId) {
      const plan = sub.status === 'active' ? 'pro' : 'free';
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { plan },
        privateMetadata: { stripeCustomerId: sub.customer as string },
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata.clerkUserId;
    if (userId) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { plan: 'free' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
