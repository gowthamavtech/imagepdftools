# ImagePDF.Tools — Design Language

# Brand Identity

**Name:** ImagePDF.Tools
**Tagline:** Free Image & PDF Tools — Right in Your Browser
**Voice:** Direct, technical but accessible. No fluff. Specific numbers over vague claims.
**Trust signals used everywhere:** "No uploads", "100% Private", "Free", "Browser-based"

> This file is the design reference for the entire project. All new pages, components, and features must follow these patterns. The homepage (`src/app/page.tsx`) is the canonical reference implementation.

---

## 1. Foundations

### Color philosophy

The palette is warm-neutral base + single purple accent. Light mode uses a warm off-white (`#f4f1ea`) — not pure white. Dark mode uses near-black with a slight blue tint (`#0b0b0d`). The accent shifts: deep indigo in light (`#6e5de6`), soft violet in dark (`#9d95f5`).

All tokens are CSS custom properties set on `:root` and overridden in `.dark`. Always reference tokens, never hardcode hex values in components.

### Design tokens

**Surfaces**
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f4f1ea` | `#0b0b0d` |
| `--bg-surface` | `#ffffff` | `#111114` |
| `--bg-elevated` | `#faf7f0` | `#17171b` |

**Foreground**
| Token | Light | Dark | Use |
|---|---|---|---|
| `--fg-1` | `#0e0e10` | `#f0ebe3` | Headings, primary text |
| `--fg-2` | `#5a5a66` | `#7a7a8a` | Body text, secondary labels |
| `--fg-3` | `#a8a6b0` | `#3e3e4c` | Muted, disabled, ghost numerals |

**Accent (brand purple)**
| Token | Light | Dark |
|---|---|---|
| `--accent` | `#6e5de6` | `#9d95f5` |
| `--accent-hover` | `#5546db` | `#b8b2f8` |
| `--accent-dim` | `rgba(110,93,230,0.07)` | `rgba(157,149,245,0.08)` |
| `--accent-border` | `rgba(110,93,230,0.22)` | `rgba(157,149,245,0.18)` |
| `--accent-glow` | `rgba(110,93,230,0.30)` | `rgba(157,149,245,0.35)` |
| `--on-accent` | `#ffffff` | `#0b0b0d` |

**Always use `var(--on-accent)` for text on accent backgrounds** — this flips correctly between themes.

**Borders**
| Token | Light | Dark |
|---|---|---|
| `--border-1` | `rgba(14,14,16,0.07)` | `rgba(255,255,255,0.06)` |
| `--border-2` | `rgba(14,14,16,0.11)` | `rgba(255,255,255,0.09)` |
| `--border-3` | `rgba(14,14,16,0.17)` | `rgba(255,255,255,0.13)` |

**Border radius tokens**
| Token | Value |
|---|---|
| `--r-sm` | `6px` |
| `--r-md` | `10px` |
| `--r-lg` | `14px` |
| `--r-pill` | `30px` |

**Category colors** — used for tool category labels and accents
| Token | Light | Dark | Category |
|---|---|---|---|
| `--cat-compress` | `#6e5de6` | `#9d95f5` | Compress (same as accent) |
| `--cat-convert` | `#1f8a5b` | `#5dcaa5` | Convert (green) |
| `--cat-edit` | `#c25a36` | `#e8856a` | Edit (orange-red) |

---

## 2. Typography

### Font stack

Three typefaces, each with a strict role:

| CSS class / tag                      | Font             | Role                                              |
| ------------------------------------ | ---------------- | ------------------------------------------------- |
| `h1`, `h2`, `.serif`                 | Instrument Serif | Large display headings only                       |
| `body`, `h3`–`h6`, `button`, `input` | DM Sans          | All UI text, sub-headings                         |
| `.font-data`                         | JetBrains Mono   | Data: file sizes, dimensions, format labels, code |

Never use serif for UI components (buttons, inputs, labels, nav). Never use monospace for body copy.

### Heading conventions

- `h1` and `h2` (section titles): `font-family: serif`, `letter-spacing: -0.02em`, always **italic**
- `h3` (card/component titles): DM Sans, `font-weight: 500`, `letter-spacing: -0.005em`
- `h4` (UI micro-headings): DM Sans, `font-weight: 500`, small size

### Section headings pattern

All major section h2s follow this pattern:

```tsx
<h2
  className="serif italic text-center text-fg-1 m-0 mb-[18px]"
  style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
>
```

Hero h1 uses a larger clamp:

```tsx
style={{ fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
```

### Eyebrow label pattern (`.hp-eyebrow`)

Block-level mono label that precedes a section heading:

```css
.hp-eyebrow {
    display: block;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-3);
    margin-bottom: 16px;
}
```

Usage: `<span className="hp-eyebrow text-center">Section label</span>` (add `text-center` when centered).

### Body text sizes

| Use            | Size                                        | Weight | Color                      |
| -------------- | ------------------------------------------- | ------ | -------------------------- |
| Hero subtitle  | `19px`, `font-light`, leading `1.6`         | 300    | `text-fg-2`                |
| Section body   | `base` (16px), `font-normal`, leading `1.6` | 400    | `text-fg-2`                |
| Card body      | `13.5px`, leading `1.55`                    | 400    | `text-fg-2`                |
| Small body     | `14px–14.5px`, leading `1.7`                | 400    | `text-fg-2`                |
| Micro / labels | `11px–12.5px`                               | 500    | `text-fg-3` or `text-fg-2` |

### Fluid sizing

Use `clamp()` inline for responsive display headings. Never use Tailwind for these — Tailwind can't express arbitrary clamp values cleanly.

---

## 3. Layout

### Container

All sections use the same max-width container constant:

```tsx
const C = "max-w-[1180px] mx-auto px-8";
```

Apply as: `<div className={C}>` or `<div className={`${C} relative z-[1]`}>`.

### Section spacing

Sections use `clamp()` for vertical padding to scale fluidly with viewport:

- Large sections: `clamp(56px, 9vw, 112px) 0`
- Medium sections: `clamp(48px, 7vw, 88px) 0`
- Hero: `clamp(40px, 7vw, 72px) 0 clamp(48px, 7vw, 84px)`

Apply via `style={{ padding: "..." }}` (not Tailwind, since Tailwind can't use arbitrary clamp).

**Important:** When applying `padding` via inline `style` on a container that also uses Tailwind `px-*` for horizontal spacing, **never use the `padding` shorthand** — it overrides `px-8`. Use `paddingTop` and `paddingBottom` only:

```tsx
// Wrong — overrides px-8
style={{ padding: "52px 0 44px" }}

// Correct
style={{ paddingTop: "52px", paddingBottom: "44px" }}
```

### Breakpoints

| Name   | Value  | Use                                     |
| ------ | ------ | --------------------------------------- |
| `sm`   | 640px  | Mobile → small grid                     |
| `md`   | 768px  | Step cards switch from stacked to 3-col |
| `lg`   | 1024px | Two-column layouts, right ad            |
| `wide` | 1441px | Left ad appears (custom breakpoint)     |

### Grid patterns

- **Two-column hero**: `lg:grid-cols-[1.05fr_0.95fr]` — text slightly wider than mockup
- **Tools index**: `lg:grid-cols-[220px_1fr]` — fixed category label, fluid tool list
- **Three-col equal**: `md:grid-cols-3`
- **Content max-width**: `max-w-[1000px] mx-auto` for compare panels, cards, format list
- **FAQ max-width**: `max-w-[820px] mx-auto`

---

## 4. Component Patterns

### Buttons

All interactive accent-fill and outline buttons must use the button interaction classes below. **Never set `background` via inline style on a button that uses `btn-accent`** — the CSS class owns the background so `:hover` can override it.

**Primary (accent fill) — `btn-accent`**

```tsx
className="inline-flex items-center gap-2 h-12 px-[22px] rounded-[10px] bg-accent btn-accent text-[14.5px] font-medium no-underline"
style={{ color: 'var(--on-accent)' }}
```

`btn-accent` sets `background: var(--accent)` as the base and transitions to `--accent-hover` on hover. `bg-accent` is still included so Tailwind's purge keeps the token, but do not add an inline `background` property alongside it.

**Secondary (accent outline → fill on hover) — `btn-accent-outline`**

```tsx
className="inline-flex items-center gap-1.5 h-12 px-[22px] rounded-[10px] bg-transparent bd-accent text-accent text-[14.5px] font-medium no-underline btn-accent-outline"
```

On hover: fills with `--accent`, text becomes `--on-accent`, border becomes `--accent`. Do not add a `→` in a separate `text-fg-3` span — keep it inline so it inherits the color change.

**Small accent fill (primary hub links)**

```tsx
className="flex items-center gap-2 no-underline h-[34px] px-4 rounded-full bg-accent btn-accent text-[12.5px] font-medium"
style={{ color: 'var(--on-accent)' }}
```

**Small accent outline (secondary hub links)**

```tsx
className="flex items-center gap-2 no-underline h-[34px] px-4 rounded-full bg-transparent bd-accent text-accent text-[12.5px] font-medium btn-accent-outline"
```

**Hub link pair convention**: PDF tools is always the primary (fill) button; Image tools is the secondary (outline). Order: PDF first, Image second.

**Segmented CTA group (bottom of page)**
Wrapper: `rounded-[30px] bg-surface bd-2 p-2 gap-[10px]` — contains 2–3 pill buttons inside.

### Pills and chips

**Status pill (hero)**

```tsx
className = "inline-flex items-center gap-[10px] h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium";
```

With an animated dot: `className="hp-pill-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0"`

**Trust chips**

```tsx
className = "inline-flex items-center gap-2 h-[30px] px-[14px] rounded-full bg-surface bd-2 text-fg-2 text-[11.5px] font-medium";
```

**Metric badge (file compression %)**

```tsx
className = "mono text-[10.5px] font-medium text-accent bg-accent-dim bd-accent rounded-[4px] py-1 px-[7px]";
```

**Category label pill (on cards)**

```tsx
className="mono text-[10.5px] font-medium tracking-[0.16em] uppercase py-1.5 px-[10px] rounded-md inline-block"
style={{ color, background, border }}
```

### Cards

**Standard surface card**: `bg-surface bd-2 rounded-[14px]`

- Body padding: `py-[26px] px-6`

**Elevated card**: `bg-elevated bd-2 rounded-[14px]`

- Use for featured items (e.g., PDF featured strip in footer)

**"Bad" (warning) card**: custom border + background using `--cat-edit` color

```tsx
style={{ border: "1px solid rgba(232,133,106,0.18)", background: "rgba(232,133,106,0.03)" }}
```

**"Good" (accent) card**: `bg-surface bd-2` with accent hairline at top

```tsx
<div className="relative rounded-[14px] p-7 bg-surface bd-2">
  <div
    aria-hidden="true"
    className="absolute top-[-1px] left-[8%] right-[8%] h-px"
    style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }}
  />
```

### Accent hairline

A 1px gradient line used to highlight the top of "featured" elements:

```tsx
style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }}
```

Position: `absolute top-[-1px] left-[8%] right-[8%] h-px`. Parent must be `relative`.

### Ambient glow

Blurred radial gradients positioned behind content for depth:

```tsx
<div
    aria-hidden="true"
    className="absolute pointer-events-none z-0 opacity-60"
    style={{
        left: "-10%",
        top: "-20%",
        width: "1100px",
        height: "800px",
        background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(40px)",
    }}
/>
```

Parent section needs `relative overflow-hidden`. Content inside uses `relative z-[1]`.

For page-center CTA glows, use `top: "30%"` and `filter: blur(60px)` with `opacity-90`.

### Category column header

Used in the tools index and footer sitemap:

```tsx
<div className="flex items-center gap-3 pt-[10px]">
    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: `var(--cat-${cat})` }} aria-hidden="true" />
    <span className="mono text-[11px] font-medium tracking-[0.18em] uppercase" style={{ color: `var(--cat-${cat})` }}>
        ◆ {label}
    </span>
</div>
```

### Tool row (index list)

```tsx
<Link className="hp-tool-row grid gap-4 items-baseline py-3 bd-b-dash-1 no-underline" style={{ gridTemplateColumns: "1fr auto" }}>
    <span className="hp-tool-name text-[14.5px] font-medium text-fg-1 tracking-[-0.005em] transition-colors duration-150">{name}</span>
    <span className="text-[12.5px] font-normal text-fg-2 leading-[1.5]">{desc}</span>
</Link>
```

On hover, left-indents by 6px and `.hp-tool-name` turns accent. (CSS in `globals.css`.)

### Step cards

Three-column layout divided by 1px borders (not cards). CSS class `.step-card` handles responsive padding and dividers. Ghost numeral in corner — monospace, brand-colored, very large:

```tsx
<span aria-hidden="true" className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none"
  style={{ fontSize: 'clamp(72px, 10vw, 108px)', opacity: 0.18, letterSpacing: '-0.05em' }}>
  {num}
</span>
```

Font is `font-data` (JetBrains Mono) for a modern/technical feel. Opacity `0.18` keeps it visible without competing with content.

### FAQ accordion

Native `<details>`/`<summary>` with class `hp-faq`. Toggle icon rotates 45° on open via CSS. Answer padding class: `hp-faq-answer`.

### Pull quote

Large centered serif italic quote, no attribution. Quotation marks are accent-colored and `not-italic`. The key differentiating phrase is wrapped in `text-accent`:

```tsx
<p className="serif italic text-fg-1 m-0 max-w-[44ch] text-center mx-auto" style={{ fontSize: "clamp(24px, 3.5vw, 38px)", lineHeight: 1.25, letterSpacing: "-0.015em" }}>
    <span className="text-accent not-italic">&ldquo;</span>
    Built for people who don&rsquo;t want to explain why they won&rsquo;t{' '}
    <span className="text-accent">upload client files to a random website.</span>
    <span className="text-accent not-italic">&rdquo;</span>
</p>
```

### Accent text in headings

Key phrases within section headings and the pull quote are wrapped in `<span className="text-accent">` or `<em className="text-accent">` to draw the eye to the core message. Applied to:
- "three" in the steps heading
- "uploads your files." in the problem heading
- "All in the browser." in the formats heading
- Key claim phrase in the pull quote

### List items with icon badges

Used in compare panels:

```tsx
<li className="relative text-sm leading-[1.55] text-fg-2 pl-7">
    <span
        className="absolute left-0 top-[1px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
        style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}
    >
        {/* CSS-only checkmark — 9×5px rotated square border */}
        <span className="block w-[9px] h-[5px] -rotate-45" style={{ borderLeft: "1.5px solid var(--accent)", borderBottom: "1.5px solid var(--accent)" }} />
    </span>
    {item}
</li>
```

For "bad" variant, use `--cat-edit` color and a chevron (border-top + border-right, rotated 45°).

### Browser mockup

Used in hero section. Structure: outer `bg-surface bd-2 rounded-xl overflow-hidden` with drop shadow, inner chrome bar (`bg-elevated bd-b-1`), macOS traffic lights, address bar, content area.

---

## 5. Utility Classes

All defined in `globals.css` under `@layer utilities`:

```
Text:     .text-fg-1  .text-fg-2  .text-fg-3  .text-accent  .text-cat-edit
Bg:       .bg-page  .bg-surface  .bg-elevated  .bg-accent  .bg-accent-dim
Borders:  .bd-1  .bd-2  .bd-3  .bd-accent
          .bd-t-1  .bd-b-1  .bd-r-1  .bd-b-dash-1
```

Button interaction classes (defined in `globals.css`):

- `.btn-accent` — sets `background: var(--accent)` + `transition: background-color 0.15s ease` + `:hover { background: var(--accent-hover) }`. **The class owns the background** — do not set `background` via inline style alongside it.
- `.btn-accent-outline` — transitions `background`, `color`, `border-color` on hover to fill with accent and flip text to `--on-accent`.

Special classes:

- `.serif` — applies Instrument Serif font-family
- `.font-data` — applies JetBrains Mono font-family
- `.hp-eyebrow` — section eyebrow label (mono, uppercase, spaced)
- `.hp-tool-row` — hover indent on tool list rows
- `.step-card` — responsive step card dividers

---

## 6. Dark Mode

Class-based dark mode: `.dark` on `<html>`, managed by `ThemeProvider`. All tokens automatically flip when `.dark` is present.

Convention in `globals.css`:

```css
@variant dark (&:where(.dark, .dark *));
```

Use `dark:` Tailwind prefix where needed for class-based properties. For token-based values (color via `var(--fg-1)` etc.), dark mode is automatic — no `dark:` needed.

Default is system preference, persisted in `localStorage` as `'theme'`.

---

## 7. Navigation

**Header** (`SiteHeader.tsx`): Sticky, `backdrop-filter: blur(12px)`, background `var(--nav-bg)` (semi-transparent tinted bg). Contains: logo, Image Tools mega-menu, PDF Tools dropdown, pricing link, theme toggle, language selector, auth buttons.

**Mega menu**: Full-width panel below header — tool grid by category.

**Mobile**: Hamburger with flyout. Single `mousedown` handler on `headerRef` to close — do not add a separate `menuRef`.

---

## 8. Footer

**Footer** (`SiteFooter.tsx`): Background `var(--bg)` (same as page body, no visual separation except a top border).

Structure:

1. **Brand strip**: Logo + serif italic tagline ("Your files _never_ leave your device." — "never" in `text-accent`) + accent trust badges (`bg-accent-dim bd-accent text-accent`)
2. **PDF featured card**: `bg-elevated bd-2 rounded-[14px]`, accent header label, 5-column link grid
3. **Other category columns**: Compress, Convert, Edit, About — each with `◆` prefix + category color
4. **Bottom bar**: Small logo + copyright line

---

## 9. Animation and Interaction

- Accent pill dot: `hp-pulse` keyframe (box-shadow glow pulse, 1.6s ease-in-out infinite)
- Drop zone active: `pulse-border` keyframe (border color + shadow pulse)
- Processing glow: `glow-processing` class (border glow pulse)
- Theme transition: `background-color 0.2s, color 0.2s` on `body`
- FAQ toggle: `transform 0.2s` rotate on `open`
- Tool row hover: `padding-left 0.15s` indent
- **Accent button hover** (`.btn-accent`): `background-color 0.15s ease` → `--accent-hover`
- **Outline button hover** (`.btn-accent-outline`): `background-color`, `color`, `border-color` all `0.15s ease` → fill with accent

No page transitions. No scroll animations. Keep motion minimal and purposeful.

---

## 10. Key Design Decisions

| Decision                                          | Rationale                                                  |
| ------------------------------------------------- | ---------------------------------------------------------- |
| Warm off-white bg (`#f4f1ea`) not pure white      | Feels editorial, reduces harshness                         |
| Serif italic for all h1/h2                        | Gives personality; DM Sans handles all UI text             |
| `clamp()` for display text sizing                 | Scales fluidly without breakpoint jumps                    |
| `var(--on-accent)` not hardcoded white            | Flips correctly in dark mode                               |
| `.btn-accent` owns background, not inline style   | Inline styles override CSS `:hover` — class must own it    |
| Step numbers use `font-data`, not serif           | Monospace reads as technical/modern; serif felt decorative |
| Key phrases in headings wrapped in `text-accent`  | Draws the eye to the core claim without changing structure |
| Inline `paddingTop`/`paddingBottom` on containers | `padding` shorthand overrides Tailwind `px-8`              |
| Category colors (compress/convert/edit)           | Visual category recognition across all surfaces            |
| Ambient blur glows, not decorative images         | Lightweight, theme-aware, performant                       |
| `◆` prefix on category labels                     | Consistent decorative marker across tools index and footer |
