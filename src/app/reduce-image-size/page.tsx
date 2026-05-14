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
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Reduce Image Size',
      url: 'https://imagepdf.tools/reduce-image-size',
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can you reduce image size without losing quality?', acceptedAnswer: { '@type': 'Answer', text: 'For JPEG and WebP images, you can typically reduce file size by 60–80% at quality 75–85 with minimal visible quality loss at screen sizes. PNG can be reduced by 40–70% using colour quantisation. The quality slider lets you find the right balance.' } },
        { '@type': 'Question', name: 'What is the difference between reducing image size and resizing an image?', acceptedAnswer: { '@type': 'Answer', text: 'Reducing image size (compression) makes the file smaller in kilobytes while keeping the same pixel dimensions. Resizing changes the pixel dimensions — the canvas size — which also makes the file smaller but changes how large the image appears. For web performance, you often want both: resize to the correct display dimensions, then compress to reduce the file size further.' } },
        { '@type': 'Question', name: 'Which format gives the smallest file size?', acceptedAnswer: { '@type': 'Answer', text: 'WebP typically produces the smallest files — 25–35% smaller than JPEG and 25% smaller than PNG at equivalent quality. If you are not restricted to a specific format, converting to WebP will give you the smallest file.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All compression happens in your browser using the Canvas API and pngquant WASM for PNG. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I reduce multiple images at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch processing and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Does reducing image size change the pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 pixels after compression. To change pixel dimensions, use the Resize Image tool.' } },
        { '@type': 'Question', name: 'What quality setting should I start with?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 80 is a good starting point for most images. At quality 80, JPEG and WebP files are typically 50–70% smaller than quality 100 with no visible loss at screen sizes. If the result looks identical to the original, try lowering to 70.' } },
        { '@type': 'Question', name: 'Can I preview the quality before downloading?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each file card shows original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider and compare quality before downloading.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Drag any JPEG, PNG, WebP, or SVG onto the zone or click to browse. Up to 50 MB per file.',
  },
  {
    n: '02',
    title: 'Adjust quality',
    desc: 'The slider controls how aggressively image data is discarded. Quality 80 is a good starting point.',
  },
  {
    n: '03',
    title: 'Download the result',
    desc: 'Your browser compresses locally. Compare sizes before downloading. No data leaves your device.',
  },
];

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
  {
    q: 'Can I reduce multiple images at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch processing and can download everything as a ZIP.',
  },
  {
    q: 'Does reducing image size change the pixel dimensions?',
    a: 'No. This tool reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 pixels after compression. To change pixel dimensions, use the Resize Image tool.',
  },
  {
    q: 'What quality setting should I start with?',
    a: 'Quality 80 is a good starting point for most images. At quality 80, JPEG and WebP files are typically 50–70% smaller than quality 100 with no visible loss at screen sizes. If the result looks identical to the original, try lowering to 70.',
  },
  {
    q: 'Can I preview the quality before downloading?',
    a: 'Yes. Each file card shows original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider and compare quality before downloading.',
  },
];

export default function ReduceImageSizePage() {
  return (
    <>
      {/* Page-load entrance animations — CSS only, respects prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ris-h1  { opacity: 0; transform: translateY(10px); }
            .ris-sub { opacity: 0; transform: translateY(10px); }
            .ris-trust { opacity: 0; }
          }
          .ris-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .ris-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ris-trust {
            transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms;
          }
          @keyframes ris-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .ris-fact { animation: ris-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .ris-fact:nth-child(1) { animation-delay: 240ms; }
          .ris-fact:nth-child(2) { animation-delay: 290ms; }
          .ris-fact:nth-child(3) { animation-delay: 340ms; }
          .ris-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div id="reduce-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="ris-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Reduce Image Size Online
          </h1>
          <p className="ris-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Make your images smaller for web, email, or social media. Supports JPEG, PNG, WebP, and SVG — no account required.
          </p>
          <p className="ris-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        <CompressorUI />

        {/* ── Trust strip ──────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {[
                'Zero bytes sent to any server',
                'WebAssembly runs on your own CPU',
                'Free with no account required',
                'Supports JPEG · PNG · WebP · SVG',
              ].map((fact) => (
                <li key={fact} className="ris-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section
          aria-labelledby="ris-how-heading"
          className="bg-[#F7F8FC] dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="ris-how-heading"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-10"
            >
              Three steps. Under 10 seconds.
            </h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}
                >
                  <span
                    className="block text-[11px] font-bold tracking-[0.16em] mb-3"
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content block ────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Why is reducing image size important?
              </h2>
              <p className="mb-3">
                Image file sizes have grown dramatically as camera sensors have improved. A photo from a modern smartphone is often 4–10 MB. While this resolution is excellent for printing, it is far more than needed for web use, email, or social media — and sending or uploading oversized images creates friction at every step.
              </p>
              <p>
                Reducing image size eliminates that friction: images attach to emails without rejection, upload to platforms without errors, load faster on web pages, and transfer more quickly over mobile networks.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                The most common situations where image size matters
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                How to get the best results
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li>For photos (JPEG, WebP): start at quality 80. Compare the original and compressed versions. If they look identical, try 70. Most people cannot see a difference between quality 75 and 100 on screen.</li>
                <li>For graphics, logos, and screenshots (PNG): the compressor uses colour quantisation. Start at quality 80 for transparent PNGs; you can often go lower for solid-colour graphics.</li>
                <li>If you need the absolute smallest file and format is flexible, try converting to WebP — it almost always produces smaller files than compressed JPEG or PNG.</li>
                <li>Always keep the original file. Compress a copy. Lossy compression is irreversible.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Privacy callout ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: 'oklch(70% 0.158 293)' }}
            >
              Privacy by architecture
            </p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
              Your files never leave your browser.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch] mb-6">
              Most online tools upload your file to a server, process it remotely, then send it back. This tool is architecturally different: compression runs via WebAssembly on your CPU. There is no server that receives your image. Not even temporarily.
            </p>
            <ul className="space-y-2.5">
              {[
                'No file data transmitted over the network at any point',
                'No account, sign-in, or email required to use any feature',
                'Closing the tab clears all data from browser memory completely',
                'Open-source processing: Canvas API and pngquant WASM',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    style={{ color: 'oklch(70% 0.158 293)' }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Mid-page nudge ────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-[#F7F8FC] dark:bg-[#0C0C1A] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The tool is at the top of this page.
          </p>
          <a
            href="#reduce-tool"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
            style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to tool
          </a>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="ris-faq-heading"
          className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/4 py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 id="ris-faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">
              Frequently asked questions
            </h2>
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

        <RelatedTools hrefs={['/compress-image', '/compress-jpeg-online', '/compress-png-online', '/resize-image']} />
      </main>
    </>
  );
}
