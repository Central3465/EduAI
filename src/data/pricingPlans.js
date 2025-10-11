// src/data/pricingPlans.js
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '$0',
    period: '7 days',
    description: 'Perfect for trying out EduAI',
    features: [
      '7-day free trial',
      'Create up to 5 assignments',
      'Basic AI question generation',
      'Up to 30 students',
      'Basic analytics',
      'Email support'
    ],
    buttonText: 'Start Free Trial',
    popular: false,
    stripePriceId: null
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$19',
    period: 'per month',
    description: 'Perfect for individual teachers',
    features: [
      'Unlimited assignments',
      'Advanced AI question generation',
      'Up to 100 students',
      'Detailed analytics',
      'Gradebook integration',
      'Priority email support',
      'Assignment templates'
    ],
    buttonText: 'Get Started',
    popular: false,
    stripePriceId: 'price_basic_monthly' // Replace with real Stripe ID
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$49',
    period: 'per month',
    description: 'Perfect for schools and departments',
    features: [
      'Everything in Basic',
      'Unlimited students',
      'Class management',
      'Custom branding',
      'Advanced analytics',
      '24/7 priority support',
      'API access',
      'Bulk assignment creation',
      'Student progress tracking',
      'Parent portal access'
    ],
    buttonText: 'Get Started',
    popular: true,
    stripePriceId: 'price_pro_monthly' // Replace with real Stripe ID
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Perfect for large institutions',
    features: [
      'Everything in Professional',
      'Unlimited classes',
      'Single sign-on (SSO)',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise deployment',
      'Training and onboarding',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    stripePriceId: null
  }
];