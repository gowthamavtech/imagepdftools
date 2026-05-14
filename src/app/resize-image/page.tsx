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
        { '@type': 'Question', name: 'What is the difference between resizing and cropping?', acceptedAnswer: { '@type': 'Answer', text: 'Resizing scales the entire image — all pixels are kept but scaled up or down. Cropping removes pixels outside a selected region without scaling.' } },
        { '@type': 'Question', name: 'Will resizing reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'Shrinking (downscaling) produces good results. Enlarging (upscaling) beyond original dimensions causes blurring because new pixel data is interpolated.' } },
        { '@type': 'Question', name: 'Can I resize to a specific file size?', acceptedAnswer: { '@type': 'Answer', text: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'What is the maximum dimensions I can resize to?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit, but very large output dimensions (above 10,000 x 10,000 pixels) may slow down lower-spec devices due to browser memory constraints.' } },
        { '@type': 'Question', name: 'Can I resize by percentage?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool supports both pixel dimensions and percentage scaling. Enter a percentage to scale relative to the original dimensions.' } },
        { '@type': 'Question', name: 'What format will my resized image be saved in?', acceptedAnswer: { '@type': 'Answer', text: 'The output format matches the input format by default. You can also choose to export in a different format using the format selector.' } },
        { '@type': 'Question', name: 'Will resizing affect the DPI for printing?', acceptedAnswer: { '@type': 'Answer', text: 'The tool resizes pixel dimensions, not DPI. For print use, ensure your resized output has sufficient pixels for the intended print size at 300 DPI.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Drag and drop any JPEG, PNG, or WebP image onto the resize tool, or click to browse from your device.' },
  { n: '02', title: 'Set dimensions', desc: 'Enter your target width and height in pixels, choose a preset like HD or 4K, or scale by percentage. Lock the aspect ratio to avoid distortion.' },
  { n: '03', title: 'Download resized image', desc: 'Click Resize and your image is ready instantly at the exact dimensions you specified.' },
];

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
    q: 'Can I resize by percentage instead of pixel dimensions?',
    a: 'Yes. The tool supports both pixel dimensions and percentage scaling. Enter a percentage (e.g. 50% to halve the dimensions) to scale relative to the original image size.',
  },
  {
    q: 'What format will my resized image be saved in?',
    a: 'The output format matches the input format by default. You can also choose to export in a different format — JPEG, PNG, or WebP — using the format selector.',
  },
  {
    q: 'Can I resize to a specific file size rather than pixel dimensions?',
    a: 'This tool resizes by pixel dimensions. To reduce file size specifically, use the Image Compressor tool which lets you control quality and file size output directly.',
  },
  {
    q: 'Will resizing affect the image DPI for printing?',
    a: 'The tool resizes pixel dimensions, not DPI. For print use, ensure your resized output has sufficient pixels for the intended print size at 300 DPI. For example, A4 at 300 DPI requires 2480 × 3508 pixels.',
  },
  {
    q: 'What is the maximum dimensions I can resize to?',
    a: 'There is no hard limit enforced by the tool, but browsers have memory constraints. Very large output dimensions (above 10,000 × 10,000 pixels) may cause the browser tab to slow down on lower-spec devices.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The resize operation runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function ResizeImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ri-h1    { opacity: 0; transform: translateY(10px); }
            .ri-sub   { opacity: 0; transform: translateY(10px); }
            .ri-trust { opacity: 0; }
          }
          .ri-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .ri-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ri-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes ri-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .ri-fact { animation: ri-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .ri-fact:nth-child(1) { animation-delay: 240ms; }
          .ri-fact:nth-child(2) { animation-delay: 290ms; }
          .ri-fact:nth-child(3) { animation-delay: 340ms; }
          .ri-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="resize-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="ri-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Resize Image Online
          </h1>
          <p className="ri-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Set exact pixel dimensions, lock the aspect ratio, or pick from HD, 4K, and social media presets. Everything runs in your browser.
          </p>
          <p className="ri-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <div className="max-w-4xl mx-auto px-4">
          <ImageResizeUI />
        </div>

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A] mt-8">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Canvas API runs on your CPU', 'Free with no account required', 'HD · 4K · social media presets'].map((fact) => (
                <li key={fact} className="ri-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Resize any image in 3 steps</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why resize an image?</h2>
              <p className="mb-3">
                Modern cameras and smartphones produce images at 12–200 megapixels — far more resolution than most use cases need. A 50 MP photo produces a file that is 20–50 MB and 8000+ pixels wide. Sending that directly via email or uploading it to a website is slow, wasteful, and sometimes impossible due to file size or dimension limits.
              </p>
              <p>
                Resizing brings the image down to the exact dimensions required by the platform, application, or print specification — without cropping any content. Every pixel is retained, just scaled to fit.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common image sizes and when to use them</h2>
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
                        <td className="px-4 py-3 font-medium text-violet-600 dark:text-violet-400">{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">When should I resize vs. compress?</h2>
              <p className="mb-3">
                Resizing and compression are complementary, not competing, techniques:
              </p>
              <ul className="space-y-3">
                {[
                  ['Resize', 'when the image has too many pixels for the intended use — for example, a 6000 × 4000 px photo for a website that only displays it at 1200 × 800 px. Keeping the extra pixels wastes bandwidth and slows load time.'],
                  ['Compress', 'when the pixel dimensions are already appropriate but the file size is too large — for example, a correctly sized 1200 × 800 px JPEG that is still 2 MB because it was saved at 100% quality.'],
                  ['Both', 'when the image is oversized in dimensions AND file size — resize first to the correct pixel dimensions, then compress to reduce the file size further.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the resize tool works</h2>
              <p>
                After you drop an image, it is decoded by the browser and drawn onto an HTML Canvas element at the new dimensions you specify. The {"browser's"} interpolation scales the pixel data smoothly to the new size. The canvas is then exported as a JPEG, PNG, or WebP file — no upload, no server, no round-trip. The aspect ratio lock prevents your image from being distorted when you change only one dimension.
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
              The resize tool uses the {"browser's"} native Canvas API. Your images are scaled and exported entirely on your own hardware — nothing is transmitted, stored, or logged.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — resizing happens on your CPU',
                'No account or sign-up required',
                'Original image is never modified — only the download is resized',
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
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about resizing images</h2>
              </div>
              <a
                href="#resize-tool"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
              >
                Back to resize tool
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

        <RelatedTools hrefs={['/crop-image', '/compress-image', '/convert-image-to-webp', '/reduce-image-size']} />
      </main>
    </>
  );
}
