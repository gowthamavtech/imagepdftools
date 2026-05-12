import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export function RelatedTools({ hrefs }: { hrefs: string[] }) {
  const tools = hrefs.map((h) => TOOLS[h]).filter(Boolean);
  if (!tools.length) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 pb-10 mt-2">
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Related Tools</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 transition-all ${tool.hoverBorder}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.iconBg}`}>
              <svg className={`w-3.5 h-3.5 ${tool.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {tool.icon}
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight line-clamp-2">{tool.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
