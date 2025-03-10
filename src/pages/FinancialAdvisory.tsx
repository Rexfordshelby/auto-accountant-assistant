
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { LineChart, BarChart2, PieChart, TrendingUp, Briefcase, Building, Brain, Users, ChevronRight } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumbers';

const ServiceCard = ({ icon, title, description, link, delay = 0 }) => {
  return (
    <div 
      className="glass-card p-8 rounded-xl animate-on-scroll hover-lift"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
        Learn more <span className="text-xl">→</span>
      </Link>
    </div>
  );
};

const FinancialAdvisory = () => {
  useEffect(() => {
    document.title = "Financial Advisory | Accountly";
    
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
                Financial Advisory
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">Strategic financial guidance</h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert financial advisory services to help you make informed decisions and achieve your business and personal goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                  Schedule a Consultation
                </Link>
                <Link to="/case-studies" className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl blur-xl opacity-70"></div>
                <div className="relative glass-card rounded-xl p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Average ROI for Clients</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-baseline">
                          <AnimatedNumber 
                            value={27} 
                            className="text-3xl font-semibold text-green-600" 
                          />
                          <span className="text-green-600 ml-1">%</span>
                        </div>
                        <TrendingUp className="text-green-600" size={20} />
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Clients Served</p>
                        <div className="flex items-baseline">
                          <AnimatedNumber 
                            value={500} 
                            className="text-2xl font-semibold" 
                            formatter={(val) => val.toLocaleString()}
                          />
                          <span className="text-gray-500 ml-1">+</span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Years of Experience</p>
                        <div className="flex items-baseline">
                          <AnimatedNumber 
                            value={20} 
                            className="text-2xl font-semibold" 
                          />
                          <span className="text-gray-500 ml-1">+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/5 p-4 rounded-lg">
                      <p className="text-sm font-medium">Expertise Breakdown</p>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="text-center">
                          <div className="inline-block p-2 bg-blue-100 rounded-full text-blue-600 mb-1">
                            <BarChart2 size={18} />
                          </div>
                          <p className="text-xs">Financial Analysis</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block p-2 bg-green-100 rounded-full text-green-600 mb-1">
                            <PieChart size={18} />
                          </div>
                          <p className="text-xs">Investment Planning</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block p-2 bg-purple-100 rounded-full text-purple-600 mb-1">
                            <LineChart size={18} />
                          </div>
                          <p className="text-xs">Growth Strategy</p>
                        </div>
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
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Expert financial solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive advisory services tailored to your specific business needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<BarChart2 size={24} />}
              title="Financial Analysis"
              description="In-depth analysis of your financial data to identify trends, opportunities, and areas for improvement."
              link="/services/financial-analysis"
              delay={100}
            />
            
            <ServiceCard 
              icon={<TrendingUp size={24} />}
              title="Strategic Planning"
              description="Long-term financial planning aligned with your business goals and market conditions."
              link="/services/strategic-planning"
              delay={200}
            />
            
            <ServiceCard 
              icon={<LineChart size={24} />}
              title="Cash Flow Management"
              description="Optimize your cash flow to improve liquidity and ensure business stability."
              link="/services/cash-flow-management"
              delay={300}
            />
            
            <ServiceCard 
              icon={<Briefcase size={24} />}
              title="Investment Advisory"
              description="Expert guidance on investment opportunities to maximize returns and minimize risks."
              link="/services/investment-advisory"
              delay={400}
            />
            
            <ServiceCard 
              icon={<Building size={24} />}
              title="Business Valuation"
              description="Accurate valuation of your business assets for mergers, acquisitions, or succession planning."
              link="/services/business-valuation"
              delay={500}
            />
            
            <ServiceCard 
              icon={<Brain size={24} />}
              title="Risk Management"
              description="Identify and mitigate financial risks to protect your business and investments."
              link="/services/risk-management"
              delay={600}
            />
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 animate-on-scroll">
              <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
                Our Process
              </span>
              <h2 className="text-4xl font-semibold mb-6">How we work with you</h2>
              <p className="text-gray-600 mb-8">
                Our collaborative approach ensures that we understand your unique needs and develop customized solutions to achieve your financial goals.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">1</div>
                    <div className="absolute top-10 bottom-0 left-1/2 w-1 bg-blue-200 -translate-x-1/2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-medium mb-2">Initial Consultation</h3>
                    <p className="text-gray-600">
                      We begin with a comprehensive discussion to understand your current financial situation, goals, and challenges.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">2</div>
                    <div className="absolute top-10 bottom-0 left-1/2 w-1 bg-blue-200 -translate-x-1/2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-medium mb-2">Financial Assessment</h3>
                    <p className="text-gray-600">
                      Our experts analyze your financial data, market conditions, and industry trends to identify opportunities and risks.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">3</div>
                    <div className="absolute top-10 bottom-0 left-1/2 w-1 bg-blue-200 -translate-x-1/2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-medium mb-2">Strategy Development</h3>
                    <p className="text-gray-600">
                      We create a customized financial strategy aligned with your business objectives and risk tolerance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">4</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2">Implementation & Monitoring</h3>
                    <p className="text-gray-600">
                      We help you implement the strategy and continuously monitor results, making adjustments as needed to ensure success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="glass-card p-8 rounded-xl">
                <h3 className="text-2xl font-semibold mb-6">Client Success Stories</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Building size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Tech Innovators Inc.</h4>
                        <p className="text-sm text-gray-500">Software Development</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Accountly's financial advisory services helped us optimize our cash flow and secure funding for expansion. Our revenue increased by 35% in just one year."
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Results: 35% Revenue Growth</span>
                      <Link to="/case-studies/tech-innovators" className="text-blue-600 flex items-center hover:underline">
                        View Case Study <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Users size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">GreenLife Organics</h4>
                        <p className="text-sm text-gray-500">Retail & E-commerce</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      "The strategic financial planning services helped us identify cost-saving opportunities and optimize our supply chain, resulting in a 20% profit margin increase."
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Results: 20% Profit Increase</span>
                      <Link to="/case-studies/greenlife-organics" className="text-blue-600 flex items-center hover:underline">
                        View Case Study <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                    View All Case Studies
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
          <h2 className="text-4xl font-semibold mb-6">Ready to transform your financial strategy?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get expert financial guidance tailored to your specific business needs and goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Schedule a Consultation
            </Link>
            <Link to="/services" className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer would go here */}
    </div>
  );
};

export default FinancialAdvisory;
