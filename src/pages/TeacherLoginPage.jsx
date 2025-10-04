// src/pages/TeacherLoginPage.jsx

import React, { useState, useEffect } from 'react';

// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Import our global app state (like accessCode, setAccessCode, etc.)
import { useAppContext } from '../context/AppContext';

// Import icons for UI
import { 
  Lock, 
  ChevronRight,
  ExternalLink,
  User,
  Key,
  Mail as MailIcon,
  LogIn 
} from 'lucide-react';

// 🚫 NO PROPS! We don't receive anything from parent anymore.
// In React Router, pages are rendered directly — no props passed.
// Instead, we get shared data from context (useAppContext).
const TeacherLoginPage = () => {
  
  // Local state for the login form (email, password, etc.)
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Hook to navigate to other pages (like /teacher-registration)
  const navigate = useNavigate();

  // Get shared state and functions from our AppContext
  // These replace the old props like `accessCode`, `setAccessCode`, etc.
  const { accessCode, setAccessCode } = useAppContext();

  // 💡 When the component loads, check if teacher was remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem('teacherEmail');
    const savedRemember = localStorage.getItem('teacherRemember') === 'true';
    
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
      setShowLoginForm(true); // Show login form instead of access code form
    }
  }, []); // Empty dependency array = run only once on mount

  // 🔐 Handle form submission for the ACCESS CODE (not email/password yet)
  const handleAccessCodeSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check if the access code is correct
    if (accessCode === 'TEACHER2024') {
      // ✅ Valid code → go to registration page
      navigate('/teacher-registration');
    } else {
      // ❌ Invalid code → show error
      alert('Invalid access code. Please try again.');
    }
  };

  // 📥 Handle email/password login (for returning teachers)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Save email if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem('teacherEmail', email);
      localStorage.setItem('teacherRemember', 'true');
    } else {
      localStorage.removeItem('teacherEmail');
      localStorage.removeItem('teacherRemember');
    }

    console.log('Login attempt with:', { email, password });
    // TODO: In a real app, you'd call an API here
    // For now, just go to dashboard
    navigate('/dashboard');
  };

  // 🚪 Log out (clear saved data and go back to access code screen)
  const handleLogout = () => {
    localStorage.removeItem('teacherEmail');
    localStorage.removeItem('teacherRemember');
    setEmail('');
    setPassword('');
    setShowLoginForm(false); // Go back to access code form
  };

  // 🖼️ Render either the access code form OR the email login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Show login form if teacher is returning */}
        {showLoginForm ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Teacher!</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Sign In
              </button>
            </form>
          </>
        ) : (
          // 🔑 Show access code form for new teachers
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Teacher Access</h2>
              <p className="text-gray-600">Enter your invite code to get started</p>
            </div>
            
            {/* This form uses the accessCode from context */}
            <form onSubmit={handleAccessCodeSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
                <input
                  type="password"
                  // ✅ `accessCode` comes from context (not props!)
                  value={accessCode}
                  // ✅ `setAccessCode` is a real function from context
                  onChange={(e) => setAccessCode(e.target.value)}
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
            
            {/* Helper links */}
            <div className="mt-6 text-center space-y-4">
              <p className="text-gray-600 text-sm">Don't have an access code?</p>
              <button 
                onClick={() => navigate('/request-access')}
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