'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';

type State = 'idle' | 'working' | 'error';

export function OfflineDemo() {
  const [state, setState] = useState<State>('idle');
  const router = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);

  async function runDemo() {
    setState('working');
    try {
      // Draw a sample image entirely in the browser — no network, no files
      const canvas = document.createElement('canvas');
      canvas.width  = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no-ctx');

      const grad = ctx.createLinearGradient(0, 0, 400, 300);
      grad.addColorStop(0,   '#7c3aed');
      grad.addColorStop(0.5, '#2563eb');
      grad.addColorStop(1,   '#0891b2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 300);

      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(60 + i * 60, 150 + (i % 2 === 0 ? -30 : 30), 40, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.05 + i * 0.03})`;
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ImagePDF.Tools', 200, 165);

      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('blob-fail'))), 'image/png'),
      );

      const file = new File([blob], 'demo-sample.png', { type: 'image/png' });

      // Hand the file off to the compressor and navigate there
      setHandoff(file, 'About page demo');
      router.push('/compress-image');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {state !== 'error' && (
        <button
          onClick={runDemo}
          disabled={state === 'working'}
          className="inline-flex items-center gap-2.5 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        >
          {state === 'working' ? (
            <>
              <svg className="w-5 h-5 animate-spin text-violet-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Try Offline — Open Compressor with a Sample Image
            </>
          )}
        </button>
      )}

      {state === 'error' && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-2xl px-8 py-5 text-center">
          <p className="text-red-400 text-sm">Something went wrong — your browser may not support the Canvas API.</p>
          <button
            onClick={() => setState('idle')}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors mt-2 block mx-auto"
          >
            Try again
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500 max-w-sm text-center">
        Turns off your Wi-Fi first, then click. A sample image is generated in your browser and loaded directly into the compressor — no server involved.
      </p>
    </div>
  );
}
