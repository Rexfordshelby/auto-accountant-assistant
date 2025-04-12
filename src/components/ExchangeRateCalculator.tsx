
import React, { useState, useEffect } from 'react';
import { useCurrency, availableCurrencies, Currency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

const ExchangeRateCalculator: React.FC = () => {
  const { convertAmount } = useCurrency();
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<Currency>(availableCurrencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(availableCurrencies[1]);
  const [result, setResult] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    calculateExchange();
  }, [fromCurrency, toCurrency, amount]);

  const calculateExchange = () => {
    const numAmount = parseFloat(amount) || 0;
    const converted = convertAmount(numAmount, fromCurrency.code, toCurrency.code);
    setResult(converted);
    setLastUpdated(new Date());
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Exchange Calculator</CardTitle>
        <CardDescription>Convert between currencies using latest exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Amount to convert"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
              <SelectTrigger id="from-currency">
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
              className="rounded-full"
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
              <SelectTrigger id="to-currency">
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
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <p>Rates last updated: {formatDateTime(lastUpdated)}</p>
          <Button variant="ghost" size="sm" className="h-8" onClick={calculateExchange}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExchangeRateCalculator;
