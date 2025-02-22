// src/app/classroom/dashboard>page.tsx

"use client";
import { Star } from "lucide-react";

const Dashboard = () => {
  // Mock user data (Replace with actual API data in the future)
  const userName = "Debarati";
  const progress = 65; // Example: 65% progress
  const recommendedStudy = "Introduction to Calculus";
  const difficultyLevel = "Intermediate";

  const studyMaterials = [
    {
      id: 1,
      title: "Algebra Basics - Video 1",
      type: "Video",
      difficulty: "Beginner",
      time: "15 min",
      progress: 80,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Trigonometry Fundamentals - PDF",
      type: "PDF",
      difficulty: "Intermediate",
      time: "30 min",
      progress: 40,
      rating: 4.2,
    },
    {
      id: 3,
      title: "Derivatives Explained - Quiz",
      type: "Quiz",
      difficulty: "Advanced",
      time: "10 min",
      progress: 20,
      rating: 4.8,
    },
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 dark:bg-[#1a1a2e] text-gray-900 dark:text-white p-6">
      {/* Hero Section */}
      <div className="bg-white dark:bg-[#162447] shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <span className="text-lg font-medium">Progress: {progress}%</span>
          <div className="w-32 bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      <div className="bg-white dark:bg-[#162447] shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold">📌 Recommended for You</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Based on your last session, you should study:
        </p>
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">{recommendedStudy}</h3>
          <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            {difficultyLevel}
          </span>
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          Continue Learning
        </button>
      </div>

      {/* Study Materials Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📚 Study Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studyMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white dark:bg-[#162447] shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{material.title}</h3>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm font-medium rounded">
                  {material.type}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Difficulty:{" "}
                <span className="font-medium text-blue-500">
                  {material.difficulty}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Estimated Time: {material.time}
              </p>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-500">
                  <Star size={16} />
                </span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {material.rating} Stars
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 mt-3">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${material.progress}%` }}
                ></div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                Quick Preview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
