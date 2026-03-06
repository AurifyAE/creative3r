'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  details: {
    title: string;
    items: Array<{ serviceName: string; description: string; }>;
  };
}

const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Branding & Identity Development',
    description: 'We uncover your true brand essence, craft iconic designs, and build cohesive identities that resonate. From logo creation to full rebranding, we position you to stand out, stay consistent, and connect deeply with your audience.',
    image: '/assets/images/portfolio/project-1.webp',
    details: {
      title: 'Brand Services',
      items: [
        {
          serviceName: 'Brand reflection',
          description: 'Unearthing your true brand essence and story'
        },
        {
          serviceName: 'Brand Guidelines',
          description: 'Developing consistent visual and verbal identity'
        },
        {
          serviceName: 'Logo Designing',
          description: 'Timeless logos that reflect brand’s identity'
        },
        {
          serviceName: 'Brand Positioning',
          description: 'Defining unique place in the market'
        },
        {
          serviceName: 'Rebranding',
          description: 'Revitalizing brand feel without losing its soul'
        }
      ]
    }
  },
  {
    id: 2,
    number: '02',
    title: 'Storytelling and Content Creation',
    description: 'At 3RCreative, we turn your brand’s voice into powerful stories that captivate and inspire. Through strategic content creation — from words to visuals — we craft narratives that build emotional connections, spark engagement, and drive lasting impact.',
    image: '/assets/images/portfolio/project-2.webp',
    details: {
      title: 'Design Process',
      items: [
        {
          serviceName: 'Story Identification',
          description: 'Finding your authentic brand narrative'
        },
        {
          serviceName: 'Story Distribution',
          description: 'Story for  the right audience through right channels'
        },
        {
          serviceName: 'Content Refinement',
          description: 'Message is clear, authentic, and engaging'
        },
        {
          serviceName: 'Visual Storytelling',
          description: 'Creating visual contents that resonate emotion'
        }
      ]
    }
  },
  {
    id: 3,
    number: '03',
    title: 'Digital Marketing',
    description: 'We amplify your brand’s presence across digital landscapes with smart, data-driven strategies. From social media to SEO, we craft campaigns that spark engagement, build loyalty, and drive real growth.',
    image: '/assets/images/portfolio/project-3.webp',
    details: {
      title: 'Marketing Services',
      items: [
        {
          serviceName: 'Search Engine Optimization (SEO)',
          description: 'Making your brand discoverable online.'
        },
        {
          serviceName: 'Social Media Marketing',
          description: 'Connecting through authentic, engaging campaigns '
        },
        {
          serviceName: 'Pay-Per-Click (PPC) Advertising',
          description: 'Running targeted ads for measurable results.'
        },
        {
          serviceName: 'Email Campaigns',
          description: 'Crafting personalized, impactful email journeys.'
        },
        {
          serviceName: 'Influencer Marketing',
          description: 'Influencers who align with your brand’s story.'
        }
      ]
    }
  },
  {
    id: 4,
    number: '04',
    title: 'Web and Digital Experiences',
    description: 'We design seamless digital experiences that are as intuitive as they are impactful. From engaging websites to interactive platforms, we merge design and technology to create user journeys that connect, convert, and delight.',
    image: '/assets/images/portfolio/project-4.webp',
    details: {
      title: 'Development Stack',
      items: [
        {
          serviceName: 'E-Commerce Solutions',
          description: 'Seamless shopping experiences for your customers.'
        },
        {
          serviceName: 'Website Design and Development',
          description: 'Intuitive and visually appealing websites to reflect brand'
        },
        {
          serviceName: 'UI/UX Design',
          description: 'Every digital touchpoint is meaningful and intuitive.'
        },
        {
          serviceName: 'Mobile App Development',
          description: 'Apps that resonate with your audience’s needs.'
        }
      ]
    }
  },
  {
    id: 5,
    number: '05',
    title: 'Performance Marketing and Analytics',
    description: 'We combine creativity with precision to drive results. Our performance marketing approach ensures every campaign is optimized for real-world impact—whether it’s clicks, conversions, or customer loyalty. With smart analytics, we track what matters and turn insights into action.',
    image: '/assets/images/portfolio/project-5.webp',
    details: {
      title: 'Analytics Services',
      items: [
        {
          serviceName: 'Conversion Rate Optimization (CRO)',
          description: 'Maximizing the impact of your website and campaigns.'
        },
        {
          serviceName: 'A/B Testing',
          description: 'Refining messaging and visuals for best results.'
        },
        {
          serviceName: 'Performance Dashboards',
          description: 'Actionable insights through analytics.'
        }
      ]
    }
  },
  {
    id: 6,
    number: '06',
    title: 'Creative Services',
    description: 'We craft bold, purpose-driven visuals that speak directly to your audience. Whether through striking design, compelling photography, or cinematic videography, our creative work is rooted in clarity, authenticity, and modern aesthetics.',
    image: '/assets/images/portfolio/project-6.webp',
    details: {
      title: 'Creative Work',
      items: [
        {
          serviceName: 'Graphic Design',
          description: 'We create visuals that stand out.'
        },
        {
          serviceName: 'Photography',
          description: 'Crafting compelling videos that tell your story.'
        },
        {
          serviceName: 'Video Production',
          description: 'Capturing the essence of brand, product, or service.'
        }
      ]
    }
  },
  {
    id: 7,
    number: '07',
    title: 'Public Relations and Outreach',
    description: 'We help you craft the right message and get it in front of the right audience—strategically, authentically, and impactfully. Our PR and outreach services are designed to elevate your brand’s visibility while aligning with values that matter to today’s consumers.',
    image: '/assets/images/portfolio/project-7.webp',
    details: {
      title: 'PR Services',
      items: [
        {
          serviceName: 'Media Relations',
          description: 'Amplifying your story through press coverage.'
        },
        {
          serviceName: 'Event Marketing',
          description: 'Memorable in-person or virtual brand experiences'
        },
        {
          serviceName: 'Crisis Management',
          description: 'Protecting brand’s reputation during challenging times.'
        }
      ]
    }
  },
  {
    id: 8,
    number: '08',
    title: 'Strategy and Consulting',
    description: "We help brands build strong foundations through insight-driven strategy and expert consulting. Whether youre launching, evolving, or repositioning, we craft brand, marketing, and digital strategies that align with your mission and connect with your audience. Our strategic approach ensures every creative decision is backed by purpose—and built to perform.",
    image: '/assets/images/portfolio/project-8.webp',
    details: {
      title: 'Ad Strategies',
      items: [
        {
          serviceName: 'Market Research',
          description: 'Understanding your audience and competitors.'
        },
        {
          serviceName: 'Brand and Digital Strategy',
          description: 'Developing actionable roadmaps for brand success.'
        },
        {
          serviceName: 'Competitor Analysis',
          description: 'Identifying opportunities to set your brand apart.'
        }
      ]
    }
  },
  {
    id: 9,
    number: '09',
    title: 'Technology Integration',
    description: 'We help brands harness the power of emerging technology to streamline operations, elevate experiences, and unlock smarter engagement. From seamless CRM setups to immersive AR/VR and intelligent AI-driven solutions, we ensure your brand stays ahead—strategically and sustainably.',
    image: '/assets/images/portfolio/project-8.webp',
    details: {
      title: 'Tech Solutions',
      items: [
        {
          serviceName: 'CRM and Automation',
          description: 'Implementing tools to streamline customer relationships.'
        },
        {
          serviceName: 'AR/VR Experiences',
          description: 'Crafting immersive experiences for brand.'
        },
        {
          serviceName: 'AI Solutions',
          description: 'Leveraging AI for personalization and smarter campaigns'
        }
      ]
    }
  },
  {
    id: 10,
    number: '10',
    title: 'Sustainability and Social Impact Branding',
    description: 'We craft purpose-driven campaigns that authentically communicate your brand’s commitment to environmental sustainability and social responsibility, helping you connect with modern, values-led consumers through impactful storytelling and strategic outreach.',
    image: '/assets/images/portfolio/project-1.webp',
    details: {
      title: 'Sustainable Practices',
      items: [
        {
          serviceName: 'Sustainable Storytelling',
          description: 'Impactful stories that reflect your brand’s sustainable purpose.'
        },
        {
          serviceName: 'Impact Reporting & Transparency',
          description: 'Engage modern consumers where it matters.'
        }
      ]
    }
  }
];

// Color palette cycling through services
const colors = ['#299D8F', '#E9C369', '#F4A261', '#299D8F', '#E76F51'];

export default function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<HTMLDivElement>(null);
  const activeBgRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Get current color based on index
  const getCurrentColor = (index: number) => colors[index % colors.length];

  const handleNext = () => {
    if (!isAnimating && currentIndex < services.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isAnimating && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Handle scroll navigation - only on desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only hijiack scroll on desktop
      if (window.innerWidth < 1024) return;

      const now = Date.now();
      const shouldPreventScroll = (
        (e.deltaY > 0 && currentIndex < services.length - 1) ||
        (e.deltaY < 0 && currentIndex > 0)
      );

      if (shouldPreventScroll) {
        e.preventDefault();
        e.stopPropagation();

        if (now - lastScrollTime.current < 650 || isAnimating) {
          return;
        }

        if (e.deltaY > 0) {
          setCurrentIndex(prev => Math.min(prev + 1, services.length - 1));
          lastScrollTime.current = now;
        } else {
          setCurrentIndex(prev => Math.max(prev - 1, 0));
          lastScrollTime.current = now;
        }
      }
    };

    const serviceList = serviceListRef.current;
    if (serviceList) {
      serviceList.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (serviceList) {
        serviceList.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex, isAnimating]);

  // Enhanced service list animations
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });
    timelineRef.current = tl;

    serviceItemsRef.current.forEach((item, index) => {
      if (!item) return;

      // Grouping logic for desktop to keep list manageable
      const isMobile = window.innerWidth < 1024;
      const currentGroup = Math.floor(currentIndex / 5);
      const itemGroup = Math.floor(index / 5);

      if (isMobile || itemGroup === currentGroup) {
        const distance = Math.abs(index - currentIndex);
        const delay = distance * 0.03;

        if (index === currentIndex) {
          tl.to(item, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.5,
            delay: delay
          }, 0);
        } else if (index < currentIndex) {
          tl.to(item, {
            opacity: isMobile ? 0.3 : 0.4,
            scale: 0.97,
            x: isMobile ? 0 : -10,
            duration: 0.5,
            delay: delay
          }, 0);
        } else {
          tl.to(item, {
            opacity: isMobile ? 0.3 : 0.5,
            scale: 0.98,
            x: 0,
            duration: 0.5,
            delay: delay
          }, 0);
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [currentIndex]);

  // Background transition animation
  useEffect(() => {
    const activeItem = serviceItemsRef.current[currentIndex];
    const bg = activeBgRef.current;
    const serviceList = serviceListRef.current;

    if (!activeItem || !bg || !serviceList) return;

    const itemRect = activeItem.getBoundingClientRect();
    const parentRect = serviceList.getBoundingClientRect();
    const y = itemRect.top - parentRect.top + serviceList.scrollTop;

    gsap.to(bg, {
      y,
      height: itemRect.height,
      borderLeftColor: getCurrentColor(currentIndex),
      duration: 0.5,
      ease: 'power3.out'
    });
  }, [currentIndex]);

  // Panel content animation
  useEffect(() => {
    setIsAnimating(true);

    if (detailsRef.current) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        },
        onComplete: () => setIsAnimating(false)
      });

      tl.fromTo(
        detailsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 }
      );

      const items = detailsRef.current.querySelectorAll('.service-badge, .service-title, .service-description, .service-divider, .details-title, .accordion-item');
      tl.fromTo(
        items,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
        '-=0.2'
      );
    }

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: (currentIndex + 1) / services.length,
        duration: 0.5,
        ease: 'power3.out',
        transformOrigin: 'left'
      });
    }
  }, [currentIndex]);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleServiceClick = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setCurrentIndex(index);
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  const currentService = services[currentIndex];
  const currentColor = getCurrentColor(currentIndex);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#2A2A2A] text-white overflow-x-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16 w-full max-w-2xl px-4">
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4">Our Services</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Crafting premium digital experiences through strategy, design, and technology.
          </p>
        </div>

        {/* Mobile Accordion Selector */}
        <div className="lg:hidden w-full max-w-7xl mb-6 relative z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between p-5 bg-[#232323] border border-white/10 rounded-2xl shadow-xl transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold" style={{ color: currentColor }}>
                {currentService.number}
              </span>
              <span className="font-semibold text-sm">{currentService.title}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`absolute top-full left-0 right-0 mt-2 bg-[#232323] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[60vh] opacity-100 py-3' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
            <div className="overflow-y-auto max-h-[55vh] px-2 space-y-1">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${index === currentIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs" style={{ color: index === currentIndex ? getCurrentColor(index) : undefined }}>
                      {service.number}
                    </span>
                    <span className="font-medium text-sm text-left">{service.title}</span>
                  </div>
                  {index === currentIndex && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentColor }} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl">

          {/* Left Side: Navigation (Desktop only) */}
          <div className="relative order-2 lg:order-1 hidden lg:block">
            <div ref={serviceListRef} className="relative space-y-2 lg:space-y-3">
              {/* Desktop Indicator Background */}
              <div
                ref={activeBgRef}
                className="absolute left-0 right-0 bg-white/5 border-l-4 rounded-xl pointer-events-none hidden lg:block"
                style={{ top: 0, height: 0, borderLeftColor: currentColor }}
              />

              {services.map((service, index) => {
                const currentGroup = Math.floor(currentIndex / 5);
                const itemGroup = Math.floor(index / 5);

                if (itemGroup !== currentGroup) return null;

                return (
                  <div
                    key={service.id}
                    ref={(el) => {
                      serviceItemsRef.current[index] = el;
                    }}
                    onClick={() => handleServiceClick(index)}
                    className={`group cursor-pointer p-4 md:p-5 rounded-xl transition-all duration-300 ${index === currentIndex
                      ? 'lg:bg-transparent'
                      : 'opacity-50 hover:opacity-100'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className="font-mono text-xs md:text-sm font-medium transition-colors"
                          style={{ color: index === currentIndex ? currentColor : '#6B7280' }}
                        >
                          {service.number}
                        </span>
                        <span className={`font-medium text-sm md:text-lg ${index === currentIndex ? 'text-white' : 'text-gray-400'}`}>
                          {service.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 md:w-5 md:h-5 transition-all ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                          }`}
                        style={{ color: currentColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center flex-wrap gap-2 mt-8 lg:mt-12">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceClick(index)}
                  className="p-2 transition-transform hover:scale-125 focus:outline-none"
                  aria-label={`Go to service ${index + 1}`}
                >
                  <div
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'scale-150' : 'bg-gray-600'
                      }`}
                    style={{ backgroundColor: index === currentIndex ? currentColor : undefined }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Content Card */}
          <div className="order-1 lg:order-2">
            <div
              ref={detailsRef}
              className="bg-[#232323] overflow-hidden rounded-3xl border border-white/5 shadow-2xl relative"
            >
              {/* Mobile Quick Nav Buttons (Top) */}
              <div className="lg:hidden absolute top-4 right-4 z-20 flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full disabled:opacity-30 active:scale-90 transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === services.length - 1}
                  className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full disabled:opacity-30 active:scale-90 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Card Header Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-scale duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#232323] to-transparent opacity-60" />
                <div
                  className="absolute top-6 left-6 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold text-white uppercase tracking-widest z-10"
                  style={{ backgroundColor: currentColor }}
                >
                  {currentService.number} / Service
                </div>
              </div>

              <div className="p-6 md:p-10 -mt-8 relative z-10 bg-[#232323] rounded-t-3xl">
                <h3 className="service-title text-2xl md:text-4xl font-bold mb-5 leading-tight">
                  {currentService.title}
                </h3>
                <p className="service-description text-sm md:text-base text-gray-400 mb-8 leading-relaxed">
                  {currentService.description}
                </p>

                <div className="service-divider h-px bg-white/10 mb-8" />

                <h4 className="details-title text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
                  {currentService.details.title}
                </h4>

                <div className="space-y-4">
                  {currentService.details.items.map((item, index) => (
                    <div key={index} className="accordion-item rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="w-full p-4 flex items-center justify-between text-left group"
                      >
                        <span className="font-semibold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                          {item.serviceName}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedItems.includes(index) ? 'rotate-180 text-white' : ''
                            }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${expandedItems.includes(index) ? 'max-h-40 py-4 pt-0' : 'max-h-0'
                          }`}
                      >
                        <p className="px-4 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Bottom Quick Nav */}
                <div className="lg:hidden flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Navigation</span>
                    <span className="text-xs font-mono">{currentIndex + 1} of {services.length}</span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-4 text-sm font-semibold disabled:opacity-20 active:scale-95 transition-all"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" /> Prev
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === services.length - 1}
                      className="flex items-center gap-4 text-sm font-semibold disabled:opacity-20 active:scale-95 transition-all"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
