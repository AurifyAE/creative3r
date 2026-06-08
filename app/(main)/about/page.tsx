'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const pointRefs = useRef<(HTMLDivElement | null)[]>([]);

    const points = [
        {
            number: '01',
            title: 'Reflect',
            value: 'Value: Authenticity & Insight',
            description: 'You believe every brand has a unique story and soul. Your team helps clients see their true essence by listening deeply, understanding their heritage, market, and customer, and then turning that into meaningful creative expression.'
        },
        {
            number: '02',
            title: 'Refine',
            value: 'Value: Excellence & Craftsmanship',
            description: "You're obsessed with the details. Whether it's branding, digital experiences, or strategic consultancy, your approach is always polished, thoughtful, and premium—no fluff, just solid, beautiful work with high standards."
        },
        {
            number: '03',
            title: 'Resonate',
            value: 'Value: Impact & Relevance',
            description: "You don't just design for the now—you design to connect. Every visual, every word, every experience is meant to hit home with the intended audience, creating long-term brand affinity and business results."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animating points on scroll
            pointRefs.current.forEach((point, index) => {
                if (!point) return;

                gsap.fromTo(
                    point.querySelector('.point-content'),
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: point,
                            start: 'top 80%',
                            end: 'top 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                gsap.fromTo(
                    point.querySelector('.point-number'),
                    { opacity: 0, x: -50, scale: 0.8 },
                    {
                        opacity: 0.1,
                        x: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: point,
                            start: 'top 90%',
                            end: 'top 30%',
                            scrub: 1
                        }
                    }
                );
            });

            // Sticky title animation
            if (leftContentRef.current) {
                gsap.fromTo(
                    leftContentRef.current,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 80%'
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="bg-[#1F1E1E] text-white py-20 lg:py-20 px-6 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                {/* Left Side: Sticky Title */}
                <div className="lg:w-1/2 flex items-start justify-center">
                    <div ref={leftContentRef} className="lg:sticky lg:top-40 space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl italic font-display leading-tight ">
                            Why Choose <br />
                            <span className="text-[#F4A261] not-italic uppercase font-bold">3RCreative?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/70 max-w-md font-sans leading-relaxed">
                            We're more than a creative agency. We are your brand custodians, working tirelessly to:
                        </p>
                    </div>
                </div>

                {/* Right Side: Values List */}
                <div className="lg:w-1/2 space-y-32 lg:space-y-60 pb-20">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                (pointRefs.current[index] = el)
                            }}
                            className="relative group"
                        >
                            {/* Background Number */}
                            <span className="point-number absolute -top-10 -left-10 lg:-left-20 text-[10rem] lg:text-[18rem] font-bold text-white/30 select-none pointer-events-none transition-all duration-500 group-hover:text-[#F9844A]/10">
                                {point.number}
                            </span>

                            <div className="point-content relative z-10 space-y-4 max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide">
                                    {point.title}
                                </h3>
                                <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10">
                                    <p className="text-[#F4A261] text-sm md:text-base font-semibold uppercase tracking-wider">
                                        {point.value}
                                    </p>
                                </div>
                                <p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutHero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        const nextMuted = !isMuted;
        video.muted = nextMuted;
        setIsMuted(nextMuted);
    };

    return (
        <section className="relative w-full overflow-hidden border-b border-white/5">
            <div className="relative h-[30vh] min-h-[300px] md:h-[50vh] lg:h-[80vh] max-h-[900px]">
                <video
                    ref={videoRef}
                    src="/assets/videos/about/aboutus-cover.mp4"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label="About 3R Creative"
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            linear-gradient(to bottom, rgba(31, 30, 30, 0.85) 0%, rgba(31, 30, 30, 0.2) 40%, rgba(31, 30, 30, 0.2) 70%, rgba(31, 30, 30, 1) 100%),
                            linear-gradient(to right, rgba(31, 30, 30, 0.6) 0%, transparent 30%, transparent 70%, rgba(31, 30, 30, 0.6) 100%)
                        `,
                    }}
                />
                <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:text-white"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                    {isMuted ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M15 9.879V14m0-8.121V6" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-4.536-9.536a9 9 0 000 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="px-6 pb-12 pt-10 md:pb-16 md:pt-12 text-center">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-[#F4A261]">
                    Who we are
                </p>
                <h1 className="font-display text-5xl font-bold text-white md:text-7xl lg:text-8xl">
                    About us
                </h1>
            </div>
        </section>
    );
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#1F1E1E]">
            <AboutHero />

            <WhyChooseSection />

            {/* Placeholder bottom section */}
            {/* <div className="h-[40vh]">


            </div> */}
        </main>
    );
}
