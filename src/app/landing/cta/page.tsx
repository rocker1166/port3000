//src/app/landing/cta/page.tsx

import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="py-16 bg-blue-600 text-center text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Ready to Boost Your Learning?</h2>
        <p className="mt-2 text-lg">
          Join StudyAI today and get personalized study recommendations powered by AI.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link href="/signup">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
