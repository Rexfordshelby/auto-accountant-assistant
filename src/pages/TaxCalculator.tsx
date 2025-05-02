
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Download, HelpCircle, Globe, Lock, Info, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscriptionGuard from '@/components/SubscriptionGuard';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import DetailedTaxInfo from '@/components/DetailedTaxInfo';
import TaxSystemInfo from '@/components/TaxSystemInfo';
import { TAX_SYSTEMS } from '@/utils/taxSystemData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaxCalculator = () => {
  const { toast } = useToast();
  const { subscription } = useSubscription();
  const isPremium = subscription?.tier === 'professional' || subscription?.tier === 'enterprise';
  
  const { currentCurrency, convertAmount, formatAmount } = useCurrency();
  
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
  const [calculationMode, setCalculationMode] = useState<'basic' | 'detailed'>('basic');
  const [featuredCountries, setFeaturedCountries] = useState<string[]>(["us", "ca", "in", "uk"]);
  
  useEffect(() => {
    document.title = "Tax Calculator | Accountly";
  }, []);

  const getCurrentCountryCode = (): string => {
    return selectedCountry.toLowerCase();
  };

  useEffect(() => {
    const taxSystem = TAX_SYSTEMS[getCurrentCountryCode()];
    if (taxSystem?.standardDeduction) {
      if (filingStatus === 'single') {
        setDeductions(taxSystem.standardDeduction.single.toString());
      } else {
        setDeductions(taxSystem.standardDeduction.married.toString());
      }
    }
  }, [filingStatus, selectedCountry]);

  // Add scroll to top effect when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateTax = () => {
    const taxSystem = TAX_SYSTEMS[getCurrentCountryCode()];
    if (!taxSystem) {
      toast({
        title: "Calculation Error",
        description: "Tax information not available for the selected country.",
        variant: "destructive",
      });
      return;
    }

    const incomeValue = parseFloat(income) || 0;
    const deductionsValue = parseFloat(deductions) || 0;
    const taxable = Math.max(0, incomeValue - deductionsValue);
    setTaxableIncome(taxable);
    
    // Calculate income tax using income tax brackets
    let calculatedTax = 0;
    const incomeTaxType = 
      taxSystem.taxTypes.incomeTax || 
      taxSystem.taxTypes.federalIncome || 
      taxSystem.taxTypes.individualIncome;
    
    if (incomeTaxType && incomeTaxType.brackets) {
      let highestApplicableRate = 0;
      
      for (let i = 0; i < incomeTaxType.brackets.length; i++) {
        const { min, max, rate } = incomeTaxType.brackets[i];
        const nextMin = max !== null ? max + 1 : Infinity;
        
        if (taxable > min) {
          const taxableInThisBracket = Math.min(nextMin - min, taxable - min);
          calculatedTax += taxableInThisBracket * rate;
          
          if (taxable >= min) {
            highestApplicableRate = rate * 100;
          }
        }
      }
      
      setMarginalRate(highestApplicableRate);
    }
    
    // Add regional/state tax if applicable
    let additionalTax = 0;
    if (stateProvince && isPremium && taxSystem.regionalTax) {
      const regionKey = stateProvince.toLowerCase();
      const regionInfo = taxSystem.regionalTax[regionKey];
      
      if (regionInfo && regionInfo.rate !== null) {
        additionalTax = taxable * regionInfo.rate;
      }
    }
    
    setLocalTax(additionalTax);
    calculatedTax += additionalTax;
    
    setTax(calculatedTax);
    setEffectiveRate(incomeValue > 0 ? (calculatedTax / incomeValue) * 100 : 0);
    setShowResults(true);
    
    toast({
      title: "Tax calculation complete",
      description: `Your estimated tax has been calculated for ${taxSystem.name}.`,
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

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setShowResults(false);
    setStateProvince("");
  };
  
  const handleStateChange = (value: string) => {
    setStateProvince(value);
    setShowResults(false);
  };

  const getCurrencySymbol = (): string => {
    return TAX_SYSTEMS[getCurrentCountryCode()]?.symbol || currentCurrency.symbol;
  };
  
  const getAvailableCountries = () => {
    if (isPremium) {
      return Object.values(TAX_SYSTEMS);
    } else {
      // For free tier, limit to US, Canada, and India
      return Object.values(TAX_SYSTEMS).filter(country => 
        country.code === 'us' || country.code === 'ca' || country.code === 'in'
      );
    }
  };
  
  const getRegionalOptions = () => {
    const taxSystem = TAX_SYSTEMS[getCurrentCountryCode()];
    if (!taxSystem || !taxSystem.regionalTax) return [];
    
    return Object.keys(taxSystem.regionalTax).map(region => ({
      value: region,
      label: region.charAt(0).toUpperCase() + region.slice(1)
    }));
  };

  const formatCurrency = (value: number): string => {
    const countryCode = getCurrentCountryCode();
    const currencyCode = TAX_SYSTEMS[countryCode]?.currency || currentCurrency.code;
    
    return formatAmount(value, { currency: currencyCode });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-4">International Tax Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate your income tax liability across multiple countries with our advanced calculator.
            </p>
          </div>
          
          {/* Featured Countries */}
          <div className="mb-8 animate-fade-up" style={{animationDelay: '50ms'}}>
            <h2 className="text-lg font-medium mb-4">Featured Countries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featuredCountries.map(code => {
                const country = TAX_SYSTEMS[code];
                return (
                  <Button
                    key={code}
                    variant={selectedCountry === code ? "default" : "outline"}
                    className={`h-auto py-4 flex-col items-center justify-center gap-2 ${
                      selectedCountry === code ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`}
                    onClick={() => handleCountryChange(code)}
                  >
                    <span className="text-base">{country.name}</span>
                    <span className="text-xs opacity-70">{country.symbol} {country.currency}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="glass-card p-6 sm:p-8 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '100ms'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                <Calculator size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-medium">Income Tax Estimator</h2>
                <p className="text-sm text-gray-500">Calculate your estimated taxes with precision</p>
              </div>
            </div>
            
            <Tabs value={calculationMode} onValueChange={(v) => setCalculationMode(v as 'basic' | 'detailed')} className="w-full">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="basic" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="country" className="text-base">Country</Label>
                            <Select
                              value={selectedCountry}
                              onValueChange={handleCountryChange}
                            >
                              <SelectTrigger className="w-full">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-gray-500" />
                                  <SelectValue placeholder="Select a country" />
                                </div>
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px]">
                                {getAvailableCountries().map(country => (
                                  <SelectItem key={country.code} value={country.code}>
                                    <div className="flex items-center gap-2">
                                      <span>{country.name}</span>
                                      <span className="text-gray-500 text-xs">
                                        ({country.currency})
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">Tax calculations will be based on this country's tax system</p>
                          </div>
                          
                          {getRegionalOptions().length > 0 && (
                            <SubscriptionGuard requiredTier="professional" showAlert={false}>
                              <div className="space-y-2">
                                <Label htmlFor="state" className="text-base">Region/State/Province</Label>
                                <Select
                                  value={stateProvince}
                                  onValueChange={handleStateChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a region" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getRegionalOptions().map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500">Regional tax calculations available for professional plans</p>
                              </div>
                            </SubscriptionGuard>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="income" className="text-base">Annual Income</Label>
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
                            <Label htmlFor="filing-status" className="text-base">Filing Status</Label>
                            <Select
                              value={filingStatus}
                              onValueChange={(value) => setFilingStatus(value as 'single' | 'married')}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select filing status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Single/Individual</SelectItem>
                                <SelectItem value="married">Married/Joint</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">Tax rates vary based on filing status</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="deductions" className="text-base">Deductions/Allowances</Label>
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
                      </CardContent>
                    </Card>
                  </div>
                  
                  {showResults ? (
                    <div className="space-y-6 animate-fade-in">
                      <Card className="overflow-hidden">
                        <div className="bg-blue-50 p-4 border-b">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg flex items-center gap-1">
                              <span>Tax Estimate</span>
                              <Badge variant="outline">{TAX_SYSTEMS[getCurrentCountryCode()]?.name}</Badge>
                            </h3>
                            <Badge variant={effectiveRate > 20 ? "destructive" : "outline"}>
                              {effectiveRate.toFixed(1)}% Effective Rate
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Gross Income:</span>
                              <span className="font-medium">{formatCurrency(parseFloat(income))}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Deductions/Allowances:</span>
                              <span className="font-medium">{formatCurrency(parseFloat(deductions))}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Taxable Income:</span>
                              <span className="font-medium">{formatCurrency(taxableIncome)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Federal/National Tax:</span>
                              <span className="font-medium">{formatCurrency(tax - localTax)}</span>
                            </div>
                            
                            {localTax > 0 && (
                              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-gray-600">State/Regional Tax:</span>
                                <span className="font-medium">{formatCurrency(localTax)}</span>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Total Estimated Tax:</span>
                              <span className="font-semibold text-blue-600 text-lg">{formatCurrency(Math.round(tax))}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Marginal Tax Rate:</span>
                              <span className="font-medium">{marginalRate.toFixed(1)}%</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Effective Tax Rate:</span>
                              <span className="font-medium">{effectiveRate.toFixed(1)}%</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-between">
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
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <TaxSystemInfo countryCode={getCurrentCountryCode()} expanded={true} />
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="hidden md:block">
                      <Card>
                        <CardContent className="pt-6">
                          <TaxSystemInfo countryCode={getCurrentCountryCode()} />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="mt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="detailed-country">Country</Label>
                            <Select
                              value={selectedCountry}
                              onValueChange={handleCountryChange}
                            >
                              <SelectTrigger className="w-full">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-gray-500" />
                                  <SelectValue placeholder="Select a country" />
                                </div>
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px]">
                                {getAvailableCountries().map(country => (
                                  <SelectItem key={country.code} value={country.code}>
                                    <div className="flex items-center gap-2">
                                      <span>{country.name}</span>
                                      <span className="text-gray-500 text-xs">
                                        ({country.currency})
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="detailed-income">Annual Income</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{getCurrencySymbol()}</span>
                                <Input 
                                  id="detailed-income" 
                                  type="number" 
                                  className="pl-8" 
                                  value={income}
                                  onChange={(e) => setIncome(e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="detailed-filing-status">Filing Status</Label>
                              <Select
                                value={filingStatus}
                                onValueChange={(value) => setFilingStatus(value as 'single' | 'married')}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select filing status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single">Single</SelectItem>
                                  <SelectItem value="married">Married</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          {getRegionalOptions().length > 0 && (
                            <SubscriptionGuard requiredTier="professional" showAlert={false}>
                              <div className="space-y-2">
                                <Label htmlFor="detailed-state">Region/State</Label>
                                <Select
                                  value={stateProvince}
                                  onValueChange={handleStateChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a region" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getRegionalOptions().map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </SubscriptionGuard>
                          )}
                          
                          <div className="space-y-2">
                            <Label htmlFor="detailed-deductions">Deductions/Allowances</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{getCurrencySymbol()}</span>
                              <Input 
                                id="detailed-deductions" 
                                type="number" 
                                className="pl-8" 
                                value={deductions}
                                onChange={(e) => setDeductions(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <Button onClick={calculateTax} className="w-full mt-2">Calculate Tax</Button>
                        </CardContent>
                      </Card>
                      
                      {showResults && (
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200">
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-medium mb-4">Calculation Results</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-4 bg-white rounded-md border">
                                <span className="block text-sm text-gray-500">Taxable Income</span>
                                <span className="text-xl font-semibold">{formatCurrency(taxableIncome)}</span>
                              </div>
                              
                              <div className="p-4 bg-white rounded-md border">
                                <span className="block text-sm text-gray-500">Total Tax</span>
                                <span className="text-xl font-semibold text-blue-600">{formatCurrency(Math.round(tax))}</span>
                              </div>
                              
                              <div className="p-4 bg-white rounded-md border">
                                <span className="block text-sm text-gray-500">Effective Rate</span>
                                <span className="text-xl font-semibold">{effectiveRate.toFixed(1)}%</span>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                              <SubscriptionGuard requiredTier="starter">
                                <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
                                  <Download size={16} />
                                  Export Detailed Report
                                </Button>
                              </SubscriptionGuard>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    
                    <div>
                      <DetailedTaxInfo 
                        countryCode={getCurrentCountryCode()} 
                        isExpanded={true}
                        showRegionalInfo={true}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Indian Tax Focus Section */}
          {selectedCountry === 'in' && (
            <div className="mt-8 animate-fade-up" style={{animationDelay: '200ms'}}>
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-medium">Indian Tax System Highlights</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm">
                      The Indian income tax system is progressive with tax rates ranging from 0% to 30% depending on income slabs. 
                      India also has a Goods and Services Tax (GST) which is an indirect tax with different rates for different goods and services.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-md bg-blue-50 border border-blue-100">
                        <h4 className="font-medium mb-2">Key Tax Deductions in India</h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3 text-blue-500" />
                            Section 80C investments (up to ₹1.5 lakh)
                          </li>
                          <li className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3 text-blue-500" />
                            Health Insurance Premium (Section 80D)
                          </li>
                          <li className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3 text-blue-500" />
                            Home Loan Interest (Section 24)
                          </li>
                          <li className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3 text-blue-500" />
                            Standard Deduction for Salaried (₹50,000)
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-md bg-blue-50 border border-blue-100">
                        <h4 className="font-medium mb-2">Indian Financial Year</h4>
                        <p className="text-sm">
                          The Indian financial year runs from April 1 to March 31, unlike the calendar year followed in many countries.
                          Tax returns are typically due by July 31 following the end of the financial year.
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-2" asChild>
                      <a href="/services/tax-planning-india" className="flex items-center justify-center gap-2">
                        <span>Learn more about Indian Tax Planning</span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
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

