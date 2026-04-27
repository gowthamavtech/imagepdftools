'use client';

const FORMATS = [
  { label: 'JPEG', value: 'image/jpeg',    tip: 'MozJPEG · DCT + chroma subsampling' },
  { label: 'PNG',  value: 'image/png',     tip: 'Median-cut palette + DEFLATE' },
  { label: 'WebP', value: 'image/webp',    tip: 'libwebp · VP8 predictive coding' },
  { label: 'SVG',  value: 'image/svg+xml', tip: 'Metadata strip + coord rounding' },
] as const;

interface Props {
  value: string;
  onChange: (format: string) => void;
}

export function FormatSelector({ value, onChange }: Props) {
  const active = FORMATS.find((f) => f.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex items-center gap-1 bg-slate-100 dark:bg-blue-950/40 rounded-xl p-1"
        role="group"
        aria-label="Output format"
      >
        {FORMATS.map(({ label, value: fv }) => (
          <button
            key={fv}
            type="button"
            onClick={() => onChange(fv)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              value === fv
                ? 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400'
            }`}
            aria-pressed={value === fv}
          >
            {label}
          </button>
        ))}
      </div>
      {active && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-right pr-1">{active.tip}</p>
      )}
    </div>
  );
}
