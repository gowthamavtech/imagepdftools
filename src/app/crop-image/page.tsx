import type { Metadata } from 'next';
import { ImageCropUI } from '@/components/ImageCropUI';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Crop Image Online — Free & Private | ImagePDF.Tools',
  description: 'Crop any image directly in your browser. Select any area, choose aspect ratios like 1:1 or 16:9, and save. No upload, 100% private.',
  alternates: { canonical: 'https://imagepdf.tools/crop-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'ImagePDF.Tools — Image Cropper',
      url: 'https://imagepdf.tools/crop-image',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online image cropping tool with aspect ratio presets. Runs entirely in your browser — no upload required.',
    },
    {
      '@type': 'HowTo',
      name: 'How to crop an image online',
      step: [
        { '@type': 'HowToStep', text: 'Upload your image by dropping it onto the crop tool.' },
        { '@type': 'HowToStep', text: 'Drag the crop handles to select the area you want to keep, or choose a preset aspect ratio.' },
        { '@type': 'HowToStep', text: 'Click Crop and download your cropped image.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I crop to an exact pixel size?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the free crop mode and drag the handles to your desired area. The pixel dimensions of your crop selection are shown in real time.' } },
        { '@type': 'Question', name: 'What aspect ratios are available?', acceptedAnswer: { '@type': 'Answer', text: 'You can crop freely (no ratio lock), or choose from presets: 1:1 (square), 4:3, 16:9 (landscape), 9:16 (portrait/Stories), and others.' } },
        { '@type': 'Question', name: 'Does cropping reduce image quality?', acceptedAnswer: { '@type': 'Answer', text: 'Cropping itself does not degrade quality — it simply removes the pixels outside the selection. The retained pixels are exported at full quality.' } },
        { '@type': 'Question', name: 'Is my image uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All cropping happens in your browser using the Canvas API. Your file never leaves your device.' } },
        { '@type': 'Question', name: 'Can I crop to a custom aspect ratio?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use free crop mode and drag to any proportions you need. The tool shows the current pixel dimensions and aspect ratio in real time as you drag.' } },
        { '@type': 'Question', name: 'What happens to the file size after cropping?', acceptedAnswer: { '@type': 'Answer', text: 'File size decreases roughly in proportion to the area removed. Cropping 50% of an image usually reduces the file size by around 40-60% depending on the content of the cropped region.' } },
        { '@type': 'Question', name: 'Does cropping affect EXIF metadata?', acceptedAnswer: { '@type': 'Answer', text: 'The cropped output is a fresh canvas export, so most EXIF metadata (like GPS coordinates and camera settings) is stripped. Only basic properties like dimensions and colour profile are retained.' } },
        { '@type': 'Question', name: 'Can I undo a crop?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Re-upload the original image and crop again. The tool does not permanently modify your file — it only creates a new cropped version on download. Your original is never touched.' } },
      ],
    },
  ],
};

const STEPS = [
  { n: '01', title: 'Drop your image', desc: 'Drag and drop any JPEG, PNG, or WebP image onto the crop tool, or click to browse from your device.' },
  { n: '02', title: 'Select crop area', desc: 'Drag the handles to define your selection. Choose a preset ratio like 1:1, 16:9, or 4:3, or crop freely to any dimensions.' },
  { n: '03', title: 'Download cropped image', desc: 'Click Crop and your cropped image is ready instantly — same format, full quality, zero upload.' },
];

const FAQS = [
  {
    q: 'Can I crop to an exact pixel size?',
    a: 'Yes. Use the free crop mode and drag the handles to your desired area. The pixel dimensions of your crop selection are shown in real time so you can hit an exact size.',
  },
  {
    q: 'What aspect ratios are available?',
    a: 'You can crop freely (no ratio lock), or choose from presets: 1:1 (square, for Instagram posts), 4:3, 16:9 (landscape video), 9:16 (portrait/Stories), and others.',
  },
  {
    q: 'Does cropping reduce image quality?',
    a: 'Cropping itself does not degrade quality — it simply removes the pixels outside the selection. The retained pixels are exported at full quality.',
  },
  {
    q: 'Can I crop to a custom aspect ratio?',
    a: 'Yes. Use free crop mode and drag to any proportions you need. The tool shows the current pixel dimensions and aspect ratio in real time as you drag.',
  },
  {
    q: 'What happens to the file size after cropping?',
    a: 'File size decreases roughly in proportion to the area removed. Cropping 50% of an image typically reduces the file size by 40–60%, depending on the content of the removed region.',
  },
  {
    q: 'Does cropping affect EXIF metadata?',
    a: 'The cropped output is a fresh canvas export, so most EXIF metadata (GPS coordinates, camera settings) is stripped. Only basic properties like dimensions are retained in the output file.',
  },
  {
    q: 'Can I undo a crop?',
    a: 'Yes — re-upload the original image and crop again. The tool never modifies your original file. It only creates a new cropped version when you download.',
  },
  {
    q: 'Is my image uploaded to a server?',
    a: 'No. All cropping happens in your browser using the Canvas API. Your file never leaves your device.',
  },
];

export default function CropImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @starting-style {
            .crop-h1    { opacity: 0; transform: translateY(10px); }
            .crop-sub   { opacity: 0; transform: translateY(10px); }
            .crop-trust { opacity: 0; }
          }
          .crop-h1 {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1),
                        transform 500ms cubic-bezier(0.23,1,0.32,1);
          }
          .crop-sub {
            transition: opacity 500ms cubic-bezier(0.23,1,0.32,1) 80ms,
                        transform 500ms cubic-bezier(0.23,1,0.32,1) 80ms;
          }
          .crop-trust { transition: opacity 400ms cubic-bezier(0.23,1,0.32,1) 160ms; }
          @keyframes crop-fact-in {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: none; }
          }
          .crop-fact { animation: crop-fact-in 400ms cubic-bezier(0.23,1,0.32,1) both; }
          .crop-fact:nth-child(1) { animation-delay: 240ms; }
          .crop-fact:nth-child(2) { animation-delay: 290ms; }
          .crop-fact:nth-child(3) { animation-delay: 340ms; }
          .crop-fact:nth-child(4) { animation-delay: 390ms; }
        }
      `}</style>

      <main className="flex-1">
        {/* ── Hero ── */}
        <div id="crop-tool" className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 text-center">
          <h1 className="crop-h1 text-3xl sm:text-4xl md:text-[2.75rem] leading-tight tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Crop Image Online
          </h1>
          <p className="crop-sub text-base font-light text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-2">
            Drag to select any area. Choose from preset aspect ratios or crop freely. Everything runs in your browser — nothing is uploaded.
          </p>
          <p className="crop-trust text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-wide">
            Free · No account · No upload
          </p>
        </div>

        {/* ── Tool ── */}
        <div className="max-w-4xl mx-auto px-4">
          <ImageCropUI />
        </div>

        {/* ── Trust strip ── */}
        <div className="border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0C0C1A] mt-8">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5" aria-label="Key guarantees">
              {['Zero bytes sent to any server', 'Non-destructive crop operation', 'Free with no account required', '1:1, 16:9, 4:3 and more presets'].map((fact) => (
                <li key={fact} className="crop-fact flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How it works ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>How it works</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-8">Crop any image in 3 steps</h2>
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/6">
              {STEPS.map((step, i) => (
                <div key={step.n} className={`py-8 sm:py-0 ${i === 0 ? 'sm:pr-10' : i === 1 ? 'sm:px-10' : 'sm:pl-10'}`}>
                  <span className="block text-[11px] font-bold tracking-[0.16em] mb-3" style={{ color: 'oklch(70% 0.158 293)' }} aria-hidden="true">{step.n}</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">{step.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Why crop an image?</h2>
              <p className="mb-3">
                Cropping is one of the most fundamental and frequently needed image editing operations. It removes unwanted parts of an image, changes the composition, adjusts the aspect ratio, and focuses the viewer on what matters. Unlike resizing (which scales the entire image), cropping physically removes pixels outside a selected region.
              </p>
              <p>
                Whether you are preparing a profile picture, optimising a product photo for an online listing, or trimming a screenshot to show only the relevant section, cropping is the fastest way to get the framing right.
              </p>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Common use cases for cropping images</h2>
              <ul className="space-y-3">
                {[
                  ['Social media profile pictures', 'Instagram, LinkedIn, Twitter, and most platforms display profile photos as squares (1:1 ratio). Cropping your photo to 1:1 before uploading ensures the most important part is centred, not awkwardly auto-cropped by the platform.'],
                  ['YouTube thumbnails', 'YouTube thumbnails must be 16:9 ratio (1280×720 recommended). Cropping your image to the exact ratio before uploading avoids automatic cropping that can cut out your subject.'],
                  ['Product photography for e-commerce', 'Platforms like Amazon and Shopify require product images with specific aspect ratios. Cropping your product photos to a square with the product centred gives you full control over how they appear.'],
                  ['Removing distracting backgrounds', "A photo of a document, whiteboard, or artwork often includes unwanted surroundings. Cropping removes the distraction and puts focus on the content."],
                  ['Passport and ID photos', 'Government ID and visa applications specify exact crop ratios (often 35mm x 45mm with the face centred). Cropping to these specs avoids rejection.'],
                  ['Blog post and article images', 'Most CMS platforms display featured images at a fixed aspect ratio. Cropping your image to match that ratio before uploading prevents the system from making poor automatic crops.'],
                  ['Improving photo composition', 'The rule of thirds, leading lines, and negative space are compositional principles that sometimes require cropping the original shot. The crop tool shows a grid overlay to help you align subjects correctly.'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0 mt-2" aria-hidden="true" />
                    <span><strong className="font-semibold text-slate-800 dark:text-slate-200">{label}.</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">How the crop tool works</h2>
              <p>
                After you drop an image, it is rendered on an interactive canvas. You can drag the crop handles to define your selection area — the tool shows the current crop dimensions in real time. Clicking a preset ratio like 16:9 locks the drag handles to that ratio, so you can resize the crop box freely while maintaining the correct proportions. When you click Crop, the selected pixel region is extracted and exported as a new image file — no upload, no server involved.
              </p>
            </div>
          </div>
        </section>

        {/* ── Privacy callout ── */}
        <section className="bg-white dark:bg-[#0C0C1A] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: 'oklch(70% 0.158 293)' }}>Privacy by architecture</p>
            <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50 mb-4">Your files never leave your browser.</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              The crop tool uses the {"browser's"} native Canvas API. Your images are processed entirely on your own hardware — nothing is transmitted, stored, or logged at any point.
            </p>
            <ul className="space-y-2.5">
              {[
                'No server upload — cropping happens on your CPU',
                'No account or sign-up required',
                'Original image is never modified — only the download is cropped',
                'Works offline once the page has loaded',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 shrink-0 mt-px" style={{ color: 'oklch(70% 0.158 293)' }} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-slate-50 dark:bg-[#0F0F1C] border-t border-black/6 dark:border-white/5 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: 'oklch(70% 0.158 293)' }}>FAQ</p>
                <h2 className="text-xl tracking-tight text-slate-900 dark:text-slate-50">Common questions about cropping images</h2>
              </div>
              <a
                href="#crop-tool"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 shrink-0"
                style={{ color: 'oklch(70% 0.158 293)', background: 'oklch(70% 0.158 293 / 0.08)' }}
              >
                Back to crop tool
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <dl className="divide-y divide-slate-100 dark:divide-white/5">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{q}</dt>
                  <dd className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RelatedTools hrefs={['/resize-image', '/flip-image', '/rotate-image', '/compress-image']} />
      </main>
    </>
  );
}
