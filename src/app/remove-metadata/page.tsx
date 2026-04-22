import type { Metadata } from 'next';
import { MetadataStripperUI } from '@/components/MetadataStripperUI';

export const metadata: Metadata = {
  title: 'Remove Image Metadata — Strip EXIF, GPS & More',
  description:
    'Remove EXIF data, GPS location, camera info, and all hidden metadata from your images — free, instant, and entirely in your browser. No uploads.',
  alternates: { canonical: 'https://squishit.app/remove-metadata' },
};

export default function RemoveMetadataPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/40 px-3 py-1 rounded-full">
          Privacy tool
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Remove Image Metadata
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Strip EXIF data, GPS coordinates, camera model, timestamps, and all hidden
          metadata from JPEG, PNG, and WebP files — instantly, privately, in your browser.
        </p>

        {/* What gets removed */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm max-w-2xl mx-auto">
          {[
            { icon: '📍', label: 'GPS Location' },
            { icon: '📷', label: 'Camera Info' },
            { icon: '🕐', label: 'Timestamps' },
            { icon: '🏷️', label: 'Author & Copyright' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-gray-600 dark:text-gray-400 font-medium"
            >
              <span>{icon}</span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <MetadataStripperUI />

      {/* Info section */}
      <section className="max-w-2xl mx-auto px-4 mt-12 space-y-6 text-sm text-gray-500 dark:text-gray-400">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            What is image metadata?
          </h2>
          <p className="leading-relaxed">
            Every photo your camera or phone takes embeds invisible data alongside the pixels:
            GPS coordinates of where you were, the make and model of your device, the exact
            date and time, lens settings, and sometimes your name or copyright notice. This
            is called EXIF (Exchangeable Image File Format) data.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Why remove it?
          </h2>
          <p className="leading-relaxed">
            Before sharing images publicly — on social media, in a portfolio, or as part of
            a product listing — removing metadata protects your privacy and reduces file size
            slightly. Your actual image quality is preserved at 95%+ fidelity.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Is it safe?
          </h2>
          <p className="leading-relaxed">
            Completely. All processing happens locally in your browser using the Canvas API.
            Your images are never uploaded to any server. We never see your files.
          </p>
        </div>
      </section>
    </main>
  );
}
