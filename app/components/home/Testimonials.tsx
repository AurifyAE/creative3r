'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, title: 'Card One', color: '#fde68a' },
  { id: 2, title: 'Card Two', color: '#bfdbfe' },
  { id: 3, title: 'Card Three', color: '#bbf7d0' },
  { id: 4, title: 'Card Four', color: '#fecaca' },
];

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 250}`,
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      // Animate all cards sequentially, with previous cards shifting left during each reveal
      cardsRef.current.forEach((card, i) => {
        const rotate = gsap.utils.random(-10, 10);

        tl.fromTo(
          card,
          {
            y: 200,
            opacity: 0,
            scale: 0.95,
            rotate,
          },
          {
            y: i * 10, // Changed to positive for stacking downward (below)
            opacity: 1,
            scale: 1,
            rotate,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        // Shift previous cards more to the left at the same time, with smoother easing
        for (let j = 0; j < i; j++) {
          tl.to(
            cardsRef.current[j],
            {
              x: '-=90', // Increased from 40 to 60 for more left movement
              duration: 0.6,
              ease: 'power1.inOut',
            },
            '<'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] flex items-start justify-center"
    >
      <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-medium tracking-normal uppercase">
            What our
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold italic uppercase">
            CLEINTS SAY
          </h2>
        </div>
      <div className="relative w-[520px] h-[360px] mt-30">
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="absolute inset-0 rounded-4xl shadow-xl flex items-center justify-center text-2xl font-semibold border border-[#fde68a70] bg-[#2c2b2b]"
            style={{
              
              zIndex: cards.length + i,
            }}
          >
            {card.title}
          </div>
        ))}
      </div>
    </section>
  );
}