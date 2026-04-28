import type { Metadata } from 'next';
import { ImageCropUI } from '@/components/ImageCropUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Crop Image Online — Free & Private | ImagePDF.Tools',
  description: 'Crop any image directly in your browser. Select any area, choose aspect ratios like 1:1 or 16:9, and save. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/crop-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Image Cropper',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image cropping tool with aspect ratio presets. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to crop an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your image by dropping it onto the crop tool.' },
        { '@type': 'HowToStep', text: 'Drag the crop handles to select the area you want to keep, or choose a preset aspect ratio.' },
        { '@type': 'HowToStep', text: 'Click Crop and download your cropped image.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Can I crop to an exact pixel size?',
    a: 'Yes. Use the free crop mode and drag the handles to your desired area. The pixel dimensions of your crop selection are shown in real time so you can hit an exact size.',
  },
  {
    q: 'What aspect ratios are available?',
    a: 'You can crop freely (no ratio lock), or choose from presets: 1:1 (square, for Instagram posts), 4:3, 16:9 (landscape video), 9:16 (portrait/Stories), and others.',
  },
  {
    q: 'Does cropping reduce image quality?',
    a: 'Cropping itself does not degrade quality — it simply removes the pixels outside the selection. The retained pixels are exported at full quality.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All cropping happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function CropImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-6">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              No upload &middot; 100% Private &middot; Instant
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 dark:text-slate-50 leading-tight mb-3">
            Crop Image{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Online</span>
          </h1>
          <p className="text-center text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-2">
            Drag to select any area. Choose from preset aspect ratios or crop freely. Everything runs in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Free selection', '1:1 Square', '4:3', '16:9', 'Rule of thirds', 'JPEG · PNG · WebP'].map((f) => (
              <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>
          <ImageCropUI />
        </div>

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-10">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why crop an image?</h2>
              <p className="mb-3">
                Cropping is one of the most fundamental and frequently needed image editing operations. It removes unwanted parts of an image, changes the composition, adjusts the aspect ratio, and focuses the viewer&apos;s attention on what matters. Unlike resizing (which scales the entire image), cropping physically removes pixels outside a selected region.
              </p>
              <p>
                Whether you are preparing a profile picture, optimising a product photo for an online listing, or trimming a screenshot to show only the relevant section, cropping is the fastest way to get the framing right.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases for cropping images</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Social media profile pictures.</strong> Instagram, LinkedIn, Twitter, and most platforms display profile photos as squares (1:1 ratio). Cropping your photo to 1:1 before uploading ensures the most important part of the image is centred, not awkwardly cropped by the platform.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">YouTube thumbnails.</strong> YouTube thumbnails must be 16:9 ratio (1280×720 recommended). Cropping your image to the exact ratio before uploading avoids automatic cropping that can cut out your subject.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Product photography for e-commerce.</strong> Platforms like Amazon and Shopify require product images with specific aspect ratios and empty space requirements. Cropping your product photos to a square with the product centred gives you full control over how they appear.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Removing distracting backgrounds.</strong> A photo of a document, whiteboard, or artwork often includes unwanted surroundings — a cluttered desk, a wall, a floor. Cropping removes the distraction and puts focus on the content.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Passport and ID photos.</strong> Government-issued ID and visa applications specify exact crop ratios (often 35mm × 45mm with the face centred and filling 70–80% of the frame). Cropping to these specs avoids rejection.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Blog post and article images.</strong> Most CMS platforms display featured images at a fixed aspect ratio. Cropping your image to match that ratio before uploading prevents the system from making poor automatic crops.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Improving photo composition.</strong> The rule of thirds, leading lines, and negative space are compositional principles that sometimes require cropping the original shot to achieve. This tool shows a rule-of-thirds grid overlay to help you align subjects correctly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the crop tool works</h2>
              <p>
                After you drop an image, it is rendered on an interactive canvas. You can drag the crop handles to define your selection area — the tool shows the current crop dimensions in real time. Clicking a preset ratio like 16:9 locks the drag handles to that ratio, so you can resize the crop box freely while maintaining the correct proportions. When you click Crop, the selected pixel region is extracted from the canvas and exported as a new image file — no upload, no server involved.
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

        <RelatedTools hrefs={['/resize-image', '/flip-image', '/rotate-image', '/compress-image']} />
      </main>
    </>
  );
}
