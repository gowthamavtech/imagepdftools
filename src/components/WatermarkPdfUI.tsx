'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';
import { PdfPasswordPrompt } from './PdfPasswordPrompt';

function isEncryptError(e: unknown): boolean {
  const msg = String(e).toLowerCase();
  return msg.includes('encrypt') || msg.includes('password') || msg.includes('decrypt');
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

const PRESETS = [
  { label: 'CONFIDENTIAL', color: '#dc2626' },
  { label: 'DRAFT',        color: '#d97706' },
  { label: 'SAMPLE',       color: '#2563eb' },
  { label: 'DO NOT COPY',  color: '#7c3aed' },
  { label: 'Custom',       color: null },
];

export function WatermarkPdfUI() {
  const [file,          setFile]          = useState<File | null>(null);
  const [text,          setText]          = useState('CONFIDENTIAL');
  const [customColor,   setCustomColor]   = useState('#dc2626');
  const [opacity,       setOpacity]       = useState(20);
  const [fontSize,      setFontSize]      = useState(60);
  const [isWorking,     setIsWorking]     = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [resultBytes,   setResultBytes]   = useState<Uint8Array | null>(null);
  const [pdfPassword,   setPdfPassword]   = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const activePreset = PRESETS.find((p) => p.label === text && p.color !== null) ?? PRESETS[PRESETS.length - 1];

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    setResultBytes(null);
    setError(null);
  }, []);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b };
  };

  const apply = async (pw?: string) => {
    const password = pw ?? pdfPassword ?? undefined;
    if (!file || !text.trim()) return;
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await import('pdf-lib');
      const bytes   = new Uint8Array(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfDoc  = await PDFDocument.load(bytes, (password ? { password } : { ignoreEncryption: true }) as any);
      const font    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(customColor);

      pdfDoc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth  = font.widthOfTextAtSize(text, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        page.drawText(text, {
          x:       (width  - textWidth)  / 2,
          y:       (height - textHeight) / 2,
          size:    fontSize,
          font,
          color:   rgb(r, g, b),
          opacity: opacity / 100,
          rotate:  degrees(45),
        });
      });

      setResultBytes(await pdfDoc.save());
    } catch (e: unknown) {
      if (isEncryptError(e)) {
        setNeedsPassword(true);
        if (password) setWrongPassword(true);
      } else {
        setError(e instanceof Error ? e.message : 'Failed to add watermark.');
      }
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!resultBytes || !file) return;
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.pdf$/i, '-watermarked.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => { setFile(null); setResultBytes(null); setError(null); setPdfPassword(null); setNeedsPassword(false); setWrongPassword(false); };

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

      {/* Password prompt */}
      {needsPassword && file && !resultBytes && (
        <PdfPasswordPrompt
          filename={file.name}
          onSubmit={(pw) => { setPdfPassword(pw); setNeedsPassword(false); setWrongPassword(false); apply(pw); }}
          wrongPassword={wrongPassword}
        />
      )}

      {/* Options */}
      {file && !resultBytes && !needsPassword && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-5">

          {/* Preset text */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Watermark Text</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESETS.filter((p) => p.color !== null).map((p) => (
                <button
                  key={p.label}
                  onClick={() => { setText(p.label); setCustomColor(p.color!); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    activePreset.label === p.label
                      ? 'border-transparent text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                  style={activePreset.label === p.label ? { backgroundColor: p.color! } : {}}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              maxLength={30}
              placeholder="Or type custom text"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Color + Opacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-800"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{customColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
                Opacity — {opacity}%
              </label>
              <input
                type="range"
                min={5}
                max={60}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
          </div>

          {/* Font size */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
              Size — {fontSize}pt
            </label>
            <input
              type="range"
              min={20}
              max={100}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>

          {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

          <button
            onClick={() => apply()}
            disabled={isWorking || !text.trim()}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isWorking ? 'Adding watermark…' : 'Add Watermark'}
          </button>
        </div>
      )}

      {/* Result */}
      {resultBytes && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-center space-y-3">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Watermark added!</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">{formatBytes(resultBytes.length)} · ready to save</p>
          <div className="flex gap-3 justify-center">
            <button onClick={download} className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors">Save PDF</button>
            <button onClick={reset} className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors hover:border-slate-300 dark:hover:border-slate-500">Start over</button>
          </div>
        </div>
      )}
    </div>
  );
}
