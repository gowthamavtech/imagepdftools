'use client';

import { useState, useEffect, useRef } from 'react';
import { CompareView } from './CompareView';
import { NextActions } from './NextActions';

export interface FileEntry {
  id: string;
  file: File;
  previewUrl: string;
  quality: number;
  format: string;
  stripMeta: boolean;
}

export interface CompressionResult {
  id: string;
  blob: Blob;
  name: string;
  size: number;
}

interface Props {
  file: FileEntry;
  result?: CompressionResult;
  isCompressing?: boolean;
  onQualityChange: (id: string, quality: number) => void;
  onFormatChange: (id: string, format: string) => void;
  onStripMetaChange: (id: string, strip: boolean) => void;
  onCompressToTarget: (id: string, targetBytes: number) => void;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function truncateMiddle(name: string, maxLen = 26): string {
  if (name.length <= maxLen) return name;
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot) : '';
  const base = dot > 0 ? name.slice(0, dot) : name;
  const half = Math.floor((maxLen - ext.length - 1) / 2);
  return `${base.slice(0, half)}…${base.slice(-half)}${ext}`;
}

function triggerDownload(result: CompressionResult) {
  const url = URL.createObjectURL(result.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = result.name;
  a.click();
  URL.revokeObjectURL(url);
}

const TARGET_SIZES = [
  { label: '< 50 KB',  bytes: 50 * 1024 },
  { label: '< 100 KB', bytes: 100 * 1024 },
  { label: '< 500 KB', bytes: 500 * 1024 },
  { label: '< 1 MB',   bytes: 1000 * 1024 },
];

function estimateQuality(originalBytes: number, targetBytes: number): number {
  const ratio = targetBytes / originalBytes;
  return Math.max(5, Math.min(92, Math.round(ratio * 130)));
}

const FORMAT_OPTIONS = [
  { value: 'image/jpg',  label: 'JPG'  },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png',  label: 'PNG'  },
  { value: 'image/webp', label: 'WebP' },
];

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900';
const BTN_INCREMENT = `flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/80 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-600 dark:hover:text-violet-400 transition-colors ${FOCUS_RING}`;

export function ImageCard({
  file, result, isCompressing,
  onQualityChange, onFormatChange, onStripMetaChange, onCompressToTarget, onRemove,
  isSelected, onToggleSelect,
}: Props) {
  const [showCompare, setShowCompare] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [mode, setMode] = useState<'quality' | 'target'>('quality');
  const [customKb, setCustomKb] = useState('');
  const [activeTargetBytes, setActiveTargetBytes] = useState<number | null>(null);

  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!result) { setCompressedSrc(null); return; }
    const url = URL.createObjectURL(result.blob);
    setCompressedSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [result]);

  // Auto-open compare the first time a result arrives; respect user's toggle after that
  const hasAutoOpened = useRef(false);
  useEffect(() => {
    if (result && !hasAutoOpened.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowCompare(true);
      hasAutoOpened.current = true;
    }
  }, [result]);

  const savings =
    result != null
      ? Math.round(((file.file.size - result.size) / file.file.size) * 100)
      : null;

  const isLowQuality = file.quality < 20;

  return (
    <div className={`relative bg-white dark:bg-[#111114] border rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm transition-all overflow-hidden ${
      isCompressing ? 'glow-processing' : 'hover:border-violet-400/40 dark:hover:border-violet-500/30'
    } ${
      isSelected
        ? 'border-violet-400 ring-1 ring-violet-500/40'
        : 'border-slate-200 dark:border-white/[0.08]'
    }`}>

      {/* ── Close button ── */}
      {onRemove && (
        <button
          onClick={() => onRemove(file.id)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 dark:hover:text-red-400 transition-colors ${FOCUS_RING}`}
          aria-label="Remove file"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* ── Row 1: checkbox · thumbnail · info ── */}
      <div className="flex items-center gap-3 min-w-0 pr-8">
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={() => onToggleSelect(file.id)}
            className={`w-4 h-4 accent-violet-500 cursor-pointer shrink-0 ${FOCUS_RING}`}
            aria-label={`Select ${file.file.name}`}
          />
        )}

        {/* Thumbnail */}
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700/60 shrink-0 ring-1 ring-slate-300 dark:ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={file.previewUrl} alt={file.file.name} className="w-full h-full object-cover cursor-grab active:cursor-grabbing" draggable={false} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-tight" title={file.file.name}>
            {truncateMiddle(file.file.name)}
          </p>
          <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs">
            <span className="font-data text-slate-500 dark:text-slate-400">{formatBytes(file.file.size)}</span>
            {isCompressing && (
              <span className="text-violet-400 flex items-center gap-1">
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Compressing…
              </span>
            )}
            {result && (
              <span className={`inline-flex items-center gap-2 transition-opacity ${isCompressing ? 'opacity-40' : ''}`}>
                <span className="font-data text-violet-400 font-medium">
                  → {formatBytes(result.size)}
                </span>
                {savings !== null && savings > 0 && (
                  <span className="font-data font-bold text-emerald-500">−{savings}%</span>
                )}
                {savings !== null && savings === 0 && (
                  <span className="text-slate-500">no change</span>
                )}
                {savings !== null && savings < 0 && (
                  <span className="font-bold text-amber-500">+{Math.abs(savings)}% larger</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Compression controls ── */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">

        {/* Mode toggle */}
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Compression</label>
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-700/60 p-0.5 gap-0.5">
            {(['quality', 'target'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setCustomKb(''); setActiveTargetBytes(null); }}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${FOCUS_RING} ${
                  mode === m
                    ? 'bg-white dark:bg-slate-600 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {m === 'quality' ? 'Quality' : 'Target Size'}
              </button>
            ))}
          </div>
        </div>

        {mode === 'quality' ? (
          /* ── Quality slider mode ── */
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold tracking-tight text-violet-500">
                {`Size − ${file.quality}%`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 10))}
                  className={`hidden sm:flex ${BTN_INCREMENT}`} aria-label="Decrease quality by 10">−10</button>
                <button onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 1))}
                  className={`flex ${BTN_INCREMENT}`} aria-label="Decrease quality by 1">−1</button>
              </div>
              <input
                type="range" min={1} max={100} value={file.quality}
                onChange={(e) => onQualityChange(file.id, Number(e.target.value))}
                className="flex-1 h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-slate-600 accent-violet-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Compression quality"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 1))}
                  className={`flex ${BTN_INCREMENT}`} aria-label="Increase quality by 1">+1</button>
                <button onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 10))}
                  className={`hidden sm:flex ${BTN_INCREMENT}`} aria-label="Increase quality by 10">+10</button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
              <span>Reduced size</span>
              <span>Original size</span>
            </div>
            {isLowQuality && (
              <p className="mt-2 text-[10px] text-violet-400 leading-relaxed">
                Quality below 20 may produce visible artifacts. Use this only for thumbnails.
              </p>
            )}
          </>
        ) : (
          /* ── Target size mode ── */
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              The output will be compressed until it is under your chosen target.
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {TARGET_SIZES.map(({ label, bytes }) => {
                const isDisabled = file.file.size <= bytes;
                return (
                  <button
                    key={label}
                    disabled={isDisabled}
                    onClick={() => { setCustomKb(''); setActiveTargetBytes(bytes); onCompressToTarget(file.id, bytes); }}
                    title={isDisabled ? 'File is already under this size' : `Compress to under ${label}`}
                    className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-md transition-colors ${FOCUS_RING} ${
                      isDisabled
                        ? 'opacity-30 cursor-not-allowed text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'
                        : activeTargetBytes === bytes && customKb === ''
                          ? 'bg-violet-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-600 dark:hover:text-violet-400'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              {/* Custom KB input */}
              <div className="flex items-center rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700 border border-transparent focus-within:border-violet-500">
                <input
                  type="number"
                  min={1}
                  placeholder="custom"
                  value={customKb}
                  onChange={(e) => { setCustomKb(e.target.value); setActiveTargetBytes(null); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const kb = parseFloat(customKb);
                      if (!isNaN(kb) && kb > 0) onCompressToTarget(file.id, kb * 1024);
                    }
                  }}
                  onBlur={() => {
                    const kb = parseFloat(customKb);
                    if (!isNaN(kb) && kb > 0) onCompressToTarget(file.id, kb * 1024);
                  }}
                  className="w-16 bg-transparent text-[10px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-1.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 pr-2 select-none">KB</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Format selector ── */}
      {file.file.type !== 'image/svg+xml' && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span id={`fmt-label-${file.id}`} className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">Format</span>
            {/* role="radiogroup" gives screen readers the correct semantics for a single-select group */}
            <div role="radiogroup" aria-labelledby={`fmt-label-${file.id}`} className="flex gap-1">
              {FORMAT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  role="radio"
                  aria-checked={file.format === value}
                  onClick={() => onFormatChange(file.id, value)}
                  className={`text-[11px] font-semibold px-2.5 py-2 rounded-md transition-colors ${FOCUS_RING} ${
                    file.format === value
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600/60 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* P3: WebP tip demoted from amber warning to neutral note */}
          {file.format !== 'image/webp' && (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
              WebP is {({'image/jpg': '25–35%', 'image/jpeg': '25–35%', 'image/png': 'up to 80%'} as Record<string,string>)[file.format] ?? '25–35%'} smaller than {FORMAT_OPTIONS.find(f => f.value === file.format)?.label ?? 'this format'} at the same quality.
            </p>
          )}
        </div>
      )}

      {/* ── Action row: Compare · Download ── */}
      <div className="flex items-center gap-2">
        {result && (
          <button
            onClick={() => !isCompressing && setShowCompare((v) => !v)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${FOCUS_RING} ${
              isCompressing
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : showCompare
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300 shadow-sm'
                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-500/30'
            }`}
            aria-pressed={showCompare}
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10m0-10a2 2 0 012 2h2a2 2 0 012-2" />
            </svg>
            {showCompare ? (
              <><span className="sm:hidden">Hide</span><span className="hidden sm:inline">Hide Compare</span></>
            ) : 'Compare'}
          </button>
        )}

        {/* P2: gradient removed — solid violet */}
        <button
          onClick={() => { if (result) { triggerDownload(result); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); } }}
          disabled={!result || isCompressing}
          className={`ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors ${FOCUS_RING}`}
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloaded ? 'Saved ✓' : `Save as ${FORMAT_OPTIONS.find(f => f.value === file.format)?.label ?? 'file'}`}
        </button>
      </div>

      {/* ── Compare view ── */}
      {showCompare && result && compressedSrc && (
        <CompareView
          originalSrc={file.previewUrl}
          compressedSrc={compressedSrc}
          originalSize={file.file.size}
          compressedSize={result.size}
        />
      )}

      {/* ── Next actions ── */}
      {result && (
        <div className={`transition-opacity ${isCompressing ? 'opacity-40 pointer-events-none' : ''}`}>
          <NextActions blob={result.blob} filename={result.name} currentTool="compress" />
        </div>
      )}

      {/* ── Metadata strip toggle ── */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
          <div className={`relative w-8 h-5 rounded-full transition-colors shrink-0 ${
            file.stripMeta ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}>
            <input
              type="checkbox"
              checked={file.stripMeta}
              onChange={(e) => onStripMetaChange(file.id, e.target.checked)}
              className={`sr-only ${FOCUS_RING}`}
            />
            <div className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-slate-200 rounded-full shadow transition-all ${
              file.stripMeta ? 'left-3.5' : 'left-0.5'
            }`} />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            {file.stripMeta ? (
              <span className="text-emerald-500 font-semibold">Metadata stripped ✓</span>
            ) : (
              'Strip metadata (EXIF / GPS)'
            )}
          </span>
        </label>
      </div>
    </div>
  );
}
