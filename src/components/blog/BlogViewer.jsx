// src/components/blog/BlogViewer.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark, 
  MessageCircle,
  ThumbsUp,
  Clock,
  Tag,
  ExternalLink,
  Copy,
  Check,
  Edit3,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogViewer = ({ article, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Simulate loading article views/likes
  useEffect(() => {
    // In a real app, you'd fetch these from your backend
    console.log(`Viewing article: ${article.title}`);
  }, [article]);

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you'd send this to your backend
    console.log(`Article ${liked ? 'unliked' : 'liked'}: ${article.title}`);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, you'd send this to your backend
    console.log(`Article ${bookmarked ? 'unbookmarked' : 'bookmarked'}: ${article.title}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>

        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(article.content.split(' ').length / 200)} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{article.views} views</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {article.author?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="font-medium">{article.author || 'Admin'}</div>
              <div className="text-sm text-gray-300">
                {article.category}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center space-x-2">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
              >
                <Tag className="w-3 h-3" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-8">
        <div className="prose max-w-none mb-8">
          <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div 
            className="text-gray-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Article Footer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  liked 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              
              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  bookmarked 
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Save'}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              {copySuccess && (
                <div className="flex items-center space-x-1 text-green-600 bg-green-100 px-3 py-2 rounded-lg">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Link copied!</span>
                </div>
              )}
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(article)}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(article.id)}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
              0
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">No comments yet</h4>
            <p className="text-gray-600 mb-4">Be the first to share your thoughts!</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
              Write a Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogViewer;