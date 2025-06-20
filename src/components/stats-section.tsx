"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AuroraText } from "./magicui/aurora-text";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShineBorder } from "./magicui/shine-border";
import { usePrefersReducedMotion } from "@/utils/use-reduced-motion";

const stats = [
  { id: 1, value: "500+", label: "Projects Completed" },
  { id: 2, value: "98%", label: "Client Satisfaction" },
  { id: 3, value: "5+", label: "Years of Experience" },
  { id: 4, value: "24/7", label: "Customer Support" },
];

const testimonials = [
  {
    quote:
      "Hey I made this website and i can bet you that is the top class website you will ever see.",
    name: "Mr. Rajiv",
    designation: "Web Developer",
    src: "https://i.pinimg.com/736x/66/86/a7/6686a7ab9c6bc084952676915af65e8a.jpg",
  },
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const StatsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const headingRef = React.useRef(null);
  const statsInView = useInView(headingRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ultra minimal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05, 
        duration: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    }
  };
  return (
    <div className="relative w-full py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1e293b] z-0" />

      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#0f172a] to-transparent" />
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0f172a] to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats */}
        {isClient && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px", amount: 0.1 }}
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center relative overflow-hidden max-w-[350px] w-full">
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <CardHeader>
                    <CardTitle className="text-3xl text-gray-200">
                      {stat.value}
                    </CardTitle>                    <CardDescription className="text-gray-400">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Testimonials Section */}
        <div className="mb-16">
          <div ref={headingRef} className="text-center mb-12">
            {isClient ? (
              <>
                <h1 
                  className={`text-3xl md:text-5xl font-bold mb-4 font-poppins tracking-tight transition-opacity duration-300 ease-out ${
                    statsInView ? "opacity-100" : "opacity-0"
                  }`}
                >
                  What Our <AuroraText>Client Says</AuroraText>
                </h1>
                <p
                  className={`text-gray-400 max-w-xl mx-auto font-outfit font-light leading-relaxed transition-opacity duration-300 ease-out ${
                    statsInView ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: statsInView ? "100ms" : "0ms" }}
                >
                  Hear from businesses that have experienced growth and success with
                  our solutions.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 font-poppins tracking-tight">
                  What Our <span className="text-indigo-500">Client Says</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto font-outfit font-light leading-relaxed">
                  Hear from businesses that have experienced growth and success with
                  our solutions.
                </p>
              </>
            )}
          </div>

          {/* Pass testimonials to the AnimatedTestimonials component */}
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
