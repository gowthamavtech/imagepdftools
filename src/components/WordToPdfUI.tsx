'use client';

import { useState, useCallback, useEffect } from 'react';
import { DropZone } from './DropZone';
import { useFastConvert } from '@/hooks/useDocxConverter';
import { useLibreOffice } from '@/hooks/useLibreOffice';
import { analyzeDocx, type DocxAnalysis } from '@/lib/analyze-docx';
import { PdfNextActions } from './PdfNextActions';

// ── Inline PDF viewer — canvas-based, works on mobile ─────────────────────────

function PdfJsViewer({ blob }: { blob: Blob }) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [rendered, setRendered] = useState(0);
  const [total, setTotal]       = useState(0);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const pdf   = await pdfjsLib.getDocument({ data: bytes }).promise;
      if (cancelled) return;
      setTotal(pdf.numPages);
      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelled) break;
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas   = document.createElement('canvas');
        canvas.width   = viewport.width;
        canvas.height  = viewport.height;
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

// ── Types ──────────────────────────────────────────────────────────────────────

type PageSize = 'a4' | 'letter';
type Mode     = 'fast' | 'hd';

interface Preview {
  html:     string;
  filename: string;
  warnings: string[];
  file:     File;
}

const PAGE_PX: Record<PageSize, number> = { a4: 794, letter: 816 };
const MARGIN_PX = 72;

// ── Component ─────────────────────────────────────────────────────────────────

export function WordToPdfUI() {
  const [preview,     setPreview]     = useState<Preview | null>(null);
  const [pageSize,    setPageSize]    = useState<PageSize>('a4');
  const [isReading,   setIsReading]   = useState(false);
  const [readError,   setReadError]   = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [analysis,    setAnalysis]    = useState<DocxAnalysis | null>(null);
  const [mode,        setMode]        = useState<Mode | null>(null);

  // Both hooks always instantiated (React rules)
  const fast = useFastConvert();
  const hd   = useLibreOffice();

  // Active hook values, unified for the progress / result UI
  const active = mode === 'hd' ? hd : fast;
  const isConverting = mode !== null && (
    mode === 'fast'
      ? (fast.status === 'parsing' || fast.status === 'font-query' || fast.status === 'converting')
      : (hd.status === 'loading' || hd.status === 'converting')
  );
  const isDone  = mode === 'fast' ? fast.status === 'done'  : hd.status === 'done';
  const pdfBlob = mode === 'fast' ? fast.pdfBlob : hd.pdfBlob;
  const activeError = mode === 'fast' ? fast.error : hd.error;

  // progress percent — fast hook uses its own; hd hook exposes percent directly
  const activePercent = mode === 'hd'
    ? hd.percent
    : (() => {
        const s = fast.status;
        if (s === 'parsing')    return 15;
        if (s === 'font-query') return 35;
        if (s === 'done')       return 100;
        return fast.percent;
      })();

  const activeProgress = mode === 'hd' ? hd.progress : fast.progress;

  // Mobile detection — warn user that HD mode may crash
  const isMobile = typeof navigator !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  const nativePdf = typeof navigator !== 'undefined' && navigator.pdfViewerEnabled && !isMobile;

  // Start loading the LibreOffice engine silently on mount so it initialises in
  // the background while the user reads the page and prepares their file.
  // By the time they click HD Convert the engine may already be warm.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { hd.preInit(); }, []);

  // Esc closes preview modal
  useEffect(() => {
    if (!showPreview) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowPreview(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [showPreview]);

  // ── File drop → mammoth preview + docx analysis ─────────────────────────────

  const loadFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.docx?$/i)) { setReadError('Only .docx files are supported.'); return; }
    setReadError(null);
    setPreview(null);
    setAnalysis(null);
    setMode(null);
    fast.reset();
    hd.reset();
    setIsReading(true);
    try {
      const [mammoth, docxAnalysis] = await Promise.all([
        import('mammoth'),
        analyzeDocx(file),
      ]);
      const buf    = await file.arrayBuffer();
      const result = await mammoth.default.convertToHtml({ arrayBuffer: buf });
      setPreview({
        html:     result.value,
        filename: file.name.replace(/\.docx?$/i, '.pdf'),
        warnings: result.messages.filter((m) => m.type === 'warning').map((m) => m.message),
        file,
      });
      setAnalysis(docxAnalysis);
    } catch {
      setReadError('Could not read the file. Make sure it is a valid .docx file.');
    } finally {
      setIsReading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrop = useCallback(
    (files: File[]) => { if (files[0]) loadFile(files[0]); },
    [loadFile],
  );

  // ── Conversion trigger ───────────────────────────────────────────────────────

  const handleConvert = useCallback((selectedMode: Mode) => {
    if (!preview) return;
    setMode(selectedMode);
    if (selectedMode === 'fast') {
      fast.convert(preview.file, pageSize);
    } else {
      hd.convert(preview.file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, pageSize]);

  // ── Save PDF ─────────────────────────────────────────────────────────────────

  const save = useCallback(() => {
    if (!pdfBlob || !preview) return;
    const url = URL.createObjectURL(pdfBlob);
    const a   = document.createElement('a');
    a.href    = url;
    a.download = preview.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }, [pdfBlob, preview]);

  // ── Full reset ───────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setPreview(null);
    setReadError(null);
    setAnalysis(null);
    setMode(null);
    fast.reset();
    hd.reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayError = readError ?? activeError;
  const containerW   = PAGE_PX[pageSize];

  // ── Recommendation copy ───────────────────────────────────────────────────────

  const recLabel = analysis?.reasons.length
    ? `This document has ${analysis.reasons.join(', ')}. HD Convert is recommended.`
    : 'This document looks simple — Fast Convert should work great.';

  return (
    <div
      className="rounded-2xl bg-surface bd-2 overflow-hidden"
      style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">Word to PDF</span>
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
          {!preview && <span className="text-[11px] text-fg-3 font-data">.docx only</span>}
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
          <span className="text-[13px] text-red-400 leading-normal">{displayError}</span>
        </div>
      )}

      {/* ── Converting: progress ── */}
      {preview && isConverting && (
        <div className="flex flex-col items-center justify-center gap-5 py-16 px-8">
          <svg className="w-12 h-12 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="var(--border-1)" strokeWidth="4" />
            <path d="M44 24a20 20 0 0 0-20-20" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-center space-y-1">
            <p className="text-[17px] font-bold text-fg-1 tracking-[-0.02em]">
              {mode === 'hd' ? 'HD Convert running…' : 'Converting Word to PDF…'}
            </p>
            <p className="font-data text-[12px] text-fg-3">
              {activeProgress || 'Processing…'} · {activePercent}%
            </p>
          </div>
          <div className="w-full max-w-70">
            <div className="h-0.75 w-full rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${activePercent}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>
          {mode === 'hd' && hd.status === 'loading' && (
            <p className="text-[11px] text-fg-3 text-center max-w-xs">
              First run downloads ~250 MB and initialises the engine. Files are cached to your device — future conversions start in seconds.
            </p>
          )}
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
                Some formatting may differ from the original (complex tables, custom fonts, text boxes).
              </span>
            </div>
          )}

          {/* Mammoth HTML preview */}
          <div className="relative mx-5 my-4">
            <div className="overflow-auto rounded-[10px] bd-2" style={{ maxHeight: 520, background: '#f5f5f0' }}>
              <div className="flex justify-center py-6 px-4">
                <div className="shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-white" style={{ width: Math.min(containerW, 700), minHeight: 400 }}>
                  <div
                    className="docx-preview"
                    style={{ padding: `${MARGIN_PX * 0.8}px ${MARGIN_PX}px` }}
                    dangerouslySetInnerHTML={{ __html: preview.html }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 flex flex-col gap-3">

            {/* ── Mode picker (shown before any conversion) ── */}
            {!isDone && !mode && analysis && (
              <>
                {/* Recommendation hint */}
                <p className="text-[12px] text-fg-3 leading-relaxed">
                  {recLabel}
                </p>

                {/* Two engine cards */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Fast Convert */}
                  <button
                    onClick={() => handleConvert('fast')}
                    className={`flex flex-col gap-1.5 p-4 rounded-xl bd-2 text-left transition-all hover:border-accent/40 hover:bg-accent/5 ${
                      analysis.recommendation === 'fast' ? 'border-accent/30 bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[15px]">⚡</span>
                      <span className="text-[13px] font-semibold text-fg-1">Fast Convert</span>
                      {analysis.recommendation === 'fast' && (
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/20 text-accent">Recommended</span>
                      )}
                    </div>
                    <p className="text-[11px] text-fg-3 leading-snug">Quick · ~97 MB first load</p>
                    <p className="text-[11px] text-fg-3 leading-snug">Works on all devices</p>
                  </button>

                  {/* HD Convert */}
                  <button
                    onClick={() => handleConvert('hd')}
                    disabled={isMobile}
                    className={`flex flex-col gap-1.5 p-4 rounded-xl bd-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent/40 hover:bg-accent/5 ${
                      analysis.recommendation === 'hd' ? 'border-accent/30 bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[15px]">🎯</span>
                      <span className="text-[13px] font-semibold text-fg-1">HD Convert</span>
                      {hd.isEngineReady ? (
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Engine ready</span>
                      ) : hd.isEngineLoading ? (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-fg-3">
                          <svg className="w-2.5 h-2.5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeDasharray="28 56" />
                          </svg>
                          Loading engine…
                        </span>
                      ) : analysis.recommendation === 'hd' ? (
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/20 text-accent">Recommended</span>
                      ) : null}
                    </div>
                    <p className="text-[11px] text-fg-3 leading-snug">Pixel-perfect · LibreOffice engine</p>
                    <p className="text-[11px] text-fg-3 leading-snug">
                      {hd.isEngineReady
                        ? 'Instant — engine already loaded'
                        : hd.isEngineLoading
                        ? 'Loading in background — click to convert when ready'
                        : isMobile
                        ? 'Desktop only'
                        : '~250 MB first load · cached after'}
                    </p>
                  </button>
                </div>
              </>
            )}

            {/* ── Done: save + quality badge + continue ── */}
            {isDone && pdfBlob && (
              <>
                <div className="flex items-center gap-2 px-0.5">
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-500 shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Converted
                  </span>
                  <span className="text-[12px] text-fg-3 truncate">{preview.filename}</span>
                  <span className="ml-auto text-[11px] font-medium text-fg-3 shrink-0">
                    {mode === 'hd' ? '🎯 HD' : '⚡ Fast'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={save}
                    className="btn-accent w-1/2 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Save PDF
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-1/2 inline-flex items-center justify-center gap-2 h-12 rounded-xl bd-2 text-[14px] font-semibold text-fg-2 hover:text-fg-1 transition-colors cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                    View PDF
                  </button>
                </div>

                {mode === 'fast' && fast.fontCount > 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-fg-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {fast.fontCount} system font{fast.fontCount !== 1 ? 's' : ''} matched · vector PDF · fully searchable
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center h-9 rounded-xl text-[13px] font-medium text-accent hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Convert another file
                </button>

                <PdfNextActions
                  blob={pdfBlob}
                  filename={preview.filename}
                  sourceLabel="Word to PDF"
                />
              </>
            )}

            {/* ── Not done: change file ── */}
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
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
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

// ── Icon helpers ───────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="w-5 h-5 animate-spin text-accent shrink-0" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-red-400" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-amber-400" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
