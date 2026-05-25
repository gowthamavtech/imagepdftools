import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

const C = 'max-w-[1180px] mx-auto px-4 sm:px-8';

export function RelatedTools({ hrefs }: { hrefs: string[] }) {
  const tools = hrefs.map((h) => TOOLS[h]).filter(Boolean);
  if (!tools.length) return null;

  return (
    <section
      className="bd-t-1"
      style={{ paddingTop: 'clamp(56px, 8vw, 80px)', paddingBottom: 'clamp(64px, 9vw, 96px)' }}
    >
      <div className={C}>
        <span className="hp-eyebrow text-center">Related tools</span>
        <h2
          className="serif italic text-fg-1 text-center m-0 mb-10"
          style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
        >
          More tools you <em className="text-accent">might need.</em>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="tool-card group flex flex-col gap-4 bg-surface bd-2 rounded-[14px] p-5 no-underline transition-colors duration-150"
            >
              {/* Icon badge */}
              <div
                className="w-9 h-9 rounded-[10px] grid place-items-center shrink-0"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tool.icon}
                </svg>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 flex-1">
                <span className="hp-tool-name text-[13.5px] font-medium text-fg-1 leading-[1.3] tracking-[-0.005em] transition-colors duration-150">
                  {tool.label}
                </span>
                <span className="text-[12px] font-normal text-fg-3 leading-[1.5]">
                  {tool.desc}
                </span>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
