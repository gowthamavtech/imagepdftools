'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DropZone } from './DropZone';
import { useHandoffStore } from '@/store/handoffStore';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';

function isPdfjsPasswordError(e: unknown): boolean {
  return (e as { name?: string })?.name === 'PasswordException';
}

interface PageInfo {
  index: number;
  originalSize: number;
  compressedSize: number;
}

const QUICK_PRESETS = [
  { label: 'Low',    value: 30 },
  { label: 'Medium', value: 65 },
  { label: 'High',   value: 85 },
];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function pct(before: number, after: number) {
  return Math.round((1 - after / before) * 100);
}

export function PdfCompressUI() {
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef     = useRef(consumeHandoff);

  const [file,          setFile]          = useState<File | null>(null);
  const [quality,       setQuality]       = useState(65);   // 10–95 JPEG quality %
  const [progress,      setProgress]      = useState(0);    // 0–100
  const [isWorking,     setIsWorking]     = useState(false);
  const [result,        setResult]        = useState<{ bytes: Uint8Array; pages: PageInfo[] } | null>(null);
  const [resultUrl,     setResultUrl]     = useState<string | null>(null);
  const [error,         setError]         = useState<string | null>(null);
  const [sourceLabel,   setSourceLabel]   = useState<string | null>(null);
  const [downloaded,    setDownloaded]    = useState(false);
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  // Auto-load PDF handed off from another tool (e.g. image-to-pdf)
  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeRef.current();
    if (f && f.type === 'application/pdf') { setSourceLabel(sl); setFile(f); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFile = useCallback((f: File) => {
    if (f.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const compress = useCallback(async (pw?: string) => {
    const password = pw ?? pdfPassword ?? undefined;
    if (!file) return;
    setIsWorking(true);
    setError(null);
    setProgress(0);

    try {
      const jpegQuality = quality / 100;
      // Higher quality → higher render scale for better fidelity (1.2 – 2.0)
      const renderScale = 1.2 + (quality / 95) * 0.8;

      // ── 1. Load pdfjs-dist ──────────────────────────────────────────────
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const pdfBytes  = new Uint8Array(await file.arrayBuffer());
      const loadTask  = pdfjsLib.getDocument({ data: pdfBytes, ...(password ? { password } : {}) });
      const pdfDoc    = await loadTask.promise;
      const numPages  = pdfDoc.numPages;

      // ── 2. Load pdf-lib for output PDF ──────────────────────────────────
      const { PDFDocument } = await import('pdf-lib');
      const outDoc = await PDFDocument.create();

      const pageInfos: PageInfo[] = [];

      // ── 3. Render each page → JPEG → embed into new PDF ─────────────────
      for (let i = 1; i <= numPages; i++) {
        const page     = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: renderScale });

        // Render to offscreen canvas
        const canvas    = document.createElement('canvas');
        canvas.width    = Math.floor(viewport.width);
        canvas.height   = Math.floor(viewport.height);

        // pdfjs-dist v5: `canvas` is the primary required field
        await page.render({ canvas, viewport }).promise;

        // Compress canvas → JPEG blob
        const jpegBlob  = await canvasToJpeg(canvas, jpegQuality);
        const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

        // Embed JPEG into output PDF at the original page's pt dimensions
        const { width: ptW, height: ptH } = page.getViewport({ scale: 1 });
        const embedded  = await outDoc.embedJpg(jpegBytes);
        const outPage   = outDoc.addPage([ptW, ptH]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: ptW, height: ptH });

        pageInfos.push({
          index: i,
          originalSize: Math.round((pdfBytes.byteLength / numPages)),
          compressedSize: jpegBytes.byteLength,
        });

        setProgress(Math.round((i / numPages) * 100));
      }

      // ── 4. Save ──────────────────────────────────────────────────────────
      const outBytes = await outDoc.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return url; });
      setResult({ bytes: outBytes, pages: pageInfos });
    } catch (err) {
      if (isPdfjsPasswordError(err)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError((err as Error).message || 'Compression failed. Please try again.');
      }
    } finally {
      setIsWorking(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, quality, pdfPassword]);

  const download = useCallback(() => {
    if (!result || !file) return;
    const blob = new Blob([result.bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.pdf$/i, '') + '-compressed.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }, [result, file]);

  const reset = () => {
    setFile(null);
    setResult(null);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setError(null);
    setProgress(0);
    setPdfPassword(null);
    setNeedsPassword(false);
    setWrongPassword(false);
  };

  const originalSize  = file?.size ?? 0;
  const compressedSize = result?.bytes.byteLength ?? 0;
  const saving        = result ? pct(originalSize, compressedSize) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      {/* Drop zone — hidden once a file is loaded */}
      {!file && (
        <div className="mt-6">
          <DropZone
            onFiles={(files) => { if (files[0]) handleFile(files[0]); }}
            accept={['application/pdf']}
            multiple={false}
            label="Drop your PDF here"
            hint="PDF files only · processed entirely in your browser"
            browseLabel="Browse PDF"
            fileTypeName="PDF"
          />
        </div>
      )}

      {/* File loaded — quality controls */}
      {file && !result && (
        <div className="mt-6 space-y-4">

          {/* Handoff source pill */}
          {sourceLabel && (
            <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 px-3 py-1.5 rounded-full w-fit">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              From: {sourceLabel}
            </div>
          )}

          {/* File info */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Password prompt */}
          {needsPassword && (
            <PdfPasswordPrompt
              filename={file.name}
              onSubmit={(pw) => { setPdfPassword(pw); setNeedsPassword(false); setWrongPassword(false); compress(pw); }}
              wrongPassword={wrongPassword}
            />
          )}

          {/* Quality slider + progress + compress button */}
          {!needsPassword && (
            <>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Image Quality</p>
                  <span className="text-sm font-bold text-violet-400">{quality}%</span>
                </div>
                <input
                  type="range" min={10} max={95} step={1} value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 rounded-full accent-violet-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 mb-3">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
                <div className="flex gap-2">
                  {QUICK_PRESETS.map((p) => (
                    <button key={p.label} onClick={() => setQuality(p.value)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        quality === p.value
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-300'
                          : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600'
                      }`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              {isWorking && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400">
                    <span>Compressing…</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Compress button */}
              <button onClick={() => compress()} disabled={isWorking}
                className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all">
                {isWorking ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Compressing…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                    Compress PDF
                  </>
                )}
              </button>
            </>
          )}
        </div>
      )}

      {/* Result */}
      {result && file && (
        <div className="mt-6 space-y-4">

          {/* Handoff source pill — persists through result state */}
          {sourceLabel && (
            <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 px-3 py-1.5 rounded-full w-fit">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              From: {sourceLabel}
            </div>
          )}

          {/* Size comparison */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-slate-500 mb-1">Original</p>
                <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-50 tabular-nums">{formatBytes(originalSize)}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-bold ${
                  saving > 0
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                    : saving < 0
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {saving > 0 ? `−${saving}%` : saving < 0 ? `+${Math.abs(saving)}%` : 'No change'}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Compressed</p>
                <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-50 tabular-nums">{formatBytes(compressedSize)}</p>
              </div>
            </div>

            {/* Bar chart */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-16 sm:w-20 shrink-0">Original</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                  <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full w-full" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-violet-500 w-16 sm:w-20 shrink-0">Compressed</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${saving >= 0 ? 'bg-linear-to-r from-violet-500 to-purple-500' : 'bg-amber-400'}`}
                    style={{ width: `${saving >= 0 ? Math.max(4, 100 - saving) : 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={() => { download(); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloaded ? 'Downloaded ✓' : 'Download'}
            </button>
            <button onClick={() => resultUrl && window.open(resultUrl, '_blank')}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View in Browser
            </button>
          </div>
          <button onClick={reset}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600 transition-colors">
            New File
          </button>
        </div>
      )}
    </div>
  );
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
