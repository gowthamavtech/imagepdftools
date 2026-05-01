import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter — Free Online',
  description: 'Convert WebP images to lossless PNG format in your browser. Preserve transparency and full quality — no upload, no server, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/webp-to-png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — WebP to PNG Converter',
      url: 'https://imagepdf.tools/webp-to-png',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to convert WebP images to PNG format with lossless quality and transparency support. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert WebP to PNG online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your WebP file onto the converter below.' },
        { '@type': 'HowToStep', text: 'The tool converts to PNG automatically — no quality settings needed (PNG is lossless).' },
        { '@type': 'HowToStep', text: 'Download your PNG file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why convert WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma — or upload it to a platform that does not accept WebP — converting to PNG gives you maximum compatibility.' } },
        { '@type': 'Question', name: 'Does converting WebP to PNG lose quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts. The PNG will look identical to the WebP at the same resolution.' } },
        { '@type': 'Question', name: 'Is transparency preserved when converting WebP to PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly.' } },
        { '@type': 'Question', name: 'Will the PNG file be larger than the WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG uses lossless compression, which is less efficient than WebP for photographs and complex images. A WebP photo converted to PNG will typically be 3–5× larger. PNG is best when you need to edit the file further or need guaranteed lossless quality.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.' } },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'Why convert WebP to PNG?',
    a: 'PNG is a lossless format supported by every image editor, design tool, and platform. If you need to edit a WebP image in Photoshop, Illustrator, or Figma — or upload it to a platform that does not accept WebP — converting to PNG gives you maximum compatibility.',
  },
  {
    q: 'Does converting WebP to PNG lose quality?',
    a: 'No. PNG is a lossless format. Once your WebP is decoded and exported as PNG, every pixel is preserved without any additional compression artefacts. The PNG will look identical to the WebP at the same resolution.',
  },
  {
    q: 'Is transparency preserved when converting WebP to PNG?',
    a: 'Yes. Both WebP and PNG support alpha-channel transparency. Converting a transparent WebP image to PNG preserves the transparent areas exactly.',
  },
  {
    q: 'Will the PNG file be larger than the WebP?',
    a: 'Yes. PNG uses lossless compression, which is less efficient than WebP for photographs and complex images. A WebP photo converted to PNG will typically be 3–5× larger. PNG is best when you need to edit the file further or need guaranteed lossless quality.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser using the Canvas API. Your WebP file never leaves your device.',
  },
];

export default function WebpToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
            Free &middot; No Upload &middot; Private
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            WebP to PNG{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Convert WebP images to lossless PNG — full quality, transparency preserved. Works with every image editor and platform. No upload required.
          </p>
        </div>

        <CompressorUI initialFormat="image/png" />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why convert WebP to PNG?</h2>
              <p className="mb-3">
                WebP is an excellent format for the web — small files, great quality. But it is a relatively young format and not universally supported by professional tools and platforms. PNG, by contrast, has been the standard lossless image format for 25+ years and is supported by every image editor, graphics application, operating system, and image platform in existence.
              </p>
              <p>
                If you downloaded a WebP image from the web or received one from a client, converting it to PNG is the most reliable way to open it, edit it, and share it without worrying about format compatibility.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">When to convert WebP to PNG</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-blue-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Editing in Photoshop, Illustrator, or GIMP.</strong> While newer versions of Photoshop support WebP natively, many design teams still run older versions or use tools that do not support it. Converting to PNG first ensures the file opens correctly for editing.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Figma and design handoff.</strong> Figma supports WebP in some contexts but PNG is the universally accepted format for design assets. Converting WebP screenshots or assets to PNG ensures compatibility across all design workflows.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Platform upload restrictions.</strong> Some government portals, job application systems, academic submission platforms, and older CMS platforms only accept JPEG and PNG. Converting WebP to PNG removes upload rejections.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Preserving transparent backgrounds for further editing.</strong> If you have a WebP file with a transparent background and need to composite it into a design, converting to PNG preserves the transparency in a universally editable format.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Archival and lossless storage.</strong> If you want to store an image long-term with guaranteed lossless quality — for printing, archiving, or future re-editing — PNG is more widely supported than WebP for archival purposes.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Windows legacy compatibility.</strong> Older Windows tools like Paint (pre-2023), classic Windows Photo Viewer, and many legacy business applications do not open WebP files. PNG opens in all of them.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How the conversion works</h2>
              <p>
                When you drop a WebP file, the browser decodes it using its native WebP decoder (all modern browsers support WebP) and draws it to an HTML Canvas element. The canvas is then exported as a PNG using lossless compression. Since PNG is lossless, no quality is lost in the conversion. The alpha channel (transparency) is fully preserved. No data leaves your device — the entire process runs in your browser.
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

        <RelatedTools hrefs={['/webp-to-jpg', '/jpg-to-png', '/png-to-webp', '/compress-png-online']} />
      </main>
    </>
  );
}
