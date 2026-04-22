'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { NextActions } from './NextActions';
import { useHandoffStore } from '@/store/handoffStore';

const PRESETS = [
  { label: 'HD',   w: 1280,  h: 720  },
  { label: '1080p',w: 1920,  h: 1080 },
  { label: '4K',   w: 3840,  h: 2160 },
  { label: '1:1',  w: 1080,  h: 1080 },
  { label: '4:3',  w: 1200,  h: 900  },
  { label: '9:16', w: 1080,  h: 1920 },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

export function ImageResizeUI() {
  const [file,        setFile]        = useState<File | null>(null);
  const [previewUrl,  setPreviewUrl]  = useState<string | null>(null);
  const [origW,       setOrigW]       = useState(0);
  const [origH,       setOrigH]       = useState(0);
  const [width,       setWidth]       = useState('');
  const [height,      setHeight]      = useState('');
  const [locked,      setLocked]      = useState(true);
  const [isDrop,      setIsDrop]      = useState(false);
  const [isResizing,  setIsResizing]  = useState(false);
  const [mode,        setMode]        = useState<'fit' | 'stretch'>('fit');
  const [result,      setResult]      = useState<{ blob: Blob; name: string; url: string; w: number; h: number } | null>(null);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);

  const loadFile = useCallback((f: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.naturalWidth);
      setOrigH(img.naturalHeight);
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
    };
    img.src = url;
  }, [previewUrl]);

  useEffect(() => {
    const f = consumeHandoff();
    if (f) loadFile(f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onWidthChange = (val: string) => {
    setWidth(val);
    if (locked && origW && origH) {
      const n = parseInt(val, 10);
      if (!isNaN(n) && n > 0) setHeight(String(Math.round((n / origW) * origH)));
    }
  };

  const onHeightChange = (val: string) => {
    setHeight(val);
    if (locked && origW && origH) {
      const n = parseInt(val, 10);
      if (!isNaN(n) && n > 0) setWidth(String(Math.round((n / origH) * origW)));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(String(w));
    setHeight(String(h));
    setLocked(false);
  };

  const applyResize = useCallback(async () => {
    if (!file) return;
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    if (!w || !h || w < 1 || h < 1) return;

    setIsResizing(true);
    try {
      const bitmap = await createImageBitmap(file);
      const mime = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const ext  = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';

      let outW = w, outH = h;
      if (mode === 'fit') {
        const scale = Math.min(w / bitmap.width, h / bitmap.height);
        outW = Math.round(bitmap.width  * scale);
        outH = Math.round(bitmap.height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width  = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0, outW, outH);
      bitmap.close();

      const name = file.name.replace(/\.[^.]+$/, '') + `-${outW}x${outH}.${ext}`;

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error('Export failed')), mime, 0.92),
      );
      const url = URL.createObjectURL(blob);
      setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return { blob, name, url, w: outW, h: outH }; });
    } finally {
      setIsResizing(false);
    }
  }, [file, width, height]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
    setFile(null);
    setPreviewUrl(null);
    setOrigW(0);
    setOrigH(0);
    setWidth('');
    setHeight('');
  }, [previewUrl]);

  const w = parseInt(width, 10) || 0;
  const h = parseInt(height, 10) || 0;
  const canResize = w > 0 && h > 0 && !isResizing;

  // ── Drop zone ────────────────────────────────────────────────────────────────
  if (!file) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-16">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrop(true); }}
          onDragLeave={() => setIsDrop(false)}
          onDrop={(e) => {
            e.preventDefault(); setIsDrop(false);
            const f = e.dataTransfer.files[0];
            if (f && f.type.startsWith('image/')) loadFile(f);
          }}
          onClick={() => document.getElementById('resize-input')?.click()}
          className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer py-20 px-8 transition-colors ${
            isDrop
              ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30'
              : 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Drop an image here</p>
            <p className="text-xs text-gray-400 mt-1">JPEG · PNG · WebP</p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); document.getElementById('resize-input')?.click(); }}
            className="whitespace-nowrap bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
          >
            Browse Files
          </button>
          <input id="resize-input" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      </div>
    );
  }

  // ── Editor ───────────────────────────────────────────────────────────────────
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
            <p className="text-xs text-gray-400 mt-0.5">
              {origW} × {origH} px · {formatBytes(file.size)}
            </p>
          </div>
          <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0">
            Change
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ maxHeight: '50vh' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result?.url ?? previewUrl ?? undefined}
            alt="Preview"
            className="block max-w-full max-h-[50vh] object-contain"
          />
        </div>
        {result && (
          <p className="text-center text-xs text-violet-600 dark:text-violet-400 font-medium -mt-2">
            Showing resized output · {result.w} × {result.h} px
          </p>
        )}

        {/* Presets */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 px-1">Presets</p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.w, p.h)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {p.label}
                <span className="ml-1 font-normal text-gray-400 dark:text-gray-500 text-[10px]">{p.w}×{p.h}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Width / Height inputs */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 px-1">Dimensions</p>
          <div className="flex items-center gap-2">
            {/* Width */}
            <div className="flex-1">
              <label className="block text-[10px] text-gray-400 dark:text-gray-500 mb-1 px-1">Width (px)</label>
              <input
                type="number" min={1} max={16000} value={width}
                onChange={(e) => onWidthChange(e.target.value)}
                className="w-full text-sm font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Lock toggle */}
            <div className="flex flex-col items-center gap-1 pt-5">
              <button
                onClick={() => setLocked((v) => !v)}
                title={locked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  locked
                    ? 'bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-500'
                }`}
              >
                {locked ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <span className="text-[9px] text-gray-400 dark:text-gray-500">{locked ? 'Locked' : 'Free'}</span>
            </div>

            {/* Height */}
            <div className="flex-1">
              <label className="block text-[10px] text-gray-400 dark:text-gray-500 mb-1 px-1">Height (px)</label>
              <input
                type="number" min={1} max={16000} value={height}
                onChange={(e) => onHeightChange(e.target.value)}
                className="w-full text-sm font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Scale indicator */}
          {w > 0 && h > 0 && origW > 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 px-1">
              {w === origW && h === origH
                ? 'Same as original'
                : `${Math.round((w / origW) * 100)}% of original`}
              {' · '}{w} × {h} px
            </p>
          )}
        </div>

        {/* Fit / Stretch mode */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 px-1">Resize Mode</p>
          <div className="flex gap-2">
            {([
              { value: 'fit',     label: 'Fit',     desc: 'Scale proportionally, no distortion' },
              { value: 'stretch', label: 'Stretch', desc: 'Exact dimensions, may distort'        },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMode(opt.value)}
                className={`flex-1 text-left px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                  mode === opt.value
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-500'
                }`}
              >
                {opt.label}
                <span className={`block mt-0.5 font-normal text-[10px] leading-tight ${mode === opt.value ? 'text-violet-200' : 'text-gray-400 dark:text-gray-500'}`}>
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Resize button */}
        <button
          onClick={applyResize}
          disabled={!canResize}
          className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
        >
          {isResizing ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Resizing…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Resize Image
            </>
          )}
        </button>

        {/* Result card */}
        {result && !isResizing && (
          <div className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/30 rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt="Resized" className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{result.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs">
                  <span className="text-violet-600 dark:text-violet-400 font-medium">{result.w} × {result.h} px</span>
                  <span className="text-gray-400">{formatBytes(result.blob.size)}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Resized
                  </span>
                </div>
              </div>
              <a
                href={result.url}
                download={result.name}
                className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save
              </a>
            </div>
            <NextActions blob={result.blob} filename={result.name} currentTool="resize" />
          </div>
        )}

      </div>
    </div>
  );
}
