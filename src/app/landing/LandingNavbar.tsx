//src>app>landing>LandingNavbar.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function (still works in LandingPage)
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#1c2a40] via-[#1f3d60] to-[#2c3e50] text-white py-4 px-8 flex justify-between items-center z-50 shadow-lg border-b-4 border-blue-500">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-400 tracking-wide">
        <Link href="/">StudyAI</Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        {["features", "how-it-works", "faqs", "cta"].map((item) => (
          <Link
            key={item}
            href={`#${item}`}
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            {item.replace("-", " ").toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Login / Sign Up / Classroom Buttons */}
      <div className="hidden md:flex space-x-4 items-center">
        <Link href="/login">
          <button className="border bg-white border-blue-500 text-blue-500 px-5 py-2 rounded-full font-medium hover:bg-blue-400 hover:text-white transition duration-300">
            LOGIN
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300">
            SIGN UP
          </button>
        </Link>
        {/* CLASSROOM Button */}
        <Link href="/classroom">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300">
            CLASSROOM
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#1f3d60] shadow-lg flex flex-col items-center space-y-6 py-6">
          {["features", "how-it-works", "faqs", "cta"].map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300"
            >
              {item.replace("-", " ").toUpperCase()}
            </Link>
          ))}

          <Link href="/login">
            <button className="border bg-white border-blue-500 text-blue-500 px-5 py-2 rounded-full font-medium hover:bg-blue-400 hover:text-white transition duration-300">
              LOGIN
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300">
              SIGN UP
            </button>
          </Link>

          <Link href="/classroom">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300">
              CLASSROOM
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
