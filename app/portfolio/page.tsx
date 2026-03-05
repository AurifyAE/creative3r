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

        const xOffset = window.innerWidth < 768 ? 40 : 100;
        gsap.set(imageContainerRef.current, { opacity: 0, xPercent: 15 * direction });
        gsap.set(contentRef.current, { opacity: 0, x: xOffset * direction });

        const tlIn = gsap.timeline({
          onComplete: () => setIsTransitioning(false)
        });

        tlIn.to(imageContainerRef.current, {
          opacity: 1,
          xPercent: 0,
          duration: 0.6,
          ease: 'power3.out'
        }).to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.4');
      }
    });

    const xOffset = window.innerWidth < 768 ? 40 : 100;
    tl.to(contentRef.current, {
      opacity: 0,
      x: -xOffset * direction,
      duration: 0.4,
      ease: 'power3.in'
    }).to(imageContainerRef.current, {
      opacity: 0,
      xPercent: -15 * direction,
      duration: 0.4,
      ease: 'power3.in'
    }, '-=0.4');
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

      const isMobile = window.innerWidth < 768;
      const xOffset = isMobile ? 0 : 100;
      const yOffset = isMobile ? 100 : 0;

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, {
        opacity: 0,
        x: xOffset,
        y: yOffset
      });

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
          borderRadius: '1.25rem',
          duration: 0.8,
          ease: 'power4.inOut'
        }, '-=0.2')
        .to(contentRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.1
        }, '-=0.4');

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

      const isMobileClose = window.innerWidth < 768;
      const xOffsetClose = isMobileClose ? 0 : 100;
      const yOffsetClose = isMobileClose ? 100 : 0;

      tl.to(contentRef.current, {
        opacity: 0,
        x: xOffsetClose,
        y: yOffsetClose,
        duration: 0.4,
        ease: 'power2.in'
      })
        .to(imageContainerRef.current, {
          left: cardRect.left,
          top: cardRect.top,
          width: cardRect.width,
          height: cardRect.height,
          borderRadius: '0.75rem',
          duration: 0.7,
          ease: 'power4.inOut'
        }, '-=0.1')
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }, '-=0.4');
    }

    prevSelectedItem.current = selectedItem;
  }, [selectedItem, selectedCardId]);

  return (
    <div className="min-h-screen bg-[#1F1E1E] text-white">
      {/* <Navbar /> */}

      <div className="max-w-4xl mx-auto p-8 md:py-12 lg:py-16">
        {/* Header */}
        <div className="flex justify-center py-12 md:py-16">
          <h1 className="text-5xl md:text-7xl">
            <span className='text-4xl md:text-5xl'>Our</span>
            <br />
            <span className="italic">Portfolio</span>
          </h1>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el;
              }}
              className="aspect-video bg-[#2A2A2A] hover:bg-[#333333] transition-colors duration-300 cursor-pointer relative overflow-hidden group rounded-xl shadow-lg border border-white/5"
              onClick={() => handleCardClick(item)}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center pl-6">
                  <h3 className="text-xl text-white font-medium italic tracking-wide">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ display: 'none' }}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
          onClick={handleClose}
        />

        {/* Scrolling Container for Modal Content */}
        <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide py-12 md:py-20 lg:py-16">
          <div
            className="w-full min-h-full flex items-center justify-center px-4 md:px-12 lg:px-16"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              className="fixed top-4 right-4 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full text-white/60 hover:text-white transition-all duration-300 hover:rotate-90 z-[60] group border border-white/10"
              onClick={handleClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full max-w-[1200px] mx-auto relative" onClick={(e) => e.stopPropagation()}>

              {/* Main Modal Content */}
              <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12 xl:gap-20">
                {/* Image Section */}
                <div className="w-full lg:w-[58%] xl:w-[62%] aspect-video lg:aspect-4/3 relative">
                  <div
                    ref={imageContainerRef}
                    className="absolute inset-0 overflow-hidden shadow-2xl rounded-2xl border border-white/10"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div
                  ref={contentRef}
                  className="flex-1 flex flex-col justify-center space-y-4 lg:space-y-8 lg:pr-8"
                >
                  {selectedItem && (
                    <>
                      {/* Desktop Navigation Arrows (Visible only on LG up) */}
                      <div className="hidden lg:flex items-center gap-6 pb-4">
                        <button
                          onClick={handlePrev}
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Category & Year */}
                      <div className="inline-flex items-center gap-3">
                        <span className="px-3 md:px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-medium text-gray-300 uppercase tracking-widest">
                          {selectedItem.category}
                        </span>
                        <span className="text-sm text-gray-500">·</span>
                        <span className="text-xs md:text-sm text-gray-400">{selectedItem.year}</span>
                      </div>

                      {/* Title */}
                      <div>
                        <h2 className="text-2xl md:text-3xl xl:text-5xl text-white font-bold leading-tight">
                          {selectedItem.title}
                        </h2>
                        <div className="h-[2px] w-20 bg-gradient-to-r from-[#E9C46A] to-transparent mt-4 md:mt-6" />
                      </div>

                      {/* Description */}
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                        {selectedItem.description}
                      </p>

                      {/* Project Details */}
                      <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                        {['Creative Direction', 'UI/UX Design', 'Development'].map((detail) => (
                          <div key={detail} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-xs md:text-sm text-gray-400 font-medium">
                            <div className="w-1 h-1 rounded-full bg-[#E9C46A]" />
                            {detail}
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-6 md:pt-10 flex flex-col sm:flex-row gap-4">
                        <button className="group relative px-8 md:px-10 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            View Full Project
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </button>

                        {/* Mobile Navigation Buttons (Visible only on Mobile) */}
                        <div className="lg:hidden flex items-center justify-center gap-4 pt-4 border-t border-white/5 sm:border-t-0 sm:pt-0">
                          <button
                            onClick={handlePrev}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-white/5 border border-white/10 text-sm font-medium transition-all active:scale-95"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Prev
                          </button>
                          <button
                            onClick={handleNext}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-white/5 border border-white/10 text-sm font-medium transition-all active:scale-95"
                          >
                            Next
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}