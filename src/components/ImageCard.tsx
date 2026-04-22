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

function handleDownload(result: CompressionResult) {
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
    <div className={`relative bg-white dark:bg-gray-900 border rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm transition-colors overflow-hidden ${
      isSelected
        ? 'border-violet-400 dark:border-violet-500 ring-1 ring-violet-300 dark:ring-violet-700'
        : 'border-violet-100 dark:border-violet-900/30'
    }`}>

      {/* ── Close button — top-right corner ── */}
      {onRemove && (
        <button
          onClick={() => onRemove(file.id)}
          className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 dark:hover:text-red-400 transition-colors"
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
            className="w-4 h-4 accent-violet-600 cursor-pointer shrink-0"
            aria-label={`Select ${file.file.name}`}
          />
        )}

        {/* Thumbnail */}
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-950 shrink-0 ring-1 ring-violet-100 dark:ring-violet-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={file.previewUrl} alt={file.file.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight" title={file.file.name}>
            {truncateMiddle(file.file.name)}
          </p>
          <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs">
            <span className="text-gray-400">{formatBytes(file.file.size)}</span>
            {isCompressing && (
              <span className="text-violet-400 dark:text-violet-500 flex items-center gap-1">
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Compressing…
              </span>
            )}
            {!isCompressing && result && (
              <>
                <span className="text-violet-600 dark:text-violet-400 font-medium">
                  → {formatBytes(result.size)}
                </span>
                {savings !== null && savings > 0 && (
                  <span className="font-bold text-emerald-500">−{savings}%</span>
                )}
                {savings !== null && savings === 0 && (
                  <span className="text-gray-400">no change</span>
                )}
                {savings !== null && savings < 0 && (
                  <span className="font-bold text-amber-500">+{Math.abs(savings)}% larger</span>
                )}
              </>
            )}
          </div>

          </div>

      </div>

      {/* ── Quality slider ── */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Quality: <span className="text-violet-600 dark:text-violet-400">{file.quality}</span>
          </label>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {file.quality >= 85 ? 'High quality' : file.quality >= 60 ? 'Balanced' : 'Smaller file'}
          </span>
        </div>

        <div className="flex items-center gap-1 min-w-0">
          {/* ±10 hidden on mobile */}
          <button
            onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 10))}
            className="hidden sm:block text-[10px] font-semibold text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 bg-gray-100 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            -10
          </button>
          <button
            onClick={() => onQualityChange(file.id, Math.max(1, file.quality - 1))}
            className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 bg-gray-100 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            -1
          </button>

          <input
            type="range"
            min={1}
            max={100}
            value={file.quality}
            onChange={(e) => onQualityChange(file.id, Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none rounded-full bg-gray-200 dark:bg-gray-700 accent-violet-600 cursor-pointer"
            aria-label="Compression quality"
          />

          <button
            onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 1))}
            className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 bg-gray-100 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            +1
          </button>
          <button
            onClick={() => onQualityChange(file.id, Math.min(100, file.quality + 10))}
            className="hidden sm:block text-[10px] font-semibold text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 bg-gray-100 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 px-1.5 py-0.5 rounded transition-colors shrink-0"
          >
            +10
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
          <span>Smaller</span>
          <span>Better quality</span>
        </div>
      </div>

      {/* ── Format selector ── */}
      {file.file.type !== 'image/svg+xml' && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 shrink-0">Format</span>
            <div className="flex gap-1">
              {FORMAT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onFormatChange(file.id, value)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    file.format === value
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {file.format !== 'image/webp' && (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
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
        {/* Compare — only when result is ready */}
        {result && !isCompressing && (
          <button
            onClick={() => setShowCompare((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 bg-violet-50 dark:bg-violet-950/50 hover:bg-violet-100 dark:hover:bg-violet-900/50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10m0-10a2 2 0 012 2h2a2 2 0 012-2" />
            </svg>
            {showCompare ? 'Hide' : 'Compare'}
          </button>
        )}

        {/* Download — pushed to the right */}
        <button
          onClick={() => result && handleDownload(result)}
          disabled={!result || isCompressing}
          className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition-all"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save as {FORMAT_OPTIONS.find(f => f.value === file.format)?.label ?? 'file'}
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
      {result && !isCompressing && (
        <NextActions blob={result.blob} filename={result.name} currentTool="compress" />
      )}

      {/* ── Metadata strip toggle ── */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
          {/* Toggle track */}
          <div className={`relative w-8 h-5 rounded-full transition-colors shrink-0 ${
            file.stripMeta ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}>
            <input
              type="checkbox"
              checked={file.stripMeta}
              onChange={(e) => onStripMetaChange(file.id, e.target.checked)}
              className="sr-only"
            />
            {/* Toggle thumb */}
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
              file.stripMeta ? 'left-3.5' : 'left-0.5'
            }`} />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
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
