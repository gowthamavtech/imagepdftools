'use client';

import { useRouter } from 'next/navigation';
import { useHandoffStore } from '@/store/handoffStore';

type ToolId = 'compress' | 'crop' | 'strip' | 'edit' | 'resize';

const TOOLS = [
  {
    id: 'compress' as ToolId,
    label: 'Compress',
    desc: 'Reduce file size',
    href: '/',
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
];

interface Props {
  blob: Blob;
  filename: string;
  currentTool: ToolId;
  tools?: ToolId[];
}

export function NextActions({ blob, filename, currentTool }: Props) {
  const router = useRouter();
  const setHandoff = useHandoffStore((s) => s.setHandoff);

  function go(tool: typeof TOOLS[number]) {
    const file = new File([blob], filename, { type: blob.type });
    setHandoff(file);
    router.push(tool.href);
  }

  const suggestions = TOOLS.filter((t) => t.id !== currentTool);

  return (
    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
        Continue with
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((tool) => (
          <button
            key={tool.id}
            onClick={() => go(tool)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/40 text-gray-600 dark:text-gray-300 hover:text-violet-700 dark:hover:text-violet-300 text-xs font-medium transition-all"
          >
            <span className="text-gray-400 dark:text-gray-500">{tool.icon}</span>
            <span>{tool.label}</span>
            <span className="text-gray-400 dark:text-gray-500 text-[10px] hidden sm:inline">{tool.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
