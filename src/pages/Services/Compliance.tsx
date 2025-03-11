
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Shield, FileCheck, Book, Scale, AlertTriangle } from 'lucide-react';

const Compliance = () => {
  useEffect(() => {
    document.title = "Compliance Services | Accountly";
    
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
      
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 animate-on-scroll visible">
              <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
                Compliance Services
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Navigate regulatory complexity</h1>
              <p className="text-xl text-gray-600 mb-8">
                Our compliance experts help your business stay current with changing regulations and minimize regulatory risks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                  Get Started
                </Link>
                <Link to="/pricing" className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-70"></div>
                <div className="relative glass-card rounded-xl p-8 overflow-hidden">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center text-center p-4">
                      <FileCheck className="text-blue-500 mb-3" size={32} />
                      <h3 className="font-medium mb-1">Regulatory Compliance</h3>
                      <p className="text-sm text-gray-600">Industry-specific rules</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <Book className="text-green-500 mb-3" size={32} />
                      <h3 className="font-medium mb-1">Policy Management</h3>
                      <p className="text-sm text-gray-600">Documentation & procedures</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <AlertTriangle className="text-purple-500 mb-3" size={32} />
                      <h3 className="font-medium mb-1">Risk Assessment</h3>
                      <p className="text-sm text-gray-600">Identifying vulnerabilities</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <Scale className="text-orange-500 mb-3" size={32} />
                      <h3 className="font-medium mb-1">Legal Compliance</h3>
                      <p className="text-sm text-gray-600">Meeting legal requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Compliance solutions that protect your business</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We help you navigate complex regulatory landscapes and implement robust compliance programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600 mb-4">Stay current with industry-specific regulations and reporting requirements to avoid penalties.</p>
              <Link to="/services/regulatory-compliance" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-500">
                <Book size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Policy Development</h3>
              <p className="text-gray-600 mb-4">Create comprehensive compliance policies and procedures tailored to your business needs.</p>
              <Link to="/services/policy-development" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Compliance Monitoring</h3>
              <p className="text-gray-600 mb-4">Ongoing assessment and reporting to ensure your business maintains compliance over time.</p>
              <Link to="/services/compliance-monitoring" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Ready to strengthen your compliance program?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts help you build robust compliance frameworks that protect your business from regulatory risks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Schedule a Consultation
            </Link>
            <Link to="/register" className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Compliance;
