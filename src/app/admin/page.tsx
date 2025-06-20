"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import ScrollFix from "@/components/scroll-fix";
import { enablePageScroll } from "@/utils/scroll-helper";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("createUser");
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // User form data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    role: "",
    bio: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
    experience: 0,
    skills: [] as string[],
  });

  console.log("userData", userData);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Enable page scrolling
    enablePageScroll();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested social links
    if (name.startsWith("social_")) {
      const socialPlatform = name.split("_")[1];
      setUserData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: name === "experience" ? Number(value) : value,
      }));
    }
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      const newSkills = [...skills, skillInput];
      setSkills(newSkills);
      setUserData((prev) => ({
        ...prev,
        skills: newSkills,
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setUserData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API endpoint needs to be implemented
      const response = await axios.post("/api/users", userData);
      if (response.data.success) {
        toast.success("User created successfully!");

        // Reset form
        setUserData({
          name: "",
          email: "",
          profilePicture: "",
          role: "",
          bio: "",
          socialLinks: {
            facebook: "",
            instagram: "",
            linkedin: "",
          },
          experience: 0,
          skills: [],
        });
        setSkills([]);
      }    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to create user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {mounted && <ScrollFix />}
      <Navbar />

      <main className="bg-[#0a192f] min-h-screen pt-28">
        <section className="relative overflow-hidden py-10 px-4">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>

          <Meteors number={10} />

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Admin Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4">
                  Admin Dashboard
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <AuroraText>User Management</AuroraText>
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Create and manage users for your organization. Add team members
                  with specific roles and skills.
                </p>
              </motion.div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap justify-center mb-8 gap-4">
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "createUser"
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:border-blue-500/20"
                  }`}
                  onClick={() => setActiveTab("createUser")}
                >
                    Add New Employee
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "manageUsers"
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:border-blue-500/20"
                  }`}
                  onClick={() => setActiveTab("manageUsers")}
                >
                  Manage Employees
                </button>
              </div>

              {/* Create User Form */}
              {activeTab === "createUser" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl transition-all duration-300"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Basic Information */}
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">
                          Basic Information
                        </h2>
                      </div>

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Full Name{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Email{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="johndoe@example.com"
                        />
                      </div>

                      {/* Profile Picture */}
                      <div>
                        <label
                          htmlFor="profilePicture"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Profile Picture URL
                        </label>
                        <input
                          type="file"
                          id="profilePicture"
                          name="profilePicture"
                          value={userData.profilePicture}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/profile.jpg"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Leave blank to use default avatar
                        </p>
                      </div>

                      {/* Role */}
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Role{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={userData.role}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option className="text-gray-300" value="" disabled>
                            Select Role
                          </option>
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                          <option value="Project Manager">Project Manager</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Admin">Admin</option>
                          <option value="Content Creator">Content Creator</option>
                        </select>
                      </div>

                      {/* Bio */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={userData.bio}
                          onChange={handleChange}
                          rows={3}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Brief description about this team member..."
                        />
                      </div>

                      {/* Social Links */}
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">
                          Social Links
                        </h2>
                      </div>

                      {/* Facebook */}
                      <div>
                        <label
                          htmlFor="social_facebook"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Facebook URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            id="social_facebook"
                            name="social_facebook"
                            value={userData.socialLinks.facebook}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                      </div>

                      {/* Instagram */}
                      <div>
                        <label
                          htmlFor="social_instagram"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Instagram URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-pink-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            id="social_instagram"
                            name="social_instagram"
                            value={userData.socialLinks.instagram}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="social_linkedin"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          LinkedIn URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            id="social_linkedin"
                            name="social_linkedin"
                            value={userData.socialLinks.linkedin}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>

                      {/* Professional Info */}
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">
                          Professional Information
                        </h2>
                      </div>

                      {/* Experience */}
                      <div>
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          id="experience"
                          name="experience"
                          value={userData.experience}
                          onChange={handleChange}
                          min="0"
                          max="50"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="5"
                        />
                      </div>

                      {/* Skills */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="skills"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Skills
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="skills"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add skill (e.g., React, UI/UX, Marketing)"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>

                        {skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1"
                              >
                                {skill}
                                <button 
                                 title='skill'
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="p-1 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="py-3 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] tracking-wide text-sm flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating User...
                          </>
                        ) : (
                          "Create User"
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Manage Users Tab */}
              {activeTab === "manageUsers" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl transition-all duration-300"
                >
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      User Management
                    </h3>
                    <p className="text-gray-300 mb-6">
                      View, edit and manage all users from this section. This
                      feature will be implemented soon.
                    </p>
                    <div className="flex justify-center">
                      <RainbowButton variant="outline" size="lg">
                        Coming Soon
                      </RainbowButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}