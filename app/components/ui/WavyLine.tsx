// Decorative wave divider.
//
// Rendered as a static SVG that scrolls with a single GPU-composited CSS
// transform. The previous version rebuilt three 561-point path strings on
// every gsap.ticker frame, and the homepage mounts four of these — that loop
// was the largest contributor to main-thread time in the Lighthouse trace.
//
// The path spans two viewBox widths and the track shifts by exactly one, so
// the loop is seamless without duplicating any path data.

const VIEW_W = 1512;
const VIEW_H = 240;
const WAVELENGTH = 756; // two full waves per visible width
const AMPLITUDE = 35;

const WAVES = [
  { centerY: 80, color: "#E76F51" },
  { centerY: 137, color: "#299D8F" },
  { centerY: 200, color: "#E9C369" },
];

/** Smooth periodic wave drawn across 2x the viewBox width. */
function wavePath(centerY: number): string {
  const half = WAVELENGTH / 2;
  // A quadratic control at 2x the amplitude peaks at exactly AMPLITUDE.
  const control = AMPLITUDE * 2;
  let d = `M 0 ${centerY} Q ${half / 2} ${centerY - control} ${half} ${centerY}`;
  for (let x = half; x < VIEW_W * 2; x += half) {
    d += ` T ${x + half} ${centerY}`;
  }
  return d;
}

export default function WavyLine() {
  return (
    <div className="relative max-w-[1920px] mx-auto w-full bg-[#1F1E1E] py-8">
      <div className="wavy-viewport" aria-hidden="true">
        <div className="wavy-track">
          <svg
            className="wavy-svg"
            viewBox={`0 0 ${VIEW_W * 2} ${VIEW_H}`}
            preserveAspectRatio="none"
            focusable="false"
          >
            {WAVES.map((wave) => (
              <path
                key={wave.color}
                d={wavePath(wave.centerY)}
                stroke={wave.color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
