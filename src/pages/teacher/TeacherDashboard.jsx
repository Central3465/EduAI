// src/pages/teacher/TeacherDashboard.jsx
import React, { useState } from "react";
import AssignmentCreator from '../../components/assignments/AssignmentCreator';
import TeacherAssignmentAnalytics from '../../components/assingment/TeacherAssignmentAnalytics' // Add this import
import StudentResponseReview from '../../components/assingment/StudentResponseReview'; // Add this import
import {
  BookOpen,
  Users,
  Award,
  BarChart3,
  FileText as FileTextIcon,
  Home,
  Plus,
  Brain,
  FileText,
  Calendar,
  Users as UsersIcon,
  Eye,
  Edit3,
  Trash2,
  X,
  Mail,
  MessageSquare,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const TeacherDashboard = ({
  activeTab,
  assignments = [], // ✅ Default to empty array
  students = [],    // ✅ Default to empty array
  newAssignment,
  setNewAssignment,
  generateAssignment,
  setAssignments,
  setStudents,
  setShowCreateModal,
  showCreateModal,
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [activeAssignmentTab, setActiveAssignmentTab] = useState("analytics"); // For assignment detail view

  const handleCreateAssignment = (assignmentData) => {
  const newAssignment = {
    id: Date.now(),
    title: assignmentData.title,
    subject: assignmentData.subject,
    dueDate: assignmentData.dueDate,
    status: "active",
    questions: assignmentData.questions,
    aiGenerated: assignmentData.aiGenerated,
    difficulty: assignmentData.difficulty,
    totalQuestions: assignmentData.questions.length,
    submissions: 0,
    grade: null,
  };

  // ✅ Add safety check
  if (typeof setAssignments === 'function') {
    setAssignments((prev) => [...prev, newAssignment]);
  } else {
    console.error('setAssignments is not a function. Check if it was passed from parent.');
    // Fallback: you could show an error message or handle it differently
  }
  
  setIsCreatingAssignment(false);
};

  if (activeTab === "dashboard") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Assignments</p>
                <p className="text-3xl font-bold text-blue-600">
                  {assignments.length}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-purple-600">
                  {students.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-purple-100" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Avg. Grade</p>
                <p className="text-3xl font-bold text-green-600">
                  {assignments.length > 0
                    ? Math.round(
                        assignments
                          .filter((a) => a.grade)
                          .map((a) => parseFloat(a.grade.replace("%", "")))
                          .reduce((a, b) => a + b, 0) /
                          assignments.filter((a) => a.grade).length
                      ) + "%"
                    : "0%"}
                </p>
              </div>
              <Award className="w-12 h-12 text-green-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "assignments") {
    if (selectedAssignment) {
      // Assignment detail view with tabs
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedAssignment.title}
              </h2>
              <p className="text-gray-600">{selectedAssignment.subject}</p>
            </div>
            <button
              onClick={() => setSelectedAssignment(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Assignment Detail Tabs */}
          <div className="flex space-x-1 border-b border-gray-200">
            <button
              onClick={() => setActiveAssignmentTab("analytics")}
              className={`px-4 py-2 font-medium ${
                activeAssignmentTab === "analytics"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveAssignmentTab("responses")}
              className={`px-4 py-2 font-medium ${
                activeAssignmentTab === "responses"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Student Responses
            </button>
          </div>

          {activeAssignmentTab === "analytics" && (
            <TeacherAssignmentAnalytics assignment={selectedAssignment} />
          )}
          {activeAssignmentTab === "responses" && (
            <StudentResponseReview
              assignment={selectedAssignment}
              students={students}
            />
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
          <button
            onClick={() => setIsCreatingAssignment(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>

        {/* Assignment Creator Modal */}
        {isCreatingAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <AssignmentCreator
                onSave={handleCreateAssignment}
                onCancel={() => setIsCreatingAssignment(false)}
              />
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedAssignment(assignment)}
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
                  <p className="text-gray-600 mb-3">
                    {assignment.subject} • {assignment.difficulty} •{" "}
                    {assignment.totalQuestions} questions
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{assignment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{assignment.submissions} submissions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>Avg. Grade: {assignment.grade || "N/A"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAssignment(assignment);
                      setActiveAssignmentTab("analytics");
                    }}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "students") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all">
            <Mail className="w-4 h-4" />
            <span>Invite Students</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
            <div className="col-span-4">Student</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Grade</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-1">Actions</div>
          </div>
          {students.map((student) => (
            <div
              key={student.id}
              className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 border-b"
            >
              <div className="col-span-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="font-medium text-gray-800">
                  {student.name}
                </span>
              </div>
              <div className="col-span-3 text-gray-600">{student.email}</div>
              <div className="col-span-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  {student.grade}
                </span>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {student.progress}%
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "analytics") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Class Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Average Grade</p>
                <p className="text-3xl font-bold text-green-600">
                  {assignments.length > 0
                    ? Math.round(
                        assignments
                          .filter((a) => a.grade)
                          .map((a) => parseFloat(a.grade.replace("%", "")))
                          .reduce((a, b) => a + b, 0) /
                          assignments.filter((a) => a.grade).length
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
                <p className="text-gray-600">Active Assignments</p>
                <p className="text-3xl font-bold text-blue-600">
                  {assignments.length}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-purple-600">
                  {students.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-purple-100" />
            </div>
          </div>
        </div>

        {/* Assignment Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Assignment Performance
          </h3>
          <div className="space-y-4">
            {assignments.slice(0, 5).map((assignment, index) => (
              <div key={assignment.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">
                    {assignment.title}
                  </span>
                  <span className="text-gray-600">
                    {assignment.grade || "0%"}
                  </span>
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

export default TeacherDashboard;