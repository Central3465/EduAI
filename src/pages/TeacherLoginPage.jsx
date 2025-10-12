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
  AlertTriangle
} from 'lucide-react';

const TeacherLoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const { handleTeacherLogin, currentUser, userRole } = useAppContext();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const savedEmail = localStorage.getItem('teacherEmail');
    const savedRemember = localStorage.getItem('teacherRemember') === 'true';
    
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
    setShowLoginForm(false);
  };

  useEffect(() => {
    console.log("=== LOADED PAGE ===", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {showLoginForm ? (
          // 🔹 Existing Login Form
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
                  Back
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
          // 🔹 Access Code Removed — Warning Notice Instead
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Access Code Discontinued
              </h2>
              <p className="text-gray-600">
                The teacher access code system has been discontinued.  
                Please use an alternative method to sign in or sign up.
              </p>
            </div>

            <div className="mt-6 text-center space-y-4">
              <button 
                onClick={() => setShowLoginForm(true)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign in with your existing account
              </button>

              <button 
                onClick={() => navigate('/teacher-registration')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Sign up for a new account
              </button>

              <button 
                onClick={() => navigate('/')}
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
