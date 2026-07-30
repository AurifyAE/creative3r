'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services, getServiceCtaTextColor } from './servicesData';

export default function ServicesIndex() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cursorPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  // Entrance stagger for the index rows
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    gsap.fromTo(rows, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' });
  }, []);

  // Lerp loop — keeps the floating preview gliding behind the cursor
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, cursorPos.current.x, 0.12);
      smoothPos.current.y = lerp(smoothPos.current.y, cursorPos.current.y, 0.12);
      if (previewRef.current) {
        previewRef.current.style.left = `${smoothPos.current.x}px`;
        previewRef.current.style.top = `${smoothPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Show / hide the preview as the cursor enters and leaves rows
  useEffect(() => {
    if (!previewRef.current) return;
    gsap.killTweensOf(previewRef.current);
    if (activeIndex !== null) {
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.4)' });
    } else {
      gsap.to(previewRef.current, { opacity: 0, scale: 0.75, duration: 0.25, ease: 'power2.in' });
    }
  }, [activeIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cursorPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const activeService = activeIndex !== null ? services[activeIndex] : null;

  return (
    <div className="min-h-screen bg-[#2A2A2A] text-white overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">What we do</span>
            <h1 className="font-ivyora text-4xl md:text-6xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Crafting premium digital experiences through strategy, design, and technology.
            </p>
          </div>
          <span className="font-mono text-xs text-gray-500 shrink-0">( {String(services.length).padStart(2, '0')} services )</span>
        </div>

        {/* Numbered index rows */}
        <div ref={listRef} onMouseMove={handleMouseMove} onMouseLeave={() => setActiveIndex(null)}>
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                ref={(el) => { rowRefs.current[index] = el; }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group block border-t border-white/10 ${index === services.length - 1 ? 'border-b' : ''} transition-colors duration-300 ${isActive ? 'bg-white/[0.03]' : ''}`}
              >
                <div className="py-7 md:py-9 px-1 md:px-4 flex items-start md:items-center gap-5 md:gap-10">
                  <span
                    className="font-mono text-xs md:text-sm pt-1.5 md:pt-0 transition-colors duration-300 shrink-0"
                    style={{ color: isActive ? service.color : '#6B7280' }}
                  >
                    {service.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h2 className={`text-xl md:text-3xl lg:text-4xl font-medium leading-tight transition-all duration-300 ${isActive ? 'translate-x-2 text-white' : 'text-gray-200'}`}>
                      {service.title}
                    </h2>
                    <p className={`mt-2 text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl transition-all duration-300 ${isActive ? 'translate-x-2 text-gray-400' : ''}`}>
                      {service.teaser}
                    </p>
                    <div className={`mt-3 flex flex-wrap gap-2 transition-all duration-300 ${isActive ? 'translate-x-2' : ''}`}>
                      {service.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    className="hidden md:flex w-11 h-11 items-center justify-center rounded-full border transition-all duration-300 shrink-0"
                    style={{
                      borderColor: isActive ? service.color : 'rgba(255,255,255,0.1)',
                      backgroundColor: isActive ? service.color : 'transparent',
                      color: isActive ? getServiceCtaTextColor(service.color) : '#9CA3AF',
                    }}
                  >
                    <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />
                  </span>
                  <ArrowUpRight className="md:hidden w-4 h-4 text-gray-500 mt-2 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Floating cursor preview — desktop only */}
        <div
          ref={previewRef}
          className="hidden lg:block fixed z-30 pointer-events-none"
          style={{ top: 0, left: 0, opacity: 0, scale: '0.75', transform: 'translate(-50%, -60%)', willChange: 'transform, opacity' }}
          aria-hidden="true"
        >
          <div className="relative w-72 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {services.map((service, index) => (
              <Image
                key={service.slug}
                src={service.image}
                alt=""
                fill
                sizes="288px"
                className="object-cover transition-opacity duration-300"
                style={{ opacity: activeIndex === index ? 1 : 0 }}
              />
            ))}
            {activeService && (
              <span
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold"
                style={{ backgroundColor: activeService.color, color: getServiceCtaTextColor(activeService.color) }}
              >
                View Service <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-20 md:mt-28 rounded-3xl border border-white/10 bg-[#232323] p-8 md:p-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Have a project in mind?</p>
          <h3 className="font-ivyora text-2xl md:text-4xl font-bold mb-8">Let&apos;s build something great together.</h3>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#299D8F] text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ boxShadow: '0 4px 24px #299D8F40' }}
          >
            Enquire Now
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
