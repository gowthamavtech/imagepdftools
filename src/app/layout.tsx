import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeedbackButton } from "@/components/FeedbackModal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdBanner } from "@/components/AdBanner";
import { OfflineBanner } from "@/components/OfflineBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
    title: {
        default: "ImagePDF.Tools — Free Image Compressor Online",
        template: "%s | ImagePDF.Tools",
    },
    description: "Compress JPEG, PNG, and WebP images in your browser. No uploads, no limits. Free online image compressor.",
    openGraph: {
        type: "website",
        url: "https://imagepdf.tools",
        images: ["/og-image.png"],
    },
    twitter: { card: "summary_large_image" },
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "https://imagepdf.tools" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
                <head>
                    {/* Apply theme before React hydrates to prevent flash */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
                        }}
                    />

                    {process.env.NEXT_PUBLIC_ADSENSE_ID && <meta name="google-adsense-account" content={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`} />}
                </head>
                <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--text-1)" }}>
                    <ThemeProvider>
                        <SiteHeader />

                        {/* Top banner ad — full-width strip below header */}
                        <AdBanner variant="banner" />

                        {/* Page content + skyscrapers: left (>1440px), right (≥1024px) */}
                        <div className="flex flex-1">
                            <AdBanner variant="skyscraper" side="left" />
                            <div className="flex-1 min-w-0 flex flex-col">{children}</div>
                            <AdBanner variant="skyscraper" side="right" />
                        </div>

                        {/* Bottom leaderboard — full-width strip above footer */}
                        <AdBanner variant="leaderboard" />

                        <SiteFooter />
                        <FeedbackButton />
                        <OfflineBanner />
                    </ThemeProvider>

                    {/* Google Translate mount point — must NOT be display:none or GT won't init */}
                    <div id="gt-hidden" style={{ position: "absolute", top: "-9999px", left: "-9999px", height: 0, overflow: "hidden" }} />

                    {/* Google Translate script — loaded after page content */}
                    <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
                    {/* Init function for cookie-based language switching */}
                    <Script
                        id="gt-init"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:'en',autoDisplay:false},'gt-hidden');}`,
                        }}
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}
