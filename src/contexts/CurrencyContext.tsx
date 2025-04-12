
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Exchange rate relative to USD
}

export const availableCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 153.5 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.37 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.14 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.91 },
];

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currencyCode: string) => void;
  convertAmount: (amount: number, fromCurrency?: string, toCurrency?: string) => number;
  formatAmount: (amount: number, options?: Intl.NumberFormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(availableCurrencies[0]);

  useEffect(() => {
    // Load saved currency preference from localStorage
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency) {
      const currency = availableCurrencies.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }
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

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency, convertAmount, formatAmount }}>
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
