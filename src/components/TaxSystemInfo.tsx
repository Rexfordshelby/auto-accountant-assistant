
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { Info, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TAX_SYSTEMS } from '@/utils/taxSystemData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
  const [displayMode, setDisplayMode] = useState<'simple' | 'detailed'>(showDetailedInfo ? 'detailed' : 'simple');
  const [compareMode, setCompareMode] = useState(false);
  const [comparedCountry, setComparedCountry] = useState<string | null>(null);
  
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
  
  // Group countries by continent for organized selection
  const continentGroups = {
    "North America": ["us", "ca"],
    "Europe": ["uk", "de", "fr", "es"],
    "Asia": ["in", "cn", "jp"],
    "Oceania": ["au"],
    "South America": ["br"]
  };

  // Automatically set compared country when compare mode is enabled
  useEffect(() => {
    if (compareMode && !comparedCountry) {
      // Choose a comparison country from a different continent
      const currentContinent = Object.keys(continentGroups).find(
        continent => (continentGroups as any)[continent].includes(countryCode)
      );
      
      const otherContinents = Object.keys(continentGroups).filter(c => c !== currentContinent);
      
      if (otherContinents.length > 0) {
        // Get a country from another continent
        const otherContinent = otherContinents[0];
        setComparedCountry((continentGroups as any)[otherContinent][0]);
      } else {
        // Fallback: choose any country that's not the current one
        const allCountryCodes = Object.keys(TAX_SYSTEMS);
        const otherCountry = allCountryCodes.find(code => code !== countryCode);
        setComparedCountry(otherCountry || null);
      }
    }
  }, [compareMode, countryCode, comparedCountry]);
  
  if (!taxSystem) {
    return null;
  }

  // Get the main tax type (VAT/GST/Sales Tax)
  const getMainTaxType = (system: any) => {
    const possibleTypes = ['vat', 'gst', 'salesTax'];
    for (const type of possibleTypes) {
      if (system.taxTypes[type]) {
        return system.taxTypes[type];
      }
    }
    return null;
  };
  
  const mainTaxType = getMainTaxType(taxSystem);
  const comparedTaxSystem = comparedCountry ? TAX_SYSTEMS[comparedCountry] : null;
  const comparedMainTaxType = comparedTaxSystem ? getMainTaxType(comparedTaxSystem) : null;
  
  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    if (onCountryChange) {
      onCountryChange(code);
    }
    
    // If in compare mode and selected same country as comparison
    if (compareMode && comparedCountry === code) {
      setComparedCountry(null);
    }
  };
  
  const handleCompareCountrySelect = (code: string) => {
    setComparedCountry(code);
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      setDisplayMode('detailed');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${countryCode}-${compareMode ? 'compare' : 'single'}-${comparedCountry || ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
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
                    <p className="max-w-xs">Tax information is based on 2025 data. Rates may vary based on individual circumstances.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            
            <div className="flex space-x-2">
              {!compareMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleCompareMode} 
                  className="text-xs"
                >
                  Compare
                </Button>
              )}
              
              {compareMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleCompareMode} 
                  className="text-xs"
                >
                  Exit Compare
                </Button>
              )}
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-8 text-xs px-2 py-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                      Change Country
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-4">
                        {Object.entries(continentGroups).map(([continent, countryCodes]) => (
                          <div key={continent} className="mb-4">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">{continent}</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {countryCodes.map((code) => (
                                <Button
                                  key={code}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCountrySelect(code)}
                                  className={`justify-start ${code === countryCode ? "bg-muted" : ""}`}
                                >
                                  {TAX_SYSTEMS[code].name}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDisplayMode(displayMode === 'simple' ? 'detailed' : 'simple')}
                      className="h-8 w-8"
                    >
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${displayMode === 'detailed' ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {displayMode === 'simple' ? 'Show detailed information' : 'Show less information'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={`grid ${compareMode ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
              <div>
                {mainTaxType?.rate !== undefined && (
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Standard {mainTaxType.name} Rate:</span>
                    <Badge variant="outline" className="animate-fade-in">{(mainTaxType.rate * 100).toFixed(2)}%</Badge>
                  </div>
                )}
                
                {mainTaxType?.description && (
                  <p className="text-sm text-muted-foreground mt-2">{mainTaxType.description}</p>
                )}
              </div>
              
              {compareMode && comparedTaxSystem && (
                <div className="border-l pl-4">
                  <div className="text-sm font-medium mb-1">{comparedTaxSystem.name}</div>
                  {comparedMainTaxType?.rate !== undefined && (
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Standard {comparedMainTaxType.name} Rate:</span>
                      <Badge variant="outline">{(comparedMainTaxType.rate * 100).toFixed(2)}%</Badge>
                    </div>
                  )}
                  
                  {comparedMainTaxType?.description && (
                    <p className="text-xs text-muted-foreground mt-2">{comparedMainTaxType.description}</p>
                  )}
                </div>
              )}
            </div>
            
            {compareMode && comparedTaxSystem && (
              <div className="mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Compare with: {comparedTaxSystem.name}</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    {Object.entries(continentGroups).map(([continent, countryCodes]) => (
                      <React.Fragment key={continent}>
                        <DropdownMenuLabel>{continent}</DropdownMenuLabel>
                        {countryCodes.filter(code => code !== countryCode).map((code) => (
                          <DropdownMenuItem 
                            key={code} 
                            onClick={() => handleCompareCountrySelect(code)}
                            className={code === comparedCountry ? "bg-muted" : ""}
                          >
                            {TAX_SYSTEMS[code].name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {(displayMode === 'detailed' || showDetailedInfo) && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4 overflow-hidden"
                >
                  <div className={`grid ${compareMode ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
                    <div>
                      {/* Income Tax Information */}
                      {countryCode === 'us' && taxSystem.taxTypes.federalIncome?.brackets && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Federal Income Tax Brackets (2025)</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Rate</div>
                            <div>Income Above</div>
                            {taxSystem.taxTypes.federalIncome.brackets.map((bracket: any, idx: number) => (
                              <React.Fragment key={idx}>
                                <div>{(bracket.rate * 100).toFixed(0)}%</div>
                                <div>${bracket.min.toLocaleString()}</div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {countryCode === 'in' && (
                        <div className="space-y-2">
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
                      
                      {(countryCode !== 'us' && countryCode !== 'in') && taxSystem.taxTypes.incomeTax?.brackets && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Income Tax Brackets (2025)</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Rate</div>
                            <div>Income Range</div>
                            {taxSystem.taxTypes.incomeTax.brackets.map((bracket: any, idx: number) => (
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

                      {/* Capital Gains Tax */}
                      {taxSystem.taxTypes.capitalGains && (
                        <div className="space-y-2 mt-4">
                          <h4 className="text-sm font-medium">Capital Gains Tax</h4>
                          <p className="text-xs text-muted-foreground">{taxSystem.taxTypes.capitalGains.description}</p>
                          {taxSystem.taxTypes.capitalGains.rate && (
                            <Badge variant="outline">
                              {(taxSystem.taxTypes.capitalGains.rate * 100).toFixed(0)}% Standard Rate
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Comparison Column */}
                    {compareMode && comparedTaxSystem && (
                      <div className="border-l pl-4">
                        {/* Income Tax Comparison */}
                        {comparedCountry === 'us' && comparedTaxSystem.taxTypes.federalIncome?.brackets && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Federal Income Tax Brackets (2025)</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>Rate</div>
                              <div>Income Above</div>
                              {comparedTaxSystem.taxTypes.federalIncome.brackets.map((bracket: any, idx: number) => (
                                <React.Fragment key={idx}>
                                  <div>{(bracket.rate * 100).toFixed(0)}%</div>
                                  <div>${bracket.min.toLocaleString()}</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {comparedCountry === 'in' && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">GST Rates (2025)</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>Rate</div>
                              <div>Applies To</div>
                              <div>5%</div>
                              <div>Essential goods</div>
                              <div>12%</div>
                              <div>Standard goods</div>
                              <div>18%</div>
                              <div>Most services & goods</div>
                              <div>28%</div>
                              <div>Luxury items</div>
                            </div>
                          </div>
                        )}
                        
                        {(comparedCountry !== 'us' && comparedCountry !== 'in') && comparedTaxSystem.taxTypes.incomeTax?.brackets && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Income Tax Brackets (2025)</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>Rate</div>
                              <div>Income Range</div>
                              {comparedTaxSystem.taxTypes.incomeTax.brackets.map((bracket: any, idx: number) => (
                                <React.Fragment key={idx}>
                                  <div>{(bracket.rate * 100).toFixed(0)}%</div>
                                  <div>
                                    {comparedTaxSystem.symbol}{bracket.min.toLocaleString()} 
                                    {bracket.max ? ` to ${comparedTaxSystem.symbol}${bracket.max.toLocaleString()}` : ' and above'}
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Capital Gains Tax */}
                        {comparedTaxSystem.taxTypes.capitalGains && (
                          <div className="space-y-2 mt-4">
                            <h4 className="text-sm font-medium">Capital Gains Tax</h4>
                            <p className="text-xs text-muted-foreground">{comparedTaxSystem.taxTypes.capitalGains.description}</p>
                            {comparedTaxSystem.taxTypes.capitalGains.rate && (
                              <Badge variant="outline">
                                {(comparedTaxSystem.taxTypes.capitalGains.rate * 100).toFixed(0)}% Standard Rate
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Show full details in a sheet for mobile */}
                  <div className="mt-4 sm:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          View Full Tax Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>{taxSystem.name} Tax System</SheetTitle>
                          <SheetDescription>
                            Detailed tax information for {taxSystem.name} (2025)
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Main Tax Types</h3>
                            {Object.entries(taxSystem.taxTypes).map(([key, value]: [string, any]) => (
                              value.name && (
                                <div key={key} className="mb-4 pb-4 border-b">
                                  <h4 className="text-sm font-medium">{value.name}</h4>
                                  {value.rate !== undefined && (
                                    <Badge className="my-1" variant="outline">
                                      Rate: {(value.rate * 100).toFixed(2)}%
                                    </Badge>
                                  )}
                                  {value.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {value.description}
                                    </p>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                          
                          {/* Additional tax information specific to the country */}
                          {taxSystem.additionalInfo && (
                            <div>
                              <h3 className="text-lg font-medium mb-2">Additional Information</h3>
                              <p className="text-sm text-muted-foreground">{taxSystem.additionalInfo}</p>
                            </div>
                          )}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaxSystemInfo;
