"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Props {
    originalSrc: string;
    compressedSrc: string;
    originalSize: number;
    compressedSize: number;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Convert screen-space split position → image-local clip percentage
// so the clip edge stays under the divider line even when zoomed/panned.
// Derivation: local_x = (screen_x - panX + W*(zoom-1)/2) / zoom
function screenSplitToClipPct(splitPct: number, panX: number, zoom: number): number {
    const frac = (splitPct / 100 - panX / 1 + (zoom - 1) / 2) / zoom;
    // ↑ panX is already normalised by calling code (passed as panX/containerWidth)
    return Math.min(100, Math.max(0, frac * 100));
}

interface SliderProps {
    originalSrc: string;
    compressedSrc: string;
    splitPct: number;
    onSplitChange: (pct: number) => void;
    className?: string;
}

function CompareSlider({ originalSrc, compressedSrc, splitPct, onSplitChange, className = "" }: SliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [hoverNearDivider, setHoverNearDivider] = useState(false);
    const [isActivePanning, setIsActivePanning] = useState(false);

    // "split" — dragging the divider; "pan" — dragging the image; null — nothing
    const dragMode = useRef<"split" | "pan" | null>(null);
    const panStart = useRef({ mouseX: 0, mouseY: 0, panX: 0, panY: 0 });

    const pinchStartDist = useRef<number | null>(null);
    const pinchStartZoom = useRef(1);
    const pinchStartPan = useRef({ x: 0, y: 0 });
    const singleTouchPan = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

    const clampPan = useCallback((x: number, y: number, z: number): { x: number; y: number } => {
        const el = containerRef.current;
        if (!el || z <= 1) return { x: 0, y: 0 };
        const maxX = (el.offsetWidth * (z - 1)) / 2;
        const maxY = (el.offsetHeight * (z - 1)) / 2;
        return { x: Math.min(maxX, Math.max(-maxX, x)), y: Math.min(maxY, Math.max(-maxY, y)) };
    }, []);

    // Returns true when the pointer is within 16 px of the divider line
    const nearDivider = useCallback((clientX: number): boolean => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return false;
        return Math.abs(clientX - (rect.left + (splitPct / 100) * rect.width)) < 16;
    }, [splitPct]);

    // Scroll → zoom
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
            setZoom(prev => {
                const next = Math.min(10, Math.max(1, prev * factor));
                if (next <= 1) { setPan({ x: 0, y: 0 }); return 1; }
                setPan(p => clampPan(p.x, p.y, next));
                return next;
            });
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [clampPan]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (nearDivider(e.clientX) || zoom === 1) {
            dragMode.current = "split";
            setIsActivePanning(false);
        } else {
            dragMode.current = "pan";
            setIsActivePanning(true);
            panStart.current = { mouseX: e.clientX, mouseY: e.clientY, panX: pan.x, panY: pan.y };
        }
    }, [zoom, pan, nearDivider]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.buttons !== 1) {
            dragMode.current = null;
            setIsActivePanning(false);
            setHoverNearDivider(nearDivider(e.clientX));
            return;
        }
        if (dragMode.current === "pan") {
            const dx = e.clientX - panStart.current.mouseX;
            const dy = e.clientY - panStart.current.mouseY;
            setPan(clampPan(panStart.current.panX + dx, panStart.current.panY + dy, zoom));
        } else if (dragMode.current === "split") {
            const rect = e.currentTarget.getBoundingClientRect();
            onSplitChange(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
        }
    }, [zoom, clampPan, onSplitChange, nearDivider]);

    const handleMouseUp = useCallback(() => { dragMode.current = null; setIsActivePanning(false); }, []);
    const handleMouseLeave = useCallback(() => { dragMode.current = null; setIsActivePanning(false); setHoverNearDivider(false); }, []);

    // Touch: pinch = zoom, 1-finger = pan when zoomed, split drag when not zoomed
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            pinchStartDist.current = Math.hypot(dx, dy);
            pinchStartZoom.current = zoom;
            pinchStartPan.current = pan;
            singleTouchPan.current = null;
        } else if (e.touches.length === 1) {
            if (zoom > 1) {
                singleTouchPan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
            }
        }
    }, [zoom, pan]);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 2 && pinchStartDist.current !== null) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const next = Math.min(10, Math.max(1, pinchStartZoom.current * (dist / pinchStartDist.current)));
            if (next <= 1) { setZoom(1); setPan({ x: 0, y: 0 }); return; }
            setZoom(next);
            setPan(clampPan(pinchStartPan.current.x, pinchStartPan.current.y, next));
            return;
        }
        if (e.touches.length === 1) {
            if (singleTouchPan.current && zoom > 1) {
                const dx = e.touches[0].clientX - singleTouchPan.current.x;
                const dy = e.touches[0].clientY - singleTouchPan.current.y;
                setPan(clampPan(singleTouchPan.current.panX + dx, singleTouchPan.current.panY + dy, zoom));
                return;
            }
            // Split drag at zoom=1
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            onSplitChange(Math.min(100, Math.max(0, ((touch.clientX - rect.left) / rect.width) * 100)));
        }
    }, [zoom, clampPan, onSplitChange]);

    const resetZoom = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

    // Map screen-space split → image-local clip so they stay aligned at any zoom/pan
    const containerWidth = containerRef.current?.offsetWidth ?? 1;
    const normalizedPanX = pan.x / containerWidth;
    const clipPct = screenSplitToClipPct(splitPct, normalizedPanX, zoom);

    const cursor = isActivePanning
        ? "cursor-grabbing"
        : hoverNearDivider || zoom === 1
        ? "cursor-col-resize"
        : "cursor-grab";

    return (
        <div
            ref={containerRef}
            className={`relative w-full rounded-xl overflow-hidden select-none bg-slate-200 dark:bg-slate-700 ${cursor} ${className}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ touchAction: zoom > 1 ? "none" : "pan-y" }}
        >
            {/* Transformed image layer */}
            <div
                className="absolute inset-0"
                style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transformOrigin: "center center",
                }}
            >
                {/* Compressed — behind */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={compressedSrc} alt="Compressed" className="absolute inset-0 w-full h-full object-contain" draggable={false} />
                {/* Original — clipped using image-local coordinates so it tracks the divider */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={originalSrc}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ clipPath: `inset(0 ${100 - clipPct}% 0 0)` }}
                    draggable={false}
                />
            </div>

            {/* Divider — always in screen space at splitPct% */}
            <div
                className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] pointer-events-none"
                style={{ left: `${splitPct}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-black/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <span className="absolute top-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full pointer-events-none">Original</span>
            <span className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full pointer-events-none">Compressed</span>

            {/* Zoom badge + reset */}
            {zoom > 1 && (
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={resetZoom}
                    className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-semibold bg-black/60 hover:bg-black/80 text-white px-2 py-1 rounded-full transition-colors"
                >
                    {zoom.toFixed(1)}× — Reset
                </button>
            )}
            {zoom === 1 && (
                <span className="absolute bottom-2 left-2 text-[10px] text-white/40 pointer-events-none select-none">
                    Scroll to zoom
                </span>
            )}
        </div>
    );
}

export function CompareView({ originalSrc, compressedSrc, originalSize, compressedSize }: Props) {
    const [splitPct, setSplitPct] = useState(50);
    const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 px-1">
                <span>Before: <span className="font-semibold text-slate-800 dark:text-slate-200">{formatBytes(originalSize)}</span></span>
                <span className={`font-bold text-sm ${savings > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                    {savings > 0 ? `−${savings}%` : "No change"}
                </span>
                <span>After: <span className="font-semibold text-violet-600">{formatBytes(compressedSize)}</span></span>
            </div>

            <CompareSlider
                originalSrc={originalSrc}
                compressedSrc={compressedSrc}
                splitPct={splitPct}
                onSplitChange={setSplitPct}
                className="aspect-video"
            />

            <input
                type="range"
                min={0}
                max={100}
                value={splitPct}
                onChange={(e) => setSplitPct(Number(e.target.value))}
                className="w-full mt-2 h-1.5 appearance-none rounded-full bg-slate-300 dark:bg-slate-600 accent-violet-500 cursor-pointer"
                aria-label="Compare slider position"
            />
        </div>
    );
}
