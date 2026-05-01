import type { Metadata } from 'next';
import { FlipRotateUI } from '@/components/FlipRotateUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Rotate Image Online — Free & Instant',
  description: 'Rotate any image 90°, 180° or 270° in your browser — no upload, no server, 100% private. Supports JPEG, PNG and WebP.',
  alternates: { canonical: 'https://imagepdf.tools/rotate-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Rotate Image Online',
      url: 'https://imagepdf.tools/rotate-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to rotate images 90°, 180°, or 270°. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to rotate an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your JPEG, PNG, or WebP image.' },
        { '@type': 'HowToStep', text: 'Click Rotate Left or Rotate Right to rotate 90° at a time.' },
        { '@type': 'HowToStep', text: 'Download your correctly oriented image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my photo showing sideways on some devices but correctly on others?', acceptedAnswer: { '@type': 'Answer', text: 'Photos taken in portrait mode on many cameras are stored rotated, with an EXIF orientation flag telling software to display them correctly. Some software reads this flag; others ignore it. Rotating the image and re-saving it bakes the correct orientation into the pixel data so every viewer shows it the right way.' } },
        { '@type': 'Question', name: 'Does rotating reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'For 90°, 180°, and 270° rotations of JPEG images, quality is technically reduced because the image must be re-encoded. However, at a high quality setting, the difference is imperceptible. PNG rotations are lossless because PNG uses lossless compression.' } },
        { '@type': 'Question', name: 'Can I rotate by a custom angle like 45°?', acceptedAnswer: { '@type': 'Answer', text: 'The main rotation buttons rotate in 90° steps. For custom angles, use the angle input to set any degree value between 0 and 360.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All rotation happens in your browser using the Canvas API. Your file never leaves your device.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Why is my photo showing sideways on some devices but correctly on others?',
    a: 'Photos taken in portrait mode on many cameras are stored rotated, with an EXIF orientation flag telling software to display them correctly. Some software reads this flag; others ignore it. The result is a photo that appears correctly in one app but sideways in another. Rotating the image and re-saving it bakes the correct orientation into the pixel data so every viewer shows it the right way.',
  },
  {
    q: 'Does rotating reduce image quality?',
    a: 'For 90°, 180°, and 270° rotations of JPEG images, quality is technically reduced because the image must be re-encoded. However, at a high quality setting, the difference is imperceptible. PNG rotations are lossless because PNG uses lossless compression.',
  },
  {
    q: 'Can I rotate by a custom angle like 45°?',
    a: 'The main rotation buttons rotate in 90° steps. For custom angles, use the angle input to set any degree value between 0 and 360.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All rotation happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function RotateImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-2xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Rotate Image <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Online</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Rotate your photo 90°, 180° or 270° in one click. Also flip horizontally or vertically. No upload required — runs entirely in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Rotate 90° Left / Right', 'Rotate 180°', 'Flip H / V', 'No upload needed', 'Free forever'].map((f) => (
              <span key={f} className="text-xs text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-white/8 px-2.5 py-1 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        <FlipRotateUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why rotate an image?</h2>
              <p className="mb-3">
                Photo rotation is one of the most common everyday image editing tasks. Modern smartphones and cameras embed orientation information in the EXIF metadata, but many applications, websites, and sharing platforms do not read this data consistently. The result: a perfectly composed portrait photo displays sideways in one app and correctly in another.
              </p>
              <p>
                Rotating the image and re-saving it permanently embeds the correct pixel orientation, eliminating display inconsistencies across all viewers and platforms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common reasons to rotate an image</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">EXIF orientation compatibility.</strong> Photos taken in portrait mode on cameras and phones are often stored rotated 90° with an EXIF orientation tag. When you upload them to websites, messaging apps, or older software that ignores EXIF, they appear sideways. Rotating the image bakes the correct orientation into the file permanently.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Scanned documents and photos.</strong> Flatbed scanners frequently produce images that are rotated 90° or 180° depending on how the original was placed on the scanning bed. Rotating the scan corrects this without any quality loss (for PNG output).</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Fixing landscape photos taken sideways.</strong> If you held your phone or camera sideways while photographing a landscape scene, or inadvertently triggered the shutter during a reorientation, the resulting image may be 90° off. Rotating it fixes the composition.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Social media and CMS uploads.</strong> Many CMS platforms, social media upload systems, and e-commerce platforms do not correctly interpret EXIF orientation data. Uploading a rotated-correctly image (pixel-level, not EXIF-level) guarantees the image displays correctly everywhere.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Video thumbnail orientation.</strong> Thumbnail images for YouTube, Vimeo, and podcast platforms sometimes come from screenshots taken at unusual orientations. Rotating the thumbnail to landscape orientation is required before upload.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Print preparation.</strong> Printing services and design software sometimes import images with the wrong orientation relative to the page layout. Pre-rotating the image ensures it is positioned correctly in the final print output.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email clients and messaging apps.</strong> Outlook, Gmail attachments, and many messaging platforms do not reliably preserve EXIF orientation. Rotating the image before sending ensures the recipient sees it correctly without having to rotate it on their end.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">90°, 180°, 270° — which do I need?</h2>
              <p className="mb-3">
                The right rotation depends on how the photo was captured relative to its intended display orientation:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">90° clockwise</strong> — if your portrait photo appears as landscape with the top on the right side.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">90° counter-clockwise</strong> — if your portrait photo appears as landscape with the top on the left side.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">180°</strong> — if your image appears completely upside down.</li>
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

        <RelatedTools hrefs={['/flip-image', '/crop-image', '/resize-image', '/compress-image']} />
      </main>
    </>
  );
}
