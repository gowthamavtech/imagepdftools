import type { Metadata } from 'next';
import { MetadataEditorUI } from '@/components/MetadataEditorUI';

export const metadata: Metadata = {
  title: 'Image Metadata Viewer & Editor — View & Remove EXIF, GPS Data',
  description:
    'View all metadata in your JPEG, PNG, or WebP image — EXIF, GPS coordinates, camera info, timestamps, copyright. Toggle which groups to keep or remove, then download the cleaned file. 100% private, runs in your browser.',
};

export default function MetadataEditorPage() {
  return (
    <main className="flex-1 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Image Metadata Editor
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          See exactly what&apos;s embedded in your image — GPS coordinates, camera make and model,
          timestamps, author info — and remove only the groups you don&apos;t want.
          Nothing leaves your browser.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {['GPS & Location', 'Camera Info', 'Timestamps', 'Author & Copyright', 'Software'].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <MetadataEditorUI />

      <section className="max-w-2xl mx-auto px-4 mt-12 space-y-6 text-sm text-slate-500 dark:text-slate-400">
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            What is image metadata?
          </h2>
          <p className="leading-relaxed">
            Every time you take a photo, your device embeds hidden data into the file — the GPS location
            where the photo was taken, the camera make and model, lens settings, timestamps, and
            sometimes your name or copyright notice. This data is called EXIF metadata.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Why remove it selectively?
          </h2>
          <p className="leading-relaxed">
            You may want to keep camera info for portfolio purposes while removing GPS coordinates
            before sharing online. Selective removal lets you stay in control — strip only what
            you don&apos;t need, keep what you do.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Is this private?
          </h2>
          <p className="leading-relaxed">
            Yes. Your image never leaves your device. All reading and processing happens entirely
            in your browser using local JavaScript — no uploads, no server.
          </p>
        </div>
      </section>
    </main>
  );
}
