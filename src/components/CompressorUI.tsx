'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';
import { useCompressor } from '@/hooks/useCompressor';
import { DropZone } from './DropZone';
import { AdBanner } from './AdBanner';
import { UpgradeModal } from './UpgradeModal';
import { useHandoffStore } from '@/store/handoffStore';

const ImageCard = dynamic(() => import('./ImageCard').then((m) => m.ImageCard), { ssr: false });

export function CompressorUI({ initialFormat }: { initialFormat?: string } = {}) {
  const {
    files,
    results,
    processingIds,
    showUpgradeModal,
    addFiles,
    setFileQuality,
    setFileFormat,
    setFileStripMeta,
    removeFile,
    downloadZip,
    setShowUpgradeModal,
  } = useCompressor({ initialFormat });

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  // Auto-load a file passed from another tool
  useEffect(() => {
    const f = consumeHandoff();
    if (f) addFiles([f]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const allSelected = files.length > 0 && selectedIds.size === files.length;
  const toggleSelectAll = useCallback(() => {
    setSelectedIds(allSelected ? new Set() : new Set(files.map((f) => f.id)));
  }, [allSelected, files]);

  async function downloadSelected() {
    if (selectedIds.size === 0) return;

    // Build one entry per selected file. Use the compressed result when ready,
    // fall back to the original so all selected files are always included.
    const entries = files
      .filter((f) => selectedIds.has(f.id))
      .map((f) => {
        const result = results.find((r) => r.id === f.id);
        return result
          ? { name: result.name, blob: result.blob }
          : { name: f.file.name, blob: f.file as Blob };
      });

    if (selectedIds.size === 1) {
      const { name, blob } = entries[0];
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const { downloadAllAsZip } = await import('@/lib/zip');
      await downloadAllAsZip(entries);
    }
  }

  const allDone = files.length > 0 && results.length === files.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-16">
      <DropZone onFiles={addFiles} />

      {files.length > 0 && (
        <div className="mt-6 space-y-4">

          {/* Progress counter + actions toolbar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Select all + status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 accent-violet-600 cursor-pointer shrink-0"
                aria-label="Select all files"
                title="Select all"
              />
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {allDone ? (
                  <span className="text-emerald-500 font-semibold">{results.length} of {files.length} compressed ✓</span>
                ) : (
                  <span>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">{results.length}</span>
                    {' '}of{' '}
                    <span className="font-semibold">{files.length}</span>
                    {' '}compressed
                    {processingIds.size > 0 && (
                      <span className="ml-2 inline-flex items-center gap-1 text-gray-400">
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
            </div>

            {/* Download buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {selectedIds.size > 0 && (
                <button
                  onClick={downloadSelected}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save ({selectedIds.size})
                </button>
              )}
              <button
                onClick={downloadZip}
                disabled={!allDone}
                className="inline-flex items-center gap-1.5 whitespace-nowrap bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save All
              </button>
            </div>
          </div>

          <AdBanner />

          {/* Image cards */}
          <div className="grid gap-3">
            {files.map((file) => (
              <ImageCard
                key={file.id}
                file={file}
                result={results.find((r) => r.id === file.id)}
                isCompressing={processingIds.has(file.id)}
                onQualityChange={setFileQuality}
                onFormatChange={setFileFormat}
                onStripMetaChange={setFileStripMeta}
                onRemove={removeFile}
                isSelected={selectedIds.has(file.id)}
                onToggleSelect={toggleSelect}
              />
            ))}
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  );
}
