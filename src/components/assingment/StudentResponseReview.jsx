// src/components/assignment/StudentResponseReview.jsx
import React, { useState } from 'react';
import { User, CheckCircle, XCircle, Search, Filter, Download } from 'lucide-react';

const StudentResponseReview = ({ assignment, students = [] }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');

  // Mock student responses based on assignment
  const studentResponses = students.map(student => ({
    ...student,
    assignmentId: assignment.id,
    answers: assignment.questions?.map((q, index) => {
      // Mock: 70% chance of correct answer for demo
      const isCorrect = Math.random() > 0.3;
      return {
        questionId: q.id,
        question: q.question,
        userAnswer: isCorrect ? 
          (q.type === 'multiple-choice' || q.type === 'true-false' ? q.options[q.correctAnswer] : 'Mock answer') :
          (q.type === 'multiple-choice' || q.type === 'true-false' ? q.options[Math.floor(Math.random() * q.options.length)] : 'Wrong answer'),
        correctAnswer: q.type === 'multiple-choice' || q.type === 'true-false' ? q.options[q.correctAnswer] : q.correctAnswer,
        isCorrect,
        points: q.points,
        earnedPoints: isCorrect ? q.points : 0
      };
    }) || [],
    totalScore: Math.floor(Math.random() * 40) + 60, // Mock: 60-99%
    grade: getGradeFromScore(Math.floor(Math.random() * 40) + 60)
  }));

  const getGradeFromScore = (score) => {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 65) return 'D';
    return 'F';
  };

  const filteredStudents = studentResponses.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Grades</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
          <div className="col-span-4">Student</div>
          <div className="col-span-2">Score</div>
          <div className="col-span-2">Grade</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Status</div>
        </div>
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 border-b cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="col-span-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {student.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-gray-800">{student.name}</div>
                <div className="text-sm text-gray-600">{student.email}</div>
              </div>
            </div>
            <div className="col-span-2 font-medium text-gray-800">{student.totalScore}%</div>
            <div className="col-span-2">
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                student.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {student.grade}
              </span>
            </div>
            <div className="col-span-2 text-gray-600">25 min</div>
            <div className="col-span-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Student Detail View */}
      {selectedStudent && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {selectedStudent.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedStudent.name}</h3>
                <p className="text-gray-600">Score: {selectedStudent.totalScore}% ({selectedStudent.grade})</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {selectedStudent.answers.map((answer, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-800">
                        Question {index + 1}: {assignment.questions[index]?.type.replace('-', ' ')}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {answer.points} pt{answer.points > 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {assignment.questions[index]?.question}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Student's Answer:</p>
                        <div className={`p-2 rounded ${
                          answer.isCorrect ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {answer.userAnswer}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Correct Answer:</p>
                        <div className="p-2 rounded bg-green-100 text-green-800">
                          {answer.correctAnswer}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm">
                      <span className={`${
                        answer.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'} - 
                        Earned {answer.earnedPoints}/{answer.points} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResponseReview;