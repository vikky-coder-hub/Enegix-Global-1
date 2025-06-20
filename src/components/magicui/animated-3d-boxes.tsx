"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Box {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  opacity: number;
  color: string;
}

interface Animated3DBoxesProps {
  className?: string;
  boxCount?: number;
  boxColor?: string;
  secondaryColor?: string;
  animationDuration?: number;
  accentColor?: string;
}

export const Animated3DBoxes = ({
  className,
  boxCount = 20,
  boxColor = "rgba(96, 165, 250, 0.35)", // Light blue color with opacity
  secondaryColor = "rgba(129, 140, 248, 0.35)", // Secondary color
  accentColor = "rgba(236, 72, 153, 0.3)", // Pink accent color
  animationDuration = 15,
}: Animated3DBoxesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random initial positions for boxes
  const generateBoxes = (): Box[] => {
    return Array.from({ length: boxCount }).map(() => {
      // Randomly select a color from our palette
      const colorOptions = [boxColor, secondaryColor, accentColor];
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      return {
        x: Math.random() * 140 - 70, // Position between -70% and 70% of container width
        y: Math.random() * 140 - 70, // Position between -70% and 70% of container height
        z: Math.random() * 100 - 50, // Z-depth between -50 and 50
        rotateX: Math.random() * 720 - 360, // Rotation between -360 and 360 degrees
        rotateY: Math.random() * 720 - 360,
        rotateZ: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4, // Scale between 0.4 and 1
        opacity: Math.random() * 0.5 + 0.3, // Opacity between 0.3 and 0.8
        color: randomColor,
      };
    });
  };

  const boxes = generateBoxes();
  // Create a variant of boxes with different animation targets
  const boxVariants = boxes.map((box) => ({
    initial: {
      x: `${box.x}%`,
      y: `${box.y}%`,
      z: box.z,
      rotateX: box.rotateX,
      rotateY: box.rotateY,
      rotateZ: box.rotateZ,
      scale: box.scale,
      opacity: box.opacity,
    },
    animate: {
      x: [
        `${box.x}%`, 
        `${box.x + (Math.random() * 40 - 20)}%`, 
        `${box.x - (Math.random() * 30 - 15)}%`,
        `${box.x}%`
      ],
      y: [
        `${box.y}%`, 
        `${box.y - (Math.random() * 40 - 20)}%`, 
        `${box.y + (Math.random() * 30 - 15)}%`,
        `${box.y}%`
      ],
      z: [
        box.z, 
        box.z + (Math.random() * 60 - 30),
        box.z - (Math.random() * 40 - 20),
        box.z
      ],
      rotateX: [
        box.rotateX, 
        box.rotateX + (Math.random() * 360 - 180),
        box.rotateX - (Math.random() * 270 - 135),
        box.rotateX
      ],
      rotateY: [
        box.rotateY, 
        box.rotateY + (Math.random() * 360 - 180),
        box.rotateY - (Math.random() * 270 - 135),
        box.rotateY
      ],
      rotateZ: [
        box.rotateZ, 
        box.rotateZ + (Math.random() * 360 - 180),
        box.rotateZ - (Math.random() * 270 - 135),
        box.rotateZ
      ],
      scale: [
        box.scale, 
        box.scale + (Math.random() * 0.4 - 0.2),
        box.scale - (Math.random() * 0.3 - 0.15),
        box.scale
      ],
      opacity: [
        box.opacity, 
        Math.min(box.opacity + (Math.random() * 0.3), 0.9),
        Math.max(box.opacity - (Math.random() * 0.2), 0.2),
        box.opacity
      ],
      transition: {
        duration: animationDuration + Math.random() * 8,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        times: [0, 0.33, 0.66, 1],
      },
    },
  }));

  // Create boxes with different sizes and shapes
  const boxSizes = [
    { width: 70, height: 70, depth: 70, shape: 'cube' },
    { width: 90, height: 50, depth: 50, shape: 'rect' },
    { width: 50, height: 90, depth: 50, shape: 'rect' },
    { width: 50, height: 50, depth: 90, shape: 'rect' },
    { width: 80, height: 80, depth: 40, shape: 'prism' },
    { width: 100, height: 30, depth: 30, shape: 'bar' },
    { width: 30, height: 100, depth: 30, shape: 'bar' },
  ];
  useEffect(() => {
    // Add mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container center
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;
      
      // Apply subtle tilt effect to container
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden w-full h-full z-0", 
        className
      )}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
    >
      {boxVariants.map((variant, index) => {
        const sizeIndex = index % boxSizes.length;
        const { width, height, depth, shape } = boxSizes[sizeIndex];
        const box = boxes[index];
        const glowColor = box.color === boxColor 
          ? 'rgba(59, 130, 246, 0.3)' 
          : box.color === secondaryColor 
            ? 'rgba(99, 102, 241, 0.3)' 
            : 'rgba(236, 72, 153, 0.3)';
        
        return (
          <motion.div
            key={index}
            initial="initial"
            animate="animate"
            variants={variant}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width,
              height,
              transformStyle: 'preserve-3d',
              boxShadow: `0 0 20px ${glowColor}`,
              background: box.color,
              borderRadius: shape === 'cube' ? '10px' : 
                          shape === 'prism' ? '6px 25px' :
                          shape === 'bar' ? '20px' : '8px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              zIndex: Math.floor(box.z),
            }}
            className="box-border backdrop-blur"
          >
            {/* Create sides for 3D effect */}
            {shape === 'cube' && (
              <>
                <div 
                  className="absolute inset-0 border border-white/10 rounded-[10px]" 
                  style={{ 
                    background: `${box.color}`, 
                    transform: `translateZ(${depth/2}px)`,
                    boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.1)'
                  }} 
                />
                <div 
                  className="absolute inset-0 border border-white/10 rounded-[10px]" 
                  style={{ 
                    background: `${box.color}`, 
                    transform: `translateZ(-${depth/2}px)`,
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <div 
                  className="absolute inset-y-0 left-0 border-y border-white/10 w-[1px]" 
                  style={{ 
                    background: `${box.color}`, 
                    transform: `rotateY(-90deg) translateZ(-${width/2}px)`,
                    width: depth,
                    height: '100%',
                  }} 
                />
                <div 
                  className="absolute inset-y-0 right-0 border-y border-white/10 w-[1px]" 
                  style={{ 
                    background: `${box.color}`, 
                    transform: `rotateY(90deg) translateZ(-${width/2}px)`,
                    width: depth,
                    height: '100%',
                  }} 
                />
              </>
            )}
            
            {/* Add shine effect */}
            <div 
              className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 to-transparent" 
            />
          </motion.div>
        );
      })}
    </div>
  );
};
