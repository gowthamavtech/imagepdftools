import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompressorUI } from '@/components/CompressorUI';
import Link from 'next/link';

/* ── Conversion config ─────────────────────────────────────────────────── */

interface ConversionConfig {
  from: string;
  to: string;
  toMime: string;
  why: string;
}

export const CONVERSIONS: Record<string, ConversionConfig> = {
  'png-to-jpeg': {
    from: 'PNG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'JPEGs are up to 80% smaller than PNGs for photos — great for web pages, email attachments, and social media.',
  },
  'png-to-jpg': {
    from: 'PNG', to: 'JPG', toMime: 'image/jpeg',
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
    from: 'WebP', to: 'JPG', toMime: 'image/jpeg',
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
    from: 'JPEG', to: 'JPG', toMime: 'image/jpeg',
    why: 'Save as .jpg — the shorter extension used by most cameras and Windows apps.',
  },
  'svg-to-png': {
    from: 'SVG', to: 'PNG', toMime: 'image/png',
    why: "Rasterise SVG to a fixed-size PNG when you need a bitmap for apps, presentations, or platforms that don't support SVG.",
  },
  'svg-to-jpg': {
    from: 'SVG', to: 'JPG', toMime: 'image/jpeg',
    why: 'Convert SVG to a compressed JPEG for use in documents, emails, or platforms that require a standard photo format.',
  },
  'svg-to-jpeg': {
    from: 'SVG', to: 'JPEG', toMime: 'image/jpeg',
    why: 'Convert SVG to JPEG for universal compatibility with every app, document, and platform.',
  },
  'svg-to-webp': {
    from: 'SVG', to: 'WebP', toMime: 'image/webp',
    why: 'Convert SVG to WebP for the web — smaller than PNG and JPEG, with broad browser support.',
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
    alternates: { canonical: `https://imagepdf.tools/convert/${slug}` },
  };
}

/* ── Other-format suggestions ──────────────────────────────────────────── */

function OtherConversions({ current, from }: { current: string; from: string }) {
  const others = Object.entries(CONVERSIONS).filter(
    ([slug, cfg]) => slug !== current && cfg.from === from
  );
  if (others.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
      <span className="text-sm text-slate-500 dark:text-slate-400">Also convert {from} to:</span>
      {others.map(([slug, cfg]) => (
        <Link
          key={slug}
          href={`/convert/${slug}`}
          className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full text-xs font-medium transition-colors"
        >
          {cfg.from} → {cfg.to}
        </Link>
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
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">

        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-3">
          Free &middot; No Upload &middot; Private
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Convert{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {cfg.from}
          </span>
          {' '}to{' '}
          <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {cfg.to}
          </span>
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
          {cfg.why}
        </p>

        {/* Format pill */}
        <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-5 py-2 mb-4 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-full">
            {cfg.from}
          </span>
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-sm font-semibold text-white bg-blue-600 px-2.5 py-1 rounded-full">
            {cfg.to}
          </span>
        </div>

        <OtherConversions current={slug} from={cfg.from} />

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 mb-10 text-left">
          {[
            { n: '1', text: `Drop your ${cfg.from} file below` },
            { n: '2', text: `Output is pre-set to ${cfg.to} — change if needed` },
            { n: '3', text: 'Click Compress All, then download' },
          ].map(({ n, text }) => (
            <div key={n} className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
                {n}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-left">
        <CompressorUI initialFormat={cfg.toMime} />
      </div>
    </main>
  );
}
