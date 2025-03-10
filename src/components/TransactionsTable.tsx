
import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Search, 
  Filter, 
  MoreHorizontal,
  ShoppingBag,
  Home,
  Briefcase,
  Car,
  Coffee,
  Utensils
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Shopping': <ShoppingBag size={16} />,
  'Housing': <Home size={16} />,
  'Business': <Briefcase size={16} />,
  'Transport': <Car size={16} />,
  'Food': <Utensils size={16} />,
  'Coffee': <Coffee size={16} />,
};

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2023-08-01',
    description: 'Client Payment',
    category: 'Business',
    amount: 2500,
    type: 'income'
  },
  {
    id: '2',
    date: '2023-08-02',
    description: 'Office Rent',
    category: 'Housing',
    amount: 1200,
    type: 'expense'
  },
  {
    id: '3',
    date: '2023-08-03',
    description: 'Software Subscription',
    category: 'Business',
    amount: 49.99,
    type: 'expense'
  },
  {
    id: '4',
    date: '2023-08-05',
    description: 'Consulting Fee',
    category: 'Business',
    amount: 1800,
    type: 'income'
  },
  {
    id: '5',
    date: '2023-08-08',
    description: 'Business Dinner',
    category: 'Food',
    amount: 120.50,
    type: 'expense'
  },
  {
    id: '6',
    date: '2023-08-10',
    description: 'Coffee with Client',
    category: 'Coffee',
    amount: 18.75,
    type: 'expense'
  },
  {
    id: '7',
    date: '2023-08-12',
    description: 'New Laptop',
    category: 'Shopping',
    amount: 1599.99,
    type: 'expense'
  },
  {
    id: '8',
    date: '2023-08-15',
    description: 'Uber Ride',
    category: 'Transport',
    amount: 24.50,
    type: 'expense'
  }
];

const TransactionsTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-medium">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600">{transaction.date}</td>
                <td className="px-4 py-3 text-sm font-medium">{transaction.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      {categoryIcons[transaction.category] || '?'}
                    </div>
                    <span className="text-sm">{transaction.category}</span>
                  </div>
                </td>
                <td className={cn(
                  "px-4 py-3 text-sm font-medium text-right whitespace-nowrap",
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                )}>
                  <div className="flex items-center justify-end gap-1">
                    {transaction.type === 'income' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100 flex justify-center">
        <Button variant="outline" size="sm">View All Transactions</Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
