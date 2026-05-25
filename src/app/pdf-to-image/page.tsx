import type { Metadata } from 'next';
import { PdfToImageUI } from '@/components/PdfToImageUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PDF to Image — Convert PDF Pages to JPG, PNG, or WebP Free',
  description:
    'Convert every page of a PDF to high-quality images — JPG, PNG, or WebP. Choose 72, 144, or 216 DPI. No upload, no server, 100% private. Download individually or as ZIP.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-to-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PDF to Image',
      url: 'https://imagepdf.tools/pdf-to-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF to image converter. Export PDF pages as JPG, PNG, or WebP at up to 216 DPI — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert a PDF to images online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF onto the tool.' },
        { '@type': 'HowToStep', text: 'Choose your output format (JPG, PNG, or WebP) and resolution (1×, 2×, or 3×).' },
        { '@type': 'HowToStep', text: 'Click Convert. Download individual images or all pages as a ZIP file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What image formats can I export to?', acceptedAnswer: { '@type': 'Answer', text: 'JPG (JPEG), PNG, and WebP. JPG is best for photos and documents. PNG is lossless and best for screenshots, diagrams, and text. WebP gives small file sizes at good quality.' } },
        { '@type': 'Question', name: 'What resolution are the output images?', acceptedAnswer: { '@type': 'Answer', text: 'You choose: 1× (72 DPI, smallest file), 2× (144 DPI, recommended — sharp on most screens and for standard printing), or 3× (216 DPI, high quality for large-format printing). All resolutions are available for free.' } },
        { '@type': 'Question', name: 'Does this upload my PDF to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Conversion runs entirely in your browser using PDF.js (Mozilla\'s open-source engine) and the HTML5 Canvas API. Your PDF never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert a multi-page PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All pages are converted. A Download All as ZIP button lets you grab every image in one click.' } },
        { '@type': 'Question', name: 'What is the difference between JPG and PNG output?', acceptedAnswer: { '@type': 'Answer', text: 'JPG is compressed (lossy) — smaller files, best for photographs. PNG is lossless — larger files, best for text-heavy documents, screenshots, and images that need to remain crisp at 100% zoom.' } },
      ],
    },
  ],
};

const C       = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PDF',
    desc: 'Upload any PDF — reports, presentations, scanned documents, or eBooks. Password-protected PDFs are not currently supported.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Choose format and DPI',
    desc: 'Select JPG, PNG, or WebP. Choose 1×, 2×, or 3× resolution. All options are free — no paywall on higher DPI.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your images',
    desc: 'Each page is a separate image. Download them individually by hovering over a page, or click Download All as ZIP.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const USE_CASES = [
  { label: 'Social media posts', desc: 'Share a PDF report, certificate, or infographic as an image. Instagram, LinkedIn, and X all accept images but not PDFs.' },
  { label: 'Presentation slides', desc: 'Import individual PDF pages as image slides into PowerPoint, Keynote, or Google Slides.' },
  { label: 'Thumbnails and previews', desc: 'Generate a cover image from the first page of a document for a blog post, download page, or product listing.' },
  { label: 'Document archiving', desc: 'Convert scanned PDFs back to individual image files for storage in image management systems.' },
  { label: 'Email and messaging', desc: 'Many email clients and messaging apps display images inline — a JPG of a PDF page is easier to read at a glance than an attachment.' },
  { label: 'Web embedding', desc: 'Embed PDF content in web pages as images. Images load faster than PDF viewers and work on every browser and device.' },
];

const FORMAT_COMPARISON = [
  { format: 'JPG', size: 'Smallest', quality: 'Good — lossy compression', best: 'Documents, photos, presentations' },
  { format: 'PNG', size: 'Largest', quality: 'Perfect — lossless', best: 'Screenshots, diagrams, text-heavy pages' },
  { format: 'WebP', size: 'Small', quality: 'Good — modern compression', best: 'Web use, modern browsers' },
];

const FAQS = [
  { q: 'What image formats can I export to?', a: 'JPG (JPEG), PNG, and WebP. JPG is best for photos and documents. PNG is lossless and best for screenshots, diagrams, and text. WebP gives small file sizes at good quality.' },
  { q: 'What resolution are the output images?', a: 'You choose: 1× (72 DPI, smallest file), 2× (144 DPI, recommended), or 3× (216 DPI, high quality for large-format printing). All resolutions are free — no paywall.' },
  { q: 'Does this upload my PDF to a server?', a: 'No. Conversion runs entirely in your browser using PDF.js (Mozilla\'s open-source engine) and the HTML5 Canvas API. Your PDF never leaves your device.' },
  { q: 'Can I convert a multi-page PDF?', a: 'Yes. All pages are converted. A Download All as ZIP button lets you grab every image in one click.' },
  { q: 'What is the difference between JPG and PNG output?', a: 'JPG is compressed (lossy) — smaller files, best for photographs. PNG is lossless — larger files, best for text-heavy documents and images that need to remain crisp at 100% zoom.' },
];

export default function PdfToImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="pdf-to-image-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PDF to Image</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Every PDF page.<br /><span className="text-accent">A high-quality image.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[50ch] mx-auto m-0 mb-3">
              Export PDF pages to JPG, PNG, or WebP — at 72, 144, or 216 DPI. All free, all in your browser, all in seconds.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload · All DPI options free</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['JPG · PNG · WebP', '3× DPI free', 'No upload', 'No watermark'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <PdfToImageUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">PDF pages as images.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc, icon }) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                  <span aria-hidden="true" className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none" style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}>{n}</span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Use cases</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Why convert a PDF <em className="text-accent">to an image?</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {USE_CASES.map(({ label, desc }) => (
                <div key={label} className="rounded-[10px] bg-surface bd-2 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <h3 className="text-[14px] font-semibold text-fg-1 m-0 leading-snug">{label}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Format comparison ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Format guide</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              JPG, PNG, or WebP — <em className="text-accent">which to choose?</em>
            </h2>
            <div className="overflow-auto rounded-[12px] bd-2">
              <table style={{ minWidth: '460px' }} className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="bd-b-2 bg-surface">
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Format</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">File size</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Quality</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_COMPARISON.map((row, i) => (
                    <tr key={row.format} className={i < FORMAT_COMPARISON.length - 1 ? 'bd-b-2' : ''}>
                      <td className="px-5 py-3 font-semibold text-accent">{row.format}</td>
                      <td className="px-5 py-3 text-fg-2">{row.size}</td>
                      <td className="px-5 py-3 text-fg-2">{row.quality}</td>
                      <td className="px-5 py-3 text-fg-2">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your PDF never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'All rendering runs locally via PDF.js and the HTML5 Canvas API',
                  'No file data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your files at any point',
                  'Close the tab and everything is gone — nothing persists',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[13.5px] leading-[1.6] text-fg-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Back to tool ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#pdf-to-image-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to tool
          </a>
        </div>

        {/* ── FAQ ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Frequently asked questions</h2>
            <div className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/pdf-to-jpg', '/pdf-to-word', '/compress-pdf', '/image-to-pdf']} />

      </main>
    </>
  );
}
