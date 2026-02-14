'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import ShapeSVG from '../ui/ShapeSVG';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

type ShapeType =
  | 'circle'
  | 'rounded-square'
  | 'square'
  | 'triangle'
  | 'hexagon'
  | 'star'
  | 'arrow';

interface SuperpowerItem {
  shape: ShapeType;
  title: string;
  color: string;
  desc: string;
  alignment: 'left' | 'right';
}

const superpowers: SuperpowerItem[] = [
  {
    shape: "circle",
    title: "Creative Intelligence",
    color: "#F4A261",
    desc: "We don't throw ideas at the wall. Every design, every word, every move is backed by insight, instinct, and strategy. It's where imagination meets intention.",
    alignment: "right"
  },
  {
    shape: "rounded-square",
    title: "Critical Analysis",
    color: "#E63946",
    desc: "We ask hard questions, challenge easy answers, and look under the hood. Because strong creative isn't just beautiful—it's built right.",
    alignment: "left"
  },
  {
    shape: "star",
    title: "Niche Understanding",
    color: "#2EC4B6",
    desc: "We know our playground. Jewelry, luxury, precious metals, design-led businesses—we bring context, culture, and domain depth to every brand we build.",
    alignment: "right"
  },
  {
    shape: "square",
    title: "Authenticity",
    color: "#E9C46A",
    desc: "We don't do loud for loud's sake. We dig deep into who we are, stay honest to our voice, and create brands that feel real—not just look pretty.",
    alignment: "left"
  },
  {
    shape: "hexagon",
    title: "Social Responsibility",
    color: "#90BE6D",
    desc: "We care about the world we design for. From ethical storytelling to conscious partnerships, we choose to create with awareness, empathy, and impact.",
    alignment: "right"
  },
  {
    shape: "triangle",
    title: "Digital First",
    color: "#9B5DE5",
    desc: "We think in pixels, scrolls, swipes, and taps. From brand to campaign to experience, everything we create is shaped for the digital world we live in.",
    alignment: "left"
  },
  {
    shape: "arrow",
    title: "Service Excellence",
    color: "#F9844A",
    desc: "We're not just creatives, we're partners. We show up, stay sharp, communicate well, and treat your brand like it's our own. Every time.",
    alignment: "right"
  }
];

// Shape configuration matching ShapeSVG.tsx
const SHAPE_CONFIG: Record<
  ShapeType,
  { width: number; height: number; fontSize: number; viewBox: string }
> = {
  arrow: { width: 304, height: 208, fontSize: 20, viewBox: '0 0 304 208' },
  hexagon: { width: 203, height: 224, fontSize: 19, viewBox: '0 0 203 224' },
  star: { width: 323, height: 319, fontSize: 20, viewBox: '0 0 323 319' },
  circle: { width: 200, height: 200, fontSize: 10, viewBox: '0 0 100 100' },
  square: { width: 200, height: 200, fontSize: 18, viewBox: '0 0 200 200' },
  'rounded-square': { width: 200, height: 200, fontSize: 10, viewBox: '0 0 100 100' },
  triangle: { width: 200, height: 200, fontSize: 10, viewBox: '0 0 100 100' },
};

// Shape paths from ShapeSVG.tsx
const SHAPE_PATHS: Record<ShapeType, string> = {
  circle: "M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z",
  'rounded-square': "M 20 20 L 80 20 Q 90 20 90 30 L 90 70 Q 90 80 80 80 L 20 80 Q 10 80 10 70 L 10 30 Q 10 20 20 20 Z",
  star: "M219.693 61.2167L222.632 136.929L278.412 197.447L203.471 233.947L166.999 295.438L111.741 243.224L39.4231 219.77L75.8952 158.279L71.9897 75.0134L150.966 94.4223L219.693 61.2167Z",
  square: "M 0 0 L 200 0 L 200 200 L 0 200 Z",
  hexagon: "M101.5 0L203 55.6052V175.595L101.5 223.219L0 175.595V55.6052L101.5 0Z",
  triangle: "M 50 10 L 90 80 L 10 80 Z",
  arrow: "M287.225 110.875L153.111 188.675L153.051 159.792L44.1204 160.018L43.9193 62.7355L152.85 62.5103L152.791 33.6289L287.225 110.875Z"
};

const TimelineItem = ({ 
  shape, 
  title, 
  desc, 
  color, 
  alignment,
  index 
}: SuperpowerItem & { index: number }) => (
  <div 
    className={`flex items-center gap-8 ${alignment === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <div 
      className="shrink-0 shape-container"
      data-shape-index={index}
    >
      {/* Static shape - will be hidden when morphing shape reaches it */}
      <div className="static-shape">
        <ShapeSVG shape={shape} color={color} name={title} />
      </div>
    </div>
    <p className="max-w-md text-sm leading-relaxed text-gray-300">
      {desc}
    </p>
  </div>
);

// Mobile Card Component - trigger item (invisible spacer)
const MobileSuperpowerCard = ({ 
  shape, 
  title, 
  desc, 
  color,
  index
}: SuperpowerItem & { index: number }) => (
  <div 
    className="mobile-trigger-item min-h-[60vh]"
    data-mobile-index={index}
  />
);

export default function OurSuperpowers() {
  const morphingShapeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileMorphingShapeRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const mobileTlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const currentShapeIndexRef = useRef(0);
  const animationQueueRef = useRef<number[]>([]);
  const isProcessingRef = useRef(false);
  const currentMobileIndexRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile ScrollTrigger Animation (shape only; content driven by React state)
  useEffect(() => {
    if (!isMobile || !mobileMorphingShapeRef.current || !mobileTimelineRef.current) return;

    const mobileTriggers = document.querySelectorAll('.mobile-trigger-item');
    if (mobileTriggers.length === 0) return;

    // Create triggers for each mobile item
    mobileTriggers.forEach((trigger, index) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (currentMobileIndexRef.current !== index) {
            currentMobileIndexRef.current = index;
            setMobileActiveIndex(index);
            morphToMobileShape(index);
          }
        },
        onEnterBack: () => {
          if (currentMobileIndexRef.current !== index) {
            currentMobileIndexRef.current = index;
            setMobileActiveIndex(index);
            morphToMobileShape(index);
          }
        },
      });
    });

    function morphToMobileShape(index: number) {
      const targetShape = superpowers[index];
      const config = SHAPE_CONFIG[targetShape.shape];
      
      const morphingSvg = mobileMorphingShapeRef.current?.querySelector('svg');
      if (!morphingSvg) return;
    
      const shapePath = morphingSvg.querySelector('[data-shape-path]') as SVGPathElement;
      const textElement = morphingSvg.querySelector('text');

      // Kill any in-flight mobile animation to avoid jitter
      if (mobileTlRef.current) {
        mobileTlRef.current.kill();
        mobileTlRef.current = null;
      }

      const tl = gsap.timeline();
      mobileTlRef.current = tl;
      
      // 1. Fade out shape text
      if (textElement) {
        tl.to(textElement, {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in'
        }, 0);
      }
      
      // 2. Morph shape and change color
      if (shapePath) {
        tl.to(shapePath, {
          morphSVG: {
            shape: SHAPE_PATHS[targetShape.shape],
          },
          fill: targetShape.color,
          duration: 0.6,
          ease: 'power2.inOut'
        }, 0.1);
      }
      
      // 3. Update SVG dimensions
      tl.to(morphingSvg, {
        attr: { 
          viewBox: config.viewBox,
          width: config.width,
          height: config.height
        },
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0.1);
    
      // 4. Update text content
      if (textElement) {
        tl.call(() => {
          textElement.setAttribute('font-size', config.fontSize.toString());
          textElement.innerHTML = '';
          
          targetShape.title.split(' ').forEach((word, i, arr) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = word;
            tspan.setAttribute('x', '50%');
            tspan.setAttribute('dy', i === 0 ? `${-(arr.length - 1) * config.fontSize * 0.55}` : `${config.fontSize * 1.1}`);
            textElement.appendChild(tspan);
          });
        }, [], 0.3);
      }
      
      // 5. Fade in new text
      if (textElement) {
        tl.to(textElement, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        }, 0.45);
      }
    }

    // Initialize first mobile shape
    const firstShape = superpowers[0];
    const morphingSvg = mobileMorphingShapeRef.current?.querySelector('svg');
    
    if (morphingSvg) {
      const shapePath = morphingSvg.querySelector('[data-shape-path]');
      if (shapePath) {
        gsap.set(shapePath, {
          attr: { d: SHAPE_PATHS[firstShape.shape] },
          fill: firstShape.color
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (mobileTlRef.current) {
        mobileTlRef.current.kill();
        mobileTlRef.current = null;
      }
    };
  }, [isMobile]);

  useEffect(() => {
    // Desktop GSAP animations
    if (isMobile || !morphingShapeRef.current || !timelineRef.current) return;

    const shapeContainers = document.querySelectorAll('.shape-container');
    
    if (shapeContainers.length === 0) return;

    // Create individual triggers for each shape with position animation
    shapeContainers.forEach((container, index) => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 50%',
        end: 'top -20%',
        onEnter: () => {
          queueShapeTransition(index);
        },
        onEnterBack: () => {
          queueShapeTransition(index);
        },
      });
    });

    function queueShapeTransition(targetIndex: number) {
      const currentIndex = currentShapeIndexRef.current;
      
      // If we're already at this shape, do nothing
      if (currentIndex === targetIndex) return;
      
      // Calculate the path from current to target
      const direction = targetIndex > currentIndex ? 1 : -1;
      const steps: number[] = [];
      
      for (let i = currentIndex + direction; 
           direction > 0 ? i <= targetIndex : i >= targetIndex; 
           i += direction) {
        steps.push(i);
      }
      
      // Add steps to queue (avoiding duplicates)
      steps.forEach(step => {
        if (!animationQueueRef.current.includes(step)) {
          animationQueueRef.current.push(step);
        }
      });
      
      // Start processing if not already running
      processQueue();
    }

    function processQueue() {
      if (isProcessingRef.current || animationQueueRef.current.length === 0) {
        return;
      }
      
      isProcessingRef.current = true;
      const nextIndex = animationQueueRef.current.shift()!;
      
      moveAndMorphToShape(nextIndex, () => {
        isProcessingRef.current = false;
        processQueue(); // Process next item in queue
      });
    }

    function moveAndMorphToShape(index: number, onComplete?: () => void) {
      // Kill previous timeline if it exists
      if (activeTlRef.current) {
        activeTlRef.current.kill();
        activeTlRef.current = null;
      }
      
      currentShapeIndexRef.current = index;
      
      const targetShape = superpowers[index];
      const config = SHAPE_CONFIG[targetShape.shape];
      
      const container = shapeContainers[index];
      const rect = container.getBoundingClientRect();
      const timelineRect = timelineRef.current!.getBoundingClientRect();
      
      const morphingSvg = morphingShapeRef.current?.querySelector('svg');
      if (!morphingSvg) {
        onComplete?.();
        return;
      }
    
      const shapePath = morphingSvg.querySelector('[data-shape-path]') as SVGPathElement;
      const textElement = morphingSvg.querySelector('text');
      
      // Master timeline for coordinated animations
      const masterTl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        }
      });
      activeTlRef.current = masterTl;
      
      // 1. Move to new position (synchronized with morph)
      masterTl.to(morphingShapeRef.current, {
        x: rect.left - timelineRect.left,
        y: rect.top - timelineRect.top,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0);
      
      // 2. Fade out text
      if (textElement) {
        masterTl.to(textElement, {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in'
        }, 0);
      }
      
      // 3. Morph shape and change color
      if (shapePath) {
        masterTl.to(shapePath, {
          morphSVG: {
            shape: SHAPE_PATHS[targetShape.shape],
          },
          fill: targetShape.color,
          duration: 0.6,
          ease: 'power2.inOut'
        }, 0.1);
      }
      
      // 4. Update SVG dimensions
      masterTl.to(morphingSvg, {
        attr: { 
          viewBox: config.viewBox,
          width: config.width,
          height: config.height
        },
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0.1);
    
      // 5. Update text content
      if (textElement) {
        masterTl.call(() => {
          textElement.setAttribute('font-size', config.fontSize.toString());
          textElement.innerHTML = '';
          
          targetShape.title.split(' ').forEach((word, i, arr) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = word;
            tspan.setAttribute('x', '50%');
            tspan.setAttribute('dy', i === 0 ? `${-(arr.length - 1) * config.fontSize * 0.55}` : `${config.fontSize * 1.1}`);
            textElement.appendChild(tspan);
          });
        }, [], 0.3);
        
        // 6. Fade in new text
        masterTl.to(textElement, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        }, 0.45);
      }
    
      // 7. Update static shapes visibility
      document.querySelectorAll('.static-shape').forEach((shape, i) => {
        gsap.to(shape, {
          opacity: i === index ? 0 : 1,
          duration: 0.2,
          ease: 'power2.inOut'
        });
      });
    
      // 8. Small pause at the end
      masterTl.to({}, { duration: 0.2 });
    }

    // Initialize position and first shape
    const firstContainer = shapeContainers[0];
    const rect = firstContainer.getBoundingClientRect();
    const timelineRect = timelineRef.current.getBoundingClientRect();
    
    gsap.set(morphingShapeRef.current, {
      x: rect.left - timelineRect.left,
      y: rect.top - timelineRect.top
    });

    // Initialize first shape without animation
    const firstShape = superpowers[0];
    const morphingSvg = morphingShapeRef.current?.querySelector('svg');
    
    if (morphingSvg) {
      const shapePath = morphingSvg.querySelector('[data-shape-path]');
      if (shapePath) {
        gsap.set(shapePath, {
          attr: { d: SHAPE_PATHS[firstShape.shape] },
          fill: firstShape.color
        });
      }
    }

    // Hide first static shape
    gsap.set(document.querySelector('.static-shape'), { opacity: 0 });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (activeTlRef.current) {
        activeTlRef.current.kill();
      }
    };
  }, [isMobile]);

  const firstShape = superpowers[0];
  const firstConfig = SHAPE_CONFIG[firstShape.shape];

  return (
    <section className="text-white py-16 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-12 md:mb-20">
          <div className="w-1.5 md:w-2 h-20 md:h-32 rounded-full bg-[#F4A261]" />
          <h2 className="text-3xl md:text-4xl font-semibold italic leading-tight">
            <span className="font-normal">OUR</span> <br /> SUPERPOWERS
          </h2>
        </div>

        {/* Mobile Layout - Sticky Shape with Scroll Morphing */}
        <div className="md:hidden relative" ref={mobileTimelineRef}>
          {/* Sticky Container for Shape and Content */}
          <div className="sticky top-1/4 z-10 mb-8">
            {/* Morphing Shape */}
            <div 
              ref={mobileMorphingShapeRef}
              className="flex justify-center mb-6"
            >
              <svg
                width={firstConfig.width}
                height={firstConfig.height}
                viewBox={firstConfig.viewBox}
                className="shrink-0"
              >
                <path
                  data-shape-path
                  d={SHAPE_PATHS[firstShape.shape]}
                  fill={firstShape.color}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={firstConfig.fontSize}
                  fontWeight="600"
                  className="font-ivyora italic"
                >
                  {firstShape.title.split(' ').map((word, i, arr) => (
                    <tspan
                      key={i}
                      x="50%"
                      dy={i === 0 ? `${-(arr.length - 1) * firstConfig.fontSize * 0.55}` : `${firstConfig.fontSize * 1.1}`}
                    >
                      {word}
                    </tspan>
                  ))}
                </text>
              </svg>
            </div>

            {/* Sticky Content Area */}
            <div className="relative min-h-[6rem] flex items-center justify-center px-6">
              <p className="text-sm leading-relaxed text-gray-300 max-w-sm mx-auto text-center">
                {superpowers[mobileActiveIndex].desc}
              </p>
            </div>
          </div>

          {/* Scrollable Trigger Areas */}
          <div className="space-y-8">
            {superpowers.map((power, index) => (
              <MobileSuperpowerCard key={power.title} {...power} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Morphing Animation Timeline */}
        <div className="hidden md:block relative" ref={timelineRef}>
          
          {/* Morphing Shape - absolute positioned */}
          <div 
            ref={morphingShapeRef}
            className="absolute z-20 pointer-events-none"
            style={{ willChange: 'transform' }}
          >
            <svg
              width={firstConfig.width}
              height={firstConfig.height}
              viewBox={firstConfig.viewBox}
              className="shrink-0"
            >
              <path
                data-shape-path
                d={SHAPE_PATHS[firstShape.shape]}
                fill={firstShape.color}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize={firstConfig.fontSize}
                fontWeight="600"
                className="font-ivyora italic"
              >
                {firstShape.title.split(' ').map((word, i, arr) => (
                  <tspan
                    key={i}
                    x="50%"
                    dy={i === 0 ? `${-(arr.length - 1) * firstConfig.fontSize * 0.55}` : `${firstConfig.fontSize * 1.1}`}
                  >
                    {word}
                  </tspan>
                ))}
              </text>
            </svg>
          </div>
          
          <div className="space-y-12">
            {superpowers.map((power, index) => (
              <div 
                key={power.title}
                className={`relative grid grid-cols-1 items-center ${
                  power.alignment === 'right' ? 'text-left' : 'text-left'
                }`}
              >
                {power.alignment === 'left' ? (
                  <>
                    <div className="pr-8">
                      <TimelineItem {...power} index={index} />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-8">
                      <TimelineItem {...power} index={index} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}