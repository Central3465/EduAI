// src/components/assignment/TeacherAssignmentAnalytics.jsx
import React from 'react';
import { BarChart3, Users, CheckCircle, TrendingUp, Clock, AlertCircle, Award } from 'lucide-react';

const TeacherAssignmentAnalytics = ({ assignment }) => {
  // Mock analytics data based on assignment
  const analytics = {
    totalStudents: assignment.submissions || 12,
    averageScore: assignment.grade ? parseInt(assignment.grade) : 78,
    completionRate: 85,
    timeSpent: '25 min',
    highestScore: 98,
    lowestScore: 45,
    questionDifficulty: assignment.questions?.map((q, index) => ({
      question: index + 1,
      correctRate: Math.floor(Math.random() * 40) + 60, // Mock: 60-99% correct rate
      total: assignment.submissions || 12,
      correct: Math.floor((Math.random() * 40 + 60) / 100 * (assignment.submissions || 12))
    })) || []
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Students</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalStudents}</p>
            </div>
            <Users className="w-10 h-10 text-blue-100" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Avg. Score</p>
              <p className="text-2xl font-bold text-green-600">{analytics.averageScore}%</p>
            </div>
            <Award className="w-10 h-10 text-green-100" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.completionRate}%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-purple-100" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Avg. Time</p>
              <p className="text-2xl font-bold text-yellow-600">{analytics.timeSpent}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-100" />
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Distribution</h3>
        <div className="flex items-end space-x-1 h-32">
          {[10, 25, 40, 60, 75, 85, 70, 50, 30, 15].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-600 mt-1">{index * 10}-{index * 10 + 9}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question Difficulty Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Difficulty Analysis</h3>
        <div className="space-y-3">
          {analytics.questionDifficulty.map((q, index) => (
            <div key={q.question} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-800">Question {q.question}</span>
                  <span className="text-sm text-gray-600">
                    ({assignment.questions[index]?.type.replace('-', ' ')})
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {assignment.questions[index]?.question.substring(0, 60)}...
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{q.correctRate}% correct</div>
                <div className="text-xs text-gray-600">{q.correct}/{q.total} students</div>
              </div>
              <div className="w-24 ml-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      q.correctRate >= 80 ? 'bg-green-500' :
                      q.correctRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${q.correctRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Strengths</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Question 3 had 95% correct rate</li>
              <li>• Students performed well on multiple choice</li>
              <li>• Average completion time is good</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Areas for Improvement</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Question 7 had only 45% correct rate</li>
              <li>• True/False questions need review</li>
              <li>• Consider adding hints for difficult questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentAnalytics;