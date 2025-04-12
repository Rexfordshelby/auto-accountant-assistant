
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExchangeRateCalculator from '@/components/ExchangeRateCalculator';
import { useCurrency, availableCurrencies } from '@/contexts/CurrencyContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, ArrowRightLeft, TrendingUp, Clock } from 'lucide-react';

const CurrencyExchange = () => {
  useEffect(() => {
    document.title = "Currency Exchange | Accountly";
  }, []);

  const { convertAmount } = useCurrency();

  // Generate sample rate table data
  const generateRateTable = () => {
    const baseRates = [
      { from: 'USD', to: 'EUR', rate: 0.92 },
      { from: 'USD', to: 'GBP', rate: 0.79 },
      { from: 'USD', to: 'JPY', rate: 153.5 },
      { from: 'EUR', to: 'USD', rate: 1.09 },
      { from: 'EUR', to: 'GBP', rate: 0.86 },
      { from: 'GBP', to: 'USD', rate: 1.27 },
      { from: 'GBP', to: 'EUR', rate: 1.16 },
      { from: 'JPY', to: 'USD', rate: 0.0065 },
    ];

    return baseRates;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Currency Exchange Tools</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Convert between currencies, check exchange rates, and track historical currency performance.
            </p>
          </div>
          
          <Tabs defaultValue="calculator" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Currency Calculator
              </TabsTrigger>
              <TabsTrigger value="rates">
                <BadgeDollarSign className="h-4 w-4 mr-2" />
                Exchange Rates
              </TabsTrigger>
              <TabsTrigger value="history">
                <TrendingUp className="h-4 w-4 mr-2" />
                Historical Rates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="pt-6">
              <ExchangeRateCalculator />
            </TabsContent>
            
            <TabsContent value="rates" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Exchange Rates</CardTitle>
                  <CardDescription>
                    Current rates for major world currencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Currency Pair</th>
                          <th className="px-4 py-2 text-left">Exchange Rate</th>
                          <th className="px-4 py-2 text-left">Inverse Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateRateTable().map((rate, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="px-4 py-3">
                              {rate.from} / {rate.to}
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {rate.rate.toFixed(4)}
                            </td>
                            <td className="px-4 py-3">
                              {(1 / rate.rate).toFixed(4)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Exchange Rates</CardTitle>
                  <CardDescription>
                    Track the performance of currencies over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center p-10">
                  <Clock className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Historical Data Coming Soon</h3>
                  <p className="text-gray-500">
                    We're working on adding historical exchange rate data and charts.
                    This feature will be available in an upcoming update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our currency exchange tools use near real-time exchange rates to provide accurate conversions between all major global currencies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Multi-Currency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All features in Accountly now support multiple currencies, making it perfect for international businesses and travelers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Seamless Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Currency preferences are automatically applied across all Accountly tools, from tax calculators to financial reports.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>
              Currency exchange rates are for informational purposes only. While we strive for accuracy, 
              please verify the most current rates before conducting financial transactions.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CurrencyExchange;
