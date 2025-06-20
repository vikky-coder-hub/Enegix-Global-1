"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/utils/use-reduced-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Shorter loading time for users who prefer reduced motion
    const loadTime = prefersReducedMotion ? 800 : 1500;
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
      
      // Add a slight delay before removing from DOM to allow fade-out
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }, loadTime);

    document.body.style.overflow = "hidden";
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0a192f] z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >      <div className="relative">
        {!prefersReducedMotion ? (
          <>
            <div className="w-24 h-24 rounded-full border-t-4 border-l-4 border-r-4 border-b-transparent border-blue-500 animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-t-4 border-l-4 border-cyan-400 border-r-4 border-b-transparent animate-spin-reverse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">
                E
              </div>
            </div>
          </>
        ) : (
          // Static version for reduced motion preference
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Enegix
            </div>
            <div className="text-sm text-gray-400">Loading...</div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
