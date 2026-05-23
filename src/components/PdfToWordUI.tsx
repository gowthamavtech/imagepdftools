'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';

// ── Types ──────────────────────────────────────────────────────────────────────

interface TextLine {
  text: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  fontFamily: string;
  color: string; // 6-char hex without #, empty = black
  y: number;
  pageIndex: number;
}

interface ImageEntry {
  pngData: Uint8Array;
  displayWidth: number;
  displayHeight: number;
  insertAfterLine: number;
}

interface ExtractionResult {
  lines: TextLine[];
  images: ImageEntry[];
  pageCount: number;
  filename: string;
  wordCount: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Strip characters that are invalid in XML 1.0 (causes Packer.toBlob to throw). */
function sanitize(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
}

function multiplyMatrix(m1: number[], m2: number[]): number[] {
  const [a1, b1, c1, d1, e1, f1] = m1;
  const [a2, b2, c2, d2, e2, f2] = m2;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}

function parseFontFamily(raw: string): string {
  if (!raw) return 'Calibri';
  const cleaned = raw.replace(/^[A-Z]{6}\+/, '').replace(/[_,]/g, ' ');
  const family = cleaned
    .replace(/\b(bold|italic|oblique|regular|medium|light|thin|heavy|black|semibold|demi|narrow|condensed|extended)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return family || 'Calibri';
}

function rgbToHex(r: number, g: number, b: number): string {
  if (r < 20 && g < 20 && b < 20) return ''; // treat near-black as default
  return (
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
}

// ── Image extraction ───────────────────────────────────────────────────────────

async function imageToPng(imgObj: {
  data: Uint8ClampedArray | Uint8Array;
  width: number;
  height: number;
  kind: number;
}): Promise<Uint8Array | null> {
  const { data, width, height, kind } = imgObj;
  if (!width || !height || !data?.length) return null;

  let rgba: Uint8ClampedArray;
  if (kind === 3) {
    rgba = data instanceof Uint8ClampedArray
      ? data
      : new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
  } else if (kind === 2) {
    rgba = new Uint8ClampedArray(width * height * 4);
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      rgba[j] = data[i]; rgba[j + 1] = data[i + 1]; rgba[j + 2] = data[i + 2]; rgba[j + 3] = 255;
    }
  } else {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  // Copy into a fresh Uint8ClampedArray<ArrayBuffer> — required by ImageData constructor
  ctx.putImageData(new ImageData(new Uint8ClampedArray(rgba), width, height), 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) { resolve(null); return; }
      blob.arrayBuffer()
        .then((ab) => resolve(new Uint8Array(ab)))
        .catch(() => resolve(null));
    }, 'image/png');
  });
}

// ── Core extraction ────────────────────────────────────────────────────────────

async function extractTextFromPdf(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<ExtractionResult> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  const buf = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

  const allLines: TextLine[] = [];
  const allImages: ImageEntry[] = [];
  let runningY = 0;

  // OPS is a numeric enum; access by string key to avoid version-specific imports
  const OPS = pdfjsLib.OPS as Record<string, number>;

  for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });

    // 1 — Text content
    const content = await page.getTextContent({ includeMarkedContent: false });
    const styles = (content as unknown as { styles?: Record<string, { fontFamily?: string }> }).styles ?? {};

    // 2 — Operator list (colors + images)
    const ops = await page.getOperatorList();
    let cr = 0, cg = 0, cb = 0;
    const showColors: Array<[number, number, number]> = [];
    const imageOps: Array<{ name: string; matrix: number[] }> = [];
    let ctm = [1, 0, 0, 1, 0, 0];
    const ctmStack: number[][] = [];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i] as number[];
      if      (fn === OPS['setFillRGBColor'])  { cr = Math.round(args[0] * 255); cg = Math.round(args[1] * 255); cb = Math.round(args[2] * 255); }
      else if (fn === OPS['setFillGray'])      { const g = Math.round(args[0] * 255); cr = g; cg = g; cb = g; }
      else if (fn === OPS['setFillCMYKColor']) { const [c, m, y, k] = args; cr = Math.round((1 - Math.min(1, c + k)) * 255); cg = Math.round((1 - Math.min(1, m + k)) * 255); cb = Math.round((1 - Math.min(1, y + k)) * 255); }
      else if (fn === OPS['showText'] || fn === OPS['showSpacedText'] || fn === OPS['nextLineShowText'] || fn === OPS['nextLineSetSpacingShowText']) { showColors.push([cr, cg, cb]); }
      else if (fn === OPS['save'])             { ctmStack.push([...ctm]); }
      else if (fn === OPS['restore'])          { if (ctmStack.length) ctm = ctmStack.pop()!; }
      else if (fn === OPS['transform'])        { ctm = multiplyMatrix(ctm, args); }
      else if (fn === OPS['paintImageXObject'] || fn === OPS['paintInlineImageXObject']) { imageOps.push({ name: String(ops.argsArray[i][0]), matrix: [...ctm] }); }
    }

    // 3 — Parse text items
    type RawItem = { text: string; x: number; y: number; h: number; isBold: boolean; isItalic: boolean; fontFamily: string; color: string };
    const items: RawItem[] = [];
    let showIdx = 0;

    for (const item of content.items) {
      if (!('str' in item) || !item.str.trim()) { showIdx++; continue; }
      const [,, , h, x, yRaw] = item.transform as number[];
      const y = viewport.height - yRaw;
      const fontName = (item as { fontName?: string }).fontName ?? '';
      const fontStyle = styles[fontName];
      const fullName = (fontName + ' ' + (fontStyle?.fontFamily ?? '')).toLowerCase();
      const isBold   = /bold|heavy|black|demi/.test(fullName);
      const isItalic = /italic|oblique|slant/.test(fullName);
      const fontFamily = parseFontFamily(fontStyle?.fontFamily ?? fontName);
      const col = showColors[showIdx++];
      const color = col ? rgbToHex(col[0], col[1], col[2]) : '';
      items.push({ text: sanitize(item.str), x, y, h: Math.abs(h as number), isBold, isItalic, fontFamily, color });
    }

    items.sort((a, b) => a.y - b.y || a.x - b.x);

    // Group items into visual lines (within 4 px vertically)
    const groups: RawItem[][] = [];
    for (const item of items) {
      const last = groups[groups.length - 1];
      if (last && Math.abs(item.y - last[0].y) < 4) last.push(item);
      else groups.push([item]);
    }

    let prevY = 0, prevH = 12;
    for (const group of groups) {
      const text = group.map((i) => i.text).join(' ').trim();
      if (!text) continue;
      const fontSize = Math.max(...group.map((i) => i.h));
      const y = group[0].y;
      const dominant = group.reduce((a, b) => (a.h >= b.h ? a : b));

      if (prevY > 0 && y - prevY > prevH * 1.8) {
        allLines.push({ text: '', fontSize: 11, isBold: false, isItalic: false, fontFamily: 'Calibri', color: '', y: runningY, pageIndex });
        runningY++;
      }
      allLines.push({ text, fontSize, isBold: dominant.isBold, isItalic: dominant.isItalic, fontFamily: dominant.fontFamily, color: dominant.color, y: runningY, pageIndex });
      runningY++;
      prevY = y; prevH = fontSize;
    }

    if (pageIndex < pdf.numPages - 1) {
      allLines.push({ text: '', fontSize: 11, isBold: false, isItalic: false, fontFamily: 'Calibri', color: '', y: runningY, pageIndex });
      runningY++;
    }

    onProgress?.(pageIndex + 1, pdf.numPages);

    // 4 — Extract images
    const seen = new Set<string>();
    for (const imgOp of imageOps) {
      if (seen.has(imgOp.name)) continue;
      seen.add(imgOp.name);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pageObjs = (page as any).objs;
        if (!pageObjs?.has?.(imgOp.name)) continue;
        const imgData = pageObjs.get(imgOp.name) as { data: Uint8ClampedArray; width: number; height: number; kind: number } | null;
        if (!imgData) continue;
        const pngData = await imageToPng(imgData);
        if (!pngData) continue;
        const [a, b, , d] = imgOp.matrix;
        const scaleX = Math.sqrt(a * a + b * b) * (96 / 72);
        const scaleY = Math.abs(d) * (96 / 72);
        const displayWidth  = Math.max(20, Math.min(Math.round(scaleX), 600));
        const displayHeight = Math.max(20, Math.min(Math.round(scaleY), 600));
        allImages.push({ pngData, displayWidth, displayHeight, insertAfterLine: allLines.length });
      } catch {
        // skip unextractable images
      }
    }
  }

  const wordCount = allLines.filter((l) => l.text).reduce((s, l) => s + l.text.split(/\s+/).length, 0);
  return { lines: allLines, images: allImages, pageCount: pdf.numPages, filename: file.name.replace(/\.pdf$/i, '.docx'), wordCount };
}

// ── DOCX builder ───────────────────────────────────────────────────────────────

async function buildDocx(result: ExtractionResult): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } = await import('docx');

  const byLine = new Map<number, ImageEntry[]>();
  for (const img of result.images) {
    const arr = byLine.get(img.insertAfterLine) ?? [];
    arr.push(img);
    byLine.set(img.insertAfterLine, arr);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: any[] = [];

  result.lines.forEach((line, idx) => {
    if (!line.text) {
      children.push(new Paragraph({}));
    } else {
      const isH1 = line.fontSize > 20;
      const isH2 = line.fontSize > 15 && line.fontSize <= 20;
      const size = Math.round(Math.min(Math.max(line.fontSize || 11, 8), 36)) * 2;
      children.push(
        new Paragraph({
          heading: isH1 ? HeadingLevel.HEADING_1 : isH2 ? HeadingLevel.HEADING_2 : undefined,
          children: [
            new TextRun({
              text: sanitize(line.text),
              bold: line.isBold && !isH1 && !isH2,
              italics: line.isItalic,
              size,
              font: line.fontFamily || 'Calibri',
              ...(line.color ? { color: line.color } : {}),
            }),
          ],
        })
      );
    }

    for (const img of byLine.get(idx) ?? []) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              type: 'png',
              data: img.pngData,
              transformation: { width: img.displayWidth, height: img.displayHeight },
            }),
          ],
        })
      );
    }
  });

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}

// ── Component ──────────────────────────────────────────────────────────────────

export function PdfToWordUI() {
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isBuilding, setIsBuilding]   = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages]   = useState(0);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.name.match(/\.pdf$/i)) { setError('Please upload a .pdf file.'); return; }
    setError(null); setExtraction(null); setCurrentPage(0); setTotalPages(0); setIsExtracting(true);
    try {
      const result = await extractTextFromPdf(file, (cur, tot) => {
        setCurrentPage(cur);
        setTotalPages(tot);
      });
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
    setIsBuilding(true); setError(null);
    try {
      const blob = await buildDocx(extraction);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = extraction.filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (err) {
      setError(`Failed to build the Word document: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsBuilding(false);
    }
  }, [extraction]);

  const reset = useCallback(() => { setExtraction(null); setError(null); }, []);

  const previewLines = extraction?.lines.slice(0, 60) ?? [];

  return (
    <div className="rounded-2xl bg-surface bd-2 overflow-hidden" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bd-b-1">
        <span className="text-[13px] font-semibold text-fg-1 tracking-[-0.01em]">PDF to Word</span>
        {extraction && (
          <div className="flex items-center gap-3">
            <span className="font-data text-[11px] text-fg-3">
              {extraction.pageCount} page{extraction.pageCount !== 1 ? 's' : ''} · ~{extraction.wordCount.toLocaleString()} words
              {extraction.images.length > 0 && ` · ${extraction.images.length} image${extraction.images.length !== 1 ? 's' : ''}`}
            </span>
            <button onClick={reset} className="h-8 px-3 rounded-lg bd-2 text-[12px] text-fg-2 hover:text-fg-1 transition-colors">New file</button>
          </div>
        )}
      </div>

      {/* ── Drop zone ── */}
      {!extraction && !isExtracting && (
        <div className="p-5">
          <DropZone onFiles={handleFiles} accept={['application/pdf']} />
          <div className="mt-4 flex items-start gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-4 py-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-amber-400" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-[12px] text-amber-300/90 leading-[1.6] m-0">
              Works best for text-based PDFs. Extracts text with fonts, colors, and embedded images. Scanned or image-only PDFs cannot be converted (no OCR). Complex multi-column layouts may need cleanup.
            </p>
          </div>
          <p className="text-center text-[12px] text-fg-3 mt-3">Zero upload — PDF processed entirely in your browser</p>
        </div>
      )}

      {/* ── Extracting ── */}
      {isExtracting && (
        <div className="flex flex-col items-center justify-center gap-5 py-16 px-8">
          <svg className="w-12 h-12 animate-spin" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="var(--border-1)" strokeWidth="4" />
            <path d="M44 24a20 20 0 0 0-20-20" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-center space-y-1">
            <p className="text-[17px] font-bold text-fg-1 tracking-[-0.02em]">Extracting PDF…</p>
            {totalPages > 0 && (
              <p className="font-data text-[12px] text-fg-3">
                {currentPage} / {totalPages} pages · Reading text &amp; images
              </p>
            )}
          </div>
          {totalPages > 0 && (
            <div className="w-full max-w-70">
              <div className="h-0.75 w-full rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.round((currentPage / totalPages) * 100)}%`, background: 'var(--accent)' }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mx-5 mb-4 flex items-start gap-3 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-px text-red-400" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[13px] text-red-400 leading-normal">{error}</span>
        </div>
      )}

      {/* ── Preview + download ── */}
      {extraction && !isExtracting && (
        <>
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
                      className="m-0 leading-[1.65]"
                      style={{
                        fontSize: isH1 ? 20 : isH2 ? 15 : 13,
                        fontWeight: isH1 || isH2 || line.isBold ? 700 : 400,
                        fontStyle: line.isItalic ? 'italic' : 'normal',
                        fontFamily: line.fontFamily ? `'${line.fontFamily}', Georgia, serif` : 'Georgia, serif',
                        color: line.color ? `#${line.color}` : 'inherit',
                      }}
                    >
                      {line.text}
                    </p>
                  );
                })}
                {extraction.lines.length > 60 && (
                  <p className="text-[11px] text-fg-3 pt-3 font-medium">… {extraction.lines.length - 60} more lines in the downloaded document</p>
                )}
              </div>
            </div>
          </div>

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
                  Save DOCX — {extraction.filename}
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-fg-3 mt-2">No upload · No watermark · Open in Microsoft Word or Google Docs</p>
          </div>
        </>
      )}
    </div>
  );
}
