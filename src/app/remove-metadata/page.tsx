import type { Metadata } from 'next';
import { MetadataStripperUI } from '@/components/MetadataStripperUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Remove Image Metadata — Strip EXIF, GPS & More',
  description:
    'Remove EXIF data, GPS location, camera info, and all hidden metadata from your images — free, instant, and entirely in your browser. No uploads.',
  alternates: { canonical: 'https://imagepdf.tools/remove-metadata' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Remove Image Metadata',
      url: 'https://imagepdf.tools/remove-metadata',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to strip EXIF data, GPS coordinates, camera info, and all hidden metadata from images. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to remove metadata from an image',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the tool.' },
        { '@type': 'HowToStep', text: 'The tool reads and displays all embedded metadata fields.' },
        { '@type': 'HowToStep', text: 'Click Remove Metadata and download your privacy-safe image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What types of metadata are removed?', acceptedAnswer: { '@type': 'Answer', text: 'The tool removes all EXIF data including GPS coordinates, camera make and model, lens information, shutter speed, ISO, focal length, timestamps, author name, copyright notice, and software used to edit the image.' } },
        { '@type': 'Question', name: 'Does removing metadata affect image quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. The pixel data is preserved at 95%+ fidelity. The only data removed is the invisible metadata fields embedded alongside the image. The visible image remains identical.' } },
        { '@type': 'Question', name: 'Do social media platforms remove metadata automatically?', acceptedAnswer: { '@type': 'Answer', text: 'Most major platforms — Instagram, Twitter/X, Facebook — strip metadata when you upload images. However, some platforms (like Flickr, LinkedIn in some cases, and direct file sharing) may not. Removing metadata before uploading is the safest approach.' } },
        { '@type': 'Question', name: 'Can someone recover the metadata after I remove it?', acceptedAnswer: { '@type': 'Answer', text: 'No. Once metadata is stripped and the new image is saved, the data is gone. There is no steganographic or recoverable version of the metadata in the output file.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens locally in your browser using the Canvas API. Your images are never uploaded to any server. We never see your files.' } },
        { '@type': 'Question', name: 'Does the stripped image look different from the original?', acceptedAnswer: { '@type': 'Answer', text: 'No. Metadata is stored in a separate header portion of the file, not in the pixel data. The visual appearance of the image is identical after stripping.' } },
        { '@type': 'Question', name: 'What file format is the output image?', acceptedAnswer: { '@type': 'Answer', text: 'The tool outputs the same format as the input: JPEG images remain JPEG, PNG images remain PNG, and WebP images remain WebP. The format is preserved.' } },
        { '@type': 'Question', name: 'Does this work on screenshots and graphics, not just photos?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Although screenshots and digital graphics rarely contain GPS data, they may still carry software names, creation timestamps, and device identifiers. The tool strips all embedded metadata regardless of image origin.' } },
      ],
    },
  ],
};

const FACTS = [
  'Zero bytes sent to any server',
  'GPS & EXIF fully erased',
  'Free with no account required',
  'Works on JPEG, PNG & WebP',
];

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Upload a JPEG, PNG, or WebP file by clicking or dragging it onto the tool below.' },
  { n: '02', title: 'Metadata is stripped', desc: 'All EXIF fields — GPS coordinates, camera info, timestamps, author — are removed from the file header.' },
  { n: '03', title: 'Download the clean file', desc: 'Save the privacy-safe image. Pixel quality is preserved at 95%+ fidelity — the image looks identical.' },
];

const FAQS = [
  {
    q: 'What types of metadata are removed?',
    a: 'The tool removes all EXIF data including GPS coordinates, camera make and model, lens information, shutter speed, ISO, focal length, timestamps, author name, copyright notice, and software used to edit the image.',
  },
  {
    q: 'Does removing metadata affect image quality?',
    a: 'No. The pixel data is preserved at 95%+ fidelity. The only data removed is the invisible metadata fields embedded alongside the image. The visible image remains identical.',
  },
  {
    q: 'Do social media platforms remove metadata automatically?',
    a: 'Most major platforms — Instagram, Twitter/X, Facebook — strip metadata when you upload images. However, some platforms (like Flickr, LinkedIn in some cases, and direct file sharing) may not. Removing metadata before uploading is the safest approach.',
  },
  {
    q: 'Can someone recover the metadata after I remove it?',
    a: 'No. Once metadata is stripped and the new image is saved, the data is gone. There is no steganographic or recoverable version of the metadata in the output file.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All processing happens locally in your browser using the Canvas API. Your images are never uploaded to any server. We never see your files.',
  },
  {
    q: 'Does the stripped image look different from the original?',
    a: 'No. Metadata is stored in a separate header portion of the file, not in the pixel data. The visual appearance of the image is identical after stripping.',
  },
  {
    q: 'What file format is the output image?',
    a: 'The tool outputs the same format as the input: JPEG images remain JPEG, PNG images remain PNG, and WebP images remain WebP. The format is preserved.',
  },
  {
    q: 'Does this work on screenshots and graphics, not just photos?',
    a: 'Yes. Although screenshots and digital graphics rarely contain GPS data, they may still carry software names, creation timestamps, and device identifiers. The tool strips all embedded metadata regardless of image origin.',
  },
];

export default function RemoveMetadataPage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .rm-h1    { opacity: 0; transform: translateY(10px); }
            .rm-sub   { opacity: 0; transform: translateY(10px); }
            .rm-trust { opacity: 0; }
          }
          .rm-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .rm-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .rm-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes rm-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .rm-fact { animation: rm-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .rm-fact:nth-child(1) { animation-delay: 240ms; }
          .rm-fact:nth-child(2) { animation-delay: 290ms; }
          .rm-fact:nth-child(3) { animation-delay: 340ms; }
          .rm-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">

        {/* ── Hero ── */}
        <div id="meta-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="rm-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Remove Image Metadata
          </h1>
          <p className="rm-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Strip GPS coordinates, camera info, timestamps, and all hidden EXIF data from
            JPEG, PNG, and WebP files — instantly, privately, without leaving your browser.
          </p>
          <p className="rm-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">Free · No account · No upload</p>

          {/* Trust strip */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 list-none p-0">
            {FACTS.map((f) => (
              <li key={f} className="rm-fact flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
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
        <MetadataStripperUI />

        {/* ── Mid-page anchor ── */}
        <div className="text-center mt-10 mb-2">
          <a
            href="#meta-tool"
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Three steps to a clean, private image</h2>
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
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-3">What is image metadata?</h2>
              <p className="mb-3">
                Every photo your camera or smartphone takes automatically embeds a layer of invisible data alongside the pixels you can see. This hidden data — called EXIF (Exchangeable Image File Format) data — can include the precise GPS coordinates of where the photo was taken, the exact date and time (down to the second), the make and model of the device, lens focal length, aperture, shutter speed, ISO, whether a flash fired, and sometimes your name or copyright notice.
              </p>
              <p>
                Most people are unaware this data exists. When you share an image online, you may inadvertently be sharing far more information than you intend.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Real situations where removing metadata protects you</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Selling items online (eBay, Facebook Marketplace, Craigslist).</strong> A photo taken at home and uploaded to a marketplace listing may contain the GPS coordinates of your home address. Anyone who downloads the image and reads its EXIF data can pinpoint where you live.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Dating app profile photos.</strong> Profile pictures taken at home or near your usual locations can reveal your neighbourhood or regular spots if EXIF data is preserved in the upload.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Journalists and activists.</strong> Photographers working in sensitive environments may inadvertently embed the GPS location of a source, a protest location, or a confidential meeting place into their images. Stripping metadata before transmitting photos is standard practice in responsible journalism.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Real estate photography.</strong> Listing photos of a property reveal the GPS location of the address in EXIF data. If the listing is later removed but images circulate, the address is still discoverable through the image file.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Children&apos;s photos shared online.</strong> Photos of children shared on parenting forums, family blogs, or public social media profiles can include the GPS location of your home, school, or daycare in the EXIF data.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Portfolio websites and creative professionals.</strong> Uploading full-resolution images to your portfolio or stock photo site with camera settings and timestamps exposed can reveal proprietary information about your workflow and equipment.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Legal documents and whistleblowers.</strong> A photo of a document or scene taken as evidence may embed the location and device of the photographer. Removing EXIF data before sharing protects the source.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">What data does the tool remove?</h2>
              <p className="mb-4">This tool strips all of the following EXIF fields from your image:</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                {[
                  'GPS latitude and longitude', 'GPS altitude and direction', 'Camera make and model',
                  'Lens model and serial number', 'Capture date and time', 'Image orientation',
                  'Shutter speed (exposure time)', 'Aperture (f-number)', 'ISO sensitivity',
                  'Focal length', 'Flash mode', 'White balance',
                  'Author / artist name', 'Copyright notice', 'Software used to edit',
                  'Unique device identifiers',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-3">How the tool works</h2>
              <p>
                The tool reads your image entirely within the browser using the File API. It draws the raw pixel data onto an HTML Canvas — this process inherently discards all EXIF metadata, because canvas only contains pixel values, not file headers. The canvas is then exported back to a JPEG, PNG, or WebP file. The output contains zero metadata. No data is ever sent to a server, and the tool never has access to anything beyond the image you provide.
              </p>
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
                All processing runs in your browser using the Canvas API. No file data is transmitted to any server, logged, or stored. ImagePDF.Tools cannot see, access, or retain your images at any point.
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

        <RelatedTools hrefs={['/metadata-editor', '/compress-image', '/crop-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
