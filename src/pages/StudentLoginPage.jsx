// src/pages/StudentLoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useNotification } from "../context/NotificationContext";
import {
  Mail,
  ChevronRight,
  User,
  Key,
  Mail as MailIcon,
  LogIn,
} from "lucide-react";

const StudentLoginPage = () => {
  // ❌ Remove props
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Get everything from context
  const {
    invitationCode,
    setInvitationCode,
    setCurrentUser,
    setUserRole,
    handleStudentLogin,
  } = useAppContext();

  const { showSuccess, showError } = useNotification();

  // Check if user has saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("studentEmail");
    const savedRemember = localStorage.getItem("studentRemember") === "true";

    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
      setShowLoginForm(true);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = handleStudentLogin(email, password);

    if (result.success) {
      showSuccess(result.message);

      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem("studentEmail", email);
        localStorage.setItem("studentRemember", "true");
      } else {
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentRemember");
      }

      navigate("/dashboard");
    } else {
      showError(result.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentRemember");
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
          // Login Form for returning students
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600">Sign in to your student account</p>
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
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Use invitation code
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          // Invitation code form for new students
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Student Login
              </h2>
              <p className="text-gray-600">
                Enter your invitation code to register
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (invitationCode === "STUDENT2024") {
                  // ✅ Use from context
                  navigate("/student-registration");
                } else {
                  alert(
                    "Invalid invitation code. Please check your email for the correct code."
                  );
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invitation Code
                </label>
                <input
                  type="text"
                  value={invitationCode} // ✅ Now comes from context
                  onChange={(e) => setInvitationCode(e.target.value)} // ✅ Now comes from context
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your invitation code"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Students are invited by teachers. Check
                  your email for an invitation code.
                </p>
              </div>

              {/* New button for returning users */}
              <div className="pt-2">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center mx-auto"
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

export default StudentLoginPage;
