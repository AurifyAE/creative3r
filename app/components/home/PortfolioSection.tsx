'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);


interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  year: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Blue Diamond',
    image: '/assets/images/portfolio/project-1.webp',
    description: 'A stunning visual experience combining modern design with innovative functionality.',
    category: 'Web Design',
    year: '2024'
  },
  {
    id: 2,
    title: 'Mac & Ro Capital',
    image: '/assets/images/portfolio/project-2.webp',
    description: 'Strategic branding solution that captures the essence of modern elegance.',
    category: 'Branding',
    year: '2024'
  },
  {
    id: 3,
    title: 'BlackMamba',
    image: '/assets/images/portfolio/project-3.webp',
    description: 'Revolutionary mobile experience with seamless user interactions.',
    category: 'Mobile App',
    year: '2023'
  },
  {
    id: 4,
    title: 'Faqeesh Jewellery',
    image: '/assets/images/portfolio/project-4.webp',
    description: 'Comprehensive digital platform showcasing creative excellence.',
    category: 'Web Development',
    year: '2023'
  },
  {
    id: 5,
    title: 'Project 5',
    image: '/assets/images/portfolio/project-5.webp',
    description: 'Elegant e-commerce solution with premium user experience.',
    category: 'E-commerce',
    year: '2024'
  },
  {
    id: 6,
    title: 'Project 6',
    image: '/assets/images/portfolio/project-6.webp',
    description: 'Bold visual identity that stands out in the digital landscape.',
    category: 'Branding',
    year: '2023'
  },
  {
    id: 7,
    title: 'Project 7',
    image: '/assets/images/portfolio/project-7.webp',
    description: 'Interactive dashboard with real-time data visualization.',
    category: 'UI/UX',
    year: '2024'
  },
  {
    id: 8,
    title: 'Project 8',
    image: '/assets/images/portfolio/project-8.webp',
    description: 'Minimalist design approach with maximum impact.',
    category: 'Web Design',
    year: '2023'
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rowOne = rowOneRef.current;
    const rowTwo = rowTwoRef.current;
    if (!section || !rowOne || !rowTwo) return;

    const ctx = gsap.context(() => {
      gsap.to(rowOne, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(rowTwo, {
        xPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1F1E1E] text-white py-16 md:py-24"
    >
      <div className="px-6 md:px-8 lg:px-0">
        {/* Heading row */}
        <div className="mx-auto max-w-6xl mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-end">
          <div className="text-left md:text-right flex items-center md:items-end gap-5">
            <div className="block md:hidden h-20 w-2 rounded-full bg-[#E76F51]" />
            <div className='flex flex-col justify-center'>
              <p className="text-sm tracking-[0.3em] uppercase text-neutral-300">
                Selected
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-semibold italic">
                PORTFOLIO
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 max-w-sm">
            <div className="hidden md:block h-20 w-3 rounded-full bg-[#E76F51]" />
            <p className="text-xs text-left md:text-sm text-neutral-300 leading-relaxed">
              Selected elevated products - meticulously rebranded by blending luxury
              visuals with high-conversion digital strategy.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="relative space-y-6">
          {/* Row 1 */}
          <div className='max-w-5xl 2xl:max-w-7xl ml-auto flex overflow-hidden'>
            <div
              ref={rowOneRef}
              className="flex gap-6"
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={`row1-${index}`}
                  className="group relative aspect-4/4 w-64 md:w-72 lg:w-80 shrink-0 overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image in red bg */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full grayscale-75 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 opacity-80 pointer-events-none"></div>
                  </div>
                  <div className="relative flex h-full items-end justify-center p-4 z-10">
                    <p className="text-xs md:text-sm font-medium tracking-wide uppercase text-white/90">
                      {item.category}
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#232222] z-20 px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm text-white/80">{item.category}</p>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className='max-w-5xl 2xl:max-w-7xl mr-auto flex justify-end overflow-hidden'>
            <div
              ref={rowTwoRef}
              className="flex gap-6"
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={`row2-${index}`}
                  className="group relative aspect-4/4 w-64 md:w-72 lg:w-80 shrink-0 overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image in red bg */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full grayscale-75 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 opacity-80 pointer-events-none"></div>
                  </div>
                  <div className="relative flex h-full items-end justify-center p-4 z-10">
                    <p className="text-xs md:text-sm font-medium tracking-wide uppercase text-white/90">
                      {item.category}
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#232222] z-20 px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm text-white/80">{item.category}</p>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View all */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:bottom-35 md:right-40 md:left-auto md:translate-x-0 flex justify-center">
            <Link href="/portfolio">
              <button className="rounded-full border border-white/40 px-6 py-2 text-xs md:text-sm font-medium tracking-wide transition hover:border-white hover:bg-white hover:text-black cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;