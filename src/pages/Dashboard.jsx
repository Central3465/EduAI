// src/pages/Dashboard.jsx
import Header from "../components/layout/Header";
import React, { useState } from "react";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  FileText as FileTextIcon,
  Award,
  TrendingUp,
  Settings,
} from "lucide-react";

const Dashboard = ({ userRole, currentUser, logout, ...props }) => {
  console.log('Dashboard rendered with role:', userRole);

  // ✅ If userRole is undefined, null, or invalid, throw an error
  if (!userRole || !['teacher', 'student'].includes(userRole)) {
    console.error('Dashboard: userRole is invalid or missing:', userRole);
    throw new Error(`Invalid user role: ${userRole}. Please log in again.`);
  }

  const [activeTab, setActiveTab] = useState("dashboard");
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />

      <div className="container mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-6 mr-8 h-fit">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {userRole === "teacher" ? (
            <TeacherDashboard
              activeTab={activeTab}
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
              {...props}
            />
          ) : (
            <StudentDashboard
              activeTab={activeTab}
              assignments={props.assignments}
            />
          )}
        </div>
      </div>

      {/* Create Assignment Modal (only for teacher) */}
      {userRole === "teacher" && showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* ... your modal JSX ... */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;