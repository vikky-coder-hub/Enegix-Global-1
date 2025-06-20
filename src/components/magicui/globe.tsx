"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Use the type that the cobe library expects
type RenderState = Record<string, any>;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1.2, // Add depth like space
  diffuse: 1.5, // Make colors pop more
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.2, 0.5, 1.0], // 💙 Ocean-blue Earth tone
  markerColor: [1, 0.4, 0.1], // Keep your nice marker color
  glowColor: [0.4, 0.8, 1.0], // 🌟 Blue-ish glow
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phi = useRef(0); // useRef for phi
  const width = useRef(0); // useRef for width
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width.current * 2,
      height: width.current * 2,
      onRender: (state: RenderState) => {
        if (!pointerInteracting.current) phi.current += 0.005;
        state.phi = phi.current + rs.get();
        state.width = width.current * 2;
        state.height = width.current * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "relative aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          // Only capture pointer events with primary button (left click)
          if (e.button === 0) {
            e.stopPropagation();
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          updatePointerInteraction(null);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          updatePointerInteraction(null);
        }}
        onMouseMove={(e) => {
          // Only respond to mouse move if we're currently interacting
          if (pointerInteracting.current !== null) {
            e.stopPropagation();
            updateMovement(e.clientX);
          }
        }}
        onTouchMove={(e) => {
          // Prevent default to avoid page scrolling issues on mobile
          // but only if we're already interacting with the globe
          if (pointerInteracting.current !== null && e.touches[0]) {
            e.preventDefault();
            e.stopPropagation();
            updateMovement(e.touches[0].clientX);
          }
        }}
      />
    </div>
  );
}
