
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Users, Building, Award, Clock, ArrowRight } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = "About Us | Accountly";
    
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
                About Us
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Simplifying accounting for modern businesses</h1>
              <p className="text-xl text-gray-600 mb-8">
                Founded in 2020, Accountly has been on a mission to transform how businesses manage their finances through technology and expertise.
              </p>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-70"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Accountly Team" 
                  className="w-full h-auto rounded-xl relative z-10 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">A vision for better accounting</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey began when our founders, experienced accountants and technologists, recognized the need for more accessible and user-friendly accounting solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="animate-on-scroll">
              <p className="text-lg text-gray-700 mb-6">
                After years of working with businesses of all sizes, our founding team noticed a consistent problem: traditional accounting services were often complex, expensive, and disconnected from the realities of modern business operations.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Accountly was born from the belief that accounting should be straightforward, affordable, and powered by cutting-edge technology, without sacrificing the human expertise that businesses rely on for strategic financial decisions.
              </p>
              <p className="text-lg text-gray-700">
                Today, we serve thousands of businesses across the globe, providing them with the tools and support they need to thrive financially in an increasingly complex business landscape.
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="glass-card p-8 rounded-xl h-full">
                <h3 className="text-2xl font-medium mb-6">Our Values</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex-shrink-0 flex items-center justify-center text-blue-500">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Excellence</h4>
                      <p className="text-gray-600">We're committed to delivering the highest quality service in everything we do.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex-shrink-0 flex items-center justify-center text-green-500">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Client-Focused</h4>
                      <p className="text-gray-600">Your success is our success. We build solutions that address real business needs.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex-shrink-0 flex items-center justify-center text-purple-500">
                      <Building size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Integrity</h4>
                      <p className="text-gray-600">Honesty and transparency guide all our client relationships and business practices.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Meet the experts behind Accountly</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines decades of accounting experience with technical innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member cards would go here */}
            <div className="animate-on-scroll hover-lift glass-card overflow-hidden rounded-xl" style={{ transitionDelay: '100ms' }}>
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-1">Jane Doe</h3>
                <p className="text-gray-500 mb-4">CEO & Co-Founder</p>
                <p className="text-gray-600">Former Big Four accountant with 15+ years of experience in financial advisory.</p>
              </div>
            </div>
            
            <div className="animate-on-scroll hover-lift glass-card overflow-hidden rounded-xl" style={{ transitionDelay: '200ms' }}>
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-1">John Smith</h3>
                <p className="text-gray-500 mb-4">CTO & Co-Founder</p>
                <p className="text-gray-600">Tech entrepreneur with a background in fintech and AI-powered solutions.</p>
              </div>
            </div>
            
            <div className="animate-on-scroll hover-lift glass-card overflow-hidden rounded-xl" style={{ transitionDelay: '300ms' }}>
              <img src="/placeholder.svg" alt="Team Member" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-1">Sarah Johnson</h3>
                <p className="text-gray-500 mb-4">Head of Client Services</p>
                <p className="text-gray-600">Dedicated to creating exceptional experiences for all our clients.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/careers" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
              Join our growing team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Ready to transform your accounting?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Accountly for their financial needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
            <Link to="/register" className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
