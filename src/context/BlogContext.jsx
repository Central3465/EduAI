// src/context/BlogContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAppContext } from './AppContext';

const BlogContext = createContext();

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAppContext();
  
  // Load articles from localStorage
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('blogArticles');
    return saved ? JSON.parse(saved) : [];
  });

  // Save articles to localStorage
  useEffect(() => {
    localStorage.setItem('blogArticles', JSON.stringify(articles));
  }, [articles]);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return currentUser?.email === 'hanlinbai667@gmail.com';
  }, [currentUser]);

  // Create new article
  const createArticle = useCallback((articleData) => {
    if (!isAdmin()) {
      throw new Error('Only admin can create articles');
    }

    const newArticle = {
      id: Date.now().toString(),
      title: articleData.title,
      content: articleData.content,
      excerpt: articleData.excerpt || articleData.content.substring(0, 150) + '...',
      author: currentUser?.name || 'Admin',
      authorEmail: currentUser?.email,
      category: articleData.category || 'General',
      tags: articleData.tags || [],
      status: articleData.status || 'draft', // draft, published
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: articleData.status === 'published' ? new Date().toISOString() : null,
      views: 0,
      likes: 0
    };

    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  }, [isAdmin, currentUser]);

  // Update article
  const updateArticle = useCallback((articleId, articleData) => {
    if (!isAdmin()) {
      throw new Error('Only admin can update articles');
    }

    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { 
            ...article, 
            ...articleData,
            updatedAt: new Date().toISOString(),
            publishedAt: articleData.status === 'published' && !article.publishedAt 
              ? new Date().toISOString() 
              : article.publishedAt
          } 
        : article
    ));
  }, [isAdmin]);

  // Delete article
  const deleteArticle = useCallback((articleId) => {
    if (!isAdmin()) {
      throw new Error('Only admin can delete articles');
    }

    setArticles(prev => prev.filter(article => article.id !== articleId));
  }, [isAdmin]);

  // Get published articles
  const getPublishedArticles = useCallback(() => {
    return articles.filter(article => article.status === 'published');
  }, [articles]);

  // Get all articles (admin only)
  const getAllArticles = useCallback(() => {
    return isAdmin() ? articles : getPublishedArticles();
  }, [articles, isAdmin, getPublishedArticles]);

  // Get article by ID
  const getArticleById = useCallback((articleId) => {
    return articles.find(article => article.id === articleId);
  }, [articles]);

  // Increment article views
  const incrementViews = useCallback((articleId) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, views: article.views + 1 } 
        : article
    ));
  }, []);

  // Like article
  const likeArticle = useCallback((articleId) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 } 
        : article
    ));
  }, []);

  return (
    <BlogContext.Provider value={{
      articles,
      isAdmin,
      createArticle,
      updateArticle,
      deleteArticle,
      getPublishedArticles,
      getAllArticles,
      getArticleById,
      incrementViews,
      likeArticle
    }}>
      {children}
    </BlogContext.Provider>
  );
};