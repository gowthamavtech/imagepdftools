import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Reduce Image Size Online — Free Image Resizer & Compressor',
  description:
    'Reduce image size online for free. Compress JPEG, PNG, and WebP images without losing quality. All processing happens in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/reduce-image-size' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Reduce Image Size',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to reduce image file size for JPEG, PNG, and WebP. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to reduce image size online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the tool.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control the degree of compression.' },
        { '@type': 'HowToStep', text: 'Download your smaller image file.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'How much can you reduce image size without losing quality?',
    a: 'For JPEG and WebP images, you can typically reduce file size by 60–80% at quality 75–85 with minimal visible quality loss at screen sizes. PNG can be reduced by 40–70% using colour quantisation. The quality slider lets you find the right balance.',
  },
  {
    q: 'What is the difference between reducing image size and resizing an image?',
    a: 'Reducing image size (compression) makes the file smaller in kilobytes while keeping the same pixel dimensions. Resizing changes the pixel dimensions — the canvas size — which also makes the file smaller but changes how large the image appears. For web performance, you often want both: resize to the correct display dimensions, then compress to reduce the file size further.',
  },
  {
    q: 'Which format gives the smallest file size?',
    a: 'WebP typically produces the smallest files — 25–35% smaller than JPEG and 25% smaller than PNG at equivalent quality. If you are not restricted to a specific format, converting to WebP will give you the smallest file.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All compression happens in your browser using the Canvas API and pngquant WASM for PNG. Your file never leaves your device.',
  },
];

export default function ReduceImageSizePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">Reduce Image Size Online</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Make your images smaller for web, email, or social media. Supports JPEG, PNG, and WebP
            — no account required.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why is reducing image size important?</h2>
              <p className="mb-3">
                Image file sizes have grown dramatically as camera sensors have improved. A photo from a modern smartphone is often 4–10 MB. While this resolution is excellent for printing, it is far more than needed for web use, email, or social media — and sending or uploading oversized images creates friction at every step.
              </p>
              <p>
                Reducing image size eliminates that friction: images attach to emails without rejection, upload to platforms without errors, load faster on web pages, and transfer more quickly over mobile networks.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">The most common situations where image size matters</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Gmail limits attachments to 25 MB; Outlook to 20 MB. But even within those limits, large images slow down delivery and frustrate recipients. A 2 MB image is universally easier to work with than an 8 MB original.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Website uploads.</strong> WordPress, Squarespace, Wix, and most CMS platforms have upload size limits (often 2–10 MB). Reducing image size before uploading avoids rejected uploads and keeps your media library manageable.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Social media.</strong> Instagram, Facebook, Twitter, and LinkedIn recompress images on upload, often degrading quality. Uploading a pre-compressed image at an appropriate size gives you more control over the final quality the platform produces.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Messaging apps.</strong> WhatsApp compresses images automatically, often significantly. Sharing a pre-compressed image at a reasonable size preserves more detail than letting the app crush it.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Online marketplaces.</strong> eBay, Etsy, Amazon, and other selling platforms have image size limits for listings. Reducing image size ensures your product photos upload correctly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Web performance and SEO.</strong> Google uses page speed as a ranking factor. The largest images on a page directly affect Largest Contentful Paint (LCP) — a Core Web Vital. Smaller images load faster and improve your search ranking.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Cloud storage management.</strong> If you back up photos to Google Photos, iCloud, or Dropbox, reducing image sizes before backup can save gigabytes of storage over time.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How to get the best results</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li>For photos (JPEG, WebP): start at quality 80. Compare the original and compressed versions. If they look identical, try 70. Most people cannot see a difference between quality 75 and 100 on screen.</li>
                <li>For graphics, logos, and screenshots (PNG): the compressor uses colour quantisation. Start at quality 80 for transparent PNGs; you can often go lower for solid-colour graphics.</li>
                <li>If you need the absolute smallest file and format is flexible, try converting to WebP — it almost always produces smaller files than compressed JPEG or PNG.</li>
                <li>Always keep the original file. Compress a copy. Lossy compression is irreversible.</li>
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

        <RelatedTools hrefs={['/compress-image', '/compress-jpeg-online', '/compress-png-online', '/resize-image']} />
      </main>
    </>
  );
}
