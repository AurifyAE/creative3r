'use client';

type ShapeType =
  | 'circle'
  | 'rounded-square'
  | 'square'
  | 'triangle'
  | 'hexagon'
  | 'star'
  | 'arrow';

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

// Shape path definitions for morphing
const SHAPE_PATHS: Record<ShapeType, string> = {
  circle: "M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z",
  'rounded-square': "M 20 20 L 80 20 Q 90 20 90 30 L 90 70 Q 90 80 80 80 L 20 80 Q 10 80 10 70 L 10 30 Q 10 20 20 20 Z",
  star: "M219.693 61.2167L222.632 136.929L278.412 197.447L203.471 233.947L166.999 295.438L111.741 243.224L39.4231 219.77L75.8952 158.279L71.9897 75.0134L150.966 94.4223L219.693 61.2167Z",
  square: "M 0 0 L 200 0 L 200 200 L 0 200 Z",
  hexagon: "M101.5 0L203 55.6052V175.595L101.5 223.219L0 175.595V55.6052L101.5 0Z",
  triangle: "M 50 10 L 90 80 L 10 80 Z",
  arrow: "M287.225 110.875L153.111 188.675L153.051 159.792L44.1204 160.018L43.9193 62.7355L152.85 62.5103L152.791 33.6289L287.225 110.875Z"
};

const ShapeSVG = ({
  shape,
  color,
  name,
  isMorphing = false,
}: {
  shape: ShapeType;
  color: string;
  name: string;
  isMorphing?: boolean;
}) => {
  const cfg = SHAPE_CONFIG[shape];

  return (
    <svg
      width={cfg.width}
      height={cfg.height}
      viewBox={cfg.viewBox}
      className="shrink-0"
    >
      {isMorphing ? (
        // Single path for morphing - used by the animated morphing shape
        <path
          data-shape-path
          d={SHAPE_PATHS[shape]}
          fill={color}
        />
      ) : (
        <>
          {/* Static shapes - render actual SVG elements */}
          {shape === 'circle' && (
            <circle cx="50" cy="50" r="40" fill={color} />
          )}

          {shape === 'square' && (
            <rect x="0" y="0" width="200" height="200" fill={color} />
          )}

          {shape === 'rounded-square' && (
            <path
              d="M 20 20 L 80 20 Q 90 20 90 30 L 90 70 Q 90 80 80 80 L 20 80 Q 10 80 10 70 L 10 30 Q 10 20 20 20 Z"
              fill={color}
            />
          )}

          {shape === 'triangle' && (
            <path d="M 50 10 L 90 80 L 10 80 Z" fill={color} />
          )}

          {shape === 'hexagon' && (
            <path
              d="M101.5 0L203 55.6052V175.595L101.5 223.219L0 175.595V55.6052L101.5 0Z"
              fill={color}
            />
          )}

          {shape === 'star' && (
            <path
              d="M219.693 61.2167L222.632 136.929L278.412 197.447L203.471 233.947L166.999 295.438L111.741 243.224L39.4231 219.77L75.8952 158.279L71.9897 75.0134L150.966 94.4223L219.693 61.2167Z"
              fill={color}
            />
          )}

          {shape === 'arrow' && (
            <path
              d="M287.225 110.875L153.111 188.675L153.051 159.792L44.1204 160.018L43.9193 62.7355L152.85 62.5103L152.791 33.6289L287.225 110.875Z"
              fill={color}
            />
          )}
        </>
      )}

      {/* CENTERED TEXT */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={cfg.fontSize}
        fontWeight="600"
        className="font-ivyora italic"
      >
        {name.split(' ').map((word, i, arr) => (
          <tspan
            key={i}
            x="50%"
            dy={
                i === 0
                  ? -(arr.length - 1) * cfg.fontSize * 0.1
                  : cfg.fontSize * 1.1
              }
          >
            {word}
          </tspan>
        ))}
      </text>
    </svg>
  );
};

export default ShapeSVG;