"use client";

import Link from "next/link";
import { RainbowButton } from "./magicui/rainbow-button";
import { AuroraText } from "./magicui/aurora-text";

const ContactCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
      
      {/* Static decorative elements instead of animated meteors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[20%] w-1 h-12 bg-blue-400/20 rounded-full transform rotate-[25deg]"></div>
        <div className="absolute top-20 right-[40%] w-[2px] h-16 bg-purple-400/20 rounded-full transform rotate-[25deg]"></div>
        <div className="absolute bottom-32 left-[25%] w-[1px] h-24 bg-cyan-400/20 rounded-full transform rotate-[25deg]"></div>
        <div className="absolute top-40 left-[10%] w-[2px] h-20 bg-blue-300/20 rounded-full transform rotate-[25deg]"></div>
        <div className="absolute bottom-20 right-[15%] w-[1px] h-16 bg-purple-300/20 rounded-full transform rotate-[25deg]"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div 
          className="bg-gradient-to-r from-[#0c1220]/90 to-[#0a192f]/90 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center max-w-4xl mx-auto animate-fade-in"
        >          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your <AuroraText>Digital Presence</AuroraText>?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            No matter the size of your company, we're here to help you expand and reach new heights with our expertise and proven process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <RainbowButton size="lg">
                Get In Touch
              </RainbowButton>
            </Link>
            <a href="tel:+919608263050">
              <RainbowButton variant="outline" size="lg">
                Call Now: +91 96082 63050
              </RainbowButton>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactCTA;
