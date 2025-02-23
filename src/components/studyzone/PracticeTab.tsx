"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type QuestionType = 'multiple-choice' | 'text';

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: 'What is the difference between a wedge and a dash in a 3D molecular representation?',
    options: [
      'Wedges represent bonds coming out of the plane towards the viewer, while dashes represent bonds going into the plane away from the viewer. This notation is crucial for understanding 3D molecular structures.',
      'Dashes represent bonds coming out of the plane towards the viewer, while wedges represent bonds going into the plane away from the viewer. This is the standard convention in organic chemistry.',
      'They are completely interchangeable notation systems used in organic chemistry, and their usage depends on the preference of the chemist drawing the structure.',
      'Wedges are exclusively used to represent single bonds in a molecule, while dashes are used to represent double bonds, regardless of their spatial orientation.'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'text',
    text: 'Draw the Fischer projection of (R)-2-chlorobutane.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: 'Which of the following molecules is chiral and exhibits optical activity due to its three-dimensional structure?',
    options: [
      'CH4 (methane) - a tetrahedral molecule with four identical substituents',
      'CH3Cl (chloromethane) - a molecule with three identical substituents and one different group',
      'CH2Cl2 (dichloromethane) - a molecule with two identical pairs of substituents',
      'CHClBr(CH3) (1-bromo-1-chloroethane) - a molecule with four different substituents around a central carbon'
    ],
    correctAnswer: 'D'
  }
];

const PracticeTabContent = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, { shown: boolean; correct: boolean }>>({});

  const handleMultipleChoice = (questionId: number, choice: string, correctAnswer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: choice }));
    setFeedback(prev => ({
      ...prev,
      [questionId]: { shown: true, correct: choice === correctAnswer }
    }));
  };

  const handleTextSubmit = (questionId: number) => {
    setFeedback(prev => ({
      ...prev,
      [questionId]: { shown: true, correct: false }
    }));
  };

  const renderQuestion = (question: Question) => {
    return (
      <div key={question.id} className="bg-zinc-900 p-4 rounded-lg flex gap-4 items-start">
        <div className="text-xl font-bold text-zinc-300 flex-shrink-0">{question.id}.</div>
        <div className="flex-1 min-w-0"> {/* Added min-w-0 to enable text wrapping */}
          <p className="text-zinc-300 mb-2 break-words">{question.text}</p>

          {question.type === 'multiple-choice' && question.options && (
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 p-4 h-auto  whitespace-normal break-words" // Removed w-full, kept other text wrapping classes
                  onClick={() => handleMultipleChoice(
                    question.id,
                    String.fromCharCode(65 + index),
                    question.correctAnswer || ''
                  )}
                >
                  <div className="flex gap-2 min-w-0 **flex-wrap**"> {/* Added flex-wrap to the inner div */}
                    <span className="flex-shrink-0 font-semibold">{String.fromCharCode(65 + index)})</span>
                    <span className="whitespace-normal break-words">{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <div className="mt-2">
              <Textarea
                className="min-h-[80px] bg-zinc-700 border-zinc-600 focus:border-blue-400 mb-2 text-zinc-300 w-full"
                placeholder="Provide answer, or draw a representation"
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
              />
              <Button
                variant="outline"
                size="sm"
                className="h-7 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                onClick={() => handleTextSubmit(question.id)}
              >
                Submit
              </Button>
            </div>
          )}

          {feedback[question.id]?.shown && (
            <div
              className={`mt-2 ${
                question.type === 'text'
                  ? 'text-zinc-300'
                  : feedback[question.id].correct
                    ? 'text-green-500'
                    : 'text-red-500'
              }`}
            >
              {question.type === 'text'
                ? 'Submitted. Your answer will be reviewed.'
                : feedback[question.id].correct
                  ? 'Correct!'
                  : 'Incorrect. Try again.'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-zinc-100">Practice Questions</h3>
        {questions.map(question => renderQuestion(question))}
      </CardContent>
    </Card>
  );
};

export default PracticeTabContent;