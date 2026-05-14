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
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Metadata Editor',
      url: 'https://imagepdf.tools/metadata-editor',
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is EXIF metadata and what does it contain?', acceptedAnswer: { '@type': 'Answer', text: 'EXIF (Exchangeable Image File Format) is a standard for storing metadata in image files. It typically includes GPS coordinates, camera make and model, lens information, shutter speed, aperture, ISO, focal length, flash mode, capture date and time, author name, and copyright notice.' } },
        { '@type': 'Question', name: 'Can I remove only specific metadata fields?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Unlike a simple metadata stripper, the editor lets you selectively remove metadata groups — for example, keep camera settings for your portfolio but remove GPS location before sharing publicly.' } },
        { '@type': 'Question', name: 'Does editing metadata change the image quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. Metadata is stored separately from the pixel data. Removing or editing metadata fields has no effect on the visual content or quality of the image.' } },
        { '@type': 'Question', name: 'Which image formats support EXIF metadata?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG is the primary format that carries EXIF data. PNG has its own metadata format (tEXt chunks and iTXt chunks). WebP supports EXIF embedded in its container. This tool reads and handles all three formats.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All metadata reading and modification happens locally in your browser using JavaScript. Your image never leaves your device.' } },
        { '@type': 'Question', name: 'What is the difference between this tool and the Remove Metadata tool?', acceptedAnswer: { '@type': 'Answer', text: 'The Remove Metadata tool strips everything in one click — useful when you want total privacy. The Metadata Editor shows you exactly what is embedded and lets you choose which groups to keep or remove, giving you granular control.' } },
        { '@type': 'Question', name: 'Can I see the metadata before I download the modified image?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool displays all metadata fields immediately after you drop your image — before you make any changes or download anything. You can review the full metadata and then decide which groups to remove.' } },
        { '@type': 'Question', name: 'Is a photographer name or copyright notice useful to keep?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, in many professional contexts. Keeping author and copyright metadata in images submitted to stock photo agencies, editorial outlets, or client deliverables helps establish ownership. You can remove GPS and device identifiers while retaining the authorship data.' } },
      ],
    },
  ],
};

const FACTS = [
  'Zero bytes sent to any server',
  'View before you remove',
  'Free with no account required',
  'Selective field control',
];

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Upload a JPEG, PNG, or WebP file. The tool immediately reads and displays all embedded metadata groups.' },
  { n: '02', title: 'Review all metadata', desc: 'See GPS coordinates, camera settings, timestamps, author info, and software — everything your image carries.' },
  { n: '03', title: 'Remove selected groups', desc: 'Toggle off the metadata groups you want gone, then download the cleaned image. Keep what you need, discard what you don\'t.' },
];

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
  {
    q: 'What is the difference between this tool and the Remove Metadata tool?',
    a: 'The Remove Metadata tool strips everything in one click — useful when you want total privacy. The Metadata Editor shows you exactly what is embedded and lets you choose which groups to keep or remove, giving you granular control.',
  },
  {
    q: 'Can I see the metadata before I download the modified image?',
    a: 'Yes. The tool displays all metadata fields immediately after you drop your image — before you make any changes or download anything. You can review the full metadata and then decide which groups to remove.',
  },
  {
    q: 'Is a photographer name or copyright notice useful to keep?',
    a: 'Yes, in many professional contexts. Keeping author and copyright metadata in images submitted to stock photo agencies, editorial outlets, or client deliverables helps establish ownership. You can remove GPS and device identifiers while retaining the authorship data.',
  },
];

export default function MetadataEditorPage() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .me-h1    { opacity: 0; transform: translateY(10px); }
            .me-sub   { opacity: 0; transform: translateY(10px); }
            .me-trust { opacity: 0; }
          }
          .me-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .me-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .me-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes me-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .me-fact { animation: me-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .me-fact:nth-child(1) { animation-delay: 240ms; }
          .me-fact:nth-child(2) { animation-delay: 290ms; }
          .me-fact:nth-child(3) { animation-delay: 340ms; }
          .me-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">

        {/* ── Hero ── */}
        <div id="metaed-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="me-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Image Metadata Viewer &amp; Editor
          </h1>
          <p className="me-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            See exactly what&apos;s embedded in your image — GPS coordinates, camera settings,
            timestamps, author info — then remove only the groups you don&apos;t want. Nothing leaves your browser.
          </p>
          <p className="me-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">Free · No account · No upload</p>

          {/* Trust strip */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 list-none p-0">
            {FACTS.map((f) => (
              <li key={f} className="me-fact flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
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
        <MetadataEditorUI />

        {/* ── Mid-page anchor ── */}
        <div className="text-center mt-10 mb-2">
          <a
            href="#metaed-tool"
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
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">See everything, remove only what you choose</h2>
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
                Every time you take a photo, your device embeds hidden data into the file — the GPS location where the photo was taken, the camera make and model, lens settings, timestamps, and sometimes your name or copyright notice. This data is called EXIF metadata.
              </p>
              <p>
                Most image viewers and editors display only the visible pixels. The metadata layer is invisible unless you use a dedicated viewer — or this tool. Understanding what metadata is in your images helps you make informed decisions about what you share publicly.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">What each metadata group contains</h2>
              <ul className="space-y-3">
                {[
                  { label: 'GPS & Location', desc: 'Latitude, longitude, altitude, direction, and speed at the time of capture. This is the most sensitive metadata group — it can pinpoint exactly where a photo was taken.' },
                  { label: 'Camera & Device', desc: 'Make and model of the camera or phone, lens model, serial number, and unique device identifiers. This data can identify which device was used to take the photo.' },
                  { label: 'Capture Settings', desc: 'Shutter speed, aperture (f-number), ISO sensitivity, focal length, flash mode, and white balance. Useful for photographers reviewing technical settings.' },
                  { label: 'Timestamps', desc: 'Date and time the photo was taken, date it was edited, and the time zone. Can reveal your schedule and whereabouts over time.' },
                  { label: 'Author & Copyright', desc: 'Photographer name, artist, author, copyright notice, and usage rights. Important for intellectual property but potentially a privacy concern when sharing anonymously.' },
                  { label: 'Software', desc: 'The editing software used to process the image — Lightroom, Photoshop, iPhone Camera, etc.' },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex gap-3 list-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                    <span><strong className="text-slate-800 dark:text-slate-200">{label}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-3">Why selective removal matters</h2>
              <p className="mb-4">
                Many metadata strippers remove everything — which is appropriate when privacy is the only concern. But photographers, agencies, and stock photo contributors often need to retain some metadata while removing others:
              </p>
              <ul className="space-y-2 list-disc list-inside marker:text-violet-400">
                <li><strong className="text-slate-800 dark:text-slate-200">Portfolio images:</strong> Keep camera settings and copyright notice, remove GPS location.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Stock photo submissions:</strong> Keep author name and copyright, remove device identifiers and location.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Client deliverables:</strong> Keep capture timestamp for reference, remove personal camera serial numbers.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Archival images:</strong> Preserve all metadata for historical reference; no removal needed.</li>
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
                All metadata reading and modification runs entirely in your browser using JavaScript. No file data is transmitted to any server, logged, or stored. ImagePDF.Tools cannot see, access, or retain your images at any point.
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

        <RelatedTools hrefs={['/remove-metadata', '/compress-image', '/crop-image', '/reduce-image-size']} />
      </main>
    </>
  );
}
