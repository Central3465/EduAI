// src/pages/student/StudentDashboard.jsx
import React, { useState } from "react";
import StudentAssignmentTaker from "./../../components/assignments/StudentAssignmentTaker";
import AssignmentResults from "./../../components/assignments/AssignmentResults";
import AIRecommendations from "./../../components/assignments/AIRecommendations";
import { useAppContext } from "../../context/AppContext";
import { useNotification } from "../../context/NotificationContext";
import {
  BookOpen,
  Award,
  TrendingUp,
  Home,
  Brain,
  FileText,
  Calendar,
  CheckCircle,
  X,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";

// ✅ Add default empty array for assignments
const StudentDashboard = ({ activeTab, assignments = [] }) => {
  const [isTakingAssignment, setIsTakingAssignment] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [currentResults, setCurrentResults] = useState(null);
  const [answers, setAnswers] = useState({});

  const { setAssignments } = useAppContext();
  const { showError, showSuccess } = useNotification();

  // ✅ Add safety check for all array operations
  const safeAssignments = assignments || [];

  const handleStartAssignment = (assignment) => {
    setIsTakingAssignment(assignment);
    setAnswers({});
  };

  const handleAssignmentSubmit = (assignment, answers, aiFeedback = {}) => {
    try {
      let correct = 0;
      let total = assignment.questions.length;

      assignment.questions.forEach((question) => {
        const userAnswer = answers[question.id];
        if (userAnswer !== undefined) {
          if (question.type === 'multiple-choice' || question.type === 'true-false') {
            if (userAnswer == question.correctAnswer) {
              correct++;
            }
          } else if (question.type === 'short-answer' || question.type === 'fill-in-blank') {
            const feedback = aiFeedback[question.id];
            if (feedback && feedback.isCorrect) {
              correct++;
            }
          }
        }
      });

      const score = Math.round((correct / total) * 100);
      const grade = getGradeFromScore(score);

      setAssignments(prev => (prev || []).map(a => 
        a.id === assignment.id 
          ? { 
              ...a, 
              grade: `${score}%`,
              completedDate: new Date().toISOString().split('T')[0],
              submissions: (a.submissions || 0) + 1,
              aiFeedback: aiFeedback
            } 
          : a
      ));

      const resultsData = {
        assignment,
        answers: answers,
        score,
        grade,
        aiFeedback
      };

      setCurrentResults(resultsData);
      setIsTakingAssignment(null);
      setShowResults(true);
      
      showSuccess(`Assignment completed! You scored ${score}% (${grade})`);
    } catch (error) {
      showError('Error submitting assignment: ' + error.message);
      console.error('Assignment submission error:', error);
    }
  };

  const getGradeFromScore = (score) => {
    if (score >= 97) return "A+";
    if (score >= 93) return "A";
    if (score >= 90) return "A-";
    if (score >= 87) return "B+";
    if (score >= 83) return "B";
    if (score >= 80) return "B-";
    if (score >= 77) return "C+";
    if (score >= 73) return "C";
    if (score >= 70) return "C-";
    if (score >= 67) return "D+";
    if (score >= 65) return "D";
    return "F";
  };

  const handleAssignmentCancel = () => {
    setIsTakingAssignment(null);
  };

  const handleRetakeAssignment = () => {
    setShowResults(false);
    setIsTakingAssignment(currentResults.assignment);
  };

  const handleReviewAnswers = () => {
    // Stay on results page
  };

  const handleBackToAssignments = () => {
    setShowResults(false);
    setCurrentResults(null);
  };

  if (activeTab === "dashboard") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Assignments</p>
                <p className="text-3xl font-bold text-blue-600">
                  {
                    // ✅ Safe filter operation
                    safeAssignments.filter((a) => a.status === "active" && !a.grade)
                      .length
                  }
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Overall Grade</p>
                <p className="text-3xl font-bold text-green-600">
                  {safeAssignments.length > 0
                    ? Math.round(
                        safeAssignments
                          .filter((a) => a.grade)
                          .map((a) => {
                            const score = parseFloat(a.grade.replace("%", ""));
                            return isNaN(score) ? 0 : score;
                          })
                          .reduce((a, b) => a + b, 0) /
                          safeAssignments.filter((a) => a.grade).length
                      ) + "%"
                    : "0%"}
                </p>
              </div>
              <Award className="w-12 h-12 text-green-100" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Progress</p>
                <p className="text-3xl font-bold text-purple-600">
                  {safeAssignments.length > 0
                    ? Math.round(
                        (safeAssignments.filter((a) => a.grade).length /
                          safeAssignments.length) *
                          100
                      ) + "%"
                    : "0%"}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-100" />
            </div>
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Assignments
          </h3>
          <div className="space-y-3">
            {safeAssignments.slice(0, 3).map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {assignment.subject} • Due {assignment.dueDate}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {assignment.grade ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {assignment.grade}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartAssignment(assignment)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "assignments") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Assignments</h2>

        {/* Assignment Taker Modal */}
        {isTakingAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <StudentAssignmentTaker
                assignment={isTakingAssignment}
                onSubmit={(userAnswers) =>
                  handleAssignmentSubmit(isTakingAssignment, userAnswers)
                }
                onCancel={handleAssignmentCancel}
              />
            </div>
          </div>
        )}

        {/* Assignment Results Modal */}
        {showResults && currentResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <AssignmentResults
                assignment={currentResults.assignment}
                answers={currentResults.answers}
                score={currentResults.score}
                onRetake={handleRetakeAssignment}
                onReview={handleReviewAnswers}
                onBackToAssignments={handleBackToAssignments}
              />
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {safeAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {assignment.title}
                    </h3>
                    {assignment.aiGenerated && (
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        <Brain className="w-3 h-3" />
                        <span>AI Generated</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{assignment.subject}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>
                        {assignment.totalQuestions ||
                          assignment.questions.length}{" "}
                        questions
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {assignment.grade ? "Completed" : "Not Started"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {assignment.grade ? (
                    <div className="text-center">
                      <span className="block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-1">
                        {assignment.grade}
                      </span>
                      <span className="text-xs text-gray-500">
                        {assignment.completedDate || "Completed"}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartAssignment(assignment)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      Start Assignment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "ai-recommendations") {
    return (
      <AIRecommendations
        assignments={safeAssignments}
        studentPerformance={safeAssignments.filter((a) => a.grade)}
        onGenerateAssignment={(params) => {
          console.log("Generating assignment:", params);
        }}
      />
    );
  }

  if (activeTab === "grades") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Grades</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
            <div className="col-span-4">Assignment</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Grade</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
          </div>
          {safeAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 border-b"
            >
              <div className="col-span-4 font-medium text-gray-800">
                {assignment.title}
              </div>
              <div className="col-span-3 text-gray-600">
                {assignment.subject}
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    assignment.grade
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {assignment.grade || "N/A"}
                </span>
              </div>
              <div className="col-span-2 text-gray-600">
                {assignment.completedDate || assignment.dueDate}
              </div>
              <div className="col-span-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.grade
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {assignment.grade ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "progress") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">
                  Overall Progress
                </span>
                <span className="text-gray-600">
                  {safeAssignments.length > 0
                    ? Math.round(
                        (safeAssignments.filter((a) => a.grade).length /
                          safeAssignments.length) *
                          100
                      ) + "%"
                    : "0%"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  style={{
                    width:
                      safeAssignments.length > 0
                        ? `${
                            (safeAssignments.filter((a) => a.grade).length /
                              safeAssignments.length) *
                            100
                          }%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>

            {["Mathematics", "Literature", "Computer Science", "History"].map(
              (subject, index) => {
                const subjectAssignments = safeAssignments.filter(
                  (a) => a.subject === subject
                );
                const completedSubjectAssignments = subjectAssignments.filter(
                  (a) => a.grade
                );
                const subjectProgress =
                  subjectAssignments.length > 0
                    ? Math.round(
                        (completedSubjectAssignments.length /
                          subjectAssignments.length) *
                          100
                      )
                    : 0;

                return (
                  <div key={subject}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        {subject}
                      </span>
                      <span className="text-gray-600">{subjectProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          index === 0
                            ? "bg-green-500"
                            : index === 1
                            ? "bg-blue-500"
                            : index === 2
                            ? "bg-purple-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${subjectProgress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Assignment Performance
          </h3>
          <div className="space-y-4">
            {safeAssignments
              .filter((a) => a.grade)
              .slice(0, 5)
              .map((assignment, index) => (
                <div key={assignment.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">
                      {assignment.title}
                    </span>
                    <span className="text-gray-600">{assignment.grade}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{
                        width: assignment.grade
                          ? assignment.grade.replace("%", "") + "%"
                          : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StudentDashboard;