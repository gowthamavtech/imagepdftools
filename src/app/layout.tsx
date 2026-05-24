import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeedbackButton } from "@/components/FeedbackModal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OfflineBanner } from "@/components/OfflineBanner";
import GlobalAnimations from "@/components/GlobalAnimations";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif-display", weight: ["400"], style: ["normal", "italic"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
    title: {
        default: "ImagePDF.Tools — Free Image & PDF Tools Online",
        template: "%s | ImagePDF.Tools",
    },
    description: "Compress, convert, crop, and edit images and PDFs entirely in your browser. 30+ free tools. No uploads, no account, 100% private.",
    openGraph: {
        type: "website",
        url: "https://imagepdf.tools",
        images: ["/og-image.png"],
    },
    twitter: { card: "summary_large_image" },
    icons: {
        icon: [
            { url: '/favicon.ico',              sizes: '16x16 32x32 48x48' },
            { url: '/icons/favicon-16x16.png',  sizes: '16x16', type: 'image/png' },
            { url: '/icons/favicon-32x32.png',  sizes: '32x32', type: 'image/png' },
            { url: '/icons/favicon-48x48.png',  sizes: '48x48', type: 'image/png' },
            { url: '/icons/logo.svg',           type: 'image/svg+xml' },
        ],
        apple: [{ url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }],
        shortcut: '/favicon.ico',
    },
    manifest: '/manifest.json',
    robots: { index: true, follow: true },
    alternates: { canonical: "https://imagepdf.tools" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;
    // Default to dark. Cookie is set by ThemeProvider after first visit.
    const isDark = themeCookie !== 'light';
    const htmlClass = `${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased${isDark ? ' dark' : ''}`;

    return (
        <ClerkProvider>
            <html lang="en" className={htmlClass} suppressHydrationWarning>
                <head>
                    {/* Fallback for first visit or stale cookie: correct class via localStorage.
                        Cookie covers subsequent visits; this covers the very first load. */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(){try{var t=localStorage.getItem('theme');var preferLight=window.matchMedia('(prefers-color-scheme:light)').matches;var wantDark=t==='dark'||(t!=='light'&&!preferLight);if(wantDark){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
                        }}
                    />

                </head>
                <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--text-1)" }}>
                    <ThemeProvider>
                        <GlobalAnimations />
                        <SiteHeader />

                        <div className="flex flex-1">
                            <div className="flex-1 min-w-0 flex flex-col">{children}</div>
                        </div>

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
