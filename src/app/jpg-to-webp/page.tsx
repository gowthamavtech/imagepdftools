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
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPG to WebP Converter',
      url: 'https://imagepdf.tools/jpg-to-webp',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG images to WebP format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG file onto the converter.' },
        { '@type': 'HowToStep', text: 'The output format is set to WebP. Adjust the quality slider if needed.' },
        { '@type': 'HowToStep', text: 'Download your converted WebP file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert JPG to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'WebP produces files 25-35% smaller than JPEG at the same quality. Faster pages, better Core Web Vitals, lower bandwidth costs.' } },
        { '@type': 'Question', name: 'Does WebP look better than JPEG at the same file size?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A WebP at quality 80 typically matches a JPEG at quality 90 while being significantly smaller.' } },
        { '@type': 'Question', name: 'Will WebP work on all browsers?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is supported in Chrome, Firefox, Safari 14+, Edge, and Opera — over 97% of global browser usage.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Conversion runs entirely in your browser via the Canvas API. Nothing leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple JPEG files at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — up to 5 on the free tier, unlimited with Pro.' } },
        { '@type': 'Question', name: 'What quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 80 is the sweet spot for web use. For print or archival purposes, use 90-95.' } },
        { '@type': 'Question', name: 'Is WebP indexed by Google Search?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Google crawls WebP images like JPEG. PageSpeed Insights actively recommends WebP over JPEG for performance.' } },
        { '@type': 'Question', name: 'Can I use WebP images in email?', acceptedAnswer: { '@type': 'Answer', text: 'Gmail and Apple Mail render WebP inline. Outlook desktop on Windows still needs JPEG for reliable inline rendering.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your JPEG', desc: 'Drag and drop JPEG files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.' },
  { n: '02', title: 'Output format: WebP', desc: 'The format is set to WebP automatically. Adjust the quality slider if needed — quality 80 is the optimal starting point for web use.' },
  { n: '03', title: 'Download your WebP', desc: 'Your converted WebP file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

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
    a: 'WebP is supported by Chrome, Firefox, Safari (since version 14), Edge, and Opera — covering over 97% of global browser usage. For users on older browsers, you can serve a JPEG fallback using the HTML picture element.',
  },
  {
    q: 'What quality setting should I use?',
    a: 'Quality 80 is the sweet spot for most web use cases — it gives the best file size reduction while remaining visually identical to the original at typical screen sizes. For print or archival use, set quality to 90–95.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple JPEG files to WebP at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with a Pro subscription.',
  },
  {
    q: 'Is WebP supported by Google Search?',
    a: "Yes. Google crawls and indexes WebP images just like JPEG. Google's own PageSpeed Insights tool actively recommends serving images in WebP or AVIF over JPEG for better performance scores.",
  },
  {
    q: 'Can I use WebP images in emails?',
    a: 'Most modern web-based email clients — Gmail, Apple Mail, Outlook on the web — render WebP inline. However, Outlook desktop on Windows still requires JPEG or PNG for reliable inline rendering. If universal email compatibility is critical, use JPEG instead.',
  },
];

export default function JpgToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .j2w-h1    { opacity: 0; transform: translateY(10px); }
            .j2w-sub   { opacity: 0; transform: translateY(10px); }
            .j2w-trust { opacity: 0; }
          }
          .j2w-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .j2w-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .j2w-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes j2w-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .j2w-fact { animation: j2w-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .j2w-fact:nth-child(1) { animation-delay: 240ms; }
          .j2w-fact:nth-child(2) { animation-delay: 290ms; }
          .j2w-fact:nth-child(3) { animation-delay: 340ms; }
          .j2w-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="j2w-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="j2w-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            JPG to WebP Converter
          </h1>
          <p className="j2w-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Convert JPEG images to modern WebP format — up to 35% smaller at the same visual quality. All processing happens in your browser.
          </p>
          <p className="j2w-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/webp" />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Browser-native WebP encoder', 'Free with no account required', '25–35% smaller than JPEG'].map((fact) => (
                <li key={fact} className="j2w-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>How it works</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert JPEG to WebP in 3 steps</h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/[0.06]">
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

        {/* ── SEO content ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert JPEG to WebP?</h2>
              <p className="mb-3">
                JPEG has been the standard photo format since the 1990s — and it is still excellent. But WebP, developed by Google and released in 2010, offers meaningfully better compression. A JPEG image converted to WebP at equivalent quality settings will typically be 25–35% smaller. For websites serving thousands of images per day, that reduction adds up to dramatically lower bandwidth costs and faster page loads.
              </p>
              <p>
                {"Google's"} PageSpeed Insights and Lighthouse tools flag JPEG images as a performance opportunity and specifically recommend serving them in next-generation formats like WebP. Converting your JPEG images to WebP is one of the most direct ways to improve your Core Web Vitals score — particularly Largest Contentful Paint (LCP), which measures how quickly the main image on a page loads.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Who should convert JPEG to WebP?</h2>
              <ul className="space-y-3">
                {[
                  ['Website owners and developers', 'Every JPEG hero image, product photo, or blog image on your site is a WebP conversion opportunity. Smaller images mean faster sites and lower hosting bandwidth.'],
                  ['E-commerce stores', 'Shopify and WooCommerce both support WebP. Product pages with many images benefit enormously — faster load times reduce bounce rates and improve conversion.'],
                  ['WordPress users', 'WordPress has supported WebP uploads since version 5.8. Converting your existing JPEG media library to WebP and re-uploading can noticeably improve site speed scores.'],
                  ['SEO professionals', 'Page speed is a confirmed Google ranking factor. Images are almost always the largest assets on a page — converting to WebP is a fast way to improve speed metrics without redesigning the site.'],
                  ['App developers', 'Mobile apps benefit from smaller image assets — they reduce app size, lower mobile data usage, and make image-heavy screens render faster.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">JPEG vs WebP — a quick comparison</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">JPEG</th>
                      <th className="text-left px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossy only', 'Lossy + lossless'],
                      ['File size (same quality)', 'Baseline', '25–35% smaller'],
                      ['Transparency', 'Not supported', 'Supported'],
                      ['Animation', 'Not supported', 'Supported'],
                      ['Browser support', 'Universal (30+ years)', '97%+ (all modern browsers)'],
                      ['Best for', 'Universal compatibility', 'Web-optimised images'],
                    ].map(([f, jpeg, webp]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{f}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{jpeg}</td>
                        <td className="px-4 py-3 text-violet-600 dark:text-violet-400 font-medium">{webp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>
                When you upload a JPEG, the browser decodes it natively and draws it onto an HTML Canvas element. The canvas is then exported as WebP using the {"browser's"} built-in WebP encoder. The quality slider controls the WebP compression level. The entire process runs locally in your browser tab — no data is sent to any server.
              </p>
            </div>
          </div>
        </section>

        {/* ── Privacy callout ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>Privacy by architecture</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Your files never leave your browser.</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              The converter uses the {"browser's"} native Canvas API and WebP encoder. Your JPEG images are processed entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — conversion happens on your CPU',
                'No account or sign-up required',
                'Batch convert up to 5 files free, unlimited with Pro',
                'Works offline once the page has loaded',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 shrink-0 mt-px" style={{ color: 'oklch(70% 0.158 293)' }} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: 'oklch(70% 0.158 293)' }}>FAQ</p>
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about JPG to WebP</h2>
              </div>
              <a
                href="#j2w-tool"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
              >
                Back to converter
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
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

        <RelatedTools hrefs={['/convert-image-to-webp', '/png-to-webp', '/webp-to-jpg', '/compress-image']} />
      </main>
    </>
  );
}
