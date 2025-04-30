
import React, { useState, useEffect } from 'react';
import { useCurrency, availableCurrencies, Currency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, RefreshCw, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const ExchangeRateCalculator: React.FC = () => {
  const { convertAmount, getHistoricalRates, lastUpdated } = useCurrency();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<Currency>(availableCurrencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(availableCurrencies[1]);
  const [result, setResult] = useState<number>(0);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    calculateExchange();
  }, [fromCurrency, toCurrency, amount]);
  
  useEffect(() => {
    // Get historical data when currencies change
    if (fromCurrency.code === 'USD') {
      const history = getHistoricalRates(toCurrency.code);
      if (history && history.length > 0) {
        setChartData(history);
      }
    }
  }, [fromCurrency, toCurrency]);

  const calculateExchange = () => {
    const numAmount = parseFloat(amount) || 0;
    const converted = convertAmount(numAmount, fromCurrency.code, toCurrency.code);
    setResult(converted);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    toast({
      title: "Currencies swapped",
      description: `Now converting from ${toCurrency.code} to ${fromCurrency.code}`,
    });
  };

  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const refreshRates = () => {
    calculateExchange();
    toast({
      title: "Exchange rates refreshed",
      description: "Using the latest available exchange rates.",
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-500" />
          <CardTitle>Currency Exchange Calculator</CardTitle>
        </div>
        <CardDescription>Convert between currencies using latest exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Amount to convert"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select
              value={fromCurrency.code}
              onValueChange={(code) => {
                const currency = availableCurrencies.find(c => c.code === code);
                if (currency) setFromCurrency(currency);
              }}
            >
              <SelectTrigger id="from-currency" className="bg-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {availableCurrencies.map((currency) => (
                  <SelectItem key={`from-${currency.code}`} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full hover:bg-blue-50"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span className="sr-only">Swap currencies</span>
            </Button>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="to-currency">To</Label>
            <Select
              value={toCurrency.code}
              onValueChange={(code) => {
                const currency = availableCurrencies.find(c => c.code === code);
                if (currency) setToCurrency(currency);
              }}
            >
              <SelectTrigger id="to-currency" className="bg-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {availableCurrencies.map((currency) => (
                  <SelectItem key={`to-${currency.code}`} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md border">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {parseFloat(amount).toLocaleString()} {fromCurrency.code} equals
            </p>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} {toCurrency.code}
            </p>
            <p className="text-sm text-gray-400">
              1 {fromCurrency.code} = {(toCurrency.rate / fromCurrency.rate).toFixed(4)} {toCurrency.code}
            </p>
          </div>
        </div>

        {showChart && fromCurrency.code === 'USD' && chartData.length > 0 && (
          <div className="mt-4 h-64 w-full">
            <h4 className="text-sm font-medium mb-2 text-gray-700">Historical Exchange Rate</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.substring(5)}
                />
                <YAxis 
                  domain={['dataMin - 0.01', 'dataMax + 0.01']}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} ${toCurrency.code}`, 'Rate']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={toggleChart}
          >
            {showChart ? 'Hide Chart' : 'Show Historical Chart'}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <p>Rates last updated: {formatDateTime(lastUpdated)}</p>
          <Button variant="ghost" size="sm" className="h-8" onClick={refreshRates}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExchangeRateCalculator;
