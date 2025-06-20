"use client";

import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c1220] text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-6">Service Not Found</h2>
        <p className="text-gray-400 text-lg mb-12">
          Sorry, the service you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/services">
            <RainbowButton size="lg">
              All Services
            </RainbowButton>
          </Link>
          <Link href="/">
            <RainbowButton variant="outline" size="lg">
              Go Home
            </RainbowButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
