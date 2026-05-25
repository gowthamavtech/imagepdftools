import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & How It Works',
  description: 'Learn how ImagePDF.Tools compresses your images entirely in your browser. No uploads, no servers, no data stored — ever.',
  alternates: { canonical: 'https://imagepdf.tools/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="max-w-[780px] mx-auto px-4 sm:px-8">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-dim mb-6">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>Privacy &amp; How It Works</h1>
          <p className="text-[15px] text-fg-2 leading-[1.7] max-w-[48ch] mx-auto m-0">
            ImagePDF.Tools was built on a single principle: <strong className="text-fg-1">your images never leave your device</strong>.
            Here is exactly how it works.
          </p>
        </div>

        {/* Article content */}
        <div className="space-y-10 text-[13.5px] text-fg-2 leading-[1.75]">

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>No uploads. Ever.</h2>
            <p>
              When you drag an image onto ImagePDF.Tools, it is read directly by your browser using the{' '}
              <strong className="text-fg-1">File API</strong>. The file is passed to compression
              code that runs entirely inside your browser tab — the same environment that renders
              this page. At no point does the file travel over the internet to any server.
            </p>
            <p className="mt-4">
              You can verify this yourself: open your browser&apos;s Network tab in DevTools (F12 →
              Network), upload an image, and compress it. You will see zero outgoing requests
              carrying image data.
            </p>
          </section>

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>How our tools work</h2>
            <p>
              Every tool on ImagePDF.Tools — compression, cropping, and metadata editing — runs locally in your browser using these algorithms and APIs:
            </p>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: 'JPEG — DCT + chroma subsampling',
                  desc: <>Your image is encoded using the <strong className="text-fg-1">MozJPEG</strong> codec (compiled to WebAssembly), Mozilla&apos;s optimised JPEG encoder. It applies Discrete Cosine Transform to convert pixel blocks into frequency data, then discards high-frequency detail your eye barely notices. Colour channels are subsampled separately from brightness, reducing size by 50–80% with minimal perceived quality loss.</>,
                },
                {
                  title: 'PNG — Median-cut palette + dithering',
                  desc: <>PNG files are quantised to a reduced colour palette using a <strong className="text-fg-1">median-cut algorithm</strong> — the same technique used by professional tools. The image&apos;s colour space is split into buckets; each bucket is averaged into one representative colour. Floyd-Steinberg error diffusion (dithering) then distributes the colour rounding error to neighbouring pixels, making smooth gradients look natural even with as few as 64 colours. The result is compressed with DEFLATE, the lossless algorithm inside every PNG file.</>,
                },
                {
                  title: 'WebP — VP8 predictive coding',
                  desc: <>WebP is encoded using Google&apos;s <strong className="text-fg-1">libwebp</strong> (via WebAssembly), the reference implementation. VP8 uses block prediction — each 4×4 pixel block is predicted from its neighbours, and only the difference (residual) is stored. This produces files 25–35% smaller than equivalent JPEG with the same visual quality.</>,
                },
                {
                  title: 'SVG — Metadata strip + coordinate rounding',
                  desc: <>SVG files contain no pixel data — they are XML documents describing shapes. ImagePDF.Tools parses the XML and removes invisible bloat: <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">&lt;metadata&gt;</code>, <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">&lt;title&gt;</code>, <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">&lt;desc&gt;</code> tags added by design tools, XML comments, and excessive decimal precision in path coordinates.</>,
                },
                {
                  title: 'Crop Image — Canvas API, no upload',
                  desc: <>The crop tool draws your image onto an HTML <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">&lt;canvas&gt;</code> element and then reads only the selected region using <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">getImageData</code>. The cropped area is exported back to a PNG Blob in your browser tab. The image never leaves your device at any stage of the process.</>,
                },
                {
                  title: 'EXIF Metadata — read and strip locally',
                  desc: 'EXIF data (GPS coordinates, camera make and model, shutter speed, timestamps) is embedded inside JPEG and PNG files as binary tags. The Metadata Editor reads these tags from the file bytes directly in your browser using the File API, displays them in a table, and lets you edit or strip them. The modified file is re-assembled in-memory and downloaded without ever touching a server.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-surface bd-2 rounded-[10px] p-5">
                  <h3 className="font-medium text-fg-1 text-[13.5px] mb-1.5 leading-snug">{title}</h3>
                  <p className="text-[12.5px] text-fg-2 leading-[1.7]">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>What data is stored — and where</h2>
            <div className="overflow-x-auto overflow-hidden bd-2 rounded-[10px]">
              <table style={{ minWidth: '460px' }} className="w-full text-[13px]">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-fg-2">Data</th>
                    <th className="text-left py-3 px-4 font-medium text-fg-2">Where it lives</th>
                    <th className="text-left py-3 px-4 font-medium text-fg-2">Sent to server?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Your images', 'Browser memory only', 'Never', true],
                    ['Compressed output', 'Browser memory (Blob URL)', 'Never', true],
                    ['Cropped output', 'Browser memory (Canvas)', 'Never', true],
                    ['EXIF metadata read', 'Browser memory only', 'Never', true],
                    ['Account email', 'Clerk (auth provider)', 'Yes — for login only', false],
                    ['Subscription status', 'Clerk user metadata', 'Yes — free or pro flag', false],
                    ['Payment details', 'Stripe (never touches our servers)', 'Stripe only', false],
                    ['Page visits', 'Plausible Analytics (no cookies)', 'Anonymised only', false],
                  ].map(([data, where, sent, isNever], i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 text-fg-2 bd-t-1">{data}</td>
                      <td className="py-3 px-4 text-fg-2 bd-t-1">{where}</td>
                      <td className={`py-3 px-4 bd-t-1 font-medium ${isNever ? 'text-accent' : 'text-fg-2'}`}>{sent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>WebAssembly — why and what it means</h2>
            <p>
              The JPEG and WebP codecs run as{' '}
              <strong className="text-fg-1">WebAssembly (WASM)</strong> modules — binary files
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

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Open to inspection</h2>
            <p>We encourage you to verify these claims yourself:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Open DevTools → Network while compressing — no image data leaves your browser.</li>
              <li>Open DevTools → Sources — look for <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">jSquashEncode.ts</code> and <code className="font-mono text-[11px] bg-surface bd-2 px-1 rounded">pngQuantize.ts</code> to see the compression code.</li>
              <li>Disconnect from the internet after the page loads — compression still works.</li>
            </ul>
          </section>

          <section>
            <h2 className="serif italic text-fg-1 m-0 mb-3"
                  style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Contact</h2>
            <p>
              Questions about privacy or data handling? Reach us at{' '}
              <a href="mailto:support@imagepdf.tools" className="text-accent hover:underline">
                support@imagepdf.tools
              </a>
              . We aim to reply within 48 hours.
            </p>
          </section>

          <p className="text-[12px] text-fg-3 bd-t-1 pt-6">
            Last updated: April 2026
          </p>
        </div>
      </div>
    </main>
  );
}
