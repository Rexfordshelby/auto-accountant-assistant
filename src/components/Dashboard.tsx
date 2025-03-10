
import React, { useRef, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import TransactionsTable from './TransactionsTable';
import AnimatedNumber from './AnimatedNumbers';
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 3800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 4890, expenses: 2800 },
  { name: 'Jun', revenue: 3390, expenses: 2800 },
  { name: 'Jul', revenue: 4490, expenses: 3300 },
  { name: 'Aug', revenue: 6000, expenses: 4300 }
];

const expenseData = [
  { name: 'Rent', value: 1200, color: '#8884d8' },
  { name: 'Utilities', value: 300, color: '#82ca9d' },
  { name: 'Software', value: 400, color: '#ffc658' },
  { name: 'Marketing', value: 800, color: '#ff8042' },
  { name: 'Salaries', value: 3000, color: '#0088fe' }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const Dashboard = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated elements
    const elements = dashboardRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto" ref={dashboardRef}>
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
            Dashboard
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Visualize your finances</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a clear picture of your financial health with our intuitive dashboard.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-gray-200 shadow-sm mb-8 animate-on-scroll">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Dashboard</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Last 30 Days</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <h4 className="text-2xl font-semibold">
                    $<AnimatedNumber value={28950} formatter={val => val.toLocaleString()} />
                  </h4>
                </div>
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Wallet size={20} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="flex items-center text-green-600 font-medium">
                  <ArrowUpRight size={16} />
                  12.5%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                  <h4 className="text-2xl font-semibold">
                    $<AnimatedNumber value={18340} formatter={val => val.toLocaleString()} />
                  </h4>
                </div>
                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                  <CreditCard size={20} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="flex items-center text-red-600 font-medium">
                  <ArrowDownRight size={16} />
                  5.2%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Net Profit</p>
                  <h4 className="text-2xl font-semibold">
                    $<AnimatedNumber value={10610} formatter={val => val.toLocaleString()} />
                  </h4>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <PlusCircle size={20} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="flex items-center text-green-600 font-medium">
                  <ArrowUpRight size={16} />
                  8.3%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Profit Margin</p>
                  <h4 className="text-2xl font-semibold">
                    <AnimatedNumber value={36.7} suffix="%" formatter={val => val.toFixed(1)} />
                  </h4>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <AreaChart size={20} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="flex items-center text-green-600 font-medium">
                  <ArrowUpRight size={16} />
                  2.1%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-medium mb-4">Revenue vs Expenses</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-medium mb-4">Expense Breakdown</h4>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {expenseData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <TransactionsTable />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
