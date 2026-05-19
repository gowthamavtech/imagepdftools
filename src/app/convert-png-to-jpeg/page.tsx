import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Convert PNG to JPEG Online — Free & Private',
  description: 'Convert PNG images to JPEG instantly in your browser. No upload, no server — 100% private. Reduce file size by up to 80%.',
  alternates: { canonical: 'https://imagepdf.tools/convert-png-to-jpeg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PNG to JPEG Converter',
      url: 'https://imagepdf.tools/convert-png-to-jpeg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert PNG images to JPEG format. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert PNG to JPEG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PNG file onto the converter.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider for the JPEG output.' },
        { '@type': 'HowToStep', text: 'Download your converted JPEG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert PNG to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'JPEGs are significantly smaller than PNGs for photographs because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.' } },
        { '@type': 'Question', name: 'Will I lose transparency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white. If you need to preserve transparency, keep the PNG format or export to WebP instead.' } },
        { '@type': 'Question', name: 'What quality setting should I use?', acceptedAnswer: { '@type': 'Answer', text: 'For web use, 75-85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple PNGs at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited with Pro.' } },
        { '@type': 'Question', name: 'How much smaller is JPEG than PNG?', acceptedAnswer: { '@type': 'Answer', text: 'For photos, JPEG is typically 60-80% smaller than PNG at quality 80. A 1 MB PNG photo often converts to a 150-300 KB JPEG with no visible difference on screen.' } },
        { '@type': 'Question', name: 'Can I convert PNG screenshots to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but screenshots with text and sharp edges often look slightly blurry in JPEG due to compression artefacts. For screenshots, use quality 85-90 to preserve text sharpness.' } },
        { '@type': 'Question', name: 'Will converting PNG to JPEG change the image dimensions?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion only changes the file format and compression. The pixel dimensions remain exactly the same as the original PNG.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PNG',
    desc: 'Drag and drop PNG files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.',
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
    title: 'Output format: JPEG',
    desc: 'The format is set to JPEG automatically. Adjust the quality slider — quality 80 is the optimal starting point for most images.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your JPEG',
    desc: 'Your converted JPEG file is ready instantly. Download it directly or save the whole batch as a ZIP.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FORMAT_ROWS = [
  { feature: 'Compression',   png: 'Lossless (larger)',    jpeg: 'Lossy (much smaller)' },
  { feature: 'Transparency',  png: 'Supported',            jpeg: 'Not supported' },
  { feature: 'Best for',      png: 'Logos, icons, UI',     jpeg: 'Photos, complex images' },
  { feature: 'Typical size',  png: '500 KB – 5 MB',        jpeg: '50 KB – 500 KB' },
];

const FAQS = [
  { q: 'Why convert PNG to JPEG?', a: 'JPEGs are significantly smaller than PNGs for photographs and complex images because they use lossy compression. If your image has no transparency and is a photo or detailed graphic, JPEG will give you a much smaller file with minimal visible quality loss.' },
  { q: 'How much smaller is JPEG than PNG?', a: 'For photos, JPEG is typically 60–80% smaller than PNG at quality 80. A 1 MB PNG photo often converts to a 150–300 KB JPEG with no visible difference on screen. The exact savings depend on the image content — photos compress more than flat graphics.' },
  { q: 'Will I lose transparency when converting PNG to JPEG?', a: 'Yes. JPEG does not support transparent pixels. Any transparent areas in your PNG will be filled with white in the JPEG output. If you need to preserve transparency, keep the PNG format or export to WebP instead.' },
  { q: 'What quality setting should I use?', a: 'For web use, 75–85 is the sweet spot: noticeably smaller files with near-identical visual quality. For print or archival purposes, use 90+. Quality 80 is a reliable default for most conversions.' },
  { q: 'Can I convert PNG screenshots to JPEG?', a: 'Yes, but screenshots with text and sharp edges can look slightly blurry in JPEG due to compression artefacts on hard edges. For screenshots, use quality 85–90 to preserve text sharpness. If pixel-perfect quality is critical, stay with PNG.' },
  { q: 'Will converting PNG to JPEG change the image dimensions?', a: 'No. The conversion only changes the file format and compression. The pixel dimensions remain exactly identical to the original PNG.' },
  { q: 'Is my image uploaded to a server?', a: 'No. All conversion happens entirely inside your browser using the Canvas API. Your files never leave your device.' },
  { q: 'Can I convert multiple PNG files at once?', a: 'Yes. Drop up to 5 files at once on the Free tier, or unlimited files with Pro.' },
];

export default function ConvertPngToJpegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .cpj-h1    { opacity: 0; transform: translateY(10px); }
            .cpj-sub   { opacity: 0; transform: translateY(10px); }
            .cpj-trust { opacity: 0; }
          }
          .cpj-h1 { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1); }
          .cpj-sub { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms, transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms; }
          .cpj-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        <section id="cpj-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />

          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PNG to JPEG</span>
            <h1 className="cpj-h1 serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Convert PNG to JPEG.<br /><span className="text-accent">Up to 80% smaller.</span>
            </h1>
            <p className="cpj-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Shrink PNG files by converting to JPEG. Ideal for photos and images without transparency. Browser-native. Nothing uploaded.
            </p>
            <p className="cpj-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={C}><CompressorUI initialFormat="image/jpeg" /></div>

        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span data-animate="scroll" className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Instant results.</em>
            </h2>
            <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
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
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <h2 className="serif italic text-fg-1 m-0 mb-5" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              PNG vs JPEG — <em className="text-accent">when to use which.</em>
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">PNG uses lossless compression — every pixel is stored exactly, but at the cost of large file sizes. For photographs and complex images, this is unnecessary overhead. A photo as JPEG at quality 80 is typically 60–80% smaller than the same photo as PNG with virtually no visible difference on screen.</p>
            <div className="rounded-[10px] overflow-hidden bd-2 mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-elevated">
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">Feature</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-fg-3 px-4 py-3">PNG</th>
                    <th className="font-data text-[10.5px] font-medium tracking-[0.12em] uppercase text-accent px-4 py-3">JPEG</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_ROWS.map(({ feature, png, jpeg }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? 'bg-surface' : 'bg-page'}>
                      <td className="px-4 py-3 text-[13px] font-medium text-fg-1">{feature}</td>
                      <td className="px-4 py-3 text-[13px] text-fg-2">{png}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-accent">{jpeg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'Photography and portraits.', text: 'Photos saved as PNG are unnecessarily large. Converting to JPEG reduces size dramatically with no perceptible quality loss at typical screen sizes.' },
                { label: 'Website hero images and banners.', text: 'Large banner images saved as PNG slow page load times. Converting to JPEG at quality 80–85 gives faster-loading images with excellent visual quality.' },
                { label: 'Product photos for e-commerce.', text: 'Product photography without transparent backgrounds is best served as JPEG on Shopify, WooCommerce, and Amazon — where PNG files are unnecessarily large.' },
                { label: 'Email marketing images.', text: 'Embedded images in email newsletters need to be small. PNG photos in emails slow down rendering. Converting to JPEG keeps emails lightweight.' },
              ].map(({ label, text }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }} aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                  </span>
                  <span className="text-[13.5px] text-fg-2 leading-[1.55]"><strong className="font-medium text-fg-1">{label}</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your files never leave your browser.</h2>
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">The converter uses the browser&apos;s native Canvas API. Your PNG images are processed entirely on your own hardware — nothing is transmitted, stored, or logged at any point.</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {['No server upload — conversion happens on your CPU', 'No account or sign-up required', 'Batch convert up to 5 files free, unlimited with Pro', 'Works offline once the page has loaded'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg-2">
                    <span className="shrink-0 w-4 h-4 rounded-full grid place-items-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }} aria-hidden="true">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#cpj-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
            Back to converter
          </a>
        </div>

        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span data-animate="scroll" className="hp-eyebrow">FAQ</span>
            <h2 data-animate="scroll" className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Frequently asked questions</h2>
            <div data-animate-stagger className="bd-t-1">
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

        <RelatedTools hrefs={['/jpg-to-png', '/png-to-webp', '/webp-to-jpg', '/convert-image-to-webp']} />
      </main>
    </>
  );
}
