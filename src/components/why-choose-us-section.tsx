"use client";

import React from "react";
import { cn } from "@/lib/utils";

const achievements = [
  {
    icon: "🏆",
    number: "500+",
    label: "Projects Completed",
    description: "Successfully delivered across various industries"
  },
  {
    icon: "⭐",
    number: "98%",
    label: "Client Satisfaction",
    description: "Consistently exceeding expectations"
  },
  {
    icon: "🚀",
    number: "5+",
    label: "Years Experience",
    description: "Building digital solutions since 2019"
  },
  {
    icon: "🌍",
    number: "2+",
    label: "Countries Served",
    description: "Global reach with local expertise"
  }
];

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast Development",
    description: "Rapid prototyping and delivery without compromising quality. We use modern frameworks and agile methodologies.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: "🎯",
    title: "Precision & Attention to Detail",
    description: "Every pixel matters. We craft pixel-perfect designs that translate into flawless user experiences.",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    icon: "🔒",
    title: "Enterprise-Grade Security",
    description: "Your data and applications are protected with industry-leading security practices and protocols.",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: "📱",
    title: "Mobile-First Approach",
    description: "Every solution is optimized for mobile devices, ensuring seamless experiences across all platforms.",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: "🎨",
    title: "Custom Design Solutions",
    description: "Unique designs tailored to your brand identity. No templates, no compromises, just pure creativity.",
    gradient: "from-indigo-400 to-purple-500"
  },
  {
    icon: "⚙️",
    title: "Scalable Architecture",
    description: "Future-proof solutions that grow with your business. Built for scale from day one.",
    gradient: "from-teal-400 to-blue-500"
  }
];

const WhyChooseUsSection = () => {
  return (
    <section 
      className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Static Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Enegix Web Solutions?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We don't just build websites and apps—we craft digital experiences that drive results. 
            Here's what sets us apart from the competition.
          </p>
        </div>        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fade-in-up">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="text-center group transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
                  {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group perspective-1000 transition-all duration-300 hover:-translate-y-3 hover:scale-105"
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform-gpu group-hover:border-white/20 transition-all duration-300">
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300",
                  feature.gradient
                )} />

                <div className="relative z-10">
                  {/* Feature Icon */}
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* Feature Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Feature Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
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

export default WhyChooseUsSection;
