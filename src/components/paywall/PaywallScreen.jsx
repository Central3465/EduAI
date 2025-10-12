// src/components/paywall/PaywallScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Clock, Star, Zap, Crown } from 'lucide-react';
import { useSubscription } from '../../context/SubscriptionContext';

const PaywallScreen = ({ subscription, trialEnded }) => {
  const navigate = useNavigate();
  const { isAdmin } = useSubscription();

  if (isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Granted</h2>
          <p className="text-gray-600 mb-6">
            Welcome, Administrator! You have full access to all EduAI features.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          {trialEnded ? (
            <Shield className="w-8 h-8 text-white" />
          ) : (
            <CreditCard className="w-8 h-8 text-white" />
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {trialEnded ? 'Trial Expired' : 'Subscription Required'}
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          {trialEnded
            ? 'Your free trial has expired. Please upgrade to continue using EduAI.'
            : 'Please subscribe to a plan to access the dashboard.'}
        </p>

        {/* Trial Info */}
        {subscription?.planId === 'free' && subscription?.trialEndsAt && !trialEnded && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Free Trial Active</span>
            </div>
            <p className="text-blue-700">
              Your trial ends on {new Date(subscription.trialEndsAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Pricing Plans Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center mb-3">
              <Star className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Basic</h3>
              <p className="text-2xl font-bold text-gray-900">$19<span className="text-sm font-normal text-gray-600">/mo</span></p>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Unlimited assignments</li>
              <li>• Advanced AI features</li>
              <li>• Up to 100 students</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white transform scale-105">
            <div className="text-center mb-3">
              <Crown className="w-6 h-6 text-white mx-auto mb-2" />
              <h3 className="font-semibold">Professional</h3>
              <p className="text-2xl font-bold">$49<span className="text-sm font-normal">/mo</span></p>
            </div>
            <ul className="text-xs space-y-1">
              <li>• Everything in Basic</li>
              <li>• Unlimited students</li>
              <li>• Class management</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center mb-3">
              <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Enterprise</h3>
              <p className="text-2xl font-bold text-gray-900">Custom</p>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Everything in Pro</li>
              <li>• SSO & API access</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/pricing')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>View Pricing Plans</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            Back to Homepage
          </button>
        </div>

        {trialEnded && (
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Tip:</strong> Upgrade now to keep all your data and continue where you left off!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaywallScreen;