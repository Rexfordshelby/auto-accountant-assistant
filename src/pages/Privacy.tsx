
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Accountly";
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center animate-on-scroll visible">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: April 20, 2023
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At Accountly ("we," "our," or "us"), we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our website and services, including:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> First name, last name, email address, telephone number, address, and financial information necessary to provide our services.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, services, and applications.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.
              </li>
            </ul>
            
            <h2>3. How We Collect Your Information</h2>
            <p>
              We use different methods to collect data from and about you including through:
            </p>
            <ul>
              <li>
                <strong>Direct interactions:</strong> You may provide us with your personal data by filling in forms on our website, creating an account, subscribing to our services, or corresponding with us.
              </li>
              <li>
                <strong>Automated technologies:</strong> As you navigate through our website, we may automatically collect technical data about your equipment, browsing actions, and patterns.
              </li>
              <li>
                <strong>Third parties:</strong> We may receive personal data about you from various third parties, such as analytics providers, advertising networks, and search information providers.
              </li>
            </ul>
            
            <h2>4. How We Use Your Information</h2>
            <p>
              We may use the information we collect about you for the following purposes:
            </p>
            <ul>
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and send related information</li>
              <li>To send administrative information, such as updates, security alerts, and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To personalize your experience on our website and deliver content relevant to your interests</li>
              <li>To monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>5. Disclosure of Your Information</h2>
            <p>
              We may disclose your personal information in the following circumstances:
            </p>
            <ul>
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
              <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request</li>
              <li>To enforce or apply our terms of use and other agreements</li>
              <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Accountly, our customers, or others</li>
            </ul>
            
            <h2>6. Data Security</h2>
            <p>
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            
            <h2>7. Data Retention</h2>
            <p>
              We will retain your personal data only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectify or update your personal data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            
            <h2>9. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Accountly, Inc.<br />
              123 Financial Street<br />
              Suite 400<br />
              New York, NY 10001<br />
              Email: privacy@accountly.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Have more questions?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help you understand how we protect your data.
            </p>
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Contact Our Privacy Team
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;
