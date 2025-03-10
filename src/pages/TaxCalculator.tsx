
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Calculator, Download, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type TaxBracket = {
  min: number;
  max: number | null;
  rate: number;
};

// 2023 US Federal Tax Brackets (simplified)
const FEDERAL_TAX_BRACKETS: Record<string, TaxBracket[]> = {
  'single': [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11001, max: 44725, rate: 0.12 },
    { min: 44726, max: 95375, rate: 0.22 },
    { min: 95376, max: 182100, rate: 0.24 },
    { min: 182101, max: 231250, rate: 0.32 },
    { min: 231251, max: 578125, rate: 0.35 },
    { min: 578126, max: null, rate: 0.37 }
  ],
  'married': [
    { min: 0, max: 22000, rate: 0.10 },
    { min: 22001, max: 89450, rate: 0.12 },
    { min: 89451, max: 190750, rate: 0.22 },
    { min: 190751, max: 364200, rate: 0.24 },
    { min: 364201, max: 462500, rate: 0.32 },
    { min: 462501, max: 693750, rate: 0.35 },
    { min: 693751, max: null, rate: 0.37 }
  ]
};

const TaxCalculator = () => {
  const { toast } = useToast();
  const [income, setIncome] = useState<string>('80000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [deductions, setDeductions] = useState<string>('12950'); // Standard deduction for single
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [federalTax, setFederalTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [marginalRate, setMarginalRate] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  useEffect(() => {
    document.title = "Tax Calculator | Accountly";
  }, []);

  useEffect(() => {
    // Update standard deduction based on filing status
    if (filingStatus === 'single') {
      setDeductions('12950');
    } else {
      setDeductions('25900');
    }
  }, [filingStatus]);

  const calculateTax = () => {
    const incomeValue = parseFloat(income) || 0;
    const deductionsValue = parseFloat(deductions) || 0;
    const taxable = Math.max(0, incomeValue - deductionsValue);
    setTaxableIncome(taxable);
    
    let totalTax = 0;
    const brackets = FEDERAL_TAX_BRACKETS[filingStatus];
    
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
    
    setFederalTax(totalTax);
    setEffectiveRate(incomeValue > 0 ? (totalTax / incomeValue) * 100 : 0);
    setShowResults(true);
    
    toast({
      title: "Tax calculation complete",
      description: "Your estimated tax has been calculated.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Tax report exported",
      description: "Your tax calculation report has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Tax Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate your federal income tax liability based on your income, filing status, and deductions.
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
                    <Label htmlFor="income">Annual Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
                      <option value="single">Single</option>
                      <option value="married">Married Filing Jointly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="deductions" 
                        type="number" 
                        className="pl-8" 
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Standard deduction or itemized deductions</p>
                  </div>
                  
                  <Button onClick={calculateTax} className="w-full">Calculate Tax</Button>
                </div>
              </div>
              
              {showResults && (
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-medium mb-4">Tax Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Gross Income:</span>
                        <span className="font-medium">${parseFloat(income).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Deductions:</span>
                        <span className="font-medium">${parseFloat(deductions).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Taxable Income:</span>
                        <span className="font-medium">${taxableIncome.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Federal Tax:</span>
                        <span className="font-semibold text-blue-600">${Math.round(federalTax).toLocaleString()}</span>
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
              This calculator provides estimates for federal income tax only. State and local taxes are not included.
              For accurate tax advice, please consult with a tax professional.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TaxCalculator;
