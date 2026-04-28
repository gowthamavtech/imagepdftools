import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'JPG to WebP Converter — Free Online',
  description: 'Convert JPEG images to WebP format instantly in your browser. No upload, no server — up to 35% smaller files with the same visual quality.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — JPG to WebP Converter',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG images to WebP format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG file onto the converter below.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider if needed (default 80 is a great starting point).' },
        { '@type': 'HowToStep', text: 'Download your converted WebP file instantly.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Why convert JPG to WebP?',
    a: 'WebP produces files that are 25–35% smaller than JPEG at the same visual quality. For websites, this means faster page load times and better Core Web Vitals scores. Google recommends WebP as the preferred format for web images.',
  },
  {
    q: 'Does WebP look better than JPEG at the same file size?',
    a: 'Yes. WebP uses a more efficient compression algorithm than JPEG. A WebP file at quality 80 typically looks as good as a JPEG at quality 90 — while being significantly smaller.',
  },
  {
    q: 'Will WebP work on all browsers?',
    a: 'WebP is supported by Chrome, Firefox, Safari (since 14), Edge, and Opera — covering over 97% of global browser usage as of 2024. For the small percentage of users on unsupported browsers, you can serve a JPEG fallback using the HTML <picture> element.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple JPEG files to WebP at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.',
  },
];

export default function JpgToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            JPG to WebP{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Convert JPEG images to modern WebP format — up to 35% smaller at the same visual quality. All processing happens in your browser, nothing is uploaded.
          </p>
        </div>

        <CompressorUI initialFormat="image/webp" />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert JPEG to WebP?</h2>
              <p className="mb-3">
                JPEG has been the standard photo format since the 1990s — and it is still excellent. But WebP, developed by Google and released in 2010, offers meaningfully better compression. A JPEG image converted to WebP at equivalent quality settings will typically be 25–35% smaller. For websites serving thousands of images per day, that reduction adds up to dramatically lower bandwidth costs and faster page loads.
              </p>
              <p>
                Google&apos;s PageSpeed Insights and Lighthouse tools flag JPEG images as a performance opportunity and specifically recommend serving them in next-generation formats like WebP. Converting your JPEG images to WebP is one of the most direct ways to improve your Core Web Vitals score — particularly Largest Contentful Paint (LCP), which measures how quickly the main image on a page loads.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Who should convert JPEG to WebP?</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website owners and developers.</strong> Every JPEG hero image, product photo, or blog image on your site is a WebP conversion opportunity. Smaller images mean faster sites and lower hosting bandwidth.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">E-commerce stores.</strong> Shopify and WooCommerce both support WebP. Product pages with many images benefit enormously — faster load times reduce bounce rates and improve conversion.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WordPress users.</strong> WordPress has supported WebP uploads since version 5.8. Converting your existing JPEG media library to WebP and re-uploading can noticeably improve site speed scores.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">SEO professionals.</strong> Page speed is a confirmed Google ranking factor. Images are almost always the largest assets on a page — converting to WebP is a fast way to improve speed metrics without redesigning the site.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">App developers.</strong> Mobile apps benefit from smaller image assets — they reduce app size, lower mobile data usage, and make image-heavy screens render faster.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">JPEG vs WebP — a quick comparison</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">JPEG</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossy only', 'Lossy + lossless'],
                      ['File size (same quality)', 'Baseline', '25–35% smaller'],
                      ['Transparency', '✗ Not supported', '✓ Supported'],
                      ['Animation', '✗ Not supported', '✓ Supported'],
                      ['Browser support', 'Universal (30+ years)', '97%+ (all modern browsers)'],
                      ['Best for', 'Universal compatibility', 'Web-optimised images'],
                    ].map(([f, jpeg, webp]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{f}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{jpeg}</td>
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
                When you upload a JPEG, the browser decodes it natively and draws it onto an HTML Canvas element. The canvas is then exported as WebP using the browser&apos;s built-in WebP encoder. The quality slider controls the WebP compression level. The entire process runs locally in your browser tab — no data is sent to any server.
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

        <RelatedTools hrefs={['/convert-image-to-webp', '/png-to-webp', '/webp-to-jpg', '/compress-image']} />
      </main>
    </>
  );
}
