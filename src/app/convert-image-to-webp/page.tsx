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
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image to WebP Converter',
      url: 'https://imagepdf.tools/convert-image-to-webp',
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is WebP better than JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is typically 25–35% smaller than JPEG at the same visual quality level. It also supports transparency (like PNG) and animation (like GIF). For web use, WebP is the superior format in almost every situation.' } },
        { '@type': 'Question', name: 'Does every browser support WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP is supported by all major browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. As of 2025, global WebP support is above 97%.' } },
        { '@type': 'Question', name: 'Will converting to WebP make my website faster?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Smaller images load faster, which directly improves your Google PageSpeed Insights score and Core Web Vitals (specifically Largest Contentful Paint). Google has recommended WebP for web images since 2018.' } },
        { '@type': 'Question', name: 'Does WebP support transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP supports both lossy and lossless compression, as well as transparency (alpha channel). This makes it a suitable replacement for both JPEG and PNG.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple images to WebP at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch conversion and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'What quality setting should I use for WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 80 is the standard recommendation for web images — files are typically 60–70% smaller than the original JPEG with virtually no visible difference at screen sizes. For archival or print use, quality 90+ is safer.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Drag a JPEG, PNG, or WebP file onto the zone or click to browse. Up to 50 MB per file.',
  },
  {
    n: '02',
    title: 'Output format: WebP',
    desc: 'The converter uses the browser\'s built-in WebP encoder. Adjust quality with the slider.',
  },
  {
    n: '03',
    title: 'Download your WebP',
    desc: 'Your browser converts locally. The WebP file downloads directly to your device.',
  },
];

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
  {
    q: 'Can I convert multiple images to WebP at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch conversion and can download everything as a ZIP.',
  },
  {
    q: 'What quality setting should I use for WebP?',
    a: 'Quality 80 is the standard recommendation for web images — files are typically 60–70% smaller than the original JPEG with virtually no visible difference at screen sizes. For archival or print use, quality 90+ is safer.',
  },
];

export default function ConvertToWebpPage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cw-h1  { opacity: 0; transform: translateY(10px); }
            .cw-sub { opacity: 0; transform: translateY(10px); }
            .cw-trust { opacity: 0; }
          }
          .cw-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cw-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cw-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes cw-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .cw-fact { animation: cw-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .cw-fact:nth-child(1) { animation-delay: 240ms; }
          .cw-fact:nth-child(2) { animation-delay: 290ms; }
          .cw-fact:nth-child(3) { animation-delay: 340ms; }
          .cw-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        <div id="webp-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="cw-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Convert Image to WebP
          </h1>
          <p className="cw-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Convert any JPEG or PNG to modern WebP format — up to 35% smaller than JPEG with the same visual quality. Nothing uploaded.
          </p>
          <p className="cw-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        <CompressorUI />

        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Browser-native WebP encoder', 'Free with no account required', 'Transparency preserved'].map((fact) => (
                <li key={fact} className="cw-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section aria-labelledby="cw-how-heading" className="bg-[#F7F8FC] dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="cw-how-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-10">Three steps. Under 5 seconds.</h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div key={step.n} className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}>
                  <span className="block text-[11px] font-bold tracking-[0.16em] mb-3" style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">{step.n}</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">{step.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">What is WebP and why does it matter?</h2>
              <p className="mb-3">WebP is an image format developed by Google and released in 2010. It uses advanced compression algorithms — a mix of predictive coding and discrete cosine transformation — that produce files 25–35% smaller than JPEG and 25% smaller than PNG, while maintaining near-identical visual quality. It supports both lossy and lossless compression, transparency (alpha channel), and even animation.</p>
              <p>Google included WebP support in Lighthouse and PageSpeed Insights as a core recommendation, and it is now one of the key factors in the Largest Contentful Paint (LCP) metric — a Core Web Vital that Google uses as a ranking signal. Switching your images from JPEG and PNG to WebP is one of the highest-impact single changes you can make to improve your website&apos;s speed score.</p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Who should convert images to WebP?</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website owners and bloggers.</strong> Replacing JPEG hero images and blog post photos with WebP equivalents can shave hundreds of kilobytes per page load, directly improving Google PageSpeed scores.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">E-commerce store owners.</strong> Product images are often the largest assets on a page. WebP product photos load faster, reducing bounce rate and improving conversion.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WordPress site owners.</strong> WordPress 5.8+ natively serves WebP images. Converting your existing library to WebP is the fastest way to speed up a WordPress site without changing plugins.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Shopify merchants.</strong> Shopify&apos;s CDN automatically serves WebP to supporting browsers, but uploading WebP gives you the best result and smallest fallback file.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Developers and designers.</strong> Including WebP in your design handoffs and asset exports helps developers meet performance budgets without extra work on their end.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">WebP vs JPEG vs PNG — format comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/8">
                      <th className="text-left py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">Feature</th>
                      <th className="text-left py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">JPEG</th>
                      <th className="text-left py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">PNG</th>
                      <th className="text-left py-2.5 font-semibold" style={{ color: 'oklch(70% 0.158 293)' }}>WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {[
                      ['Compression', 'Lossy', 'Lossless', 'Both'],
                      ['Transparency', '✗', '✓', '✓'],
                      ['Typical file size', '100%', '150–300%', '65–75%'],
                      ['Browser support', '100%', '100%', '97%+'],
                      ['Best for', 'Photos', 'Logos, UI', 'Everything'],
                    ].map(([f, j, p, w]) => (
                      <tr key={f}>
                        <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">{f}</td>
                        <td className="py-2.5 pr-4">{j}</td>
                        <td className="py-2.5 pr-4">{p}</td>
                        <td className="py-2.5 font-medium" style={{ color: 'oklch(70% 0.158 293)' }}>{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>When you drop an image into the converter, it is decoded by the browser&apos;s native image decoder and drawn onto an HTML Canvas element. The canvas is then exported as a WebP-encoded image using the browser&apos;s built-in WebP encoder — the same encoder that Google Chrome uses internally. The quality slider controls the compression ratio of the WebP output. Nothing is uploaded to any server at any point in this process.</p>
            </div>

          </div>
        </section>

        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>Privacy by architecture</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Your files never leave your browser.</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch] mb-6">Conversion runs entirely via the browser&apos;s built-in Canvas API and WebP encoder. No upload endpoint exists. Your image is converted on your own CPU and downloaded directly.</p>
            <ul className="space-y-2.5">
              {['No file data transmitted over the network at any point', 'No account, sign-in, or email required to use any feature', 'Closing the tab clears all data from browser memory completely', 'Browser-native WebP encoding — same as Chrome uses internally'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-slate-100 dark:border-white/5 bg-[#F7F8FC] dark:bg-[#0C0C1A] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">The converter is at the top of this page.</p>
          <a href="#webp-tool" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150" style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
            Back to converter
          </a>
        </div>

        <section aria-labelledby="cw-faq-heading" className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="cw-faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Frequently asked questions</h2>
            <dl className="divide-y divide-slate-100 dark:divide-white/5">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RelatedTools hrefs={['/jpg-to-webp', '/png-to-webp', '/webp-to-jpg', '/webp-to-png']} />
      </main>
    </>
  );
}
