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
        { '@type': 'HowToStep', text: 'Drop your WebP file onto the converter below.' },
        { '@type': 'HowToStep', text: 'The tool automatically detects and converts WebP to JPEG.' },
        { '@type': 'HowToStep', text: 'Download your JPG file instantly.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why would I need to convert WebP to JPG?', acceptedAnswer: { '@type': 'Answer', text: 'WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients like older versions of Outlook, eBay\'s product listing system, some printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere.' } },
        { '@type': 'Question', name: 'Does converting WebP to JPG reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'There is a slight quality reduction since JPEG uses lossy compression. You can minimise this by choosing a high quality setting (90+). At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.' } },
        { '@type': 'Question', name: 'Can I open a WebP file in Photoshop?', acceptedAnswer: { '@type': 'Answer', text: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer versions support WebP natively.' } },
        { '@type': 'Question', name: 'Is my WebP file uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I convert multiple WebP files at once?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Why would I need to convert WebP to JPG?',
    a: 'WebP is a modern format, but many applications, devices, and platforms do not yet support it. Email clients like older versions of Outlook, eBay\'s product listing system, some printing services, and legacy software often require JPEG. Converting to JPG ensures your image works everywhere.',
  },
  {
    q: 'Does converting WebP to JPG reduce quality?',
    a: 'There is a slight quality reduction since JPEG uses lossy compression. You can minimise this by choosing a high quality setting (90+). At quality 85, the result is virtually indistinguishable from the original WebP at a normal viewing size.',
  },
  {
    q: 'Can I open a WebP file in Photoshop?',
    a: 'Older versions of Photoshop (before 23.2) cannot open WebP natively. Converting to JPEG first is the fastest workaround. Photoshop CC 2022 and newer versions support WebP natively.',
  },
  {
    q: 'Is my WebP file uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your file never leaves your device.',
  },
  {
    q: 'Can I convert multiple WebP files at once?',
    a: 'Yes. Drop up to 5 WebP files at once on the Free tier, or unlimited files with Pro.',
  },
];

export default function WebpToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            WebP to JPG <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Convert WebP images to universally compatible JPEG format. Works with every app, device and platform — all processing stays in your browser.
          </p>
        </div>

        <CompressorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert WebP to JPG?</h2>
              <p className="mb-3">
                WebP is Google&apos;s efficient modern image format — but &quot;modern&quot; also means it is not universally supported. Despite WebP having over 97% browser support, many software applications, marketplaces, and services still require JPEG or have not added WebP support. Converting WebP to JPG gives you a file that works everywhere, without exception.
              </p>
              <p>
                If a website or app has given you a WebP file (common when downloading images from Google, news sites, or social platforms), and you want to use it elsewhere, converting it to JPEG first is the most reliable solution.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Common reasons to convert WebP to JPG</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">eBay and Amazon product listings.</strong> Both platforms&apos; listing systems require JPEG or PNG for product photos. WebP files are rejected at upload. Converting your images to JPEG first solves this instantly.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Email attachments.</strong> Many email clients — particularly older Outlook versions on Windows — display WebP images as attachments rather than rendering them inline. JPEG displays correctly in all email clients.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Printing services.</strong> Online and local print labs typically accept JPEG and TIFF. Very few printing workflows handle WebP. Converting to JPEG before uploading to a photo printing service prevents format errors.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Older versions of Photoshop and Lightroom.</strong> Adobe Photoshop added WebP support in version 23.2 (early 2022). If you or a colleague runs an older version, you need JPEG to open and edit the image.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Windows Photo Viewer and older Android devices.</strong> The classic Windows Photo Viewer (still default on some Windows 10 installations) and older Android gallery apps cannot display WebP. Converting to JPG makes the image viewable immediately.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Sending images to clients or non-technical users.</strong> If you are not sure what software the recipient has, JPEG is always the safest choice — it has been universally supported for 30+ years.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Sharing on Facebook Marketplace or Craigslist.</strong> Some classifieds platforms still show WebP upload errors. Converting to JPEG before uploading eliminates that friction.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Does converting lose quality?</h2>
              <p className="mb-3">
                There is a trade-off. WebP is often more efficient than JPEG, so converting from WebP to JPEG and then re-applying JPEG compression introduces a small amount of quality loss. At a JPEG quality setting of 85 or above, the difference is virtually invisible at normal viewing sizes. If you are printing the image or need archival quality, use quality 95+.
              </p>
              <p>
                One practical tip: if you downloaded a WebP image from the web, it was likely already compressed before you received it. Exporting at quality 80–90 for web use and 90–95 for print is generally the right call.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the conversion works</h2>
              <p>
                When you upload a WebP image, the browser decodes it natively (all modern browsers have built-in WebP support) and draws it onto an HTML Canvas element. The canvas is then exported as a JPEG using the browser&apos;s built-in JPEG encoder. The quality slider controls how much JPEG compression is applied. No data leaves your device at any point — the entire process runs in your browser tab.
              </p>
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

        <RelatedTools hrefs={['/convert-png-to-jpeg', '/jpg-to-png', '/webp-to-png', '/jpg-to-webp']} />
      </main>
    </>
  );
}
