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

export default StudentLoginPage;