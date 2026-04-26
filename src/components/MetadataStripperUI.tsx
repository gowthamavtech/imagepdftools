'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DropZone } from './DropZone';
import { NextActions } from './NextActions';
import { useHandoffStore } from '@/store/handoffStore';

interface FileEntry {
  id: string;
  file: File;
  previewUrl: string;
}

interface StripResult {
  id: string;
  blob: Blob;
  name: string;
  size: number;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function truncateMiddle(name: string, maxLen = 40): string {
  if (name.length <= maxLen) return name;
  const dot  = name.lastIndexOf('.');
  const ext  = dot > 0 ? name.slice(dot) : '';
  const base = dot > 0 ? name.slice(0, dot) : name;
  const half = Math.floor((maxLen - ext.length - 1) / 2);
  return `${base.slice(0, half)}…${base.slice(-half)}${ext}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function handleDownload(result: StripResult) {
  const url = URL.createObjectURL(result.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = result.name;
  a.click();
  URL.revokeObjectURL(url);
}

export function MetadataStripperUI() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [results, setResults] = useState<StripResult[]>([]);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const filesRef = useRef<FileEntry[]>([]);
  filesRef.current = files;

  const [sourceLabel, setSourceLabel] = useState<string | null>(null);
  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  useEffect(() => {
    const { file: f, sourceLabel: sl } = consumeHandoff();
    if (f) { setSourceLabel(sl); addFiles([f]); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processFile = useCallback(async (entry: FileEntry) => {
    setProcessingIds((prev) => new Set(prev).add(entry.id));
    try {
      const { stripMetadata } = await import('@/lib/stripMetadata');
      const blob = await stripMetadata(entry.file);

      // Preserve original extension
      const ext = entry.file.name.match(/\.[^.]+$/)?.[0] ?? '';
      const name = entry.file.name.replace(/\.[^.]+$/, '') + '-clean' + ext;

      setResults((prev) => [
        ...prev.filter((r) => r.id !== entry.id),
        { id: entry.id, blob, name, size: blob.size },
      ]);
    } catch (err) {
      setFileErrors((prev) => ({ ...prev, [entry.id]: (err as Error).message || 'Failed to process file.' }));
    } finally {
      setProcessingIds((prev) => {
        const s = new Set(prev);
        s.delete(entry.id);
        return s;
      });
    }
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      const newEntries: FileEntry[] = incoming.map((file) => ({
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newEntries]);
      newEntries.forEach(processFile);
    },
    [processFile],
  );

  const allDone = files.length > 0 && results.length === files.length;

  async function downloadAll() {
    if (results.length === 0) return;
    const { downloadAllAsZip } = await import('@/lib/zip');
    await downloadAllAsZip(results.map((r) => ({ name: r.name, blob: r.blob })));
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-16">
      <DropZone onFiles={addFiles} />

      {files.length > 0 && (
        <div className="mt-6 space-y-4">

          {/* Handoff source pill */}
          {sourceLabel && (
            <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800 px-3 py-1.5 rounded-full w-fit">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              From: {sourceLabel}
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {allDone ? (
                <span className="text-emerald-500 font-semibold">
                  {results.length} of {files.length} cleaned ✓
                </span>
              ) : (
                <span>
                  <span className="font-semibold text-violet-600 dark:text-violet-400">
                    {results.length}
                  </span>
                  {' '}of{' '}
                  <span className="font-semibold">{files.length}</span>
                  {' '}cleaned
                  {processingIds.size > 0 && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      {processingIds.size} pending
                    </span>
                  )}
                </span>
              )}
            </div>

            <button
              onClick={downloadAll}
              disabled={!allDone}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 px-5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save All
            </button>
          </div>

          {/* File cards */}
          <div className="grid gap-3">
            {files.map((file) => {
              const result = results.find((r) => r.id === file.id);
              const isProcessing = processingIds.has(file.id);
              const fileError = fileErrors[file.id];
              const saved = result
                ? Math.round(((file.file.size - result.size) / file.file.size) * 100)
                : null;

              return (
                <div
                  key={file.id}
                  className="bg-white dark:bg-gray-900 border border-violet-100 dark:border-violet-900/30 rounded-2xl p-4 flex flex-col gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-950 shrink-0 ring-1 ring-violet-100 dark:ring-violet-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.previewUrl}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate" title={file.file.name}>
                      {truncateMiddle(file.file.name)}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                      <span className="text-gray-400">{formatBytes(file.file.size)}</span>
                      {isProcessing && (
                        <span className="text-violet-400 dark:text-violet-500 flex items-center gap-1">
                          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Stripping…
                        </span>
                      )}
                      {!isProcessing && fileError && (
                        <span className="text-red-500 dark:text-red-400 font-medium">Failed</span>
                      )}
                      {!isProcessing && result && (
                        <>
                          <span className="text-violet-600 dark:text-violet-400 font-medium">
                            → {formatBytes(result.size)}
                          </span>
                          {saved !== null && saved > 0 && (
                            <span className="font-bold text-emerald-500">−{saved}%</span>
                          )}
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Metadata removed
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Download */}
                  <button
                    onClick={() => result && handleDownload(result)}
                    disabled={!result || isProcessing}
                    className="inline-flex items-center gap-1.5 text-xs bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-1.5 rounded-lg transition-all shrink-0"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Save
                  </button>
                </div>

                {result && !isProcessing && (
                  <NextActions blob={result.blob} filename={result.name} currentTool="strip" />
                )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
