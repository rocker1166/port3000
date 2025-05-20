"use client";

import * as React from "react";
import {
  Trophy,
  Calendar,
  Play,
  BrainCircuit,
  GraduationCap,
  BookOpenCheck,
  Calculator,
  FlaskConical,
  Award,
  PenTool,
  GanttChartSquare,
  Lightbulb,
  Dices,
  FilePlus,
  Clock,
  List,
  File,
  CheckSquare,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PracticeTabContent from "@/components/studyzone/PracticeTab";
import Navbar from "@/app/components/Navbar";
import LeftSidebar from "@/components/studyzone/Leftsidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { AIChatbotSheet } from "@/app/components/chat/Chatbutton";
import Note from "@/components/MakeNOte";

// --- Components ---

// Upload Study Material Component
const UploadStudyMaterial = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [notes, setNotes] = React.useState("");

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles([...files, ...Array.from(event.dataTransfer.files)]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleUpload = () => {
    console.log("Uploading:", files, "Notes:", notes);
    setFiles([]);
    setNotes("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-cyan-300 hover:bg-zinc-800 hover:bg-opacity-60 transition-all duration-300"
        >
          <FilePlus className="h-4 w-4 mr-2 text-cyan-400" />
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-cyan-100 border-cyan-800 shadow-lg shadow-cyan-900/20 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-cyan-300">
            Upload Study Materials
          </DialogTitle>
          <DialogDescription className="text-cyan-400/70">
            Drag and drop files or click to browse. Add notes for context.
          </DialogDescription>
        </DialogHeader>
        <div
          className="border-dashed border-2 border-cyan-700/50 rounded-md p-4 text-center cursor-pointer mb-4 hover:border-cyan-500/80 transition-colors duration-300"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-cyan-400/70">Drop files here</p>
          <input
            type="file"
            multiple
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput">
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-zinc-800 border-cyan-700 hover:bg-zinc-700 hover:border-cyan-500 text-cyan-300 transition-all duration-300"
            >
              Browse Files
            </Button>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-cyan-300 mb-1">
              Selected Files:
            </h4>
            <ul className="text-xs text-cyan-400/70 list-disc list-inside">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <Textarea
          placeholder="Add notes about the materials..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px] bg-zinc-800 border-cyan-800/50 focus:border-cyan-500 mb-4 text-cyan-300 placeholder:text-cyan-600/50"
        />
        <Button
          onClick={handleUpload}
          className="w-full bg-cyan-700 hover:bg-cyan-600 text-zinc-100 shadow-md shadow-cyan-900/30 hover:shadow-cyan-800/50 transition-all duration-300"
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Left Sidebar Component (Modified)
interface LeftSidebarProps {
  progress: number;
  timeSpent: number;
  topics: {
    title: string;
    duration: string;
    hasVideo: boolean;
    practiceQuestions: number;
    completed: boolean;
  }[];
  formatTime: (minutes: number) => string;
}

// Define the left sidebar component that will be imported from elsewhere
const LeftSidebarComponent: React.FC<LeftSidebarProps> = ({
  progress,
  timeSpent,
  topics,
  formatTime,
}) => {
  return (
    <div className="h-full flex flex-col bg-zinc-900 border-r border-cyan-900/30 rounded-lg overflow-hidden shadow-lg shadow-cyan-900/10">
      <div className="p-4 bg-gradient-to-b from-zinc-800 to-zinc-900 border-b border-cyan-900/30">
        <h2 className="text-lg font-bold text-cyan-300 flex items-center mb-2">
          <GraduationCap className="mr-2 h-5 w-5 text-cyan-400" />
          Chemistry 101
        </h2>
        <div className="flex items-center justify-between text-xs text-cyan-400/70 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-zinc-700">
          <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" />
        </Progress>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-zinc-800 p-2 rounded-lg border border-cyan-900/30">
            <div className="flex items-center text-xs text-cyan-400/70">
              <Clock className="h-3 w-3 mr-1" />
              Time Spent
            </div>
            <p className="font-medium text-cyan-300">{formatTime(timeSpent)}</p>
          </div>
          <div className="bg-zinc-800 p-2 rounded-lg border border-cyan-900/30">
            <div className="flex items-center text-xs text-cyan-400/70">
              <List className="h-3 w-3 mr-1" />
              Topics
            </div>
            <p className="font-medium text-cyan-300">{topics.length}</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-cyan-900/30">
        <h3 className="text-sm font-semibold text-cyan-300 mb-2">Topics</h3>
        <ScrollArea className="h-64 pr-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="mb-3 bg-zinc-800 rounded-lg p-3 border border-cyan-900/30 hover:border-cyan-700/50 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-cyan-300 flex-1">
                  {topic.title}
                </h4>
                {topic.completed ? (
                  <CheckCircle className="h-4 w-4 text-cyan-400" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-cyan-700/50" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-cyan-400/70">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {topic.duration}
                </span>
                {topic.hasVideo && (
                  <span className="flex items-center">
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center text-xs text-cyan-400/70">
                <BrainCircuit className="h-3 w-3 mr-1" />
                <span>{topic.practiceQuestions} practice questions</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="p-4 flex flex-col space-y-1">
        <h3 className="text-sm font-semibold text-cyan-300 mb-2">Tools</h3>
        <UploadStudyMaterial />
        <Button
          variant="ghost"
          className="w-full justify-start text-cyan-300 hover:bg-zinc-800 hover:bg-opacity-60 transition-all duration-300"
        >
          <PenTool className="h-4 w-4 mr-2 text-cyan-400" />
          Quick Notes
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-cyan-300 hover:bg-zinc-800 hover:bg-opacity-60 transition-all duration-300"
        >
          <GanttChartSquare className="h-4 w-4 mr-2 text-cyan-400" />
          Study Planner
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-cyan-300 hover:bg-zinc-800 hover:bg-opacity-60 transition-all duration-300"
        >
          <Dices className="h-4 w-4 mr-2 text-cyan-400" />
          Random Quiz
        </Button>
      </div>
    </div>
  );
};

// Lesson Tab Content Component
const LessonTabContent = () => (
  <Card className="bg-zinc-900 border-cyan-900/30 shadow-lg shadow-cyan-900/10 overflow-hidden">
    <CardContent className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-4">
        Lesson: 3D Structure Representations
      </h1>
      <div className="aspect-video my-4 bg-zinc-950 rounded-lg flex items-center justify-center mb-6 overflow-hidden border border-cyan-900/30">
        {/* Placeholder for Video Player */}
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/Hb9QvSODBPY?si=Hiosp_T73LGJR-V9"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-cyan-300">
        Representations of 3D structures
      </h3>
      <p className="text-cyan-400/70 mb-6">
        Learn about different ways to represent 3D molecular structures
        including Wedge, Dash, and Fischer Projections.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <Lightbulb className="h-5 w-5 text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Key Concepts</h4>
          <p className="text-xs text-cyan-400/70">12 concepts to master</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <Award className="h-5 w-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Achievements</h4>
          <p className="text-xs text-cyan-400/70">3 available</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <BrainCircuit className="h-5 w-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Practice</h4>
          <p className="text-xs text-cyan-400/70">15 questions</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <BookOpenCheck className="h-5 w-5 text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Reading Material</h4>
          <p className="text-xs text-cyan-400/70">5 articles</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <Calculator className="h-5 w-5 text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Exercises</h4>
          <p className="text-xs text-cyan-400/70">10 exercises</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <FlaskConical className="h-5 w-5 text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="font-medium mb-1 text-cyan-300">Experiments</h4>
          <p className="text-xs text-cyan-400/70">3 experiments</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Resources Tab Content Component
const ResourcesTabContent = () => (
  <Card className="bg-zinc-900 border-cyan-900/30 shadow-lg shadow-cyan-900/10">
    <CardContent className="p-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">
        Additional Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <File className="h-6 w-6 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h4 className="font-medium mb-1 text-cyan-300">Resource Name 1</h4>
            <p className="text-xs text-cyan-400/70 mb-2">
              Description of the resource (link, PDF, etc.).
            </p>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 hover:underline text-xs inline-flex items-center"
            >
              View Resource
              <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 border border-cyan-900/30 hover:border-cyan-700/50 transition-all duration-300 group">
          <File className="h-6 w-6 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h4 className="font-medium mb-1 text-cyan-300">Resource Name 2</h4>
            <p className="text-xs text-cyan-400/70 mb-2">
              Description of the resource (link, PDF, etc.).
            </p>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 hover:underline text-xs inline-flex items-center"
            >
              View Resource
              <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Content Component
interface MainContentProps {
  children: React.ReactNode;
}
const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="bg-zinc-900 overflow-auto flex-1">
      <div className="p-6 max-w-3xl mx-auto">{children}</div>
    </main>
  );
};

// --- Main StudyZone Component ---

export default function StudyZone() {
  const [progress] = React.useState(65);
  const [timeSpent, setTimeSpent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 60000); // Increment every minute

    return () => clearInterval(timer); // Clear timer on unmount
  }, []);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  const topics = [
    {
      title: "Representations of 3D structures",
      duration: "2 days",
      hasVideo: true,
      practiceQuestions: 12,
      completed: false,
    },
    {
      title: "Introduction to Isomers",
      duration: "2 days",
      hasVideo: true,
      practiceQuestions: 15,
      completed: false,
    },
    {
      title: "Chirality and Stereoisomers",
      duration: "3 days",
      hasVideo: false,
      practiceQuestions: 20,
      completed: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-cyan-100">
      <Navbar />

      {/* Main Layout - Fixed the double scrollbar issue */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* Sidebar (Fixed Width, Responsive) */}
        <aside className="w-64 md:w-72 lg:w-80 p-4 overflow-hidden flex-shrink-0">
          <LeftSidebarComponent
            progress={progress}
            timeSpent={timeSpent}
            topics={topics}
            formatTime={formatTime}
          />
        </aside>

        {/* Main Content (Only this part is scrollable) */}
        <main className="flex-1 overflow-y-auto flex justify-center py-4">
          <div className="p-6 max-w-4xl w-full flex flex-col items-center">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 w-full">
              <h2 className="text-2xl font-bold text-cyan-300 flex items-center">
                <span className="mr-2 text-cyan-500 text-3xl">&gt;</span>
                3D Structure and Isomerism
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full border border-cyan-900/30">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-cyan-300">2.5k XP</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full border border-cyan-900/30">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300">8 Day Streak</span>
                </div>
                <AIChatbotSheet
                  onAIChatbotClick={() => console.log("AI Chatbot Clicked")}
                />
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="lesson" className="w-full">
              <TabsList className="bg-zinc-800 rounded-lg p-1 flex gap-2 border border-cyan-900/30">
                <TabsTrigger
                  value="lesson"
                  className="text-cyan-300 flex-1 text-center py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-cyan-100 data-[state=active]:shadow-md data-[state=active]:shadow-cyan-900/20 transition-all duration-300"
                >
                  Lesson
                </TabsTrigger>
                <TabsTrigger
                  value="practice"
                  className="text-cyan-300 flex-1 text-center py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-cyan-100 data-[state=active]:shadow-md data-[state=active]:shadow-cyan-900/20 transition-all duration-300"
                >
                  Practice
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="text-cyan-300 flex-1 text-center py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-cyan-100 data-[state=active]:shadow-md data-[state=active]:shadow-cyan-900/20 transition-all duration-300"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="text-cyan-300 flex-1 text-center py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-cyan-100 data-[state=active]:shadow-md data-[state=active]:shadow-cyan-900/20 transition-all duration-300"
                >
                  Notes
                </TabsTrigger>
              </TabsList>
              <div className="mt-4 w-full">
                <TabsContent value="lesson">
                  <LessonTabContent />
                </TabsContent>
                <TabsContent value="practice">
                  <PracticeTabContent />
                </TabsContent>
                <TabsContent value="resources">
                  <ResourcesTabContent />
                </TabsContent>
                <TabsContent value="notes">
                  <Note />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex items-center justify-between mt-6 w-full pb-3">
              <Button
                variant="outline"
                className="bg-zinc-800 border-cyan-900/30 hover:bg-zinc-700 hover:border-cyan-700 text-cyan-300 group transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Previous Lesson
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800 border-cyan-900/30 hover:bg-zinc-700 hover:border-cyan-700 text-cyan-300 group transition-all duration-300"
              >
                Next Lesson
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
