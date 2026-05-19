import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'JPG to WebP Converter — Free Online',
  description: 'Convert JPEG images to WebP format instantly in your browser. No upload, no server — up to 35% smaller files with the same visual quality.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-webp' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPG to WebP Converter',
      url: 'https://imagepdf.tools/jpg-to-webp',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert JPEG images to WebP format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG to WebP online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Drop your JPEG', text: 'Drop your JPEG file onto the converter.' },
        { '@type': 'HowToStep', position: 2, name: 'Format: WebP', text: 'The output format is set to WebP. Adjust the quality slider if needed.' },
        { '@type': 'HowToStep', position: 3, name: 'Download', text: 'Download your converted WebP file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert JPG to WebP?', acceptedAnswer: { '@type': 'Answer', text: 'WebP produces files 25-35% smaller than JPEG at the same quality. Faster pages, better Core Web Vitals, lower bandwidth costs.' } },
        { '@type': 'Question', name: 'Does WebP look better than JPEG at the same file size?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A WebP at quality 80 typically matches a JPEG at quality 90 while being significantly smaller.' } },
        { '@type': 'Question', name: 'Will WebP work on all browsers?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is supported in Chrome, Firefox, Safari 14+, Edge, and Opera — over 97% of global browser usage.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Conversion runs entirely in your browser via the Canvas API. Nothing leaves your device.' } },
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
    desc: 'Drag and drop JPEG files onto the converter, or click to browse. Batch convert up to 5 files at once on the free plan.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Format: WebP',
    desc: 'Output is pre-set to WebP. Adjust the quality slider — quality 80 is the optimal starting point for web use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download',
    desc: 'Your converted WebP file is ready instantly. Download it or save the whole batch as a ZIP.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: 'Why convert JPG to WebP?',
    a: 'WebP produces files that are 25–35% smaller than JPEG at the same visual quality. For websites, this means faster page load times and better Core Web Vitals scores. Google recommends WebP as the preferred format for web images.',
  },
  {
    q: 'Does WebP look better than JPEG at the same file size?',
    a: 'Yes. WebP uses a more efficient compression algorithm than JPEG. A WebP file at quality 80 typically looks as good as a JPEG at quality 90 — while being significantly smaller.',
  },
  {
    q: 'Will WebP work on all browsers?',
    a: 'WebP is supported by Chrome, Firefox, Safari (since version 14), Edge, and Opera — covering over 97% of global browser usage. For users on older browsers, you can serve a JPEG fallback using the HTML picture element.',
  },
  {
    q: 'What quality setting should I use?',
    a: 'Quality 80 is the sweet spot for most web use cases — it gives the best file size reduction while remaining visually identical to the original at typical screen sizes. For print or archival use, set quality to 90–95.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple JPEG files to WebP at once?',
    a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with a Pro subscription.',
  },
  {
    q: 'Is WebP supported by Google Search?',
    a: "Yes. Google crawls and indexes WebP images just like JPEG. Google's own PageSpeed Insights tool actively recommends serving images in WebP or AVIF over JPEG for better performance scores.",
  },
  {
    q: 'Can I use WebP images in emails?',
    a: 'Most modern web-based email clients — Gmail, Apple Mail, Outlook on the web — render WebP inline. However, Outlook desktop on Windows still requires JPEG or PNG for reliable inline rendering. If universal email compatibility is critical, use JPEG instead.',
  },
];

export default function JpgToWebpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="jpg-to-webp-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">JPG to WebP</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              JPEG to WebP.<br /><span className="text-accent">Up to 35% smaller.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert JPEG images to modern WebP format — same visual quality, significantly smaller files. All processing happens in your browser.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <CompressorUI initialFormat="image/webp" />

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Smaller WebP, instantly.</em>
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

        {/* ── JPEG vs WebP comparison ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Format comparison</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              JPEG vs WebP
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-8">
              JPEG has been the standard photo format since the 1990s and remains excellent. WebP, released by Google in 2010, offers meaningfully better compression — 25–35% smaller files at the same visual quality. For websites, that reduction directly improves Core Web Vitals and reduces bandwidth costs.
            </p>
            <div className="rounded-[10px] overflow-hidden bd-2">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 font-medium text-fg-2">Feature</th>
                    <th className="text-left px-4 py-3 font-medium text-fg-2">JPEG</th>
                    <th className="text-left px-4 py-3 font-medium text-accent">WebP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Compression', 'Lossy only', 'Lossy + lossless'],
                    ['File size (same quality)', 'Baseline', '25–35% smaller'],
                    ['Transparency', 'Not supported', 'Supported'],
                    ['Animation', 'Not supported', 'Supported'],
                    ['Browser support', 'Universal', '97%+ modern browsers'],
                    ['Best for', 'Universal compatibility', 'Web-optimised images'],
                  ].map(([f, jpeg, webp], i) => (
                    <tr key={f} className={i % 2 === 0 ? '' : 'bg-surface'}>
                      <td className="px-4 py-3 text-fg-2 font-medium bd-t-1">{f}</td>
                      <td className="px-4 py-3 text-fg-2 bd-t-1">{jpeg}</td>
                      <td className="px-4 py-3 text-accent font-medium bd-t-1">{webp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Under the hood ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How the conversion works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              When you upload a JPEG, the browser decodes it natively and draws it onto an HTML Canvas element. The canvas is then exported as WebP using the browser's built-in WebP encoder. The quality slider controls the WebP compression level. The entire process runs locally in your browser tab — no data is sent to any server.
            </p>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your images never leave your browser.</h2>
              <div className="space-y-3">
                {[
                  'Conversion runs locally via the Canvas API and browser WebP encoder',
                  'No file data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your images at any point',
                  'Works offline once the page has loaded',
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

        {/* ── Back to tool nudge ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#jpg-to-webp-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to converter
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

        <RelatedTools hrefs={['/convert-image-to-webp', '/png-to-webp', '/webp-to-jpg', '/compress-image']} />

      </main>
    </>
  );
}
