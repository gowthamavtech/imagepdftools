import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FeedbackButton } from '@/components/FeedbackModal';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AdBanner } from '@/components/AdBanner';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: 'SquishIt — Free Image Compressor Online',
    template: '%s | SquishIt',
  },
  description:
    'Compress JPEG, PNG, and WebP images in your browser. No uploads, no limits. Free online image compressor.',
  keywords: [
    'image compressor',
    'compress image online',
    'reduce image size',
    'png compressor',
    'jpeg compressor',
  ],
  openGraph: {
    type: 'website',
    url: 'https://squishit.app',
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://squishit.app' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
        <head>
          {/* Apply theme before React hydrates to prevent flash */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||((!t||t==='system')&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col bg-violet-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <ThemeProvider>
            <SiteHeader />

            {/* Top banner ad — full-width strip below header */}
            <AdBanner variant="banner" />

            {/* Page content + skyscrapers: left (>1440px), right (≥1024px) */}
            <div className="flex flex-1">
              <AdBanner variant="skyscraper" side="left" />
              <div className="flex-1 min-w-0 flex flex-col">
                {children}
              </div>
              <AdBanner variant="skyscraper" side="right" />
            </div>

            {/* Bottom leaderboard — full-width strip above footer */}
            <AdBanner variant="leaderboard" />

            <SiteFooter />
            <FeedbackButton />
          </ThemeProvider>
          {/* Google Translate mount point — must NOT be display:none or GT won't init */}
          <div id="gt-hidden" style={{ position: 'absolute', top: '-9999px', left: '-9999px', height: 0, overflow: 'hidden' }} />
          {process.env.NEXT_PUBLIC_ADSENSE_ID && (
            <Script
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
              strategy="lazyOnload"
              crossOrigin="anonymous"
            />
          )}
          {/* Google Translate script — loaded after page content */}
          <Script
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="lazyOnload"
          />
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
