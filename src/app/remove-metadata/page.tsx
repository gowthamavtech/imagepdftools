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
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Remove Image Metadata',
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
  ],
};

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
];

export default function RemoveMetadataPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-10">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-white/8 px-3 py-1 rounded-full">
            Privacy tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Remove Image Metadata
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Strip EXIF data, GPS coordinates, camera model, timestamps, and all hidden
            metadata from JPEG, PNG, and WebP files — instantly, privately, in your browser.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm max-w-2xl mx-auto">
            {[
              { icon: '📍', label: 'GPS Location' },
              { icon: '📷', label: 'Camera Info' },
              { icon: '🕐', label: 'Timestamps' },
              { icon: '✍️', label: 'Author & Copyright' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-700 dark:text-slate-400 font-medium"
              >
                <span>{icon}</span>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <MetadataStripperUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is image metadata?</h2>
              <p className="mb-3">
                Every photo your camera or smartphone takes automatically embeds a layer of invisible data alongside the pixels you can see. This hidden data — called EXIF (Exchangeable Image File Format) data — can include the precise GPS coordinates of where the photo was taken, the exact date and time (down to the second), the make and model of the device, lens focal length, aperture, shutter speed, ISO, whether a flash fired, and sometimes your name or copyright notice.
              </p>
              <p>
                Most people are unaware this data exists. When you share an image online, you may inadvertently be sharing far more information than you intend.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Real situations where removing metadata protects you</h2>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Selling items online (eBay, Facebook Marketplace, Craigslist).</strong> A photo taken at home and uploaded to a marketplace listing may contain the GPS coordinates of your home address. Anyone who downloads the image and reads its EXIF data can pinpoint where you live.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Dating app profile photos.</strong> Profile pictures taken at home or near your usual locations can reveal your neighbourhood or regular spots if EXIF data is preserved in the upload.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Journalists and activists.</strong> Photographers working in sensitive environments may inadvertently embed the GPS location of a source, a protest location, or a confidential meeting place into their images. Stripping metadata before transmitting photos is standard practice in responsible journalism.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Real estate photography.</strong> Listing photos of a property for sale reveal the GPS location of the address in EXIF data. If the listing is later removed but the images circulate, the address is still discoverable through the image file.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Children&apos;s photos shared online.</strong> Photos of children shared on parenting forums, family blogs, or public social media profiles can include the GPS location of your home, school, or daycare in the EXIF data.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Portfolio websites and creative professionals.</strong> Uploading full-resolution images to your portfolio or stock photo site with camera settings and timestamps exposed can reveal proprietary information about your workflow and equipment.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Legal documents and whistleblowers.</strong> A photo of a document or scene taken as evidence may embed the location and device of the photographer. Removing EXIF data before sharing protects the source.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What data does the tool remove?</h2>
              <p className="mb-3">This tool strips all of the following EXIF fields from your image:</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
              <p>
                The tool reads your image entirely within the browser using the File API. It draws the raw pixel data onto an HTML Canvas — this process inherently discards all EXIF metadata, because canvas only contains pixel values, not file headers. The canvas is then exported back to a JPEG, PNG, or WebP file. The output contains zero metadata. No data is ever sent to a server, and the tool never has access to anything beyond the image you provide.
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

        <RelatedTools hrefs={['/metadata-editor', '/compress-image', '/crop-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
