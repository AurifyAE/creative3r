"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WaterWavesWithLine() {
  const lineRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    if (!lineRefs.current.length) return;

    const points = 560;
    const width = 1512;
    // Different vertical positions for each wave
    const centerYs = [80, 137, 200]; // Orange, Teal, Yellow
    const amplitude = 35;
    const freq = 0.025;

    const phases = [0, 0, 0]; // uniform phase
    const phaseSpeed = 0.05;

    const drawLine = (
      line: SVGPathElement,
      phase: number,
      centerY: number
    ) => {
      let d = "";

      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const y =
          centerY + Math.sin(i * freq + phase) * amplitude;

        d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
      }

      line.setAttribute("d", d);
    };

    const update = () => {
      phases.forEach((_, index) => {
        phases[index] += phaseSpeed;

        const line = lineRefs.current[index];
        if (!line) return;

        drawLine(line, phases[index], centerYs[index]);
      });
    };

    update();
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#1F1E1E] py-8">
      <svg 
        className="w-full h-auto" 
        viewBox="0 0 1512 240" 
        preserveAspectRatio="xMidYMid meet"
      >
        <path 
          ref={(el) => {
            el && (lineRefs.current[0] = el)
          }} 
          stroke="#E76F51" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none" 
        />
        <path 
          ref={(el) => {
            el && (lineRefs.current[1] = el)
          }} 
          stroke="#299D8F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none" 
        />
        <path 
          ref={(el) => {
            el && (lineRefs.current[2] = el)
          }} 
          stroke="#E9C369" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none" 
        />
      </svg>
    </div>
  );
}
