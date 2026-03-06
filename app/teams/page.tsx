'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
        bio: 'Leading the company with 15+ years of industry experience.',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'CTO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        bio: 'Tech visionary driving our innovative solutions.',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
        bio: 'Creating beautiful and intuitive user experiences.',
    },
    {
        id: 4,
        name: 'David Thompson',
        role: 'Head of Marketing',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        bio: 'Building our brand and connecting with customers.',
    },
    {
        id: 5,
        name: 'Lisa Wang',
        role: 'Lead Developer',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
        bio: 'Crafting robust and scalable software solutions.',
    },
];

export default function TeamPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const handlePrev = () => {
        setDirection('left');
        setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    return (
        <div className="min-h-screen bg-[#1F1E1E] flex items-center justify-center py-20 lg:py-30 overflow-hidden">
            <div className="w-full max-w-6xl px-4 md:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0">
                    {/* Header Section */}
                    <div className="flex flex-col items-center lg:items-start justify-center gap-8 lg:gap-12 col-span-1">
                        <div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center lg:text-left flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-0'>
                            <h1 className="text-white leading-tight">
                                MEET
                            </h1>
                            <h2 className="italic text-[#fff0a4] leading-tight">
                                OUR
                            </h2>
                            <h2 className=" text-white leading-tight">
                                TEAM
                            </h2>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col gap-8 z-10 items-center lg:items-start">
                            <div className='flex gap-4'>
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
                                    aria-label="Previous team member"
                                >
                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
                                    aria-label="Next team member"
                                >
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </button>
                            </div>

                            {/* Indicator Dots */}
                            <div className="flex justify-center lg:justify-start gap-2">
                                {teamMembers.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setDirection(index > currentIndex ? 'right' : 'left');
                                            setCurrentIndex(index);
                                        }}
                                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-[#F9844A] w-8 md:w-10'
                                            : 'bg-gray-600 hover:bg-gray-500 w-1.5 md:w-2'
                                            }`}
                                        aria-label={`Go to team member ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div className='col-span-1 lg:col-span-4'>
                        <div className="relative flex items-center justify-center lg:justify-start lg:pl-20">
                            {/* Card Wrapper Container */}
                            <div className="relative w-full max-w-[280px] sm:max-w-sm h-[420px] md:h-[500px] lg:h-[560px]" style={{ perspective: '1000px' }}>
                                {teamMembers.map((member, index) => {
                                    const position = index - currentIndex;
                                    const absPosition = Math.abs(position);
                                    const isVisible = absPosition <= 2;

                                    // Visual states
                                    let opacity = 0;
                                    let zIndex = 0;

                                    if (position === 0) {
                                        opacity = 1;
                                        zIndex = 30;
                                    } else if (position === 1) {
                                        opacity = 0.7;
                                        zIndex = 20;
                                    } else if (position === 2) {
                                        opacity = 0.4;
                                        zIndex = 10;
                                    } else if (position === 3) {
                                        opacity = 0.15;
                                        zIndex = 5;
                                    }

                                    // Dynamic stacking style
                                    // isMobile peaked peek at 20%, Desktop at 35%
                                    const isMobile = windowWidth < 1024;
                                    const step = isMobile ? 22 : 38;

                                    const transform = position === 0
                                        ? 'translateX(0) scale(1)'
                                        : position > 0
                                            ? `translateX(${position * step}%) scale(${1 - position * 0.12})`
                                            : `translateX(-120%) scale(0.9) rotateY(-10deg)`;

                                    return (
                                        <div
                                            key={member.id}
                                            className="absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                            style={{
                                                opacity,
                                                zIndex,
                                                transform,
                                                pointerEvents: isVisible ? 'auto' : 'none'
                                            }}
                                        >
                                            {/* Member Card */}
                                            <div className="rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col border border-white/5 bg-[#252424] group">
                                                {/* Image Area */}
                                                <div className="h-[320px] md:h-[400px] lg:h-[480px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    {position === 0 && (
                                                        <div className="absolute inset-0 bg-linear-to-t from-[#1F1E1E] via-transparent to-transparent opacity-100" />
                                                    )}
                                                </div>

                                                {/* Content Area */}
                                                <div className="p-4 md:p-6 bg-[#1F1E1E] text-center flex-1 flex flex-col justify-center">
                                                    {position === 0 ? (
                                                        <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 delay-150 fill-mode-both">
                                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                                                                {member.name}
                                                            </h3>
                                                            <p className="text-[#F9844A] text-base md:text-lg font-medium">
                                                                {member.role}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="opacity-0 h-full" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}