'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    initials: string;
    gradient: string;
    accentColor: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Muneeb Cholayil',
        role: 'CEO',
        initials: 'MC',
        gradient: 'from-[#F9844A] to-[#F9C74F]',
        accentColor: '#F9844A',
    },
    {
        id: 2,
        name: 'Lubna Muhammed',
        role: 'Project Manager',
        initials: 'LM',
        gradient: 'from-[#90BE6D] to-[#43AA8B]',
        accentColor: '#43AA8B',
    },
    {
        id: 3,
        name: 'Sabah Shabnam',
        role: 'Creative Head',
        initials: 'SS',
        gradient: 'from-[#F94144] to-[#F3722C]',
        accentColor: '#F3722C',
    },
    {
        id: 4,
        name: 'Mohammad Minhaj',
        role: 'Front End Developer',
        initials: 'MM',
        gradient: 'from-[#577590] to-[#4D908E]',
        accentColor: '#577590',
    },
    {
        id: 5,
        name: 'Sreerag C',
        role: 'Senior Creative Designer',
        initials: 'SC',
        gradient: 'from-[#9B5DE5] to-[#F15BB5]',
        accentColor: '#9B5DE5',
    },
    {
        id: 6,
        name: 'Ashna',
        role: 'SMM Executive',
        initials: 'AS',
        gradient: 'from-[#00BBF9] to-[#00F5D4]',
        accentColor: '#00BBF9',
    },
    {
        id: 7,
        name: 'Arjun',
        role: 'SEO Expert',
        initials: 'AR',
        gradient: 'from-[#FEE440] to-[#F9844A]',
        accentColor: '#FEE440',
    },
];

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

function TeamCard({ member, index, isVisible }: { member: TeamMember; index: number; isVisible: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
            style={{ transitionDelay: `${index * 120}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card */}
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl overflow-hidden h-full">
                {/* Animated gradient border on hover */}
                <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: '1px' }}
                >
                    <div className="w-full h-full rounded-2xl bg-[#1F1E1E]" />
                </div>

                {/* Inner content */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center text-center gap-5">
                    {/* Avatar circle with initials */}
                    <div className="relative">
                        {/* Glow ring */}
                        <div
                            className={`absolute -inset-2 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500`}
                        />
                        {/* Outer ring */}
                        <div
                            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${member.gradient} p-[2px] transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'
                                }`}
                        >
                            {/* Inner circle */}
                            <div className="w-full h-full rounded-full bg-[#2a2929] flex items-center justify-center">
                                <span
                                    className={`text-xl sm:text-2xl font-bold bg-gradient-to-br ${member.gradient} bg-clip-text text-transparent select-none`}
                                >
                                    {member.initials}
                                </span>
                            </div>
                        </div>

                        {/* Floating decorative dot */}
                        <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-0`}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wide font-ivyora">
                            {member.name}
                        </h3>
                        {/* Animated underline */}
                        <div
                            className={`mx-auto h-[2px] bg-gradient-to-r ${member.gradient} transition-all duration-500 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                                }`}
                        />
                    </div>

                    {/* Role badge */}
                    <div
                        className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase border transition-all duration-500"
                        style={{
                            borderColor: isHovered ? member.accentColor : 'rgba(255,255,255,0.1)',
                            color: isHovered ? member.accentColor : 'rgba(255,255,255,0.5)',
                            backgroundColor: isHovered ? `${member.accentColor}10` : 'transparent',
                        }}
                    >
                        {member.role}
                    </div>

                    {/* Decorative line pattern */}
                    {/* <div className="flex gap-1 items-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full bg-gradient-to-r ${member.gradient} transition-all duration-500`}
                                style={{
                                    width: i === 2 ? '16px' : '4px',
                                    height: '2px',
                                    transitionDelay: `${i * 50}ms`,
                                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0.5)',
                                }}
                            />
                        ))}
                    </div> */}
                </div>

                {/* Corner accent */}
                <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${member.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rounded-bl-[40px]`}
                />
            </div>
        </div>
    );
}

function CEOCard({ member, isVisible }: { member: TeamMember; isVisible: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card */}
            <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                {/* Animated gradient border */}
                <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: '1.5px' }}
                >
                    <div className="w-full h-full rounded-3xl bg-[#1F1E1E]" />
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${member.gradient} opacity-[0.04] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-700`}
                    />
                    <div
                        className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr ${member.gradient} opacity-[0.03] group-hover:opacity-[0.06] rounded-full blur-2xl transition-opacity duration-700`}
                    />
                </div>

                {/* Inner content */}
                <div className="relative z-10 p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Left: Avatar */}
                    <div className="relative shrink-0">
                        {/* Glow */}
                        <div
                            className={`absolute -inset-4 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`}
                        />
                        {/* Outer ring */}
                        <div
                            className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${member.gradient} p-[2.5px] transition-transform duration-600 ${isHovered ? 'scale-105 rotate-3' : 'scale-100 rotate-0'
                                }`}
                        >
                            <div className="w-full h-full rounded-full bg-[#2a2929] flex items-center justify-center">
                                <span
                                    className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br ${member.gradient} bg-clip-text text-transparent select-none`}
                                >
                                    {member.initials}
                                </span>
                            </div>
                        </div>
                        {/* Orbiting dot */}
                        <div
                            className={`absolute top-0 right-2 w-4 h-4 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-80 transition-all duration-500 shadow-lg`}
                            style={{
                                boxShadow: `0 0 12px ${member.accentColor}60`,
                            }}
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                        <div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide font-ivyora">
                                {member.name}
                            </h3>
                            {/* Animated underline */}
                            <div
                                className={`h-[2px] bg-gradient-to-r ${member.gradient} transition-all duration-600 mt-2 ${isHovered
                                    ? 'w-full opacity-100'
                                    : 'w-12 opacity-50'
                                    }`}
                            />
                        </div>

                        {/* Role badge */}
                        <div
                            className="px-5 py-2 rounded-full text-sm sm:text-base font-semibold tracking-[0.2em] uppercase border transition-all duration-500"
                            style={{
                                borderColor: member.accentColor,
                                color: member.accentColor,
                                backgroundColor: `${member.accentColor}15`,
                                boxShadow: isHovered ? `0 0 30px ${member.accentColor}15` : 'none',
                            }}
                        >
                            {member.role}
                        </div>

                        {/* Decorative line pattern */}
                        {/* <div className="flex gap-1.5 items-center opacity-30 group-hover:opacity-50 transition-opacity duration-500 mt-1">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full bg-gradient-to-r ${member.gradient} transition-all duration-500`}
                                    style={{
                                        width: i === 3 ? '24px' : i === 2 || i === 4 ? '10px' : '4px',
                                        height: '2.5px',
                                        transitionDelay: `${i * 60}ms`,
                                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0.5)',
                                    }}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* Corner accents */}
                <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${member.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rounded-bl-[60px]`}
                />
                <div
                    className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${member.gradient} opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 rounded-tr-[40px]`}
                />
            </div>
        </div>
    );
}

export default function TeamPage() {
    const headerView = useInView(0.2);
    const ceoView = useInView(0.15);
    const gridView = useInView(0.1);

    const ceo = teamMembers[0];
    const otherMembers = teamMembers.slice(1);

    return (
        <div className="min-h-screen bg-[#1F1E1E] overflow-hidden">
            {/* Background ambient glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F9844A] opacity-[0.02] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#9B5DE5] opacity-[0.015] rounded-full blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
                {/* Header */}
                <div
                    ref={headerView.ref}
                    className={`text-center mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ease-out ${headerView.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    {/* Overline */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F9844A]" />
                        <span className="text-[#F9844A] text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
                            The People
                        </span>
                        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F9844A]" />
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-[1.1]">
                        <span className="block">Meet Our</span>
                        <span className="block mt-1 sm:mt-2">
                            <span className="italic text-[#fff0a4] font-light">Creative</span>{' '}
                            <span>Team</span>
                        </span>
                    </h1>

                    {/* Subline */}
                    <p className="mt-6 text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Passionate minds crafting extraordinary digital experiences
                    </p>

                    {/* Decorative element */}
                    {/* <div className="flex justify-center gap-1 mt-8">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full bg-gradient-to-r from-[#F9844A] to-[#F9C74F]"
                                style={{
                                    width: i === 2 ? '20px' : '4px',
                                    height: '3px',
                                    opacity: i === 2 ? 0.6 : 0.25,
                                }}
                            />
                        ))}
                    </div> */}
                </div>

                {/* CEO Card - Full width featured */}
                <div
                    ref={ceoView.ref}
                    className="mb-10 sm:mb-12"
                >
                    <CEOCard member={ceo} isVisible={ceoView.isVisible} />
                </div>

                {/* Team Grid */}
                <div
                    ref={gridView.ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    {otherMembers.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                            isVisible={gridView.isVisible}
                        />
                    ))}
                </div>

                {/* Bottom decorative */}
                <div className="flex justify-center mt-16 sm:mt-20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}


// export default function TeamPage() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [direction, setDirection] = useState<'left' | 'right'>('right');
//     const [windowWidth, setWindowWidth] = useState(0);

//     useEffect(() => {
//         setWindowWidth(window.innerWidth);
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handleNext = () => {
//         setDirection('right');
//         setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
//     };

//     const handlePrev = () => {
//         setDirection('left');
//         setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
//     };

//     return (
//         <div className="min-h-screen bg-[#1F1E1E] flex items-center justify-center py-20 lg:py-30 overflow-hidden">
//             <div className="w-full max-w-6xl px-4 md:px-0">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0">
//                     {/* Header Section */}
//                     <div className="flex flex-col items-center lg:items-start justify-center gap-8 lg:gap-12 col-span-1">
//                         <div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center lg:text-left flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-0'>
//                             <h1 className="text-white leading-tight">
//                                 MEET
//                             </h1>
//                             <h2 className="italic text-[#fff0a4] leading-tight">
//                                 OUR
//                             </h2>
//                             <h2 className=" text-white leading-tight">
//                                 TEAM
//                             </h2>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col gap-8 z-10 items-center lg:items-start">
//                             <div className='flex gap-4'>
//                                 <button
//                                     onClick={handlePrev}
//                                     className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
//                                     aria-label="Previous team member"
//                                 >
//                                     <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
//                                 </button>
//                                 <button
//                                     onClick={handleNext}
//                                     className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center shadow-xl hover:scale-110 active:scale-95"
//                                     aria-label="Next team member"
//                                 >
//                                     <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
//                                 </button>
//                             </div>

//                             {/* Indicator Dots */}
//                             <div className="flex justify-center lg:justify-start gap-2">
//                                 {teamMembers.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => {
//                                             setDirection(index > currentIndex ? 'right' : 'left');
//                                             setCurrentIndex(index);
//                                         }}
//                                         className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex
//                                             ? 'bg-[#F9844A] w-8 md:w-10'
//                                             : 'bg-gray-600 hover:bg-gray-500 w-1.5 md:w-2'
//                                             }`}
//                                         aria-label={`Go to team member ${index + 1}`}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Cards Section */}
//                     <div className='col-span-1 lg:col-span-4'>
//                         <div className="relative flex items-center justify-center lg:justify-start lg:pl-20">
//                             {/* Card Wrapper Container */}
//                             <div className="relative w-full max-w-[280px] sm:max-w-sm h-[420px] md:h-[500px] lg:h-[560px]" style={{ perspective: '1000px' }}>
//                                 {teamMembers.map((member, index) => {
//                                     const position = index - currentIndex;
//                                     const absPosition = Math.abs(position);
//                                     const isVisible = absPosition <= 2;

//                                     // Visual states
//                                     let opacity = 0;
//                                     let zIndex = 0;

//                                     if (position === 0) {
//                                         opacity = 1;
//                                         zIndex = 30;
//                                     } else if (position === 1) {
//                                         opacity = 0.7;
//                                         zIndex = 20;
//                                     } else if (position === 2) {
//                                         opacity = 0.4;
//                                         zIndex = 10;
//                                     } else if (position === 3) {
//                                         opacity = 0.15;
//                                         zIndex = 5;
//                                     }

//                                     // Dynamic stacking style
//                                     // isMobile peaked peek at 20%, Desktop at 35%
//                                     const isMobile = windowWidth < 1024;
//                                     const step = isMobile ? 22 : 38;

//                                     const transform = position === 0
//                                         ? 'translateX(0) scale(1)'
//                                         : position > 0
//                                             ? `translateX(${position * step}%) scale(${1 - position * 0.12})`
//                                             : `translateX(-120%) scale(0.9) rotateY(-10deg)`;

//                                     return (
//                                         <div
//                                             key={member.id}
//                                             className="absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]"
//                                             style={{
//                                                 opacity,
//                                                 zIndex,
//                                                 transform,
//                                                 pointerEvents: isVisible ? 'auto' : 'none'
//                                             }}
//                                         >
//                                             {/* Member Card */}
//                                             <div className="rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col border border-white/5 bg-[#252424] group">
//                                                 {/* Image Area */}
//                                                 <div className="h-[320px] md:h-[400px] lg:h-[480px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
//                                                     <img
//                                                         src={member.image}
//                                                         alt={member.name}
//                                                         className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                                                     />
//                                                     {position === 0 && (
//                                                         <div className="absolute inset-0 bg-linear-to-t from-[#1F1E1E] via-transparent to-transparent opacity-100" />
//                                                     )}
//                                                 </div>

//                                                 {/* Content Area */}
//                                                 <div className="p-4 md:p-6 bg-[#1F1E1E] text-center flex-1 flex flex-col justify-center">
//                                                     {position === 0 ? (
//                                                         <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 delay-150 fill-mode-both">
//                                                             <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
//                                                                 {member.name}
//                                                             </h3>
//                                                             <p className="text-[#F9844A] text-base md:text-lg font-medium">
//                                                                 {member.role}
//                                                             </p>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="opacity-0 h-full" />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }