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
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — JPG to PNG Converter',
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
        { '@type': 'HowToStep', text: 'Select PNG as the output format.' },
        { '@type': 'HowToStep', text: 'Download your converted PNG file instantly.' },
      ],
    },
  ],
};

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
    q: 'Will the PNG file be larger than the JPG?',
    a: 'Yes. PNG uses lossless compression, which means the files are typically 2–4× larger than their JPEG equivalents for photographs. This is the trade-off for lossless quality and transparency support.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple JPGs to PNG at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.',
  },
];

export default function JpgToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            JPG to PNG <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Convert JPEG images to lossless PNG format in your browser. Perfect for graphics that need transparency or exact colour reproduction.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert JPG to PNG?</h2>
              <p className="mb-3">
                JPEG is the dominant format for photographs because it achieves excellent compression for complex, colour-rich images. But JPEG has one fundamental limitation: it does not support transparency. Every pixel in a JPEG image has a solid colour — there is no concept of a transparent or semi-transparent pixel.
              </p>
              <p>
                PNG, by contrast, supports full alpha channel transparency. This makes PNG the go-to format for logos, icons, watermarks, cutout images, and any graphic that needs to sit over a different background without a white or coloured box around it. Converting your JPG to PNG is the first step to working with transparency.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common reasons to convert JPG to PNG</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Creating logos and graphics with transparent backgrounds.</strong> If you have a logo or graphic as a JPEG and need to remove the background for use in design work, converting to PNG first is required — PNG is the only standard format that supports transparency for static images.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Watermarks and overlays.</strong> Adding a semi-transparent watermark to photos requires a PNG source file. The converter gives you the PNG you need to work with in your image editor.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Design composites in Photoshop, Figma, or Canva.</strong> Designers often need PNG assets to layer correctly in design tools. Converting a reference JPEG to PNG ensures it can be positioned over other elements without a white background box.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Preserving quality through multiple edits.</strong> JPEG re-encodes the image every time you save, introducing progressive compression artefacts. Converting to PNG and working in PNG format means subsequent saves do not degrade the image further.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Screenshots and UI mockups.</strong> Screenshots of interfaces, dashboards, or app screens often look better as PNG — the lossless compression preserves sharp text edges and flat colour areas without the blurring that JPEG introduces.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Print production with exact colours.</strong> JPEG uses lossy compression that can subtly shift colours. For print work where colour accuracy matters — brand materials, packaging, artwork — PNG&apos;s lossless compression preserves exact colour values.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">PNG vs JPEG — quick reference</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">JPEG</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">PNG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Compression', 'Lossy', 'Lossless'],
                      ['Transparency', '✗ No', '✓ Yes'],
                      ['Best for', 'Photos', 'Logos, UI, graphics'],
                      ['File size', 'Small', 'Larger'],
                      ['Re-save quality loss', 'Yes', 'No'],
                    ].map(([f, j, p]) => (
                      <tr key={f} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">{f}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{j}</td>
                        <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/convert-image-to-webp', '/compress-image', '/remove-metadata']} />
      </main>
    </>
  );
}
