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

export default TeacherLoginPage;