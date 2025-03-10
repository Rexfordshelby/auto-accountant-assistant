
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    document.title = "Accountly | Modern Accounting Solutions";
    
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

    // Animate on load for elements above the fold
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">What our clients say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl text-left hover-lift animate-on-scroll">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">S</div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Founder, Bright Ideas</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Accountly has completely transformed how we manage our finances. The AI-powered insights have helped us identify savings we wouldn't have found otherwise."
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-left hover-lift animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">M</div>
                <div>
                  <p className="font-medium">Mark Williams</p>
                  <p className="text-sm text-gray-600">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The automation features have saved us countless hours every month. Tax season is no longer stressful with Accountly handling everything."
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-left hover-lift animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">J</div>
                <div>
                  <p className="font-medium">Jessica Chen</p>
                  <p className="text-sm text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a freelancer, keeping track of expenses and invoices was always a challenge. Accountly makes it simple and even helps me find tax deductions."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover-lift animate-on-scroll">
              <h3 className="text-xl font-medium mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">For freelancers and small businesses</p>
              <div className="my-6">
                <span className="text-4xl font-semibold">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Expense tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Basic reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Invoice creation</span>
                </li>
              </ul>
              <Link to="/pricing" className="block w-full py-2 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-black text-white rounded-2xl p-8 border border-black shadow-lg hover-lift relative animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm py-1 px-3 rounded-full font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-medium mb-2">Professional</h3>
              <p className="text-gray-300 mb-4">For growing businesses</p>
              <div className="my-6">
                <span className="text-4xl font-semibold">$79</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Tax preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Financial forecasting</span>
                </li>
              </ul>
              <Link to="/pricing" className="block w-full py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover-lift animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-xl font-medium mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For larger organizations</p>
              <div className="my-6">
                <span className="text-4xl font-semibold">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Custom API integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Advanced security features</span>
                </li>
              </ul>
              <Link to="/contact" className="block w-full py-2 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
          
          <div className="mt-10">
            <Link to="/pricing" className="text-blue-600 font-medium flex items-center justify-center gap-1 hover:underline">
              View detailed pricing <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Dashboard />
      
      <Footer />
    </div>
  );
};

export default Index;
