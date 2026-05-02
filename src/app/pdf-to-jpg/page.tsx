import type { Metadata } from 'next';
import { PdfToJpgUI } from '@/components/PdfToJpgUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PDF to JPG — Convert PDF Pages to Images Free',
  description:
    'Convert every page of a PDF to high-quality JPG images — all in your browser. No upload, no server, 100% private. Download individually or as a ZIP.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-to-jpg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PDF to JPG',
      url: 'https://imagepdf.tools/pdf-to-jpg',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF to JPG converter. Convert each page to a JPEG image — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert a PDF to JPG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF file onto the tool or click Browse PDF to select it.' },
        { '@type': 'HowToStep', text: 'Choose your desired JPEG quality — Low, Medium, or High — using the slider.' },
        { '@type': 'HowToStep', text: 'Click Convert to JPG. Each page is rendered to a canvas and exported as a JPEG.' },
        { '@type': 'HowToStep', text: 'Download individual JPGs or click Download All as ZIP for multi-page PDFs.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does converting a PDF to JPG upload my file?', acceptedAnswer: { '@type': 'Answer', text: 'No. The entire conversion happens in your browser using PDF.js and the HTML5 Canvas API. Your PDF never leaves your device.' } },
        { '@type': 'Question', name: 'What resolution are the output JPGs?', acceptedAnswer: { '@type': 'Answer', text: 'Pages are rendered at 2× scale (equivalent to roughly 144–150 DPI for a standard A4 PDF). This produces crisp images suitable for social media, presentations, and web use.' } },
        { '@type': 'Question', name: 'Can I convert a multi-page PDF?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every page is converted to its own JPG. For multi-page PDFs, a Download All as ZIP button appears so you can grab all images in one click.' } },
        { '@type': 'Question', name: 'Can I control the JPG quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the quality slider (30–100%) or the Low / Medium / High preset buttons before converting. Higher quality means larger files; lower quality means smaller files.' } },
        { '@type': 'Question', name: 'Will text in the PDF be sharp in the JPG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes at quality 85 and above. PDF.js renders text, vectors, and images faithfully onto a canvas. At lower quality settings (below 60%) JPEG compression artefacts may appear around fine text.' } },
      ],
    },
  ],
};

export default function PdfToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            No upload &middot; 100% Private &middot; Instant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            PDF to{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              JPG
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Convert every page of your PDF into a high-quality JPEG image. Runs entirely in your browser — nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Every page → JPG', 'Adjustable quality', 'Download as ZIP', 'No upload needed'].map((f) => (
              <span key={f} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>

          <PdfToJpgUI />
        </div>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-4">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert a PDF to JPG?</h2>
              <p className="mb-3">
                PDFs are great for preserving layout, but many platforms — social media, email clients, messaging apps, and CMS editors — only accept image files. Converting PDF pages to JPG lets you share, post, or embed content anywhere without needing a PDF viewer.
              </p>
              <p>
                JPG is also the format of choice for presentations, blog thumbnails, product mockups, and document previews where a raster image is easier to work with than a vector PDF.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common use cases</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Social media.</strong> Share a report, certificate, or infographic as an image post — platforms like Instagram and Twitter don't accept PDFs.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Thumbnails and previews.</strong> Generate a cover image from the first page of a document for a blog post or download page.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Presentations.</strong> Import specific PDF pages into PowerPoint, Keynote, or Google Slides as image slides.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Many email clients block PDF attachments. A JPG attachment passes through every spam filter and preview pane.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Document archiving.</strong> Convert scanned PDFs back to individual image files for use in image management systems.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
              <p>
                The tool uses <strong className="text-slate-800 dark:text-slate-200">PDF.js</strong> (Mozilla's open-source PDF rendering engine) to parse your PDF entirely in the browser. Each page is rendered onto an HTML5 <code className="text-[11px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">&lt;canvas&gt;</code> element at 2× scale for crisp output. The canvas is then exported to JPEG at your chosen quality setting via <code className="text-[11px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">canvas.toDataURL()</code>. For multi-page documents, all JPGs are bundled into a ZIP using JSZip. No file data is ever sent to a server.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Does converting a PDF to JPG upload my file?', a: 'No. The entire conversion happens in your browser using PDF.js and the HTML5 Canvas API. Your PDF never leaves your device.' },
                  { q: 'What resolution are the output JPGs?', a: 'Pages are rendered at 2× scale (equivalent to roughly 144–150 DPI for a standard A4 PDF). This produces crisp images suitable for social media, presentations, and web use.' },
                  { q: 'Can I convert a multi-page PDF?', a: 'Yes. Every page is converted to its own JPG. For multi-page PDFs, a Download All as ZIP button appears so you can grab all images in one click.' },
                  { q: 'Can I control the JPG quality?', a: 'Yes. Use the quality slider (30–100%) or the Low / Medium / High preset buttons before converting. Higher quality means larger files; lower quality means smaller files.' },
                  { q: 'Will text in the PDF be sharp in the JPG?', a: 'Yes at quality 85 and above. PDF.js renders text, vectors, and images faithfully onto a canvas. At lower quality settings (below 60%) JPEG compression artefacts may appear around fine text.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 bg-white dark:bg-slate-800/40">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <RelatedTools hrefs={['/split-pdf', '/merge-pdf', '/compress-pdf', '/image-to-pdf']} />
      </main>
    </>
  );
}
