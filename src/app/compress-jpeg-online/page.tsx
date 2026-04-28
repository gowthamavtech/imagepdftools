import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress JPEG Online — Free JPEG Compressor',
  description:
    'Compress JPEG images online for free. Reduce file size while keeping great quality — all processing happens in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/compress-jpeg-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — JPEG Compressor',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online JPEG compressor with quality slider. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress a JPEG image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG or JPG file onto the compressor.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider — lower values produce smaller files.' },
        { '@type': 'HowToStep', text: 'Download your compressed JPEG.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What JPEG quality setting should I use?',
    a: 'For websites and social media, 70–85 is the sweet spot — files are typically 60–75% smaller than quality 100 with virtually no visible quality difference at screen sizes. For print or archival purposes, use 90–95. For thumbnails or previews where quality matters less, 50–65 is acceptable.',
  },
  {
    q: 'Does JPEG compression permanently reduce quality?',
    a: 'Yes. JPEG is a lossy format — each time you compress and re-save a JPEG, some image data is discarded. This is why we recommend keeping the original file and using the compressed version only for the intended purpose (web upload, email, etc.).',
  },
  {
    q: 'What is the difference between this and converting to WebP?',
    a: 'WebP achieves smaller file sizes than JPEG at equivalent visual quality. If you need a JPEG specifically (for a platform requirement, for email compatibility, or for printing), use this compressor. If format does not matter and smallest file size is the goal, convert to WebP instead.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All compression runs in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function CompressJpegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Compress JPEG Online</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Reduce JPEG file sizes by up to 90% with fine-grained quality control. Private,
            fast, and free — nothing ever leaves your device.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is JPEG compression and how does it work?</h2>
              <p className="mb-3">
                JPEG (Joint Photographic Experts Group) is a lossy image compression standard specifically designed for photographs and complex, colour-rich images. It works by dividing the image into 8×8 pixel blocks and applying a Discrete Cosine Transform (DCT) to each block, discarding high-frequency detail that the human eye is less sensitive to. The result is a much smaller file with minimal perceptible quality loss at moderate compression levels.
              </p>
              <p>
                The quality level — typically expressed as a number from 1 to 100 — controls how aggressively the high-frequency data is discarded. At quality 100, very little data is discarded and the file is large. At quality 50, significant data is discarded and artefacts may be visible in fine detail areas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">The right quality setting for every use case</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Quality</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Best for</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Typical size reduction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['90–100', 'Print, archival, portfolios', '10–30%'],
                      ['75–85', 'Web images, social media', '50–75%'],
                      ['60–75', 'Email attachments, previews', '65–80%'],
                      ['40–60', 'Thumbnails, rough previews', '75–90%'],
                    ].map(([q, use, size]) => (
                      <tr key={q} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-violet-600 dark:text-violet-400">{q}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{use}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why compress JPEG images?</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Web performance.</strong> Images account for the majority of page weight on most websites. Compressing JPEG images reduces page load times, improves Core Web Vitals scores, and directly impacts Google search rankings.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Most email providers limit attachments to 10–25 MB. Compressing your JPEG photos before attaching them ensures they send without bouncing.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Upload limits on platforms.</strong> Many platforms — real estate listing sites, job boards, school portals — cap image upload sizes at 1–5 MB. Compressing your images beforehand prevents upload rejections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Storage efficiency.</strong> Whether you are archiving years of photos on a hard drive or filling up cloud storage, compressed JPEGs mean you can store more images in the same space.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Faster sharing on mobile data.</strong> Sending large JPEG files over WhatsApp, Telegram, or iMessage consumes significant mobile data. Compressing first makes sharing faster and cheaper.</li>
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

        <RelatedTools hrefs={['/compress-image', '/reduce-image-size', '/convert-image-to-webp', '/compress-png-online']} />
      </main>
    </>
  );
}
