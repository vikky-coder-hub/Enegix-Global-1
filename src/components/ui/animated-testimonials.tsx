"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/utils/use-reduced-motion";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Simple slide animation for reduced motion/better performance
  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        {/* Image section */}
        <div>
          <div className="relative h-80 w-full">
            {isClient && (
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  isActive(index) && (
                    <motion.div
                      key={testimonial.src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        draggable={false}
                        priority={index === 0}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            )}
            
            {!isClient && testimonials.length > 0 && (
              <div className="absolute inset-0">
                <Image
                  src={testimonials[0].src}
                  alt={testimonials[0].name}
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex flex-col justify-between py-4">
          {isClient ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  {testimonials[active].designation}
                </p>
                <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                  {testimonials[active].quote}
                </p>
              </motion.div>
            </AnimatePresence>
          ) : (
            testimonials.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {testimonials[0].name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  {testimonials[0].designation}
                </p>
                <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                  {testimonials[0].quote}
                </p>
              </div>
            )
          )}
          
          {/* Navigation buttons */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:translate-x-[-2px] dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:translate-x-[2px] dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
