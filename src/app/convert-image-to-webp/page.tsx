import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Convert Image to WebP — Free Online WebP Converter',
  description:
    'Convert JPEG and PNG images to WebP format online for free. Smaller file sizes, same quality — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/convert-image-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Image to WebP Converter',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG, PNG, and other images to WebP format. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert an image to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the converter.' },
        { '@type': 'HowToStep', text: 'Select WebP as the output format.' },
        { '@type': 'HowToStep', text: 'Adjust quality if needed, then download your WebP file.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Is WebP better than JPEG?',
    a: 'WebP is typically 25–35% smaller than JPEG at the same visual quality level. It also supports transparency (like PNG) and animation (like GIF). For web use, WebP is the superior format in almost every situation.',
  },
  {
    q: 'Does every browser support WebP?',
    a: 'Yes. WebP is supported by all major browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. As of 2025, global WebP support is above 97%.',
  },
  {
    q: 'Will converting to WebP make my website faster?',
    a: 'Yes. Smaller images load faster, which directly improves your Google PageSpeed Insights score and Core Web Vitals (specifically Largest Contentful Paint). Google has recommended WebP for web images since 2018.',
  },
  {
    q: 'Does WebP support transparency?',
    a: 'Yes. WebP supports both lossy and lossless compression, as well as transparency (alpha channel). This makes it a suitable replacement for both JPEG and PNG.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function ConvertToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Convert Image to WebP</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Convert any JPEG or PNG to modern WebP format — up to 35% smaller than JPEG with the same visual quality.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is WebP and why does it matter?</h2>
              <p className="mb-3">
                WebP is an image format developed by Google and released in 2010. It uses advanced compression algorithms — a mix of predictive coding and discrete cosine transformation — that produce files 25–35% smaller than JPEG and 25% smaller than PNG, while maintaining near-identical visual quality. It supports both lossy and lossless compression, transparency (alpha channel), and even animation.
              </p>
              <p>
                Google included WebP support in Lighthouse and PageSpeed Insights as a core recommendation, and it is now one of the key factors in the Largest Contentful Paint (LCP) metric — a Core Web Vital that Google uses as a ranking signal. Switching your images from JPEG and PNG to WebP is one of the highest-impact single changes you can make to improve your website&apos;s speed score.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Who should convert images to WebP?</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website owners and bloggers.</strong> Replacing JPEG hero images and blog post photos with WebP equivalents can shave hundreds of kilobytes per page load, directly improving Google PageSpeed scores.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">E-commerce store owners.</strong> Product images are often the largest assets on a page. WebP product photos load faster, reducing bounce rate and improving conversion.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WordPress site owners.</strong> WordPress 5.8+ natively serves WebP images. Converting your existing library to WebP is the fastest way to speed up a WordPress site without changing plugins.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Shopify merchants.</strong> Shopify&apos;s CDN automatically serves WebP to supporting browsers, but uploading WebP gives you the best result and smallest fallback file.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Developers and designers.</strong> Including WebP in your design handoffs and asset exports helps developers meet performance budgets without extra work on their end.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">WebP vs JPEG vs PNG — format comparison</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">JPEG</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">PNG</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossy', 'Lossless', 'Both'],
                      ['Transparency', '✗', '✓', '✓'],
                      ['Typical file size', '100%', '150–300%', '65–75%'],
                      ['Browser support', '100%', '100%', '97%+'],
                      ['Best for', 'Photos', 'Logos, UI', 'Everything'],
                    ].map(([f, j, p, w]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">{f}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{j}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{p}</td>
                        <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the conversion works</h2>
              <p>
                When you drop an image into the converter, it is decoded by the browser&apos;s native image decoder and drawn onto an HTML Canvas element. The canvas is then exported as a WebP-encoded image using the browser&apos;s built-in WebP encoder — the same encoder that Google Chrome uses internally. The quality slider controls the compression ratio of the WebP output. Nothing is uploaded to any server at any point in this process.
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

        <RelatedTools hrefs={['/jpg-to-webp', '/png-to-webp', '/webp-to-jpg', '/webp-to-png']} />
      </main>
    </>
  );
}
