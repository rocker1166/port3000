"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 bg-black/60 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-700">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-400 tracking-wide hover:text-blue-500 transition duration-300">
        <Link href="/classroom">Classroom</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-lg font-medium">
        <a
          href="/classroom/study-materials"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-all duration-300"
        >
          📚 Study Materials
        </a>
        <a
          href="/classroom/dashboard"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-all duration-300"
        >
          📊 Dashboard
        </a>
        <a
          href="/classroom/quizzes"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-all duration-300"
        >
          🎯 Quizzes
        </a>
        <a
          href="/classroom/ai-insights"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-all duration-300"
        >
          🤖 AI Insights
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
