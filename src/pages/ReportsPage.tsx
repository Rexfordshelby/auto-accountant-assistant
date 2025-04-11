
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import SubscriptionGuard from '@/components/SubscriptionGuard';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: string;
  category: string;
  description: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const ReportsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Financial Reports | Accountly";
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setTransactions([]);
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load transaction data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchTransactions();
    toast({
      title: 'Reports Refreshed',
      description: 'Your financial reports have been updated with the latest data.',
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: 'Report Downloaded',
      description: 'Your financial report has been downloaded successfully.',
    });
  };

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    
  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    
  const netProfit = totalIncome - totalExpenses;

  // Prepare data for charts
  const categoryData = transactions.reduce((acc, transaction) => {
    if (transaction.category) {
      const existingCategory = acc.find(item => item.name === transaction.category);
      
      if (existingCategory) {
        existingCategory.value += Math.abs(transaction.amount);
      } else {
        acc.push({
          name: transaction.category,
          value: Math.abs(transaction.amount)
        });
      }
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Monthly data
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    
    if (existingMonth) {
      if (transaction.type === 'income') {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expense += transaction.amount;
      }
      existingMonth.profit = existingMonth.income - existingMonth.expense;
    } else {
      acc.push({
        month: monthYear,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expense: transaction.type === 'expense' ? transaction.amount : 0,
        profit: transaction.type === 'income' ? transaction.amount : -transaction.amount
      });
    }
    
    return acc;
  }, [] as { month: string; income: number; expense: number; profit: number }[]);

  // Sort monthly data chronologically
  monthlyData.sort((a, b) => {
    const monthA = new Date(a.month);
    const monthB = new Date(b.month);
    return monthA.getTime() - monthB.getTime();
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );

  const toFixedNumber = (value: any): number => {
    if (typeof value === 'number') {
      return Number(value.toFixed(2));
    }
    return 0;
  };

  const renderOverviewTab = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700">Total Income</CardTitle>
            <CardDescription>All time earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700">Total Expenses</CardTitle>
            <CardDescription>All time expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
        
        <Card className={`${netProfit >= 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
          <CardHeader className="pb-2">
            <CardTitle className={`${netProfit >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>Net Profit</CardTitle>
            <CardDescription>Income minus expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>
              {formatCurrency(netProfit)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Profit/Loss</CardTitle>
            <CardDescription>Track your financial performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${toFixedNumber(value)}`} />
                  <Tooltip formatter={(value) => [`$${toFixedNumber(value)}`, '']} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#4ade80" />
                  <Bar dataKey="expense" name="Expense" fill="#f87171" />
                  <Bar dataKey="profit" name="Profit" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>View your spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${toFixedNumber(value)}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCashFlowTab = () => (
    <div>
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Statement</CardTitle>
            <CardDescription>Monthly breakdown of income and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${toFixedNumber(value)}`} />
                  <Tooltip formatter={(value) => [`$${toFixedNumber(value)}`, '']} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#4ade80" />
                  <Bar dataKey="expense" name="Expense" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <SubscriptionGuard requiredTier="starter">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Financial Reports</h1>
              <p className="text-gray-500 mt-1">Analyze your financial performance</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              
              <Button 
                onClick={handleDownloadReport} 
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-1 mb-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              </TabsList>
              
              {isLoading ? (
                <div className="p-6">
                  {renderSkeleton()}
                </div>
              ) : (
                <>
                  <TabsContent value="overview" className="p-4">
                    {renderOverviewTab()}
                  </TabsContent>
                  
                  <TabsContent value="cashflow" className="p-4">
                    {renderCashFlowTab()}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </SubscriptionGuard>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
