//src/app/landing/features/page.tsx

import { FaBrain, FaBookOpen, FaLightbulb, FaClock } from "react-icons/fa";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaBrain className="text-4xl text-blue-500" />,
      title: "AI-Powered Learning",
      description: "Get study recommendations tailored to your strengths and weaknesses.",
    },
    {
      icon: <FaBookOpen className="text-4xl text-green-500" />,
      title: "Comprehensive Study Materials",
      description: "Access a vast collection of resources, including notes, videos, and quizzes.",
    },
    {
      icon: <FaLightbulb className="text-4xl text-yellow-500" />,
      title: "Personalized Study Plans",
      description: "Follow customized plans to improve your efficiency and retention.",
    },
    {
      icon: <FaClock className="text-4xl text-purple-500" />,
      title: "Progress Tracking",
      description: "Monitor your study progress and get real-time feedback.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
        <p className="text-gray-600 mt-2">
          Unlock the full potential of AI-driven education with these powerful features.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
