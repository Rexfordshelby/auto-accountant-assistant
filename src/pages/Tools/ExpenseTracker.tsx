
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Trash2,
  Plus,
  Save,
  Calendar,
  Wallet,
  Receipt,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
  Filter,
  Download,
  DollarSign
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  date: string;
  type: string;
  description: string;
  category: string;
  receipt_url?: string;
  created_at: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const ExpenseTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [filterMonth, setFilterMonth] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Form states
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<string>('expense');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [receipt, setReceipt] = useState<File | null>(null);
  
  // Stats
  const [monthlyExpense, setMonthlyExpense] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = "Expense Tracker | Accountly";
    if (user) {
      fetchTransactions();
    }
  }, [user]);
  
  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (filterMonth) {
        // Filter by month (YYYY-MM)
        const startDate = `${filterMonth}-01`;
        const endMonth = parseInt(filterMonth.split('-')[1]);
        const endYear = parseInt(filterMonth.split('-')[0]);
        const endDate = new Date(endYear, endMonth, 0).toISOString().split('T')[0]; // Last day of month
        
        query = query.gte('date', startDate).lte('date', endDate);
      }
      
      if (filterCategory) {
        query = query.eq('category', filterCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setTransactions(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load transactions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const calculateStats = (data: Transaction[]) => {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    // Monthly expense and income
    let totalExpense = 0;
    let totalIncome = 0;
    const categories: Record<string, number> = {};
    
    data.forEach(transaction => {
      if (transaction.date.startsWith(currentMonth)) {
        if (transaction.type === 'expense') {
          totalExpense += Number(transaction.amount);
          
          // Category data for pie chart
          if (transaction.category) {
            categories[transaction.category] = (categories[transaction.category] || 0) + Number(transaction.amount);
          }
        } else if (transaction.type === 'income') {
          totalIncome += Number(transaction.amount);
        }
      }
    });
    
    setMonthlyExpense(totalExpense);
    setMonthlyIncome(totalIncome);
    
    // Format category data for pie chart
    const categoryChartData = Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
    
    setCategoryData(categoryChartData);
  };
  
  const resetForm = () => {
    setAmount(0);
    setDate(new Date().toISOString().split('T')[0]);
    setType('expense');
    setDescription('');
    setCategory('');
    setReceipt(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to track expenses.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    if (!amount || !date) {
      toast({
        title: 'Missing Information',
        description: 'Please provide an amount and date.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      let receiptUrl = null;
      
      // If receipt is uploaded, store it in Supabase Storage
      if (receipt) {
        const fileExt = receipt.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(filePath, receipt);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from('receipts')
          .getPublicUrl(filePath);
          
        receiptUrl = urlData.publicUrl;
      }
      
      // Create transaction record
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount,
          date,
          type,
          description,
          category: category || null,
          receipt_url: receiptUrl
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: `${type === 'expense' ? 'Expense' : 'Income'} added successfully.`,
      });
      
      resetForm();
      setAddDialogOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to add transaction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Transaction deleted successfully.',
      });
      
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete transaction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownloadReport = () => {
    // Generate CSV data
    let csvContent = "Date,Type,Category,Description,Amount\n";
    
    transactions.forEach(transaction => {
      csvContent += `${transaction.date},${transaction.type},${transaction.category || ''},${transaction.description || ''},${transaction.amount}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'expense_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Report Downloaded',
      description: 'Your expense report has been downloaded as a CSV file.',
    });
  };
  
  const getUniqueCategories = () => {
    const categories = transactions
      .map(t => t.category)
      .filter((category, index, self) => 
        category && self.indexOf(category) === index
      );
    return categories;
  };
  
  const getUniqueMonths = () => {
    const months = transactions
      .map(t => t.date.slice(0, 7)) // Get YYYY-MM
      .filter((month, index, self) => self.indexOf(month) === index)
      .sort((a, b) => b.localeCompare(a)); // Sort descending
    return months;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Expense Tracker</h1>
              <p className="text-gray-600">Track your income and expenses to manage your finances better</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => setAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Transaction
              </Button>
              
              <SubscriptionGuard requiredTier="starter">
                <Button 
                  variant="outline"
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Export Report
                </Button>
              </SubscriptionGuard>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  Monthly Summary
                </CardTitle>
                <CardDescription>Current month overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ArrowDownCircle className="h-5 w-5 text-green-500" />
                      <span>Income</span>
                    </div>
                    <span className="font-semibold text-green-500">${monthlyIncome.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="h-5 w-5 text-red-500" />
                      <span>Expenses</span>
                    </div>
                    <span className="font-semibold text-red-500">${monthlyExpense.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-2 border-t flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Balance</span>
                    </div>
                    <span className="font-semibold text-lg">${(monthlyIncome - monthlyExpense).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                <CardDescription>By category for current month</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                {categoryData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No expense data available for this month
                  </div>
                ) : (
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
                      <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transaction History</span>
                
                <div className="flex items-center gap-2">
                  <Select value={filterMonth} onValueChange={setFilterMonth}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Months</SelectItem>
                      {getUniqueMonths().map(month => (
                        <SelectItem key={month} value={month}>
                          {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {getUniqueCategories().map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={fetchTransactions}
                    title="Apply Filters"
                  >
                    <Filter size={16} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No transactions found.</p>
                  <Button 
                    onClick={() => setAddDialogOpen(true)}
                    variant="outline"
                  >
                    Add Your First Transaction
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.category || '-'}</TableCell>
                          <TableCell>{transaction.description || '-'}</TableCell>
                          <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              {transaction.receipt_url && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(transaction.receipt_url, '_blank')}
                                  title="View Receipt"
                                >
                                  <Receipt size={16} />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDelete(transaction.id)}
                                title="Delete Transaction"
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record a new income or expense transaction
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Transaction Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input 
                      id="amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Food, Transportation, Salary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Transaction details"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt">Receipt (Optional)</Label>
                  <Input 
                    id="receipt"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Transaction
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpenseTracker;
