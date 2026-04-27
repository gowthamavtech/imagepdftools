'use client';

import { useState, useCallback, useEffect } from 'react';
import type { MetadataGroup, MetadataGroups } from '@/lib/metadataEditor';
import { NextActions } from './NextActions';
import { useHandoffStore } from '@/store/handoffStore';

const GROUP_ICONS: Record<string, string> = {
  gps:        '📍',
  camera:     '📷',
  timestamps: '🕐',
  author:     '✍️',
  software:   '💻',
  other:      '🔖',
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative w-9 h-5 cursor-pointer shrink-0" onClick={() => onChange(!checked)}>
      <div className={`w-9 h-5 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
      <div className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-slate-800 rounded-full shadow transition-all ${checked ? 'left-4' : 'left-0.5'}`} />
    </label>
  );
}

function GroupCard({ group, kept, onToggle }: {
  group: MetadataGroup;
  kept: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${
      kept
        ? 'border-white/8'
        : 'border-red-200 dark:border-red-900/30 opacity-60'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50">
        <span className="text-base">{GROUP_ICONS[group.id]}</span>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 text-left text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
        >
          {group.label}
          <span className="text-xs font-normal text-slate-500">({group.fields.length})</span>
          <svg
            className={`w-3.5 h-3.5 ml-auto text-slate-500 transition-transform ${expanded ? '' : '-rotate-90'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-semibold ${kept ? 'text-emerald-500' : 'text-red-400'}`}>
            {kept ? 'Keep' : 'Remove'}
          </span>
          <Toggle checked={kept} onChange={onToggle} />
        </div>
      </div>

      {/* Fields */}
      {expanded && (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {group.fields.map((field) => (
            <div key={field.key} className="flex items-start gap-3 px-4 py-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 shrink-0 w-36 truncate pt-px">{field.label}</span>
              <span className="text-slate-700 dark:text-slate-300 break-all">{field.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MetadataEditorUI() {
  const [file, setFile]               = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]   = useState<string | null>(null);
  const [groups, setGroups]           = useState<MetadataGroups>([]);
  const [isReading, setIsReading]     = useState(false);
  const [keptGroups, setKeptGroups]   = useState<Set<string>>(new Set());
  const [isProcessing, setProcessing] = useState(false);
  const [isDragging, setIsDragging]   = useState(false);
  const [savedResult, setSavedResult] = useState<{ blob: Blob; name: string; url: string } | null>(null);
  const [sourceLabel, setSourceLabel] = useState<string | null>(null);

  const isJpeg = file?.type === 'image/jpeg' || file?.type === 'image/jpg';
  const removedCount = groups.filter((g) => !keptGroups.has(g.id)).length;

  const handleFile = useCallback(async (f: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setIsReading(true);
    setGroups([]);
    setKeptGroups(new Set());
    setSavedResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
    try {
      const { readMetadata } = await import('@/lib/metadataEditor');
      const parsed = await readMetadata(f);
      setGroups(parsed);
      setKeptGroups(new Set(parsed.map((g) => g.id)));
    } finally {
      setIsReading(false);
    }
  }, [previewUrl]);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeHandoff();
    if (f) { setSourceLabel(sl); handleFile(f); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === 'image/jpeg' || f.type === 'image/jpg' || f.type === 'image/png' || f.type === 'image/webp')) {
      handleFile(f);
    }
  }, [handleFile]);

  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDownload = useCallback(async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const { stripSelectedGroups } = await import('@/lib/metadataEditor');
      const groupsToRemove = new Set(groups.map((g) => g.id).filter((id) => !keptGroups.has(id)));
      const blob = await stripSelectedGroups(file, groupsToRemove);
      const ext  = blob.type.split('/')[1] ?? 'jpg';
      const name = file.name.replace(/\.[^.]+$/, '') + `-cleaned.${ext}`;
      const url  = URL.createObjectURL(blob);
      setSavedResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, name, url };
      });
    } finally {
      setProcessing(false);
    }
  }, [file, groups, keptGroups]);

  const toggleGroup = useCallback((id: string) => {
    setKeptGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setGroups([]);
    setKeptGroups(new Set());
  }, [previewUrl]);

  // ── Drop zone ────────────────────────────────────────────────────────────────
  if (!file) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-16">
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-colors cursor-pointer py-20 px-8 ${
            isDragging
              ? 'border-violet-500 bg-blue-950/20'
              : 'border-violet-300 dark:border-violet-800/60 hover:border-violet-500 dark:hover:border-violet-500'
          }`}
          onClick={() => document.getElementById('meta-file-input')?.click()}
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Drop an image here</p>
            <p className="text-xs text-slate-500 mt-1">JPEG · PNG · WebP</p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); document.getElementById('meta-file-input')?.click(); }}
            className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
          >
            Browse Files
          </button>
          <input id="meta-file-input" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="sr-only" onChange={onInputChange} />
        </div>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────────
  const continueBlob: Blob = savedResult?.blob ?? file;
  const continueFilename   = savedResult?.name ?? file.name;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">
      <div className="mt-6 space-y-4">

        {/* File info bar */}
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {previewUrl && <img src={previewUrl} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900" />}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {(file.size / 1024).toFixed(1)} KB · {file.type.split('/')[1].toUpperCase()}
            </p>
          </div>
          <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-300 dark:hover:text-slate-300 transition-colors shrink-0">
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

        {/* Reading spinner */}
        {isReading && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
            <svg className="w-4 h-4 animate-spin text-violet-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Reading metadata…
          </div>
        )}

        {/* No metadata */}
        {!isReading && groups.length === 0 && (
          <div className="text-center py-10 text-sm text-slate-500">
            No metadata found in this image.
          </div>
        )}

        {/* PNG/WebP warning */}
        {!isReading && groups.length > 0 && !isJpeg && (
          <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>Selective removal is not available for PNG/WebP — all metadata will be stripped on download.</span>
          </div>
        )}

        {/* Group cards */}
        {!isReading && groups.length > 0 && (
          <div className="space-y-2">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                kept={keptGroups.has(group.id)}
                onToggle={() => toggleGroup(group.id)}
              />
            ))}
          </div>
        )}

        {/* Action bar */}
        {!isReading && groups.length > 0 && (
          <button
            onClick={handleDownload}
            disabled={removedCount === 0 || isProcessing}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {removedCount === 0
                  ? 'Toggle groups to remove'
                  : `Apply — ${removedCount} group${removedCount > 1 ? 's' : ''} removed`}
              </>
            )}
          </button>
        )}

        {/* Saved result card */}
        {savedResult && !isProcessing && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-violet-100 dark:ring-violet-900" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{savedResult.name}</p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Metadata removed
                </span>
              </div>
              <a
                href={savedResult.url}
                download={savedResult.name}
                className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save
              </a>
            </div>
          </div>
        )}

        {/* Continue with — shown after Apply or when no metadata found */}
        {!isReading && (savedResult || groups.length === 0) && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <NextActions blob={continueBlob} filename={continueFilename} currentTool="edit" />
          </div>
        )}

      </div>
    </div>
  );
}
