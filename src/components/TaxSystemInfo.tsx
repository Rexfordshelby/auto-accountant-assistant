
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TAX_SYSTEMS } from '@/utils/taxSystemData';

interface TaxSystemInfoProps {
  currencyCode?: string;
  showDetailedInfo?: boolean;
}

const TaxSystemInfo: React.FC<TaxSystemInfoProps> = ({ 
  currencyCode, 
  showDetailedInfo = false 
}) => {
  const { currentCurrency } = useCurrency();
  
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
  
  const countryCode = getCountryCodeFromCurrency(code);
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

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Tax System: {taxSystem.name}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">This information uses simulated data. In a production environment, this would reflect current tax laws.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mainTaxType?.rate !== undefined && (
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">Standard {mainTaxType.name} Rate:</span>
            <Badge variant="outline">{(mainTaxType.rate * 100).toFixed(2)}%</Badge>
          </div>
        )}
        
        {mainTaxType?.description && (
          <p className="text-sm text-muted-foreground">{mainTaxType.description}</p>
        )}
        
        {showDetailedInfo && countryCode === 'us' && (
          <div className="mt-4 space-y-2">
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
          <div className="mt-4 space-y-2">
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
      </CardContent>
    </Card>
  );
};

export default TaxSystemInfo;
