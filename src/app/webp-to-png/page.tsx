import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter — Free Online',
  description: 'Convert WebP images to lossless PNG format in your browser. Preserve transparency and full quality — no upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/webp-to-png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — WebP to PNG Converter',
      url: 'https://imagepdf.tools/webp-to-png',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert WebP images to PNG format with lossless quality and transparency support. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert WebP to PNG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your WebP file onto the converter.' },
        { '@type': 'HowToStep', text: 'The output format is set to PNG (lossless) automatically.' },
        { '@type': 'HowToStep', text: 'Download your PNG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma, or upload it to a platform that does not accept WebP, converting to PNG gives you maximum compatibility.' } },
        { '@type': 'Question', name: 'Does converting WebP to PNG lose quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts.' } },
        { '@type': 'Question', name: 'Is transparency preserved when converting WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly.' } },
        { '@type': 'Question', name: 'Will the PNG file be larger than the WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG uses lossless compression, which is less efficient than WebP for photographs and complex images. A WebP photo converted to PNG will typically be 3-5x larger. PNG is best when you need to edit the file further or need lossless quality.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I batch convert WebP files to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.' } },
        { '@type': 'Question', name: 'Can I use the converted PNG for printing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG is a lossless format and is widely accepted by print services and professional software. For best print results, make sure your original WebP image has sufficient resolution (at least 300 DPI for the intended print size).' } },
        { '@type': 'Question', name: 'What is the difference between WebP to PNG and WebP to JPG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is lossless and preserves transparency — ideal for logos, icons, and images you want to edit further. JPEG is lossy with no transparency support but produces smaller files. Use PNG when quality and transparency matter; use JPEG when file size is the priority.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your WebP', desc: 'Drag and drop WebP files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.' },
  { n: '02', title: 'Output format: PNG', desc: 'The format is set to PNG (lossless) automatically. Transparency is fully preserved — no additional settings needed.' },
  { n: '03', title: 'Download your PNG', desc: 'Your converted PNG file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

const FAQS = [
  {
    q: 'Why convert WebP to PNG?',
    a: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma — or upload it to a platform that does not accept WebP — converting to PNG gives you maximum compatibility.',
  },
  {
    q: 'Does converting WebP to PNG lose quality?',
    a: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts. The PNG will look identical to the WebP at the same resolution.',
  },
  {
    q: 'Is transparency preserved when converting WebP to PNG?',
    a: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly — which is one of the main reasons to choose PNG over JPEG for this conversion.',
  },
  {
    q: 'Will the PNG file be larger than the WebP?',
    a: 'Yes. PNG uses lossless compression, which is less efficient than WebP for photographs and complex images. A WebP photo converted to PNG will typically be 3–5× larger. PNG is best when you need to edit the file further or need guaranteed lossless quality.',
  },
  {
    q: 'Can I batch convert WebP files to PNG?',
    a: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.',
  },
  {
    q: 'Can I use the converted PNG for printing?',
    a: 'Yes. PNG is a lossless format and is widely accepted by print services and professional software. For best print results, make sure your original WebP image has sufficient resolution for the intended print size.',
  },
  {
    q: 'What is the difference between WebP to PNG and WebP to JPG?',
    a: 'PNG is lossless and preserves transparency — ideal for logos, icons, and images you need to edit further. JPEG is lossy with no transparency support but produces smaller files. Choose PNG when quality and transparency matter, and JPEG when file size is the priority.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.',
  },
];

export default function WebpToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .w2p-h1    { opacity: 0; transform: translateY(10px); }
            .w2p-sub   { opacity: 0; transform: translateY(10px); }
            .w2p-trust { opacity: 0; }
          }
          .w2p-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .w2p-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .w2p-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes w2p-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .w2p-fact { animation: w2p-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .w2p-fact:nth-child(1) { animation-delay: 240ms; }
          .w2p-fact:nth-child(2) { animation-delay: 290ms; }
          .w2p-fact:nth-child(3) { animation-delay: 340ms; }
          .w2p-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="w2p-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="w2p-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            WebP to PNG Converter
          </h1>
          <p className="w2p-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Convert WebP images to lossless PNG — full quality, transparency preserved. Works with every image editor and platform. No upload required.
          </p>
          <p className="w2p-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/png" />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Lossless PNG export', 'Free with no account required', 'Transparency preserved'].map((fact) => (
                <li key={fact} className="w2p-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert WebP to PNG in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert WebP to PNG?</h2>
              <p className="mb-3">
                WebP is an excellent format for the web — small files, great quality. But it is a relatively young format and not universally supported by professional tools and platforms. PNG, by contrast, has been the standard lossless image format for 25+ years and is supported by every image editor, graphics application, operating system, and image platform in existence.
              </p>
              <p>
                If you downloaded a WebP image from the web or received one from a client, converting it to PNG is the most reliable way to open it, edit it, and share it without worrying about format compatibility.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">When to convert WebP to PNG</h2>
              <ul className="space-y-3">
                {[
                  ['Editing in Photoshop, Illustrator, or GIMP', 'While newer versions of Photoshop support WebP natively, many design teams still run older versions or use tools that do not support it. Converting to PNG first ensures the file opens correctly for editing.'],
                  ['Figma and design handoff', 'Figma supports WebP in some contexts but PNG is the universally accepted format for design assets. Converting WebP screenshots or assets to PNG ensures compatibility across all design workflows.'],
                  ['Platform upload restrictions', 'Some government portals, job application systems, academic submission platforms, and older CMS platforms only accept JPEG and PNG. Converting WebP to PNG removes upload rejections.'],
                  ['Preserving transparent backgrounds for editing', 'If you have a WebP file with a transparent background and need to composite it into a design, converting to PNG preserves the transparency in a universally editable format.'],
                  ['Archival and lossless storage', 'If you want to store an image long-term with guaranteed lossless quality — for printing, archiving, or future re-editing — PNG is more widely supported than WebP for archival purposes.'],
                  ['Windows legacy compatibility', 'Older Windows tools like Paint (pre-2023), classic Windows Photo Viewer, and legacy business applications do not open WebP files. PNG opens in all of them.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>
                When you drop a WebP file, the browser decodes it using its native WebP decoder (all modern browsers support WebP) and draws it to an HTML Canvas element. The canvas is then exported as a PNG using lossless compression. Since PNG is lossless, no quality is lost in the conversion. The alpha channel (transparency) is fully preserved. No data leaves your device — the entire process runs in your browser.
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
              The converter uses the {"browser's"} native Canvas API. Your WebP images are decoded and exported as PNG entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — conversion happens on your CPU',
                'No account or sign-up required',
                'Lossless PNG output — every pixel preserved',
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about WebP to PNG</h2>
              </div>
              <a
                href="#w2p-tool"
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

        <RelatedTools hrefs={['/webp-to-jpg', '/jpg-to-png', '/png-to-webp', '/compress-png-online']} />
      </main>
    </>
  );
}
