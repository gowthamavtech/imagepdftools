'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  w: number;
  h: number;
}

interface GeneratedPdf {
  bytes: Uint8Array;
  blobUrl: string;
  filename: string;
  size: number;
}

type PageSize = 'a4' | 'letter' | 'fit';

function generateId() { return Math.random().toString(36).slice(2, 10); }
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

export function ImageToPdfUI() {
  const router     = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);

  const [images,       setImages]       = useState<ImageEntry[]>([]);
  const [pageSize,     setPageSize]     = useState<PageSize>('a4');
  const [isDrop,       setIsDrop]       = useState(false);
  const [isBuilding,   setIsBuilding]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [generated,    setGenerated]    = useState<GeneratedPdf | null>(null);
  const [sourceLabel,  setSourceLabel]  = useState<string | null>(null);
  const [downloaded,   setDownloaded]   = useState(false);
  const prevBlobUrl    = useRef<string | null>(null);

  const consumeHandoffRef = useRef(consumeHandoff);

  // Revoke blob URL on unmount
  useEffect(() => () => {
    if (prevBlobUrl.current) URL.revokeObjectURL(prevBlobUrl.current);
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        entries.push({ id, file, previewUrl: url, w: img.naturalWidth, h: img.naturalHeight });
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

  const moveImage = (id: string, dir: -1 | 1) => {
    setImages((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
    setGenerated(null);
  };

  const buildPdf = useCallback(async () => {
    if (images.length === 0) return;
    setIsBuilding(true);
    setError(null);
    // Revoke previous blob URL
    if (prevBlobUrl.current) { URL.revokeObjectURL(prevBlobUrl.current); prevBlobUrl.current = null; }
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      const size   = PAGE_SIZES.find((p) => p.id === pageSize)!;

      for (const entry of images) {
        const arrayBuf = await entry.file.arrayBuffer();
        const bytes    = new Uint8Array(arrayBuf);

        let embedded;
        if (entry.file.type === 'image/jpeg' || entry.file.type === 'image/jpg') {
          embedded = await pdfDoc.embedJpg(bytes);
        } else if (entry.file.type === 'image/png') {
          embedded = await pdfDoc.embedPng(bytes);
        } else {
          const pngBytes = await toBrowserPng(entry.previewUrl);
          embedded = await pdfDoc.embedPng(pngBytes);
        }

        const pgW  = pageSize === 'fit' ? entry.w : size.w;
        const pgH  = pageSize === 'fit' ? entry.h : size.h;
        const page = pdfDoc.addPage([pgW, pgH]);
        const scale = Math.min(pgW / embedded.width, pgH / embedded.height);
        const dw = embedded.width  * scale;
        const dh = embedded.height * scale;
        page.drawImage(embedded, { x: (pgW - dw) / 2, y: (pgH - dh) / 2, width: dw, height: dh });
      }

      const pdfBytes = await pdfDoc.save();
      const filename = `squishit-images-${Date.now()}.pdf`;
      const blob     = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const blobUrl  = URL.createObjectURL(blob);
      prevBlobUrl.current = blobUrl;
      setGenerated({ bytes: pdfBytes, blobUrl, filename, size: pdfBytes.byteLength });
    } catch (err) {
      setError((err as Error).message || 'PDF generation failed. Please try again.');
    } finally {
      setIsBuilding(false);
    }
  }, [images, pageSize]);

  const handleDownload = () => {
    if (!generated) return;
    const a    = document.createElement('a');
    a.href     = generated.blobUrl;
    a.download = generated.filename;
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
  };

  const handleView = () => {
    if (!generated) return;
    window.open(generated.blobUrl, '_blank');
  };

  const handleCompressPdf = () => {
    if (!generated) return;
    const file = new File([generated.bytes.buffer as ArrayBuffer], generated.filename, { type: 'application/pdf' });
    setHandoff(file);
    router.push('/compress-pdf');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDrop(true); }}
        onDragLeave={() => setIsDrop(false)}
        onDrop={(e) => { e.preventDefault(); setIsDrop(false); loadImages(Array.from(e.dataTransfer.files)); }}
        onClick={() => document.getElementById('pdf-input')?.click()}
        className={`mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer py-12 px-8 transition-colors ${
          isDrop ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' : 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Drop images here</p>
          <p className="text-xs text-gray-400 mt-0.5">JPEG · PNG · WebP — multiple files supported</p>
        </div>
        <button type="button" onClick={(e) => { e.stopPropagation(); document.getElementById('pdf-input')?.click(); }}
          className="whitespace-nowrap bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition-all">
          Browse Files
        </button>
        <input id="pdf-input" type="file" multiple accept="image/jpeg,image/jpg,image/png,image/webp" className="sr-only"
          onChange={(e) => { loadImages(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
      </div>

      {images.length > 0 && (
        <div className="mt-6 space-y-4">

          {/* Page size selector */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">Page Size</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAGE_SIZES.map((ps) => (
                <button key={ps.id} onClick={() => { setPageSize(ps.id); setGenerated(null); }}
                  className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                    pageSize === ps.id
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                  }`}>
                  <span className="font-bold">{ps.label}</span>
                  <span className="text-[10px] opacity-70 mt-0.5">{ps.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {images.length} image{images.length !== 1 ? 's' : ''}
              </p>
              <button onClick={() => { images.forEach((e) => URL.revokeObjectURL(e.previewUrl)); setImages([]); setGenerated(null); }}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear all</button>
            </div>
            {images.map((entry, i) => (
              <div key={entry.id} className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={entry.previewUrl} alt={entry.file.name} className="w-12 h-12 rounded-lg object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{entry.file.name}</p>
                  <p className="text-xs text-gray-400">{entry.w} × {entry.h} px · {formatBytes(entry.file.size)}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveImage(entry.id, -1)} disabled={i === 0}
                    className="p-1 text-gray-400 hover:text-violet-600 disabled:opacity-20 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button onClick={() => moveImage(entry.id, 1)} disabled={i === images.length - 1}
                    className="p-1 text-gray-400 hover:text-violet-600 disabled:opacity-20 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button onClick={() => removeImage(entry.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

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
            <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800 px-3 py-1.5 rounded-full w-fit">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              From: {sourceLabel}
            </div>
          )}

          {/* Result card — shown after successful generation */}
          {generated && (
            <div className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/30 rounded-2xl p-4 shadow-sm space-y-3">
              {/* File info row */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate" title={generated.filename}>{generated.filename}</p>
                  <p className="text-xs text-gray-400">{images.length} page{images.length !== 1 ? 's' : ''} · {formatBytes(generated.size)}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full shrink-0">
                  Ready
                </span>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {downloaded ? 'Downloaded ✓' : 'Download'}
                </button>
                <button onClick={handleView}
                  className="inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-950/50 text-violet-700 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View in Browser
                </button>
              </div>

              {/* Compress PDF option */}
              <button onClick={handleCompressPdf}
                className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 bg-white dark:bg-gray-900 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-gray-600 dark:text-gray-300 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
                {generated.size > 1048576
                  ? `PDF is ${formatBytes(generated.size)} — Compress to reduce size`
                  : 'Compress PDF'}
              </button>
            </div>
          )}

          {/* Generate button */}
          <button onClick={buildPdf} disabled={isBuilding}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all">
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
                {generated ? 'Regenerate PDF' : `Generate PDF (${images.length} page${images.length !== 1 ? 's' : ''})`}
              </>
            )}
          </button>

        </div>
      )}
    </div>
  );
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
