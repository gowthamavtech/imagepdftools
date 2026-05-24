'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_FREE_MB = 50;

const DROPBOX_APP_KEY   = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY    ?? '';
const GOOGLE_API_KEY    = process.env.NEXT_PUBLIC_GOOGLE_API_KEY     ?? '';
const GOOGLE_CLIENT_ID  = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID   ?? '';
const ONEDRIVE_CLIENT_ID = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID ?? '';

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
  const [isMac] = useState(() =>
    typeof navigator !== 'undefined' ? /Mac|iPhone|iPad|iPod/.test(navigator.platform) : false
  );
  const [cloudLoading, setCloudLoading] = useState<'dropbox' | 'drive' | 'onedrive' | null>(null);

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

  // ── Dropbox Chooser ─────────────────────────────────────────────────────────
  const handleDropboxPick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!DROPBOX_APP_KEY) return;
    setCloudLoading('dropbox');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (!win.Dropbox) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://www.dropbox.com/static/api/2/dropins.js';
          s.id = 'dropboxjs';
          s.dataset.appKey = DROPBOX_APP_KEY;
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      setCloudLoading(null);
      win.Dropbox.choose({
        success: async (files: { name: string; link: string }[]) => {
          setCloudLoading('dropbox');
          const results: File[] = [];
          for (const f of files) {
            // Append dl=1 to force direct download
            const dl = f.link.replace('?dl=0', '?dl=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
            const res = await fetch(dl);
            const blob = await res.blob();
            results.push(new File([blob], f.name, { type: blob.type || accept[0] }));
          }
          const valid = filterFiles(results);
          if (valid.length) { triggerSecurityFlash(); onFiles(valid); }
          setCloudLoading(null);
        },
        cancel: () => setCloudLoading(null),
        extensions: accept.map((t) => '.' + t.split('/').pop()),
        multiselect: multiple,
        folderselect: false,
        linkType: 'direct',
      });
    } catch {
      setCloudLoading(null);
    }
  }, [onFiles, filterFiles, accept, multiple]);

  // ── Google Drive Picker ─────────────────────────────────────────────────────
  const handleGoogleDrivePick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!GOOGLE_API_KEY || !GOOGLE_CLIENT_ID) return;
    setCloudLoading('drive');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;

      // Load gapi script
      if (!win.gapi) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://apis.google.com/js/api.js';
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      // Load picker lib
      await new Promise<void>((res) => win.gapi.load('picker', res));

      // Load GSI script
      if (!win.google?.accounts) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://accounts.google.com/gsi/client';
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      // Request OAuth token (opens Google popup)
      const token = await new Promise<string>((resolve, reject) => {
        const client = win.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.readonly',
          callback: (resp: { error?: string; access_token: string }) => {
            if (resp.error) reject(new Error(resp.error));
            else resolve(resp.access_token);
          },
        });
        client.requestAccessToken({ prompt: '' });
      });

      // Build and show Picker
      setCloudLoading(null);
      const mimeTypes = accept.join(',');
      const view = new win.google.picker.DocsView().setMimeTypes(mimeTypes);
      new win.google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(token)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setCallback(async (data: { action: string; docs: { id: string; name: string; mimeType: string }[] }) => {
          if (data.action !== 'picked') return;
          setCloudLoading('drive');
          const results: File[] = [];
          for (const doc of data.docs) {
            const res = await fetch(
              `https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const blob = await res.blob();
            results.push(new File([blob], doc.name, { type: doc.mimeType }));
          }
          const valid = filterFiles(results);
          if (valid.length) { triggerSecurityFlash(); onFiles(valid); }
          setCloudLoading(null);
        })
        .build()
        .setVisible(true);
    } catch {
      setCloudLoading(null);
    }
  }, [onFiles, filterFiles, accept]);

  // ── OneDrive Picker ─────────────────────────────────────────────────────────
  const handleOneDrivePick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ONEDRIVE_CLIENT_ID) return;
    setCloudLoading('onedrive');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (!win.OneDrive) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://js.live.net/v7.2/OneDrive.js';
          s.onload = () => resolve();
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      setCloudLoading(null);
      win.OneDrive.open({
        clientId: ONEDRIVE_CLIENT_ID,
        action: 'download',
        multiSelect: multiple,
        success: async (response: { value: { name: string; '@microsoft.graph.downloadUrl': string; file?: { mimeType: string } }[] }) => {
          setCloudLoading('onedrive');
          const results: File[] = [];
          for (const f of response.value) {
            const url = f['@microsoft.graph.downloadUrl'];
            const res = await fetch(url);
            const blob = await res.blob();
            results.push(new File([blob], f.name, { type: f.file?.mimeType ?? blob.type ?? accept[0] }));
          }
          const valid = filterFiles(results);
          if (valid.length) { triggerSecurityFlash(); onFiles(valid); }
          setCloudLoading(null);
        },
        cancel: () => setCloudLoading(null),
        error: () => setCloudLoading(null),
      });
    } catch {
      setCloudLoading(null);
    }
  }, [onFiles, filterFiles, accept, multiple]);

  const showDropbox  = !!DROPBOX_APP_KEY;
  const showDrive    = !!(GOOGLE_API_KEY && GOOGLE_CLIENT_ID);
  const showOneDrive = !!ONEDRIVE_CLIENT_ID;

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
          ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-2xl shadow-violet-500/25 scale-[1.01]'
          : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-transparent hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10 hover:bg-violet-50/30 dark:hover:bg-violet-500/5'
      }`}
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(157,149,245,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(157,149,245,0.14),transparent)] pointer-events-none" />

      {/* Security flash */}
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
          <div className={`absolute -inset-4 rounded-full blur-2xl bg-violet-500/25 transition-opacity duration-500 ${
            isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
          }`} />
          <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 bg-linear-to-br from-violet-500 via-violet-600 to-violet-600 ${
            isDragging
              ? 'scale-110 shadow-2xl shadow-violet-600/50'
              : 'shadow-xl shadow-violet-500/35 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-violet-500/45'
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
            isDragging ? 'text-violet-600 dark:text-violet-400' : 'text-slate-900 dark:text-white'
          }`}>
            {isDragging ? 'Release to upload' : label}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {resolvedHint}
          </p>
        </div>

        {/* Primary buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div className="relative group/privtip">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {browseLabel}
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

        {/* Cloud source buttons */}
        {(showDropbox || showDrive || showOneDrive) && (
          <div className="flex flex-col items-center gap-2.5 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 w-full max-w-xs">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">or pick from</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              {showDrive && (
                <button
                  type="button"
                  onClick={handleGoogleDrivePick}
                  disabled={!!cloudLoading}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 disabled:opacity-60 disabled:cursor-wait px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {cloudLoading === 'drive' ? (
                    <svg className="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    /* Google Drive icon */
                    <svg className="w-4 h-4" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                    </svg>
                  )}
                  Google Drive
                </button>
              )}

              {showDropbox && (
                <button
                  type="button"
                  onClick={handleDropboxPick}
                  disabled={!!cloudLoading}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 disabled:opacity-60 disabled:cursor-wait px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {cloudLoading === 'dropbox' ? (
                    <svg className="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 43 40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 0L0 8.12l8.75 7 12.5-7.88L12.5 0zM30.5 0l-8.75 7.24 12.5 7.88 8.75-7L30.5 0zM0 22.24L12.5 30.5l8.75-7.26-12.5-7.86L0 22.24zM34.25 23.24L43 30.12 30.5 38.24l-8.75-7.12 12.5-7.88zM21.25 24.36L12.5 31.5l-3.75-2.5V32L21.25 40l12.5-8.5v-3l-3.75 2.5-8.75-6.64z" fill="#0061FF"/>
                    </svg>
                  )}
                  Dropbox
                </button>
              )}

              {showOneDrive && (
                <button
                  type="button"
                  onClick={handleOneDrivePick}
                  disabled={!!cloudLoading}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 disabled:opacity-60 disabled:cursor-wait px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {cloudLoading === 'onedrive' ? (
                    <svg className="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 12.5a5.5 5.5 0 0 0-5.19-5.496A4.501 4.501 0 0 0 4.07 9.257 3.75 3.75 0 0 0 4.75 16.5h12.25a3.5 3.5 0 0 0 .5-6.97v-.03z" fill="#0078D4"/>
                    </svg>
                  )}
                  OneDrive
                </button>
              )}
            </div>
          </div>
        )}

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
