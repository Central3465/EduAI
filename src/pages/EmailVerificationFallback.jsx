// src/pages/EmailVerificationFallback.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerificationFallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Extract parameters from URL
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    const role = searchParams.get('role');

    if (email && code && role) {
      // Redirect to proper verification route
      navigate(`/verify-email?email=${encodeURIComponent(email)}&code=${code}&role=${role}`);
    } else {
      // Fallback to homepage if missing parameters
      navigate('/');
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Verification...</h2>
        <p className="text-gray-600">Please wait while we verify your account.</p>
      </div>
    </div>
  );
};

export default EmailVerificationFallback;