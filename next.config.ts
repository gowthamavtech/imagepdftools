import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  async rewrites() {
    return [
      // All existing /og-image.png references resolve to the generated OG image
      { source: '/og-image.png', destination: '/opengraph-image' },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  webpack(config) {
    // Enable async WASM for @jsquash MozJPEG / libwebp codecs
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/:path*.wasm',
        headers: [{ key: 'Content-Type', value: 'application/wasm' }],
      },
      // Cross-origin isolation required for LibreOffice WASM pthreads (SharedArrayBuffer).
      // COOP must be on the page; COEP must also be on the worker script itself —
      // Chrome requires the worker's own response to carry COEP, otherwise
      // self.crossOriginIsolated is false inside the worker and SharedArrayBuffer is
      // unavailable, which Chrome reports as worker.onerror with an empty message.
      {
        source: '/word-to-pdf',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
      {
        source: '/lo-worker.js',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
      {
        source: '/lo-worker-sdk.js',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
      // The service worker must also carry COEP. Chrome requires every script
      // in the controller chain — including the SW itself — to be cross-origin
      // isolated before a page it controls can be cross-origin isolated.
      // Without this, self.crossOriginIsolated = false inside lo-worker.js
      // even though the page and lo-worker.js both have the correct headers.
      {
        source: '/sw.js',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
    ];
  },
};

export default nextConfig;
