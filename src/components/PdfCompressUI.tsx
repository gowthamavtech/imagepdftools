'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DropZone } from './DropZone';
import { useHandoffStore } from '@/store/handoffStore';

// ── Canvas-based PDF viewer (works on Android / no native PDF support) ────────
function PdfJsViewer({ url }: { url: string }) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [rendered, setRendered] = useState(0);
  const [total, setTotal]       = useState(0);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const res  = await fetch(url);
      const buf  = await res.arrayBuffer();
      const pdf  = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
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
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.9));
        if (blob) {
          const pageUrl = URL.createObjectURL(blob);
          urls.push(pageUrl);
          if (!cancelled) { setPageUrls([...urls]); setRendered(i); }
        }
      }
    })().catch(() => {});
    return () => { cancelled = true; urls.forEach(URL.revokeObjectURL); };
  }, [url]);

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
      {pageUrls.map((u, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={u} alt={`Page ${i + 1}`} className="max-w-full shadow-lg rounded" />
      ))}
      {rendered < total && (
        <p className="text-xs text-slate-400 py-2">{rendered} / {total} pages rendered…</p>
      )}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
const PRESETS = [
  { id: 'low',    label: 'Low',    quality: 85 },
  { id: 'medium', label: 'Medium', quality: 65 },
  { id: 'strong', label: 'Strong', quality: 30 },
] as const;

type PresetId = (typeof PRESETS)[number]['id'] | null;

interface PdfFileEntry {
  id: string;
  file: File;
  quality: number;
  preset: PresetId;
}

interface PdfResult {
  bytes: Uint8Array;
  url: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function pct(before: number, after: number) {
  return Math.round((1 - after / before) * 100);
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => { blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')); },
      'image/jpeg',
      quality,
    );
  });
}

function makeEntry(file: File): PdfFileEntry {
  return { id: generateId(), file, quality: 65, preset: 'medium' };
}

// ── Core compression ──────────────────────────────────────────────────────────
async function compressPdfBytes(
  file: File,
  quality: number,
  onProgress: (p: number) => void,
): Promise<Uint8Array> {
  // Keep JPEG quality high so text stays sharp — use render scale for size reduction.
  // JPEG quality below ~80% creates visible DCT artifacts on text edges.
  const jpegQuality = 0.80 + (quality / 95) * 0.15;   // 0.80 – 0.95
  const renderScale = 0.75 + (quality / 95) * 1.25;   // 0.75 – 2.0

  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  const pdfBytes = new Uint8Array(await file.arrayBuffer());
  const pdfDoc   = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  const numPages = pdfDoc.numPages;

  const { PDFDocument } = await import('pdf-lib');
  const outDoc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page     = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: renderScale });
    const canvas   = document.createElement('canvas');
    canvas.width   = Math.floor(viewport.width);
    canvas.height  = Math.floor(viewport.height);
    await page.render({ canvas, viewport }).promise;
    const jpegBlob  = await canvasToJpeg(canvas, jpegQuality);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const { width: ptW, height: ptH } = page.getViewport({ scale: 1 });
    const embedded  = await outDoc.embedJpg(jpegBytes);
    const outPage   = outDoc.addPage([ptW, ptH]);
    outPage.drawImage(embedded, { x: 0, y: 0, width: ptW, height: ptH });
    onProgress(Math.round((i / numPages) * 100));
  }

  return outDoc.save();
}

// ── Main component ────────────────────────────────────────────────────────────
export function PdfCompressUI() {
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef     = useRef(consumeHandoff);

  const [files,         setFiles]         = useState<PdfFileEntry[]>([]);
  const [results,       setResults]       = useState<Record<string, PdfResult>>({});
  const [progressMap,   setProgressMap]   = useState<Record<string, number>>({});
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [editingIds,    setEditingIds]    = useState<Set<string>>(new Set());
  const [errorMap,      setErrorMap]      = useState<Record<string, string>>({});
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [viewerId,      setViewerId]      = useState<string | null>(null);
  const [sourceLabel,   setSourceLabel]   = useState<string | null>(null);

  const filesRef = useRef<PdfFileEntry[]>([]);
  filesRef.current = files;

  const nativePdf = typeof navigator !== 'undefined'
    && navigator.pdfViewerEnabled
    && !/android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!viewerId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setViewerId(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerId]);

  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeRef.current();
    if (f && f.type === 'application/pdf') { setSourceLabel(sl); setFiles([makeEntry(f)]); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── File management ────────────────────────────────────────────────────────
  const addFiles = useCallback((incoming: File[]) => {
    const valid = incoming.filter((f) => f.type === 'application/pdf');
    if (valid.length === 0) return;
    setFiles((prev) => [...prev, ...valid.map(makeEntry)]);
  }, []);

  const updateEntry = useCallback((id: string, patch: Partial<Pick<PdfFileEntry, 'quality' | 'preset'>>) => {
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, ...patch } : f));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setResults((prev) => { if (prev[id]) URL.revokeObjectURL(prev[id].url); const n = { ...prev }; delete n[id]; return n; });
    setProgressMap((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setErrorMap((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setProcessingIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setEditingIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setViewerId((prev) => (prev === id ? null : prev));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setResults((prev) => { Object.values(prev).forEach((r) => URL.revokeObjectURL(r.url)); return {}; });
    setProgressMap({});
    setErrorMap({});
    setProcessingIds(new Set());
    setEditingIds(new Set());
    setViewerId(null);
  }, []);

  // ── Compression ────────────────────────────────────────────────────────────
  const compressFile = useCallback(async (entry: PdfFileEntry) => {
    setProcessingIds((prev) => new Set(prev).add(entry.id));
    setErrorMap((prev) => { const n = { ...prev }; delete n[entry.id]; return n; });
    setProgressMap((prev) => ({ ...prev, [entry.id]: 0 }));
    try {
      const bytes = await compressPdfBytes(entry.file, entry.quality, (p) => {
        setProgressMap((prev) => ({ ...prev, [entry.id]: p }));
      });
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      setResults((prev) => {
        if (prev[entry.id]) URL.revokeObjectURL(prev[entry.id].url);
        return { ...prev, [entry.id]: { bytes, url } };
      });
      setEditingIds((prev) => { const s = new Set(prev); s.delete(entry.id); return s; });
    } catch (err) {
      setErrorMap((prev) => ({
        ...prev,
        [entry.id]: (err as Error).message || 'Compression failed. Please try again.',
      }));
    } finally {
      setProcessingIds((prev) => { const s = new Set(prev); s.delete(entry.id); return s; });
    }
  }, []);

  const compressAll = useCallback(() => {
    filesRef.current.forEach((entry) => {
      if (!processingIds.has(entry.id) && !results[entry.id]) compressFile(entry);
    });
  }, [compressFile, processingIds, results]);

  // ── Download ───────────────────────────────────────────────────────────────
  const downloadFile = useCallback((id: string) => {
    const result = results[id];
    const entry  = filesRef.current.find((f) => f.id === id);
    if (!result || !entry) return;
    const blob = new Blob([result.bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = entry.file.name.replace(/\.pdf$/i, '') + '-compressed.pdf';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedIds((prev) => new Set(prev).add(id));
    setTimeout(() => setDownloadedIds((prev) => { const s = new Set(prev); s.delete(id); return s; }), 1500);
  }, [results]);

  const downloadAllZip = useCallback(async () => {
    const entries = filesRef.current
      .filter((f) => results[f.id])
      .map((f) => ({
        name: f.file.name.replace(/\.pdf$/i, '') + '-compressed.pdf',
        blob: new Blob([results[f.id].bytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
      }));
    if (entries.length === 0) return;
    const { downloadAllAsZip } = await import('@/lib/zip');
    await downloadAllAsZip(entries);
  }, [results]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const doneCount    = files.filter((f) => results[f.id]).length;
  const allDone      = files.length > 0 && doneCount === files.length;
  const anyProcessing = processingIds.size > 0;
  const viewerEntry  = viewerId ? filesRef.current.find((f) => f.id === viewerId) : null;
  const viewerResult = viewerId ? results[viewerId] : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      <div className="mt-6">
        <DropZone
          onFiles={addFiles}
          accept={['application/pdf']}
          multiple={true}
          label="Drop your PDFs here"
          hint="PDF files only · processed entirely in your browser"
          browseLabel="Browse PDFs"
          fileTypeName="PDF"
        />
      </div>

      {sourceLabel && files.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 px-3 py-1.5 rounded-full w-fit">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          From: {sourceLabel}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-4">

          {/* ── Toolbar ── */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {allDone ? (
                <span className="text-emerald-500 font-semibold">{doneCount} of {files.length} compressed ✓</span>
              ) : (
                <span>
                  <span className="font-semibold text-violet-400">{doneCount}</span>
                  {' '}of <span className="font-semibold">{files.length}</span> compressed
                  {anyProcessing && (
                    <span className="ml-2 inline-flex items-center gap-1 text-slate-500">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      {processingIds.size} pending
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {doneCount > 1 && (
                <button
                  onClick={downloadAllZip}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent btn-accent text-[12.5px] font-semibold"
                  style={{ color: 'var(--on-accent)' }}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save All
                </button>
              )}
              {!allDone && <button
                onClick={compressAll}
                disabled={anyProcessing}
                className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bd-accent text-accent text-[12.5px] font-semibold btn-accent-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {anyProcessing ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Compressing…
                  </>
                ) : 'Compress All'}
              </button>}
            </div>
          </div>

          {/* ── File cards ── */}
          <div className="space-y-3">
            {files.map((entry) => {
              const result       = results[entry.id];
              const progress     = progressMap[entry.id] ?? 0;
              const isProcessing = processingIds.has(entry.id);
              const isEditing    = editingIds.has(entry.id);
              const error        = errorMap[entry.id];
              const saving       = result ? pct(entry.file.size, result.bytes.byteLength) : 0;
              const showOptions  = !result || isEditing || !!error;

              return (
                <div key={entry.id} className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 shadow-sm overflow-hidden">

                  {/* File header */}
                  <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{entry.file.name}</p>
                      <p className="text-xs text-slate-500">{formatBytes(entry.file.size)}</p>
                    </div>
                    <button onClick={() => removeFile(entry.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Per-file options — hidden once compressed (unless editing) */}
                  <div className="px-4 pb-4 border-t border-slate-100 dark:border-white/6 pt-3 space-y-3">

                    {showOptions && (
                      <>
                        {/* Preset toggle */}
                        <div className="flex gap-1.5">
                          {PRESETS.map((p) => {
                            const isSelected = entry.preset === p.id;
                            return (
                              <button
                                key={p.id}
                                onClick={() => updateEntry(entry.id, { preset: p.id, quality: p.quality })}
                                className={`flex-1 h-8 rounded-lg text-[12px] font-semibold focus:outline-none ${
                                  isSelected ? 'bg-accent btn-accent' : 'preset-toggle'
                                }`}
                                style={isSelected ? { color: 'var(--on-accent)' } : undefined}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Quality slider */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11.5px] text-fg-3">Quality</span>
                            <span className="font-data text-[11.5px] font-semibold text-accent tabular-nums">{entry.quality}</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={95}
                            step={1}
                            value={entry.quality}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              const match = PRESETS.find((p) => p.quality === v);
                              updateEntry(entry.id, { quality: v, preset: match ? match.id : null });
                            }}
                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((entry.quality - 10) / 85) * 100}%, var(--border-3) ${((entry.quality - 10) / 85) * 100}%, var(--border-3) 100%)`,
                            }}
                          />
                          <div className="flex justify-between">
                            <span className="text-[10px] text-fg-3">Smaller file</span>
                            <span className="text-[10px] text-fg-3">Higher quality</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Progress bar */}
                    {isProcessing && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Compressing…</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Error */}
                    {error && !isProcessing && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}

                    {/* Result */}
                    {result && !isProcessing && (
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <span className="text-slate-500">{formatBytes(entry.file.size)}</span>
                          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <span className="font-semibold text-slate-900 dark:text-slate-50">{formatBytes(result.bytes.byteLength)}</span>
                          <span className={`ml-auto font-bold px-2 py-0.5 rounded-full text-[11px] ${
                            saving > 0
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                              : saving < 0
                              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                          }`}>
                            {saving > 0 ? `−${saving}%` : saving < 0 ? `+${Math.abs(saving)}%` : 'No change'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadFile(entry.id)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-xl bg-accent btn-accent text-[12.5px] font-semibold"
                            style={{ color: 'var(--on-accent)' }}
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {downloadedIds.has(entry.id) ? 'Saved ✓' : 'Save'}
                          </button>
                          <button
                            onClick={() => setViewerId(entry.id)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-xl bd-accent text-accent text-[12.5px] font-semibold btn-accent-outline"
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            View PDF
                          </button>
                          <button
                            onClick={() => setEditingIds((prev) => new Set(prev).add(entry.id))}
                            className="h-9 px-3 rounded-xl preset-toggle text-[12px] font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Compress / Retry / Recompress */}
                    {showOptions && !isProcessing && (
                      <button
                        onClick={() => compressFile(entry)}
                        className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-xl bd-accent text-accent text-[12.5px] font-semibold btn-accent-outline"
                      >
                        {error ? 'Retry' : isEditing ? 'Recompress' : 'Compress'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {files.length > 1 && (
            <button
              onClick={clearAll}
              className="w-full py-2.5 rounded-xl bd-2 text-sm text-fg-2 hover:text-fg-1 hover:bd-accent transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* ── PDF viewer modal ── */}
      {viewerEntry && viewerResult && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
          onClick={() => setViewerId(null)}
        >
          <div
            className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
              <button
                onClick={() => setViewerId(null)}
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
                <p className="text-sm font-medium text-slate-100 truncate">
                  {viewerEntry.file.name.replace(/\.pdf$/i, '')}-compressed.pdf
                </p>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 tracking-wide shrink-0">PDF</span>
              </div>
              <button onClick={() => setViewerId(null)} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {nativePdf
                ? <iframe src={viewerResult.url} title="PDF Preview" className="border-0 absolute inset-0 w-full h-full" />
                : <PdfJsViewer url={viewerResult.url} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
