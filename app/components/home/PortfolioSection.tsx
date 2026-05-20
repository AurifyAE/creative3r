'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useHoverSound } from '@/app/hooks/useHoverSound';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
  category: string;
  year: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Blue Diamond',
    image: '/assets/images/portfolio/bluediamond/blue-diamond-homepage.jpeg',
    description: 'A stunning visual experience combining modern design with innovative functionality.',
    link: 'portfolio/1',
    category: '',
    year: '2024'
  },
  {
    id: 2,
    title: 'Mac & Ro Capital',
    image: '/assets/images/portfolio/mac&ro/mac&ro-homepage.jpeg',
    description: 'Strategic branding solution that captures the essence of modern elegance.',
    link: '/portfolio/7',
    category: '',
    year: '2024'
  },
  {
    id: 3,
    title: 'BlackMamba',
    image: '/assets/images/portfolio/blackmamba/blackmamba-portfolio.jpeg',
    description: 'Revolutionary mobile experience with seamless user interactions.',
    link: '/portfolio/2',
    category: '',
    year: '2024'
  },
  {
    id: 4,
    title: 'Promise Gold Refinery',
    image: '/assets/images/portfolio/promise/promise-portfolio.jpeg',
    description: 'Comprehensive digital platform showcasing creative excellence.',
    link: '/portfolio/4',
    category: '',
    year: '2023'
  },
  {
    id: 5,
    title: 'Signature Jewellery',
    image: '/assets/images/portfolio/signature/signature-portfolio.jpeg',
    description: 'Elegant e-commerce solution with premium user experience.',
    link: '/portfolio/5',
    category: '',
    year: '2024'
  },
  {
    id: 6,
    title: 'Siramamba Refinery',
    image: '/assets/images/portfolio/siramamba/siramamba-portfolio.jpeg',
    description: 'Bold visual identity that stands out in the digital landscape.',
    link: '/portfolio/3',
    category: '',
    year: '2023'
  },
  // {
  //   id: 7,
  //   title: 'Project 7',
  //   image: '/assets/images/portfolio/project-7.webp',
  //   description: 'Interactive dashboard with real-time data visualization.',
  //   category: 'UI/UX',
  //   year: '2024'
  // }
];

// ─── Drag-to-slide hook ───────────────────────────────────────────────────────
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false);
  const startTime = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startTime.current = Date.now();
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.setPointerCapture(e.pointerId);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
  }, [ref]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !ref.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    // Only treat as horizontal drag (ignore vertical scroll attempts)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 4) {
      didDrag.current = true;
    }
    ref.current.scrollLeft = scrollLeft.current - dx;
  }, [ref]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.releasePointerCapture(e.pointerId);
    ref.current.style.cursor = 'grab';
    ref.current.style.removeProperty('user-select');
  }, [ref]);

  return { onPointerDown, onPointerMove, onPointerUp, didDrag };
}

// ─── Single card ─────────────────────────────────────────────────────────────
interface CardProps {
  item: PortfolioItem;
  rowKey: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  didDrag: React.MutableRefObject<boolean>;
}

const PortfolioCard = ({ item, rowKey, selectedId, onSelect, didDrag }: CardProps) => {
  const router = useRouter();
  const id = `${rowKey}-${item.id}`;
  const isSelected = selectedId === id;

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle left-button / primary touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    // If the parent drag hook moved more than threshold, ignore
    if (didDrag.current) return;
    router.push(item.link);
  };

  return (
    <div
    onPointerUp={handlePointerUp}
      className={`
        group relative aspect-4/4 w-64 md:w-72 lg:w-80 shrink-0 overflow-hidden rounded-3xl shadow-lg
        transition-all duration-300 cursor-pointer
        hover:-translate-y-2 hover:shadow-2xl
        ${isSelected
          ? 'ring-2 ring-[#E76F51] ring-offset-2 ring-offset-[#1F1E1E] -translate-y-3 shadow-[0_0_30px_rgba(231,111,81,0.35)]'
          : ''}
      `}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.image}
          alt={item.title}
          className={`object-cover w-full h-full transition-all duration-500
            ${isSelected ? 'grayscale-0 scale-105' : 'grayscale-75 group-hover:grayscale-0'}`}
        />
        <div className="absolute inset-0 opacity-80 pointer-events-none" />
      </div>

      {/* Default label */}
      <div className="relative flex h-full items-end justify-center p-4 z-10">
        <p className="text-xs md:text-sm font-medium tracking-wide uppercase text-white/90">
          {item.category}
        </p>
      </div>

      {/* Hover / selected overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 px-4 py-3 transition-all duration-300
          ${isSelected ? 'bg-[#E76F51] opacity-100' : 'bg-[#232222] opacity-0 group-hover:opacity-100'}`}
      >
        <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-white/80'}`}>{item.category}</p>
        <p className="text-lg font-semibold text-white">{item.title}</p>
        {isSelected && (
          <p className="text-xs text-white/70 mt-1">{item.description}</p>
        )}
      </div>

      {/* Selected badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-30 bg-[#E76F51] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full">
          Selected
        </div>
      )}
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Parallax inner refs (the scrollable track itself)
  const rowOneInnerRef = useRef<HTMLDivElement | null>(null);
  const rowTwoInnerRef = useRef<HTMLDivElement | null>(null);

  // Scrollable container refs (the overflow-auto wrapper)
  const rowOneScrollRef = useRef<HTMLDivElement | null>(null);
  const rowTwoScrollRef = useRef<HTMLDivElement | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const playHoverSound = useHoverSound();

  // Drag handlers for each row
  const drag1 = useDragScroll(rowOneScrollRef);
  const drag2 = useDragScroll(rowTwoScrollRef);

  useEffect(() => {
    const section = sectionRef.current;
    const rowOne = rowOneInnerRef.current;
    const rowTwo = rowTwoInnerRef.current;
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

  // Shared cursor style
  const dragCursorStyle: React.CSSProperties = { cursor: 'grab' };

  return (
    <section
      ref={sectionRef}
      className="bg-[#1F1E1E] text-white py-16 md:py-24"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-8 lg:px-0">
        {/* Heading row */}
        <div className="mx-auto max-w-6xl mb-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-end">
          <div className="text-left md:text-right flex items-center md:items-end gap-5">
            <div className="block md:hidden h-20 w-2 rounded-full bg-[#E76F51]" />
            <div className="flex flex-col justify-center">
              <p className="text-sm tracking-[0.3em] uppercase text-neutral-300">Selected</p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-semibold italic">PORTFOLIO</h2>
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

          {/* ── Row 1 ── */}
          <div className="max-w-5xl 2xl:max-w-7xl ml-auto">
            <div
              ref={rowOneScrollRef}
              className="overflow-x-auto scrollbar-hide"
              style={dragCursorStyle}
              onPointerDown={drag1.onPointerDown}
              onPointerMove={drag1.onPointerMove}
              onPointerUp={drag1.onPointerUp}
              onPointerCancel={drag1.onPointerUp}
            >
              <div ref={rowOneInnerRef} className="flex gap-6 w-max py-4">
                {portfolioItems.map((item) => (
                  <PortfolioCard
                    key={`row1-${item.id}`}
                    item={item}
                    rowKey="row1"
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    didDrag={drag1.didDrag}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 2 ── */}
          <div className="max-w-5xl 2xl:max-w-7xl mr-auto">
            <div
              ref={rowTwoScrollRef}
              className="overflow-x-auto flex justify-end scrollbar-hide"
              style={dragCursorStyle}
              onPointerDown={drag2.onPointerDown}
              onPointerMove={drag2.onPointerMove}
              onPointerUp={drag2.onPointerUp}
              onPointerCancel={drag2.onPointerUp}
            >
              <div ref={rowTwoInnerRef} className="flex gap-6 w-max py-4">
                {portfolioItems.map((item) => (
                  <PortfolioCard
                    key={`row2-${item.id}`}
                    item={item}
                    rowKey="row2"
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    didDrag={drag2.didDrag}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* View all */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:bottom-35 md:right-40 md:left-auto md:translate-x-0 flex justify-center">
            <Link href="/portfolio">
              <button
                onMouseEnter={playHoverSound}
                className="rounded-full border border-white/40 px-6 py-2 text-xs md:text-sm font-medium tracking-wide transition hover:border-white hover:bg-white hover:text-black cursor-pointer"
              >
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