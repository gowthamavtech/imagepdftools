'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

type Position = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
type Format   = 'number' | 'page-n' | 'n-of-total';

const POSITIONS: { value: Position; label: string }[] = [
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-left',   label: 'Bottom Left' },
  { value: 'bottom-right',  label: 'Bottom Right' },
  { value: 'top-center',    label: 'Top Center' },
  { value: 'top-left',      label: 'Top Left' },
  { value: 'top-right',     label: 'Top Right' },
];

const FORMATS: { value: Format; label: string; example: string }[] = [
  { value: 'number',    label: 'Number',      example: '1' },
  { value: 'page-n',   label: 'Page N',       example: 'Page 1' },
  { value: 'n-of-total', label: 'N of Total', example: '1 of 5' },
];

export function NumberPdfUI() {
  const [file,        setFile]       = useState<File | null>(null);
  const [position,    setPosition]   = useState<Position>('bottom-center');
  const [format,      setFormat]     = useState<Format>('number');
  const [startNum,    setStartNum]   = useState(1);
  const [fontSize,    setFontSize]   = useState(11);
  const [isWorking,   setIsWorking]  = useState(false);
  const [error,       setError]      = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    setResultBytes(null);
    setError(null);
  }, []);

  const apply = async () => {
    if (!file) return;
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const bytes  = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(bytes);
      const font   = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages  = pdfDoc.getPages();
      const total  = pages.length;
      const margin = 28;

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const pageNum = startNum + i;
        const label =
          format === 'number'     ? `${pageNum}` :
          format === 'page-n'     ? `Page ${pageNum}` :
          `${pageNum} of ${startNum + total - 1}`;

        const textWidth = font.widthOfTextAtSize(label, fontSize);

        let x: number;
        if (position.endsWith('center')) x = (width - textWidth) / 2;
        else if (position.endsWith('left')) x = margin;
        else x = width - textWidth - margin;

        const y = position.startsWith('top') ? height - margin : margin;

        page.drawText(label, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
        });
      });

      setResultBytes(await pdfDoc.save());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to add page numbers.');
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!resultBytes || !file) return;
    const blob = new Blob([resultBytes], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.pdf$/i, '-numbered.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => { setFile(null); setResultBytes(null); setError(null); };

  return (
    <div className="max-w-xl mx-auto px-4 space-y-5">

      {/* Drop zone */}
      {!file ? (
        <DropZone onFiles={handleFiles} accept={['application/pdf']} label="Drop your PDF here" />
      ) : (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-3 min-w-0">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</p>
              <p className="text-xs text-slate-400">{formatBytes(file.size)}</p>
            </div>
          </div>
          <button onClick={reset} className="text-xs text-slate-400 hover:text-red-500 shrink-0 transition-colors">Remove</button>
        </div>
      )}

      {/* Options */}
      {file && !resultBytes && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-5">

          {/* Position */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Position</label>
            <div className="grid grid-cols-3 gap-2">
              {POSITIONS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPosition(p.value)}
                  className={`py-2 rounded-lg text-xs font-medium transition-colors border ${
                    position === p.value
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Format</label>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    format === f.value
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <span className="block font-bold">{f.example}</span>
                  <span className="opacity-70">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Start number + Font size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Start At</label>
              <input
                type="number"
                min={1}
                max={9999}
                value={startNum}
                onChange={(e) => setStartNum(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Font Size</label>
              <input
                type="number"
                min={8}
                max={24}
                value={fontSize}
                onChange={(e) => setFontSize(Math.min(24, Math.max(8, parseInt(e.target.value) || 11)))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

          <button
            onClick={apply}
            disabled={isWorking}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isWorking ? 'Adding page numbers…' : 'Add Page Numbers'}
          </button>
        </div>
      )}

      {/* Result */}
      {resultBytes && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-center space-y-3">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Page numbers added!</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">{formatBytes(resultBytes.length)} · ready to download</p>
          <div className="flex gap-3 justify-center">
            <button onClick={download} className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors">Download PDF</button>
            <button onClick={reset} className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors hover:border-slate-300 dark:hover:border-slate-500">Start over</button>
          </div>
        </div>
      )}
    </div>
  );
}
