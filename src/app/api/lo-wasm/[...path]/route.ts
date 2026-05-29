import { NextRequest } from 'next/server';

// Streams LibreOffice WASM files from the upstream host.
// Sets COEP/CORP headers so the files are loadable inside a cross-origin-isolated worker.
// Must stream — soffice.wasm is ~147 MB; buffering it would OOM the serverless function.

const UPSTREAM = 'https://wasm.imagepdf.tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const filePath = path.join('/');
  const upstreamUrl = `${UPSTREAM}/${filePath}`;

  let upstream: Response;
  try {
    const reqHeaders: Record<string, string> = {};
    const range = req.headers.get('Range');
    if (range) reqHeaders['Range'] = range;

    // Do NOT forward Accept-Encoding: Node.js fetch auto-decompresses the response body,
    // so if we forward the header the upstream returns compressed bytes that Node decodes,
    // but then we'd also need to strip Content-Encoding from our response — complex and
    // error-prone. Omitting it forces the upstream to return uncompressed content.

    // The upstream bucket uses CORS and requires a recognised Origin header.
    // Server-side fetch sends no Origin by default (→ 403), so we forward the
    // app's own origin, which the bucket's CORS policy allows.
    reqHeaders['Origin'] = req.nextUrl.origin;

    upstream = await fetch(upstreamUrl, { headers: reqHeaders });
  } catch (err) {
    return new Response(
      `Failed to reach upstream: ${err instanceof Error ? err.message : String(err)}`,
      { status: 502 },
    );
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new Response(`Upstream error ${upstream.status}`, { status: upstream.status });
  }

  const out = new Headers();

  // Forward content headers. Content-Encoding is intentionally excluded — we strip
  // Accept-Encoding from upstream requests so the body is always uncompressed.
  for (const key of ['Content-Type', 'Content-Length', 'Content-Range', 'Accept-Ranges', 'ETag', 'Last-Modified']) {
    const val = upstream.headers.get(key);
    if (val) out.set(key, val);
  }

  // CORP: cross-origin lets any cross-origin-isolated context embed these files.
  // COEP: credentialless is required on the soffice.worker.js responses — Emscripten pthread
  // workers call importScripts(sofficeJs) and need self.crossOriginIsolated=true to use
  // SharedArrayBuffer. Without COEP on this proxy response the workers silently fail to
  // initialise and the "loading-workers" dependency never resolves.
  out.set('Cross-Origin-Resource-Policy', 'cross-origin');
  out.set('Cross-Origin-Embedder-Policy', 'credentialless');

  // WASM and data are large immutable binaries — long cache is safe.
  // JS files (soffice.js especially) are loaded as pthread Worker scripts and MUST carry
  // COEP: credentialless for the worker to be cross-origin isolated so Chrome allows
  // postMessage of SharedArrayBuffer (wasmMemory). A cached COEP-less response silently
  // breaks pthread initialisation. no-store guarantees every Worker creation gets a
  // fresh response with COEP.
  const isLarge = filePath.endsWith('.wasm') || filePath.endsWith('.data');
  out.set('Cache-Control', isLarge ? 'public, max-age=2592000, immutable' : 'no-store');

  return new Response(upstream.body, { status: upstream.status, headers: out });
}
