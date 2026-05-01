import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress Image Online — Free Image Compressor',
  description:
    'Compress JPEG, PNG, WebP and SVG images instantly in your browser. No uploads, no server, 100% private and free.',
  alternates: { canonical: 'https://imagepdf.tools/compress-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Compressor',
      url: 'https://imagepdf.tools/compress-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to compress an image online',
      step: [
        { '@type': 'HowToStep', text: 'Drag and drop your image onto the drop zone or click to browse.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control compression level.' },
        { '@type': 'HowToStep', text: 'Click Download to save your compressed image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much can I compress an image without losing quality?',
          acceptedAnswer: { '@type': 'Answer', text: 'For JPEG and WebP, compressing at quality 75–85 typically reduces file size by 60–75% with no perceptible quality loss at normal screen viewing sizes. PNG compressed with pngquant achieves 40–70% reduction. The comparison slider lets you see the difference before downloading.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a file size limit?',
          acceptedAnswer: { '@type': 'Answer', text: 'The free tier supports images up to 50 MB each. Pro users have no file size limit. All processing happens locally in your browser regardless of file size.' },
        },
        {
          '@type': 'Question',
          name: 'Can I compress multiple images at once?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 images at once on the Free tier. Pro users can compress unlimited images in a single batch and download them all as a ZIP.' },
        },
        {
          '@type': 'Question',
          name: 'Is my image uploaded to a server?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device — we never see them.' },
        },
        {
          '@type': 'Question',
          name: 'Can I compare the original and compressed image?',
          acceptedAnswer: { '@type': 'Answer', text: 'After compression, each image card shows the original and compressed file sizes with the percentage reduction. Click the image to open the before/after comparison slider.' },
        },
      ],
    },
  ],
};

export default function CompressImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            100% Browser-Based &middot; Zero Uploads
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Compress Images{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Reduce JPEG, PNG, WebP and SVG file sizes right in your browser. Nothing is ever
            uploaded to a server.
          </p>

          <div className="flex justify-center gap-6 sm:gap-10 text-sm mb-10">
            {[
              { value: 'Free',      label: 'Forever' },
              { value: '100%',      label: 'Private' },
              { value: '5 formats', label: 'Supported' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-bold text-violet-400 text-base sm:text-lg">{value}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>

          <div className="text-left">
            <CompressorUI />
          </div>
        </div>

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-4">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is image compression and why does it matter?</h2>
              <p className="mb-3">
                Image compression reduces the file size of an image by discarding or encoding redundant pixel data more efficiently. A photo from a modern smartphone can be 6–15 MB — far too large for most web, email, or social media use. Compressing it brings the file size down to 200 KB–1 MB while keeping the image visually indistinguishable from the original at screen sizes.
              </p>
              <p>
                For websites, image compression is one of the highest-impact performance optimisations available. Images are typically the largest assets on a web page, and their file size directly affects how fast the page loads — which in turn affects Google search rankings through Core Web Vitals metrics like Largest Contentful Paint (LCP).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When to compress images — and why</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Websites and landing pages.</strong> Every extra kilobyte increases page load time. A 3 MB hero image compressed to 200 KB loads 15× faster — and Google notices. Compress every image before uploading to your CMS.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Gmail limits attachments to 25 MB; Outlook to 20 MB. A batch of uncompressed photos can easily exceed those limits. Compressing first makes attachments send reliably.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Social media uploads.</strong> Instagram, Facebook, and Twitter recompress images automatically on upload — often degrading quality further. Uploading a pre-compressed image at the right size gives you control over the final quality the platform produces.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">E-commerce product photos.</strong> Shopify, WooCommerce, and Amazon require fast-loading product images. Compressing product photos reduces page load time, lowers bounce rate, and improves conversion.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">WhatsApp and messaging apps.</strong> Messaging apps automatically compress images, often making them blurry. Sending a pre-compressed image at 80–85% quality preserves more detail than letting the app crush it automatically.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Cloud storage and backups.</strong> Storing thousands of uncompressed photos in Google Photos, iCloud, or Dropbox consumes gigabytes of storage. Compressing before backup extends free storage for years.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Online marketplaces and listings.</strong> eBay, Etsy, and classified platforms impose image size limits on listings. Compressing photos before upload prevents rejection errors and speeds up the listing process.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">JPEG, PNG, WebP, SVG — which format should you use?</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Format</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Best for</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Transparency</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Compression</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['JPEG', 'Photographs, complex images', '✗', 'Lossy — very small'],
                      ['PNG', 'Logos, icons, screenshots', '✓', 'Lossless — larger'],
                      ['WebP', 'Web images (all types)', '✓', 'Lossy/lossless — smallest'],
                      ['SVG', 'Vector graphics, icons', '✓', 'Vector — scalable'],
                    ].map(([fmt, best, trans, comp]) => (
                      <tr key={fmt} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">{fmt}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{best}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{trans}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{comp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How to choose the right quality setting</h2>
              <p className="mb-3">
                The quality slider controls how aggressively the image is compressed. Lower values produce smaller files with more visible compression artefacts; higher values produce larger files with better quality.
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Quality 90–100:</strong> Near-lossless. Use for print, archival, or professional photography deliverables where quality cannot be compromised.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Quality 75–85:</strong> The web sweet spot. Typically reduces file size by 60–75% with virtually no visible quality loss at screen sizes. Recommended for most use cases.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Quality 60–75:</strong> Good for email thumbnails, social media previews, and contexts where bandwidth matters more than pixel-perfect quality.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Quality below 60:</strong> Aggressive compression with visible artefacts. Suitable only for very small thumbnails or situations where file size is the sole priority.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the image compressor works</h2>
              <p className="mb-3">
                This tool compresses images entirely inside your browser — no file is ever uploaded to a server. Here is what happens when you drop an image:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">JPEG and WebP:</strong> The image is drawn onto an HTML Canvas element and re-exported using the browser&apos;s built-in JPEG or WebP encoder at the quality level you choose. This is the same encoder used by Chrome and other browsers natively.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">PNG:</strong> The image is processed using <strong>pngquant</strong> compiled to WebAssembly — the same algorithm used by TinyPNG. It reduces the colour palette from 16.7 million colours to 256 using quantisation, typically achieving 40–70% size reduction.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">SVG:</strong> SVG files are optimised by removing unnecessary metadata, whitespace, and redundant path data from the XML.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How much can I compress an image without losing quality?',
                    a: 'For JPEG and WebP, compressing at quality 75–85 typically reduces file size by 60–75% with no perceptible quality loss at normal screen viewing sizes. PNG compressed with pngquant achieves 40–70% reduction. The comparison slider lets you see the difference before downloading.',
                  },
                  {
                    q: 'Is there a file size limit?',
                    a: 'The free tier supports images up to 50 MB each. Pro users have no file size limit. All processing happens locally in your browser regardless of file size.',
                  },
                  {
                    q: 'Can I compress multiple images at once?',
                    a: 'Yes. Drop up to 5 images at once on the Free tier. Pro users can compress unlimited images in a single batch and download them all as a ZIP.',
                  },
                  {
                    q: 'Is my image uploaded to a server?',
                    a: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device — we never see them.',
                  },
                  {
                    q: 'Can I compare the original and compressed image?',
                    a: 'Yes. After compression, each image card shows the original and compressed file sizes with the percentage reduction. Click the image to open the before/after comparison slider.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/compress-png-online', '/compress-jpeg-online', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
