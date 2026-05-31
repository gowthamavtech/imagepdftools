import type { Metadata } from 'next';
import { ProtectPdfUI } from '@/components/ProtectPdfUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Unlock PDF — Remove PDF Password Free Online',
  description:
    'Remove the password from any PDF instantly. Enter the current password and download a clean, unlocked copy — runs entirely in your browser, no upload required.',
  alternates: { canonical: 'https://imagepdf.tools/unlock-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Unlock PDF',
      url: 'https://imagepdf.tools/unlock-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Remove password protection from a PDF entirely in your browser. Enter the current password and download a clean, unlocked copy.',
    },
    {
      '@type': 'HowTo',
      name: 'How to unlock a password-protected PDF',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your password-protected PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Enter the password', text: 'Type the current password for the PDF.' },
        { '@type': 'HowToStep', position: 3, name: 'Unlock', text: 'Click Unlock PDF. The decryption runs in your browser and produces a clean, unprotected copy.' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Download the unlocked PDF — no password required to open it.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I unlock a PDF without knowing the password?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tool decrypts using the password you provide. It cannot guess or brute-force unknown passwords.' } },
        { '@type': 'Question', name: 'Is my PDF uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All decryption happens locally in your browser using pdf-lib. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Will the unlocked PDF work in any viewer?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The output is a standard, unencrypted PDF compatible with Adobe Acrobat, macOS Preview, and all other PDF viewers.' } },
      ],
    },
  ],
};

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';
const Cnarrow = 'max-w-[780px] mx-auto px-4 sm:px-8';

const STEPS = [
  {
    n: '01',
    title: 'Upload your PDF',
    desc: 'Drop your password-protected PDF onto the upload area or click Browse PDF to select it.',
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
    title: 'Enter the password',
    desc: 'Type the current password for the PDF. The tool uses it to decrypt the file — only you ever see it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Download unlocked PDF',
    desc: 'Click Unlock PDF. Decryption runs instantly in your browser and the clean copy is ready to download.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: 'Can I unlock a PDF without knowing the password?',
    a: 'No. This tool decrypts using the password you provide. It cannot guess, crack, or brute-force unknown passwords — you must know the current password.',
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. All decryption happens locally in your browser using pdf-lib. Your file and your password never leave your device.',
  },
  {
    q: 'Will the unlocked PDF work in any viewer?',
    a: 'Yes. The output is a standard, unencrypted PDF fully compatible with Adobe Acrobat, macOS Preview, iOS Files, and all other PDF viewers.',
  },
  {
    q: 'What encryption types does this support?',
    a: 'This tool supports the standard AES-128 PDF encryption used by most password-protection tools. PDFs with advanced or proprietary encryption may not be supported.',
  },
  {
    q: 'Does unlocking remove all restrictions?',
    a: 'Unlocking removes the open password, making the file freely openable. Some PDFs also have separate owner/permissions passwords controlling editing or printing — this tool targets the user (open) password.',
  },
  {
    q: 'Can I re-protect the PDF after unlocking?',
    a: 'Yes. After downloading the unlocked copy, use the Protect PDF tool to add a new password with updated settings.',
  },
];

export default function UnlockPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="unlock-pdf-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Unlock PDF</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Remove the password.<br /><span className="text-accent">Keep the content.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Decrypt any password-protected PDF in seconds — enter the current password and download a clean, unlocked copy. Nothing is uploaded.
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
        <div className={C} style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <ProtectPdfUI defaultMode="unlock" />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0 mb-10" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Three steps. <em className="text-accent">Password gone.</em>
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

        {/* ── Under the hood ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              How PDF decryption works
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              PDF password protection encrypts the file contents so they cannot be read without the correct key. When you enter the password, this tool uses pdf-lib to derive the decryption key, decrypt every byte of the file in your browser, and produce a clean copy with no encryption headers. The result is a standard PDF that opens freely in any viewer. Nothing is transmitted to a server at any point.
            </p>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your PDF and password never leave your browser.</h2>
              <div className="space-y-3">
                {[
                  'All decryption runs locally in your browser using pdf-lib',
                  'No file data is transmitted to any server, logged, or stored',
                  'The password you enter is used only for local decryption and never sent anywhere',
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

        {/* ── Back to tool nudge ── */}
        <div className="text-center" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <a href="#unlock-pdf-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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

        <RelatedTools hrefs={['/protect-pdf', '/compress-pdf', '/merge-pdf', '/remove-metadata']} />

      </main>
    </>
  );
}
