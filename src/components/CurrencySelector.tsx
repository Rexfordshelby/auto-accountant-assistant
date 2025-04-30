
import React from 'react';
import { useCurrency, availableCurrencies } from '@/contexts/CurrencyContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BadgeDollarSign, 
  BadgeEuro, 
  BadgePoundSterling, 
  BadgeJapaneseYen, 
  BadgeIndianRupee,
  Globe
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CurrencySelectorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  className = "", 
  showLabel = false,
  compact = false
}) => {
  const { currentCurrency, setCurrency, lastUpdated } = useCurrency();

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case 'USD':
        return <BadgeDollarSign className="h-4 w-4 mr-2" />;
      case 'EUR':
        return <BadgeEuro className="h-4 w-4 mr-2" />;
      case 'GBP':
        return <BadgePoundSterling className="h-4 w-4 mr-2" />;
      case 'JPY':
      case 'CNY':
        return <BadgeJapaneseYen className="h-4 w-4 mr-2" />;
      case 'INR':
        return <BadgeIndianRupee className="h-4 w-4 mr-2" />;
      default:
        return <Globe className="h-4 w-4 mr-2" />;
    }
  };

  const formatLastUpdated = () => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(lastUpdated);
  };

  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="text-sm font-medium mb-1.5 text-gray-700">Currency</div>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Select
                value={currentCurrency.code}
                onValueChange={setCurrency}
              >
                <SelectTrigger className={compact ? "w-[110px]" : "w-[160px]"}>
                  <SelectValue placeholder="Select Currency">
                    <div className="flex items-center">
                      {getCurrencyIcon(currentCurrency.code)}
                      <span>{currentCurrency.code}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        {getCurrencyIcon(currency.code)}
                        <span>
                          {compact ? 
                            `${currency.code}` : 
                            `${currency.name} (${currency.symbol})`
                          }
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Rates last updated: {formatLastUpdated()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CurrencySelector;
