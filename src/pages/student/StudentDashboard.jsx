// src/pages/student/StudentDashboard.jsx
import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  TrendingUp,
  Home,
  Brain,
  FileText,
  Calendar,
  CheckCircle,
  X,
} from 'lucide-react';

const StudentDashboard = ({ activeTab, assignments }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
        {/* ... student dashboard cards ... */}
      </div>
    );
  }

  if (activeTab === 'assignments') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Assignments</h2>
        {/* ... assignment list + modal ... */}
        {selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* ... modal content ... */}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'grades') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Grades</h2>
        {/* ... grades table ... */}
      </div>
    );
  }

  if (activeTab === 'progress') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
        {/* ... progress bars ... */}
      </div>
    );
  }

  return null;
};

export default StudentDashboard;