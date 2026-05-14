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
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Flip Image Online',
      url: 'https://imagepdf.tools/flip-image',
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the difference between flip horizontal and flip vertical?', acceptedAnswer: { '@type': 'Answer', text: 'Flip horizontal creates a left-to-right mirror image. Flip vertical flips the image upside down.' } },
        { '@type': 'Question', name: 'Why do selfies often look wrong to others?', acceptedAnswer: { '@type': 'Answer', text: 'Front-facing cameras show a mirrored preview. When the photo is saved, some phones save it mirrored. Use Flip Horizontal to correct it.' } },
        { '@type': 'Question', name: 'Does flipping reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Flipping is a non-destructive pixel transformation — no pixels are added, removed, or recompressed.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All flipping happens in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I flip and rotate in the same operation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool supports flipping and rotating independently. Apply both operations before downloading.' } },
        { '@type': 'Question', name: 'Does flipping change the file size?', acceptedAnswer: { '@type': 'Answer', text: 'The output file size will be very similar to the input. The flip operation itself does not change the amount of pixel data, so file size changes are minimal.' } },
        { '@type': 'Question', name: 'Will flipping strip EXIF metadata?', acceptedAnswer: { '@type': 'Answer', text: 'The flipped output is a fresh canvas export, so most EXIF metadata is stripped. This is actually helpful — it removes the EXIF orientation flag that was causing display issues.' } },
        { '@type': 'Question', name: 'Can I flip an animated WebP?', acceptedAnswer: { '@type': 'Answer', text: 'This tool processes static images. Animated WebP or GIF files are not supported for flipping — only the first frame would be processed.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Drag and drop any JPEG, PNG, or WebP image onto the flip tool, or click to browse from your device.' },
  { n: '02', title: 'Flip or rotate', desc: 'Click Flip Horizontal for a left-right mirror, or Flip Vertical to flip upside down. Combine with rotation if needed.' },
  { n: '03', title: 'Download flipped image', desc: 'Your flipped image is ready instantly. Download in the same format — full quality, no upload.' },
];

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
    q: 'Can I flip and rotate in the same operation?',
    a: 'Yes. The tool supports both flipping and rotating independently. Apply both operations before downloading — the result will include all transformations you have applied.',
  },
  {
    q: 'Does flipping change the file size?',
    a: 'The output file size will be very similar to the input. The flip operation does not change the amount of pixel data, so any file size difference is minimal.',
  },
  {
    q: 'Will flipping strip EXIF metadata?',
    a: 'The flipped output is a fresh canvas export, so most EXIF metadata is stripped. This is actually helpful — it removes the EXIF orientation flag that was causing display inconsistencies across apps.',
  },
  {
    q: 'Can I flip an animated WebP or GIF?',
    a: 'This tool processes static images. Animated WebP or GIF files are not supported for flipping — only the first frame would be processed.',
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
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .fi-h1    { opacity: 0; transform: translateY(10px); }
            .fi-sub   { opacity: 0; transform: translateY(10px); }
            .fi-trust { opacity: 0; }
          }
          .fi-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .fi-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .fi-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes fi-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .fi-fact { animation: fi-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .fi-fact:nth-child(1) { animation-delay: 240ms; }
          .fi-fact:nth-child(2) { animation-delay: 290ms; }
          .fi-fact:nth-child(3) { animation-delay: 340ms; }
          .fi-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="flip-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="fi-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Flip Image Online
          </h1>
          <p className="fi-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Mirror your image horizontally or vertically in one click. Supports JPEG, PNG and WebP — all processing happens in your browser.
          </p>
          <p className="fi-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <FlipRotateUI />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Non-destructive flip operation', 'Free with no account required', 'Horizontal and vertical flip'].map((fact) => (
                <li key={fact} className="fi-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>How it works</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Flip any image in 3 steps</h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div key={step.n} className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}>
                  <span className="block text-[11px] font-bold tracking-[0.16em] mb-3" style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">{step.n}</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">{step.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why flip an image?</h2>
              <p className="mb-3">
                Flipping an image — mirroring it along the horizontal or vertical axis — is a quick operation with a surprisingly wide range of practical uses. From correcting selfies that look wrong to compositing design elements and solving technical compatibility issues, image flipping is a fundamental tool in any image editing workflow.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">When you need to flip an image</h2>
              <ul className="space-y-3">
                {[
                  ['Fixing mirrored selfies', 'Front-facing cameras on both Android and iOS often save photos in a mirrored orientation. The preview looks right because it matches what you see in a mirror — but when others look at the photo, text and details appear reversed. Flipping horizontally corrects this in one click.'],
                  ['Creating symmetrical compositions', 'Designers and photographers often flip one half of an image and layer it over the original to create perfectly symmetrical compositions — common in portrait retouching, abstract art, and architectural photography.'],
                  ['Product photography corrections', 'If a product was photographed facing the wrong direction for a layout (e.g. a shoe facing left when the template requires it facing right), flipping saves you from a reshoot.'],
                  ['Fixing scanner orientation', 'Flatbed scanners sometimes produce images upside down or mirrored depending on how the document was placed. A quick flip corrects the scan instantly.'],
                  ['Creating mirror effects for graphic design', 'Reflections, shadows, and symmetry effects all rely on a flipped copy of the original image. Flipping here is a starting point for more complex design work.'],
                  ['Social media templates', 'Some Instagram and Pinterest templates are designed for images facing a specific direction. Flipping your photo ensures the subject faces the correct way within the layout.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Flip horizontal vs flip vertical — which do you need?</h2>
              <p className="mb-3">
                <strong className="font-semibold text-slate-800 dark:text-slate-200">Flip Horizontal</strong> (left-right mirror) is the most commonly used. It is the correct fix for mirrored selfies, left-right composition issues, and mirror effects.
              </p>
              <p>
                <strong className="font-semibold text-slate-800 dark:text-slate-200">Flip Vertical</strong> (top-bottom mirror) turns the image upside down. This is less common but is useful for creating water reflection effects in landscape photography, correcting documents scanned upside down, and certain graphic design techniques.
              </p>
            </div>
          </div>
        </section>

        {/* ── Privacy callout ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>Privacy by architecture</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Your files never leave your browser.</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              The flip tool uses the {"browser's"} native Canvas API. Your images are mirrored and exported entirely on your own hardware — nothing is transmitted, stored, or logged.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — flipping happens on your CPU',
                'No account or sign-up required',
                'Non-destructive — original file is never modified',
                'Works offline once the page has loaded',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 shrink-0 mt-px" style={{ color: 'oklch(70% 0.158 293)' }} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: 'oklch(70% 0.158 293)' }}>FAQ</p>
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about flipping images</h2>
              </div>
              <a
                href="#flip-tool"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
              >
                Back to flip tool
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <dl className="divide-y divide-slate-100 dark:divide-white/5">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RelatedTools hrefs={['/rotate-image', '/crop-image', '/resize-image', '/compress-image']} />
      </main>
    </>
  );
}
