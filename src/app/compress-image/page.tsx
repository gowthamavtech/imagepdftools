import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress Image Online — Free Image Compressor',
  description:
    'Compress JPEG, PNG, WebP and SVG images online for free. Runs in your browser, no upload required. Reduce file sizes by up to 80% with no visible quality loss.',
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
      description: 'Free online image compressor for JPEG, PNG, WebP and SVG. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress an image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your image onto the upload zone or click to browse. Supports JPEG, PNG, WebP, and SVG.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control the compression level.' },
        { '@type': 'HowToStep', text: 'Click Download to save the compressed image to your device.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can I compress an image without losing quality?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG and WebP at quality 75–85 typically reduce file size by 60–75% with no visible difference at screen sizes. PNG via pngquant achieves 40–70% reduction.' } },
        { '@type': 'Question', name: 'Does compressing an image reduce its pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool reduces file size (bytes) only. A 4000×3000 image remains 4000×3000 after compression. Use the Resize Image tool to change pixel dimensions.' } },
        { '@type': 'Question', name: 'What quality setting should I use for web images?', acceptedAnswer: { '@type': 'Answer', text: 'Quality 75–85 is the standard recommendation. Files are typically 60–75% smaller than quality 100 with no visible loss at screen viewing sizes.' } },
        { '@type': 'Question', name: 'Is there a file size limit?', acceptedAnswer: { '@type': 'Answer', text: 'Free tier: up to 50 MB per file. Pro: no limit. All processing runs locally in your browser regardless of file size.' } },
        { '@type': 'Question', name: 'Can I compress multiple images at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Which image formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG, PNG, WebP, and SVG. PNG uses pngquant WebAssembly for palette quantisation. JPEG and WebP use the browser native Canvas encoder. SVG strips metadata and whitespace.' } },
        { '@type': 'Question', name: 'What is the difference between lossy and lossless compression?', acceptedAnswer: { '@type': 'Answer', text: 'Lossy compression (JPEG, WebP) permanently discards some image data to achieve smaller file sizes. Lossless compression preserves every pixel. This compressor uses lossy methods for all formats: Canvas API for JPEG and WebP, pngquant for PNG.' } },
        { '@type': 'Question', name: 'Will the compressed image look different when printed?', acceptedAnswer: { '@type': 'Answer', text: 'At quality settings above 80, differences are imperceptible at typical print sizes. For large-format print such as posters or banners, use quality 90 or above.' } },
        { '@type': 'Question', name: 'Can I compare the original and compressed image?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each card shows original and compressed file sizes with the percentage reduction. Click the image preview to open the before/after comparison slider.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your file',
    desc: 'Loads into browser memory. Nothing transmitted.',
  },
  {
    n: '02',
    title: 'WebAssembly runs on your CPU',
    desc: 'Compression happens locally. No server.',
  },
  {
    n: '03',
    title: 'Download and done',
    desc: 'Saved to your device. Cleared from memory.',
  },
];

const FAQS = [
  {
    q: 'How much can I compress without losing quality?',
    a: 'JPEG and WebP at quality 75–85 typically reduce file size by 60–75% with no visible difference at screen sizes. PNG via pngquant achieves 40–70% reduction. Use the comparison slider to check before downloading.',
  },
  {
    q: 'Does compressing an image reduce its pixel dimensions?',
    a: 'No. This tool reduces file size (bytes) only. A 4000×3000 image remains 4000×3000 after compression. To change pixel dimensions, use the Resize Image tool.',
  },
  {
    q: 'What quality setting should I use for web images?',
    a: 'Quality 75–85 is the standard recommendation. Files are typically 60–75% smaller than quality 100 with no visible loss at screen sizes. For email attachments, 65–75 is acceptable. For print or archival, use 90 or above.',
  },
  {
    q: 'What is the difference between lossy and lossless compression?',
    a: 'Lossy compression (JPEG, WebP) permanently discards some image data to achieve smaller file sizes. Lossless compression preserves every pixel. This compressor uses lossy methods for all formats: Canvas API for JPEG and WebP, pngquant for PNG.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'Free tier: up to 50 MB per file. Pro: no limit. All processing runs locally in your browser regardless of file size.',
  },
  {
    q: 'Can I compress multiple images at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. Everything runs in your browser using the Canvas API and pngquant WebAssembly. Your files never leave your device.',
  },
  {
    q: 'Which formats are supported?',
    a: "JPEG, PNG, WebP, and SVG. PNG uses pngquant WebAssembly for palette quantisation. JPEG and WebP use the browser's native Canvas encoder. SVG strips metadata and whitespace from the XML source.",
  },
  {
    q: 'Will the compressed image look different when printed?',
    a: 'At quality settings above 80, the difference between original and compressed is imperceptible at typical print sizes. For large-format print such as posters or banners, use quality 90 or above to preserve fine detail.',
  },
  {
    q: 'Can I compare the original and compressed image?',
    a: 'Yes. Each file card shows the original and compressed sizes with the percentage reduction. Click the image preview to open the before/after comparison slider.',
  },
];

export default function CompressImagePage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .ci-pill  { opacity: 0; transform: translateY(8px); }
            .ci-h1    { opacity: 0; transform: translateY(12px); }
            .ci-sub   { opacity: 0; transform: translateY(12px); }
          }
          .ci-pill {
            transition: opacity 400ms cubic-bezier(0.23,1,0.32,1),
                        transform 400ms cubic-bezier(0.23,1,0.32,1);
          }
          .ci-h1 {
            transition: opacity 550ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 550ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .ci-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 160ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 160ms;
          }
        }

        /* Table: themed header + alternating rows + rounded wrapper */
        .ci-table-wrap { border-radius: 10px; overflow: hidden; border: 0.5px solid rgba(0,0,0,0.10); }
        .dark .ci-table-wrap { border-color: rgba(255,255,255,0.08); }
        .ci-table thead tr { background: #F0EFFF; }
        .ci-table thead th { color: #534AB7; }
        .dark .ci-table thead tr { background: #1A1A22; }
        .dark .ci-table thead th { color: #9D95F5; }
        .ci-table tbody tr:nth-child(odd)  { background: #FFFFFF; }
        .ci-table tbody tr:nth-child(even) { background: #FAFAFA; }
        .dark .ci-table tbody tr:nth-child(odd)  { background: #111114; }
        .dark .ci-table tbody tr:nth-child(even) { background: #0F0F17; }
        .ci-table td, .ci-table th { border-bottom: 0.5px solid rgba(0,0,0,0.08); }
        .dark .ci-table td, .dark .ci-table th { border-bottom: 0.5px solid rgba(255,255,255,0.06); }
        .ci-table tbody tr:last-child td { border-bottom: none; }

        /* FAQ: accordion cards */
        .ci-faq { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .ci-faq details {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.10);
          border-radius: 10px;
          overflow: hidden;
        }
        .dark .ci-faq details {
          background: #111114;
          border-color: rgba(255,255,255,0.08);
        }
        .ci-faq summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 18px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0f172a;
          list-style: none;
          user-select: none;
          transition: background 150ms ease;
        }
        .dark .ci-faq summary { color: #f1f5f9; }
        .ci-faq summary::-webkit-details-marker { display: none; }
        /* Focus ring on the card container — follows border-radius correctly */
        .ci-faq summary:focus { outline: none; }
        .ci-faq summary:focus-visible { outline: none; }
        .ci-faq details:has(summary:focus-visible) {
          box-shadow: 0 0 0 2px oklch(70% 0.158 293);
        }
        /* Subtle bg feedback on press — scale is wrong for full-width rows */
        .ci-faq summary:active { background: rgba(157,149,245,0.06); }
        /* Hover only on devices that support it — touch devices get stuck hover states */
        @media (hover: hover) and (pointer: fine) {
          .ci-faq summary:hover { background: rgba(157,149,245,0.04); }
          .dark .ci-faq summary:hover { background: rgba(157,149,245,0.06); }
        }
        .ci-faq summary::after {
          content: '';
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(157,149,245,0.12);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%239D95F5' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 7.5l5 5 5-5'/%3E%3C/svg%3E");
          background-size: 20px 20px;
          transition: transform 200ms cubic-bezier(0.23,1,0.32,1);
        }
        .ci-faq details[open] summary::after {
          transform: rotate(180deg);
        }
        .ci-faq .ci-faq-body {
          padding: 0 18px 16px;
          font-size: 0.875rem;
          line-height: 1.65;
          color: #64748b;
          border-top: 0.5px solid rgba(0,0,0,0.06);
          padding-top: 14px;
        }
        .dark .ci-faq .ci-faq-body { color: #94a3b8; border-top-color: rgba(255,255,255,0.06); }
        /* Content entry: fade + slide down from slightly above — prevents jarring pop-in */
        @media (prefers-reduced-motion: no-preference) {
          .ci-faq details[open] .ci-faq-body {
            transition: opacity 200ms cubic-bezier(0.23,1,0.32,1),
                        transform 200ms cubic-bezier(0.23,1,0.32,1);
          }
          @starting-style {
            .ci-faq details[open] .ci-faq-body {
              opacity: 0;
              transform: translateY(-6px);
            }
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 bg-[#F7F8FC] dark:bg-[#0C0C1A]">

        {/* ── Hero ── */}
        <div id="compress-tool" className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
          {/* Trust pill */}
          <div className="ci-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium text-slate-600 dark:text-slate-300"
               style={{ border: '1px solid rgba(157,149,245,0.3)', background: 'rgba(157,149,245,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'oklch(70% 0.158 293)' }} aria-hidden="true" />
            No upload · 100% Private · Free
          </div>
          <h1 className="ci-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Compress{' '}
            <span className="italic" style={{ color: 'oklch(70% 0.158 293)' }}>Images</span>
          </h1>
          <p className="ci-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-3">
            Reduce JPEG, PNG, WebP and SVG file sizes directly in your browser. Nothing is uploaded.
          </p>
        </div>

        {/* ── Tool ── */}
        <CompressorUI />

        {/* ── Single muted line below tool ── */}
        <p className="max-w-5xl mx-auto px-4 pt-4 pb-10 text-[0.875rem] text-slate-400 dark:text-slate-500 text-center">
          Free · No account required · No upload · Processes in your browser
        </p>

        {/* ── How it works ── */}
        <section
          aria-labelledby="how-it-works-heading"
          className="border-t border-black/[0.06] dark:border-white/[0.04] py-16 px-4"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'oklch(70% 0.158 293)' }}
            >
              How it works
            </p>
            <h2
              id="how-it-works-heading"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-14"
            >
              Three steps. Under 30 seconds.
            </h2>
            <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
              {STEPS.map((step) => (
                <div key={step.n} className="flex flex-col items-center">
                  <span
                    className="block italic leading-none mb-5"
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '3.5rem',
                      color: 'oklch(70% 0.158 293 / 0.18)',
                    }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <div
                    className="w-8 h-px mb-5"
                    style={{ background: 'oklch(70% 0.158 293 / 0.3)' }}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[18ch]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content block ── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                What is image compression and why does it matter?
              </h2>
              <p className="mb-3">
                Image compression reduces the file size of an image by discarding or encoding redundant pixel data more efficiently. A photo from a modern smartphone can be 6–15 MB, far too large for most web, email, or social media use. Compressing it brings the file size down to 200 KB–1 MB while keeping the image visually indistinguishable from the original at screen sizes.
              </p>
              <p>
                For websites, image compression is one of the highest-impact performance optimisations available. Images are typically the largest assets on a web page, and their file size directly affects how fast the page loads, which in turn affects Google search rankings through Core Web Vitals metrics like Largest Contentful Paint (LCP).
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                When to compress images — and why
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Websites and landing pages.</strong> Every extra kilobyte increases page load time. A 3 MB hero image compressed to 200 KB loads 15 times faster, and Google notices. Compress every image before uploading to your CMS.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Gmail limits attachments to 25 MB; Outlook to 20 MB. A batch of uncompressed photos can easily exceed those limits. Compressing first makes attachments send reliably.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Social media uploads.</strong> Instagram, Facebook, and Twitter recompress images on upload, often degrading quality. Uploading a pre-compressed image at the right size gives you control over the final quality the platform outputs.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">E-commerce product photos.</strong> Shopify, WooCommerce, and Amazon require fast-loading product images. Compressing product photos reduces page load time, lowers bounce rate, and improves conversion.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Messaging apps.</strong> WhatsApp, iMessage, and Telegram recompress files they transmit. Compressing first ensures recipients see the quality you intended.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">App and game assets.</strong> Sprite sheets, backgrounds, and UI textures must be compact to minimise load time and memory usage on mobile devices.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Who benefits from compressing images?
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Web developers and designers.</strong> Every page you build has a performance budget. Uncompressed images are the fastest way to blow it. Compress before shipping any image to production.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Content creators and bloggers.</strong> Images export from Lightroom or Capture One at full quality. Compress them before uploading to WordPress, Webflow, or Ghost to keep your site fast and your Core Web Vitals scores high.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Marketers and social media managers.</strong> Platform upload limits and auto-recompression degrade quality unexpectedly. Compress before scheduling posts to maintain visual quality across all platforms.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Real estate agents and photographers.</strong> Listing portals cap photo uploads. Compress before uploading to meet file size requirements while keeping images sharp.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Students and office workers.</strong> University and government submission portals frequently cap documents at 5–10 MB. A batch of compressed images keeps submissions under the limit.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Format comparison ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-2">
              JPEG, PNG, WebP, SVG — which format should you use?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              The right format depends on the image type and intended use. Here is a quick reference.
            </p>
            <div className="overflow-x-auto ci-table-wrap">
              <table className="ci-table w-full text-xs border-collapse">
                <thead>
                  <tr>
                    {['Format', 'Best for', 'Transparency', 'Typical reduction'].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2.5 pr-4 first:pl-3 font-medium tracking-[0.06em] uppercase text-[0.75rem]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['JPEG', 'Photos, gradients, complex imagery', 'No', '60–80%'],
                    ['PNG', 'Logos, icons, screenshots, anything with transparency', 'Yes', '40–70%'],
                    ['WebP', 'Web delivery — replaces JPEG and PNG', 'Yes', '25–35% vs JPEG'],
                    ['SVG', 'Icons, logos, diagrams (vector only)', 'Yes', '10–50%'],
                  ].map(([fmt, use, transparency, reduction]) => (
                    <tr key={fmt}>
                      <td className="py-2.5 pr-4 pl-3 font-medium text-slate-700 dark:text-slate-300">{fmt}</td>
                      <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">{use}</td>
                      <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">{transparency}</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-400">{reduction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Privacy by architecture ── */}
        <section className="border-t border-black/[0.06] dark:border-white/[0.04] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="p-6 rounded-xl"
              style={{
                border: '1px solid rgba(157,149,245,0.22)',
                background: 'rgba(157,149,245,0.04)',
              }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: 'oklch(70% 0.158 293)' }}
              >
                Privacy by architecture
              </p>
              <h2
                className="text-xl tracking-tight italic mb-4"
                style={{ color: '#9D95F5' }}
              >
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
                      style={{ color: '#9D95F5' }}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Quality guide + technical ── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Choosing the right quality setting
              </h2>
              <p className="mb-5">
                The quality slider controls how aggressively the encoder discards image data. Higher quality preserves more detail. Lower quality produces smaller files. The right setting depends on how the image will be used.
              </p>
              <div className="overflow-x-auto ci-table-wrap">
                <table className="ci-table w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      {['Quality range', 'Best for', 'Typical reduction'].map((h) => (
                        <th
                          key={h}
                          className="text-left py-2.5 pr-4 first:pl-3 font-medium tracking-[0.06em] uppercase text-[0.75rem]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['85–100', 'Print, archival, source files for future editing', '10–30%'],
                      ['75–85', 'Web images, blog posts, social media', '50–75%'],
                      ['60–75', 'Email attachments, preview thumbnails', '65–80%'],
                      ['Below 60', 'Small thumbnails where file size is the only priority', '75–90%'],
                    ].map(([range, use, reduction]) => (
                      <tr key={range}>
                        <td className="py-2.5 pr-4 pl-3 font-medium text-slate-700 dark:text-slate-300">{range}</td>
                        <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">{use}</td>
                        <td className="py-2.5 text-slate-600 dark:text-slate-400">{reduction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                How the image compressor works
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">JPEG and WebP</strong> are compressed using the browser&apos;s native Canvas API encoder. The quality slider maps directly to the encoder&apos;s quality parameter, which controls how aggressively DCT coefficients are quantised.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">PNG</strong> uses pngquant compiled to WebAssembly — the same algorithm behind TinyPNG. It reduces the colour palette from 16.7 million (24-bit) to up to 256 colours, achieving 40–70% reduction with near-invisible quality loss.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">SVG</strong> compression strips XML comments, metadata, and unnecessary whitespace from the source file. Paths, dimensions, and rendering instructions are preserved exactly.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Nothing leaves your device.</strong> All compression runs locally in your browser. Files are never transmitted to any server at any stage of the process.
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Mid-page nudge ── */}
        <div className="bg-white dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The compressor is at the top of this page.
          </p>
          <a
            href="#compress-tool"
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-150"
            style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ── */}
        <section
          aria-labelledby="faq-heading"
          className="bg-white dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-6">
              Frequently asked questions
            </h2>
            <ul className="ci-faq">
              {FAQS.map(({ q, a }) => (
                <li key={q}>
                  <details>
                    <summary>{q}</summary>
                    <div className="ci-faq-body">{a}</div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RelatedTools hrefs={['/compress-png-online', '/compress-jpeg-online', '/reduce-image-size', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
