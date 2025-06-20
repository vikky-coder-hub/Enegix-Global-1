"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import ScrollFix from "@/components/scroll-fix";
import { enablePageScroll } from "@/utils/scroll-helper";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Enable page scrolling
    enablePageScroll();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post("/api/admin/login", formData);
      if(response.data.success ) {
        toast.success("Login successful! Redirecting to admin dashboard...");
        router.push("/admin")
    }    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {mounted && <ScrollFix />}
      
      <main className=" min-h-screen bg-[#0a192f]">
        <section className="relative overflow-hidden  md:py-10 px-4">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <Meteors number={10} />
          
          <div className="container mx-auto relative z-10 max-w-md">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4">
                  Admin Portal
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
              >
                <AuroraText>Admin Login</AuroraText>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8"
              >
                Please enter your credentials to access the admin dashboard
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="flex justify-center mb-8">
                  <div className="relative w-40 h-15">
                    <Image
                      src="/newlogo.png"
                      alt="Enegix Web Solutions"
                      fill
                      className=" object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="p-4 mb-6 rounded-lg bg-red-500/20 text-red-200 border border-red-500/30">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
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
                        placeholder="admin@enegixwebsolutions.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] tracking-wide text-sm flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </>
                    ) : "Login to Dashboard"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </>
  );
}


