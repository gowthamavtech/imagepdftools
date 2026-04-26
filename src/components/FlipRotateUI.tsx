'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { NextActions } from './NextActions';
import { useHandoffStore } from '@/store/handoffStore';
import { useHistoryStore } from '@/store/historyStore';

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

export function FlipRotateUI() {
  const [file,       setFile]       = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origW,      setOrigW]      = useState(0);
  const [origH,      setOrigH]      = useState(0);
  const [flipH,      setFlipH]      = useState(false);
  const [flipV,      setFlipV]      = useState(false);
  const [rotation,   setRotation]   = useState(0);   // 0 | 90 | 180 | 270
  const [isDrop,     setIsDrop]     = useState(false);
  const [isWorking,  setIsWorking]  = useState(false);
  const [result,     setResult]     = useState<{ blob: Blob; name: string; url: string; w: number; h: number } | null>(null);
  const [error,       setError]       = useState<string | null>(null);
  const [sourceLabel, setSourceLabel] = useState<string | null>(null);
  const [downloaded,  setDownloaded]  = useState(false);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const setHandoff     = useHandoffStore((s) => s.setHandoff);
  const pushHistory    = useHistoryStore((s) => s.push);

  const loadFile = useCallback((f: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult(null); setFlipH(false); setFlipV(false); setRotation(0); setError(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    const img = new Image();
    img.onload = () => { setOrigW(img.naturalWidth); setOrigH(img.naturalHeight); };
    img.src = url;
  }, [previewUrl]);

  useEffect(() => { const { file: f, sourceLabel: sl } = consumeHandoff(); if (f) { setSourceLabel(sl); loadFile(f); } }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult((p) => { if (p) URL.revokeObjectURL(p.url); return null; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-apply whenever transform changes
  const applyTransform = useCallback(async (f: File, fH: boolean, fV: boolean, rot: number) => {
    setIsWorking(true); setError(null);
    try {
      const bmp   = await createImageBitmap(f);
      const outW  = rot % 180 === 0 ? bmp.width  : bmp.height;
      const outH  = rot % 180 === 0 ? bmp.height : bmp.width;
      const canvas = document.createElement('canvas');
      canvas.width  = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d')!;
      ctx.translate(outW / 2, outH / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.scale(fH ? -1 : 1, fV ? -1 : 1);
      ctx.drawImage(bmp, -bmp.width / 2, -bmp.height / 2);
      bmp.close();

      const mime = f.type === 'image/png' ? 'image/png' : f.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const ext  = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
      const suffix = [fH && 'fliph', fV && 'flipv', rot && `${rot}deg`].filter(Boolean).join('-') || 'original';
      const name = f.name.replace(/\.[^.]+$/, '') + `-${suffix}.${ext}`;

      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob((b) => b ? res(b) : rej(new Error('Export failed')), mime, 0.93),
      );
      const url = URL.createObjectURL(blob);
      setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return { blob, name, url, w: outW, h: outH }; });
    } catch (err) {
      setError((err as Error).message || 'Transform failed — image may be too large.');
    } finally {
      setIsWorking(false);
    }
  }, []);

  useEffect(() => {
    if (!file) return;
    pushHistory({ blob: file, filename: file.name, toolHref: '/flip-image', toolLabel: 'Before flip/rotate' });
    applyTransform(file, flipH, flipV, rotation);
  }, [file, flipH, flipV, rotation]); // eslint-disable-line react-hooks/exhaustive-deps

  const rotateLeft  = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);
  const rotate180   = () => setRotation((r) => (r + 180) % 360);
  const reset       = () => { setFlipH(false); setFlipV(false); setRotation(0); };

  // ── Preview dimensions ─────────────────────────────────────────────────────
  const isRotated90 = rotation % 180 !== 0;
  const previewW    = isRotated90 ? origH : origW;
  const previewH    = isRotated90 ? origW : origH;

  // ── Drop zone ───────────────────────────────────────────────────────────────
  if (!file) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-16">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrop(true); }}
          onDragLeave={() => setIsDrop(false)}
          onDrop={(e) => { e.preventDefault(); setIsDrop(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) loadFile(f); }}
          onClick={() => document.getElementById('fliprotate-input')?.click()}
          className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer py-20 px-8 transition-colors ${
            isDrop ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' : 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Drop an image here</p>
            <p className="text-xs text-gray-400 mt-1">JPEG · PNG · WebP</p>
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); document.getElementById('fliprotate-input')?.click(); }}
            className="whitespace-nowrap bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-all">
            Browse Files
          </button>
          <input id="fliprotate-input" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      </div>
    );
  }

  // ── Editor ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">
      <div className="mt-6 space-y-4">

        {/* File info bar */}
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/30 rounded-2xl shadow-sm">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{file.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{origW} × {origH} px · {formatBytes(file.size)}</p>
          </div>
          <button onClick={() => loadFile(file)} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0 mr-2">Reset</button>
          <button onClick={() => { if (previewUrl) URL.revokeObjectURL(previewUrl); setFile(null); setPreviewUrl(null); setResult(null); }}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0">Change</button>
        </div>

        {/* Handoff source pill */}
        {sourceLabel && (
          <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800 px-3 py-1.5 rounded-full w-fit">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            From: {sourceLabel}
          </div>
        )}

        {/* Live preview */}
        {previewW > 0 && previewH > 0 && (
          <div className="space-y-1.5">
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ minHeight: 120, maxHeight: '50vh' }}>
              <div className="relative overflow-hidden" style={{
                aspectRatio: `${previewW} / ${previewH}`,
                maxWidth: '100%', maxHeight: '50vh',
                width: `min(100%, calc(50vh * ${previewW / previewH}))`,
              }}>
                {isWorking && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 z-10">
                    <svg className="w-6 h-6 animate-spin text-violet-500" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result ? result.url : (previewUrl ?? undefined)}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              {result
                ? <span className="text-violet-600 dark:text-violet-400 font-medium">{result.w} × {result.h} px</span>
                : <span>{origW} × {origH} px</span>
              }
              {rotation !== 0 && <span className="ml-2 text-violet-400">· {rotation}° rotation</span>}
              {(flipH || flipV) && <span className="ml-2 text-violet-400">· flipped {[flipH && 'H', flipV && 'V'].filter(Boolean).join('+')}</span>}
            </p>
          </div>
        )}

        {/* Controls card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">

          {/* Flip section */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Flip</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setFlipH((v) => !v)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium text-sm transition-all ${
                  flipH ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-700'
                }`}>
                {/* Horizontal flip icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
                Flip Horizontal
              </button>
              <button onClick={() => setFlipV((v) => !v)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium text-sm transition-all ${
                  flipV ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-700'
                }`}>
                {/* Vertical flip icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5" />
                </svg>
                Flip Vertical
              </button>
            </div>
          </div>

          {/* Rotate section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Rotate</p>
              {rotation !== 0 && (
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-2 py-0.5 rounded-full">
                  {rotation}°
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={rotateLeft}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-medium transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                90° Left
              </button>
              <button onClick={rotateRight}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-medium transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
                90° Right
              </button>
              <button onClick={rotate180}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-medium transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                180°
              </button>
              <button onClick={reset}
                disabled={!flipH && !flipV && rotation === 0}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 dark:text-gray-500 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-medium transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Pro tip */}
        <p className="text-[11px] text-center text-gray-400 dark:text-gray-500">
          💡 Tip: Changes apply instantly — no need to click Apply
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result card */}
        {result && !isWorking && (
          <div className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/30 rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt="Result"
                className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900 cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={() => setHandoff(new File([result.blob], result.name, { type: result.blob.type }))}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{result.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs">
                  <span className="text-violet-600 dark:text-violet-400 font-medium">{result.w} × {result.h} px</span>
                  <span className="text-gray-400">{formatBytes(result.blob.size)}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => { const a = document.createElement('a'); a.href = result.url; a.download = result.name; a.click(); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); }}
                className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloaded ? 'Downloaded ✓' : 'Download'}
              </button>
            </div>
            <NextActions blob={result.blob} filename={result.name} currentTool="flip" />
          </div>
        )}

      </div>
    </div>
  );
}
