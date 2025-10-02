// src/pages/AssignmentPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Brain, Clock, CheckCircle, X } from 'lucide-react';
import Header from '../components/layout/Header';

const AssignmentPage = ({
  assignments,
  currentUser,
  userRole,
  logout,
  setAssignments // needed to update status/grade after submission
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const assignment = assignments.find(a => a.id === parseInt(id));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grade, setGrade] = useState(null);

  // Mock questions (in real app, these would come from your backend)
  const mockQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the primary goal of machine learning?',
      options: [
        'To replace human decision-making entirely',
        'To enable computers to learn from data without explicit programming',
        'To create artificial consciousness',
        'To optimize database queries'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'short-answer',
      question: 'Explain the difference between supervised and unsupervised learning in one sentence.',
      correctAnswer: 'Supervised learning uses labeled data, while unsupervised learning finds patterns in unlabeled data.'
    },
    {
      id: 3,
      type: 'true-false',
      question: 'Overfitting occurs when a model performs well on training data but poorly on new data.',
      correctAnswer: true
    }
  ];

  useEffect(() => {
    if (!assignment) {
      navigate('/dashboard');
    }
  }, [assignment, navigate]);

  if (!assignment) return null;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    // In real app: send answers to backend for AI grading
    const mockGrade = "A"; // Simulate AI grading result
    setGrade(mockGrade);
    setIsSubmitted(true);

    // Update assignment in parent state
    const updatedAssignments = assignments.map(a =>
      a.id === assignment.id
        ? { ...a, status: 'completed', grade: mockGrade }
        : a
    );
    setAssignments(updatedAssignments);

    // Optional: auto-close after 3 seconds
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  const renderQuestion = (q) => {
    const userAnswer = answers[q.id];

    if (q.type === 'multiple-choice') {
      return (
        <div className="space-y-3">
          {q.options.map((option, idx) => (
            <label key={idx} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={`q${q.id}`}
                checked={userAnswer === idx}
                onChange={() => handleAnswerChange(q.id, idx)}
                className="w-4 h-4 text-blue-600"
                disabled={isSubmitted}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (q.type === 'short-answer') {
      return (
        <textarea
          value={userAnswer || ''}
          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          placeholder="Type your answer here..."
          disabled={isSubmitted}
        />
      );
    }

    if (q.type === 'true-false') {
      return (
        <div className="flex space-x-6">
          {['True', 'False'].map((choice, idx) => (
            <label key={choice} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`q${q.id}`}
                checked={userAnswer === (choice === 'True')}
                onChange={() => handleAnswerChange(q.id, choice === 'True')}
                className="w-4 h-4 text-blue-600"
                disabled={isSubmitted}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Assignment Completed!</h2>
            <p className="text-gray-600 mb-4">
              Great job! Your assignment has been graded.
            </p>
            <div className="text-4xl font-bold text-green-600 mb-6">{grade}</div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion) / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Assignment Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{assignment.title}</h1>
              <p className="text-gray-600">{assignment.subject}</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Brain className="w-4 h-4" />
              <span>AI Assignment</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{assignment.questions} questions • Due {assignment.dueDate}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {question.question}
          </h3>
          {renderQuestion(question)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          {currentQuestion < mockQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={answers[question.id] === undefined}
              className={`px-4 py-2 rounded-lg ${
                answers[question.id] === undefined
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < mockQuestions.length}
              className={`px-6 py-2 rounded-lg font-medium ${
                Object.keys(answers).length < mockQuestions.length
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700'
              }`}
            >
              Submit Assignment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;