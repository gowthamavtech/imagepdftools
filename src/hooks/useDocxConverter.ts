'use client';

import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import type { FontEntry } from '@/workers/docx-converter.worker';

// ── Local Font Access API types ────────────────────────────────────────────────

interface FontData {
  readonly family:         string;
  readonly fullName:       string;
  readonly postscriptName: string;
  readonly style:          string;
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
  | 'parsing'       // reading DOCX XML for font names + margins
  | 'font-query'    // requesting Local Font Access from the browser
  | 'converting'    // worker running Pandoc + Typst
  | 'done'
  | 'error';

export interface UseFastConvertReturn {
  status:    ConversionStatus;
  progress:  string;
  percent:   number;
  pdfBlob:   Blob | null;
  error:     string | null;
  fontCount: number;
  convert:   (file: File, pageSize: 'a4' | 'letter') => Promise<void>;
  reset:     () => void;
}

// ── DOCX layout parsing (fonts + margins) — runs on main thread ───────────────

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
    for (const m of xml.matchAll(/w:name="([^"+][^"]*)"/g)) families.add(m[1]);
  }

  let margins: DocxLayout['margins'] = null;
  const docFile = zip.file('word/document.xml');
  if (docFile) {
    const xml = await docFile.async('string');
    for (const m of xml.matchAll(/w:(?:ascii|hAnsi|cs|eastAsia)="([^"]+)"/g)) {
      if (!m[1].startsWith('+')) families.add(m[1]);
    }
    const pgMar = xml.match(/<w:pgMar\b([^>]*)\/?\s*>/);
    if (pgMar) {
      const attrs = pgMar[1];
      const twips = (name: string, fallback = 1440) => {
        const m = attrs.match(new RegExp(`w:${name}="(\\d+)"`));
        return (m ? parseInt(m[1]) : fallback) / 20;
      };
      margins = { top: twips('top'), right: twips('right'), bottom: twips('bottom'), left: twips('left') };
    }
  }

  return { fontFamilies: [...families], margins };
}

// ── System font fetching — must run on main thread (queryLocalFonts API) ──────

async function fetchSystemFonts(families: string[]): Promise<FontEntry[]> {
  if (!window.queryLocalFonts) return [];

  const available = await window.queryLocalFonts();
  const familySet = new Set(families.map((f) => f.toLowerCase()));

  const best = new Map<string, FontData>();
  for (const font of available) {
    const key = font.family.toLowerCase();
    if (!familySet.has(key)) continue;
    const existing = best.get(font.family);
    if (!existing || font.style === 'Regular' || font.style === 'normal') {
      best.set(font.family, font);
    }
  }

  const entries = [...best.entries()].slice(0, 8);
  const results: FontEntry[] = [];
  for (let i = 0; i < entries.length; i += 4) {
    const batch = entries.slice(i, i + 4);
    const resolved = await Promise.all(
      batch.map(async ([family, font]) => {
        const blob = await font.blob();
        const data = await blob.arrayBuffer();
        const safeName = font.postscriptName.replace(/[^a-zA-Z0-9_-]/g, '_');
        return { name: `${safeName}.ttf`, family, data } satisfies FontEntry;
      })
    );
    results.push(...resolved);
  }
  return results;
}

// ── percent mapping from worker step messages ──────────────────────────────────

function stepToPercent(msg: string): number {
  if (msg.includes('Pandoc WASM'))          return 52;
  if (msg.includes('Converting document'))  return 66;
  if (msg.includes('Typst compiler'))       return 80;
  if (msg.includes('Compiling'))            return 92;
  return 60;
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useFastConvert(): UseFastConvertReturn {
  const [status,    setStatus]    = useState<ConversionStatus>('idle');
  const [progress,  setProgress]  = useState('');
  const [percent,   setPercent]   = useState(0);
  const [pdfBlob,   setPdfBlob]   = useState<Blob | null>(null);
  const [error,     setError]     = useState<string | null>(null);
  const [fontCount, setFontCount] = useState(0);

  const convert = useCallback(async (file: File, pageSize: 'a4' | 'letter') => {
    setPdfBlob(null);
    setError(null);
    setFontCount(0);
    setPercent(0);

    try {
      // ── 1. Parse DOCX layout (main thread) ───────────────────────────────────
      setStatus('parsing');
      setProgress('Parsing document…');
      setPercent(15);
      const docxBuffer = await file.arrayBuffer();
      const { fontFamilies, margins: _margins } = await parseDocxLayout(docxBuffer);

      // ── 2. Query system fonts (main-thread-only API) ──────────────────────────
      let fonts: FontEntry[] = [];
      if (fontFamilies.length > 0 && typeof window !== 'undefined' && window.queryLocalFonts) {
        setStatus('font-query');
        setProgress('Requesting font access…');
        setPercent(35);
        try {
          fonts = await fetchSystemFonts(fontFamilies);
          setFontCount(fonts.length);
        } catch (err) {
          console.warn('[useFastConvert] font access denied:', err);
        }
      }

      // ── 3. Hand off to the Pandoc+Typst worker ────────────────────────────────
      setStatus('converting');
      setProgress('Loading Pandoc WASM…');
      setPercent(50);

      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(
          new URL('../workers/docx-converter.worker.ts', import.meta.url)
        );

        worker.onmessage = ({ data }) => {
          if (data.type === 'step') {
            setProgress(data.message);
            setPercent(stepToPercent(data.message));
          } else if (data.type === 'done') {
            const blob = new Blob([data.pdfBuffer], { type: 'application/pdf' });
            setPdfBlob(blob);
            setStatus('done');
            setProgress('');
            setPercent(100);
            worker.terminate();
            resolve();
          } else if (data.type === 'error') {
            worker.terminate();
            reject(new Error(data.message));
          }
        };

        worker.onerror = (err) => {
          worker.terminate();
          reject(new Error(err.message ?? 'Worker crashed.'));
        };

        // Transfer docxBuffer and all font data zero-copy
        const transfers: Transferable[] = [docxBuffer, ...fonts.map((f) => f.data)];
        worker.postMessage({ docxBuffer, fonts, pageSize }, transfers);
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
      setProgress('');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress('');
    setPercent(0);
    setPdfBlob(null);
    setError(null);
    setFontCount(0);
  }, []);

  return { status, progress, percent, pdfBlob, error, fontCount, convert, reset };
}

// Keep old export name for any other imports
export { useFastConvert as useDocxConverter };
