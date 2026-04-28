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
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — PNG Compressor',
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
  ],
};

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
];

export default function CompressPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">

        {/* ── Hero ── */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Compress{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              PNG
            </span>
            {' '}Online
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
            Shrink PNG files by up to 80% using <strong className="text-slate-700 dark:text-slate-300 font-semibold">pngquant</strong> lossy colour quantisation — the same algorithm behind TinyPNG. Runs entirely inside your browser. Nothing uploaded.
          </p>

          {/* Format pill */}
          <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-5 py-2 mb-4 shadow-sm">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-full">
              PNG in
            </span>
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-sm font-semibold text-white bg-blue-600 px-2.5 py-1 rounded-full">
              Smaller PNG out
            </span>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 mb-10 text-left">
            {[
              { n: '1', text: 'Drop your PNG file below' },
              { n: '2', text: 'Adjust the quality slider — higher = better quality, larger file' },
              { n: '3', text: 'Click Compress All, then download your optimised PNG' },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {n}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{text}</span>
              </div>
            ))}
          </div>
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

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why is PNG so large — and how do you make it smaller?</h2>
              <p className="mb-3">
                PNG uses lossless compression, meaning every pixel is preserved exactly. This is great for quality but results in much larger files than JPEG or WebP for photographic content. A 4000 × 3000 px photo saved as PNG can easily be 8–15 MB versus 1–3 MB as JPEG at equivalent quality.
              </p>
              <p>
                The standard way to compress a PNG without converting it is <strong className="text-slate-800 dark:text-slate-200">colour quantisation</strong> — reducing unique colours from 16.7 million (24-bit) down to 256 (8-bit indexed). For logos, icons, screenshots, and flat-colour graphics, this reduction is nearly invisible to the human eye.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When to compress PNG vs. convert to JPEG or WebP</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Compress the PNG</strong> when your image has transparency, is a logo, icon, illustration, or screenshot, or when you specifically need PNG format.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to JPEG</strong> when the image is a photograph with no transparency and file size matters most — JPEG achieves far smaller files than PNG compression for photos.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to WebP</strong> when the image is for a website — WebP outperforms both PNG and JPEG in most cases while supporting transparency.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How our PNG compressor works</h2>
              <p>
                This tool runs <strong className="text-slate-800 dark:text-slate-200">pngquant</strong> as a WebAssembly module directly in your browser — the same open-source algorithm used by TinyPNG, Squoosh, and professional image optimisation pipelines. It uses a modified median-cut algorithm to find the optimal 256-colour palette for each image, minimising visible quality loss. The entire process is local — no PNG data is ever sent to any server.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases for PNG compression</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website performance.</strong> Large PNGs slow page load times and hurt Core Web Vitals scores. Compressing them reduces bytes the browser must download.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">App and game development.</strong> Sprite sheets, UI assets, and texture atlases must be as small as possible to minimise bundle size and load times.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email logos and signatures.</strong> Large embedded PNGs can cause emails to load slowly or trigger spam filters. A compressed PNG logo under 100 KB loads instantly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Docs and presentations.</strong> Screenshots and diagram exports saved as PNG are often oversized. Compressing before embedding in PDFs or slide decks reduces the document file size significantly.</li>
              </ul>
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

        <RelatedTools hrefs={['/compress-image', '/convert-png-to-jpeg', '/png-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
