'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';

type PageSize = 'a4' | 'letter';

interface Conversion {
  html: string;
  filename: string;
  warnings: string[];
  file: File;
}

// ── WASM singleton loaders ──────────────────────────────────────────────────
// Both are initialized once per browser session and reused on subsequent calls.

type PandocConvertFn = (
  options: { from: string; to: string; [k: string]: unknown },
  stdin: null,
  files: Record<string, Blob>
) => Promise<{ stdout: string; stderr: string; mediaFiles: Record<string, Blob> }>;

interface TypstAPI {
  resetShadow(): Promise<void>;
  mapShadow(path: string, data: Uint8Array): Promise<void>;
  pdf(opts: { mainFilePath: string; root?: string } | { mainContent: string }): Promise<Uint8Array>;
}

let pandocPromise: Promise<PandocConvertFn> | null = null;
let typstPromise: Promise<TypstAPI> | null = null;

async function loadPandoc(): Promise<PandocConvertFn> {
  if (!pandocPromise) {
    pandocPromise = (async () => {
      // pandoc.wasm is served from /public/pandoc.wasm (copied by postinstall).
      // We use createPandocInstance directly so we control where the binary comes from,
      // avoiding webpack's asyncWebAssembly transform which breaks pandoc-wasm's loader.
      const { createPandocInstance } = await import('@/lib/pandoc-core');
      const res = await fetch('/pandoc.wasm');
      if (!res.ok) throw new Error(`Failed to fetch pandoc.wasm: ${res.status}`);
      const wasm = await res.arrayBuffer();
      const instance = await createPandocInstance(wasm);
      return instance.convert as PandocConvertFn;
    })();
  }
  return pandocPromise;
}

async function loadTypst(): Promise<TypstAPI> {
  if (!typstPromise) {
    typstPromise = (async () => {
      // typst-all-in-one.ts bundles the compiler WASM + fonts inline in its JS (39 MB).
      // Dynamic import triggers webpack code-splitting so it's only loaded on demand.
      const mod = await import('@myriaddreamin/typst-all-in-one.ts');
      return mod.$typst as unknown as TypstAPI;
    })();
  }
  return typstPromise;
}

// ── Core conversion: DOCX → Typst markup → PDF bytes ───────────────────────

async function docxToPdf(
  file: File,
  pageSize: PageSize,
  onStep: (msg: string) => void
): Promise<Blob> {
  onStep('Loading Pandoc WASM…');
  const [pandocConvert, $typst] = await Promise.all([loadPandoc(), loadTypst()]);

  // Step 1 — DOCX → Typst markup
  onStep('Converting document…');
  const docxBlob = new Blob([await file.arrayBuffer()], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const result = await pandocConvert(
    { from: 'docx', to: 'typst', 'input-files': ['input.docx'], 'extract-media': 'media' },
    null,
    { 'input.docx': docxBlob }
  );

  if (!result.stdout) {
    throw new Error(
      `Pandoc produced no output${result.stderr ? ': ' + result.stderr.slice(0, 300) : ''}`
    );
  }

  // Prepend page-size directive
  const pageDir =
    pageSize === 'a4' ? '#set page(paper: "a4")' : '#set page(paper: "us-letter")';
  const typstSrc = `${pageDir}\n${result.stdout}`;

  // Step 2 — Feed extracted media into Typst shadow FS under /tmp/
  // mainContent mode places the temp .typ file at /tmp/<uuid>.typ, so the
  // implicit project root is /tmp/. Images mapped at /tmp/media/* are then
  // reachable via the relative path "media/..." that pandoc emits.
  onStep('Compiling PDF…');
  await $typst.resetShadow();

  for (const [name, blob] of Object.entries(result.mediaFiles ?? {})) {
    const data = new Uint8Array(await (blob as Blob).arrayBuffer());
    await $typst.mapShadow(`/tmp/${name}`, data);
  }

  // Step 3 — Compile to PDF via mainContent (avoids project-root access denial)
  const pdfBytes = await $typst.pdf({ mainContent: typstSrc });
  if (!pdfBytes || pdfBytes.length === 0) {
    throw new Error('Typst produced an empty PDF. The document may use unsupported features.');
  }
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

// ── Component ───────────────────────────────────────────────────────────────

const PAGE_PX: Record<PageSize, number> = { a4: 794, letter: 816 };
const MARGIN_PX = 72;

export function WordToPdfUI() {
  const [conversion, setConversion]     = useState<Conversion | null>(null);
  const [pageSize, setPageSize]         = useState<PageSize>('a4');
  const [isReading, setIsReading]       = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [loadMsg, setLoadMsg]           = useState('');
  const [error, setError]               = useState<string | null>(null);
  const [pdfBlob, setPdfBlob]           = useState<Blob | null>(null);

  const loadFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.docx?$/i)) {
      setError('Only .docx files are supported. Please save your document as .docx first.');
      return;
    }
    setError(null);
    setConversion(null);
    setPdfBlob(null);
    setIsReading(true);
    try {
      const mammoth = await import('mammoth');
      const buf = await file.arrayBuffer();
      const result = await mammoth.default.convertToHtml({ arrayBuffer: buf });
      setConversion({
        html: result.value,
        filename: file.name.replace(/\.docx?$/i, '.pdf'),
        warnings: result.messages.filter((m) => m.type === 'warning').map((m) => m.message),
        file,
      });
    } catch {
      setError('Could not read the file. Make sure it is a valid .docx file.');
    } finally {
      setIsReading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (files: File[]) => { if (files[0]) loadFile(files[0]); },
    [loadFile]
  );

  const convert = useCallback(async () => {
    if (!conversion) return;
    setError(null);
    setPdfBlob(null);
    setIsConverting(true);
    try {
      const blob = await docxToPdf(conversion.file, pageSize, setLoadMsg);
      setPdfBlob(blob);
    } catch (e) {
      console.error('[WordToPdf] conversion error:', e);
      let msg = 'Conversion failed. Please try a different document.';
      if (e instanceof Error) {
        msg = e.message;
      } else if (typeof e === 'string') {
        msg = e;
      } else if (Array.isArray(e) && e.length > 0) {
        // Typst throws SourceDiagnostic[]
        const d = e[0] as { message?: string; severity?: string };
        msg = d?.message ?? JSON.stringify(e[0]);
      } else if (e != null) {
        msg = JSON.stringify(e);
      }
      setError(msg);
    } finally {
      setIsConverting(false);
      setLoadMsg('');
    }
  }, [conversion, pageSize]);

  const download = useCallback(() => {
    if (!pdfBlob || !conversion) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = conversion.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }, [pdfBlob, conversion]);

  const reset = useCallback(() => {
    setConversion(null);
    setPdfBlob(null);
    setError(null);
    setIsConverting(false);
    setLoadMsg('');
  }, []);

  const containerW = PAGE_PX[pageSize];

  return (
    <div className="rounded-2xl bg-surface bd-2 overflow-hidden" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">Word to PDF</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center h-8 rounded-lg bd-2 overflow-hidden text-[12px] font-medium">
            {(['a4', 'letter'] as PageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setPageSize(s)}
                className={`px-3 h-full transition-colors ${pageSize === s ? 'bg-accent text-white' : 'text-fg-2 hover:text-fg-1'}`}
              >
                {s === 'a4' ? 'A4' : 'Letter'}
              </button>
            ))}
          </div>
          {!conversion && <span className="text-[11px] text-fg-3 font-data">.docx only</span>}
        </div>
      </div>

      {/* ── Drop zone ── */}
      {!conversion && !isReading && (
        <div className="p-5">
          <DropZone
            onFiles={handleDrop}
            accept={[
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword',
            ]}
          />
          <p className="text-center text-[12px] text-fg-3 mt-3">
            Supports .docx files — zero upload, processed entirely in your browser
          </p>
        </div>
      )}

      {/* ── Reading spinner ── */}
      {isReading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <svg className="w-6 h-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-[13px] text-fg-2">Reading document…</span>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-red-400" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[13px] text-red-400 leading-normal">{error}</span>
        </div>
      )}

      {/* ── Preview + controls ── */}
      {conversion && !isReading && (
        <>
          {conversion.warnings.length > 0 && (
            <div className="mx-5 mt-4 flex items-start gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-4 py-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-amber-400" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-[12px] text-amber-400 leading-normal">
                Some formatting may differ from the original (complex tables, custom fonts, text boxes).
              </span>
            </div>
          )}

          {/* Scrollable preview (mammoth HTML — instant, no WASM) */}
          <div className="relative mx-5 my-4">
            <div className="overflow-auto rounded-[10px] bd-2" style={{ maxHeight: 520, background: '#f5f5f0' }}>
              <div className="flex justify-center py-6 px-4">
                <div
                  className="shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-white"
                  style={{ width: Math.min(containerW, 700), minHeight: 400 }}
                >
                  <div
                    className="docx-preview"
                    style={{ padding: `${MARGIN_PX * 0.8}px ${MARGIN_PX}px` }}
                    dangerouslySetInnerHTML={{ __html: conversion.html }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 pb-5 space-y-3">

            {/* Converting state */}
            {isConverting && (
              <div className="flex items-center justify-center gap-3 h-13">
                <svg className="w-5 h-5 animate-spin text-accent shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-[13px] text-fg-2">{loadMsg || 'Processing…'}</span>
              </div>
            )}

            {/* Convert button */}
            {!isConverting && !pdfBlob && (
              <button
                onClick={convert}
                className="w-full inline-flex items-center justify-center gap-2.5 h-13 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-accent dark:hover:bg-accent-hover text-white font-semibold text-[15px] tracking-[-0.01em] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                Convert to PDF →
              </button>
            )}

            {/* Download + info */}
            {!isConverting && pdfBlob && (
              <>
                <button
                  onClick={download}
                  className="w-full inline-flex items-center justify-center gap-2.5 h-13 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:bg-accent dark:hover:bg-accent-hover text-white font-semibold text-[15px] tracking-[-0.01em] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                >
                  Save as PDF →
                </button>
                <div className="rounded-[10px] border border-amber-400/30 bg-amber-50/60 dark:bg-amber-400/8 dark:border-amber-400/20 px-4 py-3">
                  <p className="text-[12.5px] text-amber-700 dark:text-amber-300/80 leading-[1.55] m-0">
                    Generated with Pandoc + Typst — real vector PDF, fully searchable text. No file uploaded to any server.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-2 h-11.5 rounded-full bd-2 text-[14px] font-medium text-fg-2 hover:text-fg-1 hover:bd-accent transition-all"
            >
              Convert another file →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
