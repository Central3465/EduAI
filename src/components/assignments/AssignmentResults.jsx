// src/components/assignment/AssignmentResults.jsx
import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Award, BarChart3, BookOpen } from 'lucide-react';

const AssignmentResults = ({ assignment, answers, score, onRetake, onBackToAssignments, onReview }) => {
  const totalQuestions = assignment.questions.length;
  const correctAnswers = assignment.questions.filter((q, index) => {
    const userAnswer = answers[q.id];
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      return userAnswer == q.correctAnswer;
    }
    // For other question types, we'd need more sophisticated checking
    return false;
  }).length;

  const timeTaken = assignment.timeLimit || 'N/A'; // Would come from actual time tracking

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Assignment Results</h2>
        <button
          onClick={onBackToAssignments}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </button>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{score}%</div>
          <div className="text-sm opacity-90">Score</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{correctAnswers}/{totalQuestions}</div>
          <div className="text-sm opacity-90">Correct</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{totalQuestions - correctAnswers}</div>
          <div className="text-sm opacity-90">Incorrect</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{timeTaken}</div>
          <div className="text-sm opacity-90">Time</div>
        </div>
      </div>

      {/* Grade Classification */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg">
          <div className="text-4xl font-bold mb-2">
            {score >= 90 ? 'A+' : 
             score >= 80 ? 'A' : 
             score >= 70 ? 'B' : 
             score >= 60 ? 'C' : 'F'}
          </div>
          <div className="text-sm">
            {score >= 90 ? 'Excellent!' : 
             score >= 80 ? 'Great Job!' : 
             score >= 70 ? 'Good Work!' : 
             score >= 60 ? 'Satisfactory' : 'Needs Improvement'}
          </div>
        </div>
      </div>

      {/* Question-by-Question Review */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Question Review</h3>
        <div className="space-y-4">
          {assignment.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = question.type === 'multiple-choice' || question.type === 'true-false' 
              ? userAnswer == question.correctAnswer 
              : false;
            
            return (
              <div key={question.id} className={`border rounded-lg p-4 ${
                isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 
                userAnswer !== undefined ? 'border-red-200 bg-red-50 dark:bg-red-900/20' : 
                'border-gray-200 bg-gray-50 dark:bg-gray-700'
              }`}>
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-500 text-white' : 
                    userAnswer !== undefined ? 'bg-red-500 text-white' : 
                    'bg-gray-500 text-white'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : userAnswer !== undefined ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-800 dark:text-white">
                        Question {index + 1}: ({question.type.replace('-', ' ')})
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {question.points} pt{question.points > 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {question.question}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Your Answer:</p>
                        <div className={`p-2 rounded ${
                          isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200' :
                          userAnswer !== undefined ? 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                        }`}>
                          {question.type === 'multiple-choice' || question.type === 'true-false' 
                            ? question.options[userAnswer] || 'No answer'
                            : userAnswer || 'No answer'}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Correct Answer:</p>
                        <div className="p-2 rounded bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200">
                          {question.type === 'multiple-choice' || question.type === 'true-false' 
                            ? question.options[question.correctAnswer]
                            : question.correctAnswer}
                        </div>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    {isCorrect && (
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Correct! Well done.
                      </div>
                    )}
                    {!isCorrect && userAnswer !== undefined && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4 inline mr-1" />
                        Incorrect. Review the material.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetake}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Retake Assignment</span>
        </button>
        <button
          onClick={onReview}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all"
        >
          Review Answers
        </button>
        <button
          onClick={onBackToAssignments}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-all"
        >
          Back to Assignments
        </button>
      </div>
    </div>
  );
};

export default AssignmentResults;