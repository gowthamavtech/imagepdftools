'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';
import { useHandoffStore } from '@/store/handoffStore';
import { PdfContinueTo } from './PdfContinueTo';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

type Mode = 'cuts' | 'select' | 'range';

interface Result {
  name: string;
  url: string;
  blob: Blob;
  size: number;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

// Canvas-based PDF viewer — fallback when browser has no native PDF viewer (e.g. Android Chrome)
function PdfJsViewer({ file, password = '' }: { file: File | Blob; password?: string }) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [rendered, setRendered] = useState(0);
  const [total, setTotal]     = useState(0);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: bytes, password }).promise;
      if (cancelled) return;
      setTotal(pdf.numPages);
      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelled) break;
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas }).promise;
        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
        if (blob) { const url = URL.createObjectURL(blob); urls.push(url); if (!cancelled) { setPageUrls([...urls]); setRendered(i); } }
      }
    })().catch(() => {});
    return () => { cancelled = true; urls.forEach(URL.revokeObjectURL); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageUrls.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
      <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      {total > 0 && <p className="text-xs">{rendered} / {total} pages</p>}
    </div>
  );

  return (
    <div className="overflow-y-auto h-full bg-slate-700 flex flex-col items-center gap-2 py-4 px-2">
      {pageUrls.map((url, i) => <img key={i} src={url} alt={`Page ${i + 1}`} className="max-w-full shadow-lg rounded" />)}
      {rendered < total && <p className="text-xs text-slate-400 py-2">{rendered} / {total} pages rendered…</p>}
    </div>
  );
}

function parseRanges(input: string, total: number): { label: string; indices: number[] }[] {
  const groups: { label: string; indices: number[] }[] = [];
  const parts = input.split(',').map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map((s) => parseInt(s, 10));
      if (!isNaN(a) && !isNaN(b) && a >= 1 && b <= total && a <= b)
        groups.push({ label: `pages-${a}-${b}`, indices: Array.from({ length: b - a + 1 }, (_, i) => a - 1 + i) });
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= total)
        groups.push({ label: `page-${n}`, indices: [n - 1] });
    }
  }
  return groups;
}

async function renderPage(pdfDoc: unknown, pageNum: number, scale = 0.22): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await (pdfDoc as any).getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width  = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d')!;
  await page.render({ canvasContext: ctx, viewport }).promise;
  const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
  page.cleanup();
  return dataUrl;
}

// ── Scissors icon ─────────────────────────────────────────────────────────────
function ScissorsIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

export function SplitPdfUI() {
  const [file,          setFile]          = useState<File | null>(null);
  const [pageCount,     setPageCount]     = useState(0);
  const [thumbs,        setThumbs]        = useState<(string | null)[]>([]);
  const [thumbsDone,    setThumbsDone]    = useState(false);
  const [mode,          setMode]          = useState<Mode>('cuts');
  const [selected,      setSelected]      = useState<Set<number>>(new Set());
  const [rangeInput,    setRangeInput]    = useState('');
  // cuts mode state
  const [cuts,          setCuts]          = useState<Set<number>>(new Set());
  const [useInterval,   setUseInterval]   = useState(false);
  const [intervalSize,  setIntervalSize]  = useState(1);
  const [cols,          setCols]          = useState(6);

  const [isWorking,     setIsWorking]     = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [results,       setResults]       = useState<Result[]>([]);
  const [error,         setError]         = useState<string | null>(null);
  const [downloaded,    setDownloaded]    = useState<Set<string>>(new Set());
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [previewUrl,    setPreviewUrl]    = useState<string | null>(null);
  const [previewBlob,   setPreviewBlob]   = useState<Blob | null>(null);
  const [previewName,   setPreviewName]   = useState<string>('');
  const [pagePreviewIdx, setPagePreviewIdx] = useState<number | null>(null);
  const [hiResUrl,       setHiResUrl]       = useState<string | null>(null);
  const pendingFilesRef = useRef<File[]>([]);
  const renderAbort = useRef(false);
  const isDraggingRef = useRef(false);
  const loadFileRef = useRef<((files: File[], pw?: string) => Promise<void>) | null>(null);

  // Responsive column count for the cuts grid
  useEffect(() => {
    const update = () =>
      setCols(window.innerWidth >= 1280 ? 6 : window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : window.innerWidth >= 480 ? 3 : 2);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef = useRef(consumeHandoff);
  useEffect(() => {
    const { file: f } = consumeRef.current();
    if (f && f.type === 'application/pdf') loadFileRef.current?.([f]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dragModeRef        = useRef<'select' | 'deselect'>('select');
  const dragStartIdxRef    = useRef<number | null>(null);
  const preDragSelectionRef = useRef<Set<number>>(new Set());
  const longPressTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchDragActiveRef = useRef(false);
  const lastTouchIdxRef    = useRef<number | null>(null);
  const autoScrollRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef            = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef  = useRef<any>(null);
  const hiResCache = useRef<Map<number, string>>(new Map());
  const resultRef  = useRef<HTMLDivElement>(null);

  // Computed active cuts — either manual cuts or interval-derived
  const activeCuts = useMemo<Set<number>>(() => {
    if (useInterval && intervalSize > 0 && pageCount > 0) {
      const s = new Set<number>();
      for (let pos = intervalSize - 1; pos < pageCount - 1; pos += intervalSize) {
        s.add(pos);
      }
      return s;
    }
    return cuts;
  }, [useInterval, intervalSize, cuts, pageCount]);

  const toggleCut = useCallback((afterIdx: number) => {
    setCuts((prev) => {
      const n = new Set(prev);
      n.has(afterIdx) ? n.delete(afterIdx) : n.add(afterIdx);
      return n;
    });
  }, []);

  const openPreview = (r: Result) => { setPreviewUrl(r.url); setPreviewBlob(r.blob); setPreviewName(r.name); };
  const closePreview = () => { setPreviewUrl(null); setPreviewBlob(null); setPreviewName(''); };

  useEffect(() => {
    if (!previewUrl) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closePreview(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [previewUrl]);

  useEffect(() => {
    if (pagePreviewIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPagePreviewIdx(null);
      if (e.key === 'ArrowRight') setPagePreviewIdx((p) => p !== null && p < pageCount - 1 ? p + 1 : p);
      if (e.key === 'ArrowLeft')  setPagePreviewIdx((p) => p !== null && p > 0 ? p - 1 : p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pagePreviewIdx, pageCount]);

  // Render high-res when lightbox opens
  const renderingForIdx = useRef<number | null>(null);
  useEffect(() => {
    if (pagePreviewIdx === null) { setHiResUrl(null); return; }
    const cached = hiResCache.current.get(pagePreviewIdx);
    if (cached) { setHiResUrl(cached); return; }
    if (!pdfDocRef.current) return;
    const target = pagePreviewIdx;
    renderingForIdx.current = target;
    renderPage(pdfDocRef.current, target + 1, 1.8).then((url) => {
      hiResCache.current.set(target, url);
      if (renderingForIdx.current === target) setHiResUrl(url);
    }).catch(() => {});
  }, [pagePreviewIdx]);

  // Mouse drag-select
  const mousePosRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const stopDrag = () => {
      isDraggingRef.current = false;
      if (autoScrollRef.current) { clearInterval(autoScrollRef.current); autoScrollRef.current = null; }
    };
    const selectCardAt = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      const card = el?.closest('[data-page-idx]') as HTMLElement | null;
      if (!card) return;
      const idx = parseInt(card.dataset.pageIdx!);
      const start = dragStartIdxRef.current ?? idx;
      const lo = Math.min(start, idx);
      const hi = Math.max(start, idx);
      setSelected(() => {
        const n = new Set(preDragSelectionRef.current);
        for (let k = lo; k <= hi; k++) dragModeRef.current === 'select' ? n.add(k) : n.delete(k);
        return n;
      });
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      const EDGE = 80, SPEED = 6;
      if (autoScrollRef.current) { clearInterval(autoScrollRef.current); autoScrollRef.current = null; }
      if (e.clientY < EDGE) {
        autoScrollRef.current = setInterval(() => { window.scrollBy(0, -SPEED); selectCardAt(mousePosRef.current.x, mousePosRef.current.y); }, 16);
      } else if (e.clientY > window.innerHeight - EDGE) {
        autoScrollRef.current = setInterval(() => { window.scrollBy(0, SPEED); selectCardAt(mousePosRef.current.x, mousePosRef.current.y); }, 16);
      }
    };
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', onMouseMove);
    return () => { window.removeEventListener('mouseup', stopDrag); window.removeEventListener('mousemove', onMouseMove); };
  }, []);

  // Non-passive touchmove for select grid
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const stopAutoScroll = () => {
      if (autoScrollRef.current) { clearInterval(autoScrollRef.current); autoScrollRef.current = null; }
    };
    const handler = (e: TouchEvent) => {
      if (!touchDragActiveRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      stopAutoScroll();
      const EDGE = 80, SPEED = 5;
      if (touch.clientY < EDGE) {
        autoScrollRef.current = setInterval(() => window.scrollBy(0, -SPEED), 16);
      } else if (touch.clientY > window.innerHeight - EDGE) {
        autoScrollRef.current = setInterval(() => window.scrollBy(0, SPEED), 16);
      }
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const card = target?.closest('[data-page-idx]') as HTMLElement | null;
      if (!card) return;
      const idx = parseInt(card.dataset.pageIdx!);
      if (idx === lastTouchIdxRef.current) return;
      lastTouchIdxRef.current = idx;
      const start = dragStartIdxRef.current ?? idx;
      const lo = Math.min(start, idx);
      const hi = Math.max(start, idx);
      setSelected(() => {
        const n = new Set(preDragSelectionRef.current);
        for (let k = lo; k <= hi; k++) dragModeRef.current === 'select' ? n.add(k) : n.delete(k);
        return n;
      });
    };
    el.addEventListener('touchmove', handler, { passive: false });
    return () => { el.removeEventListener('touchmove', handler); stopAutoScroll(); };
  }, [thumbsDone]);

  const loadFile = useCallback(async (files: File[], pw?: string) => {
    const f = files[0];
    if (!f) return;
    const password = pw ?? undefined;
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setError(null);
    setResults([]);
    setSelected(new Set());
    setRangeInput('');
    setCuts(new Set());
    setThumbs([]);
    setThumbsDone(false);
    setDownloaded(new Set());
    renderAbort.current = false;
    setFile(f);
    pendingFilesRef.current = files;

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const pdfData = new Uint8Array(await f.arrayBuffer());
      const pdfDoc = await pdfjsLib.getDocument({ data: pdfData, ...(password ? { password } : {}) }).promise;
      pdfDocRef.current = pdfDoc;
      hiResCache.current.clear();
      const count = pdfDoc.numPages;
      setPageCount(count);
      setThumbs(Array(count).fill(null));

      // Parallel worker pool — 6 concurrent renders, thumbnails appear as each finishes
      const queue = Array.from({ length: count }, (_, i) => i + 1);
      const drain = async () => {
        while (!renderAbort.current) {
          const pageNum = queue.shift();
          if (pageNum === undefined) return;
          try {
            const dataUrl = await renderPage(pdfDoc, pageNum);
            if (!renderAbort.current)
              setThumbs((prev) => { const next = [...prev]; next[pageNum - 1] = dataUrl; return next; });
          } catch { /* page failed silently */ }
        }
      };
      await Promise.all(Array.from({ length: Math.min(6, count) }, drain));
      setThumbsDone(true);
    } catch (e) {
      if (isEncryptError(e) || (e as { name?: string })?.name === 'PasswordException') {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
        setFile(f);
      } else {
        setError('Could not read this PDF. It may be corrupted.');
        setFile(null);
      }
    }
  }, []);
  loadFileRef.current = loadFile;

  useEffect(() => () => { renderAbort.current = true; }, []);

  const togglePage = (i: number) =>
    setSelected((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const selectAll  = () => setSelected(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  const clearAll   = () => setSelected(new Set());

  const revokeResults = () => results.forEach((r) => URL.revokeObjectURL(r.url));

  const run = useCallback(async () => {
    if (!file) return;
    const password = pdfPassword ?? undefined;
    setIsWorking(true); setError(null); setProgress(0);
    revokeResults(); setResults([]);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const srcBytes = new Uint8Array(await file.arrayBuffer());
      let srcDoc;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        srcDoc = await PDFDocument.load(srcBytes, password ? ({ password } as any) : { ignoreEncryption: true });
      } catch {
        srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });
      }

      const baseName = file.name.replace(/\.pdf$/i, '').replace(/[<>:"/\\|?*]/g, '-').trim();
      const brand = '(imagepdf.tools)';

      if (mode === 'select') {
        const indices = Array.from(selected).sort((a, b) => a - b);
        if (!indices.length) { setError('Select at least one page.'); setIsWorking(false); return; }
        const out   = await PDFDocument.create();
        const pages = await out.copyPages(srcDoc, indices);
        pages.forEach((p) => out.addPage(p));
        setProgress(80);
        const bytes = await out.save();
        const blob  = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setResults([{ name: `${baseName}-selected-pages-${brand}.pdf`, url: URL.createObjectURL(blob), blob, size: bytes.byteLength }]);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

      } else if (mode === 'range') {
        const groups = parseRanges(rangeInput, pageCount);
        if (!groups.length) { setError('Enter at least one valid range, e.g. 1-3, 5, 7-10.'); setIsWorking(false); return; }
        const newResults: Result[] = [];
        for (let g = 0; g < groups.length; g++) {
          const { indices } = groups[g];
          const out   = await PDFDocument.create();
          const pages = await out.copyPages(srcDoc, indices);
          pages.forEach((p) => out.addPage(p));
          const bytes = await out.save();
          const blob  = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
          const r1 = indices[0] + 1;
          const r2 = indices[indices.length - 1] + 1;
          const rangeLabel = r1 === r2 ? `${r1}-page` : `${r1}-${r2}-pages`;
          newResults.push({ name: `${baseName}-${rangeLabel}-${brand}.pdf`, url: URL.createObjectURL(blob), blob, size: bytes.byteLength });
          setProgress(Math.round(((g + 1) / groups.length) * 90));
        }
        if (newResults.length > 1) {
          const JSZip = (await import('jszip')).default;
          const zip   = new JSZip();
          for (const r of newResults) {
            const ab = await fetch(r.url).then((res) => res.arrayBuffer());
            zip.file(r.name, ab);
          }
          const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
          newResults.push({ name: `${baseName}-split-parts-${brand}.zip`, url: URL.createObjectURL(blob), blob, size: blob.size });
        }
        setResults(newResults);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

      } else {
        // cuts mode
        if (activeCuts.size === 0) {
          setError(useInterval
            ? 'Set a valid split interval above.'
            : 'Add at least one cut point by clicking ✂ between pages.');
          setIsWorking(false);
          return;
        }
        const sortedCuts = Array.from(activeCuts).sort((a, b) => a - b);
        const groups: number[][] = [];
        let start = 0;
        for (const cutAfter of sortedCuts) {
          groups.push(Array.from({ length: cutAfter - start + 1 }, (_, k) => start + k));
          start = cutAfter + 1;
        }
        if (start < pageCount) {
          groups.push(Array.from({ length: pageCount - start }, (_, k) => start + k));
        }
        const newResults: Result[] = [];
        for (let g = 0; g < groups.length; g++) {
          const indices = groups[g];
          const out   = await PDFDocument.create();
          const pages = await out.copyPages(srcDoc, indices);
          pages.forEach((p) => out.addPage(p));
          const bytes = await out.save();
          const blob  = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
          const s1 = indices[0] + 1;
          const s2 = indices[indices.length - 1] + 1;
          const rangeLabel = s1 === s2 ? `${s1}-page` : `${s1}-${s2}-pages`;
          newResults.push({ name: `${baseName}-${rangeLabel}-${brand}.pdf`, url: URL.createObjectURL(blob), blob, size: bytes.byteLength });
          setProgress(Math.round(((g + 1) / groups.length) * 90));
        }
        if (newResults.length > 1) {
          const JSZip = (await import('jszip')).default;
          const zip   = new JSZip();
          for (const r of newResults) {
            const ab = await fetch(r.url).then((res) => res.arrayBuffer());
            zip.file(r.name, ab);
          }
          const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
          newResults.push({ name: `${baseName}-split-parts-${brand}.zip`, url: URL.createObjectURL(blob), blob, size: blob.size });
        }
        setResults(newResults);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }

      setProgress(100);
    } catch (err) {
      if (isEncryptError(err)) {
        setNeedsPassword(true);
      } else {
        setError((err as Error).message || 'Split failed. Please try again.');
      }
    } finally {
      setIsWorking(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, mode, selected, rangeInput, pageCount, pdfPassword, activeCuts, useInterval]);

  const backToEdit = () => {
    revokeResults();
    setResults([]);
    setProgress(0);
    setError(null);
    setDownloaded(new Set());
  };

  const reset = () => {
    renderAbort.current = true;
    revokeResults();
    if (pdfDocRef.current) { pdfDocRef.current.destroy(); pdfDocRef.current = null; }
    hiResCache.current.clear();
    setFile(null); setPageCount(0); setThumbs([]); setThumbsDone(false);
    setSelected(new Set()); setRangeInput(''); setCuts(new Set());
    setUseInterval(false); setIntervalSize(1);
    setResults([]); setError(null); setProgress(0);
    setDownloaded(new Set()); setPdfPassword(null); setNeedsPassword(false); setWrongPassword(false);
    setPagePreviewIdx(null); setHiResUrl(null);
    pendingFilesRef.current = [];
    setTimeout(() => { renderAbort.current = false; }, 50);
  };

  const download = (r: Result) => {
    const a = document.createElement('a');
    a.href = r.url; a.download = r.name; a.click();
    setDownloaded((prev) => new Set([...prev, r.name]));
    setTimeout(() => setDownloaded((prev) => { const n = new Set(prev); n.delete(r.name); return n; }), 1500);
  };

  const pdfResults   = results.filter((r) => !r.name.endsWith('.zip'));
  const singleResult = results.length === 1 && !results[0].name.endsWith('.zip') ? results[0] : null;

  // Derived
  const numOutputPdfs   = activeCuts.size + 1;
  const cutsDisabled    = mode === 'cuts' && activeCuts.size === 0;

  // ── Results ───────────────────────────────────────────────────────────────
  if (results.length > 0) return (
    <div ref={resultRef} className="w-full max-w-2xl mx-auto px-4 pb-16 space-y-4 mt-6 scroll-mt-20">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Split complete</p>
            <p className="text-xs text-slate-500">
              {pdfResults.length} file{pdfResults.length !== 1 ? 's' : ''} ready
              {results.some((r) => r.name.endsWith('.zip')) ? ' · ZIP included' : ''}
            </p>
          </div>
          <button
            onClick={backToEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
            Edit
          </button>
        </div>

        {singleResult && (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => download(singleResult)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloaded.has(singleResult.name) ? 'Saved ✓' : 'Save PDF'}
            </button>
            <button
              onClick={() => openPreview(singleResult)}
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

        {!singleResult && (
          <div className="space-y-2">
            {results.map((r) => {
              const isZip = r.name.endsWith('.zip');
              return (
                <div key={r.name} className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className={`w-4 h-4 shrink-0 ${isZip ? 'text-amber-400' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{r.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">{formatBytes(r.size)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!isZip && (
                      <button
                        onClick={() => openPreview(r)}
                        className="inline-flex items-center gap-1 border border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 text-violet-600 dark:text-violet-400 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Preview
                      </button>
                    )}
                    <button
                      onClick={() => download(r)}
                      className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {downloaded.has(r.name) ? '✓' : 'Save'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button
          onClick={reset}
          className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-500 text-sm text-slate-600 dark:text-slate-300 font-medium hover:border-red-400 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors"
        >
          Split Another PDF
        </button>
        <PdfContinueTo
          exclude="split"
          pdfBlob={singleResult?.blob}
          filename={singleResult?.name}
          sourceLabel="Split PDF"
        />
      </div>

      {/* Preview modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm" onClick={closePreview}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
              <button onClick={closePreview} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <p className="text-sm font-medium text-slate-100 truncate">{previewName}</p>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 tracking-wide shrink-0">PDF</span>
              </div>
              <button onClick={closePreview} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {(typeof navigator !== 'undefined' && navigator.pdfViewerEnabled && !/android/i.test(navigator.userAgent))
                ? <iframe src={previewUrl ?? ''} title={`Preview: ${previewName}`} className="border-0 absolute inset-0 w-full h-full" />
                : previewBlob && <PdfJsViewer file={previewBlob} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Main UI ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-16 mt-6 space-y-4">

      {/* Password prompt */}
      {needsPassword && file && (
        <PdfPasswordPrompt
          filename={file.name}
          onSubmit={(pw) => {
            setPdfPassword(pw);
            setNeedsPassword(false);
            setWrongPassword(false);
            loadFile([file], pw);
          }}
          wrongPassword={wrongPassword}
        />
      )}

      {/* Drop zone */}
      {!file && !needsPassword && (
        <DropZone
          onFiles={loadFile}
          accept={['application/pdf']}
          multiple={false}
          label="Drop your PDF here"
          hint="PDF files only · all processing happens in your browser"
          browseLabel="Browse PDF"
          fileTypeName="PDF"
        />
      )}

      {/* File loaded */}
      {file && pageCount > 0 && (
        <>
          {/* File info card */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{pageCount} pages · {formatBytes(file.size)}</p>
            </div>
            <button onClick={reset} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
            {(['cuts', 'select', 'range'] as Mode[]).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40'}`}>
                {m === 'cuts' ? 'Split by Cuts' : m === 'select' ? 'Select Pages' : 'Page Ranges'}
              </button>
            ))}
          </div>

          {/* ── Cuts mode ── */}
          {mode === 'cuts' && (
            <div className="space-y-3">
              {/* Sticky control bar */}
              <div className="sticky z-40 flex flex-wrap items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/8 shadow-md" style={{ top: 64 }}>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useInterval}
                    onChange={(e) => setUseInterval(e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  <span className="text-sm font-medium text-fg-2">Split every</span>
                </label>
                <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIntervalSize((s) => Math.max(1, s - 1))}
                    className="w-8 h-8 flex items-center justify-center text-fg-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-base leading-none font-medium"
                  >−</button>
                  <input
                    type="number"
                    value={intervalSize}
                    min={1}
                    max={Math.max(1, pageCount - 1)}
                    onChange={(e) => setIntervalSize(Math.max(1, Math.min(pageCount > 1 ? pageCount - 1 : 1, parseInt(e.target.value) || 1)))}
                    className="w-10 text-center text-sm font-semibold text-fg-1 bg-transparent border-x border-slate-200 dark:border-slate-600 focus:outline-none h-8"
                  />
                  <button
                    onClick={() => setIntervalSize((s) => Math.min(Math.max(1, pageCount - 1), s + 1))}
                    className="w-8 h-8 flex items-center justify-center text-fg-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-base leading-none font-medium"
                  >+</button>
                </div>
                <span className="text-sm text-fg-2">page{intervalSize !== 1 ? 's' : ''}</span>
                <div className="ml-auto flex items-center gap-3">
                  {activeCuts.size > 0 && (
                    <span className="text-xs font-semibold text-accent hidden sm:block">
                      → {numOutputPdfs} PDF{numOutputPdfs !== 1 ? 's' : ''}
                    </span>
                  )}
                  <button
                    onClick={run}
                    disabled={isWorking || cutsDisabled}
                    className="inline-flex items-center gap-1.5 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all"
                  >
                    {isWorking ? (
                      <>
                        <svg className="w-3.5 h-3.5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Splitting…
                      </>
                    ) : (
                      <>
                        <ScissorsIcon size={13} />
                        {activeCuts.size > 0 ? `Split into ${numOutputPdfs} PDF${numOutputPdfs !== 1 ? 's' : ''}` : 'Split PDF'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Full-width page grid with scissors between same-row pages */}
              <div
                className="rounded-2xl border border-slate-200 dark:border-white/8 shadow-sm overflow-hidden"
                style={{ background: 'oklch(96.5% 0.012 265)' }}
              >
                <div className="p-3 dark:bg-slate-800/60 space-y-1">
                  {Array.from({ length: Math.ceil(pageCount / cols) }, (_, rowIdx) => {
                    const startIdx = rowIdx * cols;
                    const rowPages = Array.from({ length: Math.min(cols, pageCount - startIdx) }, (_, j) => startIdx + j);
                    return (
                      <div key={rowIdx} className="flex items-stretch w-full">
                        {rowPages.flatMap((pageIdx, j) => {
                          const isLastInRow = j === rowPages.length - 1;
                          const isCut = activeCuts.has(pageIdx);
                          const isLastPage = pageIdx === pageCount - 1;
                          const items = [
                            <div key={`p-${pageIdx}`} className="flex-none flex flex-col items-center py-4 px-1 gap-1.5" style={{ width: `calc((100% - ${cols - 1} * 36px) / ${cols})` }}>
                              <div className="w-full rounded-lg overflow-hidden shadow-md bg-white relative" style={{ aspectRatio: '3/4' }}>
                                {thumbs[pageIdx] ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={thumbs[pageIdx]!} alt={`Page ${pageIdx + 1}`} className="w-full h-full object-cover object-top" draggable={false} />
                                ) : (
                                  <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-600" />
                                )}
                              </div>
                              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">{pageIdx + 1}</span>
                            </div>,
                          ];
                          if (!isLastInRow && !isLastPage) {
                            items.push(
                              <div
                                key={`s-${pageIdx}`}
                                className="shrink-0 relative flex items-center justify-center self-stretch"
                                style={{ width: 36 }}
                              >
                                <div
                                  className="absolute top-0 bottom-0"
                                  style={{
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: isCut ? 2 : 0,
                                    background: isCut ? 'var(--accent)' : undefined,
                                    borderLeft: isCut ? 'none' : '2px dashed #a5b4fc',
                                  }}
                                />
                                <button
                                  onClick={() => !useInterval && toggleCut(pageIdx)}
                                  disabled={useInterval}
                                  className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none select-none"
                                  style={{
                                    background: isCut ? 'var(--accent)' : '#c7d2fe',
                                    color: 'white',
                                    opacity: useInterval && !isCut ? 0.35 : 1,
                                    cursor: useInterval ? 'not-allowed' : 'pointer',
                                    boxShadow: isCut ? '0 2px 10px color-mix(in oklch, var(--accent) 45%, transparent)' : 'none',
                                    transform: isCut ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
                                  }}
                                >
                                  <ScissorsIcon size={14} />
                                </button>
                              </div>
                            );
                          }
                          return items;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {!thumbsDone && (
                <p className="text-center text-xs text-slate-400 animate-pulse">Rendering page previews…</p>
              )}
              {thumbsDone && activeCuts.size === 0 && !useInterval && (
                <p className="text-center text-xs text-fg-3">Click ✂ between pages to mark where to split</p>
              )}
              {thumbsDone && activeCuts.size === 0 && useInterval && (
                <p className="text-center text-xs text-fg-3">Split every {intervalSize} page{intervalSize !== 1 ? 's' : ''} — {numOutputPdfs} PDF{numOutputPdfs !== 1 ? 's' : ''} ready</p>
              )}
            </div>
          )}

          {/* ── Select pages mode ── */}
          {mode === 'select' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {selected.size > 0
                    ? `${selected.size} of ${pageCount} page${selected.size !== 1 ? 's' : ''} selected`
                    : `${pageCount} pages — click to select`}
                </p>
                <div className="flex gap-3">
                  <button onClick={selectAll} className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium">Select all</button>
                  <button onClick={clearAll}  className="text-xs text-slate-400 hover:underline">Clear</button>
                </div>
              </div>

              <div
                ref={gridRef}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 select-none"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(touch.clientX, touch.clientY);
                  const card = el?.closest('[data-page-idx]') as HTMLElement | null;
                  if (!card) return;
                  const idx = parseInt(card.dataset.pageIdx!);
                  longPressTimer.current = setTimeout(() => {
                    navigator.vibrate?.(30);
                    touchDragActiveRef.current = true;
                    lastTouchIdxRef.current = idx;
                    dragStartIdxRef.current = idx;
                    dragModeRef.current = selected.has(idx) ? 'deselect' : 'select';
                    preDragSelectionRef.current = new Set(selected);
                    setSelected((prev) => { const n = new Set(prev); dragModeRef.current === 'select' ? n.add(idx) : n.delete(idx); return n; });
                  }, 400);
                }}
                onTouchMove={() => {
                  if (!touchDragActiveRef.current) {
                    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
                  }
                }}
                onTouchEnd={(e) => {
                  if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
                  touchDragActiveRef.current = false;
                  lastTouchIdxRef.current = null;
                  if (autoScrollRef.current) { clearInterval(autoScrollRef.current); autoScrollRef.current = null; }
                  e.stopPropagation();
                }}
              >
                {thumbs.map((thumb, i) => {
                  const isSelected = selected.has(i);
                  return (
                    <div
                      key={i}
                      data-page-idx={String(i)}
                      onMouseDown={(e) => {
                        if (e.button !== 0) return;
                        e.preventDefault();
                        isDraggingRef.current = true;
                        dragStartIdxRef.current = i;
                        dragModeRef.current = isSelected ? 'deselect' : 'select';
                        preDragSelectionRef.current = new Set(selected);
                        setSelected((prev) => { const n = new Set(prev); isSelected ? n.delete(i) : n.add(i); return n; });
                      }}
                      onMouseEnter={() => {
                        if (!isDraggingRef.current) return;
                        const start = dragStartIdxRef.current ?? i;
                        const lo = Math.min(start, i);
                        const hi = Math.max(start, i);
                        setSelected(() => {
                          const n = new Set(preDragSelectionRef.current);
                          for (let k = lo; k <= hi; k++) dragModeRef.current === 'select' ? n.add(k) : n.delete(k);
                          return n;
                        });
                      }}
                      className={`group relative flex flex-col items-center rounded-xl overflow-hidden border-2 cursor-pointer transition-all shadow-sm hover:shadow-md ${
                        isSelected
                          ? 'border-violet-500 shadow-violet-200 dark:shadow-violet-900/40'
                          : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
                      }`}
                    >
                      <div className="w-full bg-slate-100 dark:bg-slate-700/50 aspect-3/4 relative">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={`Page ${i + 1}`} className="w-full h-full object-cover object-top" draggable={false} />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
                        )}
                        {isSelected && <div className="absolute inset-0 bg-violet-500/10" />}
                        <div className={`absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'bg-emerald-500 opacity-100 scale-100' : 'bg-white/80 dark:bg-slate-800/80 opacity-0 group-hover:opacity-60 scale-90'
                        }`}>
                          <svg className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        {thumb && (
                          <button
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); setPagePreviewIdx(i); }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className={`w-full py-1.5 text-center text-xs font-medium transition-colors ${
                        isSelected ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!thumbsDone && <p className="text-center text-xs text-slate-400 animate-pulse">Rendering page previews…</p>}
              {thumbsDone && <p className="text-center text-xs text-slate-400 sm:hidden">Tap to select · Hold and drag to select multiple</p>}
            </div>
          )}

          {/* ── Range mode ── */}
          {mode === 'range' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Page ranges</label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder={`e.g. 1-3, 5, 7-${Math.min(10, pageCount)}`}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/40 text-sm text-slate-800 dark:text-slate-100 px-4 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">Each comma-separated entry becomes a separate PDF. Multiple parts download as a ZIP.</p>
              </div>
              {rangeInput && (
                <div className="flex flex-wrap gap-1.5">
                  {parseRanges(rangeInput, pageCount).map(({ label }) => (
                    <span key={label} className="text-[11px] bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/60 px-2 py-0.5 rounded-full font-medium">
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Progress */}
          {isWorking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Processing…</span><span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
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

          {/* Action button */}
          <button
            onClick={run}
            disabled={isWorking || cutsDisabled}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
          >
            {isWorking ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Splitting…
              </>
            ) : (
              <>
                <ScissorsIcon size={15} />
                {mode === 'cuts'
                  ? activeCuts.size > 0
                    ? `Split into ${numOutputPdfs} PDF${numOutputPdfs !== 1 ? 's' : ''}`
                    : 'Add cut points first'
                  : mode === 'select'
                  ? `Extract ${selected.size > 0 ? selected.size + ' Page' + (selected.size !== 1 ? 's' : '') : 'Pages'}`
                  : 'Split PDF'
                }
              </>
            )}
          </button>

          {mode === 'select' && selected.size === 0 && (
            <p className="text-center text-xs text-slate-400">Click page thumbnails above to select them</p>
          )}
        </>
      )}

      {/* Pre-load error */}
      {error && !file && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Page preview lightbox */}
      {pagePreviewIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setPagePreviewIdx(null)}>
          <div className="relative flex flex-col items-center max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between w-full mb-3 px-1">
              <span className="text-sm font-medium text-white/80">Page {pagePreviewIdx + 1} of {pageCount}</span>
              <button onClick={() => setPagePreviewIdx(null)} className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPagePreviewIdx((p) => p !== null && p > 0 ? p - 1 : p)}
                disabled={pagePreviewIdx === 0}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 transition-colors shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <div className="rounded-xl overflow-hidden shadow-2xl bg-slate-100 relative flex items-center justify-center" style={{ minHeight: '55vh', minWidth: 'min(55vw, 420px)' }}>
                {hiResUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={hiResUrl} alt={`Page ${pagePreviewIdx + 1}`} className="block max-h-[78vh] w-auto max-w-full" draggable={false} />
                ) : (
                  <svg className="w-8 h-8 text-slate-400 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
              </div>
              <button
                onClick={() => setPagePreviewIdx((p) => p !== null && p < pageCount - 1 ? p + 1 : p)}
                disabled={pagePreviewIdx === pageCount - 1}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 transition-colors shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
            {mode === 'select' && (
              <button
                onClick={() => togglePage(pagePreviewIdx)}
                className={`mt-4 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selected.has(pagePreviewIdx) ? 'bg-emerald-500 hover:bg-red-500 text-white' : 'bg-white/15 hover:bg-violet-500 text-white'
                }`}
              >
                {selected.has(pagePreviewIdx) ? '✓ Selected — click to deselect' : 'Select this page'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
