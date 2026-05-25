import type { Metadata } from 'next';
import { ImageToTextUI } from '@/components/ImageToTextUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Extract Text from Image — Free OCR Online',
  description:
    'Extract text from any image instantly using OCR. Supports JPEG, PNG, WebP, GIF, and BMP. Runs entirely in your browser — no upload, no account, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/image-to-text' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image to Text (OCR)',
      url: 'https://imagepdf.tools/image-to-text',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Free online OCR tool. Extract text from JPEG, PNG, WebP, GIF, and BMP images. Powered by Tesseract.js — runs entirely in your browser with no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to extract text from an image',
      step: [
        { '@type': 'HowToStep', text: 'Drop your image (JPEG, PNG, WebP, GIF, or BMP) onto the tool.' },
        { '@type': 'HowToStep', text: 'Select your image language — English is the default.' },
        { '@type': 'HowToStep', text: 'The OCR engine scans the image and extracts all readable text.' },
        { '@type': 'HowToStep', text: 'Copy the text or save it as a .txt file.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OCR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OCR stands for Optical Character Recognition. It is a technology that reads printed or handwritten text from images and converts it into machine-readable text you can copy, search, and edit.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which image formats are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tool supports JPEG, PNG, WebP, GIF, and BMP image files, up to 50 MB each.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which languages are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tool supports all 99 languages available in Tesseract.js — including English, French, German, Spanish, Arabic, Chinese, Japanese, Korean, Hindi, Russian, and many more. Select your language from the dropdown before extracting.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my image uploaded to a server?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All OCR processing runs locally in your browser using Tesseract.js, a WebAssembly-powered OCR engine. Your image never leaves your device.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the text extraction?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Accuracy depends on image quality. Clear, high-contrast images with standard fonts typically achieve 90–99% accuracy. Blurry, low-resolution, or handwritten text may produce lower accuracy. Each result shows a confidence score.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can it extract text from screenshots?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Screenshots are one of the best inputs for OCR because they typically have clean, sharp text at consistent font sizes and high contrast.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can it read handwritten text?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tesseract.js is optimised for printed text. Neatly written block letters may be partially recognised, but cursive and irregular handwriting will likely produce poor results.',
          },
        },
        {
          '@type': 'Question',
          name: 'What output format is the extracted text?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can copy the text to your clipboard or save it as a plain .txt file.',
          },
        },
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
    desc: 'Upload a JPEG, PNG, WebP, GIF, or BMP file by clicking or dragging onto the tool. Paste from clipboard also works.',
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
    title: 'OCR scans the image',
    desc: "Tesseract.js — a WebAssembly OCR engine — runs entirely in your browser. No upload happens. A progress bar shows extraction status.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Copy or save the text',
    desc: 'The extracted text appears instantly. Copy it to your clipboard or save it as a .txt file. Process multiple images at once.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const TIPS = [
  {
    label: 'Use high-resolution images',
    desc: 'OCR accuracy rises sharply with image resolution. 150 DPI or higher is recommended. Scan documents at 300 DPI for best results.',
  },
  {
    label: 'Ensure good contrast',
    desc: 'Dark text on a light background (or vice versa) gives the engine the clearest signal. Low-contrast images dramatically reduce accuracy.',
  },
  {
    label: 'Avoid heavy compression',
    desc: 'JPEG artefacts and blurriness caused by aggressive compression introduce noise that confuses the OCR engine. Use PNG when possible for text-heavy images.',
  },
  {
    label: 'Select the correct language',
    desc: 'The engine uses language-specific letter frequency models. Selecting the wrong language will cause garbled output even for legible images.',
  },
  {
    label: 'Straighten rotated text',
    desc: 'Text tilted more than a few degrees significantly reduces accuracy. Use the Rotate Image tool to straighten your image before extracting text.',
  },
  {
    label: 'Screenshots work best',
    desc: 'Screenshots of websites, PDFs, or applications typically have perfectly crisp text at consistent size, making them ideal OCR input.',
  },
];

const FAQS = [
  {
    q: 'What is OCR?',
    a: 'OCR stands for Optical Character Recognition. It is a technology that reads printed or handwritten text from images and converts it into machine-readable text you can copy, search, and edit.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'The tool supports JPEG, PNG, WebP, GIF, and BMP image files, up to 50 MB each.',
  },
  {
    q: 'Which languages are supported?',
    a: 'The tool supports all 99 languages in Tesseract.js — including English, French, German, Spanish, Arabic, Chinese (Simplified and Traditional), Japanese, Korean, Hindi, Russian, and many more. Select your language from the dropdown before extracting.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All OCR processing runs locally in your browser using Tesseract.js, a WebAssembly-powered OCR engine. Your image never leaves your device.',
  },
  {
    q: 'How accurate is the text extraction?',
    a: 'Accuracy depends on image quality. Clear, high-contrast images with standard fonts typically achieve 90–99% accuracy. Blurry, low-resolution, or handwritten text may produce lower accuracy. Each result shows a confidence score.',
  },
  {
    q: 'Can it extract text from screenshots?',
    a: 'Yes. Screenshots are one of the best inputs for OCR because they typically have clean, sharp text at consistent font sizes and high contrast.',
  },
  {
    q: 'Can it read handwritten text?',
    a: 'Tesseract.js is optimised for printed text. Neatly written block letters may be partially recognised, but cursive and irregular handwriting will likely produce poor results.',
  },
  {
    q: 'What output format is the extracted text?',
    a: 'You can copy the text to your clipboard or save it as a plain .txt file.',
  },
];

export default function ImageToTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-page text-fg-1" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section id="ocr-tool" className="relative" style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div aria-hidden="true" className="absolute pointer-events-none z-0" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
          <div className={`${C} relative z-[1] text-center`}>
            <span className="hp-eyebrow">Image to Text — OCR</span>
            <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}>
              Extract text.<br /><span className="text-accent">Instantly, privately.</span>
            </h1>
            <p className="text-[16px] font-normal leading-[1.6] text-fg-2 max-w-[46ch] mx-auto m-0 mb-3">
              Pull readable text out of any image using Tesseract OCR — running entirely in your browser. No upload, no account, 100+ languages supported.
            </p>
            <p className="text-[12px] text-fg-3 tracking-wide m-0 mb-5">Free · No upload · 100% private</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['No upload', '100% private', '100+ languages', 'Free forever'].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tool ── */}
        <div className={C}>
          <ImageToTextUI />
        </div>

        {/* ── How it works ── */}
        <section className="bd-t-1" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">How it works</span>
            <h2 className="serif italic text-fg-1 text-center m-0" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
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

        {/* ── What is OCR ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(64px, 9vw, 112px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">What is OCR?</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Turning pixels into editable text
            </h2>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0 mb-4">
              Optical Character Recognition (OCR) is the process of analysing an image and identifying the shapes of letters, numbers, and symbols within it. The engine compares pixel patterns to trained models for each character, then assembles the recognised characters into words, lines, and paragraphs — producing text you can copy, search, and edit.
            </p>
            <p className="text-[15px] leading-[1.75] text-fg-2 m-0">
              This tool uses Tesseract.js, a WebAssembly port of the industry-standard Tesseract OCR engine (originally developed at HP, maintained by Google). It runs entirely inside your browser — your image is never transmitted to any server. The language model data downloads once from a CDN and is cached for subsequent use.
            </p>
          </div>
        </section>

        {/* ── Tips for accuracy ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className={C}>
            <span className="hp-eyebrow text-center">Getting the best results</span>
            <h2 className="serif italic text-fg-1 text-center m-0" style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
              Tips for <em className="text-accent">higher accuracy.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIPS.map(({ label, desc }) => (
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

        {/* ── Common use cases ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className={Cnarrow}>
            <span className="hp-eyebrow">Use cases</span>
            <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              When you need text out of an image
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                'Copying text from a screenshot you cannot select',
                'Extracting captions from photos of handouts or slides',
                'Digitising printed documents, receipts, or invoices',
                'Pulling quotes from scanned book pages',
                'Converting signage or whiteboard photos into text',
                'Reading text embedded in infographics or charts',
                'Extracting subtitles or overlays from video frames',
                'Digitising business cards or contact details',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-[13.5px] text-fg-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Privacy card ── */}
        <section className="bd-t-1" style={{ padding: 'clamp(64px, 9vw, 112px) 0' }}>
          <div className={Cnarrow}>
            <div className="relative rounded-[14px] bg-surface bd-2 p-8">
              <div aria-hidden="true" className="absolute top-[-1px] left-[8%] right-[8%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)' }} />
              <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-3">Privacy by architecture</p>
              <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Your image never leaves your browser.</h2>
              <div className="space-y-3">
                {[
                  'Tesseract.js runs entirely in your browser as WebAssembly — zero server contact',
                  'Your image is never transmitted, logged, or stored anywhere',
                  'Language model files download once and are cached — subsequent use is fully offline',
                  'We cannot see, access, or retain your images at any point',
                  'Close the tab and everything is gone — nothing persists',
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
          <a href="#ocr-tool" className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12.5px] font-medium bd-accent text-accent btn-accent-outline">
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
            <h2 className="serif italic text-fg-1 m-0" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 'clamp(20px, 3vw, 32px)' }}>Frequently asked questions</h2>
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

        <RelatedTools hrefs={['/remove-metadata', '/metadata-editor', '/compress-image', '/resize-image']} />

      </main>
    </>
  );
}
