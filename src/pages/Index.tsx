
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Dashboard from '../components/Dashboard';

const Index = () => {
  useEffect(() => {
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
      
      {/* Testimonials Section - Placeholder */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">What our clients say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl text-left hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Founder, Bright Ideas</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Accountly has completely transformed how we manage our finances. The AI-powered insights have helped us identify savings we wouldn't have found otherwise."
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-left hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Mark Williams</p>
                  <p className="text-sm text-gray-600">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The automation features have saved us countless hours every month. Tax season is no longer stressful with Accountly handling everything."
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-left hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
      
      {/* Pricing Section - Placeholder */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Choose the perfect plan for your business needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover-lift">
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
              <button className="w-full py-2 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-black text-white rounded-2xl p-8 border border-black shadow-lg hover-lift relative">
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
              <button className="w-full py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover-lift">
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
              <button className="w-full py-2 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Dashboard />
      
      {/* Footer */}
      <footer className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
                <span className="font-medium text-lg">Accountly</span>
              </a>
              <p className="text-gray-600 mb-4">
                Modern accounting for modern businesses.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95934 14.8821 3.29241C14.0247 3.62547 13.2884 4.22152 12.773 4.99407C12.2575 5.76661 11.9877 6.68114 12 7.61V8.61C10.2426 8.65101 8.5013 8.19818 6.93102 7.29552C5.36074 6.39285 4.01032 5.06887 3 3.5C3 3.5 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17.5 6.5L17.51 6.49889" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2023 Accountly. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
