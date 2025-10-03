// src/pages/AssignmentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, Clock, BookOpen, CheckCircle, X } from 'lucide-react';
import Header from '../components/layout/Header';

const AssignmentPage = ({ assignments, currentUser, userRole, logout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);

  // Find the assignment safely
  useEffect(() => {
    if (!assignments || assignments.length === 0) {
      setLoading(false);
      return;
    }

    const foundAssignment = assignments.find(assignment => assignment.id === parseInt(id));
    
    if (!foundAssignment) {
      console.error(`Assignment with id ${id} not found`);
      setLoading(false);
      return;
    }

    setAssignment(foundAssignment);
    setLoading(false);
  }, [assignments, id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement actual submission logic
    console.log('Submitting answers:', answers);
    setIsSubmitted(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      navigate('/dashboard'); // Redirect to dashboard after submission
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (assignment?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Assignment Not Found</h2>
            <p className="text-gray-600 mb-6">
              The assignment you're looking for doesn't exist or you don't have access to it.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = assignment.questions || [];
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Assignment Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {assignment.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {assignment.subject}
                </span>
                {assignment.aiGenerated && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    AI Generated
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Due: {assignment.dueDate}</div>
              <div className="flex items-center justify-end gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>60 minutes</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{questions.length} questions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        {isSubmitted ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Assignment Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your answers have been successfully submitted. You'll receive your results shortly.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {currentQ && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {currentQ.question}
                  </h3>
                  {currentQ.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {currentQ.options?.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${currentQ.id}`}
                            value={option}
                            checked={answers[currentQ.id] === option}
                            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {currentQ.type === 'short-answer' && (
                    <textarea
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                      placeholder="Type your answer here..."
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  {currentQuestion === questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!answers[currentQ.id]}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Submit Assignment
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      disabled={!answers[currentQ.id]}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;