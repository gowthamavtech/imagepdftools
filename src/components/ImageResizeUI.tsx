'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { NextActions } from './NextActions';
import { DropZone } from './DropZone';
import { useHandoffStore } from '@/store/handoffStore';
import { useHistoryStore } from '@/store/historyStore';

// ── Social media presets ────────────────────────────────────────────────────
const SOCIAL_PLATFORMS = [
  {
    id: 'facebook', label: 'Facebook',
    presets: [
      { label: 'Profile (170 × 170)',   w: 170,  h: 170  },
      { label: 'Cover (820 × 312)',      w: 820,  h: 312  },
      { label: 'Post (1200 × 900)',      w: 1200, h: 900  },
      { label: 'Ad (1280 × 720)',        w: 1280, h: 720  },
    ],
  },
  {
    id: 'instagram', label: 'Instagram',
    presets: [
      { label: 'Profile (110 × 110)',    w: 110,  h: 110  },
      { label: 'Post (1080 × 1080)',     w: 1080, h: 1080 },
      { label: 'Portrait (1080 × 1350)', w: 1080, h: 1350 },
      { label: 'Story (1080 × 1920)',    w: 1080, h: 1920 },
    ],
  },
  {
    id: 'twitter', label: 'Twitter / X',
    presets: [
      { label: 'Profile (400 × 400)',    w: 400,  h: 400  },
      { label: 'Header (1500 × 500)',    w: 1500, h: 500  },
      { label: 'Image (1024 × 512)',     w: 1024, h: 512  },
      { label: 'Card (1200 × 628)',      w: 1200, h: 628  },
      { label: 'Ad (1200 × 675)',        w: 1200, h: 675  },
    ],
  },
  {
    id: 'youtube', label: 'YouTube',
    presets: [
      { label: 'Profile (800 × 800)',    w: 800,  h: 800  },
      { label: 'Channel Art (2560 × 1440)', w: 2560, h: 1440 },
      { label: 'Thumbnail (1280 × 720)', w: 1280, h: 720  },
    ],
  },
  {
    id: 'linkedin', label: 'LinkedIn',
    presets: [
      { label: 'Profile (400 × 400)',    w: 400,  h: 400  },
      { label: 'Cover (1584 × 396)',     w: 1584, h: 396  },
      { label: 'Post (1200 × 627)',      w: 1200, h: 627  },
    ],
  },
  {
    id: 'pinterest', label: 'Pinterest',
    presets: [
      { label: 'Pin (1000 × 1500)',      w: 1000, h: 1500 },
      { label: 'Board Cover (600 × 600)', w: 600, h: 600  },
      { label: 'Square (1080 × 1080)',   w: 1080, h: 1080 },
    ],
  },
  {
    id: 'tiktok', label: 'TikTok',
    presets: [
      { label: 'Profile (200 × 200)',    w: 200,  h: 200  },
      { label: 'Video (1080 × 1920)',    w: 1080, h: 1920 },
    ],
  },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

type Tab = 'pixels' | 'percentage' | 'social';

export function ImageResizeUI() {
  const [file,          setFile]          = useState<File | null>(null);
  const [previewUrl,    setPreviewUrl]    = useState<string | null>(null);
  const [origW,         setOrigW]         = useState(0);
  const [origH,         setOrigH]         = useState(0);
  const [tab,           setTab]           = useState<Tab>('pixels');
  // pixels tab
  const [width,         setWidth]         = useState('');
  const [height,        setHeight]        = useState('');
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [noEnlarge,     setNoEnlarge]     = useState(false);
  // percentage tab
  const [pct,           setPct]           = useState('100');
  // social tab
  const [platformId,    setPlatformId]    = useState(SOCIAL_PLATFORMS[0].id);
  const [presetIdx,     setPresetIdx]     = useState(0);
  const [bgFill,        setBgFill]        = useState(true);
  const [bgMode,        setBgMode]        = useState<'color' | 'transparent'>('color');
  const [bgColor,       setBgColor]       = useState('#000000');
  // fit mode (contain = letterbox, cover = crop to fill)
  const [fitMode,       setFitMode]       = useState<'contain' | 'cover'>('contain');
  // cover focal point (0–100%)
  const [coverX,        setCoverX]        = useState(50);
  const [coverY,        setCoverY]        = useState(50);
  const isDraggingCover = useRef(false);
  const previewRef      = useRef<HTMLDivElement>(null);
  // shared
  const [isResizing,    setIsResizing]    = useState(false);
  const [result,        setResult]        = useState<{ blob: Blob; name: string; url: string; w: number; h: number } | null>(null);
  const [error,         setError]         = useState<string | null>(null);
  const [sourceLabel,   setSourceLabel]   = useState<string | null>(null);
  const [downloaded,    setDownloaded]    = useState(false);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const setHandoff     = useHandoffStore((s) => s.setHandoff);
  const pushHistory    = useHistoryStore((s) => s.push);

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
      setPct('100');
    };
    img.src = url;
  }, [previewUrl]);

  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeHandoff();
    if (f) { setSourceLabel(sl); loadFile(f); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Input handlers ─────────────────────────────────────────────────────────
  const onWidthChange = (val: string) => {
    setWidth(val); setResult(null);
    if (maintainRatio && origW && origH) {
      const n = parseInt(val, 10);
      if (!isNaN(n) && n > 0) setHeight(String(Math.round((n / origW) * origH)));
    }
  };
  const onHeightChange = (val: string) => {
    setHeight(val); setResult(null);
    if (maintainRatio && origW && origH) {
      const n = parseInt(val, 10);
      if (!isNaN(n) && n > 0) setWidth(String(Math.round((n / origH) * origW)));
    }
  };
  const onPctChange = (val: string) => {
    setPct(val); setResult(null);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0 && origW && origH) {
      setWidth(String(Math.round(origW * n / 100)));
      setHeight(String(Math.round(origH * n / 100)));
    }
  };

  const currentPlatform = SOCIAL_PLATFORMS.find((p) => p.id === platformId)!;
  const currentPreset   = currentPlatform.presets[presetIdx] ?? currentPlatform.presets[0];

  const onPlatformChange = (id: string) => {
    setPlatformId(id);
    setPresetIdx(0);
    setResult(null);
  };
  const onPresetChange = (idx: number) => {
    setPresetIdx(idx);
    setResult(null);
  };

  // ── Compute output dimensions ──────────────────────────────────────────────
  function getOutputDims(): { outW: number; outH: number } {
    let outW: number, outH: number;
    if (tab === 'social') {
      outW = currentPreset.w;
      outH = currentPreset.h;
    } else {
      outW = parseInt(width, 10) || origW;
      outH = parseInt(height, 10) || origH;
      if (noEnlarge && tab === 'pixels') {
        outW = Math.min(outW, origW);
        outH = Math.min(outH, origH);
      }
    }
    return { outW, outH };
  }

  // ── Apply resize ────────────────────────────────────────────────────────────
  const applyResize = useCallback(async () => {
    if (!file) return;
    const { outW, outH } = getOutputDims();
    if (!outW || !outH) return;

    setIsResizing(true);
    setError(null);
    pushHistory({ blob: file, filename: file.name, toolHref: '/resize-image', toolLabel: 'Before resize' });
    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width  = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d')!;

      if (fitMode === 'cover') {
        // Scale to cover — crop excess using focal point
        const scale   = Math.max(outW / bitmap.width, outH / bitmap.height);
        const dw      = Math.round(bitmap.width  * scale);
        const dh      = Math.round(bitmap.height * scale);
        const offsetX = Math.round((outW - dw) * (coverX / 100));
        const offsetY = Math.round((outH - dh) * (coverY / 100));
        ctx.drawImage(bitmap, offsetX, offsetY, dw, dh);
      } else if (tab === 'social') {
        // Contain — background fill + centred image
        if (bgFill && bgMode === 'color') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, outW, outH);
        }
        const scale = Math.min(outW / bitmap.width, outH / bitmap.height);
        const dw    = Math.round(bitmap.width  * scale);
        const dh    = Math.round(bitmap.height * scale);
        ctx.drawImage(bitmap, Math.round((outW - dw) / 2), Math.round((outH - dh) / 2), dw, dh);
      } else {
        ctx.drawImage(bitmap, 0, 0, outW, outH);
      }
      bitmap.close();

      // Force PNG for transparent background (only relevant in contain mode with bg fill off)
      const useTransparent = fitMode === 'contain' && tab === 'social' && bgFill && bgMode === 'transparent';
      const mime = useTransparent ? 'image/png'
        : file.type === 'image/png' ? 'image/png'
        : file.type === 'image/webp' ? 'image/webp'
        : 'image/jpeg';
      const ext  = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
      const name = file.name.replace(/\.[^.]+$/, '') + `-${outW}x${outH}.${ext}`;

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error('Export failed')), mime, 0.92),
      );
      const url = URL.createObjectURL(blob);
      setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return { blob, name, url, w: outW, h: outH }; });
    } catch (err) {
      setError((err as Error).message || 'Resize failed — the image may be too large or corrupted.');
    } finally {
      setIsResizing(false);
    }
  }, [file, width, height, noEnlarge, tab, bgFill, bgMode, bgColor, platformId, presetIdx, fitMode, coverX, coverY]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
    setFile(null); setPreviewUrl(null);
    setOrigW(0); setOrigH(0);
    setWidth(''); setHeight(''); setPct('100');
  }, [previewUrl]);

  const { outW: previewW, outH: previewH } = origW ? getOutputDims() : { outW: 0, outH: 0 };
  const isResult  = !!result && !isResizing;
  const canResize = origW > 0 && previewW > 0 && previewH > 0 && !isResizing;

  // ── Drop zone ───────────────────────────────────────────────────────────────
  if (!file) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-16">
        <div className="mt-6">
          <DropZone
            onFiles={(files) => { if (files[0]) loadFile(files[0]); }}
            accept={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
            multiple={false}
            label="Drop an image here"
            hint="JPEG · PNG · WebP"
          />
        </div>
      </div>
    );
  }

  // ── Editor ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">
      <div className="mt-6 space-y-4">

        {/* File info bar */}
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl shadow-sm">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{origW} × {origH} px &middot; {formatBytes(file.size)}</p>
          </div>
          <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0">Change</button>
        </div>

        {/* Handoff source pill */}
        {sourceLabel && (
          <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/30 border border-violet-200 dark:border-violet-800/60 px-3 py-1.5 rounded-full w-fit">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            From: {sourceLabel}
          </div>
        )}

        {/* Live preview */}
        {previewW > 0 && previewH > 0 && (
          <div className="space-y-1.5">
            <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center" style={{ minHeight: 120, maxHeight: '50vh' }}>
              <div
                ref={previewRef}
                className={`relative overflow-hidden select-none ${!isResult && fitMode === 'cover' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={{
                  aspectRatio: `${previewW} / ${previewH}`,
                  maxWidth: '100%',
                  maxHeight: '50vh',
                  // min() ensures the container never exceeds 50vh tall regardless of ratio
                  width: `min(100%, calc(50vh * ${previewW / previewH}))`,
                  background: fitMode === 'contain' && tab === 'social' && bgFill && bgMode === 'color' ? bgColor : undefined,
                }}
                onMouseDown={(e) => {
                  if (isResult || fitMode !== 'cover') return;
                  isDraggingCover.current = true;
                  e.preventDefault();
                }}
                onMouseMove={(e) => {
                  if (!isDraggingCover.current || !previewRef.current) return;
                  const r = previewRef.current.getBoundingClientRect();
                  setCoverX(Math.round(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width)  * 100))));
                  setCoverY(Math.round(Math.max(0, Math.min(100, ((e.clientY - r.top)  / r.height) * 100))));
                  setResult(null);
                }}
                onMouseUp={() => { isDraggingCover.current = false; }}
                onMouseLeave={() => { isDraggingCover.current = false; }}
                onTouchStart={(e) => { if (isResult || fitMode !== 'cover') return; isDraggingCover.current = true; e.preventDefault(); }}
                onTouchMove={(e) => {
                  if (!isDraggingCover.current || !previewRef.current) return;
                  const t = e.touches[0];
                  const r = previewRef.current.getBoundingClientRect();
                  setCoverX(Math.round(Math.max(0, Math.min(100, ((t.clientX - r.left) / r.width)  * 100))));
                  setCoverY(Math.round(Math.max(0, Math.min(100, ((t.clientY - r.top)  / r.height) * 100))));
                  setResult(null);
                }}
                onTouchEnd={() => { isDraggingCover.current = false; }}
              >
                {isResizing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800/60 dark:bg-slate-800/60 rounded-2xl z-10">
                    <svg className="w-6 h-6 animate-spin text-violet-500" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isResult ? result.url : (previewUrl ?? undefined)}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    objectFit: isResult ? 'contain' : fitMode === 'cover' ? 'cover' : (tab === 'social' || maintainRatio) ? 'contain' : 'fill',
                    objectPosition: !isResult && fitMode === 'cover' ? `${coverX}% ${coverY}%` : 'center',
                  }}
                />
                {/* Focal point crosshair */}
                {!isResult && fitMode === 'cover' && (
                  <div
                    className="absolute w-6 h-6 pointer-events-none"
                    style={{ left: `${coverX}%`, top: `${coverY}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-white shadow-md" />
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 opacity-80" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 opacity-80" />
                  </div>
                )}
                {/* Drag hint */}
                {!isResult && fitMode === 'cover' && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white bg-black/50 px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none">
                    Drag to reposition
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              {isResult
                ? <span className="text-violet-400 font-medium">Resized · {result.w} × {result.h} px</span>
                : <span>Preview · {previewW} × {previewH} px</span>
              }
            </p>
          </div>
        )}

        {/* Resize options card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden shadow-sm">

          {/* Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-600">
            {([
              { value: 'pixels',     label: 'By Size',       short: 'Pixels'  },
              { value: 'percentage', label: 'As Percentage', short: '%'       },
              { value: 'social',     label: 'Social Media',  short: 'Social'  },
            ] as const).map((t) => (
              <button
                key={t.value}
                onClick={() => { setTab(t.value); setResult(null); setError(null); }}
                className={`py-3 text-xs font-semibold transition-colors border-b-2 ${
                  tab === t.value
                    ? 'border-violet-600 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-blue-950/20'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.short}</span>
              </button>
            ))}
          </div>

          <div className="p-4 space-y-4">

            {/* ── By Size tab ── */}
            {tab === 'pixels' && (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Resize image to an <span className="font-semibold text-slate-700 dark:text-slate-200">exact size</span> of
                </p>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 -mt-1">
                  💡 Tip: Use the Percentage tab to halve or double your image size quickly
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Width (px)</label>
                    <input type="number" min={1} max={16000} value={width}
                      onChange={(e) => onWidthChange(e.target.value)}
                      className="w-full text-sm font-semibold text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 outline-none transition-colors"
                    />
                  </div>
                  <div className="pt-5 text-slate-400 dark:text-slate-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Height (px)</label>
                    <input type="number" min={1} max={16000} value={height}
                      onChange={(e) => onHeightChange(e.target.value)}
                      className="w-full text-sm font-semibold text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Maintain aspect ratio</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={noEnlarge} onChange={(e) => setNoEnlarge(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Do not enlarge if smaller</span>
                  </label>
                </div>
              </>
            )}

            {/* ── As Percentage tab ── */}
            {tab === 'percentage' && (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Resize image to <span className="font-semibold text-slate-700 dark:text-slate-200">{pct || '—'}%</span> of original size
                </p>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Percentage (%)</label>
                  <input type="number" min={1} max={1000} value={pct}
                    onChange={(e) => onPctChange(e.target.value)}
                    className="w-full text-sm font-semibold text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 outline-none transition-colors"
                  />
                  <p className="text-xs text-slate-500 mt-1.5 px-1">
                    → {Math.round(origW * (parseFloat(pct) || 0) / 100)} × {Math.round(origH * (parseFloat(pct) || 0) / 100)} px
                  </p>
                </div>
              </>
            )}

            {/* ── Social Media tab ── */}
            {tab === 'social' && (
              <>
                {/* Platform selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Choose the Social Media Platform
                  </label>
                  <div className="relative">
                    <select
                      value={platformId}
                      onChange={(e) => onPlatformChange(e.target.value)}
                      className="w-full appearance-none text-sm font-medium text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 pr-8 outline-none transition-colors cursor-pointer"
                    >
                      {SOCIAL_PLATFORMS.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Preset type selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preset Type
                  </label>
                  <div className="relative">
                    <select
                      value={presetIdx}
                      onChange={(e) => onPresetChange(Number(e.target.value))}
                      className="w-full appearance-none text-sm font-medium text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-violet-400 dark:focus:border-violet-500 rounded-xl px-3 py-2.5 pr-8 outline-none transition-colors cursor-pointer"
                    >
                      {currentPlatform.presets.map((p, i) => (
                        <option key={i} value={i}>{p.label}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Dimension display */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Width</p>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5">
                      {currentPreset.w}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Height</p>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5">
                      {currentPreset.h}
                    </div>
                  </div>
                </div>

                {/* Background fill — only relevant when fitting (contain), not when cropping (cover) */}
                {fitMode === 'contain' && <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
                  <label className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer bg-slate-50 dark:bg-slate-700/50">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Background Fill</span>
                    <input type="checkbox" checked={bgFill} onChange={(e) => setBgFill(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer" />
                  </label>
                  {bgFill && (
                    <div className="px-3 py-3 space-y-2 border-t border-slate-200 dark:border-slate-600">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={bgMode === 'color'} onChange={() => setBgMode('color')}
                          className="accent-blue-500 cursor-pointer" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">Pick a color</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono">{bgColor}</span>
                          <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setBgMode('color'); }}
                            className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={bgMode === 'transparent'} onChange={() => setBgMode('transparent')}
                          className="accent-blue-500 cursor-pointer" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Transparent</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-auto">PNG output</span>
                      </label>
                    </div>
                  )}
                </div>}
              </>
            )}

          {/* Fit mode — shown when output aspect ratio can differ from input */}
          {(tab === 'social' || tab === 'pixels') && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">When aspect ratios differ</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setFitMode('contain'); setCoverX(50); setCoverY(50); setResult(null); }}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    fitMode === 'contain'
                      ? 'border-violet-500 bg-violet-50 dark:bg-blue-950/30 text-violet-600 dark:text-violet-300'
                      : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-gray-300'
                  }`}
                >
                  {/* Contain icon: image smaller inside frame with bars */}
                  <svg className="w-8 h-6" viewBox="0 0 32 22" fill="none">
                    <rect x="0.5" y="0.5" width="31" height="21" rx="2" stroke="currentColor" strokeOpacity=".4"/>
                    <rect x="7" y="3" width="18" height="16" rx="1" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeOpacity=".6"/>
                  </svg>
                  <span>Fit (add fill)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setFitMode('cover'); setResult(null); }}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    fitMode === 'cover'
                      ? 'border-violet-500 bg-violet-50 dark:bg-blue-950/30 text-violet-600 dark:text-violet-300'
                      : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-gray-300'
                  }`}
                >
                  {/* Cover icon: image fills frame, edges clipped */}
                  <svg className="w-8 h-6" viewBox="0 0 32 22" fill="none">
                    <rect x="0.5" y="0.5" width="31" height="21" rx="2" stroke="currentColor" strokeOpacity=".4"/>
                    <rect x="-4" y="3" width="40" height="16" rx="1" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeOpacity=".6" strokeDasharray="2 2"/>
                    <rect x="0" y="0" width="32" height="22" fill="transparent" stroke="none"/>
                  </svg>
                  <span>Crop to fill</span>
                </button>
              </div>
              {fitMode === 'cover' && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Image fills the canvas — excess is cropped. Drag the preview to set the focal point
                  {coverX !== 50 || coverY !== 50 ? ` (currently ${coverX}%, ${coverY}%)` : ' (currently centred)'}.
                </p>
              )}
            </div>
          )}

          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Resize button */}
        <button
          onClick={applyResize}
          disabled={!canResize}
          className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
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
              {tab === 'social' ? `Export for ${currentPlatform.label}` : 'Resize Image'}
            </>
          )}
        </button>

        {/* Result card */}
        {result && !isResizing && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url} alt="Resized"
                className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900 cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={() => setHandoff(new File([result.blob], result.name, { type: result.blob.type }))}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{result.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs">
                  <span className="text-violet-400 font-medium">{result.w} × {result.h} px</span>
                  <span className="text-slate-500">{formatBytes(result.blob.size)}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Done
                  </span>
                </div>
              </div>
              <button
                onClick={() => { const a = document.createElement('a'); a.href = result.url; a.download = result.name; a.click(); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); }}
                className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloaded ? 'Downloaded ✓' : 'Download'}
              </button>
            </div>
            <NextActions blob={result.blob} filename={result.name} currentTool="resize" />
          </div>
        )}

      </div>
    </div>
  );
}
