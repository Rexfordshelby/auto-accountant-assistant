
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  BarChart3, 
  TrendingUp, 
  FileBarChart,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Jan', expense: 4000, income: 2400 },
  { name: 'Feb', expense: 3000, income: 1398 },
  { name: 'Mar', expense: 2000, income: 9800 },
  { name: 'Apr', expense: 2780, income: 3908 },
  { name: 'May', expense: 1890, income: 4800 },
  { name: 'Jun', expense: 2390, income: 3800 },
];

const Insights = () => {
  useEffect(() => {
    document.title = "Financial Insights | Accountly";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Financial Insights & Analytics</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gain deeper understanding of your financial data with our powerful analytics tools and expert insights.
            </p>
          </div>
          
          <div className="mb-12 animate-fade-up" style={{animationDelay: '100ms'}}>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-medium mb-6">Income vs. Expenses Breakdown</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#4F46E5" name="Income" />
                    <Bar dataKey="expense" fill="#F43F5E" name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <Button asChild>
                  <Link to="/dashboard">
                    View Detailed Reports
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-6 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-xl font-medium">Performance Metrics</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Profit Margin</span>
                    <span className="text-sm font-medium text-green-600">24.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '24.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Expense Ratio</span>
                    <span className="text-sm font-medium text-amber-600">68.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68.2%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Cash Flow</span>
                    <span className="text-sm font-medium text-blue-600">+$12,450</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Debt-to-Income</span>
                    <span className="text-sm font-medium text-red-600">34.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '34.7%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '300ms'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <FileBarChart size={20} />
                </div>
                <h2 className="text-xl font-medium">Category Breakdown</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Operational Expenses</span>
                  <span className="font-medium">$32,450</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Marketing & Advertising</span>
                  <span className="font-medium">$8,750</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Payroll & Benefits</span>
                  <span className="font-medium">$45,200</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Software & Tools</span>
                  <span className="font-medium">$3,680</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Misc. Expenses</span>
                  <span className="font-medium">$1,245</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-10 animate-fade-up" style={{animationDelay: '400ms'}}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Actionable Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-l-amber-500">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cost Optimization Opportunity</h3>
                    <p className="text-gray-600 text-sm">Your software expenses increased by 23% this quarter. Consider auditing subscriptions to identify potential savings.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-green-500">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Revenue Growth Potential</h3>
                    <p className="text-gray-600 text-sm">Sales from product line A increased 15% while requiring minimal marketing. Consider allocating more resources to this area.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="text-center animate-fade-up" style={{animationDelay: '500ms'}}>
            <Button asChild size="lg">
              <Link to="/contact">
                Schedule Financial Review Session
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Insights;
