
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  FileText, 
  LightbulbIcon, 
  DollarSign, 
  PieChart, 
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Tips = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Accounting Tips & Best Practices | Accountly";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Accounting Tips & Best Practices</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn how to manage your finances more effectively with our expert accounting tips, 
              tax strategies, and financial planning guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Tax Timeline Section */}
            <div className="glass-card p-8 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '100ms'}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <Calendar size={24} />
                </div>
                <h2 className="text-2xl font-medium">Tax Timeline</h2>
              </div>
              
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-400"></div>
                  <h3 className="font-medium">January - February</h3>
                  <p className="text-gray-600 text-sm mt-1">Collect all tax documents (W-2s, 1099s, etc.). Start organizing receipts and business expenses.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-400"></div>
                  <h3 className="font-medium">March - April</h3>
                  <p className="text-gray-600 text-sm mt-1">Complete tax return preparation and filing. Consider tax extension if needed (but remember that extensions only extend filing, not payment).</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-400"></div>
                  <h3 className="font-medium">September - October</h3>
                  <p className="text-gray-600 text-sm mt-1">Final extension deadline. Review your tax strategy for next year with a professional.</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-400"></div>
                  <h3 className="font-medium">November - December</h3>
                  <p className="text-gray-600 text-sm mt-1">Year-end tax planning. Consider tax-loss harvesting and charitable donations before year-end.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/tools/tax-calculator" className="w-full">
                    Use Tax Calculator
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Financial Health Checklist */}
            <div className="glass-card p-8 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-medium">Financial Health Checklist</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 className="font-medium">Track All Income and Expenses</h3>
                    <p className="text-gray-600 text-sm mt-1">Use accounting software to automatically categorize transactions and maintain accurate records.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 className="font-medium">Separate Personal and Business Finances</h3>
                    <p className="text-gray-600 text-sm mt-1">Maintain separate bank accounts and credit cards for business and personal use.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 className="font-medium">Regular Financial Reviews</h3>
                    <p className="text-gray-600 text-sm mt-1">Schedule monthly or quarterly financial reviews to assess performance and adjust strategies.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 className="font-medium">Tax Planning Throughout the Year</h3>
                    <p className="text-gray-600 text-sm mt-1">Don't wait until tax season to think about tax strategies. Plan year-round.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 className="font-medium">Emergency Fund</h3>
                    <p className="text-gray-600 text-sm mt-1">Maintain 3-6 months of expenses in an easily accessible emergency fund.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/resources/guides" className="w-full">
                    View Detailed Guides
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Tips Section */}
          <div className="mb-16 animate-fade-up" style={{animationDelay: '300ms'}}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick Tax-Saving Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <LightbulbIcon size={18} />
                </div>
                <h3 className="font-medium mb-2">Maximize Retirement Contributions</h3>
                <p className="text-gray-600 text-sm">Contributing to a 401(k) or IRA not only builds retirement savings but also reduces your taxable income.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <Clock size={18} />
                </div>
                <h3 className="font-medium mb-2">Timing Income and Expenses</h3>
                <p className="text-gray-600 text-sm">Strategically time when you receive income or pay deductible expenses to optimize your tax situation.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <DollarSign size={18} />
                </div>
                <h3 className="font-medium mb-2">Business Structure Matters</h3>
                <p className="text-gray-600 text-sm">Review your business entity type regularly. Different structures (LLC, S-Corp, etc.) have different tax advantages.</p>
              </div>
            </div>
          </div>
          
          {/* Industry-Specific Advice */}
          <div className="animate-fade-up" style={{animationDelay: '400ms'}}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Industry-Specific Advice</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="font-medium">Freelancers & Contractors</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Track home office expenses for potential deductions</li>
                  <li>• Consider quarterly estimated tax payments to avoid penalties</li>
                  <li>• Set aside 25-30% of income for taxes</li>
                  <li>• Leverage SEP IRA or Solo 401(k) for retirement savings</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                    <PieChart size={18} />
                  </div>
                  <h3 className="font-medium">Small Business Owners</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Review business expenses monthly for tax planning</li>
                  <li>• Consider Section 179 deduction for equipment purchases</li>
                  <li>• Explore qualified business income deduction eligibility</li>
                  <li>• Maintain clear separation of business/personal expenses</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild>
                <Link to="/contact">
                  Get Personalized Advice
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Tips;
