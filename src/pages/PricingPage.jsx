// src/pages/PricingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useSubscription } from '../context/SubscriptionContext';
import { validateDiscountCodes } from '../data/discountCodes';
import { pricingPlans } from '../data/pricingPlans';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  Award, 
  Percent, 
  X, 
  Plus,
  Tag,
  Gift,
  Sparkles
} from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const { currentUser, userRole } = useAppContext();
  const { subscription, upgradeSubscription } = useSubscription();
  
  const [appliedCodes, setAppliedCodes] = useState([]); // ✅ Array for multiple codes
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  // Apply discount codes
  const applyDiscountCode = () => {
    if (!discountCodeInput.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    const newCodes = [...appliedCodes, discountCodeInput.trim()];
    const result = validateDiscountCodes(newCodes);
    
    if (result.valid) {
      setAppliedCodes(newCodes);
      setDiscountInfo({
        totalDiscount: result.totalDiscount,
        appliedCodes: result.appliedCodes,
        name: result.appliedCodes.map(c => c.name).join(' + ')
      });
      setDiscountError('');
      setDiscountCodeInput('');
    } else {
      setDiscountError(result.errors.join(', ') || 'Invalid discount code');
      setDiscountInfo(null);
    }
  };

  // Remove a discount code
  const removeDiscountCode = (codeToRemove) => {
    const newCodes = appliedCodes.filter(code => code !== codeToRemove);
    setAppliedCodes(newCodes);
    
    if (newCodes.length > 0) {
      const result = validateDiscountCodes(newCodes);
      if (result.valid) {
        setDiscountInfo({
          totalDiscount: result.totalDiscount,
          appliedCodes: result.appliedCodes,
          name: result.appliedCodes.map(c => c.name).join(' + ')
        });
        setDiscountError('');
      }
    } else {
      setDiscountInfo(null);
      setDiscountError('');
    }
  };

  // Calculate discounted price with stacking
  const calculateDiscountedPrice = (price, planId) => {
    if (!discountInfo || planId === 'free' || planId === 'enterprise') {
      return price;
    }

    const numericPrice = parseFloat(price.replace('$', ''));
    const discountMultiplier = 1 - (discountInfo.totalDiscount / 100);
    const discounted = numericPrice * discountMultiplier;
    return `$${discounted.toFixed(2)}`;
  };

  const handleSelectPlan = (plan) => {
    if (plan.id === 'enterprise') {
      navigate('/contact-sales');
      return;
    }

    // Upgrade subscription
    const newSub = upgradeSubscription(plan.id);
    if (newSub) {
      alert(`${plan.name} plan activated successfully!`);
      navigate('/dashboard');
    }
  };

  // Clear all discounts
  const clearAllDiscounts = () => {
    setAppliedCodes([]);
    setDiscountInfo(null);
    setDiscountError('');
    setDiscountCodeInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your educational needs
          </p>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-500" />
              <span>Trusted by 10,000+ Educators</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Discount Code Section */}
        <div className="mt-8 max-w-2xl mx-auto">
          {!showDiscountInput ? (
            <button
              onClick={() => setShowDiscountInput(true)}
              className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mx-auto group"
            >
              <Gift className="w-5 h-5 group-hover:animate-bounce" />
              <span className="underline">Have a discount code?</span>
              <Tag className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Apply Discount Codes</h3>
                <button
                  onClick={() => setShowDiscountInput(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Applied Codes Display */}
              {appliedCodes.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Applied Codes:</span>
                    <button
                      onClick={clearAllDiscounts}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {appliedCodes.map((code, index) => (
                      <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <span>{code}</span>
                        <button
                          onClick={() => removeDiscountCode(code)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount Code Input */}
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  placeholder="Enter discount code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && applyDiscountCode()}
                />
                <button
                  onClick={applyDiscountCode}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Apply</span>
                </button>
              </div>

              {/* Discount Info */}
              {discountInfo && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>{discountInfo.name}</strong> applied! 
                    Total discount: <strong>{discountInfo.totalDiscount.toFixed(1)}%</strong>
                  </p>
                </div>
              )}

              {/* Error Messages */}
              {discountError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{discountError}</p>
                </div>
              )}

              {/* Popular Codes */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Popular codes:</p>
                <div className="flex flex-wrap gap-2">
                  {['EDU2024', 'STUDENT25', 'TEACHER15'].map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setDiscountCodeInput(code);
                        setTimeout(() => {
                          const event = new KeyboardEvent('keypress', { key: 'Enter' });
                          document.querySelector('input[placeholder="Enter discount code"]').dispatchEvent(event);
                        }, 100);
                      }}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Plans */}
        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
          {pricingPlans.map((plan) => {
            const discountedPrice = calculateDiscountedPrice(plan.price, plan.id);
            const savings = plan.price !== discountedPrice 
              ? `$${(parseFloat(plan.price.replace('$', '')) - parseFloat(discountedPrice.replace('$', ''))).toFixed(2)}`
              : null;

            return (
              <div
                key={plan.id}
                className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-lg ${
                  plan.popular
                    ? 'ring-2 ring-blue-500 border-blue-500 transform hover:scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 py-1.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                    Most popular
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  
                  {/* Price Display */}
                  <div className="mt-4 flex items-baseline text-gray-900">
                    {savings ? (
                      <>
                        <span className="text-3xl font-extrabold tracking-tight line-through text-gray-400">
                          {plan.price}
                        </span>
                        <span className="ml-2 text-5xl font-extrabold tracking-tight">
                          {discountedPrice}
                        </span>
                        {plan.period && (
                          <span className="ml-1 text-xl font-semibold text-gray-500">
                            /{plan.period}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-extrabold tracking-tight">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="ml-1 text-xl font-semibold text-gray-500">
                            /{plan.period}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Savings Display */}
                  {savings && (
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-sm text-green-600 font-medium">
                        Save {savings} ({discountInfo?.totalDiscount?.toFixed(1) || 0}% off)!
                      </span>
                      {discountInfo && (
                        <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                      )}
                    </div>
                  )}

                  <p className="mt-6 text-gray-500">{plan.description}</p>

                  {/* Features List */}
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={plan.id === 'enterprise' && !currentUser}
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Subscription Info */}
        {subscription && (
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Current Plan
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-gray-900">
                  {subscription.planId === 'free' ? 'Free Trial' : subscription.planId.toUpperCase()}
                </span>
                {subscription.planId === 'free' && subscription.trialEndsAt && (
                  <p className="text-gray-600">
                    Trial ends: {new Date(subscription.trialEndsAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subscription.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Trusted by Educators Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "EduAI has transformed how I create assignments. The AI-generated questions are spot-on!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  JD
                </div>
                <div>
                  <p className="font-medium text-gray-800">Jane Doe</p>
                  <p className="text-sm text-gray-600">High School Teacher</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "The student engagement has increased dramatically since we started using EduAI."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  MS
                </div>
                <div>
                  <p className="font-medium text-gray-800">Mike Smith</p>
                  <p className="text-sm text-gray-600">Middle School Principal</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "As a student, I love the personalized learning paths. It makes studying so much easier!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  ES
                </div>
                <div>
                  <p className="font-medium text-gray-800">Emma Student</p>
                  <p className="text-sm text-gray-600">College Freshman</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You'll continue to have access 
                until the end of your billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards including Visa, Mastercard, American Express, 
                and Discover.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Do you offer discounts for schools?
              </h3>
              <p className="text-gray-600">
                Yes! We offer special pricing for schools and districts. Contact our sales team 
                for bulk pricing options.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What happens after my free trial?
              </h3>
              <p className="text-gray-600">
                After your 7-day free trial, you'll be automatically switched to the plan you 
                selected. You can cancel anytime before the trial ends to avoid charges.
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">30-Day Money Back Guarantee</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Try EduAI risk-free for 30 days. If you're not completely satisfied, get a full refund. 
            No questions asked.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;