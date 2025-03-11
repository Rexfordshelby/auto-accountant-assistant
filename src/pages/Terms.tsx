
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FileText, Shield, AlertCircle } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service | Accountly";
    
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
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: April 20, 2023
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Accountly's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h2>2. Description of Services</h2>
            <p>
              Accountly provides accounting, tax, and financial advisory services through our website, software applications, and professional services. Our services may include but are not limited to bookkeeping, tax preparation, financial reporting, and advisory.
            </p>
            
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access our services and agree not to disclose your password to any third party. You are responsible for any activity that occurs under your account.
            </p>
            
            <h2>4. Fees and Payment</h2>
            <p>
              Certain services offered by Accountly may require payment of fees. All fees are in U.S. dollars and are non-refundable except as required by law or as explicitly stated in these Terms.
            </p>
            <p>
              By providing a credit card or other payment method accepted by Accountly, you represent and warrant that you are authorized to use the payment method you provide and authorize us to charge your payment method for the services you have selected.
            </p>
            
            <h2>5. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, compilation, and other matters related to our website and services are protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistribution, use, or publication by you of any such content is strictly prohibited without our express permission.
            </p>
            
            <h2>6. User Content</h2>
            <p>
              You retain ownership of any content that you submit, post, or display on or through our services. By submitting, posting, or displaying content on or through our services, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall Accountly, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any (i) errors, mistakes, or inaccuracies of content; (ii) personal injury or property damage of any nature whatsoever resulting from your access to and use of our services; (iii) any unauthorized access to or use of our secure servers and/or any personal information stored therein.
            </p>
            
            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within New York County for the resolution of any disputes.
            </p>
            
            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use our services will immediately cease.
            </p>
            
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Accountly, Inc.<br />
              123 Financial Street<br />
              Suite 400<br />
              New York, NY 10001<br />
              Email: legal@accountly.com<br />
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
              Our team is here to help you understand our terms of service.
            </p>
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Contact Our Legal Team
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;
