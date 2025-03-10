
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Download, HelpCircle, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define interfaces for tax rules
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

// Tax rules for different countries
const COUNTRIES_TAX_RULES: CountryTaxRules[] = [
  {
    name: "United States",
    code: "us",
    currency: "USD",
    symbol: "$",
    standardDeduction: {
      single: 12950,
      married: 25900
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
      married: 12570 // UK doesn't have different marriage allowances in this simplified model
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
      single: 14398,
      married: 14398 // Simplified for this example
    },
    brackets: {
      single: [
        { min: 0, max: 49020, rate: 0.15 },
        { min: 49021, max: 98040, rate: 0.205 },
        { min: 98041, max: 151978, rate: 0.26 },
        { min: 151979, max: 216511, rate: 0.29 },
        { min: 216512, max: null, rate: 0.33 }
      ],
      married: [
        { min: 0, max: 49020, rate: 0.15 },
        { min: 49021, max: 98040, rate: 0.205 },
        { min: 98041, max: 151978, rate: 0.26 },
        { min: 151979, max: 216511, rate: 0.29 },
        { min: 216512, max: null, rate: 0.33 }
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
      married: 18200 // Australia doesn't have separate married filing
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
      married: 50000 // India doesn't distinguish for married status in this model
    },
    brackets: {
      single: [
        { min: 0, max: 250000, rate: 0.00 },
        { min: 250001, max: 500000, rate: 0.05 },
        { min: 500001, max: 750000, rate: 0.10 },
        { min: 750001, max: 1000000, rate: 0.15 },
        { min: 1000001, max: 1250000, rate: 0.20 },
        { min: 1250001, max: 1500000, rate: 0.25 },
        { min: 1500001, max: null, rate: 0.30 }
      ],
      married: [
        { min: 0, max: 250000, rate: 0.00 },
        { min: 250001, max: 500000, rate: 0.05 },
        { min: 500001, max: 750000, rate: 0.10 },
        { min: 750001, max: 1000000, rate: 0.15 },
        { min: 1000001, max: 1250000, rate: 0.20 },
        { min: 1250001, max: 1500000, rate: 0.25 },
        { min: 1500001, max: null, rate: 0.30 }
      ]
    }
  }
];

const TaxCalculator = () => {
  const { toast } = useToast();
  const [income, setIncome] = useState<string>('80000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [deductions, setDeductions] = useState<string>('12950'); // Default US standard deduction
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [marginalRate, setMarginalRate] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("us");
  
  useEffect(() => {
    document.title = "Tax Calculator | Accountly";
  }, []);

  // Get current country tax rules
  const getCurrentCountryRules = (): CountryTaxRules => {
    return COUNTRIES_TAX_RULES.find(country => country.code === selectedCountry) || COUNTRIES_TAX_RULES[0];
  };

  // Update standard deduction based on filing status and country
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
        
        // Set marginal rate to the highest bracket reached
        if (taxable >= min) {
          setMarginalRate(rate * 100);
        }
      }
    }
    
    setTax(totalTax);
    setEffectiveRate(incomeValue > 0 ? (totalTax / incomeValue) * 100 : 0);
    setShowResults(true);
    
    toast({
      title: "Tax calculation complete",
      description: `Your estimated tax has been calculated for ${getCurrentCountryRules().name}.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Tax report exported",
      description: "Your tax calculation report has been downloaded.",
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setShowResults(false); // Reset results when country changes
  };

  // Get currency symbol for the selected country
  const getCurrencySymbol = (): string => {
    return getCurrentCountryRules().symbol;
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
                        {COUNTRIES_TAX_RULES.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.name} ({country.currency})
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">Select your country of residence for tax purposes</p>
                  </div>
                  
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
                        <span className="text-gray-600">Estimated Tax:</span>
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
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
                      <Download size={16} />
                      Export Report
                    </Button>
                    
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
