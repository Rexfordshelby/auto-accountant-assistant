
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Exchange rate relative to USD
  flag?: string; // Optional ISO country code for flag display
  region?: string; // Geographic region
  taxSystem?: { // Basic tax system information
    name: string;
    rate?: number;
    description?: string;
  };
}

export const availableCurrencies: Currency[] = [
  { 
    code: 'USD', 
    name: 'US Dollar', 
    symbol: '$', 
    rate: 1, 
    flag: 'us',
    region: 'North America',
    taxSystem: {
      name: 'Sales Tax',
      rate: 0.0725,
      description: 'Varies by state and locality'
    }
  },
  { 
    code: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    rate: 0.92, 
    flag: 'eu',
    region: 'Europe',
    taxSystem: {
      name: 'VAT',
      rate: 0.21,
      description: 'Varies by country from 17% to 27%'
    }
  },
  { 
    code: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    rate: 0.79, 
    flag: 'gb',
    region: 'Europe',
    taxSystem: {
      name: 'VAT',
      rate: 0.20,
      description: 'Standard rate for most goods and services'
    }
  },
  { 
    code: 'JPY', 
    name: 'Japanese Yen', 
    symbol: '¥', 
    rate: 153.5, 
    flag: 'jp',
    region: 'Asia',
    taxSystem: {
      name: 'Consumption Tax',
      rate: 0.10,
      description: 'Applied to most goods and services'
    }
  },
  { 
    code: 'CAD', 
    name: 'Canadian Dollar', 
    symbol: 'C$', 
    rate: 1.37, 
    flag: 'ca',
    region: 'North America',
    taxSystem: {
      name: 'GST/HST',
      rate: 0.05,
      description: 'Additional PST in some provinces'
    }
  },
  { 
    code: 'AUD', 
    name: 'Australian Dollar', 
    symbol: 'A$', 
    rate: 1.52, 
    flag: 'au',
    region: 'Oceania',
    taxSystem: {
      name: 'GST',
      rate: 0.10,
      description: 'Goods and Services Tax'
    }
  },
  { 
    code: 'INR', 
    name: 'Indian Rupee', 
    symbol: '₹', 
    rate: 83.2, 
    flag: 'in',
    region: 'Asia',
    taxSystem: {
      name: 'GST',
      rate: 0.18,
      description: 'Rates vary from 5% to 28% for different categories'
    }
  },
  { 
    code: 'CNY', 
    name: 'Chinese Yuan', 
    symbol: '¥', 
    rate: 7.24, 
    flag: 'cn',
    region: 'Asia',
    taxSystem: {
      name: 'VAT',
      rate: 0.13,
      description: 'Standard rate for most goods'
    }
  },
  { 
    code: 'BRL', 
    name: 'Brazilian Real', 
    symbol: 'R$', 
    rate: 5.14, 
    flag: 'br',
    region: 'South America',
    taxSystem: {
      name: 'ICMS',
      rate: 0.17,
      description: 'Varies by state and product'
    }
  },
  { 
    code: 'CHF', 
    name: 'Swiss Franc', 
    symbol: 'CHF', 
    rate: 0.91, 
    flag: 'ch',
    region: 'Europe',
    taxSystem: {
      name: 'VAT',
      rate: 0.077,
      description: 'Standard rate for most goods and services'
    }
  },
  { 
    code: 'NZD', 
    name: 'New Zealand Dollar', 
    symbol: 'NZ$', 
    rate: 1.64, 
    flag: 'nz',
    region: 'Oceania',
    taxSystem: {
      name: 'GST',
      rate: 0.15,
      description: 'Goods and Services Tax'
    }
  },
  { 
    code: 'SGD', 
    name: 'Singapore Dollar', 
    symbol: 'S$', 
    rate: 1.35, 
    flag: 'sg',
    region: 'Asia',
    taxSystem: {
      name: 'GST',
      rate: 0.08,
      description: 'Standard rate for most goods and services'
    }
  },
  { 
    code: 'ZAR', 
    name: 'South African Rand', 
    symbol: 'R', 
    rate: 18.65, 
    flag: 'za',
    region: 'Africa',
    taxSystem: {
      name: 'VAT',
      rate: 0.15,
      description: 'Standard rate for most goods and services'
    }
  },
  { 
    code: 'MXN', 
    name: 'Mexican Peso', 
    symbol: 'Mex$', 
    rate: 17.25, 
    flag: 'mx',
    region: 'North America',
    taxSystem: {
      name: 'IVA',
      rate: 0.16,
      description: 'Standard rate for most goods and services'
    }
  },
  { 
    code: 'AED', 
    name: 'UAE Dirham', 
    symbol: 'د.إ', 
    rate: 3.67, 
    flag: 'ae',
    region: 'Middle East',
    taxSystem: {
      name: 'VAT',
      rate: 0.05,
      description: 'Introduced in 2018'
    }
  }
];

// Tax systems by region for more detailed tax calculation info
export const taxSystems = {
  "North America": {
    "US": {
      name: "Federal Income Tax",
      brackets: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 9875 },
        { rate: 0.22, threshold: 40125 },
        { rate: 0.24, threshold: 85525 },
        { rate: 0.32, threshold: 163300 },
        { rate: 0.35, threshold: 207350 },
        { rate: 0.37, threshold: 518400 }
      ],
      corporateRate: 0.21,
      salesTax: "Varies by state and locale"
    },
    "Canada": {
      name: "Progressive Income Tax",
      brackets: [
        { rate: 0.15, threshold: 0 },
        { rate: 0.205, threshold: 49020 },
        { rate: 0.26, threshold: 98040 },
        { rate: 0.29, threshold: 151978 },
        { rate: 0.33, threshold: 216511 }
      ],
      corporateRate: 0.15,
      gstHst: 0.05
    }
  },
  "Europe": {
    "EU": {
      name: "Value Added Tax (VAT)",
      standardRates: {
        "Germany": 0.19,
        "France": 0.20,
        "Italy": 0.22,
        "Spain": 0.21,
        "Netherlands": 0.21
      },
      corporateTaxRates: {
        "Germany": 0.30,
        "France": 0.28,
        "Italy": 0.24,
        "Spain": 0.25,
        "Netherlands": 0.25
      }
    },
    "UK": {
      name: "Value Added Tax (VAT)",
      standardRate: 0.20,
      corporateRate: 0.19
    }
  },
  "Asia": {
    "India": {
      name: "Goods and Services Tax (GST)",
      rates: [0.05, 0.12, 0.18, 0.28],
      corporateRate: 0.30
    },
    "China": {
      name: "Value Added Tax",
      standardRate: 0.13,
      corporateRate: 0.25
    },
    "Japan": {
      name: "Consumption Tax",
      standardRate: 0.10,
      corporateRate: 0.23
    }
  }
};

// Mock historical exchange rate data for charts/trends
export const mockHistoricalRates = {
  'EUR': [
    { date: '2025-01-01', rate: 0.88 },
    { date: '2025-01-15', rate: 0.885 },
    { date: '2025-02-01', rate: 0.89 },
    { date: '2025-02-15', rate: 0.895 },
    { date: '2025-03-01', rate: 0.90 },
    { date: '2025-03-15', rate: 0.91 },
    { date: '2025-04-01', rate: 0.92 },
    { date: '2025-04-15', rate: 0.915 },
    { date: '2025-04-30', rate: 0.92 }
  ],
  'GBP': [
    { date: '2025-01-01', rate: 0.77 },
    { date: '2025-01-15', rate: 0.775 },
    { date: '2025-02-01', rate: 0.77 },
    { date: '2025-02-15', rate: 0.775 },
    { date: '2025-03-01', rate: 0.78 },
    { date: '2025-03-15', rate: 0.785 },
    { date: '2025-04-01', rate: 0.79 },
    { date: '2025-04-15', rate: 0.785 },
    { date: '2025-04-30', rate: 0.79 }
  ],
  'JPY': [
    { date: '2025-01-01', rate: 152.4 },
    { date: '2025-01-15', rate: 152.6 },
    { date: '2025-02-01', rate: 152.9 },
    { date: '2025-02-15', rate: 153.0 },
    { date: '2025-03-01', rate: 153.2 },
    { date: '2025-03-15', rate: 153.3 },
    { date: '2025-04-01', rate: 153.5 },
    { date: '2025-04-15', rate: 153.4 },
    { date: '2025-04-30', rate: 153.5 }
  ],
  'INR': [
    { date: '2025-01-01', rate: 82.4 },
    { date: '2025-01-15', rate: 82.6 },
    { date: '2025-02-01', rate: 82.8 },
    { date: '2025-02-15', rate: 82.9 },
    { date: '2025-03-01', rate: 83.0 },
    { date: '2025-03-15', rate: 83.1 },
    { date: '2025-04-01', rate: 83.2 },
    { date: '2025-04-15', rate: 83.2 },
    { date: '2025-04-30', rate: 83.2 }
  ]
};

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currencyCode: string) => void;
  convertAmount: (amount: number, fromCurrency?: string, toCurrency?: string) => number;
  formatAmount: (amount: number, options?: Intl.NumberFormatOptions) => string;
  getHistoricalRates: (currencyCode: string) => any[];
  getTaxSystem: (currencyCode: string) => any;
  getRegionalCurrencies: (region: string) => Currency[];
  lastUpdated: Date;
  getAllCurrencies: () => Currency[];
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

  // Get tax system information for a specific currency
  const getTaxSystem = (currencyCode: string) => {
    const currency = availableCurrencies.find(c => c.code === currencyCode);
    if (currency?.taxSystem) {
      return currency.taxSystem;
    }

    // Default tax info if not found
    return { name: "Tax System", rate: 0.0, description: "Information not available" };
  };

  // Get currencies by region
  const getRegionalCurrencies = (region: string) => {
    return availableCurrencies.filter(c => c.region === region);
  };

  // Get all available currencies
  const getAllCurrencies = () => {
    return [...availableCurrencies];
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      setCurrency, 
      convertAmount, 
      formatAmount,
      getHistoricalRates,
      getTaxSystem,
      getRegionalCurrencies,
      getAllCurrencies,
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
