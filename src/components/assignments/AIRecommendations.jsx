// src/components/assignment/AIRecommendations.jsx
import React, { useState } from 'react';
import { Brain, TrendingUp, Target, BookOpen, Award, Users, Clock } from 'lucide-react';

const AIRecommendations = ({ assignments, studentPerformance, onGenerateAssignment }) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // AI analysis of student performance
  const analyzePerformance = () => {
    if (!studentPerformance || studentPerformance.length === 0) {
      return {
        weaknesses: ['General Review'],
        strengths: ['None identified'],
        recommendedAssignments: [
          {
            id: 'ai-1',
            title: 'General Review Assignment',
            subject: 'Mixed Subjects',
            difficulty: 'medium',
            estimatedTime: '20-30 min',
            focus: 'General review of all topics',
            score: 85
          }
        ]
      };
    }

    // Mock AI analysis
    const subjectPerformance = studentPerformance.reduce((acc, assignment) => {
      if (!acc[assignment.subject]) {
        acc[assignment.subject] = { total: 0, count: 0, assignments: [] };
      }
      acc[assignment.subject].total += assignment.score || 0;
      acc[assignment.subject].count += 1;
      acc[assignment.subject].assignments.push(assignment);
      return acc;
    }, {});

    const weaknesses = Object.entries(subjectPerformance)
      .filter(([subject, data]) => (data.total / data.count) < 75)
      .map(([subject]) => subject);

    const strengths = Object.entries(subjectPerformance)
      .filter(([subject, data]) => (data.total / data.count) >= 85)
      .map(([subject]) => subject);

    const recommendedAssignments = [];

    if (weaknesses.length > 0) {
      weaknesses.forEach(weakSubject => {
        recommendedAssignments.push({
          id: `ai-${Date.now()}-${weakSubject}`,
          title: `Strengthen ${weakSubject}`,
          subject: weakSubject,
          difficulty: 'easy',
          estimatedTime: '15-20 min',
          focus: `Focus on ${weakSubject} concepts where you need improvement`,
          score: 0
        });
      });
    }

    // Add general recommendations
    recommendedAssignments.push({
      id: `ai-${Date.now()}-general`,
      title: 'Mixed Practice Assignment',
      subject: 'Mixed',
      difficulty: 'medium',
      estimatedTime: '25-35 min',
      focus: 'Practice questions from multiple subjects',
      score: 0
    });

    return {
      weaknesses: weaknesses.length > 0 ? weaknesses : ['No specific weaknesses identified'],
      strengths: strengths.length > 0 ? strengths : ['All subjects need review'],
      recommendedAssignments
    };
  };

  const analysis = analyzePerformance();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI Learning Assistant</h2>
        </div>
        <p className="text-purple-100">
          Based on your performance, I've identified areas for improvement and created personalized recommendations.
        </p>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Areas for Improvement</h3>
          </div>
          <div className="space-y-2">
            {analysis.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-700">{weakness}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Your Strengths</h3>
          </div>
          <div className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Assignments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Recommended Assignments</h3>
        </div>
        
        <div className="space-y-4">
          {analysis.recommendedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRecommendation(assignment)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      assignment.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assignment.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{assignment.focus}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{assignment.subject}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{assignment.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-purple-700 transition-all">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Question Generator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800">AI Question Generator</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onGenerateAssignment({ subject: 'Mathematics', difficulty: 'easy', count: 5 })}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-800">Easy Math</h4>
            <p className="text-sm text-gray-600">5 questions</p>
          </button>
          
          <button
            onClick={() => onGenerateAssignment({ subject: 'Science', difficulty: 'medium', count: 7 })}
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800">Medium Science</h4>
            <p className="text-sm text-gray-600">7 questions</p>
          </button>
          
          <button
            onClick={() => onGenerateAssignment({ subject: 'Literature', difficulty: 'hard', count: 3 })}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-800">Hard Literature</h4>
            <p className="text-sm text-gray-600">3 questions</p>
          </button>
        </div>
      </div>

      {/* Recommendation Modal */}
      {selectedRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Assignment Details</h3>
              <button
                onClick={() => setSelectedRecommendation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{selectedRecommendation.title}</h4>
                <p className="text-gray-600">{selectedRecommendation.focus}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-medium">{selectedRecommendation.subject}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="font-medium capitalize">{selectedRecommendation.difficulty}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Time</p>
                <p className="font-medium">{selectedRecommendation.estimatedTime}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  // Start the recommended assignment
                  setSelectedRecommendation(null);
                  // In a real app, this would navigate to the assignment
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Start Assignment
              </button>
              <button
                onClick={() => setSelectedRecommendation(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;