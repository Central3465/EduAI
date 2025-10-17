// src/pages/EmailVerificationPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Home,
  RefreshCw,
  Copy,
  Shield
} from 'lucide-react';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmailWithCode } = useAppContext();
  const { showSuccess, showError } = useNotification();
  
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    const role = searchParams.get('role');

    if (!email || !code || !role) {
      showError('Invalid verification link. Please try registering again.');
      setLoading(false);
      return;
    }

    // ✅ Verify using localStorage-stored code
    const storedVerification = localStorage.getItem(`verification_${email}`);
    if (!storedVerification) {
      showError('Verification code not found. Please try registering again.');
      setLoading(false);
      return;
    }

    const verificationData = JSON.parse(storedVerification);
    if (verificationData.code !== code) {
      showError('Invalid verification code. Please check your registration email.');
      setLoading(false);
      return;
    }

    if (new Date() > new Date(verificationData.expiry)) {
      showError('Verification code has expired. Please register again.');
      setLoading(false);
      return;
    }

    // ✅ Verify the user
    const result = verifyEmailWithCode(email, code, role);
    
    if (result.success) {
      showSuccess(result.message);
      setVerified(true);
      
      // ✅ Remove verification code from localStorage after use
      localStorage.removeItem(`verification_${email}`);
    } else {
      showError(result.message);
    }
    
    setLoading(false);
  }, [searchParams, verifyEmailWithCode, showSuccess, showError]);

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Your Email...</h2>
          <p className="text-gray-600">Please wait while we verify your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        {verified ? (
          <>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your account has been successfully verified. You can now log in to EduAI.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired. Please try registering again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;