'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';
import { useHistoryStore } from '@/store/historyStore';

type ToolId = 'compress' | 'crop' | 'strip' | 'edit' | 'resize' | 'flip' | 'pdf';

const TOOLS = [
  {
    id: 'compress' as ToolId,
    label: 'Compress',
    desc: 'Reduce file size',
    href: '/compress-image',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
  },
  {
    id: 'crop' as ToolId,
    label: 'Crop',
    desc: 'Trim or resize',
    href: '/crop-image',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v14a1 1 0 001 1h14M3 6h14a1 1 0 011 1v14" />
      </svg>
    ),
  },
  {
    id: 'strip' as ToolId,
    label: 'Remove Metadata',
    desc: 'Strip EXIF & GPS',
    href: '/remove-metadata',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: 'edit' as ToolId,
    label: 'Edit Metadata',
    desc: 'View & remove EXIF',
    href: '/metadata-editor',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'resize' as ToolId,
    label: 'Resize',
    desc: 'Change dimensions',
    href: '/resize-image',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
  },
  {
    id: 'flip' as ToolId,
    label: 'Flip / Rotate',
    desc: 'Mirror or rotate',
    href: '/flip-image',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    id: 'pdf' as ToolId,
    label: 'Image to PDF',
    desc: 'Bundle into PDF',
    href: '/image-to-pdf',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

interface Props {
  blob: Blob;
  filename: string;
  currentTool: ToolId;
  tools?: ToolId[];
}

export function NextActions({ blob, filename, currentTool }: Props) {
  const router     = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);
  const { entries, undo } = useHistoryStore();
  const [dragTarget, setDragTarget] = useState<string | null>(null);

  function go(tool: typeof TOOLS[number]) {
    const file = new File([blob], filename, { type: blob.type });
    setHandoff(file, tool.label);
    router.push(tool.href);
  }

  function handleUndo() {
    const snap = undo();
    if (!snap) return;
    setHandoff(new File([snap.blob], snap.filename, { type: snap.blob.type }));
    router.push(snap.toolHref);
  }

  const suggestions = TOOLS.filter((t) => t.id !== currentTool);

  return (
    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Continue with
        </p>
        {entries.length > 0 && (
          <button
            onClick={handleUndo}
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Undo last step
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((tool) => (
          <button
            key={tool.id}
            onClick={() => go(tool)}
            onDragOver={(e) => { e.preventDefault(); setDragTarget(tool.id); }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragTarget(null); }}
            onDrop={(e) => { e.preventDefault(); setDragTarget(null); go(tool); }}
            className={`inline-flex items-center gap-2 px-3 py-2.5 sm:py-2 rounded-xl border text-xs font-medium transition-all ${
              dragTarget === tool.id
                ? 'border-violet-500 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 scale-105'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-300'
            }`}
          >
            <span className={dragTarget === tool.id ? 'text-violet-500' : 'text-slate-500 dark:text-slate-400'}>{tool.icon}</span>
            <span>{tool.label}</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] hidden sm:inline">{tool.desc}</span>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 dark:text-slate-400">Tip: drag the result image onto a tool to continue</p>
    </div>
  );
}
