'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

interface PdfEntry {
  id: string;
  file: File;
  pageCount: number | null;
  locked: boolean;
  password: string | null;
  wrongPassword: boolean;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

async function getPageCountWithPassword(file: File, password: string): Promise<number> {
  const { PDFDocument } = await import('pdf-lib');
  const bytes = new Uint8Array(await file.arrayBuffer());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await PDFDocument.load(bytes, { password } as any);
  return doc.getPageCount();
}

// ── Sortable card ─────────────────────────────────────────────────────────────

interface CardProps {
  entry: PdfEntry;
  index: number;
  total: number;
  isDragging?: boolean;
  onPreview: (entry: PdfEntry) => void;
  onRemove: (id: string) => void;
  onPasswordSubmit: (id: string, pw: string) => void;
}

function PdfCard({ entry, index, total, isDragging = false, onPreview, onRemove, onPasswordSubmit }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-2">
      <div className={`flex items-center gap-3 bg-white dark:bg-slate-800 border rounded-xl px-3 py-2.5 shadow-sm ${isDragging ? 'shadow-lg ring-2 ring-blue-400/40' : ''} ${entry.locked ? 'border-amber-300 dark:border-amber-700' : 'border-slate-200 dark:border-white/8'}`}>

        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-400 transition-colors shrink-0 p-0.5 -m-0.5 rounded"
          title="Drag to reorder"
          tabIndex={-1}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9"  cy="5"  r="1.5"/>
            <circle cx="15" cy="5"  r="1.5"/>
            <circle cx="9"  cy="12" r="1.5"/>
            <circle cx="15" cy="12" r="1.5"/>
            <circle cx="9"  cy="19" r="1.5"/>
            <circle cx="15" cy="19" r="1.5"/>
          </svg>
        </button>

        {/* Order badge */}
        <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </span>

        {/* PDF / lock icon */}
        {entry.locked ? (
          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )}

        {/* Filename + size */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">{entry.file.name}</p>
          <p className="text-[10px] text-slate-400">
            {formatBytes(entry.file.size)}
            {entry.locked ? ' · password required' : entry.pageCount !== null ? ` · ${entry.pageCount}p` : ''}
          </p>
        </div>

        {/* View button */}
        <button
          onClick={() => onPreview(entry)}
          disabled={entry.locked}
          title={entry.locked ? 'Unlock to preview' : 'Preview PDF'}
          className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View
        </button>

        {/* Remove */}
        <button
          onClick={() => onRemove(entry.id)}
          className="p-1 text-slate-400 hover:text-red-500 transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Per-entry password prompt */}
      {entry.locked && (
        <PdfPasswordPrompt
          filename={entry.file.name}
          onSubmit={(pw) => onPasswordSubmit(entry.id, pw)}
          wrongPassword={entry.wrongPassword}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function MergePdfUI() {
  const [entries,    setEntries]    = useState<PdfEntry[]>([]);
  const [isWorking,  setIsWorking]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [error,      setError]      = useState<string | null>(null);
  const [resultUrl,  setResultUrl]  = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [downloaded, setDownloaded] = useState(false);
  const [previewEntry, setPreviewEntry] = useState<PdfEntry | null>(null);
  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null);
  const [activeId,     setActiveId]     = useState<string | null>(null);
  const idCounter = useRef(0);

  // dnd-kit sensors — pointer works for both mouse and touch; keyboard for a11y
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    setEntries((prev) => {
      const oldIdx = prev.findIndex((e) => e.id === active.id);
      const newIdx = prev.findIndex((e) => e.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  };

  const openPreview = useCallback((entry: PdfEntry) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(entry.file);
    setPreviewUrl(url);
    setPreviewEntry(entry);
  }, [previewUrl]);

  const closePreview = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewEntry(null);
  }, [previewUrl]);

  useEffect(() => {
    if (!previewEntry) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closePreview(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [previewEntry, closePreview]);

  const addFiles = useCallback(async (files: File[]) => {
    const pdfs = files.filter((f) => f.type === 'application/pdf');
    if (pdfs.length === 0) { setError('Please upload PDF files only.'); return; }
    setError(null);
    const newEntries: PdfEntry[] = pdfs.map((f) => ({
      id: `pdf-${++idCounter.current}`,
      file: f,
      pageCount: null,
      locked: false,
      password: null,
      wrongPassword: false,
    }));
    setEntries((prev) => [...prev, ...newEntries]);

    for (const entry of newEntries) {
      (async () => {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const bytes = new Uint8Array(await entry.file.arrayBuffer());
          const doc = await PDFDocument.load(bytes);
          if (doc.isEncrypted) {
            setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, locked: true } : e));
          } else {
            setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, pageCount: doc.getPageCount() } : e));
          }
        } catch {
          setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, locked: true } : e));
        }
      })();
    }
  }, []);

  const remove = (id: string) => { setEntries((prev) => prev.filter((e) => e.id !== id)); setError(null); };

  const handlePasswordSubmit = (id: string, pw: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    getPageCountWithPassword(entry.file, pw)
      .then((count) => setEntries((prev) => prev.map((e) =>
        e.id === id ? { ...e, pageCount: count, password: pw, locked: false, wrongPassword: false } : e,
      )))
      .catch(() => setEntries((prev) => prev.map((e) =>
        e.id === id ? { ...e, locked: true, wrongPassword: true } : e,
      )));
  };

  const merge = useCallback(async () => {
    if (entries.length < 2) { setError('Add at least 2 PDF files to merge.'); return; }
    setIsWorking(true);
    setError(null);
    setProgress(0);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const bytes = new Uint8Array(await entry.file.arrayBuffer());
        const pw = entry.password ?? undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loadOpts = pw ? ({ password: pw } as any) : { ignoreEncryption: true };
        const doc = await PDFDocument.load(bytes, loadOpts);
        const indices = doc.getPageIndices();
        const copied = await merged.copyPages(doc, indices);
        copied.forEach((p) => merged.addPage(p));
        setProgress(Math.round(((i + 1) / entries.length) * 100));
      }

      const outBytes = await merged.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(outBytes.byteLength);
    } catch (err) {
      if (isEncryptError(err)) {
        setError('One or more PDFs are password-protected. Please unlock them before merging.');
      } else {
        setError((err as Error).message || 'Merge failed. Please try again.');
      }
    } finally {
      setIsWorking(false);
    }
  }, [entries]);

  const download = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'merged.pdf';
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
  }, [resultUrl]);

  const reset = () => {
    setEntries([]);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setError(null);
    setProgress(0);
    setResultSize(0);
  };

  const totalPages = entries.reduce((s, e) => s + (e.pageCount ?? 0), 0);
  const totalSize  = entries.reduce((s, e) => s + e.file.size, 0);
  const activeEntry = activeId ? entries.find((e) => e.id === activeId) : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      {/* Result */}
      {resultUrl && (
        <div className="mt-6 space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Merge complete</p>
                <p className="text-xs text-slate-500">
                  {entries.length} files · {totalPages > 0 ? `${totalPages} pages · ` : ''}{formatBytes(totalSize)} → {formatBytes(resultSize)}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={download}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloaded ? 'Downloaded ✓' : 'Download PDF'}
              </button>
              <button onClick={() => window.open(resultUrl, '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-blue-950/20 hover:bg-violet-100 dark:hover:bg-blue-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preview
              </button>
            </div>
          </div>
          <button onClick={reset}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600 transition-colors">
            Start Over
          </button>
        </div>
      )}

      {!resultUrl && (
        <div className="mt-6 space-y-4">

          <DropZone
            onFiles={addFiles}
            accept={['application/pdf']}
            multiple
            label="Drop PDF files here"
            hint="Multiple PDFs · merged in order · all processing stays in your browser"
            browseLabel="Browse PDFs"
            fileTypeName="PDF"
          />

          {entries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {entries.length} file{entries.length !== 1 ? 's' : ''} · {totalPages > 0 ? `${totalPages} pages · ` : ''}{formatBytes(totalSize)}
                </p>
                <button onClick={() => setEntries([])} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
                  Clear all
                </button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={entries.map((e) => e.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {entries.map((entry, idx) => (
                      <PdfCard
                        key={entry.id}
                        entry={entry}
                        index={idx}
                        total={entries.length}
                        onPreview={openPreview}
                        onRemove={remove}
                        onPasswordSubmit={handlePasswordSubmit}
                      />
                    ))}
                  </div>
                </SortableContext>

                {/* Floating drag overlay — shows a copy of the card being dragged */}
                <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
                  {activeEntry && (
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-blue-400 dark:border-blue-500 rounded-xl px-3 py-2.5 shadow-2xl ring-2 ring-blue-400/30 rotate-1">
                      <svg className="w-4 h-4 text-slate-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="9"  cy="5"  r="1.5"/>
                        <circle cx="15" cy="5"  r="1.5"/>
                        <circle cx="9"  cy="12" r="1.5"/>
                        <circle cx="15" cy="12" r="1.5"/>
                        <circle cx="9"  cy="19" r="1.5"/>
                        <circle cx="15" cy="19" r="1.5"/>
                      </svg>
                      <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">{activeEntry.file.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {formatBytes(activeEntry.file.size)}
                          {activeEntry.pageCount !== null ? ` · ${activeEntry.pageCount}p` : ''}
                        </p>
                      </div>
                    </div>
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          )}

          {isWorking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Merging…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button onClick={merge} disabled={isWorking || entries.length < 2 || entries.some((e) => e.locked)}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all">
            {isWorking ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Merging…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
                </svg>
                Merge {entries.length >= 2 ? `${entries.length} PDFs` : 'PDFs'}
              </>
            )}
          </button>

          {entries.length < 2 && entries.length > 0 && (
            <p className="text-center text-xs text-slate-400">Add at least one more PDF to merge</p>
          )}
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewEntry && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closePreview(); }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-sm font-medium text-slate-100 truncate">{previewEntry.file.name}</span>
              {previewEntry.pageCount !== null && (
                <span className="text-xs text-slate-400 shrink-0">{previewEntry.pageCount} page{previewEntry.pageCount !== 1 ? 's' : ''}</span>
              )}
              <span className="text-xs text-slate-500 shrink-0">{formatBytes(previewEntry.file.size)}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={previewUrl}
                download={previewEntry.file.name}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
              <button
                onClick={closePreview}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors"
                title="Close preview (Esc)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title={`Preview: ${previewEntry.file.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
