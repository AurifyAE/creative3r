'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = {
  children: ReactNode;
};

const LenisProvider = ({ children }: LenisProviderProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync ScrollTrigger with Lenis scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Use GSAP's ticker as the single RAF loop
    const ticker = gsap.ticker.add((time) => {
      // gsap's time is in seconds; Lenis expects ms
      lenis.raf(time * 1000);
    });

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;

