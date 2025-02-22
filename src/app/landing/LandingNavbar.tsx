"use client";
import { useState } from "react";
import Link from "next/link";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-600 tracking-wide">
        <Link href="/">StudyAI</Link>
      </div>

      {/* Navbar Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <a href="#features" onClick={(e) => handleScroll(e, "features")} className="text-gray-700 hover:text-blue-600 transition">
          Features
        </a>
        <a href="#how-it-works" onClick={(e) => handleScroll(e, "how-it-works")} className="text-gray-700 hover:text-blue-600 transition">
          How It Works
        </a>
        <a href="#testimonials" onClick={(e) => handleScroll(e, "testimonials")} className="text-gray-700 hover:text-blue-600 transition">
          Testimonials
        </a>
        <a href="#cta" onClick={(e) => handleScroll(e, "cta")} className="text-gray-700 hover:text-blue-600 transition">
          Get Started
        </a>
      </div>

      {/* Login / Sign Up Buttons */}
      <div className="space-x-4 flex items-center">
        <Link href="/login">
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
