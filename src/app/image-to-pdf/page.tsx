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
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Image to PDF Converter',
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
  ],
};

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
];

export default function ImageToPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-2xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Image to <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">PDF</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Bundle multiple images into a single PDF file. Choose your page size, reorder images, and download — all processing stays in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Multiple images', 'A4 · Letter · Fit', 'Drag to reorder', 'JPEG · PNG · WebP', 'Free forever'].map((f) => (
              <span key={f} className="text-xs text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-white/8 px-2.5 py-1 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        <ImageToPdfUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert images to PDF?</h2>
              <p className="mb-3">
                PDF (Portable Document Format) is the universal standard for sharing documents that need to look the same on every device, regardless of operating system, software, or screen size. While images are great for individual photos, PDF is the right choice when you need to send multiple images together, submit documents formally, or ensure the recipient sees exactly what you intended.
              </p>
              <p>
                Converting images to PDF consolidates them into a single file, makes them easier to share, and allows the recipient to view them in page order without having to open multiple separate files.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When converting images to PDF is the right choice</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Choosing the right page size</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">A4 (210 × 297 mm)</strong> — the international standard. Use this for document submissions, formal correspondence, and anything intended for a European or international audience.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">US Letter (8.5 × 11 inches)</strong> — the North American standard. Use this for submissions to US and Canadian institutions, companies, and portals.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Fit to Image</strong> — the page dimensions match the image dimensions exactly. No white borders, no letterboxing. Best for photography portfolios, photo books, and cases where you want the image to fill the full page.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {FAQS.map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/compress-pdf', '/compress-image', '/resize-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
