import type { Metadata } from 'next';
import { ImageToPdfUI } from '@/components/ImageToPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'JPG to PDF — Convert JPEG Images to PDF Free Online',
  description:
    'Convert JPG and JPEG images to a PDF in your browser. Add multiple photos, reorder by dragging, choose A4 or Letter. No upload, no server, no watermark. Free.',
  alternates: { canonical: 'https://imagepdf.tools/jpg-to-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — JPG to PDF',
      url: 'https://imagepdf.tools/jpg-to-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online JPG to PDF converter. Convert one or multiple JPEG photos to a PDF — reorder, choose page size, and download instantly. No upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert JPG images to PDF online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPG or JPEG images onto the tool. Add multiple photos for a multi-page PDF.' },
        { '@type': 'HowToStep', text: 'Drag to reorder the images and choose your page size: A4, Letter, or Fit to Image.' },
        { '@type': 'HowToStep', text: 'Click Generate PDF to download your multi-page document instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does converting JPG to PDF reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Images are embedded at their original resolution in the PDF. There is no additional compression or re-encoding of the JPEG data beyond what is already in the source file.' } },
        { '@type': 'Question', name: 'Can I convert multiple JPG files to one PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop multiple JPG files at once. Each image becomes a separate page in the PDF. Drag the thumbnails to reorder the pages before generating.' } },
        { '@type': 'Question', name: 'Does this upload my JPG to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing runs locally in your browser using jsPDF and the Canvas API. Your images never leave your device.' } },
        { '@type': 'Question', name: 'What page sizes are available?', acceptedAnswer: { '@type': 'Answer', text: 'A4 (210 × 297 mm), US Letter (8.5 × 11 in), and Fit to Image (the page dimensions match the photo exactly, with no white borders).' } },
        { '@type': 'Question', name: 'Can I mix JPG and PNG in the same PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool accepts JPEG, PNG, and WebP in the same batch. You can combine photo formats in a single PDF.' } },
      ],
    },
  ],
};

const C       = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Add your JPGs',
    desc: 'Drop JPEG photos onto the tool. Add as many as you need — each becomes one page in the PDF. PNG and WebP are also accepted.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Order and size',
    desc: 'Drag thumbnails to set the page order. Choose A4, Letter, or Fit to Image for the page dimensions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your PDF',
    desc: 'Click Generate PDF. Your document builds instantly in the browser and downloads — no wait, no account, no watermark.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const USE_CASES = [
  { label: 'Phone photos to one document', desc: 'You\'ve photographed a contract, receipt, or form page by page. Converting the photos to a single PDF creates a proper multi-page document.' },
  { label: 'Submitting photo ID documents', desc: 'Visa applications, bank account openings, and HR onboarding often require photos of ID documents as PDF — not individual JPEGs.' },
  { label: 'Photography portfolio', desc: 'Collect your best JPEG photos into a single PDF portfolio for client reviews, agency submissions, or printed press kits.' },
  { label: 'Insurance claims and damage photos', desc: 'Insurance portals require photos of damage as PDF. Convert all your JPEGs into a single organised document in one step.' },
  { label: 'Product catalogues', desc: 'Product photos from a photoshoot can be assembled into a PDF catalogue to share with buyers or distributors.' },
  { label: 'Sending multiple photos by email', desc: 'Instead of attaching 15 separate JPEGs, attach one PDF. Easier for the recipient to view, save, and print in order.' },
];

const FAQS = [
  { q: 'Does converting JPG to PDF reduce image quality?', a: 'No. Images are embedded at their original resolution in the PDF. There is no additional compression or re-encoding of the JPEG data beyond what is already in the source file.' },
  { q: 'Can I convert multiple JPG files to one PDF?', a: 'Yes. Drop multiple JPG files at once. Each image becomes a separate page in the PDF. Drag the thumbnails to reorder the pages before generating.' },
  { q: 'Does this upload my JPG to a server?', a: 'No. All processing runs locally in your browser using jsPDF and the Canvas API. Your images never leave your device.' },
  { q: 'What page sizes are available?', a: 'A4 (210 × 297 mm), US Letter (8.5 × 11 in), and Fit to Image (the page dimensions match the photo exactly, with no white borders).' },
  { q: 'Can I mix JPG and PNG in the same PDF?', a: 'Yes. The tool accepts JPEG, PNG, and WebP in the same batch. You can combine photo formats in a single PDF.' },
  { q: 'Is there a limit on the number of photos?', a: 'The free tier supports up to 5 images per PDF. There is no limit on PDF file size — the final file size depends on your images.' },
];

export default function JpgToPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="jpg-to-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">JPG to PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              JPEG photos.<br /><span className="text-accent">One clean PDF.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Combine one or many JPEG photos into a single PDF. Drag to reorder, pick your page size, and download — entirely in your browser.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload · No quality loss</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'No quality loss', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <ImageToPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Photos to document.</em>
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
              When your photos need <em className="text-accent">to be a PDF.</em>
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

        {/* ── Quality note ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Quality</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              No quality loss — ever
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              A common complaint about online JPG-to-PDF tools is double compression: they re-encode the JPEG when embedding it, which adds compression artefacts on top of the existing JPEG compression. This tool embeds your images at their original resolution without re-encoding.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              The resulting PDF will be approximately the same size as the combined size of your original JPEG files. This means the PDF is as sharp as the original photos — no loss of detail, no additional blur, no new artefacts.
            </p>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your photos never leave your browser.</h2>
              <div className="space-y-3">
                {[
                  'All PDF creation runs locally using jsPDF and the Canvas API',
                  'No image data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your photos at any point',
                  'Close the tab and your photos are gone — nothing persists',
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
          <a href="#jpg-to-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/image-to-pdf', '/compress-image', '/pdf-to-jpg', '/compress-pdf']} />

      </main>
    </>
  );
}
