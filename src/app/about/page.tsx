"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Meteors } from "@/components/magicui/meteors";
import ScrollToTopButton from "@/components/scroll-to-top";
import ScrollFix from "@/components/scroll-fix";
import Link from "next/link";
import Image from "next/image";
import { enablePageScroll } from "@/utils/scroll-helper";

// Company values data
const companyValues = [
  {
    id: "innovation",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-cyan-400"
      >
        <path d="M12 2v8"></path>
        <path d="m4.93 10.93 1.41 1.41"></path>
        <path d="M2 18h2"></path>
        <path d="M20 18h2"></path>
        <path d="m19.07 10.93-1.41 1.41"></path>
        <path d="M22 22H2"></path>
        <path d="M16 6 8 14"></path>
        <path d="m16 14-8-8"></path>
      </svg>
    ),
    title: "Innovation",
    description: "We constantly push boundaries to create cutting-edge digital solutions that set new standards in the industry."
  },
  {
    id: "client-centric",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-cyan-400"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Client-Centric Approach",
    description: "We prioritize understanding our clients' unique needs to deliver tailored solutions that exceed expectations."
  },
  {
    id: "quality",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-cyan-400"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
    title: "Quality Excellence",
    description: "We are committed to delivering high-quality solutions with meticulous attention to detail and rigorous quality assurance."
  },
  {
    id: "adaptability",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 mb-4 text-cyan-400"
      >
        <path d="M21 2v6"></path>
        <path d="M3 10v6"></path>
        <path d="M3 22v-2"></path>
        <path d="M21 22v-6"></path>
        <path d="M10 18H7a2 2 0 0 1-2-2v-1.1a2 2 0 0 0-1-1.73l-.5-.27a2 2 0 0 1-1-1.73V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"></path>
        <path d="M17 18h1a2 2 0 0 0 2-2v-2"></path>
        <path d="M11.5 18a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5z"></path>
        <path d="M9 10v2"></path>
        <path d="M16 6s-2 .2-2 2.5c0 .6 0 1 .5 1.5"></path>
        <path d="M17.5 10c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"></path>
        <path d="M18 14v2"></path>
        <path d="M15 16l-2 3h6l-2-3z"></path>
      </svg>
    ),
    title: "Adaptability",
    description: "We embrace change and quickly adapt to emerging technologies and evolving market demands."
  }
];

// Services data
const services = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "Enhancing online visibility and driving organic traffic",
    percentage: 95,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-cyan-400"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    ),
  },
  {
    id: "web-dev",
    title: "Website Development & Design",
    description: "Crafting visually stunning and highly functional websites",
    percentage: 98,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-cyan-400"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    description: "Helping businesses establish and scale their online stores",
    percentage: 92,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-cyan-400"
      >
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
    ),
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Comprehensive strategies to increase brand awareness and drive conversions",
    percentage: 94,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-cyan-400"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    ),
  },
];

// Progress bar component
const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
      />
    </div>
  );
};

// Stats component
const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
      {[
        { value: "8+", label: "Years Experience" },
        { value: "150+", label: "Projects Delivered" },
        { value: "50+", label: "Happy Clients" },
        { value: "4+", label: "Countries Served" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {stat.value}
          </h3>
          <p className="text-gray-400 mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default function About() {
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Enable page scrolling
    enablePageScroll();
    
    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.body.addEventListener('click', handleAnchorClick);
    return () => document.body.removeEventListener('click', handleAnchorClick);
  }, [mounted]);

  return (
    <>
      {mounted && <ScrollFix />}
      <Navbar />
      
      <main className=" bg-[#0a192f]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28 px-4">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <Meteors number={20} />
          
          <div className="container mx-auto relative z-10 pt-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4">
                  Our Story
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
              >
                About <AuroraText>Enegix Web Solutions</AuroraText>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8"
              >
                We're more than just a web development company—we're your digital growth partners, committed to transforming your online presence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/services">
                  <RainbowButton size="lg">
                    Explore Our Services
                  </RainbowButton>
                </Link>
                <Link href="/portfolio">
                  <RainbowButton variant="outline" size="lg">
                    View Our Work
                  </RainbowButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About Enegix Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0c1220] to-[#0a192f]">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital Innovation</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Enegix Web Solutions was founded with a vision to bridge the gap between technology and business. Our team of skilled developers, designers, and digital strategists work together to create dynamic, user-friendly, and high-performance websites tailored to your unique needs.
                </p>
                <p className="text-gray-300 mb-8">
                  At Enegix Web Solutions, we are more than just a web development company—we are your digital growth partners. With a passion for innovation and a commitment to excellence, we provide businesses with cutting-edge web solutions that drive success in the ever-evolving digital world.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Innovation-driven solutions</span> that keep you ahead of competitors
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Results-driven approach</span> focused on delivering real business impact
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Customer-centric solutions</span> tailored to your specific needs
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >                <div className="relative w-full h-[500px] overflow-hidden rounded-xl border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-cyan-900/40 z-10 mix-blend-overlay"></div>
                  <Image
                    src="/portfolio/tech-summit.jpg"
                    alt="Enegix Web Solutions Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                
                {/* Floating stats cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-6 bg-[#0c1220]/80 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>                    <div>
                      <h4 className="text-lg font-bold text-white">Innovative</h4>
                      <p className="text-sm text-gray-400">Cutting-edge solutions</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -top-6 -right-6 bg-[#0c1220]/80 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>                    <div>
                      <h4 className="text-lg font-bold text-white">Client-First</h4>
                      <p className="text-sm text-gray-400">Your success is our priority</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Parent Company Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a192f] to-[#0c1220]">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4"
              >
                Our Parent Company
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                <AuroraText>Enegix Global</AuroraText>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300"
              >
                Enegix Global is the driving force behind Enegix Web Solutions, serving as the parent company that pioneers cutting-edge digital transformation. With expertise in web development, digital marketing, AI-driven solutions, and enterprise technology, Enegix Global empowers businesses to scale, innovate, and succeed in the modern digital landscape.
              </motion.p>
            </div>
            
            <Stats />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-md rounded-xl p-8 border border-white/10 mt-16"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>                  <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                  <p className="text-gray-300 mb-6">
                    To empower businesses with innovative and results-driven digital solutions that enhance growth, efficiency, and brand impact.
                  </p>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                </div>
                <div>                  <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                  <p className="text-gray-300 mb-6">
                    To be a leading web solutions provider, helping businesses worldwide achieve digital excellence and long-term success.
                  </p>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0c1220] to-[#0a192f]">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold mb-4"
              >
                Our Core Values
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl text-white font-bold mb-6"
              >
                The <AuroraText>Principles</AuroraText> That Guide Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300"
              >
                Our values define who we are and how we work. They're the foundation of our company culture and guide every decision we make.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* What We Do Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a192f] to-[#0c1220]">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold mb-4"
              >
                What We Do
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
              >
                Better <AuroraText>Design</AuroraText> for Your Digital Products
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300"
              >
                We take pride in crafting innovative, high-performing digital solutions tailored to your business needs.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4 p-3 rounded-full bg-white/10">
                      {service.icon}
                    </div>                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      <ProgressBar percentage={service.percentage} />
                      <p className="text-right text-sm text-cyan-400 mt-1">{service.percentage}%</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/services">
                <RainbowButton size="lg">
                  View All Services
                </RainbowButton>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
          <Meteors number={20} />
          
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0c1220]/90 to-[#0a192f]/90 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center max-w-4xl mx-auto"
            >              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                No matter how big your company is, as you expand and reach new heights, you'll want an agency to have your back. One with the process and expertise to help you succeed.
              </p>              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <RainbowButton size="lg">Get Started Today</RainbowButton>
                </Link>
                <Link href="/portfolio">
                  <RainbowButton variant="outline" size="lg">
                    Explore Our Work
                  </RainbowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      {mounted && <ScrollToTopButton />}
    </>
  );
}
