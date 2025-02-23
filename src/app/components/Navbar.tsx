//src>app>components>Navbar.tsx

"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-700">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-400 tracking-wide">
        <Link href="/classroom">Classroom</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-lg font-medium">
        <Link
          href="/classroom/home"
          className="hover:text-blue-400 transition-all duration-300"
        >
          Home
        </Link>
        <Link
          href="/classroom/study-materials"
          className="hover:text-blue-400 transition-all duration-300"
        >
          Study Materials
        </Link>
        <Link
          href="/classroom/dashboard"
          className="hover:text-blue-400 transition-all duration-300"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
