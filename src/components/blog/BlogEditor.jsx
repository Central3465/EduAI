// src/components/blog/BlogEditor.jsx
import React, { useState } from 'react';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Tag, 
  Hash, 
  Calendar,
  User,
  FileText,
  Bold,
  Italic,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  Code,
  X
} from 'lucide-react';

const BlogEditor = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    category: article?.category || 'General',
    tags: article?.tags?.join(', ') || '',
    status: article?.status || 'draft'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status
    };

    onSave(articleData);
  };

  const handleContentChange = (e) => {
    setFormData(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Editor Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {article ? 'Edit Article' : 'Create New Article'}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2 rounded-lg ${
              previewMode 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={previewMode ? 'Edit Mode' : 'Preview Mode'}
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {!previewMode && (
        <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => formatText('bold')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('italic')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button
            onClick={() => formatText('insertUnorderedList')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('insertOrderedList')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button
            onClick={() => formatText('formatBlock', false, 'blockquote')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('formatBlock', false, 'pre')}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div className="p-6">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter article title"
            required
          />
        </div>

        {/* Excerpt */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Summary)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary of your article"
            rows="3"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          {previewMode ? (
            <div className="prose max-w-none bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[300px]">
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          ) : (
            <textarea
              value={formData.content}
              onChange={handleContentChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[300px]"
              placeholder="Write your article content here..."
              required
            />
          )}
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="General">General</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="AI">AI</option>
              <option value="Updates">Updates</option>
              <option value="Tips">Tips & Tricks</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="education, ai, learning"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Draft</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Published</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;