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

const FACTS = [
  'Zero bytes sent to any server',
  'JPEG · PNG · WebP supported',
  'Free with no account required',
  'Drag to reorder pages',
];

const STEPS = [
  { n: '01', title: 'Add your images', desc: 'Drop JPEG, PNG, or WebP images onto the tool. Add as many as you need — each becomes one page in the PDF.' },
  { n: '02', title: 'Choose page size & order', desc: 'Select A4, Letter, or Fit to Image. Drag images into the order you want before generating.' },
  { n: '03', title: 'Download your PDF', desc: 'Click Generate PDF. Your multi-page document is built in the browser and downloads instantly.' },
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
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .itp-h1    { opacity: 0; transform: translateY(10px); }
            .itp-sub   { opacity: 0; transform: translateY(10px); }
            .itp-trust { opacity: 0; }
          }
          .itp-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .itp-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .itp-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes itp-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .itp-fact { animation: itp-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .itp-fact:nth-child(1) { animation-delay: 240ms; }
          .itp-fact:nth-child(2) { animation-delay: 290ms; }
          .itp-fact:nth-child(3) { animation-delay: 340ms; }
          .itp-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">

        {/* ── Hero ── */}
        <div id="itp-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="itp-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Image to PDF Converter
          </h1>
          <p className="itp-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Bundle multiple images into a single PDF file. Choose your page size, reorder images by dragging,
            and download — all processing stays in your browser.
          </p>
          <p className="itp-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">Free · No account · No upload</p>

          {/* Trust strip */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 list-none p-0">
            {FACTS.map((f) => (
              <li key={f} className="itp-fact flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="6" fill="oklch(70% 0.158 293)" fillOpacity="0.18" />
                  <path d="M3.5 6l1.8 1.8L8.5 4.2" stroke="oklch(70% 0.158 293)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tool ── */}
        <ImageToPdfUI />

        {/* ── Mid-page anchor ── */}
        <div className="text-center mt-10 mb-2">
          <a
            href="#itp-tool"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Learn how it works
          </a>
        </div>

        {/* ── How it works ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>How it works</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">From individual images to a polished PDF in three steps</h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div key={step.n} className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}>
                  <span className="block text-[11px] font-bold tracking-[0.16em] mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>{step.n}</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">{step.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pt-14 pb-10">
          <div className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-3">Why convert images to PDF?</h2>
              <p className="mb-3">
                PDF (Portable Document Format) is the universal standard for sharing documents that need to look the same on every device, regardless of operating system, software, or screen size. While images are great for individual photos, PDF is the right choice when you need to send multiple images together, submit documents formally, or ensure the recipient sees exactly what you intended.
              </p>
              <p>
                Converting images to PDF consolidates them into a single file, makes them easier to share, and allows the recipient to view them in page order without having to open multiple separate files.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">When converting images to PDF is the right choice</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Sending multiple photos as one attachment.</strong> Attaching 10 separate JPEG files to an email is messy. Converting them to a single PDF means one attachment, one download, and a clear page-by-page presentation for the recipient.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Portfolio submissions.</strong> Job applications, design briefs, photography portfolios, and art school applications often require work samples as a PDF. Converting your best images to a single PDF gives a polished, professional presentation.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Document submissions to universities and government.</strong> Many official submission portals — visa applications, university enrolment, insurance claims — accept only PDF. If you have taken photos of your documents (ID, utility bills, certificates), converting them to PDF allows you to submit them through these systems.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Scanning physical documents.</strong> If you photograph documents page by page with your phone instead of using a scanner, combining the images into a single PDF creates a proper document that can be easily shared and archived.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Invoices, receipts, and expense reports.</strong> Finance and accounting workflows often require expense receipts as PDF. Taking a photo of a paper receipt and converting it to PDF is the fastest way to prepare it for a reimbursement submission.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Publishing photo books and albums.</strong> Multi-page PDF is a simple format for self-published photo collections that can be shared digitally or sent to a print-on-demand service.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Real estate and insurance documentation.</strong> Property condition reports, damage assessments, and inventory records are often submitted as PDFs with embedded photos. This tool lets you compile photographic evidence into a single document quickly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Choosing the right page size</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">A4 (210 × 297 mm)</strong> — the international standard. Use this for document submissions, formal correspondence, and anything intended for a European or international audience.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">US Letter (8.5 × 11 inches)</strong> — the North American standard. Use this for submissions to US and Canadian institutions, companies, and portals.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Fit to Image</strong> — the page dimensions match the image dimensions exactly. No white borders, no letterboxing. Best for photography portfolios, photo books, and cases where you want the image to fill the full page.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Privacy callout ── */}
        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 px-6 py-5 flex gap-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
              <path d="M9 1.5L2.25 4.5v4.875C2.25 13.028 5.143 16.5 9 17.25c3.857-.75 6.75-4.222 6.75-7.875V4.5L9 1.5z" stroke="oklch(70% 0.158 293)" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-0.5">Your images never leave your device</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                All PDF generation runs in your browser using jsPDF and the Canvas API. No file data is transmitted to any server, logged, or stored. ImagePDF.Tools cannot see, access, or retain your images at any point.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-6">Frequently asked questions</h2>
          <dl className="divide-y divide-slate-100 dark:divide-white/5">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-5">
                <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedTools hrefs={['/compress-pdf', '/compress-image', '/resize-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
