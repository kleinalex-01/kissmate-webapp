import React, { useEffect, useRef } from "react";
import "../scss/components/_hexagonBackground.scss";

type LayerConfig = {
  /** Pixel size of a single hex radius (flat-topped) */
  size: number;
  /** Stroke color of the hexes */
  color: string;
  /** Stroke width in px */
  stroke: number;
  /** Layer opacity (0–1) */
  opacity: number;
  /** Parallax strength multiplier (higher = moves more) */
  parallax: number;
  /** Optional dash pattern e.g. "4 8" */
  dash?: string;
};

export type HexParallaxBackgroundProps = {
  /** Three or more layers recommended */
  layers?: LayerConfig[];
  /** Background gradient behind the hexes */
  background?: string;
  /** Global animation intensity (mouse + scroll) */
  intensity?: number;
  /** Subtle idle drift speed (0 disables) */
  driftSpeed?: number;
  /** Whether to lock to viewport (fixed) or fill parent (absolute) */
  fixed?: boolean;
  /** z-index for the wrapper (negative keeps it behind content) */
  zIndex?: number;
  /** Children elements to render on top of the background */
  children?: React.ReactNode;
};

const DEFAULT_LAYERS: LayerConfig[] = [
  { size: 25, color: "rgba(208, 205, 134, 0.6)", stroke: 0.8, opacity: 0.5, parallax: 0.15, dash: "0" },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Fullscreen (or container-filling) hex grid with multi-layer parallax.
 * No external libraries required.
 */
const HexParallaxBackground: React.FC<HexParallaxBackgroundProps> = ({
  layers = DEFAULT_LAYERS,
  background = "transparent",
  intensity = 1,
  driftSpeed = 0.01,
  fixed = true,
  zIndex = -1,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(SVGSVGElement | null)[]>([]);

  // Track mouse and scroll
  useEffect(() => {
    let raf = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let scrollY = window.scrollY;
    let t = 0;

    const onResize = () => {
      if (fixed) {
        w = window.innerWidth;
        h = window.innerHeight;
      } else if (wrapperRef.current) {
        w = wrapperRef.current.clientWidth;
        h = wrapperRef.current.clientHeight;
      }
      // Update SVG viewBox sizes on resize for crisp lines
      layerRefs.current.forEach((svg) => {
        if (!svg) return;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = clamp(e.clientX / w, 0, 1);
      targetY = clamp(e.clientY / h, 0, 1);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const loop = () => {
      // Smooth mouse
      mouseX = lerp(mouseX, targetX, 0.07);
      mouseY = lerp(mouseY, targetY, 0.07);

      // Idle drift (super subtle)
      t += driftSpeed;
      const driftX = Math.sin(t * 0.7) * 0.02;
      const driftY = Math.cos(t * 0.9) * 0.02;

      // Apply transforms to each layer
      layerRefs.current.forEach((svg, i) => {
        if (!svg) return;
        const cfg = layers[i];
        const px = ((mouseX - 0.5) + driftX) * 60 * cfg.parallax * intensity;
        const py = ((mouseY - 0.5) + driftY) * 60 * cfg.parallax * intensity;
        
        // Enhanced scroll effect - moves hexagons based on scroll position
        const scrollEffect = (scrollY / 300) * cfg.parallax * intensity * 40;

        svg.style.transform = `translate3d(${px}px, ${py + scrollEffect}px, 0)`;
      });

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onResize();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [intensity, driftSpeed, layers, fixed]);

  // Build one <pattern> per layer with its own hex size
  const renderLayer = (cfg: LayerConfig, idx: number) => {
    const id = `hex-pattern-${idx}`;
    // Geometry for flat-topped hex (point up)
    const r = cfg.size; // radius from center to vertex
    const h = Math.sqrt(3) * r; // height of the hexagon
    const horiz = 1.5 * r; // horizontal spacing between hex centers
    const vert = h; // vertical spacing between rows

    // Path for a single flat-topped hexagon
    // Starting from top-left, going clockwise
    const hexPath = `
      M ${-r} 0
      L ${-r / 2} ${-h / 2}
      L ${r / 2} ${-h / 2}
      L ${r} 0
      L ${r / 2} ${h / 2}
      L ${-r / 2} ${h / 2}
      Z
    `;

    return (
      <svg
        key={idx}
        ref={(el) => { layerRefs.current[idx] = el; }}
        className="hex-layer"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={id}
            x="0"
            y="0"
            width={horiz * 2}
            height={vert}
            patternUnits="userSpaceOnUse"
          >
            {/* First row - aligned at 0 horizontally */}
            <path
              d={hexPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth={cfg.stroke}
              opacity={cfg.opacity}
              strokeDasharray={cfg.dash ?? "0"}
              transform={`translate(${r}, ${vert / 2})`}
            />
            <path
              d={hexPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth={cfg.stroke}
              opacity={cfg.opacity}
              strokeDasharray={cfg.dash ?? "0"}
              transform={`translate(${r + horiz * 2}, ${vert / 2})`}
            />

            {/* Second row - offset by horiz (1.5r) horizontally */}
            <path
              d={hexPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth={cfg.stroke}
              opacity={cfg.opacity}
              strokeDasharray={cfg.dash ?? "0"}
              transform={`translate(${r + horiz}, 0)`}
            />
            <path
              d={hexPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth={cfg.stroke}
              opacity={cfg.opacity}
              strokeDasharray={cfg.dash ?? "0"}
              transform={`translate(${r + horiz * 3}, 0)`}
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${id})`}
        />
      </svg>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={`hex-bg ${fixed ? "hex-bg--fixed" : "hex-bg--absolute"}`}
      style={{ zIndex, background }}
    >
      {layers.map(renderLayer)}
      {/* Optional glow layer to make colors breathe a bit */}
      <div className="hex-glow" aria-hidden />
      {/* Render children on top of the hexagon background */}
      {children}
    </div>
  );
};

export default HexParallaxBackground;
export { HexParallaxBackground as HexagonBackground };
