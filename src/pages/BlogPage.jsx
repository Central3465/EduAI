// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { useAppContext } from '../context/AppContext';
import BlogList from '../components/blog/BlogList';
import BlogEditor from '../components/blog/BlogEditor';
import BlogViewer from '../components/blog/BlogViewer';
import { 
  Home, 
  FileText, 
  ChevronLeft,
  BookOpen,
  Users,
  Award,
  BarChart3,
  Settings
} from 'lucide-react';

const BlogPage = () => {
  const navigate = useNavigate();
  const { 
    articles, 
    isAdmin, 
    createArticle, 
    updateArticle, 
    deleteArticle, 
    getPublishedArticles,
    getArticleById,
    incrementViews
  } = useBlogContext();
  
  const { currentUser } = useAppContext();
  
  const [viewMode, setViewMode] = useState('list'); // list, editor, viewer
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  // Get articles based on user role
  const displayedArticles = isAdmin() ? articles : getPublishedArticles();

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setViewMode('editor');
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setViewMode('editor');
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(articleId);
    }
  };

  const handleSaveArticle = (articleData) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      createArticle(articleData);
    }
    setViewMode('list');
    setEditingArticle(null);
  };

  const handleViewArticle = (article) => {
    setSelectedArticle(article);
    incrementViews(article.id);
    setViewMode('viewer');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedArticle(null);
    setEditingArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                EduAI Blog
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {currentUser?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-800 dark:text-white">
                    {currentUser?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {currentUser?.role === 'teacher' ? 'Teacher' : 'Student'}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Back to dashboard"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {viewMode === 'list' && (
          <BlogList
            articles={displayedArticles}
            isAdmin={isAdmin}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
            onCreate={handleCreateArticle}
            onView={handleViewArticle}
          />
        )}

        {viewMode === 'editor' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>
            </div>
            <BlogEditor
              article={editingArticle}
              onSave={handleSaveArticle}
              onCancel={handleBackToList}
            />
          </div>
        )}

        {viewMode === 'viewer' && selectedArticle && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div></div>
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>
            </div>
            <BlogViewer
              article={selectedArticle}
              isAdmin={isAdmin}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;