import { auth } from '@clerk/nextjs/server';
import { getStripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    client_reference_id: userId,
    customer_email: sessionClaims?.email as string | undefined,
    subscription_data: {
      metadata: { clerkUserId: userId },
    },
  });

  return NextResponse.json({ url: session.url });
}
