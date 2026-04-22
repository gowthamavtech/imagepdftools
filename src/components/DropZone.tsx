'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface Props {
  onFiles: (files: File[]) => void;
}

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_FREE_MB = 50;

export function DropZone({ onFiles }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [pasteFlash, setPasteFlash] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  const filterFiles = useCallback((raw: File[]): File[] => {
    return raw.filter(
      (f) => ACCEPTED.includes(f.type) && f.size <= MAX_FREE_MB * 1024 * 1024
    );
  }, []);

  const handlePastedItems = useCallback(
    (items: DataTransferItemList | ClipboardItem[]) => {
      const files: File[] = [];

      if (items instanceof DataTransferItemList) {
        for (const item of Array.from(items)) {
          if (item.kind === 'file') {
            const f = item.getAsFile();
            if (f) files.push(f);
          }
        }
      } else {
        // ClipboardItem array from navigator.clipboard.read() — handled async
        return;
      }

      const valid = filterFiles(files);
      if (valid.length) {
        setPasteFlash(true);
        setTimeout(() => setPasteFlash(false), 600);
        onFiles(valid);
      }
    },
    [onFiles, filterFiles],
  );

  // Global Ctrl+V / Cmd+V listener
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      handlePastedItems(e.clipboardData.items);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [handlePastedItems]);

  // Paste button — uses Clipboard API (requires user gesture)
  const handlePasteButton = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const items = await navigator.clipboard.read();
        const files: File[] = [];
        for (const item of items) {
          const imageType = item.types.find((t) => ACCEPTED.includes(t));
          if (imageType) {
            const blob = await item.getType(imageType);
            const ext = imageType.split('/')[1] ?? 'png';
            files.push(new File([blob], `pasted-image.${ext}`, { type: imageType }));
          }
        }
        const valid = filterFiles(files);
        if (valid.length) {
          setPasteFlash(true);
          setTimeout(() => setPasteFlash(false), 600);
          onFiles(valid);
        }
      } catch {
        // Permission denied or no image — silently ignore
      }
    },
    [onFiles, filterFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const valid = filterFiles(Array.from(e.dataTransfer.files));
      if (valid.length) onFiles(valid);
    },
    [onFiles, filterFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const valid = filterFiles(Array.from(e.target.files));
        if (valid.length) onFiles(valid);
        e.target.value = '';
      }
    },
    [onFiles, filterFiles]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Drop images here or click to upload"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      className={`relative border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all select-none overflow-hidden ${
        pasteFlash
          ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20'
          : isDragging
          ? 'drop-zone-active border-violet-500 bg-violet-100/60 dark:bg-violet-950/30'
          : 'border-violet-200/70 dark:border-violet-700/50 hover:border-violet-400 dark:hover:border-violet-600 bg-white/50 dark:bg-gray-900/40'
      }`}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 opacity-60 pointer-events-none" />

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED.join(',')}
        className="hidden"
        onChange={handleChange}
      />

      <div className="relative flex flex-col items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Drop your images here
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            JPG · JPEG · PNG · WebP · SVG &nbsp;·&nbsp; up to {MAX_FREE_MB} MB each
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <button
            type="button"
            className="whitespace-nowrap bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-violet-200 dark:shadow-violet-900 transition-all"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          >
            Browse Files
          </button>

          <button
            type="button"
            onClick={handlePasteButton}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 bg-white/70 dark:bg-gray-900/60 hover:bg-violet-50 dark:hover:bg-violet-950/50 px-4 py-2.5 rounded-full transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Paste
            <kbd className="hidden sm:inline text-[10px] font-mono bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-400 px-1.5 py-0.5 rounded">
              {isMac ? '⌘V' : 'Ctrl+V'}
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
