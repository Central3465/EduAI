// src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Shield, Users, FileText, Mail, Cookie, Lock } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              EduAI ("we", "us", or "our") operates the EduAI website (the "Service"). This page informs 
              you of our policies regarding the collection, use, and disclosure of personal data when you 
              use our Service and the choices you have associated with that data.
            </p>
            <p className="text-gray-600 mt-2">
              We use your data to provide and improve the Service. By using the Service, you agree to the 
              collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information Collection and Use</h2>
            <p className="text-gray-600">
              We collect several different types of information for various purposes to provide and 
              improve our Service to you.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Types of Data Collected:</h3>
            
            <h4 className="text-lg font-medium text-gray-700 mt-3">Personal Data</h4>
            <p className="text-gray-600">
              While using our Service, we may ask you to provide us with certain personally identifiable 
              information that can be used to contact or identify you ("Personal Data"). Personally 
              identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Cookies and Usage Data</li>
            </ul>
            
            <h4 className="text-lg font-medium text-gray-700 mt-3">Usage Data</h4>
            <p className="text-gray-600">
              We may also collect information on how the Service is accessed and used ("Usage Data"). 
              This Usage Data may include information such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Your computer's Internet Protocol address (e.g. IP address)</li>
              <li>Browser type and version</li>
              <li>The pages of our Service that you visit</li>
              <li>The time and date of your visit</li>
              <li>The time spent on those pages</li>
              <li>Unique device identifiers and other diagnostic data</li>
            </ul>
            
            <h4 className="text-lg font-medium text-gray-700 mt-3">Tracking & Cookies Data</h4>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to track the activity on our Service 
              and hold certain information.
            </p>
            <p className="text-gray-600 mt-2">
              Cookies are files with small amount of data which may include an anonymous unique identifier. 
              Cookies are sent to your browser from a website and stored on your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Use of Data</h2>
            <p className="text-gray-600">
              EduAI uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Transfer Of Data</h2>
            <p className="text-gray-600">
              Your information, including Personal Data, may be transferred to — and maintained on — 
              computers located outside of your state, province, country or other governmental 
              jurisdiction where the data protection laws may differ than those from your jurisdiction.
            </p>
            <p className="text-gray-600 mt-2">
              If you are located outside United States and choose to provide information to us, please 
              note that we transfer the data, including Personal Data, to United States and process it there.
            </p>
            <p className="text-gray-600 mt-2">
              Your consent to this Privacy Policy followed by your submission of such information represents 
              your agreement to that transfer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Disclosure Of Data</h2>
            
            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Legal Requirements</h3>
            <p className="text-gray-600">
              EduAI may disclose your Personal Data in the good faith belief that such action is 
              necessary to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of EduAI</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Security Of Data</h2>
            <p className="text-gray-600">
              The security of your data is important to us, but remember that no method of transmission 
              over the Internet, or method of electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your Personal Data, we cannot guarantee its 
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Service Providers</h2>
            <p className="text-gray-600">
              We may employ third party companies and individuals to facilitate our Service ("Service Providers"), 
              to provide the Service on our behalf, to perform Service-related services or to assist us in 
              analyzing how our Service is used.
            </p>
            <p className="text-gray-600 mt-2">
              These third parties have access to your Personal Data only to perform these tasks on our 
              behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Links To Other Sites</h2>
            <p className="text-gray-600">
              Our Service may contain links to other sites that are not operated by us. If you click on 
              a third party link, you will be directed to that third party's site. We strongly advise 
              you to review the Privacy Policy of every site you visit.
            </p>
            <p className="text-gray-600 mt-2">
              We have no control over and assume no responsibility for the content, privacy policies 
              or practices of any third party sites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600">
              Our Service does not address anyone under the age of 13 ("Children").
            </p>
            <p className="text-gray-600 mt-2">
              We do not knowingly collect personally identifiable information from anyone under the age 
              of 13. If you are a parent or guardian and you are aware that your Children has provided 
              us with Personal Data, please contact us. If we become aware that we have collected 
              Personal Data from anyone under the age of 13 without verification of parental consent, 
              we take steps to remove that information from our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes To This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page.
            </p>
            <p className="text-gray-600 mt-2">
              We will let you know via email and/or a prominent notice on our Service, prior to the 
              change becoming effective and update the "effective date" at the top of this Privacy Policy.
            </p>
            <p className="text-gray-600 mt-2">
              You are advised to review this Privacy Policy periodically for any changes. Changes to 
              this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 font-medium">EduAI Privacy Team</p>
              <p className="text-gray-600">Email: contact@bai.studio</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This Privacy Policy is governed by the laws of the United Kingdom.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;