
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Play, Calendar, Users, Clock, PlusCircle } from 'lucide-react';

const Webinars = () => {
  useEffect(() => {
    document.title = "Webinars | Accountly";
    
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
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Free accounting webinars</h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our expert-led webinars covering the latest accounting trends, tax strategies, and financial best practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="#upcoming" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                  Upcoming Webinars
                </Link>
                <Link to="#recordings" className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                  Past Recordings
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-70"></div>
                <div className="glass-card rounded-xl relative z-10 overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/placeholder.svg" 
                      alt="Featured Webinar" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Play className="h-6 w-6 text-black ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-sm font-medium bg-blue-100 text-blue-800 rounded-full px-3 py-1 mb-2">
                      Featured
                    </span>
                    <h3 className="text-xl font-medium mb-2">Tax Planning Strategies for Small Businesses</h3>
                    <p className="text-gray-600 mb-4">Learn how to optimize your tax position and save money with our comprehensive guide to small business tax planning.</p>
                    <div className="flex items-center text-gray-500 text-sm gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>May 15, 2023</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>60 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="upcoming" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Calendar
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Upcoming webinars</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Register now to secure your spot in our live sessions with Q&A opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card rounded-xl overflow-hidden animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block text-sm font-medium bg-green-100 text-green-800 rounded-full px-3 py-1">
                    Upcoming
                  </span>
                  <span className="text-sm font-medium">Free</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Mastering Cash Flow for Business Growth</h3>
                <p className="text-gray-600 mb-4">Learn practical techniques to optimize your business cash flow and fuel sustainable growth.</p>
                <div className="flex items-center text-gray-500 text-sm gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>June 10, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>11:00 AM - 12:30 PM EST</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Financial Advisor, Accountly</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block text-sm font-medium bg-green-100 text-green-800 rounded-full px-3 py-1">
                    Upcoming
                  </span>
                  <span className="text-sm font-medium">Free</span>
                </div>
                <h3 className="text-xl font-medium mb-2">International Tax Considerations for Expanding Businesses</h3>
                <p className="text-gray-600 mb-4">Navigate the complexities of international taxation as your business expands globally.</p>
                <div className="flex items-center text-gray-500 text-sm gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>June 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>2:00 PM - 3:30 PM EST</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500">International Tax Specialist, Accountly</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/resources/webinars/calendar" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
              <PlusCircle size={18} />
              <span>View All Upcoming Webinars</span>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="recordings" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Library
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Past webinar recordings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Catch up on our most popular webinars and learn at your own pace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card rounded-xl overflow-hidden animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Webinar Thumbnail" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-black ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 m-2 rounded">
                  45:32
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-medium mb-2">Year-End Tax Planning for Small Businesses</h3>
                <div className="flex items-center text-gray-500 text-xs gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Dec 5, 2022</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>1,234 views</span>
                  </div>
                </div>
                <Link to="/webinars/year-end-tax-planning" className="text-blue-600 text-sm font-medium hover:underline">
                  Watch Now
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Webinar Thumbnail" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-black ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 m-2 rounded">
                  52:18
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-medium mb-2">QuickBooks Tips for Efficient Bookkeeping</h3>
                <div className="flex items-center text-gray-500 text-xs gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Nov 12, 2022</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>2,567 views</span>
                  </div>
                </div>
                <Link to="/webinars/quickbooks-tips" className="text-blue-600 text-sm font-medium hover:underline">
                  Watch Now
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden animate-on-scroll hover-lift" style={{ transitionDelay: '300ms' }}>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Webinar Thumbnail" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-black ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 m-2 rounded">
                  38:45
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-medium mb-2">Financial Forecasting for Business Growth</h3>
                <div className="flex items-center text-gray-500 text-xs gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Oct 25, 2022</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>1,892 views</span>
                  </div>
                </div>
                <Link to="/webinars/financial-forecasting" className="text-blue-600 text-sm font-medium hover:underline">
                  Watch Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/resources/webinars/library" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors inline-block">
              Browse All Recordings
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-card p-10 rounded-2xl animate-on-scroll">
            <h2 className="text-3xl font-semibold mb-4">Want to suggest a webinar topic?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us know what financial topics you'd like us to cover in future webinars.
            </p>
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Suggest a Topic
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Webinars;
