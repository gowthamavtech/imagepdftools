import type { Metadata } from 'next';
import { MergePdfUI } from '@/components/MergePdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Merge PDF Online — Combine PDF Files Free',
  description:
    'Merge multiple PDF files into one in seconds. Drag to reorder, rotate pages, preview before saving — all inside your browser. No upload, no account, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/merge-pdf' },
  openGraph: {
    title: 'Merge PDF Online — Combine PDF Files Free',
    description: 'Combine multiple PDF files into one in your browser. Drag to reorder, rotate pages, unlock password-protected PDFs — no upload required.',
    url: 'https://imagepdf.tools/merge-pdf',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Merge PDF — ImagePDF.Tools',
      url: 'https://imagepdf.tools/merge-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      featureList: [
        'Merge unlimited PDF files',
        'Drag-and-drop reordering',
        'Per-page rotation',
        'Password-protected PDF support',
        'Preview before saving',
        'No file upload — 100% private',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online PDF merger. Combine multiple PDFs into one in your browser — drag to reorder, rotate pages, unlock encrypted PDFs, preview the result, then save locally.',
    },
    {
      '@type': 'HowTo',
      name: 'How to merge PDF files online',
      totalTime: 'PT1M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Add PDFs', text: 'Drop two or more PDF files onto the tool, or click Browse PDFs. Use the + card to add more files at any time.' },
        { '@type': 'HowToStep', position: 2, name: 'Reorder and rotate', text: 'Drag cards to set the final page order. Use the rotate button on each card to rotate pages 90°. Unlock password-protected PDFs by entering the password directly on the card.' },
        { '@type': 'HowToStep', position: 3, name: 'Merge and save', text: 'Click Merge PDFs. Preview the result, then click Save PDF to download to your device.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How many PDFs can I merge at once?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit. You can merge as many files as your browser memory allows. Very large batches (hundreds of pages or several hundred MB) may take a little longer on lower-spec devices.' } },
        { '@type': 'Question', name: 'Does merging reduce PDF quality?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text stays selectable, images keep their original quality, and fonts are preserved exactly as in the source files.' } },
        { '@type': 'Question', name: 'Can I merge password-protected PDFs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enter the password directly on the file card and the tool unlocks it for merging. The password is never sent anywhere — decryption happens locally in your browser.' } },
        { '@type': 'Question', name: 'Can I rotate pages before merging?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Each card has a rotate button that rotates that PDF's pages by 90° clockwise. The rotation is applied to the output document, not just the preview." } },
        { '@type': 'Question', name: 'Is my PDF uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing — merging, rotating, decryption — happens entirely in your browser using pdf-lib and PDF.js. Your files never leave your device.' } },
        { '@type': 'Question', name: 'Can I preview the merged PDF before downloading?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After merging, click Preview to see the full document in a modal viewer before saving it to your device.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Add your PDFs',
    desc: 'Drop two or more PDF files onto the tool, or click Browse PDFs. Add more files at any time with the + card.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Reorder & rotate',
    desc: 'Drag cards to set the final page order. Rotate pages 90° and unlock password-protected PDFs directly on each card.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Merge & save',
    desc: 'Click Merge PDFs. Preview the full document, then save it to your device. Everything builds inside your browser.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FEATURES = [
  { label: 'Drag-to-reorder', desc: 'Drag any card to change the sequence. A numbered badge always shows the final order so there is no guesswork.' },
  { label: 'Per-file rotation', desc: "Rotate any PDF's pages 90° clockwise before merging — useful for scanned pages that came out sideways." },
  { label: 'Password-protected PDFs', desc: 'Enter the password directly on the card. The tool decrypts the file in your browser and includes it in the merge.' },
  { label: 'Thumbnail previews', desc: 'Every card shows a rendered preview of the first page so you can confirm you have the right file before merging.' },
  { label: 'Preview before saving', desc: 'After merging, open the full document in a modal viewer to check it before committing to a save.' },
  { label: 'Edit after merging', desc: 'Not happy with the result? Click Edit on the result card to go straight back to the file list with no re-uploading required.' },
];

const USE_CASES = [
  { label: 'Contracts and agreements', desc: 'Combine a contract body, appendices, and signature pages into one document for signing or archival.' },
  { label: 'Invoices and receipts', desc: 'Bundle multiple invoices into a single PDF for accounting, expense reports, or submission to a finance team.' },
  { label: 'Scanned documents', desc: 'Scanners often produce one PDF per page — merge them into a single multi-page document.' },
  { label: 'Application packets', desc: 'Combine a CV, cover letter, portfolio, and certificates into one file for job applications.' },
  { label: 'Reports and presentations', desc: 'Merge chapter exports or slide handouts into one complete document for distribution.' },
  { label: 'Research and study notes', desc: 'Merge lecture slides, papers, and personal notes into a single reference file.' },
];

const FAQS = [
  {
    q: 'How many PDFs can I merge at once?',
    a: 'There is no hard limit. You can merge as many files as your browser memory allows. Very large batches (hundreds of pages or several hundred MB) may take a little longer on lower-spec devices.',
  },
  {
    q: 'Does merging reduce PDF quality?',
    a: 'No. The tool copies pages directly using pdf-lib without re-rendering or re-compressing any content. Text stays selectable, images keep their original resolution, and fonts are preserved exactly as in the source files.',
  },
  {
    q: 'Can I merge password-protected PDFs?',
    a: 'Yes. Enter the password on the file card and the tool unlocks the file for merging. Decryption happens locally in your browser — the password is never sent anywhere.',
  },
  {
    q: 'Can I rotate pages before merging?',
    a: "Yes. Each card has a rotate button that rotates that file's pages 90° clockwise. The rotation is written into the output PDF's page metadata, not just the thumbnail preview.",
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. All processing — merging, rotating, decryption, thumbnail rendering — happens entirely in your browser. Your files never leave your device.',
  },
  {
    q: 'Can I preview the merged PDF before downloading?',
    a: 'Yes. After merging, click Preview to open the full document in a viewer. If you spot an issue, click Edit to go back to the file list without losing your files.',
  },
];

export default function MergePdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="merge-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Merge PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Combine PDF files.<br /><span className="text-accent">One clean document.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Drag to reorder, rotate pages, unlock encrypted files — then preview and save. Everything runs inside your browser.
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
          <MergePdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">One merged PDF.</em>
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

        {/* ── Features ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Features</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Everything you need. <em className="text-accent">Nothing you don&apos;t.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(({ label, desc }) => (
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

        {/* ── Use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Use cases</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              When merging PDFs <em className="text-accent">saves the day.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {USE_CASES.map(({ label, desc }) => (
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

        {/* ── How it works technically ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How the merge actually works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              When you add files, PDF.js renders the first page of each file to a canvas and creates a thumbnail — entirely in your browser, with no upload. For password-protected files, PDF.js decrypts the content locally using the password you provide.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-6">
              When you click Merge, pdf-lib copies the raw page objects from each source PDF into a new output document. No page is re-rendered or re-compressed, so text stays selectable, images keep their original resolution, and fonts are preserved exactly as they appear in the originals. The finished PDF is created as a Blob directly in your browser and offered via a Save As dialog.
            </p>
            <div className="rounded-[10px] bg-surface bd-2 px-6 py-5 flex gap-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[13px] leading-[1.7] text-fg-2 m-0">
                Processing happens on your device. Because no files are uploaded, all the work is done by your computer or phone. Larger files or batches with many pages may take longer depending on your device speed and available memory.
              </p>
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your PDFs never leave your browser.</h2>
              <div className="space-y-3">
                {[
                  'All merging, rotation, and decryption runs locally via pdf-lib and PDF.js',
                  'No file data is transmitted to any server, logged, or stored',
                  'Passwords for encrypted PDFs never leave your device',
                  'Close the tab and your files are gone — nothing persists',
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
          <a href="#merge-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/compress-pdf', '/image-to-pdf', '/compress-image', '/remove-metadata']} />

      </main>
    </>
  );
}
