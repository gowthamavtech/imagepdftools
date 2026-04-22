import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const customerId = (user.privateMetadata as { stripeCustomerId?: string })?.stripeCustomerId;

    if (!customerId) {
        return NextResponse.json({ error: "No billing account found" }, { status: 400 });
    }

    const session = await getStripe().billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_URL}/account`,
    });

    return NextResponse.json({ url: session.url });
}
