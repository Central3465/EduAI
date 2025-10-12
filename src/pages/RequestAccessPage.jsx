import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  ChevronRight, 
  ExternalLink, 
  LogIn 
} from 'lucide-react';

const RequestAccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Request Discontinued
          </h2>
          <p className="text-gray-600">
            The teacher access code and request system have been discontinued.  
            Please use an alternative method to sign in or sign up for an account.
          </p>
        </div>

        <div className="mt-6 text-center space-y-4">
          <button 
            onClick={() => navigate('/teacher-login')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Sign in with your existing account
          </button>

          <button 
            onClick={() => navigate('/teacher-registration')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Sign up for a new account
          </button>

          <button 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
          >
            <ChevronRight className="w-4 h-4 mr-1" />
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAccessPage;
