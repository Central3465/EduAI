// src/pages/Dashboard.jsx
import Header from "../components/layout/Header";
import React, { useState, useEffect } from "react";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  FileText as FileTextIcon,
  Award,
  TrendingUp,
  Settings,
  Brain
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate(); // Get navigate from hook 
  const { 
    userRole, 
    currentUser, 
    logout,
    assignments,     
    students,         
    newAssignment,    
    setStudents,       
    setNewAssignment, 
    generateAssignment, 
    setAssignments,   
  } = useAppContext();

  console.log("Dashboard rendered with role:", userRole);

  const [isLoading, setIsLoading] = useState(true);

  // always run useEffect, don't throw conditionally
  useEffect(() => {
    if (!userRole) {
      console.log("No user role found, redirecting to homepage");
      // Instead of throwing, redirect or show error after delay
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } else {
      setIsLoading(false);
    }
  }, [userRole, navigate]); //navigate is now properly in dependencies

  // Show loading while checking
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Checking Authentication...
          </h2>
          <p className="text-gray-300">Redirecting to login in 2 seconds.</p>
        </div>
      </div>
    );
  }

  // Only render dashboard if role is valid
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
          { id: "ai-recommendations", label: "AI Recommendations", icon: Brain },
          { id: "settings", label: "Settings", icon: Settings },
        ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header currentUser={currentUser} userRole={userRole} onLogout={logout} />

      <div className="container mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mr-8 h-fit">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
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
              assignments={assignments}          
              students={students}               
              newAssignment={newAssignment}     
              setNewAssignment={setNewAssignment} 
              generateAssignment={generateAssignment} 
              setAssignments={setAssignments}   
              setStudents={setStudents}         
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
            />
          ) : (
            <StudentDashboard
              activeTab={activeTab}
              assignments={assignments}
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
