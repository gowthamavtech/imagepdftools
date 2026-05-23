'use client';

import { useState, useCallback, useRef } from 'react';
import { DropZone } from './DropZone';

type OutputFormat = 'jpeg' | 'png' | 'webp';
type Scale = 1 | 2 | 3;

interface PageResult {
  pageNum: number;
  blob: Blob;
  url: string;
  size: number;
}

const FORMAT_LABELS: Record<OutputFormat, string> = { jpeg: 'JPG', png: 'PNG', webp: 'WebP' };
const FORMAT_MIME:  Record<OutputFormat, string>  = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const FORMAT_EXT:   Record<OutputFormat, string>  = { jpeg: 'jpg', png: 'png', webp: 'webp' };
const SCALE_LABELS: Record<Scale, string> = { 1: '1× (72 DPI)', 2: '2× (144 DPI)', 3: '3× (216 DPI)' };

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      mime,
      mime === 'image/png' ? undefined : quality / 100,
    ),
  );
}

export function PdfToImageUI() {
  const [file,        setFile]        = useState<File | null>(null);
  const [pageCount,   setPageCount]   = useState(0);
  const [format,      setFormat]      = useState<OutputFormat>('jpeg');
  const [scale,       setScale]       = useState<Scale>(2);
  const [quality,     setQuality]     = useState(90);
  const [isScanning,  setIsScanning]  = useState(false);
  const [isWorking,   setIsWorking]   = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [results,     setResults]     = useState<PageResult[]>([]);
  const [error,       setError]       = useState<string | null>(null);
  const pendingRef = useRef<File | null>(null);

  const scanFile = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f || !f.name.match(/\.pdf$/i)) { setError('Please upload a .pdf file.'); return; }
    setError(null);
    setResults([]);
    setFile(f);
    pendingRef.current = f;
    setIsScanning(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      setPageCount(doc.numPages);
      doc.destroy();
    } catch {
      setError('Could not read the PDF. It may be corrupted or password-protected.');
      setFile(null);
    } finally {
      setIsScanning(false);
    }
  }, []);

  const convert = useCallback(async () => {
    const f = pendingRef.current;
    if (!f) return;
    setIsWorking(true);
    setError(null);
    setProgress(0);
    setResults((prev) => { prev.forEach((r) => URL.revokeObjectURL(r.url)); return []; });

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      const mime = FORMAT_MIME[format];
      const newResults: PageResult[] = [];

      for (let i = 1; i <= doc.numPages; i++) {
        const page     = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas   = document.createElement('canvas');
        canvas.width   = Math.floor(viewport.width);
        canvas.height  = Math.floor(viewport.height);
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        page.cleanup();

        const blob = await canvasToBlob(canvas, mime, quality);
        const url  = URL.createObjectURL(blob);
        newResults.push({ pageNum: i, blob, url, size: blob.size });
        setProgress(Math.round((i / doc.numPages) * 100));
      }

      doc.destroy();
      setResults(newResults);
    } catch (err) {
      setError((err as Error).message || 'Conversion failed. Please try again.');
    } finally {
      setIsWorking(false);
    }
  }, [format, scale, quality]);

  const downloadOne = useCallback((r: PageResult) => {
    const baseName = file!.name.replace(/\.pdf$/i, '');
    const a = document.createElement('a');
    a.href = r.url;
    a.download = `${baseName}-page-${r.pageNum}.${FORMAT_EXT[format]}`;
    a.click();
  }, [file, format]);

  const downloadAll = useCallback(async () => {
    if (!file || !results.length) return;
    if (results.length === 1) { downloadOne(results[0]); return; }
    const baseName = file.name.replace(/\.pdf$/i, '');
    const ext = FORMAT_EXT[format];
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const r of results) {
      zip.file(`${baseName}-page-${r.pageNum}.${ext}`, await r.blob.arrayBuffer());
    }
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${baseName}-images.zip`; a.click();
    URL.revokeObjectURL(url);
  }, [file, format, results, downloadOne]);

  const reset = useCallback(() => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setFile(null); setPageCount(0); setResults([]); setError(null); setProgress(0);
    pendingRef.current = null;
  }, [results]);

  const totalSize = results.reduce((s, r) => s + r.size, 0);

  return (
    <div className="rounded-2xl bg-surface bd-2 overflow-hidden" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">PDF to Image</span>
        {file && (
          <div className="flex items-center gap-3">
            {results.length > 0 && (
              <span className="font-data text-[11px] text-fg-3">{results.length} image{results.length !== 1 ? 's' : ''} · {formatBytes(totalSize)}</span>
            )}
            <button onClick={reset} className="h-8 px-3 rounded-lg bd-2 text-[12px] text-fg-2 hover:text-fg-1 transition-colors">New file</button>
          </div>
        )}
      </div>

      {/* ── Drop zone ── */}
      {!file && !isScanning && (
        <div className="p-5">
          <DropZone onFiles={scanFile} accept={['application/pdf']} />
          <p className="text-center text-[12px] text-fg-3 mt-3">Zero upload — conversion runs entirely in your browser</p>
        </div>
      )}

      {/* ── Scanning ── */}
      {isScanning && (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <svg className="w-6 h-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-[13px] text-fg-2">Reading PDF…</span>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-red-400" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[13px] text-red-400 leading-normal">{error}</span>
        </div>
      )}

      {/* ── Settings + convert ── */}
      {file && !isScanning && results.length === 0 && (
        <div className="p-5 space-y-4">
          {/* File info */}
          <div className="flex items-center gap-3 rounded-[10px] bg-elevated bd-2 px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-fg-1 truncate">{file.name}</p>
              <p className="text-[11px] text-fg-3 font-data">{pageCount} page{pageCount !== 1 ? 's' : ''} · {formatBytes(file.size)}</p>
            </div>
          </div>

          {/* Format */}
          <div>
            <p className="text-[12px] font-semibold text-fg-2 mb-2 uppercase tracking-wide">Output format</p>
            <div className="flex gap-2">
              {(['jpeg', 'png', 'webp'] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 h-9 rounded-lg bd-2 text-[12.5px] font-semibold transition-all ${
                    format === f ? 'bg-accent text-white border-transparent' : 'text-fg-2 hover:text-fg-1'
                  }`}
                >
                  {FORMAT_LABELS[f]}
                </button>
              ))}
            </div>
            {format === 'png' && (
              <p className="text-[11px] text-fg-3 mt-2">PNG is lossless — larger files, perfect for screenshots and diagrams with text or transparency.</p>
            )}
          </div>

          {/* Scale / DPI */}
          <div>
            <p className="text-[12px] font-semibold text-fg-2 mb-2 uppercase tracking-wide">Resolution</p>
            <div className="flex gap-2">
              {([1, 2, 3] as Scale[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={`flex-1 h-9 rounded-lg bd-2 text-[12px] font-semibold transition-all ${
                    scale === s ? 'bg-accent text-white border-transparent' : 'text-fg-2 hover:text-fg-1'
                  }`}
                >
                  {SCALE_LABELS[s]}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-fg-3 mt-2">
              {scale === 1 && 'Smallest file size. Good for web previews.'}
              {scale === 2 && 'Recommended. Sharp on retina screens and for most print use.'}
              {scale === 3 && 'Highest quality. Ideal for large-format printing. Larger file size.'}
            </p>
          </div>

          {/* Quality (JPG/WebP only) */}
          {format !== 'png' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-semibold text-fg-2 uppercase tracking-wide">Quality</p>
                <span className="font-data text-[12px] text-accent font-bold">{quality}%</span>
              </div>
              <input type="range" min={50} max={100} step={1} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-violet-500 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-fg-3 mt-1">
                <span>Smaller file</span><span>Higher quality</span>
              </div>
            </div>
          )}

          {/* Convert button */}
          <button
            onClick={convert}
            disabled={isWorking || pageCount === 0}
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
          >
            {isWorking ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Converting… {progress}%
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
                Convert to {FORMAT_LABELS[format]}
              </>
            )}
          </button>

          {/* Progress bar */}
          {isWorking && (
            <div className="h-1.5 bg-border-1 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      )}

      {/* ── Results ── */}
      {results.length > 0 && (
        <div className="p-5 space-y-4">
          {/* Download all */}
          <button
            onClick={downloadAll}
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {results.length === 1
              ? `Save Image — ${formatBytes(results[0].size)}`
              : `Save All as ZIP — ${results.length} images · ${formatBytes(totalSize)}`}
          </button>

          {/* Grid of pages */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {results.map((r) => (
              <div key={r.pageNum} className="group relative rounded-[10px] bd-2 overflow-hidden bg-elevated">
                <img src={r.url} alt={`Page ${r.pageNum}`} className="w-full object-contain aspect-3/4" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => downloadOne(r)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/95 text-[12px] font-semibold text-slate-800"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Save
                  </button>
                </div>
                <div className="px-3 py-2 bd-t-1 flex items-center justify-between">
                  <span className="font-data text-[11px] text-fg-3">Page {r.pageNum}</span>
                  <span className="font-data text-[11px] text-fg-3">{formatBytes(r.size)}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-fg-3">
            No upload · {FORMAT_LABELS[format]} · {SCALE_LABELS[scale]} · No watermark
          </p>
        </div>
      )}
    </div>
  );
}
