import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export function RelatedTools({ hrefs }: { hrefs: string[] }) {
  const tools = hrefs.map((h) => TOOLS[h]).filter(Boolean);
  if (!tools.length) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 pb-10 mt-2">
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">Related tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group flex flex-col gap-2 p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 transition-colors`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.iconBg}`}>
                <svg className={`w-3.5 h-3.5 ${tool.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {tool.icon}
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2">{tool.label}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
