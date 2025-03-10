
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FileCheck, TrendingUp, Calculator, FileText, Shield, Clock, Calendar, HelpCircle } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumbers';

const TaxServices = () => {
  useEffect(() => {
    document.title = "Tax Services | Accountly";
    
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
                Tax Services
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Stress-free tax solutions</h1>
              <p className="text-xl text-gray-600 mb-8">
                Our expert tax preparation services save you time and maximize your returns with precision and compliance.
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
                <div className="relative glass-card rounded-xl p-6 overflow-hidden">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-medium mb-1">Tax Returns Filed</h3>
                      <div className="flex items-end">
                        <AnimatedNumber 
                          value={50000} 
                          className="text-3xl font-semibold" 
                          formatter={(val) => val.toLocaleString()}
                        />
                        <span className="text-gray-500 ml-1">+</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-medium mb-1">Client Satisfaction</h3>
                      <div className="flex items-end">
                        <AnimatedNumber 
                          value={99} 
                          className="text-3xl font-semibold" 
                        />
                        <span className="text-gray-500 ml-1">%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-medium mb-1">Avg. Tax Savings</h3>
                      <div className="flex items-end">
                        <span className="text-3xl font-semibold">$</span>
                        <AnimatedNumber 
                          value={3247} 
                          className="text-3xl font-semibold" 
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-medium mb-1">Years Experience</h3>
                      <div className="flex items-end">
                        <AnimatedNumber 
                          value={15} 
                          className="text-3xl font-semibold" 
                        />
                        <span className="text-gray-500 ml-1">+</span>
                      </div>
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
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Comprehensive tax solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From personal to complex business tax returns, we offer complete coverage with expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
                <FileCheck size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Personal Tax Returns</h3>
              <p className="text-gray-600 mb-4">Maximize deductions and credits while ensuring full compliance with current tax laws.</p>
              <Link to="/services/personal-tax" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-500">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Business Tax Planning</h3>
              <p className="text-gray-600 mb-4">Strategic tax planning to minimize liability and improve cash flow for your business.</p>
              <Link to="/services/business-tax" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-500">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Tax Calculation</h3>
              <p className="text-gray-600 mb-4">Precise calculations to determine your exact tax liability with no surprises.</p>
              <Link to="/services/tax-calculation" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '400ms' }}>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-500">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Tax Compliance</h3>
              <p className="text-gray-600 mb-4">Stay compliant with all relevant tax regulations and avoid costly penalties.</p>
              <Link to="/services/tax-compliance" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '500ms' }}>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-red-500">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Audit Protection</h3>
              <p className="text-gray-600 mb-4">Expert representation and defense in case of tax audits or inquiries.</p>
              <Link to="/services/audit-protection" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '600ms' }}>
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 text-teal-500">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Year-Round Support</h3>
              <p className="text-gray-600 mb-4">Continuous tax guidance and advice throughout the year, not just at tax time.</p>
              <Link to="/services/year-round-support" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                Learn more <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 animate-on-scroll">
              <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
                Tax Timeline
              </span>
              <h2 className="text-4xl font-semibold mb-6">Important tax dates to remember</h2>
              <p className="text-gray-600 mb-8">
                Stay ahead of deadlines with our comprehensive tax calendar. We'll help you avoid late filing penalties and keep your finances on track.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Calendar size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">April 15, 2024</h3>
                    <p className="text-gray-600">Individual tax returns due (Form 1040)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Calendar size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">June 15, 2024</h3>
                    <p className="text-gray-600">Quarterly estimated tax payment due (Q2)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Calendar size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">September 15, 2024</h3>
                    <p className="text-gray-600">Quarterly estimated tax payment due (Q3)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Calendar size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">October 15, 2024</h3>
                    <p className="text-gray-600">Extended individual tax returns due</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/tax-calendar" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  View full tax calendar <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="glass-card p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-blue-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-2">What documents do I need for tax preparation?</h4>
                        <p className="text-gray-600">You'll need income statements (W-2s, 1099s), expense records, investment statements, and last year's tax return. Our secure portal allows you to easily upload all documents.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-blue-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-2">How long does tax preparation take?</h4>
                        <p className="text-gray-600">Most individual returns are completed within 1-2 weeks of receiving all necessary documents. Complex business returns may take 2-3 weeks.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-blue-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-2">What if I receive an audit notice?</h4>
                        <p className="text-gray-600">Our audit protection service provides full representation in case of an audit. We'll handle all communications with the IRS and guide you through the process.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-blue-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-2">Can you help with tax planning year-round?</h4>
                        <p className="text-gray-600">Yes, our tax planning services are available throughout the year. We recommend quarterly check-ins to optimize your tax strategy as your financial situation evolves.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/faq" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                    View All FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-4xl font-semibold mb-6">Ready to simplify your taxes?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their tax preparation and planning needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Schedule a Consultation
            </Link>
            <Link to="/signup" className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer would go here */}
    </div>
  );
};

export default TaxServices;
