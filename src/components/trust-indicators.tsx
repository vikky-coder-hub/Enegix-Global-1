"use client";

import React from "react";
import { motion } from "framer-motion";

const TrustIndicators = () => {
  const logos = [
    { name: "TechCorp", width: "120px" },
    { name: "InnovateLab", width: "110px" },
    { name: "StartupFlow", width: "130px" },
    { name: "DigitalEdge", width: "115px" },
    { name: "NextGen", width: "105px" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mt-16 pt-8 border-t border-gray-700/30"
    >
      <p className="text-center text-gray-400 text-sm mb-8 font-medium">
        Trusted by innovative companies worldwide
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            className="flex items-center justify-center"
            style={{ width: logo.width }}
          >
            <div className="h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded flex items-center justify-center px-4 py-2 text-xs font-medium text-gray-300 bg-opacity-20 border border-gray-600/30">
              {logo.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustIndicators;
