"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const techStack = [
  {
    name: "React",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
    description: "Component-based UI library",
    category: "Frontend"
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "from-black to-gray-700",
    description: "Full-stack React framework",
    category: "Framework"
  },
  {
    name: "React Native",
    icon: "📱",
    color: "from-blue-500 to-cyan-400",
    description: "Cross-platform mobile development",
    category: "Mobile"
  },
  {
    name: "Vue.js",
    icon: "🟢",
    color: "from-green-400 to-green-600",
    description: "Progressive JavaScript framework",
    category: "Frontend"
  },
  {
    name: "TypeScript",
    icon: "🔷",
    color: "from-blue-600 to-blue-800",
    description: "Typed JavaScript at scale",
    category: "Language"
  },
  {
    name: "JavaScript",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500",
    description: "Dynamic programming language",
    category: "Language"
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    color: "from-teal-400 to-blue-500",
    description: "Utility-first CSS framework",
    category: "Styling"
  },
  {
    name: "WordPress",
    icon: "📝",
    color: "from-blue-600 to-indigo-600",
    description: "Content management system",
    category: "CMS"
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "from-green-500 to-green-700",
    description: "JavaScript runtime environment",
    category: "Backend"
  },
  {
    name: "MongoDB",
    icon: "🍃",
    color: "from-green-600 to-green-800",
    description: "NoSQL database solution",
    category: "Database"
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    color: "from-blue-700 to-indigo-800",
    description: "Advanced relational database",
    category: "Database"
  },
  {
    name: "AWS",
    icon: "☁️",
    color: "from-orange-400 to-yellow-500",
    description: "Cloud computing platform",
    category: "Cloud"
  }
];

const TechStackSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = ["All", "Frontend", "Framework", "Mobile", "Language", "Styling", "CMS", "Backend", "Database", "Cloud"];

  const filteredTech = selectedCategory === "All" 
    ? techStack 
    : techStack.filter(tech => tech.category === selectedCategory);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);
    const handleEnded = () => setIsVideoPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="relative py-20 px-4 bg-[#0a192f] overflow-hidden">
      {/* Simplified Background Video Container */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-20 cursor-pointer transition-opacity duration-500 hover:opacity-30"
            autoPlay
            muted
            loop
            playsInline
            onClick={handleVideoClick}
          >
            <source src="/header.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-[#0a192f]/70 backdrop-blur-[1px]" />
          
          {/* Simple Video Controls */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isVideoPlaying ? 'opacity-70' : 'opacity-100'}`}>
            <div
              className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-200"
              onClick={handleVideoClick}
            >
              {isVideoPlaying ? (
                <div className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <div className="w-0 h-0 border-l-[15px] border-l-white border-y-[10px] border-y-transparent ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Our Tech Arsenal
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technologies and frameworks that power our innovative solutions. 
            We stay ahead of the curve to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105",
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="group relative transition-all duration-300 hover:-translate-y-3 hover:scale-105"
            >
              {/* Tech Card */}
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300",
                  tech.color
                )} />
                
                <div className="relative z-10">
                  {/* Tech Icon */}
                  <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  
                  {/* Tech Name */}
                  <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {tech.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400 text-center mb-3 group-hover:text-gray-300 transition-colors duration-300">
                    {tech.description}
                  </p>
                  
                  {/* Category Badge */}
                  <div className="flex justify-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r text-white shadow-lg",
                      tech.color
                    )}>
                      {tech.category}
                    </span>
                  </div>
                </div>

                {/* Subtle Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Static Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-400/40 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400/35 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300/25 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-cyan-300/30 rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;
