
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  useEffect(() => {
    document.title = "Frequently Asked Questions | Accountly";
  }, []);

  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      question: "What accounting services do you offer?",
      answer: "We offer a comprehensive range of accounting services including bookkeeping, financial reporting, tax preparation, audit services, financial planning, and advisory services for businesses of all sizes.",
      category: "services"
    },
    {
      question: "How much do your services cost?",
      answer: "Our service costs vary based on the specific needs of your business. We offer flexible pricing models including monthly subscriptions, project-based pricing, and hourly rates. Please contact us for a customized quote.",
      category: "pricing"
    },
    {
      question: "Do you work with businesses in specific industries?",
      answer: "Yes, we have expertise in various industries including technology, healthcare, retail, manufacturing, professional services, and nonprofits. Our team tailors our approach to meet industry-specific accounting requirements.",
      category: "services"
    },
    {
      question: "How do I get started with your services?",
      answer: "Getting started is easy. You can register for an account on our platform, schedule a consultation through our contact page, or call us directly. We'll discuss your needs and create a customized service plan.",
      category: "getting-started"
    },
    {
      question: "Can I access my financial information online?",
      answer: "Yes, our secure client portal allows you to access your financial information, reports, and documents 24/7 from any device. All data is protected with enterprise-grade encryption.",
      category: "technology"
    },
    {
      question: "How frequently will I receive financial reports?",
      answer: "We typically provide monthly financial reports, but we can adjust the frequency based on your business needs. Quarterly and annual reports are also standard for most clients.",
      category: "services"
    },
    {
      question: "What tax services do you provide?",
      answer: "Our tax services include tax planning, preparation, and filing for individuals and businesses. We stay current with tax laws to maximize deductions and ensure compliance.",
      category: "taxes"
    },
    {
      question: "Do you offer payroll services?",
      answer: "Yes, we provide comprehensive payroll services including employee payments, tax withholdings, benefits administration, and regulatory compliance reporting.",
      category: "services"
    },
    {
      question: "How do you ensure the security of my financial data?",
      answer: "We implement multiple layers of security including encryption, secure data centers, regular security audits, and strict access controls. Our systems comply with industry standards for financial data protection.",
      category: "technology"
    },
    {
      question: "Can you help with business formation and structure?",
      answer: "Yes, we can advise on optimal business structures (LLC, S-Corp, C-Corp, etc.) based on your specific circumstances, helping you make informed decisions about incorporation, taxation, and liability.",
      category: "services"
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <HelpCircle size={24} className="text-blue-500" />
              <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our accounting services, pricing, and processes.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'all' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Questions
              </button>
              <button
                onClick={() => setActiveCategory('services')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'services' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveCategory('pricing')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'pricing' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => setActiveCategory('taxes')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'taxes' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Taxes
              </button>
              <button
                onClick={() => setActiveCategory('technology')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'technology' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Technology
              </button>
              <button
                onClick={() => setActiveCategory('getting-started')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === 'getting-started' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Getting Started
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl overflow-hidden transition-all"
              >
                <button
                  className="w-full p-6 flex justify-between items-center"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-left font-medium text-lg">{faq.question}</h3>
                  {openItem === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openItem === index && (
                  <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-medium mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is ready to help you find the answers you need.
            </p>
            <Link to="/contact" className="px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
