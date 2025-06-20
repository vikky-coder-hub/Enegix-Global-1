"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if the browser supports matchMedia
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Update state with the initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Add the event listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return prefersReducedMotion;
}
