'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_FREE_MB = 50;

interface Props {
  onFiles: (files: File[]) => void;
  accept?: string[];
  multiple?: boolean;
  label?: string;
  hint?: string;
  browseLabel?: string;
  fileTypeName?: string;
}

export function DropZone({
  onFiles,
  accept = IMAGE_TYPES,
  multiple = true,
  label = 'Drop your images here',
  hint,
  browseLabel = 'Browse Files',
  fileTypeName,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [pasteFlash, setPasteFlash] = useState(false);
  const [securityFlash, setSecurityFlash] = useState(false);
  const [isMac, setIsMac] = useState(false);

  function triggerSecurityFlash() {
    setSecurityFlash(true);
    setTimeout(() => setSecurityFlash(false), 2200);
  }
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf = accept.includes('application/pdf');

  const resolvedHint = hint ?? (
    isPdf
      ? 'PDF files only — processed entirely in your browser'
      : `JPG · PNG · WebP · SVG · up to ${MAX_FREE_MB} MB each`
  );

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  const filterFiles = useCallback((raw: File[]): File[] => {
    return raw.filter(
      (f) => accept.includes(f.type) && f.size <= MAX_FREE_MB * 1024 * 1024
    );
  }, [accept]);

  const handlePastedItems = useCallback(
    (items: DataTransferItemList) => {
      const files: File[] = [];
      for (const item of Array.from(items)) {
        if (item.kind === 'file') {
          const f = item.getAsFile();
          if (f) files.push(f);
        }
      }
      const valid = filterFiles(files);
      if (valid.length) {
        setPasteFlash(true);
        setTimeout(() => setPasteFlash(false), 600);
        triggerSecurityFlash();
        onFiles(valid);
      }
    },
    [onFiles, filterFiles],
  );

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      handlePastedItems(e.clipboardData.items);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [handlePastedItems]);

  const handlePasteButton = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const items = await navigator.clipboard.read();
        const files: File[] = [];
        for (const item of items) {
          const imageType = item.types.find((t) => accept.includes(t));
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
          triggerSecurityFlash();
          onFiles(valid);
        }
      } catch {
        // Permission denied or no image in clipboard
      }
    },
    [onFiles, filterFiles, accept],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const valid = filterFiles(Array.from(e.dataTransfer.files));
      if (valid.length) { triggerSecurityFlash(); onFiles(valid); }
    },
    [onFiles, filterFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const valid = filterFiles(Array.from(e.target.files));
        if (valid.length) { triggerSecurityFlash(); onFiles(valid); }
        e.target.value = '';
      }
    },
    [onFiles, filterFiles]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Drop files here or click to upload"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      className={`group relative rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 select-none overflow-hidden ${
        pasteFlash
          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 shadow-xl shadow-emerald-500/20'
          : isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-2xl shadow-blue-500/25 scale-[1.01]'
          : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-transparent hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:bg-blue-50/30 dark:hover:bg-blue-500/5'
      }`}
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />

      {/* Security flash — appears briefly after files are added */}
      <div className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-2.5 px-4 py-3 bg-emerald-500/10 dark:bg-emerald-500/15 border-t border-emerald-500/20 rounded-b-3xl transition-all duration-500 pointer-events-none ${
        securityFlash ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      }`}>
        <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Processing securely on your device — no data sent to any server
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept.join(',')}
        className="hidden"
        onChange={handleChange}
      />

      <div className="relative flex flex-col items-center gap-5">

        {/* Icon with glow ring */}
        <div className="relative">
          <div className={`absolute -inset-4 rounded-full blur-2xl bg-blue-500/25 transition-opacity duration-500 ${
            isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
          }`} />
          <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 bg-linear-to-br from-blue-500 via-blue-600 to-violet-600 ${
            isDragging
              ? 'scale-110 shadow-2xl shadow-blue-600/50'
              : 'shadow-xl shadow-blue-500/35 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/45'
          }`}>
            <svg
              className={`w-10 h-10 text-white transition-transform duration-300 ${
                isDragging ? '-translate-y-1.5' : 'group-hover:-translate-y-1'
              }`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>
        </div>

        {/* Heading + subtext */}
        <div className="space-y-2">
          <p className={`text-2xl font-bold tracking-tight transition-colors duration-200 ${
            isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
          }`}>
            {isDragging ? 'Release to upload' : label}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {resolvedHint}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div className="relative group/privtip">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {browseLabel}
              {/* Info icon */}
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
            {/* Privacy tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 opacity-0 group-hover/privtip:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
              <div className="bg-slate-900 dark:bg-slate-800 border border-slate-700/80 text-white text-[11px] px-3.5 py-2.5 rounded-xl shadow-xl leading-relaxed">
                <span className="text-emerald-400 font-semibold">Privacy Note:</span> We use your browser&apos;s hardware to process this file. Your {fileTypeName ?? (isPdf ? 'PDF' : 'image')} stays on your computer throughout the entire process — nothing is transmitted.
              </div>
              <div className="w-2.5 h-2.5 bg-slate-900 dark:bg-slate-800 border-r border-b border-slate-700/80 rotate-45 mx-auto -mt-1.5" />
            </div>
          </div>

          {!isPdf && (
            <button
              type="button"
              onClick={handlePasteButton}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 px-4 py-3 rounded-xl transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Paste
              <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                {isMac ? '⌘V' : 'Ctrl+V'}
              </kbd>
            </button>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 flex-wrap text-[11px] font-medium text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            No upload
          </span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            100% private
          </span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Instant
          </span>
        </div>

      </div>
    </div>
  );
}
