import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress JPEG Online — Free JPEG Compressor',
  description:
    'Compress JPEG images online for free — up to 90% smaller with fine-grained quality control. No upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-jpeg-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPEG Compressor',
      url: 'https://imagepdf.tools/compress-jpeg-online',
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What JPEG quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'For websites and social media, 70–85 is the sweet spot — files are typically 60–75% smaller than quality 100 with virtually no visible difference at screen sizes. For print or archival, use 90–95. For thumbnails or previews, 50–65 is acceptable.' } },
        { '@type': 'Question', name: 'Does JPEG compression permanently reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JPEG is a lossy format — each time you compress and re-save a JPEG, some image data is discarded. Keep the original file and use the compressed version only for its intended purpose (web, email, etc.).' } },
        { '@type': 'Question', name: 'What is the difference between this and converting to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'WebP achieves smaller file sizes than JPEG at equivalent visual quality. If you need a JPEG specifically — for a platform requirement, email compatibility, or printing — use this compressor. If format does not matter, converting to WebP will give you an even smaller file.' } },
        { '@type': 'Question', name: 'Is my JPEG uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All compression runs in your browser using the Canvas API. Your file never leaves your device — not even temporarily.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What JPEG quality setting should I use?',
    a: 'For websites and social media, 70–85 is the sweet spot — files are typically 60–75% smaller than quality 100 with virtually no visible difference at screen sizes. For print or archival, use 90–95. For thumbnails or previews, 50–65 is acceptable.',
  },
  {
    q: 'Does JPEG compression permanently reduce quality?',
    a: 'Yes. JPEG is a lossy format — each time you compress and re-save a JPEG, some image data is discarded. Keep the original file and use the compressed version only for its intended purpose (web, email, etc.).',
  },
  {
    q: 'What is the difference between this and converting to WebP?',
    a: 'WebP achieves smaller file sizes than JPEG at equivalent visual quality. If you need a JPEG specifically — for a platform requirement, email compatibility, or printing — use this compressor. If format does not matter, converting to WebP will give you an even smaller file.',
  },
  {
    q: 'Is my JPEG uploaded to a server?',
    a: 'No. All compression runs in your browser using the Canvas API. Your file never leaves your device — not even temporarily.',
  },
];

export default function CompressJpegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">

        {/* ── Hero ── */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Compress{' '}
            <span className="italic bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
              JPEG
            </span>
            {' '}Online
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
            Reduce JPEG file sizes by up to 90% with fine-grained quality control. Uses the Canvas API directly in your browser — nothing uploaded, nothing sent to any server.
          </p>

          {/* Format pill */}
          <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-5 py-2 mb-4 shadow-sm">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-full">
              JPEG in
            </span>
            <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-sm font-semibold text-white bg-violet-600 px-2.5 py-1 rounded-full">
              Smaller JPEG out
            </span>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 mb-10 text-left">
            {[
              { n: '1', text: 'Drop your JPEG or JPG file below' },
              { n: '2', text: 'Adjust the quality slider — higher = better quality, larger file' },
              { n: '3', text: 'Click Compress All, then download your optimised JPEG' },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {n}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left">
          <CompressorUI
            initialFormat="image/jpeg"
            dropLabel="Drop your JPEG files here"
            dropHint="JPEG · JPG files · up to 50 MB each"
            dropFileTypeName="JPEG"
            dropAccept={['image/jpeg', 'image/jpg']}
          />
        </div>

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-24 mt-8">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is JPEG compression and how does it work?</h2>
              <p className="mb-3">
                JPEG is a lossy image compression standard designed for photographs and colour-rich images. It divides the image into 8×8 pixel blocks and applies a Discrete Cosine Transform (DCT) to each block, discarding high-frequency detail the human eye is less sensitive to. The result is a much smaller file with minimal perceptible quality loss at moderate compression levels.
              </p>
              <p>
                The quality level — expressed as a number from 1 to 100 — controls how aggressively the high-frequency data is discarded. At quality 100, the file is large. At quality 50, significant data is discarded and artefacts may be visible in fine detail areas.
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
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Typical reduction</th>
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
                <li><strong className="text-slate-800 dark:text-slate-200">Web performance.</strong> Images account for most of the page weight on websites. Compressing JPEGs reduces load times, improves Core Web Vitals scores, and directly impacts Google rankings.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Most email providers limit attachments to 10–25 MB. Compressing your photos before attaching ensures they send without bouncing.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Platform upload limits.</strong> Real estate listing sites, job boards, and school portals often cap image uploads at 1–5 MB. Compressing first prevents upload rejections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Storage efficiency.</strong> Whether archiving photos on a hard drive or in cloud storage, compressed JPEGs let you store more images in the same space.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Faster sharing on mobile.</strong> Sending large JPEGs over WhatsApp, Telegram, or iMessage consumes significant mobile data. Compressing first makes sharing faster and cheaper.</li>
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
