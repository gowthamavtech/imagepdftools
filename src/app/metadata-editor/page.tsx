import type { Metadata } from 'next';
import { MetadataEditorUI } from '@/components/MetadataEditorUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Image Metadata Viewer & Editor — View & Remove EXIF, GPS Data',
  description:
    'View all metadata in your JPEG, PNG, or WebP image — EXIF, GPS coordinates, camera info, timestamps, copyright. Toggle which groups to keep or remove, then download the cleaned file. 100% private, runs in your browser.',
  alternates: { canonical: 'https://imagepdf.tools/metadata-editor' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Image Metadata Editor',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online EXIF metadata viewer and editor. View GPS, camera, timestamp, and copyright data. Selectively remove metadata groups. Runs entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to view and edit image metadata online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your JPEG, PNG, or WebP image onto the tool.' },
        { '@type': 'HowToStep', text: 'Review all embedded metadata fields — GPS, camera, timestamps, author.' },
        { '@type': 'HowToStep', text: 'Toggle which metadata groups to keep or remove, then download the modified image.' },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is EXIF metadata and what does it contain?',
    a: 'EXIF (Exchangeable Image File Format) is a standard for storing metadata in image files. It typically includes GPS coordinates, camera make and model, lens information, shutter speed, aperture, ISO, focal length, flash mode, capture date and time, author name, and copyright notice.',
  },
  {
    q: 'Can I remove only specific metadata fields?',
    a: 'Yes. Unlike a simple metadata stripper, the editor lets you selectively remove metadata groups — for example, keep camera settings for your portfolio but remove GPS location before sharing publicly.',
  },
  {
    q: 'Does editing metadata change the image quality?',
    a: 'No. Metadata is stored separately from the pixel data. Removing or editing metadata fields has no effect on the visual content or quality of the image.',
  },
  {
    q: 'Which image formats support EXIF metadata?',
    a: 'JPEG is the primary format that carries EXIF data. PNG has its own metadata format (tEXt chunks and iTXt chunks). WebP supports EXIF embedded in its container. This tool reads and handles all three formats.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All metadata reading and modification happens locally in your browser using JavaScript. Your image never leaves your device.',
  },
];

export default function MetadataEditorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Image Metadata Editor
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            See exactly what&apos;s embedded in your image — GPS coordinates, camera make and model,
            timestamps, author info — and remove only the groups you don&apos;t want.
            Nothing leaves your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {['GPS & Location', 'Camera Info', 'Timestamps', 'Author & Copyright', 'Software'].map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        <MetadataEditorUI />

        {/* ── Content ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 mt-16">
          <div className="space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What is image metadata?</h2>
              <p className="mb-3">
                Every time you take a photo, your device embeds hidden data into the file — the GPS location where the photo was taken, the camera make and model, lens settings, timestamps, and sometimes your name or copyright notice. This data is called EXIF metadata.
              </p>
              <p>
                Most image viewers and editors display only the visible pixels. The metadata layer is invisible unless you use a dedicated viewer — or this tool. Understanding what metadata is in your images helps you make informed decisions about what you share publicly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">What each metadata group contains</h2>
              <ul className="space-y-3">
                {[
                  { label: 'GPS & Location', desc: 'Latitude, longitude, altitude, direction, and speed at the time of capture. This is the most sensitive metadata group — it can pinpoint exactly where a photo was taken.' },
                  { label: 'Camera & Device', desc: 'Make and model of the camera or phone, lens model, serial number, and unique device identifiers. This data can identify which device was used to take the photo.' },
                  { label: 'Capture Settings', desc: 'Shutter speed, aperture (f-number), ISO sensitivity, focal length, flash mode, and white balance. Useful for photographers reviewing technical settings.' },
                  { label: 'Timestamps', desc: 'Date and time the photo was taken, date it was edited, and the time zone. Can reveal your schedule and whereabouts over time.' },
                  { label: 'Author & Copyright', desc: 'Photographer name, artist, author, copyright notice, and usage rights. Important for intellectual property but potentially a privacy concern when sharing anonymously.' },
                  { label: 'Software', desc: 'The editing software used to process the image — Lightroom, Photoshop, iPhone Camera, etc.' },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong className="text-slate-800 dark:text-slate-200">{label}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">Why selective removal matters</h2>
              <p className="mb-3">
                Many metadata strippers remove everything — which is appropriate when privacy is the only concern. But photographers, agencies, and stock photo contributors often need to retain some metadata while removing others:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-emerald-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Portfolio images:</strong> Keep camera settings and copyright notice, remove GPS location.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Stock photo submissions:</strong> Keep author name and copyright, remove device identifiers and location.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Client deliverables:</strong> Keep capture timestamp for reference, remove personal camera serial numbers.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Archival images:</strong> Preserve all metadata for historical reference; no removal needed.</li>
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

        <RelatedTools hrefs={['/remove-metadata', '/compress-image', '/crop-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
