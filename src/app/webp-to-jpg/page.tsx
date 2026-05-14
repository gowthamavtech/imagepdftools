import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'WebP to JPG Converter — Free Online',
  description: 'Convert WebP images to JPEG instantly in your browser. No upload, no server — 100% private. Maximum compatibility with all apps and devices.',
  alternates: { canonical: 'https://imagepdf.tools/webp-to-jpg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — WebP to JPG Converter',
      url: 'https://imagepdf.tools/webp-to-jpg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert WebP images to JPEG format. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert WebP to JPG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your WebP file onto the converter.' },
        { '@type': 'HowToStep', text: 'The tool converts to JPEG automatically. Adjust quality if needed.' },
        { '@type': 'HowToStep', text: 'Download your JPG file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why would I need to convert WebP to JPG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients, printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere.' } },
        { '@type': 'Question', name: 'Does converting WebP to JPG reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'There is a slight quality reduction since JPEG uses lossy compression. At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.' } },
        { '@type': 'Question', name: 'Can I open a WebP file in Photoshop?', acceptedAnswer: { '@type': 'Answer', text: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer support WebP natively.' } },
        { '@type': 'Question', name: 'Is my WebP file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple WebP files at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.' } },
        { '@type': 'Question', name: 'What JPEG quality should I use for printing?', acceptedAnswer: { '@type': 'Answer', text: 'For print use, set quality to 90-95. This minimises compression artefacts and ensures the file is large enough for good print resolution.' } },
        { '@type': 'Question', name: 'Will the JPEG keep the same dimensions as the original WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The conversion only changes the file format and compression — the pixel dimensions remain identical to the original WebP image.' } },
        { '@type': 'Question', name: 'What happens to transparent areas when converting to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG does not support transparency. Transparent areas in a WebP image will be filled with white in the JPEG output. If you need to preserve transparency, convert to PNG instead.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your WebP', desc: 'Drag and drop WebP files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.' },
  { n: '02', title: 'Output format: JPEG', desc: 'Set the output format to JPEG. Adjust the quality slider — quality 85 gives the best balance of size and visual fidelity for most uses.' },
  { n: '03', title: 'Download your JPG', desc: 'Your converted JPEG file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

const FAQS = [
  {
    q: 'Why would I need to convert WebP to JPG?',
    a: "WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients like older versions of Outlook, eBay's product listing system, some printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere.",
  },
  {
    q: 'Does converting WebP to JPG reduce quality?',
    a: 'There is a slight quality reduction since JPEG uses lossy compression. You can minimise this by choosing a high quality setting (90+). At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.',
  },
  {
    q: 'Can I open a WebP file in Photoshop?',
    a: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer versions support WebP natively.',
  },
  {
    q: 'What JPEG quality should I use for printing?',
    a: 'For print use, set quality to 90–95. This minimises compression artefacts and ensures the file contains enough detail for high-resolution printing. For standard web or screen use, quality 80–85 gives an excellent result at a much smaller file size.',
  },
  {
    q: 'Will the JPEG keep the same dimensions as the original WebP?',
    a: 'Yes. The conversion only changes the file format and compression — the pixel dimensions remain exactly identical to the original WebP image. No scaling or cropping is applied.',
  },
  {
    q: 'What happens to transparent areas when converting to JPEG?',
    a: 'JPEG does not support transparency. Any transparent areas in a WebP image will be filled with white in the JPEG output. If you need to preserve transparency, convert to PNG instead.',
  },
  {
    q: 'Is my WebP file uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple WebP files at once?',
    a: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.',
  },
];

export default function WebpToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .w2j-h1    { opacity: 0; transform: translateY(10px); }
            .w2j-sub   { opacity: 0; transform: translateY(10px); }
            .w2j-trust { opacity: 0; }
          }
          .w2j-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .w2j-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .w2j-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes w2j-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .w2j-fact { animation: w2j-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .w2j-fact:nth-child(1) { animation-delay: 240ms; }
          .w2j-fact:nth-child(2) { animation-delay: 290ms; }
          .w2j-fact:nth-child(3) { animation-delay: 340ms; }
          .w2j-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="w2j-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="w2j-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            WebP to JPG Converter
          </h1>
          <p className="w2j-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Convert WebP images to universally compatible JPEG format. Works with every app, device, and platform — all processing stays in your browser.
          </p>
          <p className="w2j-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Canvas API runs on your CPU', 'Free with no account required', 'Works everywhere JPEG works'].map((fact) => (
                <li key={fact} className="w2j-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert WebP to JPG in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert WebP to JPG?</h2>
              <p className="mb-3">
                {"WebP is Google's"} efficient modern image format — but modern also means it is not universally supported. Despite WebP having over 97% browser support, many software applications, marketplaces, and services still require JPEG or have not added WebP support. Converting WebP to JPG gives you a file that works everywhere, without exception.
              </p>
              <p>
                If a website or app has given you a WebP file (common when downloading images from Google, news sites, or social platforms), and you want to use it elsewhere, converting it to JPEG first is the most reliable solution.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common reasons to convert WebP to JPG</h2>
              <ul className="space-y-3">
                {[
                  ['eBay and Amazon product listings', "Both platforms' listing systems require JPEG or PNG for product photos. WebP files are rejected at upload. Converting your images to JPEG first solves this instantly."],
                  ['Email attachments', 'Many email clients — particularly older Outlook versions on Windows — display WebP images as attachments rather than rendering them inline. JPEG displays correctly in all email clients.'],
                  ['Printing services', 'Online and local print labs typically accept JPEG and TIFF. Very few printing workflows handle WebP. Converting to JPEG before uploading to a photo printing service prevents format errors.'],
                  ['Older versions of Photoshop and Lightroom', 'Adobe Photoshop added WebP support in version 23.2 (early 2022). If you or a colleague runs an older version, you need JPEG to open and edit the image.'],
                  ['Windows Photo Viewer and older Android devices', 'The classic Windows Photo Viewer and older Android gallery apps cannot display WebP. Converting to JPG makes the image viewable immediately.'],
                  ['Sending images to clients or non-technical users', 'If you are not sure what software the recipient has, JPEG is always the safest choice — it has been universally supported for 30+ years.'],
                  ['Facebook Marketplace and classifieds', 'Some classifieds platforms still show WebP upload errors. Converting to JPEG before uploading eliminates that friction.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Does converting lose quality?</h2>
              <p className="mb-3">
                There is a trade-off. WebP is often more efficient than JPEG, so converting from WebP to JPEG and then re-applying JPEG compression introduces a small amount of quality loss. At a JPEG quality setting of 85 or above, the difference is virtually invisible at normal viewing sizes. If you are printing the image or need archival quality, use quality 95+.
              </p>
              <p>
                One practical tip: if you downloaded a WebP image from the web, it was likely already compressed before you received it. Exporting at quality 80–90 for web use and 90–95 for print is generally the right call.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>
                When you upload a WebP image, the browser decodes it natively (all modern browsers have built-in WebP support) and draws it onto an HTML Canvas element. The canvas is then exported as a JPEG using the {"browser's"} built-in JPEG encoder. The quality slider controls how much JPEG compression is applied. No data leaves your device at any point — the entire process runs in your browser tab.
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
              The converter uses the {"browser's"} native Canvas API. Your WebP images are decoded and re-encoded entirely on your own hardware — nothing is transmitted, stored, or accessible to any server.
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about WebP to JPG</h2>
              </div>
              <a
                href="#w2j-tool"
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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/jpg-to-png', '/webp-to-png', '/jpg-to-webp']} />
      </main>
    </>
  );
}
