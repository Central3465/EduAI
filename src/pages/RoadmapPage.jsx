// src/pages/RoadmapPage.jsx
import React, { useState } from 'react';
import { 
  Calendar,
  CheckCircle,
  Clock,
  Rocket,
  Users,
  Vote,
  Brain,
  BookOpen,
  BarChart3,
  Smartphone,
  MessageSquare,
  ExternalLink,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Award,
  FileText,
  Home,
  User,   
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [votedFeatures, setVotedFeatures] = useState(new Set());

  // Mock roadmap data
  const roadmapFeatures = [
    {
      id: 1,
      title: "AI-Powered Lesson Plans",
      category: "ai",
      status: "completed",
      releaseDate: "2024-01-15",
      description: "Generate complete lesson plans with learning objectives, activities, and assessments using AI.",
      votes: 124,
      author: "Hanlin Bai",
      tags: ["AI", "Lesson Planning", "Automation"]
    },
    {
      id: 2,
      title: "Real-Time Collaboration",
      category: "learning",
      status: "in-progress",
      releaseDate: "2024-03-01",
      description: "Enable real-time collaboration between teachers and students during assignments and projects.",
      votes: 89,
      author: "Community Request",
      tags: ["Collaboration", "Live", "Chat"]
    },
    {
      id: 3,
      title: "Mobile App (iOS/Android)",
      category: "mobile",
      status: "planned",
      releaseDate: "2024-06-01",
      description: "Native mobile apps for iOS and Android with offline assignment access and push notifications.",
      votes: 256,
      author: "Most Requested",
      tags: ["Mobile", "Offline", "Notifications"]
    },
    {
      id: 4,
      title: "Advanced Analytics Dashboard",
      category: "analytics",
      status: "completed",
      releaseDate: "2024-01-10",
      description: "Comprehensive analytics with heatmaps, performance trends, and predictive insights.",
      votes: 78,
      author: "Hanlin Bai",
      tags: ["Analytics", "Charts", "Insights"]
    },
    {
      id: 5,
      title: "Gamified Learning Paths",
      category: "learning",
      status: "in-progress",
      releaseDate: "2024-04-15",
      description: "Gamify the learning experience with XP points, badges, leaderboards, and quests.",
      votes: 142,
      author: "Community Request",
      tags: ["Gamification", "XP", "Badges"]
    },
    {
      id: 6,
      title: "Parent Portal",
      category: "community",
      status: "planned",
      releaseDate: "2024-05-01",
      description: "Dedicated portal for parents to track student progress, grades, and communicate with teachers.",
      votes: 93,
      author: "Community Request",
      tags: ["Parents", "Communication", "Progress"]
    },
    {
      id: 7,
      title: "AI Writing Assistant",
      category: "ai",
      status: "planned",
      releaseDate: "2024-07-01",
      description: "AI-powered writing assistant to help students improve grammar, style, and clarity in their essays.",
      votes: 167,
      author: "Hanlin Bai",
      tags: ["AI", "Writing", "Grammar"]
    },
    {
      id: 8,
      title: "Offline Mode",
      category: "mobile",
      status: "in-progress",
      releaseDate: "2024-03-15",
      description: "Download assignments and work offline, with automatic sync when online.",
      votes: 189,
      author: "Most Requested",
      tags: ["Offline", "Sync", "Mobile"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: Star },
    { id: 'ai', name: 'AI Features', icon: Brain },
    { id: 'learning', name: 'Learning Tools', icon: BookOpen },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'community', name: 'Community', icon: Users }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const handleVote = (featureId) => {
    if (votedFeatures.has(featureId)) {
      setVotedFeatures(prev => {
        const newSet = new Set(prev);
        newSet.delete(featureId);
        return newSet;
      });
    } else {
      setVotedFeatures(prev => new Set([...prev, featureId]));
    }
  };

  const filteredFeatures = activeCategory === 'all' 
    ? roadmapFeatures 
    : roadmapFeatures.filter(f => f.category === activeCategory);

  const sortedFeatures = [...filteredFeatures].sort((a, b) => {
    // Sort by status: completed -> in-progress -> planned
    const statusOrder = { 'completed': 1, 'in-progress': 2, 'planned': 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    // Then sort by votes (descending)
    return b.votes - a.votes;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduAI Roadmap</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Our Journey Forward</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            See what's coming next in EduAI and help us prioritize the features that matter most to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span>{roadmapFeatures.length} Features Planned</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Vote className="w-5 h-5" />
              <span>{roadmapFeatures.reduce((sum, f) => sum + f.votes, 0)} Community Votes</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5" />
              <span>Fast Development</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {roadmapFeatures.filter(f => f.status === 'completed').length}
              </h3>
              <p className="text-gray-600">Features delivered</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  In Progress
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {roadmapFeatures.filter(f => f.status === 'in-progress').length}
              </h3>
              <p className="text-gray-600">Features developing</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Planned
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {roadmapFeatures.filter(f => f.status === 'planned').length}
              </h3>
              <p className="text-gray-600">Features upcoming</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Community
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {Math.round(roadmapFeatures.reduce((sum, f) => sum + f.votes, 0) / roadmapFeatures.length)}
              </h3>
              <p className="text-gray-600">Avg. votes per feature</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roadmap Features */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {sortedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(feature.status)}`}>
                        {getStatusIcon(feature.status)}
                        <span className="capitalize">
                          {feature.status.replace('-', ' ')}
                        </span>
                      </span>
                      {feature.status === 'planned' && (
                        <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Most Requested</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {feature.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(feature.releaseDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{feature.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => handleVote(feature.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        votedFeatures.has(feature.id)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Vote className="w-4 h-4" />
                      <span>{feature.votes + (votedFeatures.has(feature.id) ? 1 : 0)}</span>
                    </button>
                    {feature.status === 'planned' && (
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>Learn More</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Want to Suggest a Feature?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We'd love to hear your ideas! Help shape the future of EduAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Suggest a Feature</span>
            </button>
            <button
              onClick={() => window.open('https://github.com/Central3465/EduAI', '_blank')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>Star on GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;