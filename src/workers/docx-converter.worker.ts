/**
 * docx-converter.worker.ts
 *
 * Off-main-thread DOCX → PDF pipeline using Pandoc WASM + Typst WASM.
 *
 * Message protocol
 * ────────────────
 * Inbound  (main → worker):
 *   { docxBuffer: ArrayBuffer, fonts: FontEntry[], pageSize: 'a4'|'letter' }
 *   All ArrayBuffers are Transferable — transferred zero-copy.
 *
 * Outbound (worker → main):
 *   { type: 'step',  message: string }           — progress update
 *   { type: 'done',  pdfBuffer: ArrayBuffer }    — success (Transferable)
 *   { type: 'error', message: string }           — failure
 */

// WASM bundles (typst-all-in-one, browser_wasi_shim) reference `window`
// directly without a typeof guard, assuming a main-thread browser context.
// In a Web Worker `window` is undefined; aliasing it to `globalThis` (which
// IS defined in workers and exposes the same APIs) makes those references work.
if (typeof window === 'undefined') {
  (globalThis as Record<string, unknown>).window = globalThis;
}

export interface FontEntry {
  /** Sanitised filename safe for the VFS, e.g. "Arial-Regular.ttf" */
  name: string;
  /** CSS/Typst font-family string, e.g. "Arial" */
  family: string;
  /** Raw font bytes (TTF / OTF / WOFF2) */
  data: ArrayBuffer;
}

interface InboundMsg {
  docxBuffer: ArrayBuffer;
  fonts: FontEntry[];
  pageSize: 'a4' | 'letter';
}

type OutboundMsg =
  | { type: 'step';  message: string }
  | { type: 'done';  pdfBuffer: ArrayBuffer }
  | { type: 'error'; message: string };

function post(msg: OutboundMsg, transfer: Transferable[] = []) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (self as any).postMessage(msg, transfer);
}

// ── WASM singleton caches (survive across repeated calls to the same worker) ──

type PandocConvertFn = (
  options: Record<string, unknown>,
  stdin: null,
  files: Record<string, Blob>
) => Promise<{ stdout: string; stderr: string; mediaFiles: Record<string, Blob> }>;

let pandocConvert: PandocConvertFn | null = null;

async function ensurePandoc(): Promise<PandocConvertFn> {
  if (pandocConvert) return pandocConvert;
  // Vendored core.js bypasses pandoc-wasm's exports-map restriction.
  const { createPandocInstance } = await import('@/lib/pandoc-core');
  const res = await fetch('/pandoc.wasm');
  if (!res.ok) throw new Error(`Failed to fetch pandoc.wasm: ${res.status}`);
  const wasmBuf = await res.arrayBuffer();
  const instance = await createPandocInstance(wasmBuf);
  pandocConvert = instance.convert as unknown as PandocConvertFn;
  return pandocConvert;
}

interface TypstAPI {
  resetShadow(): Promise<void>;
  mapShadow(path: string, data: Uint8Array): Promise<void>;
  pdf(opts: { mainContent: string } | { mainFilePath: string; root?: string }): Promise<Uint8Array>;
}

let typstAPI: TypstAPI | null = null;

async function ensureTypst(): Promise<TypstAPI> {
  if (typstAPI) return typstAPI;
  // 39 MB self-contained bundle (WASM + embedded fonts).
  // First call triggers WASM init; subsequent calls reuse the cached instance.
  const mod = await import('@myriaddreamin/typst-all-in-one.ts');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typstAPI = (mod as any).$typst as unknown as TypstAPI;
  return typstAPI;
}

// ── Main handler ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(self as any).onmessage = async (evt: MessageEvent<InboundMsg>) => {
  const { docxBuffer, fonts, pageSize } = evt.data;

  try {
    // ── Step 1 — Pandoc: DOCX → Typst markup ──────────────────────────────────
    post({ type: 'step', message: 'Loading Pandoc WASM…' });
    const pandoc = await ensurePandoc();

    post({ type: 'step', message: 'Converting document…' });
    const docxBlob = new Blob([docxBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    const pandocResult = await pandoc(
      {
        from: 'docx',
        to: 'typst',
        'input-files': ['input.docx'],
        'extract-media': 'media',
      },
      null,
      { 'input.docx': docxBlob }
    );

    if (!pandocResult.stdout) {
      throw new Error(
        `Pandoc produced no output${
          pandocResult.stderr ? ': ' + pandocResult.stderr.slice(0, 300) : ''
        }`
      );
    }

    // ── Step 2 — Build Typst source with preamble ─────────────────────────────

    // Replace absolute image widths so they don't overflow the text column.
    let pandocOut = pandocResult.stdout.replace(
      /,\s*width:\s*\d+(?:\.\d+)?(?:in|cm|mm|pt)\b/g,
      ', width: 100%'
    );
    // Remove explicit heights — Typst derives height from aspect ratio.
    // Leaving a fixed height alongside width: 100% clamps the image to a
    // smaller size (or crops it), since Typst fits to the tighter constraint.
    pandocOut = pandocOut.replace(
      /,\s*height:\s*\d+(?:\.\d+)?(?:in|cm|mm|pt)\b/g,
      ''
    );
    // Remove clip:true from #box wrappers so images reflow instead of being
    // hard-clipped to the box dimensions.
    pandocOut = pandocOut.replace(/,\s*clip:\s*true\b/g, '');

    // ── Parse DOCX margins from the ZIP ─────────────────────────────────────
    let margins = { top: 72, right: 72, bottom: 72, left: 72 };
    try {
      const { default: JSZip } = await import('jszip');
      const zip = await JSZip.loadAsync(docxBuffer);
      const docXml = await zip.file('word/document.xml')?.async('string');
      if (docXml) {
        const pgMarMatch = docXml.match(/<w:pgMar\b([^>]*)\/?\s*>/);
        if (pgMarMatch) {
          const attrs = pgMarMatch[1];
          const twipsToPt = (name: string) => {
            const m = attrs.match(new RegExp(`w:${name}="(\\d+)"`));
            return m ? parseInt(m[1]) / 20 : 72;
          };
          margins = {
            top:    twipsToPt('top'),
            right:  twipsToPt('right'),
            bottom: twipsToPt('bottom'),
            left:   twipsToPt('left'),
          };
        }
      }
    } catch { /* fall through to defaults */ }

    // Page size + margin from DOCX
    const paper = pageSize === 'a4' ? 'a4' : 'us-letter';
    const marginStr = `(top: ${margins.top}pt, right: ${margins.right}pt, bottom: ${margins.bottom}pt, left: ${margins.left}pt)`;
    const pageDir = `#set page(paper: "${paper}", margin: ${marginStr})`;

    // Font directive: prefer injected system fonts, fall back to bundled ones.
    const uniqueFamilies = [...new Set(fonts.map((f) => f.family))];
    const fontList =
      uniqueFamilies.length > 0
        ? [...uniqueFamilies, 'Linux Libertine', 'New Computer Modern']
            .map((f) => `"${f}"`)
            .join(', ')
        : '"Linux Libertine", "New Computer Modern"';
    const fontDir = `#set text(font: (${fontList}))`;

    // Basic table polish: header bold, thin stroke, padding.
    const tableDir = [
      '#set table(stroke: 0.5pt + luma(180), inset: (x: 8pt, y: 6pt))',
      '#show table.cell.where(y: 0): set text(weight: "bold")',
    ].join('\n');

    // Prevent paragraphs splitting awkwardly across pages.
    const breakDir = '#set par(justify: true)';

    // Scale all images to fit the text column width without cropping.
    const imageDir = '#show image: it => box(it, width: 100%)';

    // Pandoc may emit rgb("RRGGBB") without # — Typst requires rgb("#RRGGBB").
    const colorFixedOut = pandocOut.replace(
      /rgb\("([0-9A-Fa-f]{6})"\)/g,
      'rgb("#$1")'
    );

    const typstSrc = [pageDir, fontDir, tableDir, breakDir, imageDir, '', colorFixedOut].join('\n');

    // ── Step 3 — Typst: inject fonts + media, compile PDF ─────────────────────
    post({ type: 'step', message: 'Loading Typst compiler…' });
    const $typst = await ensureTypst();

    post({ type: 'step', message: 'Compiling PDF…' });
    await $typst.resetShadow();

    // ── WASM_FONT_INJECT_POINT ─────────────────────────────────────────────────
    // Inject system fonts acquired via queryLocalFonts() on the main thread.
    // These are mapped into the Typst shadow FS so the compiler can load them.
    //
    // If the typst-all-in-one API exposes a direct font-registration method
    // (e.g. `$typst.addFonts(Uint8Array[])` in a future release), call it here:
    //
    //   const rawFontData = fonts.map(f => new Uint8Array(f.data));
    //   await ($typst as { addFonts(d: Uint8Array[]): Promise<void> }).addFonts(rawFontData);
    //
    // The mapShadow path is the secondary mechanism — Typst-ts searches /fonts/
    // for additional font files when building the font database.
    for (const font of fonts) {
      await $typst.mapShadow(`/fonts/${font.name}`, new Uint8Array(font.data));
    }

    // Map media files extracted from the DOCX by Pandoc.
    // mainContent places the temp .typ at /tmp/<uuid>.typ, so the project root
    // is /tmp/; images mapped at /tmp/media/* resolve via relative "media/…".
    for (const [name, blob] of Object.entries(pandocResult.mediaFiles ?? {})) {
      const data = new Uint8Array(await (blob as Blob).arrayBuffer());
      await $typst.mapShadow(`/tmp/${name}`, data);
    }

    // ── WASM_EXEC_POINT ────────────────────────────────────────────────────────
    // Typst WASM compilation is triggered here via mainContent.
    //
    // To substitute a different WASM binary (e.g. x2t.wasm / OnlyOffice):
    //   Module.FS.writeFile('/input.typ', new TextEncoder().encode(typstSrc));
    //   Module.callMain(['/input.typ', '-o', '/output.pdf']);
    //   const pdfBytes = Module.FS.readFile('/output.pdf');
    //
    const pdfBytes = await $typst.pdf({ mainContent: typstSrc });

    if (!pdfBytes || pdfBytes.length === 0) {
      throw new Error(
        'Typst produced an empty PDF. The document may use unsupported features.'
      );
    }

    // Slice to ensure the buffer is standalone before transferring (pdfBytes
    // might be a view into a larger WASM memory buffer).
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;

    post({ type: 'done', pdfBuffer }, [pdfBuffer]);
  } catch (err) {
    post({
      type: 'error',
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
