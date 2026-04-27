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
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
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

  // ─── NEW POSTS ───────────────────────────────────────────────────────────────
  {
    slug: 'choosing-right-image-format-compression-guide',
    title: 'Choosing the Right Image Format: A Practical Guide From the Compression Side',
    description: 'JPEG, PNG, WebP, AVIF — each format has a different compression model. A practical guide to picking the right one so your fallback is never the weak link.',
    date: '2026-04-28',
    category: 'technical',
    readingTime: 6,
    relatedTool: { label: 'Convert Image to WebP', href: '/convert-image-to-webp' },
    body: [
      { type: 'p', html: 'Once an image leaves your server, you lose control over how it\'s rendered. A common pitfall is serving a high-efficiency WebP while treating the JPEG fallback as an afterthought. If the fallback is exported at quality 50 to save bandwidth, every browser that can\'t load WebP — or every email client, WhatsApp send, or Slack upload — shows a noticeably degraded image. Format choice and fallback quality are inseparable decisions.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Four Main Formats and Their Compression Models' },
      { type: 'h3', text: 'JPEG — DCT-Based Lossy Compression' },
      { type: 'p', html: 'JPEG divides the image into 8×8 pixel blocks and applies the Discrete Cosine Transform to each. High-frequency detail (fine texture, sharp edges) is compressed more aggressively than low-frequency content (gradual gradients, flat colour). The quality slider controls how aggressively high-frequency data is quantised. Quality 80 discards roughly 20–30% of the frequency data — imperceptible at normal viewing distances, but visible in 1:1 zoom on fine detail.' },
      { type: 'h3', text: 'PNG — Lossless DEFLATE Compression' },
      { type: 'p', html: 'PNG stores every pixel exactly. Compression is achieved through prediction filters (delta-encoding between adjacent pixels) followed by DEFLATE. No information is lost, which means PNG is always the right choice for screenshots, line art, and graphics that need sub-pixel precision. It is almost never the right choice for photographs — a lossless PNG of a photo is typically 3–5× larger than an equivalent-quality JPEG.' },
      { type: 'h3', text: 'WebP — Hybrid Model' },
      { type: 'p', html: 'WebP supports both lossy and lossless modes. Lossy WebP uses a prediction-based codec derived from VP8 video compression — fundamentally different from JPEG\'s DCT approach. At quality 80, WebP produces files roughly 25–35% smaller than JPEG with similar or better visual fidelity. Lossless WebP compresses 15–25% better than PNG for most images.' },
      { type: 'h3', text: 'AVIF — AV1-Derived, Best Compression Ratio' },
      { type: 'p', html: 'AVIF uses the AV1 video codec\'s intra-frame compression. It achieves 20–40% better compression than WebP at equivalent quality, with better handling of gradients and fine detail. The trade-off is encoding speed — AVIF is 5–50× slower to encode than WebP, making it practical for pre-rendered assets but not for on-the-fly conversion.' },
      { type: 'table', caption: 'Format comparison at equivalent perceived quality — photographic content, 2MP source image', headers: ['Format', 'Typical size', 'Compression', 'Transparency', 'Best for'], rows: [
        ['JPEG', '150–400 KB', 'Lossy (DCT)', 'No', 'Photos, hero images'],
        ['PNG', '500 KB–2 MB', 'Lossless', 'Yes', 'Screenshots, logos, icons'],
        ['WebP (lossy)', '100–300 KB', 'Lossy (VP8)', 'Yes', 'Photos + graphics on web'],
        ['WebP (lossless)', '350–800 KB', 'Lossless', 'Yes', 'Icons, illustrations'],
        ['AVIF', '70–200 KB', 'Lossy (AV1)', 'Yes', 'Hero images (build-time)'],
        ['SVG', '2–50 KB', 'Vector', 'Yes', 'Logos, icons, diagrams'],
      ]},
      { type: 'h2', text: 'Format Selection Decision Tree' },
      { type: 'ul', items: [
        '<strong>Photograph for a website:</strong> WebP (lossy, quality 75–80) with JPEG fallback at quality 80',
        '<strong>Logo or icon:</strong> SVG if vector; PNG if raster with transparency; never JPEG',
        '<strong>Screenshot:</strong> PNG lossless; WebP lossless if size matters',
        '<strong>Hero image for SEO:</strong> AVIF + WebP + JPEG via <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;picture&gt;</code> srcset',
        '<strong>Email attachment:</strong> JPEG quality 80 — client support for WebP in email is still inconsistent',
        '<strong>Print file:</strong> TIFF or PNG lossless — JPEG generation loss accumulates in print workflows',
      ]},
      { type: 'callout', kind: 'warning', text: 'Never use a social media download as a source file for conversion. Every platform recompresses on upload. A downloaded Instagram JPEG has already been through two lossy passes — converting it again adds a third.' },
      { type: 'h2', text: 'The Fallback Problem' },
      { type: 'p', html: 'The most common mistake: optimising the WebP while ignoring the fallback. Use the <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element and maintain both assets at full quality.' },
      { type: 'code', lang: 'html', text: code`<picture>
  <!-- AVIF for browsers that support it (~93% in 2026) -->
  <source srcset="hero.avif" type="image/avif">
  <!-- WebP for wide compatibility (~98%) -->
  <source srcset="hero.webp" type="image/webp">
  <!-- JPEG fallback — must be quality 80+, not a throwaway -->
  <img src="hero.jpg" alt="Hero" width="1200" height="630" loading="eager" fetchpriority="high">
</picture>` },
      { type: 'h2', text: 'Compression Quality Reference' },
      { type: 'ul', items: [
        '<strong>JPEG quality 85–90:</strong> transparent at normal viewing; large files',
        '<strong>JPEG quality 75–80:</strong> optimal trade-off; standard for web use',
        '<strong>JPEG quality 60–70:</strong> visible artefacts on close inspection; use only for thumbnails',
        '<strong>WebP quality 75:</strong> ≈ JPEG quality 85 at 25–30% smaller file size',
        '<strong>WebP quality 60:</strong> ≈ JPEG quality 75; noticeable only on photographic detail',
      ]},
      { type: 'p', html: 'Start by converting your JPEG and PNG images to WebP — it\'s the highest-value, lowest-risk change for most sites. <a href="/convert-image-to-webp" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Convert to WebP</a> in your browser, then compare sizes before committing to a full migration.' },
    ],
  },
  {
    slug: 'compress-image-to-exact-file-size',
    title: 'How to Compress an Image to an Exact File Size — And Why It\'s Harder Than You Think',
    description: 'Passport photos under 200 KB, CMS upload limits, email quotas — hitting an exact file size target requires binary search, not guesswork. Here\'s how.',
    date: '2026-04-28',
    category: 'productivity',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Hitting an exact file size — a passport photo under 200 KB, a hero image under a strict CMS limit — is one of those tasks that sounds trivial but rarely is. You compress, overshoot by a few kilobytes, lower the quality, undershoot by twenty, raise it slightly, overshoot again. The problem is that JPEG and WebP compression ratios are non-linear: the relationship between quality and output size depends on the specific content of the image, not a predictable formula.' },
      { type: 'ad' },
      { type: 'h2', text: 'Why Quality Settings Don\'t Map Linearly to File Size' },
      { type: 'p', html: 'JPEG quality 80 for a photo of a clear blue sky might produce a 40 KB file. The same quality setting on a photo of dense forest foliage might produce a 400 KB file. The encoder is measuring <em>image complexity</em> — the amount of high-frequency detail — not respecting a size target. This is by design: the quality setting controls visual fidelity, not file size.' },
      { type: 'h2', text: 'The Correct Approach: Binary Search on Quality' },
      { type: 'p', html: 'The reliable method for hitting a size target is a binary search over quality values. You set a target size, measure the output at quality 80, then step up or down based on whether you over- or undershot, repeating until you\'re within tolerance.' },
      { type: 'code', lang: 'typescript', text: code`async function compressToTargetSize(
  file: File,
  targetBytes: number,
  toleranceBytes = 5000,
  format: 'image/jpeg' | 'image/webp' = 'image/jpeg',
): Promise<Blob> {
  let lo = 1, hi = 100, bestBlob: Blob | null = null;

  while (lo <= hi) {
    const quality = Math.round((lo + hi) / 2);
    const canvas = document.createElement('canvas');
    const bitmap = await createImageBitmap(file);
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), format, quality / 100),
    );

    if (blob.size <= targetBytes) {
      bestBlob = blob;
      lo = quality + 1; // try higher quality (larger file)
    } else {
      hi = quality - 1; // too large, reduce quality
    }

    if (Math.abs(blob.size - targetBytes) <= toleranceBytes) break;
  }

  return bestBlob ?? await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), format, lo / 100),
  );
}` },
      { type: 'callout', kind: 'tip', text: 'Binary search converges in at most 7 iterations (log₂ 100 ≈ 6.6). This is far faster than manual trial-and-error and avoids the common mistake of incrementing quality by 5 and jumping over the optimal value.' },
      { type: 'h2', text: 'Dimension Reduction: The Other Lever' },
      { type: 'p', html: 'If quality 1 still produces a file above your target, the image needs to be smaller in pixels. Halving the width and height reduces file size by roughly 75% at the same quality — far more effective than dropping quality to extreme lows.' },
      { type: 'ul', items: [
        'Calculate the scale factor: <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">scale = sqrt(targetBytes / currentBytes)</code>',
        'Apply the scale: <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">newWidth = currentWidth × scale</code>',
        'Then run the quality binary search on the downscaled image',
      ]},
      { type: 'h2', text: 'Common Exact-Size Requirements' },
      { type: 'ul', items: [
        '<strong>UK passport photo:</strong> under 10 MB but at least 50 KB — usually resolution-driven, not compression',
        '<strong>US visa / DS-160:</strong> between 1 KB and 240 KB — quality 70–80 at 600×600px usually lands in range',
        '<strong>Indian passport / OCI:</strong> under 1 MB, min 10 KB — quality 85 at 1200×1200px',
        '<strong>Common CMS limits:</strong> WordPress default 8 MB, Webflow 25 MB, Shopify 20 MB per image',
      ]},
      { type: 'p', html: 'The quality slider in our <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image compressor</a> shows a live size estimate as you drag — use it to zero in on your target without guesswork.' },
    ],
  },
  {
    slug: 'compression-artifacts-field-guide',
    title: 'Those Weird Blotches Around Text: A Field Guide to Compression Artifacts',
    description: 'Ringing, blocking, banding, mosquito noise — compression artifacts have names and specific causes. Understanding them helps you compress without triggering them.',
    date: '2026-04-29',
    category: 'technical',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Compression artifacts are the visible byproducts of a lossy encoder trying to squeeze an image into a smaller file. They show up most often when an image is exported at mid-range quality (say, 60) and then recompressed — or when the original image contains hard edges and flat colours that JPEG handles particularly poorly. Once you know what to look for, you can adjust encoding settings to avoid the most visible defects.' },
      { type: 'ad' },
      { type: 'h2', text: 'Blocking — The Grid Pattern' },
      { type: 'p', html: 'JPEG works in 8×8 pixel blocks. When quality is low, each block is quantised independently, and the boundaries between blocks become visible — especially in smooth gradient areas. The image looks like it\'s divided into a grid of slightly different-coloured squares.' },
      { type: 'callout', kind: 'info', text: 'Blocking is most visible in sky gradients, skin tones, and blurred backgrounds. It\'s the defining artifact of heavily compressed JPEG, and the primary visual cue people use to identify "low quality" images.' },
      { type: 'h2', text: 'Ringing — The Halo Around Edges' },
      { type: 'p', html: 'At the boundary between a sharp edge (black text on white, a hard shadow line), the DCT encoder produces oscillations called Gibbs ringing — bright halos on one side of the edge and dark halos on the other. In web screenshots and UI images, this makes text appear blurry or surrounded by ghost shadows.' },
      { type: 'h2', text: 'Mosquito Noise — The "Buzzing" Around Text' },
      { type: 'p', html: 'Mosquito noise is a specific type of ringing that appears around high-contrast text. The name comes from the way small, rapidly-changing artifacts appear to "swarm" around letterforms at moderate zoom levels. It\'s especially pronounced for dark text on white backgrounds and is the reason JPEG is a poor format for screenshots with text.' },
      { type: 'h2', text: 'Colour Banding — Staircase Gradients' },
      { type: 'p', html: 'Smooth gradients (sky, blurred backgrounds, shadows) get quantised into visible steps. Instead of a smooth transition from blue to lighter blue, you see 5–10 discrete bands. This is common in PNG at lower bit depths and in JPEG at quality below 70 for gradient-heavy images.' },
      { type: 'h2', text: 'Chroma Subsampling Artifacts — Colour Bleeding' },
      { type: 'p', html: 'JPEG compresses colour (chroma) channels at lower resolution than the brightness (luma) channel, using a scheme called 4:2:0 or 4:2:2 subsampling. This is invisible on photographs but causes colour to "bleed" outside the edges of coloured text or logos. Red text on white, for instance, often gets a pink glow around the letterforms.' },
      { type: 'code', lang: 'javascript', text: code`// Force 4:4:4 chroma subsampling in Canvas (no subsampling)
// Note: Canvas API doesn't expose chroma subsampling directly.
// To avoid chroma artifacts on text/graphics, use PNG or WebP lossless instead.
const canvas = document.createElement('canvas');
canvas.getContext('2d').drawImage(img, 0, 0);

// WebP lossless — no chroma subsampling, no blocking
const blob = await new Promise(res => canvas.toBlob(res, 'image/webp'));

// JPEG at quality 95+ minimises but doesn't eliminate chroma artifacts
const jpegBlob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.95));` },
      { type: 'table', caption: 'Artifact type reference — cause, visual description, and how to avoid each', headers: ['Artifact', 'Format', 'Cause', 'Where it appears', 'Fix'], rows: [
        ['Blocking', 'JPEG', 'Heavy 8×8 block quantisation', 'Sky, skin, blurred backgrounds', 'Raise quality above 75'],
        ['Ringing (Gibbs)', 'JPEG', 'DCT oscillation at high-contrast edges', 'Around sharp shadows and text', 'Use WebP or raise quality to 85+'],
        ['Mosquito noise', 'JPEG', 'Ringing concentrated around letterforms', 'Text overlaid on photos', 'Use PNG or WebP lossless for text'],
        ['Colour banding', 'JPEG / PNG 8-bit', 'Gradient quantisation to discrete steps', 'Sky gradients, shadows', 'Use 24-bit colour; raise quality'],
        ['Chroma bleeding', 'JPEG', '4:2:0 chroma subsampling', 'Coloured text edges on white', 'Use WebP (4:4:4 chroma) or quality 90+'],
      ]},
      { type: 'h2', text: 'Format Recommendations by Content Type' },
      { type: 'ul', items: [
        '<strong>Photographs:</strong> JPEG or WebP lossy — artifacts are minimal at quality 75+ and are masked by natural texture',
        '<strong>Screenshots with text:</strong> PNG or WebP lossless — lossy formats create mosquito noise around every letter',
        '<strong>Mixed content (photo + text overlay):</strong> WebP quality 85+ to minimise ringing',
        '<strong>Logos and icons:</strong> SVG > PNG > WebP lossless — never JPEG',
      ]},
      { type: 'p', html: 'In our <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image compressor</a>, use the before/after compare view at 1:1 zoom to check for artifacts before downloading. Look around text edges and in smooth gradient areas first — that\'s where encoding problems appear earliest.' },
    ],
  },
  {
    slug: 'how-browsers-handle-images',
    title: 'How Browsers Actually Handle Your Images',
    description: 'File size is only half the story. After the bytes arrive, browsers decode, rasterise, and composite images in ways that affect memory, battery, and rendering performance.',
    date: '2026-04-29',
    category: 'technical',
    readingTime: 6,
    relatedTool: { label: 'Resize Image', href: '/resize-image' },
    body: [
      { type: 'p', html: 'Most image optimisation advice treats delivery as a download problem: smaller file, faster page. Performance audits reinforce this because they measure bytes on the wire. But once the bytes arrive, the browser still has significant work to do — and that work can cause jank, memory pressure, and slow paints even when the download is fast.' },
      { type: 'ad' },
      { type: 'h2', text: 'Step 1: Decoding — From Compressed to Raw Pixels' },
      { type: 'p', html: 'The browser receives compressed image bytes (JPEG, WebP, etc.) and must decode them into raw RGBA pixel data before it can draw anything. A 500 KB JPEG of a 2000×1500px photo decodes to <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">2000 × 1500 × 4 bytes = ~11.4 MB</code> of raw bitmap data in memory.' },
      { type: 'callout', kind: 'info', text: 'This is why a page with ten 2MB JPEGs can consume 200+ MB of GPU memory even if the total download was only 20 MB. The compressed file size and the decoded memory footprint are completely different numbers.' },
      { type: 'h2', text: 'Step 2: Rasterisation and the Compositor' },
      { type: 'p', html: 'After decoding, the image is rasterised (painted) onto a GPU texture. The browser compositor combines image layers, applies CSS transforms, and sends the result to the screen. Large images that are scaled down in CSS still occupy full-resolution texture memory on the GPU — a 4000×3000px image displayed at 400×300px wastes 90% of that memory.' },
      { type: 'h2', text: 'Step 3: Will-Change and Layer Promotion' },
      { type: 'p', html: 'CSS properties like <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">will-change: transform</code> promote an element to its own compositor layer. For large hero images that animate, this prevents repaint on every animation frame. The trade-off: each promoted layer occupies separate GPU texture memory.' },
      { type: 'code', lang: 'css', text: code`/* Promote image to own layer for smooth animation */
.hero-image {
  will-change: transform;  /* uploads to GPU texture once */
}

/* Without will-change, CSS transforms trigger repaint on every frame */
/* Avoid on static images — unnecessary memory usage */` },
      { type: 'h2', text: 'Decoding: Synchronous vs. Async' },
      { type: 'p', html: 'By default, image decoding happens synchronously on the main thread, blocking rendering. The <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">decoding="async"</code> attribute tells the browser to decode off the main thread, preventing decode jank on large images.' },
      { type: 'code', lang: 'html', text: code`<!-- async decode: won't block rendering, image appears when ready -->
<img src="large-photo.jpg" decoding="async" loading="lazy" alt="...">

<!-- sync decode (default): blocks main thread until decoded -->
<!-- Use for LCP images where you want guaranteed paint timing -->
<img src="hero.jpg" decoding="sync" fetchpriority="high" alt="...">` },
      { type: 'h2', text: 'What This Means for Optimisation' },
      { type: 'ul', items: [
        '<strong>Right-size source images:</strong> A 4000×3000px image displayed at 400×300px wastes 100× the GPU memory. Resize to display dimensions.',
        '<strong>Use srcset:</strong> Serve different resolutions for different viewports — the browser picks the best match automatically.',
        '<strong>Add decoding="async":</strong> Prevents decode jank for below-fold images, at the cost of a brief flash when scrolling.',
        '<strong>Avoid will-change on static images:</strong> Layer promotion consumes GPU memory on every device viewing the page.',
        '<strong>Compress aggressively for thumbnails:</strong> A 50×50px thumbnail decoded to raw pixels is trivial — quality 60 is fine.',
      ]},
      { type: 'p', html: 'The most overlooked optimisation is dimension right-sizing. Use our <a href="/resize-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image resizer</a> to set exact pixel dimensions before compression — a correctly-sized image at quality 80 will use far less GPU memory than an oversized image at quality 60.' },
    ],
  },
  {
    slug: 'image-compression-for-beginners',
    title: 'Image Compression for People Who Just Want Smaller Photos',
    description: 'No technical jargon. A straightforward guide to making your photos smaller so they send faster, upload without errors, and stop clogging your storage.',
    date: '2026-04-30',
    category: 'productivity',
    readingTime: 4,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Most email providers cap attachments at 20–25 MB (Gmail and Yahoo at 25 MB, Outlook at 20 MB). Modern iPhone photos typically range from 3 MB to 12 MB depending on mode, so a handful of attachments will hit the limit fast. WhatsApp already compresses images automatically — but the compression is aggressive and often makes photos look noticeably worse. Compressing yourself gives you control over quality.' },
      { type: 'ad' },
      { type: 'h2', text: 'What Does "Compressing" an Image Actually Do?' },
      { type: 'p', html: 'Your camera saves photos with a lot of detail that\'s practically invisible — fine texture that your eye glosses over, colour gradations in areas where the difference doesn\'t matter. Compression removes the least-important information to make the file smaller. Done carefully, the difference is invisible. Done aggressively, you get the blotchy, pixelated look of a badly sent photo.' },
      { type: 'h2', text: 'The Quality Setting — The Only Number That Matters' },
      { type: 'p', html: 'Every image compressor has some version of a quality slider. Here\'s a simple rule for photos:' },
      { type: 'ul', items: [
        '<strong>80–85:</strong> Looks identical to the original at normal viewing size. Use this for anything you care about.',
        '<strong>70–75:</strong> Slightly smaller file. Hard to tell the difference unless you zoom in closely.',
        '<strong>60:</strong> Noticeably smaller file. Fine for thumbnails or social media where the platform recompresses anyway.',
        '<strong>Below 50:</strong> Visible quality loss. Only use if you have no other option.',
      ]},
      { type: 'callout', kind: 'tip', text: 'Quality 80 is the sweet spot for nearly everything. It typically cuts file size by 60–70% compared to what your camera saves, with no visible difference on a phone or laptop screen.' },
      { type: 'h2', text: 'How to Compress a Photo in 30 Seconds' },
      { type: 'ol', items: [
        'Go to <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">imagepdf.tools/compress-image</a>',
        'Drag your photo onto the page (or click to choose a file)',
        'Leave the quality slider at 80',
        'Click Download',
      ]},
      { type: 'p', html: 'That\'s it. Your photo never leaves your browser — nothing is uploaded anywhere. The whole process happens on your computer.' },
      { type: 'h2', text: 'How Much Smaller Will It Get?' },
      { type: 'p', html: 'Results vary by photo, but rough estimates at quality 80:' },
      { type: 'ul', items: [
        'A 5 MB iPhone photo → typically 800 KB–1.5 MB',
        'A 12 MB camera RAW export → typically 1.5–3 MB',
        'A 500 KB screenshot → typically 100–200 KB',
      ]},
      { type: 'h2', text: 'When Should You Not Compress?' },
      { type: 'ul', items: [
        'If you\'re keeping a permanent backup — always archive originals',
        'If you\'re printing — print services need the full resolution and quality',
        'If the image will be edited later — edit first, compress last',
      ]},
      { type: 'p', html: 'For everyday use — emailing photos, uploading to forms, sharing in chats — compression at quality 80 gives you files that are 5–10× smaller with no visible difference. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Try it now</a>.' },
    ],
  },
  {
    slug: 'image-compression-for-photographers',
    title: 'Image Compression for Photographers: A Guide for People Who Actually Care About Quality',
    description: 'Export settings, generation loss, colour profile preservation, sharpening for web — the complete guide to compressing photos without compromising your work.',
    date: '2026-04-30',
    category: 'productivity',
    readingTime: 6,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Exporting is often treated as a technicality at the end of the process, but it\'s the step that decides whether your colour work and fine detail actually survive the trip to the viewer\'s screen. Careless export settings can undo careful retouching. Understanding what the encoder does to your image lets you make informed decisions about every export.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Generation Loss Problem' },
      { type: 'p', html: 'JPEG is a lossy format. Every time you open and re-save a JPEG, you add another generation of compression artifacts — even at quality 95. Two or three save cycles at high quality are generally invisible, but the loss is cumulative and irreversible. The rule: <strong>always edit from the original RAW or TIFF, and compress to JPEG as the final step.</strong>' },
      { type: 'callout', kind: 'warning', text: 'Never use a JPEG you downloaded from social media as an editing source. It has already been through at least two lossy passes — yours (export) and the platform\'s (upload compression). Start from RAW or original full-quality TIFF.' },
      { type: 'h2', text: 'Optimal Export Settings for Web' },
      { type: 'ul', items: [
        '<strong>Quality:</strong> 80–85 for JPEG, 75–80 for WebP. Quality 90+ yields diminishing returns — the file size increase outweighs any quality gain at screen resolution.',
        '<strong>Colour space:</strong> sRGB for web. Adobe RGB and ProPhoto RGB display incorrectly in browsers that don\'t colour-manage (most of them, in practice).',
        '<strong>Resolution:</strong> 72 PPI for web files — this metadata has no effect on quality, but Photoshop\'s default 300 PPI setting can add unnecessary metadata and confuse some CMS tools.',
        '<strong>Sharpening:</strong> Apply light output sharpening for web — about 50% Amount, 0.5px Radius in Lightroom "For Screen". Downsampling to web dimensions softens images, and a sharpening pass restores perceived crispness.',
        '<strong>Strip metadata:</strong> Remove EXIF before publishing publicly. GPS coordinates are in your photos unless you shot with location services disabled.',
      ]},
      { type: 'h2', text: 'JPEG vs. WebP for Portfolio Delivery' },
      { type: 'p', html: 'WebP at quality 75 produces files roughly 30% smaller than JPEG at quality 85, with equal or better visual fidelity. WebP browser support is near-universal (97%+) in 2026. For a photography portfolio, the payload savings are significant — a gallery of 20 images drops from 12 MB to 8 MB, meaningfully improving LCP and reducing mobile data usage for viewers.' },
      { type: 'code', lang: 'bash', text: code`# Batch export to WebP using cwebp
# Best for: photo libraries, portfolio galleries
for f in exports/*.jpg; do
  cwebp -q 78 -metadata none "$f" -o "\${f%.jpg}.webp"
done

# Or with ImageMagick for mixed formats:
magick mogrify -format webp -quality 78 -strip exports/*.{jpg,png}` },
      { type: 'h2', text: 'Lightroom and Capture One Export Settings' },
      { type: 'ul', items: [
        '<strong>Lightroom:</strong> File → Export → Quality 80, sRGB, Resize to Long Edge 2400px for full-res web, 1200px for social',
        '<strong>Lightroom WebP:</strong> Export → File Settings → JPEG → switch to WebP plugin (e.g. "LR/Mogrify") or post-process via CLI',
        '<strong>Capture One:</strong> Output → Recipe → JPEG Quality 80, sRGB, Sharpening "Screen" preset, strip location data',
      ]},
      { type: 'h2', text: 'Client Delivery: When to Use Which Format' },
      { type: 'ul', items: [
        '<strong>Email preview gallery:</strong> JPEG quality 75 at 1200px long edge — keeps attachment size manageable',
        '<strong>Online gallery (Pixieset, Pic-Time):</strong> JPEG quality 85–90 at 2400px — platforms recompress further, start with quality headroom',
        '<strong>Print order:</strong> TIFF or JPEG quality 95 at full resolution — never compress for print delivery',
        '<strong>Social media:</strong> JPEG quality 85 at 1080px — platforms compress on upload regardless',
      ]},
      { type: 'p', html: 'Quick web compression without leaving the browser: <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">compress your images</a> with a live quality preview — drag the slider and watch the size estimate update before you download.' },
    ],
  },
  {
    slug: 'image-optimization-ecommerce',
    title: 'Image Optimization for E-Commerce: The Multi-Platform Reality',
    description: 'Product images on WooCommerce, Shopify, and Amazon all have different requirements. A practical guide to optimising once and deploying everywhere without quality loss.',
    date: '2026-05-01',
    category: 'productivity',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'A typical mid-size store on WooCommerce might have fifty product pages, each with six to eight images uploaded as full-resolution PNGs straight from Photoshop. The main product grid can easily end up over 30 MB, taking four or five seconds to load on a mobile connection. The fix isn\'t a CDN — it\'s right-sized, properly compressed source images.' },
      { type: 'ad' },
      { type: 'table', caption: 'E-commerce platform image requirements at a glance', headers: ['Platform', 'Max size', 'Recommended dimensions', 'Format', 'Notes'], rows: [
        ['Shopify', '20 MB', '2048×2048px', 'JPEG / PNG / WebP', 'Serves WebP automatically via CDN'],
        ['WooCommerce', 'Server limit', '2000×2000px', 'Any', 'Generates thumbnails on upload; no auto WebP'],
        ['Amazon', '10 MB', '2000px+ on longest side', 'JPEG / TIFF / PNG', 'White background required for main image'],
        ['Etsy', '10 MB', '2000px minimum', 'JPEG / PNG', 'Displays at 570px; zoom needs 2000px+'],
        ['eBay', '12 MB', '1600px recommended', 'JPEG preferred', 'Min 500px; JPEG only for featured image'],
      ]},
      { type: 'h2', text: 'Platform Image Requirements at a Glance' },
      { type: 'ul', items: [
        '<strong>Shopify:</strong> Max 20 MB per image; recommends 2048×2048px for zoom; serves WebP automatically via CDN',
        '<strong>WooCommerce:</strong> No hard limit by default; generates thumbnails at upload; serves whatever format you upload',
        '<strong>Amazon:</strong> Minimum 1000px on longest side for zoom; JPEG, TIFF, or PNG; recommend 2000px+; white background required for main image',
        '<strong>Etsy:</strong> Under 10 MB; displays at 570px wide; recommends 2000px minimum',
        '<strong>eBay:</strong> Min 500px, recommend 1600px; JPEG preferred; 12 MB max',
      ]},
      { type: 'h2', text: 'The Source Image Strategy: Shoot Once, Optimize Per Platform' },
      { type: 'p', html: 'The correct workflow: maintain one high-quality source file (TIFF or maximum-quality JPEG) and generate platform-specific exports. Never let a platform be the only place your product images exist — always keep originals.' },
      { type: 'callout', kind: 'tip', text: 'For white-background product photography: shoot in RAW, export a 3000×3000px TIFF as your master, then generate platform exports from that. Shopify at 2048px, Amazon at 2000px, thumbnails at 800px. This preserves maximum zoom quality everywhere.' },
      { type: 'h2', text: 'The Format Problem: Not All Platforms Are Equal' },
      { type: 'p', html: 'Shopify\'s CDN automatically converts uploaded images to WebP for supported browsers — meaning you can upload JPEG and let the platform handle format optimisation. WooCommerce does not do this by default; you\'ll need a plugin (Imagify, ShortPixel, or similar) or manual WebP conversion. Amazon requires JPEG for most categories.' },
      { type: 'h2', text: 'File Size Targets for E-Commerce' },
      { type: 'ul', items: [
        '<strong>Main product image (2048×2048px):</strong> target 300–600 KB (JPEG quality 80)',
        '<strong>Gallery images (same resolution):</strong> target 200–400 KB each',
        '<strong>Category thumbnails (400×400px):</strong> target 30–80 KB',
        '<strong>Hero/banner images (1920×600px):</strong> target 100–200 KB (WebP preferred)',
      ]},
      { type: 'h2', text: 'Shopify-Specific Optimisation' },
      { type: 'p', html: 'Shopify serves WebP automatically, but it still re-encodes what you upload. Uploading an already-compressed JPEG adds generation loss on top of Shopify\'s own compression. The best approach: upload JPEG at quality 85–90, let Shopify handle the WebP conversion — its encoder is tuned for its CDN.' },
      { type: 'h2', text: 'WooCommerce: What Happens at Upload' },
      { type: 'p', html: 'WordPress generates multiple image sizes at upload time (thumbnail, medium, large, full). Each is stored as a separate file. If you upload a 5 MB JPEG, WordPress creates five or six files totalling 8–12 MB of disk space. Optimising before upload is critical — a 500 KB source produces a proportionally smaller set of generated sizes.' },
      { type: 'code', lang: 'bash', text: code`# WooCommerce: regenerate thumbnails after changing image settings
wp media regenerate --all --yes

# Or for a single product's images:
wp media regenerate 1234 1235 1236` },
      { type: 'p', html: 'Start with your hero and category images — they\'re the largest files and load on every page. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Compress them here</a> before uploading to your store.' },
    ],
  },
  {
    slug: 'jpeg-quality-slider-explained',
    title: 'What the JPEG Quality Slider Actually Does (It\'s Not What You Think)',
    description: "Most people treat quality 80 as \"80% of the original detail\". That's not how JPEG works. Here's the actual DCT quantisation process behind the number.",
    date: '2026-05-01',
    category: 'technical',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Most users treat the JPEG quality slider as a simple fidelity percentage where 100 represents a perfect copy and 50 represents half the original detail. While this idea is common, it is simply not how the compression works. The quality number is a scalar that adjusts a quantisation table — a matrix of divisors applied to frequency components. Understanding this changes how you choose quality settings.' },
      { type: 'ad' },
      { type: 'h2', text: 'What Actually Happens Inside the JPEG Encoder' },
      { type: 'p', html: 'JPEG compression has five main steps:' },
      { type: 'ol', items: [
        '<strong>Colour space conversion:</strong> RGB → YCbCr (separates brightness from colour)',
        '<strong>Block splitting:</strong> Image divided into 8×8 pixel tiles',
        '<strong>DCT (Discrete Cosine Transform):</strong> Each 8×8 block transformed into 64 frequency coefficients',
        '<strong>Quantisation:</strong> Each coefficient divided by a value from the quantisation table and rounded — this is where data is permanently lost',
        '<strong>Entropy coding:</strong> The quantised values are Huffman-coded for further (lossless) compression',
      ]},
      { type: 'h2', text: 'The Quality Number Scales the Quantisation Table' },
      { type: 'p', html: 'The quality value (1–100) doesn\'t directly measure how much of the image is preserved. It scales the quantisation table: at quality 100, divisors approach 1 (minimal loss); at quality 50, divisors are the standard JPEG table values; at quality 1, divisors are 100× the standard table (extreme loss).' },
      { type: 'callout', kind: 'info', text: 'The quality scale is non-linear and encoder-dependent. Quality 80 in Photoshop, quality 80 in libjpeg, quality 80 in ImageMagick, and quality 80 in a browser Canvas API all produce different file sizes and artifact profiles — they\'re all using different quantisation tables.' },
      { type: 'h2', text: 'Why Quality 95 Is Usually Overkill' },
      { type: 'p', html: 'The relationship between quality and file size is extremely non-linear at the high end. Going from quality 80 to quality 85 might add 20% to file size for a marginal quality gain. Going from 85 to 95 might double the file size for an improvement that\'s visible only under 200% zoom on an calibrated display.' },
      { type: 'code', lang: 'javascript', text: code`// Approximate file size relationship (varies by image content):
// Quality 70 → baseline file size × 0.5
// Quality 75 → baseline × 0.65
// Quality 80 → baseline × 0.8   ← typical sweet spot
// Quality 85 → baseline × 1.0   ← "baseline" for this example
// Quality 90 → baseline × 1.4
// Quality 95 → baseline × 2.2
// Quality 99 → baseline × 4.0+
// Quality 100 → baseline × 8–15× (minimal compression, all coefficients kept)` },
      { type: 'h2', text: 'High-Frequency vs. Low-Frequency Content' },
      { type: 'p', html: 'The quantisation table is not uniform — it applies heavier quantisation to high-frequency coefficients (fine detail, sharp edges) than to low-frequency ones (broad tones, gradual gradients). This is why:' },
      { type: 'ul', items: [
        'Photos of clear sky compress very well — mostly low-frequency content',
        'Photos of forest leaves or animal fur compress poorly — dominated by high-frequency detail',
        'Text and hard edges show ringing artifacts — DCT cannot represent discontinuities cleanly',
        'The same quality setting produces wildly different file sizes on different images',
      ]},
      { type: 'table', caption: 'Approximate JPEG file size at different quality levels — 2MP landscape photograph', headers: ['Quality', 'File size', 'Visual result', 'Recommended for'], rows: [
        ['100', '3–8 MB', 'Mathematically minimal loss', 'Archive only'],
        ['90–95', '1–2 MB', 'Virtually identical to original', 'Print intermediates, re-edit sources'],
        ['85', '600–900 KB', 'Indistinguishable at normal view', 'Images recompressed by third parties'],
        ['<strong>80</strong>', '<strong>350–550 KB</strong>', '<strong>Indistinguishable at screen resolution</strong>', '<strong>Web use — optimal sweet spot</strong>'],
        ['75', '250–400 KB', 'Detectable under 200% zoom', 'Thumbnails, non-critical images'],
        ['60–70', '150–250 KB', 'Visible artifacts in smooth areas', 'Strict bandwidth budgets only'],
        ['Below 50', 'Under 150 KB', 'Clearly degraded', 'Avoid'],
      ]},
      { type: 'h2', text: 'Practical Quality Recommendations' },
      { type: 'ul', items: [
        '<strong>Quality 75–80:</strong> Optimal for photographs on web pages — invisible quality loss, 60–70% smaller than quality 95',
        '<strong>Quality 85:</strong> For images that will be recompressed by third parties (social platforms, CDNs)',
        '<strong>Quality 90+:</strong> Only for print intermediates or images that will be edited again',
        '<strong>Never quality 100:</strong> Produces minimal compression for no visible benefit at screen resolution',
      ]},
      { type: 'p', html: 'The live size estimate in our <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image compressor</a> updates as you drag the quality slider — this gives you a direct measure of the quality/size trade-off for your specific image content.' },
    ],
  },
  {
    slug: 'lazy-loading-images-lcp-pitfall',
    title: 'Lazy Loading Images: The One-Line Fix That Backfires on LCP',
    description: 'loading="lazy" on every image is one of the most common LCP killers. Here\'s why it happens and how to apply lazy loading correctly.',
    date: '2026-05-02',
    category: 'performance',
    readingTime: 4,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Adding <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> to every image on a page looks like an easy performance win. In practice, applying it uniformly — including to hero banners and other above-the-fold visuals — usually makes the page feel slower. The browser delays fetching the image until it\'s near the viewport, but if that image is already in the viewport on load, you\'ve just delayed your LCP element for no reason.' },
      { type: 'ad' },
      { type: 'h2', text: 'What loading="lazy" Actually Does' },
      { type: 'p', html: 'Native lazy loading tells the browser not to fetch an image until it\'s within a certain distance from the viewport (typically 1000–1500px on fast connections, less on slow connections). This is beneficial for images that are off-screen on load — it reduces initial page weight and speeds up critical resource loading.' },
      { type: 'h2', text: 'The LCP Trap' },
      { type: 'p', html: 'LCP measures when the largest visible element becomes painted. If that element is an image with <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code>, the browser defers its fetch until after initial parsing, JavaScript execution, and layout — adding 200–800ms of avoidable delay on a typical page load. Google\'s own documentation flags this as a common mistake.' },
      { type: 'callout', kind: 'warning', text: 'Never add loading="lazy" to your LCP image. PageSpeed Insights will flag this directly. The hero banner, above-fold product photo, or any image visible on initial load should use loading="eager" (or omit the attribute — eager is the default).' },
      { type: 'code', lang: 'html', text: code`<!-- ✅ Correct: LCP image loads immediately -->
<img
  src="hero.webp"
  alt="Product hero"
  width="1200"
  height="630"
  fetchpriority="high"
  decoding="async"
>
<!-- No loading attribute = eager by default -->

<!-- ✅ Correct: below-fold images lazy load -->
<img
  src="product-2.webp"
  alt="Product detail"
  width="600"
  height="600"
  loading="lazy"
  decoding="async"
>

<!-- ❌ Wrong: LCP image deferred -->
<img src="hero.webp" loading="lazy" alt="Hero">` },
      { type: 'h2', text: 'The fetchpriority Attribute' },
      { type: 'p', html: '<code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">fetchpriority="high"</code> tells the browser\'s resource scheduler to prioritise this image over other resources at the same network priority. Use it on your LCP image — it\'s one of the most effective single-attribute LCP improvements available.' },
      { type: 'table', caption: 'loading and fetchpriority attribute guide by image position', headers: ['Image position', 'loading', 'fetchpriority', 'decoding', 'Why'], rows: [
        ['LCP / hero (above fold)', 'eager (default)', 'high', 'async', 'Fetch immediately; scheduler prioritises above other resources'],
        ['Above fold, not LCP', 'eager (default)', 'auto (default)', 'async', 'Load normally; don\'t delay with lazy'],
        ['Just below fold (1st scroll)', 'eager (default)', 'auto (default)', 'async', 'Preload scanner discovers early enough'],
        ['Well below fold', 'lazy', 'auto (default)', 'async', 'Defer until user scrolls near; reduces initial payload'],
        ['Hidden tabs / carousel', 'lazy', 'low', 'async', 'May never be seen; lowest priority'],
      ]},
      { type: 'h2', text: 'Correct Lazy Loading Strategy' },
      { type: 'ul', items: [
        '<strong>Above the fold:</strong> No <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading</code> attribute (eager default) + <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">fetchpriority="high"</code> on LCP image',
        '<strong>Second viewport (partially visible on scroll):</strong> No <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading</code> attribute — let the browser preload scanner discover naturally',
        '<strong>Below the fold:</strong> <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> — definite win',
        '<strong>In carousels/tabs not visible on load:</strong> <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code>',
      ]},
      { type: 'p', html: 'Even with perfect lazy loading, an oversized or poorly compressed LCP image will still fail Core Web Vitals. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Compress your hero image</a> first — then verify with PageSpeed Insights that lazy loading is correctly applied to only below-fold images.' },
    ],
  },
  {
    slug: 'lossy-vs-lossless-compression',
    title: 'Lossy vs. Lossless Compression: The Difference That Actually Matters',
    description: 'Lossy and lossless solve different problems. Knowing which one to use — and when switching between them destroys quality — is the most important compression decision you\'ll make.',
    date: '2026-05-02',
    category: 'technical',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Lossy and lossless compression solve different problems. Lossy trades a small amount of visual information for a large reduction in file size; lossless keeps every bit of data but saves much less space. Picking the wrong one for your use case either wastes bandwidth (unnecessary lossless) or permanently degrades an asset you needed to keep pristine.' },
      { type: 'ad' },
      { type: 'h2', text: 'Lossless Compression: Every Pixel Preserved' },
      { type: 'p', html: 'Lossless compression uses mathematical algorithms (DEFLATE, LZ77, Huffman coding) to represent the same pixel data more efficiently. A lossless-compressed image decompresses to exactly the original pixels — no information is discarded.' },
      { type: 'ul', items: [
        '<strong>PNG:</strong> Always lossless. Achieves good compression for graphics, limited compression for photographs.',
        '<strong>WebP lossless:</strong> Better compression than PNG for most images — typically 15–25% smaller.',
        '<strong>TIFF (LZW or ZIP compression):</strong> Professional-grade lossless, commonly used in photography and print workflows.',
        '<strong>JPEG 2000 (lossless mode):</strong> Rarely used in web contexts; common in medical imaging.',
      ]},
      { type: 'h2', text: 'Lossy Compression: Discard What the Eye Won\'t Miss' },
      { type: 'p', html: 'Lossy compression permanently removes data that psychovisual research suggests the human eye is unlikely to notice — primarily high-frequency detail and subtle colour variation. The removed data cannot be recovered. Once you save a lossy-compressed image, that information is gone.' },
      { type: 'ul', items: [
        '<strong>JPEG:</strong> Lossy DCT-based compression. Excellent for photographs, poor for screenshots and text.',
        '<strong>WebP (lossy):</strong> Better compression ratio than JPEG at equal quality. Good for photographs and mixed content.',
        '<strong>AVIF:</strong> Best compression ratio of the mainstream web formats. Slower encoding.',
        '<strong>Lossy PNG:</strong> Not natively lossy, but pngquant quantises the colour palette for significant size reduction.',
      ]},
      { type: 'callout', kind: 'warning', text: 'Converting a lossless PNG to JPEG is a one-way door. You permanently introduce compression artifacts. If you later need a clean version, you\'ll need the original PNG — a JPEG-derived PNG is lossless, but it\'s a lossless copy of an already-lossy encoding.' },
      { type: 'h2', text: 'The Generation Loss Problem' },
      { type: 'p', html: 'Every time you save a lossy image through another lossy encoder, artifacts compound. Opening a JPEG at quality 80, making a minor edit, and saving at quality 80 again produces a file noticeably worse than the original — even though you applied the same quality setting. This is <em>generation loss</em>.' },
      { type: 'code', lang: 'javascript', text: code`// Demonstration: why you shouldn't recompress the same JPEG
const originalBlob = /* your JPEG file */;

// First compression — acceptable quality loss
const compressed1 = await compressToBlob(originalBlob, 'image/jpeg', 0.80);
console.log('Pass 1 size:', compressed1.size); // e.g. 150 KB

// Second compression of the already-compressed output
const compressed2 = await compressToBlob(compressed1, 'image/jpeg', 0.80);
console.log('Pass 2 size:', compressed2.size); // e.g. 140 KB — barely smaller

// But quality is measurably worse — artifacts from pass 1 get re-quantised in pass 2
// The size saving is negligible; the quality loss is not.` },
      { type: 'table', caption: 'Lossy vs lossless — which to use and why', headers: ['Content type', 'Recommended mode', 'Format', 'Reason'], rows: [
        ['Photograph', 'Lossy', 'WebP or JPEG', 'Natural texture masks artifacts; 60–80% size saving'],
        ['Screenshot / UI', 'Lossless', 'PNG or WebP lossless', 'Hard edges and text must be pixel-exact'],
        ['Logo with transparency', 'Lossless or vector', 'SVG or PNG', 'No alpha in JPEG; artifacts destroy sharp edges'],
        ['Flat-colour illustration', 'Either — test both', 'WebP (try both modes)', 'Lossy WebP can beat PNG if detail allows'],
        ['Source for future editing', 'Lossless', 'TIFF or PNG', 'Generation loss compounds on every re-save'],
        ['Email attachment (photo)', 'Lossy', 'JPEG quality 80', 'WebP support in email clients is inconsistent'],
      ]},
      { type: 'h2', text: 'Choosing the Right Mode for Your Content' },
      { type: 'ul', items: [
        '<strong>Photographs → Lossy (JPEG or WebP):</strong> Natural texture masks artifacts; 60–80% size reduction',
        '<strong>Screenshots, UI graphics → Lossless (PNG or WebP lossless):</strong> Hard edges and text require exact pixel values',
        '<strong>Logos with transparency → Lossless PNG or SVG:</strong> Never JPEG — no alpha support, artifacts on sharp edges',
        '<strong>Illustrations with flat colour → Lossy WebP or PNG:</strong> Depends on complexity; test both',
        '<strong>Images you\'ll edit again → Lossless (TIFF, PNG):</strong> Preserve originals; apply lossy only at final export',
      ]},
      { type: 'p', html: 'Our <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image compressor</a> selects the appropriate compression model per format — lossy for JPEG and WebP, lossless quantisation (pngquant) for PNG. Use the format selector to choose the right output for your content type.' },
    ],
  },
  {
    slug: 'trust-online-image-compression-tools',
    title: 'Should You Trust Online Image Compression Tools With Your Photos?',
    description: 'Free online tools are convenient — but many upload your files to servers you know nothing about. How to verify whether a tool is actually safe.',
    date: '2026-05-03',
    category: 'privacy',
    readingTime: 5,
    relatedTool: { label: 'Remove Image Metadata', href: '/remove-metadata' },
    body: [
      { type: 'p', html: 'Free online image compressors are used heavily because they\'re quick and require no install. The files being processed often contain GPS coordinates, timestamps, device information, and identifiable faces — all of which travel to a server when the tool isn\'t genuinely client-side. Most users never verify this.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Core Trust Question: Where Does Processing Happen?' },
      { type: 'p', html: 'There are only two options: your browser or a remote server. A tool that processes on a server requires your file to travel over the internet to infrastructure controlled by a third party. A tool that processes in your browser never sends the file anywhere — it stays in your computer\'s memory.' },
      { type: 'p', html: 'Many tools claim to be "browser-based" or "no upload required" while actually uploading files to a server. The claim is not always accurate, and verifying it takes thirty seconds.' },
      { type: 'h2', text: 'How to Verify Any Tool in 30 Seconds' },
      { type: 'ol', items: [
        'Open the tool in Chrome or Firefox',
        'Open Developer Tools (F12) → Network tab',
        'Filter requests by "Fetch/XHR" or "All"',
        'Drop a file into the tool',
        'Watch the Network tab for any outbound request with a large payload (matching your file size)',
      ]},
      { type: 'callout', kind: 'tip', text: 'The file size is your fingerprint. If your image is 3 MB and you see a network request with ~3 MB of data transfer immediately after dropping the file, that file was uploaded — regardless of what the tool claims.' },
      { type: 'h2', text: 'Red Flags in Tool Design' },
      { type: 'ul', items: [
        'A progress bar with a "Uploading..." step before "Processing..."',
        'A delay that correlates with your internet speed (local processing is CPU-bound, not network-bound)',
        'A URL in the result that points to their CDN domain, not a local blob:// URL',
        'A "Files are deleted after X hours" notice — this confirms server storage',
        '"Secure upload" badges — legitimate local tools never need to mention upload security',
      ]},
      { type: 'h2', text: 'What Server-Side Tools Know About You' },
      { type: 'ul', items: [
        'Your IP address (and approximate location)',
        'The filename of every file you process',
        'The content of the file — including EXIF metadata with GPS coordinates',
        'Browser fingerprint and User-Agent',
        'Usage patterns: what kinds of files you process, at what times',
      ]},
      { type: 'h2', text: 'When Server-Side Is Acceptable' },
      { type: 'p', html: 'Not all server-side tools are untrustworthy. Large providers with published privacy policies, data processing agreements, and audited infrastructure (Adobe, Google, Microsoft) have legal accountability for how they handle your data. The risk calculus is different for a well-funded tool with a public company behind it versus an anonymous "free online converter" with no identifiable owner.' },
      { type: 'h2', text: 'The Metadata Problem' },
      { type: 'p', html: 'Even if a server-side tool deletes your file after processing, the EXIF metadata in your image reveals real-world information before deletion. GPS coordinates from a photo of a document taken at home reveal your home address. The metadata transmission happens the moment the file is uploaded — deletion afterward doesn\'t undo the exposure.' },
      { type: 'p', html: 'Tools like ImagePDF.Tools process entirely in-browser. Verify it yourself: open DevTools → Network, drop an image, and confirm zero outbound file data. Then use the <a href="/remove-metadata" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">metadata remover</a> to strip EXIF before sharing images publicly.' },
    ],
  },
  {
    slug: 'progressive-jpegs-optimization',
    title: 'Progressive JPEGs: The Forgotten Optimization That Still Matters',
    description: 'Progressive JPEG encoding makes images appear to load faster by showing a low-quality preview first. It\'s been around for decades but remains underused in 2026.',
    date: '2026-05-03',
    category: 'performance',
    readingTime: 4,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Even with compression, dimensions, and a CDN all in order, a hero image can still feel sluggish on first paint. One of the cheapest fixes for this is also one of the oldest: encoding the JPEG in progressive mode. Progressive JPEGs display a blurry full-frame preview almost immediately, then refine in passes as more data arrives — unlike baseline JPEGs, which paint top-to-bottom as bytes stream in.' },
      { type: 'ad' },
      { type: 'h2', text: 'Baseline vs. Progressive JPEG: What\'s the Difference?' },
      { type: 'p', html: 'A <strong>baseline JPEG</strong> stores image data sequentially — top row to bottom row. The browser paints it from top to bottom as bytes arrive. On a slow connection, you see the top portion of the image while the bottom remains blank.' },
      { type: 'p', html: 'A <strong>progressive JPEG</strong> stores the image in multiple scans: the first scan contains a low-resolution version of the entire image; subsequent scans add progressively more detail. The browser can display the entire image at low quality almost immediately, then improve it as more data arrives.' },
      { type: 'callout', kind: 'info', text: 'Progressive JPEG is a perceptual optimisation, not a size optimisation. It doesn\'t change the final file size significantly, but it makes images feel faster by showing content earlier. For large above-fold images on slow connections, this is a meaningful UX improvement.' },
      { type: 'h2', text: 'File Size: Does Progressive Encode Smaller?' },
      { type: 'p', html: 'For large images (above ~10 KB): progressive typically saves 2–8% file size compared to baseline at the same quality. For small images (thumbnails, icons): baseline is sometimes smaller. The crossover point is roughly 10 KB — below that, use baseline; above, progressive is usually worth it.' },
      { type: 'h2', text: 'How to Create Progressive JPEGs' },
      { type: 'code', lang: 'bash', text: code`# ImageMagick — convert existing JPEG to progressive
convert input.jpg -interlace Plane output-progressive.jpg

# cjpeg (libjpeg) — encode with progressive flag
cjpeg -progressive -quality 80 -outfile output.jpg input.ppm

# jpegtran — losslessly re-encode existing JPEG as progressive (no quality change)
jpegtran -progressive -copy none input.jpg output.jpg

# Verify progressive encoding:
identify -verbose output.jpg | grep Interlace
# Should output: Interlace: Plane (for progressive)` },
      { type: 'h2', text: 'When Progressive JPEGs Are Worth It' },
      { type: 'ul', items: [
        '<strong>Hero images over 100 KB:</strong> High benefit — visible improvement on 3G and congested WiFi',
        '<strong>Article images in long-form content:</strong> Medium benefit — users scroll down as images load',
        '<strong>Product photos on e-commerce:</strong> Medium benefit — product discovery happens while detail loads',
        '<strong>Thumbnails under 20 KB:</strong> Low benefit — images load fast enough that the progressive effect isn\'t perceptible',
      ]},
      { type: 'h2', text: 'Browser and CDN Support' },
      { type: 'p', html: 'All modern browsers support progressive JPEG decoding. However, not all CDNs preserve the interlace flag when transcoding. Cloudinary, Imgix, and Cloudflare Images all support progressive encoding as a parameter — check your CDN\'s documentation if images are being processed at delivery time.' },
      { type: 'p', html: 'The most impactful improvement for any hero image is still compression level and file size. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Compress your images first</a>, then consider progressive encoding for images that are still over 100 KB after compression.' },
    ],
  },
  {
    slug: 'responsive-images-guide',
    title: 'Responsive Images: Stop Serving Desktop Photos to Phone Screens',
    description: 'A single <img> tag serving one resolution to every device is one of the most wasteful patterns on the web. srcset and sizes fix this in one step.',
    date: '2026-05-04',
    category: 'performance',
    readingTime: 5,
    relatedTool: { label: 'Resize Image', href: '/resize-image' },
    body: [
      { type: 'p', html: 'A photography portfolio can look great on a desktop, where the connection is fast and the screen is wide, and still take over ten seconds to load on a phone. The usual cause is a plain <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;img&gt;</code> tag serving one full-resolution image to every device. The phone downloads a 1800×1200px image and renders it at 390×260px — wasting 95% of the bytes transferred.' },
      { type: 'ad' },
      { type: 'h2', text: 'The Problem with a Single src' },
      { type: 'p', html: 'When you write <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;img src="photo.jpg"&gt;</code>, every browser on every device downloads the same file. A 2 MB image works fine on a desktop with a fast connection and a 1920px display. On a 390px phone screen over 4G, that same 2 MB image loads in 3–5 seconds before anything is displayed — and only 5% of those pixels are visible.' },
      { type: 'h2', text: 'srcset and sizes: The Native Solution' },
      { type: 'p', html: 'The <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">srcset</code> attribute tells the browser which image files are available at which widths. The <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">sizes</code> attribute tells the browser how wide the image will render at different viewport widths. The browser combines this information with the current viewport width and device pixel ratio to download exactly the right file.' },
      { type: 'code', lang: 'html', text: code`<!-- Provide three source widths; browser picks the right one -->
<img
  src="photo-800w.jpg"
  srcset="
    photo-400w.jpg  400w,
    photo-800w.jpg  800w,
    photo-1600w.jpg 1600w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    800px
  "
  alt="Product photo"
  width="800"
  height="533"
  loading="lazy"
>
<!--
  sizes explanation:
  - On screens under 600px: image is 100% of viewport width
  - On screens 600–1200px: image is 50% of viewport width
  - On larger screens: image is 800px wide (fixed)
  The browser multiplies by devicePixelRatio to select the source.
-->` },
      { type: 'h2', text: 'Generating the Size Variants' },
      { type: 'code', lang: 'bash', text: code`# Generate multiple sizes with ImageMagick
convert photo.jpg -resize 400x  photo-400w.jpg
convert photo.jpg -resize 800x  photo-800w.jpg
convert photo.jpg -resize 1600x photo-1600w.jpg

# Then compress each to target quality:
# mogrify -quality 80 photo-400w.jpg photo-800w.jpg photo-1600w.jpg

# Or use a build-time tool like sharp (Node.js):
# sharp('photo.jpg').resize(400).toFile('photo-400w.webp')` },
      { type: 'table', caption: 'Responsive image size variants — recommended widths and typical file sizes', headers: ['Variant', 'Width', 'Typical file size (WebP q75)', 'Used for'], rows: [
        ['xs', '400px', '20–60 KB', 'Mobile portrait, thumbnails'],
        ['sm', '800px', '60–150 KB', 'Tablet, half-width desktop'],
        ['md', '1200px', '120–300 KB', 'Full-width desktop (standard)'],
        ['lg', '1600px', '200–500 KB', 'Retina / 2× DPR desktop'],
        ['xl', '2400px', '400–900 KB', 'Hero image for large monitors'],
      ]},
      { type: 'callout', kind: 'tip', text: 'For most websites, three sizes are enough: ~400px (mobile), ~800px (tablet), ~1600px (desktop). More variants improve precision marginally but multiply storage and build time.' },
      { type: 'h2', text: 'WebP with JPEG Fallback via picture' },
      { type: 'code', lang: 'html', text: code`<picture>
  <source
    type="image/webp"
    srcset="photo-400w.webp 400w, photo-800w.webp 800w, photo-1600w.webp 1600w"
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >
  <img
    src="photo-800w.jpg"
    srcset="photo-400w.jpg 400w, photo-800w.jpg 800w, photo-1600w.jpg 1600w"
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
    alt="Product photo"
    width="800" height="533"
    loading="lazy"
  >
</picture>` },
      { type: 'h2', text: 'Framework Shortcuts' },
      { type: 'ul', items: [
        '<strong>Next.js:</strong> <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;Image&gt;</code> component handles srcset, sizes, WebP conversion, and lazy loading automatically',
        '<strong>Nuxt.js:</strong> <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">nuxt/image</code> module provides the same',
        '<strong>Astro:</strong> Built-in <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;Image&gt;</code> and <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">&lt;Picture&gt;</code> components with automatic optimisation',
        '<strong>Cloudinary / Imgix:</strong> CDN-level responsive images via URL parameters — no build step required',
      ]},
      { type: 'p', html: 'Before adding srcset, make sure each size variant is properly compressed. Use our <a href="/resize-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">image resizer</a> to generate the right dimensions, then <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">compress each variant</a> before deploying.' },
    ],
  },
  {
    slug: 'shopify-image-optimization',
    title: 'Shopify Image Optimization: What the Platform Does (and Doesn\'t Do) For You',
    description: "Shopify serves WebP automatically and has a CDN — but it won't resize a 14MB banner or fix an unoptimised product grid. Here's what you still need to do manually.",
    date: '2026-05-04',
    category: 'productivity',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Shopify stores are often blamed on a "heavy theme" when the real cause is a single collection banner uploaded at 8000×5000 pixels and 14 MB. Shopify will happily serve that file to every visitor\'s phone. The platform does a lot for image delivery — but not everything.' },
      { type: 'ad' },
      { type: 'h2', text: 'What Shopify Does Automatically' },
      { type: 'ul', items: [
        '<strong>WebP serving:</strong> Shopify\'s CDN automatically serves WebP to browsers that support it — without any action from you',
        '<strong>Global CDN:</strong> All images are served from Shopify\'s Fastly CDN — low latency globally',
        '<strong>Thumbnail generation:</strong> Shopify generates multiple sizes (100px, 160px, 240px, 480px, 640px, 1024px, 2048px) from your uploaded image',
        '<strong>Lazy loading:</strong> Most themes apply <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> to product images',
      ]},
      { type: 'h2', text: 'What Shopify Does NOT Do' },
      { type: 'ul', items: [
        '<strong>Shopify won\'t refuse an oversized upload</strong> — a 15 MB, 8000×5000px image uploads successfully',
        '<strong>Shopify won\'t fix a poor quality source</strong> — if you upload a blurry, over-compressed JPEG, the CDN serves a blurry, over-compressed image',
        '<strong>Shopify won\'t add fetchpriority="high" to your LCP image</strong> — theme code controls this; most themes don\'t do it',
        '<strong>Shopify won\'t strip EXIF metadata</strong> — GPS coordinates, device info, and timestamps are preserved',
      ]},
      { type: 'callout', kind: 'warning', text: 'Shopify\'s largest generated size is 2048px. Uploading a 6000px image gives you no more display quality than a 2048px upload — but the 6000px version is stored in full and the processing time is longer. Always upload at 2048px or below.' },
      { type: 'h2', text: 'The LCP Problem on Shopify Stores' },
      { type: 'p', html: 'The LCP element on most Shopify stores is the hero banner or the first product image. Common LCP failures:' },
      { type: 'ul', items: [
        'Banner image uploaded at 4000×2000px — Shopify CDN serves a large file even at 2× size',
        '<code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> on the hero — deferred fetch delays LCP',
        'No <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">fetchpriority="high"</code> on the hero image',
        'Banner served as full-width 1920px image on a 390px phone screen',
      ]},
      { type: 'h2', text: 'Practical Shopify Image Checklist' },
      { type: 'ol', items: [
        '<strong>Banner/hero images:</strong> Upload at exactly 1920×600px (standard banner) or 2048px max, compressed to under 300 KB',
        '<strong>Product main image:</strong> 2048×2048px, JPEG quality 80, under 400 KB',
        '<strong>Product gallery:</strong> Same as main — Shopify generates thumbnails from the same source',
        '<strong>Collection page images:</strong> Shopify renders these at ~450px — a 1200px source is plenty; aim for 100–200 KB',
        '<strong>Strip metadata before upload:</strong> Remove GPS, device info, and timestamps',
      ]},
      { type: 'code', lang: 'liquid', text: code`{%- comment -%}
  Add fetchpriority="high" to the LCP hero image in your theme:
{%- endcomment -%}
{%- if section.index == 1 -%}
  {%- assign fetchpriority = "high" -%}
  {%- assign loading = "eager" -%}
{%- else -%}
  {%- assign fetchpriority = "auto" -%}
  {%- assign loading = "lazy" -%}
{%- endif -%}

<img
  src="{{ image | image_url: width: 1920 }}"
  loading="{{ loading }}"
  fetchpriority="{{ fetchpriority }}"
  width="1920" height="600"
  alt="{{ image.alt }}"
>` },
      { type: 'p', html: 'Before uploading to Shopify: resize banner images to 1920px wide and product images to 2048×2048px, then compress to under 400 KB. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Compress your product images here</a> — everything happens in your browser, nothing is uploaded.' },
    ],
  },
  {
    slug: 'images-slowest-thing-on-your-website',
    title: 'Your Images Are Probably the Slowest Thing on Your Website',
    description: "When a page feels slow, developers look at JavaScript first. The real bottleneck is almost always the media library. Here's how to diagnose and fix it.",
    date: '2026-05-05',
    category: 'performance',
    readingTime: 5,
    relatedTool: { label: 'Compress Image', href: '/compress-image' },
    body: [
      { type: 'p', html: 'Developers usually look at code first when a page feels slow, but the bottleneck is more often in the media library. A homepage that takes over four seconds to load frequently has perfectly fine HTML, CSS, and JavaScript — the problem is a hero image at 3 MB, a product grid with twelve 800 KB PNGs, and a background pattern served as an unoptimised high-resolution JPEG.' },
      { type: 'ad' },
      { type: 'h2', text: 'How to Confirm Images Are the Bottleneck' },
      { type: 'p', html: 'Open Chrome DevTools → Network tab → reload the page. Sort by "Size" column (descending). If the top five entries are images, you\'ve found your problem. Check the "Waterfall" column — images that start loading late or block other resources are structural issues, not just size issues.' },
      { type: 'code', lang: 'javascript', text: code`// In the browser console — list all images by transferred size
performance.getEntriesByType('resource')
  .filter(e => e.initiatorType === 'img' || e.name.match(/\.(jpg|jpeg|png|webp|avif|gif)/i))
  .sort((a, b) => b.transferSize - a.transferSize)
  .slice(0, 10)
  .forEach(e => {
    console.log(
      Math.round(e.transferSize / 1024) + ' KB',
      e.name.split('/').pop(),
      Math.round(e.duration) + 'ms'
    );
  });` },
      { type: 'h2', text: 'The Three Most Common Image Performance Problems' },
      { type: 'h3', text: '1. Oversized Source Images' },
      { type: 'p', html: 'A 4000×3000px image displayed at 400×300px wastes 100× the memory and roughly 10× the bandwidth. Resize to display dimensions. The browser does not do this automatically — it downloads the full-resolution source regardless of how small the CSS renders it.' },
      { type: 'h3', text: '2. Wrong Format for Content Type' },
      { type: 'p', html: 'PNG for photographs is typically 3–5× larger than equivalent-quality JPEG, and 4–7× larger than WebP. PNG is correct for screenshots, logos with transparency, and pixel art. For everything else, JPEG or WebP saves significant bandwidth.' },
      { type: 'h3', text: '3. No Lazy Loading Below the Fold' },
      { type: 'p', html: 'Without lazy loading, every image on the page — including those 5 scrolls down — is downloaded on initial page load, competing with critical above-fold resources. <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> defers off-screen images until the user scrolls toward them.' },
      { type: 'callout', kind: 'tip', text: 'A PageSpeed Insights audit identifies image-specific issues with exact file names and size savings. Run it on your homepage before manually hunting for problems — it will tell you exactly which images to address first.' },
      { type: 'h2', text: 'The Correct Optimisation Order' },
      { type: 'ol', items: [
        '<strong>Right-size:</strong> Resize images to display dimensions — this has the largest impact',
        '<strong>Right-format:</strong> Switch photographs from PNG to WebP or JPEG',
        '<strong>Compress:</strong> Apply lossy compression at quality 75–80 for photos',
        '<strong>Lazy load:</strong> Add <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">loading="lazy"</code> to all below-fold images',
        '<strong>Preload:</strong> Add <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">fetchpriority="high"</code> to the LCP image',
      ]},
      { type: 'h2', text: 'Measuring the Impact' },
      { type: 'p', html: 'After making changes, measure with PageSpeed Insights (real-user Chrome data) rather than just Lighthouse. The "Largest Contentful Paint" score and the "Total Blocking Time" score are the most meaningful metrics. Image optimisation typically improves LCP by 0.5–2 seconds and Performance score by 10–25 points on image-heavy pages.' },
      { type: 'h2', text: 'Quick Audit for Any Website' },
      { type: 'ul', items: [
        'Run <strong>PageSpeed Insights</strong> → check "Opportunities" for image-specific items',
        'Open <strong>DevTools → Network</strong> → sort by Size → find images over 200 KB',
        'Check your <strong>LCP element</strong> — is it an image? Is it lazy-loaded? Does it have <code class="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">fetchpriority="high"</code>?',
        'Use the <strong>Coverage tab</strong> in DevTools to see which images are in the initial viewport',
      ]},
      { type: 'p', html: 'Start with your largest images first — the ones in the top five by transferred size. Compress and right-size those, then re-run PageSpeed Insights to measure the improvement. <a href="/compress-image" class="text-violet-600 dark:text-violet-400 hover:underline font-medium">Compress your images here</a> — no upload, no account.' },
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
