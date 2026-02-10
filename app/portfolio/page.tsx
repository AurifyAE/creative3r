'use client'
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  year: string;
}

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevSelectedItem = useRef<PortfolioItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  const handleCardClick = (item: PortfolioItem) => {
    if (selectedItem) return;
    setSelectedItem(item);
    setSelectedCardId(item.id);
  };

  const handleClose = () => {
    if (!selectedItem) return;
    // Animation will handle setting selectedItem to null
    // This triggers the closing animation in useEffect
    setSelectedItem(null);
  };

  const handleNext = () => {
    if (isTransitioning || !selectedItem) return;
    navigate(1);
  };

  const handlePrev = () => {
    if (isTransitioning || !selectedItem) return;
    navigate(-1);
  };

  const navigate = (direction: 1 | -1) => {
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        const currentIndex = portfolioItems.findIndex(i => i.id === selectedItem!.id);
        const newIndex = (currentIndex + direction + portfolioItems.length) % portfolioItems.length;
        const newItem = portfolioItems[newIndex];

        setSelectedItem(newItem);
        setSelectedCardId(newItem.id);

        gsap.set(imageContainerRef.current, { opacity: 0, xPercent: 20 * direction });
        gsap.set(contentRef.current, { opacity: 0, x: 100 * direction });

        const tlIn = gsap.timeline({
          onComplete: () => setIsTransitioning(false)
        });

        tlIn.to(imageContainerRef.current, {
          opacity: 1,
          xPercent: 0,
          duration: 0.5,
          ease: 'power3.out'
        }).to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out'
        }, '-=0.3');
      }
    });

    tl.to(contentRef.current, {
      opacity: 0,
      x: -100 * direction,
      duration: 0.5,
      ease: 'power3.in'
    }).to(imageContainerRef.current, {
      opacity: 0,
      xPercent: -20 * direction,
      duration: 0.5,
      ease: 'power3.in'
    }, '-=0.5');
  };

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem && !prevSelectedItem.current && modalRef.current && imageContainerRef.current && contentRef.current && overlayRef.current) {
      const cardElement = cardRefs.current[selectedCardId!];
      
      if (!cardElement) return;

      const cardRect = cardElement.getBoundingClientRect();

      gsap.set(modalRef.current, { display: 'flex', opacity: 0 });

      modalRef.current.offsetHeight;

      const targetRect = imageContainerRef.current.getBoundingClientRect();

      gsap.set(imageContainerRef.current, {
        position: 'fixed',
        left: cardRect.left,
        top: cardRect.top,
        width: cardRect.width,
        height: cardRect.height,
        borderRadius: '0.75rem',
      });

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, x: 100 });

      gsap.set(modalRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(imageContainerRef.current, {
            clearProps: 'position,left,top,width,height,borderRadius',
          });
        }
      });
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      .to(imageContainerRef.current, {
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        borderRadius: '1rem',
        duration: 0.7,
        ease: 'power3.inOut'
      }, '-=0.2')
      .to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2
      }, '-=0.3');

    } else if (!selectedItem && prevSelectedItem.current && modalRef.current && imageContainerRef.current && contentRef.current && overlayRef.current && selectedCardId !== null) {
      const cardElement = cardRefs.current[selectedCardId];
      
      if (!cardElement) {
        gsap.set(modalRef.current, { display: 'none' });
        setSelectedCardId(null);
        return;
      }

      const cardRect = cardElement.getBoundingClientRect();

      const currentRect = imageContainerRef.current.getBoundingClientRect();

      gsap.set(imageContainerRef.current, {
        position: 'fixed',
        left: currentRect.left,
        top: currentRect.top,
        width: currentRect.width,
        height: currentRect.height,
        borderRadius: '1rem',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none', clearProps: 'opacity' });
          gsap.set(imageContainerRef.current, { clearProps: 'all' });
          setSelectedCardId(null);
        }
      });

      tl.to(contentRef.current, {
        opacity: 0,
        x: 100,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(imageContainerRef.current, {
        left: cardRect.left,
        top: cardRect.top,
        width: cardRect.width,
        height: cardRect.height,
        borderRadius: '0.75rem',
        duration: 0.6,
        ease: 'power3.inOut'
      }, '-=0.1')
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.3');
    }

    prevSelectedItem.current = selectedItem;
  }, [selectedItem, selectedCardId]);

  return (
    <div className="min-h-screen bg-[#1F1E1E] text-white">
      {/* <Navbar /> */}
      
      <div className="max-w-4xl mx-auto p-8 md:py-12 lg:py-16">
        {/* Header */}
        <div className="flex justify-center py-16">
          {/* <p className="text-sm text-gray-400 mb-2">3R Portfolio page</p> */}
          <h1 className="text-6xl md:text-7xl">
            <span className='text-5xl'>Our</span>
            <br />
            <span className="italic">Portfolio</span>
          </h1>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el;
              }}
              className="aspect-video bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer relative overflow-hidden group rounded-xl"
              onClick={() => handleCardClick(item)}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-2 inset-x-0 h-10 bg-[#E9C46A]/80 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-baseline pl-4 pb-2">
                  <h3 className="text-xl text-white z-10 italic tracking-wide">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
        style={{ display: 'none' }}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
          onClick={handleClose}
        />

        {/* Modal Content Container */}
        <div 
          className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-12 lg:p-16"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:rotate-90 z-50 group"
            onClick={handleClose}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-full max-w-[1200px] mx-auto relative" onClick={(e) => e.stopPropagation()}>
            {/* Navigation Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Previous project"
            >
              <svg className="w-10 h-10 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Modal Content */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 xl:gap-16">
              {/* Image Section */}
              <div className="w-full lg:w-[55%] xl:w-[58%]">
                <div
                  ref={imageContainerRef}
                  className="relative overflow-hidden shadow-2xl aspect-4/3 rounded-2xl border border-white/5"
                >
                  {selectedItem && (
                    <>
                      <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div
                ref={contentRef}
                className="flex-1 flex flex-col justify-center space-y-8 lg:pr-8"
              >
                {selectedItem && (
                  <>
                    {/* Category & Year */}
                    <div className="inline-flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 uppercase tracking-widest">
                        {selectedItem.category}
                      </span>
                      <span className="text-sm text-gray-500">·</span>
                      <span className="text-sm text-gray-400">{selectedItem.year}</span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-2xl md:text-3xl xl:text-4xl text-white leading-tight">
                        {selectedItem.title}
                      </h2>
                      <div className="h-px w-24 bg-linear-to-r from-white/40 to-transparent mt-6" />
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                      {selectedItem.description}
                    </p>

                    {/* Project Details */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 group cursor-default">
                        <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">Creative Direction</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 group cursor-default">
                        <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">UI/UX Design</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 group cursor-default">
                        <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">Development</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="group relative px-10 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                        <span className="relative z-10 flex items-center gap-2">
                          View Full Project
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Next project"
            >
              <svg className="w-10 h-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}