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
        { '@type': 'HowToStep', text: 'Click Rotate Left or Rotate Right to rotate 90° at a time, or enter a custom angle.' },
        { '@type': 'HowToStep', text: 'Download your correctly oriented image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my photo showing sideways on some devices but correctly on others?', acceptedAnswer: { '@type': 'Answer', text: 'Photos taken in portrait mode are stored rotated with an EXIF orientation flag. Some software reads this flag; others ignore it. Rotating the image bakes the correct orientation into the pixel data permanently.' } },
        { '@type': 'Question', name: 'Does rotating reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'For 90°, 180°, 270° rotations of JPEG images, quality is technically reduced because the image must be re-encoded. At high quality settings the difference is imperceptible. PNG rotations are lossless.' } },
        { '@type': 'Question', name: 'Can I rotate by a custom angle like 45°?', acceptedAnswer: { '@type': 'Answer', text: 'The main buttons rotate in 90° steps. For custom angles, use the angle input to set any value between 0 and 360.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All rotation happens in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Does rotating strip EXIF metadata?', acceptedAnswer: { '@type': 'Answer', text: 'The rotated output is a fresh canvas export, so most EXIF metadata is stripped. This is intentional — the problematic EXIF orientation flag that was causing display issues is removed.' } },
        { '@type': 'Question', name: 'Will rotating affect the file size?', acceptedAnswer: { '@type': 'Answer', text: 'For 90° and 270° rotations, the image dimensions swap (width becomes height and vice versa), which can slightly affect file size. The content amount stays the same.' } },
        { '@type': 'Question', name: 'Can I rotate a PNG without quality loss?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG uses lossless compression, so rotating a PNG and re-exporting it as PNG introduces no quality loss. The pixel data is preserved exactly.' } },
        { '@type': 'Question', name: 'What happens to background areas when I rotate by a custom angle?', acceptedAnswer: { '@type': 'Answer', text: 'For non-90° angles, the canvas expands to fit the rotated image and the newly created corner areas are filled with white (for JPEG) or transparency (for PNG). This is standard behaviour for canvas-based rotation.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Drag and drop any JPEG, PNG, or WebP image onto the rotate tool, or click to browse from your device.' },
  { n: '02', title: 'Choose rotation', desc: 'Click Rotate Left or Rotate Right to rotate 90° at a time. For 180°, click twice. Or enter a custom angle directly.' },
  { n: '03', title: 'Download rotated image', desc: 'Your rotated image is ready instantly. Download in the same format — full quality, no upload.' },
];

const FAQS = [
  {
    q: 'Why is my photo showing sideways on some devices but correctly on others?',
    a: 'Photos taken in portrait mode on many cameras are stored rotated, with an EXIF orientation flag telling software to display them correctly. Some software reads this flag; others ignore it. Rotating the image and re-saving it bakes the correct orientation into the pixel data so every viewer shows it the right way.',
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
    q: 'Does rotating strip EXIF metadata?',
    a: 'The rotated output is a fresh canvas export, so most EXIF metadata is stripped. This is actually helpful — it removes the EXIF orientation flag that was causing display inconsistencies across apps and platforms.',
  },
  {
    q: 'Will rotating affect the file size?',
    a: 'For 90° and 270° rotations, the image dimensions swap (width becomes height and vice versa). The pixel content is the same, so file size changes are minimal. For 180° rotations, dimensions stay the same.',
  },
  {
    q: 'Can I rotate a PNG without quality loss?',
    a: 'Yes. PNG uses lossless compression, so rotating a PNG and re-exporting it as PNG introduces no quality loss. Every pixel is preserved exactly.',
  },
  {
    q: 'What happens to background areas when I rotate by a custom angle?',
    a: 'For non-90° angles, the canvas expands to fit the rotated image. Newly created corner areas are filled with white for JPEG output, or with transparency for PNG output.',
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
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .rot-h1    { opacity: 0; transform: translateY(10px); }
            .rot-sub   { opacity: 0; transform: translateY(10px); }
            .rot-trust { opacity: 0; }
          }
          .rot-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .rot-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .rot-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes rot-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .rot-fact { animation: rot-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .rot-fact:nth-child(1) { animation-delay: 240ms; }
          .rot-fact:nth-child(2) { animation-delay: 290ms; }
          .rot-fact:nth-child(3) { animation-delay: 340ms; }
          .rot-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="rotate-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="rot-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Rotate Image Online
          </h1>
          <p className="rot-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Rotate your photo 90°, 180°, or 270° in one click. Also flip horizontally or vertically. No upload required — runs entirely in your browser.
          </p>
          <p className="rot-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <FlipRotateUI />

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Pixel-level orientation fix', 'Free with no account required', 'Custom angles supported'].map((fact) => (
                <li key={fact} className="rot-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Rotate any image in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why rotate an image?</h2>
              <p className="mb-3">
                Photo rotation is one of the most common everyday image editing tasks. Modern smartphones and cameras embed orientation information in the EXIF metadata, but many applications, websites, and sharing platforms do not read this data consistently. The result: a perfectly composed portrait photo displays sideways in one app and correctly in another.
              </p>
              <p>
                Rotating the image and re-saving it permanently embeds the correct pixel orientation, eliminating display inconsistencies across all viewers and platforms.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common reasons to rotate an image</h2>
              <ul className="space-y-3">
                {[
                  ['EXIF orientation compatibility', 'Photos taken in portrait mode are often stored rotated 90° with an EXIF orientation tag. When you upload them to websites or older software that ignores EXIF, they appear sideways. Rotating the image bakes the correct orientation into the file permanently.'],
                  ['Scanned documents and photos', 'Flatbed scanners frequently produce images rotated 90° or 180° depending on how the original was placed. Rotating the scan corrects this without any quality loss (for PNG output).'],
                  ['Fixing landscape photos taken sideways', 'If you held your phone sideways while photographing a landscape, or inadvertently triggered the shutter during a reorientation, the resulting image may be 90° off.'],
                  ['Social media and CMS uploads', 'Many CMS platforms and social media systems do not correctly interpret EXIF orientation data. Uploading a pixel-level rotated image guarantees it displays correctly everywhere.'],
                  ['Video thumbnail orientation', 'Thumbnail images sometimes come from screenshots taken at unusual orientations. Rotating the thumbnail to landscape orientation is required before upload.'],
                  ['Print preparation', 'Printing services and design software sometimes import images with the wrong orientation relative to the page layout. Pre-rotating ensures correct positioning in the final print.'],
                  ['Email clients and messaging apps', 'Outlook, Gmail, and many messaging platforms do not reliably preserve EXIF orientation. Rotating the image before sending ensures the recipient sees it correctly.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">90°, 180°, 270° — which do I need?</h2>
              <ul className="space-y-3">
                {[
                  ['90° clockwise', 'if your portrait photo appears as landscape with the top on the right side.'],
                  ['90° counter-clockwise', 'if your portrait photo appears as landscape with the top on the left side.'],
                  ['180°', 'if your image appears completely upside down.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}</strong> — {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Privacy callout ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>Privacy by architecture</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Your files never leave your browser.</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              The rotate tool uses the {"browser's"} native Canvas API. Your images are rotated and exported entirely on your own hardware — nothing is transmitted, stored, or logged.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — rotation happens on your CPU',
                'No account or sign-up required',
                'Strips problematic EXIF orientation flags permanently',
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about rotating images</h2>
              </div>
              <a
                href="#rotate-tool"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
              >
                Back to rotate tool
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

        <RelatedTools hrefs={['/flip-image', '/crop-image', '/resize-image', '/compress-image']} />
      </main>
    </>
  );
}
