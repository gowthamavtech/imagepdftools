import type { Metadata } from 'next';
import { ImageToPdfUI } from '@/components/ImageToPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Image to PDF — Free Online Converter',
  description: 'Convert multiple images to a single PDF in your browser. Choose A4, Letter, or fit-to-image page size. No upload, no server — 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/image-to-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image to PDF Converter',
      url: 'https://imagepdf.tools/image-to-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert multiple images into a single PDF. Choose page size and order. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert images to PDF online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP images onto the tool. Add multiple images for a multi-page PDF.' },
        { '@type': 'HowToStep', text: 'Choose a page size: A4, Letter, or Fit to Image.' },
        { '@type': 'HowToStep', text: 'Reorder images by dragging, then click Generate PDF to download.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I convert multiple images into one PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can drop multiple images at once. Each image becomes a separate page in the PDF. You can reorder the pages by dragging before generating the final file.' } },
        { '@type': 'Question', name: 'What page sizes are supported?', acceptedAnswer: { '@type': 'Answer', text: 'You can choose A4 (210 × 297 mm — standard in most of the world), US Letter (8.5 × 11 inches — standard in North America), or Fit to Image (the page dimensions match the image dimensions exactly).' } },
        { '@type': 'Question', name: 'What image formats are accepted?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG, JPG, PNG, and WebP are all supported. You can mix formats in the same PDF — for example, combine a PNG logo with JPEG photos.' } },
        { '@type': 'Question', name: 'Is there a limit on the number of images?', acceptedAnswer: { '@type': 'Answer', text: 'The Free tier supports up to 5 images per PDF. Pro users can create PDFs with unlimited images.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens locally in your browser using jsPDF and the Canvas API. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Can I change the order of images before generating the PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After adding your images, you can drag and drop them to reorder before clicking Generate PDF. The pages appear in the PDF in exactly the order you set.' } },
        { '@type': 'Question', name: 'Will the image quality be maintained in the PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Images are embedded at their original resolution. The PDF output preserves the full detail of each image without additional compression or quality loss beyond any existing compression in the source file.' } },
        { '@type': 'Question', name: 'Can I compress the PDF after creating it?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Once you have downloaded your PDF, you can run it through the Compress PDF tool on this site to reduce the file size while preserving visual quality.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Add your images',
    desc: 'Drop JPEG, PNG, or WebP images onto the tool. Add as many as you need — each becomes one page in the PDF.',
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
    title: 'Choose size & order',
    desc: 'Select A4, Letter, or Fit to Image. Drag images into the order you want before generating.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your PDF',
    desc: 'Click Generate PDF. Your multi-page document is built in the browser and downloads instantly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    ),
  },
];

const USE_CASES = [
  {
    label: 'Sending multiple photos as one attachment',
    desc: 'Attaching 10 separate JPEG files to an email is messy. Converting them to a single PDF means one attachment, one download, and a clear page-by-page presentation.',
  },
  {
    label: 'Portfolio submissions',
    desc: 'Job applications, design briefs, photography portfolios, and art school applications often require work samples as a PDF.',
  },
  {
    label: 'Document submissions',
    desc: 'Many official portals — visa applications, university enrolment, insurance claims — accept only PDF. Photos of documents can be converted and submitted.',
  },
  {
    label: 'Scanning physical documents',
    desc: 'If you photograph documents page by page with your phone, combining the images into a single PDF creates a proper document ready to share.',
  },
  {
    label: 'Invoices and expense reports',
    desc: 'Finance workflows often require receipts as PDF. Taking a photo of a paper receipt and converting it to PDF is the fastest way to prepare it for reimbursement.',
  },
  {
    label: 'Real estate and insurance documentation',
    desc: 'Property condition reports, damage assessments, and inventory records are often submitted as PDFs with embedded photos.',
  },
];

const PAGE_SIZES = [
  {
    name: 'A4',
    dim: '210 × 297 mm',
    desc: 'The international standard. Use for document submissions, formal correspondence, and anything for a European or international audience.',
  },
  {
    name: 'US Letter',
    dim: '8.5 × 11 in',
    desc: 'The North American standard. Use for submissions to US and Canadian institutions, companies, and portals.',
  },
  {
    name: 'Fit to Image',
    dim: 'Matches image',
    desc: 'The page dimensions match the image exactly. No white borders, no letterboxing. Best for photography portfolios and photo books.',
  },
];

const FAQS = [
  {
    q: 'Can I convert multiple images into one PDF?',
    a: 'Yes. You can drop multiple images at once. Each image becomes a separate page in the PDF. You can reorder the pages by dragging before generating the final file.',
  },
  {
    q: 'What page sizes are supported?',
    a: 'You can choose A4 (210 × 297 mm — standard in most of the world), US Letter (8.5 × 11 inches — standard in North America), or Fit to Image (the page dimensions match the image dimensions exactly).',
  },
  {
    q: 'What image formats are accepted?',
    a: 'JPEG, JPG, PNG, and WebP are all supported. You can mix formats in the same PDF — for example, combine a PNG logo with JPEG photos.',
  },
  {
    q: 'Is there a limit on the number of images?',
    a: 'The Free tier supports up to 5 images per PDF. Pro users can create PDFs with unlimited images.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All processing happens locally in your browser using jsPDF and the Canvas API. Your files never leave your device.',
  },
  {
    q: 'Can I change the order of images before generating the PDF?',
    a: 'Yes. After adding your images, you can drag and drop them to reorder before clicking Generate PDF. The pages appear in the PDF in exactly the order you set.',
  },
  {
    q: 'Will the image quality be maintained in the PDF?',
    a: 'Yes. Images are embedded at their original resolution. The PDF output preserves the full detail of each image without additional compression or quality loss beyond any existing compression in the source file.',
  },
  {
    q: 'Can I compress the PDF after creating it?',
    a: 'Yes. Once you have downloaded your PDF, you can run it through the Compress PDF tool on this site to reduce the file size while preserving visual quality.',
  },
];

export default function ImageToPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="itp-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Image to PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Multiple images.<br /><span className="text-accent">One clean PDF.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Bundle JPEG, PNG, and WebP images into a single PDF. Choose your page size, reorder by dragging, and download instantly.
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
        <div className={C}>
          <ImageToPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">One polished document.</em>
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
              When converting to PDF <em className="text-accent">is the right call.</em>
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

        {/* ── Page sizes ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Page sizes</span>
            <h2 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Choosing the right page size
            </h2>
            <div className="space-y-4">
              {PAGE_SIZES.map(({ name, dim, desc }) => (
                <div key={name} className="flex items-start gap-5 rounded-[10px] bg-surface bd-2 px-6 py-5">
                  <div className="shrink-0 min-w-[80px]">
                    <span className="text-[15px] font-semibold text-fg-1">{name}</span>
                    <span className="block font-data text-[11px] text-accent mt-0.5">{dim}</span>
                  </div>
                  <p className="text-[13.5px] leading-[1.7] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why PDF ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Why PDF</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Why convert images to PDF?
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              PDF (Portable Document Format) is the universal standard for sharing documents that need to look the same on every device, regardless of operating system, software, or screen size. While images are great for individual photos, PDF is the right choice when you need to send multiple images together, submit documents formally, or ensure the recipient sees exactly what you intended.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              Converting images to PDF consolidates them into a single file, makes them easier to share, and allows the recipient to view them in page order without having to open multiple separate files.
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
                  'All PDF generation runs locally using jsPDF and the Canvas API',
                  'No file data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your images at any point',
                  'Close the tab and the images are gone — nothing persists',
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
          <a href="#itp-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/compress-pdf', '/compress-image', '/resize-image', '/reduce-image-size']} />

      </main>
    </>
  );
}
