'use client';

import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';

export type PdfToolId =
  | 'compress' | 'merge' | 'split' | 'rotate' | 'organize'
  | 'number' | 'watermark' | 'protect' | 'unlock' | 'image-to-pdf'
  | 'pdf-to-jpg' | 'pdf-to-word';

const ALL_TOOLS = [
  {
    id: 'compress' as PdfToolId,
    href: '/compress-pdf',
    label: 'Compress PDF',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    fg: 'text-emerald-700 dark:text-emerald-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
  },
  {
    id: 'merge' as PdfToolId,
    href: '/merge-pdf',
    label: 'Merge PDF',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
    fg: 'text-rose-600 dark:text-rose-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
      </svg>
    ),
  },
  {
    id: 'rotate' as PdfToolId,
    href: '/rotate-pdf',
    label: 'Rotate PDF',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
    fg: 'text-violet-600 dark:text-violet-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: 'split' as PdfToolId,
    href: '/split-pdf',
    label: 'Split PDF',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    fg: 'text-amber-600 dark:text-amber-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
    ),
  },
  {
    id: 'protect' as PdfToolId,
    href: '/protect-pdf',
    label: 'Protect PDF',
    bg: 'bg-sky-100 dark:bg-sky-900/40',
    fg: 'text-sky-600 dark:text-sky-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 'unlock' as PdfToolId,
    href: '/unlock-pdf',
    label: 'Unlock PDF',
    bg: 'bg-cyan-100 dark:bg-cyan-900/40',
    fg: 'text-cyan-600 dark:text-cyan-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 'watermark' as PdfToolId,
    href: '/watermark-pdf',
    label: 'Watermark PDF',
    bg: 'bg-orange-100 dark:bg-orange-900/40',
    fg: 'text-orange-600 dark:text-orange-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L9.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    id: 'number' as PdfToolId,
    href: '/number-pdf',
    label: 'Add Page Numbers',
    bg: 'bg-indigo-100 dark:bg-indigo-900/40',
    fg: 'text-indigo-600 dark:text-indigo-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
      </svg>
    ),
  },
  {
    id: 'organize' as PdfToolId,
    href: '/organize-pdf',
    label: 'Organize PDF',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
    fg: 'text-teal-600 dark:text-teal-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
];

interface Props {
  /** The current tool — excluded from the suggestions */
  exclude: PdfToolId;
  /** Pass bytes to hand off the output PDF to the next tool. Omit for tools with non-PDF output. */
  pdfBytes?: Uint8Array;
  pdfBlob?: Blob;
  filename?: string;
  sourceLabel?: string;
}

export function PdfContinueTo({ exclude, pdfBytes, pdfBlob, filename = 'document.pdf', sourceLabel }: Props) {
  const router     = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);

  const tools = ALL_TOOLS.filter((t) => t.id !== exclude);

  const C = 'border-slate-100 dark:border-slate-700/80';
  const borderClass = (idx: number) => {
    if (idx === 0) return '';
    if (idx === 1) return `border-l ${C}`;
    if (idx === 2) return `border-t ${C}`;
    return `border-l border-t ${C}`;
  };

  const go = (href: string) => {
    if (pdfBytes || pdfBlob) {
      const blob = pdfBlob ?? new Blob([(pdfBytes as Uint8Array).buffer as ArrayBuffer], { type: 'application/pdf' });
      const file = new File([blob], filename, { type: 'application/pdf' });
      setHandoff(file, sourceLabel ?? exclude);
    }
    router.push(href);
  };

  return (
    <div className="mt-1 pt-4 -mb-2 border-t border-slate-200 dark:border-slate-700">
      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
        Continue to…
      </p>
      <div className="grid grid-cols-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        {tools.map((tool, idx) => (
          <button
            key={tool.id}
            onClick={() => go(tool.href)}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors text-left group ${borderClass(idx)}`}
          >
            <span className={`w-8 h-8 rounded-lg ${tool.bg} ${tool.fg} flex items-center justify-center shrink-0`}>
              {tool.icon}
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1 leading-tight">
              {tool.label}
            </span>
            <svg
              className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-400 transition-colors shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
