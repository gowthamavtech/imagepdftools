"use client";

import { useState, useCallback } from "react";

type FeedbackType = "bug" | "feature" | "other";
type Tab = "submit" | "history";

interface HistoryEntry {
    id: string;
    type: FeedbackType;
    text: string;
    date: string;
}

const TYPES: { value: FeedbackType; label: string; emoji: string; placeholder: string }[] = [
    { value: "bug",     label: "Bug report",       emoji: "🐛", placeholder: "Describe what happened and how to reproduce it…" },
    { value: "feature", label: "Feature request",  emoji: "💡", placeholder: "Describe the feature you'd like to see…" },
    { value: "other",   label: "Other",            emoji: "💬", placeholder: "Share anything on your mind…" },
];

const MAX_CHARS = 1500;

function SubmitTab({ onSuccess }: { onSuccess: (entry: HistoryEntry) => void }) {
    const [feedbackType, setFeedbackType] = useState<FeedbackType>("feature");
    const [text, setText] = useState("");

    const currentType = TYPES.find((t) => t.value === feedbackType)!;
    const remaining = MAX_CHARS - text.length;
    const isNearLimit = remaining < 150;
    const isEmpty = !text.trim();

    const handleSend = useCallback(() => {
        if (isEmpty) return;
        const typeLabel = currentType.label;
        const body = `Feedback type: ${typeLabel}\n\n${text.trim()}`;
        window.location.href =
            `mailto:support@imagepdf.tools` +
            `?subject=${encodeURIComponent(`[${typeLabel}] Feedback from ImagePDF.Tools`)}` +
            `&body=${encodeURIComponent(body)}`;
        onSuccess({
            id: Math.random().toString(36).slice(2),
            type: feedbackType,
            text: text.trim(),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
    }, [text, feedbackType, currentType, isEmpty, onSuccess]);

    return (
        <div className="flex flex-col gap-4">
            {/* Type chips — homepage accent-pill pattern */}
            <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => {
                    const active = feedbackType === t.value;
                    return (
                        <button
                            key={t.value}
                            onClick={() => setFeedbackType(t.value)}
                            className={`inline-flex items-center gap-1.5 h-7.5 px-3.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                                active
                                    ? "bg-accent-dim bd-accent text-accent"
                                    : "bd-1 text-fg-2 bg-elevated hover:text-fg-1"
                            }`}
                        >
                            <span style={{ fontSize: "12px", lineHeight: 1 }}>{t.emoji}</span>
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Textarea block */}
            <div className="rounded-xl overflow-hidden bd-1" style={{ background: "var(--bg-elevated)" }}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                    placeholder={currentType.placeholder}
                    rows={5}
                    className="w-full resize-none text-[13.5px] leading-[1.65] px-4 py-3.5 focus:outline-none bg-transparent text-fg-1 placeholder:text-fg-3"
                />
                {/* Footer inside textarea block */}
                <div className="flex items-center justify-between px-4 py-2.5 bd-t-1">
                    <span
                        className="text-[11.5px] tabular-nums"
                        style={{ color: isNearLimit ? (remaining < 50 ? "#ef4444" : "var(--fg-2)") : "var(--fg-3)" }}
                    >
                        {remaining} left
                    </span>
                    <button
                        onClick={handleSend}
                        disabled={isEmpty}
                        className="inline-flex items-center gap-1.5 h-7.5 px-4 rounded-full text-[12px] font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        style={{ color: '#ffffff' }}
                    >
                        Send feedback
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function HistoryTab({ entries }: { entries: HistoryEntry[] }) {
    if (entries.length === 0) {
        return (
            <div className="text-center py-10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center bg-elevated bd-1">
                    <svg className="w-4 h-4 text-fg-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[13px] font-medium text-fg-2">No submissions yet</p>
                    <p className="text-[12px] mt-0.5 text-fg-3">Your feedback will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-2.5">
            {entries.map((entry) => {
                const t = TYPES.find((t) => t.value === entry.type)!;
                return (
                    <li key={entry.id} className="rounded-xl p-4 bg-elevated bd-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 h-5.5 px-2.5 rounded-full bg-accent-dim bd-accent text-accent text-[11px] font-medium">
                                {t.emoji} {t.label}
                            </span>
                            <span className="text-[11px] ml-auto text-fg-3">{entry.date}</span>
                        </div>
                        <p className="text-[13px] leading-[1.65] line-clamp-3 text-fg-2">{entry.text}</p>
                    </li>
                );
            })}
        </ul>
    );
}

function SuccessState({ onClose }: { onClose: () => void }) {
    return (
        <div className="text-center py-8 flex flex-col items-center gap-4">
            {/* Accent-glow check circle — matches trust card pattern */}
            <div className="w-12 h-12 rounded-full grid place-items-center bg-accent-dim bd-accent">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div>
                <h3 className="text-[15px] font-semibold text-fg-1 mb-1">Thanks for sharing</h3>
                <p className="text-[13px] leading-[1.65] text-fg-2 max-w-[30ch] mx-auto">
                    We review every submission and use it to improve ImagePDF.Tools.
                </p>
            </div>
            <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 h-8.5 px-5 rounded-full text-[12.5px] font-medium btn-accent cursor-pointer"
                style={{ color: '#ffffff' }}
            >
                Done
            </button>
        </div>
    );
}

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("submit");
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = useCallback((entry: HistoryEntry) => {
        setHistory((prev) => [entry, ...prev]);
        setShowSuccess(true);
    }, []);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => setShowSuccess(false), 300);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop — clicking it closes the modal */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                onClick={handleClose}
            />

            {/* Panel — homepage card style */}
            <div className="relative w-full max-w-105 mx-4 mb-4 sm:mb-0 rounded-2xl overflow-hidden bg-surface bd-2"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)" }}
            >
                {/* Accent hairline at top — matches trust/privacy cards on homepage */}
                <div
                    aria-hidden="true"
                    className="absolute top-0 left-[10%] right-[10%] h-px"
                    style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }}
                />

                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-5 pb-4 bd-b-1">
                    <div>
                        {/* Monospace eyebrow — matches homepage section labels */}
                        <p className="font-data text-[10px] font-medium tracking-[0.16em] uppercase text-accent m-0 mb-1">
                            Feedback
                        </p>
                        <p className="text-[15px] font-semibold text-fg-1 m-0 leading-snug"
                            style={{ fontFamily: 'var(--font-dm-sans, system-ui)', letterSpacing: '-0.01em' }}>
                            Share your thoughts
                        </p>
                        <p className="text-[12px] text-fg-2 mt-0.5 m-0">We read every submission</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-7 h-7 rounded-full grid place-items-center text-fg-3 transition-colors cursor-pointer shrink-0 mt-0.5 bg-elevated"
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg-1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-3)"; }}
                        aria-label="Close"
                    >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {showSuccess ? (
                    <div className="px-5 pb-5">
                        <SuccessState onClose={handleClose} />
                    </div>
                ) : (
                    <>
                        {/* Tabs — minimal pill style matching homepage nav */}
                        <div className="flex items-center gap-1 px-5 pt-3.5 pb-4">
                            {([["submit", "Submit"], ["history", "History"]] as [Tab, string][]).map(([tab, label]) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] font-medium transition-colors cursor-pointer"
                                    style={{
                                        background: activeTab === tab ? "var(--accent-dim)" : "transparent",
                                        color: activeTab === tab ? "var(--accent)" : "var(--fg-3)",
                                        border: activeTab === tab ? "1px solid var(--accent-border)" : "1px solid transparent",
                                    }}
                                >
                                    {label}
                                    {tab === "history" && history.length > 0 && (
                                        <span className="w-4 h-4 rounded-full grid place-items-center bg-accent text-[10px] font-bold"
                                            style={{ color: "#ffffff" }}>
                                            {history.length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="px-5 pb-5">
                            {activeTab === "submit"
                                ? <SubmitTab key="submit" onSuccess={handleSuccess} />
                                : <HistoryTab entries={history} />
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export function FeedbackButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Tab trigger — flush to right edge, rotated up */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Open feedback"
                className="hidden sm:inline-flex fixed z-40 items-center gap-2 cursor-pointer transition-all"
                style={{
                    right: "0px",
                    top: "50%",
                    transform: "translateY(-50%) rotate(-90deg)",
                    transformOrigin: "right center",
                    height: "34px",
                    padding: "0 14px",
                    borderRadius: "8px 8px 0 0",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-2)",
                    borderBottom: "none",
                    color: "var(--fg-2)",
                    fontSize: "12px",
                    fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-elevated)";
                    e.currentTarget.style.color = "var(--fg-1)";
                    e.currentTarget.style.borderColor = "var(--border-3)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-surface)";
                    e.currentTarget.style.color = "var(--fg-2)";
                    e.currentTarget.style.borderColor = "var(--border-2)";
                }}
            >
                {/* Pulsing accent dot — matches homepage hero pill dot */}
                <span className="hp-pill-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                Feedback
            </button>

            <FeedbackModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}
