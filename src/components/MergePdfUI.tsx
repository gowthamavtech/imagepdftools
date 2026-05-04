'use client';

import { useState, useCallback, useRef } from 'react';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

interface PdfEntry {
  id: string;
  file: File;
  pageCount: number | null;
  locked: boolean;
  password: string | null;
  wrongPassword: boolean;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

async function getPageCount(file: File, password?: string): Promise<number> {
  const { PDFDocument } = await import('pdf-lib');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

export function MergePdfUI() {
  const [entries,   setEntries]   = useState<PdfEntry[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [error,     setError]     = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [downloaded, setDownloaded] = useState(false);
  const idCounter = useRef(0);

  const addFiles = useCallback(async (files: File[]) => {
    const pdfs = files.filter((f) => f.type === 'application/pdf');
    if (pdfs.length === 0) {
      setError('Please upload PDF files only.');
      return;
    }
    setError(null);
    const newEntries: PdfEntry[] = pdfs.map((f) => ({
      id: `pdf-${++idCounter.current}`,
      file: f,
      pageCount: null,
      locked: false,
      password: null,
      wrongPassword: false,
    }));
    setEntries((prev) => [...prev, ...newEntries]);

    // load page counts in background; mark locked if encrypted
    for (const entry of newEntries) {
      getPageCount(entry.file)
        .then((count) => {
          setEntries((prev) =>
            prev.map((e) => (e.id === entry.id ? { ...e, pageCount: count } : e)),
          );
        })
        .catch((err) => {
          if (isEncryptError(err)) {
            setEntries((prev) =>
              prev.map((e) => (e.id === entry.id ? { ...e, locked: true } : e)),
            );
          }
        });
    }
  }, []);

  const remove = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setError(null);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setEntries((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setEntries((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const merge = useCallback(async () => {
    if (entries.length < 2) {
      setError('Add at least 2 PDF files to merge.');
      return;
    }
    setIsWorking(true);
    setError(null);
    setProgress(0);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const bytes = new Uint8Array(await entry.file.arrayBuffer());
        const pw = entry.password ?? undefined;
        const doc = await PDFDocument.load(bytes, pw ? { password: pw } : {});
        const indices = doc.getPageIndices();
        const copied = await merged.copyPages(doc, indices);
        copied.forEach((p) => merged.addPage(p));
        setProgress(Math.round(((i + 1) / entries.length) * 100));
      }

      const outBytes = await merged.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(outBytes.byteLength);
    } catch (err) {
      if (isEncryptError(err)) {
        setError('One or more PDFs are password-protected. Please unlock them before merging.');
      } else {
        setError((err as Error).message || 'Merge failed. Please try again.');
      }
    } finally {
      setIsWorking(false);
    }
  }, [entries]);

  const download = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'merged.pdf';
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
  }, [resultUrl]);

  const reset = () => {
    setEntries([]);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setError(null);
    setProgress(0);
    setResultSize(0);
  };

  const totalPages = entries.reduce((s, e) => s + (e.pageCount ?? 0), 0);
  const totalSize  = entries.reduce((s, e) => s + e.file.size, 0);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      {/* Result */}
      {resultUrl && (
        <div className="mt-6 space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Merge complete</p>
                <p className="text-xs text-slate-500">
                  {entries.length} files · {totalPages > 0 ? `${totalPages} pages · ` : ''}{formatBytes(totalSize)} → {formatBytes(resultSize)}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={download}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloaded ? 'Downloaded ✓' : 'Download PDF'}
              </button>
              <button onClick={() => window.open(resultUrl, '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-blue-950/20 hover:bg-violet-100 dark:hover:bg-blue-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preview
              </button>
            </div>
          </div>
          <button onClick={reset}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600 transition-colors">
            Start Over
          </button>
        </div>
      )}

      {!resultUrl && (
        <div className="mt-6 space-y-4">

          {/* Drop zone */}
          <DropZone
            onFiles={addFiles}
            accept={['application/pdf']}
            multiple
            label="Drop PDF files here"
            hint="Multiple PDFs · merged in order · all processing stays in your browser"
            browseLabel="Browse PDFs"
            fileTypeName="PDF"
          />

          {/* File list */}
          {entries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {entries.length} file{entries.length !== 1 ? 's' : ''} · {totalPages > 0 ? `${totalPages} pages · ` : ''}{formatBytes(totalSize)}
                </p>
                <button onClick={() => setEntries([])} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
                  Clear all
                </button>
              </div>

              {entries.map((entry, idx) => (
                <div key={entry.id} className="space-y-2">
                <div
                  className={`flex items-center gap-3 bg-white dark:bg-slate-800 border rounded-xl px-3 py-2.5 shadow-sm ${entry.locked ? 'border-amber-300 dark:border-amber-700' : 'border-slate-200 dark:border-white/8'}`}>

                  {/* Order badge */}
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>

                  {/* PDF / lock icon */}
                  {entry.locked ? (
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">{entry.file.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {formatBytes(entry.file.size)}
                      {entry.locked ? ' · password required' : entry.pageCount !== null ? ` · ${entry.pageCount}p` : ''}
                    </p>
                  </div>

                  {/* Move up/down */}
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => moveUp(idx)} disabled={idx === 0}
                      className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                    <button onClick={() => moveDown(idx)} disabled={idx === entries.length - 1}
                      className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Remove */}
                  <button onClick={() => remove(entry.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Per-entry password prompt */}
                {entry.locked && (
                  <PdfPasswordPrompt
                    filename={entry.file.name}
                    onSubmit={(pw) => {
                      setEntries((prev) => prev.map((e) =>
                        e.id === entry.id ? { ...e, password: pw, locked: false, wrongPassword: false } : e,
                      ));
                      getPageCount(entry.file, pw)
                        .then((count) => setEntries((prev) => prev.map((e) =>
                          e.id === entry.id ? { ...e, pageCount: count } : e,
                        )))
                        .catch(() => setEntries((prev) => prev.map((e) =>
                          e.id === entry.id ? { ...e, locked: true, wrongPassword: true } : e,
                        )));
                    }}
                    wrongPassword={entry.wrongPassword}
                  />
                )}
                </div>
              ))}
            </div>
          )}

          {/* Progress */}
          {isWorking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Merging…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Merge button */}
          <button onClick={merge} disabled={isWorking || entries.length < 2 || entries.some((e) => e.locked)}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all">
            {isWorking ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Merging…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
                </svg>
                Merge {entries.length >= 2 ? `${entries.length} PDFs` : 'PDFs'}
              </>
            )}
          </button>

          {entries.length < 2 && entries.length > 0 && (
            <p className="text-center text-xs text-slate-400">Add at least one more PDF to merge</p>
          )}
        </div>
      )}
    </div>
  );
}
