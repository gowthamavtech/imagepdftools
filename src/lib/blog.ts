export type Category = 'privacy' | 'performance' | 'productivity' | 'technical';

export const CATEGORY_META: Record<Category, { label: string; color: string; bg: string; border: string }> = {
  privacy:     { label: 'Privacy & Security', color: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-100 dark:bg-violet-900/40', border: 'border-violet-200 dark:border-violet-700' },
  performance: { label: 'Performance & SEO',  color: 'text-blue-700 dark:text-blue-300',    bg: 'bg-blue-100 dark:bg-blue-900/40',    border: 'border-blue-200 dark:border-blue-700' },
  productivity:{ label: 'Productivity',        color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-200 dark:border-emerald-700' },
  technical:   { label: 'Technical',           color: 'text-amber-700 dark:text-amber-300',  bg: 'bg-amber-100 dark:bg-amber-900/40',  border: 'border-amber-200 dark:border-amber-700' },
};

export type Block =
  | { type: 'p'; html: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string; kind?: 'tip' | 'warning' | 'info' }
  | { type: 'code'; lang: string; text: string }
  | { type: 'ad' };

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  readingTime: number;
  relatedTool: { label: string; href: string };
  body: Block[];
}

const code = String.raw;

export const POSTS: Post[] = [
  // ─── PRIVACY PILLAR ──────────────────────────────────────────────────────────
  {
    slug: 'online-file-converters-security-risk',
    title: 'Why Online File Converters Are a Security Risk',
    description: "Most free online file converters upload your files to remote servers. Here's what actually happens to your data — and how to stay safe.",
    date: '2026-03-15',
    category: 'privacy',
    readingTime: 5,
    relatedTool: { label: 'Remove Image Metadata', href: '/remove-metadata' },
    body: [
      { type: 'p', html: 'You need to compress a batch of images or convert a PDF. You find a free online tool, drag your files in, and download the result in seconds. Simple — but in those few seconds, your file has been uploaded to a server in an unknown jurisdiction, processed by code you can\'t inspect, and stored in a temp directory you have no control over.' },
      { type: 'p', html: 'For holiday photos that\'s a minor inconvenience. For a bank statement, medical record, or signed contract, it\'s a serious privacy risk that most people never consciously evaluate.' },
      { type: 'ad' },
      { type: 'h2', text: 'What "Online Processing" Really Means' },
      { type: 'p', html: 'When a web app converts your file, the computation has to happen <em>somewhere</em>. For the vast majority of tools, that somewhere is a remote server — your browser uploads the raw file over HTTPS, the server does the work, and returns the result. This is <strong>server-side processing</strong>, and you lose custody of your file the moment you press upload.' },
      { type: 'p', html: 'The terms of service you skipped almost certainly grant the platform a broad licence to store, analyse, and use uploaded content. Whether they exercise that right is irrelevant — the legal and technical capability exists.' },
      { type: 'h2', text: 'The Real Risks' },
      { type: 'ul', items: [
        '<strong>Data breaches:</strong> If the provider\'s servers are compromised, every file you uploaded is exposed. Breach databases routinely contain documents from "free" services.',
        '<strong>Retention beyond stated policy:</strong> Many tools keep uploaded files for 24–72 hours for debugging. Some have no deletion mechanism at all, and verifying deletion is impossible.',
        '<strong>Metadata leakage:</strong> JPEG and PNG files embed EXIF data — GPS coordinates, device model, timestamps — that gets transmitted alongside your image without you realising.',
        '<strong>Content monetisation:</strong> Ad-funded tools have financial incentives to analyse content. Models trained on user-uploaded contracts are not a hypothetical.',
      ]},
      { type: 'callout', kind: 'warning', text: 'Verify any "processed in your browser" claim by opening DevTools → Network tab. Drop a file into the tool and watch for outbound requests. If you see a large upload request during processing, your file just left your device.' },
      { type: 'h2', text: 'Which Files Are Most at Risk?' },
      { type: 'ol', items: [
        'Financial documents — bank statements, tax returns, pay slips',
        'Identity documents — passports, driving licences, utility bills',
        'Legal documents — contracts, NDAs, court filings',
        'Medical records — prescriptions, lab results, referral letters',
        'Business materials — pitch decks, financial models, HR records',
      ]},
      { type: 'h2', text: 'Client-Side Processing: The Safe Alternative' },
      { type: 'p', html: 'Modern browsers expose powerful APIs — <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">Canvas</code>, <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">WebAssembly</code>, <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">OffscreenCanvas</code>, <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">FileReader</code> — that allow complex file manipulation to run entirely inside the browser tab. No upload required.' },
      { type: 'code', lang: 'javascript', text: code`// Client-side compression — the file never leaves your browser
const file = inputElement.files[0];
const bitmap = await createImageBitmap(file);

const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
canvas.getContext('2d').drawImage(bitmap, 0, 0);

// Compress in-browser, get a local Blob
const compressed = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });

// Create a local download link — still never hits a server
const url = URL.createObjectURL(compressed);
const a = Object.assign(document.createElement('a'), { href: url, download: 'compressed.jpg' });
a.click();` },
      { type: 'h2', text: 'How to Choose a Safe Tool' },
      { type: 'ul', items: [
        'Verify "processed in your browser" claims with DevTools → Network tab',
        'Read the privacy policy for the words "retain" and "delete"',
        'Prefer open-source tools where the code is publicly auditable',
        'For highly sensitive files, use a local desktop app (LibreOffice, GIMP, Ghostscript)',
      ]},
      { type: 'p', html: 'ImagePDF.Tools processes everything locally. Open DevTools → Network tab, drop an image, and confirm: zero file upload requests. <a href="/remove-metadata" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try the metadata remover</a> to see exactly what information your images are currently exposing.' },
    ],
  },
  {
    slug: 'safely-compress-sensitive-pdf-documents',
    title: 'How to Safely Compress Sensitive PDF Documents',
    description: "Bank statements, contracts, and medical records should never be uploaded to a third-party server. Here's how to compress them safely without leaving your device.",
    date: '2026-03-20',
    category: 'privacy',
    readingTime: 4,
    relatedTool: { label: 'Compress PDF', href: '/compress-pdf' },
    body: [
      { type: 'p', html: 'PDFs are the universal container for sensitive documents — tax returns, employment contracts, medical reports. When those files are large, the temptation is to drag them into the first online compressor that appears in search results. This is a risk most people don\'t consciously take.' },
      { type: 'p', html: 'PDF is a complex format. A single file can contain embedded images, fonts, form data, digital signatures, and metadata layers. When you upload one to a third-party compressor, you\'re handing over all of that — including content that\'s not visible on any printed page.' },
      { type: 'ad' },
      { type: 'h2', text: 'What Actually Happens When You Upload to a Server-Side Tool' },
      { type: 'ul', items: [
        'The PDF is transmitted in full over HTTPS to a remote server',
        'The server decompresses and recompresses embedded images (typically to JPEG)',
        'Most tools log the filename, file size, and your IP address for every upload',
        'The file sits in a temp directory for 1–24 hours after processing',
        'Embedded metadata — including author name, modification history, and software version — is often preserved, not stripped',
      ]},
      { type: 'callout', kind: 'info', text: 'PDF/A documents (used for legal archiving) embed additional metadata including modification timestamps and creator identity. Most online compressors preserve this rather than strip it.' },
      { type: 'h2', text: 'How Browser-Based PDF Compression Works' },
      { type: 'p', html: 'Compressing a PDF in-browser uses WebAssembly builds of tools like Ghostscript. The WASM binary is downloaded once (and cached), then executes locally inside your browser tab. The PDF content never crosses the network.' },
      { type: 'code', lang: 'javascript', text: code`// Simplified: Ghostscript WASM running entirely in-browser
import { createGhostscript } from 'ghostscript-wasm';

const gs = await createGhostscript();
const pdfBytes = new Uint8Array(await file.arrayBuffer()); // stays in memory

gs.FS.writeFile('/input.pdf', pdfBytes);
gs.callMain([
  '-sDEVICE=pdfwrite',
  '-dPDFSETTINGS=/ebook',   // 150 DPI — good quality, significant size reduction
  '-o', '/output.pdf',
  '/input.pdf',
]);

const result = gs.FS.readFile('/output.pdf');
// result is a Uint8Array — download it directly, nothing sent to a server` },
      { type: 'h2', text: 'Practical Guide: Compressing Sensitive PDFs Safely' },
      { type: 'ol', items: [
        '<strong>Choose a client-side tool</strong> — verify with DevTools → Network tab that no upload occurs during processing.',
        '<strong>Pick the right compression level</strong> — /screen (72 DPI) for email; /ebook (150 DPI) for general use; /printer (300 DPI) for printing.',
        '<strong>Verify the output</strong> — open the compressed file and confirm all text is legible and form fields are intact.',
        '<strong>Clear your downloads folder</strong> on shared machines — temporary files can persist even after you close the tab.',
      ]},
      { type: 'h2', text: 'Desktop Alternatives for Maximum Security' },
      { type: 'ul', items: [
        '<strong>Ghostscript</strong> — free, open-source, industry-standard, runs entirely offline',
        '<strong>LibreOffice Draw</strong> — can open and re-export PDFs with image compression settings',
        '<strong>qpdf</strong> — command-line tool that linearises, strips metadata, and removes restrictions',
        '<strong>Adobe Acrobat</strong> (paid) — the reference tool with clear and auditable data handling policies',
      ]},
      { type: 'p', html: 'For everyday documents that aren\'t highly sensitive, a good browser-based tool is fast, convenient, and safe. <a href="/compress-pdf" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try our PDF compressor</a> — everything stays in your browser tab.' },
    ],
  },
  {
    slug: 'what-is-image-metadata-exif-explained',
    title: 'What Is Image Metadata? (And Why You Should Remove It Before Sharing)',
    description: "Every photo you take contains hidden data: your GPS location, camera model, exact timestamp, and more. Here's what EXIF metadata is and how to strip it.",
    date: '2026-04-01',
    category: 'privacy',
    readingTime: 5,
    relatedTool: { label: 'Remove Metadata', href: '/remove-metadata' },
    body: [
      { type: 'p', html: 'When you take a photo on a smartphone, you capture more than the image. Embedded invisibly in the file is a structured block of data — called EXIF metadata — that can reveal where you were, when you were there, and what device you used. Most people share images publicly without ever knowing this data exists.' },
      { type: 'ad' },
      { type: 'h2', text: 'What Is EXIF Data?' },
      { type: 'p', html: 'EXIF stands for <em>Exchangeable Image File Format</em>. It\'s a standard for storing metadata within JPEG, TIFF, and some PNG files, defined in 1995 and now universal across every camera manufacturer and smartphone platform.' },
      { type: 'h3', text: 'Common EXIF Fields' },
      { type: 'ul', items: [
        '<strong>GPS coordinates</strong> — latitude and longitude accurate to within a few metres',
        '<strong>Timestamp</strong> — exact date and time, sometimes including timezone offset',
        '<strong>Camera make and model</strong> — e.g., "Apple iPhone 15 Pro" or "Sony ILCE-7M4"',
        '<strong>Lens information</strong> — focal length, aperture, shutter speed, ISO',
        '<strong>Software version</strong> — firmware or editing app used',
        '<strong>Copyright and artist</strong> — fields that may contain your name or studio',
        '<strong>Thumbnail</strong> — an embedded preview that may differ from the edited main image',
      ]},
      { type: 'callout', kind: 'warning', text: "The GPS tag doesn't just capture public locations. Photograph a letter on your kitchen table and the EXIF data records your home address to within five metres." },
      { type: 'h2', text: 'Real-World Incidents Caused by EXIF Data' },
      { type: 'ul', items: [
        'In 2012, John McAfee\'s location while evading police was revealed by GPS coordinates embedded in a journalist\'s photo.',
        'Journalists sharing photos of sensitive documents have repeatedly exposed their physical location through EXIF data.',
        'Online sellers photographing items at home inadvertently share their address with every image listing.',
        'Whistleblowers who photograph internal documents without stripping metadata have been identified through device fingerprinting.',
      ]},
      { type: 'h2', text: 'Who Can Read EXIF Data?' },
      { type: 'p', html: 'Most social platforms (Instagram, Facebook, X) strip EXIF server-side before public display. Many do not, including: WhatsApp direct messages, Telegram file sends, Discord uploads, email attachments, and any image hosted directly on a web server. Even when platforms strip public-facing EXIF, they often retain it internally.' },
      { type: 'h2', text: 'How to View Your Image\'s EXIF Data' },
      { type: 'code', lang: 'javascript', text: code`// Read EXIF data in-browser without uploading anything
import { parse } from 'exifr';

const file = document.querySelector('input[type=file]').files[0];
const exif = await parse(file, { gps: true, all: true });

console.log(exif);
// {
//   Make: 'Apple',
//   Model: 'iPhone 15 Pro',
//   latitude: 51.5074,
//   longitude: -0.1278,
//   DateTimeOriginal: 2026-04-01T09:23:11.000Z,
//   Software: '17.4.1',
//   ...
// }` },
      { type: 'h2', text: 'How to Strip EXIF Data' },
      { type: 'ol', items: [
        '<strong>Browser-based tool</strong> — fastest for occasional use; no upload required if client-side',
        '<strong>ImageMagick CLI</strong> — <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">convert input.jpg -strip output.jpg</code>',
        '<strong>ExifTool</strong> — the definitive metadata editor: <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">exiftool -all= input.jpg</code>',
        '<strong>macOS Preview</strong> — Export → uncheck "Include Metadata"',
      ]},
      { type: 'p', html: 'Our <a href="/remove-metadata" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">metadata removal tool</a> strips all EXIF, IPTC, and XMP data from JPEG and PNG files entirely in your browser — photos never leave your device.' },
    ],
  },

  // ─── PERFORMANCE PILLAR ──────────────────────────────────────────────────────
  {
    slug: 'webp-vs-avif-image-format-seo-2026',
    title: 'WebP vs. AVIF: Which Image Format Is Best for SEO in 2026?',
    description: 'AVIF offers better compression than WebP, but encoder speed, CDN support, and browser compatibility all matter. The full 2026 comparison.',
    date: '2026-04-05',
    category: 'performance',
    readingTime: 6,
    relatedTool: { label: 'Convert Image to WebP', href: '/convert-image-to-webp' },
    body: [
      { type: 'p', html: 'The format war between WebP and AVIF has been running since AVIF landed in Chrome 85 in 2020. Six years later, both are widely supported — but the choice is more nuanced than "AVIF is newer, therefore better." For SEO specifically, the metric that matters is <strong>LCP (Largest Contentful Paint)</strong> — how quickly the largest image on the page becomes visible. That\'s determined by file size, decode speed, and CDN support, not just compression ratio.' },
      { type: 'ad' },
      { type: 'h2', text: 'Compression Ratio: AVIF Wins — But Not Always' },
      { type: 'p', html: 'At equivalent visual quality (measured by SSIM), AVIF typically achieves 20–40% smaller files than WebP for photographic content. This advantage narrows for:' },
      { type: 'ul', items: [
        'Images smaller than 200×200px — AVIF container overhead reduces the advantage',
        'Line art, screenshots, and text-heavy images — where WebP or PNG is often more efficient',
        'Images already compressed to JPEG at quality 60 or below — further AVIF compression adds artefacts without meaningful savings',
      ]},
      { type: 'h2', text: 'Browser Support in 2026' },
      { type: 'ul', items: [
        '<strong>WebP:</strong> 97.8% global support — effectively universal, including all modern browsers and Safari 14+',
        '<strong>AVIF:</strong> 93.2% — Chrome, Firefox, Safari 16+, Edge 121+. Missing: iOS 15 Safari and some older Edge versions',
      ]},
      { type: 'callout', kind: 'tip', text: 'Serve AVIF with a WebP fallback via the HTML <picture> element. You get AVIF compression where supported, with zero broken-image risk on older browsers.' },
      { type: 'code', lang: 'html', text: code`<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero image" width="1200" height="630" loading="lazy">
</picture>` },
      { type: 'h2', text: 'Encoding Speed: WebP Wins Significantly' },
      { type: 'ul', items: [
        '<strong>WebP (libwebp):</strong> 50–200ms for a 2MP image at quality 80',
        '<strong>AVIF (libaom):</strong> 2,000–15,000ms for the same image at equivalent quality',
        '<strong>AVIF (SVT-AV1):</strong> 300–800ms — the best speed/quality trade-off for production pipelines',
      ]},
      { type: 'p', html: 'For build-time optimisation (static sites, CI pipelines), AVIF is viable with aggressive caching. For runtime processing (user uploads, dynamic resizing), WebP is far more practical.' },
      { type: 'h2', text: 'The SEO Verdict for 2026' },
      { type: 'p', html: 'For most production websites: <strong>serve both</strong> using the <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element. AVIF as primary for photographic content, WebP as the fallback.' },
      { type: 'p', html: 'If you can only pick one: use WebP. The 6.8% of users without AVIF support is not worth the broken-image risk, and WebP compression is good enough to pass Core Web Vitals when sized correctly. <a href="/convert-image-to-webp" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Start converting your images to WebP</a> today.' },
    ],
  },
  {
    slug: 'core-web-vitals-image-optimization',
    title: 'How to Pass Core Web Vitals with Optimized Images',
    description: 'Images are the single biggest contributor to LCP failures. A technical guide to diagnosing and fixing image-related Core Web Vitals issues.',
    date: '2026-04-10',
    category: 'performance',
    readingTime: 7,
    relatedTool: { label: 'Compress Image', href: '/' },
    body: [
      { type: 'p', html: 'LCP (Largest Contentful Paint) is the most impactful Core Web Vitals signal, and images are the LCP element on roughly 70% of pages. Fixing image delivery is the single highest-leverage change most websites can make for both SEO and user experience.' },
      { type: 'ad' },
      { type: 'h2', text: 'Step 1: Identify Your LCP Image' },
      { type: 'code', lang: 'javascript', text: code`// Find the LCP element in the browser console
new PerformanceObserver((list) => {
  const last = list.getEntries().at(-1);
  console.log('LCP element:', last.element);
  console.log('LCP time:', last.startTime.toFixed(0), 'ms');
}).observe({ type: 'largest-contentful-paint', buffered: true });` },
      { type: 'h2', text: 'Step 2: Diagnose the Bottleneck' },
      { type: 'p', html: 'With the LCP image identified, open Chrome DevTools → Network → filter by "Img" → click the image:' },
      { type: 'ul', items: [
        '<strong>Size over 100KB on mobile</strong> — compress it, right-size it, or switch to WebP',
        '<strong>Format is JPEG or PNG</strong> — almost always compressible further without visible quality loss',
        '<strong>"Queued at" is past 500ms</strong> — the image is being discovered too late in the waterfall',
        '<strong>Initiator is a CSS file</strong> — CSS <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">background-image</code> is invisible to the preload scanner',
      ]},
      { type: 'callout', kind: 'tip', text: 'CSS background-image is invisible to the browser preload scanner. Move hero images to <img> tags with fetchpriority="high" for a guaranteed LCP improvement on most pages.' },
      { type: 'h2', text: 'Step 3: Right-Size the Image' },
      { type: 'p', html: 'Serving a 3000×2000px image that renders at 390×260px wastes 99% of the bytes downloaded. Calculate the correct source size:' },
      { type: 'code', lang: 'javascript', text: code`// The right source image width = render width × device pixel ratio
const renderWidth = element.getBoundingClientRect().width;
const targetWidth = Math.round(renderWidth * window.devicePixelRatio);
// 390px container on 2× screen → 780px source image

// Use srcset to serve the right size automatically:
// <img srcset="img-780w.webp 780w, img-1560w.webp 1560w" sizes="100vw">` },
      { type: 'h2', text: 'Step 4: Compress to the Right Quality' },
      { type: 'ul', items: [
        '<strong>JPEG quality 75–80</strong> is visually lossless at screen resolution for most photos',
        '<strong>WebP quality 75</strong> ≈ JPEG quality 85 at 25% smaller file size',
        '<strong>PNG</strong> for hard-edge content only (screenshots, logos, line art)',
        '<strong>Never re-encode</strong> an already-compressed JPEG — every cycle adds generation loss',
      ]},
      { type: 'h2', text: 'Step 5: Preload the LCP Image' },
      { type: 'code', lang: 'html', text: code`<!-- In <head> — the browser fetches this immediately on parse -->
<link rel="preload" as="image"
  href="/images/hero.webp"
  imagesrcset="/images/hero-780w.webp 780w, /images/hero-1560w.webp 1560w"
  imagesizes="100vw"
  fetchpriority="high"
>

<!-- On the <img> itself -->
<img src="/images/hero.webp" fetchpriority="high" decoding="async"
     width="1560" height="1040" alt="Hero">` },
      { type: 'p', html: 'After making changes, measure with <strong>PageSpeed Insights</strong> (real-user Chrome data) rather than only Lighthouse (simulated). Moving LCP from 3.2s to 2.1s is a measurable ranking improvement. Start by <a href="/" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">compressing your images</a> with the right quality settings.' },
    ],
  },
  {
    slug: 'ultimate-guide-pdf-compression-levels',
    title: 'The Ultimate Guide to PDF Compression Levels',
    description: 'Screen, eBook, Printer, Prepress — what do these PDF compression presets actually mean? A technical breakdown of when to use each.',
    date: '2026-04-12',
    category: 'performance',
    readingTime: 5,
    relatedTool: { label: 'Compress PDF', href: '/compress-pdf' },
    body: [
      { type: 'p', html: 'If you\'ve used Ghostscript, Adobe Acrobat, or any serious PDF compressor, you\'ve seen the presets: <em>Screen</em>, <em>eBook</em>, <em>Printer</em>, <em>Prepress</em>. These originate from Ghostscript\'s <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">-dPDFSETTINGS</code> flag and have been adopted by virtually every PDF tool. Most people pick one and hope for the best. Here\'s what they actually do.' },
      { type: 'ad' },
      { type: 'h2', text: 'What PDF Compression Actually Compresses' },
      { type: 'p', html: 'Most PDF file size comes from embedded images — rasterised photos, scanned pages, graphics. PDF compression works by:' },
      { type: 'ol', items: [
        'Downsampling embedded images to a lower DPI target',
        'Recompressing image data as JPEG at a lower quality',
        'Flate-compressing text streams and vector data (lossless)',
        'Removing embedded font subsets that aren\'t needed',
        'Stripping metadata, form XObjects, and container overhead',
      ]},
      { type: 'h2', text: 'The Five Presets, Explained' },
      { type: 'h3', text: '/screen — Maximum Compression' },
      { type: 'p', html: '<strong>Target: 72 DPI, JPEG ~35 quality.</strong> Aggressively downsizes all images. Use when: on-screen reading only, or when file size is the only constraint. Not suitable for printing — text may look pixelated and photos show visible artefacts at 1:1 zoom.' },
      { type: 'h3', text: '/ebook — The Sweet Spot' },
      { type: 'p', html: '<strong>Target: 150 DPI, JPEG ~60 quality.</strong> The recommended setting for most use cases — email, web upload, internal sharing. Text is crisp on screen and prints acceptably on standard office printers at normal reading distance.' },
      { type: 'h3', text: '/printer — High Quality' },
      { type: 'p', html: '<strong>Target: 300 DPI, JPEG ~80 quality.</strong> For documents that will be professionally printed but don\'t require colour accuracy. Photos look sharp; line art is clean. File sizes are 2–5× larger than /ebook.' },
      { type: 'h3', text: '/prepress — Publication Quality' },
      { type: 'p', html: '<strong>Target: 300 DPI with lossless compression where possible.</strong> Colour profiles are embedded and preserved. For sending to a print shop or publisher. Largest file sizes.' },
      { type: 'callout', kind: 'tip', text: 'For scanned PDFs (images of pages), /ebook gives a 60–80% size reduction with no visible quality loss at normal reading zoom. For PDFs from Word or InDesign with vector content, the reduction is smaller — typically 20–40%.' },
      { type: 'h2', text: 'Choosing the Right Level' },
      { type: 'ul', items: [
        '<strong>Email attachment (under 5 MB):</strong> /screen or /ebook',
        '<strong>Website download:</strong> /ebook',
        '<strong>Office printing:</strong> /printer',
        '<strong>Commercial printing / publisher submission:</strong> /prepress',
        '<strong>Archive with unknown future use:</strong> /printer or /default',
      ]},
      { type: 'code', lang: 'bash', text: code`# Ghostscript — free, cross-platform
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=compressed.pdf input.pdf` },
      { type: 'p', html: '<a href="/compress-pdf" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try our PDF compressor</a> with adjustable quality settings, processed entirely in your browser.' },
    ],
  },

  // ─── PRODUCTIVITY PILLAR ─────────────────────────────────────────────────────
  {
    slug: 'convert-jpg-to-pdf-without-losing-quality',
    title: 'How to Convert JPG to PDF Without Losing Quality',
    description: "Converting images to PDF often introduces double compression and quality loss. Here's how to do it right — preserving every pixel.",
    date: '2026-04-15',
    category: 'productivity',
    readingTime: 4,
    relatedTool: { label: 'Image to PDF', href: '/image-to-pdf' },
    body: [
      { type: 'p', html: 'The typical JPG-to-PDF converter takes your image, runs it through JPEG compression <em>again</em>, and embeds the result. The output looks fine at a glance but zooms soft, and you\'ve permanently degraded your source. There\'s a better way.' },
      { type: 'ad' },
      { type: 'h2', text: 'Why Re-Encoding a JPEG Destroys Quality' },
      { type: 'p', html: 'JPEG uses lossy compression. Every time you re-encode, you add another generation of artefacts — even at quality 95. A JPEG that\'s been through three converters will be noticeably softer than the original, with visible blocking artefacts around high-contrast edges.' },
      { type: 'p', html: 'The correct approach is to embed the JPEG bytes directly into the PDF stream <em>without re-encoding</em>. The PDF format natively supports JPEG-compressed image streams — you can store the original bytes as-is, meaning zero quality loss.' },
      { type: 'code', lang: 'javascript', text: code`// Embed JPEG bytes directly into PDF — no recompression
import { PDFDocument } from 'pdf-lib';

const pdfDoc = await PDFDocument.create();
const jpgBytes = new Uint8Array(await file.arrayBuffer()); // original bytes

// embedJpg stores the original JPEG stream — no quality loss
const jpgImage = await pdfDoc.embedJpg(jpgBytes);

// Page sized exactly to the image (72 DPI = 1px per point in PDF units)
const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
page.drawImage(jpgImage, { x: 0, y: 0, width: jpgImage.width, height: jpgImage.height });

const pdfBytes = await pdfDoc.save();` },
      { type: 'h2', text: 'Setting the Right Page Size for Print' },
      { type: 'p', html: 'PDF page sizes are in points (1 point = 1/72 inch). For a photo intended to print at A4 at 300 DPI, the source image needs to be 2480×3508 pixels. Scaling a smaller image up in the PDF adds interpolated pixels — it won\'t be sharp.' },
      { type: 'ul', items: [
        '<strong>Letter (8.5×11″) at 300 DPI:</strong> 2550×3300px source',
        '<strong>A4 (210×297mm) at 300 DPI:</strong> 2480×3508px source',
        '<strong>A5 (148×210mm) at 300 DPI:</strong> 1748×2480px source',
        '<strong>Screen only:</strong> any size — DPI doesn\'t affect on-screen display',
      ]},
      { type: 'callout', kind: 'tip', text: 'For multi-page PDFs (scanned documents, photo books), embed each JPEG image using the same lossless approach. The file size will be similar to the sum of the original images.' },
      { type: 'h2', text: 'PNG and WebP Sources' },
      { type: 'p', html: 'PNG files are lossless — any conversion to JPEG is the first lossy step, so choose quality carefully. WebP is not a native PDF image format and must be converted to JPEG or PNG first. Our <a href="/image-to-pdf" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Image to PDF converter</a> embeds JPEG data directly without re-encoding.' },
    ],
  },
  {
    slug: 'shrink-pdf-for-email-attachments',
    title: '5 Ways to Shrink a PDF for Email Attachments',
    description: 'Email attachment limits are typically 10–25 MB. Five techniques — from quick browser tools to CLI commands — for getting PDFs under the limit.',
    date: '2026-04-17',
    category: 'productivity',
    readingTime: 4,
    relatedTool: { label: 'Compress PDF', href: '/compress-pdf' },
    body: [
      { type: 'p', html: 'Email attachments bounce when they\'re too large: Gmail caps at 25 MB, Outlook at 20 MB, many corporate servers at 10 MB. A high-resolution PDF from a designer or scanner can easily exceed these limits. Here are five techniques, from quickest to most thorough.' },
      { type: 'ad' },
      { type: 'h2', text: '1. Use a Browser-Based PDF Compressor' },
      { type: 'p', html: 'The fastest option for a one-off file. A client-side tool requires no software install and no upload. For most scanned PDFs, you\'ll get a 50–80% size reduction in under 10 seconds. See our <a href="/blog/online-file-converters-security-risk" class="text-violet-600 dark:text-violet-400 hover:underline">guide to choosing a safe file tool</a> if you\'re sending sensitive documents.' },
      { type: 'h2', text: '2. Re-export from the Source Application' },
      { type: 'p', html: 'If you have the original file, re-exporting from the source is the cleanest approach — you\'re compressing from original data, not recompressing an already-compressed file.' },
      { type: 'ul', items: [
        '<strong>Word / PowerPoint:</strong> File → Save As → PDF → "Minimum size (publishing online)"',
        '<strong>Google Docs:</strong> File → Download → PDF (Google applies automatic optimisation)',
        '<strong>InDesign:</strong> Export PDF → Compression → Downsample images to 150 DPI',
        '<strong>macOS:</strong> Print → PDF → Quartz Filter → "Reduce File Size"',
      ]},
      { type: 'h2', text: '3. Ghostscript (Free, Maximum Control)' },
      { type: 'code', lang: 'bash', text: code`# /ebook — 150 DPI, good quality, typical 60-70% reduction
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=compressed.pdf input.pdf

# /screen — 72 DPI, maximum compression for email
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 \
   -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=compressed.pdf input.pdf` },
      { type: 'h2', text: '4. Remove Hidden Elements' },
      { type: 'p', html: 'Large PDFs often contain hidden layers, attached files, form field data, or embedded colour profiles that add size without visible content:' },
      { type: 'code', lang: 'bash', text: code`# qpdf — strip restrictions, flatten annotations, linearise
qpdf --linearize --remove-restrictions input.pdf output.pdf

# ExifTool — remove all PDF metadata
exiftool -all= -overwrite_original input.pdf` },
      { type: 'h2', text: '5. Share a Cloud Drive Link Instead' },
      { type: 'p', html: 'When compression isn\'t enough — large architectural drawings, high-resolution portfolios, multi-section reports — bypass attachment limits entirely. Upload to Google Drive, Dropbox, or OneDrive and share a link. This works for files up to several GB and preserves full quality.' },
      { type: 'callout', kind: 'info', text: 'Regularly sending PDFs over 5 MB by email is worth questioning. A shared folder workflow often serves the collaboration better and preserves full quality on both ends.' },
      { type: 'p', html: 'For most situations, a quick pass through <a href="/compress-pdf" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">our PDF compressor</a> will get any file under a standard email limit in seconds.' },
    ],
  },
  {
    slug: 'batch-resize-images-social-media',
    title: 'How to Batch Resize Images for Social Media Quickly',
    description: 'Every social platform has different image dimension requirements. The 2026 guide to resizing for Instagram, X, LinkedIn, and more — without losing quality.',
    date: '2026-04-20',
    category: 'productivity',
    readingTime: 4,
    relatedTool: { label: 'Resize Image', href: '/resize-image' },
    body: [
      { type: 'p', html: 'Upload the wrong image size to a social platform and you\'ll see it cropped, zoomed, or blurred by the platform\'s auto-processing. Getting dimensions right the first time avoids quality loss and ensures your images display exactly as designed.' },
      { type: 'ad' },
      { type: 'h2', text: '2026 Social Media Image Size Reference' },
      { type: 'ul', items: [
        '<strong>Instagram Feed (Square):</strong> 1080×1080px',
        '<strong>Instagram Feed (Portrait):</strong> 1080×1350px — fills more screen real estate',
        '<strong>Instagram Stories / Reels:</strong> 1080×1920px',
        '<strong>X / Twitter Post:</strong> 1600×900px (displayed at 1200×675)',
        '<strong>LinkedIn Post:</strong> 1200×627px',
        '<strong>LinkedIn Profile Banner:</strong> 1584×396px',
        '<strong>Facebook Post:</strong> 1200×630px',
        '<strong>YouTube Thumbnail:</strong> 1280×720px',
        '<strong>Pinterest Pin:</strong> 1000×1500px',
      ]},
      { type: 'h2', text: 'The Right Workflow: Resize Once, Compress Once' },
      { type: 'p', html: 'Quality is lost when you upscale a small image, when you recompress an already-compressed JPEG multiple times, or when you scale down and compress at a low quality. The correct workflow: <strong>start from your highest-quality source</strong> → resize to target dimensions → compress once at the end.' },
      { type: 'callout', kind: 'tip', text: "Always keep the original source file. Never use a social media download as your master — every platform recompresses images on upload, and you lose quality each generation." },
      { type: 'h2', text: 'Batch Resizing with ImageMagick' },
      { type: 'code', lang: 'bash', text: code`# Resize all JPEGs to Instagram square (crop from centre)
mogrify -resize 1080x1080^ -gravity center -extent 1080x1080 *.jpg

# Resize to fit within dimensions (letterbox, no crop)
mogrify -resize 1080x1080 -gravity center \
        -background white -extent 1080x1080 *.jpg

# Batch convert for multiple platforms
for size in "1080x1080" "1080x1350" "1600x900"; do
  mkdir -p output/$size
  convert input.jpg -resize "\${size}^" -gravity center \
          -extent $size "output/$size/image.jpg"
done` },
      { type: 'h2', text: 'File Size Targets After Resizing' },
      { type: 'ul', items: [
        '<strong>Instagram:</strong> target 100–300KB — the platform recompresses on upload but a reasonable source file helps',
        '<strong>X / Twitter:</strong> platform compresses to JPEG ~85; save at high quality and let it handle the rest',
        '<strong>LinkedIn:</strong> under 1MB is plenty for the 1200×627px format',
      ]},
      { type: 'p', html: 'Use our <a href="/resize-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image resizer</a> to set exact pixel dimensions, then run through the <a href="/" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image compressor</a> to hit your target file size.' },
    ],
  },
  {
    slug: 'png-to-webp-why-website-owners-should-switch',
    title: 'Converting PNG to WebP: Why Every Website Owner Should Do It',
    description: 'PNG files are 3–5× larger than their WebP equivalents. How to migrate your image library, what to watch out for, and when to keep PNG.',
    date: '2026-04-22',
    category: 'productivity',
    readingTime: 4,
    relatedTool: { label: 'Convert Image to WebP', href: '/convert-image-to-webp' },
    body: [
      { type: 'p', html: 'PNG became the default format for web graphics in the 2000s — lossless compression, alpha transparency, wide support. It was a good choice then. But it was designed before Lighthouse scores, Core Web Vitals, and 4G mobile connections. In 2026, serving PNG where WebP would do is leaving measurable performance improvement untouched.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Size Difference Is Significant' },
      { type: 'p', html: 'For photographic content: a JPEG converted to PNG is typically 3–5× larger. Converting that PNG to lossy WebP (quality 80) gives you a file smaller than the original JPEG, at equivalent or better visual quality.' },
      { type: 'p', html: 'For graphics with transparency (icons, illustrations): PNG lossless typically runs 20–40% larger than WebP lossless. Lossy WebP with alpha transparency achieves 40–70% size reduction with minimal visible impact on non-photographic content.' },
      { type: 'h2', text: 'When to Use WebP vs. Keeping PNG' },
      { type: 'ul', items: [
        '<strong>Switch to WebP:</strong> hero images, product photos, thumbnails, blog post images, banners',
        '<strong>Consider PNG:</strong> icons and logos that require sub-pixel precision (lossy WebP softens edges)',
        '<strong>Keep PNG:</strong> screenshots where pixel-exact rendering matters',
        '<strong>Use SVG instead:</strong> logos, icons, and any vector content — SVG beats both formats',
      ]},
      { type: 'h2', text: 'Migration: Batch Convert with cwebp' },
      { type: 'code', lang: 'bash', text: code`# Install: brew install webp (macOS) / apt install webp (Ubuntu)

# Lossy WebP for photographic PNGs
for f in images/*.png; do
  cwebp -q 80 "$f" -o "\${f%.png}.webp"
done

# Lossless WebP for graphics and icons
for f in icons/*.png; do
  cwebp -lossless "$f" -o "\${f%.png}.webp"
done

# Compare sizes
du -sh images/*.png images/*.webp | sort -h` },
      { type: 'callout', kind: 'info', text: 'Next.js, Nuxt, and most modern frameworks automatically serve WebP via their Image components when the browser supports it — without any code changes. Enabling the Image component is the easiest migration path.' },
      { type: 'h2', text: 'Measuring the Impact' },
      { type: 'p', html: 'Run PageSpeed Insights before and after. Switching from PNG to WebP on image-heavy pages typically moves the "Efficiently encode images" audit from red to green and adds 10–30 points to Performance score.' },
      { type: 'p', html: 'Start with the quick wins: <a href="/convert-image-to-webp" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">convert your images to WebP</a> and compare the file sizes before committing to a full site migration.' },
    ],
  },

  // ─── TECHNICAL PILLAR ────────────────────────────────────────────────────────
  {
    slug: 'building-private-image-compressor-webassembly',
    title: 'Building a Private Image Compressor with WebAssembly',
    description: 'How ImagePDF.Tools uses pngquant WASM, the Canvas API, and Web Workers to compress images entirely in the browser — no server, no upload.',
    date: '2026-04-25',
    category: 'technical',
    readingTime: 8,
    relatedTool: { label: 'Compress Image', href: '/' },
    body: [
      { type: 'p', html: 'The engineering challenge behind a privacy-first image tool: how do you give users professional compression quality without sending a single byte to a server? The answer is WebAssembly (WASM) — compiled native binaries running at near-native speed inside the browser sandbox.' },
      { type: 'p', html: 'This is a technical walkthrough of how ImagePDF.Tools compresses images client-side using pngquant WASM for PNG, the Canvas API for JPEG/WebP, and a Web Worker architecture to keep the UI thread at 60fps during processing.' },
      { type: 'ad' },
      { type: 'h2', text: 'Three Paths, Zero Uploads' },
      { type: 'ul', items: [
        '<strong>JPEG and WebP:</strong> The browser\'s own Canvas API and <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">OffscreenCanvas.convertToBlob()</code> handle encoding with a quality parameter. Zero WASM needed.',
        '<strong>PNG:</strong> Canvas PNG output is lossless — it can\'t produce a lossy PNG. Meaningful compression requires pngquant\'s colour quantisation algorithm, compiled to WASM.',
        '<strong>SVG:</strong> Pure text manipulation — remove whitespace, strip unused attributes, truncate decimal coordinates. No binary codec needed.',
      ]},
      { type: 'h2', text: 'PNG Compression with pngquant WASM' },
      { type: 'code', lang: 'typescript', text: code`// lib/pngquant.ts
let pngquantModule: Awaited<ReturnType<typeof initPngquant>> | null = null;

async function getPngquant() {
  if (!pngquantModule) {
    // WASM is loaded and compiled once, then cached in memory for the session
    const { default: initPngquant } = await import('@nicolo-ribaudo/pngquant-wasm');
    pngquantModule = await initPngquant();
  }
  return pngquantModule;
}

export async function compressPng(file: File, quality: number): Promise<File> {
  const pngquant = await getPngquant();
  const input = new Uint8Array(await file.arrayBuffer()); // stays in browser memory

  // quality=80 → [72, 80] gives a tight quality band
  const output = pngquant.compress(input, {
    quality: [Math.max(0, quality * 0.9), quality] as [number, number],
    speed: 3, // 1 = slowest/best, 11 = fastest/worst
  });

  return new File([output], file.name, { type: 'image/png' });
}` },
      { type: 'h2', text: 'JPEG and WebP via OffscreenCanvas' },
      { type: 'code', lang: 'typescript', text: code`// lib/compress.ts — runs inside a Web Worker (no DOM access needed)
export async function compressJpegOrWebp(
  file: File,
  quality: number,
  outputFormat: 'image/jpeg' | 'image/webp',
  maxDimension = 4096,
): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  // OffscreenCanvas works in Workers — no DOM, no main-thread involvement
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close(); // free GPU memory immediately

  const blob = await canvas.convertToBlob({ type: outputFormat, quality: quality / 100 });
  const ext = outputFormat === 'image/jpeg' ? 'jpg' : 'webp';
  return new File([blob], file.name.replace(/\.[^.]+$/, '.' + ext), { type: outputFormat });
}` },
      { type: 'h2', text: 'Web Worker: Keeping the UI at 60fps' },
      { type: 'p', html: 'Compressing a 12MP photo can take 500ms–2s. Running that on the main thread freezes the UI. Web Workers run in a separate OS thread with access to <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">OffscreenCanvas</code>, <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">WASM</code>, and <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">ArrayBuffer</code> transfers — but no DOM.' },
      { type: 'code', lang: 'typescript', text: code`// workers/compress.worker.ts
self.onmessage = async ({ data: { file, options, id } }) => {
  try {
    const result = options.outputFormat === 'image/png'
      ? await compressPng(file, options.quality)
      : await compressJpegOrWebp(file, options.quality, options.outputFormat);

    const buf = await result.arrayBuffer();
    // Transfer ownership (zero-copy) — no ArrayBuffer clone
    self.postMessage({ id, buf, name: result.name, type: result.type }, [buf]);
  } catch (err) {
    self.postMessage({ id, error: (err as Error).message });
  }
};` },
      { type: 'callout', kind: 'tip', text: 'Prefetch the WASM binary with <link rel="prefetch" href="/_next/static/chunks/pngquant_bg.wasm"> as soon as the user lands. By the time they drop an image, the 350 KB binary is already cached.' },
      { type: 'h2', text: 'Performance Benchmarks' },
      { type: 'ul', items: [
        'JPEG compression (12MP, quality 80): 180–350ms on M3 MacBook, 400–900ms on mid-range Android',
        'PNG via pngquant WASM (5MP, quality 70): 800ms–2s on M3, 2–5s on Android',
        'WebP encoding (12MP, quality 80): 120–280ms (hardware-accelerated in Chrome/Safari)',
        'WASM load + compile (first visit): ~200ms; subsequent visits: <5ms from browser cache',
      ]},
      { type: 'p', html: '<a href="/" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try the compressor</a> — open DevTools → Network tab and confirm: zero file upload requests while your images are processed.' },
    ],
  },
  {
    slug: 'client-side-processing-saves-your-data',
    title: 'How Client-Side Processing Saves Your Data (And Our Server Costs)',
    description: "A transparent look at why ImagePDF.Tools processes files in the browser — the privacy case, the business case, and the engineering trade-offs.",
    date: '2026-04-27',
    category: 'technical',
    readingTime: 5,
    relatedTool: { label: 'Try the Tools', href: '/' },
    body: [
      { type: 'p', html: 'When I built ImagePDF.Tools, I made a deliberate decision to process all files client-side. I want to be transparent about why — because it\'s genuinely the right thing to do for users <em>and</em> the right decision for the business model.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Privacy Argument' },
      { type: 'p', html: 'Most free image tools are funded by advertising, and advertising revenue scales with data. Your uploaded files — even if deleted after processing — provide valuable signals: document types, file sizes, usage patterns, geographic distribution. That data has monetisation value even when the files are nominally deleted.' },
      { type: 'p', html: 'When you drop a file into ImagePDF.Tools, the bytes travel this far: from your filesystem into your browser\'s memory. That\'s it. No CDN logs, no server-side processing logs, no database write containing your content. There is literally no mechanism for us to see what you processed.' },
      { type: 'h2', text: 'The Business Case (It\'s Also Cheaper)' },
      { type: 'p', html: 'Server-side processing requires significant infrastructure:' },
      { type: 'ul', items: [
        'Compute instances sized for burst load (image processing is CPU-heavy)',
        'Object storage for temp files (even 1-hour retention multiplied across thousands of users)',
        'CDN egress costs for delivering processed files back to users',
        'Compliance infrastructure: GDPR deletion pipelines, audit logs, breach notification systems',
        'Security surface: every server that touches user files is a breach liability',
      ]},
      { type: 'p', html: 'Our backend consists of three Edge Functions: a Stripe checkout endpoint, a billing portal endpoint, and a webhook handler. Total infrastructure cost is a few dollars per month — regardless of processing volume. Every user brings their own CPU.' },
      { type: 'callout', kind: 'info', text: 'The pngquant and Ghostscript algorithms are computationally expensive. But that cost runs on your CPU, not ours. Client-side processing is both more private and more scalable.' },
      { type: 'h2', text: 'Engineering Trade-offs' },
      { type: 'ul', items: [
        '<strong>WASM bundle size:</strong> pngquant WASM is ~350 KB. Mitigated with <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">rel="prefetch"</code> — loaded silently after initial render.',
        '<strong>Mobile performance:</strong> A 20MP phone photo can take 3–5 seconds on a mid-range Android. Web Workers keep the UI responsive; a progress indicator manages the wait.',
        '<strong>Browser compatibility:</strong> OffscreenCanvas and WASM are in all modern browsers. IE11 (<0.3% global traffic in 2026) is not supported.',
        '<strong>Memory limits:</strong> Browsers cap JavaScript heap size. Files above ~100 MB are unreliable. We enforce this limit on uploads.',
      ]},
      { type: 'h2', text: 'What We Do Store' },
      { type: 'ul', items: [
        '<strong>Clerk (auth):</strong> your email address, account creation date, and plan tier. No file content.',
        '<strong>Stripe (billing):</strong> payment information for Pro subscribers — held entirely by Stripe.',
        '<strong>Vercel (hosting):</strong> standard HTTP access logs (IP address, request path). These are page load logs, not file content.',
      ]},
      { type: 'h2', text: 'Verify It Yourself' },
      { type: 'ol', items: [
        'Open any tool on ImagePDF.Tools',
        'Open Chrome DevTools → Network tab → filter by "Fetch/XHR"',
        'Drop a file into the tool',
        'Watch the Network tab — zero requests carry your file data',
      ]},
      { type: 'p', html: 'The only requests you\'ll see are page navigation, the AdSense script (for free-tier users), and the Clerk session token check. Your file bytes appear nowhere. <a href="/" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try it yourself.</a>' },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: Post, count = 3): Post[] {
  return POSTS
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, count);
}
