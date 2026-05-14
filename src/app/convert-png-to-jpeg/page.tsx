import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Convert PNG to JPEG Online — Free & Private',
  description: 'Convert PNG images to JPEG instantly in your browser. No upload, no server — 100% private. Reduce file size by up to 80%.',
  alternates: { canonical: 'https://imagepdf.tools/convert-png-to-jpeg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG to JPEG Converter',
      url: 'https://imagepdf.tools/convert-png-to-jpeg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to JPEG format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to JPEG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the converter.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider for the JPEG output.' },
        { '@type': 'HowToStep', text: 'Download your converted JPEG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert PNG to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'JPEGs are significantly smaller than PNGs for photographs because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.' } },
        { '@type': 'Question', name: 'Will I lose transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white. If you need to preserve transparency, keep the PNG format or export to WebP instead.' } },
        { '@type': 'Question', name: 'What quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'For web use, 75-85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple PNGs at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.' } },
        { '@type': 'Question', name: 'How much smaller is JPEG than PNG?', acceptedAnswer: { '@type': 'Answer', text: 'For photos, JPEG is typically 60-80% smaller than PNG at quality 80. A 1 MB PNG photo often converts to a 150-300 KB JPEG with no visible difference on screen.' } },
        { '@type': 'Question', name: 'Can I convert PNG screenshots to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but screenshots with text and sharp edges often look slightly blurry in JPEG due to compression artefacts. For screenshots, use quality 85-90 to preserve text sharpness.' } },
        { '@type': 'Question', name: 'Will converting PNG to JPEG change the image dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion only changes the file format and compression. The pixel dimensions remain exactly the same as the original PNG.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your PNG', desc: 'Drag and drop PNG files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.' },
  { n: '02', title: 'Output format: JPEG', desc: 'The format is set to JPEG automatically. Adjust the quality slider — quality 80 is the optimal starting point for most images.' },
  { n: '03', title: 'Download your JPEG', desc: 'Your converted JPEG file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

const FAQS = [
  {
    q: 'Why convert PNG to JPEG?',
    a: 'JPEGs are significantly smaller than PNGs for photographs and complex images because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.',
  },
  {
    q: 'How much smaller is JPEG than PNG?',
    a: 'For photos, JPEG is typically 60–80% smaller than PNG at quality 80. A 1 MB PNG photo often converts to a 150–300 KB JPEG with no visible difference on screen. The exact savings depend on the image content — photos compress more than flat graphics.',
  },
  {
    q: 'Will I lose transparency when converting PNG to JPEG?',
    a: 'Yes. JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white in the JPEG output. If you need to preserve transparency, keep the PNG format or export to WebP instead.',
  },
  {
    q: 'What quality setting should I use?',
    a: 'For web use, 75–85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+. Quality 80 is a reliable default for most conversions.',
  },
  {
    q: 'Can I convert PNG screenshots to JPEG?',
    a: 'Yes, but screenshots with text and sharp edges can look slightly blurry in JPEG due to compression artefacts on hard edges. For screenshots, use quality 85–90 to preserve text sharpness. If pixel-perfect quality is critical, stay with PNG.',
  },
  {
    q: 'Will converting PNG to JPEG change the image dimensions?',
    a: 'No. The conversion only changes the file format and compression. The pixel dimensions remain exactly identical to the original PNG.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.',
  },
  {
    q: 'Can I convert multiple PNG files at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.',
  },
];

export default function ConvertPngToJpegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cpj-h1    { opacity: 0; transform: translateY(10px); }
            .cpj-sub   { opacity: 0; transform: translateY(10px); }
            .cpj-trust { opacity: 0; }
          }
          .cpj-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cpj-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cpj-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes cpj-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .cpj-fact { animation: cpj-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .cpj-fact:nth-child(1) { animation-delay: 240ms; }
          .cpj-fact:nth-child(2) { animation-delay: 290ms; }
          .cpj-fact:nth-child(3) { animation-delay: 340ms; }
          .cpj-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="cpj-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="cpj-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Convert PNG to JPEG
          </h1>
          <p className="cpj-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Shrink PNG files by up to 80% by converting to JPEG. No transparency, but dramatically smaller files for photos and complex images.
          </p>
          <p className="cpj-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/jpeg" />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Canvas API runs on your CPU', 'Free with no account required', 'Up to 80% smaller than PNG'].map((fact) => (
                <li key={fact} className="cpj-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert PNG to JPEG in 3 steps</h2>
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

        {/* ── SEO content ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert PNG to JPEG?</h2>
              <p className="mb-3">
                PNG uses lossless compression, which means every pixel is stored exactly — but at the cost of large file sizes. For photographs and complex images, this is unnecessary. A photo saved as PNG might be 2–5 MB. The same photo as a JPEG at quality 80 is typically 200–600 KB — a reduction of 60–80% with virtually no visible difference on screen.
              </p>
              <p>
                The trade-off is transparency: JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white. For images that do not use transparency — photos, backgrounds, product images, banners — JPEG is almost always the better choice for web use.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">When PNG to JPEG makes sense</h2>
              <ul className="space-y-3">
                {[
                  ['Photography and portraits', 'Photos saved as PNG are unnecessarily large. Converting to JPEG reduces file size dramatically with no perceptible quality loss at typical screen sizes.'],
                  ['Website hero images and banners', 'Large banner images saved as PNG slow down page load times. Converting to JPEG at quality 80–85 gives you faster-loading images with excellent visual quality.'],
                  ['Product photos for e-commerce', 'Product photography without transparent backgrounds is best served as JPEG on Shopify, WooCommerce, and Amazon — where JPEG is the expected format and PNG files are unnecessarily large.'],
                  ['Email marketing images', 'Embedded images in email newsletters need to be small. PNG photos in emails slow down rendering. Converting to JPEG keeps emails lightweight.'],
                  ['Reducing storage costs', 'Large media libraries with PNG photos waste storage. Converting to JPEG can reduce a media library by 60–80%, significantly cutting hosting and CDN costs.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">PNG vs JPEG — when to use which</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">PNG</th>
                      <th className="text-left px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">JPEG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossless (larger)', 'Lossy (much smaller)'],
                      ['Transparency', 'Supported', 'Not supported'],
                      ['Best for', 'Logos, icons, screenshots', 'Photos, complex images'],
                      ['Typical file size', '500 KB – 5 MB', '50 KB – 500 KB'],
                      ['Browser support', 'Universal', 'Universal'],
                    ].map(([feature, png, jpeg]) => (
                      <tr key={feature} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{feature}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{png}</td>
                        <td className="px-4 py-3 text-violet-600 dark:text-violet-400 font-medium">{jpeg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>
                Your PNG is decoded by the browser and drawn onto an HTML Canvas element. The canvas is then exported as a JPEG using the {"browser's"} built-in JPEG encoder. Any transparent pixels are composited onto a white background before encoding, since JPEG does not support transparency. The quality slider controls the JPEG compression level. The entire process runs locally — no data is sent to any server.
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
              The converter uses the {"browser's"} native Canvas API. Your PNG images are processed entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about PNG to JPEG</h2>
              </div>
              <a
                href="#cpj-tool"
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

        <RelatedTools hrefs={['/jpg-to-png', '/png-to-webp', '/webp-to-jpg', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
