'use client';

import React, { useState } from 'react';
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

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div className="min-h-screen bg-[#1F1E1E] flex items-center justify-center py-30">
      <div className="w-full max-w-5xl ">
        <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-10 col-span-1">
                <div className='text-6xl md:text-7xl'>
                <h1 className="text-white">
                    MEET
                </h1>
                <h2 className="italic text-[#fff0a4]">
                   OUR
                </h2>
                <h2 className=" text-white">
                    TEAM
                </h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col gap-6 z-10">
                    <div className='flex gap-4'>
                        <button
                        onClick={handlePrev}
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110"
                        aria-label="Previous team member"
                        >
                        <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                        onClick={handleNext}
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110"
                        aria-label="Next team member"
                        >
                        <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Indicator Dots */}
                    <div className="flex justify-center gap-2">
                    {teamMembers.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => {
                        setDirection(index > currentIndex ? 'right' : 'left');
                        setCurrentIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                            ? 'bg-[#F9844A] w-10'
                            : 'bg-gray-600 hover:bg-gray-500 w-2'
                        }`}
                        aria-label={`Go to team member ${index + 1}`}
                    />
                    ))}
                    </div>
                </div>
            </div>

            <div className='col-span-4'>
                {/* Card Container */}
                <div className="relative flex items-center justify-baseline pl-20">
                {/* Card Wrapper */}
                <div className="relative w-full max-w-sm h-[560px]" style={{ perspective: '1000px' }}>
                    {teamMembers.map((member, index) => {
                    // Calculate position relative to current index
                    const position = index - currentIndex;
                    const absPosition = Math.abs(position);
                    
                    // Determine if card should be visible
                    const isVisible = absPosition <= 2;
                    
                    let transformClass = '';
                    let opacityClass = 'opacity-0';
                    let zIndexClass = 'z-0';
                    let scaleClass = 'scale-100';
                    let translateYClass = '';
                    
                    if (position === 0) {
                        // Current/Active card - front and center
                        transformClass = 'translate-x-0';
                        opacityClass = 'opacity-100';
                        zIndexClass = 'z-30';
                        scaleClass = 'scale-100';
                        translateYClass = 'translate-y-0';
                    } else if (position === 1) {
                        // Next card - stacked behind on the right
                        transformClass = 'translate-x-35';
                        opacityClass = 'opacity-70';
                        zIndexClass = 'z-20';
                        scaleClass = 'scale-85';
                        translateYClass = 'translate-y-0';
                    } else if (position === 2) {
                        // Second next card - further behind on the right
                        transformClass = 'translate-x-70';
                        opacityClass = 'opacity-40';
                        zIndexClass = 'z-10';
                        scaleClass = 'scale-70';
                        translateYClass = 'translate-y-0';
                    } else if (position === 3) {
                        // Third next card - further behind on the right
                        transformClass = 'translate-x-100';
                        opacityClass = 'opacity-20';
                        zIndexClass = 'z-5';
                        scaleClass = 'scale-55';
                        translateYClass = 'translate-y-0';
                    } else if (position < 0) {
                        // Cards going to the left (exiting)
                        transformClass = '-translate-x-full';
                        opacityClass = 'opacity-0';
                        zIndexClass = 'z-0';
                        scaleClass = 'scale-90';
                    } else {
                        // Cards far ahead (not visible)
                        transformClass = 'translate-x-full';
                        opacityClass = 'opacity-0';
                        zIndexClass = 'z-0';
                    }

                    return (
                        <div
                        key={member.id}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${transformClass} ${opacityClass} ${zIndexClass} ${scaleClass} ${translateYClass} ${!isVisible ? 'pointer-events-none' : ''}`}
                        >
                        {/* Card */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col border border-gray-700/30">
                            {/* Image */}
                            <div className="h-[480px] overflow-hidden grayscale-75">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                            {position === 0 && (
                                <div className="absolute inset-0 h-[460px] bg-linear-to-t from-[#1F1E1E] via-transparent to-transparent opacity-100" />
                            )}
                            </div>
                            {/* Content */}
                            <div className="p-4 bg-[#1F1E1E] text-center flex-1 flex flex-col">
                                {position === 0 ? (
                                    <>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-[#F9844A] text-lg mb-4">
                                            {member.role}
                                        </p>
                                        {/* <p className="text-gray-300 text-sm leading-relaxed">
                                            {member.bio}
                                        </p> */}
                                    </>
                                ) : (
                                    <div className="h-full" />
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