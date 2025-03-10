
import React, { useRef, useEffect } from 'react';
import { LineChart, BarChart, PieChart } from 'lucide-react';
import TransactionsTable from './TransactionsTable';
import { useToast } from "@/components/ui/toast";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const revenueData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 4000 },
  { name: 'May', amount: 7000 },
  { name: 'Jun', amount: 6000 },
  { name: 'Jul', amount: 8000 },
  { name: 'Aug', amount: 9000 },
  { name: 'Sep', amount: 7000 },
  { name: 'Oct', amount: 8000 },
  { name: 'Nov', amount: 10000 },
  { name: 'Dec', amount: 12000 },
];

const expenseData = [
  { name: 'Jan', amount: 2500 },
  { name: 'Feb', amount: 2700 },
  { name: 'Mar', amount: 3000 },
  { name: 'Apr', amount: 2800 },
  { name: 'May', amount: 3200 },
  { name: 'Jun', amount: 3500 },
  { name: 'Jul', amount: 3800 },
  { name: 'Aug', amount: 4000 },
  { name: 'Sep', amount: 3700 },
  { name: 'Oct', amount: 4100 },
  { name: 'Nov', amount: 4300 },
  { name: 'Dec', amount: 4500 },
];

const categoryData = [
  { name: 'Utilities', value: 1800 },
  { name: 'Rent', value: 5000 },
  { name: 'Salaries', value: 12000 },
  { name: 'Marketing', value: 2400 },
  { name: 'Equipment', value: 3200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Animation on scroll logic
  useEffect(() => {
    const animateOnScroll = () => {
      if (!sectionRef.current) return;
      
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    // Animate on load for elements above the fold
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const handleExport = () => {
    toast({
      title: "Reports exported",
      description: "Your financial reports have been exported successfully.",
      duration: 3000,
    });
  };

  return (
    <section id="dashboard" className="py-24 px-6 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll visible">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Dashboard
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Smart financial insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a real-time view of your finances with interactive charts and intelligent reporting.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card p-6 rounded-xl shadow-sm animate-on-scroll">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                <LineChart />
              </div>
              <h3 className="text-lg font-medium">Revenue Tracker</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="amount" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-sm animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                <BarChart />
              </div>
              <h3 className="text-lg font-medium">Expense Analysis</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={expenseData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                  <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl shadow-sm animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                <PieChart />
              </div>
              <h3 className="text-lg font-medium">Expense Categories</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
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
                  <Legend />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl shadow-sm mb-8 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <button 
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors text-sm"
              onClick={handleExport}
            >
              Export Reports
            </button>
          </div>
          <TransactionsTable />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
