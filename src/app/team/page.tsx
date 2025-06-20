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

// Team members data
const teamMembers = [
  {
    id: "Ehtesham Raghib",
    name: "Ehtesham Raghib",
    role: "Founder & CEO",
    bio: "Ehtesham Raghib, the founder of Enegix Web Solutions, is a passionate entrepreneur and digital strategist dedicated to transforming businesses through cutting-edge web solutions. With a deep understanding of web development, digital marketing, and brand growth, he has played a pivotal role in helping businesses establish a powerful online presence. Under his leadership, Enegix Web Solutions has evolved from a specialized web development firm into a full-service digital agency, offering innovative and results-driven solutions. Ehtesham's expertise in leveraging the latest technologies and data-driven strategies ensures that businesses stay ahead in the ever-evolving digital landscape.",
    image:
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/f3-300x300.png.webp",
    socialLinks: {
      facebook: "https://www.facebook.com/Imthepatientwolf",
      instagram: "https://www.instagram.com/the.patient_wolf/",
      linkedin: "https://www.linkedin.com/in/ehtesham-raghib-9b5b6b201/",
    },
    featured: true,
  },
  {
    id: "Shreya Raj",
    name: "Shreya Raj",
    role: "Co-Founder & CTO",
    bio: "Shreya Raj, co-founder of Enegix Web Solutions, is a dynamic leader and creative strategist dedicated to crafting impactful digital experiences. With expertise in brand development and digital marketing, she brings a unique blend of creativity and technical acumen to the company. Her passion for innovation and eye for detail have played a crucial role in shaping Enegix Web Solutions into a full-service digital agency that delivers visually stunning and results-driven web solutions. Shreya believes in blending aesthetics with functionality, ensuring that every project not only looks exceptional but also achieves its intended impact.",
    image:
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/shreya1-300x300-1.png.webp",
    socialLinks: {
      facebook:
        "https://www.facebook.com/profile.php?id=61574563300591&mibextid=wwXIfr&rdid=xtteN194F8ccVUqv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F3jvQrKje%2F%3Fmibextid%3DwwXIfr#",
      instagram: "https://www.instagram.com/potaciumpandey",
      linkedin:
        "https://www.linkedin.com/in/shreya-raj-75569a34b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    featured: true,
  },
  {
    id: "muskan",
    name: "Muskan",
    role: "Lead Sales Executive",
    bio: "Muskan is a results-driven sales executive with a passion for helping clients find the right solutions for their needs. With a background in customer service and a deep understanding of Enegix's offerings, she excels at building relationships and driving sales.",
    image:
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/t5.png.webp",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "Fatma Shakeel",
    name: "Fatma Shakeel",
    role: "Senior Wordpress Developer",
    bio: "Fatma specializes in creating beautiful, responsive user interfaces with Wordpress and elementor. Her attention to detail and passion for user experience makes her an invaluable member of our development team.",
    image:
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/fatma.png.webp",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "kunal",
    name: "Kunal Kumar",
    role: "Full Stack Developer",
    bio: "Kunal has 5+ years of experience in developing scalable frontend and backend systems using Node.js, Express, and MongoDB. He ensures our applications are secure, efficient, and maintainable.",
    image:
      "https://enegixwebsolutions.com/wp-content/uploads/2025/03/kunal.png.webp",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "rajiv",
    name: "Rajiv",
    role: "Full Stack & Mobile App Developer",
    bio: "Rajiv is a passionate full stack and React Native developer with a knack for building scalable web and mobile applications. With deep expertise in the MERN stack and cross-platform development, he crafts seamless user experiences and robust backend architectures. Whether it's a startup MVP or a production-grade platform, Rajiv delivers clean, efficient, and future-ready code.",

    image: "https://avatars.githubusercontent.com/u/95340414?v=4",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Business Development",
    bio: "Michael focuses on growing our client base and identifying new market opportunities. His background in marketing and business strategy helps drive Enegix's expansion into new sectors.",
    image: "/team/sales2.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: "emma-rodriguez",
    name: "Emma Rodriguez",
    role: "Account Manager",
    bio: "Emma ensures our clients receive exceptional service throughout their journey with Enegix. She maintains strong client relationships and ensures project delivery exceeds expectations.",
    image: "/team/sales3.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
];

// Team Member Card Component
const TeamMemberCard = ({ member }: { member: (typeof teamMembers)[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="aspect-[4/5] relative overflow-hidden rounded-t-xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-cyan-400 mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{member.bio}</p>

        <div className="flex space-x-3">
          {" "}
          {member.socialLinks.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          )}
          {member.socialLinks.facebook && (
            <a
              href={member.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
          )}
          {member.socialLinks.instagram && (
            <a
              href={member.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Featured Team Member Card
const FeaturedTeamMemberCard = ({
  member,
}: {
  member: (typeof teamMembers)[0];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-lg border border-white/10 p-6 lg:p-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3 aspect-square relative rounded-full overflow-hidden border-4 border-cyan-400/30">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {member.name}
          </h3>
          <p className="text-cyan-400 text-lg mb-4">{member.role}</p>
          <p className="text-gray-300 mb-6">{member.bio}</p>

          <div className="flex space-x-4">
            {member.socialLinks.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-cyan-400"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            )}{" "}
            {member.socialLinks.facebook && (
              <a
                href={member.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-cyan-400"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
            )}{" "}
            {member.socialLinks.instagram && (
              <a
                href={member.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-cyan-400"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Team Filters
const filters = [
  { id: "all", label: "All Team" },
  { id: "leadership", label: "Leadership" },
  { id: "development", label: "Development" },
  { id: "sales", label: "Sales" },
];

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter members based on active filter
  const filteredMembers = teamMembers.filter((member) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "leadership")
      return (
        member.role.includes("Founder") ||
        member.role.includes("CTO") ||
        member.role.includes("CEO")
      );
    if (activeFilter === "development")
      return member.role.includes("Developer") || member.role.includes("Lead");
    if (activeFilter === "sales")
      return (
        member.role.includes("Sales") ||
        member.role.includes("Business") ||
        member.role.includes("Account")
      );
    return true;
  });

  const featuredMembers = teamMembers.filter((member) => member.featured);
  const regularMembers = filteredMembers.filter((member) => !member.featured);

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
        {" "}
        {/* Hero Banner */}
        <section id="team-section" className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-[#0c1220]">
            <div className="absolute top-10 left-0 right-0 h-[600px] flex items-center justify-center overflow-hidden">
              <Meteors number={50} />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Meet Our <AuroraText>Team</AuroraText>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We're a passionate group of designers, developers, and digital
                strategists dedicated to helping businesses succeed in the
                digital world.
              </p>
            </motion.div>
          </div>
        </section>
        {/* Featured Members Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
            >
              Our <AuroraText>Leadership</AuroraText>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12"
            >
              Meet the visionaries who drive our mission and shape our company
              culture
            </motion.p>

            <div className="space-y-8">
              {featuredMembers.map((member) => (
                <FeaturedTeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
        {/* Team Members Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-[#0c1220] to-[#0a0f1a]">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
            >
              Our <AuroraText>Talented Team</AuroraText>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12"
            >
              Each member of our team brings unique expertise and passion to
              every project
            </motion.p>

            {/* Filters */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {regularMembers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No team members match the selected filter.
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Join Our Team Section */}
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
                Join Our Growing Team
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team.
                Check out our current openings or send us your resume.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <RainbowButton size="lg">View Open Positions</RainbowButton>
                <Link href="/contact">
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
