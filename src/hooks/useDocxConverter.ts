'use client';

import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import type { FontEntry } from '@/workers/docx-converter.worker';

// ── Local Font Access API types ────────────────────────────────────────────────

interface FontData {
  readonly family: string;
  readonly fullName: string;
  readonly postscriptName: string;
  readonly style: string;
  blob(): Promise<Blob>;
}

declare global {
  interface Window {
    queryLocalFonts?: (opts?: { postscriptNames?: string[] }) => Promise<FontData[]>;
  }
}

// ── Status type ────────────────────────────────────────────────────────────────

export type ConversionStatus =
  | 'idle'
  | 'parsing'       // reading DOCX XML for font names
  | 'font-query'    // requesting font access from the user
  | 'converting'    // Pandoc + Typst running
  | 'done'
  | 'error';

export interface UseDocxConverterReturn {
  status: ConversionStatus;
  progress: string;
  pdfBlob: Blob | null;
  error: string | null;
  fontCount: number;
  convert: (file: File, pageSize: 'a4' | 'letter') => Promise<void>;
  reset: () => void;
}

// ── DOCX layout parsing (fonts + margins) ─────────────────────────────────────

interface DocxLayout {
  fontFamilies: string[];
  margins: { top: number; right: number; bottom: number; left: number } | null;
}

async function parseDocxLayout(docxBuffer: ArrayBuffer): Promise<DocxLayout> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(docxBuffer);
  } catch {
    return { fontFamilies: [], margins: null };
  }

  const families = new Set<string>();

  const fontTableFile = zip.file('word/fontTable.xml');
  if (fontTableFile) {
    const xml = await fontTableFile.async('string');
    for (const m of xml.matchAll(/w:name="([^"+][^"]*)"/g)) {
      families.add(m[1]);
    }
  }

  let margins: DocxLayout['margins'] = null;

  const docFile = zip.file('word/document.xml');
  if (docFile) {
    const xml = await docFile.async('string');

    for (const m of xml.matchAll(/w:(?:ascii|hAnsi|cs|eastAsia)="([^"]+)"/g)) {
      if (!m[1].startsWith('+')) families.add(m[1]);
    }

    // <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    // Values are in twentieths of a point (twips). 1440 twips = 1 inch = 72pt.
    const pgMarMatch = xml.match(/<w:pgMar\b([^>]*)\/?\s*>/);
    if (pgMarMatch) {
      const attrs = pgMarMatch[1];
      const twipsToPt = (name: string, fallback = 1440) => {
        const m = attrs.match(new RegExp(`w:${name}="(\\d+)"`));
        return (m ? parseInt(m[1]) : fallback) / 20;
      };
      margins = {
        top:    twipsToPt('top'),
        right:  twipsToPt('right'),
        bottom: twipsToPt('bottom'),
        left:   twipsToPt('left'),
      };
    }
  }

  return { fontFamilies: [...families], margins };
}

// ── System font fetching ───────────────────────────────────────────────────────

async function fetchSystemFonts(families: string[]): Promise<FontEntry[]> {
  if (!window.queryLocalFonts) return [];

  const available = await window.queryLocalFonts();
  const familySet = new Set(families.map((f) => f.toLowerCase()));

  const bestPerFamily = new Map<string, FontData>();
  for (const font of available) {
    const key = font.family.toLowerCase();
    if (!familySet.has(key)) continue;
    const existing = bestPerFamily.get(font.family);
    if (!existing || font.style === 'Regular' || font.style === 'normal') {
      bestPerFamily.set(font.family, font);
    }
  }

  const entries = [...bestPerFamily.entries()].slice(0, 8);

  const results: FontEntry[] = [];
  for (let i = 0; i < entries.length; i += 4) {
    const batch = entries.slice(i, i + 4);
    const batchResults = await Promise.all(
      batch.map(async ([family, font]) => {
        const blob = await font.blob();
        const data = await blob.arrayBuffer();
        const safeName = font.postscriptName.replace(/[^a-zA-Z0-9_-]/g, '_');
        return { name: `${safeName}.ttf`, family, data } satisfies FontEntry;
      })
    );
    results.push(...batchResults);
  }

  return results;
}

// ── WASM singleton caches (survive across repeated calls) ──────────────────────
// Pandoc WASM is ~58 MB and Typst is ~39 MB — cache them so reloading on every
// conversion doesn't stall the user.

type PandocConvertFn = (
  options: Record<string, unknown>,
  stdin: null,
  files: Record<string, Blob>
) => Promise<{ stdout: string; stderr: string; mediaFiles: Record<string, Blob> }>;

let _pandocConvert: PandocConvertFn | null = null;

async function ensurePandoc(): Promise<PandocConvertFn> {
  if (_pandocConvert) return _pandocConvert;
  const { createPandocInstance } = await import('@/lib/pandoc-core');
  const res = await fetch('/pandoc.wasm');
  if (!res.ok) throw new Error(`Failed to fetch pandoc.wasm: ${res.status}`);
  const wasmBuf = await res.arrayBuffer();
  const instance = await createPandocInstance(wasmBuf);
  _pandocConvert = instance.convert as PandocConvertFn;
  return _pandocConvert;
}

interface TypstAPI {
  resetShadow(): Promise<void>;
  mapShadow(path: string, data: Uint8Array): Promise<void>;
  pdf(opts: { mainContent: string } | { mainFilePath: string; root?: string }): Promise<Uint8Array>;
}

let _typstAPI: TypstAPI | null = null;

async function ensureTypst(): Promise<TypstAPI> {
  if (_typstAPI) return _typstAPI;
  const mod = await import('@myriaddreamin/typst-all-in-one.ts');
  _typstAPI = mod.$typst as unknown as TypstAPI;
  return _typstAPI;
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useDocxConverter(): UseDocxConverterReturn {
  const [status, setStatus]       = useState<ConversionStatus>('idle');
  const [progress, setProgress]   = useState('');
  const [pdfBlob, setPdfBlob]     = useState<Blob | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [fontCount, setFontCount] = useState(0);

  const convert = useCallback(async (file: File, pageSize: 'a4' | 'letter') => {
    setPdfBlob(null);
    setError(null);
    setFontCount(0);

    try {
      // ── 1. Parse DOCX for fonts + margins ──────────────────────────────────
      setStatus('parsing');
      setProgress('Parsing document…');
      const docxBuffer = await file.arrayBuffer();
      const { fontFamilies: families, margins } = await parseDocxLayout(docxBuffer);

      // ── 2. Query system fonts (main thread only API) ─────────────────────────
      let fonts: FontEntry[] = [];
      if (families.length > 0 && typeof window !== 'undefined' && window.queryLocalFonts) {
        setStatus('font-query');
        setProgress('Requesting font access…');
        try {
          fonts = await fetchSystemFonts(families);
          setFontCount(fonts.length);
        } catch (fontErr) {
          console.warn('[useDocxConverter] Font access denied or unavailable:', fontErr);
        }
      }

      // ── 3. Pandoc: DOCX → Typst markup ─────────────────────────────────────
      setStatus('converting');
      setProgress('Loading Pandoc WASM…');
      const pandoc = await ensurePandoc();

      setProgress('Converting document…');
      const docxBlob = new Blob([docxBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const pandocResult = await pandoc(
        {
          from: 'docx',
          to: 'typst',
          'input-files': ['input.docx'],
          'extract-media': 'media',
        },
        null,
        { 'input.docx': docxBlob }
      );

      if (!pandocResult.stdout) {
        throw new Error(
          `Pandoc produced no output${pandocResult.stderr ? ': ' + pandocResult.stderr.slice(0, 300) : ''}`
        );
      }

      // ── 4. Build Typst source with preamble ─────────────────────────────────
      // Replace absolute image widths so they don't overflow the text column.
      let pandocOut = pandocResult.stdout.replace(
        /,\s*width:\s*\d+(?:\.\d+)?(?:in|cm|mm|pt)\b/g,
        ', width: 100%'
      );
      // Remove explicit heights — Typst derives height from aspect ratio.
      // Leaving a fixed height alongside width: 100% clamps the image to a
      // smaller size (or crops it), since Typst fits to the tighter constraint.
      pandocOut = pandocOut.replace(
        /,\s*height:\s*\d+(?:\.\d+)?(?:in|cm|mm|pt)\b/g,
        ''
      );
      // Remove clip:true from #box wrappers so images reflow instead of being
      // hard-clipped to the box dimensions.
      pandocOut = pandocOut.replace(/,\s*clip:\s*true\b/g, '');

      // Margin from DOCX; fall back to Word's default 1 inch (72pt) all sides.
      const m = margins ?? { top: 72, right: 72, bottom: 72, left: 72 };
      const marginStr = `(top: ${m.top}pt, right: ${m.right}pt, bottom: ${m.bottom}pt, left: ${m.left}pt)`;
      const paper = pageSize === 'a4' ? 'a4' : 'us-letter';
      const pageDir = `#set page(paper: "${paper}", margin: ${marginStr})`;

      const uniqueFamilies = [...new Set(fonts.map((f) => f.family))];
      const fontList =
        uniqueFamilies.length > 0
          ? [...uniqueFamilies, 'Linux Libertine', 'New Computer Modern']
              .map((f) => `"${f}"`)
              .join(', ')
          : '"Linux Libertine", "New Computer Modern"';
      const fontDir = `#set text(font: (${fontList}))`;

      const tableDir = [
        '#set table(stroke: 0.5pt + luma(180), inset: (x: 8pt, y: 6pt))',
        '#show table.cell.where(y: 0): set text(weight: "bold")',
      ].join('\n');

      // Scale all images to fit the text column width, maintaining aspect ratio.
      const imageDir = '#show image: it => box(it, width: 100%)';

      // Pandoc may emit rgb values without the leading # (e.g. rgb("FF0000")).
      // Typst requires rgb("#FF0000"), so normalise both forms.
      const colorFixedOut = pandocOut.replace(
        /rgb\("([0-9A-Fa-f]{6})"\)/g,
        'rgb("#$1")'
      );

      const typstSrc = [pageDir, fontDir, tableDir, '#set par(justify: true)', imageDir, '', colorFixedOut].join('\n');

      // ── 5. Typst: inject fonts + media, compile PDF ─────────────────────────
      setProgress('Loading Typst compiler…');
      const $typst = await ensureTypst();

      setProgress('Compiling PDF…');
      await $typst.resetShadow();

      for (const font of fonts) {
        await $typst.mapShadow(`/fonts/${font.name}`, new Uint8Array(font.data));
      }

      for (const [name, blob] of Object.entries(pandocResult.mediaFiles ?? {})) {
        const data = new Uint8Array(await (blob as Blob).arrayBuffer());
        await $typst.mapShadow(`/tmp/${name}`, data);
      }

      const pdfBytes = await $typst.pdf({ mainContent: typstSrc });

      if (!pdfBytes || pdfBytes.length === 0) {
        throw new Error('Typst produced an empty PDF. The document may use unsupported features.');
      }

      const pdfBuffer = pdfBytes.buffer.slice(
        pdfBytes.byteOffset,
        pdfBytes.byteOffset + pdfBytes.byteLength
      ) as ArrayBuffer;

      setPdfBlob(new Blob([pdfBuffer], { type: 'application/pdf' }));
      setStatus('done');
      setProgress('');

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
      setProgress('');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress('');
    setPdfBlob(null);
    setError(null);
    setFontCount(0);
  }, []);

  return { status, progress, pdfBlob, error, fontCount, convert, reset };
}
