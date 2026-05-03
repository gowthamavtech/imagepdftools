import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
  description:
    'Free private image compressor & converter online — JPEG, PNG, WebP, PDF. No-upload image tools powered by WebAssembly. Files never leave your browser. 100% secure.',
  keywords: [
    'image compressor',
    'compress image online',
    'compress PDF online',
    'free image tools',
    'reduce image size',
    'convert image to webp',
    'resize image online',
    'crop image online',
    'png compressor',
    'jpeg compressor',
    'image to pdf',
    'browser image tools',
  ],
  alternates: { canonical: 'https://imagepdf.tools' },
  openGraph: {
    type: 'website',
    url: 'https://imagepdf.tools',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description:
      'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads, no account, 100% private.',
    siteName: 'ImagePDF.Tools',
    images: [
      {
        url: 'https://imagepdf.tools/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImagePDF.Tools — Free Image & PDF Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImagePDF.Tools — Free Image & PDF Tools Online',
    description:
      'Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads required.',
    images: ['https://imagepdf.tools/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ImagePDF.Tools',
    url: 'https://imagepdf.tools',
    description: 'Free browser-based image and PDF tools. No uploads required.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://imagepdf.tools/image-tools' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ImagePDF.Tools',
    url: 'https://imagepdf.tools',
    logo: 'https://imagepdf.tools/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@imagepdf.tools',
      contactType: 'customer support',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Image & PDF Tools',
    description: 'Browser-based image and PDF tools — no uploads required.',
    numberOfItems: 19,
    itemListElement: [
      { '@type': 'ListItem', position: 1,  name: 'Compress Image',    url: 'https://imagepdf.tools/compress-image' },
      { '@type': 'ListItem', position: 2,  name: 'Compress PNG',      url: 'https://imagepdf.tools/compress-png-online' },
      { '@type': 'ListItem', position: 3,  name: 'Compress JPEG',     url: 'https://imagepdf.tools/compress-jpeg-online' },
      { '@type': 'ListItem', position: 4,  name: 'Reduce Image Size', url: 'https://imagepdf.tools/reduce-image-size' },
      { '@type': 'ListItem', position: 5,  name: 'Convert to WebP',   url: 'https://imagepdf.tools/convert-image-to-webp' },
      { '@type': 'ListItem', position: 6,  name: 'PNG to JPG',        url: 'https://imagepdf.tools/convert-png-to-jpeg' },
      { '@type': 'ListItem', position: 7,  name: 'JPG to PNG',        url: 'https://imagepdf.tools/jpg-to-png' },
      { '@type': 'ListItem', position: 8,  name: 'WebP to JPG',       url: 'https://imagepdf.tools/webp-to-jpg' },
      { '@type': 'ListItem', position: 9,  name: 'JPG to WebP',       url: 'https://imagepdf.tools/jpg-to-webp' },
      { '@type': 'ListItem', position: 10, name: 'PNG to WebP',       url: 'https://imagepdf.tools/png-to-webp' },
      { '@type': 'ListItem', position: 11, name: 'WebP to PNG',       url: 'https://imagepdf.tools/webp-to-png' },
      { '@type': 'ListItem', position: 12, name: 'Crop Image',        url: 'https://imagepdf.tools/crop-image' },
      { '@type': 'ListItem', position: 13, name: 'Resize Image',      url: 'https://imagepdf.tools/resize-image' },
      { '@type': 'ListItem', position: 14, name: 'Flip Image',        url: 'https://imagepdf.tools/flip-image' },
      { '@type': 'ListItem', position: 15, name: 'Rotate Image',      url: 'https://imagepdf.tools/rotate-image' },
      { '@type': 'ListItem', position: 16, name: 'Remove Metadata',   url: 'https://imagepdf.tools/remove-metadata' },
      { '@type': 'ListItem', position: 17, name: 'Metadata Editor',   url: 'https://imagepdf.tools/metadata-editor' },
      { '@type': 'ListItem', position: 18, name: 'Compress PDF',      url: 'https://imagepdf.tools/compress-pdf' },
      { '@type': 'ListItem', position: 19, name: 'Image to PDF',      url: 'https://imagepdf.tools/image-to-pdf' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these image and PDF tools really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All core tools — compress, convert, crop, resize, flip, rotate, and remove metadata — are permanently free with no account required. A Pro plan unlocks batch export and an ad-free experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you upload my images or PDFs to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device — no server ever sees them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ImagePDF.Tools supports JPEG, PNG, WebP, and SVG for compression. Conversion tools cover JPEG ↔ PNG ↔ WebP. PDF tools support standard PDF files and JPEG/PNG/WebP input for Image to PDF.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can I compress an image?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Compression results vary by image and format. JPEG and WebP can typically be reduced by 60–80% at quality 80. PNG uses pngquant lossy quantisation for 40–70% reduction. You can fine-tune the quality slider to balance file size and visual quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this work on mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All tools work on mobile browsers — Chrome, Safari, Firefox, and Edge on iOS and Android. No app download is needed.',
        },
      },
    ],
  },
];

const IMAGE_GROUPS = [
  {
    label: 'Compress',
    color: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
    hoverShadow: 'hover:shadow-violet-100 dark:hover:shadow-violet-900/20',
    tools: [
      {
        href: '/compress-image', label: 'Image Compressor',
        desc: 'Compress PNG, JPG, and WebP images up to 80% smaller. Your files never leave your device.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/compress-png-online', label: 'PNG Compressor',
        desc: 'Reduce PNG file size with lossy quantisation — up to 70% smaller, fully in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/compress-jpeg-online', label: 'JPEG Compressor',
        desc: 'Shrink JPEG files with fine-grained quality control. Fast, private, free — nothing uploaded.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      },
      {
        href: '/reduce-image-size', label: 'Reduce Image Size',
        desc: 'Reduce any image format to a target file size — JPEG, PNG, WebP, or SVG.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />,
      },
    ],
  },
  {
    label: 'Convert',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    hoverShadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/20',
    tools: [
      {
        href: '/convert-image-to-webp', label: 'Convert to WebP',
        desc: 'Convert JPEG, PNG, or any image to WebP — the modern format with smaller file sizes.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/convert-png-to-jpeg', label: 'PNG to JPG',
        desc: 'Convert PNG images to JPEG format instantly — right in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/jpg-to-png', label: 'JPG to PNG',
        desc: 'Convert JPEG to lossless PNG with transparency support — no quality loss.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/webp-to-jpg', label: 'WebP to JPG',
        desc: 'Convert WebP images to JPEG for maximum compatibility — all in your browser.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/jpg-to-webp', label: 'JPG to WebP',
        desc: 'Convert JPEG to modern WebP — up to 35% smaller at the same visual quality.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/png-to-webp', label: 'PNG to WebP',
        desc: 'Shrink PNG files by up to 50% converting to WebP — transparency preserved.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/webp-to-png', label: 'WebP to PNG',
        desc: 'Convert WebP to lossless PNG — full quality, transparency, universal compatibility.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/convert/svg-to-png', label: 'SVG to PNG',
        desc: 'Rasterise SVG to a fixed-size PNG — perfect for apps, emails, and platforms that need a bitmap.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/convert/svg-to-jpg', label: 'SVG to JPG',
        desc: 'Convert SVG to JPEG for documents, emails, or platforms that require a standard photo format.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
      {
        href: '/convert/svg-to-webp', label: 'SVG to WebP',
        desc: 'Convert SVG to modern WebP — smaller than PNG, great for web use with broad browser support.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
      },
    ],
  },
  {
    label: 'Edit',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    hoverShadow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20',
    tools: [
      {
        href: '/resize-image', label: 'Image Resizer',
        desc: 'Resize images to exact dimensions or percentages — right in your browser. Maintain aspect ratio or set custom size.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />,
      },
      {
        href: '/crop-image', label: 'Image Cropper',
        desc: 'Crop images to any size — right in your browser. Drag to select the area you want, or choose a preset aspect ratio.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
      },
      {
        href: '/flip-image', label: 'Flip Image',
        desc: 'Mirror your image horizontally or vertically in one click — browser-based, instant.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.657 48.657 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />,
      },
      {
        href: '/rotate-image', label: 'Rotate Image',
        desc: 'Rotate 90°, 180°, 270°, or any custom angle — fix EXIF orientation issues instantly.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
      },
      {
        href: '/remove-metadata', label: 'Remove Metadata',
        desc: 'Strip EXIF GPS location, camera data, and private info from images before sharing.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z" />,
      },
      {
        href: '/metadata-editor', label: 'Metadata Editor',
        desc: 'View and edit EXIF metadata in your images — camera settings, GPS, timestamps and more.',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
      },
    ],
  },
];

const PDF_TOOLS = [
  {
    href: '/compress-pdf', label: 'Compress PDF',
    desc: 'Shrink PDF file size without quality loss — fully processed in your browser, nothing uploaded.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />,
  },
  {
    href: '/image-to-pdf', label: 'Image to PDF',
    desc: 'Bundle multiple JPEG, PNG, or WebP images into a single PDF — right in your browser.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
  },
];

const FEATURES = [
  {
    icon: '🔒',
    title: 'Zero Uploads',
    desc: 'Every tool runs entirely inside your browser tab. Your files never leave your device — no server ever sees them.',
  },
  {
    icon: '⚡',
    title: 'Instant Processing',
    desc: 'Compression happens on your CPU using WebAssembly and the Canvas API. No waiting for a server response.',
  },
  {
    icon: '🆓',
    title: 'Free Forever',
    desc: 'Core tools are permanently free with no account required. Pro unlocks batch export and ad-free experience.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    desc: 'All tools work on desktop and mobile — Chrome, Safari, Firefox, Edge. No app download needed.',
  },
];

const FAQS = [
  {
    q: 'Are these image and PDF tools really free?',
    a: 'Yes. All core tools — compress, convert, crop, resize, flip, rotate, and remove metadata — are permanently free with no account required. A Pro plan unlocks batch export and an ad-free experience.',
  },
  {
    q: 'Do you upload my images or PDFs to a server?',
    a: 'No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device — no server ever sees them.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'JPEG, PNG, WebP, and SVG for compression. Conversion tools cover JPEG ↔ PNG ↔ WebP. PDF tools support standard PDFs and JPEG/PNG/WebP input for Image to PDF.',
  },
  {
    q: 'How much can I compress an image?',
    a: 'JPEG and WebP typically reduce by 60–80% at quality 80. PNG uses pngquant lossy quantisation for 40–70% reduction. You can fine-tune the quality slider to balance size and quality.',
  },
  {
    q: 'Does this work on mobile?',
    a: 'Yes. All tools work on mobile browsers — Chrome, Safari, Firefox, and Edge on iOS and Android. No app download is needed.',
  },
];

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-4 pt-14 sm:pt-20 pb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            No upload &middot; 100% private &middot; Always free
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Compress Images &amp; PDFs Online
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-linear-to-r from-violet-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Free · Instant · No Upload Needed
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            The fastest way to compress JPEG, PNG, and WebP images online — reduce file size by up to 90% without losing quality.
            Also compress PDFs, convert image formats, crop, resize, rotate, and remove metadata.
            Everything runs in your browser. Nothing is ever uploaded.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Link
              href="/compress-image"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
              </svg>
              Compress Image Free
            </Link>
            <Link
              href="/compress-pdf"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Compress PDF Free
            </Link>
          </div>

          {/* ── Privacy Trust Bar ── */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-4 bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/50 rounded-2xl px-5 py-3.5 shadow-sm shadow-slate-200/60 dark:shadow-black/20">
              {/* Laptop + shield badge icon */}
              <div className="relative shrink-0">
                <svg className="w-9 h-9 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              {/* Copy */}
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider leading-none mb-1">
                  Zero-Server Processing
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  Files processed locally via <span className="font-semibold text-slate-700 dark:text-slate-300">WebAssembly</span> — no data ever touches our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-14">
            {[
              { value: '20+',  label: 'Free Tools' },
              { value: '100%', label: 'Private' },
              { value: '0',    label: 'Uploads Ever' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-violet-500 dark:text-violet-400">{value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Image Tools ── */}
        <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="Image tools">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Image Tools</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Compress, convert, and edit — all in your browser</p>
            </div>
            <Link href="/image-tools" className="shrink-0 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 border border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/30 px-3 py-1.5 rounded-lg transition-colors">
              View all →
            </Link>
          </div>

          <div className="space-y-8">
            {IMAGE_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${group.color}`}>{group.label}</span>
                  <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group flex items-start gap-4 p-5 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${group.hoverBorder}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${group.iconBg}`}>
                        <svg className={`w-5 h-5 ${group.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          {tool.icon}
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug mb-1">
                          {tool.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PDF Tools ── */}
        <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="PDF tools">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">PDF Tools</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Compress and build PDFs without any upload</p>
            </div>
            <Link href="/pdf-tools" className="shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PDF_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    {tool.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug mb-1">
                    {tool.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40" aria-label="Why ImagePDF.Tools">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center mb-2">
              Why ImagePDF.Tools?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-10">
              Built differently from every other online file tool.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-1.5">{f.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 py-14" aria-label="Frequently asked questions">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-10">
            Everything you need to know about ImagePDF.Tools.
          </p>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">{q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="max-w-5xl mx-auto px-4 pb-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Start compressing for free
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            No sign-up. No download. Just open a tool and go.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/compress-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Compress Image
            </Link>
            <Link href="/compress-pdf" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Compress PDF
            </Link>
            <Link href="/convert-image-to-webp" className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-500 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Convert to WebP
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
