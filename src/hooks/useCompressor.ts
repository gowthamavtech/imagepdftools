'use client';

import { useState, useCallback, useRef } from 'react';
import { usePlan } from './usePlan';
import { compressImage } from '@/lib/compress';
import type { FileEntry, CompressionResult } from '@/components/ImageCard';

const MAX_FREE_FILES = 20;

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function defaultFormatFor(mimeType: string): string {
  if (mimeType === 'image/svg+xml') return 'image/svg+xml';
  if (mimeType === 'image/png') return 'image/png';
  if (mimeType === 'image/jpg') return 'image/jpg';
  return 'image/jpeg';
}

function defaultQualityFor(format: string): number {
  return format === 'image/png' ? 60 : 80;
}

export function useCompressor({ initialFormat }: { initialFormat?: string } = {}) {
  const { isPro } = usePlan();

  const [files, setFiles] = useState<FileEntry[]>([]);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [format, setFormatState] = useState(initialFormat ?? 'image/jpeg');
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Stable refs so callbacks don't capture stale values
  const filesRef = useRef<FileEntry[]>([]);
  filesRef.current = files;
  const formatRef = useRef(format);
  formatRef.current = format;
  const debounceRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // ── Single-file compression ───────────────────────────────────────────────
  const compressSingle = useCallback(async (entry: FileEntry, fmt: string) => {
    setProcessingIds((prev) => new Set(prev).add(entry.id));
    try {
      const result = await compressImage(entry.file, {
        quality:   entry.quality,
        colors:    Math.max(2, Math.round(entry.quality * 2.56)),   // 1-100 → 2-256
        precision: Math.round((100 - entry.quality) / 100 * 6),     // 100→0, 1→6
        outputFormat: fmt,
      });

      let { blob } = result;

      // Binary JPEG EXIF strip — no re-encode, zero quality loss.
      // PNG/WebP from jSquash/UPNG already encode from raw RGBA → no metadata.
      if (entry.stripMeta && (fmt === 'image/jpeg' || fmt === 'image/jpg')) {
        const { stripJpegExif } = await import('@/lib/stripMetadata');
        const buf = await blob.arrayBuffer();
        blob = new Blob([stripJpegExif(buf)], { type: 'image/jpeg' });
      }

      setResults((prev) => [
        ...prev.filter((r) => r.id !== entry.id),
        { id: entry.id, blob, name: result.name, size: blob.size },
      ]);
    } catch {
      // skip individual failures silently
    } finally {
      setProcessingIds((prev) => {
        const s = new Set(prev);
        s.delete(entry.id);
        return s;
      });
    }
  }, []);

  // ── Add files — auto-compress immediately ─────────────────────────────────
  const addFiles = useCallback(
    (incoming: File[]) => {
      const current = filesRef.current;
      if (!isPro && current.length >= MAX_FREE_FILES) {
        setShowUpgradeModal(true);
        return;
      }

      let toAdd = incoming;
      if (!isPro && current.length + incoming.length > MAX_FREE_FILES) {
        toAdd = incoming.slice(0, MAX_FREE_FILES - current.length);
        setShowUpgradeModal(true);
      }

      // Auto-switch format for first file (unless page locks it via initialFormat)
      let fmt = formatRef.current;
      if (!initialFormat && current.length === 0 && toAdd.length > 0) {
        fmt = defaultFormatFor(toAdd[0].type);
        setFormatState(fmt);
        formatRef.current = fmt;
      }

      const newEntries: FileEntry[] = toAdd.map((file) => {
        const fileFmt = initialFormat ?? defaultFormatFor(file.type);
        return {
          id: generateId(),
          file,
          previewUrl: URL.createObjectURL(file),
          quality: defaultQualityFor(fileFmt),
          format: fileFmt,
          stripMeta: false,
        };
      });

      setFiles((prev) => [...prev, ...newEntries]);
      newEntries.forEach((entry) => compressSingle(entry, entry.format));
    },
    [isPro, initialFormat, compressSingle],
  );

  // ── Per-file quality change — debounced recompress ────────────────────────
  const setFileQuality = useCallback(
    (id: string, quality: number) => {
      // Cancel any in-flight debounce for this file
      const existing = debounceRefs.current.get(id);
      if (existing) clearTimeout(existing);

      // Update quality in state immediately so slider feels responsive
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, quality } : f)));

      // Recompress after 350 ms of inactivity
      const timeout = setTimeout(() => {
        const entry = filesRef.current.find((f) => f.id === id);
        if (entry) compressSingle({ ...entry, quality }, entry.format);
      }, 350);
      debounceRefs.current.set(id, timeout);
    },
    [compressSingle],
  );

  // ── Per-file strip-metadata toggle — immediate recompress ────────────────
  const setFileStripMeta = useCallback(
    (id: string, strip: boolean) => {
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, stripMeta: strip } : f)));
      // Recompress immediately so the result reflects the new setting
      const entry = filesRef.current.find((f) => f.id === id);
      if (entry) compressSingle({ ...entry, stripMeta: strip }, entry.format);
    },
    [compressSingle],
  );

  // ── Per-file format change — immediate recompress ────────────────────────
  const setFileFormat = useCallback(
    (id: string, fmt: string) => {
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, format: fmt } : f)));
      const entry = filesRef.current.find((f) => f.id === id);
      if (entry) compressSingle({ ...entry, format: fmt }, fmt);
    },
    [compressSingle],
  );

  // ── Format change — recompress all existing files ─────────────────────────
  const setFormat = useCallback(
    (f: string) => {
      setFormatState(f);
      formatRef.current = f;
      filesRef.current.forEach((entry) => compressSingle(entry, f));
    },
    [compressSingle],
  );

  // ── Download All as ZIP (Pro only) ────────────────────────────────────────
  const downloadZip = useCallback(async () => {
    if (!isPro) { setShowUpgradeModal(true); return; }
    if (results.length === 0) return;
    const { downloadAllAsZip } = await import('@/lib/zip');
    await downloadAllAsZip(results.map((r) => ({ name: r.name, blob: r.blob })));
  }, [results, isPro]);

  // ── Remove / clear ────────────────────────────────────────────────────────
  const removeFile = useCallback((id: string) => {
    const existing = debounceRefs.current.get(id);
    if (existing) clearTimeout(existing);
    debounceRefs.current.delete(id);

    setFiles((prev) => {
      const entry = prev.find((f) => f.id === id);
      if (entry) URL.revokeObjectURL(entry.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
    setResults((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    debounceRefs.current.forEach((t) => clearTimeout(t));
    debounceRefs.current.clear();
    setFiles((prev) => { prev.forEach((f) => URL.revokeObjectURL(f.previewUrl)); return []; });
    setResults([]);
  }, []);

  return {
    files,
    results,
    format,
    processingIds,
    showUpgradeModal,
    addFiles,
    setFileQuality,
    setFileFormat,
    setFileStripMeta,
    setFormat,
    downloadZip,
    removeFile,
    clearAll,
    setShowUpgradeModal,
  };
}
