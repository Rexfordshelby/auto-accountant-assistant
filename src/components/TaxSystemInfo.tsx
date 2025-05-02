
import React, { useState, useMemo } from 'react';
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
  // Adding showDetailedInfo property
  showDetailedInfo?: boolean;
}

const TaxSystemInfo: React.FC<TaxSystemInfoProps> = ({ 
  currencyCode, 
  countryCode = "us",
  expanded = false,
  showDetailedInfo = false
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  // Use useMemo to avoid unnecessary recalculations
  const countryData = useMemo(() => {
    return TAX_SYSTEMS[countryCode.toLowerCase()] || TAX_SYSTEMS.us;
  }, [countryCode]);
  
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
          <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-blue-50 rounded-md px-1 py-0.5 transition-colors">
            <div>{formatCurrency(bracket.min)}</div>
            <div>{bracket.max !== null ? formatCurrency(bracket.max) : '∞'}</div>
            <div className="font-medium">{formatRate(bracket.rate)}</div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-md border shadow-sm p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium flex items-center gap-1">
          <Info className="h-4 w-4 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            {countryData.name} Tax Information
          </span>
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
      
      <div className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 px-3 py-2 rounded-md">
        <span className="font-medium mr-2">Currency:</span> 
        <span className="flex items-center">
          {countryData.currency} 
          <span className="mx-1 text-gray-400">•</span> 
          <span className="text-blue-600 font-mono">{countryData.symbol}</span>
        </span>
      </div>
      
      <Accordion 
        type="single" 
        collapsible
        defaultValue={isExpanded ? "tax-types" : undefined}
        onValueChange={(value) => setIsExpanded(!!value)}
        className="w-full"
      >
        <AccordionItem value="tax-types" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium hover:bg-blue-50 px-2 rounded-md transition-colors">
            Tax Types & Rates
          </AccordionTrigger>
          <AccordionContent className="animate-accordion-down">
            <div className="space-y-4">
              {Object.entries(countryData.taxTypes).map(([key, taxType]) => (
                <div key={key} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <Dialog>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{taxType.name}</h4>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-6 text-xs">Details</Button>
                      </DialogTrigger>
                    </div>
                    
                    <div className="text-xs text-gray-600 mt-1">
                      {taxType.description}
                    </div>
                    
                    {taxType.rate !== undefined && taxType.rate !== null && (
                      <div className="text-xs font-medium mt-1">
                        Rate: <span className="text-blue-600">{formatRate(taxType.rate)}</span>
                      </div>
                    )}
                    
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{taxType.name}</DialogTitle>
                        <DialogDescription>
                          {taxType.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 mt-4">
                        {taxType.brackets && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium text-sm mb-2">Tax Brackets</h4>
                            {renderBrackets(taxType.brackets)}
                          </div>
                        )}
                        
                        {taxType.rate !== undefined && taxType.rate !== null && (
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-sm">Standard Rate:</span>
                            <span className="font-medium text-blue-600">{formatRate(taxType.rate)}</span>
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
            <AccordionTrigger className="py-2 text-sm font-medium hover:bg-blue-50 px-2 rounded-md transition-colors">
              Regional Tax Information
            </AccordionTrigger>
            <AccordionContent className="animate-accordion-down">
              <div className="space-y-3">
                {Object.entries(countryData.regionalTax).map(([region, info]) => (
                  <div key={region} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition-colors">
                    <h4 className="font-medium text-sm capitalize">{region}</h4>
                    <div className="text-xs text-gray-600 mt-1">
                      {info.description}
                    </div>
                    {info.rate !== null && (
                      <div className="text-xs mt-1 font-medium">
                        Rate: <span className="text-blue-600">{formatRate(info.rate)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        <AccordionItem value="standard-deduction" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium hover:bg-blue-50 px-2 rounded-md transition-colors">
            Standard Deductions
          </AccordionTrigger>
          <AccordionContent className="animate-accordion-down">
            {countryData.standardDeduction ? (
              <div className="space-y-2 bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Single/Individual:</span>
                  <span className="font-medium text-blue-600">{formatCurrency(countryData.standardDeduction.single)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Married/Joint:</span>
                  <span className="font-medium text-blue-600">{formatCurrency(countryData.standardDeduction.married)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No standard deduction information available</p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {showDetailedInfo && (
          <AccordionItem value="additional-info" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium hover:bg-blue-50 px-2 rounded-md transition-colors">
              Additional Tax Information
            </AccordionTrigger>
            <AccordionContent className="animate-accordion-down">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium mb-2">Tax Calendar for {countryData.name}</h4>
                <p className="text-sm text-gray-600">
                  Tax filing deadlines and payment schedules vary by country. 
                  Please consult a local tax professional for specific advice.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default TaxSystemInfo;
