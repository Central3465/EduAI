// src/components/assignment/AssignmentCreator.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Brain, X, Copy, CheckCircle } from 'lucide-react';
import { questionTypes, createQuestion } from '../../utils/assignmentUtils';
import { useNotification } from '../../context/NotificationContext'; // Notification hooks

const AssignmentCreator = ({ onSave, onCancel, aiGenerateQuestion }) => {
  const [assignment, setAssignment] = useState({
    title: '',
    subject: '',
    difficulty: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    questions: []
  });
  const { showError, showSuccess } = useNotification(); // Notification hooks

  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple-choice',
    question: '',
    options: ['', ''],
    correctAnswer: 0,
    points: 1
  });

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }

    if (currentQuestion.type === 'multiple-choice' && currentQuestion.options.some(opt => !opt.trim())) {
      alert('Please fill in all answer options');
      return;
    }

    if (currentQuestion.type === 'true-false' && currentQuestion.options.length < 2) {
      alert('True/False questions need both True and False options');
      return;
    }

    const newQuestion = createQuestion(currentQuestion);
    setAssignment(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    // Reset current question
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', ''],
      correctAnswer: 0,
      points: 1
    });
  };

  const removeQuestion = (questionId) => {
    setAssignment(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleQuestionTypeChange = (type) => {
    setCurrentQuestion(prev => ({
      ...prev,
      type,
      options: type === 'multiple-choice' ? ['', ''] : 
               type === 'true-false' ? ['True', 'False'] : prev.options
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    if (currentQuestion.options.length > 2) {
      const newOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const generateAIQuestion = async () => {
    // Mock AI generation
    const mockQuestions = {
      'multiple-choice': {
        question: 'Which of the following is NOT a JavaScript framework?',
        options: ['React', 'Vue', 'Django', 'Angular'],
        correctAnswer: 2
      },
      'short-answer': {
        question: 'What is the capital of France?',
        answer: 'Paris'
      },
      'true-false': {
        question: 'JavaScript is a compiled language.',
        correctAnswer: false
      }
    };

    const mockQuestion = mockQuestions[currentQuestion.type];
    if (mockQuestion) {
      setCurrentQuestion(prev => ({
        ...prev,
        question: mockQuestion.question,
        options: mockQuestion.options || prev.options,
        correctAnswer: mockQuestion.correctAnswer !== undefined ? mockQuestion.correctAnswer : prev.correctAnswer
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignment.title.trim() || !assignment.subject.trim()) {
      alert('Please fill in title and subject');
      return;
    }
    if (assignment.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    onSave({
      ...assignment,
      totalQuestions: assignment.questions.length
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Assignment</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Assignment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignment Title
            </label>
            <input
              type="text"
              value={assignment.title}
              onChange={(e) => setAssignment(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter assignment title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={assignment.subject}
              onChange={(e) => setAssignment(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Mathematics"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={assignment.dueDate}
              onChange={(e) => setAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={assignment.difficulty}
              onChange={(e) => setAssignment(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Question Builder */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Add Question</h3>
            <button
              type="button"
              onClick={generateAIQuestion}
              className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-blue-700 transition-all"
            >
              <Brain className="w-4 h-4" />
              <span>AI Generate</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question Type
              </label>
              <select
                value={currentQuestion.type}
                onChange={(e) => handleQuestionTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Object.entries(questionTypes).map(([type, config]) => (
                  <option key={type} value={type}>
                    {config.icon} {config.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Points
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Text
            </label>
            <textarea
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your question here..."
              rows="3"
              required
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Answer Options
              </label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correctAnswer-${currentQuestion.id || 'new'}`}
                    value={index}
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                    className="text-blue-600"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={`Option ${index + 1}`}
                  />
                  {currentQuestion.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
              >
                + Add Option
              </button>
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                True/False Options
              </label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correctAnswer-${currentQuestion.id || 'new'}`}
                    value={index}
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Preview Questions */}
        {assignment.questions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Questions Preview</h3>
            <div className="space-y-3">
              {assignment.questions.map((question, index) => (
                <div key={question.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {index + 1}. ({questionTypes[question.type]?.name})
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {question.points} pt{question.points > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 dark:text-white mb-2">
                        {question.question}
                      </p>
                      {question.type === 'multiple-choice' && (
                        <div className="space-y-1">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                disabled
                                checked={question.correctAnswer === optIndex}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{option}</span>
                              {question.correctAnswer === optIndex && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {question.type === 'true-false' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            disabled
                            checked={question.correctAnswer === 0}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">True</span>
                          <input
                            type="radio"
                            disabled
                            checked={question.correctAnswer === 1}
                            className="text-blue-600 ml-4"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">False</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreator;