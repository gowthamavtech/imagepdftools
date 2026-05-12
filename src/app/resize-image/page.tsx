import type { Metadata } from 'next';
import { ImageResizeUI } from '@/components/ImageResizeUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Resize Image Online — Free & Private | ImagePDF.Tools',
  description: 'Resize any image to exact pixel dimensions in your browser. Lock aspect ratio, use presets like HD or 4K, or enter custom width and height. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/resize-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Resizer',
      url: 'https://imagepdf.tools/resize-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image resizer. Set exact pixel dimensions, lock aspect ratio, or use preset sizes. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to resize an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your image by dropping it onto the resize tool.' },
        { '@type': 'HowToStep', text: 'Enter your desired width and height in pixels, or choose a preset.' },
        { '@type': 'HowToStep', text: 'Click Resize and download your resized image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the difference between resizing and cropping?', acceptedAnswer: { '@type': 'Answer', text: 'Resizing scales the entire image — all pixels are kept but scaled up or down to the new dimensions. Cropping removes pixels outside a selected region without scaling. Use resize to change the canvas size; use crop to change the composition.' } },
        { '@type': 'Question', name: 'Will resizing reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'Shrinking an image (downscaling) produces very good results with minimal quality loss. Enlarging an image (upscaling) beyond its original dimensions will result in some blurring because new pixel information is interpolated. For best results, start with the largest version of the image available.' } },
        { '@type': 'Question', name: 'Can I resize to a specific file size rather than pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool which lets you control quality and file size output directly.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'What is the maximum dimensions I can resize to?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit enforced by the tool, but browsers have memory constraints. Very large output dimensions (above 10,000 × 10,000 pixels) may cause the browser tab to slow down on lower-spec devices.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is the difference between resizing and cropping?',
    a: 'Resizing scales the entire image — all pixels are kept but scaled up or down to the new dimensions. Cropping removes pixels outside a selected region without scaling. Use resize to change the canvas size; use crop to change the composition.',
  },
  {
    q: 'Will resizing reduce image quality?',
    a: 'Shrinking an image (downscaling) produces very good results with minimal quality loss. Enlarging an image (upscaling) beyond its original dimensions will result in some blurring because new pixel information is interpolated. For best results, start with the largest version of the image available.',
  },
  {
    q: 'Can I resize to a specific file size rather than pixel dimensions?',
    a: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool which lets you control quality and file size output directly.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'What is the maximum dimensions I can resize to?',
    a: 'There is no hard limit enforced by the tool, but browsers have memory constraints. Very large output dimensions (above 10,000 × 10,000 pixels) may cause the browser tab to slow down on lower-spec devices.',
  },
];

export default function ResizeImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 pt-12 sm:pt-18 pb-6">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              No upload &middot; 100% Private &middot; Instant
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 dark:text-slate-50 leading-tight mb-3">
            Resize Image{' '}
            <span className="italic bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">Online</span>
          </h1>
          <p className="text-center text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-2">
            Set exact pixel dimensions, lock the aspect ratio, or pick from common presets like HD, 4K, and social media sizes. Everything runs in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Custom dimensions', 'Aspect ratio lock', 'HD · 4K presets', 'Social media sizes', 'JPEG · PNG · WebP'].map((f) => (
              <span key={f} className="text-xs bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>
          <ImageResizeUI />
        </div>

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-24 mt-6">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why resize an image?</h2>
              <p className="mb-3">
                Modern cameras and smartphones produce images at 12–200 megapixels — far more resolution than most use cases need. A 50 MP photo from a mirrorless camera produces a file that is 20–50 MB and 8000+ pixels wide. Sending that directly via email or uploading it to a website is slow, wasteful, and sometimes impossible due to file size or dimension limits.
              </p>
              <p>
                Resizing brings the image down to the exact dimensions required by the platform, application, or print specification — without cropping any content. Every pixel is retained, just scaled to fit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common image sizes and when to use them</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700/60">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Use case</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Recommended size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      ['Instagram post (square)', '1080 × 1080 px'],
                      ['Instagram / TikTok story', '1080 × 1920 px'],
                      ['Twitter / X post image', '1600 × 900 px'],
                      ['Facebook cover photo', '851 × 315 px'],
                      ['LinkedIn profile photo', '400 × 400 px'],
                      ['YouTube thumbnail', '1280 × 720 px'],
                      ['Website hero image (HD)', '1920 × 1080 px'],
                      ['Email attachment (general)', 'Max 1200 px wide'],
                      ['A4 print at 300 DPI', '2480 × 3508 px'],
                      ['App icon (iOS)', '1024 × 1024 px'],
                    ].map(([use, size]) => (
                      <tr key={use} className="bg-white dark:bg-slate-800/40">
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{use}</td>
                        <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When should I resize vs. compress?</h2>
              <p className="mb-3">
                Resizing and compression are complementary, not competing, techniques:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Resize</strong> when the image has too many pixels for the intended use — for example, a 6000 × 4000 px photo for a website that only displays it at 1200 × 800 px. Keeping the extra pixels wastes bandwidth and slows load time.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Compress</strong> when the pixel dimensions are already appropriate but the file size is too large — for example, a correctly sized 1200 × 800 px JPEG that is still 2 MB because it was saved at 100% quality.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Both</strong> when the image is both oversized in dimensions and file size — resize first to the correct pixel dimensions, then compress to reduce the file size further.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the resize tool works</h2>
              <p>
                After you drop an image, it is decoded by the browser and drawn onto an HTML Canvas element at the new dimensions you specify. The browser&apos;s bilinear or bicubic interpolation scales the pixel data smoothly to the new size. The canvas is then exported as a JPEG, PNG, or WebP file — no upload, no server, no round-trip. The aspect ratio lock prevents your image from being distorted when you change only one dimension.
              </p>
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

        <RelatedTools hrefs={['/crop-image', '/compress-image', '/convert-image-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
