// src/pages/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNotification } from '../context/NotificationContext';
import {
  ArrowLeft,
  Building,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Upload,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Award,
  TrendingUp,
  Star,
  Heart,
  Coffee,
  Wifi,
  Home
} from 'lucide-react';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  // Mock job data (in a real app, this would come from API/context)
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  
  // Application form state
  const [application, setApplication] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    resume: null,
    portfolio: '',
    startDate: '',
    experience: '',
    whyInterested: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock jobs data (would come from context/API in real app)
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      experience: 'senior',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Join our engineering team to build cutting-edge educational technology platforms. Work with React, Vite, and modern web technologies.',
      responsibilities: [
        'Develop and maintain our React-based frontend applications',
        'Collaborate with designers and backend engineers',
        'Implement responsive and accessible UI components',
        'Optimize application performance and user experience',
        'Participate in code reviews and technical discussions',
        'Contribute to our design system and component library'
      ],
      requirements: [
        '5+ years of React experience',
        'Experience with modern build tools (Vite, Webpack)',
        'Strong TypeScript skills',
        'Familiarity with AI/ML technologies',
        'Experience with testing frameworks (Jest, Cypress)',
        'Knowledge of accessibility standards (WCAG)'
      ],
      benefits: [
        'Remote work flexibility',
        'Health insurance',
        '401(k) matching',
        'Unlimited PTO',
        'Learning stipend ($2,000/year)',
        'Stock options',
        'Annual conference budget ($1,500/year)'
      ],
      team: {
        name: 'Frontend Engineering',
        size: 8,
        description: 'Our frontend team builds beautiful, performant interfaces that delight educators and students worldwide.'
      }
    },
    {
      id: 2,
      title: 'AI Research Scientist',
      department: 'AI/ML',
      location: 'San Francisco, CA',
      salary: '$140,000 - $180,000',
      experience: 'senior',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Lead AI research initiatives to improve educational outcomes. Work with cutting-edge machine learning models and natural language processing.',
      responsibilities: [
        'Design and implement ML models for educational content generation',
        'Conduct research on personalized learning algorithms',
        'Collaborate with product and engineering teams',
        'Publish findings in academic journals and conferences',
        'Mentor junior researchers and interns',
        'Stay current with latest AI/ML developments'
      ],
      requirements: [
        'PhD in Computer Science, AI, or related field',
        'Experience with TensorFlow/PyTorch',
        'Published research in ML/AI',
        'Strong Python skills',
        'Experience with NLP and LLMs',
        'Knowledge of educational research methodologies'
      ],
      benefits: [
        'Stock options',
        'Research funding ($10,000/year)',
        'Conference attendance',
        'Flexible schedule',
        'Health insurance',
        '401(k) matching',
        'Annual sabbatical (4 weeks)'
      ],
      team: {
        name: 'AI Research',
        size: 12,
        description: 'Our AI research team pushes the boundaries of educational technology through groundbreaking machine learning innovations.'
      }
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      salary: '$100,000 - $130,000',
      experience: 'mid',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Drive product strategy for EduAI. Collaborate with engineering, design, and education teams to build innovative learning experiences.',
      responsibilities: [
        'Define product roadmap and feature priorities',
        'Work with stakeholders to gather requirements',
        'Analyze user feedback and market trends',
        'Coordinate cross-functional teams',
        'Track product metrics and KPIs',
        'Create product documentation and specs'
      ],
      requirements: [
        '3+ years of product management experience',
        'Experience in edtech preferred',
        'Strong analytical skills',
        'Excellent communication skills',
        'Familiarity with Agile methodologies',
        'Experience with analytics tools (Mixpanel, Amplitude)'
      ],
      benefits: [
        'Remote work',
        'Health insurance',
        '401(k) matching',
        'Professional development',
        'Flexible PTO',
        'Stock options',
        'Product conference budget ($1,000/year)'
      ],
      team: {
        name: 'Product',
        size: 6,
        description: 'Our product team ensures EduAI delivers exceptional value to educators and students through thoughtful, data-driven decisions.'
      }
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      experience: 'mid',
      type: 'Full-time',
      posted: '1 day ago',
      description: 'Create beautiful, intuitive interfaces for our educational platform. Focus on accessibility and delightful user experiences.',
      responsibilities: [
        'Design user interfaces for web and mobile apps',
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with product and engineering teams',
        'Maintain and evolve our design system',
        'Ensure accessibility compliance'
      ],
      requirements: [
        '3+ years of UX/UI design experience',
        'Proficiency in Figma/Sketch',
        'Portfolio demonstrating design thinking',
        'Experience with design systems',
        'Knowledge of accessibility standards',
        'Experience with user research methods'
      ],
      benefits: [
        'Creative freedom',
        'Health insurance',
        '401(k) matching',
        'Design conference attendance',
        'Home office stipend ($1,000/year)',
        'Flexible PTO',
        'Stock options'
      ],
      team: {
        name: 'Design',
        size: 5,
        description: 'Our design team crafts intuitive, beautiful experiences that make learning enjoyable for everyone.'
      }
    },
    {
      id: 5,
      title: 'Educational Content Specialist',
      department: 'Education',
      location: 'Remote',
      salary: '$70,000 - $90,000',
      experience: 'entry',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Develop educational content and curricula for AI-generated assignments. Work closely with teachers and AI researchers.',
      responsibilities: [
        'Create educational content for various subjects',
        'Develop curriculum-aligned learning materials',
        'Review and validate AI-generated content',
        'Collaborate with teachers and researchers',
        'Conduct content quality assurance',
        'Stay current with educational standards'
      ],
      requirements: [
        'Bachelor\'s degree in Education or related field',
        'Teaching experience preferred',
        'Strong writing skills',
        'Familiarity with curriculum standards',
        'Experience with educational technology',
        'Knowledge of assessment design'
      ],
      benefits: [
        'Remote work',
        'Health insurance',
        '401(k) matching',
        'Professional development',
        'Summer break',
        'Flexible PTO',
        'Conference budget ($500/year)'
      ],
      team: {
        name: 'Education',
        size: 7,
        description: 'Our education team ensures all content meets the highest pedagogical standards and supports diverse learning needs.'
      }
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      salary: '$110,000 - $140,000',
      experience: 'mid',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Manage our cloud infrastructure and deployment pipelines. Ensure high availability and scalability of our platform.',
      responsibilities: [
        'Manage AWS/GCP infrastructure',
        'Implement CI/CD pipelines',
        'Monitor system performance and reliability',
        'Ensure security and compliance',
        'Troubleshoot production issues',
        'Optimize infrastructure costs'
      ],
      requirements: [
        '3+ years of DevOps experience',
        'AWS/GCP experience',
        'Kubernetes/Docker expertise',
        'CI/CD pipeline management',
        'Infrastructure as Code (Terraform)',
        'Monitoring tools (Prometheus, Grafana)'
      ],
      benefits: [
        'Remote work flexibility',
        'Health insurance',
        '401(k) matching',
        'Stock options',
        'Unlimited PTO',
        'Learning stipend ($2,000/year)',
        'Conference budget ($1,500/year)'
      ],
      team: {
        name: 'Platform Engineering',
        size: 4,
        description: 'Our platform engineering team keeps EduAI running smoothly and scales our infrastructure to meet growing demand.'
      }
    }
  ];

  // Load job data on mount
  useEffect(() => {
    const loadJob = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundJob = mockJobs.find(j => j.id.toString() === jobId);
        if (foundJob) {
          setJob(foundJob);
        } else {
          showError('Job not found');
          navigate('/careers');
        }
        setLoading(false);
      }, 500);
    };

    if (jobId) {
      loadJob();
    } else {
      navigate('/careers');
    }
  }, [jobId, navigate, showError]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        showError('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > maxSize) {
        showError('File size must be less than 5MB');
        return;
      }
      
      setApplication(prev => ({
        ...prev,
        resume: file
      }));
      showSuccess('Resume uploaded successfully!');
    }
  };

  // Validate application form
  const validateApplication = () => {
    const newErrors = {};
    
    if (!application.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!application.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(application.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!application.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!application.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    
    if (!application.resume) {
      newErrors.resume = 'Please upload your resume';
    }
    
    if (!application.startDate.trim()) {
      newErrors.startDate = 'Availability date is required';
    }
    
    if (!application.experience.trim()) {
      newErrors.experience = 'Experience level is required';
    }
    
    if (!application.whyInterested.trim()) {
      newErrors.whyInterested = 'Please tell us why you\'re interested';
    }
    
    return newErrors;
  };

  // Handle application submission
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateApplication();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Please fill in all required fields');
      return;
    }
    
    setApplying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you'd send the application to your backend
      console.log('Application submitted:', {
        jobId: job.id,
        jobTitle: job.title,
        ...application
      });
      
      showSuccess('Application submitted successfully! We\'ll review your application and get back to you soon.');
      setShowApplicationForm(false);
      setApplication({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        coverLetter: '',
        resume: null,
        portfolio: '',
        startDate: '',
        experience: '',
        whyInterested: ''
      });
    } catch (error) {
      showError('Failed to submit application. Please try again.');
    }
    
    setApplying(false);
  };

  // Clear form errors when user starts typing
  useEffect(() => {
    setErrors({});
  }, [application]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Job Details...</h2>
          <p className="text-gray-300">Please wait while we fetch the job information.</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-gray-300 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/careers')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduAI Careers</h1>
            </div>
            <button
              onClick={() => navigate('/careers')}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Jobs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Job Detail Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1 mb-6 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                <p className="text-blue-100 text-lg mb-4">{job.department}</p>
                <div className="flex flex-wrap items-center space-x-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Apply Now</span>
              </button>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
                  <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Team Info */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Meet the Team</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {job.team.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{job.team.name}</h4>
                      <p className="text-gray-600">{job.team.size} members</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{job.team.description}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Benefits */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefits & Perks</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Culture */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">BAI Studios Culture</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Coffee className="w-5 h-5 text-brown-500" />
                      <span className="text-gray-700">Unlimited PTO</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wifi className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Remote Work</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Fast Growth</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">Learning Stipend</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                >
                  <FileText className="w-5 h-5" />
                  <span>Apply for This Position</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={application.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={application.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={application.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={application.startDate}
                        onChange={handleInputChange}
                        className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="linkedin"
                        value={application.linkedin}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="github"
                        value={application.github}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Website
                    </label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="portfolio"
                        value={application.portfolio}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="experience"
                  value={application.experience}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select your experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6+ years)</option>
                </select>
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                  <Upload className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                <p className="text-xs text-gray-500 mt-1">PDF or Word document, max 5MB</p>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={application.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit for EduAI..."
                  required
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
              </div>

              {/* Why Interested */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why Are You Interested in EduAI? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="whyInterested"
                  value={application.whyInterested}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.whyInterested ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="What excites you about working at EduAI and how would you contribute to our mission?"
                  required
                />
                {errors.whyInterested && <p className="text-red-500 text-sm mt-1">{errors.whyInterested}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {applying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;