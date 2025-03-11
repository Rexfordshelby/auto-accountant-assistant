
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Accountly";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Accountly Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights, trends, and advice on accounting, tax planning, and financial management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card rounded-xl overflow-hidden hover-lift">
              <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Tax planning strategies" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>June 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>Sarah Johnson</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">10 Tax Planning Strategies for Small Businesses</h3>
                <p className="text-gray-600 mb-4">
                  Effective tax planning strategies can significantly reduce your tax burden and improve your business's financial health.
                </p>
                <Link to="/blog/tax-planning-strategies" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden hover-lift">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Financial reporting" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>May 22, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>Michael Chen</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Understanding Financial Statements: A Guide for Business Owners</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to interpret financial statements to make informed business decisions and track your company's performance.
                </p>
                <Link to="/blog/understanding-financial-statements" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden hover-lift">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Cloud accounting" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>April 10, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>Emily Rodriguez</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">The Benefits of Cloud Accounting for Remote Teams</h3>
                <p className="text-gray-600 mb-4">
                  Discover how cloud accounting solutions can streamline financial processes for distributed teams.
                </p>
                <Link to="/blog/cloud-accounting-benefits" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/blog/all" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors inline-flex items-center gap-2">
              View all articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
