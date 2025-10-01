import React, { useState, useCallback, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Plus, 
  MessageSquare, 
  GraduationCap, 
  Lock, 
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
  ChevronRight,
  X,
  Send,
  User,
  Key,
  Mail as MailIcon,
  ExternalLink,
  Home,
  BarChart3,
  FileText as FileTextIcon,
  Settings,
  LogOut
} from 'lucide-react';

/* =========================================================================
   Child components are declared OUTSIDE of App so they keep stable identity
   ========================================================================= */

const LandingPage = ({ setCurrentView }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
    <div className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-16">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">EduAI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => setCurrentView('teacher-login')}
            className="text-white hover:text-blue-200 transition-colors"
          >
            For Teachers
          </button>
          <button 
            onClick={() => setCurrentView('student-login')}
            className="text-white hover:text-blue-200 transition-colors"
          >
            For Students
          </button>
          <button 
            onClick={() => setCurrentView('request-access')}
            className="text-white hover:text-blue-200 transition-colors flex items-center space-x-1"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Request Access</span>
          </button>
        </div>
      </nav>

      <div className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            AI-Powered
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Revolutionize your classroom with AI-generated assignments, instant grading, 
            and personalized feedback. Currently invite-only for educators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentView('teacher-login')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Join as Teacher
            </button>
            <button 
              onClick={() => setCurrentView('student-login')}
              className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all border border-gray-200"
            >
              Student Login
            </button>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          { icon: Brain, title: "AI Assignment Creation", desc: "Generate assignments in seconds" },
          { icon: CheckCircle, title: "Auto Grading", desc: "Instant feedback and grading" },
          { icon: TrendingUp, title: "Progress Tracking", desc: "Monitor student performance" }
        ].map((feature, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-blue-100">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TeacherLoginPage = ({ setCurrentView, accessCode, setAccessCode, handleAccessCodeSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Teacher Access</h2>
        <p className="text-gray-600">Enter your invite code to get started</p>
      </div>
      
      <form onSubmit={handleAccessCodeSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
          <input
            type="password"
            value={accessCode}
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
      
      <div className="mt-6 text-center space-y-3">
        <p className="text-gray-600 text-sm">Don't have an access code?</p>
        <button 
          onClick={() => setCurrentView('request-access')}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Request Access
        </button>
        <button 
          onClick={() => setCurrentView('landing')}
          className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
        >
          <ChevronRight className="w-4 h-4 mr-1" />
          Back to homepage
        </button>
      </div>
    </div>
  </div>
);

const StudentLoginPage = ({ setCurrentView, invitationCode, setInvitationCode, handleInvitationCodeSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Login</h2>
        <p className="text-gray-600">Enter your invitation code to register</p>
      </div>
      
      <form onSubmit={handleInvitationCodeSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Invitation Code</label>
          <input
            type="text"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
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
      
      <div className="mt-6 text-center space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Students are invited by teachers. Check your email for an invitation code.
          </p>
        </div>
        <button 
          onClick={() => setCurrentView('landing')}
          className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
        >
          <ChevronRight className="w-4 h-4 mr-1" />
          Back to homepage
        </button>
      </div>
    </div>
  </div>
);

const RequestAccessPage = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    position: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', school: '', position: '', message: '' });
      }, 15000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Teacher Access</h2>
          <p className="text-gray-600">Fill out the form below and we'll review your request</p>
        </div>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Request Submitted!</h3>
            <p className="text-gray-600">We'll review your request and send you an access code via email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School/Institution</label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your school or institution"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., High School Math Teacher"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your teaching experience or why you'd like to use EduAI"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setCurrentView('landing')}
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
          >
            <ChevronRight className="w-4 h-4 mr-1" />
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

const TeacherRegistrationPage = ({ setCurrentView, onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Complete your registration to access EduAI</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
                required
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setCurrentView('teacher-login')}
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
          >
            <ChevronRight className="w-4 h-4 mr-1" />
            Back to access code
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentRegistrationPage = ({ setCurrentView, onRegister, invitationCode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onRegister({ ...formData, invitationCode });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Complete your registration to access EduAI</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
                required
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setCurrentView('student-login')}
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
          >
            <ChevronRight className="w-4 h-4 mr-1" />
            Back to invitation code
          </button>
        </div>
      </div>
    </div>
  );
};

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
  logout
}) => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const sidebarItems = userRole === 'teacher' 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'assignments', label: 'Assignments', icon: BookOpen },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileTextIcon },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'assignments', label: 'My Assignments', icon: BookOpen },
        { id: 'grades', label: 'My Grades', icon: Award },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings }
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">EduAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{currentUser?.name || 'User'}</p>
              <p className="text-sm text-gray-600 capitalize">{userRole}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {(currentUser?.name || 'U').split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

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
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
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
          {userRole === 'teacher' && (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Active Assignments</p>
                          <p className="text-3xl font-bold text-blue-600">{assignments.length}</p>
                        </div>
                        <BookOpen className="w-12 h-12 text-blue-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Total Students</p>
                          <p className="text-3xl font-bold text-purple-600">{students.length}</p>
                        </div>
                        <Users className="w-12 h-12 text-purple-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Avg. Grade</p>
                          <p className="text-3xl font-bold text-green-600">87%</p>
                        </div>
                        <Award className="w-12 h-12 text-green-100" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'assignments' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
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
                      <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                              {assignment.aiGenerated && (
                                <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                  <Brain className="w-3 h-3" />
                                  <span>AI Generated</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{assignment.subject}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{assignment.questions} questions</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{assignment.submissions} submissions</span>
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

              {activeTab === 'students' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Students</h2>
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
                      <div key={student.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 border-b">
                        <div className="col-span-4 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-gray-800">{student.name}</span>
                        </div>
                        <div className="col-span-3 text-gray-600">{student.email}</div>
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
                            <span className="text-sm text-gray-600 w-8">{student.progress}%</span>
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

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Class Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Average Grade</p>
                          <p className="text-3xl font-bold text-green-600">87%</p>
                        </div>
                        <Award className="w-12 h-12 text-green-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Active Assignments</p>
                          <p className="text-3xl font-bold text-blue-600">{assignments.length}</p>
                        </div>
                        <BookOpen className="w-12 h-12 text-blue-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Total Students</p>
                          <p className="text-3xl font-bold text-purple-600">{students.length}</p>
                        </div>
                        <Users className="w-12 h-12 text-purple-100" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {userRole === 'student' && (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Active Assignments</p>
                          <p className="text-3xl font-bold text-blue-600">{assignments.filter(a => a.status === 'active').length}</p>
                        </div>
                        <BookOpen className="w-12 h-12 text-blue-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Overall Grade</p>
                          <p className="text-3xl font-bold text-green-600">87%</p>
                        </div>
                        <Award className="w-12 h-12 text-green-100" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Progress</p>
                          <p className="text-3xl font-bold text-purple-600">92%</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-purple-100" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'assignments' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Assignments</h2>
                  <div className="grid gap-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                              {assignment.aiGenerated && (
                                <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                  <Brain className="w-3 h-3" />
                                  <span>AI Generated</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{assignment.subject}</p>
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
                                <span>{assignment.status === 'completed' ? 'Completed' : 'Pending'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'grades' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Grades</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
                      <div className="col-span-4">Assignment</div>
                      <div className="col-span-3">Subject</div>
                      <div className="col-span-2">Grade</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1">Status</div>
                    </div>
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 border-b">
                        <div className="col-span-4 font-medium text-gray-800">{assignment.title}</div>
                        <div className="col-span-3 text-gray-600">{assignment.subject}</div>
                        <div className="col-span-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                            {assignment.grade || 'A'}
                          </span>
                        </div>
                        <div className="col-span-2 text-gray-600">2024-01-15</div>
                        <div className="col-span-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            assignment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">Overall Progress</span>
                          <span className="text-gray-600">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">Mathematics</span>
                          <span className="text-gray-600">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">Literature</span>
                          <span className="text-gray-600">89%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700">Computer Science</span>
                          <span className="text-gray-600">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
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
      {showCreateModal && userRole === 'teacher' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Create AI Assignment</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mathematics, Literature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={newAssignment.difficulty}
                  onChange={(e) => setNewAssignment({...newAssignment, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newAssignment.questionCount}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || '1', 10);
                    setNewAssignment({...newAssignment, questionCount: isNaN(v) ? 1 : v});
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

/* =========================================================================
   App: holds state and stable handlers, renders the views
   ========================================================================= */

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [accessCode, setAccessCode] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      subject: "Computer Science",
      dueDate: "2024-01-15",
      status: "active",
      questions: 5,
      submissions: 12,
      aiGenerated: true,
      grade: "A"
    },
    {
      id: 2,
      title: "Shakespeare Analysis",
      subject: "Literature",
      dueDate: "2024-01-20",
      status: "completed",
      questions: 3,
      submissions: 8,
      aiGenerated: true,
      grade: "B+"
    }
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@email.com", grade: "A", progress: 95 },
    { id: 2, name: "Maria Garcia", email: "maria@email.com", grade: "B+", progress: 87 },
    { id: 3, name: "James Wilson", email: "james@email.com", grade: "A-", progress: 92 }
  ]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    difficulty: 'medium',
    questionCount: 5
  });
  const [tempUserData, setTempUserData] = useState(null);

  // Temporary data store for user accounts
  const userStore = useRef(new Map());

  // stable submit handler (keeps identity between renders when deps unchanged)
  const handleAccessCodeSubmit = useCallback((e) => {
    e.preventDefault();
    if (accessCode === 'TEACHER2024') {
      setTempUserData({ accessCode });
      setCurrentView('teacher-registration');
    } else {
      alert('Invalid access code. Please try again.');
    }
  }, [accessCode]);

  const handleInvitationCodeSubmit = useCallback((e) => {
    e.preventDefault();
    // Simulate checking if invitation code is valid
    if (invitationCode && invitationCode.length >= 6) {
      setTempUserData({ invitationCode });
      setCurrentView('student-registration');
    } else {
      alert('Invalid invitation code. Please check your email for the correct code.');
    }
  }, [invitationCode]);

  const handleTeacherRegistration = useCallback((userData) => {
    // Save to temporary data store
    const userId = Date.now().toString();
    userStore.current.set(userId, {
      id: userId,
      email: userData.email,
      password: userData.password,
      accessCode: tempUserData?.accessCode,
      createdAt: new Date().toISOString(),
      role: 'teacher'
    });
    
    setUserRole('teacher');
    setCurrentUser({ name: 'Dr. Sarah Chen', email: userData.email });
    setCurrentView('dashboard');
  }, [tempUserData]);

  const handleStudentRegistration = useCallback((userData) => {
    // Save to temporary data store
    const userId = Date.now().toString();
    userStore.current.set(userId, {
      id: userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      invitationCode: userData.invitationCode,
      createdAt: new Date().toISOString(),
      role: 'student'
    });
    
    setUserRole('student');
    setCurrentUser({ name: userData.name, email: userData.email });
    setCurrentView('dashboard');
  }, []);

  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView('landing');
  }, []);

  // stable generator (recomputes only when assignments/newAssignment change)
  const generateAssignment = useCallback(() => {
    const mockAssignment = {
      id: assignments.length + 1,
      title: newAssignment.title || `AI Assignment ${assignments.length + 1}`,
      subject: newAssignment.subject || 'General',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      questions: newAssignment.questionCount,
      submissions: 0,
      aiGenerated: true
    };
    setAssignments(prev => [...prev, mockAssignment]);
    setNewAssignment({ title: '', subject: '', difficulty: 'medium', questionCount: 5 });
  }, [assignments.length, newAssignment, setAssignments, setNewAssignment]);

  // choose view
  if (currentView === 'landing') return <LandingPage setCurrentView={setCurrentView} />;
  if (currentView === 'teacher-login') return (
    <TeacherLoginPage
      setCurrentView={setCurrentView}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      handleAccessCodeSubmit={handleAccessCodeSubmit}
    />
  );
  if (currentView === 'student-login') return (
    <StudentLoginPage
      setCurrentView={setCurrentView}
      invitationCode={invitationCode}
      setInvitationCode={setInvitationCode}
      handleInvitationCodeSubmit={handleInvitationCodeSubmit}
    />
  );
  if (currentView === 'request-access') return <RequestAccessPage setCurrentView={setCurrentView} />;
  if (currentView === 'teacher-registration') return (
    <TeacherRegistrationPage 
      setCurrentView={setCurrentView} 
      onRegister={handleTeacherRegistration} 
    />
  );
  if (currentView === 'student-registration') return (
    <StudentRegistrationPage 
      setCurrentView={setCurrentView} 
      onRegister={handleStudentRegistration}
      invitationCode={invitationCode}
    />
  );
  if (currentView === 'dashboard') return (
    <Dashboard
      assignments={assignments}
      students={students}
      newAssignment={newAssignment}
      setNewAssignment={setNewAssignment}
      generateAssignment={generateAssignment}
      setAssignments={setAssignments}
      setStudents={setStudents}
      userRole={userRole}
      currentUser={currentUser}
      logout={logout}
    />
  );

  return <LandingPage setCurrentView={setCurrentView} />;
};

export default App;