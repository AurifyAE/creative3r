'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// [r, g, b] values for the 3D carousel cards
const services = [
  { title1: 'BRANDING', title2: '', rgb: '231, 111, 81', icon: '✦' },
  { title1: 'PHOTO', title2: 'GRAPHY', rgb: '41, 157, 143', icon: '◈' },
  { title1: 'SOCIAL', title2: 'MEDIA', rgb: '233, 195, 105', icon: '⬡' },
  { title1: 'CONTENT', title2: 'CREATION', rgb: '244, 162, 97', icon: '❋' },
  { title1: 'VIDEO', title2: 'GRAPHY', rgb: '41, 157, 143', icon: '▶' },
  { title1: 'WEB', title2: 'DESIGN', rgb: '231, 111, 81', icon: '⬖' },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const mobileServiceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const whatWeDoRef = useRef<HTMLDivElement | null>(null);
  const agencyDescRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const mobileCards = mobileServiceRefs.current.filter(Boolean) as HTMLDivElement[];
    const mobileContainer = mobileContainerRef.current;
    const whatWeDoBox = whatWeDoRef.current;
    const agencyDescBox = agencyDescRef.current;

    if (!hero) return;

    const mm = gsap.matchMedia();

    // ─── Mobile stacked cards ───────────────────────────────────────────────
    mm.add('(max-width: 1023px)', () => {
      if (mobileCards.length && mobileContainer) {
        mobileCards.forEach((card, index) => {
          gsap.set(card, { y: 500, opacity: 0, scale: 0.85, zIndex: index });
        });

        const mobileTl = gsap.timeline();

        mobileTl.to(hero.querySelectorAll('.hero-ui-content'), {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
        }, 0);

        mobileCards.forEach((card, index) => {
          const stackOffset = -index * 12;
          const scaleValue = 1 + index * 0.025;

          mobileTl.to(card, {
            y: stackOffset,
            opacity: 0.9,
            scale: scaleValue,
            duration: 1,
            ease: 'power2.out',
          }, index * 1);

          if (index > 0) {
            mobileTl.to(mobileCards[index - 1], {
              opacity: 0.2,
              duration: 0.4,
              ease: 'power1.out',
            }, index * 1 + 0.7);
          }
        });

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: `+=${mobileCards.length * 300}`,
          scrub: 1.5,
          animation: mobileTl,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
      }
    });

    // ─── Page-load sequence ─────────────────────────────────────────────────
    gsap.set('.hero-ui-content', { opacity: 0, y: 30 });
    gsap.set('.hero-main-text', { opacity: 0, y: 50 });

    const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    loadTl
      .to('.hero-main-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      })
      .to('.hero-ui-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',

        // ─── Floating / bounce animations kick off after load ──────────────
        onComplete: () => {
          if (!whatWeDoBox || !agencyDescBox) return;

          // ── "What We Do" box — lively multi-axis float ────────────────────
          // 1. primary vertical drift
          gsap.to(whatWeDoBox, {
            y: -18,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          // 2. subtle horizontal sway (offset phase)
          gsap.to(whatWeDoBox, {
            x: 6,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.6,
          });
          // 3. micro rotation
          gsap.to(whatWeDoBox, {
            rotation: 1.5,
            duration: 3.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.2,
          });
          // 4. soft scale pulse (breathe)
          gsap.to(whatWeDoBox, {
            scale: 1.025,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.1,
          });

          // ── Agency desc box — slower, contrasting phase ───────────────────
          gsap.to(agencyDescBox, {
            y: 14,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.4,
          });
          gsap.to(agencyDescBox, {
            x: -8,
            duration: 4.0,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.0,
          });
          gsap.to(agencyDescBox, {
            rotation: -1.2,
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.8,
          });
          gsap.to(agencyDescBox, {
            scale: 1.018,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.3,
          });
        },
      }, '-=0.8');

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={heroRef} className="relative bg-[#1F1E1E] text-white">
      {/* Hero */}
      <div className="max-w-[1920px] mx-auto relative flex items-start h-[900px] xl:h-[1080px]">

        {/* ── Video ──────────────────────────────────────────────────────────── */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 md:left-1/2 md:-translate-x-1/2 z-40">
          <div className="relative w-full overflow-hidden">
            <video
              src="/assets/videos/home/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[520px] md:w-full lg:h-[640px] xl:h-[680px] 2xl:h-[760px] object-cover border-4 border-[#1F1E1E]"
            />
            {/* Edge blending overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to bottom, rgba(31, 30, 30, 1) 0%, rgba(31, 30, 30, 0) 15%, rgba(31, 30, 30, 0) 85%, rgba(31, 30, 30, 1) 100%),
                  linear-gradient(to right, rgba(31, 30, 30, 1) 0%, rgba(31, 30, 30, 0) 15%, rgba(31, 30, 30, 0) 85%, rgba(31, 30, 30, 1) 100%)
                `
              }}
            />
          </div>
        </div>

        {/* ── "What We Do" floating box ───────────────────────────────────── */}
        <div
          id="what-we-do-box"
          ref={whatWeDoRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-90 md:bottom-90 lg:bottom-90 xl:bottom-120 2xl:bottom-110 z-40 hero-ui-content p-5 lg:p-6 xl:p-7 rounded-2xl backdrop-blur-md bg-black/20 border border-white/5 text-center will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-normal">What We Do</h2>
        </div>

        {/* ── Agency description floating box ────────────────────────────── */}
        <div
          id="agency-desc-box"
          ref={agencyDescRef}
          className="absolute w-56 md:w-64 lg:w-64 xl:w-72 2xl:w-80
          h-24 lg:h-32 top-20 -right-6 md:bottom-120 lg:top-1/3 lg:-translate-y-1/3 lg:right-10 xl:right-16 2xl:right-60 z-40 hero-ui-content p-5 lg:p-6 xl:p-7 rounded-2xl backdrop-blur-md bg-black/20 border border-white/5 will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <p className="font-light text-xs lg:text-sm leading-relaxed">
            Creative Agency focusing on Precious Metals &amp; Jewellery Industry
          </p>
        </div>

        {/* ── Hero headline ───────────────────────────────────────────────── */}
        <div className="relative flex flex-col justify-end md:justify-center z-40 pl-8 md:pl-20 lg:pl-14 xl:pl-28 2xl:pl-52 pt-80 md:pt-64 lg:pt-44 xl:pt-52 2xl:pt-72">
          <div className="hero-main-text flex items-end gap-2">
            <h1 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light">We Build</h1>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal italic">Brands</h2>
          </div>
          <div className="hero-main-text flex items-end gap-2">
            <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light">That</h3>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal italic">Resonates</h2>
          </div>
          <p className="hero-main-text text-xs lg:text-sm xl:text-base 2xl:text-lg font-normal mt-1">
            Uncovering your real brand story.
          </p>
        </div>

        {/* ── Desktop 3D Carousel ─────────────────────────────────────────── */}
        <style>{`
          .carousel-scene {
            --w: 180px;
            --h: 120px;
            --tz: 420px;
            --rx: -10deg;
            --persp: 1200px;
            position: absolute;
            width: var(--w);
            height: var(--h);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transform-style: preserve-3d;
            animation: c3dSpin 20s linear infinite;
          }
          @media (min-width: 1280px) {
            .carousel-scene {
              --w: 220px;
              --h: 135px;
              --tz: 480px;
            }
          }
          @media (min-width: 1536px) {
            .carousel-scene {
              --w: 260px;
              --h: 156px;
              --tz: 720px;
            }
          }
          @keyframes c3dSpin {
            from { transform: translate(-50%,-50%) perspective(var(--persp)) rotateX(var(--rx)) rotateY(0deg); }
            to   { transform: translate(-50%,-50%) perspective(var(--persp)) rotateX(var(--rx)) rotateY(360deg); }
          }
          .carousel-face {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            overflow: hidden;
            transform: rotateY(calc(360deg / var(--qty) * var(--i))) translateZ(var(--tz));
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            border: 1.5px solid rgba(var(--c), 0.55);
            box-shadow: 0 0 28px 4px rgba(var(--c), 0.25), inset 0 1px 0 rgba(255,255,255,0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          .carousel-face-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba(var(--c), 0.12) 0%,
              rgba(var(--c), 0.42) 60%,
              rgba(var(--c), 0.68) 100%
            );
          }
          .carousel-face-shine {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 50%;
            background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%);
            border-radius: 20px 20px 0 0;
          }
          .carousel-face-curve {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(0,0,0,0.38) 0%,
              transparent 22%,
              transparent 78%,
              rgba(0,0,0,0.38) 100%
            );
            pointer-events: none;
          }
        `}</style>

        <div className="hidden lg:block absolute bottom-40 xl:bottom-64 2xl:bottom-80 z-50 w-full h-96">
          <div className="relative w-full h-full overflow-visible">
            <div
              className="carousel-scene"
              style={{ ['--qty' as string]: services.length * 2 } as React.CSSProperties}
            >
              {[...services, ...services].map((service, index) => (
                <div
                  key={index}
                  className="carousel-face"
                  style={{
                    ['--i' as string]: index,
                    ['--c' as string]: service.rgb,
                    ['--qty' as string]: services.length * 2,
                  } as React.CSSProperties}
                >
                  <div className="carousel-face-bg" />
                  <div className="carousel-face-shine" />
                  <div className="carousel-face-curve" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-1 px-3 w-full h-full">
                    <span
                      className="text-2xl xl:text-3xl leading-none mb-1"
                      style={{ color: `rgba(${service.rgb}, 0.9)`, filter: 'drop-shadow(0 0 6px currentColor)' }}
                    >
                      {service.icon}
                    </span>
                    <span
                      className="text-white font-bold text-xs xl:text-sm tracking-[0.12em] uppercase text-center leading-tight"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                    >
                      {service.title1}{service.title2 && <><br />{service.title2}</>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile stacked cards ────────────────────────────────────────── */}
        <div
          ref={mobileContainerRef}
          className="flex items-center justify-center absolute lg:hidden -bottom-45 md:-bottom-48 left-0 right-0 z-50 h-[80vh]"
        >
          <div className="relative w-4/6 h-52">
            {services.map((service, index) => (
              <div
                key={`mobile-${index}`}
                ref={el => { mobileServiceRefs.current[index] = el; }}
                className="absolute inset-0 w-full h-52 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2 will-change-transform overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(${service.rgb},0.12) 0%, rgba(${service.rgb},0.45) 60%, rgba(${service.rgb},0.72) 100%)`,
                  border: `1.5px solid rgba(${service.rgb},0.55)`,
                  boxShadow: `0 0 32px 4px rgba(${service.rgb},0.22), inset 0 1px 0 rgba(255,255,255,0.12)`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.38) 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.1) 0%,transparent 100%)' }} />
                <span className="text-3xl" style={{ color: `rgba(${service.rgb}, 0.9)`, filter: 'drop-shadow(0 0 8px currentColor)' }}>{service.icon}</span>
                <span className="flex flex-col text-white font-bold text-2xl uppercase tracking-widest text-center leading-tight" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                  {service.title1}
                  {service.title2 && <span>{service.title2}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute w-full bottom-8 md:bottom-0 lg:bottom-16 xl:bottom-24 2xl:-bottom-16 flex justify-center z-50 pointer-events-none">
          <Link href="/services" className="pointer-events-auto">
            <button className="transition-all duration-300 hover:scale-110 inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-sm font-medium tracking-wide hover:border-white hover:bg-white hover:text-black cursor-pointer hero-ui-content">
              View All
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;