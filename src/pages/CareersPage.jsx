// src/pages/CareersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  Building,
  Mail,
  ExternalLink,
  Filter,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  Coffee,
  Wifi,
  Heart,
  Home,
} from "lucide-react";

const CareersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    salary: "all",
    experience: "all",
    department: "all",
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const mockJobs = [
    {
      id: 1,
      title: "QA Tester",
      department: "Product",
      location: "Remote",
      salary: "£20,000 - £35,000",
      experience: "entry",
      type: "Part-time",
      posted: "17.10.2025",
      description:
        "Join our development team to test upcoming features and ensure quality across our AI-powered education platform.",
      responsibilities: [
        "Test new platform features across browsers and devices",
        "Log bugs and collaborate with developers to fix them",
        "Write and maintain test cases",
      ],
      requirements: [
        "Attention to detail",
        "Experience with testing tools",
        "Basic understanding of software development",
        "Good communication skills",
      ],
      benefits: ["Competitive salary", "Remote work", "Flexible hours"],
      team: {
        name: "QA Team",
        size: 5,
        description: "A tight-knit crew ensuring every release is top quality.",
      },
    },
  ];

  // Load jobs on mount
  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = jobs.filter((job) => {
      // Search term filter
      if (
        searchTerm &&
        !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.department.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Location filter
      if (filters.location !== "all" && job.location !== filters.location) {
        return false;
      }

      // Salary filter
      if (filters.salary !== "all") {
        const salaryRange = job.salary.replace(/[^\d\-]/g, "").split("-");
        const minSalary = parseInt(salaryRange[0]);
        if (filters.salary === "low" && minSalary > 80000) return false;
        if (
          filters.salary === "mid" &&
          (minSalary < 80000 || minSalary > 120000)
        )
          return false;
        if (filters.salary === "high" && minSalary < 120000) return false;
      }

      // Experience filter
      if (
        filters.experience !== "all" &&
        job.experience !== filters.experience
      ) {
        return false;
      }

      // Department filter
      if (
        filters.department !== "all" &&
        job.department !== filters.department
      ) {
        return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      location: "all",
      salary: "all",
      experience: "all",
      department: "all",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Careers at EduAI
                </h1>
                <p className="text-gray-600">
                  Join our mission to revolutionize education
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Home className="w-4 h-4" />
              <span>Back to homepage</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Shape the Future of Education
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join EduAI, a subsidiary of BAI Studios, and help transform how
            millions of students learn through AI-powered technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span>100+ Employees</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Building className="w-5 h-5" />
              <span>BAI Studios Subsidiary</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span>Rapid Growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* BAI Studios Connection */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Building className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Part of BAI Studios Family
                </h3>
                <p className="text-gray-600 mb-4">
                  When you join EduAI, you're not just joining a startup—you're
                  becoming part of
                  <strong> BAI Studios</strong>, a leading innovator in
                  AI-powered solutions. Enjoy career growth opportunities across
                  multiple divisions and cutting-edge projects.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Cross-Division Opportunities
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Shared Resources
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Career Advancement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Work With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Competitive Salary
              </h4>
              <p className="text-gray-600">
                Transparent salary ranges and equity opportunities for all
                roles.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Remote Flexibility
              </h4>
              <p className="text-gray-600">
                Work from anywhere with our flexible remote-first policy.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Unlimited PTO
              </h4>
              <p className="text-gray-600">
                Take time off when you need it with our unlimited vacation
                policy.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Health & Wellness
              </h4>
              <p className="text-gray-600">
                Comprehensive health insurance and wellness programs.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Learning Stipend
              </h4>
              <p className="text-gray-600">
                £2,000 annual stipend for courses, conferences, and books.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Career Growth
              </h4>
              <p className="text-gray-600">
                Fast-track advancement within EduAI and BAI Studios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Open Positions
          </h3>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="London, UK">London, UK</option>
                  <option value="New York, NY">New York, US</option>
                  <option value="Beijing, CN">Beijing, CN</option>
                </select>
                <select
                  value={filters.salary}
                  onChange={(e) => handleFilterChange("salary", e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Salaries</option>
                  <option value="low">Under £80k</option>
                  <option value="mid">£80k - £120k</option>
                  <option value="high">Over £120k</option>
                </select>
                <select
                  value={filters.experience}
                  onChange={(e) =>
                    handleFilterChange("experience", e.target.value)
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
                <select
                  value={filters.department}
                  onChange={(e) =>
                    handleFilterChange("department", e.target.value)
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Education">Education</option>
                </select>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    console.log("=== NAVIGATING TO JOB ===", job.id);
                    navigate(`/job/${job.id}`);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {job.title}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {job.department} • {job.location}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>
                            {job.experience === "entry"
                              ? "Entry Level"
                              : job.experience === "mid"
                              ? "Mid Level"
                              : job.experience === "senior"
                              ? "Senior Level"
                              : "All Levels"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {job.description.substring(0, 120)}...
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            +{job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help us shape the future of education with AI-powered learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={() =>
                window.open("https://github.com/Central3465/EduAI", "_blank")
              }
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
