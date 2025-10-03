// src/ui/RouteErrorElement.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';

const RouteErrorElement = ({ error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Load Error</h1>
        <p className="text-gray-600 mb-6">The page you requested could not be loaded.</p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> {error?.message || 'Unknown error'}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </button>
          
          <Link
            to="/"
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.location.href = 'mailto:support@eduai.com?subject=Page Error Report'}
            className="w-full bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorElement;