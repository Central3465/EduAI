// src/pages/TeacherLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Lock, 
  ChevronRight,
  ExternalLink,
  User,
  Key,
  Mail as MailIcon,
  LogIn,
  UserPlus,
  Home
} from 'lucide-react';

const TeacherLoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true); // ✅ Default to login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const { handleTeacherLogin, currentUser, userRole } = useAppContext();
  const { showSuccess, showError } = useNotification();

  // Check if user has saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('teacherEmail');
    const savedRemember = localStorage.getItem('teacherRemember') === 'true';
    
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
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
        localStorage.setItem('teacherEmail', email);
        localStorage.setItem('teacherRemember', 'true');
      } else {
        localStorage.removeItem('teacherEmail');
        localStorage.removeItem('teacherRemember');
      }

      navigate('/dashboard');
    } else {
      showError(result.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherEmail');
    localStorage.removeItem('teacherRemember');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    console.log("=== LOADED PAGE ===", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {showLoginForm ? (
          // 🔹 Login Form
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
                  Forgot password?
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

            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowLoginForm(false)}
                className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Don't have an account? Sign up
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto mt-2"
              >
                <Home className="w-4 h-4 mr-1" />
                Back to homepage
              </button>
            </div>
          </>
        ) : (
          // 🔹 Sign Up Prompt
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join EduAI to create AI-powered assignments
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/teacher-registration')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up as Teacher</span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                onClick={() => setShowLoginForm(true)}
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Already have an account? Sign in</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to homepage</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherLoginPage;