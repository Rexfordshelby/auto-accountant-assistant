
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TAX_SYSTEMS, TaxType } from '@/utils/taxSystemData';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface DetailedTaxInfoProps {
  countryCode: string;
  isExpanded?: boolean;
  showRegionalInfo?: boolean;
}

const DetailedTaxInfo: React.FC<DetailedTaxInfoProps> = ({ 
  countryCode = 'us',
  isExpanded = false,
  showRegionalInfo = false
}) => {
  const { formatAmount } = useCurrency();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const taxSystem = TAX_SYSTEMS[countryCode.toLowerCase()];
  
  if (!taxSystem) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Tax information not available for the selected country.</p>
        </CardContent>
      </Card>
    );
  }

  const formatRate = (rate: number | null | undefined): string => {
    if (rate === null || rate === undefined) return 'Varies';
    return `${(rate * 100).toFixed(rate < 0.01 ? 2 : 1)}%`;
  };

  const formatMoneyValue = (value: number): string => {
    return formatAmount(value, { currency: taxSystem.currency });
  };

  // Create list of tax types for the tabs
  const taxTypes = Object.keys(taxSystem.taxTypes);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {taxSystem.name} Tax System
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
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isExpanded && (
              <>
                {taxTypes.map(taxType => (
                  <TabsTrigger key={taxType} value={taxType}>
                    {taxSystem.taxTypes[taxType].name.split(' ')[0]}
                  </TabsTrigger>
                ))}
                {showRegionalInfo && taxSystem.regionalTax && (
                  <TabsTrigger value="regional">Regional</TabsTrigger>
                )}
              </>
            )}
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-2">
                Overview of the main tax types in {taxSystem.name}:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(taxSystem.taxTypes).map(([key, tax]) => (
                  <div 
                    key={key} 
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <span className="text-sm font-medium">{tax.name}</span>
                    {tax.rate !== null && tax.rate !== undefined ? (
                      <Badge variant="outline">{formatRate(tax.rate)}</Badge>
                    ) : (
                      <Badge variant="outline">Varies</Badge>
                    )}
                  </div>
                ))}
              </div>
              
              {taxSystem.standardDeduction && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Standard Deduction</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 border rounded-md">
                      <span className="block text-muted-foreground">Single</span>
                      <span className="font-medium">
                        {formatMoneyValue(taxSystem.standardDeduction.single)}
                      </span>
                    </div>
                    <div className="p-2 border rounded-md">
                      <span className="block text-muted-foreground">Married</span>
                      <span className="font-medium">
                        {formatMoneyValue(taxSystem.standardDeduction.married)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {isExpanded && (
            <>
              {Object.entries(taxSystem.taxTypes).map(([key, tax]) => (
                <TabsContent key={key} value={key}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{tax.name}</h3>
                      <p className="text-sm text-muted-foreground">{tax.description}</p>
                    </div>
                    
                    {tax.rate !== null && tax.rate !== undefined && (
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Standard Rate:</span>
                        <Badge>{formatRate(tax.rate)}</Badge>
                      </div>
                    )}
                    
                    {tax.brackets && tax.brackets.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Tax Brackets</h4>
                        <div className="relative overflow-x-auto rounded-md border">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-xs uppercase">
                              <tr>
                                <th scope="col" className="px-4 py-2">Income Level</th>
                                <th scope="col" className="px-4 py-2">Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tax.brackets.map((bracket, idx) => (
                                <tr key={idx} className="border-b">
                                  <td className="px-4 py-2">
                                    {bracket.min === 0 ? 'Up to ' : `${formatMoneyValue(bracket.min)} to `}
                                    {bracket.max !== null ? formatMoneyValue(bracket.max) : 'and above'}
                                  </td>
                                  <td className="px-4 py-2 font-medium">
                                    {formatRate(bracket.rate)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
              
              {showRegionalInfo && taxSystem.regionalTax && (
                <TabsContent value="regional">
                  <div className="space-y-4">
                    <h3 className="font-medium">Regional Tax Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Tax rates can vary significantly by region within {taxSystem.name}.
                    </p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(taxSystem.regionalTax).map(([region, info]) => (
                        <AccordionItem key={region} value={region}>
                          <AccordionTrigger className="text-sm capitalize">
                            {region} {info.rate !== null && `(${formatRate(info.rate)})`}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-2 text-sm space-y-2">
                              <p className="text-muted-foreground">{info.description}</p>
                              {info.rate !== null && (
                                <div className="flex items-center">
                                  <span className="text-muted-foreground mr-2">Base Rate:</span>
                                  <Badge variant="outline">{formatRate(info.rate)}</Badge>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              )}
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailedTaxInfo;
