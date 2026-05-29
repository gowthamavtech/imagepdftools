'use strict';

// OPFS cache for LibreOffice WASM assets.
// v4: switch from CacheStorage → OPFS.
//     Chrome silently drops cache.put() for files > ~50 MB so soffice.wasm
//     (147 MB) and soffice.data (95 MB) never persisted — they re-downloaded
//     on every visit. OPFS has gigabyte-scale quotas and survives page/SW restarts.
//     A .ok sentinel file ensures partial writes (e.g. from a crash mid-download)
//     are detected and re-fetched rather than served corrupt.

function getFileName(url) {
  return new URL(url).pathname.split('/').pop() || '';
}

// Cache wasm, data, and the small pthread bootstrap script.
// soffice.js is intentionally excluded — it must stay fresh so its response
// always carries the COEP header (cached COEP-less copies break cross-origin
// isolation for SharedArrayBuffer inside the worker).
function shouldCache(url) {
  return url.includes('.wasm') || url.includes('.data') || url.includes('soffice.worker.js');
}

function mimeOf(filename) {
  if (filename.endsWith('.wasm')) return 'application/wasm';
  if (filename.endsWith('.js'))   return 'application/javascript';
  return 'application/octet-stream';
}

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil((async () => {
  // Remove stale CacheStorage entries from the old caching strategy (v1–v3).
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('lo-wasm-')).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  if (!e.request.url.includes('/api/lo-wasm/')) return;
  if (!shouldCache(e.request.url)) return;

  const filename = getFileName(e.request.url);

  e.respondWith((async () => {
    // ── OPFS cache hit ────────────────────────────────────────────────────
    try {
      const root = await self.navigator.storage.getDirectory();
      // The .ok sentinel only exists after a completed write — guards against
      // serving a partially-written file if the browser crashed mid-download.
      await root.getFileHandle(`lo-${filename}.ok`);
      const fh   = await root.getFileHandle(`lo-${filename}`);
      const file = await fh.getFile();
      if (file.size === 0) throw new Error('empty');
      return new Response(file, {
        status: 200,
        headers: {
          'Content-Type':                  mimeOf(filename),
          'Content-Length':                String(file.size),
          'Cross-Origin-Embedder-Policy':  'credentialless',
          'Cross-Origin-Resource-Policy':  'cross-origin',
        },
      });
    } catch {
      // ── Cache miss — fetch from network and persist to OPFS ───────────
      const res = await fetch(e.request);
      if (res.status === 200) {
        // e.waitUntil keeps the SW alive for the full duration of the write
        // (up to 147 MB for soffice.wasm — can take several minutes on slow
        // connections). Without it Chrome may terminate the SW mid-stream.
        e.waitUntil(writeToOPFS(filename, res.clone()));
      }
      return res;
    }
  })());
});

async function writeToOPFS(filename, res) {
  try {
    const root     = await self.navigator.storage.getDirectory();
    const fh       = await root.getFileHandle(`lo-${filename}`, { create: true });
    const writable = await fh.createWritable();
    // pipeTo closes the writable stream automatically when the source ends.
    await res.body.pipeTo(writable);
    // Write the sentinel only after the stream fully completes.
    const okFh = await root.getFileHandle(`lo-${filename}.ok`, { create: true });
    const okWr = await okFh.createWritable();
    await okWr.write('ok');
    await okWr.close();
    console.log('[SW] OPFS cached:', filename);
  } catch (err) {
    console.warn('[SW] OPFS write failed for', filename, err);
    // Clean up the partial file so the next visit triggers a clean re-download.
    try {
      const root = await self.navigator.storage.getDirectory();
      await root.removeEntry(`lo-${filename}`).catch(() => {});
      await root.removeEntry(`lo-${filename}.ok`).catch(() => {});
    } catch {}
  }
}
