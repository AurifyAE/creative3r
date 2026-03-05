'use client';

import React, { useEffect, useRef } from 'react';
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
            className="bg-[#1F1E1E] text-white py-20 lg:py-40 px-6 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                {/* Left Side: Sticky Title */}
                <div className="lg:w-1/3">
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
                <div className="lg:w-2/3 space-y-32 lg:space-y-60 pb-20">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                (pointRefs.current[index] = el)
                            }}
                            className="relative group"
                        >
                            {/* Background Number */}
                            <span className="point-number absolute -top-10 -left-10 lg:-left-20 text-[10rem] lg:text-[18rem] font-bold text-white/10 select-none pointer-events-none transition-all duration-500 group-hover:text-[#F9844A]/10">
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

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#1F1E1E]">
            {/* Added a placeholder hero to show off the scroll effect better */}
            <div className="h-[40vh] flex items-center justify-center border-b border-white/5">
                <h1 className="text-6xl md:text-8xl font-display font-bold text-white opacity-20">ABOUT US</h1>
            </div>

            <WhyChooseSection />

            {/* Placeholder bottom section */}
            {/* <div className="h-[40vh]">


            </div> */}
        </main>
    );
}
