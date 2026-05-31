'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';
import { useHandoffStore } from '@/store/handoffStore';

function isPdfjsPasswordError(e: unknown): boolean {
  return (e as { name?: string })?.name === 'PasswordException';
}

interface PageResult {
  pageNum: number;
  dataUrl: string;
  blob: Blob;
  url: string;
  size: number;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
      'image/jpeg',
      quality,
    );
  });
}

export function PdfToJpgUI() {
  const [file,          setFile]          = useState<File | null>(null);
  const [pageCount,     setPageCount]     = useState(0);
  const [isWorking,     setIsWorking]     = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [results,       setResults]       = useState<PageResult[]>([]);
  const [error,         setError]         = useState<string | null>(null);
  const [downloaded,    setDownloaded]    = useState<Set<number>>(new Set());
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [previewIdx,    setPreviewIdx]    = useState<number | null>(null);
  const pendingFileRef = useRef<File | null>(null);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef = useRef(consumeHandoff);
  useEffect(() => {
    const { file: f } = consumeRef.current();
    if (f && f.type === 'application/pdf') setFile(f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (previewIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewIdx(null);
      if (e.key === 'ArrowRight') setPreviewIdx((p) => p !== null && p < results.length - 1 ? p + 1 : p);
      if (e.key === 'ArrowLeft')  setPreviewIdx((p) => p !== null && p > 0 ? p - 1 : p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [previewIdx, results.length]);

  const handleFiles = useCallback(async (files: File[], pw?: string) => {
    const f = files[0];
    if (!f) return;
    const password = pw ?? undefined;
    setError(null);
    setResults([]);
    setFile(f);
    pendingFileRef.current = f;

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const pdfData = new Uint8Array(await f.arrayBuffer());
      const pdfDoc  = await pdfjsLib.getDocument({ data: pdfData, ...(password ? { password } : {}) }).promise;
      setPageCount(pdfDoc.numPages);
      pdfDoc.destroy();
    } catch (e) {
      if (isPdfjsPasswordError(e)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError('Could not read this PDF. It may be corrupted.');
        setFile(null);
      }
    }
  }, []);

  const convert = useCallback(async () => {
    if (!file) return;
    const password = pdfPassword ?? undefined;
    setIsWorking(true);
    setError(null);
    setProgress(0);
    setResults((prev) => { prev.forEach((r) => URL.revokeObjectURL(r.url)); return []; });

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const pdfData  = new Uint8Array(await file.arrayBuffer());
      const pdfDoc   = await pdfjsLib.getDocument({ data: pdfData, ...(password ? { password } : {}) }).promise;
      const numPages = pdfDoc.numPages;
      const newResults: PageResult[] = [];
      const jpegQuality = 0.95;

      for (let i = 1; i <= numPages; i++) {
        const page     = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas    = document.createElement('canvas');
        canvas.width    = Math.floor(viewport.width);
        canvas.height   = Math.floor(viewport.height);

        await page.render({ canvas, viewport }).promise;
        page.cleanup();

        const blob    = await canvasToJpeg(canvas, jpegQuality);
        const dataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
        const url     = URL.createObjectURL(blob);
        newResults.push({ pageNum: i, dataUrl, blob, url, size: blob.size });
        setProgress(Math.round((i / numPages) * 100));
      }

      pdfDoc.destroy();
      setResults(newResults);
    } catch (err) {
      setError((err as Error).message || 'Conversion failed. Please try again.');
    } finally {
      setIsWorking(false);
    }
  }, [file, pdfPassword]);

  const downloadOne = (r: PageResult, filename: string) => {
    const a = document.createElement('a');
    a.href = r.url; a.download = filename; a.click();
    setDownloaded((prev) => new Set([...prev, r.pageNum]));
    setTimeout(() => setDownloaded((prev) => { const n = new Set(prev); n.delete(r.pageNum); return n; }), 1500);
  };

  const downloadAll = async () => {
    if (!file) return;
    if (results.length === 1) {
      downloadOne(results[0], `${baseName}-page-1-${brand}.jpg`);
      return;
    }
    const JSZip = (await import('jszip')).default;
    const zip   = new JSZip();
    for (const r of results) {
      const ab = await r.blob.arrayBuffer();
      zip.file(`${baseName}-page-${r.pageNum}-${brand}.jpg`, ab);
    }
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `${baseName}-pages-${brand}.zip`; a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setFile(null); setPageCount(0); setResults([]); setError(null); setProgress(0);
    setDownloaded(new Set()); setPdfPassword(null); setNeedsPassword(false); setWrongPassword(false);
    pendingFileRef.current = null;
  };

  const baseName = file?.name.replace(/\.pdf$/i, '').replace(/[<>:"/\\|?*]/g, '-').trim() ?? 'page';
  const brand = '(imagepdf.tools)';

  return (
    <div className="w-full max-w-2xl mx-auto pb-16">

      {/* Drop zone */}
      {!file && (
        <div className="mt-6">
          <DropZone
            onFiles={handleFiles}
            accept={['application/pdf']}
            multiple={false}
            label="Drop your PDF here"
            hint="PDF files only · all processing happens in your browser"
            browseLabel="Browse PDF"
            fileTypeName="PDF"
          />
        </div>
      )}

      {/* Password prompt (shown when file is set but locked) */}
      {needsPassword && file && (
        <div className="mt-6">
          <PdfPasswordPrompt
            filename={file.name}
            onSubmit={(pw) => {
              setPdfPassword(pw);
              setNeedsPassword(false);
              setWrongPassword(false);
              handleFiles([file], pw);
            }}
            wrongPassword={wrongPassword}
          />
        </div>
      )}

      {file && !needsPassword && (
        <div className="mt-6 space-y-4">

          {/* File info card */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{pageCount > 0 ? `${pageCount} page${pageCount !== 1 ? 's' : ''} · ` : ''}{formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          {isWorking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Converting pages…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-300"
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

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm space-y-4">

              {/* Success header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Conversion complete</p>
                  <p className="text-xs text-slate-500">{results.length} JPG{results.length !== 1 ? 's' : ''} ready</p>
                </div>
              </div>

              {/* Single page — Download + View in Browser */}
              {results.length === 1 && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => downloadOne(results[0], `${baseName}-page-1-${brand}.jpg`)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {downloaded.has(1) ? 'Saved ✓' : 'Save JPG'}
                  </button>
                  <button
                    onClick={() => setPreviewIdx(0)}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Preview
                  </button>
                </div>
              )}

              {/* Multiple pages — thumbnail grid + Download All */}
              {results.length > 1 && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {results.map((r) => (
                      <div key={r.pageNum} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.dataUrl}
                          alt={`Page ${r.pageNum}`}
                          className="w-full aspect-3/4 object-cover object-top"
                        />
                        <div className="px-2 py-2 flex items-center justify-between gap-1">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            p.{r.pageNum} · {formatBytes(r.size)}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setPreviewIdx(r.pageNum - 1)}
                              className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 hover:bg-violet-100 transition-colors"
                              title="Preview"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => downloadOne(r, `${baseName}-page-${r.pageNum}-${brand}.jpg`)}
                              className="inline-flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-semibold px-2 py-1 rounded-md transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {downloaded.has(r.pageNum) ? '✓' : 'JPG'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={downloadAll}
                    className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Save All as ZIP ({results.length} JPGs)
                  </button>
                </>
              )}
            </div>
          )}

          {/* Convert button */}
          {results.length === 0 && (
            <button
              onClick={convert}
              disabled={isWorking || pageCount === 0}
              className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
            >
              {isWorking ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Converting…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Convert to JPG{pageCount > 0 ? ` (${pageCount} page${pageCount !== 1 ? 's' : ''})` : ''}
                </>
              )}
            </button>
          )}

          {results.length > 0 && (
            <button
              onClick={reset}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600 transition-colors"
            >
              Convert Another PDF
            </button>
          )}

        </div>
      )}

      {/* Image preview modal — merge PDF style */}
      {previewIdx !== null && results[previewIdx] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewIdx(null)}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
              <button onClick={() => setPreviewIdx(null)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-4 h-4 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate leading-tight">{`${baseName}-page-${previewIdx + 1}-${brand}.jpg`}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{formatBytes(results[previewIdx].size)} · page {previewIdx + 1} of {results.length}</p>
                </div>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 tracking-wide shrink-0">JPG</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setPreviewIdx((p) => p !== null && p > 0 ? p - 1 : p)}
                  disabled={previewIdx === 0}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 disabled:opacity-25 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button
                  onClick={() => setPreviewIdx((p) => p !== null && p < results.length - 1 ? p + 1 : p)}
                  disabled={previewIdx === results.length - 1}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 disabled:opacity-25 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
                <div className="w-px h-5 bg-white/10 mx-0.5" />
                <button onClick={() => setPreviewIdx(null)} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            {/* Image content */}
            <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-800 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={results[previewIdx].dataUrl} alt={`Page ${previewIdx + 1}`} className="max-w-full max-h-full object-contain rounded shadow-2xl" draggable={false} />
            </div>
          </div>
        </div>
      )}

      {/* Pre-load error */}
      {error && !file && (
        <div className="mt-6 flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
