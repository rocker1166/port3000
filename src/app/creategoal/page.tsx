"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Loader2 } from "lucide-react";

// Import the RoadmapComponent we created earlier
import RoadmapComponent from '../components/Roadmap';
import LandingNavbar from '../landing/LandingNavbar';

const RoadmapPage = () => {
  const [subject, setSubject] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  interface RoadmapData {
    modules: any[]; // Replace 'any' with the appropriate type if known
  }
  
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);

  useEffect(() => {
    // Check for existing roadmap data in local storage
    const storedRoadmapData = localStorage.getItem('roadmapData');
    if (storedRoadmapData) {
      setRoadmapData(JSON.parse(storedRoadmapData));
      setShowRoadmap(true);
    }
  }, []);

  const handleGenerateRoadmap = async () => {
    if (!subject.trim() || !syllabus.trim()) {
      setError('Please fill in both subject and syllabus fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, syllabus }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }

      const data = await response.json();
      setRoadmapData(data);
      setShowRoadmap(true);

      // Store the roadmap data in local storage
      localStorage.setItem('roadmapData', JSON.stringify(data));
    } catch (error) {
      setError('Failed to generate roadmap. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <LandingNavbar />
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl py-10 font-bold mb-8 text-center">
          Course Roadmap Generator
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          
          {/* Input Form Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Create New Roadmap</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your subject details and syllabus to generate a visual roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">
                  Subject Name
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter subject name"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="syllabus" className="text-white">
                  Syllabus Content
                </Label>
                <Textarea
                  id="syllabus"
                  placeholder="Enter your syllabus content..."
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  className="min-h-[200px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-900 border-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleGenerateRoadmap}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Generate Roadmap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Roadmap Display Section */}
          <div className="lg:col-span-1 ">
            {showRoadmap ? (
              roadmapData && <RoadmapComponent syllabusData={roadmapData.modules} />
            ) : (
              <Card className="bg-gray-800 border-gray-700 h-full flex items-center justify-center">
                <CardContent className="text-center text-gray-400 p-8">
                  <h3 className="text-xl font-semibold mb-2">No Roadmap Generated Yet</h3>
                  <p>Fill in the form and click generate to create your roadmap.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RoadmapPage;