import type { Metadata } from 'next';
import { WatermarkPdfUI } from '@/components/WatermarkPdfUI';

export const metadata: Metadata = {
  title: 'Watermark PDF — Add Text Watermark Free Online',
  description:
    'Add a diagonal text watermark to every page of your PDF — CONFIDENTIAL, DRAFT, SAMPLE, or custom text. Runs entirely in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/watermark-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Watermark PDF',
      url: 'https://imagepdf.tools/watermark-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Overlay a diagonal text watermark on every page of a PDF — colour, opacity, and size are fully customisable.',
    },
    {
      '@type': 'HowTo',
      name: 'How to add a watermark to a PDF',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Set watermark text', text: 'Choose a preset (CONFIDENTIAL, DRAFT, SAMPLE) or type custom text.' },
        { '@type': 'HowToStep', position: 3, name: 'Adjust style', text: 'Set the colour, opacity (5–60%), and font size to your preference.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Click Add Watermark and download your watermarked PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can someone remove my watermark?',
          acceptedAnswer: { '@type': 'Answer', text: 'The watermark is drawn directly onto the PDF content layer — it is not a separate overlay. Removing it would require editing the PDF at a low level, which is non-trivial.' },
        },
        {
          '@type': 'Question',
          name: 'Will the watermark appear on all pages?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. The same watermark is applied to every page of the PDF.' },
        },
        {
          '@type': 'Question',
          name: 'Is my file uploaded to a server?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. The watermark is added entirely in your browser using pdf-lib. Your file never leaves your device.' },
        },
        {
          '@type': 'Question',
          name: 'What opacity should I use?',
          acceptedAnswer: { '@type': 'Answer', text: '15–25% is a good balance — visible enough to deter copying but light enough that the underlying content remains readable.' },
        },
      ],
    },
  ],
};

export default function WatermarkPdfPage() {
  return (
    <main className="flex-1 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Watermark{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            PDF
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
          Add a diagonal text watermark to every page — choose from presets or type custom text. Fully in your browser.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-8">
          {['Custom text', 'Adjustable opacity', 'Color picker', 'All pages watermarked'].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {f}
            </span>
          ))}
        </div>
      </div>

      <WatermarkPdfUI />

      <div className="max-w-2xl mx-auto px-4 mt-16 space-y-10 text-left">
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            pdf-lib loads your PDF in the browser, then draws your watermark text diagonally across the centre of each page. The text is rendered in Helvetica Bold with your chosen colour and opacity. Because it is drawn at the PDF content level, the watermark is visible in all standard PDF viewers without any plugins.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I add an image watermark instead of text?', a: 'Currently, only text watermarks are supported. Image watermarking is on our roadmap.' },
              { q: 'Can I watermark only specific pages?', a: 'Not yet — the watermark is applied to all pages. For selective watermarking, use the Organize PDF tool to split and watermark separately.' },
              { q: 'What opacity value is best?', a: '15–25% is ideal for most use cases — visible enough to deter misuse but light enough that the PDF content remains fully readable.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 dark:border-slate-700 pb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">{q}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
