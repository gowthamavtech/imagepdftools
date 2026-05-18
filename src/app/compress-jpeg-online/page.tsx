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

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your JPEG',
    desc: 'Drag a JPEG or JPG file onto the zone or click to browse. Up to 50 MB per file on the free tier.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M17 8l-5-5-5 5" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Adjust the quality slider',
    desc: 'Lower values produce smaller files. Quality 75–85 is the standard for web and email use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your JPEG',
    desc: 'Your browser compresses using the Canvas API. No data is sent over the network at any point.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const QUALITY_ROWS = [
  { range: '90–100', use: 'Print, archival, portfolios',   size: '10–30% smaller' },
  { range: '75–85',  use: 'Web images, social media',      size: '50–75% smaller' },
  { range: '60–75',  use: 'Email attachments, previews',   size: '65–80% smaller' },
  { range: '40–60',  use: 'Thumbnails, rough previews',    size: '75–90% smaller' },
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
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id="jpeg-tool"
          className="relative"
          style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}
        >
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              right: '-10%', top: '-10%',
              width: 'min(900px, 100vw)', height: 'min(600px, 100vw)',
              background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(48px)',
              opacity: 0.5,
            }}
          />

          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">JPEG Compressor</span>

            <h1
              className="cj-h1 serif italic text-fg-1 m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Compress JPEG online.<br />
              <span className="text-accent">Up to 90% smaller.</span>
            </h1>

            <p className="cj-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Fine-grained quality control via the Canvas API — directly in your browser. Nothing uploaded, nothing stored.
            </p>

            <p className="cj-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">
              Free · No account · No upload
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ──────────────────────────────────────────── */}
        <div className={C}>
          <CompressorUI
            initialFormat="image/jpeg"
            dropLabel="Drop your JPEG files here"
            dropHint="JPEG · JPG files · up to 50 MB each"
            dropFileTypeName="JPEG"
            dropAccept={['image/jpeg', 'image/jpg']}
          />
        </div>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2
              className="serif italic text-fg-1 text-center m-0 mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Three steps. <em className="text-accent">Under 10 seconds.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc, icon }) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                  <span
                    aria-hidden="true"
                    className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none"
                    style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}
                  >
                    {n}
                  </span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">
                    {title}
                  </h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quality guide table ───────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              The right quality setting <em className="text-accent">for every use case.</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.6] m-0 mb-6 max-w-[60ch]">
              JPEG quality controls how aggressively high-frequency image data is discarded. At quality 100, files are large. At quality 50, artefacts may be visible in fine-detail areas.
            </p>

            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-elevated">
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Quality</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Best for</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Typical reduction</th>
                  </tr>
                </thead>
                <tbody>
                  {QUALITY_ROWS.map(({ range, use, size }, i) => (
                    <tr key={range} className={i % 2 === 0 ? 'bg-surface' : 'bg-page'}>
                      <td className="px-4 py-3 text-[13px]">
                        <span className="font-data text-[11px] font-bold text-accent">{range}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{use}</td>
                      <td className="px-4 py-3 text-[13px] text-fg-2 font-medium">{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Why compress JPEG ─────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2
              className="serif italic text-fg-1 m-0 mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
            >
              Why compress <em className="text-accent">JPEG images?</em>
            </h2>

            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Web performance.', text: 'Images account for most page weight on websites. Compressing JPEGs reduces load times, improves Core Web Vitals scores, and directly impacts Google rankings.' },
                { label: 'Email attachments.', text: 'Most email providers limit attachments to 10–25 MB. Compressing your photos before attaching ensures they send without bouncing.' },
                { label: 'Platform upload limits.', text: 'Real estate sites, job boards, and school portals often cap image uploads at 1–5 MB. Compressing first prevents upload rejections.' },
                { label: 'Storage efficiency.', text: 'Whether archiving photos on a hard drive or in cloud storage, compressed JPEGs let you store more images in the same space.' },
                { label: 'Faster sharing on mobile.', text: 'Sending large JPEGs over WhatsApp, Telegram, or iMessage consumes significant mobile data. Compressing first makes sharing faster and cheaper.' },
              ].map(({ label, text }) => (
                <li key={label} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] text-fg-2 leading-[1.55]">
                    <strong className="font-medium text-fg-1">{label}</strong> {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Privacy card ──────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div
                aria-hidden="true"
                className="absolute top-[-1px] left-[8%] right-[8%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }}
              />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">
                Privacy by architecture
              </p>
              <h2
                className="serif italic text-fg-1 m-0 mb-4"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Your files never leave your browser.
              </h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">
                Most online tools upload your file to a server, process it remotely, then send it back. This tool is architecturally different: compression runs via the Canvas API on your CPU. There is no server that receives your image. Not even temporarily.
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {[
                  'No file data transmitted over the network at any point',
                  'No account, sign-in, or email required to use any feature',
                  'Closing the tab clears all data from browser memory completely',
                  'Open-source processing: browser-native Canvas API encoder',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg-2">
                    <span
                      className="shrink-0 w-4 h-4 rounded-full grid place-items-center"
                      style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                      aria-hidden="true"
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Back to tool nudge ────────────────────────────── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a
            href="#jpeg-tool"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to compressor
          </a>
        </div>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2
              className="serif italic text-fg-1 m-0 mb-8"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              Frequently asked questions
            </h2>

            <div className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/compress-image', '/reduce-image-size', '/convert-image-to-webp', '/compress-png-online']} />
      </main>
    </>
  );
}
