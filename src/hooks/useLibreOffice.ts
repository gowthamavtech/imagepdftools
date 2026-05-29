'use client';

import { useState, useCallback, useRef } from 'react';

export type HdStatus = 'idle' | 'loading' | 'converting' | 'done' | 'error';

export interface UseLibreOfficeReturn {
  status:          HdStatus;
  progress:        string;
  percent:         number;
  pdfBlob:         Blob | null;
  error:           string | null;
  isEngineReady:   boolean;
  isEngineLoading: boolean;
  convert:         (file: File) => void;
  preInit:         () => void;
  reset:           () => void;
}

export function useLibreOffice(): UseLibreOfficeReturn {
  const [status,          setStatus]          = useState<HdStatus>('idle');
  const [progress,        setProgress]        = useState('');
  const [percent,         setPercent]         = useState(0);
  const [pdfBlob,         setPdfBlob]         = useState<Blob | null>(null);
  const [error,           setError]           = useState<string | null>(null);
  const [isEngineReady,   setIsEngineReady]   = useState(false);
  const [isEngineLoading, setIsEngineLoading] = useState(false);

  const workerRef            = useRef<Worker | null>(null);
  // True once LibreOffice LOK has fully initialised.
  const workerReadyRef       = useRef<boolean>(false);
  // True while preInit() has started a worker but LOK has not yet fired {type:'ready'}.
  const preInitActiveRef     = useRef<boolean>(false);
  const compileTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatRef         = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (compileTimerRef.current) { clearTimeout(compileTimerRef.current);  compileTimerRef.current = null; }
    if (heartbeatRef.current)    { clearInterval(heartbeatRef.current);    heartbeatRef.current    = null; }
  };

  const reset = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current       = null;
    workerReadyRef.current  = false;
    preInitActiveRef.current = false;
    clearTimers();
    setStatus('idle');
    setProgress('');
    setPercent(0);
    setPdfBlob(null);
    setError(null);
    setIsEngineReady(false);
    setIsEngineLoading(false);
  }, []);

  // ── Silent background pre-initialisation ─────────────────────────────────
  // Call this on page mount. The engine downloads, compiles, and initialises
  // in the background while the user reads the page and prepares their file.
  // When the user finally clicks HD Convert the engine is either already
  // warm (instant conversion) or much further along (less waiting).
  const preInit = useCallback(() => {
    if (typeof self === 'undefined' || !self.crossOriginIsolated) return;
    if (workerRef.current || workerReadyRef.current || preInitActiveRef.current) return;

    preInitActiveRef.current = true;
    setIsEngineLoading(true);

    const worker  = new Worker('/lo-worker.js');
    workerRef.current = worker;
    const PROXY   = `${window.location.origin}/api/lo-wasm`;
    const initId  = `preinit-${Date.now()}`;

    worker.onmessage = ({ data }) => {
      if (data.type === 'loaded') {
        worker.postMessage({
          type:                   'init',
          id:                     initId,
          sofficeJs:              `${PROXY}/soffice.js`,
          sofficeWasm:            `${PROXY}/soffice.wasm`,
          sofficeData:            `${PROXY}/soffice.data`,
          sofficeWorkerJs:        `${PROXY}/soffice.worker.js`,
          // No progress tracking during silent preInit — avoids fetch-interceptor
          // overhead during the long LOK initialisation phase.
          enableProgressTracking: false,
          verbose:                false,
        });
        return;
      }
      if (data.id !== initId) return;
      if (data.type === 'ready') {
        workerReadyRef.current  = true;
        preInitActiveRef.current = false;
        setIsEngineReady(true);
        setIsEngineLoading(false);
      } else if (data.type === 'error') {
        preInitActiveRef.current = false;
        setIsEngineLoading(false);
        worker.terminate();
        workerRef.current = null;
      }
    };

    worker.onerror = () => {
      preInitActiveRef.current = false;
      setIsEngineLoading(false);
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  // ── Main convert entry point ───────────────────────────────────────────────
  const convert = useCallback((file: File) => {
    clearTimers();
    setPdfBlob(null);
    setError(null);

    if (!self.crossOriginIsolated) {
      setError(
        'HD Convert needs cross-origin isolation (required for LibreOffice pthreads). ' +
        'Please open DevTools → Application → Service Workers → Update, then hard-refresh (Ctrl+Shift+R).',
      );
      setStatus('error');
      return;
    }

    // ── Fast path: LOK already ready from preInit or previous conversion ─────
    if (workerRef.current && workerReadyRef.current) {
      const worker    = workerRef.current;
      const convertId = String(Date.now());

      setStatus('converting');
      setProgress('Converting document…');
      setPercent(90);

      const filePromise = file.arrayBuffer();

      const onError = (msg: string) => {
        setError(msg);
        setStatus('error');
        setProgress('');
        workerRef.current?.terminate();
        workerRef.current       = null;
        workerReadyRef.current  = false;
        setIsEngineReady(false);
        setIsEngineLoading(false);
      };

      worker.onmessage = async ({ data }) => {
        if (data.id !== convertId) return;
        if (data.type === 'result') {
          setPdfBlob(new Blob([data.data], { type: 'application/pdf' }));
          setStatus('done');
          setProgress('');
          setPercent(100);
        } else if (data.type === 'error') {
          onError(data.error ?? 'HD conversion failed.');
        }
      };

      worker.onerror = (err) => {
        const loc = err.filename ? ` — ${err.filename}:${err.lineno}` : '';
        onError(err.message || `Worker crashed${loc}`);
      };

      filePromise
        .then((buf) => {
          const arr = new Uint8Array(buf);
          worker.postMessage(
            { type: 'convert', id: convertId, inputData: arr, inputExt: 'docx', outputFormat: 'pdf' },
            [arr.buffer],
          );
        })
        .catch((e) => onError(`Could not read file: ${e instanceof Error ? e.message : String(e)}`));

      return;
    }

    // ── Take-over path: preInit worker is running but LOK not yet ready ──────
    // Re-attach the UI progress handlers to the existing worker instead of
    // terminating it — preserves all download and compile progress so far.
    if (workerRef.current && preInitActiveRef.current) {
      preInitActiveRef.current = false;
      const worker    = workerRef.current;
      const convertId = String(Date.now());

      setStatus('loading');
      setProgress('LibreOffice engine loading — almost there…');
      setPercent(5);

      const filePromise = file.arrayBuffer();

      const finishWithError = (msg: string) => {
        setError(msg);
        setStatus('error');
        setProgress('');
        clearTimers();
        worker.terminate();
        workerRef.current       = null;
        workerReadyRef.current  = false;
        setIsEngineReady(false);
        setIsEngineLoading(false);
      };

      // Heartbeat immediately — no progress events since preInit used tracking=false
      if (!heartbeatRef.current) {
        heartbeatRef.current = setInterval(() => {
          setPercent(prev => Math.min(prev + 1, 97));
        }, 30_000);
      }
      compileTimerRef.current = setTimeout(() => {
        compileTimerRef.current = null;
        setProgress('Initialising LibreOffice… (first run takes 5–15 min — files are cached for next time)');
      }, 3_000);

      worker.onmessage = async ({ data }) => {
        if (data.type === 'ready') {
          workerReadyRef.current = true;
          setIsEngineReady(true);
          setIsEngineLoading(false);
          clearTimers();
          setProgress('Converting document…');
          setPercent(90);
          setStatus('converting');
          try {
            const buf = await filePromise;
            const arr = new Uint8Array(buf);
            worker.postMessage(
              { type: 'convert', id: convertId, inputData: arr, inputExt: 'docx', outputFormat: 'pdf' },
              [arr.buffer],
            );
          } catch (e) {
            finishWithError(`Could not read file: ${e instanceof Error ? e.message : String(e)}`);
          }
        } else if (data.type === 'result' && data.id === convertId) {
          setPdfBlob(new Blob([data.data], { type: 'application/pdf' }));
          setStatus('done');
          setProgress('');
          setPercent(100);
        } else if (data.type === 'error') {
          finishWithError(data.error ?? 'HD conversion failed.');
        }
      };

      worker.onerror = (err) => {
        const loc = err.filename ? ` — ${err.filename}:${err.lineno}` : '';
        finishWithError(err.message || `Worker crashed${loc}`);
      };

      return;
    }

    // ── Cold-start path: no worker running at all ────────────────────────────
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current       = null;
      workerReadyRef.current  = false;
    }

    setStatus('loading');
    setProgress('Starting HD engine…');
    setPercent(3);
    setIsEngineLoading(true);

    const worker    = new Worker('/lo-worker.js');
    workerRef.current = worker;
    const id        = String(Date.now());
    const PROXY     = `${window.location.origin}/api/lo-wasm`;
    const filePromise = file.arrayBuffer();

    const finishWithError = (msg: string) => {
      setError(msg);
      setStatus('error');
      setProgress('');
      clearTimers();
      worker.terminate();
      workerRef.current       = null;
      workerReadyRef.current  = false;
      setIsEngineReady(false);
      setIsEngineLoading(false);
    };

    worker.onmessage = async ({ data }) => {
      if (data.type === 'loaded') {
        setProgress('Downloading LibreOffice engine…');
        setPercent(5);
        worker.postMessage({
          type:                   'init',
          id,
          sofficeJs:              `${PROXY}/soffice.js`,
          sofficeWasm:            `${PROXY}/soffice.wasm`,
          sofficeData:            `${PROXY}/soffice.data`,
          sofficeWorkerJs:        `${PROXY}/soffice.worker.js`,
          enableProgressTracking: true,
          verbose:                false,
        });
        return;
      }

      if (data.id !== id) return;

      if (data.type === 'progress') {
        const prog   = data.progress;
        const rawPct =
          typeof prog === 'number'                                         ? prog
          : prog && typeof prog === 'object' && typeof prog.percent === 'number' ? prog.percent
          : 0;
        const msg =
          prog && typeof prog === 'object' && prog.message ? prog.message
          : typeof data.message === 'string'               ? data.message
          : null;
        const mapped = Math.min(Math.round(rawPct * 0.88), 88);
        setPercent(mapped);
        if (msg) setProgress(msg);

        if (mapped >= 70) {
          if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
          compileTimerRef.current = setTimeout(() => {
            compileTimerRef.current = null;
            setProgress('Initialising LibreOffice… (first run takes 5–15 min — files are cached for next time)');
            if (!heartbeatRef.current) {
              heartbeatRef.current = setInterval(() => {
                setPercent(prev => Math.min(prev + 1, 97));
              }, 30_000);
            }
          }, 3_000);
        }

      } else if (data.type === 'ready') {
        workerReadyRef.current = true;
        setIsEngineReady(true);
        setIsEngineLoading(false);
        clearTimers();
        setProgress('Converting document…');
        setPercent(90);
        setStatus('converting');
        try {
          const buf = await filePromise;
          const arr = new Uint8Array(buf);
          worker.postMessage(
            { type: 'convert', id, inputData: arr, inputExt: 'docx', outputFormat: 'pdf' },
            [arr.buffer],
          );
        } catch (e) {
          finishWithError(`Could not read file: ${e instanceof Error ? e.message : String(e)}`);
        }

      } else if (data.type === 'result') {
        setPdfBlob(new Blob([data.data], { type: 'application/pdf' }));
        setStatus('done');
        setProgress('');
        setPercent(100);

      } else if (data.type === 'error') {
        finishWithError(data.error ?? 'HD conversion failed.');
      }
    };

    worker.onerror = (err) => {
      const loc = err.filename ? ` — ${err.filename}:${err.lineno}` : '';
      finishWithError(err.message || `Worker crashed${loc}`);
    };

  }, [reset]);

  return {
    status, progress, percent, pdfBlob, error,
    isEngineReady, isEngineLoading,
    convert, preInit, reset,
  };
}
