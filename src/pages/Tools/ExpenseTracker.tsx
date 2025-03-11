
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar,
  Plus,
  Filter,
  Download,
  Search,
  Trash2,
  Edit,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

// Demo data for the expense tracker
const demoExpenses: Expense[] = [
  { id: '1', date: '2023-09-15', category: 'Food', description: 'Grocery shopping', amount: 85.75 },
  { id: '2', date: '2023-09-14', category: 'Transport', description: 'Uber ride', amount: 24.50 },
  { id: '3', date: '2023-09-12', category: 'Bills', description: 'Electricity bill', amount: 120.00 },
  { id: '4', date: '2023-09-10', category: 'Shopping', description: 'New work clothes', amount: 95.40 },
  { id: '5', date: '2023-09-08', category: 'Food', description: 'Restaurant dinner', amount: 65.30 },
  { id: '6', date: '2023-09-05', category: 'Transport', description: 'Gas refill', amount: 45.00 },
  { id: '7', date: '2023-09-03', category: 'Entertainment', description: 'Movie tickets', amount: 30.00 },
  { id: '8', date: '2023-09-01', category: 'Bills', description: 'Internet subscription', amount: 79.99 },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Food': <Coffee size={16} />,
  'Transport': <Car size={16} />,
  'Bills': <CreditCard size={16} />,
  'Shopping': <ShoppingBag size={16} />,
  'Housing': <Home size={16} />,
  'Entertainment': <Briefcase size={16} />,
};

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(demoExpenses);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
    description: '',
    amount: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    document.title = "Expense Tracker | Accountly";
  }, []);

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a description and a valid amount.",
        variant: "destructive"
      });
      return;
    }
    
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID()
    };
    
    setExpenses([expense, ...expenses]);
    
    // Reset form
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
      description: '',
      amount: 0
    });
    
    toast({
      title: "Expense added",
      description: "Your expense has been successfully recorded.",
    });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense deleted",
      description: "The expense has been removed from your records.",
    });
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return expense.category.toLowerCase() === activeTab.toLowerCase() && matchesSearch;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleExport = () => {
    toast({
      title: "Export successful",
      description: "Your expense report has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Expense Tracker</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track, categorize and analyze your expenses to gain better control over your financial health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-1 animate-fade-up" style={{animationDelay: '100ms'}}>
              <div className="glass-card p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-medium mb-4">Add New Expense</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Calendar size={16} />
                      </span>
                      <Input 
                        id="date" 
                        type="date" 
                        className="pl-9"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    >
                      <option value="Food">Food & Dining</option>
                      <option value="Transport">Transportation</option>
                      <option value="Bills">Bills & Utilities</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Housing">Housing</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description" 
                      type="text" 
                      placeholder="Enter expense description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      value={newExpense.amount || ''}
                      onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleAddExpense}
                  >
                    <Plus size={16} />
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 animate-fade-up" style={{animationDelay: '200ms'}}>
              <div className="glass-card p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                  <h2 className="text-xl font-medium">Expense History</h2>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search expenses"
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter size={14} />
                      <span>Filter</span>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleExport}>
                      <Download size={14} />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="food">Food</TabsTrigger>
                    <TabsTrigger value="transport">Transport</TabsTrigger>
                    <TabsTrigger value="bills">Bills</TabsTrigger>
                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 w-20"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((expense) => (
                              <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-600">{expense.date}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                      {categoryIcons[expense.category] || '?'}
                                    </div>
                                    <span className="text-sm">{expense.category}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{expense.description}</td>
                                <td className="px-4 py-3 text-sm font-medium text-right text-red-600">${expense.amount.toFixed(2)}</td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit size={15} className="text-gray-500" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => handleDeleteExpense(expense.id)}
                                    >
                                      <Trash2 size={15} className="text-gray-500" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                No expenses found matching your criteria
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-50">
                            <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right">Total</td>
                            <td className="px-4 py-3 text-sm font-bold text-right text-red-600">${totalAmount.toFixed(2)}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Need to track more complex financial data?
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Schedule a Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpenseTracker;
