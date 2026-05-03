import type { Metadata } from 'next';
import { ProtectPdfUI } from '@/components/ProtectPdfUI';

export const metadata: Metadata = {
  title: 'Protect & Unlock PDF — Add or Remove PDF Password Free',
  description:
    'Add password protection to any PDF or remove a password from an existing one — entirely in your browser. No upload, no server.',
  alternates: { canonical: 'https://imagepdf.tools/protect-pdf' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Protect & Unlock PDF',
      url: 'https://imagepdf.tools/protect-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Add password protection to a PDF or remove an existing password — entirely in your browser.',
    },
    {
      '@type': 'HowTo',
      name: 'How to password-protect a PDF online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload your PDF', text: 'Drop your PDF onto the upload area.' },
        { '@type': 'HowToStep', position: 2, name: 'Choose mode', text: 'Select Protect to add a password, or Unlock to remove one.' },
        { '@type': 'HowToStep', position: 3, name: 'Enter password', text: 'Type and confirm your password (Protect) or enter the existing password (Unlock).' },
        { '@type': 'HowToStep', position: 4, name: 'Download', text: 'Click the action button and download your updated PDF.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is my PDF uploaded to a server?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. All encryption and decryption happens locally in your browser using pdf-lib. Your file never leaves your device.' },
        },
        {
          '@type': 'Question',
          name: 'What type of encryption is used?',
          acceptedAnswer: { '@type': 'Answer', text: 'pdf-lib uses AES-128 encryption — the standard PDF encryption method supported by all major PDF viewers including Adobe Acrobat.' },
        },
        {
          '@type': 'Question',
          name: 'Can I unlock any password-protected PDF?',
          acceptedAnswer: { '@type': 'Answer', text: 'You can unlock PDFs that were protected with a known password. This tool cannot crack or brute-force unknown passwords.' },
        },
        {
          '@type': 'Question',
          name: 'Will the unlock work for all encrypted PDFs?',
          acceptedAnswer: { '@type': 'Answer', text: 'This tool supports standard AES-128 encrypted PDFs. Some PDFs with advanced or proprietary encryption may not be supported.' },
        },
      ],
    },
  ],
};

export default function ProtectPdfPage() {
  return (
    <main className="flex-1 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Protect &amp;{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Unlock PDF
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
          Add a password to secure any PDF, or remove an existing one — all processed locally in your browser.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-8">
          {['AES-128 encryption', 'No file upload', 'Works offline', 'Instant download'].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {f}
            </span>
          ))}
        </div>
      </div>

      <ProtectPdfUI />

      <div className="max-w-2xl mx-auto px-4 mt-16 space-y-10 text-left">
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">How it works</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            When you protect a PDF, the tool encrypts the file using AES-128 — the industry-standard PDF encryption method. The password you set becomes the user password, required to open the file in any PDF viewer. When unlocking, the tool decrypts the PDF in memory and saves a clean, unprotected copy. Nothing is sent to a server.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I unlock any password-protected PDF?', a: 'You can unlock any PDF for which you know the password. The tool decrypts using the password you provide — it cannot guess or crack unknown passwords.' },
              { q: 'Will the protected PDF open in Adobe Acrobat?', a: 'Yes. AES-128 encrypted PDFs are fully compatible with Adobe Acrobat, macOS Preview, iOS Files, and all other standard PDF viewers.' },
              { q: 'Is this different from PDF signing?', a: 'Yes. Password protection controls who can open or edit a file. PDF signing (digital signatures) is a separate feature that verifies authorship. This tool does password protection only.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 dark:border-slate-700 pb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">{q}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
