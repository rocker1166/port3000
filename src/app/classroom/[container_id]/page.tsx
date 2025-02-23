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
  Video, // Keep Video icon for Lesson Content Placeholder
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

// Upload Study Material Component (No changes needed from previous good version)
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
        <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:bg-zinc-800">
          <FilePlus className="h-4 w-4 mr-2 text-blue-400" />
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100 border-zinc-700">
        <DialogHeader>
          <DialogTitle>Upload Study Materials</DialogTitle>
          <DialogDescription>
            Drag and drop files or click to browse. Add notes for context.
          </DialogDescription>
        </DialogHeader>
        <div
          className="border-dashed border-2 border-zinc-600 rounded-md p-4 text-center cursor-pointer mb-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-zinc-400">Drop files here</p>
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
              className="mt-2 bg-zinc-700 border-zinc-600 hover:bg-zinc-600 text-zinc-300"
            >
              Browse Files
            </Button>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-zinc-300 mb-1">
              Selected Files:
            </h4>
            <ul className="text-xs text-zinc-400 list-disc list-inside">
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
          className="min-h-[80px] bg-zinc-700 border-zinc-600 focus:border-blue-400 mb-4 text-zinc-300"
        />
        <Button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Left Sidebar Component (Modified - Removed video/practice buttons)
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



// Lesson Tab Content Component (No changes needed from previous good version)
const LessonTabContent = () => (
  <Card className="bg-zinc-800 border-zinc-700">
    <CardContent className="p-6">
      <h1>Lesson: 3D Structure Representations</h1>
      <div className="aspect-video my-4 bg-zinc-900 rounded-lg flex items-center justify-center mb-4">
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
      <h3 className="text-xl font-semibold mb-2 text-zinc-100">
        Representations of 3D structures
      </h3>
      <p className="text-zinc-400">
        Learn about different ways to represent 3D molecular structures
        including Wedge, Dash, and Fischer Projections.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-zinc-900 p-4 rounded-lg">
          <Lightbulb className="h-5 w-5 text-yellow-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Key Concepts</h4>
          <p className="text-xs text-zinc-400">12 concepts to master</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <Award className="h-5 w-5 text-purple-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Achievements</h4>
          <p className="text-xs text-zinc-400">3 available</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <BrainCircuit className="h-5 w-5 text-blue-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Practice</h4>
          <p className="text-xs text-zinc-400">15 questions</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <BookOpenCheck className="h-5 w-5 text-green-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Reading Material</h4>
          <p className="text-xs text-zinc-400">5 articles</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <Calculator className="h-5 w-5 text-red-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Exercises</h4>
          <p className="text-xs text-zinc-400">10 exercises</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <FlaskConical className="h-5 w-5 text-pink-400 mb-2" />
          <h4 className="font-medium mb-1 text-zinc-300">Experiments</h4>
          <p className="text-xs text-zinc-400">3 experiments</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Practice Tab Content Component (No changes needed from previous good version)

// Resources Tab Content Component (No changes needed from previous good version)
const ResourcesTabContent = () => (
  <Card className="bg-zinc-800 border-zinc-700">
    <CardContent className="p-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-zinc-100">
        Additional Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 rounded-lg flex gap-4">
          <File className="h-6 w-6 text-blue-400 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1 text-zinc-300">Resource Name 1</h4>
            <p className="text-xs text-zinc-400">
              Description of the resource (link, PDF, etc.).
            </p>
            <a href="#" className="text-blue-400 hover:underline text-xs">
              View Resource
            </a>
          </div>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg flex gap-4">
          <File className="h-6 w-6 text-blue-400 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1 text-zinc-300">Resource Name 2</h4>
            <p className="text-xs text-zinc-400">
              Description of the resource (link, PDF, etc.).
            </p>
            <a href="#" className="text-blue-400 hover:underline text-xs">
              View Resource
            </a>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Notes Tab Content Component (No changes needed from previous good version)



// Main Content Component (No changes needed from previous good version)
interface MainContentProps {
    children: React.ReactNode;
}
const MainContent:React.FC<MainContentProps> = ({children}) => {
    return(
        <main className=" bg-zinc-900 overflow-auto flex-1">
          <div className="p-6 max-w-3xl mx-auto">
             {children}
          </div>
        </main>
    )
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
<div>
  
  <Navbar />
  <div className="h-screen   py-14 text-zinc-100 flex">
    {/* Sidebar (Fixed Width, Responsive) */}
    <aside className="w-64 md:w-72 lg:w-80  h-full p-4 flex-shrink-0">
      <LeftSidebar progress={progress} timeSpent={timeSpent} topics={topics} formatTime={formatTime} />
    </aside>

    {/* Main Content (Only this part is scrollable) */}
    <main className="flex-1 flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-100">3D Structure and Isomerism</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-zinc-300">2.5k XP</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full">
            <Calendar className="h-4 w-4 text-green-400" />
            <span className="text-sm text-zinc-300">8 Day Streak</span>
          </div>
          <AIChatbotSheet onAIChatbotClick={() => console.log("AI Chatbot Clicked")} />
        </div>
      </div>
     

      {/* Tabs Section */}
      <Tabs defaultValue="lesson">
        <TabsList className="bg-zinc-800 rounded-lg p-1 flex gap-2">
          <TabsTrigger value="lesson" className="text-zinc-300 flex-1 text-center py-2">Lesson</TabsTrigger>
          <TabsTrigger value="practice" className="text-zinc-300 flex-1 text-center py-2">Practice</TabsTrigger>
          <TabsTrigger value="resources" className="text-zinc-300 flex-1 text-center py-2">Resources</TabsTrigger>
          <TabsTrigger value="notes" className="text-zinc-300 flex-1 text-center py-2">Notes</TabsTrigger>
        </TabsList>
        <div className="mt-4">
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

      {/* Navigation Buttons */}
    <div className="flex items-center justify-between mt-6">
      <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous Lesson
      </Button>
      <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300">
        Next Lesson
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
    </main>
  </div>
</div>



  );
}