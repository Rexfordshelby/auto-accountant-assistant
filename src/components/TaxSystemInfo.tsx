
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TAX_SYSTEMS } from '@/utils/taxSystemData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaxSystemInfoProps {
  currencyCode?: string;
  showDetailedInfo?: boolean;
  onCountryChange?: (countryCode: string) => void;
}

const TaxSystemInfo: React.FC<TaxSystemInfoProps> = ({ 
  currencyCode, 
  showDetailedInfo = false,
  onCountryChange 
}) => {
  const { currentCurrency } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  
  const code = currencyCode || currentCurrency.code;
  
  // Find matching country based on currency code
  const getCountryCodeFromCurrency = (currencyCode: string): string => {
    for (const [countryCode, system] of Object.entries(TAX_SYSTEMS)) {
      if (system.currency === currencyCode) {
        return countryCode;
      }
    }
    return 'us'; // default to US if no match
  };
  
  const countryCode = selectedCountry || getCountryCodeFromCurrency(code);
  const taxSystem = TAX_SYSTEMS[countryCode];
  
  if (!taxSystem) {
    return null;
  }

  // Get the main tax type (VAT/GST/Sales Tax)
  const getMainTaxType = () => {
    const possibleTypes = ['vat', 'gst', 'salesTax'];
    for (const type of possibleTypes) {
      if (taxSystem.taxTypes[type]) {
        return taxSystem.taxTypes[type];
      }
    }
    return null;
  };
  
  const mainTaxType = getMainTaxType();
  
  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    if (onCountryChange) {
      onCountryChange(code);
    }
  };

  return (
    <Card className="mb-6 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          Tax System: {taxSystem.name}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">This information uses actual tax data as of 2025.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        
        {onCountryChange && (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xs px-2 py-1 border rounded hover:bg-gray-50">
              Change Country
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(TAX_SYSTEMS).map(([code, system]) => (
                <DropdownMenuItem 
                  key={code} 
                  onClick={() => handleCountrySelect(code)}
                  className={code === countryCode ? "bg-muted" : ""}
                >
                  {system.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {mainTaxType?.rate !== undefined && (
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">Standard {mainTaxType.name} Rate:</span>
            <Badge variant="outline" className="animate-fade-in">{(mainTaxType.rate * 100).toFixed(2)}%</Badge>
          </div>
        )}
        
        {mainTaxType?.description && (
          <p className="text-sm text-muted-foreground">{mainTaxType.description}</p>
        )}
        
        {showDetailedInfo && countryCode === 'us' && (
          <div className="mt-4 space-y-2 animate-fade-in">
            <h4 className="text-sm font-medium">Federal Income Tax Brackets (2025)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Rate</div>
              <div>Income Above</div>
              {taxSystem.taxTypes.federalIncome.brackets?.map((bracket, idx) => (
                <React.Fragment key={idx}>
                  <div>{(bracket.rate * 100).toFixed(0)}%</div>
                  <div>${bracket.min.toLocaleString()}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        
        {showDetailedInfo && countryCode === 'in' && (
          <div className="mt-4 space-y-2 animate-fade-in">
            <h4 className="text-sm font-medium">GST Rates (2025)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Rate</div>
              <div>Applies To</div>
              <div>5%</div>
              <div>Essential goods</div>
              <div>12%</div>
              <div>Standard goods</div>
              <div>18%</div>
              <div>Most services & standard goods</div>
              <div>28%</div>
              <div>Luxury items</div>
            </div>
          </div>
        )}
        
        {showDetailedInfo && (countryCode !== 'us' && countryCode !== 'in') && taxSystem.taxTypes.incomeTax?.brackets && (
          <div className="mt-4 space-y-2 animate-fade-in">
            <h4 className="text-sm font-medium">Income Tax Brackets (2025)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Rate</div>
              <div>Income Range</div>
              {taxSystem.taxTypes.incomeTax.brackets.map((bracket, idx) => (
                <React.Fragment key={idx}>
                  <div>{(bracket.rate * 100).toFixed(0)}%</div>
                  <div>
                    {taxSystem.symbol}{bracket.min.toLocaleString()} 
                    {bracket.max ? ` to ${taxSystem.symbol}${bracket.max.toLocaleString()}` : ' and above'}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxSystemInfo;
