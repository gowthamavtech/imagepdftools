'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { NextActions } from './NextActions';
import { useHandoffStore } from '@/store/handoffStore';
import { useHistoryStore } from '@/store/historyStore';

type Rect   = { x: number; y: number; w: number; h: number };
type Handle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | 'body' | 'new';

const HANDLE_PX       = 9;   // visual half-size
const HANDLE_HIT_PX   = 22; // touch hit area (finger-sized)
const MIN_CROP        = 20;

const RATIOS: { label: string; value: number | null }[] = [
  { label: 'Free',  value: null      },
  { label: '1:1',   value: 1         },
  { label: '4:3',   value: 4 / 3     },
  { label: '3:4',   value: 3 / 4     },
  { label: '3:2',   value: 3 / 2     },
  { label: '2:3',   value: 2 / 3     },
  { label: '16:9',  value: 16 / 9    },
  { label: '9:16',  value: 9 / 16    },
  { label: '4:5',   value: 4 / 5     },
  { label: '5:4',   value: 5 / 4     },
  { label: '7:5',   value: 7 / 5     },
  { label: '21:9',  value: 21 / 9    },
];

const ACCEPTED = 'image/jpeg,image/jpg,image/png,image/webp,image/svg+xml';

function clamp(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)); }

// Returns the actual rendered image bounds within the img element box (accounts for object-contain letterboxing)
function computeImageBounds(img: HTMLImageElement) {
  const scale = Math.min(img.offsetWidth / img.naturalWidth, img.offsetHeight / img.naturalHeight);
  const w = img.naturalWidth  * scale;
  const h = img.naturalHeight * scale;
  const x = (img.offsetWidth  - w) / 2;
  const y = (img.offsetHeight - h) / 2;
  return { x, y, w, h };
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

const EDGE_HIT = 6; // px from edge line to register as edge handle

function getHandle(pos: { x: number; y: number }, c: Rect, hitPx = HANDLE_PX + 4): Handle | null {
  // Corners first (higher priority)
  const nearCorner = (px: number, py: number) =>
    Math.abs(pos.x - px) <= hitPx && Math.abs(pos.y - py) <= hitPx;
  if (nearCorner(c.x,       c.y      )) return 'nw';
  if (nearCorner(c.x + c.w, c.y      )) return 'ne';
  if (nearCorner(c.x,       c.y + c.h)) return 'sw';
  if (nearCorner(c.x + c.w, c.y + c.h)) return 'se';

  const inX = pos.x >= c.x && pos.x <= c.x + c.w;
  const inY = pos.y >= c.y && pos.y <= c.y + c.h;
  const edgeHit = Math.max(EDGE_HIT, hitPx / 2);

  // Edges
  if (inX && Math.abs(pos.y - c.y)       <= edgeHit) return 'n';
  if (inX && Math.abs(pos.y - (c.y+c.h)) <= edgeHit) return 's';
  if (inY && Math.abs(pos.x - c.x)       <= edgeHit) return 'w';
  if (inY && Math.abs(pos.x - (c.x+c.w)) <= edgeHit) return 'e';

  if (inX && inY) return 'body';
  return null;
}

// Rotate image blob and return a new blob URL + blob
async function rotateImage(
  source: Blob,
  deg: number,
): Promise<{ url: string; blob: Blob }> {
  const bitmap = await createImageBitmap(source);
  const rad    = (deg * Math.PI) / 180;
  const sin    = Math.abs(Math.sin(rad));
  const cos    = Math.abs(Math.cos(rad));
  const W      = Math.round(bitmap.width  * cos + bitmap.height * sin);
  const H      = Math.round(bitmap.width  * sin + bitmap.height * cos);

  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx     = canvas.getContext('2d')!;
  ctx.translate(W / 2, H / 2);
  ctx.rotate(rad);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  bitmap.close();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      resolve({ url: URL.createObjectURL(blob), blob });
    }, 'image/png');
  });
}

export function ImageCropUI() {
  const [file,         setFile]         = useState<File | null>(null);
  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null);
  const [displayUrl,   setDisplayUrl]   = useState<string | null>(null); // possibly rotated
  const [displayBlob,  setDisplayBlob]  = useState<Blob | null>(null);   // for export
  const [rotation,     setRotation]     = useState(0);
  const [crop,         setCrop]         = useState<Rect | null>(null);
  const [ratio,        setRatio]        = useState<number | null>(null);
  const [isDragging,   setIsDragging]   = useState(false);
  const [isDrop,       setIsDrop]       = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [croppedResult, setCroppedResult] = useState<{ blob: Blob; name: string; url: string } | null>(null);
  const [cropError,    setCropError]    = useState<string | null>(null);
  const [sourceLabel,  setSourceLabel]  = useState<string | null>(null);
  const [downloaded,   setDownloaded]   = useState(false);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const setHandoff     = useHandoffStore((s) => s.setHandoff);
  const pushHistory    = useHistoryStore((s) => s.push);

  const imgRef       = useRef<HTMLImageElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const activeHandle = useRef<Handle | null>(null);
  const dragOrigin   = useRef({ mx: 0, my: 0, crop: { x: 0, y: 0, w: 0, h: 0 } });
  const prevRotUrl   = useRef<string | null>(null);

  // ── File load ──────────────────────────────────────────────────────────────
  const loadFile = useCallback((f: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setCrop(null);
    setRotation(0);
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    setDisplayUrl(url);
    setDisplayBlob(f);
  }, [previewUrl]);

  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeHandoff();
    if (f) { setSourceLabel(sl); loadFile(f); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Apply rotation → new display image ────────────────────────────────────
  useEffect(() => {
    if (!file || !previewUrl) return;
    // Rotation changes image geometry entirely — clear the crop so stale
    // screen-space coordinates from the old orientation don't survive.
    setCrop(null);
    if (rotation === 0) {
      if (prevRotUrl.current) { URL.revokeObjectURL(prevRotUrl.current); prevRotUrl.current = null; }
      setDisplayUrl(previewUrl);
      setDisplayBlob(file);
      return;
    }
    let cancelled = false;
    rotateImage(file, rotation).then(({ url, blob }) => {
      if (cancelled) { URL.revokeObjectURL(url); return; }
      if (prevRotUrl.current) URL.revokeObjectURL(prevRotUrl.current);
      prevRotUrl.current = url;
      setDisplayUrl(url);
      setDisplayBlob(blob);
    });
    return () => { cancelled = true; };
  }, [rotation, file, previewUrl]);

  // cleanup on unmount
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (prevRotUrl.current) URL.revokeObjectURL(prevRotUrl.current);
    setCroppedResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Coordinate helper ──────────────────────────────────────────────────────
  const relPos = useCallback((clientX: number, clientY: number) => {
    const r = wrapRef.current!.getBoundingClientRect();
    const raw = { x: clientX - r.left, y: clientY - r.top };
    if (imgRef.current && imgRef.current.naturalWidth) {
      const b = computeImageBounds(imgRef.current);
      return { x: clamp(raw.x, b.x, b.x + b.w), y: clamp(raw.y, b.y, b.y + b.h) };
    }
    return { x: clamp(raw.x, 0, r.width), y: clamp(raw.y, 0, r.height) };
  }, []);

  // ── Shared drag-start logic ────────────────────────────────────────────────
  const startDrag = useCallback((clientX: number, clientY: number, isTouch = false) => {
    if (!file) return;
    const pos    = relPos(clientX, clientY);
    const hitPx  = isTouch ? HANDLE_HIT_PX : HANDLE_PX + 4;
    const handle = crop ? getHandle(pos, crop, hitPx) : null;
    activeHandle.current = handle ?? 'new';
    dragOrigin.current = {
      mx:   clientX,
      my:   clientY,
      crop: handle ? (crop ?? { x: pos.x, y: pos.y, w: 0, h: 0 }) : { x: pos.x, y: pos.y, w: 0, h: 0 },
    };
    if (!handle) setCrop({ x: pos.x, y: pos.y, w: 0, h: 0 });
    setIsDragging(true);
  }, [file, crop, relPos]);

  // ── Mouse down ─────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, false);
  }, [startDrag]);

  // ── Touch start ────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault(); // prevent scroll while cropping
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY, true);
  }, [startDrag]);

  // ── Mouse move (global) ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isDragging) return;
    const wrap = wrapRef.current!;

    const onMove = (e: MouseEvent) => {
      const pos              = relPos(e.clientX, e.clientY);
      const { mx, my, crop: c0 } = dragOrigin.current;
      const dx               = e.clientX - mx;
      const dy               = e.clientY - my;

      // Use actual rendered image bounds (not full element/wrapper) so crop can't enter letterbox areas
      const b  = imgRef.current && imgRef.current.naturalWidth ? computeImageBounds(imgRef.current) : { x: 0, y: 0, w: wrap.offsetWidth, h: wrap.offsetHeight };
      const x0 = b.x, y0 = b.y, maxX = b.x + b.w, maxY = b.y + b.h;

      setCrop(prev => {
        if (!prev) return prev;
        const handle = activeHandle.current!;

        if (handle === 'new') {
          const adx = Math.abs(pos.x - c0.x);
          const ady = Math.abs(pos.y - c0.y);
          let w = ratio ? Math.max(adx, ady * ratio) : adx;
          let h = ratio ? w / ratio : ady;
          // clamp ratio-locked size to image bounds
          if (ratio && w > b.w) { w = b.w; h = w / ratio; }
          if (ratio && h > b.h) { h = b.h; w = h * ratio; }
          const rawX = pos.x >= c0.x ? c0.x : c0.x - w;
          const rawY = ratio
            ? (pos.y >= c0.y ? c0.y : c0.y - h)
            : (pos.y >= c0.y ? c0.y : c0.y - ady);
          const x = clamp(rawX, x0, maxX);
          const y = clamp(rawY, y0, maxY);
          return { x, y, w: clamp(w, 0, maxX - x), h: clamp(h, 0, maxY - y) };
        }

        if (handle === 'body') {
          return {
            ...prev,
            x: clamp(c0.x + dx, x0, maxX - c0.w),
            y: clamp(c0.y + dy, y0, maxY - c0.h),
          };
        }

        let { x, y, w, h } = c0;
        if (handle === 'se') {
          w = clamp(c0.w + dx, MIN_CROP, maxX - c0.x);
          h = ratio ? w / ratio : clamp(c0.h + dy, MIN_CROP, maxY - c0.y);
          if (ratio && c0.y + h > maxY) { h = maxY - c0.y; w = h * ratio; }
        } else if (handle === 'sw') {
          w = clamp(c0.w - dx, MIN_CROP, c0.x + c0.w - x0);
          h = ratio ? w / ratio : clamp(c0.h + dy, MIN_CROP, maxY - c0.y);
          if (ratio && c0.y + h > maxY) { h = maxY - c0.y; w = h * ratio; }
          x = c0.x + c0.w - w;
        } else if (handle === 'ne') {
          w = clamp(c0.w + dx, MIN_CROP, maxX - c0.x);
          h = ratio ? w / ratio : clamp(c0.h - dy, MIN_CROP, c0.y + c0.h - y0);
          y = c0.y + c0.h - h;
          if (ratio && y < y0) { y = y0; h = c0.y + c0.h - y0; w = h * ratio; }
        } else if (handle === 'nw') {
          w = clamp(c0.w - dx, MIN_CROP, c0.x + c0.w - x0);
          h = ratio ? w / ratio : clamp(c0.h - dy, MIN_CROP, c0.y + c0.h - y0);
          x = c0.x + c0.w - w;
          y = c0.y + c0.h - h;
          if (ratio && y < y0) { y = y0; h = c0.y + c0.h - y0; w = h * ratio; x = c0.x + c0.w - w; }
        } else if (handle === 'n') {
          h = clamp(c0.h - dy, MIN_CROP, c0.y + c0.h - y0);
          w = ratio ? h * ratio : c0.w;
          if (ratio && w > b.w) { w = b.w; h = w / ratio; }
          x = ratio ? clamp(c0.x + c0.w / 2 - w / 2, x0, maxX - w) : c0.x;
          y = c0.y + c0.h - h;
        } else if (handle === 's') {
          h = clamp(c0.h + dy, MIN_CROP, maxY - c0.y);
          w = ratio ? h * ratio : c0.w;
          if (ratio && w > b.w) { w = b.w; h = w / ratio; }
          x = ratio ? clamp(c0.x + c0.w / 2 - w / 2, x0, maxX - w) : c0.x;
        } else if (handle === 'w') {
          w = clamp(c0.w - dx, MIN_CROP, c0.x + c0.w - x0);
          h = ratio ? w / ratio : c0.h;
          if (ratio && h > b.h) { h = b.h; w = h * ratio; }
          x = c0.x + c0.w - w;
          y = ratio ? clamp(c0.y + c0.h / 2 - h / 2, y0, maxY - h) : c0.y;
        } else if (handle === 'e') {
          w = clamp(c0.w + dx, MIN_CROP, maxX - c0.x);
          h = ratio ? w / ratio : c0.h;
          if (ratio && h > b.h) { h = b.h; w = h * ratio; }
          y = ratio ? clamp(c0.y + c0.h / 2 - h / 2, y0, maxY - h) : c0.y;
        }
        return { x: clamp(x, x0, maxX), y: clamp(y, y0, maxY), w, h };
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
      onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, buttons: 1 } as MouseEvent);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, [isDragging, ratio, relPos]);

  // ── Apply crop ─────────────────────────────────────────────────────────────
  const applyCrop = useCallback(async () => {
    if (!file || !crop || !imgRef.current || !displayBlob) return;
    setIsProcessing(true);
    setCroppedResult(null);
    setCropError(null);
    pushHistory({ blob: file, filename: file.name, toolHref: '/crop-image', toolLabel: 'Before crop' });
    try {
      const img    = imgRef.current;
      const b      = computeImageBounds(img);
      const scaleX = img.naturalWidth  / b.w;
      const scaleY = img.naturalHeight / b.h;
      const srcX   = Math.round((crop.x - b.x) * scaleX);
      const srcY   = Math.round((crop.y - b.y) * scaleY);
      const srcW   = Math.round(crop.w * scaleX);
      const srcH   = Math.round(crop.h * scaleY);

      const canvas      = document.createElement('canvas');
      canvas.width      = srcW;
      canvas.height     = srcH;
      const ctx         = canvas.getContext('2d')!;
      const bitmap      = await createImageBitmap(displayBlob);
      ctx.drawImage(bitmap, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
      bitmap.close();

      const mimeOut = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const ext     = mimeOut === 'image/png' ? 'png' : 'jpg';
      const name    = file.name.replace(/\.[^.]+$/, '') + `-cropped.${ext}`;

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error('Canvas export failed')), mimeOut, 0.95),
      );
      const url = URL.createObjectURL(blob);
      setCroppedResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, name, url };
      });
    } catch (err) {
      setCropError((err as Error).message || 'Crop failed — the image may be too large or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  }, [file, crop, displayBlob]);

  // ── Cursor on hover ────────────────────────────────────────────────────────
  const updateCursor = useCallback((e: React.MouseEvent) => {
    if (!crop || isDragging || !wrapRef.current) return;
    const pos = relPos(e.clientX, e.clientY);
    const h   = getHandle(pos, crop);
    const map: Record<string, string> = {
      nw: 'nw-resize', ne: 'ne-resize', sw: 'sw-resize', se: 'se-resize',
      n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize',
      body: 'move',
    };
    wrapRef.current.style.cursor = h ? (map[h] ?? 'default') : 'crosshair';
  }, [crop, isDragging, relPos]);

  // ── Ratio change — resize existing crop to new ratio ──────────────────────
  const changeRatio = useCallback((newRatio: number | null) => {
    setRatio(newRatio);
    if (!newRatio || !crop || !imgRef.current) return;
    const b = computeImageBounds(imgRef.current);
    const cx = crop.x + crop.w / 2;
    const cy = crop.y + crop.h / 2;
    let w = crop.w;
    let h = w / newRatio;
    if (h > b.h) { h = b.h; w = h * newRatio; }
    if (w > b.w) { w = b.w; h = w / newRatio; }
    const x = clamp(cx - w / 2, b.x, b.x + b.w - w);
    const y = clamp(cy - h / 2, b.y, b.y + b.h - h);
    setCrop({ x, y, w, h });
  }, [crop]);

  // ── Rotate helpers ─────────────────────────────────────────────────────────
  const rotate90 = (dir: 1 | -1) => {
    setRotation(r => ((r + dir * 90) % 360 + 360) % 360);
  };

  // ── Drop zone ──────────────────────────────────────────────────────────────
  if (!file) {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDrop(true); }}
        onDragLeave={() => setIsDrop(false)}
        onDrop={(e) => {
          e.preventDefault(); setIsDrop(false);
          const f = e.dataTransfer.files[0];
          if (f && f.type.startsWith('image/')) loadFile(f);
        }}
        onClick={() => document.getElementById('crop-input')?.click()}
        className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer py-20 px-8 transition-colors ${
          isDrop
            ? 'border-violet-500 bg-blue-950/20'
            : 'border-violet-800/60 hover:border-violet-400 dark:hover:border-violet-600'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
          <svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Drop an image here</p>
          <p className="text-xs text-slate-500 mt-1">JPEG · JPG · PNG · WebP</p>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); document.getElementById('crop-input')?.click(); }}
          className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
        >
          Browse Files
        </button>
        <input id="crop-input" type="file" accept={ACCEPTED} className="sr-only"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
      </div>
    );
  }

  const hasCrop = crop && crop.w > MIN_CROP && crop.h > MIN_CROP;
  const onChangeFile = () => { setFile(null); setPreviewUrl(null); setDisplayUrl(null); setDisplayBlob(null); setCrop(null); setRotation(0); };

  return (
    <div className="mt-4 space-y-3">

      {/* ── File info bar ── */}
      <div className="flex items-center gap-2 px-1">
        <p className="text-xs text-slate-400 dark:text-slate-400 truncate flex-1 min-w-0">
          <span className="font-medium text-slate-800 dark:text-slate-200">{file.name}</span>
          <span className="ml-1 text-slate-500">· {formatBytes(file.size)}</span>
        </p>
        {hasCrop && (
          <button onClick={() => setCrop(null)} className="text-xs text-slate-500 hover:text-slate-300 dark:hover:text-slate-300 transition-colors shrink-0">
            Reset crop
          </button>
        )}
        <button onClick={onChangeFile} className="text-xs text-violet-500 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors shrink-0">
          Change
        </button>
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

      {/* ── Aspect ratio row ── */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 px-1">Aspect Ratio</p>
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {RATIOS.map(({ label, value }) => (
            <button key={label} onClick={() => changeRatio(value)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                ratio === value
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-1">
          💡 Tip: Select a ratio above before dragging to lock your crop to that shape
        </p>
      </div>

      {/* ── Rotation row ── */}
      <div>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Rotate</p>
          <div className="flex items-center gap-1">
            {/* −90° */}
            <button onClick={() => rotate90(-1)}
              className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600/60 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              title="Rotate −90°"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">−90°</span>
            </button>
            {/* Degree badge / reset */}
            <button
              onClick={() => setRotation(0)}
              title="Reset rotation"
              className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg min-w-12 text-center transition-colors ${
                rotation !== 0
                  ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-900/60'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {rotation}°
            </button>
            {/* +90° */}
            <button onClick={() => rotate90(1)}
              className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600/60 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              title="Rotate +90°"
            >
              <span className="hidden sm:inline">+90°</span>
              <svg className="w-3.5 h-3.5 scale-x-[-1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        {/* Fine slider */}
        <input
          type="range" min={-180} max={180} value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full bg-slate-300 dark:bg-slate-600 accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 px-0.5">
          <span>−180°</span><span>0°</span><span>+180°</span>
        </div>
      </div>

      {/* ── Image canvas ── */}
      <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex justify-center">
        <div
          ref={wrapRef}
          className="relative select-none w-full"
          style={{ cursor: 'crosshair', touchAction: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={updateCursor}
          onTouchStart={onTouchStart}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={displayUrl ?? undefined}
            alt="Crop preview"
            className="block w-full max-h-[55vh] object-contain"
            draggable={false}
          />

          {/* Dim overlay + crop box */}
          {hasCrop && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 right-0 bg-black/50" style={{ top: 0, height: crop.y }} />
              <div className="absolute left-0 right-0 bg-black/50" style={{ top: crop.y + crop.h, bottom: 0 }} />
              <div className="absolute bg-black/50" style={{ top: crop.y, height: crop.h, left: 0, width: crop.x }} />
              <div className="absolute bg-black/50" style={{ top: crop.y, height: crop.h, left: crop.x + crop.w, right: 0 }} />
              <div className="absolute border-2 border-white shadow-lg"
                style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }}>
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="border border-white/20" />)}
                </div>
                {(['nw','ne','sw','se'] as const).map((h) => (
                  <div key={h} className="absolute w-4 h-4 bg-white dark:bg-slate-800 rounded-sm border border-gray-400 shadow"
                    style={{
                      top:    h.startsWith('n') ? -HANDLE_PX : undefined,
                      bottom: h.startsWith('s') ? -HANDLE_PX : undefined,
                      left:   h.endsWith('w')   ? -HANDLE_PX : undefined,
                      right:  h.endsWith('e')   ? -HANDLE_PX : undefined,
                      cursor: `${h}-resize`,
                    }}
                  />
                ))}
                {/* Edge handles — N/S/E/W midpoints */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-2 bg-white dark:bg-slate-800 rounded-sm border border-gray-400 shadow" style={{ cursor: 'ns-resize' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-2 bg-white dark:bg-slate-800 rounded-sm border border-gray-400 shadow" style={{ cursor: 'ns-resize' }} />
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-5 bg-white dark:bg-slate-800 rounded-sm border border-gray-400 shadow" style={{ cursor: 'ew-resize' }} />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-5 bg-white dark:bg-slate-800 rounded-sm border border-gray-400 shadow" style={{ cursor: 'ew-resize' }} />
              </div>
            </div>
          )}

          {!hasCrop && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-medium text-white bg-black/60 px-4 py-2 rounded-full">
                Tap or drag to select crop area
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Error banner ── */}
      {cropError && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{cropError}</span>
        </div>
      )}

      {/* ── Action bar ── */}
      <div className="flex items-center gap-3 pt-1">
        {hasCrop && imgRef.current && (
          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {Math.round(crop.w * (imgRef.current.naturalWidth  / imgRef.current.offsetWidth))}
            {' × '}
            {Math.round(crop.h * (imgRef.current.naturalHeight / imgRef.current.offsetHeight))} px
          </span>
        )}
        <button
          onClick={applyCrop}
          disabled={!hasCrop || isProcessing}
          className="ml-auto inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {isProcessing ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Apply Crop
            </>
          )}
        </button>
      </div>

      {/* ── Crop result ── */}
      {croppedResult && !isProcessing && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={croppedResult.url} alt="Cropped"
              className="w-14 h-14 rounded-xl object-cover bg-blue-950/30 ring-1 ring-violet-100 dark:ring-violet-900 shrink-0 cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={() => setHandoff(new File([croppedResult.blob], croppedResult.name, { type: croppedResult.blob.type }))}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{croppedResult.name}</p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Cropped
              </span>
            </div>
            <button
              onClick={() => { const a = document.createElement('a'); a.href = croppedResult.url; a.download = croppedResult.name; a.click(); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); }}
              className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloaded ? 'Downloaded ✓' : 'Download'}
            </button>
          </div>
          <NextActions blob={croppedResult.blob} filename={croppedResult.name} currentTool="crop" />
        </div>
      )}
    </div>
  );
}
