'use client';

import { useEffect, useRef, useState } from 'react';
import type { FileEntry } from './ImageCard';

// ── Quality Slider — JPEG & WebP ────────────────────────────────────────────

interface QualityProps {
  quality: number;
  format: string;
  files: FileEntry[];
  onChange: (quality: number) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function QualitySlider({ quality, format, files, onChange }: QualityProps) {
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);
  const [estimating, setEstimating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only estimate for JPEG/WebP — they use the quality knob
  const canEstimate = format === 'image/jpeg' || format === 'image/webp';

  useEffect(() => {
    if (!canEstimate || files.length === 0) { setEstimatedSize(null); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setEstimating(true);
      try {
        const { compressImage } = await import('@/lib/compress');
        const sample = files[0].file;
        const result = await compressImage(sample, {
          quality,
          colors: 256,
          precision: 2,
          outputFormat: format,
          maxDimension: 100,
        });
        const totalOriginal = files.reduce((a, f) => a + f.file.size, 0);
        setEstimatedSize(Math.round(totalOriginal * (result.size / sample.size)));
      } catch {
        setEstimatedSize(null);
      } finally {
        setEstimating(false);
      }
    }, 150);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [quality, format, files, canEstimate]);

  const totalOriginal = files.reduce((a, f) => a + f.file.size, 0);
  const savingsPct =
    estimatedSize != null && totalOriginal > 0
      ? Math.max(0, Math.round(((totalOriginal - estimatedSize) / totalOriginal) * 100))
      : null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Quality: <span className="text-violet-600">{quality}</span>
        </label>
        {estimating && <span className="text-xs text-slate-500 dark:text-slate-400 animate-pulse">Estimating…</span>}
        {!estimating && estimatedSize != null && savingsPct !== null && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Est.{' '}
            <span className="font-semibold text-violet-600">{formatBytes(estimatedSize)}</span>
            {savingsPct > 0 && (
              <span className="text-green-600 font-semibold ml-1">−{savingsPct}%</span>
            )}
          </span>
        )}
      </div>
      <input
        type="range"
        min={1}
        max={100}
        value={quality}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-slate-200 dark:bg-slate-600 accent-blue-500 cursor-pointer"
        aria-label="Compression quality"
      />
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
        <span>Smaller file</span>
        <span>Better quality</span>
      </div>
    </div>
  );
}

// ── Precision Slider — SVG ──────────────────────────────────────────────────

interface PrecisionProps {
  precision: number;
  onChange: (precision: number) => void;
}

export function PrecisionSlider({ precision, onChange }: PrecisionProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Decimal precision: <span className="text-violet-600">{precision}</span>
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {precision === 0 ? 'Maximum compression' : precision <= 2 ? 'Recommended' : 'High fidelity'}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={6}
        step={1}
        value={precision}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-slate-200 dark:bg-slate-600 accent-blue-500 cursor-pointer"
        aria-label="SVG coordinate decimal precision"
      />
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
        <span>0 decimals (smallest)</span>
        <span>6 decimals (exact)</span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Rounds path coordinates and transform values. Also strips{' '}
        <code className="font-mono">&lt;metadata&gt;</code>,{' '}
        <code className="font-mono">&lt;title&gt;</code>, and XML comments.
      </p>
    </div>
  );
}
