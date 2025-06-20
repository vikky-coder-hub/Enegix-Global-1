"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { RainbowButton } from "./magicui/rainbow-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Route } from "next";

const navLinks = [
  {
    label: "Home",
    href: "/",
    hasDropdown: false,
  },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "E-commerce Solutions", href: "/services/ecommerce-solutions" },
      { label: "SEO Optimization", href: "/services/seo-optimization" },
      { label: "PPC Advertising", href: "/services/ppc-advertising" },
      { label: "Logo Design", href: "/services/logo-design" },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    hasDropdown: true,
    dropdownItems: [
      { label: "Web Projects", href: "/portfolio/web-projects" },
      { label: "Mobile Apps", href: "/portfolio/mobile-apps" },
      { label: "Branding", href: "/portfolio/branding" },
      { label: "E-commerce", href: "/portfolio/ecommerce" },
    ],
  },
  {
    label: "Company",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    hasDropdown: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Check if the current path matches a nav link
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  // Handle dropdown hover
  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0a192f]/95 backdrop-blur-xl py-3 border-b border-gray-700/30 shadow-2xl shadow-black/20"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {" "}
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                <Image
                  src="/newlogo.png"
                  alt="Enegix Web Solutions"
                  width={50}
                  height={50}
                  className="relative rounded-full object-cover ring-2 ring-gray-500/30 group-hover:ring-blue-400/50 transition-all duration-500"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                  Enegix{" "}
                </h1>
                <p className="text-xs text-gray-400 -mt-1 font-medium">
                  Web Solutions
                </p>
              </div>
            </Link>
          </div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && handleDropdownEnter(link.label)
                }
                onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
              >
                {link.hasDropdown ? (
                  <Link href={link.href as Route}>
                    <button
                      className={cn(
                        "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer relative group",
                        isLinkActive(link.href)
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <ChevronDownIcon
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          activeDropdown === link.label ? "rotate-180" : ""
                        )}
                      />
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={link.href as Route}
                    className={cn(
                      "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer relative group",
                      isLinkActive(link.href)
                        ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#0a192f]/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-2 opacity-100 transition-all duration-200">
                    {" "}
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href as Route}
                        className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 rounded-lg transition-all duration-200 relative group"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <div className="ml-6">
              <Link href="/contact">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <RainbowButton size="lg" className="relative font-semibold">
                    Get Started
                  </RainbowButton>
                </div>
              </Link>
            </div>
          </div>{" "}
          {/* Mobile Menu Button */}
          <button
          title="menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col space-y-1.5 p-2"
          >
            <div
              className={cn(
                "w-6 h-0.5 bg-gray-300 transition-all duration-300",
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <div
              className={cn(
                "w-6 h-0.5 bg-gray-300 transition-all duration-300",
                mobileMenuOpen ? "opacity-0" : ""
              )}
            />
            <div
              className={cn(
                "w-6 h-0.5 bg-gray-300 transition-all duration-300",
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </button>
        </nav>{" "}
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-6 pb-6 transition-all duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.label ? null : link.label
                          )
                        }
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                      >
                        {link.label}
                        <ChevronDownIcon
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            activeDropdown === link.label ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      {activeDropdown === link.label && (
                        <div className="ml-4 mt-2 space-y-1">
                          {" "}
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href as Route}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-all duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href as Route}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <RainbowButton
                      variant="outline"
                      size="lg"
                      className="w-full font-semibold relative border-blue-500/30 hover:border-blue-400/50"
                    >
                      Get Started
                    </RainbowButton>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
