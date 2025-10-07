// src/pages/TeacherLoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; // ✅ Import context
import { useNotification } from "../context/NotificationContext";
import {
  Lock,
  ChevronRight,
  ExternalLink,
  User,
  Key,
  Mail as MailIcon,
  LogIn,
} from "lucide-react";

const TeacherLoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { handleTeacherLogin, accessCode, setAccessCode } = useAppContext(); // ✅ Get from context
  const { showSuccess, showError } = useNotification();

  // Check if user has saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("teacherEmail");
    const savedRemember = localStorage.getItem("teacherRemember") === "true";

    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
      setShowLoginForm(true);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = handleTeacherLogin(email, password);

    if (result.success) {
      showSuccess(result.message);

      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem("teacherEmail", email);
        localStorage.setItem("teacherRemember", "true");
      } else {
        localStorage.removeItem("teacherEmail");
        localStorage.removeItem("teacherRemember");
      }

      navigate("/dashboard");
    } else {
      showError(result.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherEmail");
    localStorage.removeItem("teacherRemember");
    setEmail("");
    setPassword("");
    setShowLoginForm(false);
  };

  useEffect(() => {
    console.log("=== LOADED PAGE ===", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {showLoginForm ? (
          // Login Form for returning teachers
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back, Teacher!
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Use access code
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </>
        ) : (
          // Access code form for new teachers
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Teacher Access
              </h2>
              <p className="text-gray-600">
                Enter your invite code to get started
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (accessCode === "TEACHER2024") {
                  // ✅ Now accessCode is defined
                  navigate("/teacher-registration");
                } else {
                  alert("Invalid access code. Please try again.");
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={accessCode} // ✅ Now comes from context
                  onChange={(e) => setAccessCode(e.target.value)} // ✅ Now comes from context
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your access code"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-gray-600 text-sm">
                Don't have an access code?
              </p>
              <button
                onClick={() => navigate("/request-access")}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Request Access
              </button>

              <div className="pt-2">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Already have an account? Sign in
                </button>
              </div>

              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                Back to homepage
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherLoginPage;
