
import React from 'react';
import AIFinancialAssistant from './AIFinancialAssistant';
import IntegrationsHub from './IntegrationsHub';
import CollaborativeWorkspace from './CollaborativeWorkspace';
import TransactionsTable from './TransactionsTable';
import ExchangeRateCalculator from './ExchangeRateCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { BarChart4, Layers, FileSpreadsheet, Zap, Sparkles } from 'lucide-react';

const EnhancedDashboard = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 md:px-8">
      <motion.div 
        className="max-w-7xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Financial Command Center</h1>
            <p className="text-gray-600 mt-1">Your all-in-one solution for financial management</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
              <Sparkles size={14} />
              <span>AI-Powered</span>
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <Zap size={14} />
              <span>Real-time</span>
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart4 size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1">
              <FileSpreadsheet size={16} />
              Documents
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-1">
              <Layers size={16} />
              Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants}>
                <TransactionsTable />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AIFinancialAssistant />
              </motion.div>
              
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <CollaborativeWorkspace />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Health</CardTitle>
                    <CardDescription>Key metrics at a glance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-gray-500">Cash Flow</p>
                          <h3 className="text-2xl font-bold text-green-600">+$12,450</h3>
                          <p className="text-xs text-gray-500 mt-1">+8.2% from last month</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-sm text-gray-500">Expenses</p>
                          <h3 className="text-2xl font-bold text-red-600">$8,270</h3>
                          <p className="text-xs text-gray-500 mt-1">-3.1% from last month</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Tax Efficiency Score</p>
                        <div className="flex items-center justify-between mt-1">
                          <h3 className="text-xl font-bold">82/100</h3>
                          <Badge className="bg-green-100 text-green-800 border-0">Good</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">5 potential optimizations available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ExchangeRateCalculator />
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Repository</CardTitle>
                  <CardDescription>All your financial documents in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10 text-gray-500">
                    Document management features are currently being enhanced. Check back soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="grid grid-cols-1 gap-6">
              <IntegrationsHub />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboard;
