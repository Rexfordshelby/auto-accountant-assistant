
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Award, Clock, GraduationCap, Send } from 'lucide-react';

const Careers = () => {
  useEffect(() => {
    document.title = "Careers | Accountly";
    
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
                Careers
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Join our mission to transform accounting</h1>
              <p className="text-xl text-gray-600 mb-8">
                We're looking for talented individuals who are passionate about finance, technology, and helping businesses succeed.
              </p>
              <Link to="#openings" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                View Open Positions
              </Link>
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
              Why Join Us
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Life at Accountly</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a culture that values innovation, continuous learning, and work-life balance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">Comprehensive health coverage, retirement plans, and competitive compensation packages.</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-500">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Flexible Work</h3>
              <p className="text-gray-600">Remote-first culture with flexible schedules that prioritize work-life balance.</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-500">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Professional development budget, mentorship programs, and clear career progression paths.</p>
            </div>
          </div>
          
          <div className="md:flex items-center gap-12 mb-20">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-on-scroll">
              <img 
                src="/placeholder.svg" 
                alt="Office Culture" 
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-3xl font-semibold mb-4">Our Values in Action</h3>
              <p className="text-lg text-gray-700 mb-4">
                At Accountly, our values aren't just words on a wall — they guide how we work every day. We believe in fostering an inclusive environment where diverse perspectives are valued and everyone has a voice.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We're committed to work-life balance because we know that well-rested team members deliver their best work. Our flexible approach enables you to work where and when you're most productive.
              </p>
              <p className="text-lg text-gray-700">
                If you're looking for a workplace that challenges you professionally while supporting your personal growth, Accountly might be the perfect fit.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="openings" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Open Positions
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Join our growing team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're always looking for exceptional talent to help us build the future of accounting
            </p>
          </div>
          
          <div className="space-y-6 mb-12">
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block text-sm font-medium bg-blue-100 text-blue-800 rounded-full px-3 py-1 mb-2">
                    Full-time
                  </span>
                  <h3 className="text-xl font-medium mb-2">Senior Tax Accountant</h3>
                  <p className="text-gray-600">Remote (US) · Tax Services · Senior Level</p>
                </div>
                <Link to="/careers/senior-tax-accountant" className="md:flex-shrink-0 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors text-center">
                  Apply Now
                </Link>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '100ms' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block text-sm font-medium bg-green-100 text-green-800 rounded-full px-3 py-1 mb-2">
                    Full-time
                  </span>
                  <h3 className="text-xl font-medium mb-2">Financial Software Developer</h3>
                  <p className="text-gray-600">Remote (Global) · Engineering · Mid-Senior Level</p>
                </div>
                <Link to="/careers/financial-software-developer" className="md:flex-shrink-0 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors text-center">
                  Apply Now
                </Link>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll hover-lift" style={{ transitionDelay: '200ms' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block text-sm font-medium bg-purple-100 text-purple-800 rounded-full px-3 py-1 mb-2">
                    Full-time
                  </span>
                  <h3 className="text-xl font-medium mb-2">Client Success Manager</h3>
                  <p className="text-gray-600">Remote (US/UK) · Client Services · Mid Level</p>
                </div>
                <Link to="/careers/client-success-manager" className="md:flex-shrink-0 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors text-center">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-on-scroll glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Don't see the right role?</h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always interested in connecting with talented individuals who are passionate about what we do.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Send us your resume <Send size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Careers;
