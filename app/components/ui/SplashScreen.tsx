"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import FlipWords from "./FlipWords";

const POINTS = 700;
const WIDTH = 1200;
const SPLASH_DURATION = 10000;
const CENTER_Y = 35;

const WAVE_CONFIGS = [
    { amplitude: 22, freq: 0.012, phaseOffset: 0, phaseSpeed: 0.022, strokeWidth: 2, color: "#E76F51", opacity: 1, alwaysFull: false },
    { amplitude: 22, freq: 0.012, phaseOffset: Math.PI, phaseSpeed: 0.022, strokeWidth: 2, color: "#ffffff", opacity: 0.1, alwaysFull: true },
    { amplitude: 22, freq: 0.012, phaseOffset: Math.PI, phaseSpeed: 0.022, strokeWidth: 2, color: "#E76F51", opacity: 1, alwaysFull: false },
    { amplitude: 22, freq: 0.012, phaseOffset: 0, phaseSpeed: 0.022, strokeWidth: 2, color: "#ffffff", opacity: 0.1, alwaysFull: true },
];

// Easing function: makes progress jump — fast bursts then brief pauses
// Composed of 5 "steps" that each accelerate then ease out
function jumpEase(t: number): number {
    // 5 uneven jumps: each segment rushes then plateaus slightly
    const segments = [
        { end: 0.18, targetPct: 0.22 },
        { end: 0.34, targetPct: 0.41 },
        { end: 0.55, targetPct: 0.62 },
        { end: 0.75, targetPct: 0.80 },
        { end: 1.00, targetPct: 1.00 },
    ];

    let prevEnd = 0;
    let prevTarget = 0;

    for (const seg of segments) {
        if (t <= seg.end) {
            const local = (t - prevEnd) / (seg.end - prevEnd);
            // fast ease in, then slow ease out — creates the "jump then hang" feel
            const eased = local < 0.5
                ? 4 * local * local * local
                : 1 - Math.pow(-2 * local + 2, 3) / 2;
            return prevTarget + (seg.targetPct - prevTarget) * eased;
        }
        prevEnd = seg.end;
        prevTarget = seg.targetPct;
    }
    return 1;
}

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const wavyRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const lineRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null]);
    const [mounted, setMounted] = useState(false);

    const masterPhaseRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const lastPctRef = useRef(-1);
    // Smoothly interpolated display progress (what we actually draw)
    const displayProgressRef = useRef(0);

    const drawLine = (
        line: SVGPathElement | null,
        phase: number,
        progress: number,
        cfg: typeof WAVE_CONFIGS[number]
    ) => {
        if (!line) return;
        const pts = cfg.alwaysFull ? POINTS : Math.floor(POINTS * Math.min(progress, 1));
        if (pts === 0) { line.setAttribute("d", ""); return; }
        let d = "";
        for (let i = 0; i <= pts; i++) {
            const x = (i / POINTS) * WIDTH;
            const y = CENTER_Y + Math.sin(i * cfg.freq + phase + cfg.phaseOffset) * cfg.amplitude;
            d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        line.setAttribute("d", d);
    };

    useEffect(() => {
        if (!mounted) return;

        const update = () => {
            masterPhaseRef.current += WAVE_CONFIGS[0].phaseSpeed;

            if (startTimeRef.current === null) startTimeRef.current = performance.now();
            const elapsed = performance.now() - startTimeRef.current;
            const rawT = Math.min(elapsed / SPLASH_DURATION, 1);

            // Apply jump easing to get the "jumpy" target progress
            const targetProgress = jumpEase(rawT);

            // Smoothly lerp displayProgress toward target — gives the wave a
            // slight inertia so it "rushes" then "settles" at each plateau
            const lerpSpeed = 0.08;
            displayProgressRef.current += (targetProgress - displayProgressRef.current) * lerpSpeed;
            const dp = displayProgressRef.current;

            // Draw wave with display progress
            WAVE_CONFIGS.forEach((cfg, i) => drawLine(lineRefs.current[i], masterPhaseRef.current, dp, cfg));

            // Update percent — based on target (jumps instantly) not display (smooth)
            const pct = Math.floor(targetProgress * 100);
            if (pct !== lastPctRef.current && percentRef.current) {
                lastPctRef.current = pct;

                // Kill any in-progress tween on the counter
                gsap.killTweensOf(percentRef.current);

                // Animate the number changing — jump up, slam down
                gsap.fromTo(
                    percentRef.current,
                    { y: -10, opacity: 0, scale: 1.3 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2)" }
                );

                percentRef.current.textContent = `${pct}%`;
            }
        };

        gsap.ticker.add(update);
        return () => gsap.ticker.remove(update);
    }, [mounted]);

    useEffect(() => {
        setMounted(true);

        const tl = gsap.timeline({ delay: 0.15 });

        tl.fromTo(
            logoRef.current,
            { opacity: 0, y: 32, scale: 0.9, filter: "blur(6px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power4.out" }
        )
            .fromTo(
                taglineRef.current,
                { opacity: 0, y: 18, filter: "blur(4px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" },
                "-=0.55"
            )
            .fromTo(
                wavyRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            );

        const exitDelay = setTimeout(() => {
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 1.035,
                filter: "blur(8px)",
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => onComplete?.(),
            });
        }, SPLASH_DURATION);

        return () => clearTimeout(exitDelay);
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-evenly bg-[#1F1E1E]"
            style={{ willChange: "opacity, transform, filter" }}
        >
            <div>
                {/* Logo */}
                <div ref={logoRef} className="flex flex-col items-center gap-4 opacity-0">
                    <Image src="/assets/images/logo.svg" alt="3R Creative logo" width={90} height={90} priority />
                    <Image src="/assets/images/logoName.svg" alt="3R Creative" width={220} height={44} priority />
                </div>

                {/* Tagline + FlipWords */}
                <div ref={taglineRef} className="mt-6 flex flex-col items-center gap-2 opacity-0">
                    <p className="text-sm md:text-base text-neutral-500 tracking-widest uppercase font-poppins">
                        <span>Reflect.</span>{" "}
                        <span>Refine.</span>{" "}
                        <span>Resonate.</span>
                    </p>

                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <p className="text-lg md:text-xl text-neutral-500 tracking-widest uppercase font-poppins">
                    We Craft
                </p>
                <p>
                    <span className="text-4xl md:text-5xl text-white font-ivyora italic font-medium">
                        <FlipWords />
                    </span>
                </p>
            </div>

            {/* Wave + counter */}
            <div ref={wavyRef} className="absolute bottom-20 left-0 w-full opacity-0">

                {/* Percent counter */}
                <div className="flex justify-end px-6 pb-1">
                    <span
                        ref={percentRef}
                        className="font-poppins text-xs tabular-nums"
                        style={{
                            color: "#E76F51",
                            letterSpacing: "0.1em",
                            willChange: "transform, opacity",
                            display: "inline-block",
                        }}
                    >
                        0%
                    </span>
                </div>

                <div className="overflow-hidden">
                    <svg
                        className="w-full h-auto"
                        viewBox="0 0 1200 70"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter id="glow" x="-10%" y="-80%" width="120%" height="260%">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Ghost rails */}
                        <path ref={(el) => { lineRefs.current[1] = el; }} stroke={WAVE_CONFIGS[1].color} strokeWidth={WAVE_CONFIGS[1].strokeWidth} strokeLinecap="round" fill="none" opacity={WAVE_CONFIGS[1].opacity} />
                        {/* <path ref={(el) => { lineRefs.current[3] = el; }} stroke={WAVE_CONFIGS[3].color} strokeWidth={WAVE_CONFIGS[3].strokeWidth} strokeLinecap="round" fill="none" opacity={WAVE_CONFIGS[3].opacity} /> */}

                        {/* Active progress lines */}
                        {/* <path ref={(el) => { lineRefs.current[0] = el; }} stroke={WAVE_CONFIGS[0].color} strokeWidth={WAVE_CONFIGS[0].strokeWidth} strokeLinecap="round" fill="none" filter="url(#glow)" /> */}
                        <path ref={(el) => { lineRefs.current[2] = el; }} stroke={WAVE_CONFIGS[2].color} strokeWidth={WAVE_CONFIGS[2].strokeWidth} strokeLinecap="round" fill="none" filter="url(#glow)" />
                    </svg>
                </div>
            </div>
        </div>
    );
}