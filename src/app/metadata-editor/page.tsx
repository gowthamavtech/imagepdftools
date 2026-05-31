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

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Upload a JPEG, PNG, or WebP file. The tool immediately reads and displays all embedded metadata groups.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Review all metadata',
    desc: 'See GPS coordinates, camera settings, timestamps, author info, and software — everything your image carries.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Remove selected groups',
    desc: "Toggle off the metadata groups you want gone, then download the cleaned image. Keep what you need, discard what you don't.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const META_GROUPS = [
  {
    label: 'GPS & Location',
    desc: 'Latitude, longitude, altitude, direction, and speed at the time of capture. This is the most sensitive metadata group — it can pinpoint exactly where a photo was taken.',
  },
  {
    label: 'Camera & Device',
    desc: 'Make and model of the camera or phone, lens model, serial number, and unique device identifiers. This data can identify which device was used to take the photo.',
  },
  {
    label: 'Capture Settings',
    desc: 'Shutter speed, aperture (f-number), ISO sensitivity, focal length, flash mode, and white balance. Useful for photographers reviewing technical settings.',
  },
  {
    label: 'Timestamps',
    desc: 'Date and time the photo was taken, date it was edited, and the time zone. Can reveal your schedule and whereabouts over time.',
  },
  {
    label: 'Author & Copyright',
    desc: 'Photographer name, artist, author, copyright notice, and usage rights. Important for intellectual property but potentially a privacy concern when sharing anonymously.',
  },
  {
    label: 'Software',
    desc: 'The editing software used to process the image — Lightroom, Photoshop, iPhone Camera, and similar tools.',
  },
];

const SELECTIVE_CASES = [
  { label: 'Portfolio images', desc: 'Keep camera settings and copyright notice, remove GPS location.' },
  { label: 'Stock photo submissions', desc: 'Keep author name and copyright, remove device identifiers and location.' },
  { label: 'Client deliverables', desc: 'Keep capture timestamp for reference, remove personal camera serial numbers.' },
  { label: 'Archival images', desc: 'Preserve all metadata for historical reference — no removal needed.' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="metaed-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Metadata Editor</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              See what&apos;s hiding.<br /><span className="text-accent">Remove what matters.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              View every EXIF field — GPS, camera, timestamps, author info — then selectively remove only the groups you don&apos;t want.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <MetadataEditorUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              See everything. <em className="text-accent">Remove only what you choose.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
              {STEPS.map(({ n, title, desc, icon }) => (
                <div key={n} className="step-card">
                  <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                  <span aria-hidden="true" className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none" style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}>{n}</span>
                  <h3 className="text-[17px] font-medium text-fg-1 m-0 mb-[10px] leading-[1.35] tracking-[-0.005em]">{title}</h3>
                  <p className="text-sm font-normal text-fg-2 m-0 leading-[1.65] max-w-[38ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What is metadata ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">What is EXIF metadata?</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              The invisible layer inside every photo
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              Every time you take a photo, your device embeds hidden data into the file — the GPS location, camera make and model, lens settings, timestamps, and sometimes your name or copyright notice. This data is called EXIF metadata.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              Most image viewers display only the visible pixels. The metadata layer is invisible unless you use a dedicated viewer. Understanding what metadata is in your images helps you make informed decisions about what you share publicly.
            </p>
          </div>
        </section>

        {/* ── Metadata groups ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Metadata groups</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              What each group <em className="text-accent">contains.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {META_GROUPS.map(({ label, desc }) => (
                <div key={label} className="rounded-[10px] bg-surface bd-2 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <h3 className="text-[14px] font-semibold text-fg-1 m-0 leading-snug">{label}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-fg-2 m-0">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why selective removal matters ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Selective control</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Why selective removal matters
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-8">
              Many metadata strippers remove everything — appropriate when privacy is the only concern. But photographers, agencies, and stock contributors often need to retain some metadata while removing others:
            </p>
            <div className="space-y-4">
              {SELECTIVE_CASES.map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-4 rounded-[10px] bg-surface bd-2 px-5 py-4">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <span className="text-[13.5px] font-semibold text-fg-1">{label}: </span>
                    <span className="text-[13.5px] text-fg-2">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your image never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'All metadata reading and editing runs locally in your browser using JavaScript',
                  'No file data is transmitted to any server, logged, or stored',
                  'We cannot see, access, or retain your images at any point',
                  'Close the tab and the image is gone — nothing persists',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[13.5px] leading-[1.6] text-fg-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Back to tool nudge ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#metaed-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to tool
          </a>
        </div>

        {/* ── FAQ ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">FAQ</span>
            <h2 className="serif italic text-fg-1 m-0 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Frequently asked questions</h2>
            <div className="bd-t-1">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="hp-faq bd-b-1">
                  <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                    <span className="text-[15px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                    <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="hp-faq-answer text-[13.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedTools hrefs={['/remove-metadata', '/compress-image', '/crop-image', '/reduce-image-size']} />

      </main>
    </>
  );
}
