"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DropZone } from "./DropZone";
import { PdfPasswordPrompt } from "./PdfPasswordPrompt";

function isEncryptError(e: unknown): boolean {
    const msg = String(e).toLowerCase();
    return msg.includes("encrypt") || msg.includes("password") || msg.includes("decrypt");
}

// ── PDF.js page viewer (used for all previews — iframe has no PDF support on Android) ───

function PdfJsViewer({ file, password = '' }: { file: File | Blob; password?: string }) {
    const [pageUrls, setPageUrls] = useState<string[]>([]);
    const [rendered, setRendered] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const urls: string[] = [];

        (async () => {
            const pdfjsLib = await import("pdfjs-dist");
            pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
            const bytes = new Uint8Array(await file.arrayBuffer());
            const pdf = await pdfjsLib.getDocument({ data: bytes, password }).promise;
            if (cancelled) return;
            setTotal(pdf.numPages);

            for (let i = 1; i <= pdf.numPages; i++) {
                if (cancelled) break;
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
                const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.9));
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    urls.push(url);
                    if (!cancelled) {
                        setPageUrls([...urls]);
                        setRendered(i);
                    }
                }
            }
        })().catch(() => {});

        return () => {
            cancelled = true;
            urls.forEach(URL.revokeObjectURL);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (pageUrls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {total > 0 && (
                    <p className="text-xs">
                        {rendered} / {total} pages
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="overflow-y-auto h-full bg-slate-700 flex flex-col items-center gap-2 py-4 px-2">
            {pageUrls.map((url, i) => (
                <img key={i} src={url} alt={`Page ${i + 1}`} className="max-w-full shadow-lg rounded" />
            ))}
            {rendered < total && (
                <p className="text-xs text-slate-400 py-2">
                    {rendered} / {total} pages rendered…
                </p>
            )}
        </div>
    );
}

interface PdfEntry {
    id: string;
    file: File;
    pageCount: number | null;
    dimensions: string | null;
    locked: boolean;
    password: string | null;
    wrongPassword: boolean;
    thumbnailUrl: string | null;
    rotation: 0 | 90 | 180 | 270;
}

function formatBytes(b: number) {
    if (b < 1024) return `${b} B`;
    if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1048576).toFixed(2)} MB`;
}

function ptToMm(pt: number) {
    return Math.round((pt * 25.4) / 72);
}

async function renderThumbnailWithPdfJs(file: File, password?: string): Promise<{ count: number; dimensions: string | null; thumbnailBlob: Blob | null }> {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const bytes = new Uint8Array(await file.arrayBuffer());
    const loadingTask = pdfjsLib.getDocument({ data: bytes, password: password ?? "" });
    const pdf = await loadingTask.promise;
    const count = pdf.numPages;

    const page = await pdf.getPage(1);
    const { width, height } = page.getViewport({ scale: 1 });
    const dimensions = `${ptToMm(width)}×${ptToMm(height)} mm`;

    // Render first page to canvas → JPEG blob for thumbnail
    const scale = Math.min(400 / width, 565 / height, 2);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const thumbnailBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.85));

    return { count, dimensions, thumbnailBlob };
}

// ── Sortable thumbnail card ───────────────────────────────────────────────────

interface CardProps {
    entry: PdfEntry;
    index: number;
    isDragging?: boolean;
    onPreview: (entry: PdfEntry) => void;
    onRemove: (id: string) => void;
    onRotate: (id: string) => void;
    onPasswordSubmit: (id: string, pw: string) => void;
}

function PdfCard({ entry, index, isDragging = false, onPreview, onRemove, onRotate, onPasswordSubmit }: CardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({ id: entry.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0 : 1,
    };

    const baseName = entry.file.name.replace(/\.pdf$/i, "");

    const thumbTransform =
        entry.rotation === 0
            ? undefined
            : entry.rotation === 90 || entry.rotation === 270
              ? `rotate(${entry.rotation}deg) scale(0.707)`
              : `rotate(${entry.rotation}deg)`;

    return (
        <div ref={setNodeRef} style={style} className="flex flex-col">
            <div
                className={`relative bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden shadow-sm transition-shadow ${isDragging ? "shadow-2xl ring-2 ring-blue-400/50" : "hover:shadow-md"} ${entry.locked ? "border-amber-300 dark:border-amber-700" : "border-slate-200 dark:border-white/8"}`}
            >
                {/* ── Thumbnail (A4 ratio 1:√2) ── */}
                <div className="relative w-full bg-slate-100 dark:bg-slate-700/60" style={{ paddingBottom: "141.4%" }}>
                    {/* Transparent drag handle */}
                    <button
                        {...attributes}
                        {...listeners}
                        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none"
                        tabIndex={-1}
                        aria-label="Drag to reorder"
                    />

                    {entry.thumbnailUrl && !entry.locked ? (
                        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                            <img
                                src={entry.thumbnailUrl}
                                alt={entry.file.name}
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                                style={thumbTransform ? { transform: thumbTransform, transformOrigin: "center center" } : undefined}
                            />
                        </div>
                    ) : entry.locked ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center">Password protected</p>
                        </div>
                    ) : !entry.locked && !entry.thumbnailUrl ? (
                        // Unlocked but encryption unsupported — no thumbnail available
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center">Unlocked · ready to merge</p>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-slate-300 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        </div>
                    )}

                    {/* Top-left: eye (preview) + rotate */}
                    <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreview(entry);
                            }}
                            disabled={!entry.thumbnailUrl}
                            title={entry.thumbnailUrl ? "Preview" : "Preview unavailable"}
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRotate(entry.id);
                            }}
                            title="Rotate 90°"
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Top-right: red delete */}
                    <div className="absolute top-1.5 right-1.5 z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(entry.id);
                            }}
                            title="Remove"
                            className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Order badge — bottom-left */}
                    <div className="absolute bottom-2 left-2 z-20">
                        <span className="text-[11px] font-bold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">#{index + 1}</span>
                    </div>
                </div>

                {/* ── Info ── */}
                <div className="px-2.5 py-2 space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-wrap leading-tight">
                        {entry.pageCount !== null && (
                            <span className="font-semibold text-slate-600 dark:text-slate-300">
                                {entry.pageCount} {entry.pageCount === 1 ? "Page" : "Pages"}
                            </span>
                        )}
                        {entry.dimensions && (
                            <>
                                <span className="text-slate-300 dark:text-slate-600">·</span>
                                <span>{entry.dimensions}</span>
                            </>
                        )}
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{formatBytes(entry.file.size)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate flex-1" title={baseName}>
                            {baseName}
                        </p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 rounded shrink-0 tracking-wide">PDF</span>
                    </div>
                </div>

                {entry.locked && (
                    <div className="px-2.5 pb-2.5">
                        <PdfPasswordPrompt filename={entry.file.name} onSubmit={(pw) => onPasswordSubmit(entry.id, pw)} wrongPassword={entry.wrongPassword} />
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export function MergePdfUI() {
    const [entries, setEntries] = useState<PdfEntry[]>([]);
    const [isWorking, setIsWorking] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultSize, setResultSize] = useState<number>(0);
    const [saved, setSaved] = useState(false);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [previewEntry, setPreviewEntry] = useState<PdfEntry | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const idCounter = useRef(0);
    const addMoreRef = useRef<HTMLInputElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 500, tolerance: 10 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragStart = (event: DragStartEvent) => setActiveId(String(event.active.id));

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

    const openPreview = useCallback(
        (entry: PdfEntry) => {
            if (!entry.thumbnailUrl) return;
            setPreviewUrl("__pdfjs__");
            setPreviewEntry(entry);
        },
        [],
    );

    const openResultPreview = useCallback(() => {
        setPreviewUrl("__pdfjs_result__");
        setPreviewEntry(null);
    }, []);

    const closePreview = useCallback(() => {
        setPreviewUrl(null);
        setPreviewEntry(null);
    }, []);

    const rotateEntry = (id: string) => setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, rotation: ((e.rotation + 90) % 360) as 0 | 90 | 180 | 270 } : e)));

    const removeEntry = (id: string) => {
        setEntries((prev) => {
            const entry = prev.find((e) => e.id === id);
            if (entry?.thumbnailUrl) URL.revokeObjectURL(entry.thumbnailUrl);
            return prev.filter((e) => e.id !== id);
        });
        setError(null);
    };

    const removeFromPreview = (id: string) => {
        removeEntry(id);
        closePreview();
    };

    useEffect(() => {
        if (!previewUrl) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closePreview();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [previewUrl, closePreview]);

    const addFiles = useCallback(async (files: File[]) => {
        const pdfs = files.filter((f) => f.type === "application/pdf");
        if (pdfs.length === 0) {
            setError("Please upload PDF files only.");
            return;
        }
        setError(null);
        const newEntries: PdfEntry[] = pdfs.map((f) => ({
            id: `pdf-${++idCounter.current}`,
            file: f,
            pageCount: null,
            dimensions: null,
            locked: false,
            password: null,
            wrongPassword: false,
            thumbnailUrl: null,
            rotation: 0,
        }));
        setEntries((prev) => [...prev, ...newEntries]);

        for (const entry of newEntries) {
            (async () => {
                try {
                    const { count, dimensions, thumbnailBlob } = await renderThumbnailWithPdfJs(entry.file);
                    const thumbUrl = thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : null;
                    setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, pageCount: count, dimensions, thumbnailUrl: thumbUrl } : e)));
                } catch {
                    // PDF.js threw — likely password-protected
                    setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, locked: true } : e)));
                }
            })();
        }
    }, []);

    const handlePasswordSubmit = (id: string, pw: string) => {
        const entry = entries.find((e) => e.id === id);
        if (!entry) return;
        renderThumbnailWithPdfJs(entry.file, pw)
            .then(({ count, dimensions, thumbnailBlob }) => {
                const cur = entries.find((e) => e.id === id);
                if (cur?.thumbnailUrl) URL.revokeObjectURL(cur.thumbnailUrl);
                const thumbUrl = thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : null;
                setEntries((prev) =>
                    prev.map((e) => (e.id === id ? { ...e, pageCount: count, dimensions, password: pw, locked: false, wrongPassword: false, thumbnailUrl: thumbUrl } : e)),
                );
            })
            .catch(() => setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, locked: true, wrongPassword: true } : e))));
    };

    const merge = useCallback(async () => {
        if (entries.length < 2) {
            setError("Add at least 2 PDF files to merge.");
            return;
        }
        setIsWorking(true);
        setError(null);
        setProgress(0);
        setResultUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });

        try {
            const { PDFDocument, degrees } = await import("pdf-lib");
            const merged = await PDFDocument.create();

            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                const bytes = new Uint8Array(await entry.file.arrayBuffer());
                const pw = entry.password ?? undefined;
                let doc;
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    doc = await PDFDocument.load(bytes, pw ? ({ password: pw } as any) : { ignoreEncryption: true });
                } catch {
                    // Encryption algorithm unsupported — load without decryption
                    doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
                }
                const copied = await merged.copyPages(doc, doc.getPageIndices());
                copied.forEach((p) => {
                    if (entry.rotation !== 0) {
                        p.setRotation(degrees((p.getRotation().angle + entry.rotation) % 360));
                    }
                    merged.addPage(p);
                });
                setProgress(Math.round(((i + 1) / entries.length) * 100));
            }

            const outBytes = await merged.save();
            const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            setResultBlob(blob);
            setResultUrl(URL.createObjectURL(blob));
            setResultSize(outBytes.byteLength);
        } catch (err) {
            if (isEncryptError(err)) {
                setError("One or more PDFs are password-protected. Please unlock them before merging.");
            } else {
                setError((err as Error).message || "Merge failed. Please try again.");
            }
        } finally {
            setIsWorking(false);
        }
    }, [entries]);

    const save = useCallback(async () => {
        if (!resultUrl) return;
        try {
            const res = await fetch(resultUrl);
            const blob = await res.blob();
            if ("showSaveFilePicker" in window) {
                const handle = await (window as Window & typeof globalThis & { showSaveFilePicker: (o: object) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
                    suggestedName: "merged.pdf",
                    types: [{ description: "PDF Document", accept: { "application/pdf": [".pdf"] } }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
            } else {
                const a = document.createElement("a");
                a.href = resultUrl;
                a.download = "merged.pdf";
                a.click();
            }
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch {
            // user cancelled the save dialog — do nothing
        }
    }, [resultUrl]);

    const backToEdit = () => {
        setResultUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        setResultBlob(null);
        setResultSize(0);
        setProgress(0);
        setError(null);
    };

    const reset = () => {
        entries.forEach((e) => {
            if (e.thumbnailUrl) URL.revokeObjectURL(e.thumbnailUrl);
        });
        setEntries([]);
        setResultUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        setResultBlob(null);
        setError(null);
        setProgress(0);
        setResultSize(0);
    };

    const totalPages = entries.reduce((s, e) => s + (e.pageCount ?? 0), 0);
    const totalSize = entries.reduce((s, e) => s + e.file.size, 0);
    const activeEntry = activeId ? entries.find((e) => e.id === activeId) : null;

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-16">
            {resultUrl && (
                <div className="mt-6 space-y-4">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Merge complete</p>
                                <p className="text-xs text-slate-500">
                                    {entries.length} files · {totalPages > 0 ? `${totalPages} pages · ` : ""}
                                    {formatBytes(totalSize)} → {formatBytes(resultSize)}
                                </p>
                            </div>
                            <button
                                onClick={backToEdit}
                                title="Edit files"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors shrink-0"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                                </svg>
                                Edit
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={save}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
                            >
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {saved ? "Saved ✓" : "Save PDF"}
                            </button>
                            <button
                                onClick={openResultPreview}
                                className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-blue-950/20 hover:bg-violet-100 dark:hover:bg-blue-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all"
                            >
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Preview
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={reset}
                        className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-500 text-sm text-slate-600 dark:text-slate-300 font-medium hover:border-red-400 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors"
                    >
                        Start Over
                    </button>
                </div>
            )}

            {!resultUrl && (
                <div className="mt-6 space-y-4">
                    <DropZone
                        onFiles={addFiles}
                        accept={["application/pdf"]}
                        multiple
                        label="Drop PDF files here"
                        hint="Multiple PDFs · merged in order · all processing stays in your browser"
                        browseLabel="Browse PDFs"
                        fileTypeName="PDF"
                    />

                    {entries.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                    {entries.length} file{entries.length !== 1 ? "s" : ""}
                                    {totalPages > 0 ? ` · ${totalPages} pages` : ""} · {formatBytes(totalSize)}
                                </p>
                                <button
                                    onClick={() => {
                                        entries.forEach((e) => {
                                            if (e.thumbnailUrl) URL.revokeObjectURL(e.thumbnailUrl);
                                        });
                                        setEntries([]);
                                    }}
                                    className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                                <SortableContext items={entries.map((e) => e.id)} strategy={rectSortingStrategy}>
                                    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 gap-3">
                                        {entries.map((entry, idx) => (
                                            <PdfCard
                                                key={entry.id}
                                                entry={entry}
                                                index={idx}
                                                onPreview={openPreview}
                                                onRemove={removeEntry}
                                                onRotate={rotateEntry}
                                                onPasswordSubmit={handlePasswordSubmit}
                                            />
                                        ))}
                                        {/* Add more card */}
                                        <button
                                            onClick={() => addMoreRef.current?.click()}
                                            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer"
                                            style={{ minHeight: "180px" }}
                                        >
                                            <svg
                                                className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Add PDFs</span>
                                        </button>
                                    </div>
                                </SortableContext>
                                <input
                                    ref={addMoreRef}
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            addFiles(Array.from(e.target.files));
                                            e.target.value = "";
                                        }
                                    }}
                                />

                                <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
                                    {activeEntry && (
                                        <div className="bg-white dark:bg-slate-800 border border-blue-400 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-blue-400/30 rotate-2 opacity-95">
                                            <div className="relative w-full bg-slate-100 dark:bg-slate-700" style={{ paddingBottom: "141.4%" }}>
                                                {activeEntry.thumbnailUrl ? (
                                                    <img
                                                        src={activeEntry.thumbnailUrl}
                                                        alt={activeEntry.file.name}
                                                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="px-2.5 py-2">
                                                <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{activeEntry.file.name.replace(/\.pdf$/i, "")}</p>
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
                                <div className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        onClick={merge}
                        disabled={isWorking || entries.length < 2 || entries.some((e) => e.locked)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
                    >
                        {isWorking ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Merging…
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
                                </svg>
                                Merge {entries.length >= 2 ? `${entries.length} PDFs` : "PDFs"}
                            </>
                        )}
                    </button>

                    {entries.length === 1 && <p className="text-center text-xs text-slate-400">Add at least one more PDF to merge</p>}
                </div>
            )}

            {/* Preview modal — PDF.js canvas viewer, works on all platforms including Android */}
            {previewUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm" onClick={closePreview}>
                    <div
                        className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 border-b border-white/8 shrink-0">
                            <button
                                onClick={closePreview}
                                title="Back (Esc)"
                                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-100 truncate leading-tight">{previewEntry ? previewEntry.file.name : "merged.pdf"}</p>
                                    <p className="text-[11px] text-slate-500 leading-tight">
                                        {previewEntry
                                            ? `${formatBytes(previewEntry.file.size)}${previewEntry.pageCount !== null ? ` · ${previewEntry.pageCount} page${previewEntry.pageCount !== 1 ? "s" : ""}` : ""}${previewEntry.dimensions ? ` · ${previewEntry.dimensions}` : ""}`
                                            : `${formatBytes(resultSize)} · ${entries.length} files merged`}
                                    </p>
                                </div>
                                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 tracking-wide shrink-0">PDF</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                {previewEntry && (
                                    <>
                                        <button
                                            onClick={() => removeFromPreview(previewEntry.id)}
                                            title="Remove from merge list"
                                            className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                        <div className="w-px h-5 bg-white/10 mx-0.5" />
                                    </>
                                )}
                                <button
                                    onClick={closePreview}
                                    title="Close (Esc)"
                                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            {previewUrl === "__pdfjs__" && previewEntry ? (
                                <PdfJsViewer file={previewEntry.file} password={previewEntry.password ?? ''} />
                            ) : previewUrl === "__pdfjs_result__" && resultBlob ? (
                                <PdfJsViewer file={resultBlob} />
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
