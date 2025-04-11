
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit, Download, Search, Filter, Plus, Loader2, Upload, PieChart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import SubscriptionGuard from '@/components/SubscriptionGuard';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
  date: z.string().min(1, { message: "Date is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().optional(),
});

const EXPENSE_CATEGORIES = [
  "Advertising", "Insurance", "Legal fees", "Office supplies", "Rent", "Salaries", 
  "Software", "Travel", "Utilities", "Other"
];

const INCOME_CATEGORIES = [
  "Client payment", "Product sales", "Service fee", "Consulting", "Commission", "Interest", 
  "Affiliate", "Royalty", "Other"
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: string;
  category: string;
  description?: string;
  receipt_url?: string;
}

const ExpenseTracker = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      type: "expense",
      category: "",
      description: "",
    },
  });

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      type: "expense",
      category: "",
      description: "",
    },
  });

  // Fetch transactions on component mount
  useEffect(() => {
    document.title = "Expense Tracker | Accountly";
    fetchTransactions();
  }, []);

  // Populate edit form when currentTransaction changes
  useEffect(() => {
    if (currentTransaction) {
      editForm.setValue("amount", currentTransaction.amount);
      editForm.setValue("date", currentTransaction.date);
      editForm.setValue("type", currentTransaction.type);
      editForm.setValue("category", currentTransaction.category);
      editForm.setValue("description", currentTransaction.description || "");
    }
  }, [currentTransaction, editForm]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
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
        description: 'Failed to load your transactions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to add transactions.',
          variant: 'destructive',
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          { 
            user_id: user.id,
            amount: values.type === 'expense' ? -Math.abs(values.amount) : Math.abs(values.amount),
            date: values.date,
            type: values.type,
            category: values.category,
            description: values.description || null,
          }
        ])
        .select();
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `Your ${values.type} has been added successfully.`,
      });
      
      fetchTransactions();
      form.reset({
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        type: "expense",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to add transaction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Deleted',
        description: 'Transaction has been deleted successfully.',
      });
      
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete transaction. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEditTransaction = async (values: z.infer<typeof formSchema>) => {
    if (!currentTransaction) return;
    
    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          amount: values.type === 'expense' ? -Math.abs(values.amount) : Math.abs(values.amount),
          date: values.date,
          type: values.type,
          category: values.category,
          description: values.description || null,
        })
        .eq('id', currentTransaction.id);
        
      if (error) throw error;
      
      toast({
        title: 'Updated',
        description: 'Transaction has been updated successfully.',
      });
      
      setIsEditDialogOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to update transaction. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUploadReceipt = async () => {
    if (!currentTransaction || !receiptFile) return;
    
    setUploadingReceipt(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `${user.id}/${currentTransaction.id}-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, receiptFile);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('receipts')
        .getPublicUrl(fileName);
        
      // Update transaction with receipt URL
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          receipt_url: urlData.publicUrl
        })
        .eq('id', currentTransaction.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: 'Receipt Uploaded',
        description: 'Your receipt has been uploaded successfully.',
      });
      
      setIsUploadDialogOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload receipt. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploadingReceipt(false);
      setReceiptFile(null);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by transaction type
    if (activeTab !== 'all' && transaction.type !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !transaction.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
    return true;
  });

  // Calculate summary statistics
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const balance = totalIncome - totalExpenses;

  // Prepare data for the charts
  const categoryData = transactions.reduce((acc, t) => {
    if (t.category) {
      const existingCategory = acc.find(item => item.name === t.category);
      
      if (existingCategory) {
        existingCategory.value += Math.abs(t.amount);
      } else {
        acc.push({
          name: t.category,
          value: Math.abs(t.amount)
        });
      }
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Monthly data
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    
    if (existingMonth) {
      if (t.type === 'income') {
        existingMonth.income += Math.abs(t.amount);
      } else {
        existingMonth.expense += Math.abs(t.amount);
      }
    } else {
      acc.push({
        month: monthYear,
        income: t.type === 'income' ? Math.abs(t.amount) : 0,
        expense: t.type === 'expense' ? Math.abs(t.amount) : 0
      });
    }
    
    return acc;
  }, [] as { month: string; income: number; expense: number }[]);

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

  const toFixedNumber = (value: any): number => {
    if (typeof value === 'number') {
      return Number(value.toFixed(2));
    }
    return 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <p className="text-gray-500 mt-1">Track your income and expenses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Transaction Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="0.00" 
                            type="number" 
                            step="0.01" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.watch("type") === "expense" 
                              ? EXPENSE_CATEGORIES.map(category => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))
                              : INCOME_CATEGORIES.map(category => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add details about this transaction" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Summary Stats and Charts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-700">Total Income</h3>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-red-700">Total Expenses</h3>
                  <p className="text-2xl font-bold text-red-700">{formatCurrency(totalExpenses)}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
                  <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>Balance</h3>
                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
              
              <SubscriptionGuard requiredTier="starter">
                <div className="h-72">
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
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/reports')}
                    className="flex items-center"
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    View Detailed Reports
                  </Button>
                </div>
              </SubscriptionGuard>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search transactions"
                    className="pl-8 max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select onValueChange={(value) => setActiveTab(value)} defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery 
                  ? "No transactions found matching your search."
                  : "No transactions yet. Add your first transaction above."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.description || "-"}
                          {transaction.receipt_url && (
                            <a 
                              href={transaction.receipt_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              (Receipt)
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.category}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            {!transaction.receipt_url && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setCurrentTransaction(transaction);
                                  setIsUploadDialogOpen(true);
                                }}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setCurrentTransaction(transaction);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteTransaction(transaction.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditTransaction)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="0.00" 
                        type="number" 
                        step="0.01" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {editForm.watch("type") === "expense" 
                          ? EXPENSE_CATEGORIES.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))
                          : INCOME_CATEGORIES.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add details about this transaction" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Upload Receipt Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Receipt</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="receipt">Select file</Label>
              <Input 
                id="receipt" 
                type="file" 
                accept="image/*,.pdf" 
                className="mt-1"
                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: JPG, PNG, PDF (max 5MB)
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleUploadReceipt}
                disabled={!receiptFile || uploadingReceipt}
                className="w-full"
              >
                {uploadingReceipt ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Receipt
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ExpenseTracker;
