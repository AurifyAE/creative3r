"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../ui/SplashScreen";

export default function SplashProvider({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const [hidden, setHidden] = useState(false);

    // Prevent body scroll during splash
    useEffect(() => {
        if (showSplash) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showSplash]);

    const handleComplete = () => {
        setShowSplash(false);
        // Small delay before unmounting so fade-out finishes
        setTimeout(() => setHidden(true), 700);
    };

    return (
        <>
            {!hidden && <SplashScreen onComplete={handleComplete} />}
            <div
                style={{
                    opacity: hidden ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: hidden ? "auto" : "none",
                }}
            >
                {children}
            </div>
        </>
    );
}
