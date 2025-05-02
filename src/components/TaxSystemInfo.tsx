
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { Info, HelpCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { TAX_SYSTEMS, TaxBracket } from '@/utils/taxSystemData';

interface TaxSystemInfoProps {
  currencyCode?: string;
  countryCode?: string;
  expanded?: boolean;
}

const TaxSystemInfo: React.FC<TaxSystemInfoProps> = ({ 
  currencyCode, 
  countryCode = "us",
  expanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const getCountryData = () => {
    return TAX_SYSTEMS[countryCode.toLowerCase()] || TAX_SYSTEMS.us;
  };
  
  const countryData = getCountryData();
  
  const formatRate = (rate: number | null | undefined): string => {
    if (rate === null || rate === undefined) return 'Varies';
    return `${(rate * 100).toFixed(2)}%`;
  };
  
  const formatCurrency = (amount: number): string => {
    if (!amount) return '0';
    
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: countryData.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderBrackets = (brackets: TaxBracket[] | undefined) => {
    if (!brackets || brackets.length === 0) {
      return <p className="text-sm text-gray-500">No bracket information available</p>;
    }
    
    return (
      <div className="mt-2 space-y-2">
        <div className="grid grid-cols-3 gap-2 font-semibold text-xs text-gray-600 border-b pb-1">
          <div>Min</div>
          <div>Max</div>
          <div>Rate</div>
        </div>
        {brackets.map((bracket, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 text-xs">
            <div>{formatCurrency(bracket.min)}</div>
            <div>{bracket.max !== null ? formatCurrency(bracket.max) : '∞'}</div>
            <div>{formatRate(bracket.rate)}</div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-md border p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium flex items-center gap-1">
          <Info className="h-4 w-4 text-blue-500" />
          {countryData.name} Tax Information
        </h3>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Tax help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs">
                This shows the tax structure for {countryData.name}. 
                Tax rates and brackets are simplified for estimation.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="font-medium mr-2">Currency:</span> 
        {countryData.currency} ({countryData.symbol})
      </div>
      
      <Accordion 
        type="single" 
        collapsible
        defaultValue={isExpanded ? "tax-types" : undefined}
        onValueChange={(value) => setIsExpanded(!!value)}
        className="w-full"
      >
        <AccordionItem value="tax-types" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium">
            Tax Types & Rates
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(countryData.taxTypes).map(([key, taxType]) => (
                <div key={key} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <Dialog>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{taxType.name}</h4>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">Details</Button>
                      </DialogTrigger>
                    </div>
                    
                    <div className="text-xs text-gray-600 mt-1">
                      {taxType.description}
                    </div>
                    
                    {taxType.rate !== undefined && taxType.rate !== null && (
                      <div className="text-xs font-medium mt-1">
                        Rate: {formatRate(taxType.rate)}
                      </div>
                    )}
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{taxType.name}</DialogTitle>
                        <DialogDescription>
                          {taxType.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {taxType.brackets && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Tax Brackets</h4>
                            {renderBrackets(taxType.brackets)}
                          </div>
                        )}
                        
                        {taxType.rate !== undefined && taxType.rate !== null && (
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-sm">Standard Rate:</span>
                            <span className="font-medium">{formatRate(taxType.rate)}</span>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {countryData.regionalTax && Object.keys(countryData.regionalTax).length > 0 && (
          <AccordionItem value="regional-tax" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              Regional Tax Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {Object.entries(countryData.regionalTax).map(([region, info]) => (
                  <div key={region} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                    <h4 className="font-medium text-sm capitalize">{region}</h4>
                    <div className="text-xs text-gray-600 mt-1">
                      {info.description}
                    </div>
                    {info.rate !== null && (
                      <div className="text-xs mt-1">
                        Rate: {formatRate(info.rate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        <AccordionItem value="standard-deduction" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium">
            Standard Deductions
          </AccordionTrigger>
          <AccordionContent>
            {countryData.standardDeduction ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Single/Individual:</span>
                  <span className="font-medium">{formatCurrency(countryData.standardDeduction.single)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Married/Joint:</span>
                  <span className="font-medium">{formatCurrency(countryData.standardDeduction.married)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No standard deduction information available</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaxSystemInfo;
