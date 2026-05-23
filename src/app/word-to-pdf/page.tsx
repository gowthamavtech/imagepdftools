import type { Metadata } from 'next';
import { WordToPdfUILoader as WordToPdfUI } from '@/components/WordToPdfUILoader';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Word to PDF — Convert DOCX to PDF Free Online',
  description:
    'Convert Word documents (.docx) to PDF in your browser. No upload, no server, no watermark. Preserves text, headings, lists, and tables. Free forever.',
  alternates: { canonical: 'https://imagepdf.tools/word-to-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Word to PDF',
      url: 'https://imagepdf.tools/word-to-pdf',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online Word to PDF converter. Drop a .docx file and download the PDF instantly, with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to convert a Word document to PDF online',
      step: [
        { '@type': 'HowToStep', text: 'Drop your .docx file onto the tool or click to browse.' },
        { '@type': 'HowToStep', text: 'Preview how the document will look in the PDF.' },
        { '@type': 'HowToStep', text: 'Choose A4 or Letter page size, then click Download PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does converting Word to PDF upload my file?', acceptedAnswer: { '@type': 'Answer', text: 'No. The entire conversion runs in your browser using the mammoth.js library and the jsPDF engine. Your document never leaves your device.' } },
        { '@type': 'Question', name: 'Which Word formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'The tool supports .docx (Office Open XML), which is the format used by Microsoft Word 2007 and later. If you have an older .doc file, open it in Word and save it as .docx first.' } },
        { '@type': 'Question', name: 'Will the formatting be preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Text, headings, paragraphs, bullet lists, numbered lists, bold, italic, underline, and simple tables are all preserved. Complex layouts with custom fonts, text boxes, or advanced table styles may differ slightly from the original.' } },
        { '@type': 'Question', name: 'Can I choose the page size?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can choose between A4 (international standard) and US Letter (North American standard) using the toggle above the preview.' } },
        { '@type': 'Question', name: 'Is there a file size limit?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit. Since processing runs in your browser, very large documents (50+ MB) may take longer or require more memory. Most typical Word documents convert in seconds.' } },
        { '@type': 'Question', name: 'Will the PDF have a watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Never. There are no watermarks, logos, or branding added to the output — on any plan.' } },
      ],
    },
  ],
};

const C       = 'max-w-[1180px] mx-auto px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-8';

const STEPS = [
  {
    n: '01',
    title: 'Drop your Word file',
    desc: 'Upload a .docx file by dragging it onto the tool or clicking to browse. Only .docx is supported — not the older .doc format.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Preview and adjust',
    desc: 'See a live preview of how your document will appear as a PDF. Switch between A4 and US Letter page size before downloading.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download your PDF',
    desc: 'Click Download PDF. The file is built locally and downloaded instantly — no account, no wait, no watermark.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const USE_CASES = [
  { label: 'Submitting job applications', desc: 'Employers and applicant tracking systems expect PDFs. Converting your resume and cover letter ensures the formatting is locked and looks identical on every device.' },
  { label: 'Sending contracts and agreements', desc: 'A PDF cannot be accidentally edited the way a Word file can. Converting contracts to PDF protects the integrity of the document before sharing.' },
  { label: 'University and college submissions', desc: 'Academic portals, assignment dropboxes, and grant applications typically require PDF. Converting your Word essay takes seconds.' },
  { label: 'Invoices and quotes', desc: 'Sending an invoice as a PDF prevents formatting from shifting in the recipient\'s version of Word and ensures totals are displayed correctly.' },
  { label: 'Reports and presentations', desc: 'Converting a report to PDF makes it easy to share via email or link, with confidence it will look identical to the reader.' },
  { label: 'Archiving documents', desc: 'PDFs are a stable, long-lived format. Converting Word documents to PDF before archiving ensures they remain readable independent of future Word versions.' },
];

const LIMITATIONS = [
  { label: 'Text content', supported: true, note: 'All paragraph text, headings, and inline formatting (bold, italic, underline) are preserved.' },
  { label: 'Bullet and numbered lists', supported: true, note: 'Unordered and ordered lists with standard bullets and numbers are correctly converted.' },
  { label: 'Simple tables', supported: true, note: 'Basic tables with standard borders and cell content convert cleanly.' },
  { label: 'Images in documents', supported: true, note: 'Inline images embedded in the .docx file are included in the PDF output.' },
  { label: 'Complex table styles', supported: false, note: 'Merged cells, rotated text, and advanced table shading may not render correctly.' },
  { label: 'Custom fonts', supported: false, note: 'Non-system fonts embedded in the .docx are replaced with fallback serif fonts in the PDF.' },
  { label: 'Text boxes and shapes', supported: false, note: 'Floating text boxes, callouts, and Word drawing objects may be omitted.' },
  { label: 'Headers and footers', supported: false, note: 'Page headers and footers defined in the .docx are not yet included in the PDF output.' },
];

const FAQS = [
  { q: 'Does converting Word to PDF upload my file?', a: 'No. The entire conversion runs in your browser using the mammoth.js library and the jsPDF engine. Your document never leaves your device.' },
  { q: 'Which Word formats are supported?', a: 'The tool supports .docx (Office Open XML), which is the format used by Microsoft Word 2007 and later. If you have an older .doc file, open it in Word and save it as .docx first.' },
  { q: 'Will the formatting be preserved?', a: 'Text, headings, paragraphs, bullet lists, numbered lists, bold, italic, underline, and simple tables are all preserved. Complex layouts with custom fonts, text boxes, or advanced table styles may differ slightly from the original.' },
  { q: 'Can I choose the page size?', a: 'Yes. You can choose between A4 (international standard) and US Letter (North American standard) using the toggle above the preview.' },
  { q: 'Is there a file size limit?', a: 'There is no hard limit. Since processing runs in your browser, very large documents (50+ MB) may take longer or require more memory. Most typical Word documents convert in seconds.' },
  { q: 'Will the PDF have a watermark?', a: 'Never. There are no watermarks, logos, or branding added to the output — on any plan.' },
];

export default function WordToPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="word-to-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Word to PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Word document.<br /><span className="text-accent">Clean PDF. Instantly.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[48ch] mx-auto m-0 mb-3">
              Convert .docx files to PDF in your browser. Preview before you download. No upload, no watermark, no limits.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-8">Free · No account · No upload</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', 'No watermark', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <WordToPdfUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">One clean PDF.</em>
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
              When converting to PDF <em className="text-accent">matters.</em>
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

        {/* ── What's supported ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Supported features</span>
            <h2 className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              What converts well — and what doesn&apos;t
            </h2>
            <p className="text-[14px] text-fg-2 leading-[1.7] m-0 mb-8">
              Browser-based Word conversion has real limits. We&apos;re upfront about what works and what doesn&apos;t, so you can use the right tool for the job.
            </p>
            <div className="space-y-2">
              {LIMITATIONS.map(({ label, supported, note }) => (
                <div key={label} className="flex items-start gap-4 rounded-[10px] bg-surface bd-2 px-5 py-4">
                  <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full grid place-items-center ${supported ? 'bg-emerald-500/15' : 'bg-red-500/15'}`}>
                    {supported
                      ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    }
                  </span>
                  <div>
                    <span className="text-[13.5px] font-semibold text-fg-1">{label}</span>
                    <p className="text-[12.5px] text-fg-2 m-0 mt-0.5 leading-[1.5]">{note}</p>
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
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your document never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'Conversion runs entirely in your browser using mammoth.js and jsPDF',
                  'No file data is sent to any server, logged, or stored anywhere',
                  'We cannot see, access, or retain your document at any point',
                  'Refresh the tab and your file is gone — nothing persists on any server',
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
          <a href="#word-to-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/pdf-to-word', '/merge-pdf', '/compress-pdf', '/image-to-pdf']} />

      </main>
    </>
  );
}
