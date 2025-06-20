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
import { cn } from "@/lib/utils";

// Portfolio project data
const portfolioProjects = [
  {
    id: "healthier-you",
    title: "Healthier You",
    category: "Web Development",
    description: "A dynamic health and wellness platform featuring personalized nutrition plans, workout routines, and health tracking tools.",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://healthier-you.com",
    featured: true
  },
  {
    id: "urban-taste",
    title: "Urban Taste",
    category: "E-commerce",
    description: "An elegant food delivery platform connecting users with local restaurants offering gourmet dining experiences.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    link: "https://urban-taste.com",
    featured: true
  },
  {
    id: "echo-studios",
    title: "Echo Studios",
    category: "Branding",
    description: "Complete brand identity for a recording studio, including logo design, color palette, typography, and marketing materials.",
    image: "https://images.unsplash.com/photo-1511376777868-611b54f68947",
    tags: ["Logo Design", "Brand Identity", "Typography"],
    link: "https://echo-studios.com",
    featured: true
  },
  {
    id: "terra-realty",
    title: "Terra Realty",
    category: "Web Development",
    description: "A real estate platform with property listings, virtual tours, and agent profiles for a premium realty company.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    tags: ["WordPress", "Custom Plugins", "Google Maps API"],
    link: "https://terra-realty.com",
    featured: false
  },
  {
    id: "fit-gear",
    title: "FitGear",
    category: "E-commerce",
    description: "Online store for premium fitness equipment with detailed product specifications and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1583454110551-21f9d2291d10",
    tags: ["Shopify", "Custom Theme", "Payment Gateway Integration"],
    link: "https://fit-gear.com",
    featured: false
  },
  {
    id: "pulse-marketing",
    title: "Pulse Marketing",
    category: "Digital Marketing",
    description: "Comprehensive digital marketing campaign that increased client's online visibility by 150% and lead generation by 80%.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["SEO", "Content Marketing", "PPC", "Analytics"],
    link: "https://pulse-agency.com",
    featured: false
  },
  {
    id: "nova-coffee",
    title: "Nova Coffee",
    category: "Branding",
    description: "Brand identity and packaging design for a specialty coffee roaster, emphasizing sustainability and artisanal quality.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    tags: ["Packaging Design", "Logo Design", "Visual Identity"],
    link: "https://nova-coffee.com",
    featured: false
  },
  {
    id: "tech-summit",
    title: "Tech Summit 2023",
    category: "Web Development",
    description: "Event website with registration system, speaker profiles, and real-time schedule updates for a major tech conference.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    tags: ["React", "Stripe", "Firebase", "Netlify"],
    link: "https://tech-summit-2023.com",
    featured: false
  },
  {
    id: "green-planet",
    title: "Green Planet",
    category: "Branding",
    description: "Complete visual identity for an environmental non-profit organization focused on conservation and sustainability.",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
    tags: ["Logo Design", "Brand Guidelines", "Print Materials"],
    link: "https://green-planet-initiative.org",
    featured: false
  }
];


// Filter categories
const categories = ["All", "Web Development", "E-commerce", "Branding", "Digital Marketing"];

// Project Card Component
const ProjectCard = ({ project, index }: { project: typeof portfolioProjects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl"
    >
      {/* Project Image */}
      <div className="relative h-80 w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ7mFT6VQAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Project Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-cyan-400 bg-cyan-950/70 backdrop-blur-sm rounded-full">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">{project.title}</h3>
        
        <div className="flex gap-2 flex-wrap mt-3 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 text-xs bg-white/10 rounded-md text-gray-300">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-white/10 rounded-md text-gray-300">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="transform translate-y-8 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
          <Link href={`/portfolio/${project.id}`}>
            <span className="text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors flex items-center gap-1">
              View Project 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Featured Project Card Component (larger display)
const FeaturedProjectCard = ({ project }: { project: typeof portfolioProjects[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 p-1"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Project Image */}
        <div className="relative h-80 md:h-auto md:w-1/2 overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ7mFT6VQAAAABJRU5ErkJggg=="
          />
        </div>
        
        {/* Project Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-cyan-400 bg-cyan-950/70 backdrop-blur-sm rounded-full">
            {project.category}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 text-xs bg-white/10 rounded-md text-gray-300">
                {tag}
              </span>
            ))}
          </div>
          
          <Link href={`/portfolio/${project.id}`}>
            <RainbowButton variant="outline" size="default">
              View Case Study
            </RainbowButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Featured projects for showcase
  const featuredProjects = portfolioProjects.filter(project => project.featured);
  
  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = portfolioProjects;
    
    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        project => 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchQuery]);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Add smooth scrolling for anchor links
  useEffect(() => {
    if (!mounted) return;
    
    // Enable page scrolling and fix scroll issues
    enablePageScroll();
    
    // Clear any transform styles that might be affecting scroll
    const mainContent = document.getElementById('__next') || document.querySelector('main');
    if (mainContent) {
      mainContent.style.transform = 'none';
    }
  }, [mounted]);

  return (
    <>
      <ScrollFix />
      <Navbar />

      <main className="bg-[#0c1220] text-white min-h-screen relative overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          {/* Animated background effects */}
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
              <Meteors number={30} />
            </div>
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none"
            />
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Our <AuroraText>Portfolio</AuroraText>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-space-grotesk">
                Explore our collection of projects that showcase our expertise in web development, 
                branding, e-commerce, and digital marketing solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Featured <AuroraText>Projects</AuroraText>
            </motion.h2>
            
            <div className="space-y-10">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                  <p className="text-gray-400 mb-6">
                    We couldn't find any projects matching your current filters.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Amazing Together</h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Ready to bring your vision to life? We're here to help you create a project that exceeds your expectations
                and delivers real results for your business.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact">
                  <RainbowButton size="lg">
                    Start a Project
                  </RainbowButton>
                </Link>
                <Link href="/services">
                  <RainbowButton variant="outline" size="lg">
                    Explore Services
                  </RainbowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
}
