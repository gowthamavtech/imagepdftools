import type { Metadata } from 'next';
import { FlipRotateUI } from '@/components/FlipRotateUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Flip Image Online — Free & Instant',
  description: 'Flip any image horizontally or vertically in your browser — no upload, no server, 100% private. Supports JPEG, PNG and WebP.',
  alternates: { canonical: 'https://imagepdf.tools/flip-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Flip Image Online',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to flip images horizontally or vertically. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to flip an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your JPEG, PNG, or WebP image.' },
        { '@type': 'HowToStep', text: 'Click Flip Horizontal or Flip Vertical.' },
        { '@type': 'HowToStep', text: 'Download your flipped image instantly.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is the difference between flip horizontal and flip vertical?',
    a: 'Flip horizontal (also called mirror) creates a left-to-right mirror image — like looking at the original in a mirror. Flip vertical flips the image upside down, creating a top-to-bottom mirror.',
  },
  {
    q: 'Why do selfies often look wrong to others?',
    a: 'Front-facing cameras show a mirrored preview so you see yourself as you normally do in a mirror. But when the photo is saved, some phones save it as-is (mirrored) while others flip it back. If your selfie looks reversed to others, use Flip Horizontal to correct it.',
  },
  {
    q: 'Does flipping reduce image quality?',
    a: 'No. Flipping is a non-destructive pixel transformation — no pixels are added, removed, or recompressed in the flip operation itself. The output is identical in quality to the input.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All flipping happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function FlipImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-2xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Flip Image <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Online</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Mirror your image horizontally or vertically in one click. Supports JPEG, PNG and WebP — all processing happens in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Flip Horizontal', 'Flip Vertical', 'Rotate 90° / 180°', 'No upload needed', 'Free forever'].map((f) => (
              <span key={f} className="text-xs text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-white/8 px-2.5 py-1 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        <FlipRotateUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why flip an image?</h2>
              <p className="mb-3">
                Flipping an image — mirroring it along the horizontal or vertical axis — is a quick operation with a surprisingly wide range of practical uses. From correcting selfies that look wrong to compositing design elements and solving technical compatibility issues, image flipping is a fundamental tool in any image editing workflow.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When you need to flip an image</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Fixing mirrored selfies.</strong> Front-facing cameras on both Android and iOS often save photos in a mirrored orientation. The preview looks right because it matches what you see in a mirror — but when others look at the photo, text and details appear reversed. Flipping horizontally corrects this in one click.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Creating symmetrical compositions.</strong> Designers and photographers often flip one half of an image and layer it over the original to create perfectly symmetrical compositions — common in portrait retouching, abstract art, and architectural photography.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Product photography corrections.</strong> If a product was photographed facing the wrong direction for a layout (e.g., a shoe facing left when the template requires it facing right), flipping saves you from a reshoot.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Fixing scanner orientation.</strong> Flatbed scanners sometimes produce images upside down or mirrored depending on how the document was placed. A quick flip corrects the scan instantly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Creating mirror effects for graphic design.</strong> Reflections, shadows, and symmetry effects all rely on a flipped copy of the original image. Flipping here is a starting point for more complex design work.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Correcting watermark placement.</strong> If a watermark or overlay was applied to the wrong side of an image, flipping the base image can reposition the final composition without recreating the overlay.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Social media templates.</strong> Some Instagram and Pinterest templates are designed for images facing a specific direction. Flipping your photo ensures the subject faces the correct way within the layout.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Flip horizontal vs flip vertical — which do you need?</h2>
              <p className="mb-3">
                <strong className="text-slate-800 dark:text-slate-200">Flip Horizontal</strong> (left-right mirror) is the most commonly used. It is the correct fix for mirrored selfies, left-right composition issues, and mirror effects.
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Flip Vertical</strong> (top-bottom mirror) turns the image upside down. This is less common in everyday use but is useful for creating water reflection effects in landscape photography, correcting documents scanned upside down, and certain graphic design techniques.
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

        <RelatedTools hrefs={['/rotate-image', '/crop-image', '/resize-image', '/compress-image']} />
      </main>
    </>
  );
}
