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

/* ── Shared style helpers ─────────────────────────────── */
const C = "max-w-[1180px] mx-auto px-8";

const mono: React.CSSProperties = {
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
};
const sans: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans, 'DM Sans', system-ui, sans-serif)",
};
const serif: React.CSSProperties = {
    fontFamily: "var(--font-serif-display, 'Instrument Serif', Georgia, serif)",
    fontStyle: "italic",
    fontWeight: 400,
};

/* ── Zero cards category token map ──────────────────────── */
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

            <main style={{ background: "var(--bg)", color: "var(--fg-1)" }}>
                <style>{`
                  .hp-faq-answer { padding: 0 0 26px; }
                  @media (min-width: 640px) { .hp-faq-answer { padding: 0 56px 26px 0; } }
                `}</style>
                {/* ─────────────────────────── 1. HERO ─────────────────────────── */}
                <section style={{ position: "relative", padding: "clamp(40px, 7vw, 72px) 0 clamp(48px, 7vw, 84px)", overflow: "hidden" }}>
                    {/* Ambient glows */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "-10%",
                            top: "-20%",
                            width: "1100px",
                            height: "800px",
                            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                            zIndex: 0,
                            opacity: 0.6,
                        }}
                    />
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            right: "-10%",
                            top: "10%",
                            width: "900px",
                            height: "700px",
                            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                            zIndex: 0,
                            opacity: 0.3,
                        }}
                    />

                    <div className={C} style={{ position: "relative", zIndex: 1 }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ gap: "clamp(32px, 5vw, 64px)" }}>
                            {/* Left — text */}
                            <div>
                                {/* Status pill */}
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        height: "30px",
                                        padding: "0 14px",
                                        borderRadius: "30px",
                                        background: "var(--accent-dim)",
                                        border: "1px solid var(--accent-border)",
                                        color: "var(--accent)",
                                        fontSize: "11.5px",
                                        fontWeight: 500,
                                        marginBottom: "26px",
                                        ...sans,
                                    }}
                                >
                                    <span className="hp-pill-dot" style={{ width: "6px", height: "6px", borderRadius: "999px", background: "var(--accent)", flexShrink: 0 }} />
                                    100% private · No servers · Your browser
                                </span>

                                <h1 style={{ ...serif, fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em", color: "var(--fg-1)", margin: "0 0 28px" }}>
                                    Your files.
                                    <br />
                                    Your device.
                                    <br />
                                    <span style={{ color: "var(--accent)" }}>Your rules.</span>
                                </h1>

                                <p style={{ ...sans, fontWeight: 300, fontSize: "19px", lineHeight: 1.6, color: "var(--fg-2)", maxWidth: "46ch", margin: "0 0 32px" }}>
                                    Drop a file. Every operation runs via <strong style={{ color: "var(--fg-1)", fontWeight: 400 }}>WebAssembly</strong> on your own device. No
                                    servers, no sign-up, 30+ tools — permanently free.
                                </p>

                                {/* CTAs */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <Link
                                        href="/compress-image"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            height: "48px",
                                            padding: "0 22px",
                                            borderRadius: "10px",
                                            background: "var(--accent)",
                                            color: "#0b0b0d",
                                            fontSize: "14.5px",
                                            fontWeight: 500,
                                            textDecoration: "none",
                                            ...sans,
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <polyline points="9 11 12 14 22 4" />
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                        Compress an image
                                    </Link>
                                    <Link
                                        href="#tools"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            height: "48px",
                                            padding: "0 22px",
                                            borderRadius: "10px",
                                            background: "transparent",
                                            border: "1px solid var(--border-2)",
                                            color: "var(--fg-2)",
                                            fontSize: "14.5px",
                                            fontWeight: 500,
                                            textDecoration: "none",
                                            ...sans,
                                        }}
                                    >
                                        All PDF tools <span style={{ color: "var(--fg-3)" }}>→</span>
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
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                height: "30px",
                                                padding: "0 14px",
                                                borderRadius: "30px",
                                                background: "var(--bg-surface)",
                                                border: "1px solid var(--border-2)",
                                                color: "var(--fg-2)",
                                                fontSize: "11.5px",
                                                fontWeight: 500,
                                                ...sans,
                                            }}
                                        >
                                            <span style={{ color: "var(--accent)" }}>{icon}</span>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right — browser mockup */}
                            <div>
                                <div
                                    style={{
                                        position: "relative",
                                        background: "var(--bg-surface)",
                                        border: "1px solid var(--border-2)",
                                        borderRadius: "12px",
                                        boxShadow: "0 32px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Top accent edge */}
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            position: "absolute",
                                            top: "-1px",
                                            left: "8%",
                                            right: "8%",
                                            height: "1px",
                                            background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
                                            zIndex: 2,
                                        }}
                                    />

                                    {/* Chrome bar */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            padding: "12px 16px",
                                            background: "var(--bg-elevated)",
                                            borderBottom: "1px solid var(--border-1)",
                                        }}
                                    >
                                        <div aria-hidden="true" style={{ display: "flex", gap: "6px" }}>
                                            <span style={{ width: "11px", height: "11px", borderRadius: "999px", background: "#ff5f57", opacity: 0.85 }} />
                                            <span style={{ width: "11px", height: "11px", borderRadius: "999px", background: "#febc2e", opacity: 0.85 }} />
                                            <span style={{ width: "11px", height: "11px", borderRadius: "999px", background: "#28c840", opacity: 0.85 }} />
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                height: "26px",
                                                borderRadius: "6px",
                                                background: "var(--bg)",
                                                border: "1px solid var(--border-1)",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "0 10px",
                                                gap: "8px",
                                                fontSize: "11.5px",
                                                fontWeight: 500,
                                                color: "var(--fg-2)",
                                                ...mono,
                                            }}
                                        >
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                                style={{ color: "var(--cat-convert)", flexShrink: 0 }}
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                            imagepdf.tools/compress-image
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div style={{ padding: "24px", background: "var(--bg)" }}>
                                        {/* Drop zone */}
                                        <div
                                            style={{
                                                border: "1.5px dashed var(--border-3)",
                                                borderRadius: "10px",
                                                background: "var(--bg-surface)",
                                                padding: "24px 20px",
                                                textAlign: "center",
                                                marginBottom: "14px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    border: "1px solid var(--border-2)",
                                                    borderRadius: "10px",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    color: "var(--accent)",
                                                    margin: "0 auto 10px",
                                                    background: "var(--bg)",
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <path d="M17 8l-5-5-5 5" />
                                                    <path d="M12 3v12" />
                                                </svg>
                                            </div>
                                            <h4 style={{ ...sans, fontSize: "13.5px", fontWeight: 500, lineHeight: 1.3, color: "var(--fg-1)", margin: "0 0 4px" }}>
                                                Drop your image here
                                            </h4>
                                            <p style={{ ...sans, fontSize: "11.5px", fontWeight: 400, lineHeight: 1.4, color: "var(--fg-2)", margin: "0 0 12px" }}>
                                                JPEG · PNG · WebP · SVG
                                            </p>
                                            <button
                                                tabIndex={-1}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    height: "28px",
                                                    padding: "0 12px",
                                                    borderRadius: "6px",
                                                    background: "var(--accent)",
                                                    color: "#0b0b0d",
                                                    fontSize: "11.5px",
                                                    fontWeight: 500,
                                                    border: 0,
                                                    cursor: "default",
                                                    ...sans,
                                                }}
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
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "32px 1fr auto",
                                                    gap: "10px",
                                                    alignItems: "center",
                                                    padding: "10px 12px",
                                                    border: "1px solid var(--border-1)",
                                                    borderRadius: "8px",
                                                    background: "var(--bg-surface)",
                                                    marginBottom: "6px",
                                                }}
                                            >
                                                <div style={{ width: "32px", height: "24px", borderRadius: "4px", border: "1px solid var(--border-1)", background: thumb }} />
                                                <div>
                                                    <div style={{ ...sans, fontSize: "12px", fontWeight: 500, lineHeight: 1.2, color: "var(--fg-1)" }}>{name}</div>
                                                    <div style={{ ...mono, fontSize: "10px", fontWeight: 500, lineHeight: 1.3, color: "var(--fg-2)", marginTop: "2px" }}>
                                                        {meta}
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                    <span
                                                        style={{
                                                            ...mono,
                                                            fontSize: "10.5px",
                                                            fontWeight: 500,
                                                            color: "var(--accent)",
                                                            background: "var(--accent-dim)",
                                                            border: "1px solid var(--accent-border)",
                                                            borderRadius: "4px",
                                                            padding: "4px 7px",
                                                        }}
                                                    >
                                                        {pct}
                                                    </span>
                                                    <span
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            borderRadius: "999px",
                                                            background: "var(--cat-convert)",
                                                            display: "grid",
                                                            placeItems: "center",
                                                            color: "#0b0b0d",
                                                        }}
                                                    >
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Quality footer */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: "12px",
                                                paddingTop: "12px",
                                                borderTop: "1px solid var(--border-1)",
                                            }}
                                        >
                                            <span style={{ ...mono, fontSize: "10px", fontWeight: 500, color: "var(--fg-2)", letterSpacing: "0.04em" }}>QUALITY</span>
                                            <div
                                                style={{
                                                    width: "130px",
                                                    height: "4px",
                                                    borderRadius: "999px",
                                                    background: "var(--bg-surface)",
                                                    border: "1px solid var(--border-1)",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "78%", background: "var(--accent)" }} />
                                            </div>
                                            <span style={{ ...mono, fontSize: "10.5px", fontWeight: 500, color: "var(--fg-1)" }}>78</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─────────────────── 2. PROBLEM: Every other tool ────────────── */}
                <section style={{ position: "relative", padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <span
                            style={{
                                display: "block",
                                textAlign: "center",
                                ...mono,
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "var(--fg-2)",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            The problem with every other tool
                        </span>
                        <h2
                            style={{
                                ...serif,
                                fontSize: "clamp(36px, 5.5vw, 64px)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "var(--fg-1)",
                                margin: "0 0 18px",
                                textAlign: "center",
                            }}
                        >
                            Every other tool
                            <br />
                            <em style={{ color: "var(--accent)" }}>uploads your files.</em>
                        </h2>
                        <p
                            style={{
                                ...sans,
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: 1.6,
                                color: "var(--fg-2)",
                                textAlign: "center",
                                maxWidth: "62ch",
                                margin: "0 auto 56px",
                            }}
                        >
                            The moment you drop a file into an upload tool, it leaves your device, traveling to a server you have never met and is processed by code you cannot
                            inspect.
                        </p>

                        {/* Compare panels */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px] mx-auto">
                            {/* Bad */}
                            <div style={{ borderRadius: "14px", padding: "28px 32px", border: "1px solid rgba(232,133,106,0.18)", background: "rgba(232,133,106,0.03)" }}>
                                <div
                                    style={{
                                        ...mono,
                                        fontSize: "11px",
                                        fontWeight: 500,
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "var(--cat-edit)",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Other tools
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {[
                                        "Upload your file to their server",
                                        "Process on infrastructure you cannot see",
                                        "Store your file, temporarily or permanently",
                                        "Require an account or login to use the result",
                                        "Profile you based on file content",
                                    ].map((item) => (
                                        <li key={item} style={{ ...sans, fontSize: "14px", lineHeight: 1.55, color: "var(--fg-2)", paddingLeft: "22px", position: "relative" }}>
                                            <span
                                                aria-hidden="true"
                                                style={{ position: "absolute", left: 0, top: 0, color: "var(--cat-edit)", fontWeight: 600, fontSize: "16px", lineHeight: 1.1 }}
                                            >
                                                ✗
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Good */}
                            <div
                                style={{
                                    borderRadius: "14px",
                                    padding: "28px 32px",
                                    border: "1px solid var(--accent-border)",
                                    background: "var(--accent-dim)",
                                    position: "relative",
                                }}
                            >
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        top: "-1px",
                                        left: "8%",
                                        right: "8%",
                                        height: "1px",
                                        background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
                                    }}
                                />
                                <div
                                    style={{
                                        ...mono,
                                        fontSize: "11px",
                                        fontWeight: 500,
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "var(--accent)",
                                        marginBottom: "20px",
                                    }}
                                >
                                    ImagePDF.Tools
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {[
                                        "File stays inside your browser tab, always",
                                        "Processed by your CPU via WebAssembly",
                                        "Never saved, not even to unfilled cache",
                                        "Download locally, no save-it-here window",
                                        "No tracking, no ad profiling, no exceptions",
                                    ].map((item) => (
                                        <li key={item} style={{ ...sans, fontSize: "14px", lineHeight: 1.55, color: "var(--fg-2)", paddingLeft: "22px", position: "relative" }}>
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    position: "absolute",
                                                    left: "2px",
                                                    top: "6px",
                                                    display: "block",
                                                    width: "9px",
                                                    height: "5px",
                                                    borderLeft: "1.5px solid var(--accent)",
                                                    borderBottom: "1.5px solid var(--accent)",
                                                    transform: "rotate(-45deg)",
                                                }}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─────────────────────── 3. ZERO ──────────────────────────────── */}
                <section style={{ padding: "clamp(56px, 9vw, 112px) 0", textAlign: "center" }}>
                    <div className={C}>
                        <div
                            aria-label="Zero kilobytes sent to our servers"
                            style={{
                                ...serif,
                                fontSize: "clamp(110px, 18vw, 220px)",
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                                background: "linear-gradient(180deg, var(--fg-1), var(--fg-2))",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                margin: 0,
                            }}
                        >
                            0
                        </div>
                        <div style={{ ...sans, fontSize: "18px", fontWeight: 500, lineHeight: 1.4, color: "var(--fg-1)", marginTop: "12px", letterSpacing: "-0.005em" }}>
                            Kilobytes sent to our servers.
                        </div>
                        <div
                            style={{
                                ...sans,
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: 1.5,
                                color: "var(--fg-2)",
                                marginTop: "6px",
                                maxWidth: "50ch",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            Not today. Not ever. There is no endpoint that accepts file uploads.{" "}
                            <span style={{ ...mono, color: "var(--fg-1)", fontWeight: 500, fontSize: "13px" }}>By each feature.</span>
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
                                <div
                                    key={title}
                                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-2)", borderRadius: "14px", padding: "26px 24px", textAlign: "left" }}
                                >
                                    <span
                                        style={{
                                            ...mono,
                                            fontSize: "10.5px",
                                            fontWeight: 500,
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            display: "inline-block",
                                            marginBottom: "16px",
                                            ...zeroCatStyle(cat),
                                        }}
                                    >
                                        {catLabel}
                                    </span>
                                    <h4 style={{ ...sans, fontSize: "17px", fontWeight: 500, lineHeight: 1.3, color: "var(--fg-1)", margin: "0 0 8px", letterSpacing: "-0.005em" }}>
                                        {title}
                                    </h4>
                                    <p style={{ ...sans, fontSize: "13.5px", fontWeight: 400, lineHeight: 1.55, color: "var(--fg-2)", margin: 0 }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ────────────────────── 4. STEPS ──────────────────────────────── */}
                <section style={{ position: "relative", padding: "clamp(48px, 7vw, 88px) 0" }}>
                    <style>{`
            .step-card { padding: 28px 0 32px; border-bottom: 1px solid var(--border-1); position: relative; overflow: hidden; }
            @media (min-width: 768px) {
              .step-card { padding: 36px 36px 40px 0; border-bottom: none; overflow: visible; }
              .step-card:not(:first-child) { padding-left: 36px; }
              .step-card:not(:last-child) { border-right: 1px solid var(--border-1); }
            }
          `}</style>
                    <div className={C}>
                        <span
                            style={{
                                display: "block",
                                ...mono,
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "var(--fg-2)",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            It just works
                        </span>
                        <h2 style={{ ...serif, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--fg-1)", margin: "0 0 clamp(28px, 4vw, 48px)" }}>
                            Done in three steps.
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "1px solid var(--border-1)", borderBottom: "1px solid var(--border-1)" }}>
                            {[
                                {
                                    num: "01",
                                    title: "Pick a tool. Drop your file.",
                                    desc: (
                                        <p style={{ ...sans, fontSize: "14px", lineHeight: 1.65, color: "var(--fg-2)", margin: 0, maxWidth: "38ch" }}>
                                            Choose from <span style={{ ...mono, color: "var(--fg-1)", fontWeight: 500, fontSize: "13px" }}>30+</span> tools for images and PDFs.
                                            Drop your file onto the page or click to browse. No account, no fuss, no waiting.
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
                                        <p style={{ ...sans, fontSize: "14px", lineHeight: 1.65, color: "var(--fg-2)", margin: 0, maxWidth: "38ch" }}>
                                            WebAssembly runs the processing on your own CPU, the same engine used in native desktop apps. No network request is made for your file.
                                            Typically done in under <span style={{ ...mono, color: "var(--fg-1)", fontWeight: 500, fontSize: "13px" }}>2 seconds</span>.
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
                                        <p style={{ ...sans, fontSize: "14px", lineHeight: 1.65, color: "var(--fg-2)", margin: 0, maxWidth: "38ch" }}>
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
                                    <div style={{ width: "32px", height: "32px", display: "grid", placeItems: "center", color: "var(--fg-2)", marginBottom: "18px" }}>{icon}</div>
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "28px",
                                            ...serif,
                                            fontSize: "56px",
                                            lineHeight: 1,
                                            color: "var(--accent)",
                                            letterSpacing: "-0.04em",
                                            opacity: 0.18,
                                        }}
                                    >
                                        {num}
                                    </span>
                                    <h3
                                        style={{
                                            ...sans,
                                            fontSize: "17px",
                                            fontWeight: 500,
                                            lineHeight: 1.35,
                                            color: "var(--fg-1)",
                                            letterSpacing: "-0.005em",
                                            margin: "0 0 10px",
                                        }}
                                    >
                                        {title}
                                    </h3>
                                    {desc}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─────────────────── 5. PULL QUOTE ────────────────────────────── */}
                <div className={C}>
                    <div style={{ padding: "clamp(48px, 7vw, 96px) 0 32px", maxWidth: "1000px", margin: "0 auto" }}>
                        <p
                            style={{
                                ...serif,
                                fontSize: "clamp(24px, 3.5vw, 38px)",
                                lineHeight: 1.25,
                                color: "var(--fg-1)",
                                letterSpacing: "-0.015em",
                                margin: "0 auto",
                                maxWidth: "44ch",
                                textAlign: "center",
                            }}
                        >
                            <span style={{ color: "var(--accent)" }}>&ldquo;</span>
                            Built for people who don&rsquo;t want to explain why they won&rsquo;t upload client files to a random website.
                            <span style={{ color: "var(--accent)" }}>&rdquo;</span>
                        </p>
                    </div>
                </div>

                {/* ───────────────────── 6. TOOLS INDEX ────────────────────────── */}
                <section id="tools" style={{ padding: "32px 0 56px" }}>
                    <div className={C}>
                        {TOOL_CATS.map(({ cat, label, items }, ci) => (
                            <div
                                key={cat}
                                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start"
                                style={{ borderBottom: ci < TOOL_CATS.length - 1 ? "1px solid var(--border-1)" : "none", padding: "28px 0" }}
                            >
                                {/* Category head */}
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "10px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: `var(--cat-${cat})`, flexShrink: 0 }} aria-hidden="true" />
                                    <span style={{ ...mono, fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: `var(--cat-${cat})` }}>
                                        ◆ {label}
                                    </span>
                                </div>

                                {/* Tool list */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                    {items.map(({ href, name, desc }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="hp-tool-row"
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr auto",
                                                gap: "16px",
                                                alignItems: "baseline",
                                                padding: "12px 0",
                                                borderBottom: "1px dashed var(--border-1)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <span
                                                className="hp-tool-name"
                                                style={{ ...sans, fontSize: "14.5px", fontWeight: 500, color: "var(--fg-1)", letterSpacing: "-0.005em", transition: "color 0.15s" }}
                                            >
                                                {name}
                                            </span>
                                            <span style={{ ...sans, fontSize: "12.5px", fontWeight: 400, color: "var(--fg-2)", lineHeight: 1.5 }}>
                                                {desc}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Hub links */}
                        <div className="flex flex-wrap gap-2.5 mt-7">
                            {[
                                { href: "/image-tools", label: "All image tools" },
                                { href: "/pdf-tools", label: "All PDF tools" },
                            ].map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        height: "34px",
                                        padding: "0 16px",
                                        borderRadius: "30px",
                                        background: "var(--bg-surface)",
                                        border: "1px solid var(--border-2)",
                                        color: "var(--fg-1)",
                                        fontSize: "12.5px",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        ...sans,
                                    }}
                                >
                                    {label} <span style={{ color: "var(--fg-3)" }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ──────────────────────── 7. FORMATS ─────────────────────────── */}
                <section style={{ position: "relative", padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <span
                            style={{
                                display: "block",
                                textAlign: "center",
                                ...mono,
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "var(--fg-2)",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            Supported formats
                        </span>
                        <h2
                            style={{
                                ...serif,
                                fontSize: "clamp(32px, 4vw, 48px)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "var(--fg-1)",
                                margin: "0 0 18px",
                                textAlign: "center",
                            }}
                        >
                            Every major format. <em>All in the browser.</em>
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
                                <div key={fmt} style={{ padding: "24px 0", borderTop: "1px solid var(--border-1)" }}>
                                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "12px" }}>
                                        <span style={{ ...mono, fontSize: "13px", fontWeight: 500, letterSpacing: "0.14em", color: accent ? "var(--accent)" : "var(--fg-2)" }}>
                                            {fmt}
                                        </span>
                                        <span
                                            style={{
                                                ...mono,
                                                fontSize: "10.5px",
                                                fontWeight: 500,
                                                padding: "4px 8px",
                                                borderRadius: "6px",
                                                background: "var(--bg-elevated)",
                                                border: "1px solid var(--border-2)",
                                                color: "var(--fg-2)",
                                            }}
                                        >
                                            {chip}
                                        </span>
                                    </div>
                                    <p style={{ ...sans, fontSize: "14px", fontWeight: 400, lineHeight: 1.65, color: "var(--fg-2)", margin: 0 }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── 8. FAQ ────────────────────────────── */}
                <section style={{ position: "relative", padding: "clamp(56px, 9vw, 112px) 0" }}>
                    <div className={C}>
                        <h2
                            style={{
                                ...serif,
                                fontSize: "clamp(32px, 4vw, 48px)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "var(--fg-1)",
                                margin: "0 0 clamp(28px, 4vw, 48px)",
                                textAlign: "center",
                            }}
                        >
                            Questions answered.
                        </h2>
                        <div style={{ maxWidth: "820px", margin: "0 auto", borderTop: "1px solid var(--border-1)" }}>
                            {FAQS.map(({ q, a }) => (
                                <details key={q} className="hp-faq" style={{ borderBottom: "1px solid var(--border-1)" }}>
                                    <summary
                                        style={{
                                            listStyle: "none",
                                            cursor: "pointer",
                                            padding: "22px 0",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                            gap: "24px",
                                        }}
                                    >
                                        <span style={{ ...sans, fontSize: "16.5px", fontWeight: 500, lineHeight: 1.4, color: "var(--fg-1)", letterSpacing: "-0.005em", flex: 1 }}>
                                            {q}
                                        </span>
                                        <span
                                            className="hp-faq-toggle"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "999px",
                                                border: "1px solid var(--border-2)",
                                                display: "grid",
                                                placeItems: "center",
                                                color: "var(--fg-2)",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="hp-faq-answer" style={{ ...sans, fontSize: "14.5px", fontWeight: 400, lineHeight: 1.7, color: "var(--fg-2)" }}>{a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─────────────────── 9. FINAL CTA ────────────────────────────── */}
                <section style={{ padding: "clamp(64px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)", textAlign: "center", position: "relative" }}>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "40%",
                            width: "min(600px, 100vw)",
                            height: "min(600px, 100vw)",
                            transform: "translate(-50%,-50%)",
                            background: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            zIndex: 0,
                            opacity: 0.9,
                        }}
                    />
                    <div className={C} style={{ position: "relative", zIndex: 1 }}>
                        <span
                            style={{
                                display: "block",
                                textAlign: "center",
                                ...mono,
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "var(--fg-2)",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            Start now. It&apos;s free.
                        </span>

                        {/* h2 — clamp scales from 44px on small phones to 96px on desktop */}
                        <h2 style={{ ...serif, fontSize: "clamp(44px, 11vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em", color: "var(--fg-1)", margin: "0 0 24px" }}>
                            Your files.
                            <br />
                            Your <span style={{ color: "var(--accent)" }}>rules.</span>
                        </h2>

                        <p
                            style={{
                                ...sans,
                                fontSize: "15px",
                                fontWeight: 400,
                                lineHeight: 1.6,
                                color: "var(--fg-2)",
                                margin: "0 0 36px",
                                maxWidth: "44ch",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            No sign-up. No download. No upload. Open a tool and go.
                        </p>

                        {/* Button group — stacked column on mobile, pill row on sm+ */}
                        <div
                            className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center w-full sm:w-auto rounded-[14px] sm:rounded-[30px]"
                            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-2)", padding: "6px", gap: "4px" }}
                        >
                            <Link
                                href="/compress-image"
                                className="justify-center"
                                style={{
                                    height: "38px",
                                    padding: "0 18px",
                                    borderRadius: "30px",
                                    background: "var(--accent-dim)",
                                    color: "var(--accent)",
                                    border: "1px solid var(--accent-border)",
                                    ...sans,
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                }}
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                    style={{ marginRight: "6px", flexShrink: 0 }}
                                >
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                                Compress Image
                            </Link>
                            <Link
                                href="/compress-pdf"
                                className="justify-center"
                                style={{
                                    height: "38px",
                                    padding: "0 18px",
                                    borderRadius: "30px",
                                    background: "transparent",
                                    color: "var(--fg-2)",
                                    border: 0,
                                    ...sans,
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                }}
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                    style={{ marginRight: "6px", flexShrink: 0 }}
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                Compress PDF
                            </Link>
                            <Link
                                href="#tools"
                                className="hp-seg-ghost justify-center"
                                style={{
                                    height: "38px",
                                    padding: "0 12px",
                                    borderRadius: "30px",
                                    background: "transparent",
                                    color: "var(--fg-2)",
                                    border: 0,
                                    ...sans,
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                }}
                            >
                                See all 30+ tools <span style={{ color: "var(--fg-3)", marginLeft: "6px" }}>→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
