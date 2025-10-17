// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useSubscription } from "../context/SubscriptionContext";
import { useNotification } from "../context/NotificationContext";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import PaywallScreen from "../components/paywall/PaywallScreen";
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
  Crown,
  Loader2, // ✅ Import the loader icon
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const {
    userRole,
    currentUser,
    logout,
    assignments,
    students,
    setAssignments,
    setStudents,
    // ✅ Add missing context values
    newAssignment,
    setNewAssignment,
    generateAssignment,
    setShowCreateModal,
    showCreateModal,
  } = useAppContext();

  const { canAccessDashboard, subscription, trialEnded, isAdmin, loading } =
    useSubscription();

  const { showSuccess, showError } = useNotification();

  // ✅ New state for loading simulation
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Simulate loading/checking for 10 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 10 seconds

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("=== DASHBOARD DEBUG INFO ===");
      console.log("currentUser:", currentUser);
      console.log("userRole:", userRole);
      console.log("subscription:", subscription);
      console.log("isAdmin():", isAdmin());
      console.log("canAccessDashboard():", canAccessDashboard());
    }
  }, [
    currentUser,
    userRole,
    subscription,
    isAdmin,
    canAccessDashboard,
    loading,
  ]);

  // ✅ Redirect guests to login (only if not loading)
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/");
      return;
    }
  }, [currentUser, navigate, isLoading]);

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully!");
    navigate("/");
  };

  // ✅ Show loading screen if still checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Preparing Your Dashboard...
          </h2>
          <p className="text-gray-300">
            Please wait while we set everything up for you.
          </p>
          <div className="mt-6 w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
          </div>
          <style jsx="true">{`
            @keyframes progress {
              0% {
                width: 0%;
              }
              100% {
                width: 100%;
              }
            }
            .animate-progress {
              animation: progress 10s linear forwards;
            }
          `}</style>
        </div>
      </div>
    );
  }

  {
    userRole === "teacher" && subscription && (
      <div className="flex items-center space-x-2">
        {/* ✅ Show Admin Badge using isAdmin() function */}
        {!loading && isAdmin() ? ( // ✅ Use isAdmin() function instead of subscription.isAdmin
          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Crown className="w-3 h-3" />
            <span>Admin Access</span>
          </div>
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              subscription.planId === "free"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : subscription.planId === "basic"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            }`}
          >
            {subscription.planId === "free"
              ? "Free Trial"
              : subscription.planId === "basic"
              ? "Basic Plan"
              : subscription.planId === "pro"
              ? "Pro Plan"
              : "Enterprise"}
          </span>
        )}

        {/* Trial countdown for non-admins */}
        {!isAdmin() &&
          subscription.planId === "free" &&
          subscription.trialEndsAt && ( // ✅ Use isAdmin() here too
            <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-300">
              <Clock className="w-3 h-3" />
              <span>
                {Math.ceil(
                  (new Date(subscription.trialEndsAt) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days left
              </span>
            </div>
          )}
      </div>
    );
  }

  if (userRole === "teacher" && !canAccessDashboard() && !isAdmin()) {
    // ✅ Add isAdmin() check
    return (
      <PaywallScreen subscription={subscription} trialEnded={trialEnded} />
    );
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      subscription.planId === "free"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : subscription.planId === "basic"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {subscription.planId === "free"
                      ? "Free Trial"
                      : subscription.planId === "basic"
                      ? "Basic Plan"
                      : subscription.planId === "pro"
                      ? "Pro Plan"
                      : "Enterprise"}
                  </span>

                  {subscription.planId === "free" &&
                    subscription.trialEndsAt && (
                      <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-300">
                        <Clock className="w-3 h-3" />
                        <span>
                          {Math.ceil(
                            (new Date(subscription.trialEndsAt) - new Date()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days left
                        </span>
                      </div>
                    )}
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {currentUser?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {userRole === "teacher" ? "Teacher" : "Student"}
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
            <StudentDashboard
              activeTab={activeTab}
              assignments={assignments}
              // ... other props
            />
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
