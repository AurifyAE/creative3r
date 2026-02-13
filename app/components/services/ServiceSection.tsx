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

  // Handle scroll navigation with improved sticking behavior
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Check if we should prevent default scroll behavior
      const shouldPreventScroll = (
        (e.deltaY > 0 && currentIndex < services.length - 1) || 
        (e.deltaY < 0 && currentIndex > 0)
      );

      if (shouldPreventScroll) {
        e.preventDefault();
        e.stopPropagation();
        
        // Improved debounce - 650ms for smoother feel
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

  // Enhanced service list animations with smoother stagger and no unwanted movement
  useEffect(() => {
    // Kill any existing timeline
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

      const currentGroup = Math.floor(currentIndex / 5);
      const itemGroup = Math.floor(index / 5);

      if (itemGroup === currentGroup) {
        const distance = Math.abs(index - currentIndex);
        const delay = distance * 0.03; // Reduced delay for smoother feel

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
            opacity: 0.4,
            scale: 0.97,
            x: -10, // Reduced movement
            duration: 0.5,
            delay: delay
          }, 0);
        } else {
          tl.to(item, {
            opacity: 0.5,
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

  // Smoother background animation with better positioning
  useEffect(() => {
    const activeItem = serviceItemsRef.current[currentIndex];
    const bg = activeBgRef.current;
    const serviceList = serviceListRef.current;
  
    if (!activeItem || !bg || !serviceList) return;
  
    // Use getBoundingClientRect for accurate positioning
    const itemRect = activeItem.getBoundingClientRect();
    const parentRect = serviceList.getBoundingClientRect();
  
    // Calculate relative position
    const y = itemRect.top - parentRect.top + serviceList.scrollTop;

    gsap.to(bg, {
      y,
      height: itemRect.height,
      borderLeftColor: getCurrentColor(currentIndex),
      duration: 0.5,
      ease: 'power3.out'
    });
  }, [currentIndex]);

  // Enhanced details panel animation with cascading elements
  useEffect(() => {
    setIsAnimating(true);
    
    if (detailsRef.current) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        },
        onComplete: () => setIsAnimating(false)
      });

      // Animate container
      tl.fromTo(
        detailsRef.current,
        { 
          opacity: 0,
          y: 30,
          scale: 0.98
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4
        }
      );

      // Animate badge with subtle bounce
      tl.fromTo(
        detailsRef.current.querySelector('.service-badge'),
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.4)'
        },
        '-=0.3'
      );

      // Animate title
      tl.fromTo(
        detailsRef.current.querySelector('.service-title'),
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4
        },
        '-=0.3'
      );

      // Animate description
      tl.fromTo(
        detailsRef.current.querySelector('.service-description'),
        {
          opacity: 0,
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4
        },
        '-=0.3'
      );

      // Animate divider
      tl.fromTo(
        detailsRef.current.querySelector('.service-divider'),
        {
          scaleX: 0,
          opacity: 0
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          transformOrigin: 'left'
        },
        '-=0.2'
      );

      // Animate details title
      tl.fromTo(
        detailsRef.current.querySelector('.details-title'),
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3
        },
        '-=0.2'
      );

      // Animate accordion items with stagger
      const accordionItems = detailsRef.current.querySelectorAll('.accordion-item');
      tl.fromTo(
        accordionItems,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
        },
        '-=0.2'
      );
    }

    // Animate progress bar
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
    }
  };

  const currentService = services[currentIndex];
  const currentColor = getCurrentColor(currentIndex);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#2A2A2A] text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12h-screen flex flex-col justify-center">
        {/* Section Title - Centered */}
        <div className="text-center mb-6 lg:mb-8  mt-32 pb-6">
          <h2 className="text-3xl lg:text-5xl font-bold text-white/90">Our Services</h2>
          <p className="text-gray-400 text-sm mt-2">Scroll to explore our comprehensive solutions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full flex-1 overflow-hidden">
          
          {/* Left Side - Service List */}
          <div className="relative overflow-hidden py-8">
            <div ref={serviceListRef} className="relative space-y-3 will-change-transform h-full">

              {/* Active Background - Fixed positioning to prevent movement */}
              <div
                ref={activeBgRef}
                className="absolute left-0 right-0 bg-white/10 border-l-4 rounded-3xl pointer-events-none"
                style={{ top: 0, height: 0, willChange: 'transform', borderLeftColor: currentColor }}
              />

            {services.map((service, index) => {
              const currentGroup = Math.floor(currentIndex / 5);
              const itemGroup = Math.floor(index / 5);
              const isInCurrentGroup = itemGroup === currentGroup;
              
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    serviceItemsRef.current[index] = el;
                  }}
                  onClick={() => handleServiceClick(index)}
                  className={`group cursor-pointer will-change-transform ${
                    isAnimating && index !== currentIndex ? 'pointer-events-none' : ''
                  } ${!isInCurrentGroup ? 'hidden' : ''}`}
                >
                  <div
                    className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 ${
                      index === currentIndex
                        ? 'relative z-10 shadow-lg'
                        : 'relative z-10 bg-transparent border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`font-mono text-sm font-medium transition-colors duration-300`}
                      style={{ 
                        color: index === currentIndex ? getCurrentColor(index) : '#9CA3AF'
                      }}
                      >
                        {service.number}
                      </span>
                      <span
                        className={`font-medium transition-colors duration-300 text-sm lg:text-base ${
                          index === currentIndex ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 shrink-0 ${
                        index === currentIndex
                          ? 'translate-x-0 opacity-100'
                          : 'text-gray-500 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                      style={{ 
                        color: index === currentIndex ? getCurrentColor(index) : undefined
                      }}
                    />
                  </div>
                </div>
              );
            })}
            </div>

            {/* Counter Dots Navigation */}
            <div className="absolute top-[54%] left-0 right-0 flex justify-center items-center gap-2 py-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceClick(index)}
                  className="group relative"
                  aria-label={`Go to service ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'scale-125'
                        : 'bg-gray-600 hover:bg-gray-500 scale-100'
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? getCurrentColor(index) : undefined
                    }}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {services[index].title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Service Details */}
          <div className="flex flex-col justify-center">
            <div
              ref={detailsRef}
              className="text-white rounded-2xl p-6 lg:p-8 will-change-transform"
            >
              {/* Service Image */}
              <div className="service-image relative overflow-hidden rounded-xl mb-6">
                {/* Badge on Image */}
                <div className="service-badge absolute top-4 left-4 text-white px-4 py-1 rounded-full text-sm font-mono font-medium z-10" 
                style={{ backgroundColor: currentColor }}
                >
                  {currentService.number}
                </div>

                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-[220px] object-cover"
                />
              </div>

              {/* Service Title */}
              <h3 className="service-title text-2xl lg:text-3xl font-bold mb-4 text-white">
                {currentService.title}
              </h3>

              {/* Description */}
              <p className="service-description text-sm lg:text-base text-gray-300 leading-relaxed mb-6">
                {currentService.description}
              </p>

              {/* Divider */}
              <div className="service-divider h-px bg-gray-300 mb-6"></div>

              {/* Details Title */}
              <h4 className="details-title text-lg font-semibold mb-4 text-gray-200">
                {currentService.details.title}
              </h4>

              {/* Accordion Section */}
              <div className="">
                {currentService.details.items.map((item, index) => (
                  <div key={index} className="accordion-item border-b border-gray-300 last:border-b-0">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full py-5 flex items-center justify-between hover:bg-white/10 transition-colors duration-200 px-3 rounded group"
                    >
                      <span className="text-left font-medium text-sm lg:text-base text-gray-200">
                        {item.serviceName}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 text-gray-200 ${
                          expandedItems.includes(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedItems.includes(index)
                          ? 'max-h-32 opacity-100 mb-3'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="px-3 pb-2 text-xs lg:text-sm text-gray-200 leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}