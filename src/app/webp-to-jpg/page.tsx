import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'WebP to JPG Converter — Free Online',
  description: 'Convert WebP images to JPEG instantly in your browser. No upload, no server — 100% private. Maximum compatibility with all apps and devices.',
  alternates: { canonical: 'https://imagepdf.tools/webp-to-jpg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — WebP to JPG Converter',
      url: 'https://imagepdf.tools/webp-to-jpg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert WebP images to JPEG format. Runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert WebP to JPG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your WebP file onto the converter.' },
        { '@type': 'HowToStep', text: 'The tool converts to JPEG automatically. Adjust quality if needed.' },
        { '@type': 'HowToStep', text: 'Download your JPG file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why would I need to convert WebP to JPG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients, printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere.' } },
        { '@type': 'Question', name: 'Does converting WebP to JPG reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'There is a slight quality reduction since JPEG uses lossy compression. At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.' } },
        { '@type': 'Question', name: 'Can I open a WebP file in Photoshop?', acceptedAnswer: { '@type': 'Answer', text: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer support WebP natively.' } },
        { '@type': 'Question', name: 'Is my WebP file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple WebP files at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.' } },
        { '@type': 'Question', name: 'What JPEG quality should I use for printing?', acceptedAnswer: { '@type': 'Answer', text: 'For print use, set quality to 90-95. This minimises compression artefacts and ensures the file is large enough for good print resolution.' } },
        { '@type': 'Question', name: 'Will the JPEG keep the same dimensions as the original WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The conversion only changes the file format and compression — the pixel dimensions remain identical to the original WebP image.' } },
        { '@type': 'Question', name: 'What happens to transparent areas when converting to JPEG?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG does not support transparency. Transparent areas in a WebP image will be filled with white in the JPEG output. If you need to preserve transparency, convert to PNG instead.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your WebP',
    desc: 'Drag and drop WebP files onto the converter, or click to browse. Convert up to 5 files at once on the free plan.',
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
    desc: 'Set the output format to JPEG. Adjust the quality slider — quality 85 gives the best balance of size and visual fidelity for most uses.',
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
    title: 'Download your JPG',
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

const FAQS = [
  { q: 'Why would I need to convert WebP to JPG?', a: "WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients like older versions of Outlook, eBay's product listing system, some printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere." },
  { q: 'Does converting WebP to JPG reduce quality?', a: 'There is a slight quality reduction since JPEG uses lossy compression. You can minimise this by choosing a high quality setting (90+). At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.' },
  { q: 'Can I open a WebP file in Photoshop?', a: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer versions support WebP natively.' },
  { q: 'What JPEG quality should I use for printing?', a: 'For print use, set quality to 90–95. This minimises compression artefacts and ensures the file contains enough detail for high-resolution printing. For standard web or screen use, quality 80–85 gives an excellent result at a much smaller file size.' },
  { q: 'Will the JPEG keep the same dimensions as the original WebP?', a: 'Yes. The conversion only changes the file format and compression — the pixel dimensions remain exactly identical to the original WebP image. No scaling or cropping is applied.' },
  { q: 'What happens to transparent areas when converting to JPEG?', a: 'JPEG does not support transparency. Any transparent areas in a WebP image will be filled with white in the JPEG output. If you need to preserve transparency, convert to PNG instead.' },
  { q: 'Is my WebP file uploaded to a server?', a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' },
  { q: 'Can I convert multiple WebP files at once?', a: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.' },
];

export default function WebpToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .w2j-h1    { opacity: 0; transform: translateY(10px); }
            .w2j-sub   { opacity: 0; transform: translateY(10px); }
            .w2j-trust { opacity: 0; }
          }
          .w2j-h1 { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1); }
          .w2j-sub { transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms, transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms; }
          .w2j-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
        }
      `}</style>

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        <section id="w2j-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />

          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">WebP to JPG</span>
            <h1 className="w2j-h1 serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Convert WebP to JPG.<br /><span className="text-accent">Works everywhere.</span>
            </h1>
            <p className="w2j-sub text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Convert WebP images to universally compatible JPEG format. Works with every app, device, and platform. All processing stays in your browser.
            </p>
            <p className="w2j-trust text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={C}><CompressorUI /></div>

        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Instant results.</em>
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
              Why convert WebP to JPG?
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-4">WebP is Google&apos;s efficient modern image format — but modern also means it is not universally supported. Despite WebP having over 97% browser support, many software applications, marketplaces, and services still require JPEG.</p>
            <p className="text-[14px] text-fg-2 leading-[1.65] m-0 mb-6">If a website or app has given you a WebP file and you want to use it elsewhere, converting to JPEG first is the most reliable solution.</p>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {[
                { label: 'eBay and Amazon product listings.', text: "Both platforms' listing systems require JPEG or PNG for product photos. WebP files are rejected at upload. Converting to JPEG first solves this instantly." },
                { label: 'Email attachments.', text: 'Many email clients — particularly older Outlook versions on Windows — display WebP images as attachments rather than rendering them inline. JPEG displays correctly in all email clients.' },
                { label: 'Printing services.', text: 'Online and local print labs typically accept JPEG and TIFF. Very few printing workflows handle WebP. Converting to JPEG before uploading prevents format errors.' },
                { label: 'Older versions of Photoshop and Lightroom.', text: 'Adobe Photoshop added WebP support in version 23.2 (early 2022). If you run an older version, you need JPEG to open and edit the image.' },
                { label: 'Sending images to clients or non-technical users.', text: 'If you are not sure what software the recipient has, JPEG is always the safest choice — it has been universally supported for 30+ years.' },
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
              <p className="text-[13.5px] text-fg-2 leading-[1.6] m-0 mb-5 max-w-[56ch]">The converter uses the browser&apos;s native Canvas API. Your WebP images are decoded and re-encoded entirely on your own hardware — nothing is transmitted, stored, or accessible to any server.</p>
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
          <a href="#w2j-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
            Back to converter
          </a>
        </div>

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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/jpg-to-png', '/webp-to-png', '/jpg-to-webp']} />
      </main>
    </>
  );
}
