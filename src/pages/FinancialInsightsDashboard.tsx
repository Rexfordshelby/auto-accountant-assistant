
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  RefreshCcw,
  Download,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { useNotification } from '@/contexts/NotificationContext';

// Sample data
const monthlyRevenueData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 7200 },
  { name: 'Jun', value: 6300 },
  { name: 'Jul', value: 8100 },
  { name: 'Aug', value: 9200 },
  { name: 'Sep', value: 7400 },
  { name: 'Oct', value: 8300 },
  { name: 'Nov', value: 10200 },
  { name: 'Dec', value: 12400 },
];

const monthlyExpenseData = [
  { name: 'Jan', value: 2600 },
  { name: 'Feb', value: 2800 },
  { name: 'Mar', value: 3100 },
  { name: 'Apr', value: 2900 },
  { name: 'May', value: 3300 },
  { name: 'Jun', value: 3600 },
  { name: 'Jul', value: 3900 },
  { name: 'Aug', value: 4100 },
  { name: 'Sep', value: 3800 },
  { name: 'Oct', value: 4200 },
  { name: 'Nov', value: 4400 },
  { name: 'Dec', value: 4600 },
];

const categoryData = [
  { name: 'Rent', value: 5000 },
  { name: 'Utilities', value: 1800 },
  { name: 'Salaries', value: 12000 },
  { name: 'Marketing', value: 2400 },
  { name: 'Equipment', value: 3200 },
];

const cashflowData = [
  { name: 'Jan', income: 4200, expenses: 2600, profit: 1600 },
  { name: 'Feb', income: 3800, expenses: 2800, profit: 1000 },
  { name: 'Mar', income: 5100, expenses: 3100, profit: 2000 },
  { name: 'Apr', income: 4800, expenses: 2900, profit: 1900 },
  { name: 'May', income: 7200, expenses: 3300, profit: 3900 },
  { name: 'Jun', income: 6300, expenses: 3600, profit: 2700 },
  { name: 'Jul', income: 8100, expenses: 3900, profit: 4200 },
  { name: 'Aug', income: 9200, expenses: 4100, profit: 5100 },
  { name: 'Sep', income: 7400, expenses: 3800, profit: 3600 },
  { name: 'Oct', income: 8300, expenses: 4200, profit: 4100 },
  { name: 'Nov', income: 10200, expenses: 4400, profit: 5800 },
  { name: 'Dec', income: 12400, expenses: 4600, profit: 7800 },
];

const taxLiabilityData = [
  { name: 'Q1', value: 2200 },
  { name: 'Q2', value: 3400 },
  { name: 'Q3', value: 4100 },
  { name: 'Q4', value: 5600 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const FinancialInsightsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('year');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Financial Insights | Accountly";
    
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleExportData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Report Exported",
        description: "Your financial report has been downloaded.",
      });
      
      addNotification(
        "Report Exported",
        "Your financial report has been downloaded successfully.",
        "success"
      );
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getTimeRangeLabel = () => {
    const now = new Date();
    
    switch (timeRange) {
      case 'month':
        return format(now, 'MMMM yyyy');
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `Q${quarter} ${format(now, 'yyyy')}`;
      case 'year':
        return format(now, 'yyyy');
      default:
        return format(now, 'yyyy');
    }
  };

  const calculateMonthlyProfit = () => {
    let totalIncome = 0;
    let totalExpenses = 0;

    monthlyRevenueData.forEach(item => {
      totalIncome += item.value;
    });

    monthlyExpenseData.forEach(item => {
      totalExpenses += item.value;
    });

    return totalIncome - totalExpenses;
  };

  const calculateProfitMargin = () => {
    let totalIncome = 0;
    let totalExpenses = 0;

    monthlyRevenueData.forEach(item => {
      totalIncome += item.value;
    });

    monthlyExpenseData.forEach(item => {
      totalExpenses += item.value;
    });

    const profit = totalIncome - totalExpenses;
    return (profit / totalIncome) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Financial Insights</h1>
              <p className="text-muted-foreground">
                Detailed analysis of your financial data for {getTimeRangeLabel()}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
              
              <Button onClick={handleExportData} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(83500)}</div>
                <div className="flex items-center mt-1 text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+12.5% from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(42700)}</div>
                <div className="flex items-center mt-1 text-red-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+8.3% from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculateMonthlyProfit())}</div>
                <div className="flex items-center mt-1 text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+15.2% from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateProfitMargin().toFixed(1)}%</div>
                <div className="flex items-center mt-1 text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+2.1% from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="taxes">Taxes</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Cash Flow</CardTitle>
                    <CardDescription>Income vs. Expenses over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={cashflowData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, '']} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#82ca9d"
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            name="Income"
                          />
                          <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                            name="Expenses"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Distribution</CardTitle>
                    <CardDescription>Breakdown by category</CardDescription>
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
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${value}`, '']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Monthly Profit Analysis</CardTitle>
                    <CardDescription>Net profit trend over the year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={cashflowData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, '']} />
                          <Legend />
                          <Bar dataKey="profit" name="Profit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Revenue Tab Content */}
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Monthly revenue over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            name="Revenue"
                            stroke="#3B82F6"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Revenue Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Service Fees</span>
                        <span className="font-medium">{formatCurrency(36200)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Product Sales</span>
                        <span className="font-medium">{formatCurrency(28300)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '35%' }} />
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Consultations</span>
                        <span className="font-medium">{formatCurrency(12000)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '15%' }} />
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Subscriptions</span>
                        <span className="font-medium">{formatCurrency(7000)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '8.5%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Acme Corporation</span>
                        </div>
                        <span className="font-medium">{formatCurrency(18500)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Stark Industries</span>
                        </div>
                        <span className="font-medium">{formatCurrency(15200)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Wayne Enterprises</span>
                        </div>
                        <span className="font-medium">{formatCurrency(12800)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Oscorp</span>
                        </div>
                        <span className="font-medium">{formatCurrency(9700)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Other Clients</span>
                        </div>
                        <span className="font-medium">{formatCurrency(27300)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Expenses Tab Content */}
            <TabsContent value="expenses">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Expense Trends</CardTitle>
                    <CardDescription>Monthly expenses over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyExpenseData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                          <Legend />
                          <Bar
                            dataKey="value"
                            name="Expenses"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                    <CardDescription>Breakdown by type</CardDescription>
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
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${value}`, '']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left font-medium">Description</th>
                            <th className="h-10 px-4 text-left font-medium">Category</th>
                            <th className="h-10 px-4 text-left font-medium">Date</th>
                            <th className="h-10 px-4 text-right font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">Office Rent</td>
                            <td className="p-4">Rent</td>
                            <td className="p-4">Jun 1, 2023</td>
                            <td className="p-4 text-right">{formatCurrency(2500)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Software Subscriptions</td>
                            <td className="p-4">Tools</td>
                            <td className="p-4">Jun 3, 2023</td>
                            <td className="p-4 text-right">{formatCurrency(350)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Employee Payroll</td>
                            <td className="p-4">Salaries</td>
                            <td className="p-4">Jun 5, 2023</td>
                            <td className="p-4 text-right">{formatCurrency(8500)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Marketing Campaign</td>
                            <td className="p-4">Marketing</td>
                            <td className="p-4">Jun 8, 2023</td>
                            <td className="p-4 text-right">{formatCurrency(1200)}</td>
                          </tr>
                          <tr>
                            <td className="p-4">Utilities</td>
                            <td className="p-4">Utilities</td>
                            <td className="p-4">Jun 10, 2023</td>
                            <td className="p-4 text-right">{formatCurrency(450)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Taxes Tab Content */}
            <TabsContent value="taxes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Estimated Tax Liability</CardTitle>
                    <CardDescription>Quarterly tax estimates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={taxLiabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, 'Tax Liability']} />
                          <Legend />
                          <Bar
                            dataKey="value"
                            name="Tax Liability"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-red-500 h-4 w-4" />
                          <div>
                            <div className="font-medium">Quarterly Estimated Tax</div>
                            <div className="text-sm text-muted-foreground">Due in 15 days</div>
                          </div>
                        </div>
                        <div className="font-medium">{formatCurrency(3400)}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-amber-500 h-4 w-4" />
                          <div>
                            <div className="font-medium">Sales Tax Filing</div>
                            <div className="text-sm text-muted-foreground">Due in 22 days</div>
                          </div>
                        </div>
                        <div className="font-medium">{formatCurrency(1250)}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-green-500 h-4 w-4" />
                          <div>
                            <div className="font-medium">Payroll Taxes</div>
                            <div className="text-sm text-muted-foreground">Due in 30 days</div>
                          </div>
                        </div>
                        <div className="font-medium">{formatCurrency(1850)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Deductions</CardTitle>
                    <CardDescription>Potential deductions for tax year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <span>Business Equipment</span>
                        <span>{formatCurrency(12500)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Office Expenses</span>
                        <span>{formatCurrency(3200)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Professional Development</span>
                        <span>{formatCurrency(2400)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Travel Expenses</span>
                        <span>{formatCurrency(4500)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Insurance Premiums</span>
                        <span>{formatCurrency(3600)}</span>
                      </li>
                      <li className="flex items-center justify-between font-medium">
                        <span>Total Deductions</span>
                        <span>{formatCurrency(26200)}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Financial Health Score */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Financial Health Score</CardTitle>
              <CardDescription>Based on your financial data and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <div className="text-4xl font-bold">82/100</div>
                  <p className="text-green-500 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Up 3 points from last month</span>
                  </p>
                </div>
                
                <div className="w-full md:max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                  <div 
                    className="bg-green-500 h-6 rounded-full text-xs flex items-center justify-center text-white" 
                    style={{ width: '82%' }}
                  >
                    82%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="border p-4 rounded-lg">
                  <div className="font-medium">Debt-to-Income</div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Ratio:</span>
                    <span className="font-medium text-green-500">18%</span>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="font-medium">Cash Flow</div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-500">Healthy</span>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="font-medium">Savings Rate</div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Monthly:</span>
                    <span className="font-medium text-amber-500">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-b pb-4">
                  <div className="font-medium mb-1">Increase your emergency fund</div>
                  <p className="text-sm text-muted-foreground">
                    Your current savings can cover about 3 months of expenses. Consider increasing this to 6 months for better financial security.
                  </p>
                </li>
                <li className="border-b pb-4">
                  <div className="font-medium mb-1">Review your subscription expenses</div>
                  <p className="text-sm text-muted-foreground">
                    You're spending $350/month on software subscriptions. Consider reviewing these services to identify potential savings.
                  </p>
                </li>
                <li>
                  <div className="font-medium mb-1">Consider tax-advantaged investments</div>
                  <p className="text-sm text-muted-foreground">
                    Based on your income level, you could benefit from additional tax-advantaged investments. Schedule a consultation with a tax advisor.
                  </p>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule Financial Review</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FinancialInsightsDashboard;
