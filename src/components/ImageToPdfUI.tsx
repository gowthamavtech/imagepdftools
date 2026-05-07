'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DropZone } from './DropZone';
import { useHandoffStore } from '@/store/handoffStore';

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  w: number;
  h: number;
  rotation: 0 | 90 | 180 | 270;
}

interface GeneratedPdf {
  bytes: Uint8Array;
  blobUrl: string;
  filename: string;
  size: number;
}

type PageSize = 'a4' | 'letter' | 'fit';

function generateId() { return Math.random().toString(36).slice(2, 10); }

// Canvas-based PDF viewer — fallback when browser has no native PDF viewer (e.g. Android Chrome)
function PdfJsViewer({ file }: { file: Blob }) {
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [rendered, setRendered] = useState(0);
  const [total, setTotal]       = useState(0);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

const PAGE_SIZES: { id: PageSize; label: string; desc: string; w: number; h: number }[] = [
  { id: 'a4',     label: 'A4',     desc: '210 × 297 mm',    w: 595.28, h: 841.89 },
  { id: 'letter', label: 'Letter', desc: '8.5 × 11 in',     w: 612,    h: 792    },
  { id: 'fit',    label: 'Fit',    desc: 'Match each image', w: 0,      h: 0      },
];

// ── Image card ────────────────────────────────────────────────────────────────

interface CardProps {
  entry: ImageEntry;
  index: number;
  isDragging?: boolean;
  onPreview: (entry: ImageEntry) => void;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
}

function ImageCard({ entry, index, isDragging = false, onPreview, onRemove, onRotate }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0 : 1,
  };

  const thumbTransform =
    entry.rotation === 0 ? undefined :
    entry.rotation === 90 || entry.rotation === 270 ? `rotate(${entry.rotation}deg) scale(0.707)` :
    `rotate(${entry.rotation}deg)`;

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col">
      <div className={`relative bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden shadow-sm transition-shadow ${isDragging ? 'shadow-2xl ring-2 ring-blue-400/50' : 'hover:shadow-md'} border-slate-200 dark:border-white/8`}>

        {/* Thumbnail area — 4:3 ratio */}
        <div className="relative w-full bg-slate-100 dark:bg-slate-700/60" style={{ paddingBottom: '75%' }}>

          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="absolute bottom-2 right-2 z-20 p-1.5 rounded-lg bg-blue-500/70 hover:bg-blue-500 text-white cursor-grab active:cursor-grabbing touch-none transition-colors"
            tabIndex={-1}
            aria-label="Drag to reorder"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="5.5" cy="4" r="1.2" /><circle cx="10.5" cy="4" r="1.2" />
              <circle cx="5.5" cy="8" r="1.2" /><circle cx="10.5" cy="8" r="1.2" />
              <circle cx="5.5" cy="12" r="1.2" /><circle cx="10.5" cy="12" r="1.2" />
            </svg>
          </button>

          {/* Image */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.previewUrl}
              alt={entry.file.name}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              style={thumbTransform ? { transform: thumbTransform, transformOrigin: 'center center' } : undefined}
            />
          </div>

          {/* Top-left: eye + rotate */}
          <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(entry); }}
              title="Preview"
              className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRotate(entry.id); }}
              title="Rotate 90°"
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          {/* Top-right: remove */}
          <div className="absolute top-1.5 right-1.5 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(entry.id); }}
              title="Remove"
              className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Order badge */}
          <div className="absolute bottom-2 left-2 z-20">
            <span className="text-[11px] font-bold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">#{index + 1}</span>
          </div>
        </div>

        {/* Info */}
        <div className="px-2.5 py-2 space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-wrap leading-tight">
            <span>{entry.w} × {entry.h} px</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>{formatBytes(entry.file.size)}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate flex-1" title={entry.file.name}>
              {entry.file.name}
            </p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 rounded shrink-0 tracking-wide uppercase">
              {entry.file.name.split('.').pop()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ImageToPdfUI() {
  const router     = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);

  const [images,       setImages]       = useState<ImageEntry[]>([]);
  const [pageSize,     setPageSize]     = useState<PageSize>('a4');
  const [isBuilding,   setIsBuilding]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [generated,    setGenerated]    = useState<GeneratedPdf | null>(null);
  const [sourceLabel,  setSourceLabel]  = useState<string | null>(null);
  const [saved,          setSaved]          = useState(false);
  const [activeId,       setActiveId]       = useState<string | null>(null);
  const [previewEntry,   setPreviewEntry]   = useState<ImageEntry | null>(null);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const prevBlobUrl    = useRef<string | null>(null);
  const addMoreRef     = useRef<HTMLInputElement>(null);
  const resultRef      = useRef<HTMLDivElement>(null);
  const consumeHandoffRef = useRef(consumeHandoff);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => () => {
    if (prevBlobUrl.current) URL.revokeObjectURL(prevBlobUrl.current);
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!previewEntry && !pdfPreviewOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPreviewEntry(null); setPdfPreviewOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [previewEntry, pdfPreviewOpen]);

  const loadImages = useCallback((files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    const entries: ImageEntry[] = [];
    let loaded = 0;
    imageFiles.forEach((file) => {
      const id  = generateId();
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        entries.push({ id, file, previewUrl: url, w: img.naturalWidth, h: img.naturalHeight, rotation: 0 });
        loaded++;
        if (loaded === imageFiles.length) setImages((prev) => [...prev, ...entries]);
      };
      img.onerror = () => {
        loaded++;
        URL.revokeObjectURL(url);
        if (loaded === imageFiles.length && entries.length > 0) setImages((prev) => [...prev, ...entries]);
      };
      img.src = url;
    });
    setGenerated(null);
  }, []);

  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeHandoffRef.current();
    if (f) { setSourceLabel(sl); loadImages([f]); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const removeImage = (id: string) => {
    setImages((prev) => {
      const entry = prev.find((e) => e.id === id);
      if (entry) URL.revokeObjectURL(entry.previewUrl);
      return prev.filter((e) => e.id !== id);
    });
    setGenerated(null);
  };

  const rotateImage = (id: string) => {
    setImages((prev) => prev.map((e) => e.id === id ? { ...e, rotation: ((e.rotation + 90) % 360) as 0 | 90 | 180 | 270 } : e));
    setGenerated(null);
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(String(event.active.id));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    setImages((prev) => {
      const oldIdx = prev.findIndex((e) => e.id === active.id);
      const newIdx = prev.findIndex((e) => e.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
    setGenerated(null);
  };

  const buildPdf = useCallback(async () => {
    if (images.length === 0) return;
    setIsBuilding(true);
    setError(null);
    if (prevBlobUrl.current) { URL.revokeObjectURL(prevBlobUrl.current); prevBlobUrl.current = null; }
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      const size   = PAGE_SIZES.find((p) => p.id === pageSize)!;

      for (const entry of images) {
        const isRotated90or270 = entry.rotation === 90 || entry.rotation === 270;

        let embedded;
        if (entry.rotation !== 0) {
          // Use canvas to apply rotation before embedding
          const pngBytes = await rotateImageToBytes(entry.previewUrl, entry.rotation);
          embedded = await pdfDoc.embedPng(pngBytes);
        } else if (entry.file.type === 'image/jpeg' || entry.file.type === 'image/jpg') {
          embedded = await pdfDoc.embedJpg(new Uint8Array(await entry.file.arrayBuffer()));
        } else if (entry.file.type === 'image/png') {
          embedded = await pdfDoc.embedPng(new Uint8Array(await entry.file.arrayBuffer()));
        } else {
          embedded = await pdfDoc.embedPng(await toBrowserPng(entry.previewUrl));
        }

        // For 90/270 rotation, image effective dimensions are swapped
        const imgW = isRotated90or270 ? entry.h : entry.w;
        const imgH = isRotated90or270 ? entry.w : entry.h;

        const pgW = pageSize === 'fit' ? imgW : size.w;
        const pgH = pageSize === 'fit' ? imgH : size.h;
        const page = pdfDoc.addPage([pgW, pgH]);
        const scale = Math.min(pgW / embedded.width, pgH / embedded.height);
        const dw = embedded.width  * scale;
        const dh = embedded.height * scale;
        page.drawImage(embedded, { x: (pgW - dw) / 2, y: (pgH - dh) / 2, width: dw, height: dh });

        void degrees; // imported but only needed if using native pdf-lib rotation
      }

      const pdfBytes = await pdfDoc.save();
      const filename = `imagepdftools-images-${Date.now()}.pdf`;
      const blob     = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const blobUrl  = URL.createObjectURL(blob);
      prevBlobUrl.current = blobUrl;
      setGenerated({ bytes: pdfBytes, blobUrl, filename, size: pdfBytes.byteLength });
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (err) {
      setError((err as Error).message || 'PDF generation failed. Please try again.');
    } finally {
      setIsBuilding(false);
    }
  }, [images, pageSize]);

  const handleSave = async () => {
    if (!generated) return;
    try {
      if ('showSaveFilePicker' in window) {
        const handle = await (window as Window & typeof globalThis & { showSaveFilePicker: (o: object) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
          suggestedName: generated.filename,
          types: [{ description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(new Blob([generated.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }));
        await writable.close();
      } else {
        const a = document.createElement('a');
        a.href = generated.blobUrl;
        a.download = generated.filename;
        a.click();
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      // user cancelled the save dialog
    }
  };

  const handleCompressPdf = () => {
    if (!generated) return;
    const file = new File([generated.bytes.buffer as ArrayBuffer], generated.filename, { type: 'application/pdf' });
    setHandoff(file);
    router.push('/compress-pdf');
  };

  const activeEntry = activeId ? images.find((e) => e.id === activeId) : null;
  const totalSize = images.reduce((s, e) => s + e.file.size, 0);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-16">

      {/* Result view — shown after generation, hides the image grid */}
      {generated && (
        <div ref={resultRef} className="mt-6 space-y-4 scroll-mt-20">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">PDF ready</p>
                <p className="text-xs text-slate-500">{images.length} page{images.length !== 1 ? 's' : ''} · {formatBytes(generated.size)}</p>
              </div>
              <button
                onClick={() => setGenerated(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                </svg>
                Edit
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={handleSave}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {saved ? 'Saved ✓' : 'Save PDF'}
              </button>
              <button onClick={() => setPdfPreviewOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-blue-950/20 hover:bg-violet-100 dark:hover:bg-blue-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preview
              </button>
            </div>
            <button onClick={handleCompressPdf}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-600 bg-white dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium py-2.5 rounded-xl transition-all">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
              Compress PDF
            </button>
          </div>
          <button
            onClick={() => { images.forEach((e) => URL.revokeObjectURL(e.previewUrl)); setImages([]); setGenerated(null); setError(null); }}
            className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-500 text-sm text-slate-600 dark:text-slate-300 font-medium hover:border-red-400 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Drop zone + image grid — hidden after generation */}
      {!generated && (
      <div className="mt-6 space-y-4">
        {images.length === 0 && (
          <DropZone
            onFiles={loadImages}
            accept={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
            label="Drop images here"
            hint="JPEG · PNG · WebP · multiple files · drag to reorder"
            fileTypeName="images"
          />
        )}

        {images.length > 0 && (
          <div className="space-y-3">
            {/* Page size selector */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Page Size</p>
              <div className="grid grid-cols-3 gap-2">
                {PAGE_SIZES.map((ps) => (
                  <button key={ps.id} onClick={() => { setPageSize(ps.id); setGenerated(null); }}
                    className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                      pageSize === ps.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-400'
                    }`}>
                    <span className="font-bold">{ps.label}</span>
                    <span className="text-[10px] opacity-70 mt-0.5">{ps.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid header */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {images.length} image{images.length !== 1 ? 's' : ''} · {formatBytes(totalSize)}
              </p>
              <button
                onClick={() => { images.forEach((e) => URL.revokeObjectURL(e.previewUrl)); setImages([]); setGenerated(null); }}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* Card grid */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((e) => e.id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((entry, idx) => (
                    <ImageCard
                      key={entry.id}
                      entry={entry}
                      index={idx}
                      onPreview={setPreviewEntry}
                      onRemove={removeImage}
                      onRotate={rotateImage}
                    />
                  ))}
                  {/* Add more card */}
                  <button
                    onClick={() => addMoreRef.current?.click()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer"
                    style={{ minHeight: '160px' }}
                  >
                    <svg className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Add images</span>
                  </button>
                </div>
              </SortableContext>

              <input
                ref={addMoreRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files) { loadImages(Array.from(e.target.files)); e.target.value = ''; } }}
              />

              <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
                {activeEntry && (
                  <div className="bg-white dark:bg-slate-800 border border-blue-400 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-blue-400/30 rotate-2 opacity-95">
                    <div className="relative w-full bg-slate-100 dark:bg-slate-700" style={{ paddingBottom: '75%' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activeEntry.previewUrl} alt={activeEntry.file.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{activeEntry.file.name}</p>
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Handoff source pill */}
            {sourceLabel && (
              <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 px-3 py-1.5 rounded-full w-fit">
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                From: {sourceLabel}
              </div>
            )}

            {/* Generate button */}
            <button onClick={buildPdf} disabled={isBuilding}
              className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all">
              {isBuilding ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Generating PDF…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Generate PDF ({images.length} image{images.length !== 1 ? 's' : ''})
                </>
              )}
            </button>
          </div>
        )}
      </div>
      )}

      {/* PDF preview modal */}
      {pdfPreviewOpen && generated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm" onClick={() => setPdfPreviewOpen(false)}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
              <button onClick={() => setPdfPreviewOpen(false)} title="Close (Esc)" className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate leading-tight">{generated.filename}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{images.length} page{images.length !== 1 ? 's' : ''} · {formatBytes(generated.size)}</p>
                </div>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 tracking-wide shrink-0">PDF</span>
              </div>
              <button onClick={() => setPdfPreviewOpen(false)} title="Close (Esc)" className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {(typeof navigator !== 'undefined' && navigator.pdfViewerEnabled && !/android/i.test(navigator.userAgent))
                ? <iframe src={generated.blobUrl} title="Preview PDF" className="border-0 absolute inset-0 w-full h-full" />
                : <PdfJsViewer file={new Blob([generated.bytes.buffer as ArrayBuffer], { type: 'application/pdf' })} />
              }
            </div>
          </div>
        </div>
      )}

      {/* Image preview lightbox */}
      {previewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setPreviewEntry(null)}>
          <div className="relative flex flex-col items-center max-h-full max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-3 px-1">
              <div className="min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">{previewEntry.file.name}</p>
                <p className="text-xs text-white/50">{previewEntry.w} × {previewEntry.h} px · {formatBytes(previewEntry.file.size)}</p>
              </div>
              <button onClick={() => setPreviewEntry(null)} className="p-1.5 ml-3 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-slate-100 flex items-center justify-center" style={{ minHeight: '55vh' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewEntry.previewUrl}
                alt={previewEntry.file.name}
                className="block max-h-[78vh] w-auto max-w-full"
                style={previewEntry.rotation !== 0
                  ? { transform: `rotate(${previewEntry.rotation}deg)`, ...(previewEntry.rotation === 90 || previewEntry.rotation === 270 ? { maxWidth: '78vh', maxHeight: 'none' } : {}) }
                  : undefined}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

async function rotateImageToBytes(url: string, rotation: 90 | 180 | 270): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const swap = rotation === 90 || rotation === 270;
      const canvas = document.createElement('canvas');
      canvas.width  = swap ? img.naturalHeight : img.naturalWidth;
      canvas.height = swap ? img.naturalWidth  : img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject);
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
}

async function toBrowserPng(url: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject);
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
}
