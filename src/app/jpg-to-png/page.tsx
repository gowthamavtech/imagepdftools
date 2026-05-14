import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free Online',
  description: 'Convert JPEG images to PNG instantly in your browser. No upload, no server — 100% private. Lossless PNG output with transparency support.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPG to PNG Converter',
      url: 'https://imagepdf.tools/jpg-to-png',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG images to PNG format. Lossless output with transparency support. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG to PNG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG or JPG file onto the converter.' },
        { '@type': 'HowToStep', text: 'The output format is set to PNG automatically.' },
        { '@type': 'HowToStep', text: 'Download your converted PNG file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why would I convert a JPG to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'The most common reason is to enable transparency. PNG supports transparent backgrounds, while JPEG does not. PNG is also lossless, so re-saving it does not introduce further compression artefacts.' } },
        { '@type': 'Question', name: 'Will converting JPG to PNG improve quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Converting a JPEG to PNG does not recover quality lost during the original JPEG compression. The PNG output is a lossless snapshot of the current JPEG — no better in terms of pixel quality. But future saves will not introduce additional degradation.' } },
        { '@type': 'Question', name: 'Will the PNG file be larger than the JPG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG uses lossless compression, which means the files are typically 2-4x larger than their JPEG equivalents for photographs.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple JPGs to PNG at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.' } },
        { '@type': 'Question', name: 'Is JPG to PNG conversion truly lossless?', acceptedAnswer: { '@type': 'Answer', text: 'The conversion step is lossless — no quality is lost going from JPEG to PNG. However, any quality already lost in the original JPEG encoding is permanent. PNG cannot restore that.' } },
        { '@type': 'Question', name: 'Can I add a transparent background after converting to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Not with this converter — it converts the format but does not remove backgrounds. Once you have the PNG, use a tool like Adobe Express, Canva, or remove.bg to remove the background.' } },
        { '@type': 'Question', name: 'Why do designers prefer PNG over JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is preferred for logos, icons, and UI elements because it supports transparency, preserves sharp edges and text, and never degrades quality on re-save. JPEG is preferred for photos where file size matters more than lossless precision.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your JPEG', desc: 'Drag and drop JPEG or JPG files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.' },
  { n: '02', title: 'Output format: PNG', desc: 'The format is set to PNG automatically. PNG is lossless — no quality settings needed. Your image will be exported exactly as-is.' },
  { n: '03', title: 'Download your PNG', desc: 'Your converted PNG file is ready instantly. Download it directly or save the whole batch as a ZIP.' },
];

const FAQS = [
  {
    q: 'Why would I convert a JPG to PNG?',
    a: 'The most common reason is to enable transparency. PNG supports transparent backgrounds, while JPEG does not. If you need to overlay an image onto a different background — for a logo, a watermark, or a design composite — you need PNG. PNG is also lossless, so it does not introduce further compression artefacts when you edit and re-save.',
  },
  {
    q: 'Will converting JPG to PNG improve quality?',
    a: 'No. Converting a JPEG to PNG does not recover quality lost during the original JPEG compression. The PNG output is a lossless snapshot of the current JPEG — no better or worse in terms of pixel quality. But re-saving it as PNG means future edits and re-saves will not introduce additional JPEG degradation.',
  },
  {
    q: 'Is JPG to PNG conversion truly lossless?',
    a: 'The conversion step itself is lossless — no additional quality is lost when going from JPEG to PNG. However, any quality already lost during the original JPEG encoding is permanent and cannot be recovered. PNG will faithfully preserve whatever quality the JPEG currently has.',
  },
  {
    q: 'Will the PNG file be larger than the JPG?',
    a: 'Yes. PNG uses lossless compression, which means files are typically 2–4× larger than their JPEG equivalents for photographs. This is the trade-off for lossless quality and transparency support.',
  },
  {
    q: 'Can I add a transparent background after converting to PNG?',
    a: 'Not with this converter — it converts the format without removing backgrounds. Once you have the PNG, use a background removal tool like Adobe Express, Canva, or remove.bg to make the background transparent.',
  },
  {
    q: 'Why do designers prefer PNG over JPEG for UI work?',
    a: 'PNG is preferred for logos, icons, and UI elements because it supports transparency, preserves sharp text and edges without blurring, and never degrades on re-save. JPEG is preferred for photographs where file size matters more than lossless precision.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple JPGs to PNG at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.',
  },
];

export default function JpgToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .j2p-h1    { opacity: 0; transform: translateY(10px); }
            .j2p-sub   { opacity: 0; transform: translateY(10px); }
            .j2p-trust { opacity: 0; }
          }
          .j2p-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .j2p-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .j2p-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes j2p-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .j2p-fact { animation: j2p-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .j2p-fact:nth-child(1) { animation-delay: 240ms; }
          .j2p-fact:nth-child(2) { animation-delay: 290ms; }
          .j2p-fact:nth-child(3) { animation-delay: 340ms; }
          .j2p-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="j2p-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="j2p-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            JPG to PNG Converter
          </h1>
          <p className="j2p-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Convert JPEG images to lossless PNG format in your browser. Perfect for graphics that need transparency or exact colour reproduction.
          </p>
          <p className="j2p-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/png" />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Lossless PNG output', 'Free with no account required', 'Transparency ready format'].map((fact) => (
                <li key={fact} className="j2p-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Convert JPG to PNG in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why convert JPG to PNG?</h2>
              <p className="mb-3">
                JPEG is the dominant format for photographs because it achieves excellent compression for complex, colour-rich images. But JPEG has one fundamental limitation: it does not support transparency. Every pixel in a JPEG image has a solid colour — there is no concept of a transparent or semi-transparent pixel.
              </p>
              <p>
                PNG, by contrast, supports full alpha channel transparency. This makes PNG the go-to format for logos, icons, watermarks, cutout images, and any graphic that needs to sit over a different background without a white or coloured box around it. Converting your JPG to PNG is the first step to working with transparency.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common reasons to convert JPG to PNG</h2>
              <ul className="space-y-3">
                {[
                  ['Creating logos with transparent backgrounds', 'If you have a logo or graphic as a JPEG and need to remove the background for use in design work, converting to PNG first is required — PNG is the only standard format that supports transparency for static images.'],
                  ['Watermarks and overlays', 'Adding a semi-transparent watermark to photos requires a PNG source file. The converter gives you the PNG you need to work with in your image editor.'],
                  ['Design composites in Photoshop, Figma, or Canva', 'Designers often need PNG assets to layer correctly in design tools. Converting a reference JPEG to PNG ensures it can be positioned over other elements without a white background box.'],
                  ['Preserving quality through multiple edits', 'JPEG re-encodes the image every time you save, introducing progressive compression artefacts. Converting to PNG and working in PNG format means subsequent saves do not degrade the image further.'],
                  ['Screenshots and UI mockups', 'Screenshots of interfaces and app screens look better as PNG — lossless compression preserves sharp text edges and flat colour areas without the blurring that JPEG introduces.'],
                  ['Print production with exact colours', "JPEG's lossy compression can subtly shift colours. For print work where colour accuracy matters — brand materials, packaging, artwork — PNG's lossless compression preserves exact colour values."],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">PNG vs JPEG — quick reference</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">JPEG</th>
                      <th className="text-left px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">PNG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossy', 'Lossless'],
                      ['Transparency', 'Not supported', 'Supported'],
                      ['Best for', 'Photos', 'Logos, UI, graphics'],
                      ['File size', 'Small', 'Larger'],
                      ['Re-save quality loss', 'Yes', 'No'],
                    ].map(([f, j, p]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">{f}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{j}</td>
                        <td className="px-4 py-3 font-medium text-violet-600 dark:text-violet-400">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the conversion works</h2>
              <p>
                When you upload a JPEG, the browser decodes it natively and draws it onto an HTML Canvas element. The canvas is then exported as PNG using lossless compression. Since PNG is lossless, no quality is lost in this conversion step — the PNG captures the exact pixels of the JPEG. No data leaves your device at any point.
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
              The converter uses the {"browser's"} native Canvas API. Your JPEG images are decoded and exported as PNG entirely on your own hardware — nothing is transmitted, stored, or logged.
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about JPG to PNG</h2>
              </div>
              <a
                href="#j2p-tool"
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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/jpg-to-webp', '/png-to-webp', '/webp-to-png']} />
      </main>
    </>
  );
}
