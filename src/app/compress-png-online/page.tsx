import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress PNG Online — Free PNG Compressor',
  description:
    'Reduce PNG file size online for free. No upload needed — compression happens in your browser.',
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
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control how aggressively the PNG is compressed.' },
        { '@type': 'HowToStep', text: 'Download your compressed PNG — typically 40–70% smaller.' },
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
    q: 'Should I use PNG compression or convert to JPEG?',
    a: 'If your image has transparency or is a logo/icon with flat colours, compress the PNG. If your image is a photograph without transparency, converting to JPEG or WebP will give you a much smaller file than any PNG compressor can achieve.',
  },
  {
    q: 'Is my PNG uploaded to a server?',
    a: 'No. The pngquant compression runs in your browser as a WebAssembly module. Your file never leaves your device.',
  },
];

export default function CompressPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Compress PNG Online</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Shrink PNG files by up to 80% using advanced quantisation — all inside your browser.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why is PNG so large — and how do you make it smaller?</h2>
              <p className="mb-3">
                PNG uses lossless compression, which means every single pixel is preserved exactly. This is great for quality but results in much larger files than JPEG or WebP for photographic content. A 4000 × 3000 px photograph saved as PNG might be 8–15 MB, compared to 1–3 MB as JPEG at equivalent visual quality.
              </p>
              <p>
                The standard way to compress a PNG without converting it to another format is <strong className="text-slate-800 dark:text-slate-200">colour quantisation</strong> — reducing the number of unique colours from 16.7 million (24-bit true colour) down to 256 (8-bit indexed colour). For most images, especially logos, icons, screenshots, and graphics with flat colour areas, this reduction is nearly imperceptible.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When to compress PNG vs. convert to JPEG or WebP</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Compress the PNG</strong> when your image has transparency, is a logo, icon, illustration, or screenshot, or when you specifically need PNG format for a workflow or platform requirement.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to JPEG</strong> when the image is a photograph with no transparency and file size is more important than format. JPEG can achieve far smaller file sizes than PNG compression for photographic content.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Convert to WebP</strong> when the image will be used on a website and you want the smallest file size with the best quality — WebP outperforms both PNG and JPEG in most cases.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How our PNG compressor works</h2>
              <p>
                This tool runs <strong className="text-slate-800 dark:text-slate-200">pngquant</strong> as a WebAssembly module directly in your browser. pngquant is the same open-source algorithm used by TinyPNG, Squoosh, and most professional image optimisation pipelines. It uses a modified median cut algorithm to find the optimal 256-colour palette for each image, minimising the visual difference between the original and the quantised result. The entire process runs locally — no data is ever uploaded to a server.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases for PNG compression</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Website performance.</strong> Large PNG files slow down page load times and hurt Core Web Vitals scores. Compressing PNGs reduces the bytes the browser must download.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">App and game development.</strong> Sprite sheets, UI assets, and texture atlases in PNG format must be as small as possible to minimise app bundle size and load times.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email signature images and logos.</strong> Email clients display embedded images; large PNGs can cause emails to load slowly or be flagged by spam filters. A compressed PNG logo under 100 KB loads instantly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Documentation and presentations.</strong> Screenshots and diagram exports saved as PNG are often much larger than needed. Compressing them before embedding in a PDF or slide deck reduces the document size.</li>
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

        <RelatedTools hrefs={['/compress-image', '/convert-png-to-jpeg', '/convert-image-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
