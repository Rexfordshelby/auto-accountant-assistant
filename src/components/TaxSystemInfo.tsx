
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaxSystemInfoProps {
  currencyCode?: string;
  showDetailedInfo?: boolean;
}

const TaxSystemInfo: React.FC<TaxSystemInfoProps> = ({ 
  currencyCode, 
  showDetailedInfo = false 
}) => {
  const { currentCurrency, getTaxSystem } = useCurrency();
  
  const code = currencyCode || currentCurrency.code;
  const taxSystem = getTaxSystem(code);
  
  if (!taxSystem) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Tax System: {taxSystem.name}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">This information uses simulated data. In a production environment, this would reflect current tax laws.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {taxSystem.rate !== undefined && (
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">Standard Rate:</span>
            <Badge variant="outline">{(taxSystem.rate * 100).toFixed(2)}%</Badge>
          </div>
        )}
        
        {taxSystem.description && (
          <p className="text-sm text-muted-foreground">{taxSystem.description}</p>
        )}
        
        {showDetailedInfo && code === 'USD' && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Federal Income Tax Brackets (2025)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Rate</div>
              <div>Income Above</div>
              <div>10%</div>
              <div>$0</div>
              <div>12%</div>
              <div>$9,875</div>
              <div>22%</div>
              <div>$40,125</div>
              <div>24%</div>
              <div>$85,525</div>
              <div>32%</div>
              <div>$163,300</div>
              <div>35%</div>
              <div>$207,350</div>
              <div>37%</div>
              <div>$518,400</div>
            </div>
          </div>
        )}
        
        {showDetailedInfo && code === 'INR' && (
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
