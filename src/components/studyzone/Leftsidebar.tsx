import * as React from "react";
import {
  Trophy,
  Clock,
  FlaskConical,
  GanttChartSquare,
  Badge,
  CheckCircle,
  BrainCircuit,
  Calculator,
  BookOpenCheck,
  PenTool,
  List,
  GraduationCap, // Import GraduationCap for Study Streak
 // Import Progress for Course Progress
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  progress,
  timeSpent,
  topics,
  formatTime,
}) => {
  return (
    <aside className="border-r border-zinc-800 bg-zinc-900/50 flex flex-col w-full sm:w-[280px] min-w-[280px] h-screen overflow-y-auto">
      {/* Header Section */}
      <div className="p-4 flex items-center gap-3 mb-4"> {/* Increased mb for spacing */}
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
          <FlaskConical className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Chemistry</h1>
          <p className="text-xs text-zinc-400">Advanced Learning</p>
        </div>
      </div>

      {/* Progress and Time Section - Consolidated */}
      <div className="px-4 pb-4"> {/* Added padding bottom for spacing */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full">
            <Clock className="h-4 w-4 text-green-400" />
            <span className="text-sm text-zinc-300">{formatTime(timeSpent)}</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-zinc-300">{progress}%</span>
          </div>
        </div>
        
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6">
          {/* Course Topics Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GanttChartSquare className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-zinc-100">
                3D Structure & Isomerism {/* Shortened for better fit */}
              </h2>
            </div>
            <div className="space-y-2"> {/* Reduced space-y for tighter list */}
              {topics.map((topic, index) => (
                <div key={index} className="space-y-1"> {/* Even tighter spacing */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left p-2 bg-zinc-800/50 hover:bg-zinc-800 rounded-md" // Reduced padding, added rounded-md
                  >
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1"> {/* Reduced mb */}
                        <div className="flex gap-2 items-center"> {/* Aligned topic title and checkmark */}
                          <span className="truncate text-sm text-zinc-300">
                            {topic.title}
                          </span>
                          {topic.completed && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <Badge
                          className="bg-zinc-700 text-zinc-300 text-[0.7rem] px-1.5 py-0.5 h-fit" // Smaller badge
                        >
                          {topic.duration}
                        </Badge>
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {/* Quick Access Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Quick Access
            </h3>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:bg-zinc-800 rounded-md p-2" // Reduced padding, added rounded-md
            >
              <BrainCircuit className="h-4 w-4 mr-2 text-purple-400" />
              Concept Maps
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:bg-zinc-800 rounded-md p-2" // Reduced padding, added rounded-md
            >
              <Calculator className="h-4 w-4 mr-2 text-green-400" />
              Formula Sheet
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:bg-zinc-800 rounded-md p-2" // Reduced padding, added rounded-md
            >
              <BookOpenCheck className="h-4 w-4 mr-2 text-yellow-400" />
              Study Guide
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:bg-zinc-800 rounded-md p-2" // Reduced padding, added rounded-md
            >
              <PenTool className="h-4 w-4 mr-2 text-red-400" />
              Practice Tests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:bg-zinc-800 rounded-md p-2" // Reduced padding, added rounded-md
            >
              <List className="h-4 w-4 mr-2 text-blue-400" />
              To-Do List
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Study Streak Section */}
      <Separator className="bg-zinc-800 my-4" />
      <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50 mx-4 mb-4"> {/* Reduced padding, added mx-4 mb-4 for spacing */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-300">Study Streak</p>
          <p className="text-xs text-zinc-400">8 days • Level 5</p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;