'use client';

import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';

interface PdfTool {
  id: string;
  label: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

const PDF_TOOLS: PdfTool[] = [
  {
    id: 'compress',
    label: 'Compress PDF',
    desc: 'Reduce file size',
    href: '/compress-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
  },
  {
    id: 'merge',
    label: 'Merge PDF',
    desc: 'Combine files',
    href: '/merge-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
      </svg>
    ),
  },
  {
    id: 'protect',
    label: 'Protect PDF',
    desc: 'Add password',
    href: '/protect-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 'number',
    label: 'Add Page Numbers',
    desc: 'Number pages',
    href: '/number-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
      </svg>
    ),
  },
  {
    id: 'watermark',
    label: 'Watermark PDF',
    desc: 'Stamp pages',
    href: '/watermark-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L9.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    id: 'split',
    label: 'Split PDF',
    desc: 'Extract pages',
    href: '/split-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
    ),
  },
  {
    id: 'jpg',
    label: 'PDF to JPG',
    desc: 'Export as images',
    href: '/pdf-to-jpg',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

function formatBytes(bytes: number): string {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024)     return `${(bytes / 1_024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function sizeHint(bytes: number): { label: string; color: string } | null {
  const mb = bytes / 1_048_576;
  if (mb >= 5)  return { label: 'Large — compression recommended', color: 'text-amber-500' };
  if (mb >= 1)  return { label: 'Consider compressing for sharing', color: 'text-fg-3' };
  return null;
}

interface Props {
  blob: Blob;
  filename: string;
  sourceLabel?: string;
}

export function PdfNextActions({ blob, filename, sourceLabel = 'Word to PDF' }: Props) {
  const router     = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);

  function go(tool: PdfTool) {
    const file = new File([blob], filename, { type: 'application/pdf' });
    setHandoff(file, sourceLabel);
    router.push(tool.href);
  }

  const sizeLabel = formatBytes(blob.size);
  const hint      = sizeHint(blob.size);

  return (
    <div className="pt-4 mt-1 bd-t-1">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-data text-[10px] font-semibold tracking-[0.15em] uppercase text-fg-3">
          Continue with
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--border-1)' }} />
        <span className="font-data text-[10px] text-fg-3 tabular-nums">
          PDF ready · <span className="font-semibold text-fg-2">{sizeLabel}</span>
        </span>
      </div>

      {/* Size hint */}
      {hint && (
        <div className={`flex items-center gap-1.5 mb-2.5 text-[11px] ${hint.color}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {hint.label}
        </div>
      )}

      {/* All tools — uniform chip row, wraps on small screens */}
      <div className="flex flex-wrap gap-2">
        {PDF_TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => go(tool)}
            className="inline-flex items-center gap-2 px-3 py-2.5 sm:py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-300"
          >
            <span className="text-slate-500 dark:text-slate-400 shrink-0">{tool.icon}</span>
            <span>{tool.label}</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] hidden sm:inline">
              {tool.id === 'compress' ? sizeLabel + ' · reduce size' : tool.desc}
            </span>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-fg-3 mt-3">
        PDF passed directly — no re-upload needed.
      </p>
    </div>
  );
}
