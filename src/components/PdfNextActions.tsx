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

  const primary   = PDF_TOOLS.slice(0, 4);
  const secondary = PDF_TOOLS.slice(4);

  return (
    <div className="pt-4 mt-1 bd-t-1">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-data text-[10px] font-semibold tracking-[0.15em] uppercase text-fg-3">
          Continue with
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--border-1)' }} />
        <span className="font-data text-[10px] text-fg-3 tabular-nums">
          {(blob.size / 1024).toFixed(0)} KB PDF ready
        </span>
      </div>

      {/* Primary tools — 2×2 grid on mobile, 4-col on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        {primary.map((tool) => (
          <button
            key={tool.id}
            onClick={() => go(tool)}
            className="group flex flex-col items-start gap-1.5 px-3 py-2.5 rounded-xl bd-2 bg-elevated hover:bg-accent-dim hover:bd-accent transition-all text-left"
          >
            <span className="text-fg-3 group-hover:text-accent transition-colors">
              {tool.icon}
            </span>
            <div>
              <p className="text-[12px] font-semibold text-fg-1 leading-tight">{tool.label}</p>
              <p className="text-[10px] text-fg-3 mt-0.5">{tool.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Secondary tools — compact chip row */}
      <div className="flex flex-wrap gap-1.5">
        {secondary.map((tool) => (
          <button
            key={tool.id}
            onClick={() => go(tool)}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg bd-2 text-[11px] font-medium text-fg-2 hover:text-accent hover:bd-accent transition-all"
          >
            <span className="text-fg-3">{tool.icon}</span>
            {tool.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-fg-3 mt-2.5">
        Your PDF is passed directly — no re-upload needed.
      </p>
    </div>
  );
}
