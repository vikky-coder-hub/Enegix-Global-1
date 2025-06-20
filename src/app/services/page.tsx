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
import { enablePageScroll } from "@/utils/scroll-helper";

// Service data array
const services = [
  {
    id: "web-development",
    title: "Web Development",
    shortDescription: "Custom websites and web applications built with the latest technologies.",
    fullDescription: "1234",
    features: [
      "Custom website design and development",
      "Progressive Web Applications (PWA)",
      "E-commerce platforms",
      "Content Management Systems",
      "API development and integration",
      "Web application maintenance and support"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
    image: "/web-development.jpg"
  },
  {
    id: "logo-design",
    title: "Logo Design",
    shortDescription: "Professional and memorable logo designs that communicate your brand identity.",
    fullDescription: "Your logo is the cornerstone of your visual identity. Our designers create distinctive, versatile logos that encapsulate your brand's personality and values. We follow a comprehensive design process, from initial concepts to final delivery, ensuring your logo stands out in your industry.",
    features: [
      "Logo concept development",
      "Multiple design variations",
      "Color palette selection",
      "Typography recommendations",
      "Brand identity guidelines",
      "File formats for all digital and print applications"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
        />
      </svg>
    ),
    image: "/logo-design.jpg"
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    shortDescription: "Drive organic traffic with our tailored search engine optimization strategies.",
    fullDescription: "Enhance your online visibility and climb search engine rankings with our comprehensive SEO services. We analyze your website, implement strategic optimizations, and continuously monitor performance to drive qualified traffic and increase your digital presence.",
    features: [
      "Comprehensive website SEO audit",
      "Keyword research and strategy",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Content strategy and creation",
      "Monthly performance reporting"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    image: "/seo-optimization.jpg"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Comprehensive digital marketing campaigns to increase online visibility.",
    fullDescription: "Our digital marketing strategies help your business get noticed in the crowded digital landscape. From social media management to email campaigns and content marketing, we create integrated strategies that connect with your audience, build brand loyalty, and drive measurable results.",
    features: [
      "Digital marketing strategy development",
      "Social media management",
      "Email marketing campaigns",
      "Content marketing",
      "Google Ads and meta campaigns",
      "WhatsApp business marketing"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
        />
      </svg>
    ),
    image: "/digital-marketing.jpg"
  },
  {
    id: "ecommerce-solutions",
    title: "E-commerce Solutions",
    shortDescription: "Build and optimize online stores that provide seamless shopping experiences.",
    fullDescription: "Transform your products into online sales with our comprehensive e-commerce solutions. We build secure, user-friendly online stores that streamline the purchasing process, integrate seamlessly with payment gateways, and provide powerful backend management tools to help your business thrive.",
    features: [
      "Custom e-commerce website development",
      "Payment gateway integration",
      "Inventory management systems",
      "Product catalog setup and optimization",
      "Mobile shopping experience",
      "Order fulfillment workflow optimization"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
    image: "/ecommerce-solutions.jpg"
  },
  {
    id: "ppc-advertising",
    title: "PPC Advertising",
    shortDescription: "Strategic pay-per-click campaigns that maximize your ROI.",
    fullDescription: "Our PPC advertising services help you get immediate visibility and target your ideal customers with precision. We create, manage, and optimize campaigns across Google Ads, Meta, and other platforms to drive qualified traffic to your website and maximize your return on investment.",
    features: [
      "PPC campaign strategy and setup",
      "Keyword research and selection",
      "Ad copywriting and creative design",
      "Bid management and optimization",
      "Conversion tracking implementation",
      "Performance analysis and reporting"
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),
    image: "/ppc-advertising.jpg"
  },
];

// Service Card Component for main services page
const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-cyan-400/50 group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col h-full"
    >
      <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 w-fit text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300">
        {service.icon}{" "}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 font-montserrat tracking-tight">
        {service.title}
      </h3>
      <p className="text-gray-400 font-space-grotesk font-light text-md leading-relaxed mb-6 flex-grow">
        {service.shortDescription}
      </p>
      <Link href={`/services/${service.id}`} className="mt-auto">
        <RainbowButton variant="outline" size="default">
          Learn More
        </RainbowButton>
      </Link>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  
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
            <div className="absolute top-20 flex h-[800px] w-full flex-col items-center justify-center overflow-hidden">
              <Meteors number={40} />
            </div>
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 blur-3xl pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-400/10 blur-3xl pointer-events-none"
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
                Our <AuroraText>Services</AuroraText>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-space-grotesk">
                We provide comprehensive digital solutions tailored to your business needs. 
                From web development to digital marketing, we have the expertise to help your 
                business thrive in the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Digital Presence?</h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your business goals. 
                Our team is ready to create customized solutions for your unique needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <RainbowButton size="lg">
                    Get Started
                  </RainbowButton>
                </Link>
                <Link href="/#contact">
                  <RainbowButton variant="outline" size="lg">
                    Contact Us
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
