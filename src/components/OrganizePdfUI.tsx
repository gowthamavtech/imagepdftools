'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';
import { PdfContinueTo } from './PdfContinueTo';
import { useHandoffStore } from '@/store/handoffStore';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

function isPdfjsPasswordError(e: unknown): boolean {
  return (e as { name?: string })?.name === 'PasswordException';
}
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DropZone } from './DropZone';

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

interface PageItem {
  id: string;
  originalIndex: number;
  thumbUrl: string | null;
}

interface SortablePageProps {
  item: PageItem;
  displayIndex: number;
  onDelete: (id: string) => void;
}

function SortablePage({ item, displayIndex, onDelete }: SortablePageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex:  isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex flex-col items-center gap-1.5"
    >
      {/* Drag handle + thumbnail */}
      <div
        {...attributes}
        {...listeners}
        className="relative w-full aspect-3/4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
      >
        {item.thumbUrl ? (
          <img src={item.thumbUrl} alt={`Page ${displayIndex}`} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25" />
            </svg>
          </div>
        )}

        {/* Delete overlay */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(item.id)}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity shadow-md"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{displayIndex}</span>
    </div>
  );
}

export function OrganizePdfUI() {
  const [pages,         setPages]         = useState<PageItem[]>([]);
  const [file,          setFile]          = useState<File | null>(null);
  const [isLoading,     setIsLoading]     = useState(false);
  const [isWorking,     setIsWorking]     = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [resultBytes,   setResultBytes]   = useState<Uint8Array | null>(null);
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const pendingFileRef = useRef<File | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const loadPages = useCallback(async (f: File, pw?: string) => {
    const password = pw ?? pdfPassword ?? undefined;
    setPages([]);
    setResultBytes(null);
    setError(null);
    setIsLoading(true);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes = new Uint8Array(await f.arrayBuffer());
      const pdf   = await pdfjsLib.getDocument({ data: bytes, ...(password ? { password } : {}) }).promise;
      const items: PageItem[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas   = document.createElement('canvas');
        canvas.width   = Math.floor(viewport.width);
        canvas.height  = Math.floor(viewport.height);
        await page.render({ canvas, viewport }).promise;
        items.push({
          id:            `page-${i}-${Date.now()}`,
          originalIndex: i - 1,
          thumbUrl:      canvas.toDataURL('image/jpeg', 0.7),
        });
        page.cleanup();
      }
      pdf.destroy();
      setPages(items);
    } catch (e) {
      if (isPdfjsPasswordError(e)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError('Failed to load PDF pages. The file may be corrupted.');
      }
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfPassword]);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    pendingFileRef.current = f;
    setNeedsPassword(false);
    setWrongPassword(false);
    setPdfPassword(null);
    await loadPages(f);
  }, [loadPages]);

  // Consume handoff from another tool
  const consumeHandoff   = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef       = useRef(consumeHandoff);
  const handleFilesRef   = useRef(handleFiles);
  handleFilesRef.current = handleFiles;
  useEffect(() => {
    const { file: f } = consumeRef.current();
    if (f && f.type === 'application/pdf') handleFilesRef.current([f]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPages((prev) => {
        const oldIndex = prev.findIndex((p) => p.id === active.id);
        const newIndex = prev.findIndex((p) => p.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const apply = async () => {
    if (!file || pages.length === 0) return;
    const password = pdfPassword ?? undefined;
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const srcBytes = new Uint8Array(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const srcDoc   = await PDFDocument.load(srcBytes, (password ? { password } : { ignoreEncryption: true }) as any);
      const outDoc   = await PDFDocument.create();
      const indices  = pages.map((p) => p.originalIndex);
      const copied   = await outDoc.copyPages(srcDoc, indices);
      copied.forEach((page) => outDoc.addPage(page));
      setResultBytes(await outDoc.save());
    } catch (e: unknown) {
      if (isEncryptError(e)) {
        setNeedsPassword(true);
      } else {
        setError(e instanceof Error ? e.message : 'Failed to rebuild PDF.');
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
    a.download = file.name.replace(/\.pdf$/i, '-organized.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => { setFile(null); setPages([]); setResultBytes(null); setError(null); setPdfPassword(null); setNeedsPassword(false); setWrongPassword(false); pendingFileRef.current = null; };
  const backToEdit = () => { setResultBytes(null); setError(null); };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-5">

      {/* Drop zone */}
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
              <p className="text-xs text-slate-400">{formatBytes(file.size)} · {pages.length} pages</p>
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

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
          Rendering page thumbnails…
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500 dark:text-red-400 text-center">{error}</p>}

      {/* Page grid */}
      {!resultBytes && pages.length > 0 && (
        <>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Drag pages to reorder · hover a page to delete it
          </p>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {pages.map((item, idx) => (
                  <SortablePage
                    key={item.id}
                    item={item}
                    displayIndex={idx + 1}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            onClick={apply}
            disabled={isWorking || pages.length === 0}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isWorking ? 'Building PDF…' : `Save ${pages.length}-page PDF`}
          </button>
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
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">PDF organized!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">{formatBytes(resultBytes.length)} · {pages.length} pages · ready to save</p>
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
            exclude="organize"
            pdfBytes={resultBytes}
            filename={file?.name ?? 'organized.pdf'}
            sourceLabel="Organize PDF"
          />
        </div>
      )}
    </div>
  );
}
