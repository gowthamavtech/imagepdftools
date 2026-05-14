import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PNG to WebP Converter — Free Online',
  description: 'Convert PNG images to WebP format instantly in your browser. Preserve transparency, reduce file size by up to 75% — no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/png-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG to WebP Converter',
      url: 'https://imagepdf.tools/png-to-webp',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to WebP format with transparency support. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to WebP online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the converter.' },
        { '@type': 'HowToStep', text: 'The output format is set to WebP. Adjust quality if needed.' },
        { '@type': 'HowToStep', text: 'Download your converted WebP file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does WebP support transparency like PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP supports full alpha-channel transparency, just like PNG. Converting a PNG with a transparent background preserves it completely — with a significantly smaller file.' } },
        { '@type': 'Question', name: 'How much smaller is WebP compared to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP (lossy) is typically 50-75% smaller than PNG for the same image. Even WebP lossless is around 26% smaller than PNG.' } },
        { '@type': 'Question', name: 'Should I use lossy or lossless WebP for my PNG?', acceptedAnswer: { '@type': 'Answer', text: 'For photos, lossy WebP at quality 80 gives the best size reduction. For logos or icons with sharp edges, use quality 90+ to minimise artefacts.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs locally in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple PNGs to WebP at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 PNG files at once on the Free tier, or unlimited with Pro.' } },
        { '@type': 'Question', name: 'What quality setting should I use for logos and icons?', acceptedAnswer: { '@type': 'Answer', text: 'For logos and icons with flat colours and sharp edges, use quality 85-95. Lower quality settings can introduce visible artefacts along hard edges that are very noticeable on simple graphics.' } },
        { '@type': 'Question', name: 'Does WebP support animation like GIF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WebP supports animation. However, this converter converts static PNG images to static WebP. Animated PNGs (APNG) are not converted to animated WebP.' } },
        { '@type': 'Question', name: 'Will WebP work in all browsers?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is supported by Chrome, Firefox, Safari 14+, Edge, and Opera — over 97% of global browser usage. If you need to support very old browsers, provide a PNG fallback via the HTML picture element.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your PNG', desc: 'Drag and drop PNG files onto the converter, or click to browse. Logos, screenshots, transparent graphics — all supported.' },
  { n: '02', title: 'Output format: WebP', desc: 'The format is set to WebP automatically. Transparency is fully preserved. Adjust quality to balance size and visual fidelity.' },
  { n: '03', title: 'Download your WebP', desc: 'Your converted WebP file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

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
    a: 'For photos or images where minor quality loss is acceptable, lossy WebP at quality 80 gives the best size reduction. For logos, icons, or images with sharp edges where quality must be pixel-perfect, use a higher quality setting (90+) to minimise compression artefacts.',
  },
  {
    q: 'What quality setting should I use for logos and icons?',
    a: 'For logos and icons with flat colours and sharp edges, use quality 85–95. Lower quality settings can introduce visible artefacts along hard edges that are very noticeable on simple graphics. For photographic PNG images, quality 80 is an excellent default.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. Everything runs locally in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple PNGs to WebP at once?',
    a: 'Yes. Drop up to 5 PNG files at once on the Free tier, or unlimited files with Pro.',
  },
  {
    q: 'Does WebP support animation like GIF?',
    a: 'Yes, WebP supports animation. However, this converter processes static PNG images to static WebP. Animated PNGs (APNG) are not converted to animated WebP files.',
  },
  {
    q: 'Will WebP work in all browsers?',
    a: 'WebP is supported by Chrome, Firefox, Safari 14+, Edge, and Opera — covering over 97% of global browser usage. If you need to support very old browsers, provide a PNG fallback using the HTML picture element.',
  },
];

export default function PngToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .p2w-h1    { opacity: 0; transform: translateY(10px); }
            .p2w-sub   { opacity: 0; transform: translateY(10px); }
            .p2w-trust { opacity: 0; }
          }
          .p2w-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .p2w-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .p2w-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes p2w-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .p2w-fact { animation: p2w-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .p2w-fact:nth-child(1) { animation-delay: 240ms; }
          .p2w-fact:nth-child(2) { animation-delay: 290ms; }
          .p2w-fact:nth-child(3) { animation-delay: 340ms; }
          .p2w-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="p2w-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="p2w-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            PNG to WebP Converter
          </h1>
          <p className="p2w-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Shrink PNG files by up to 75% by converting to WebP — with full transparency support. All processing stays in your browser.
          </p>
          <p className="p2w-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/webp" />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Transparency fully preserved', 'Free with no account required', 'Up to 75% smaller than PNG'].map((fact) => (
                <li key={fact} className="p2w-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert PNG to WebP in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert PNG to WebP?</h2>
              <p className="mb-3">
                PNG uses lossless compression — every pixel is preserved exactly. That makes it ideal for logos, icons, and screenshots, but it produces large files. A typical logo PNG might be 200–500 KB. The same image as a WebP at quality 85 is often 50–120 KB — a reduction of 50–75% with virtually no visible difference at screen resolution.
              </p>
              <p>
                Critically, WebP supports full alpha-channel transparency, so transparent PNGs convert without any loss of the transparent background. For web use, WebP is strictly better than PNG in almost every case — smaller file, same transparency support, and comparable quality.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common use cases for PNG to WebP</h2>
              <ul className="space-y-3">
                {[
                  ['Website logos and icons', 'PNG logos with transparent backgrounds are a perfect WebP conversion target. The transparency is preserved and the file size drops dramatically — improving Lighthouse scores instantly.'],
                  ['UI screenshots and product images', 'Screenshots taken as PNG (often large because of the lossless format) compress well to WebP without the blocky JPEG artefacts you would get from converting to JPEG.'],
                  ['Game and app assets', 'Mobile and web apps with sprite sheets or UI assets as PNG can reduce asset bundle size significantly by converting to WebP — directly improving load times on slower mobile connections.'],
                  ['Shopify and e-commerce product images', 'Product images with removed backgrounds (PNG with transparency) are widely used in e-commerce. Converting to WebP reduces page weight and speeds up product pages.'],
                  ['WordPress media library', 'WordPress 5.8+ supports WebP uploads. Replacing large PNG assets in your media library with WebP equivalents can shave megabytes off page weight across your entire site.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">PNG vs WebP — format comparison</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">PNG</th>
                      <th className="text-left px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossless only', 'Lossy + lossless'],
                      ['Transparency', 'Supported', 'Supported'],
                      ['File size', 'Large (lossless)', '50–75% smaller than PNG'],
                      ['Quality loss', 'None (lossless)', 'Minimal at quality 80+'],
                      ['Browser support', 'Universal', '97%+ coverage'],
                    ].map(([f, png, webp]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">{f}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{png}</td>
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
                Your PNG is decoded by the browser and drawn to an HTML Canvas element. The canvas is then exported using the {"browser's"} built-in WebP encoder. The alpha channel (transparency) is preserved throughout this process. All processing happens locally — your file never leaves your browser.
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
              The converter uses the {"browser's"} native Canvas API and WebP encoder. Your PNG images are processed entirely on your own hardware — including any sensitive or proprietary designs. Nothing is transmitted, stored, or logged.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — conversion happens on your CPU',
                'No account or sign-up required',
                'Transparency preserved throughout the conversion',
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about PNG to WebP</h2>
              </div>
              <a
                href="#p2w-tool"
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

        <RelatedTools hrefs={['/convert-image-to-webp', '/jpg-to-webp', '/jpg-to-png', '/compress-png-online']} />
      </main>
    </>
  );
}
