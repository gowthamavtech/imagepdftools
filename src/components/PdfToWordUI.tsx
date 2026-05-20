'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';

interface TextLine {
  text: string;
  fontSize: number;
  isBold: boolean;
  y: number;
  pageIndex: number;
}

interface ExtractionResult {
  lines: TextLine[];
  pageCount: number;
  filename: string;
  wordCount: number;
}

async function extractTextFromPdf(file: File): Promise<ExtractionResult> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  const buf = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

  const lines: TextLine[] = [];
  let runningY = 0;

  for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();

    // Collect items with positions
    const items: { text: string; x: number; y: number; h: number; bold: boolean }[] = [];
    for (const item of content.items) {
      if (!('str' in item) || !item.str.trim()) continue;
      const [, , , h, x, yRaw] = item.transform as number[];
      // PDF y origin is bottom-left; convert to top-left
      const y = viewport.height - yRaw;
      items.push({ text: item.str, x, y, h: Math.abs(h), bold: false });
    }

    // Sort top to bottom
    items.sort((a, b) => a.y - b.y || a.x - b.x);

    // Group items into lines (items within 4px vertically are on the same line)
    const groups: typeof items[] = [];
    for (const item of items) {
      const last = groups[groups.length - 1];
      if (last && Math.abs(item.y - last[0].y) < 4) {
        last.push(item);
      } else {
        groups.push([item]);
      }
    }

    // Convert groups → TextLines, tracking inter-line gaps
    let prevY = 0;
    let prevH = 12;
    for (const group of groups) {
      const text = group.map((i) => i.text).join(' ').trim();
      if (!text) continue;
      const fontSize = Math.max(...group.map((i) => i.h));
      const y = group[0].y;

      // Insert blank line on big vertical gap (paragraph break)
      if (prevY > 0 && y - prevY > prevH * 1.8) {
        lines.push({ text: '', fontSize: 11, isBold: false, y: runningY, pageIndex });
        runningY++;
      }

      lines.push({ text, fontSize, isBold: fontSize > 14, y: runningY, pageIndex });
      runningY++;
      prevY = y;
      prevH = fontSize;
    }

    // Page break as blank line
    if (pageIndex < pdf.numPages - 1) {
      lines.push({ text: '', fontSize: 11, isBold: false, y: runningY, pageIndex });
      runningY++;
    }
  }

  const wordCount = lines.filter((l) => l.text).reduce((s, l) => s + l.text.split(/\s+/).length, 0);

  return {
    lines,
    pageCount: pdf.numPages,
    filename: file.name.replace(/\.pdf$/i, '.docx'),
    wordCount,
  };
}

async function buildDocx(result: ExtractionResult): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

  const children = result.lines.map((line) => {
    if (!line.text) return new Paragraph({});

    const isH1 = line.fontSize > 20;
    const isH2 = line.fontSize > 15 && line.fontSize <= 20;

    return new Paragraph({
      heading: isH1 ? HeadingLevel.HEADING_1 : isH2 ? HeadingLevel.HEADING_2 : undefined,
      children: [
        new TextRun({
          text: line.text,
          bold: line.isBold && !isH1 && !isH2,
          size: Math.round(Math.min(Math.max(line.fontSize, 11), 28)) * 2, // half-points
          font: 'Calibri',
        }),
      ],
    });
  });

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}

export function PdfToWordUI() {
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isBuilding, setIsBuilding]   = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.name.match(/\.pdf$/i)) {
      setError('Please upload a .pdf file.');
      return;
    }
    setError(null);
    setExtraction(null);
    setIsExtracting(true);
    try {
      const result = await extractTextFromPdf(file);
      if (result.wordCount === 0) {
        setError('No text could be extracted. This may be a scanned PDF or image-only document. Scanned PDFs require OCR, which is not supported in the browser.');
        return;
      }
      setExtraction(result);
    } catch {
      setError('Failed to read the PDF. Make sure it is a valid, non-password-protected PDF file.');
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const downloadDocx = useCallback(async () => {
    if (!extraction) return;
    setIsBuilding(true);
    setError(null);
    try {
      const blob = await buildDocx(extraction);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = extraction.filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      setError('Failed to build the Word document. Please try a different PDF.');
    } finally {
      setIsBuilding(false);
    }
  }, [extraction]);

  const reset = useCallback(() => {
    setExtraction(null);
    setError(null);
  }, []);

  // Preview: first 60 lines
  const previewLines = extraction?.lines.slice(0, 60) ?? [];

  return (
    <div className="rounded-[16px] bg-surface bd-2 overflow-hidden" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">PDF to Word</span>
        {extraction && (
          <div className="flex items-center gap-3">
            <span className="font-data text-[11px] text-fg-3">{extraction.pageCount} page{extraction.pageCount !== 1 ? 's' : ''} · ~{extraction.wordCount.toLocaleString()} words</span>
            <button onClick={reset} className="h-8 px-3 rounded-lg bd-2 text-[12px] text-fg-2 hover:text-fg-1 transition-colors">New file</button>
          </div>
        )}
      </div>

      {/* ── Drop zone ── */}
      {!extraction && !isExtracting && (
        <div className="p-5">
          <DropZone onFiles={handleFiles} accept={['application/pdf']} />
          {/* Honest limitation notice */}
          <div className="mt-4 flex items-start gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-4 py-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-amber-400" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-[12px] text-amber-300/90 leading-[1.6] m-0">
              Works best for text-based PDFs. Scanned or image-only PDFs cannot be converted (no OCR). Complex tables and multi-column layouts may need manual cleanup.
            </p>
          </div>
          <p className="text-center text-[12px] text-fg-3 mt-3">Zero upload — PDF processed entirely in your browser</p>
        </div>
      )}

      {/* ── Extracting ── */}
      {isExtracting && (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <svg className="w-6 h-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-[13px] text-fg-2">Extracting text…</span>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-red-400" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[13px] text-red-400 leading-[1.5]">{error}</span>
        </div>
      )}

      {/* ── Preview + download ── */}
      {extraction && !isExtracting && (
        <>
          {/* Text preview */}
          <div className="mx-5 my-4">
            <div className="overflow-auto rounded-[10px] bd-2 bg-white dark:bg-[#111]" style={{ maxHeight: 480 }}>
              <div className="p-6 space-y-0.5">
                {previewLines.map((line, i) => {
                  if (!line.text) return <div key={i} className="h-3" />;
                  const isH1 = line.fontSize > 20;
                  const isH2 = line.fontSize > 15 && line.fontSize <= 20;
                  return (
                    <p
                      key={i}
                      className="m-0 leading-[1.65] text-[#1a1a1a] dark:text-[#f0f0f0]"
                      style={{
                        fontSize: isH1 ? 20 : isH2 ? 15 : 13,
                        fontWeight: isH1 || isH2 || line.isBold ? 700 : 400,
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {line.text}
                    </p>
                  );
                })}
                {(extraction.lines.length > 60) && (
                  <p className="text-[11px] text-fg-3 pt-3 font-medium">… {(extraction.lines.length - 60)} more lines in the downloaded document</p>
                )}
              </div>
            </div>
          </div>

          {/* Download */}
          <div className="px-5 pb-5">
            <button
              onClick={downloadDocx}
              disabled={isBuilding}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
            >
              {isBuilding ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Building document…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download DOCX — {extraction.filename}
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-fg-3 mt-2">No upload · No watermark · Open directly in Microsoft Word or Google Docs</p>
          </div>
        </>
      )}
    </div>
  );
}
