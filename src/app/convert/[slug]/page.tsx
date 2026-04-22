import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompressorUI } from '@/components/CompressorUI';

/* ── Conversion config ─────────────────────────────────────────────────── */

interface ConversionConfig {
  from: string;      // display label  e.g. "PNG"
  to: string;        // display label  e.g. "JPEG"
  toMime: string;    // output MIME    e.g. "image/jpeg"
  why: string;       // one-liner explaining why you'd do this
}

export const CONVERSIONS: Record<string, ConversionConfig> = {
  'png-to-jpeg': {
    from: 'PNG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'JPEGs are up to 80% smaller than PNGs for photos — great for web pages, email attachments, and social media.',
  },
  'png-to-jpg': {
    from: 'PNG', to: 'JPG', toMime: 'image/jpg',
    why: 'JPGs are up to 80% smaller than PNGs for photos — great for web pages, email attachments, and social media.',
  },
  'jpeg-to-png': {
    from: 'JPEG', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless and supports transparency — ideal for logos, icons, and screenshots that need a crisp, clean look.',
  },
  'jpg-to-png': {
    from: 'JPG', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless and supports transparency — ideal for logos, icons, and screenshots that need a crisp, clean look.',
  },
  'png-to-webp': {
    from: 'PNG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP gives you smaller files than PNG while keeping transparency support — the modern choice for web images.',
  },
  'jpeg-to-webp': {
    from: 'JPEG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP beats JPEG by 25–35% in file size at the same visual quality — perfect for faster-loading web pages.',
  },
  'jpg-to-webp': {
    from: 'JPG', to: 'WebP', toMime: 'image/webp',
    why: 'WebP beats JPG by 25–35% in file size at the same visual quality — perfect for faster-loading web pages.',
  },
  'webp-to-jpeg': {
    from: 'WebP', to: 'JPEG', toMime: 'image/jpeg',
    why: 'JPEG is universally supported — convert WebP when you need a file that works in every app and OS.',
  },
  'webp-to-jpg': {
    from: 'WebP', to: 'JPG', toMime: 'image/jpg',
    why: 'JPG is universally supported — convert WebP when you need a file that works in every app and OS.',
  },
  'webp-to-png': {
    from: 'WebP', to: 'PNG', toMime: 'image/png',
    why: 'PNG is lossless — convert WebP to PNG when you need to edit the image without any quality degradation.',
  },
  'jpg-to-jpeg': {
    from: 'JPG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'Rename your .jpg file to the standard .jpeg extension — same format, broader compatibility with some tools.',
  },
  'jpeg-to-jpg': {
    from: 'JPEG', to: 'JPG', toMime: 'image/jpg',
    why: 'Save as .jpg — the shorter extension used by most cameras and Windows apps.',
  },
  'svg-to-png': {
    from: 'SVG', to: 'PNG', toMime: 'image/png',
    why: 'Rasterise SVG to a fixed-size PNG when you need a bitmap for apps, presentations, or platforms that don\'t support SVG.',
  },
};

/* ── Static params ─────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(CONVERSIONS).map((slug) => ({ slug }));
}

/* ── Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cfg = CONVERSIONS[slug];
  if (!cfg) return {};
  return {
    title: `Convert ${cfg.from} to ${cfg.to} Online — Free & Private`,
    description: `Convert ${cfg.from} to ${cfg.to} instantly in your browser. No upload, no server — 100% private. ${cfg.why}`,
    alternates: { canonical: `https://squishit.app/convert/${slug}` },
  };
}

/* ── Other-format suggestions ──────────────────────────────────────────── */

function OtherConversions({ current, from }: { current: string; from: string }) {
  const others = Object.entries(CONVERSIONS).filter(
    ([slug, cfg]) => slug !== current && cfg.from === from
  );
  if (others.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 justify-center text-sm text-gray-400 dark:text-gray-500">
      <span>Also convert {from} to:</span>
      {others.map(([slug, cfg]) => (
        <a
          key={slug}
          href={`/convert/${slug}`}
          className="inline-flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 px-3 py-1 rounded-full text-xs font-medium transition-colors"
        >
          {cfg.from} → {cfg.to}
        </a>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default async function ConvertPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cfg = CONVERSIONS[slug];
  if (!cfg) notFound();

  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 opacity-[0.08] dark:opacity-[0.15]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          No upload · 100% Private · Instant
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          Convert{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            {cfg.from}
          </span>
          {' '}to{' '}
          <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            {cfg.to}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6">
          {cfg.why}
        </p>

        {/* Format pill */}
        <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2 mb-3 shadow-sm">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {cfg.from}
          </span>
          <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-sm font-semibold text-white bg-violet-600 px-2.5 py-1 rounded-full">
            {cfg.to}
          </span>
        </div>

        {/* Other format suggestions */}
        <OtherConversions current={slug} from={cfg.from} />

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 mb-10 text-left">
          {[
            { n: '1', text: `Drop your ${cfg.from} file below` },
            { n: '2', text: `Output is pre-set to ${cfg.to} — change if needed` },
            { n: '3', text: 'Click Convert & Compress, then download' },
          ].map(({ n, text }) => (
            <div key={n} className="flex items-center gap-3 bg-white/60 dark:bg-gray-900/60 border border-violet-100 dark:border-violet-900/30 rounded-xl px-4 py-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0">
                {n}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{text}</span>
            </div>
          ))}
        </div>

        {/* Compressor — output format locked to target */}
        <div className="text-left">
          <CompressorUI initialFormat={cfg.toMime} />
        </div>

      </div>
    </main>
  );
}
