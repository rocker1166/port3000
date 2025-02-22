"use client";
import Link from "next/link";

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-600 tracking-wide">
        <Link href="/">StudyAI</Link>
      </div>

      {/* Navbar Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <Link href="/#features" className="text-gray-700 hover:text-blue-600 transition">
          Features
        </Link>
        <Link href="/#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
          How It Works
        </Link>
        <Link href="/#testimonials" className="text-gray-700 hover:text-blue-600 transition">
          Testimonials
        </Link>
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
