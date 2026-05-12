'use client';

import { useState, useEffect } from 'react';
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

const FORMAT_OPTIONS = [
  { value: 'image/jpg',  label: 'JPG'  },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png',  label: 'PNG'  },
  { value: 'image/webp', label: 'WebP' },
];

export function ImageCard({
  file, result, isCompressing,
  onQualityChange, onFormatChange, onStripMetaChange, onRemove,
  isSelected, onToggleSelect,
}: Props) {
  const [showCompare, setShowCompare] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!result) { setCompressedSrc(null); return; }
    const url = URL.createObjectURL(result.blob);
    setCompressedSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [result]);

  const savings =
    result != null
      ? Math.round(((file.file.size - result.size) / file.file.size) * 100)
      : null;

  return (
    <div className={`relative glass border rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm transition-all overflow-hidden ${
      isCompressing ? 'glow-processing' : 'glass-hover'
    } ${
      isSelected
        ? 'border-violet-400 ring-1 ring-violet-500/40'
        : 'border-white/8'
    }`}>

      {/* ── Close button — top-right corner ── */}
      {onRemove && (
        <button
          onClick={() => onRemove(file.id)}
          className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label="Remove file"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* ── Row 1: checkbox · thumbnail · info · download ── */}
      <div className="flex items-center gap-3 min-w-0 pr-6">
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={() => onToggleSelect(file.id)}
            className="w-4 h-4 accent-violet-500 cursor-pointer shrink-0"
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

      {/* ── Quality slider ── */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Quality: <span className="font-data text-violet-400">{file.quality}</span>
          </label>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {file.quality >= 85 ? 'High quality' : file.quality >= 60 ? 'Balanced' : 'Smaller file'}
          </span>
        </div>

        <div className="flex items-center gap-1 min-w-0">
          {/* ±10 hidden on mobile */}
          <button
            onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 10))}
            className="hidden sm:block text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600/60 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            -10
          </button>
          <button
            onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 1))}
            className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600/60 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            -1
          </button>

          <input
            type="range"
            min={1}
            max={100}
            value={file.quality}
            onChange={(e) => onQualityChange(file.id, Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-slate-600 accent-violet-500 cursor-pointer"
            aria-label="Compression quality"
          />

          <button
            onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 1))}
            className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600/60 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            +1
          </button>
          <button
            onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 10))}
            className="hidden sm:block text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600/60 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            +10
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">
          <span>Smaller</span>
          <span>Better quality</span>
        </div>
      </div>

      {/* ── Format selector ── */}
      {file.file.type !== 'image/svg+xml' && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">Format</span>
            <div className="flex gap-1">
              {FORMAT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onFormatChange(file.id, value)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
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
          {file.format !== 'image/webp' && (
            <p className="text-[10px] text-amber-400 flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Pro tip: WebP is {({'image/jpg': '25–35%', 'image/jpeg': '25–35%', 'image/png': 'up to 80%'} as Record<string,string>)[file.format] ?? '25–35%'} smaller than {FORMAT_OPTIONS.find(f => f.value === file.format)?.label ?? 'this format'} at the same quality.
            </p>
          )}
        </div>
      )}

      {/* ── Action row: Compare · Remove · Download ── */}
      <div className="flex items-center gap-2">
        {/* Compare — shown once result exists; disabled while recompressing */}
        {result && (
          <button
            onClick={() => !isCompressing && setShowCompare((v) => !v)}
            className={`inline-flex items-center gap-1.5 text-xs font-medium bg-violet-50 dark:bg-violet-950/30 px-3 py-1.5 rounded-lg transition-colors ${
              isCompressing
                ? 'opacity-40 cursor-not-allowed text-violet-400'
                : 'text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-950/50'
            }`}
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10m0-10a2 2 0 012 2h2a2 2 0 012-2" />
            </svg>
            {showCompare ? 'Hide' : 'Compare'}
          </button>
        )}

        {/* Download — pushed to the right */}
        <button
          onClick={() => { if (result) { triggerDownload(result); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); } }}
          disabled={!result || isCompressing}
          className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition-all"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloaded ? 'Downloaded ✓' : `Save as ${FORMAT_OPTIONS.find(f => f.value === file.format)?.label ?? 'file'}`}
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
          {/* Toggle track */}
          <div className={`relative w-8 h-5 rounded-full transition-colors shrink-0 ${
            file.stripMeta ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}>
            <input
              type="checkbox"
              checked={file.stripMeta}
              onChange={(e) => onStripMetaChange(file.id, e.target.checked)}
              className="sr-only"
            />
            {/* Toggle thumb */}
            <div className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-slate-800 rounded-full shadow transition-all ${
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
