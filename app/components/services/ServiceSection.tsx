'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronDown, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import Link from 'next/link';

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
    id: 1, number: '01', title: 'Branding & Identity Development',
    description: 'We uncover your true brand essence, craft iconic designs, and build cohesive identities that resonate. From logo creation to full rebranding, we position you to stand out, stay consistent, and connect deeply with your audience.',
    image: '/assets/images/portfolio/project-1.webp',
    details: { title: 'Brand Services', items: [{ serviceName: 'Brand reflection', description: 'Unearthing your true brand essence and story' }, { serviceName: 'Brand Guidelines', description: 'Developing consistent visual and verbal identity' }, { serviceName: 'Logo Designing', description: "Timeless logos that reflect brand's identity" }, { serviceName: 'Brand Positioning', description: 'Defining unique place in the market' }, { serviceName: 'Rebranding', description: 'Revitalizing brand feel without losing its soul' }] }
  },
  {
    id: 2, number: '02', title: 'Storytelling and Content Creation',
    description: "At 3RCreative, we turn your brand's voice into powerful stories that captivate and inspire. Through strategic content creation — from words to visuals — we craft narratives that build emotional connections, spark engagement, and drive lasting impact.",
    image: '/assets/images/portfolio/project-2.webp',
    details: { title: 'Design Process', items: [{ serviceName: 'Story Identification', description: 'Finding your authentic brand narrative' }, { serviceName: 'Story Distribution', description: 'Story for the right audience through right channels' }, { serviceName: 'Content Refinement', description: 'Message is clear, authentic, and engaging' }, { serviceName: 'Visual Storytelling', description: 'Creating visual contents that resonate emotion' }] }
  },
  {
    id: 3, number: '03', title: 'Digital Marketing',
    description: "We amplify your brand's presence across digital landscapes with smart, data-driven strategies. From social media to SEO, we craft campaigns that spark engagement, build loyalty, and drive real growth.",
    image: '/assets/images/portfolio/project-3.webp',
    details: { title: 'Marketing Services', items: [{ serviceName: 'Search Engine Optimization (SEO)', description: 'Making your brand discoverable online.' }, { serviceName: 'Social Media Marketing', description: 'Connecting through authentic, engaging campaigns' }, { serviceName: 'Pay-Per-Click (PPC) Advertising', description: 'Running targeted ads for measurable results.' }, { serviceName: 'Email Campaigns', description: 'Crafting personalized, impactful email journeys.' }, { serviceName: 'Influencer Marketing', description: "Influencers who align with your brand's story." }] }
  },
  {
    id: 4, number: '04', title: 'Web and Digital Experiences',
    description: 'We design seamless digital experiences that are as intuitive as they are impactful. From engaging websites to interactive platforms, we merge design and technology to create user journeys that connect, convert, and delight.',
    image: '/assets/images/portfolio/project-4.webp',
    details: { title: 'Development Stack', items: [{ serviceName: 'E-Commerce Solutions', description: 'Seamless shopping experiences for your customers.' }, { serviceName: 'Website Design and Development', description: 'Intuitive and visually appealing websites to reflect brand' }, { serviceName: 'UI/UX Design', description: 'Every digital touchpoint is meaningful and intuitive.' }, { serviceName: 'Mobile App Development', description: "Apps that resonate with your audience's needs." }] }
  },
  {
    id: 5, number: '05', title: 'Performance Marketing and Analytics',
    description: "We combine creativity with precision to drive results. Our performance marketing approach ensures every campaign is optimized for real-world impact—whether it's clicks, conversions, or customer loyalty.",
    image: '/assets/images/portfolio/project-5.webp',
    details: { title: 'Analytics Services', items: [{ serviceName: 'Conversion Rate Optimization (CRO)', description: 'Maximizing the impact of your website and campaigns.' }, { serviceName: 'A/B Testing', description: 'Refining messaging and visuals for best results.' }, { serviceName: 'Performance Dashboards', description: 'Actionable insights through analytics.' }] }
  },
  {
    id: 6, number: '06', title: 'Creative Services',
    description: 'We craft bold, purpose-driven visuals that speak directly to your audience. Whether through striking design, compelling photography, or cinematic videography, our creative work is rooted in clarity and authenticity.',
    image: '/assets/images/portfolio/project-6.webp',
    details: { title: 'Creative Work', items: [{ serviceName: 'Graphic Design', description: 'We create visuals that stand out.' }, { serviceName: 'Photography', description: 'Capturing the essence of brand, product, or service.' }, { serviceName: 'Video Production', description: 'Crafting compelling videos that tell your story.' }] }
  },
  {
    id: 7, number: '07', title: 'Public Relations and Outreach',
    description: 'We help you craft the right message and get it in front of the right audience—strategically, authentically, and impactfully.',
    image: '/assets/images/portfolio/project-7.webp',
    details: { title: 'PR Services', items: [{ serviceName: 'Media Relations', description: 'Amplifying your story through press coverage.' }, { serviceName: 'Event Marketing', description: 'Memorable in-person or virtual brand experiences' }, { serviceName: 'Crisis Management', description: "Protecting brand's reputation during challenging times." }] }
  },
  {
    id: 8, number: '08', title: 'Strategy and Consulting',
    description: "We help brands build strong foundations through insight-driven strategy and expert consulting. Whether you're launching, evolving, or repositioning, we craft strategies that align with your mission.",
    image: '/assets/images/portfolio/project-8.webp',
    details: { title: 'Ad Strategies', items: [{ serviceName: 'Market Research', description: 'Understanding your audience and competitors.' }, { serviceName: 'Brand and Digital Strategy', description: 'Developing actionable roadmaps for brand success.' }, { serviceName: 'Competitor Analysis', description: 'Identifying opportunities to set your brand apart.' }] }
  },
  {
    id: 9, number: '09', title: 'Technology Integration',
    description: 'We help brands harness the power of emerging technology to streamline operations, elevate experiences, and unlock smarter engagement.',
    image: '/assets/images/portfolio/project-8.webp',
    details: { title: 'Tech Solutions', items: [{ serviceName: 'CRM and Automation', description: 'Implementing tools to streamline customer relationships.' }, { serviceName: 'AR/VR Experiences', description: 'Crafting immersive experiences for brand.' }, { serviceName: 'AI Solutions', description: 'Leveraging AI for personalization and smarter campaigns' }] }
  },
  {
    id: 10, number: '10', title: 'Sustainability and Social Impact Branding',
    description: "We craft purpose-driven campaigns that authentically communicate your brand's commitment to environmental sustainability and social responsibility.",
    image: '/assets/images/portfolio/project-1.webp',
    details: { title: 'Sustainable Practices', items: [{ serviceName: 'Sustainable Storytelling', description: "Impactful stories that reflect your brand's sustainable purpose." }, { serviceName: 'Impact Reporting & Transparency', description: 'Engage modern consumers where it matters.' }] }
  }
];

const colors = ['#299D8F', '#E9C369', '#F4A261', '#299D8F', '#E76F51'];
const lightColors = ['#E9C369', '#F4A261'];

// ── Cursor-following enquiry button ──────────────────────────────────────────
function CursorEnquireButton({
  cardRef,
  color,
  btnTextColor,
  href,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  btnTextColor: string;
  href: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const cursorPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const isInside = useRef(false);

  // Sync color change instantly via GSAP
  useEffect(() => {
    if (wrapperRef.current) {
      const link = wrapperRef.current.querySelector('a');
      if (link) gsap.to(link, { backgroundColor: color, duration: 0.4, ease: 'power2.out' });
    }
  }, [color]);

  const handleMouseEnter = useCallback(() => {
    isInside.current = true;
    if (wrapperRef.current) {
      gsap.killTweensOf(wrapperRef.current);
      gsap.to(wrapperRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isInside.current = false;
    if (wrapperRef.current) {
      gsap.killTweensOf(wrapperRef.current);
      gsap.to(wrapperRef.current, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.in' });
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    cursorPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, [cardRef]);

  // Lerp loop — keeps button gliding behind the cursor
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, cursorPos.current.x, 0.1);
      smoothPos.current.y = lerp(smoothPos.current.y, cursorPos.current.y, 0.1);
      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${smoothPos.current.x}px`;
        wrapperRef.current.style.top = `${smoothPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Attach / detach listeners on the card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cardRef, handleMouseEnter, handleMouseLeave, handleMouseMove]);

  return (
    <div
      ref={wrapperRef}
      className="absolute pointer-events-none z-50"
      style={{
        opacity: 0,
        scale: '0.5',
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity',
      }}
    >
      <Link
        href={href}
        className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap group"
        style={{
          backgroundColor: color,
          color: btnTextColor,
          boxShadow: `0 8px 32px ${color}55`,
        }}
        onClick={e => e.stopPropagation()}
      >
        <Mail className="w-4 h-4 shrink-0" />
        Enquire Now
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<HTMLDivElement>(null);
  const activeBgRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const getCurrentColor = (index: number) => colors[index % colors.length];

  const handleNext = () => { if (!isAnimating && currentIndex < services.length - 1) setCurrentIndex(p => p + 1); };
  const handlePrev = () => { if (!isAnimating && currentIndex > 0) setCurrentIndex(p => p - 1); };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      const now = Date.now();
      const shouldPrevent = (e.deltaY > 0 && currentIndex < services.length - 1) || (e.deltaY < 0 && currentIndex > 0);
      if (shouldPrevent) {
        e.preventDefault(); e.stopPropagation();
        if (now - lastScrollTime.current < 650 || isAnimating) return;
        setCurrentIndex(p => e.deltaY > 0 ? Math.min(p + 1, services.length - 1) : Math.max(p - 1, 0));
        lastScrollTime.current = now;
      }
    };
    const sl = serviceListRef.current;
    if (sl) sl.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (sl) sl.removeEventListener('wheel', handleWheel); };
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timelineRef.current = tl;
    serviceItemsRef.current.forEach((item, index) => {
      if (!item) return;
      const isMobile = window.innerWidth < 1024;
      if (isMobile || Math.floor(index / 5) === Math.floor(currentIndex / 5)) {
        const delay = Math.abs(index - currentIndex) * 0.03;
        if (index === currentIndex) tl.to(item, { opacity: 1, scale: 1, x: 0, duration: 0.5, delay }, 0);
        else if (index < currentIndex) tl.to(item, { opacity: isMobile ? 0.3 : 0.4, scale: 0.97, x: isMobile ? 0 : -10, duration: 0.5, delay }, 0);
        else tl.to(item, { opacity: isMobile ? 0.3 : 0.5, scale: 0.98, x: 0, duration: 0.5, delay }, 0);
      }
    });
    return () => { tl.kill(); };
  }, [currentIndex]);

  useEffect(() => {
    const activeItem = serviceItemsRef.current[currentIndex];
    const bg = activeBgRef.current;
    const sl = serviceListRef.current;
    if (!activeItem || !bg || !sl) return;
    const y = activeItem.getBoundingClientRect().top - sl.getBoundingClientRect().top + sl.scrollTop;
    gsap.to(bg, { y, height: activeItem.getBoundingClientRect().height, borderLeftColor: getCurrentColor(currentIndex), duration: 0.5, ease: 'power3.out' });
  }, [currentIndex]);

  useEffect(() => {
    setIsAnimating(true);
    if (detailsRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => setIsAnimating(false) });
      tl.fromTo(detailsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      const items = detailsRef.current.querySelectorAll('.service-badge,.service-title,.service-description,.service-divider,.details-title,.accordion-item');
      tl.fromTo(items, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, '-=0.2');
    }
    if (progressRef.current) gsap.to(progressRef.current, { scaleX: (currentIndex + 1) / services.length, duration: 0.5, ease: 'power3.out', transformOrigin: 'left' });
  }, [currentIndex]);

  const toggleExpand = (i: number) => setExpandedItems(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const handleServiceClick = (index: number) => { if (!isAnimating && index !== currentIndex) { setCurrentIndex(index); setIsMenuOpen(false); } };

  const currentService = services[currentIndex];
  const currentColor = getCurrentColor(currentIndex);
  const btnTextColor = lightColors.includes(currentColor) ? '#1a1a1a' : '#ffffff';

  return (
    <div ref={containerRef} className="min-h-screen bg-[#2A2A2A] text-white overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-16 w-full max-w-2xl px-4">
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4">Our Services</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">Crafting premium digital experiences through strategy, design, and technology.</p>
        </div>

        {/* Mobile service selector */}
        <div className="lg:hidden w-full max-w-7xl mb-6 relative z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between p-5 bg-[#232323] border border-white/10 rounded-2xl shadow-xl transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold" style={{ color: currentColor }}>{currentService.number}</span>
              <span className="font-semibold text-sm">{currentService.title}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <div className={`absolute top-full left-0 right-0 mt-2 bg-[#232323] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[60vh] opacity-100 py-3' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="overflow-y-auto max-h-[55vh] px-2 space-y-1">
              {services.map((service, index) => (
                <button key={service.id} onClick={() => handleServiceClick(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${index === currentIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs" style={{ color: index === currentIndex ? getCurrentColor(index) : undefined }}>{service.number}</span>
                    <span className="font-medium text-sm text-left">{service.title}</span>
                  </div>
                  {index === currentIndex && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentColor }} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl">

          {/* Left: Desktop nav */}
          <div className="relative order-2 lg:order-1 hidden lg:block">
            <div ref={serviceListRef} className="relative space-y-2 lg:space-y-3">
              <div ref={activeBgRef} className="absolute left-0 right-0 bg-white/5 border-l-4 rounded-xl pointer-events-none hidden lg:block"
                style={{ top: 0, height: 0, borderLeftColor: currentColor }} />
              {services.map((service, index) => {
                if (Math.floor(index / 5) !== Math.floor(currentIndex / 5)) return null;
                return (
                  <div key={service.id} ref={el => { serviceItemsRef.current[index] = el; }}
                    onClick={() => handleServiceClick(index)}
                    className={`group cursor-pointer p-4 md:p-5 rounded-xl transition-all duration-300 ${index === currentIndex ? 'lg:bg-transparent' : 'opacity-50 hover:opacity-100'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs md:text-sm font-medium transition-colors"
                          style={{ color: index === currentIndex ? currentColor : '#6B7280' }}>{service.number}</span>
                        <span className={`font-medium text-sm md:text-lg ${index === currentIndex ? 'text-white' : 'text-gray-400'}`}>{service.title}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-all ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                        style={{ color: currentColor }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center flex-wrap gap-2 mt-8 lg:mt-12">
              {services.map((_, index) => (
                <button key={index} onClick={() => handleServiceClick(index)}
                  className="p-2 transition-transform hover:scale-125 focus:outline-none" aria-label={`Go to service ${index + 1}`}>
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'scale-150' : 'bg-gray-600'}`}
                    style={{ backgroundColor: index === currentIndex ? currentColor : undefined }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content card */}
          <div className="order-1 lg:order-2">

            {/*
              cardRef wraps the whole right section.
              overflow-hidden clips the floating button to the card boundary.
              cursor-none hides the native cursor on desktop so the floating button IS the cursor.
            */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-3xl lg:cursor-none"
            >
              {/* ── Floating cursor button — desktop only ── */}
              <div className="hidden lg:block">
                <CursorEnquireButton
                  cardRef={cardRef}
                  color={currentColor}
                  btnTextColor={btnTextColor}
                  href={`/contact?service=${encodeURIComponent(currentService.title)}`}
                />
              </div>

              {/* Card */}
              <div ref={detailsRef} className="bg-[#232323] overflow-hidden rounded-3xl border border-white/5 shadow-2xl">

                {/* Mobile nav arrows */}
                <div className="lg:hidden absolute top-4 right-4 z-20 flex gap-2">
                  <button onClick={handlePrev} disabled={currentIndex === 0}
                    className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full disabled:opacity-30 active:scale-90 transition-all">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button onClick={handleNext} disabled={currentIndex === services.length - 1}
                    className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full disabled:opacity-30 active:scale-90 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Header image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img src={currentService.image} alt={currentService.title} className="w-full h-full object-cover transition-scale duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#232323] to-transparent opacity-60" />
                  <div className="absolute top-6 left-6 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold text-white uppercase tracking-widest z-10"
                    style={{ backgroundColor: currentColor }}>
                    {currentService.number} / Service
                  </div>
                </div>

                <div className="p-6 md:p-10 -mt-8 relative z-10 bg-[#232323] rounded-t-3xl">
                  <h3 className="service-title text-2xl md:text-4xl font-bold mb-5 leading-tight">{currentService.title}</h3>
                  <p className="service-description text-sm md:text-base text-gray-400 mb-8 leading-relaxed">{currentService.description}</p>
                  <div className="service-divider h-px bg-white/10 mb-8" />
                  <h4 className="details-title text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">{currentService.details.title}</h4>

                  <div className="space-y-4">
                    {currentService.details.items.map((item, index) => (
                      <div key={index} className="accordion-item rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300">
                        <button onClick={() => toggleExpand(index)} className="w-full p-4 flex items-center justify-between text-left group">
                          <span className="font-semibold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">{item.serviceName}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedItems.includes(index) ? 'rotate-180 text-white' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${expandedItems.includes(index) ? 'max-h-40 py-4 pt-0' : 'max-h-0'}`}>
                          <p className="px-4 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile static enquiry CTA */}
                  <div className="lg:hidden mt-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Interested in this service?</p>
                        <p className="text-sm text-gray-300 font-medium">Let's build something great together.</p>
                      </div>
                      <Link
                        href={`/contact?service=${encodeURIComponent(currentService.title)}`}
                        className="group flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                        style={{ backgroundColor: currentColor, color: btnTextColor, boxShadow: `0 4px 24px ${currentColor}40` }}
                      >
                        <Mail className="w-4 h-4" />
                        Enquire Now
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Mobile bottom nav */}
                  <div className="lg:hidden flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Navigation</span>
                      <span className="text-xs font-mono">{currentIndex + 1} of {services.length}</span>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={handlePrev} disabled={currentIndex === 0}
                        className="flex items-center gap-2 text-sm font-semibold disabled:opacity-20 active:scale-95 transition-all">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Prev
                      </button>
                      <button onClick={handleNext} disabled={currentIndex === services.length - 1}
                        className="flex items-center gap-2 text-sm font-semibold disabled:opacity-20 active:scale-95 transition-all">
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
    </div>
  );
}