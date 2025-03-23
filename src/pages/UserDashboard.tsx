
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  DollarSign, 
  FileText, 
  Calculator, 
  HelpCircle, 
  CreditCard, 
  Clock, 
  Settings,
  DownloadCloud,
  AlertCircle,
  LogOut
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import SubscriptionGuard from '@/components/SubscriptionGuard';

const UserDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading, signOut } = useAuth();
  
  useEffect(() => {
    document.title = "My Dashboard | Accountly";
    
    // If user is not logged in, redirect to login
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleGenerateTaxReturns = () => {
    toast({
      title: "Tax return generated",
      description: "Your tax return has been prepared and is ready for review.",
    });
  };

  const handleForecastCashFlow = () => {
    toast({
      title: "Cash flow forecast updated",
      description: "Your 12-month cash flow forecast has been updated with the latest data.",
    });
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // The useEffect will redirect, this prevents flash of content
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Welcome, {user.user_metadata.full_name || 'User'}</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Account Settings
              </Button>
              <Button variant="destructive" className="flex items-center gap-2" onClick={handleSignOut}>
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                  <DollarSign />
                </div>
                <span className="text-gray-600">Cash Balance</span>
              </div>
              <div className="text-3xl font-semibold">$24,560.89</div>
              <div className="text-sm text-green-500 mt-1">+8.5% from last month</div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                  <CreditCard />
                </div>
                <span className="text-gray-600">Receivables</span>
              </div>
              <div className="text-3xl font-semibold">$12,350.00</div>
              <div className="text-sm text-blue-500 mt-1">5 invoices pending</div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                  <Clock />
                </div>
                <span className="text-gray-600">Payables</span>
              </div>
              <div className="text-3xl font-semibold">$5,680.25</div>
              <div className="text-sm text-gray-500 mt-1">3 bills due this week</div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-500">
                  <AlertCircle />
                </div>
                <span className="text-gray-600">Tax Estimate</span>
              </div>
              <div className="text-3xl font-semibold">$8,732.15</div>
              <div className="text-sm text-red-500 mt-1">Due in 32 days</div>
            </div>
          </div>
          
          {/* Subscription Status */}
          <div className="mb-8">
            <SubscriptionStatus />
          </div>
          
          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SubscriptionGuard requiredTier="professional">
                <button 
                  className="glass-card p-6 rounded-xl text-left hover-lift"
                  onClick={handleGenerateTaxReturns}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                      <FileText />
                    </div>
                    <h3 className="font-medium">Generate Tax Returns</h3>
                  </div>
                  <p className="text-gray-600">Prepare quarterly or annual tax filings with AI assistance</p>
                </button>
              </SubscriptionGuard>
              
              <SubscriptionGuard requiredTier="starter">
                <button 
                  className="glass-card p-6 rounded-xl text-left hover-lift"
                  onClick={handleForecastCashFlow}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                      <BarChart />
                    </div>
                    <h3 className="font-medium">Forecast Cash Flow</h3>
                  </div>
                  <p className="text-gray-600">Project your business's financial future for 12 months</p>
                </button>
              </SubscriptionGuard>
              
              <Link 
                to="/invoice/new"
                className="glass-card p-6 rounded-xl text-left hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                    <Calculator />
                  </div>
                  <h3 className="font-medium">Create Invoice</h3>
                </div>
                <p className="text-gray-600">Generate professional invoices with automatic numbering</p>
              </Link>
            </div>
          </div>
          
          {/* Reports & Tools */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4">Reports & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SubscriptionGuard requiredTier="starter">
                <Link to="/reports/profit-loss" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                  <LineChart className="text-blue-500" />
                  <span>Profit & Loss</span>
                </Link>
              </SubscriptionGuard>
              
              <SubscriptionGuard requiredTier="starter">
                <Link to="/reports/balance-sheet" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                  <PieChart className="text-green-500" />
                  <span>Balance Sheet</span>
                </Link>
              </SubscriptionGuard>
              
              <SubscriptionGuard requiredTier="professional">
                <Link to="/reports/tax-summary" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                  <FileText className="text-purple-500" />
                  <span>Tax Summary</span>
                </Link>
              </SubscriptionGuard>
              
              <Link to="/reports/expense" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                <BarChart className="text-orange-500" />
                <span>Expense Reports</span>
              </Link>
              
              <Link to="/tools/tax-calculator" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                <Calculator className="text-teal-500" />
                <span>Tax Calculator</span>
              </Link>
              
              <SubscriptionGuard requiredTier="starter">
                <Link to="/tools/invoicing" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                  <CreditCard className="text-red-500" />
                  <span>Invoicing</span>
                </Link>
              </SubscriptionGuard>
              
              <SubscriptionGuard requiredTier="professional">
                <Link to="/tools/receipt-scanner" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                  <DownloadCloud className="text-indigo-500" />
                  <span>Receipt Scanner</span>
                </Link>
              </SubscriptionGuard>
              
              <Link to="/support" className="glass-card p-4 rounded-xl flex items-center gap-3 hover-lift">
                <HelpCircle className="text-gray-500" />
                <span>Help & Support</span>
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 text-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Invoice #1034 Created</h4>
                    <p className="text-sm text-gray-500">Today at 2:30 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500 text-sm">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Payment Received: $1,250.00</h4>
                    <p className="text-sm text-gray-500">Yesterday at 10:15 AM</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 text-sm">
                    <BarChart size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Quarterly Tax Report Generated</h4>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 text-sm">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Tax Filing Deadline Reminder</h4>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
