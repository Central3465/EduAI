import { useState, useEffect } from 'react'; // only if you use hooks
import { motion } from 'framer-motion'; // only used in LandingPage
import {
  GraduationCap,
  Brain,
  CheckCircle,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

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

export default LandingPage;