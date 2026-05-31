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

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your image',
    desc: 'Upload a JPEG, PNG, or WebP file by clicking or dragging it onto the tool below.',
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
    title: 'Metadata is stripped',
    desc: 'All EXIF fields — GPS coordinates, camera info, timestamps, author — are removed from the file header.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        <line x1="5" y1="12" x2="19" y2="12" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download the clean file',
    desc: 'Save the privacy-safe image. Pixel quality is preserved at 95%+ fidelity — the image looks identical.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const REAL_SITUATIONS = [
  {
    label: 'Selling items online',
    desc: 'A photo taken at home and uploaded to a marketplace listing may contain the GPS coordinates of your home address. Anyone who downloads the image can pinpoint where you live.',
  },
  {
    label: 'Dating app profile photos',
    desc: 'Profile pictures taken at home or near your usual locations can reveal your neighbourhood or regular spots if EXIF data is preserved in the upload.',
  },
  {
    label: 'Journalists and activists',
    desc: 'Photographers working in sensitive environments may inadvertently embed the GPS location of a source or protest location. Stripping metadata is standard practice in responsible journalism.',
  },
  {
    label: "Children's photos shared online",
    desc: 'Photos shared on parenting forums or public social media profiles can include the GPS location of your home, school, or daycare in the EXIF data.',
  },
  {
    label: 'Real estate photography',
    desc: 'Listing photos reveal the GPS location of the address in EXIF data. If the listing is removed but images circulate, the address remains discoverable through the image file.',
  },
  {
    label: 'Legal documents and whistleblowers',
    desc: 'A photo taken as evidence may embed the location and device of the photographer. Removing EXIF data before sharing protects the source.',
  },
];

const EXIF_FIELDS = [
  'GPS latitude and longitude',
  'GPS altitude and direction',
  'Camera make and model',
  'Lens model and serial number',
  'Capture date and time',
  'Image orientation',
  'Shutter speed (exposure time)',
  'Aperture (f-number)',
  'ISO sensitivity',
  'Focal length',
  'Flash mode',
  'White balance',
  'Author / artist name',
  'Copyright notice',
  'Software used to edit',
  'Unique device identifiers',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="meta-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Remove Metadata</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Strip hidden data.<br /><span className="text-accent">Protect your privacy.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Remove GPS coordinates, camera info, timestamps, and all hidden EXIF data from JPEG, PNG, and WebP files.
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
          <MetadataStripperUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Instant results.</em>
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
              The invisible data inside every photo
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              Every photo your camera or smartphone takes automatically embeds a layer of invisible data alongside the pixels you can see. This hidden data — called EXIF (Exchangeable Image File Format) data — can include the precise GPS coordinates of where the photo was taken, the exact date and time, the make and model of the device, lens focal length, aperture, shutter speed, ISO, and sometimes your name or copyright notice.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              Most people are unaware this data exists. When you share an image online, you may inadvertently be sharing far more information than you intend.
            </p>
          </div>
        </section>

        {/* ── Real situations ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Why it matters</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Real situations where metadata <em className="text-accent">exposes you.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REAL_SITUATIONS.map(({ label, desc }) => (
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

        {/* ── What data is removed ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Full field list</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Every EXIF field, completely erased
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-8">
              The tool strips all of the following fields from your image file header:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {EXIF_FIELDS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-[13.5px] text-fg-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works technically ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How the metadata removal works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              The tool reads your image entirely within the browser using the File API. It draws the raw pixel data onto an HTML Canvas — this process inherently discards all EXIF metadata, because canvas only contains pixel values, not file headers. The canvas is then exported back to a JPEG, PNG, or WebP file. The output contains zero metadata. No data is ever sent to a server, and the tool never has access to anything beyond the image you provide.
            </p>
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
                  'All processing runs locally using the Canvas API — no server involved',
                  'No file data is transmitted, logged, or stored anywhere',
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
          <a href="#meta-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/metadata-editor', '/compress-image', '/crop-image', '/reduce-image-size']} />

      </main>
    </>
  );
}
