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
  { x: -200, y: 10 },   // BRANDING - top left
  { x: -420, y: 80 },     // PHOTO - left
  { x: -480, y: 300 },    // SOCIAL - bottom left
  { x: -270, y: 350 },    // CONTENT - bottom center-left
  { x: -60,  y: 400 },    // VIDEO - bottom center-right
  { x: 150,  y: 430 }     // WEB DESIGN - right
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const cards = serviceRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!hero || !cards.length) return;
  
    // Set initial state for all cards - all start from bottom with offset
    cards.forEach((card, index) => {
      const { x } = positions[index];
      gsap.set(card, {
        x,
        y: 600, // Start further below for smoother entry
        opacity: 0,
        scale: 0.85,
        rotationX: 15, // Add subtle 3D rotation
        transformPerspective: 1200,
        willChange: 'transform, opacity',
        force3D: true
      });
    });
  
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out' // Smoother easing curve
      }
    });
  
    // Animate each card one by one from bottom to its final position
    cards.forEach((card, index) => {
      const { y } = positions[index];
      
      tl.to(card, {
        y,
        opacity: 1,
        scale: 1,
        rotationX: 0, // Smooth 3D rotation back to flat
        duration: 1.2, // Longer duration for smoother feel
        ease: 'power3.out'
      }, index * 0.12); // Slightly faster stagger for fluid motion
    });
  
    // ScrollTrigger configuration with smoother scrub
    const st = ScrollTrigger.create({
      animation: tl,
      trigger: hero,
      start: 'top -50%',
      end: '+=250%', // Extended range for more gradual animation
      scrub: 2, // Increased scrub value for smoother scroll sync
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      invalidateOnRefresh: true // Ensures smooth behavior on resize
    });
  
    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[150vh] bg-[#1F1E1E] text-white">
      {/* Hero */}
      <div className="relative flex items-start min-h-screen">
        <div className="absolute top-0 right-35">
          <div className="relative">
            <video
              src="/assets/videos/home/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-[50vw] h-full aspect-square object-cover rounded-b-3xl"
            ></video>

            <div className="absolute top-0 right-0 w-20 h-20 bg-[#1F1E1E] rounded-bl-3xl"></div>
            <div className="absolute bottom-20 left-0 w-56 h-56 bg-[#1F1E1E] rounded-r-3xl"></div>
          </div>
        </div>

        <div className="relative flex flex-col justify-center h-full z-10 md:pl-20 lg:pl-40 pt-30">
          <div className="flex items-end gap-2">
            <h1 className="text-3xl font-light">We Build</h1>
            <h2 className="text-7xl font-normal italic">Brands</h2>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-light">That</h3>
            <h2 className="text-7xl font-normal italic">Resonates</h2>
          </div>
          <p className="text-base font-normal">Uncovering your real brand story.</p>
        </div>

        {/* Services cards pinned around the video */}
        <div className="absolute bottom-73 left-[55%] z-20">
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
        <Link href="/services">
          <button className='absolute -bottom-63 right-30 transition-all duration-300 hover:scale-110 inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-sm font-medium tracking-wide hover:border-white hover:bg-white hover:text-black cursor-pointer'>
              View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;