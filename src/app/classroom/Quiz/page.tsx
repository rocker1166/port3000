// File: src/app/classroom/Quiz/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Rocket,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
}

const QuizPage = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const searchParams = useSearchParams();
  const initialTopics = searchParams.get("topics")?.split(",") || [];
  const subject = searchParams.get("code") || "General Knowledge";

  const [no_of_questions, setNum] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [topics, setTopics] = useState<string[]>(initialTopics);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [checkedAnswers, setCheckedAnswers] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };
  useEffect(() => {
    if (quizCompleted) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 5000);
    }
  }, [quizCompleted]);

  const fetchQuiz = async (
    selectedTopics: string[],
    no_of_questions: number,
    difficulty: string
  ) => {
    setIsOpen(false);
    try {
      setLoading(true);
      setLoadingProgress(0);
      const response = await fetch("/api/generate_quizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_of_questions: no_of_questions,
          difficulty: difficulty,
          topics: selectedTopics,
          userId: userId,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch quiz data");

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setQuizData(result.data);
        setUserAnswers({});
        setCheckedAnswers({});
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
      } else throw new Error("Invalid quiz data format");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setLoadingProgress(100);
    }
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const Loader = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-pulse">
          <Rocket className="text-blue-500 w-16 h-16 animate-float" />
        </div>
        <p className="text-white text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          LOADING QUIZ...
        </p>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const handleAnswerClick = (selectedOption: string) => {
    if (checkedAnswers[currentQuestionIndex]) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleCheckAnswer = () => {
    if (!userAnswers[currentQuestionIndex]) return;
    setCheckedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));
  };

  const handleNextClick = () => {
    handleCheckAnswer();
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        let correctCount = Object.keys(userAnswers).reduce((count, index) => {
          return userAnswers[parseInt(index)] ===
            quizData[parseInt(index)].correct
            ? count + 1
            : count;
        }, 0);
        setScore(correctCount);
        setQuizCompleted(true);
      }
    }, 500);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleExitQuiz = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    router.back();
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-['Poppins'] overflow-hidden">
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(false), router.back();
          }}
        >
          <DialogClose className="absolute top-4 right-4 text-white hover:text-gray-300" />
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <DialogContent className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-white text-center text-2xl">
                Customize Your Quiz
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-white">Number of Questions:</Label>
                <Input
                  type="number"
                  value={no_of_questions}
                  onChange={(e) => setNum(Number(e.target.value))}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600 w-full p-2 rounded shadow-lg"
                />
              </div>

              <div>
                <Label className="text-white">Difficulty:</Label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600 w-full p-2 rounded shadow-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <Label className="text-white">Syllabus/Topics:</Label>
                <Textarea
                  value={topics.join(", ")}
                  onChange={(e) => setTopics(e.target.value.split(/,\s*|\n/))}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600 h-32"
                  placeholder="Enter topics separated by commas or new lines"
                />
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 mt-4"
              onClick={() => fetchQuiz(topics, no_of_questions, difficulty)}
            >
              Start Quiz
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {showParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              move: { enable: true, speed: 1 },
              opacity: { value: 0.5 },
              size: { value: 3 },
              color: { value: ["#3B82F6", "#8B5CF6", "#EC4899"] },
            },
          }}
          className="fixed inset-0 z-50"
        />
      )}

      {showExitModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Exit Quiz?</h2>
              <button onClick={() => setShowExitModal(false)}>
                <X />
              </button>
            </div>
            <p>Your progress will be lost. Continue?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-red-600 rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 relative">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          QUIZ
        </h1>
        <button
          onClick={handleExitQuiz}
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-gray-700 p-2 rounded"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar nav */}
        {!quizCompleted && (
          <nav className="w-24 bg-gray-800 p-4 space-y-2 overflow-y-auto">
            {quizData.map((_, i) => {
              const done = checkedAnswers[i];
              const correct = userAnswers[i] === quizData[i]?.correct;
              const bg = done
                ? correct
                  ? "bg-green-600"
                  : "bg-red-600"
                : "bg-gray-700 hover:bg-gray-600";
              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}
                >
                  {i + 1}
                </button>
              );
            })}
          </nav>
        )}

        {/* Main area */}
        <main className="flex-1 p-8 overflow-y-auto flex flex-col items-center">
          {error && <p className="text-red-500">{error}</p>}

          {!quizCompleted ? (
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              {quizData[currentQuestionIndex] && (
                <>
                  <p className="text-xl mb-6">
                    {quizData[currentQuestionIndex].question}
                  </p>
                  <ul className="space-y-4">
                    {quizData[currentQuestionIndex].options.map((opt, j) => {
                      const selected =
                        userAnswers[currentQuestionIndex] === opt;
                      const isCorrect =
                        opt === quizData[currentQuestionIndex].correct;
                      const checked = checkedAnswers[currentQuestionIndex];
                      let border = "border-gray-600 hover:border-blue-400";
                      if (checked) {
                        if (isCorrect) border = "border-green-500 bg-green-900";
                        else if (selected) border = "border-red-500 bg-red-900";
                        else border = "border-gray-600";
                      } else if (selected) {
                        border = "border-blue-500 bg-blue-900/20";
                      }
                      return (
                        <li
                          key={j}
                          className={`p-4 rounded-lg cursor-pointer flex justify-between items-center border-2 ${border}`}
                          onClick={() => handleAnswerClick(opt)}
                        >
                          {opt}
                          {checked &&
                            (isCorrect ? (
                              <CheckCircle />
                            ) : (
                              selected && <XCircle />
                            ))}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft /> Previous
                </Button>
                <Button
                  onClick={handleCheckAnswer}
                  disabled={
                    !userAnswers[currentQuestionIndex] ||
                    checkedAnswers[currentQuestionIndex]
                  }
                >
                  Check Answer
                </Button>
                <Button onClick={handleNextClick}>
                  {currentQuestionIndex === quizData.length - 1
                    ? "Submit"
                    : "Next"}{" "}
                  <ChevronRight />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-800 rounded-xl">
              <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-2xl mb-6">
                You scored <span className="text-blue-400">{score}</span> out of{" "}
                <span className="text-green-400">{quizData.length}</span>
              </p>
              <Button onClick={() => setIsOpen(true)}>
                <RefreshCw /> Reattempt Quiz
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
