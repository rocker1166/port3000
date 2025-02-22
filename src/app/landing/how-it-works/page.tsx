import { FaUserGraduate, FaRobot, FaChartLine } from "react-icons/fa";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <FaUserGraduate className="text-4xl text-blue-500" />,
      title: "Sign Up & Set Goals",
      description:
        "Create your profile and set your learning preferences to get started.",
    },
    {
      icon: <FaRobot className="text-4xl text-green-500" />,
      title: "Get AI-Powered Recommendations",
      description:
        "Our AI analyzes your progress and suggests personalized study materials.",
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-500" />,
      title: "Track & Improve",
      description:
        "Monitor your learning progress and get real-time feedback to stay on track.",
    },
  ];

  return (
    <section id="how-it-works" className="min-h-screen flex flex-col items-center justify-center py-16 bg-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="text-gray-600 mt-2">
          Follow these three simple steps to enhance your learning journey.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
