// src/pages/HelpCenterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Video,
  BookOpen,
  User,
  GraduationCap,
  FileText,
  Settings,
  Shield,
  Clock,
  Users,
  Award,
  Home,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  X,
  Brain,
  CreditCard
} from 'lucide-react';

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ Data
  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: User,
      faqs: [
        {
          question: "How do I create a teacher account?",
          answer: "Teachers need an invitation code to register. Contact your administrator or request access through the 'Request Access' page."
        },
        {
          question: "How do I create a student account?",
          answer: "Students are invited by teachers. Check your email for an invitation with a registration link."
        },
        {
          question: "What browsers are supported?",
          answer: "EduAI works on all modern browsers including Chrome, Firefox, Safari, and Edge. For best performance, use the latest version."
        },
        {
          question: "Can I use EduAI on mobile devices?",
          answer: "Yes! EduAI is fully responsive and works on tablets and smartphones. A native mobile app is coming soon."
        }
      ]
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: BookOpen,
      faqs: [
        {
          question: "How do I create an assignment?",
          answer: "Go to your dashboard, click 'Create Assignment', and choose from AI-generated questions or create your own."
        },
        {
          question: "Can I customize AI-generated assignments?",
          answer: "Absolutely! You can edit any AI-generated question, add your own questions, or mix AI and manual questions."
        },
        {
          question: "How does auto-grading work?",
          answer: "EduAI automatically grades multiple-choice and true/false questions. Short-answer questions are reviewed by teachers."
        },
        {
          question: "Can students retake assignments?",
          answer: "Yes, teachers can enable retakes for assignments. Students can retake assignments to improve their grades."
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: Brain,
      faqs: [
        {
          question: "What AI models does EduAI use?",
          answer: "EduAI uses state-of-the-art AI models including GPT-4 for question generation and educational content creation."
        },
        {
          question: "How accurate are AI-generated questions?",
          answer: "Our AI questions are highly accurate and reviewed by educational experts. We continuously improve based on user feedback."
        },
        {
          question: "Can I generate questions for any subject?",
          answer: "Currently, we support Mathematics, Science, Literature, and History. More subjects are being added regularly."
        },
        {
          question: "Is my data used to train AI models?",
          answer: "No. Your data is private and never used for AI training without explicit consent."
        }
      ]
    },
    {
      id: 'accounts',
      title: 'Accounts & Security',
      icon: Shield,
      faqs: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        },
        {
          question: "Is my data secure?",
          answer: "Yes. We use industry-standard encryption and security practices to protect your data."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes. Contact support to request account deletion. All your data will be permanently removed."
        },
        {
          question: "How do I change my email address?",
          answer: "Contact support with your current email and the new email you'd like to use."
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Subscriptions',
      icon: CreditCard,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover."
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel anytime. You'll continue to have access until the end of your billing period."
        },
        {
          question: "Do you offer discounts for schools?",
          answer: "Yes! We offer special pricing for schools and districts. Contact sales for bulk pricing options."
        },
        {
          question: "What happens after my free trial?",
          answer: "After your 7-day free trial, you'll be automatically switched to the plan you selected. You can cancel anytime before the trial ends to avoid charges."
        }
      ]
    }
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduAI Help Center</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">How can we help you?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                placeholder="Search help articles..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Help Topics</h3>
              <nav className="space-y-2">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        expandedCategory === category.id
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.title}</span>
                      {expandedCategory === category.id ? (
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Support Contact */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Need More Help?</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <MessageSquare className="w-4 h-4" />
                    <span>Live Chat</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorials</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchTerm ? (
              // Search Results
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Search Results for "{searchTerm}"
                </h3>
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFAQs.map((category) => (
                      <div key={category.id}>
                        <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center space-x-2">
                          <category.icon className="w-5 h-5" />
                          <span>{category.title}</span>
                        </h4>
                        <div className="space-y-4">
                          {category.faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                              <h5 className="font-medium text-gray-800 mb-2">{faq.question}</h5>
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">No results found</h4>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any help articles matching "{searchTerm}"
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // FAQ Categories
              <div className="space-y-6">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  const isExpanded = expandedCategory === category.id;
                  
                  return (
                    <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-blue-500" />
                          <h3 className="text-lg font-semibold text-gray-800">
                            {category.title}
                          </h3>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 space-y-4">
                          {category.faqs.map((faq, index) => (
                            <div key={index} className="border-t border-gray-200 pt-4">
                              <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Contact Support</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your issue or question..."
                  rows="5"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenterPage;