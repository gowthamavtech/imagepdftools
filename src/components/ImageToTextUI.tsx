'use client';

import { useState, useCallback, useRef } from 'react';
import { DropZone } from './DropZone';

interface FileEntry {
  id: string;
  file: File;
  previewUrl: string;
}

interface OcrResult {
  id: string;
  text: string;
  confidence: number;
}

interface OcrProgress {
  progress: number;
  status: string;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function truncateMiddle(name: string, maxLen = 32): string {
  if (name.length <= maxLen) return name;
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot) : '';
  const base = dot > 0 ? name.slice(0, dot) : name;
  const half = Math.floor((maxLen - ext.length - 1) / 2);
  return `${base.slice(0, half)}…${base.slice(-half)}${ext}`;
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function statusLabel(raw: string): string {
  if (raw.includes('recognizing')) return 'Extracting text…';
  if (raw.includes('loading language')) return 'Loading language data…';
  if (raw.includes('loading tesseract core')) return 'Loading OCR engine…';
  if (raw.includes('initializing')) return 'Initializing…';
  return 'Processing…';
}

const LANGUAGES = [
  { value: 'afr',      label: 'Afrikaans' },
  { value: 'amh',      label: 'Amharic' },
  { value: 'ara',      label: 'Arabic' },
  { value: 'asm',      label: 'Assamese' },
  { value: 'aze',      label: 'Azerbaijani' },
  { value: 'aze_cyrl', label: 'Azerbaijani (Cyrillic)' },
  { value: 'bel',      label: 'Belarusian' },
  { value: 'ben',      label: 'Bengali' },
  { value: 'bod',      label: 'Tibetan' },
  { value: 'bos',      label: 'Bosnian' },
  { value: 'bul',      label: 'Bulgarian' },
  { value: 'cat',      label: 'Catalan' },
  { value: 'ceb',      label: 'Cebuano' },
  { value: 'ces',      label: 'Czech' },
  { value: 'chi_sim',  label: 'Chinese (Simplified)' },
  { value: 'chi_tra',  label: 'Chinese (Traditional)' },
  { value: 'chr',      label: 'Cherokee' },
  { value: 'cym',      label: 'Welsh' },
  { value: 'dan',      label: 'Danish' },
  { value: 'deu',      label: 'German' },
  { value: 'dzo',      label: 'Dzongkha' },
  { value: 'ell',      label: 'Greek' },
  { value: 'eng',      label: 'English' },
  { value: 'enm',      label: 'English (Middle)' },
  { value: 'epo',      label: 'Esperanto' },
  { value: 'est',      label: 'Estonian' },
  { value: 'eus',      label: 'Basque' },
  { value: 'fas',      label: 'Persian' },
  { value: 'fin',      label: 'Finnish' },
  { value: 'fra',      label: 'French' },
  { value: 'frk',      label: 'Frankish' },
  { value: 'frm',      label: 'French (Middle)' },
  { value: 'gle',      label: 'Irish' },
  { value: 'glg',      label: 'Galician' },
  { value: 'grc',      label: 'Greek (Ancient)' },
  { value: 'guj',      label: 'Gujarati' },
  { value: 'hat',      label: 'Haitian Creole' },
  { value: 'heb',      label: 'Hebrew' },
  { value: 'hin',      label: 'Hindi' },
  { value: 'hrv',      label: 'Croatian' },
  { value: 'hun',      label: 'Hungarian' },
  { value: 'iku',      label: 'Inuktitut' },
  { value: 'ind',      label: 'Indonesian' },
  { value: 'isl',      label: 'Icelandic' },
  { value: 'ita',      label: 'Italian' },
  { value: 'ita_old',  label: 'Italian (Old)' },
  { value: 'jav',      label: 'Javanese' },
  { value: 'jpn',      label: 'Japanese' },
  { value: 'kan',      label: 'Kannada' },
  { value: 'kat',      label: 'Georgian' },
  { value: 'kat_old',  label: 'Georgian (Old)' },
  { value: 'kaz',      label: 'Kazakh' },
  { value: 'khm',      label: 'Khmer' },
  { value: 'kir',      label: 'Kyrgyz' },
  { value: 'kor',      label: 'Korean' },
  { value: 'kur',      label: 'Kurdish' },
  { value: 'lao',      label: 'Lao' },
  { value: 'lat',      label: 'Latin' },
  { value: 'lav',      label: 'Latvian' },
  { value: 'lit',      label: 'Lithuanian' },
  { value: 'mal',      label: 'Malayalam' },
  { value: 'mar',      label: 'Marathi' },
  { value: 'mkd',      label: 'Macedonian' },
  { value: 'mlt',      label: 'Maltese' },
  { value: 'msa',      label: 'Malay' },
  { value: 'mya',      label: 'Burmese' },
  { value: 'nep',      label: 'Nepali' },
  { value: 'nld',      label: 'Dutch' },
  { value: 'nor',      label: 'Norwegian' },
  { value: 'ori',      label: 'Odia (Oriya)' },
  { value: 'pan',      label: 'Punjabi' },
  { value: 'pol',      label: 'Polish' },
  { value: 'por',      label: 'Portuguese' },
  { value: 'pus',      label: 'Pashto' },
  { value: 'ron',      label: 'Romanian' },
  { value: 'rus',      label: 'Russian' },
  { value: 'san',      label: 'Sanskrit' },
  { value: 'sin',      label: 'Sinhala' },
  { value: 'slk',      label: 'Slovak' },
  { value: 'slv',      label: 'Slovenian' },
  { value: 'spa',      label: 'Spanish' },
  { value: 'spa_old',  label: 'Spanish (Old)' },
  { value: 'sqi',      label: 'Albanian' },
  { value: 'srp',      label: 'Serbian' },
  { value: 'srp_latn', label: 'Serbian (Latin)' },
  { value: 'swa',      label: 'Swahili' },
  { value: 'swe',      label: 'Swedish' },
  { value: 'syr',      label: 'Syriac' },
  { value: 'tam',      label: 'Tamil' },
  { value: 'tel',      label: 'Telugu' },
  { value: 'tgk',      label: 'Tajik' },
  { value: 'tgl',      label: 'Tagalog' },
  { value: 'tha',      label: 'Thai' },
  { value: 'tir',      label: 'Tigrinya' },
  { value: 'tur',      label: 'Turkish' },
  { value: 'uig',      label: 'Uyghur' },
  { value: 'ukr',      label: 'Ukrainian' },
  { value: 'urd',      label: 'Urdu' },
  { value: 'uzb',      label: 'Uzbek' },
  { value: 'uzb_cyrl', label: 'Uzbek (Cyrillic)' },
  { value: 'vie',      label: 'Vietnamese' },
  { value: 'yid',      label: 'Yiddish' },
];

const ACCEPT = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];

export function ImageToTextUI() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [results, setResults] = useState<OcrResult[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [progresses, setProgresses] = useState<Record<string, OcrProgress>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState('eng');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const filesRef = useRef<FileEntry[]>([]);
  const resultsRef = useRef<OcrResult[]>([]);
  const editsRef = useRef<Record<string, string>>({});
  filesRef.current = files;
  resultsRef.current = results;
  editsRef.current = edits;

  const processFile = useCallback(async (entry: FileEntry, lang: string) => {
    setProgresses((prev) => ({ ...prev, [entry.id]: { progress: 0, status: 'Initializing…' } }));
    setErrors((prev) => { const n = { ...prev }; delete n[entry.id]; return n; });
    setResults((prev) => prev.filter((r) => r.id !== entry.id));

    try {
      const { default: Tesseract } = await import('tesseract.js');
      const { data } = await Tesseract.recognize(entry.file, lang, {
        logger: (m: { status: string; progress: number }) => {
          setProgresses((prev) => ({
            ...prev,
            [entry.id]: { progress: Math.round(m.progress * 100), status: statusLabel(m.status) },
          }));
        },
      });

      setResults((prev) => [
        ...prev.filter((r) => r.id !== entry.id),
        { id: entry.id, text: data.text.trim(), confidence: Math.round(data.confidence) },
      ]);
    } catch (err) {
      setErrors((prev) => ({ ...prev, [entry.id]: (err as Error).message || 'OCR failed.' }));
    } finally {
      setProgresses((prev) => { const n = { ...prev }; delete n[entry.id]; return n; });
    }
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      const newEntries: FileEntry[] = incoming.map((file) => ({
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newEntries]);
      newEntries.forEach((e) => processFile(e, language));
    },
    [processFile, language],
  );

  function rerunAll(lang: string) {
    filesRef.current.forEach((e) => processFile(e, lang));
  }

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    if (filesRef.current.length > 0) rerunAll(lang);
  }

  function getDisplayText(id: string): string {
    if (id in editsRef.current) return editsRef.current[id];
    return resultsRef.current.find((r) => r.id === id)?.text ?? '';
  }

  function handleTextEdit(id: string, value: string) {
    setEdits((prev) => ({ ...prev, [id]: value }));
  }

  function revertEdit(id: string) {
    setEdits((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  function copyText(id: string) {
    navigator.clipboard.writeText(getDisplayText(id)).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function saveText(filename: string, id: string) {
    const text = getDisplayText(id);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\.[^.]+$/, '') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const entry = prev.find((f) => f.id === id);
      if (entry) URL.revokeObjectURL(entry.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
    setResults((prev) => prev.filter((r) => r.id !== id));
    setEdits((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setProgresses((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  function copyAll() {
    const combined = filesRef.current
      .map((f) => {
        const r = resultsRef.current.find((r) => r.id === f.id);
        if (!r) return null;
        return `=== ${f.file.name} ===\n${getDisplayText(f.id)}`;
      })
      .filter(Boolean)
      .join('\n\n');
    navigator.clipboard.writeText(combined as string).then(() => {
      setCopiedId('__all__');
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  const processingCount = Object.keys(progresses).length;
  const allDone = files.length > 0 && processingCount === 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-0 sm:px-4 pb-10 sm:pb-14 min-w-0">

      {/* Language selector */}
      <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <span className="text-[13px] font-medium text-fg-2 shrink-0">OCR language</span>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{
            fontFamily: 'var(--font-dm-sans, system-ui)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--fg-1)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-2)',
            borderRadius: '8px',
            padding: '6px 10px',
            cursor: 'pointer',
            outline: 'none',
            width: '100%',
            maxWidth: '260px',
          }}
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        {files.length > 0 && processingCount === 0 && (
          <span className="text-[11.5px] text-fg-3 text-center">Changed language? Select above to re-extract all.</span>
        )}
      </div>

      <DropZone
        onFiles={addFiles}
        accept={ACCEPT}
        label="Drop your image here"
        hint="JPG · PNG · WebP · GIF · BMP · up to 50 MB"
        fileTypeName="image"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-4">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-[12px] text-fg-3">
              {allDone ? (
                <span style={{ color: 'var(--accent)' }} className="font-semibold">
                  {results.length} image{results.length !== 1 ? 's' : ''} extracted
                </span>
              ) : (
                <span>
                  <span className="font-semibold text-fg-2">{results.length}</span> of{' '}
                  <span className="font-semibold text-fg-2">{files.length}</span> extracted
                  {processingCount > 0 && (
                    <span className="ml-2 inline-flex items-center gap-1.5 text-fg-2">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {processingCount} processing
                    </span>
                  )}
                </span>
              )}
            </div>

            {results.length > 1 && (
              <button
                onClick={copyAll}
                className="inline-flex items-center gap-2 h-8 px-4 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer"
                style={{
                  background: copiedId === '__all__' ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: copiedId === '__all__' ? 'var(--on-accent)' : 'var(--fg-1)',
                  border: '1px solid var(--border-2)',
                }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copiedId === '__all__' ? 'Copied!' : 'Copy all text'}
              </button>
            )}
          </div>

          {/* File cards */}
          <div className="grid gap-4">
            {files.map((file) => {
              const result = results.find((r) => r.id === file.id);
              const prog = progresses[file.id];
              const error = errors[file.id];
              const isCopied = copiedId === file.id;
              const displayText = result ? getDisplayText(file.id) : '';
              const isEdited = file.id in edits;
              const words = displayText ? wordCount(displayText) : 0;
              const chars = displayText.length;

              return (
                <div
                  key={file.id}
                  className="rounded-2xl relative overflow-hidden"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-2)' }}
                >
                  {/* ── Top: thumbnail + info ── */}
                  <div className="flex items-center gap-3 min-w-0 px-4 pt-4 pb-3 pr-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.previewUrl}
                      alt={file.file.name}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                      style={{ border: '1px solid var(--border-1)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-semibold text-fg-1 leading-tight" title={file.file.name}>
                        {truncateMiddle(file.file.name)}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                        <span className="font-data text-[11.5px] text-fg-3">{formatBytes(file.file.size)}</span>
                        {result && (
                          <span
                            className="text-[11.5px] font-medium"
                            style={{ color: result.confidence >= 80 ? '#22c55e' : result.confidence >= 50 ? '#f59e0b' : '#ef4444' }}
                          >
                            {result.confidence}% confidence
                          </span>
                        )}
                        {prog && (
                          <span className="text-[11.5px] text-fg-2 flex items-center gap-1">
                            <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            {prog.status}
                          </span>
                        )}
                        {error && <span className="text-[11.5px] font-medium text-red-500">Failed</span>}
                      </div>
                    </div>
                  </div>

                  {/* Remove button — top-right corner */}
                  <button
                    onClick={() => removeFile(file.id)}
                    title="Remove this image"
                    className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--fg-3)', border: '1px solid var(--border-1)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {/* ── Bottom: actions + content ── */}
                  <div
                    className="px-4 pt-3 pb-4 flex flex-col gap-3"
                    style={{ borderTop: '1px solid var(--border-1)', background: 'var(--bg-elevated)' }}
                  >
                    {/* Progress bar */}
                    {prog && (
                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-2)' }}>
                          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${prog.progress}%`, background: 'var(--accent)' }} />
                        </div>
                        <p className="text-[11px] text-fg-3">{prog.status} {prog.progress}%</p>
                      </div>
                    )}

                    {/* Extracted / editable text */}
                    {result && (
                      <div className="space-y-1.5">
                        {/* Label left · buttons right */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[11px] font-medium text-fg-3 uppercase tracking-wide shrink-0">
                              Extracted text
                            </span>
                            {isEdited && <span className="text-[11px]" style={{ color: 'var(--accent)' }}>· edited</span>}
                            <span className="text-[11px] text-fg-3">{words} words · {chars} chars</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isEdited && (
                              <button
                                onClick={() => revertEdit(file.id)}
                                title="Revert to original extracted text"
                                className="inline-flex items-center gap-1.5 h-7.5 px-3 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
                                style={{ background: 'var(--bg-surface)', color: 'var(--fg-3)', border: '1px solid var(--border-2)' }}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                Revert
                              </button>
                            )}
                            <button
                              onClick={() => copyText(file.id)}
                              className="inline-flex items-center gap-1.5 h-7.5 px-3 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
                              style={{
                                background: isCopied ? 'var(--accent)' : 'var(--bg-surface)',
                                color: isCopied ? '#ffffff' : 'var(--fg-2)',
                                border: '1px solid var(--border-2)',
                              }}
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                              onClick={() => saveText(file.file.name, file.id)}
                              className="btn-accent inline-flex items-center gap-1.5 h-7.5 px-3 rounded-lg text-[12px] font-semibold cursor-pointer"
                              style={{ border: '1px solid transparent', color: '#ffffff' }}
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Save .txt
                            </button>
                          </div>
                        </div>
                        {displayText ? (
                          <textarea
                            value={displayText}
                            onChange={(e) => handleTextEdit(file.id, e.target.value)}
                            rows={Math.min(Math.max(displayText.split('\n').length + 1, 4), 20)}
                            className="w-full resize-y text-[13px] leading-[1.65] rounded-lg p-3 font-mono outline-none transition-colors"
                            style={{
                              background: 'var(--bg-surface)',
                              border: `1px solid ${isEdited ? 'var(--accent)' : 'var(--border-1)'}`,
                              color: 'var(--fg-1)',
                              minHeight: '96px',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                              overflowX: 'hidden',
                            }}
                            aria-label={`Extracted text from ${file.file.name}`}
                            spellCheck
                          />
                        ) : (
                          <div className="rounded-lg p-4 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-1)' }}>
                            <p className="text-[13px] text-fg-3">No text found in this image.</p>
                            <p className="text-[11.5px] text-fg-3 mt-1">Try a clearer image, higher contrast, or a different language.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error state */}
                    {error && (
                      <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                        <svg className="w-4 h-4 text-red-500 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-[12.5px] text-red-500">{error}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}
