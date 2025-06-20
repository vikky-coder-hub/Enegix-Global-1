"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BoxesBackground() {
  // Generate random positions for boxes
  const boxes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 20 + 10,
    animationDelay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {boxes.map((box) => (
        <motion.div
          key={box.id}
          className="absolute opacity-10"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.size}px`,
            height: `${box.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: box.duration,
            repeat: Infinity,
            delay: box.animationDelay,
            ease: "easeInOut",
          }}
        >
          {/* 3D Box using CSS transforms */}
          <div 
            className="relative transform-gpu"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Front face */}
            <div 
              className="absolute bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `translateZ(${box.size/2}px)`,
              }}
            />
            {/* Back face */}
            <div 
              className="absolute bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `translateZ(-${box.size/2}px) rotateY(180deg)`,
              }}
            />
            {/* Left face */}
            <div 
              className="absolute bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `rotateY(-90deg) translateZ(${box.size/2}px)`,
              }}
            />
            {/* Right face */}
            <div 
              className="absolute bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `rotateY(90deg) translateZ(${box.size/2}px)`,
              }}
            />
            {/* Top face */}
            <div 
              className="absolute bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `rotateX(90deg) translateZ(${box.size/2}px)`,
              }}
            />
            {/* Bottom face */}
            <div 
              className="absolute bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/20"
              style={{
                width: `${box.size}px`,
                height: `${box.size}px`,
                transform: `rotateX(-90deg) translateZ(${box.size/2}px)`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
