"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RainbowButton } from "./magicui/rainbow-button";
import Link from "next/link";
import { LineShadowText } from "./magicui/line-shadow-text";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { usePrefersReducedMotion } from "@/utils/use-reduced-motion";

const HeroSection = () => {
  const [heroRef, isInView] = useIntersectionObserver({ threshold: 0.3 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render animations on server or if not in view
  const shouldAnimate = isClient && isInView && !prefersReducedMotion;

  return (    <section
      ref={heroRef}
      id="home-section"
      className="relative pt-40 md:pt-8 min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a192f]"
    >
      {" "}
      {/* Professional 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {" "}
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-gray-900/30 to-slate-800/50" />{" "}        {/* Professional Wave Background */}
        {shouldAnimate ? (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="waveGradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.25)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.30)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.25)" />
              </linearGradient>
              <linearGradient
                id="waveGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.18)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.22)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.18)" />
              </linearGradient>
              <linearGradient
                id="waveGradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(148, 163, 184, 0.15)" />
                <stop offset="50%" stopColor="rgba(203, 213, 225, 0.12)" />
                <stop offset="100%" stopColor="rgba(100, 116, 139, 0.15)" />
              </linearGradient>
            </defs>
            {/* First Wave - Most Prominent */}
            <motion.path
              d="M0,550 C300,470 600,630 900,550 C1050,510 1150,570 1200,550 L1200,800 L0,800 Z"
              fill="url(#waveGradient1)"
              initial={{
                d: "M0,550 C300,470 600,630 900,550 C1050,510 1150,570 1200,550 L1200,800 L0,800 Z",
              }}
              animate={{
                d: [
                  "M0,550 C300,470 600,630 900,550 C1050,510 1150,570 1200,550 L1200,800 L0,800 Z",
                  "M0,530 C300,450 600,610 900,530 C1050,490 1150,550 1200,530 L1200,800 L0,800 Z",
                  "M0,570 C300,490 600,650 900,570 C1050,530 1150,590 1200,570 L1200,800 L0,800 Z",
                  "M0,550 C300,470 600,630 900,550 C1050,510 1150,570 1200,550 L1200,800 L0,800 Z",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Second Wave - Medium */}
            <motion.path
              d="M0,600 C400,530 700,670 1000,600 C1100,570 1150,610 1200,600 L1200,800 L0,800 Z"
              fill="url(#waveGradient2)"
              initial={{
                d: "M0,600 C400,530 700,670 1000,600 C1100,570 1150,610 1200,600 L1200,800 L0,800 Z",
              }}
              animate={{
                d: [
                  "M0,600 C400,530 700,670 1000,600 C1100,570 1150,610 1200,600 L1200,800 L0,800 Z",
                  "M0,620 C400,550 700,690 1000,620 C1100,590 1150,630 1200,620 L1200,800 L0,800 Z",
                  "M0,580 C400,510 700,650 1000,580 C1100,550 1150,590 1200,580 L1200,800 L0,800 Z",
                  "M0,600 C400,530 700,670 1000,600 C1100,570 1150,610 1200,600 L1200,800 L0,800 Z",
                ],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Third Wave - Subtle Base */}
            <motion.path
              d="M0,650 C500,590 800,710 1200,650 L1200,800 L0,800 Z"
              fill="url(#waveGradient3)"
              initial={{
                d: "M0,650 C500,590 800,710 1200,650 L1200,800 L0,800 Z",
              }}
              animate={{
                d: [
                  "M0,650 C500,590 800,710 1200,650 L1200,800 L0,800 Z",
                  "M0,670 C500,610 800,730 1200,670 L1200,800 L0,800 Z",
                  "M0,630 C500,570 800,690 1200,630 L1200,800 L0,800 Z",
                  "M0,650 C500,590 800,710 1200,650 L1200,800 L0,800 Z",
                ],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />          </svg>{" "}
        </motion.div>
        ) : (
          // Static version when animations are disabled
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-500/10 to-transparent" />
        )}        {/* Elegant Flowing Lines */}
        {shouldAnimate && (
        <motion.svg
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <defs>
            <linearGradient
              id="elegantGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.4)" />
              <stop offset="50%" stopColor="rgba(203, 213, 225, 0.3)" />
              <stop offset="100%" stopColor="rgba(100, 116, 139, 0.4)" />
            </linearGradient>

            {/* Glowing gradient for line tips */}
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
            </radialGradient>

            {/* Filter for glow effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* First flowing line */}
          <motion.path
            d="M100,200 Q400,80 700,250 Q900,320 1200,220"
            fill="none"
            stroke="url(#elegantGrad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glowing tip for first line - follows the path */}
          <motion.circle
            r="4"
            fill="url(#glowGradient)"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              r: [2, 6, 4, 2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1],
            }}
          >
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M100,200 Q400,80 700,250 Q900,320 1200,220"
            />
          </motion.circle>

          {/* Second flowing line */}
          <motion.path
            d="M200,350 Q500,120 800,400 Q1000,220 1300,300"
            fill="none"
            stroke="url(#elegantGrad)"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Glowing tip for second line - follows the path */}
          <motion.circle
            r="3"
            fill="url(#glowGradient)"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              r: [1.5, 5, 3.5, 1.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
              times: [0, 0.1, 0.9, 1],
            }}
          >
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M200,350 Q500,120 800,400 Q1000,220 1300,300"
              begin="3s"
            />          </motion.circle>
        </motion.svg>
      )}
      </div>
      {/* Content */}
      <div className="container md:pl-16  mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
        >
          {" "}
          <h1 className="text-balance text-4xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-4xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              We create cutting-edge web
            </span>{" "}
            <LineShadowText className="italic" shadowColor="white">
              solutions
            </LineShadowText>
          </h1>
          {/* Subtitle */}
          <p className="text-lg mt-3 md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
            Transform your business with premium web development and digital
            solutions.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/contact">
              <RainbowButton
                size="lg"
                className="px-8 py-4 text-md  font-semibold"
              >
                Start Your Project
              </RainbowButton>
            </Link>
            <Link href="/portfolio">
              <RainbowButton
                variant="outline"
                size="lg"
                className="px-8 py-4 text-md"
              >
                View Our Work
              </RainbowButton>
            </Link>
          </div>
        </motion.div>{" "}
        {/* Professional 3D Coding Icon */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 h-[400px] md:h-[600px] flex justify-center items-center relative"
        >
          <div className="relative flex justify-center items-center perspective-1000">
            {/* Main 3D Coding Icon Container */}
            <motion.div
              animate={{
                rotateY: [0, 5, 0, -5, 0],
                scale: [1, 1.02, 1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
              }}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(-5deg) rotateY(10deg)",
              }}
            >
              {/* Glowing Background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-full blur-2xl"
                style={{ transform: "translateZ(-20px) scale(1.5)" }}
              />

              {/* Main Icon */}
              <motion.div
                animate={{
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                className="relative w-80 h-80 flex items-center justify-center"
                style={{ transform: "translateZ(0px)" }}
              >
                {/* Outer Ring */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute w-72 h-72 border-2 border-slate-400/20 rounded-full"
                />

                {/* Inner Ring */}
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute w-56 h-56 border border-slate-300/15 rounded-full"
                />

                {/* Main Coding Symbol */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateY: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 w-48 h-48 flex items-center justify-center"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(30px)",
                  }}
                >
                  {/* Glowing Background for Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-lg blur-xl"
                  />

                  {/* The Coding Icon <> */}
                  <motion.div
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(147, 51, 234, 0.7)",
                        "0 0 20px rgba(6, 182, 212, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative text-9xl font-bold text-white select-none"
                    style={{
                      transform: "translateZ(20px)",
                      textShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                    }}
                  >
                    &lt;/&gt;
                  </motion.div>
                </motion.div>

                {/* Floating Code Elements */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotateY: [0, 180, 360],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-8 bg-slate-800/80 border border-slate-600/50 rounded px-3 py-2 backdrop-blur-sm"
                  style={{ transform: "rotateX(20deg) translateZ(15px)" }}
                >
                  <code className="text-blue-300 text-sm font-mono">React</code>
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    rotateY: [360, 180, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="absolute bottom-8 left-8 bg-slate-800/80 border border-slate-600/50 rounded px-3 py-2 backdrop-blur-sm"
                  style={{ transform: "rotateX(-20deg) translateZ(15px)" }}
                >
                  <code className="text-purple-300 text-sm font-mono">
                    Next.js
                  </code>
                </motion.div>

                <motion.div
                  animate={{
                    x: [-8, 8, -8],
                    rotateZ: [0, 15, 0, -15, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                  }}
                  className="absolute top-1/2 left-4 bg-slate-800/80 border border-slate-600/50 rounded px-2 py-1 backdrop-blur-sm"
                  style={{ transform: "rotateY(30deg) translateZ(10px)" }}
                >
                  <code className="text-cyan-300 text-xs font-mono">TS</code>
                </motion.div>

                <motion.div
                  animate={{
                    x: [8, -8, 8],
                    rotateZ: [0, -15, 0, 15, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6,
                  }}
                  className="absolute top-1/2 right-4 bg-slate-800/80 border border-slate-600/50 rounded px-2 py-1 backdrop-blur-sm"
                  style={{ transform: "rotateY(-30deg) translateZ(10px)" }}
                >
                  <code className="text-green-300 text-xs font-mono">API</code>
                </motion.div>
              </motion.div>

              {/* Orbit Lines */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-80 h-80"
                style={{ transform: "rotateX(70deg) translateZ(-10px)" }}
              >
                <div className="w-full h-full border border-slate-400/10 rounded-full"></div>
              </motion.div>

              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-80 h-80"
                style={{ transform: "rotateX(110deg) translateZ(-5px)" }}
              >
                <div className="w-full h-full border border-slate-300/8 rounded-full"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
