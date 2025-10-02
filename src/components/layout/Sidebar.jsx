// src/components/layout/Sidebar.jsx
import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { Home, BookOpen, Users, BarChart3, FileText as FileTextIcon, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
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
    <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
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
  );
};

export default Sidebar;