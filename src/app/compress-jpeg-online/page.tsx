import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Compress JPEG Online — Free JPEG Compressor',
  description:
    'Compress JPEG images online for free — up to 90% smaller with fine-grained quality control. No upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/compress-jpeg-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPEG Compressor',
      url: 'https://imagepdf.tools/compress-jpeg-online',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online JPEG compressor with quality slider. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to compress a JPEG image online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG or JPG file onto the compressor.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider — lower values produce smaller files.' },
        { '@type': 'HowToStep', text: 'Download your compressed JPEG.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What JPEG quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'For websites and social media, 70–85 is the sweet spot — files are typically 60–75% smaller than quality 100 with virtually no visible difference at screen sizes. For print or archival, use 90–95. For thumbnails or previews, 50–65 is acceptable.' } },
        { '@type': 'Question', name: 'Does JPEG compression permanently reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JPEG is a lossy format — each time you compress and re-save a JPEG, some image data is discarded. Keep the original file and use the compressed version only for its intended purpose (web, email, etc.).' } },
        { '@type': 'Question', name: 'What is the difference between this and converting to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'WebP achieves smaller file sizes than JPEG at equivalent visual quality. If you need a JPEG specifically — for a platform requirement, email compatibility, or printing — use this compressor. If format does not matter, converting to WebP will give you an even smaller file.' } },
        { '@type': 'Question', name: 'Is my JPEG uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All compression runs in your browser using the Canvas API. Your file never leaves your device — not even temporarily.' } },
        { '@type': 'Question', name: 'Can I compress multiple JPEG files at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.' } },
        { '@type': 'Question', name: 'Does compressing a JPEG change its pixel dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. Compression reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 after compression. To change pixel dimensions, use the Resize Image tool.' } },
        { '@type': 'Question', name: 'What is the maximum file size this tool handles?', acceptedAnswer: { '@type': 'Answer', text: 'Free tier: up to 50 MB per file. Pro: no limit. All processing runs locally in your browser regardless of file size, so very large files may take longer depending on your device.' } },
        { '@type': 'Question', name: 'Why does my JPEG look the same at quality 80 and quality 95?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG quality differences are often imperceptible at screen sizes. At quality 80 the file can be 60% smaller than quality 95 with no visible difference on a monitor. The difference only becomes noticeable when zoomed in past 100% or when printing large format.' } },
      ],
    },
  ],
};

const STEPS = [
  {
    n: '01',
    title: 'Drop your JPEG',
    desc: 'Drag a JPEG or JPG file onto the zone or click to browse. Up to 50 MB per file on the free tier.',
  },
  {
    n: '02',
    title: 'Adjust the quality slider',
    desc: 'Lower values produce smaller files. Quality 75–85 is the standard for web and email use.',
  },
  {
    n: '03',
    title: 'Download your JPEG',
    desc: 'Your browser compresses using the Canvas API. No data is sent over the network at any point.',
  },
];

const FAQS = [
  {
    q: 'What JPEG quality setting should I use?',
    a: 'For websites and social media, 70–85 is the sweet spot — files are typically 60–75% smaller than quality 100 with virtually no visible difference at screen sizes. For print or archival, use 90–95. For thumbnails or previews, 50–65 is acceptable.',
  },
  {
    q: 'Does JPEG compression permanently reduce quality?',
    a: 'Yes. JPEG is a lossy format — each time you compress and re-save a JPEG, some image data is discarded. Keep the original file and use the compressed version only for its intended purpose (web, email, etc.).',
  },
  {
    q: 'What is the difference between this and converting to WebP?',
    a: 'WebP achieves smaller file sizes than JPEG at equivalent visual quality. If you need a JPEG specifically — for a platform requirement, email compatibility, or printing — use this compressor. If format does not matter, converting to WebP will give you an even smaller file.',
  },
  {
    q: 'Is my JPEG uploaded to a server?',
    a: 'No. All compression runs in your browser using the Canvas API. Your file never leaves your device — not even temporarily.',
  },
  {
    q: 'Can I compress multiple JPEG files at once?',
    a: 'Yes. Free tier supports up to 5 images per batch. Pro users get unlimited batch compression and can download everything as a ZIP.',
  },
  {
    q: 'Does compressing a JPEG change its pixel dimensions?',
    a: 'No. Compression reduces file size in bytes only. A 4000×3000 pixel image remains 4000×3000 after compression. To change pixel dimensions, use the Resize Image tool.',
  },
  {
    q: 'What is the maximum file size this tool handles?',
    a: 'Free tier: up to 50 MB per file. Pro: no limit. All processing runs locally in your browser regardless of file size, so very large files may take longer depending on your device.',
  },
  {
    q: 'Why does my JPEG look the same at quality 80 and quality 95?',
    a: 'JPEG quality differences are often imperceptible at screen sizes. At quality 80 the file can be 60% smaller than quality 95 with no visible difference on a monitor. The difference only becomes noticeable when zoomed in past 100% or when printing large format.',
  },
];

export default function CompressJpegPage() {
  return (
    <>
      {/* Page-load entrance animations — CSS only, respects prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cj-h1  { opacity: 0; transform: translateY(10px); }
            .cj-sub { opacity: 0; transform: translateY(10px); }
            .cj-trust { opacity: 0; }
          }
          .cj-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .cj-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .cj-trust {
            transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms;
          }
          @keyframes cj-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .cj-fact { animation: cj-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .cj-fact:nth-child(1) { animation-delay: 240ms; }
          .cj-fact:nth-child(2) { animation-delay: 290ms; }
          .cj-fact:nth-child(3) { animation-delay: 340ms; }
          .cj-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div id="jpeg-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="cj-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Compress JPEG Online
          </h1>
          <p className="cj-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Reduce JPEG file sizes by up to 90% with fine-grained quality control. Uses the Canvas API directly in your browser. Nothing uploaded.
          </p>
          <p className="cj-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        <div className="text-left">
          <CompressorUI
            initialFormat="image/jpeg"
            dropLabel="Drop your JPEG files here"
            dropHint="JPEG · JPG files · up to 50 MB each"
            dropFileTypeName="JPEG"
            dropAccept={['image/jpeg', 'image/jpg']}
          />
        </div>

        {/* ── Trust strip ──────────────────────────────────────────── */}
        <div className="border-t border-slate-100 dark:border-white/[0.05] bg-white dark:bg-[#0C0C1A]">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {[
                'Zero bytes sent to any server',
                'Canvas API runs on your own CPU',
                'Free with no account required',
                'Typically done in under 2 seconds',
              ].map((fact) => (
                <li key={fact} className="cj-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section
          aria-labelledby="cj-how-heading"
          className="bg-[#F7F8FC] dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="cj-how-heading"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-10"
            >
              Three steps. Under 10 seconds.
            </h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/[0.06]">
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
                What is JPEG compression and how does it work?
              </h2>
              <p className="mb-3">
                JPEG is a lossy image compression standard designed for photographs and colour-rich images. It divides the image into 8×8 pixel blocks and applies a Discrete Cosine Transform (DCT) to each block, discarding high-frequency detail the human eye is less sensitive to. The result is a much smaller file with minimal perceptible quality loss at moderate compression levels.
              </p>
              <p>
                The quality level — expressed as a number from 1 to 100 — controls how aggressively the high-frequency data is discarded. At quality 100, the file is large. At quality 50, significant data is discarded and artefacts may be visible in fine detail areas.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                The right quality setting for every use case
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/[0.08]">
                      <th className="text-left py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">Quality</th>
                      <th className="text-left py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">Best for</th>
                      <th className="text-left py-2.5 font-semibold text-slate-800 dark:text-slate-200">Typical reduction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {[
                      ['90–100', 'Print, archival, portfolios', '10–30%'],
                      ['75–85', 'Web images, social media', '50–75%'],
                      ['60–75', 'Email attachments, previews', '65–80%'],
                      ['40–60', 'Thumbnails, rough previews', '75–90%'],
                    ].map(([q, use, size]) => (
                      <tr key={q}>
                        <td className="py-2.5 pr-4 font-medium" style={{ color: 'oklch(70% 0.158 293)' }}>{q}</td>
                        <td className="py-2.5 pr-4">{use}</td>
                        <td className="py-2.5">{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                Why compress JPEG images?
              </h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Web performance.</strong> Images account for most of the page weight on websites. Compressing JPEGs reduces load times, improves Core Web Vitals scores, and directly impacts Google rankings.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Most email providers limit attachments to 10–25 MB. Compressing your photos before attaching ensures they send without bouncing.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Platform upload limits.</strong> Real estate listing sites, job boards, and school portals often cap image uploads at 1–5 MB. Compressing first prevents upload rejections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Storage efficiency.</strong> Whether archiving photos on a hard drive or in cloud storage, compressed JPEGs let you store more images in the same space.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Faster sharing on mobile.</strong> Sending large JPEGs over WhatsApp, Telegram, or iMessage consumes significant mobile data. Compressing first makes sharing faster and cheaper.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Privacy callout ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-14 px-4">
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
              Most online tools upload your file to a server, process it remotely, then send it back. This tool is architecturally different: compression runs via the Canvas API on your CPU. There is no server that receives your image. Not even temporarily.
            </p>
            <ul className="space-y-2.5">
              {[
                'No file data transmitted over the network at any point',
                'No account, sign-in, or email required to use any feature',
                'Closing the tab clears all data from browser memory completely',
                'Open-source processing: browser-native Canvas API encoder',
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
        <div className="border-t border-slate-100 dark:border-white/[0.05] bg-[#F7F8FC] dark:bg-[#0C0C1A] py-10 px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The compressor is at the top of this page.
          </p>
          <a
            href="#jpeg-tool"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
            style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cj-faq-heading"
          className="bg-white dark:bg-[#0C0C1A] border-t border-black/[0.06] dark:border-white/[0.04] py-16 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 id="cj-faq-heading" className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">
              Frequently asked questions
            </h2>
            <dl className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RelatedTools hrefs={['/compress-image', '/reduce-image-size', '/convert-image-to-webp', '/compress-png-online']} />
      </main>
    </>
  );
}
