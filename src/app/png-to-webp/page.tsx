import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PNG to WebP Converter — Free Online',
  description: 'Convert PNG images to WebP format instantly in your browser. Preserve transparency, reduce file size by up to 50% — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/png-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — PNG to WebP Converter',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to WebP format with transparency support. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the converter below.' },
        { '@type': 'HowToStep', text: 'Adjust quality if needed — higher quality preserves transparency and fine detail.' },
        { '@type': 'HowToStep', text: 'Download your converted WebP file.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Does WebP support transparency like PNG?',
    a: 'Yes. WebP supports full alpha-channel transparency, just like PNG. Converting a PNG with a transparent background to WebP preserves the transparency completely — with a significantly smaller file size.',
  },
  {
    q: 'How much smaller is WebP compared to PNG?',
    a: 'WebP (lossy) is typically 50–75% smaller than PNG for the same image. Even WebP lossless is around 26% smaller than PNG. This makes PNG-to-WebP one of the most impactful file size reductions available for web images.',
  },
  {
    q: 'Should I use lossy or lossless WebP for my PNG?',
    a: 'For photos or images where minor quality loss is acceptable, lossy WebP at quality 80 gives the best size reduction. For logos, icons, or images with sharp edges where quality must be pixel-perfect, use a higher quality setting (90+) to minimise compression artefacts on edges.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. Everything runs locally in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple PNGs to WebP at once?',
    a: 'Yes. Drop up to 5 PNG files at once on the Free tier, or unlimited with Pro.',
  },
];

export default function PngToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            PNG to WebP{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Shrink your PNG files by up to 50% by converting to WebP — with full transparency support. All processing stays in your browser.
          </p>
        </div>

        <CompressorUI initialFormat="image/webp" />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert PNG to WebP?</h2>
              <p className="mb-3">
                PNG uses lossless compression — every pixel is preserved exactly. That makes it ideal for logos, icons, and screenshots, but it produces large files. A typical logo PNG might be 200–500 KB. The same image as a WebP at quality 85 is often 50–120 KB — a reduction of 50–75% with virtually no visible difference at screen resolution.
              </p>
              <p>
                Critically, WebP supports full alpha-channel transparency, so transparent PNGs convert without any loss of the transparent background. For web use, WebP is strictly better than PNG in almost every case — smaller file, same transparency support, and comparable quality.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases for PNG to WebP</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website logos and icons.</strong> PNG logos with transparent backgrounds are a perfect WebP conversion target. The transparency is preserved and the file size drops dramatically — improving Lighthouse scores.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">UI screenshots and product images.</strong> Screenshots taken as PNG (often large because of the lossless format) compress well to WebP without the blocky JPEG artefacts you would get from converting to JPEG.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Game and app assets.</strong> Mobile and web apps with sprite sheets or UI assets as PNG can reduce asset bundle size significantly by converting to WebP — directly improving load times on slower mobile connections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Shopify and e-commerce product images.</strong> Product images with removed backgrounds (PNG with transparency) are widely used in e-commerce. Converting to WebP reduces page weight and speeds up product pages.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WordPress media library.</strong> WordPress 5.8+ supports WebP uploads. Replacing large PNG assets in your media library with WebP equivalents can shave megabytes off page weight across your entire site.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">PNG vs WebP — format comparison</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">PNG</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossless only', 'Lossy + lossless'],
                      ['Transparency', '✓ Supported', '✓ Supported'],
                      ['File size', 'Large (lossless)', '50–75% smaller than PNG'],
                      ['Quality loss', 'None (lossless)', 'Minimal at quality 80+'],
                      ['Browser support', 'Universal', '97%+ coverage'],
                    ].map(([f, png, webp]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{f}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{png}</td>
                        <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-medium">{webp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the conversion works</h2>
              <p>
                Your PNG is decoded by the browser and drawn to an HTML Canvas element. The canvas is then exported using the browser&apos;s built-in WebP encoder. The alpha channel (transparency) is preserved throughout this process. All processing happens locally — your file never leaves your browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {FAQS.map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/convert-image-to-webp', '/jpg-to-webp', '/jpg-to-png', '/compress-png-online']} />
      </main>
    </>
  );
}
