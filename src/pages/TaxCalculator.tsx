
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Download, HelpCircle, Globe, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface CountryTaxRules {
  name: string;
  code: string;
  currency: string;
  symbol: string;
  standardDeduction: {
    single: number;
    married: number;
  };
  brackets: {
    single: TaxBracket[];
    married: TaxBracket[];
  };
}

// Most up-to-date tax information for 2025 calculations
const COUNTRIES_TAX_RULES: CountryTaxRules[] = [
  {
    name: "United States",
    code: "us",
    currency: "USD",
    symbol: "$",
    standardDeduction: {
      single: 13850,
      married: 27700
    },
    brackets: {
      single: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11001, max: 44725, rate: 0.12 },
        { min: 44726, max: 95375, rate: 0.22 },
        { min: 95376, max: 182100, rate: 0.24 },
        { min: 182101, max: 231250, rate: 0.32 },
        { min: 231251, max: 578125, rate: 0.35 },
        { min: 578126, max: null, rate: 0.37 }
      ],
      married: [
        { min: 0, max: 22000, rate: 0.10 },
        { min: 22001, max: 89450, rate: 0.12 },
        { min: 89451, max: 190750, rate: 0.22 },
        { min: 190751, max: 364200, rate: 0.24 },
        { min: 364201, max: 462500, rate: 0.32 },
        { min: 462501, max: 693750, rate: 0.35 },
        { min: 693751, max: null, rate: 0.37 }
      ]
    }
  },
  {
    name: "United Kingdom",
    code: "uk",
    currency: "GBP",
    symbol: "£",
    standardDeduction: {
      single: 12570,
      married: 12570
    },
    brackets: {
      single: [
        { min: 0, max: 12570, rate: 0.00 },
        { min: 12571, max: 50270, rate: 0.20 },
        { min: 50271, max: 150000, rate: 0.40 },
        { min: 150001, max: null, rate: 0.45 }
      ],
      married: [
        { min: 0, max: 12570, rate: 0.00 },
        { min: 12571, max: 50270, rate: 0.20 },
        { min: 50271, max: 150000, rate: 0.40 },
        { min: 150001, max: null, rate: 0.45 }
      ]
    }
  },
  {
    name: "Canada",
    code: "ca",
    currency: "CAD",
    symbol: "$",
    standardDeduction: {
      single: 15000,
      married: 15000
    },
    brackets: {
      single: [
        { min: 0, max: 53359, rate: 0.15 },
        { min: 53360, max: 106717, rate: 0.205 },
        { min: 106718, max: 165430, rate: 0.26 },
        { min: 165431, max: 235675, rate: 0.29 },
        { min: 235676, max: null, rate: 0.33 }
      ],
      married: [
        { min: 0, max: 53359, rate: 0.15 },
        { min: 53360, max: 106717, rate: 0.205 },
        { min: 106718, max: 165430, rate: 0.26 },
        { min: 165431, max: 235675, rate: 0.29 },
        { min: 235676, max: null, rate: 0.33 }
      ]
    }
  },
  {
    name: "Australia",
    code: "au",
    currency: "AUD",
    symbol: "$",
    standardDeduction: {
      single: 18200,
      married: 18200
    },
    brackets: {
      single: [
        { min: 0, max: 18200, rate: 0.00 },
        { min: 18201, max: 45000, rate: 0.19 },
        { min: 45001, max: 120000, rate: 0.325 },
        { min: 120001, max: 180000, rate: 0.37 },
        { min: 180001, max: null, rate: 0.45 }
      ],
      married: [
        { min: 0, max: 18200, rate: 0.00 },
        { min: 18201, max: 45000, rate: 0.19 },
        { min: 45001, max: 120000, rate: 0.325 },
        { min: 120001, max: 180000, rate: 0.37 },
        { min: 180001, max: null, rate: 0.45 }
      ]
    }
  },
  {
    name: "India",
    code: "in",
    currency: "INR",
    symbol: "₹",
    standardDeduction: {
      single: 50000,
      married: 50000
    },
    brackets: {
      single: [
        { min: 0, max: 300000, rate: 0.00 },
        { min: 300001, max: 600000, rate: 0.05 },
        { min: 600001, max: 900000, rate: 0.10 },
        { min: 900001, max: 1200000, rate: 0.15 },
        { min: 1200001, max: 1500000, rate: 0.20 },
        { min: 1500001, max: null, rate: 0.30 }
      ],
      married: [
        { min: 0, max: 300000, rate: 0.00 },
        { min: 300001, max: 600000, rate: 0.05 },
        { min: 600001, max: 900000, rate: 0.10 },
        { min: 900001, max: 1200000, rate: 0.15 },
        { min: 1200001, max: 1500000, rate: 0.20 },
        { min: 1500001, max: null, rate: 0.30 }
      ]
    }
  },
  {
    name: "Germany",
    code: "de",
    currency: "EUR",
    symbol: "€",
    standardDeduction: {
      single: 9744,
      married: 19488
    },
    brackets: {
      single: [
        { min: 0, max: 9744, rate: 0.00 },
        { min: 9745, max: 57918, rate: 0.14 },
        { min: 57919, max: 274612, rate: 0.42 },
        { min: 274613, max: null, rate: 0.45 }
      ],
      married: [
        { min: 0, max: 19488, rate: 0.00 },
        { min: 19489, max: 115836, rate: 0.14 },
        { min: 115837, max: 549224, rate: 0.42 },
        { min: 549225, max: null, rate: 0.45 }
      ]
    }
  },
  {
    name: "France",
    code: "fr",
    currency: "EUR",
    symbol: "€",
    standardDeduction: {
      single: 10225,
      married: 20450
    },
    brackets: {
      single: [
        { min: 0, max: 10225, rate: 0.00 },
        { min: 10226, max: 26070, rate: 0.11 },
        { min: 26071, max: 74545, rate: 0.30 },
        { min: 74546, max: 160336, rate: 0.41 },
        { min: 160337, max: null, rate: 0.45 }
      ],
      married: [
        { min: 0, max: 20450, rate: 0.00 },
        { min: 20451, max: 52140, rate: 0.11 },
        { min: 52141, max: 149090, rate: 0.30 },
        { min: 149091, max: 320672, rate: 0.41 },
        { min: 320673, max: null, rate: 0.45 }
      ]
    }
  },
  {
    name: "Japan",
    code: "jp",
    currency: "JPY",
    symbol: "¥",
    standardDeduction: {
      single: 480000,
      married: 480000
    },
    brackets: {
      single: [
        { min: 0, max: 1950000, rate: 0.05 },
        { min: 1950001, max: 3300000, rate: 0.10 },
        { min: 3300001, max: 6950000, rate: 0.20 },
        { min: 6950001, max: 9000000, rate: 0.23 },
        { min: 9000001, max: 18000000, rate: 0.33 },
        { min: 18000001, max: 40000000, rate: 0.40 },
        { min: 40000001, max: null, rate: 0.45 }
      ],
      married: [
        { min: 0, max: 1950000, rate: 0.05 },
        { min: 1950001, max: 3300000, rate: 0.10 },
        { min: 3300001, max: 6950000, rate: 0.20 },
        { min: 6950001, max: 9000000, rate: 0.23 },
        { min: 9000001, max: 18000000, rate: 0.33 },
        { min: 18000001, max: 40000000, rate: 0.40 },
        { min: 40000001, max: null, rate: 0.45 }
      ]
    }
  }
];

const TaxCalculator = () => {
  const { toast } = useToast();
  const { subscription } = useSubscription();
  const isPremium = subscription?.tier === 'professional' || subscription?.tier === 'enterprise';
  
  const [income, setIncome] = useState<string>('80000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [deductions, setDeductions] = useState<string>('12950');
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [marginalRate, setMarginalRate] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("us");
  const [stateProvince, setStateProvince] = useState<string>("");
  const [localTax, setLocalTax] = useState<number>(0);
  
  useEffect(() => {
    document.title = "Tax Calculator | Accountly";
  }, []);

  const getCurrentCountryRules = (): CountryTaxRules => {
    return COUNTRIES_TAX_RULES.find(country => country.code === selectedCountry) || COUNTRIES_TAX_RULES[0];
  };

  useEffect(() => {
    const countryRules = getCurrentCountryRules();
    if (filingStatus === 'single') {
      setDeductions(countryRules.standardDeduction.single.toString());
    } else {
      setDeductions(countryRules.standardDeduction.married.toString());
    }
  }, [filingStatus, selectedCountry]);

  const calculateTax = () => {
    const countryRules = getCurrentCountryRules();
    const incomeValue = parseFloat(income) || 0;
    const deductionsValue = parseFloat(deductions) || 0;
    const taxable = Math.max(0, incomeValue - deductionsValue);
    setTaxableIncome(taxable);
    
    let totalTax = 0;
    const brackets = countryRules.brackets[filingStatus];
    
    for (let i = 0; i < brackets.length; i++) {
      const { min, max, rate } = brackets[i];
      const nextMin = max !== null ? max + 1 : Infinity;
      
      if (taxable > min) {
        const taxableInThisBracket = Math.min(nextMin - min, taxable - min);
        totalTax += taxableInThisBracket * rate;
        
        if (taxable >= min) {
          setMarginalRate(rate * 100);
        }
      }
    }
    
    // Calculate local/state tax for US
    let additionalTax = 0;
    if (selectedCountry === 'us' && stateProvince && isPremium) {
      // Simplified state tax calculation for demonstration
      const stateRates = {
        'california': 0.093, // 9.3% for high earners
        'new york': 0.0685, // 6.85% for middle income
        'texas': 0, // No state income tax
        'florida': 0, // No state income tax
        'illinois': 0.0495, // 4.95% flat rate
        'pennsylvania': 0.0307, // 3.07% flat rate
      };
      
      const stateName = stateProvince.toLowerCase();
      if (stateRates[stateName] !== undefined) {
        additionalTax = taxable * stateRates[stateName];
      }
    }
    
    setLocalTax(additionalTax);
    totalTax += additionalTax;
    
    setTax(totalTax);
    setEffectiveRate(incomeValue > 0 ? (totalTax / incomeValue) * 100 : 0);
    setShowResults(true);
    
    toast({
      title: "Tax calculation complete",
      description: `Your estimated tax has been calculated for ${getCurrentCountryRules().name}.`,
    });
  };

  const handleExport = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Please upgrade to Professional or Enterprise plan to export tax calculations.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Tax report exported",
      description: "Your tax calculation report has been downloaded.",
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setShowResults(false);
    setStateProvince("");
  };
  
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateProvince(e.target.value);
    setShowResults(false);
  };

  const getCurrencySymbol = (): string => {
    return getCurrentCountryRules().symbol;
  };
  
  const getAvailableCountries = () => {
    if (isPremium) {
      return COUNTRIES_TAX_RULES;
    } else {
      return COUNTRIES_TAX_RULES.slice(0, 2); // Only US and UK for free users
    }
  };
  
  const renderStateBracketInfo = () => {
    if (selectedCountry !== 'us' || !stateProvince) return null;
    
    const stateRates = {
      'california': [
        { income: '0 - $9,325', rate: '1%' },
        { income: '$9,326 - $22,107', rate: '2%' },
        { income: '$22,108 - $34,892', rate: '4%' },
        { income: '$34,893 - $48,435', rate: '6%' },
        { income: '$48,436 - $61,214', rate: '8%' },
        { income: '$61,215 - $312,686', rate: '9.3%' },
        { income: '$312,687 - $375,221', rate: '10.3%' },
        { income: '$375,222 - $625,369', rate: '11.3%' },
        { income: '$625,370+', rate: '12.3%' }
      ],
      'new york': [
        { income: '$0 - $8,500', rate: '4%' },
        { income: '$8,501 - $11,700', rate: '4.5%' },
        { income: '$11,701 - $13,900', rate: '5.25%' },
        { income: '$13,901 - $80,650', rate: '5.85%' },
        { income: '$80,651 - $215,400', rate: '6.25%' },
        { income: '$215,401 - $1,077,550', rate: '6.85%' },
        { income: '$1,077,551+', rate: '8.82%' }
      ],
      'texas': [{ income: 'All income', rate: 'No state income tax' }],
      'florida': [{ income: 'All income', rate: 'No state income tax' }],
      'illinois': [{ income: 'All income', rate: '4.95% flat tax' }],
      'pennsylvania': [{ income: 'All income', rate: '3.07% flat tax' }]
    };
    
    const stateName = stateProvince.toLowerCase();
    if (!stateRates[stateName]) return null;
    
    return (
      <div className="mt-4 mb-4 p-4 border border-gray-200 bg-gray-50 rounded-md">
        <h4 className="font-medium mb-2 text-sm">{stateProvince} Tax Brackets</h4>
        <div className="text-xs space-y-1">
          {stateRates[stateName].map((bracket, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{bracket.income}</span>
              <span>{bracket.rate}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">International Tax Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate your income tax liability based on your country, income, filing status, and deductions.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '100ms'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                <Calculator size={24} />
              </div>
              <h2 className="text-2xl font-medium">Income Tax Estimator</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Globe size={16} />
                      </span>
                      <select
                        id="country"
                        className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        {getAvailableCountries().map(country => (
                          <option key={country.code} value={country.code}>
                            {country.name} ({country.currency})
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">Select your country of residence for tax purposes</p>
                  </div>
                  
                  {selectedCountry === 'us' && (
                    <SubscriptionGuard requiredTier="professional" showAlert={false}>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <select
                          id="state"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          value={stateProvince}
                          onChange={handleStateChange}
                        >
                          <option value="">Select a state</option>
                          <option value="California">California</option>
                          <option value="New York">New York</option>
                          <option value="Texas">Texas</option>
                          <option value="Florida">Florida</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Pennsylvania">Pennsylvania</option>
                        </select>
                        <p className="text-xs text-gray-500">State tax calculations available for professional plans</p>
                      </div>
                    </SubscriptionGuard>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{getCurrencySymbol()}</span>
                      <Input 
                        id="income" 
                        type="number" 
                        className="pl-8" 
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Enter your total gross income before taxes</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="filing-status">Filing Status</Label>
                    <select 
                      id="filing-status" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={filingStatus}
                      onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
                    >
                      <option value="single">Single/Individual</option>
                      <option value="married">Married/Joint</option>
                    </select>
                    <p className="text-xs text-gray-500">Tax rates vary based on filing status</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions/Allowances</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{getCurrencySymbol()}</span>
                      <Input 
                        id="deductions" 
                        type="number" 
                        className="pl-8" 
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Standard deduction or itemized deductions/personal allowances</p>
                  </div>
                  
                  <Button onClick={calculateTax} className="w-full">Calculate Tax</Button>
                </div>

                {!isPremium && (
                  <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={16} className="text-gray-500" />
                      <h3 className="text-sm font-medium text-gray-700">Premium Countries</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Upgrade to access tax calculations for these countries:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {COUNTRIES_TAX_RULES.slice(2).map(country => (
                        <div key={country.code} className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{country.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" onClick={() => window.location.href = '/pricing'} className="text-xs w-full">
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
                
                {renderStateBracketInfo()}
              </div>
              
              {showResults && (
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-medium mb-4">Tax Summary for {getCurrentCountryRules().name}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Gross Income:</span>
                        <span className="font-medium">{getCurrencySymbol()}{parseFloat(income).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Deductions/Allowances:</span>
                        <span className="font-medium">{getCurrencySymbol()}{parseFloat(deductions).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Taxable Income:</span>
                        <span className="font-medium">{getCurrencySymbol()}{taxableIncome.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Federal/National Tax:</span>
                        <span className="font-medium">{getCurrencySymbol()}{(tax - localTax).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      {localTax > 0 && (
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-600">State/Local Tax:</span>
                          <span className="font-medium">{getCurrencySymbol()}{localTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Total Estimated Tax:</span>
                        <span className="font-semibold text-blue-600">{getCurrencySymbol()}{Math.round(tax).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Marginal Tax Rate:</span>
                        <span className="font-medium">{marginalRate.toFixed(1)}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Effective Tax Rate:</span>
                        <span className="font-medium">{effectiveRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <SubscriptionGuard 
                      requiredTier="starter"
                      fallback={
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.href = '/pricing'}>
                          <Lock size={16} />
                          Upgrade to Export
                        </Button>
                      }
                    >
                      <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
                        <Download size={16} />
                        Export Report
                      </Button>
                    </SubscriptionGuard>
                    
                    <Button variant="ghost" className="flex items-center gap-2">
                      <HelpCircle size={16} />
                      Tax Help
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              This calculator provides estimates for income tax only based on simplified tax rates for each country.
              Actual tax calculations may vary based on regional specifics, additional deductions, credits, and other factors.
              For accurate tax advice, please consult with a tax professional in your country.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TaxCalculator;
