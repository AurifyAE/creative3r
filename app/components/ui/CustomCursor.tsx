'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse), not touch screens
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // xPercent/yPercent centre the element on the cursor point
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    // quickTo reuses a single tween per axis instead of spawning a new one on
    // every mousemove, which keeps fast pointer movement smooth and jank-free
    const moveCursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const moveCursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });
    const moveFollowerX = gsap.quickTo(follower, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveFollowerY = gsap.quickTo(follower, 'y', { duration: 0.5, ease: 'power3.out' });

    const moveCursor = (e: MouseEvent) => {
      moveCursorX(e.clientX);
      moveCursorY(e.clientY);
      moveFollowerX(e.clientX);
      moveFollowerY(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}