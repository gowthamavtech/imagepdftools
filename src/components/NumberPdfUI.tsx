'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';
import { PdfContinueTo } from './PdfContinueTo';
import { useHandoffStore } from '@/store/handoffStore';
import { DropZone } from './DropZone';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

function isPdfjsPasswordError(e: unknown): boolean {
  return (e as { name?: string })?.name === 'PasswordException';
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

// Position as percentage from top-left (0-100 each axis)
type Position = { x: number; y: number };

type Format = 'number' | 'page-n' | 'n-of-total';

const FORMATS: { value: Format; label: string; example: string }[] = [
  { value: 'number',     label: 'Number',    example: '1' },
  { value: 'page-n',    label: 'Page N',    example: 'Page 1' },
  { value: 'n-of-total', label: 'N of Total', example: '1 of 5' },
];

function positionStyle(pos: Position): React.CSSProperties {
  return {
    position: 'absolute',
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transform: 'translate(-50%, -50%)',
  };
}

function NumberBadge({ position, num, inRange }: { position: Position; num: number; inRange: boolean }) {
  if (!inRange) return null;
  return (
    <div
      style={positionStyle(position)}
      className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow-md pointer-events-none"
    >
      <span className="text-[7px] text-white font-bold leading-none">{num}</span>
    </div>
  );
}

// Clickable mini-page: first page thumbnail as background, click anywhere to set position
function PositionPicker({ value, onChange, thumbnail }: {
  value: Position;
  onChange: (p: Position) => void;
  thumbnail?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const compute = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    onChange({ x, y });
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        ref={ref}
        onClick={(e) => compute(e.clientX, e.clientY)}
        className="relative cursor-crosshair rounded-lg overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-600 select-none"
        style={{ width: 88, height: 116, flexShrink: 0 }}
        title="Click to set number position"
      >
        {thumbnail ? (
          <img src={thumbnail} alt="" className="absolute inset-0 w-full h-full object-fill" draggable={false} />
        ) : (
          <div className="absolute inset-0 bg-white dark:bg-slate-700" />
        )}
        {/* Subtle grid guides */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              'linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px)',
              'linear-gradient(to bottom, rgba(148,163,184,0.25) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '33.33% 33.33%',
          }}
        />
        {/* Position marker */}
        <div
          className="absolute w-[15px] h-[15px] rounded-full bg-red-500 shadow-md ring-2 ring-white dark:ring-slate-800 flex items-center justify-center pointer-events-none"
          style={{ left: `${value.x}%`, top: `${value.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <span className="text-[5px] text-white font-bold leading-none">1</span>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500">Click to place</p>
    </div>
  );
}

export function NumberPdfUI() {
  const [file,          setFile]          = useState<File | null>(null);
  const [pages,         setPages]         = useState<string[]>([]);
  const [pageCount,     setPageCount]     = useState(0);
  const [isLoading,     setIsLoading]     = useState(false);
  const [position,      setPosition]      = useState<Position>({ x: 87, y: 91 });
  const [format,        setFormat]        = useState<Format>('number');
  const [startNum,      setStartNum]      = useState(1);
  const [fontSize,      setFontSize]      = useState(11);
  const [pageFrom,      setPageFrom]      = useState(1);
  const [pageTo,        setPageTo]        = useState(0);
  const [isWorking,     setIsWorking]     = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [resultBytes,   setResultBytes]   = useState<Uint8Array | null>(null);
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const loadPagesRef = useRef<((f: File, pw?: string) => Promise<void>) | null>(null);
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef = useRef(consumeHandoff);
  useEffect(() => {
    const { file: f } = consumeRef.current();
    if (f && f.type === 'application/pdf') loadPagesRef.current?.(f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPages = useCallback(async (f: File, pw?: string) => {
    const password = pw ?? undefined;
    setPages([]);
    setResultBytes(null);
    setError(null);
    setIsLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await f.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: bytes, ...(password ? { password } : {}) }).promise;
      const count = pdf.numPages;
      setPageCount(count);
      setPageFrom(1);
      setPageTo(count);
      const thumbs: string[] = [];
      for (let i = 1; i <= count; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas = document.createElement('canvas');
        canvas.width  = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvas, viewport }).promise;
        thumbs.push(canvas.toDataURL('image/jpeg', 0.7));
        page.cleanup();
      }
      pdf.destroy();
      setPages(thumbs);
    } catch (e) {
      if (isPdfjsPasswordError(e)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError('Failed to load PDF. The file may be corrupted.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  loadPagesRef.current = loadPages;

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    setNeedsPassword(false);
    setWrongPassword(false);
    setPdfPassword(null);
    await loadPages(f);
  }, [loadPages]);

  const apply = async (pw?: string) => {
    if (!file) return;
    const password = pw ?? pdfPassword ?? undefined;
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const bytes  = new Uint8Array(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfDoc = await PDFDocument.load(bytes, (password ? { password } : { ignoreEncryption: true }) as any);
      const font   = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const allPages = pdfDoc.getPages();
      const total    = allPages.length;
      const edgeMargin = 8;

      const fromIdx = Math.max(0, pageFrom - 1);
      const toIdx   = Math.min(total - 1, (pageTo || total) - 1);

      allPages.forEach((page, i) => {
        if (i < fromIdx || i > toIdx) return;
        const { width, height } = page.getSize();
        const pageNum = startNum + (i - fromIdx);
        const label =
          format === 'number'     ? `${pageNum}` :
          format === 'page-n'    ? `Page ${pageNum}` :
          `${pageNum} of ${startNum + (toIdx - fromIdx)}`;

        const textWidth  = font.widthOfTextAtSize(label, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        // Convert % position (top-left origin) → PDF coords (bottom-left origin)
        // Center text at the clicked point
        const cx = (position.x / 100) * width;
        const cy = (1 - position.y / 100) * height;

        const x = Math.max(edgeMargin, Math.min(cx - textWidth / 2, width - textWidth - edgeMargin));
        const y = Math.max(edgeMargin, Math.min(cy - textHeight / 2, height - edgeMargin));

        page.drawText(label, { x, y, size: fontSize, font, color: rgb(0.2, 0.2, 0.2) });
      });

      setResultBytes(await pdfDoc.save());
    } catch (e: unknown) {
      if (isEncryptError(e)) {
        setNeedsPassword(true);
        if (pw) setWrongPassword(true);
      } else {
        setError(e instanceof Error ? e.message : 'Failed to add page numbers.');
      }
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!resultBytes || !file) return;
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.pdf$/i, '-numbered.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset      = () => { setFile(null); setPages([]); setPageCount(0); setResultBytes(null); setError(null); setPdfPassword(null); setNeedsPassword(false); setWrongPassword(false); };
  const backToEdit = () => { setResultBytes(null); setError(null); };

  const effectivePageTo = pageTo || pageCount;

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* File bar */}
      {!file ? (
        <DropZone onFiles={handleFiles} accept={['application/pdf']} label="Drop your PDF here" />
      ) : (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-3 min-w-0">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-400">{formatBytes(file.size)}{pageCount > 0 ? ` · ${pageCount} pages` : ''}</p>
            </div>
          </div>
          <button onClick={reset} className="text-xs text-slate-400 hover:text-red-500 shrink-0 transition-colors">Remove</button>
        </div>
      )}

      {/* Password prompt */}
      {needsPassword && file && (
        <PdfPasswordPrompt
          filename={file.name}
          onSubmit={(pw) => {
            setPdfPassword(pw);
            setNeedsPassword(false);
            setWrongPassword(false);
            loadPages(file, pw);
          }}
          wrongPassword={wrongPassword}
        />
      )}

      {isLoading && (
        <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
          Rendering page thumbnails…
        </div>
      )}

      {error && <p className="text-xs text-red-500 dark:text-red-400 text-center">{error}</p>}

      {!resultBytes && pages.length > 0 && (
        <>
          {/* ── Options card (top) ── */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Page Number options</h3>
            </div>

            <div className="p-5 flex flex-wrap gap-6 items-start">

              {/* Position — clickable mini page */}
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Position</label>
                <PositionPicker value={position} onChange={setPosition} thumbnail={pages[0]} />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-slate-100 dark:bg-slate-700" />

              {/* Format */}
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Format</label>
                <div className="flex flex-col gap-1.5">
                  {FORMATS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFormat(f.value)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors border ${
                        format === f.value
                          ? 'bg-violet-600 border-violet-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400'
                      }`}
                    >
                      <span className="font-bold w-12 shrink-0">{f.example}</span>
                      <span className="text-xs opacity-70">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-slate-100 dark:bg-slate-700" />

              {/* First number + Font size */}
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1.5">First number</label>
                  <input
                    type="number"
                    min={1} max={9999}
                    value={startNum}
                    onChange={(e) => setStartNum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Font size</label>
                  <input
                    type="number"
                    min={8} max={24}
                    value={fontSize}
                    onChange={(e) => setFontSize(Math.min(24, Math.max(8, parseInt(e.target.value) || 11)))}
                    className="w-24 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-slate-100 dark:bg-slate-700" />

              {/* Page range */}
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1.5">Pages to number</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 shrink-0">from</span>
                  <input
                    type="number"
                    min={1} max={pageCount}
                    value={pageFrom}
                    onChange={(e) => {
                      const v = Math.min(pageCount, Math.max(1, parseInt(e.target.value) || 1));
                      setPageFrom(v);
                      if (effectivePageTo < v) setPageTo(v);
                    }}
                    className="w-16 px-2 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="text-xs text-slate-400 shrink-0">to</span>
                  <input
                    type="number"
                    min={pageFrom} max={pageCount}
                    value={effectivePageTo}
                    onChange={(e) => setPageTo(Math.min(pageCount, Math.max(pageFrom, parseInt(e.target.value) || pageCount)))}
                    className="w-16 px-2 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* Apply — fills remaining space, button at end */}
              <div className="flex-1 flex items-end justify-end min-w-full sm:min-w-0">
                <button
                  onClick={() => apply()}
                  disabled={isWorking}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  {isWorking ? 'Adding page numbers…' : 'Add Page Numbers'}
                </button>
              </div>
            </div>
          </div>

          {/* ── Page thumbnail grid (below) ── */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {pages.map((thumb, i) => {
                const pageIdx = i + 1;
                const inRange = pageIdx >= pageFrom && pageIdx <= effectivePageTo;
                return (
                  <div
                    key={i}
                    className="relative aspect-[3/4] bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700"
                  >
                    <img src={thumb} alt={`Page ${pageIdx}`} className="w-full h-full object-contain" />
                    <NumberBadge position={position} num={startNum + (i - (pageFrom - 1))} inRange={inRange} />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 dark:text-slate-500 font-medium">{pageIdx}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Result */}
      {resultBytes && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Page numbers added!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">{formatBytes(resultBytes.length)} · ready to save</p>
            </div>
            <button
              onClick={backToEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
              Edit
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={download} className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors">Save PDF</button>
            <button onClick={reset} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors hover:border-slate-300 dark:hover:border-slate-500">Start over</button>
          </div>
          <PdfContinueTo
            exclude="number"
            pdfBytes={resultBytes}
            filename={file?.name ?? 'numbered.pdf'}
            sourceLabel="Add Page Numbers"
          />
        </div>
      )}
    </div>
  );
}
