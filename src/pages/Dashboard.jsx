// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useSubscription } from "../context/SubscriptionContext";
import { useNotification } from "../context/NotificationContext";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import PaywallScreen from "../components/paywall/PaywallScreen"; // ✅ We'll create this
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  Award,
  TrendingUp,
  Settings,
  LogOut,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  
  // ✅ Get all context values
  const { 
    userRole, 
    currentUser, 
    logout,
    assignments,
    students,
    setAssignments,
    setStudents
  } = useAppContext();
  
  // ✅ Get subscription context
  const { 
    canAccessDashboard, 
    subscription, 
    trialEnded 
  } = useSubscription();
  
  const { showSuccess, showError } = useNotification();

  // ✅ Redirect guests to login
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
  }, [currentUser, navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully!");
    navigate("/");
  };

  // ✅ Show paywall if user can't access dashboard
  if (userRole === "teacher" && !canAccessDashboard()) {
    return <PaywallScreen subscription={subscription} trialEnded={trialEnded} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                EduAI
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Subscription Status Badge (for teachers) */}
              {userRole === "teacher" && subscription && (
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    subscription.planId === 'free' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : subscription.planId === 'basic'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {subscription.planId === 'free' ? 'Free Trial' : 
                     subscription.planId === 'basic' ? 'Basic Plan' : 
                     subscription.planId === 'pro' ? 'Pro Plan' : 'Enterprise'}
                  </span>
                  
                  {subscription.planId === 'free' && subscription.trialEndsAt && (
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-300">
                      <Clock className="w-3 h-3" />
                      <span>
                        {Math.ceil((new Date(subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24))} days left
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {currentUser?.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {userRole === 'teacher' ? 'Teacher' : 'Student'}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
            <StudentDashboard activeTab={activeTab} assignments={assignments} />
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar items based on user role
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "assignments", label: "Assignments", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "grades", label: "Grades", icon: Award },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

export default Dashboard;