// src/pages/DocumentationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Home,
  ChevronRight,
  ChevronDown,
  Search,
  User,
  GraduationCap,
  FileText,
  Settings,
  Shield,
  Clock,
  Users,
  Award,
  Brain,
  Mail,
  MessageSquare,
  Video,
  Download,
  ExternalLink,
  X
} from 'lucide-react';

const DocumentationPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState('getting-started');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Documentation Sections
  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: User,
      articles: [
        {
          id: 'teacher-setup',
          title: 'Teacher Account Setup',
          content: `
            <h3>Setting Up Your Teacher Account</h3>
            <p>To get started as a teacher on EduAI, you'll need an invitation code. Here's how to set up your account:</p>
            
            <ol>
              <li><strong>Receive Invitation:</strong> Check your email for an invitation from EduAI or your school administrator.</li>
              <li><strong>Click Registration Link:</strong> The email will contain a link to register as a teacher.</li>
              <li><strong>Enter Invitation Code:</strong> You'll be prompted to enter your unique invitation code.</li>
              <li><strong>Create Account:</strong> Fill in your details and create a secure password.</li>
              <li><strong>Verify Email:</strong> Check your email for a verification link and click it to activate your account.</li>
              <li><strong>Log In:</strong> Once verified, you can log in to your dashboard.</li>
            </ol>
            
            <h4>Tips for Success</h4>
            <ul>
              <li>Keep your invitation code safe - you'll need it to register</li>
              <li>Use a strong password with at least 8 characters</li>
              <li>Bookmark your dashboard for easy access</li>
            </ul>
          `
        },
        {
          id: 'student-setup',
          title: 'Student Account Setup',
          content: `
            <h3>Setting Up Your Student Account</h3>
            <p>Students are invited by teachers to join EduAI. Here's how to set up your account:</p>
            
            <ol>
              <li><strong>Receive Invitation:</strong> Your teacher will send you an invitation email with a registration link.</li>
              <li><strong>Click Registration Link:</strong> Open the link in your browser.</li>
              <li><strong>Enter Invitation Code:</strong> You'll be prompted to enter your unique invitation code.</li>
              <li><strong>Create Account:</strong> Fill in your details and create a secure password.</li>
              <li><strong>Verify Email:</strong> Check your email for a verification link and click it to activate your account.</li>
              <li><strong>Log In:</strong> Once verified, you can log in to your dashboard.</li>
            </ol>
            
            <h4>Tips for Success</h4>
            <ul>
              <li>Check your spam/junk folder if you don't see the invitation email</li>
              <li>Use a strong password with at least 8 characters</li>
              <li>Bookmark your dashboard for easy access</li>
            </ul>
          `
        },
        {
          id: 'dashboard-overview',
          title: 'Dashboard Overview',
          content: `
            <h3>Your EduAI Dashboard</h3>
            <p>The dashboard is your central hub for all EduAI activities. Here's what you'll find:</p>
            
            <h4>For Teachers</h4>
            <ul>
              <li><strong>Assignments:</strong> Create, manage, and grade assignments</li>
              <li><strong>Students:</strong> View and manage your students</li>
              <li><strong>Analytics:</strong> Track class performance and progress</li>
              <li><strong>Grades:</strong> Manage student grades and reports</li>
              <li><strong>Settings:</strong> Customize your account preferences</li>
            </ul>
            
            <h4>For Students</h4>
            <ul>
              <li><strong>My Assignments:</strong> View and complete your assignments</li>
              <li><strong>My Grades:</strong> Check your grades and feedback</li>
              <li><strong>Progress:</strong> Track your learning progress</li>
              <li><strong>Settings:</strong> Customize your account preferences</li>
            </ul>
            
            <h4>Navigation Tips</h4>
            <p>Use the sidebar to switch between different sections. The top bar shows your account information and quick actions.</p>
          `
        }
      ]
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: BookOpen,
      articles: [
        {
          id: 'creating-assignments',
          title: 'Creating Assignments',
          content: `
            <h3>Creating Assignments as a Teacher</h3>
            <p>EduAI makes it easy to create engaging assignments for your students:</p>
            
            <ol>
              <li><strong>Navigate to Assignments:</strong> Click 'Assignments' in your dashboard sidebar.</li>
              <li><strong>Create New Assignment:</strong> Click the 'Create Assignment' button.</li>
              <li><strong>Fill in Details:</strong> Enter assignment title, subject, due date, and difficulty level.</li>
              <li><strong>Add Questions:</strong> Choose from AI-generated questions or create your own.</li>
              <li><strong>AI Question Generation:</strong> Use the AI button to generate questions automatically.</li>
              <li><strong>Review and Publish:</strong> Check your assignment and click 'Publish' when ready.</li>
            </ol>
            
            <h4>Question Types</h4>
            <ul>
              <li><strong>Multiple Choice:</strong> Students select one correct answer from options</li>
              <li><strong>True/False:</strong> Students determine if a statement is true or false</li>
              <li><strong>Short Answer:</strong> Students write brief text responses</li>
              <li><strong>Fill in the Blank:</strong> Students complete sentences with missing words</li>
            </ul>
            
            <h4>AI Features</h4>
            <p>Use AI to generate questions based on subject, difficulty, and topic. AI questions are reviewed for accuracy.</p>
          `
        },
        {
          id: 'taking-assignments',
          title: 'Taking Assignments',
          content: `
            <h3>Taking Assignments as a Student</h3>
            <p>Completing assignments on EduAI is straightforward and engaging:</p>
            
            <ol>
              <li><strong>Navigate to Assignments:</strong> Click 'My Assignments' in your dashboard sidebar.</li>
              <li><strong>Select Assignment:</strong> Click on the assignment you want to complete.</li>
              <li><strong>Read Instructions:</strong> Carefully read the assignment instructions and due date.</li>
              <li><strong>Answer Questions:</strong> Work through each question one at a time.</li>
              <li><strong>Submit Assignment:</strong> Review your answers and click 'Submit' when finished.</li>
              <li><strong>View Results:</strong> Check your results and feedback in 'My Grades'.</li>
            </ol>
            
            <h4>Tips for Success</h4>
            <ul>
              <li>Start early to avoid last-minute stress</li>
              <li>Read each question carefully</li>
              <li>Save your work frequently (auto-save is enabled)</li>
              <li>Review your answers before submitting</li>
            </ul>
            
            <h4>Getting Help</h4>
            <p>If you're stuck on a question, use the 'Ask AI' feature for hints and explanations.</p>
          `
        },
        {
          id: 'grading-assignments',
          title: 'Grading Assignments',
          content: `
            <h3>Grading Assignments as a Teacher</h3>
            <p>EduAI automates much of the grading process, but manual review is still important:</p>
            
            <ol>
              <li><strong>Navigate to Assignments:</strong> Click 'Assignments' in your dashboard sidebar.</li>
              <li><strong>Select Assignment:</strong> Click on the assignment you want to grade.</li>
              <li><strong>View Submissions:</strong> See which students have completed the assignment.</li>
              <li><strong>Auto-Graded Questions:</strong> Multiple choice and true/false are automatically graded.</li>
              <li><strong>Manual Review:</strong> Review short answer and essay questions.</li>
              <li><strong>Provide Feedback:</strong> Add comments and suggestions for improvement.</li>
              <li><strong>Publish Grades:</strong> Make grades visible to students.</li>
            </ol>
            
            <h4>Grading Tools</h4>
            <ul>
              <li><strong>Quick Grade:</strong> Assign overall scores quickly</li>
              <li><strong>Detailed Feedback:</strong> Provide specific comments for each question</li>
              <li><strong>Gradebook Integration:</strong> Export grades to your school's system</li>
              <li><strong>Analytics:</strong> View class performance statistics</li>
            </ul>
            
            <h4>AI Assistance</h4>
            <p>Use AI to help grade essay questions and provide personalized feedback.</p>
          `
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: Brain,
      articles: [
        {
          id: 'ai-question-generation',
          title: 'AI Question Generation',
          content: `
            <h3>Generating Questions with AI</h3>
            <p>EduAI's AI can create high-quality questions for any subject:</p>
            
            <ol>
              <li><strong>Create Assignment:</strong> Start creating a new assignment.</li>
              <li><strong>Click AI Button:</strong> Use the 'AI Generate Question' button.</li>
              <li><strong>Select Parameters:</strong> Choose subject, difficulty, and question type.</li>
              <li><strong>Review Questions:</strong> AI generates questions instantly.</li>
              <li><strong>Edit as Needed:</strong> Customize questions to fit your needs.</li>
              <li><strong>Add to Assignment:</strong> Include AI questions in your assignment.</li>
            </ol>
            
            <h4>Supported Subjects</h4>
            <ul>
              <li>Mathematics</li>
              <li>Science</li>
              <li>Literature</li>
              <li>History</li>
              <li>Computer Science</li>
            </ul>
            
            <h4>Question Quality</h4>
            <p>All AI-generated questions are reviewed for accuracy and educational value.</p>
          `
        },
        {
          id: 'ai-feedback',
          title: 'AI Feedback and Grading',
          content: `
            <h3>Getting AI-Powered Feedback</h3>
            <p>EduAI provides intelligent feedback to help students learn:</p>
            
            <h4>For Students</h4>
            <ul>
              <li><strong>Instant Grading:</strong> Get immediate results for objective questions</li>
              <li><strong>Personalized Feedback:</strong> Receive tailored explanations for mistakes</li>
              <li><strong>Learning Suggestions:</strong> Get recommendations for improvement</li>
              <li><strong>Progress Tracking:</strong> Monitor your learning journey over time</li>
            </ul>
            
            <h4>For Teachers</h4>
            <ul>
              <li><strong>Auto-Grading:</strong> Save time with automated grading for objective questions</li>
              <li><strong>Essay Grading:</strong> AI assists with grading written responses</li>
              <li><strong>Class Analytics:</strong> View detailed performance reports</li>
              <li><strong>Individual Feedback:</strong> Provide targeted support to struggling students</li>
            </ul>
            
            <h4>AI Accuracy</h4>
            <p>Our AI models are trained on educational datasets and continuously improved based on user feedback.</p>
          `
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: Shield,
      articles: [
        {
          id: 'common-issues',
          title: 'Common Issues and Solutions',
          content: `
            <h3>Frequently Encountered Problems</h3>
            <p>Here are solutions to common issues EduAI users face:</p>
            
            <h4>Login Problems</h4>
            <ul>
              <li><strong>Can't log in:</strong> Check your email and password. Use 'Forgot Password' if needed.</li>
              <li><strong>Account not verified:</strong> Check your email for verification link.</li>
              <li><strong>Invalid invitation code:</strong> Contact your teacher or administrator.</li>
            </ul>
            
            <h4>Assignment Issues</h4>
            <ul>
              <li><strong>Can't submit assignment:</strong> Ensure all required questions are answered.</li>
              <li><strong>Assignment not showing:</strong> Refresh the page or check with your teacher.</li>
              <li><strong>Grades not appearing:</strong> Teachers may still be grading. Be patient.</li>
            </ul>
            
            <h4>Technical Issues</h4>
            <ul>
              <li><strong>Page not loading:</strong> Check your internet connection. Try refreshing.</li>
              <li><strong>Slow performance:</strong> Close other tabs. Use a modern browser.</li>
              <li><strong>Features not working:</strong> Clear your browser cache and cookies.</li>
            </ul>
            
            <h4>Contact Support</h4>
            <p>If none of these solutions work, contact our support team through the Help Center.</p>
          `
        },
        {
          id: 'browser-compatibility',
          title: 'Browser Compatibility',
          content: `
            <h3>Supported Browsers and Devices</h3>
            <p>EduAI works best on modern browsers and devices:</p>
            
            <h4>Desktop Browsers</h4>
            <ul>
              <li><strong>Chrome:</strong> Latest version (recommended)</li>
              <li><strong>Firefox:</strong> Latest version</li>
              <li><strong>Safari:</strong> Latest version</li>
              <li><strong>Edge:</strong> Latest version</li>
            </ul>
            
            <h4>Mobile Devices</h4>
            <ul>
              <li><strong>iOS:</strong> Safari on iPhone/iPad (iOS 12+)</li>
              <li><strong>Android:</strong> Chrome on Android (Android 8+)</li>
            </ul>
            
            <h4>Minimum Requirements</h4>
            <ul>
              <li>Modern JavaScript support</li>
              <li>Cookies enabled</li>
              <li>Internet connection</li>
              <li>Minimum 4GB RAM (recommended)</li>
            </ul>
            
            <h4>Troubleshooting Tips</h4>
            <p>If you're experiencing issues, try clearing your browser cache and cookies, or use an incognito/private browsing window.</p>
          `
        }
      ]
    }
  ];

  // Filter articles based on search term
  const filteredSections = docSections.map(section => ({
    ...section,
    articles: section.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduAI Documentation</h1>
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
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">EduAI Documentation</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn how to use EduAI to its fullest potential with our comprehensive guides and tutorials.
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
                placeholder="Search documentation..."
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {docSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        expandedSection === section.id
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{section.title}</span>
                      {expandedSection === section.id ? (
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Additional Resources */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Additional Resources</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Guide</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorials</span>
                  </button>
                  <button
                    onClick={() => navigate('/help-center')}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Support</span>
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
                {filteredSections.length > 0 ? (
                  <div className="space-y-6">
                    {filteredSections.map((section) => (
                      <div key={section.id}>
                        <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center space-x-2">
                          <section.icon className="w-5 h-5" />
                          <span>{section.title}</span>
                        </h4>
                        <div className="space-y-4">
                          {section.articles.map((article, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                              <h5 className="font-medium text-gray-800 mb-2">{article.title}</h5>
                              <div 
                                className="text-gray-600 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: article.content.substring(0, 200) + '...' }}
                              />
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
                      We couldn't find any documentation matching "{searchTerm}"
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
              // Documentation Sections
              <div className="space-y-6">
                {docSections
                  .filter(section => section.id === expandedSection)
                  .map((section) => {
                    const Icon = section.icon;
                    
                    return (
                      <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-blue-500" />
                            <h3 className="text-xl font-semibold text-gray-800">
                              {section.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-6">
                          {section.articles.map((article, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                {article.title}
                              </h4>
                              <div 
                                className="text-gray-700 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Download Documentation</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> PDF downloads are coming soon. For now, you can bookmark this page for offline reference.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BookOpen className="w-8 h-8 text-blue-500" />
                  <span className="text-sm font-medium text-gray-800">User Guide</span>
                  <span className="text-xs text-gray-600">(PDF)</span>
                </button>
                
                <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Video className="w-8 h-8 text-green-500" />
                  <span className="text-sm font-medium text-gray-800">Video Tutorials</span>
                  <span className="text-xs text-gray-600">(MP4)</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentationPage;