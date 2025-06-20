"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const techStack = [
  {
    name: "React",
    icon: "⚛️",
    color: "text-cyan-400",
    description: "Component-based UI library",
    category: "Frontend"
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "text-gray-300",
    description: "Full-stack React framework",
    category: "Framework"
  },
  {
    name: "React Native",
    icon: "📱",
    color: "text-blue-400",
    description: "Cross-platform mobile development",
    category: "Mobile"
  },
  {
    name: "Vue.js",
    icon: "🟢",
    color: "text-green-400",
    description: "Progressive JavaScript framework",
    category: "Frontend"
  },
  {
    name: "TypeScript",
    icon: "🔷",
    color: "text-blue-600",
    description: "Typed JavaScript at scale",
    category: "Language"
  },
  {
    name: "JavaScript",
    icon: "⚡",
    color: "text-yellow-400",
    description: "Dynamic programming language",
    category: "Language"
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    color: "text-teal-400",
    description: "Utility-first CSS framework",
    category: "Styling"
  },
  {
    name: "WordPress",
    icon: "📝",
    color: "text-blue-500",
    description: "Content management system",
    category: "CMS"
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "text-green-500",
    description: "JavaScript runtime environment",
    category: "Backend"
  },
  {
    name: "MongoDB",
    icon: "🍃",
    color: "text-green-600",
    description: "NoSQL database solution",
    category: "Database"
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    color: "text-blue-700",
    description: "Advanced relational database",
    category: "Database"
  },
  {
    name: "AWS",
    icon: "☁️",
    color: "text-orange-400",
    description: "Cloud computing platform",
    category: "Cloud"
  }
];

const TechStackSimple = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Frontend", "Framework", "Mobile", "Language", "Styling", "CMS", "Backend", "Database", "Cloud"];

  const filteredTech = selectedCategory === "All" 
    ? techStack 
    : techStack.filter(tech => tech.category === selectedCategory);

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Modern technologies and frameworks that power our solutions
          </p>
        </div>

        {/* Category Filter - Simplified */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Stack Grid - Ultra Simple */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Tech Icon */}
              <div className="text-3xl mb-2">
                {tech.icon}
              </div>
              
              {/* Tech Name */}
              <h3 className={cn("text-sm font-semibold mb-1 text-center", tech.color)}>
                {tech.name}
              </h3>
              
              {/* Category Badge */}
              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSimple;
