'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DropZone } from './DropZone';
import { useHandoffStore } from '@/store/handoffStore';
import { PdfContinueTo } from './PdfContinueTo';

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

function getStrength(pw: string): { label: string; score: number; color: string } {
  if (!pw) return { label: '', score: 0, color: '' };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 14) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak',        score: 1, color: '#ef4444' };
  if (score === 2) return { label: 'Fair',        score: 2, color: '#f97316' };
  if (score === 3) return { label: 'Good',        score: 3, color: '#eab308' };
  if (score === 4) return { label: 'Strong',      score: 4, color: '#22c55e' };
  return               { label: 'Very strong',   score: 5, color: '#16a34a' };
}

type Mode = 'protect' | 'unlock';

// ── Continue to… strip ────────────────────────────────────────────────────────


export function ProtectPdfUI({ defaultMode = 'protect' }: { defaultMode?: Mode }) {
  const [file,             setFile]             = useState<File | null>(null);
  const [mode,             setMode]             = useState<Mode>(defaultMode);
  const [password,         setPassword]         = useState('');
  const [confirmPassword,  setConfirmPassword]  = useState('');
  const [showPw,           setShowPw]           = useState(false);
  const [isWorking,        setIsWorking]        = useState(false);
  const [error,            setError]            = useState<string | null>(null);
  const [resultBytes,      setResultBytes]      = useState<Uint8Array | null>(null);
  const [previewUrl,       setPreviewUrl]       = useState<string | null>(null);

  const consumeHandoff = useHandoffStore((s) => s.consumeHandoff);
  const consumeRef = useRef(consumeHandoff);
  useEffect(() => {
    const { file: f } = consumeRef.current();
    if (f && f.type === 'application/pdf') setFile(f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      const bytes = new Uint8Array(await file.arrayBuffer());

      if (mode === 'protect') {
        const { PDFDocument } = await import('pdf-lib');
        const pdfDoc = await PDFDocument.load(bytes);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const saved  = await pdfDoc.save({ userPassword: password, ownerPassword: password } as any);
        setResultBytes(saved);

      } else {
        const { unlockPdf } = await import('@/lib/pdf-decrypt');
        const decrypted = await unlockPdf(bytes, password);
        setResultBytes(decrypted);
      }
    } catch {
      setError(
        mode === 'unlock'
          ? 'Could not unlock — the password may be wrong, or this encryption type is unsupported.'
          : 'Failed to protect the PDF. The file may be corrupted.',
      );
    } finally {
      setIsWorking(false);
    }
  };

  const openPreview = () => {
    if (!resultBytes) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    setPreviewUrl(URL.createObjectURL(blob));
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const download = () => {
    if (!resultBytes || !file) return;
    const blob  = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    const stem  = file.name.replace(/\.pdf$/i, '').replace(/[<>:"/\\|?*]/g, '-').trim();
    const tag   = '(imagepdf.tools)';
    a.href      = url;
    a.download  = mode === 'protect'
      ? `${stem}-protected-${tag}.pdf`
      : `${stem}-unlocked-${tag}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setResultBytes(null);
    setError(null);
    setPassword('');
    setConfirmPassword('');
    setPreviewUrl(null);
  };

  const backToEdit = () => { setResultBytes(null); setError(null); };

  const strength = getStrength(password);

  return (
    <div className="max-w-xl mx-auto px-4 space-y-5">

      {/* Mode toggle */}
      <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/60">
        {(['protect', 'unlock'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResultBytes(null); setError(null); }}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
              mode === m
                ? 'bg-violet-600 text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {m === 'protect' ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Protect PDF
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Unlock PDF
              </>
            )}
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
          {/* Password field */}
          <div className="space-y-1.5">
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && apply()}
                placeholder={mode === 'protect' ? 'Set a password' : 'Enter current password'}
                className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
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

            {/* Strength bar — protect mode only */}
            {mode === 'protect' && password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`h-1 flex-1 rounded-full transition-all duration-200 ${n > strength.score ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                      style={{ background: n <= strength.score ? strength.color : undefined }}
                    />
                  ))}
                </div>
                <p className="text-[11px] font-medium" style={{ color: strength.color }}>{strength.label}</p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          {mode === 'protect' && (
            <div>
              <input
                type={showPw ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && apply()}
                placeholder="Confirm password"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-400">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              {error}
            </div>
          )}

          <button
            onClick={apply}
            disabled={
              isWorking ||
              !password ||
              (mode === 'protect' && (!confirmPassword || password !== confirmPassword))
            }
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isWorking ? (
              <span className="inline-flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {mode === 'protect' ? 'Protecting…' : 'Unlocking…'}
              </span>
            ) : (
              mode === 'protect' ? 'Protect PDF' : 'Unlock PDF'
            )}
          </button>

          {mode === 'protect' && (
            <p className="text-center text-[11px] text-slate-400">
              Uses 128-bit RC4 encryption — compatible with all PDF readers
            </p>
          )}
        </div>
      )}

      {/* Result */}
      {resultBytes && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                {mode === 'protect' ? 'PDF protected' : 'PDF unlocked'}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">{formatBytes(resultBytes.length)} · ready to save</p>
            </div>
            <button
              onClick={backToEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
              Edit
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={download}
              className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              Save PDF
            </button>
            <button
              onClick={openPreview}
              className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 text-sm font-medium transition-colors"
            >
              View PDF
            </button>
            <button
              onClick={reset}
              className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-500 text-sm transition-colors"
            >
              Start over
            </button>
          </div>
          <PdfContinueTo
            exclude={mode === 'protect' ? 'protect' : 'unlock'}
            pdfBytes={resultBytes}
            filename={file?.name ?? 'document.pdf'}
            sourceLabel={mode === 'protect' ? 'Protect PDF' : 'Unlock PDF'}
          />
        </div>
      )}

      {/* PDF preview modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(2,6,23,0.92)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closePreview(); }}
        >
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-white/8 shrink-0">
            <p className="text-sm font-semibold text-slate-100 truncate max-w-[70%]">
              {file?.name.replace(/\.pdf$/i, '')} &mdash; {mode === 'protect' ? 'protected' : 'unlocked'}
            </p>
            <button
              onClick={closePreview}
              className="text-slate-400 hover:text-slate-100 transition-colors p-1.5 rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 bg-slate-800 overflow-hidden">
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="PDF preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
