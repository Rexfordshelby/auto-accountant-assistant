
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Exchange rate relative to USD
  flag?: string; // Optional ISO country code for flag display
}

export const availableCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1, flag: 'us' },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, flag: 'eu' },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, flag: 'gb' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 153.5, flag: 'jp' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.37, flag: 'ca' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52, flag: 'au' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.2, flag: 'in' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24, flag: 'cn' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.14, flag: 'br' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.91, flag: 'ch' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.64, flag: 'nz' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.35, flag: 'sg' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.83, flag: 'hk' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 10.59, flag: 'se' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 10.72, flag: 'no' },
];

// Mock historical exchange rate data for charts/trends
export const mockHistoricalRates = {
  'EUR': [
    { date: '2025-01-01', rate: 0.88 },
    { date: '2025-02-01', rate: 0.89 },
    { date: '2025-03-01', rate: 0.90 },
    { date: '2025-04-01', rate: 0.92 },
  ],
  'GBP': [
    { date: '2025-01-01', rate: 0.77 },
    { date: '2025-02-01', rate: 0.77 },
    { date: '2025-03-01', rate: 0.78 },
    { date: '2025-04-01', rate: 0.79 },
  ],
  'JPY': [
    { date: '2025-01-01', rate: 152.4 },
    { date: '2025-02-01', rate: 152.9 },
    { date: '2025-03-01', rate: 153.2 },
    { date: '2025-04-01', rate: 153.5 },
  ],
};

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currencyCode: string) => void;
  convertAmount: (amount: number, fromCurrency?: string, toCurrency?: string) => number;
  formatAmount: (amount: number, options?: Intl.NumberFormatOptions) => string;
  getHistoricalRates: (currencyCode: string) => any[];
  lastUpdated: Date;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(availableCurrencies[0]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Load saved currency preference from localStorage
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency) {
      const currency = availableCurrencies.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }

    // In a real app, we would fetch real exchange rates here
    // For now, we're using mock data
    const mockFetchRates = () => {
      console.log("Mock fetching latest currency rates");
      setLastUpdated(new Date());
    };

    // Update rates every hour for simulation
    mockFetchRates();
    const interval = setInterval(mockFetchRates, 3600000);

    return () => clearInterval(interval);
  }, []);

  const setCurrency = (currencyCode: string) => {
    const currency = availableCurrencies.find(c => c.code === currencyCode);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('preferredCurrency', currencyCode);
    }
  };

  const convertAmount = (amount: number, fromCurrency?: string, toCurrency?: string) => {
    const from = fromCurrency 
      ? availableCurrencies.find(c => c.code === fromCurrency)?.rate || 1 
      : 1;
    
    const to = toCurrency 
      ? availableCurrencies.find(c => c.code === toCurrency)?.rate || currentCurrency.rate 
      : currentCurrency.rate;
    
    // Convert to USD first (if not already), then to target currency
    return (amount / from) * to;
  };

  const formatAmount = (amount: number, options?: Intl.NumberFormatOptions) => {
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    };

    return new Intl.NumberFormat('en-US', defaultOptions).format(amount);
  };

  // Return mock historical data for charts
  const getHistoricalRates = (currencyCode: string) => {
    return mockHistoricalRates[currencyCode] || [];
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      setCurrency, 
      convertAmount, 
      formatAmount,
      getHistoricalRates,
      lastUpdated
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
