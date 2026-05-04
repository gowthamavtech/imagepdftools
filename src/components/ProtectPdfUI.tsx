'use client';

import { useState, useCallback } from 'react';
import { DropZone } from './DropZone';

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

type Mode = 'protect' | 'unlock';

export function ProtectPdfUI() {
  const [file,            setFile]            = useState<File | null>(null);
  const [mode,            setMode]            = useState<Mode>('protect');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw,          setShowPw]          = useState(false);
  const [isWorking,       setIsWorking]       = useState(false);
  const [error,           setError]           = useState<string | null>(null);
  const [resultBytes,     setResultBytes]     = useState<Uint8Array | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const f = files[0];
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    setFile(f);
    setResultBytes(null);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  }, []);

  const apply = async () => {
    if (!file || !password) return;
    if (mode === 'protect' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (mode === 'protect') {
        const pdfDoc = await PDFDocument.load(bytes);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const saved  = await pdfDoc.save({ userPassword: password, ownerPassword: password } as any);
        setResultBytes(saved);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfDoc = await PDFDocument.load(bytes, { password } as any);
        const saved  = await pdfDoc.save();
        setResultBytes(saved);
      }
    } catch {
      setError(
        mode === 'unlock'
          ? 'Could not unlock this PDF. The password may be incorrect, or the encryption method is not supported.'
          : 'Failed to process the PDF. Please check the file and try again.',
      );
    } finally {
      setIsWorking(false);
    }
  };

  const download = () => {
    if (!resultBytes || !file) return;
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const stem = file.name.replace(/\.pdf$/i, '');
    a.href     = url;
    a.download = `${stem}-${mode === 'protect' ? 'protected' : 'unlocked'}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResultBytes(null);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-xl mx-auto px-4 space-y-5">

      {/* Mode toggle */}
      <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/60">
        {(['protect', 'unlock'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResultBytes(null); setError(null); }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              mode === m
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {m === 'protect' ? '🔒 Protect PDF' : '🔓 Unlock PDF'}
          </button>
        ))}
      </div>

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

      {/* Password inputs */}
      {file && !resultBytes && (
        <div className="space-y-3">
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'protect' ? 'Set a password' : 'Enter current password'}
              className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPw ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          </div>
          {mode === 'protect' && (
            <input
              type={showPw ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

          <button
            onClick={apply}
            disabled={isWorking || !password || (mode === 'protect' && !confirmPassword)}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isWorking
              ? (mode === 'protect' ? 'Adding password…' : 'Removing password…')
              : (mode === 'protect' ? 'Protect PDF' : 'Unlock PDF')}
          </button>
        </div>
      )}

      {/* Result */}
      {resultBytes && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-center space-y-3">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            {mode === 'protect' ? '🔒 PDF protected!' : '🔓 PDF unlocked!'}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            {formatBytes(resultBytes.length)} · ready to download
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={download}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 text-sm font-medium transition-colors"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
