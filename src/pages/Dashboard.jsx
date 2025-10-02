import Header from "../components/layout/Header";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Plus,
  MessageSquare,
  GraduationCap,
  Mail,
  Brain,
  CheckCircle,
  TrendingUp,
  Award,
  Calendar,
  FileText,
  Eye,
  Edit3,
  Trash2,
  X,
  Home,
  BarChart3,
  FileText as FileTextIcon,
  Settings,
  LogOut,
} from "lucide-react";

const Dashboard = ({
  assignments,
  students,
  newAssignment,
  setNewAssignment,
  generateAssignment,
  setAssignments,
  setStudents,
  userRole,
  currentUser,
  logout,
}) => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const sidebarItems =
    userRole === "teacher"
      ? [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "assignments", label: "Assignments", icon: BookOpen },
          { id: "students", label: "Students", icon: Users },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "reports", label: "Reports", icon: FileTextIcon },
          { id: "settings", label: "Settings", icon: Settings },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "assignments", label: "My Assignments", icon: BookOpen },
          { id: "grades", label: "My Grades", icon: Award },
          { id: "progress", label: "Progress", icon: TrendingUp },
          { id: "settings", label: "Settings", icon: Settings },
        ];
const [selectedAssignment, setSelectedAssignment] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />

      <div className="container mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-6 mr-8 h-fit">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {userRole === "teacher" && (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Teacher Dashboard
                  </h2>
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
                            87%
                          </p>
                        </div>
                        <Award className="w-12 h-12 text-green-100" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assignments" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Assignments
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Assignment</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {assignments.map((assignment) => (
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
                            <p className="text-gray-600 mb-3">
                              {assignment.subject}
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{assignment.questions} questions</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>
                                  {assignment.submissions} submissions
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Due {assignment.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
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
              )}

              {activeTab === "students" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Students
                    </h2>
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
                        <div className="col-span-3 text-gray-600">
                          {student.email}
                        </div>
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
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Class Analytics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Average Grade</p>
                          <p className="text-3xl font-bold text-green-600">
                            87%
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
                </div>
              )}
            </>
          )}

          {userRole === "student" && (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Student Dashboard
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Active Assignments</p>
                          <p className="text-3xl font-bold text-blue-600">
                            {
                              assignments.filter((a) => a.status === "active")
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
                            87%
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
                            92%
                          </p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-purple-100" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assignments" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    My Assignments
                  </h2>
                  <div className="grid gap-4">
                    {assignments.map((assignment) => (
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
                            <p className="text-gray-600 mb-3">
                              {assignment.subject}
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{assignment.questions} questions</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Due {assignment.dueDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-4 h-4" />
                                <span>
                                  {assignment.status === "completed"
                                    ? "Completed"
                                    : "Pending"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedAssignment(assignment)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* View Assignment Modal */}
                  {selectedAssignment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                          <h2 className="text-2xl font-bold text-gray-800">
                            {selectedAssignment.title}
                          </h2>
                          <button
                            onClick={() => setSelectedAssignment(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {selectedAssignment.subject}
                            </span>
                            {selectedAssignment.aiGenerated && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
                                <Brain className="w-3 h-3" /> AI Generated
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Due Date</p>
                              <p className="font-medium">
                                {selectedAssignment.dueDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Questions</p>
                              <p className="font-medium">
                                {selectedAssignment.questions}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Status</p>
                              <p
                                className={`font-medium ${
                                  selectedAssignment.status === "completed"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {selectedAssignment.status === "completed"
                                  ? "Completed"
                                  : "Not Started"}
                              </p>
                            </div>
                            {selectedAssignment.grade && (
                              <div>
                                <p className="text-gray-600">Grade</p>
                                <p className="font-medium text-green-600">
                                  {selectedAssignment.grade}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="pt-4">
                            <p className="text-gray-700">
                              This assignment was generated by EduAI to help you
                              master key concepts in{" "}
                              {selectedAssignment.subject}. Complete all
                              questions to receive instant feedback and grading.
                            </p>
                          </div>
                        </div>

                        <div className="p-6 border-t flex justify-end gap-3">
                          <button
                            onClick={() => setSelectedAssignment(null)}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Close
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAssignment(null);
                              // We'll handle navigation in Part 2
                              window.location.href = `/assignment/${selectedAssignment.id}`;
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium"
                          >
                            {selectedAssignment.status === "completed"
                              ? "Review"
                              : "Start Assignment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "grades" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    My Grades
                  </h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
                      <div className="col-span-4">Assignment</div>
                      <div className="col-span-3">Subject</div>
                      <div className="col-span-2">Grade</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1">Status</div>
                    </div>
                    {assignments.map((assignment) => (
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
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                            {assignment.grade || "A"}
                          </span>
                        </div>
                        <div className="col-span-2 text-gray-600">
                          2024-01-15
                        </div>
                        <div className="col-span-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              assignment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {assignment.status === "completed"
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "progress" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Learning Progress
                  </h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">
                            Overall Progress
                          </span>
                          <span className="text-gray-600">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">
                            Mathematics
                          </span>
                          <span className="text-gray-600">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">
                            Literature
                          </span>
                          <span className="text-gray-600">89%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "89%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">
                            Computer Science
                          </span>
                          <span className="text-gray-600">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: "87%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && userRole === "teacher" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Create AI Assignment
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newAssignment.subject}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      subject: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mathematics, Literature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={newAssignment.difficulty}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newAssignment.questionCount}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || "1", 10);
                    setNewAssignment({
                      ...newAssignment,
                      questionCount: isNaN(v) ? 1 : v,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  generateAssignment();
                  setShowCreateModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>Generate with AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
