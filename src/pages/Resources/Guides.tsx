
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, FileText, Download, Calculator } from 'lucide-react';

const Guides = () => {
  useEffect(() => {
    document.title = "Financial Guides | Accountly";
    
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
                Resources
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Expert financial guides</h1>
              <p className="text-xl text-gray-600 mb-8">
                Access our comprehensive collection of guides covering everything from accounting basics to advanced tax strategies.
              </p>
              <div className="relative max-w-md">
                <input 
                  type="text" 
                  placeholder="Search guides..." 
                  className="w-full py-3 px-5 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-70"></div>
                <div className="glass-card p-8 rounded-xl relative z-10">
                  <h2 className="text-xl font-medium mb-4">Featured Guides</h2>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/guides/tax-deductions" className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">Ultimate Tax Deduction Guide</h3>
                          <p className="text-sm text-gray-500">10 min read</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guides/small-business-accounting" className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">Small Business Accounting 101</h3>
                          <p className="text-sm text-gray-500">15 min read</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guides/financial-planning" className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                          <Calculator size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">Financial Planning Essentials</h3>
                          <p className="text-sm text-gray-500">12 min read</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
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
              Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Browse by topic</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the information you need, organized by subject area
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <h3 className="text-xl font-medium mb-4">Tax Strategy</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link to="/guides/tax-deductions" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Tax Deductions for Businesses</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/international-tax" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>International Tax Considerations</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/tax-planning" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Year-End Tax Planning</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/tax-credits" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Maximizing Tax Credits</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
              </ul>
              <Link to="/guides/category/tax" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                See all tax guides <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-xl font-medium mb-4">Accounting</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link to="/guides/bookkeeping-basics" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Bookkeeping Basics</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/financial-statements" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Understanding Financial Statements</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/cash-flow" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Cash Flow Management</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/accounting-software" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Choosing Accounting Software</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
              </ul>
              <Link to="/guides/category/accounting" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                See all accounting guides <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '300ms' }}>
              <h3 className="text-xl font-medium mb-4">Financial Planning</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link to="/guides/business-budgeting" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Business Budgeting</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/retirement-planning" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Retirement Planning for Business Owners</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/investment-strategy" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Investment Strategy Basics</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
                <li>
                  <Link to="/guides/succession-planning" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <span>Business Succession Planning</span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
              </ul>
              <Link to="/guides/category/financial-planning" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                See all planning guides <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-10 animate-on-scroll">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-3/5">
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Tax Guide 2023</h3>
                <p className="text-gray-600 mb-6">
                  Download our complete guide to tax planning for 2023, covering the latest tax law changes, strategies for individuals and businesses, and expert tips to minimize your tax burden.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
                    <Download size={18} />
                    <span>Download PDF (3.2 MB)</span>
                  </button>
                  <button className="inline-flex items-center gap-2 border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                    <span>Share</span>
                  </button>
                </div>
              </div>
              <div className="md:w-2/5">
                <img 
                  src="/placeholder.svg" 
                  alt="Tax Guide Cover" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Need personalized guidance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert accountants are ready to help you with your specific financial situation.
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

export default Guides;
