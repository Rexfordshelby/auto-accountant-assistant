
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

interface CurrencySelectorProps {
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ className }) => {
  const { currentCurrency, setCurrency } = useCurrency();

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

  return (
    <Select
      value={currentCurrency.code}
      onValueChange={setCurrency}
    >
      <SelectTrigger className={`w-[160px] ${className}`}>
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
              <span>{currency.name} ({currency.symbol})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
