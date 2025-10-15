// src/pages/CommunityPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import PostDetailView from '../components/forum/PostDetailView';
import CreatePostModal from '../components/forum/CreatePostModal';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  Tag,
  TrendingUp,
  Lightbulb,
  Bug,
  Megaphone,
  Users,
  Award,
  Home,
  ExternalLink,
  ChevronRight,
  X,
  Mail,
  Bell,
  Settings,
  Star,
  CheckCircle,
  Clock,
  Rocket,
} from 'lucide-react';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { currentUser, userRole } = useAppContext();
  const { showSuccess, showError } = useNotification();
  
  const [activeTab, setActiveTab] = useState('forum');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Mock forum data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Add dark mode support",
      content: "It would be great to have a dark mode option for late-night studying!",
      author: { name: "Alex Johnson", email: "alex@example.com" },
      category: "feature-request",
      tags: ["ui", "accessibility"],
      votes: 42,
      comments: 8,
      status: "planned",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:22:00Z"
    },
    {
      id: 2,
      title: "Mobile app for iOS/Android",
      content: "A native mobile app would make it so much easier to access assignments on the go.",
      author: { name: "Maria Garcia", email: "maria@example.com" },
      category: "feature-request",
      tags: ["mobile", "app"],
      votes: 127,
      comments: 23,
      status: "in-progress",
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-22T16:45:00Z"
    },
    {
      id: 3,
      title: "Bug: Assignment timer not working",
      content: "The timer stops counting down after 10 minutes in assignments.",
      author: { name: "James Wilson", email: "james@example.com" },
      category: "bug-report",
      tags: ["timer", "bug"],
      votes: 15,
      comments: 5,
      status: "reported",
      createdAt: "2024-01-18T11:20:00Z",
      updatedAt: "2024-01-18T11:20:00Z"
    },
    {
      id: 4,
      title: "New question type: Drag and Drop",
      content: "It would be awesome to have drag-and-drop questions for interactive learning.",
      author: { name: "Sarah Chen", email: "sarah@example.com" },
      category: "feature-request",
      tags: ["question-type", "interactive"],
      votes: 63,
      comments: 12,
      status: "under-review",
      createdAt: "2024-01-12T14:45:00Z",
      updatedAt: "2024-01-19T09:30:00Z"
    },
    {
      id: 5,
      title: "EduAI v2.0 Release Notes",
      content: "Check out all the new features in our latest release!",
      author: { name: "Hanlin Bai", email: "hanlinbai667@gmail.com" },
      category: "announcement",
      tags: ["release", "update"],
      votes: 28,
      comments: 3,
      status: "published",
      createdAt: "2024-01-20T08:00:00Z",
      updatedAt: "2024-01-20T08:00:00Z"
    }
  ]);
  
  const [userVotes, setUserVotes] = useState({}); // Track user votes

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts', icon: Users },
    { id: 'feature-request', name: 'Feature Requests', icon: Lightbulb },
    { id: 'bug-report', name: 'Bug Reports', icon: Bug },
    { id: 'discussion', name: 'General Discussion', icon: MessageSquare },
    { id: 'announcement', name: 'Announcements', icon: Megaphone }
  ];

  // Sort posts
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    } else if (sortBy === 'comments') {
      return b.comments - a.comments;
    } else {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });

  // Filter posts
  const filteredPosts = sortedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle voting
  const handleVote = (postId, voteType) => {
    if (!currentUser) {
      showError('Please log in to vote on posts');
      return;
    }

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        // Check if user already voted
        const userVote = userVotes[postId];
        let newVotes = post.votes;
        
        if (userVote === 'up') {
          newVotes -= 1;
        } else if (userVote === 'down') {
          newVotes += 1;
        }
        
        if (voteType === 'up') {
          newVotes += 1;
        } else if (voteType === 'down') {
          newVotes -= 1;
        }
        
        // Update user vote
        setUserVotes(prev => ({
          ...prev,
          [postId]: voteType
        }));
        
        return { ...post, votes: newVotes };
      }
      return post;
    }));
  };

  // Create new post
  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      content: postData.content,
      author: { name: currentUser.name, email: currentUser.email },
      category: postData.category,
      tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      votes: 0,
      comments: 0,
      status: postData.category === 'feature-request' ? 'under-review' : 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPosts(prev => [newPost, ...prev]);
    setShowCreateModal(false);
    showSuccess('Post created successfully!');
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'planned': { text: 'Planned', color: 'bg-blue-100 text-blue-800' },
      'in-progress': { text: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
      'completed': { text: 'Completed', color: 'bg-green-100 text-green-800' },
      'under-review': { text: 'Under Review', color: 'bg-purple-100 text-purple-800' },
      'reported': { text: 'Reported', color: 'bg-red-100 text-red-800' },
      'published': { text: 'Published', color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'feature-request': Lightbulb,
      'bug-report': Bug,
      'discussion': MessageSquare,
      'announcement': Megaphone
    };
    
    const Icon = iconMap[category] || Users;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduAI Community</h1>
            </div>

            <div className="flex items-center space-x-4">
              {currentUser && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {currentUser.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-800">
                      {currentUser.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {userRole === 'teacher' ? 'Teacher' : 'Student'}
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Back to homepage"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Join the EduAI Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Share ideas, report bugs, request features, and connect with fellow educators and students.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>{posts.length} Posts</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              <Users className="w-4 h-4" />
              <span>1,234 Members</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>{posts.filter(p => p.category === 'feature-request').length} Ideas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        filterCategory === category.id
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold text-gray-800">{posts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Feature Requests</span>
                  <span className="font-semibold text-gray-800">
                    {posts.filter(p => p.category === 'feature-request').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bug Reports</span>
                  <span className="font-semibold text-gray-800">
                    {posts.filter(p => p.category === 'bug-report').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Top Voted</span>
                  <span className="font-semibold text-gray-800">
                    {Math.max(...posts.map(p => p.votes))} votes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Forum */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search posts..."
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="votes">Most Voted</option>
                    <option value="comments">Most Commented</option>
                  </select>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Post</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {post.title}
                          </h3>
                          {getStatusBadge(post.status)}
                          <div className="flex items-center space-x-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {getCategoryIcon(post.category)}
                            <span className="capitalize">
                              {post.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {post.content.substring(0, 120)}...
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(post.id, 'up');
                            }}
                            className={`p-1 rounded-full ${
                              userVotes[post.id] === 'up'
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium text-gray-700">
                            {post.votes}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(post.id, 'down');
                            }}
                            className={`p-1 rounded-full ${
                              userVotes[post.id] === 'down'
                                ? 'bg-red-100 text-red-600'
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Posts Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('all');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CreatePostModal
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreatePost}
              currentUser={currentUser}
            />
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <PostDetailView
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
              onVote={handleVote}
              userVotes={userVotes}
              currentUser={currentUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;