"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["Branding", "Website", "Research", "Revamping", "Social Media"];

interface FlipWordsProps {
    className?: string;
    interval?: number;
}

export default function FlipWords({ className = "", interval = 2200 }: FlipWordsProps) {
    const [displayIndex, setDisplayIndex] = useState(0);
    const containerRef = useRef<HTMLSpanElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const indexRef = useRef(0);
    const isAnimatingRef = useRef(false);

    const word = words[displayIndex];

    // Reset char refs array length on each render so stale refs don't persist
    charsRef.current = [];

    // Initial entrance
    useEffect(() => {
        const chars = charsRef.current.filter(Boolean);
        gsap.fromTo(
            chars,
            { opacity: 0, y: 20, rotateX: -90, filter: "blur(8px)" },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.04,
            }
        );
    }, []);

    // Cycle animation
    useEffect(() => {
        const cycle = () => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;

            const chars = charsRef.current.filter(Boolean);

            // Exit — chars fly up and blur out, staggered from last to first
            gsap.to(chars, {
                opacity: 0,
                y: -18,
                rotateX: 80,
                filter: "blur(6px)",
                duration: 0.35,
                ease: "power2.in",
                stagger: { each: 0.03, from: "end" },
                onComplete: () => {
                    const nextIndex = (indexRef.current + 1) % words.length;
                    indexRef.current = nextIndex;

                    // Update display — triggers re-render with new word
                    setDisplayIndex(nextIndex);
                },
            });
        };

        const id = setInterval(cycle, interval);
        return () => clearInterval(id);
    }, [interval]);

    // Run enter animation after displayIndex changes (new word rendered)
    useEffect(() => {
        // Skip the very first render (initial entrance handles it)
        if (!isAnimatingRef.current) return;

        const newChars = charsRef.current.filter(Boolean);

        // Reset all to start position
        gsap.set(newChars, {
            opacity: 0,
            y: 22,
            rotateX: -80,
            filter: "blur(8px)",
        });

        // Enter — chars cascade in from left
        gsap.to(newChars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
            stagger: { each: 0.045, from: "start" },
            onComplete: () => {
                isAnimatingRef.current = false;
            },
        });
    }, [displayIndex]);

    return (
        <span
            ref={containerRef}
            className={`inline-block relative ${className}`}
            style={{
                perspective: "400px",
                minWidth: "1em",
                verticalAlign: "bottom",
            }}
        >
            {word.split("").map((char, i) => (
                <span
                    key={`${displayIndex}-${i}`}
                    ref={(el) => { if (el) charsRef.current[i] = el; }}
                    style={{
                        display: "inline-block",
                        willChange: "transform, opacity, filter",
                        transformStyle: "preserve-3d",
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}