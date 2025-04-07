
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, TrendingUp, AlertCircle, DollarSign, Calculator } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SubscriptionGuard from '@/components/SubscriptionGuard';

const FinancialProjections = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { subscription } = useSubscription();
  
  const [startingCapital, setStartingCapital] = useState<number>(10000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(5000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(3000);
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [projectionMonths, setProjectionMonths] = useState<number>(12);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = "Financial Projections | Accountly";
    generateProjection();
  }, [startingCapital, monthlyRevenue, monthlyExpenses, growthRate, projectionMonths]);
  
  const generateProjection = () => {
    const data = [];
    let balance = startingCapital;
    let currentRevenue = monthlyRevenue;
    
    for (let i = 0; i < projectionMonths; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      const monthName = month.toLocaleString('default', { month: 'short' });
      const year = month.getFullYear();
      
      // Apply monthly growth rate
      if (i > 0) {
        currentRevenue = currentRevenue * (1 + (growthRate / 100));
      }
      
      const profit = currentRevenue - monthlyExpenses;
      balance += profit;
      
      data.push({
        name: `${monthName} ${year}`,
        revenue: parseFloat(currentRevenue.toFixed(2)),
        expenses: monthlyExpenses,
        profit: parseFloat(profit.toFixed(2)),
        balance: parseFloat(balance.toFixed(2))
      });
    }
    
    setProjectionData(data);
  };
  
  const handleDownloadCSV = () => {
    if (subscription?.tier !== 'professional' && subscription?.tier !== 'enterprise') {
      toast({
        title: "Premium Feature",
        description: "Please upgrade to Professional or Enterprise plan to export projections",
        variant: "destructive",
      });
      return;
    }
    
    // Generate CSV
    let csvContent = "Month,Revenue,Expenses,Profit,Balance\n";
    projectionData.forEach(row => {
      csvContent += `${row.name},${row.revenue},${row.expenses},${row.profit},${row.balance}\n`;
    });
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'financial_projection.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Projection Downloaded",
      description: "Your financial projection has been downloaded as a CSV file.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Financial Projections</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create accurate financial forecasts to plan for your business's future
            </p>
          </div>

          <SubscriptionGuard requiredTier="professional">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="animate-fade-up" style={{animationDelay: '100ms'}}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-500" />
                      Input Parameters
                    </CardTitle>
                    <CardDescription>
                      Adjust these values to customize your financial projection
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="startingCapital">Starting Capital ($)</Label>
                      <Input
                        id="startingCapital"
                        type="number"
                        min="0"
                        value={startingCapital}
                        onChange={(e) => setStartingCapital(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
                      <Input
                        id="monthlyRevenue"
                        type="number"
                        min="0"
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        min="0"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="growthRate">Monthly Growth Rate (%)</Label>
                      <Input
                        id="growthRate"
                        type="number"
                        min="-20"
                        max="20"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectionMonths">Projection Period (Months)</Label>
                      <Input
                        id="projectionMonths"
                        type="number"
                        min="3"
                        max="60"
                        value={projectionMonths}
                        onChange={(e) => setProjectionMonths(Number(e.target.value))}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full flex items-center gap-2"
                      onClick={handleDownloadCSV}
                    >
                      <Download className="h-4 w-4" />
                      Export Projection
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6 animate-fade-up" style={{animationDelay: '200ms'}}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      Financial Insights
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 border border-green-100 rounded-md p-4">
                      <h3 className="font-medium text-green-800 mb-2">Projected Growth</h3>
                      <p className="text-sm text-green-700">
                        At {growthRate}% monthly growth rate, your revenue will 
                        {growthRate > 0 ? ' increase by ' : ' decrease by '}
                        {Math.abs(Math.pow(1 + growthRate / 100, projectionMonths) * 100 - 100).toFixed(1)}% 
                        over {projectionMonths} months.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Cash Flow</h3>
                      <p className="text-sm text-blue-700">
                        Your projected ending balance after {projectionMonths} months is 
                        ${projectionData.length > 0 ? projectionData[projectionData.length - 1].balance.toLocaleString() : '0'}.
                      </p>
                    </div>
                    
                    {monthlyRevenue < monthlyExpenses && (
                      <div className="bg-amber-50 border border-amber-100 rounded-md p-4">
                        <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          Warning
                        </h3>
                        <p className="text-sm text-amber-700">
                          Your monthly expenses exceed your revenue. Consider reducing costs or 
                          increasing revenue to maintain positive cash flow.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 animate-fade-up" style={{animationDelay: '300ms'}}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Financial Projections
                    </CardTitle>
                    <CardDescription>
                      Visualize your financial future over the next {projectionMonths} months
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Tabs defaultValue="balance">
                      <TabsList className="mb-6">
                        <TabsTrigger value="balance">Balance</TabsTrigger>
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                        <TabsTrigger value="profit">Profit</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="balance" className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={projectionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, 'Balance']} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="balance" 
                              stroke="#3b82f6" 
                              activeDot={{ r: 8 }} 
                              name="Balance"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      
                      <TabsContent value="revenue" className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={projectionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [`$${value}`, '']} 
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#10b981" 
                              name="Revenue" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="expenses" 
                              stroke="#ef4444" 
                              name="Expenses" 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      
                      <TabsContent value="profit" className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={projectionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, 'Monthly Profit']} />
                            <Legend />
                            <Bar dataKey="profit" fill="#8884d8" name="Monthly Profit" />
                          </BarChart>
                        </ResponsiveContainer>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SubscriptionGuard>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FinancialProjections;
