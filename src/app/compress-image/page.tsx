import type { Metadata } from 'next';
import { CompressorUI } from '@/components/CompressorUI';

export const metadata: Metadata = {
  title: 'Compress Image Online — Free Image Compressor',
  description:
    'Compress JPEG, PNG, WebP and SVG images instantly in your browser. No uploads, no server, 100% private and free.',
  alternates: { canonical: 'https://imagepdf.tools/compress-image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ImagePDF.Tools — Image Compressor',
      operatingSystem: 'Any (browser-based)',
      applicationCategory: 'UtilitiesApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to compress an image online',
      step: [
        { '@type': 'HowToStep', text: 'Drag and drop your image onto the drop zone or click to browse.' },
        { '@type': 'HowToStep', text: 'Adjust the quality slider to control compression level.' },
        { '@type': 'HowToStep', text: 'Click Download to save your compressed image.' },
      ],
    },
  ],
};

export default function CompressImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 text-violet-600 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            100% Browser-Based &middot; Zero Uploads
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Compress Images{' '}
            <span className="italic bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Reduce JPEG, PNG, WebP and SVG file sizes right in your browser. Nothing is ever
            uploaded to a server.
          </p>

          <div className="flex justify-center gap-6 sm:gap-10 text-sm mb-10">
            {[
              { value: 'Free',      label: 'Forever' },
              { value: '100%',      label: 'Private' },
              { value: '5 formats', label: 'Supported' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-bold text-violet-400 text-base sm:text-lg">{value}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>

          <div className="text-left">
            <CompressorUI />
          </div>
        </div>
      </main>
    </>
  );
}
