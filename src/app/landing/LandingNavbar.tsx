//src>app>landing>LandingNavbar.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close mobile menu after clicking a link
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#1c2a40] via-[#1f3d60] to-[#2c3e50] text-white py-4 px-8 flex justify-between items-center z-50 shadow-lg border-b-4 border-blue-500">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-400 tracking-wide">
        <Link href="/">StudyAI</Link>
      </div>

      {/* Navbar Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <motion.a
          href="#features"
          onClick={(e) => handleScroll(e, "features")}
          className="text-white relative group hover:text-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Features
          <motion.div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></motion.div>
        </motion.a>
        <motion.a
          href="#how-it-works"
          onClick={(e) => handleScroll(e, "how-it-works")}
          className="text-white relative group hover:text-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          How It Works
          <motion.div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></motion.div>
        </motion.a>
        <motion.a
          href="#testimonials"
          onClick={(e) => handleScroll(e, "testimonials")}
          className="text-white relative group hover:text-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Testimonials
          <motion.div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></motion.div>
        </motion.a>
        <motion.a
          href="#cta"
          onClick={(e) => handleScroll(e, "cta")}
          className="text-white relative group hover:text-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
          <motion.div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></motion.div>
        </motion.a>
      </div>

      {/* Login / Sign Up Buttons */}
      <div className="space-x-4 flex items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href="/login">
            <button className="border bg-white border-blue-500 text-blue-500 px-5 py-2 rounded-full font-medium hover:bg-blue-400 hover:text-white transition duration-300">
              LOGIN
            </button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href="/signup">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-500 transition duration-300">
              SIGN UP
            </button>
          </Link>
        </motion.div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
