import type { Metadata } from 'next';
import { PdfToWordUI } from '@/components/PdfToWordUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'PDF to Word — Convert PDF to DOCX Free Online',
  description:
    'Convert PDF files to editable Word documents (.docx) in your browser. No upload, no server. Works best for text-based PDFs — no OCR required. Free forever.',
  alternates: { canonical: 'https://imagepdf.tools/pdf-to-word' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — PDF to Word',
      url: 'https://imagepdf.tools/pdf-to-word',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free browser-based PDF to Word converter. Extracts text from PDF and builds an editable .docx with no upload.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert a PDF to Word online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your PDF onto the tool. It must be a text-based PDF, not a scanned document.' },
        { '@type': 'HowToStep', text: 'Preview the extracted text to verify the content looks correct.' },
        { '@type': 'HowToStep', text: 'Click Download DOCX to get your editable Word document.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does this upload my PDF to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. The entire conversion runs in your browser using PDF.js for text extraction and the docx library for DOCX creation. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Does it work with scanned PDFs?', acceptedAnswer: { '@type': 'Answer', text: 'No. Scanned PDFs are images of text, not actual text data. Converting them requires OCR (optical character recognition), which is not available in this browser-based tool. For scanned documents, use a desktop tool with OCR such as Adobe Acrobat or ABBYY FineReader.' } },
        { '@type': 'Question', name: 'How accurate is the conversion?', acceptedAnswer: { '@type': 'Answer', text: 'Accuracy depends on the PDF. Text-heavy documents with standard paragraphs and headings convert cleanly. Complex layouts with multi-column text, tables, and floating images may require manual cleanup in Word after conversion.' } },
        { '@type': 'Question', name: 'Will tables be preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Simple tables may be partially preserved, but complex table structures are likely to be converted to paragraphs. For table-heavy PDFs, a desktop PDF editor will give better results.' } },
        { '@type': 'Question', name: 'Is there a file size limit?', acceptedAnswer: { '@type': 'Answer', text: 'No hard limit. The conversion runs in your browser, so very large PDFs (100+ pages) may take a few seconds. There is no server-side restriction.' } },
      ],
    },
  ],
};

const C       = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your PDF',
    desc: 'Upload a text-based PDF — reports, letters, contracts, essays. Scanned documents are not supported (no OCR).',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Preview the text',
    desc: 'See the extracted text before downloading. Headings and paragraph structure are detected automatically.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download the DOCX',
    desc: 'Click Download DOCX. Open in Microsoft Word, Google Docs, or LibreOffice — fully editable.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const USE_CASES = [
  { label: 'Editing locked documents', desc: 'PDFs you receive from colleagues, clients, or portals are often not editable. Converting to Word lets you make revisions and send back a clean document.' },
  { label: 'Repurposing content', desc: 'Pull text from a PDF report, whitepaper, or guide into a Word document for editing, reformatting, or incorporating into a new document.' },
  { label: 'Updating old PDF contracts', desc: 'Contracts saved as PDF years ago can be converted back to Word for amendment or re-use as a template.' },
  { label: 'Extracting text from reports', desc: 'Annual reports, research papers, and policy documents are often distributed as PDF. Converting to Word makes the text searchable and copyable without restrictions.' },
  { label: 'Reusing form templates', desc: 'If a PDF form contains standard text that you want as a Word template, conversion is faster than retyping everything from scratch.' },
  { label: 'Translating documents', desc: 'Translation tools like DeepL and Google Translate work better with Word documents than PDFs. Converting first gives cleaner results.' },
];

const COMPARISON = [
  { tool: 'iLovePDF', privacy: 'Uploads file to server (2h retention)', limit: '25 MB free', watermark: 'None', note: 'Reliable but requires trust in their servers' },
  { tool: 'SmallPDF', privacy: 'Uploads file to server (1h retention)', limit: '2 tasks/day free', watermark: 'None', note: 'Good quality but strict daily limits' },
  { tool: 'Adobe Acrobat Online', privacy: 'Uploads to Adobe servers', limit: '2 PDFs/month free', watermark: 'None', note: 'Best quality but very limited free tier' },
  { tool: 'This tool', privacy: 'Zero upload — runs in your browser', limit: 'Unlimited, free', watermark: 'Never', note: 'Works for text PDFs; no OCR for scans' },
];

const FAQS = [
  { q: 'Does this upload my PDF to a server?', a: 'No. The entire conversion runs in your browser using PDF.js for text extraction and the docx library for DOCX creation. Your file never leaves your device.' },
  { q: 'Does it work with scanned PDFs?', a: 'No. Scanned PDFs are images of text, not actual text data. Converting them requires OCR (optical character recognition), which is not available in this browser-based tool. For scanned documents, use a desktop tool with OCR such as Adobe Acrobat or ABBYY FineReader.' },
  { q: 'How accurate is the conversion?', a: 'Accuracy depends on the PDF. Text-heavy documents with standard paragraphs and headings convert cleanly. Complex layouts with multi-column text, tables, and floating images may require manual cleanup in Word after conversion.' },
  { q: 'Will tables be preserved?', a: 'Simple tables may be partially preserved, but complex table structures are likely to be converted to paragraphs. For table-heavy PDFs, a desktop PDF editor will give better results.' },
  { q: 'Is there a file size limit?', a: 'No hard limit. The conversion runs in your browser, so very large PDFs (100+ pages) may take a few seconds. There is no server-side restriction.' },
];

export default function PdfToWordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="pdf-to-word-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">PDF to Word</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              PDF text.<br /><span className="text-accent">Editable Word doc.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[48ch] mx-auto m-0 mb-3">
              Extract text from any PDF and download as a fully editable .docx — no upload, no account, no limits.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload · No watermark</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'No watermark', 'Unlimited'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <PdfToWordUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Editable in seconds.</em>
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

        {/* ── Use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Use cases</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              When you need to <em className="text-accent">edit a PDF.</em>
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

        {/* ── Comparison table ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Comparison</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How we compare to <em className="text-accent">other tools.</em>
            </h2>
            <div className="overflow-auto rounded-[12px] bd-2">
              <table style={{ minWidth: '460px' }} className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="bd-b-2 bg-surface">
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Tool</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Privacy</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Limit</th>
                    <th className="text-left px-5 py-3 text-fg-2 font-medium text-[12px]">Watermark</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.tool} className={i < COMPARISON.length - 1 ? 'bd-b-2' : ''}>
                      <td className={`px-5 py-3 font-medium ${i === COMPARISON.length - 1 ? 'text-accent' : 'text-fg-1'}`}>{row.tool}</td>
                      <td className="px-5 py-3 text-fg-2">{row.privacy}</td>
                      <td className="px-5 py-3 text-fg-2">{row.limit}</td>
                      <td className={`px-5 py-3 font-medium ${row.watermark === 'Never' ? 'text-emerald-400' : 'text-fg-2'}`}>{row.watermark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your PDF never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'Text extraction runs locally via PDF.js (Mozilla\'s open-source engine)',
                  'DOCX creation runs locally via the docx library — no server involved',
                  'No file data is sent anywhere, logged, or stored at any point',
                  'Close the tab and your file is gone — nothing persists',
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

        {/* ── Back to tool ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#pdf-to-word-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/word-to-pdf', '/compress-pdf', '/merge-pdf', '/pdf-to-jpg']} />

      </main>
    </>
  );
}
