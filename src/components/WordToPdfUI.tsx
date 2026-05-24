'use client';

import { useState, useCallback, useEffect } from 'react';
import { DropZone } from './DropZone';
import { useDocxConverter, type ConversionStatus } from '@/hooks/useDocxConverter';
import { PdfNextActions } from './PdfNextActions';

// ── Inline PDF viewer — canvas-based, works on Android/mobile ─────────────────
function PdfJsViewer({ blob }: { blob: Blob }) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [rendered, setRendered] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      if (cancelled) return;
      setTotal(pdf.numPages);
      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelled) break;
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas }).promise;
        const pageBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
        if (pageBlob) {
          const url = URL.createObjectURL(pageBlob);
          urls.push(url);
          if (!cancelled) { setPageUrls([...urls]); setRendered(i); }
        }
      }
    })().catch(() => {});
    return () => { cancelled = true; urls.forEach(URL.revokeObjectURL); };
  }, [blob]);

  if (pageUrls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
        <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        {total > 0 && <p className="text-xs">{rendered} / {total} pages</p>}
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full bg-slate-700 flex flex-col items-center gap-2 py-4 px-2">
      {pageUrls.map((url, i) => (
        <img key={i} src={url} alt={`Page ${i + 1}`} className="max-w-full shadow-lg rounded" />
      ))}
      {rendered < total && (
        <p className="text-xs text-slate-400 py-2">{rendered} / {total} pages rendered…</p>
      )}
    </div>
  );
}

type PageSize = 'a4' | 'letter';

interface Preview {
  html: string;
  filename: string;
  warnings: string[];
  file: File;
}

const PAGE_PX: Record<PageSize, number> = { a4: 794, letter: 816 };
const MARGIN_PX = 72;

function statusLabel(status: ConversionStatus, progress: string): string {
  if (progress) return progress;
  switch (status) {
    case 'parsing':    return 'Reading document…';
    case 'font-query': return 'Requesting font access…';
    case 'converting': return 'Converting…';
    default:           return 'Processing…';
  }
}

function progressPercent(status: ConversionStatus, progress: string): number {
  if (progress.includes('Parsing') || status === 'parsing')           return 15;
  if (progress.includes('font') || status === 'font-query')           return 35;
  if (progress.includes('Pandoc WASM'))                               return 52;
  if (progress.includes('Converting document'))                       return 66;
  if (progress.includes('Typst compiler'))                            return 80;
  if (progress.includes('Compiling'))                                 return 92;
  if (status === 'done')                                              return 100;
  return 8;
}

export function WordToPdfUI() {
  const [preview, setPreview]       = useState<Preview | null>(null);
  const [pageSize, setPageSize]     = useState<PageSize>('a4');
  const [isReading, setIsReading]   = useState(false);
  const [readError, setReadError]   = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const nativePdf = typeof navigator !== 'undefined' && navigator.pdfViewerEnabled && !/android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!showPreview) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowPreview(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showPreview]);

  const { status, progress, pdfBlob, error, fontCount, convert, reset } =
    useDocxConverter();

  const isConverting = status === 'parsing' || status === 'font-query' || status === 'converting';
  const isDone = status === 'done';
  const containerW = PAGE_PX[pageSize];

  // ── File load (preview only — mammoth HTML, instant, no WASM) ──────────────
  const loadFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.docx?$/i)) {
      setReadError('Only .docx files are supported.');
      return;
    }
    setReadError(null);
    setPreview(null);
    reset();
    setIsReading(true);
    try {
      const mammoth = await import('mammoth');
      const buf = await file.arrayBuffer();
      const result = await mammoth.default.convertToHtml({ arrayBuffer: buf });
      setPreview({
        html: result.value,
        filename: file.name.replace(/\.docx?$/i, '.pdf'),
        warnings: result.messages
          .filter((m) => m.type === 'warning')
          .map((m) => m.message),
        file,
      });
    } catch {
      setReadError('Could not read the file. Make sure it is a valid .docx file.');
    } finally {
      setIsReading(false);
    }
  }, [reset]);

  const handleDrop = useCallback(
    (files: File[]) => { if (files[0]) loadFile(files[0]); },
    [loadFile]
  );

  // ── Conversion — hand off to the worker via the hook ───────────────────────
  const handleConvert = useCallback(() => {
    if (!preview) return;
    convert(preview.file, pageSize);
  }, [preview, pageSize, convert]);

  // ── Download ───────────────────────────────────────────────────────────────
  const download = useCallback(() => {
    if (!pdfBlob || !preview) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = preview.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }, [pdfBlob, preview]);

  // ── View in modal ──────────────────────────────────────────────────────────
  const viewInBrowser = useCallback(() => {
    setShowPreview(true);
  }, []);

  // ── Full reset ─────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setPreview(null);
    setReadError(null);
    reset();
  }, [reset]);

  const displayError = readError ?? error;

  return (
    <div
      className="rounded-2xl bg-surface bd-2 overflow-hidden"
      style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">
          Word to PDF
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center h-8 rounded-lg bd-2 overflow-hidden text-[12px] font-medium">
            {(['a4', 'letter'] as PageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setPageSize(s)}
                className={`px-3 h-full transition-colors ${
                  pageSize === s ? 'bg-accent text-white' : 'text-fg-2 hover:text-fg-1'
                }`}
              >
                {s === 'a4' ? 'A4' : 'Letter'}
              </button>
            ))}
          </div>
          {!preview && (
            <span className="text-[11px] text-fg-3 font-data">.docx only</span>
          )}
        </div>
      </div>

      {/* ── Drop zone ── */}
      {!preview && !isReading && (
        <div className="p-5">
          <DropZone
            onFiles={handleDrop}
            accept={[
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword',
            ]}
          />
          <p className="text-center text-[12px] text-fg-3 mt-3">
            Supports .docx — processed in your browser, nothing uploaded
          </p>
        </div>
      )}

      {/* ── Reading spinner ── */}
      {isReading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Spinner />
          <span className="text-[13px] text-fg-2">Reading document…</span>
        </div>
      )}

      {/* ── Error banner ── */}
      {displayError && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <ErrorIcon />
          <span className="text-[13px] text-red-400 leading-normal">
            {displayError}
          </span>
        </div>
      )}

      {/* ── Converting: full centered progress ── */}
      {preview && isConverting && (
        <div className="flex flex-col items-center justify-center gap-5 py-16 px-8">
          <svg className="w-12 h-12 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="var(--border-1)" strokeWidth="4" />
            <path d="M44 24a20 20 0 0 0-20-20" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-center space-y-1">
            <p className="text-[17px] font-bold text-fg-1 tracking-[-0.02em]">Converting Word to PDF…</p>
            <p className="font-data text-[12px] text-fg-3">
              {statusLabel(status, progress)} · {progressPercent(status, progress)}%
            </p>
          </div>
          <div className="w-full max-w-70">
            <div className="h-0.75 w-full rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent(status, progress)}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Preview + controls (idle / done) ── */}
      {preview && !isReading && !isConverting && (
        <>
          {/* Formatting-loss warning */}
          {preview.warnings.length > 0 && (
            <div className="mx-5 mt-4 flex items-start gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-4 py-3">
              <WarnIcon />
              <span className="text-[12px] text-amber-400 leading-normal">
                Some formatting may differ from the original (complex tables,
                custom fonts, text boxes).
              </span>
            </div>
          )}

          {/* Mammoth HTML preview */}
          <div className="relative mx-5 my-4">
            <div
              className="overflow-auto rounded-[10px] bd-2"
              style={{ maxHeight: 520, background: '#f5f5f0' }}
            >
              <div className="flex justify-center py-6 px-4">
                <div
                  className="shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-white"
                  style={{ width: Math.min(containerW, 700), minHeight: 400 }}
                >
                  <div
                    className="docx-preview"
                    style={{ padding: `${MARGIN_PX * 0.8}px ${MARGIN_PX}px` }}
                    dangerouslySetInnerHTML={{ __html: preview.html }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action area */}
          <div className="px-5 pb-5 flex flex-col gap-3">

            {/* ── Convert button ── */}
            {!isDone && (
              <button
                onClick={handleConvert}
                className="btn-accent w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Convert to PDF
              </button>
            )}

            {/* ── Done: save + font badge + continue with ── */}
            {isDone && pdfBlob && (
              <>
                {/* Success row */}
                <div className="flex items-center gap-2 px-0.5">
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-500 shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Converted
                  </span>
                  <span className="text-[12px] text-fg-3 truncate">{preview?.filename}</span>
                </div>

                {/* Primary actions */}
                <div className="flex gap-2">
                  <button
                    onClick={download}
                    className="btn-accent w-1/2 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Save PDF
                  </button>
                  <button
                    onClick={viewInBrowser}
                    className="w-1/2 inline-flex items-center justify-center gap-2 h-12 rounded-xl bd-2 text-[14px] font-semibold text-fg-2 hover:text-fg-1 transition-colors cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                    View PDF
                  </button>
                </div>

                {/* Quality badge */}
                {fontCount > 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-fg-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {fontCount} system font{fontCount !== 1 ? 's' : ''} matched · vector PDF · fully searchable
                  </div>
                )}

                {/* Reset — before the tool cards so user sees it without scrolling */}
                <button
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center h-9 rounded-xl text-[13px] font-medium text-accent hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Convert another file
                </button>

                {/* Continue with tools */}
                <PdfNextActions
                  blob={pdfBlob}
                  filename={preview?.filename ?? 'document.pdf'}
                  sourceLabel="Word to PDF"
                />
              </>
            )}

            {/* ── Not done: reset to pick a different file ── */}
            {!isDone && (
              <button
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl bd-2 text-[13px] font-medium text-fg-2 hover:text-fg-1 transition-colors cursor-pointer"
              >
                Choose a different file
              </button>
            )}
          </div>
        </>
      )}

      {/* ── PDF preview modal ── */}
      {showPreview && pdfBlob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
              <button
                onClick={() => setShowPreview(false)}
                title="Close (Esc)"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="text-sm font-medium text-slate-100 truncate">{preview?.filename ?? 'document.pdf'}</p>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 tracking-wide shrink-0">PDF</span>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                title="Close (Esc)"
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Viewer */}
            <div className="flex-1 overflow-hidden relative">
              {nativePdf
                ? <iframe src={URL.createObjectURL(pdfBlob)} title="PDF Preview" className="border-0 absolute inset-0 w-full h-full" />
                : <PdfJsViewer blob={pdfBlob} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small shared icon components ───────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="w-5 h-5 animate-spin text-accent shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 mt-px text-red-400"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 mt-px text-amber-400"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
