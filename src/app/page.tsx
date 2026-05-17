import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ImagePDF.Tools — Free Image & PDF Tools Online",
    description: "Compress, convert, crop, resize images and PDFs — 30+ free tools, all browser-native. Your files never leave your device.",
    keywords: [
        "image compressor",
        "compress image online",
        "compress PDF online",
        "free image tools",
        "reduce image size",
        "convert image to webp",
        "resize image online",
        "crop image online",
        "png compressor",
        "jpeg compressor",
        "image to pdf",
        "browser image tools",
    ],
    alternates: { canonical: "https://imagepdf.tools" },
    openGraph: {
        type: "website",
        url: "https://imagepdf.tools",
        title: "ImagePDF.Tools — Free Image & PDF Tools Online",
        description: "Compress, convert, crop, resize images and PDFs — all free, all in your browser. No uploads, no account, 100% private.",
        siteName: "ImagePDF.Tools",
        images: [{ url: "https://imagepdf.tools/og-image.png", width: 1200, height: 630, alt: "ImagePDF.Tools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "ImagePDF.Tools — Free Image & PDF Tools Online",
        description: "Compress, convert, crop, resize images and PDFs — all free, all in your browser.",
        images: ["https://imagepdf.tools/og-image.png"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ImagePDF.Tools",
        url: "https://imagepdf.tools",
        description: "Free browser-based image and PDF tools. No uploads required.",
    },
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ImagePDF.Tools",
        url: "https://imagepdf.tools",
        logo: "https://imagepdf.tools/icons/logo.svg",
        contactPoint: { "@type": "ContactPoint", email: "support@imagepdf.tools", contactType: "customer support" },
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Are these tools really free?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. All core tools are permanently free with no account required." },
            },
            {
                "@type": "Question",
                name: "Do you upload my files to a server?",
                acceptedAnswer: { "@type": "Answer", text: "No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API." },
            },
        ],
    },
];

const TOOL_CATS = [
    {
        cat: "compress",
        label: "Compress",
        items: [
            { href: "/compress-image", name: "Image Compressor", desc: "JPG, PNG, WebP — up to 80% smaller" },
            { href: "/compress-png-online", name: "PNG Compressor", desc: "Lossy quantization, 40–70% smaller" },
            { href: "/compress-jpeg-online", name: "JPEG Compressor", desc: "Fine-grained quality control, batches" },
            { href: "/reduce-image-size", name: "Reduce Image Size", desc: "Target file size, like a budget" },
            { href: "/compress-pdf", name: "Compress PDF", desc: "Shrink PDFs while keeping quality" },
        ],
    },
    {
        cat: "convert",
        label: "Convert",
        items: [
            { href: "/convert-image-to-webp", name: "Any → WebP", desc: "Modern format, 25% smaller than JPG" },
            { href: "/convert-png-to-jpeg", name: "PNG → JPG", desc: "Lossless transition, full compatibility" },
            { href: "/jpg-to-png", name: "JPG → PNG", desc: "Lossless, transparent backgrounds preserved" },
            { href: "/webp-to-jpg", name: "WebP → JPG", desc: "Back to broader compatibility" },
            { href: "/convert/svg-to-png", name: "SVG → PNG", desc: "Rasterize at any resolution" },
        ],
    },
    {
        cat: "edit",
        label: "Edit",
        items: [
            { href: "/crop-image", name: "Crop Image", desc: "Free-form, aspect ratio, or smart crop" },
            { href: "/resize-image", name: "Resize Image", desc: "Exact pixels, percentage, or fit-within" },
            { href: "/rotate-image", name: "Rotate Image", desc: "90°, lossless for JPEG and PNG" },
            { href: "/flip-image", name: "Flip Image", desc: "Mirror horizontally or vertically" },
            { href: "/remove-metadata", name: "Remove Metadata", desc: "Strip EXIF, location, camera info" },
        ],
    },
    {
        cat: "pdf",
        label: "PDF",
        items: [
            { href: "/image-to-pdf", name: "Image → PDF", desc: "Bundle images into a single document" },
            { href: "/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDFs in order" },
            { href: "/split-pdf", name: "Split PDF", desc: "Extract pages or split into ranges" },
            { href: "/compress-pdf", name: "Compress PDF", desc: "Down-sample images, dedupe fonts" },
        ],
    },
];

const FAQS = [
    {
        q: "Are these tools really free?",
        a: "Yes. All core tools (compress, convert, crop, resize, flip, rotate, remove metadata) are permanently free, with no account required.",
    },
    {
        q: "Do you upload my images or PDFs to a server?",
        a: "No. Every tool runs entirely inside your browser using WebAssembly and the Canvas API. Your files never leave your device.",
    },
    { q: "Which formats are supported?", a: "JPEG, PNG, WebP, and SVG for image tools, and PDF for compress, split, merge, and metadata tools." },
    { q: "Does it work on mobile?", a: "Yes. All tools work on iOS and Android in Chrome, Safari, Firefox, and Edge. No app download needed." },
    {
        q: "Is there a file size limit?",
        a: "The free tier permits files up to 50 MB. The practical ceiling is ~150 MB depending on your device having enough memory. For best results with large files, use a desktop browser.",
    },
    {
        q: "Do I need to install anything?",
        a: "No. All tools run in your browser using WebAssembly and the Canvas API. No extensions, plug-ins or downloads are required. Open the tool on any device, drop a file in, and get the result.",
    },
    {
        q: "Which browsers are supported?",
        a: "Chrome 91 and later, Firefox 90 and later, Safari 15.2 and later, and Edge 91 and later are fully supported. WebAssembly and the Canvas API are required to run any browser.",
    },
    {
        q: "Is there a paid plan?",
        a: "Yes. The free tier covers all tools for individual use. A small Pro plan unlocks batch processing beyond 5 files. It is billed monthly via Stripe and can be cancelled any time from your account page.",
    },
];

/* ── Container helper ─────────────────────────────────────── */
const C = "max-w-[1180px] mx-auto px-8";

/* ── Zero cards category token map ───────────────────────── */
const zeroCatStyle = (cat: string): React.CSSProperties => {
    const map: Record<string, { color: string; bg: string; border: string }> = {
        compress: { color: "var(--cat-compress)", bg: "rgba(157,149,245,0.08)", border: "rgba(157,149,245,0.18)" },
        convert: { color: "var(--cat-convert)", bg: "rgba(93,202,165,0.08)", border: "rgba(93,202,165,0.22)" },
        edit: { color: "var(--cat-edit)", bg: "rgba(232,133,106,0.08)", border: "rgba(232,133,106,0.22)" },
        pdf: { color: "var(--fg-1)", bg: "var(--bg-elevated)", border: "var(--border-2)" },
    };
    const t = map[cat] ?? map.compress;
    return { color: t.color, background: t.bg, border: `1px solid ${t.border}` };
};

export default function HomePage() {
    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            <main className="bg-page text-fg-1">
                {/* ── 1. HERO ─────────────────────────────────────────────────── */}
                <section className="relative overflow-hidden" style={{ padding: "clamp(40px, 7vw, 72px) 0 clamp(48px, 7vw, 84px)" }}>
                    {/* Ambient glows */}
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
                    <div
                        aria-hidden="true"
                        className="absolute pointer-events-none z-0 opacity-30"
                        style={{
                            right: "-10%",
                            top: "10%",
                            width: "900px",
                            height: "700px",
                            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />

                    <div className={`${C} relative z-[1]`}>
                        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center" style={{ gap: "clamp(32px, 5vw, 64px)" }}>
                            {/* Left — text */}
                            <div>
                                {/* Status pill */}
                                <span className="inline-flex items-center gap-[10px] h-[30px] px-[14px] rounded-full bg-accent-dim bd-accent text-accent text-[11.5px] font-medium mb-[26px]">
                                    <span className="hp-pill-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                    100% private · No servers · Your browser
                                </span>

                                <h1 className="serif italic text-fg-1 m-0 mb-7" style={{ fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
                                    Your files.
                                    <br />
                                    Your device.
                                    <br />
                                    <span className="text-accent">Your rules.</span>
                                </h1>

                                <p className="font-light text-[19px] leading-[1.6] text-fg-2 max-w-[46ch] m-0 mb-8">
                                    Drop a file. Every operation runs via <strong className="text-fg-1 font-normal">WebAssembly</strong> on your own device. No servers, no sign-up,
                                    30+ tools — permanently free.
                                </p>

                                {/* CTAs */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <Link
                                        href="/pdf-tools"
                                        className="inline-flex items-center gap-2 h-12 px-[22px] rounded-[10px] bg-accent text-[14.5px] font-medium no-underline btn-accent"
                                        style={{ color: "var(--on-accent)" }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        All PDF tools
                                    </Link>
                                    <Link
                                        href="/image-tools"
                                        className="inline-flex items-center gap-1.5 h-12 px-[22px] rounded-[10px] bg-transparent bd-accent text-accent text-[14.5px] font-medium no-underline btn-accent-outline"
                                    >
                                        All image tools →
                                    </Link>
                                </div>

                                {/* Trust chips */}
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        {
                                            label: "No upload limit",
                                            icon: (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            label: "In-browser only",
                                            icon: (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                                    <line x1="8" y1="21" x2="16" y2="21" />
                                                    <line x1="12" y1="17" x2="12" y2="21" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            label: "Runs as you connect",
                                            icon: (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            label: "Works offline",
                                            icon: (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                    <path d="M5 12.55a11 11 0 0 1 14 0" />
                                                    <path d="M2 8.82a15 15 0 0 1 20 0" />
                                                    <line x1="12" y1="20" x2="12.01" y2="20" />
                                                </svg>
                                            ),
                                        },
                                    ].map(({ label, icon }) => (
                                        <span
                                            key={label}
                                            className="inline-flex items-center gap-2 h-[30px] px-[14px] rounded-full bg-surface bd-2 text-fg-2 text-[11.5px] font-medium"
                                        >
                                            <span className="text-accent">{icon}</span>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right — browser mockup */}
                            <div>
                                <div
                                    className="relative bg-surface bd-2 rounded-xl overflow-hidden"
                                    style={{ boxShadow: "0 32px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)" }}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-[-1px] left-[8%] right-[8%] h-px z-[2]"
                                        style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }}
                                    />

                                    {/* Chrome bar */}
                                    <div className="flex items-center gap-3 p-3 px-4 bg-elevated bd-b-1">
                                        <div aria-hidden="true" className="flex gap-1.5">
                                            <span className="w-[11px] h-[11px] rounded-full opacity-85" style={{ background: "#ff5f57" }} />
                                            <span className="w-[11px] h-[11px] rounded-full opacity-85" style={{ background: "#febc2e" }} />
                                            <span className="w-[11px] h-[11px] rounded-full opacity-85" style={{ background: "#28c840" }} />
                                        </div>
                                        <div className="mono flex-1 h-[26px] rounded-md bg-page bd-1 flex items-center px-[10px] gap-2 text-[11.5px] font-medium text-fg-2">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                                className="shrink-0"
                                                style={{ color: "var(--cat-convert)" }}
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 4" />
                                            </svg>
                                            imagepdf.tools/compress-image
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 bg-page">
                                        {/* Drop zone */}
                                        <div className="bd-3 border-dashed rounded-[10px] bg-surface py-6 px-5 text-center mb-[14px]">
                                            <div className="w-10 h-10 bd-2 rounded-[10px] grid place-items-center text-accent mx-auto mb-[10px] bg-page">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <path d="M17 8l-5-5-5 5" />
                                                    <path d="M12 3v12" />
                                                </svg>
                                            </div>
                                            <h4 className="text-[13.5px] font-medium leading-[1.3] text-fg-1 m-0 mb-1">Drop your image here</h4>
                                            <p className="text-[11.5px] font-normal leading-[1.4] text-fg-2 m-0 mb-3">JPEG · PNG · WebP · SVG</p>
                                            <button
                                                tabIndex={-1}
                                                className="inline-flex items-center h-7 px-3 rounded-md bg-accent text-[11.5px] font-medium border-0 cursor-default btn-accent"
                                                style={{ color: "var(--on-accent)" }}
                                            >
                                                Browse files
                                            </button>
                                        </div>

                                        {/* File rows */}
                                        {[
                                            { thumb: "linear-gradient(135deg,#3e3e4c,#9d95f5)", name: "hero-photo.jpg", meta: "2.4 MB → 380 KB", pct: "−84%" },
                                            { thumb: "linear-gradient(135deg,#3e3e4c,#5dcaa5)", name: "screenshot.png", meta: "1.1 MB → 142 KB", pct: "−87%" },
                                            { thumb: "linear-gradient(135deg,#3e3e4c,#e8856a)", name: "cover-art.png", meta: "3.8 MB → 612 KB", pct: "−84%" },
                                        ].map(({ thumb, name, meta, pct }) => (
                                            <div
                                                key={name}
                                                className="grid items-center gap-[10px] p-[10px] px-3 bd-1 rounded-lg bg-surface mb-1.5"
                                                style={{ gridTemplateColumns: "32px 1fr auto" }}
                                            >
                                                <div className="w-8 h-6 rounded-[4px] bd-1" style={{ background: thumb }} />
                                                <div>
                                                    <div className="text-xs font-medium leading-[1.2] text-fg-1">{name}</div>
                                                    <div className="mono text-[10px] font-medium leading-[1.3] text-fg-2 mt-0.5">{meta}</div>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <span className="mono text-[10.5px] font-medium text-accent bg-accent-dim bd-accent rounded-[4px] py-1 px-[7px]">{pct}</span>
                                                    <span
                                                        className="w-[18px] h-[18px] rounded-full grid place-items-center text-[#0b0b0d]"
                                                        style={{ background: "var(--cat-convert)" }}
                                                    >
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Quality footer */}
                                        <div className="flex items-center justify-between mt-3 pt-3 bd-t-1">
                                            <span className="mono text-[10px] font-medium text-fg-2 tracking-[0.04em]">Quality</span>
                                            <div className="relative w-[130px] h-1 rounded-full bg-surface bd-1 overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-[78%] bg-accent" />
                                            </div>
                                            <span className="mono text-[10.5px] font-medium text-fg-1">78</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. PROBLEM ──────────────────────────────────────────────── */}
                <section className="relative" style={{ padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <span className="hp-eyebrow text-center">The problem with every other tool</span>
                        <h2
                            className="serif italic text-center text-fg-1 m-0 mb-[18px]"
                            style={{ fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
                        >
                            Every other tool
                            <br />
                            <em className="text-accent">uploads your files.</em>
                        </h2>
                        <p className="text-base font-normal leading-[1.6] text-fg-2 text-center max-w-[54ch] mx-auto mb-14">
                            The moment you drop a file into an upload tool, it leaves your device, traveling to a server you have never met and is processed by code you cannot
                            inspect.
                        </p>

                        {/* Compare panels */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1000px] mx-auto">
                            {/* Bad */}
                            <div className="rounded-[14px] p-7" style={{ border: "1px solid rgba(232,133,106,0.18)", background: "rgba(232,133,106,0.03)" }}>
                                <div className="mono text-[11px] font-medium tracking-[0.16em] uppercase text-cat-edit mb-5">Other tools</div>
                                <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
                                    {[
                                        "Upload your file to their server",
                                        "Process on infrastructure you cannot see",
                                        "Store your file, temporarily or permanently",
                                        "Require an account or login to use the result",
                                        "Profile you based on file content",
                                    ].map((item) => (
                                        <li key={item} className="relative text-sm leading-[1.55] text-fg-2 pl-7">
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-0 top-[1px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                                                style={{ background: "rgba(232,133,106,0.12)", border: "1px solid rgba(232,133,106,0.3)" }}
                                            >
                                                <span
                                                    className="block w-[7px] h-[7px] rotate-45"
                                                    style={{ borderTop: "1.5px solid var(--cat-edit)", borderRight: "1.5px solid var(--cat-edit)" }}
                                                />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Good */}
                            <div className="relative rounded-[14px] p-7 bg-surface bd-2">
                                <div
                                    aria-hidden="true"
                                    className="absolute top-[-1px] left-[8%] right-[8%] h-px"
                                    style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }}
                                />
                                <div className="mono text-[11px] font-medium tracking-[0.16em] uppercase text-accent mb-5">ImagePDF.Tools</div>
                                <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
                                    {[
                                        "File stays inside your browser tab, always",
                                        "Processed by your CPU via WebAssembly",
                                        "Never saved, not even to unfilled cache",
                                        "Download locally, no save-it-here window",
                                        "No tracking, no ad profiling, no exceptions",
                                    ].map((item) => (
                                        <li key={item} className="relative text-sm leading-[1.55] text-fg-2 pl-7">
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-0 top-[1px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                                                style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}
                                            >
                                                <span
                                                    className="block w-[9px] h-[5px] -rotate-45"
                                                    style={{ borderLeft: "1.5px solid var(--accent)", borderBottom: "1.5px solid var(--accent)" }}
                                                />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. ZERO ─────────────────────────────────────────────────── */}
                <section className="text-center" style={{ padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <div
                            className="serif m-0"
                            aria-label="Zero kilobytes sent to our servers"
                            style={{
                                fontSize: "clamp(110px, 18vw, 220px)",
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                                background: "linear-gradient(180deg, var(--fg-1), var(--fg-2))",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            0
                        </div>
                        <div className="text-lg font-medium leading-[1.4] text-fg-1 mt-3 tracking-[-0.005em]">Kilobytes sent to our servers.</div>
                        <div className="text-sm font-normal leading-[1.5] text-fg-2 mt-1.5 max-w-[50ch] mx-auto">
                            Not today. Not ever. There is no endpoint that accepts file uploads. <span className="mono text-fg-1 font-medium text-[13px]">By each feature.</span>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1000px] mx-auto mt-14">
                            {[
                                {
                                    cat: "compress",
                                    catLabel: "Compression",
                                    title: "WebAssembly",
                                    desc: "jpeg, mozjpeg, oxipng and zopfli compiled to WASM run locally in your browser, never traveling 1.5 GB to a server.",
                                },
                                {
                                    cat: "convert",
                                    catLabel: "Encoder",
                                    title: "Canvas API",
                                    desc: "Your browser has built-in image encoders (JPEG, WebP) and PNG encoding utilities via Canvas API on your CPU.",
                                },
                                {
                                    cat: "edit",
                                    catLabel: "Architecture",
                                    title: "Zero-upload design",
                                    desc: "Our server delivers only the app. It physically cannot receive file bytes. The architecture makes data leakage structurally impossible.",
                                },
                            ].map(({ cat, catLabel, title, desc }) => (
                                <div key={title} className="bg-surface bd-2 rounded-[14px] py-[26px] px-6 text-left">
                                    <span
                                        className="mono text-[10.5px] font-medium tracking-[0.16em] uppercase py-1.5 px-[10px] rounded-md inline-block mb-4"
                                        style={zeroCatStyle(cat)}
                                    >
                                        {catLabel}
                                    </span>
                                    <h4 className="text-[17px] font-medium leading-[1.3] text-fg-1 m-0 mb-2 tracking-[-0.005em]">{title}</h4>
                                    <p className="text-[13.5px] font-normal leading-[1.55] text-fg-2 m-0">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. STEPS ────────────────────────────────────────────────── */}
                <section className="relative" style={{ padding: "clamp(48px, 7vw, 88px) 0" }}>
                    <div className={C}>
                        <span className="hp-eyebrow text-center">It just works</span>
                        <h2
                            className="serif italic text-fg-1 text-center"
                            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 clamp(28px, 4vw, 48px)" }}
                        >
                            Done in <span className="text-accent">three</span> steps.
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 bd-t-1 bd-b-1">
                            {[
                                {
                                    num: "01",
                                    title: "Pick a tool. Drop your file.",
                                    desc: (
                                        <p className="text-sm leading-[1.65] text-fg-2 m-0 max-w-[38ch]">
                                            Choose from <span className="mono text-fg-1 font-medium text-[13px]">30+</span> tools for images and PDFs. Drop your file onto the page
                                            or click to browse. No account, no fuss, no waiting.
                                        </p>
                                    ),
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <path d="M17 8l-5-5-5 5" />
                                            <path d="M12 3v12" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: "02",
                                    title: "Your browser handles the rest.",
                                    desc: (
                                        <p className="text-sm leading-[1.65] text-fg-2 m-0 max-w-[38ch]">
                                            WebAssembly runs the processing on your own CPU, the same engine used in native desktop apps. No network request is made for your file.
                                            Typically done in under <span className="mono text-fg-1 font-medium text-[13px]">2 seconds</span>.
                                        </p>
                                    ),
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                        </svg>
                                    ),
                                },
                                {
                                    num: "03",
                                    title: "Download. Close the tab. Done.",
                                    desc: (
                                        <p className="text-sm leading-[1.65] text-fg-2 m-0 max-w-[38ch]">
                                            The result downloads directly to your device. When you close the tab, browser memory clears completely. Nothing is stored, cached, or
                                            logged.
                                        </p>
                                    ),
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    ),
                                },
                            ].map(({ num, title, desc, icon }) => (
                                <div key={num} className="step-card">
                                    <div className="w-8 h-8 grid place-items-center text-fg-2 mb-[18px]">{icon}</div>
                                    <span
                                        aria-hidden="true"
                                        className="font-data absolute right-4 top-2 leading-none text-accent select-none pointer-events-none"
                                        style={{ fontSize: "clamp(72px, 10vw, 108px)", opacity: 0.18, letterSpacing: "-0.05em" }}
                                    >
                                        {num}
                                    </span>
                                    <h3 className="text-[17px] font-medium leading-[1.35] text-fg-1 tracking-[-0.005em] m-0 mb-[10px]">{title}</h3>
                                    {desc}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 5. PULL QUOTE ───────────────────────────────────────────── */}
                <div className={C}>
                    <div className="max-w-[1000px] mx-auto" style={{ padding: "clamp(48px, 7vw, 96px) 0 32px" }}>
                        <p
                            className="serif italic text-fg-1 m-0 max-w-[44ch] text-center mx-auto"
                            style={{ fontSize: "clamp(24px, 3.5vw, 38px)", lineHeight: 1.25, letterSpacing: "-0.015em" }}
                        >
                            <span className="text-accent not-italic">&ldquo;</span>
                            Built for <span className="text-accent">people </span> who don&rsquo;t want to explain why they{" "}
                            <span className="text-accent"> won&rsquo;t upload </span> client files to a random website.
                            <span className="text-accent not-italic">&rdquo;</span>
                        </p>
                    </div>
                </div>

                {/* ── 6. TOOLS INDEX ──────────────────────────────────────────── */}
                <section id="tools" className="py-8 pb-14">
                    <div className={C}>
                        {TOOL_CATS.map(({ cat, label, items }, ci) => (
                            <div
                                key={cat}
                                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start py-7"
                                style={{ borderBottom: ci < TOOL_CATS.length - 1 ? "1px solid var(--border-1)" : "none" }}
                            >
                                {/* Category head */}
                                <div className="flex items-center gap-3 pt-[10px]">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: `var(--cat-${cat})` }} aria-hidden="true" />
                                    <span className="mono text-[11px] font-medium tracking-[0.18em] uppercase" style={{ color: `var(--cat-${cat})` }}>
                                        ◆ {label}
                                    </span>
                                </div>

                                {/* Tool list */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                    {items.map(({ href, name, desc }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="hp-tool-row grid gap-4 items-baseline py-3 bd-b-dash-1 no-underline"
                                            style={{ gridTemplateColumns: "1fr auto" }}
                                        >
                                            <span className="hp-tool-name text-[14.5px] font-medium text-fg-1 tracking-[-0.005em] transition-colors duration-150">{name}</span>
                                            <span className="text-[12.5px] font-normal text-fg-2 leading-[1.5]">{desc}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Hub links */}
                        <div className="flex flex-wrap justify-center gap-2.5 mt-7">
                            <Link
                                href="/pdf-tools"
                                className="flex items-center gap-2 no-underline h-[34px] px-4 rounded-full bg-accent text-[12.5px] font-medium btn-accent"
                                style={{ color: "var(--on-accent)" }}
                            >
                                All PDF tools →
                            </Link>
                            <Link
                                href="/image-tools"
                                className="flex items-center gap-2 no-underline h-[34px] px-4 rounded-full bg-transparent bd-accent text-accent text-[12.5px] font-medium btn-accent-outline"
                            >
                                All image tools →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── 7. FORMATS ──────────────────────────────────────────────── */}
                <section className="relative" style={{ padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <span className="hp-eyebrow text-center">Supported formats</span>
                        <h2
                            className="serif italic text-center text-fg-1 m-0 mb-[18px]"
                            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
                        >
                            Every major format. <em className="text-accent">All in the browser.</em>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 max-w-[1000px] mx-auto mt-12">
                            {[
                                {
                                    fmt: "JPEG",
                                    chip: "photo",
                                    accent: true,
                                    desc: "Compressed using the browser's native Canvas encoder. Quality slider maps directly to 0–100. Typical savings 60 to 80 percent with no visible quality loss at quality 78.",
                                },
                                {
                                    fmt: "PNG",
                                    chip: "transparent",
                                    accent: true,
                                    desc: "Lossless PNG compression via pngquant running in WebAssembly. Transparency is preserved throughout. Typical savings 40 to 70 percent versus the uncompressed original.",
                                },
                                {
                                    fmt: "WebP",
                                    chip: "modern",
                                    accent: true,
                                    desc: "Convert any image to WebP for modern web delivery. WebP is typically 25 percent smaller than JPEG at equivalent visual quality. Convert back to JPEG or PNG when needed.",
                                },
                                {
                                    fmt: "SVG",
                                    chip: "vector",
                                    accent: true,
                                    desc: "Removes SVG metadata and unnecessary whitespace. Set or reset scale at any other point of the original viewbox: dimensions, blocks for icons, illustrations and diagrams.",
                                },
                                {
                                    fmt: "PDF",
                                    chip: "document",
                                    accent: false,
                                    desc: "Operates on PDFs with StructLevel-1 WASM. Single-page files, split by tag-design, add page numbers or watermarks, or assemble a set of images into a single PDF document.",
                                },
                            ].map(({ fmt, chip, accent, desc }) => (
                                <div key={fmt} className="py-6 bd-t-1">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <span className={`mono text-[13px] font-medium tracking-[0.14em] ${accent ? "text-accent" : "text-fg-2"}`}>{fmt}</span>
                                        <span className="mono text-[10.5px] font-medium py-1 px-2 rounded-md bg-elevated bd-2 text-fg-2">{chip}</span>
                                    </div>
                                    <p className="text-sm font-normal leading-[1.65] text-fg-2 m-0">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 8. FAQ ──────────────────────────────────────────────────── */}
                <section className="relative" style={{ padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <h2
                            className="serif italic text-center text-fg-1"
                            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 clamp(28px, 4vw, 48px)" }}
                        >
                            Questions answered.
                        </h2>
                        <div className="max-w-[820px] mx-auto bd-t-1">
                            {FAQS.map(({ q, a }) => (
                                <details key={q} className="hp-faq bd-b-1">
                                    <summary className="list-none cursor-pointer py-[22px] flex items-start justify-between gap-6">
                                        <span className="text-[16.5px] font-medium leading-[1.4] text-fg-1 tracking-[-0.005em] flex-1">{q}</span>
                                        <span className="hp-faq-toggle w-8 h-8 rounded-full bd-2 grid place-items-center text-fg-2 shrink-0">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="hp-faq-answer text-[14.5px] font-normal leading-[1.7] text-fg-2">{a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 9. FINAL CTA ────────────────────────────────────────────── */}
                <section className="text-center relative" style={{ padding: "clamp(64px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)" }}>
                    <div
                        aria-hidden="true"
                        className="absolute pointer-events-none z-0 opacity-90"
                        style={{
                            left: "50%",
                            top: "30%",
                            width: "min(600px, 100vw)",
                            height: "min(600px, 100vw)",
                            transform: "translate(-50%,-50%)",
                            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                    />
                    <div className={`${C} relative z-[1]`}>
                        <span className="hp-eyebrow text-center">Start now. It&apos;s free.</span>

                        <h2 className="serif italic text-fg-1 m-0 mb-6" style={{ fontSize: "clamp(44px, 11vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
                            Your files.
                            <br />
                            Your <span className="text-accent">rules.</span>
                        </h2>

                        <p className="text-[15px] font-normal leading-[1.6] text-fg-2 mx-auto mb-9 max-w-[44ch]">No sign-up. No download. No upload. Open a tool and go.</p>

                        {/* Button group */}
                        <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center w-full sm:w-auto rounded-[14px] sm:rounded-[30px] bg-surface bd-2 p-2 gap-[10px]">
                            <Link
                                href="/compress-image"
                                className="flex items-center justify-center no-underline h-[38px] px-[18px] rounded-full bg-accent-dim text-accent bd-accent text-[13px] font-medium"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="mr-1.5 shrink-0">
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                                Compress Image
                            </Link>
                            <Link
                                href="/compress-pdf"
                                className="flex items-center justify-center no-underline h-[38px] px-[18px] rounded-full bg-transparent text-fg-2 text-[13px] font-medium"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="mr-1.5 shrink-0">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                Compress PDF
                            </Link>
                            <Link
                                href="#tools"
                                className="hp-seg-ghost flex items-center justify-center no-underline h-[38px] px-3 rounded-full bg-transparent text-fg-2 text-[13px] font-medium"
                            >
                                See all 30+ tools <span className="text-fg-3 ml-1.5">→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
