// src/pages/TermsOfServicePage.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using EduAI ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="text-gray-600">
              EduAI provides an AI-powered educational platform that generates assignments, grades student work, 
              and tracks learning progress. The Service is offered for educational purposes only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts</h2>
            <p className="text-gray-600">
              You must register for an account to use certain features of the Service. You agree to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Subscription and Payments</h2>
            <p className="text-gray-600">
              Some features of the Service require payment. By subscribing, you agree to pay all fees at the 
              rates established at the time of purchase. All fees are non-refundable except as expressly 
              provided in these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600">
              The Service and its original content, features, and functionality are owned by EduAI and are 
              protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property or proprietary rights laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. User Content</h2>
            <p className="text-gray-600">
              You retain all rights to any content you submit, post or display on or through the Service. 
              By submitting, posting or displaying content, you grant EduAI a worldwide, non-exclusive, 
              royalty-free license to use, reproduce, adapt, publish, translate and distribute it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Termination</h2>
            <p className="text-gray-600">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall EduAI, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including 
              without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
            <p className="text-gray-600">
              These Terms shall be governed and construed in accordance with the laws of California, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will provide at least 30 days' notice prior to any new terms 
              taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 font-medium">EduAI Support</p>
              <p className="text-gray-600">Email: contact@bai.studio</p>
              <p className="text-gray-600">This company is under the management of BAI Studios at https://bai.studio.</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            By using EduAI, you acknowledge that you have read and understood these Terms of Service 
            and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;