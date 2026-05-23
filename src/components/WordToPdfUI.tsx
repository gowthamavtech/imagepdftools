'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';
import { useDocxConverter, type ConversionStatus } from '@/hooks/useDocxConverter';

type PageSize = 'a4' | 'letter';

interface Preview {
  html: string;
  filename: string;
  warnings: string[];
  file: File;
}

const PAGE_PX: Record<PageSize, number> = { a4: 794, letter: 816 };
const MARGIN_PX = 72;

function statusLabel(status: ConversionStatus, progress: string): string {
  if (progress) return progress;
  switch (status) {
    case 'parsing':    return 'Reading document…';
    case 'font-query': return 'Requesting font access…';
    case 'converting': return 'Converting…';
    default:           return 'Processing…';
  }
}

function progressPercent(status: ConversionStatus, progress: string): number {
  if (progress.includes('Parsing') || status === 'parsing')           return 15;
  if (progress.includes('font') || status === 'font-query')           return 35;
  if (progress.includes('Pandoc WASM'))                               return 52;
  if (progress.includes('Converting document'))                       return 66;
  if (progress.includes('Typst compiler'))                            return 80;
  if (progress.includes('Compiling'))                                 return 92;
  if (status === 'done')                                              return 100;
  return 8;
}

export function WordToPdfUI() {
  const [preview, setPreview]     = useState<Preview | null>(null);
  const [pageSize, setPageSize]   = useState<PageSize>('a4');
  const [isReading, setIsReading] = useState(false);
  const [readError, setReadError] = useState<string | null>(null);

  const { status, progress, pdfBlob, error, fontCount, convert, reset } =
    useDocxConverter();

  const isConverting = status === 'parsing' || status === 'font-query' || status === 'converting';
  const isDone = status === 'done';
  const containerW = PAGE_PX[pageSize];

  // ── File load (preview only — mammoth HTML, instant, no WASM) ──────────────
  const loadFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.docx?$/i)) {
      setReadError('Only .docx files are supported.');
      return;
    }
    setReadError(null);
    setPreview(null);
    reset();
    setIsReading(true);
    try {
      const mammoth = await import('mammoth');
      const buf = await file.arrayBuffer();
      const result = await mammoth.default.convertToHtml({ arrayBuffer: buf });
      setPreview({
        html: result.value,
        filename: file.name.replace(/\.docx?$/i, '.pdf'),
        warnings: result.messages
          .filter((m) => m.type === 'warning')
          .map((m) => m.message),
        file,
      });
    } catch {
      setReadError('Could not read the file. Make sure it is a valid .docx file.');
    } finally {
      setIsReading(false);
    }
  }, [reset]);

  const handleDrop = useCallback(
    (files: File[]) => { if (files[0]) loadFile(files[0]); },
    [loadFile]
  );

  // ── Conversion — hand off to the worker via the hook ───────────────────────
  const handleConvert = useCallback(() => {
    if (!preview) return;
    convert(preview.file, pageSize);
  }, [preview, pageSize, convert]);

  // ── Download ───────────────────────────────────────────────────────────────
  const download = useCallback(() => {
    if (!pdfBlob || !preview) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = preview.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }, [pdfBlob, preview]);

  // ── Full reset ─────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setPreview(null);
    setReadError(null);
    reset();
  }, [reset]);

  const displayError = readError ?? error;

  return (
    <div
      className="rounded-2xl bg-surface bd-2 overflow-hidden"
      style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">
          Word to PDF
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center h-8 rounded-lg bd-2 overflow-hidden text-[12px] font-medium">
            {(['a4', 'letter'] as PageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setPageSize(s)}
                className={`px-3 h-full transition-colors ${
                  pageSize === s ? 'bg-accent text-white' : 'text-fg-2 hover:text-fg-1'
                }`}
              >
                {s === 'a4' ? 'A4' : 'Letter'}
              </button>
            ))}
          </div>
          {!preview && (
            <span className="text-[11px] text-fg-3 font-data">.docx only</span>
          )}
        </div>
      </div>

      {/* ── Drop zone ── */}
      {!preview && !isReading && (
        <div className="p-5">
          <DropZone
            onFiles={handleDrop}
            accept={[
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword',
            ]}
          />
          <p className="text-center text-[12px] text-fg-3 mt-3">
            Supports .docx — processed in your browser, nothing uploaded
          </p>
        </div>
      )}

      {/* ── Reading spinner ── */}
      {isReading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Spinner />
          <span className="text-[13px] text-fg-2">Reading document…</span>
        </div>
      )}

      {/* ── Error banner ── */}
      {displayError && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <ErrorIcon />
          <span className="text-[13px] text-red-400 leading-normal">
            {displayError}
          </span>
        </div>
      )}

      {/* ── Converting: full centered progress ── */}
      {preview && isConverting && (
        <div className="flex flex-col items-center justify-center gap-5 py-16 px-8">
          <svg className="w-12 h-12 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="var(--border-1)" strokeWidth="4" />
            <path d="M44 24a20 20 0 0 0-20-20" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-center space-y-1">
            <p className="text-[17px] font-bold text-fg-1 tracking-[-0.02em]">Converting Word to PDF…</p>
            <p className="font-data text-[12px] text-fg-3">
              {statusLabel(status, progress)} · {progressPercent(status, progress)}%
            </p>
          </div>
          <div className="w-full max-w-70">
            <div className="h-0.75 w-full rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent(status, progress)}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Preview + controls (idle / done) ── */}
      {preview && !isReading && !isConverting && (
        <>
          {/* Formatting-loss warning */}
          {preview.warnings.length > 0 && (
            <div className="mx-5 mt-4 flex items-start gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-4 py-3">
              <WarnIcon />
              <span className="text-[12px] text-amber-400 leading-normal">
                Some formatting may differ from the original (complex tables,
                custom fonts, text boxes).
              </span>
            </div>
          )}

          {/* Mammoth HTML preview */}
          <div className="relative mx-5 my-4">
            <div
              className="overflow-auto rounded-[10px] bd-2"
              style={{ maxHeight: 520, background: '#f5f5f0' }}
            >
              <div className="flex justify-center py-6 px-4">
                <div
                  className="shadow-[0_4px_24px_rgba(0,0,0,0.18)] bg-white"
                  style={{ width: Math.min(containerW, 700), minHeight: 400 }}
                >
                  <div
                    className="docx-preview"
                    style={{ padding: `${MARGIN_PX * 0.8}px ${MARGIN_PX}px` }}
                    dangerouslySetInnerHTML={{ __html: preview.html }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action area */}
          <div className="px-5 pb-5 flex flex-col gap-3">

            {/* ── Convert button ── */}
            {!isDone && (
              <button
                onClick={handleConvert}
                className="btn-accent w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Convert to PDF
              </button>
            )}

            {/* ── Done: save + font badge ── */}
            {isDone && pdfBlob && (
              <>
                <button
                  onClick={download}
                  className="btn-accent w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Save PDF — {preview?.filename}
                </button>
                {fontCount > 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-fg-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {fontCount} system font{fontCount !== 1 ? 's' : ''} matched · vector PDF · fully searchable
                  </div>
                )}
              </>
            )}

            {/* ── Reset ── */}
            <button
              onClick={handleReset}
              className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl bd-2 text-[13px] font-medium text-fg-2 hover:text-fg-1 transition-colors"
            >
              Convert another file
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Small shared icon components ───────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="w-5 h-5 animate-spin text-accent shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 mt-px text-red-400"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 mt-px text-amber-400"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
