import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & How It Works',
  description: 'Learn how ImagePDF.Tools compresses your images entirely in your browser. No uploads, no servers, no data stored — ever.',
  alternates: { canonical: 'https://imagepdf.tools/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-12">
      <div className="max-w-2xl mx-auto px-4">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 mb-6">
            <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Privacy & How It Works</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            ImagePDF.Tools was built on a single principle: <strong className="text-gray-700 dark:text-gray-200">your images never leave your device</strong>.
            Here is exactly how it works.
          </p>
        </div>

        {/* Article content */}
        <div className="space-y-10 text-gray-600 dark:text-gray-300 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">No uploads. Ever.</h2>
            <p>
              When you drag an image onto ImagePDF.Tools, it is read directly by your browser using the{' '}
              <strong className="text-gray-700 dark:text-gray-200">File API</strong>. The file is passed to compression
              code that runs entirely inside your browser tab — the same environment that renders
              this page. At no point does the file travel over the internet to any server.
            </p>
            <p className="mt-4">
              You can verify this yourself: open your browser&apos;s Network tab in DevTools (F12 →
              Network), upload an image, and compress it. You will see zero outgoing requests
              carrying image data.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">How our tools work</h2>
            <p>
              Every tool on ImagePDF.Tools — compression, cropping, and metadata editing — runs locally in your browser using these algorithms and APIs:
            </p>
            <div className="mt-5 space-y-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">JPEG — DCT + chroma subsampling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your image is encoded using the{' '}
                  <strong className="text-gray-700 dark:text-gray-200">MozJPEG</strong> codec (compiled to WebAssembly),
                  Mozilla&apos;s optimised JPEG encoder. It applies Discrete Cosine Transform to convert
                  pixel blocks into frequency data, then discards high-frequency detail your eye
                  barely notices. Colour channels are subsampled separately from brightness, reducing
                  size by 50–80% with minimal perceived quality loss.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">PNG — Median-cut palette + dithering</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PNG files are quantised to a reduced colour palette using a{' '}
                  <strong className="text-gray-700 dark:text-gray-200">median-cut algorithm</strong> — the same technique
                  used by professional tools. The image&apos;s colour space is split into buckets; each
                  bucket is averaged into one representative colour. Floyd-Steinberg error diffusion
                  (dithering) then distributes the colour rounding error to neighbouring pixels,
                  making smooth gradients look natural even with as few as 64 colours. The result is
                  compressed with DEFLATE, the lossless algorithm inside every PNG file.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">WebP — VP8 predictive coding</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  WebP is encoded using Google&apos;s{' '}
                  <strong className="text-gray-700 dark:text-gray-200">libwebp</strong> (via WebAssembly), the reference
                  implementation. VP8 uses block prediction — each 4×4 pixel block is predicted from
                  its neighbours, and only the difference (residual) is stored. This produces files
                  25–35% smaller than equivalent JPEG with the same visual quality.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">SVG — Metadata strip + coordinate rounding</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  SVG files contain no pixel data — they are XML documents describing shapes. ImagePDF.Tools
                  parses the XML and removes invisible bloat: <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">&lt;metadata&gt;</code>,{' '}
                  <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">&lt;title&gt;</code>,{' '}
                  <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">&lt;desc&gt;</code> tags
                  added by design tools, XML comments, and excessive decimal precision in path
                  coordinates. Rounding <em>d=&quot;M 10.000000 20.000000&quot;</em> to{' '}
                  <em>d=&quot;M 10 20&quot;</em> is visually identical but much smaller.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Crop Image — Canvas API, no upload</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The crop tool draws your image onto an HTML{' '}
                  <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">&lt;canvas&gt;</code>{' '}
                  element and then reads only the selected region using{' '}
                  <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">getImageData</code>.
                  The cropped area is exported back to a PNG Blob in your browser tab. The image never
                  leaves your device at any stage of the process.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">EXIF Metadata — read and strip locally</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  EXIF data (GPS co-ordinates, camera make and model, shutter speed, timestamps) is
                  embedded inside JPEG and PNG files as binary tags. The Metadata Editor reads these
                  tags from the file bytes directly in your browser using the File API, displays them
                  in a table, and lets you edit or strip them. The modified file is re-assembled
                  in-memory and downloaded without ever touching a server.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">What data is stored — and where</h2>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Where it lives</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Sent to server?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Your images</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Browser memory only</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-400 font-medium">Never</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Compressed output</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Browser memory (Blob URL)</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-400 font-medium">Never</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Cropped output</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Browser memory (Canvas)</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-400 font-medium">Never</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">EXIF metadata read</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Browser memory only</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-400 font-medium">Never</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Account email</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Clerk (auth provider)</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Yes — for login only</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Subscription status</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Clerk user metadata</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Yes — free or pro flag</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Payment details</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Stripe (never touches our servers)</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Stripe only</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Page visits</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Plausible Analytics (no cookies)</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Anonymised only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">WebAssembly — why and what it means</h2>
            <p>
              The JPEG and WebP codecs run as{' '}
              <strong className="text-gray-700 dark:text-gray-200">WebAssembly (WASM)</strong> modules — binary files
              compiled from the same C/C++ source code used in production encoders like MozJPEG and
              libwebp. WASM runs sandboxed inside your browser with no access to your file system,
              network, or other tabs. It cannot &quot;call home&quot; or send data anywhere.
            </p>
            <p className="mt-4">
              The WASM binaries are downloaded once from our CDN (Vercel&apos;s edge network) and cached
              in your browser for up to 30 days. After the first load you can compress images
              entirely offline.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Open to inspection</h2>
            <p>
              We encourage you to verify these claims yourself:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li>Open DevTools → Network while compressing — no image data leaves your browser.</li>
              <li>Open DevTools → Sources → look for <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">jSquashEncode.ts</code> and <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 rounded">pngQuantize.ts</code> to see the compression code.</li>
              <li>Disconnect from the internet after the page loads — compression still works.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Contact</h2>
            <p>
              Questions about privacy or data handling? Reach us at{' '}
              <a href="mailto:privacy@imagepdf.tools" className="text-violet-600 dark:text-violet-400 hover:underline">
                privacy@imagepdf.tools
              </a>
              . We aim to reply within 48 hours.
            </p>
          </section>

          {/* Last updated */}
          <p className="text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-6">
            Last updated: April 2026
          </p>
        </div>
      </div>
    </main>
  );
}
