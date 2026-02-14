'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title1: 'BRANDING', color: '#E76F51' },
  { title1: 'PHOTO', title2: 'GRAPHY', color: '#299D8F' },
  { title1: 'SOCIAL', title2: 'MEDIA', color: '#E9C369' },
  { title1: 'CONTENT', title2: 'CREATION', color: '#F4A261' },
  { title1: 'VIDEO', title2: 'GRAPHY', color: '#299D8F' },
  { title1: 'WEB', title2: 'DESIGN', color: '#E76F51' }
];

const positions = [
  { x: -200, y: 10 },
  { x: -420, y: 80 },
  { x: -480, y: 300 },
  { x: -270, y: 350 },
  { x: -60,  y: 400 },
  { x: 150,  y: 430 }
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileServiceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cards = serviceRefs.current.filter(Boolean) as HTMLDivElement[];
    const mobileCards = mobileServiceRefs.current.filter(Boolean) as HTMLDivElement[];
    const mobileContainer = mobileContainerRef.current;
    
    if (!hero) return;

    const mm = gsap.matchMedia();

    // Desktop animation
    mm.add("(min-width: 1024px)", () => {
      if (cards.length) {
        cards.forEach((card, index) => {
          const { x } = positions[index];
          gsap.set(card, {
            x,
            y: 600,
            opacity: 0,
            scale: 0.85,
            rotationX: 15,
            transformPerspective: 1200,
            willChange: 'transform, opacity',
            force3D: true
          });
        });
      
        const tl = gsap.timeline({
          defaults: {
            ease: 'power3.out'
          }
        });
      
        cards.forEach((card, index) => {
          const { y } = positions[index];
          
          tl.to(card, {
            y,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: 'power3.out'
          }, index * 0.12);
        });
      
        ScrollTrigger.create({
          animation: tl,
          trigger: hero,
          start: 'top -50%',
          end: '+=250%',
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true
        });
      }
    });

    // Mobile stacked cards animation - cards come from bottom one by one
    mm.add("(max-width: 1024px)", () => {
      if (mobileCards.length && mobileContainer) {
        // Set initial state - all cards start below viewport
        mobileCards.forEach((card, index) => {
          gsap.set(card, {
            y: 500, // Start from bottom (off-screen)
            opacity: 0,
            scale: 0.85,
            zIndex: index // Each card has higher z-index than previous
          });
        });

        // Create a single timeline with all animations
        const mobileTl = gsap.timeline();

        // Animate each card sequentially, and reduce opacity of previous card
        mobileCards.forEach((card, index) => {
          const stackOffset = -index * 12;
          const scaleValue = 1 + (index * 0.025);

          // Animate current card in
          mobileTl.to(card, {
            y: stackOffset,
            opacity: 0.9,
            scale: scaleValue,
            duration: 1,
            ease: 'power2.out'
          }, index * 1); // Each card starts 1 second after the previous in the timeline

          // If not the first card, reduce opacity of the previous card
          if (index > 0) {
            mobileTl.to(mobileCards[index - 1], {
              opacity: 0.2, // Reduced opacity for previous card
              duration: 0.4,
              ease: 'power1.out'
            }, index * 1 + 0.7); // Slightly after current card starts animating in
          }
        });

        // Single ScrollTrigger that controls the entire timeline
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: `+=${mobileCards.length * 300}`,
          scrub: 1.5,
          animation: mobileTl,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true
        });
      }
    });

    return () => {
      mm.revert(); // This cleans up all matchMedia animations
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-1/2 lg:min-h-[150vh] bg-[#1F1E1E] text-white">
      {/* Hero */}
      <div className="relative flex items-start min-h-screen">
        <div className="absolute top-0 right-0 md:right-10 lg:right-25 xl:right-35">
          <div className="relative">
            <video
              src="/assets/videos/home/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full lg:w-[50vw] h-full aspect-square object-cover rounded-b-3xl"
            ></video>

            <div className="hidden lg:block absolute top-0 right-0 w-20 h-20 bg-[#1F1E1E] rounded-bl-3xl"></div>
            <div className="hidden lg:block absolute bottom-20 left-0 w-56 h-56 bg-[#1F1E1E] rounded-r-3xl"></div>
          </div>
        </div>

        <div className='absolute bottom-25 left-5 md:-bottom-30 md:left-25'>
          <h2 className='text-3xl md:text-4xl font-normal'><span className=''>What</span><br/> <span className='font-semibold text-4xl md:text-5xl  italic'>We Do</span></h2>
        </div>

        <div className='absolute w-52 md:w-80 bottom-25 right-5 md:bottom-10 md:right-40'>
          <p className='font-light text-sm md:text-base'>Creative Agency focusing on Precious Metals & Jewellery Industry</p>
        </div>

        <div className="relative flex flex-col justify-center h-full z-10 pl-10 lg:pl-15 xl:pl-40 pt-30">
          <div className="flex items-end gap-2">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-light">We Build</h1>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-normal italic">Brands</h2>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-light">That</h3>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-normal italic">Resonates</h2>
          </div>
          <p className="text-xs lg:text-base font-normal">Uncovering your real brand story.</p>
        </div>

        {/* Desktop Services cards pinned around the video */}
        <div className="hidden lg:block absolute bottom-73 left-[55%] z-20">
          <div className="relative" style={{ perspective: '1200px' }}>
            {services.map((service, index) => (
              <div
                key={index}
                ref={el => {
                  serviceRefs.current[index] = el;
                }}
                className="absolute w-48 h-48 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-500 ease-out will-change-transform hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundColor: service.color,
                  transformStyle: 'preserve-3d'
                }}
              >
                <span className="flex flex-col text-white font-bold text-3xl uppercase tracking-wide text-left leading-tight">
                  {service.title1}
                  {service.title2 && <span>{service.title2}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Services cards - Stacked from bottom */}
        <div 
          ref={mobileContainerRef}
          className="flex items-center justify-center lg:hidden absolute bottom-0 left-0 right-0 z-20 h-[80vh] "
        >
          <div className="relative w-5/6 h-52">
            {services.map((service, index) => (
              <div
                key={`mobile-${index}`}
                ref={el => {
                  mobileServiceRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-52 rounded-2xl shadow-xl flex items-center justify-center will-change-transform"
                style={{ 
                  backgroundColor: service.color
                }}
              >
                <span className="flex flex-col text-white font-bold text-3xl uppercase tracking-wide text-center leading-tight">
                  {service.title1}
                  {service.title2 && <span>{service.title2}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/services">
          <button className='absolute bottom-0 left-1/2 -translate-1/2 md:-bottom-63 md:left-auto md:translate-x-0 md:right-30 transition-all duration-300 hover:scale-110 inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-sm font-medium tracking-wide hover:border-white hover:bg-white hover:text-black cursor-pointer'>
              View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;