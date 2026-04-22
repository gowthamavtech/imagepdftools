"use client";

import { useAuth } from "@clerk/nextjs";

export function usePlan() {
    const { isSignedIn, sessionClaims } = useAuth();
    const plan = (sessionClaims?.publicMetadata as { plan?: string } | undefined)?.plan ?? "free";
    return { isSignedIn: isSignedIn ?? false, plan, isPro: plan === "pro" };
}
