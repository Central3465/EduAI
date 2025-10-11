// src/context/SubscriptionContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAppContext } from './AppContext';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  // ✅ Add default values for when context is undefined
  const appContext = useAppContext();
  const { currentUser, userRole } = appContext || {}; // ✅ Safe destructuring
  
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trialEnded, setTrialEnded] = useState(false);

  // Load subscription from localStorage
  useEffect(() => {
    const loadSubscription = () => {
      // ✅ Handle case when no user is logged in
      if (userRole === 'teacher' && currentUser?.email) {
        const saved = localStorage.getItem(`subscription_${currentUser.email}`);
        if (saved) {
          const sub = JSON.parse(saved);
          setSubscription(sub);
          
          // Check if trial has ended
          if (sub.planId === 'free' && sub.trialEndsAt) {
            const trialEndDate = new Date(sub.trialEndsAt);
            const now = new Date();
            if (now > trialEndDate) {
              setTrialEnded(true);
            }
          }
        } else {
          // Create free trial for new teachers
          createFreeTrial();
        }
      }
      setLoading(false);
    };

    loadSubscription();
  }, [currentUser, userRole]);

  // Save subscription to localStorage
  useEffect(() => {
    if (subscription && currentUser?.email) {
      localStorage.setItem(`subscription_${currentUser.email}`, JSON.stringify(subscription));
    }
  }, [subscription, currentUser]);

  // Create free trial subscription
  const createFreeTrial = useCallback(() => {
    // ✅ Handle case when no user is logged in
    if (userRole === 'teacher' && currentUser?.email) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7); // 7-day trial
      
      const newSubscription = {
        id: `sub_${Date.now()}`,
        userId: currentUser.email,
        planId: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        trialEndsAt: trialEndsAt.toISOString(),
        features: [
          '7-day free trial',
          'Create up to 5 assignments',
          'Basic AI question generation',
          'Up to 30 students',
          'Basic analytics'
        ]
      };
      
      setSubscription(newSubscription);
      return newSubscription;
    }
    return null;
  }, [currentUser, userRole]);

  // Upgrade subscription
  const upgradeSubscription = useCallback((planId) => {
    // ✅ Handle case when no user is logged in
    if (userRole === 'teacher' && currentUser?.email) {
      const planFeatures = {
        'basic': [
          'Unlimited assignments',
          'Advanced AI question generation',
          'Up to 100 students',
          'Detailed analytics',
          'Gradebook integration',
          'Priority email support',
          'Assignment templates'
        ],
        'pro': [
          'Everything in Basic',
          'Unlimited students',
          'Class management',
          'Custom branding',
          'Advanced analytics',
          '24/7 priority support',
          'API access'
        ]
      };
      
      const newSubscription = {
        id: `sub_${Date.now()}`,
        userId: currentUser.email,
        planId: planId,
        status: 'active',
        startDate: new Date().toISOString(),
        features: planFeatures[planId] || []
      };
      
      setSubscription(newSubscription);
      return newSubscription;
    }
    return null;
  }, [currentUser, userRole]);

  // Cancel subscription
  const cancelSubscription = useCallback(() => {
    if (subscription) {
      setSubscription(prev => ({
        ...prev,
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      }));
    }
  }, [subscription]);

  // Check if user can access dashboard
  const canAccessDashboard = useCallback(() => {
    // ✅ Handle guests (no user logged in)
    if (!currentUser) return false; // Guests can't access dashboard
    if (userRole !== 'teacher') return true; // Students always have access
    
    if (!subscription) return false;
    
    // Free trial users can access during trial period
    if (subscription.planId === 'free' && !trialEnded) {
      return true;
    }
    
    // Paid users can access
    if (['basic', 'pro', 'enterprise'].includes(subscription.planId) && 
        subscription.status === 'active') {
      return true;
    }
    
    return false;
  }, [subscription, userRole, trialEnded, currentUser]);

  // Check if user can use AI features
  const canUseAI = useCallback(() => {
    // ✅ Handle guests (no user logged in)
    if (!currentUser) return false; // Guests can't use AI
    
    if (userRole === 'teacher') {
      // Teachers need paid plan for AI
      return subscription && 
             ['basic', 'pro', 'enterprise'].includes(subscription.planId) && 
             subscription.status === 'active';
    } else {
      // Students need paid plan for AI Recommendations
      return subscription && 
             ['basic', 'pro', 'enterprise'].includes(subscription.planId) && 
             subscription.status === 'active';
    }
  }, [subscription, userRole, currentUser]);

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      loading,
      trialEnded,
      createFreeTrial,
      upgradeSubscription,
      cancelSubscription,
      canAccessDashboard,
      canUseAI
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};