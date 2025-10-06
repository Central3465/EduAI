// src/components/assignment/StudentAssignmentTaker.jsx
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, FileText, Users, Award, Brain } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { generateFeedback } from '../../services/aiService';

const StudentAssignmentTaker = ({ assignment, onSubmit, onCancel }) => {
  const [answers, setAnswers] = useState({});
  const { showError, showSuccess } = useNotification();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assignment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Prepare answers with AI feedback for short-answer questions
      const enhancedAnswers = { ...answers };
      const aiFeedback = {};

      // Process each question to get AI feedback for short-answer questions
      for (const question of assignment.questions) {
        if (question.type === 'short-answer' || question.type === 'fill-in-blank') {
          const userAnswer = answers[question.id];
          if (userAnswer) {
            try {
              const feedback = await generateFeedback(
                question.question,
                userAnswer,
                question.correctAnswer
              );
              
              // Store AI feedback for this question
              aiFeedback[question.id] = feedback;
              
              // Optionally update the answer with feedback
              enhancedAnswers[question.id] = {
                answer: userAnswer,
                aiFeedback: feedback
              };
            } catch (error) {
              console.error('AI Feedback Error:', error);
              // If AI fails, continue without feedback
              aiFeedback[question.id] = {
                isCorrect: false,
                feedback: 'AI feedback unavailable',
                suggestion: 'Please review your answer',
                grade: 'N/A'
              };
            }
          }
        }
      }

      // Show success message
      showSuccess('Assignment submitted successfully! AI feedback generated.');
      
      // Submit with enhanced answers
      onSubmit(enhancedAnswers, aiFeedback);
      
    } catch (error) {
      showError('Error submitting assignment: ' + error.message);
      console.error('Assignment submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = assignment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assignment.questions.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </button>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span>Time Limit: 60 min</span>
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {currentQuestion + 1} of {assignment.questions.length}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{assignment.title}</h2>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {assignment.subject}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1}
          </span>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
            {currentQ.points} pt{currentQ.points > 1 ? 's' : ''}
          </span>
          {currentQ.aiGenerated && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200 flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span>AI Generated</span>
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {currentQ.question}
        </h3>

        {/* Answer Options based on question type */}
        {currentQ.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={index}
                  checked={answers[currentQ.id] === index}
                  onChange={() => handleAnswerChange(currentQ.id, index)}
                  className="mt-1 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300 flex-1">{option}</span>
              </label>
            ))}
          </div>
        )}

        {currentQ.type === 'true-false' && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={index}
                  checked={answers[currentQ.id] === index}
                  onChange={() => handleAnswerChange(currentQ.id, index)}
                  className="mt-1 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {currentQ.type === 'short-answer' && (
          <textarea
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
            placeholder="Type your answer here..."
            rows="4"
          />
        )}

        {currentQ.type === 'fill-in-blank' && (
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              {currentQ.question.replace(/___/g, 
                <input
                  key="blank"
                  type="text"
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  className="border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white mx-1 px-1 focus:outline-none focus:border-blue-500"
                  placeholder="fill in the blank"
                />
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0 || loading}
          className={`px-4 py-2 rounded-lg ${
            currentQuestion === 0 || loading
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
          }`}
        >
          Previous
        </button>

        {currentQuestion < assignment.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Submit Assignment</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentTaker;