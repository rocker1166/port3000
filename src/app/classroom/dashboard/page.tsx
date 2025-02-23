

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Book,
  FileText,
  BarChart,
  Zap,
  X,
  Menu,
  Search,
  Calendar,
  ArrowRight,
  Star,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Video,
  FileQuestion,
  Clock,
  Trophy,
  MessageSquare,
  Info,
  BookmarkPlus,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
// Mock data for the roadmap and study materials
const roadmapData = [
  {
    id: "1",
    title: "Introduction to Blockchain",
    description: "Start with the basics of Blockchain technology.",
    completed: false,
    subModules: [
      { id: "1.1", title: "What is Blockchain?", completed: false },
      { id: "1.2", title: "How Blockchain Works?", completed: false },
    ],
  },
  {
    id: "2",
    title: "Advanced Blockchain Concepts",
    description: "Learn about smart contracts and decentralized applications.",
    completed: false,
    subModules: [
      { id: "2.1", title: "Smart Contracts", completed: false },
      { id: "2.2", title: "DApps", completed: false },
    ],
  },
];


const studyMaterials = [
  {
    id: "1",
    title: "Blockchain Basics",
    difficulty: "Beginner" as "Beginner",
    icon: Book,
    time: "5 min",
    views: 1200,
    progress: 60,
    rating: "4.5/5",
  },
  {
    id: "2",
    title: "Ethereum Smart Contracts",
    difficulty: "Intermediate" as "Intermediate",
    icon: FileText,
    time: "10 min",
    views: 1500,
    progress: 45,
    rating: "4.7/5",
  },
];

const RoadmapConnection = () => (
  <div className="absolute left-6 w-px h-full bg-gray-600 -z-10" />
);

interface StudyMaterial {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: React.ElementType;
  time: string;
  views: number;
  progress: number;
  rating: string;
}

const StudyMaterialCard = ({ material }: { material: StudyMaterial }) => {
  const difficultyColors = {
    Beginner: "bg-green-500/20 text-green-400",
    Intermediate: "bg-yellow-500/20 text-yellow-400",
    Advanced: "bg-red-500/20 text-red-400",
  };

  const MaterialIcon = material.icon; // Dynamically set the icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all cursor-pointer border border-gray-700/50"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <MaterialIcon className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {material.title}
            </h3>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                difficultyColors[material.difficulty]
              }`}
            >
              {material.difficulty}
            </span>
          </div>
        </div>
        <BookmarkPlus
          className="text-gray-400 hover:text-white cursor-pointer"
          size={20}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Clock size={14} />
          <span>{material.time}</span>
          <span className="mx-2">•</span>
          <span>{material.views.toLocaleString()} views</span>
        </div>

        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${material.progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-400" size={16} />
            <span className="text-sm font-medium">{material.rating}</span>
          </div>
          <button title="fh" className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
            Start Learning
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface RoadmapNodeProps {
  node: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    subModules: { id: string; title: string; completed: boolean }[];
  };
  expanded: boolean;
  onToggle: (id: string) => void;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  node,
  expanded,
  onToggle,
}) => {
  return (
    <div className="relative mb-6">
      <RoadmapConnection />
      <div
        className={`relative z-10 p-5 rounded-xl cursor-pointer transition-all border ${
          node.completed
            ? "bg-green-500/20 border-green-500/30 hover:bg-green-500/30"
            : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
        }`}
        onClick={() => onToggle(node.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                node.completed ? "bg-green-500/20" : "bg-gray-700/50"
              }`}
            >
              {node.completed ? (
                <CheckCircle size={20} className="text-green-400" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-white">{node.title}</h4>
              <p className="text-sm text-gray-400">{node.description}</p>
            </div>
          </div>
          <ChevronRight
            size={20}
            className={`transform transition-transform ${
              expanded ? "rotate-90" : ""
            } text-gray-400`}
          />
        </div>
      </div>

      {expanded && (
        <div className="ml-12 mt-4 space-y-3">
          {node.subModules.map((subModule) => (
            <div
              key={subModule.id}
              className={`p-4 rounded-lg border ${
                subModule.completed
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-gray-800/30 border-gray-700/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                {subModule.completed ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500" />
                )}
                <span className="text-sm">{subModule.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StudyMaterialsPage = () => {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State management for expanded roadmap nodes
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(id)) {
        newExpandedNodes.delete(id);
      } else {
        newExpandedNodes.add(id);
      }
      return newExpandedNodes;
    });
  };


  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-[#162447] text-white w-64 fixed h-full transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">
            <input
              type="text"
              placeholder="Search"
              className="w-48 pl-6 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
          </h1>
          <button title="nf" onClick={() => setIsSidebarOpen(false)}></button>
        </div>
        <ul className="p-4 space-y-4">
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <LayoutDashboard /> Dashboard
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <Book /> Subjects
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FileText /> Study Materials
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <BarChart /> Progress & Analytics
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <Zap /> Quizzes & Challenges
          </li>
        </ul>
      </div>

      {/* Hamburger Menu Button */}
      <div className="absolute top-4 left-1 z-50">
        <button
          title="nf"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`max-w-[1800px] mx-auto px-8 py-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Input and Buttons */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl"></div>
              <div className="relative left-2">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="What would you like to learn? (e.g., Blockchain)"
                  className="w-full pl-14 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={24}
                />
                <label htmlFor="duration-select" className="sr-only">Select Duration</label>
                <select id="duration-select" className="w-full pl-14 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 appearance-none">
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                </select>
                <ChevronRight
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <button onClick={() => router.push('/creategoal') }  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-colors shadow-lg shadow-blue-500/20">
              <span>Generate Learning Path</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Interactive Roadmap */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Learning Roadmap</h2>
                <button className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors" title="Bookmark">
                  <BookmarkPlus size={20} className="text-gray-300" />
                </button>
              </div>
              <div className="relative">
                {roadmapData.map((node) => (
                  <RoadmapNode
                    key={node.id}
                    node={node}
                    expanded={expandedNodes.has(node.id)}
                    onToggle={toggleNode}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Study Materials */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Recommended Materials</h2>
                <div className="flex items-center space-x-4">
                  <button className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors" title="Filter">
                    <Filter size={20} className="text-gray-300" />
                  </button>
                  <label htmlFor="sort-select" className="sr-only">Sort Options</label>
                  <select id="sort-select" className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm border border-gray-600">
                    <option>Sort: Recommended</option>
                    <option>Most Popular</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {studyMaterials.map((material) => (
                  <StudyMaterialCard key={material.id} material={material} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
