
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Download, FileText, PieChart as PieChartIcon, BarChart2, TrendingUp, Loader2 } from 'lucide-react';
import SubscriptionGuard from '@/components/SubscriptionGuard';

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [invoiceStatusData, setInvoiceStatusData] = useState([]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  useEffect(() => {
    document.title = "Financial Reports | Accountly";
    if (user) {
      fetchData();
    }
  }, [user]);
  
  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch transactions
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
        
      if (transactionError) throw transactionError;
      
      // Fetch invoices
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('issue_date', { ascending: false });
        
      if (invoiceError) throw invoiceError;
      
      setTransactions(transactionData || []);
      setInvoices(invoiceData || []);
      
      // Process data for charts
      processDataForCharts(transactionData || [], invoiceData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load financial data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const processDataForCharts = (transactions, invoices) => {
    // Process monthly revenue and expenses
    const monthlyMap = {};
    const now = new Date();
    
    // Initialize past 6 months
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = month.toLocaleString('default', { month: 'short' }) + ' ' + month.getFullYear();
      monthlyMap[monthKey] = { name: monthKey, income: 0, expenses: 0 };
    }
    
    // Add transaction data
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
      
      if (monthlyMap[monthKey]) {
        if (transaction.type === 'income') {
          monthlyMap[monthKey].income += Number(transaction.amount);
        } else if (transaction.type === 'expense') {
          monthlyMap[monthKey].expenses += Number(transaction.amount);
        }
      }
    });
    
    // Add invoice data
    invoices.forEach(invoice => {
      const date = new Date(invoice.issue_date);
      const monthKey = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
      
      if (monthlyMap[monthKey]) {
        monthlyMap[monthKey].income += Number(invoice.paid_amount || 0);
      }
    });
    
    setMonthlyData(Object.values(monthlyMap));
    
    // Process expense categories
    const categories = {};
    transactions.forEach(transaction => {
      if (transaction.type === 'expense' && transaction.category) {
        categories[transaction.category] = (categories[transaction.category] || 0) + Number(transaction.amount);
      }
    });
    
    const categoryChartData = Object.entries(categories).map(([name, value]) => ({ name, value }));
    setCategoryData(categoryChartData);
    
    // Process invoice statuses
    const statuses = { 'draft': 0, 'sent': 0, 'paid': 0, 'overdue': 0 };
    invoices.forEach(invoice => {
      const status = invoice.status || 'draft';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    
    const invoiceStatusChartData = Object.entries(statuses).map(([name, value]) => ({ name, value }));
    setInvoiceStatusData(invoiceStatusChartData);
  };
  
  const handleDownloadReport = (reportType) => {
    toast({
      title: "Feature Coming Soon",
      description: `${reportType} report download will be available in the next update.`,
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading your financial data...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Financial Reports</h1>
              <p className="text-gray-600">Analyze your financial data with interactive reports</p>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Income vs Expenses
                    </CardTitle>
                    <CardDescription>Monthly comparison for the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => ['$' + value.toFixed(2), '']} />
                        <Legend />
                        <Bar dataKey="income" name="Income" fill="#4CAF50" />
                        <Bar dataKey="expenses" name="Expenses" fill="#F44336" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-blue-500" />
                      Expense Categories
                    </CardTitle>
                    <CardDescription>Breakdown of your expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => ['$' + value.toFixed(2), '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="income">
              <SubscriptionGuard requiredTier="starter">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of your income sources</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => ['$' + value.toFixed(2), '']} />
                        <Legend />
                        <Line type="monotone" dataKey="income" name="Income" stroke="#4CAF50" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={() => handleDownloadReport('Income')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>
              </SubscriptionGuard>
            </TabsContent>
            
            <TabsContent value="expenses">
              <SubscriptionGuard requiredTier="starter">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Analysis</CardTitle>
                    <CardDescription>Track and analyze your spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => ['$' + value.toFixed(2), '']} />
                        <Legend />
                        <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#F44336" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={() => handleDownloadReport('Expense')}
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>
              </SubscriptionGuard>
            </TabsContent>
            
            <TabsContent value="invoices">
              <SubscriptionGuard requiredTier="starter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        Invoice Status
                      </CardTitle>
                      <CardDescription>Overview of your invoice statuses</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={invoiceStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {invoiceStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-blue-500" />
                        Outstanding Invoices
                      </CardTitle>
                      <CardDescription>Total amount of unpaid invoices by month</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => ['$' + value.toFixed(2), '']} />
                          <Bar dataKey="income" name="Outstanding" fill="#FFA726" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </SubscriptionGuard>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Profit & Loss Statement
                </CardTitle>
                <CardDescription>Summary of your business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  View a summary of your income, expenses, and overall profit for any time period.
                </p>
              </CardContent>
              <CardFooter>
                <SubscriptionGuard requiredTier="professional">
                  <Button 
                    onClick={() => handleDownloadReport('Profit & Loss')}
                    className="w-full flex items-center gap-2"
                  >
                    <Download size={16} />
                    Generate Report
                  </Button>
                </SubscriptionGuard>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                  Balance Sheet
                </CardTitle>
                <CardDescription>Your financial position snapshot</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A snapshot of your assets, liabilities, and equity at a specific point in time.
                </p>
              </CardContent>
              <CardFooter>
                <SubscriptionGuard requiredTier="professional">
                  <Button 
                    onClick={() => handleDownloadReport('Balance Sheet')}
                    className="w-full flex items-center gap-2"
                  >
                    <Download size={16} />
                    Generate Report
                  </Button>
                </SubscriptionGuard>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Cash Flow Statement
                </CardTitle>
                <CardDescription>Track your cash movement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Understand the inflows and outflows of cash in your business over time.
                </p>
              </CardContent>
              <CardFooter>
                <SubscriptionGuard requiredTier="professional">
                  <Button 
                    onClick={() => handleDownloadReport('Cash Flow')}
                    className="w-full flex items-center gap-2"
                  >
                    <Download size={16} />
                    Generate Report
                  </Button>
                </SubscriptionGuard>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
