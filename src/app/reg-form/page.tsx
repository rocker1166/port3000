"use client"
import { Router } from 'next/router';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';













const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<{
    grade: string;
    subjects: string;
    performance: string;
    goals: string;
    studyTimes: string;
    techProficiency: string;
    learningStyle: string;
    challenges: string[];
  }>({
 
    grade: '',
    subjects: '',
    performance: 'average',
    goals: '',
    studyTimes: '',
    techProficiency: 'beginner',
    learningStyle: '',
    challenges: [],
  });

  
const router = useRouter();

  const [subjectTags, setSubjectTags] = useState<string[]>([]);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      subjects: value,
    }));
  };

  const addSubjectTag = () => {
    if (formData.subjects.trim() !== '' && !subjectTags.includes(formData.subjects.trim())) {
      setSubjectTags([...subjectTags, formData.subjects.trim()]);
      setFormData((prevData) => ({
        ...prevData,
        subjects: '',
      }));
    }
  };

  const removeSubjectTag = (tag: string) => {
    setSubjectTags(subjectTags.filter((t) => t !== tag));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      challenges: checked
        ? [...prevData.challenges, value]
        : prevData.challenges.filter((challenge) => challenge !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, subjects: subjectTags };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setSubmissionResult(`Form submitted successfully.`);
      localStorage.setItem('documentId', result.objectId);
      router.push(`/sign-up`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionResult('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Study Help Form</h2>
        
        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium mb-2">
            Grade/Education Level
          </label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-700 border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Grade</option>
            <option value="elementary">Elementary</option>
            <option value="middle">Middle School</option>
            <option value="high">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subjects" className="block text-sm font-medium mb-2">
            Subjects of Interest
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="subjects"
              name="subjects"
              value={formData.subjects}
              onChange={handleSubjectChange}
              className="flex-grow px-3 py-2 border rounded-md bg-gray-700 border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Add a subject"
            />
            <button
              type="button"
              onClick={addSubjectTag}
              className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {subjectTags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-white px-2 py-1 rounded-md flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeSubjectTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Current Academic Performance
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="performance"
                value="excellent"
                checked={formData.performance === 'excellent'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Excellent</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="performance"
                value="good"
                checked={formData.performance === 'good'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Good</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="performance"
                value="average"
                checked={formData.performance === 'average'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Average</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="performance"
                value="poor"
                checked={formData.performance === 'poor'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Poor</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="goals" className="block text-sm font-medium mb-2">
            Study Goals
          </label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-700 border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="studyTimes" className="block text-sm font-medium mb-2">
            Preferred Study Times
          </label>
          <input
            type="text"
            id="studyTimes"
            name="studyTimes"
            value={formData.studyTimes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-700 border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Technological Proficiency
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="techProficiency"
                value="beginner"
                checked={formData.techProficiency === 'beginner'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Beginner</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="techProficiency"
                value="intermediate"
                checked={formData.techProficiency === 'intermediate'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Intermediate</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="techProficiency"
                value="advanced"
                checked={formData.techProficiency === 'advanced'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span>Advanced</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="learningStyle" className="block text-sm font-medium mb-2">
            Learning Style
          </label>
          <select
            id="learningStyle"
            name="learningStyle"
            value={formData.learningStyle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-700 border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Learning Style</option>
            <option value="smartLearner">Smart Learner</option>
            <option value="quickLearner">Quick Learner</option>
            <option value="slowLearner">Slow Learner</option>
            <option value="visualLearner">Visual Learner</option>
            <option value="auditoryLearner">Auditory Learner</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Any Learning Challenges
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="challenges"
                value="dyslexia"
                checked={formData.challenges.includes('dyslexia')}
                onChange={handleCheckboxChange}
                className="form-checkbox text-blue-500"
              />
              <span>Dyslexia</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="challenges"
                value="adhd"
                checked={formData.challenges.includes('adhd')}
                onChange={handleCheckboxChange}
                className="form-checkbox text-blue-500"
              />
              <span>ADHD</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="challenges"
                value="autism"
                checked={formData.challenges.includes('autism')}
                onChange={handleCheckboxChange}
                className="form-checkbox text-blue-500"
              />
              <span>Autism</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="challenges"
                value="other"
                checked={formData.challenges.includes('other')}
                onChange={handleCheckboxChange}
                className="form-checkbox text-blue-500"
              />
              <span>Other</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        {submissionResult && (
          <div className="mt-4 text-center">
            <p>{submissionResult}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormComponent;