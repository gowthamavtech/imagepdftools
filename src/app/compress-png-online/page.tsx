import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress PNG Online — Free PNG Compressor',
  description:
    'Compress PNG files online for free — up to 80% smaller using pngquant lossy quantisation. No upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-png-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG Compressor',
      url: 'https://imagepdf.tools/compress-png-online',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PNG compressor using pngquant WASM. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress a PNG image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the compressor.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control compression aggressiveness.' },
        { '@type': 'HowToStep', text: 'Download your compressed PNG — typically 40–80% smaller.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How does PNG compression work?', acceptedAnswer: { '@type': 'Answer', text: 'This tool uses pngquant, the industry-standard lossy PNG compression algorithm. It reduces the number of colours in the image from 16.7 million (24-bit) to 256 (8-bit) using a technique called quantisation. The result is a smaller file that looks nearly identical to the original at normal viewing sizes.' } },
        { '@type': 'Question', name: 'Will lossy compression ruin my PNG?', acceptedAnswer: { '@type': 'Answer', text: 'At quality settings above 70, the visual difference between the original and the compressed PNG is virtually imperceptible on screen. At lower settings, you may notice slight banding in gradients or flat colour areas. The quality slider lets you find the right balance for your use case.' } },
        { '@type': 'Question', name: 'Should I compress PNG or convert to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'If your image has transparency or is a logo/icon with flat colours, compress the PNG. If your image is a photograph without transparency, converting to JPEG or WebP will give you a much smaller file than any PNG compressor can achieve.' } },
        { '@type': 'Question', name: 'Is my PNG uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The pngquant compression runs in your browser as a WebAssembly module. Your PNG file never leaves your device — not even temporarily.' } },
        { '@type': 'Question', name: 'Can I compress multiple PNGs at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Does compressing a PNG preserve transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. pngquant preserves alpha-channel transparency during compression. Logos and icons with transparent backgrounds will retain their transparency after compression.' } },
        { '@type': 'Question', name: 'How much file size reduction should I expect?', acceptedAnswer: { '@type': 'Answer', text: 'Typical reduction is 40–80% depending on the image content. Flat-colour graphics and logos compress better than photographs. Photos with complex colour gradients compress less because the palette reduction is more visible.' } },
        { '@type': 'Question', name: 'What is the difference between compressing PNG and converting to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Compressing the PNG keeps it as a PNG — useful when you need PNG format for compatibility or transparency. Converting to WebP typically achieves an additional 25–50% size reduction on top of pngquant compression, at the cost of changing the format.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your PNG',
    desc: 'Drag a PNG file onto the zone or click to browse. Up to 50 MB per file. Transparency is preserved.',
  },
  {
    n: '02',
    title: 'Set the quality level',
    desc: 'pngquant runs in your browser via WebAssembly. Higher quality preserves more colour depth.',
  },
  {
    n: '03',
    title: 'Download your smaller PNG',
    desc: 'Typically 40–80% smaller than the original. Transparency preserved. Nothing sent to any server.',
  },
];

const FAQS = [
  {
    q: 'How does PNG compression work?',
    a: 'This tool uses pngquant, the industry-standard lossy PNG compression algorithm. It reduces the number of colours in the image from 16.7 million (24-bit) to 256 (8-bit) using a technique called quantisation. The result is a smaller file that looks nearly identical to the original at normal viewing sizes.',
  },
  {
    q: 'Will lossy compression ruin my PNG?',
    a: 'At quality settings above 70, the visual difference between the original and the compressed PNG is virtually imperceptible on screen. At lower settings, you may notice slight banding in gradients or flat colour areas. The quality slider lets you find the right balance for your use case.',
  },
  {
    q: 'Should I compress PNG or convert to JPEG?',
    a: 'If your image has transparency or is a logo/icon with flat colours, compress the PNG. If your image is a photograph without transparency, converting to JPEG or WebP will give you a much smaller file than any PNG compressor can achieve.',
  },
  {
    q: 'Is my PNG uploaded to a server?',
    a: 'No. The pngquant compression runs in your browser as a WebAssembly module. Your PNG file never leaves your device — not even temporarily.',
  },
  {
    q: 'Can I compress multiple PNGs at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.',
  },
  {
    q: 'Does compressing a PNG preserve transparency?',
    a: 'Yes. pngquant preserves alpha-channel transparency during compression. Logos and icons with transparent backgrounds will retain their transparency after compression.',
  },
  {
    q: 'How much file size reduction should I expect?',
    a: 'Typical reduction is 40–80% depending on the image content. Flat-colour graphics and logos compress better than photographs. Photos with complex colour gradients compress less because the palette reduction is more visible.',
  },
  {
    q: 'What is the difference between compressing PNG and converting to WebP?',
    a: 'Compressing the PNG keeps it as a PNG — useful when you need PNG format for compatibility or transparency. Converting to WebP typically achieves an additional 25–50% size reduction on top of pngquant compression, at the cost of changing the format.',
  },
];

export default function CompressPngPage() {
  return (
    <>
      {/* Page-load entrance animations — CSS only, respects prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cpng-h1  { opacity: 0; transform: translateY(10px); }
            .cpng-sub { opacity: 0; transform: translateY(10px); }
            .cpng-trust { opacity: 0; }
          }
          .cpng-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cpng-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cpng-trust {
            transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms;
          }
          @keyframes cpng-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .cpng-fact { animation: cpng-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .cpng-fact:nth-child(1) { animation-delay: 240ms; }
          .cpng-fact:nth-child(2) { animation-delay: 290ms; }
          .cpng-fact:nth-child(3) { animation-delay: 340ms; }
          .cpng-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div id="png-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="cpng-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Compress PNG Online
          </h1>
          <p className="cpng-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Shrink PNG files by up to 80% using pngquant lossy colour quantisation — the same algorithm behind TinyPNG. Runs entirely in your browser. Nothing uploaded.
          </p>
          <p className="cpng-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        <div className="text-left">
          <CompressorUI
            initialFormat="image/png"
            dropLabel="Drop your PNG files here"
            dropHint="PNG files only · up to 50 MB each · transparency preserved"
            dropFileTypeName="PNG"
            dropAccept={['image/png']}
          />
        </div>

        {/* ── Trust strip ──────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {[
                'Zero bytes sent to any server',
                'pngquant WASM runs on your CPU',
                'Free with no account required',
                'Transparency fully preserved',
              ].map((fact) => (
                <li key={fact} className="cpng-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section
          aria-labelledby="cpng-how-heading"
          className="bg-[#F7F8FC] dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="cpng-how-heading"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-10"
            >
              Three steps. Under 10 seconds.
            </h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}
                >
                  <span
                    className="block text-[11px] font-bold tracking-[0.16em] mb-3"
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content block ────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Why is PNG so large — and how do you make it smaller?
              </h2>
              <p className="mb-3">
                PNG uses lossless compression, meaning every pixel is preserved exactly. This is great for quality but results in much larger files than JPEG or WebP for photographic content. A 4000 × 3000 px photo saved as PNG can easily be 8–15 MB versus 1–3 MB as JPEG at equivalent quality.
              </p>
              <p>
                The standard way to compress a PNG without converting it is <strong className="text-slate-800 dark:text-slate-200">colour quantisation</strong> — reducing unique colours from 16.7 million (24-bit) down to 256 (8-bit indexed). For logos, icons, screenshots, and flat-colour graphics, this reduction is nearly invisible to the human eye.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                When to compress PNG vs. convert to JPEG or WebP
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Compress the PNG</strong> when your image has transparency, is a logo, icon, illustration, or screenshot, or when you specifically need PNG format.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to JPEG</strong> when the image is a photograph with no transparency and file size matters most — JPEG achieves far smaller files than PNG compression for photos.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to WebP</strong> when the image is for a website — WebP outperforms both PNG and JPEG in most cases while supporting transparency.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                How the PNG compressor works
              </h2>
              <p>
                This tool runs <strong className="text-slate-800 dark:text-slate-200">pngquant</strong> as a WebAssembly module directly in your browser — the same open-source algorithm used by TinyPNG, Squoosh, and professional image optimisation pipelines. It uses a modified median-cut algorithm to find the optimal 256-colour palette for each image, minimising visible quality loss. The entire process is local — no PNG data is ever sent to any server.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Common use cases for PNG compression
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website performance.</strong> Large PNGs slow page load times and hurt Core Web Vitals scores. Compressing them reduces bytes the browser must download.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">App and game development.</strong> Sprite sheets, UI assets, and texture atlases must be as small as possible to minimise bundle size and load times.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email logos and signatures.</strong> Large embedded PNGs can cause emails to load slowly or trigger spam filters. A compressed PNG logo under 100 KB loads instantly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Docs and presentations.</strong> Screenshots and diagram exports saved as PNG are often oversized. Compressing before embedding in PDFs or slide decks reduces the document file size significantly.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Privacy callout ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: 'oklch(70% 0.158 293)' }}
            >
              Privacy by architecture
            </p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
              Your files never leave your browser.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch] mb-6">
              pngquant runs as a WebAssembly module compiled directly into the page. There is no server-side component — no upload endpoint, no remote processing, no data retained. Your PNG is compressed on your own CPU and downloaded directly to your device.
            </p>
            <ul className="space-y-2.5">
              {[
                'No file data transmitted over the network at any point',
                'No account, sign-in, or email required to use any feature',
                'Closing the tab clears all data from browser memory completely',
                'Open-source processing: pngquant WebAssembly',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Mid-page nudge ────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-[#F7F8FC] dark:bg-[#0C0C1A] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The compressor is at the top of this page.
          </p>
          <a
            href="#png-tool"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
            style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cpng-faq-heading"
          className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 id="cpng-faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">
              Frequently asked questions
            </h2>
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

        <RelatedTools hrefs={['/compress-image', '/convert-png-to-jpeg', '/png-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
