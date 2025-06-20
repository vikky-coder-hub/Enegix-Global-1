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
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Settings, Search } from "lucide-react";
import { DockDemo } from "@/components/dock-demo";

// Contact form component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "Select a service",
  });

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (formData.service === "Select a service") {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please select a service",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      service: "Select a service",
    });

    // Show success message
    setFormStatus({
      submitted: true,
      success: true,
      message:
        "Your message has been sent successfully! We'll get back to you soon.",
    });

    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300">
      <h3 className="text-2xl font-semibold mb-6 text-white">
        Send Us A Message
      </h3>

      {formStatus && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            formStatus.success
              ? "bg-green-500/20 text-green-200 border border-green-500/30"
              : "bg-red-500/20 text-red-200 border border-red-500/30"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Phone Number"
            />
          </div>

          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Service <span className="text-red-400">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Select a service" disabled>
                Select a service
              </option>
              <option value="Web Development">Web Development</option>
              <option value="SEO Optimization">SEO Optimization</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Logo Design">Logo Design</option>
              <option value="E-commerce Solutions">E-commerce Solutions</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Subject of your message"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How can we help you?"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="py-3 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] tracking-wide text-sm"
          >
            Send Message
          </button>

          <Link
            href="https://wa.me/919608263050?text=Hi%20I%20Need%20Digital%20Marketing%20services%20for%20My%20Business"
            target="_blank"
          >
            <div className="flex items-center text-green-400 hover:text-green-300 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5 mr-2 fill-current"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>Quick Chat</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

// Contact information component
const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300">
        <h4 className="text-white text-xl font-semibold mb-6">
          Contact Information
        </h4>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Address</h4>
              <p className="text-gray-300 mb-1">House No.2, Old AG More</p>
              <p className="text-gray-300 mb-1">
                near Bharat Kitchen, above Saryu Son's Jwellers
              </p>
              <p className="text-gray-300 mb-1">Kadru, Ranchi, Jharkhand</p>
              <a
                href="https://www.google.com/maps/place/Enegix+Web+Solutions/@23.3514491,85.3163412,21z/"
                target="_blank"
                className="inline-block mt-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on map →
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <a
                href="mailto:contact@enegixwebsolutions.com"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                contact@enegixwebsolutions.com
              </a>
              <a
                href="mailto:support@enegixwebsolutions.com"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                support@enegixwebsolutions.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Call Us</h4>
              <a
                href="tel:+919608263050"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                +91 96082 63050
              </a>
              <a
                href="tel:+919801828117"
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                +91 98018 28117
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300">
        <h4 className="text-white text-xl font-semibold mb-6">
          Business Hours
        </h4>

        <ul className="space-y-4">
          <li className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-gray-300">Monday - Friday:</span>
            <span className="text-white bg-blue-500/20 px-3 py-1 rounded-full text-sm">
              10:00 AM - 7:00 PM
            </span>
          </li>
          <li className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-gray-300">Saturday (odd):</span>
            <span className="text-white bg-blue-500/20 px-3 py-1 rounded-full text-sm">
              10:00 AM - 7:00 PM
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-300">Sunday, Saturday (even):</span>
            <span className="text-red-300 bg-red-500/20 px-3 py-1 rounded-full text-sm">
              Closed
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300">
        <h4 className="text-white text-xl font-semibold ">
          Connect With Us
        </h4>

        
        <div className="flex justify-normal">
          <DockDemo />
        </div>
      </div>
    </div>
  );
};

// FAQ section component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Enegix Web Solutions offer?",
      answer:
        "We offer a comprehensive range of digital services including web design and development, e-commerce solutions, SEO optimization, digital marketing, logo design, and PPC advertising.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "The cost of a website varies depending on your specific requirements, complexity, and features needed. We offer customized solutions to fit different budgets. Contact us for a personalized quote tailored to your project.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "Project timelines vary based on complexity. A simple website might take 2-4 weeks, while more complex e-commerce or custom platforms can take 8-12 weeks. We'll provide you with a specific timeline during our initial consultation.",
    },
    {
      question: "Do you provide website maintenance services?",
      answer:
        "Yes, we offer comprehensive website maintenance packages to keep your site secure, updated, and performing optimally. This includes regular updates, security monitoring, backup services, and technical support.",
    },
    {
      question: "Can you help improve my website's search engine ranking?",
      answer:
        "Absolutely! Our SEO specialists can analyze your current performance and implement strategies to improve your search engine visibility, including on-page optimization, content enhancement, technical SEO fixes, and off-page strategies.",
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl">
      <h3 className="text-2xl font-semibold mb-8 text-white">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-white/10 rounded-lg overflow-hidden transition-all duration-300 ${
              openIndex === index ? "bg-white/10" : "bg-white/5"
            }`}
          >
            <button
              className="flex items-center justify-between w-full p-5 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-white font-medium text-lg">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-blue-400 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all max-h-0 duration-300 ${
                openIndex === index ? "max-h-96" : ""
              }`}
            >
              <div className="p-5 pt-0 text-gray-300">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Enable page scrolling
    enablePageScroll();
  }, []);

  return (
    <>
      {mounted && <ScrollFix />}
      <Navbar />

      <main className=" bg-[#0a192f]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28 px-4">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>

          <Meteors number={15} />

          <div className="container mx-auto relative pt-10 z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4">
                  Get In Touch
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl text-white lg:text-6xl font-bold leading-tight mb-6"
              >
                Let's <AuroraText>Connect</AuroraText>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8"
              >
                Have a question or want to discuss your project? We're here to
                help you transform your digital presence and achieve your
                business goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a href="tel:+919608263050">
                  <RainbowButton size="lg">Call Us Now</RainbowButton>
                </a>
                <a href="mailto:contact@enegixwebsolutions.com">
                  <RainbowButton variant="outline" size="lg">
                    Email Us
                  </RainbowButton>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0c1220] to-[#0a192f]">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full lg:w-3/5"
              >
                <ContactForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full lg:w-2/5"
              >
                <ContactInfo />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-[#0a192f] to-[#0c1220]">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Find Us <AuroraText>Here</AuroraText>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our office is conveniently located in Kadru, Ranchi. Feel free
                to stop by during business hours!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-white/10 shadow-xl h-[400px] relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.79643388708!2d85.2427698754836!3d23.344214949837785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1716470350983!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0c1220] to-[#0a192f]">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Frequently Asked <AuroraText>Questions</AuroraText>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Find answers to the most common questions about our services and
                process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <FAQ />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
          <Meteors number={10} />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0c1220]/90 to-[#0a192f]/90 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                No matter the size of your company, we're here to help you
                expand and reach new heights with our expertise and proven
                process.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+919608263050">
                  <RainbowButton size="lg">
                    Call Now: +91 96082 63050
                  </RainbowButton>
                </a>
                <a
                  href="https://wa.me/919608263050?text=Hi%20I%20Need%20Digital%20Marketing%20services%20for%20My%20Business"
                  target="_blank"
                >
                  <RainbowButton variant="outline" size="lg">
                    WhatsApp Chat
                  </RainbowButton>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      {mounted && <ScrollToTopButton />}
    </>
  );
}
