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
import { notFound } from "next/navigation";

// Service data array - same as in services page
const services = [
  {
    id: "web-development",
    title: "Web Development Company in Ranchi that builds meaningful digital experiences - Enegix Web Solutions Pvt. Ltd.",
    shortDescription: "Custom websites and web applications built with the latest technologies.",
    fullDescription: "At Enegix Global, Ltd., we understand the importance of a Web Development Company in Ranchi to do more than simply build your next website. As your partner of technology, our products and services will do more than develop a platform; we create digital experiences that embody your brand, connect with your audience, and scale with your business. We create digital experiences for brands of all sizes, from startups to enterprises, utilizing best practices around simple architecture, modern coding techniques, and a user-centric perspective. We build website solutions that are not only operational but forward-thinking - whether it is developing a site that leverages AI tooling or is prepared for future scaling, we will build your website with what comes next in mind.",
    features: [
    "Intelligent, objective-driven development specific to business needs " ,
"Tight integration with business utilities and third-party platforms",
"SEO-optimized codebase and architecture to enhance discoverability",
"Quick-loading, mobile-optimized designs for enhanced engagement",
"Enterprise-grade security with proactive monitoring",
"Scalable builds that respond to market fluctuations and traffic spikes",

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
    image: "/web-development.jpg",
    technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL"]
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
    image: "/logo-design.jpg",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Sketch"]
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
    image: "/seo-optimization.jpg",
    tools: ["Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", "Moz"]
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
    image: "/digital-marketing.jpg",
    platforms: ["Facebook", "Instagram", "LinkedIn", "Twitter", "Google Ads", "Meta Ads", "WhatsApp Business"]
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
    image: "/ecommerce-solutions.jpg",
    platforms: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Custom Solutions"]
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
    image: "/ppc-advertising.jpg",
    platforms: ["Google Ads", "Meta Ads", "Bing Ads", "LinkedIn Ads", "Twitter Ads"]
  },
];

// Feature Item Component
const FeatureItem = ({ text }: { text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-start gap-2 mb-3"
  >
    <div className="min-w-[24px] h-6 flex items-center justify-center mt-0.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 text-cyan-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </div>
    <p className="text-gray-300">{text}</p>
  </motion.div>
);

// Technology/Tool/Platform Item Component
const TechItem = ({ text }: { text: string }) => (
  <span className="bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-md">
    {text}
  </span>
);

// Related Service Card Component
const RelatedServiceCard = ({ service }: { service: typeof services[0] }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 w-fit text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300">
        {service.icon}{" "}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 font-montserrat tracking-tight">
        {service.title}
      </h3>
      <p className="text-gray-400 font-space-grotesk font-light text-sm leading-relaxed mb-4">
        {service.shortDescription}
      </p>
      <Link href={`/services/${service.id}`} className="text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors">
        Learn More →
      </Link>
    </div>
  );
};

export default function ServiceDetailPage({
  params,
}: {
  params: { serviceId: string };
}) {
  const [mounted, setMounted] = useState(false);
  
  // Find the service by ID
  const service = services.find((s) => s.id === params.serviceId);
  
  // If service not found, return 404
  if (!service) {
    notFound();
  }
  
  // Get 3 random related services, excluding the current one
  const relatedServices = services
    .filter((s) => s.id !== service.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
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
              className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 blur-3xl pointer-events-none"
            />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 w-fit text-cyan-400"
              >
                {service.icon}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto font-space-grotesk">
                  {service.fullDescription}
                </p>
                <Link href="/#contact">
                  <RainbowButton size="lg">
                    Request a Quote
                  </RainbowButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >

                <div>
                  <div className="">
                <h2 className="text-3xl font-bold mb-8 tracking-tight">
                  Our <AuroraText> Website Development Services in India </AuroraText> are Beyond the Basics
                </h2 >
                   <p> Our Website Development Services in India at Enegix Web Solutions Pvt. Ltd. are more than simply providing a live URL—we create high-performing digital assets that work as tirelessly as you do. Your website is not only a digital presence; it is a living, breathing tool that can automate processes, interact with users, and bring about conversions. We build intelligent, adaptive solutions that integrate within your business environment—from CRM systems to chatbots—and optimize for speed, security, and discoverability. In the competitive online world of today, development isn't a formality—it's a game-changer.
                </p>
                  </div>
                
                 
                </div>
                
                <div className="space-y-1">
                  
                  {service.features.map((feature, index) => (
                    <FeatureItem key={index} text={feature} />
                  ))}
                </div>
                
                {/* Technologies/Tools/Platforms (if available) */}
                {(service.technologies || service.tools || service.platforms) && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold mb-6">
                      {service.technologies ? "Technologies We Use" : 
                       service.tools ? "Tools We Leverage" : 
                       "Platforms We Work With"}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {(service.technologies || service.tools || service.platforms)?.map((item, index) => (
                        <TechItem key={index} text={item} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              {/* Process/Approach */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
              >
                <h3 className="text-3xl font-bold mb-8 tracking-tight">Web Design in India That Connects, Converts, and Captivates</h3>
                <p>The design at Enegix Web Solutions Pvt. Ltd. is never skin deep- it is about building a connection. The philosophy of our Web Design in India is very simple: try to make it feel natural, keeping it purposeful, and think of the user at all times. Today’s audiences scroll fast, think smart, and expect a seamless digital journey- hence our design approach is to blend aesthetics with empathy- visual, flow, function- in the right touch. From a loud hero section to crisp typography to subtle animations, we design to guide, inspire, and convert-without scaring or underwhelming.</p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Clear & Smart Visuals</h3>
                      <p className="text-gray-300">Smart designs for concise and effective visual communication.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">UX Backed by Data</h3>
                      <p className="text-gray-300">Our team creates custom solutions that align with your brand identity and business objectives.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Interactive User Engagement</h3>
                      <p className="text-gray-300">Interactive features to increase engagement and time-on-site.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">4</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Mobile-First Responsiveness</h3>
                      <p className="text-gray-300">Mobile-first approach to guarantee responsiveness on all screens.</p>
                    </div>
                  </div>

                   <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">5</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Branded Visual Storytellingt</h3>
                      <p className="text-gray-300">Color palettes and narrative elements extending the brand story.</p>
                    </div>
                  </div>
                   <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">6</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Inclusive & Accessible Design</h3>
                      <p className="text-gray-300">Universal design solutions for accessibility in an inclusive user </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 tracking-tight text-center"
            >
              Related <AuroraText>Services</AuroraText>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relService, index) => (
                <motion.div
                  key={relService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <RelatedServiceCard service={relService} />
                </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Let's discuss how our {service.title} services can help you achieve your business goals.
                Our team is ready to create customized solutions for your unique needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact">
                  <RainbowButton size="lg">
                    Contact Us
                  </RainbowButton>
                </Link>
                <Link href="/services">
                  <RainbowButton variant="outline" size="lg">
                    Explore All Services
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
