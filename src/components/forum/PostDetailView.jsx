// src/components/forum/PostDetailView.jsx
import React, { useState } from 'react';
import { 
  X, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  User, 
  Calendar, 
  Tag, 
  Reply, 
  Share2 
} from 'lucide-react';

const PostDetailView = ({ post, onClose, onVote, userVotes, currentUser }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      // In a real app, you'd send this to your backend
      console.log('Reply submitted:', replyContent);
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
          <p className="text-gray-600">{post.category.replace('-', ' ')}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Post Content */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="font-medium text-gray-800">{post.author.name}</div>
            <div className="text-sm text-gray-600">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">{post.content}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onVote(post.id, 'up')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                userVotes[post.id] === 'up'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{post.votes}</span>
            </button>
            <button
              onClick={() => onVote(post.id, 'down')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                userVotes[post.id] === 'down'
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50"
          >
            <Reply className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your reply..."
                  rows="3"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowReplyBox(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700"
              >
                Post Reply
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Comments ({post.comments})</span>
        </h3>
        
        {/* Mock comments */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  U{i}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">User {i}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(Date.now() - i * 3600000).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    This is a mock comment #{i}. In a real app, this would be a real user comment.
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-600">
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailView;