"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import ScrollToTopButton from "@/components/scroll-to-top";
import ScrollFix from "@/components/scroll-fix";
import Link from "next/link";
import Image from "next/image";
import { enablePageScroll } from "@/utils/scroll-helper";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";

// Portfolio project data (same as in portfolio page)
const portfolioProjects = [
  {
    id: "healthier-you",
    title: "Healthier You",
    category: "Web Development",
    description:
      "A dynamic health and wellness platform featuring personalized nutrition plans, workout routines, and health tracking tools.",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://healthier-you.com",
    featured: true,
    client: "Healthier You Inc.",
    duration: "12 weeks",
    year: "2023",
    challenge:
      "The client needed a comprehensive health platform that could offer personalized experiences for users with different health goals, dietary restrictions, and fitness levels. They required a scalable solution that could handle thousands of concurrent users while maintaining fast load times and responsive design across all devices.",
    solution:
      "We built a modern React frontend with a Node.js and Express backend, supported by MongoDB for flexible data storage. The application features sophisticated algorithms that generate personalized nutrition and workout plans based on user inputs and goals. We implemented real-time progress tracking, social sharing features, and integration with popular fitness wearables.",
    results:
      "Since launch, the platform has attracted over 50,000 active users with a 92% satisfaction rate. User retention is 68% after 3 months, significantly above industry average. The platform's personalization features have been particularly successful, with users reporting an average 30% improvement in achieving their health goals compared to previous methods.",
    testimonial: {
      text: "The Enegix team delivered beyond our expectations. Not only did they build a beautiful, functional platform, but they truly understood our vision and brought innovative ideas to the table that enhanced the user experience.",
      author: "Sarah Johnson",
      position: "CEO, Healthier You Inc.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1588776814546-6c8125b59f56",
      "https://images.unsplash.com/photo-1600180758890-6be2019b15c1",
      "https://images.unsplash.com/photo-1581009146145-b5a8b1f1e9a9",
    ],
  },
  {
    id: "urban-taste",
    title: "Urban Taste",
    category: "E-commerce",
    description:
      "An elegant food delivery platform connecting users with local restaurants offering gourmet dining experiences.",
    image: "https://images.unsplash.com/photo-1581276879432-15a57f1bbd41",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    link: "https://urban-taste.com",
    featured: true,
    client: "Urban Taste Collective",
    duration: "16 weeks",
    year: "2023",
    challenge:
      "Urban Taste needed a sophisticated platform to connect high-end restaurants with discerning customers seeking premium dining experiences delivered to their homes. The platform needed to handle complex ordering logic, real-time tracking, and seamless payment processing while maintaining the premium aesthetic of the partnered restaurants.",
    solution:
      "We developed a Next.js application with server-side rendering for optimal performance and SEO. The platform features elegant UI designed with Tailwind CSS, real-time order tracking powered by Firebase, and secure payment processing via Stripe. We implemented a custom algorithm for estimated delivery times based on restaurant preparation estimates and current delivery conditions.",
    results:
      "The platform successfully launched with 25 premium restaurant partners and processed over $1.2 million in orders within the first quarter. Customer retention rate stands at 76%, with an average order value 35% higher than competitive platforms. Restaurant partners report a 28% increase in revenue from delivery orders compared to previous delivery services.",
    testimonial: {
      text: "Enegix transformed our vision into a digital masterpiece. The platform perfectly captures our premium brand positioning while offering seamless functionality for both restaurants and customers.",
      author: "Michael Chen",
      position: "Founder, Urban Taste Collective",
    },
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    ],
  },
  {
    id: "echo-studios",
    title: "Echo Studios",
    category: "Branding",
    description:
      "Complete brand identity for a recording studio, including logo design, color palette, typography, and marketing materials.",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
    tags: ["Logo Design", "Brand Identity", "Typography"],
    link: "https://echo-studios.com",
    featured: true,
    client: "Echo Studios",
    duration: "8 weeks",
    year: "2023",
    challenge:
      "Echo Studios, a new high-end recording facility, needed a complete brand identity that would position them as innovative and premium while appealing to both established artists and emerging talent. They needed their brand to convey technical excellence and creative inspiration.",
    solution:
      "We created a comprehensive brand identity anchored by a distinctive logo that visualizes sound waves in an elegant, abstract form. The color palette balances deep blues and blacks with vibrant accent colors that evoke energy and creativity. The typography system pairs a bold, distinctive display typeface for headlines with a clean, readable sans-serif for body text. We developed applications across digital and print touchpoints, including website design, business cards, letterhead, merchandise, and studio signage.",
    results:
      "The new brand identity has been instrumental in establishing Echo Studios in a competitive market. Within 6 months of launch, studio bookings reached 85% capacity, with clients specifically mentioning the professional brand impression as a factor in their decision. The brand has received recognition in two design publications and helped the studio secure partnerships with major music industry events.",
    testimonial: {
      text: "Enegix delivered a brand identity that perfectly captures our vision. The thoughtful design system works beautifully across all our touchpoints and has helped us make a strong impression in the industry right from launch.",
      author: "David Rivera",
      position: "Creative Director, Echo Studios",
    },
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
  },
  {
    id: "terra-realty",
    title: "Terra Realty",
    category: "Web Development",
    description:
      "A real estate platform with property listings, virtual tours, and agent profiles for a premium realty company.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    tags: ["WordPress", "Custom Plugins", "Google Maps API"],
    link: "https://terra-realty.com",
    featured: false,
    client: "Terra Realty Group",
    duration: "10 weeks",
    year: "2023",
    challenge:
      "Terra Realty needed a modern, user-friendly website that would showcase their luxury property listings effectively while providing advanced search functionality and virtual tour capabilities. They needed a solution that their non-technical staff could easily update and manage.",
    solution:
      "We built a custom WordPress theme with advanced property listing functionality, interactive maps using Google Maps API, and 360° virtual tour integration. The admin interface was customized to make property management intuitive for staff, with custom fields for detailed property information and automated features like image optimization.",
    results:
      "The new website increased Terra Realty's online leads by 75% in the first three months. Time spent on the site increased by 65%, and the virtual tour feature has been used by 85% of visitors viewing property details. The custom admin interface has reduced the time staff spend managing listings by approximately 60%.",
    testimonial: {
      text: "Enegix created exactly what we needed - a beautiful website that showcases our properties in the best possible light while being surprisingly easy to manage. Our team adapted to the new system quickly, and our clients love the user experience.",
      author: "Eleanor Wright",
      position: "Marketing Director, Terra Realty Group",
    },
    gallery: [
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/jps-1.png.webp",
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/South-india-cabs-1.png.webp",
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/aerolite-1536x756.png.webp",
    ],
  },
  // Rest of the portfolio projects would be defined here similarly
  {
    id: "fit-gear",
    title: "FitGear",
    category: "E-commerce",
    description:
      "Online store for premium fitness equipment with detailed product specifications and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
    tags: ["Shopify", "Custom Theme", "Payment Gateway Integration"],
    link: "https://fit-gear.com",
    featured: false,
  },
  {
    id: "pulse-marketing",
    title: "Pulse Marketing",
    category: "Digital Marketing",
    description:
      "Comprehensive digital marketing campaign that increased client's online visibility by 150% and lead generation by 80%.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    tags: ["SEO", "Content Marketing", "PPC", "Analytics"],
    link: "https://pulse-agency.com",
    featured: false,
  },
  {
    id: "nova-coffee",
    title: "Nova Coffee",
    category: "Branding",
    description:
      "Brand identity and packaging design for a specialty coffee roaster, emphasizing sustainability and artisanal quality.",
    image: "https://images.unsplash.com/photo-1588696744504-6e3eebc1f04c",
    tags: ["Packaging Design", "Logo Design", "Visual Identity"],
    link: "https://nova-coffee.com",
    featured: false,
  },
  {
    id: "tech-summit",
    title: "Tech Summit 2023",
    category: "Web Development",
    description:
      "Event website with registration system, speaker profiles, and real-time schedule updates for a major tech conference.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    tags: ["React", "Stripe", "Firebase", "Netlify"],
    link: "https://tech-summit-2023.com",
    featured: false,
  },
  {
    id: "green-planet",
    title: "Green Planet",
    category: "Branding",
    description:
      "Complete visual identity for an environmental non-profit organization focused on conservation and sustainability.",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
    tags: ["Logo Design", "Brand Guidelines", "Print Materials"],
    link: "https://green-planet-initiative.org",
    featured: false,
  },
];

// Related Project Card Component
const RelatedProjectCard = ({
  project,
}: {
  project: (typeof portfolioProjects)[0];
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      {/* Project Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl">
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
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="inline-block px-3 py-1 mb-2 text-xs font-medium text-cyan-400 bg-cyan-950/70 backdrop-blur-sm rounded-full">
          {project.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
        <Link href={`/portfolio/${project.id}`}>
          <span className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
            View Project →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [mounted, setMounted] = useState(false);

  // Find the project by ID
  const project = portfolioProjects.find((p) => p.id === params.projectId);

  // If project not found, return 404
  if (!project) {
    notFound();
  }

  // Get 3 related projects from the same category, excluding the current one
  const relatedProjects = portfolioProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
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
    const mainContent =
      document.getElementById("__next") || document.querySelector("main");
    if (mainContent) {
      mainContent.style.transform = "none";
    }
  }, [mounted]);

  return (
    <>
      <ScrollFix />
      <Navbar />

      <main className="bg-[#0c1220] text-white min-h-screen relative overflow-x-hidden">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c1220]/30 via-[#0c1220]/70 to-[#0c1220] z-10"></div>
            <div className="h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ7mFT6VQAAAABJRU5ErkJggg=="
              />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-cyan-400 bg-cyan-950/70 backdrop-blur-sm rounded-full">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RainbowButton size="lg">Visit Live Project</RainbowButton>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Info */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-32">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Client</p>
                      <p className="text-white font-medium">
                        {project.client || "Confidential"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Timeline</p>
                      <p className="text-white font-medium">
                        {project.duration || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Year</p>
                      <p className="text-white font-medium">
                        {project.year || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Services</p>
                      <p className="text-white font-medium">
                        {project.category}
                      </p>
                    </div>

                    <div className="pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                      >
                        View Live
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Challenge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    The <AuroraText>Challenge</AuroraText>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.challenge ||
                      "Our client approached us with specific requirements and challenges that needed innovative solutions."}
                  </p>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Our <AuroraText>Solution</AuroraText>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.solution ||
                      "We developed a comprehensive solution tailored to the client's specific needs and goals."}
                  </p>
                </motion.div>

                {/* Gallery (if available) */}
                {project.gallery && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                      Project <AuroraText>Gallery</AuroraText>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-64 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - Gallery Image ${
                              index + 1
                            }`}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ7mFT6VQAAAABJRU5ErkJggg=="
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    The <AuroraText>Results</AuroraText>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.results ||
                      "The implemented solution delivered significant improvements and helped the client achieve their business objectives."}
                  </p>
                </motion.div>

                {/* Testimonial (if available) */}
                {project.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                  >
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                      <svg
                        className="h-10 w-10 text-cyan-400 mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                      </svg>
                      <p className="text-gray-200 italic text-lg mb-4">
                        "{project.testimonial.text}"
                      </p>
                      <div>
                        <p className="text-white font-bold">
                          {project.testimonial.author}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {project.testimonial.position}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 px-4 bg-gradient-to-b from-transparent to-[#0a0f1a]">
            <div className="container mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-10 text-center"
              >
                Related <AuroraText>Projects</AuroraText>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relProject) => (
                  <motion.div
                    key={relProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <RelatedProjectCard project={relProject} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for Similar Results?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your business goals
                with our {project.category.toLowerCase()} services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact">
                  <RainbowButton size="lg">Start a Project</RainbowButton>
                </Link>
                <Link href="/portfolio">
                  <RainbowButton variant="outline" size="lg">
                    View More Projects
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
