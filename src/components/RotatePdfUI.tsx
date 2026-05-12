'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

function isPdfjsPasswordError(e: unknown): boolean {
  return (e as { name?: string })?.name === 'PasswordException';
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function rotationLabel(deg: number): string {
  const norm = ((deg % 360) + 360) % 360;
  if (norm === 0)   return 'No rotation';
  if (norm === 90)  return '90° right';
  if (norm === 180) return '180°';
  return '90° left';
}

export function RotatePdfUI() {
  const [file,           setFile]           = useState<File | null>(null);
  // cumulative rotation delta in degrees (multiples of 90)
  const [rotation,       setRotation]       = useState(0);
  const [isWorking,      setIsWorking]      = useState(false);
  const [result,         setResult]         = useState<Uint8Array | null>(null);
  const [resultUrl,      setResultUrl]      = useState<string | null>(null);
  const [error,          setError]          = useState<string | null>(null);
  const [downloaded,     setDownloaded]     = useState(false);
  const [previewUrl,     setPreviewUrl]     = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [snapTransition, setSnapTransition] = useState(true);
  const [pdfPassword,    setPdfPassword]    = useState<string | null>(null);
  const [needsPassword,  setNeedsPassword]  = useState(false);
  const [wrongPassword,  setWrongPassword]  = useState(false);

  const renderPreview = useCallback(async (f: File, pw?: string) => {
    const password = pw ?? undefined;
    setPreviewLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const bytes    = new Uint8Array(await f.arrayBuffer());
      const pdf      = await pdfjsLib.getDocument({ data: bytes, ...(password ? { password } : {}) }).promise;
      const page     = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas   = document.createElement('canvas');
      canvas.width   = Math.floor(viewport.width);
      canvas.height  = Math.floor(viewport.height);
      await page.render({ canvas, viewport }).promise;
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85));
      pdf.destroy();
    } catch (e) {
      if (isPdfjsPasswordError(e)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      }
      // other preview failures are non-fatal
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    setResult(null);
    setError(null);
    setRotation(0);
    setSnapTransition(true);
    setPreviewUrl(null);
    renderPreview(f);
  }, [renderPreview]);

  const apply = useCallback(async (pw?: string) => {
    const password = pw ?? pdfPassword ?? undefined;
    if (!file) return;
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const bytes  = new Uint8Array(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfDoc = await PDFDocument.load(bytes, (password ? { password } : { ignoreEncryption: true }) as any);
      for (const page of pdfDoc.getPages()) {
        page.setRotation(degrees(page.getRotation().angle + rotation));
      }
      const outBytes = await pdfDoc.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return url; });
      setResult(outBytes);
    } catch (err) {
      if (isEncryptError(err)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError((err as Error).message || 'Rotation failed. Please try again.');
      }
    } finally {
      setIsWorking(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, rotation, pdfPassword]);

  const download = useCallback(() => {
    if (!result || !file) return;
    const blob = new Blob([result.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.pdf$/i, '') + '-rotated.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }, [result, file]);

  const resetFile = () => {
    setFile(null);
    setResult(null);
    setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setError(null);
    setPreviewUrl(null);
    setRotation(0);
    setPdfPassword(null);
    setNeedsPassword(false);
    setWrongPassword(false);
  };

  const norm = ((rotation % 360) + 360) % 360;

  const resetRotation = () => {
    if (norm === 0) return;
    // Step 1: disable transition and snap to the equivalent normalized angle (same visual, no animation)
    setSnapTransition(false);
    setRotation(norm);
    // Step 2: after the browser paints the snapped position, re-enable transition and animate the short arc to 0
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setSnapTransition(true);
      setRotation(0);
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">

      {!file && (
        <div className="mt-6">
          <DropZone
            onFiles={handleFiles}
            accept={['application/pdf']}
            multiple={false}
            label="Drop your PDF here"
            hint="PDF files only · processed entirely in your browser"
            browseLabel="Browse PDF"
            fileTypeName="PDF"
          />
        </div>
      )}

      {file && !result && (
        <div className="mt-6 space-y-4">

          {/* Password prompt */}
          {needsPassword && (
            <PdfPasswordPrompt
              filename={file.name}
              onSubmit={(pw) => {
                setPdfPassword(pw);
                setNeedsPassword(false);
                setWrongPassword(false);
                renderPreview(file, pw);
              }}
              wrongPassword={wrongPassword}
            />
          )}

          {/* File card */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={resetFile} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Page 1 preview */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 py-8 min-h-75 md:min-h-110">
              {previewLoading && (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span className="text-xs">Loading preview…</span>
                </div>
              )}
              {previewUrl && !previewLoading && (
                <img
                  src={previewUrl}
                  alt="Page 1 preview"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: snapTransition ? 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none',
                  }}
                  className="object-contain rounded shadow-md max-h-50 max-w-50 md:max-h-90 md:max-w-90"
                />
              )}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Page 1 preview</span>
              <span className={`text-xs font-medium ${norm === 0 ? 'text-slate-400' : 'text-violet-500'}`}>
                {rotationLabel(rotation)}
              </span>
            </div>
          </div>

          {/* Rotation controls */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rotate all pages</p>
              {norm !== 0 && (
                <button
                  onClick={resetRotation}
                  className="text-xs font-medium text-amber-500 hover:text-amber-600 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {/* Left */}
              <button
                onClick={() => setRotation((r) => r - 90)}
                className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-medium transition-all"
              >
                <svg className="w-6 h-6 scale-x-[-1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Left
              </button>
              {/* Right */}
              <button
                onClick={() => setRotation((r) => r + 90)}
                className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 text-xs font-medium transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Right
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Apply button */}
          <button
            onClick={() => apply()}
            disabled={isWorking || norm === 0 || needsPassword}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all"
          >
            {isWorking ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Rotating…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Rotate PDF
              </>
            )}
          </button>
        </div>
      )}

      {result && file && (
        <div className="mt-6 space-y-4">

          {/* Success header */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Rotation applied</p>
              <p className="text-xs text-slate-500 truncate">{file.name} · {formatBytes(result.byteLength)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => { download(); setDownloaded(true); setTimeout(() => setDownloaded(false), 1500); }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloaded ? 'Downloaded ✓' : 'Download PDF'}
            </button>
            <button
              onClick={() => resultUrl && window.open(resultUrl, '_blank')}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-300 dark:border-violet-700/70 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/50 text-violet-600 dark:text-violet-300 font-semibold text-sm py-2.5 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View in Browser
            </button>
          </div>
          <button
            onClick={resetFile}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 dark:hover:border-gray-600 transition-colors"
          >
            New File
          </button>
        </div>
      )}
    </div>
  );
}
