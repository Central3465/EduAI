// src/components/ui/RouteErrorElement.jsx
import React, { useState } from 'react';
import { Link, useRouteError } from 'react-router-dom'; // ✅ Import useRouteError
import { AlertTriangle, Home, RefreshCw, Mail, Copy } from 'lucide-react';

const RouteErrorElement = () => {
  // ✅ Get error using hook — NOT from props
  const error = useRouteError();

  // Format full error text
  const fullErrorText = error
    ? `${error.status ? `[${error.status}] ` : ''}${error.statusText || error.message || 'Unknown error'}\n\nStack trace:\n${error.stack || 'No stack trace available'}`
    : 'No error details available';

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullErrorText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullErrorText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('EduAI Error Report');
    const body = encodeURIComponent(
      `Hi,\n\nI encountered an error on your EduAI app.\n\nPlease find the full error details below:\n\n--- COPY BELOW THIS LINE ---\n${fullErrorText}\n--- COPY ABOVE THIS LINE ---\n\nThank you!`
    );
    window.location.href = `mailto:hanlinbai667@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something Went Wrong</h1>
        <p className="text-gray-600 mb-6">
          Don’t worry — this isn’t your fault. Please help me fix it!
        </p>

        {/* Error Details Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left relative">
          <p className="text-sm text-red-800 font-mono overflow-x-auto whitespace-pre-wrap">
            {fullErrorText}
          </p>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs flex items-center gap-1 hover:bg-gray-50"
            title="Copy error details"
          >
            <Copy className="w-3 h-3" />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-6">
          📩 <strong>Please email me</strong> at{' '}
          <a
            href="mailto:hanlinbai667@gmail.com"
            className="text-blue-600 underline"
          >
            hanlinbai667@gmail.com
          </a>{' '}
          with the <strong>full error box above copied and pasted</strong> so I can fix this quickly!
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </button>

          <Link
            to="/"
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Link>
        </div>

        <button
          onClick={handleEmailClick}
          className="mt-4 w-full bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Me the Error
        </button>
      </div>
    </div>
  );
};

export default RouteErrorElement;