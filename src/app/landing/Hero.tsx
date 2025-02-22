"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 min-h-screen bg-[#0c1022] text-white overflow-hidden">
      {/* Left Side - Text */}
      <div className="max-w-2xl">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* ✅ Fix: Reserve space to prevent movement */}
          <span className="text-white inline-block min-w-[190px] text-left">
            <Typewriter
              words={[
                "Supercharge",
                "Enhance",
                "Boost",
                "Optimize",
                "Elevate",
                "Empower",
                "Revolutionize",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={100} // ⏳ Natural typing speed
              deleteSpeed={70} // 🔥 Smooth erasing
              delaySpeed={2500} // 🕒 Better readability
            />
          </span>
          Your Learning <br />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Experience
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          AI-powered study tools, personalized recommendations, and real-time insights to help you ace every subject.
        </motion.p>

        <motion.div
          className="mt-8 flex space-x-6 justify-center md:justify-start"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link href="/signup">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition duration-300">
              Get Started
            </button>
          </Link>
          <Link href="#features">
            <button className="border border-white text-white px-8 py-4 rounded-full text-lg font-medium bg-opacity-30 backdrop-blur-md hover:bg-white hover:text-blue-600 transition duration-300">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        className="mt-12 md:mt-0 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        <Image
          src="/Hero.jpeg"
          alt="Study AI"
          width={500}
          height={500}
          priority
          className="drop-shadow-lg rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
