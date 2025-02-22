"use client";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-blue-50">
      {/* Left Side - Text */}
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          AI-Powered Learning,{" "}
          <span className="text-blue-600">Personalized for You.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Get the best study material recommendations tailored to your progress,
          learning style, and goals.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link href="/signup">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
          <Link href="#features">
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="mt-10 md:mt-0">
        <Image
          src="/Hero.jpeg"
          alt="Study AI"
          width={500}
          height={400}
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
