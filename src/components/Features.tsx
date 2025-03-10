
import React, { useEffect, useRef } from 'react';
import { BarChart, LineChart, Wallet, Receipt, FileText, Clock, Shield, BarChart2 } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = featureRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={featureRef} 
      className="animate-on-scroll p-6 rounded-2xl glass-card hover-lift"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" className="py-20 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Everything you need in one place</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform offers comprehensive accounting tools designed for modern businesses and entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<BarChart size={24} />} 
            title="Financial Reporting" 
            description="Automated generation of P&L statements, balance sheets, and cash flow statements." 
            delay={100}
          />
          <Feature 
            icon={<Wallet size={24} />} 
            title="Expense Tracking" 
            description="Effortlessly track and categorize expenses with receipt scanning and auto-categorization." 
            delay={200}
          />
          <Feature 
            icon={<LineChart size={24} />} 
            title="Financial Forecasting" 
            description="AI-powered projections and budget planning based on your historical data." 
            delay={300}
          />
          <Feature 
            icon={<Receipt size={24} />} 
            title="Invoice Management" 
            description="Create professional invoices and track payments with automated reminders." 
            delay={400}
          />
          <Feature 
            icon={<FileText size={24} />} 
            title="Tax Preparation" 
            description="Simplify tax season with automated calculations and filing assistance." 
            delay={500}
          />
          <Feature 
            icon={<Clock size={24} />} 
            title="Real-time Updates" 
            description="Always know your financial position with continuously updated financial data." 
            delay={600}
          />
          <Feature 
            icon={<Shield size={24} />} 
            title="Bank-level Security" 
            description="Your financial data is protected with enterprise-grade encryption and security." 
            delay={700}
          />
          <Feature 
            icon={<BarChart2 size={24} />} 
            title="Custom Reports" 
            description="Build and save custom reports for the metrics that matter most to your business." 
            delay={800}
          />
          <div className="relative p-6 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center animate-on-scroll lg:col-span-1" ref={sectionRef}>
            <p className="text-center text-gray-500">More features coming soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
