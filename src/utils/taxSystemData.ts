
// Tax system data for multiple countries
// This file stores comprehensive tax information for calculations

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxType {
  name: string;
  description: string;
  rate?: number | null;
  brackets?: TaxBracket[];
}

export interface CountryTaxSystem {
  name: string;
  code: string;
  currency: string;
  symbol: string;
  standardDeduction?: {
    single: number;
    married: number;
  };
  taxTypes: {
    [key: string]: TaxType;
  };
  regionalTax?: {
    [key: string]: {
      name: string;
      rate: number | null;
      description: string;
    }
  };
}

export const TAX_SYSTEMS: { [key: string]: CountryTaxSystem } = {
  "us": {
    name: "United States",
    code: "us",
    currency: "USD",
    symbol: "$",
    standardDeduction: {
      single: 12950,
      married: 25900
    },
    taxTypes: {
      federalIncome: {
        name: "Federal Income Tax",
        description: "Progressive tax on individual and corporate income",
        brackets: [
          { min: 0, max: 10275, rate: 0.10 },
          { min: 10276, max: 41775, rate: 0.12 },
          { min: 41776, max: 89075, rate: 0.22 },
          { min: 89076, max: 170050, rate: 0.24 },
          { min: 170051, max: 215950, rate: 0.32 },
          { min: 215951, max: 539900, rate: 0.35 },
          { min: 539901, max: null, rate: 0.37 }
        ]
      },
      stateIncome: {
        name: "State Income Tax",
        description: "Varies by state, some states have no income tax",
        rate: null
      },
      salesTax: {
        name: "Sales Tax",
        description: "Charged on goods/services at the state level",
        rate: 0.0725 // Average rate
      },
      capitalGains: {
        name: "Capital Gains Tax",
        description: "Tax on profit from selling assets (stocks, property)",
        brackets: [
          { min: 0, max: 41675, rate: 0.0 },
          { min: 41676, max: 459750, rate: 0.15 },
          { min: 459751, max: null, rate: 0.20 }
        ]
      },
      propertyTax: {
        name: "Property Tax",
        description: "Paid annually on owned real estate, varies by location",
        rate: 0.011 // National average
      },
      payrollTax: {
        name: "Payroll Tax (FICA)",
        description: "For Social Security (6.2%) and Medicare (1.45%)",
        rate: 0.0765
      },
      estateTax: {
        name: "Estate Tax",
        description: "On inheritance above certain thresholds",
        rate: 0.40
      }
    },
    regionalTax: {
      "california": {
        name: "California State Income Tax",
        rate: 0.093,
        description: "Progressive income tax ranging from 1% to 12.3%"
      },
      "texas": {
        name: "Texas State Income Tax",
        rate: 0,
        description: "No state income tax"
      },
      "new york": {
        name: "New York State Income Tax",
        rate: 0.0685,
        description: "Progressive income tax ranging from 4% to 10.9%"
      }
    }
  },
  "uk": {
    name: "United Kingdom",
    code: "uk",
    currency: "GBP",
    symbol: "£",
    standardDeduction: {
      single: 12570,
      married: 12570
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax",
        description: "Progressive tax on personal earnings",
        brackets: [
          { min: 0, max: 12570, rate: 0.0 },
          { min: 12571, max: 50270, rate: 0.20 },
          { min: 50271, max: 150000, rate: 0.40 },
          { min: 150001, max: null, rate: 0.45 }
        ]
      },
      nationalInsurance: {
        name: "National Insurance",
        description: "For healthcare and pensions",
        rate: 0.12
      },
      vat: {
        name: "VAT (Value Added Tax)",
        description: "20% on most goods/services",
        rate: 0.20
      },
      capitalGains: {
        name: "Capital Gains Tax",
        description: "On profits from asset sales",
        brackets: [
          { min: 0, max: 12300, rate: 0.0 },
          { min: 12301, max: null, rate: 0.20 }
        ]
      },
      stampDuty: {
        name: "Stamp Duty",
        description: "On property purchases",
        brackets: [
          { min: 0, max: 250000, rate: 0.0 },
          { min: 250001, max: 925000, rate: 0.05 },
          { min: 925001, max: 1500000, rate: 0.10 },
          { min: 1500001, max: null, rate: 0.12 }
        ]
      },
      councilTax: {
        name: "Council Tax",
        description: "Local tax on residential properties",
        rate: null
      }
    }
  },
  "ca": {
    name: "Canada",
    code: "ca",
    currency: "CAD",
    symbol: "C$",
    standardDeduction: {
      single: 13808,
      married: 13808
    },
    taxTypes: {
      federalIncome: {
        name: "Federal Income Tax",
        description: "Based on your income",
        brackets: [
          { min: 0, max: 49020, rate: 0.15 },
          { min: 49021, max: 98040, rate: 0.205 },
          { min: 98041, max: 151978, rate: 0.26 },
          { min: 151979, max: 216511, rate: 0.29 },
          { min: 216512, max: null, rate: 0.33 }
        ]
      },
      provincialIncome: {
        name: "Provincial Income Tax",
        description: "Varies by province",
        rate: null
      },
      gst: {
        name: "GST/HST (Goods and Services Tax / Harmonized Sales Tax)",
        description: "Applied to most purchases",
        rate: 0.05 // Federal GST
      },
      capitalGains: {
        name: "Capital Gains Tax",
        description: "Only 50% of gains are taxable",
        rate: 0.50 // Inclusion rate
      },
      propertyTax: {
        name: "Property Tax",
        description: "Local tax on owned real estate",
        rate: 0.01 // Approximate average
      },
      payrollDeductions: {
        name: "Payroll Deductions",
        description: "For CPP (pension) and EI (employment insurance)",
        rate: 0.0595 // Combined approximate rate
      }
    },
    regionalTax: {
      "ontario": {
        name: "Ontario Provincial Tax",
        rate: 0.0505,
        description: "Provincial income tax base rate"
      },
      "quebec": {
        name: "Quebec Provincial Tax",
        rate: 0.15,
        description: "Provincial income tax base rate"
      },
      "british columbia": {
        name: "British Columbia Provincial Tax",
        rate: 0.0506,
        description: "Provincial income tax base rate"
      }
    }
  },
  "in": {
    name: "India",
    code: "in",
    currency: "INR",
    symbol: "₹",
    standardDeduction: {
      single: 50000,
      married: 50000
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax",
        description: "Progressive rates for individuals and businesses",
        brackets: [
          { min: 0, max: 300000, rate: 0.0 },
          { min: 300001, max: 600000, rate: 0.05 },
          { min: 600001, max: 900000, rate: 0.10 },
          { min: 900001, max: 1200000, rate: 0.15 },
          { min: 1200001, max: 1500000, rate: 0.20 },
          { min: 1500001, max: null, rate: 0.30 }
        ]
      },
      gst: {
        name: "GST (Goods and Services Tax)",
        description: "Indirect tax on goods/services (5%-28%)",
        brackets: [
          { min: 0, max: 0, rate: 0.0 }, // Exempt
          { min: 1, max: 1, rate: 0.05 }, // Essential goods
          { min: 2, max: 2, rate: 0.12 }, // Standard goods
          { min: 3, max: 3, rate: 0.18 }, // Most services
          { min: 4, max: 4, rate: 0.28 }  // Luxury items
        ]
      },
      capitalGains: {
        name: "Capital Gains Tax",
        description: "On profits from sale of property, shares, etc.",
        brackets: [
          { min: 0, max: 0, rate: 0.10 }, // Short-term (listed securities with STT)
          { min: 1, max: 1, rate: 0.15 }, // Short-term (unlisted securities)
          { min: 2, max: 2, rate: 0.20 }  // Long-term
        ]
      },
      propertyTax: {
        name: "Property Tax",
        description: "Paid to municipal bodies",
        rate: 0.01 // Approximate average
      },
      tds: {
        name: "TDS (Tax Deducted at Source)",
        description: "Withheld by payer on certain incomes",
        rate: 0.10 // Common rate
      },
      stt: {
        name: "Securities Transaction Tax (STT)",
        description: "On share trading",
        rate: 0.001 // For equity delivery
      }
    }
  },
  "cn": {
    name: "China",
    code: "cn",
    currency: "CNY",
    symbol: "¥",
    standardDeduction: {
      single: 60000, // Annual deduction in CNY
      married: 60000
    },
    taxTypes: {
      individualIncome: {
        name: "Individual Income Tax",
        description: "On wages, business income, etc.",
        brackets: [
          { min: 0, max: 36000, rate: 0.03 },
          { min: 36001, max: 144000, rate: 0.10 },
          { min: 144001, max: 300000, rate: 0.20 },
          { min: 300001, max: 420000, rate: 0.25 },
          { min: 420001, max: 660000, rate: 0.30 },
          { min: 660001, max: 960000, rate: 0.35 },
          { min: 960001, max: null, rate: 0.45 }
        ]
      },
      corporateIncome: {
        name: "Corporate Income Tax",
        description: "25% standard rate",
        rate: 0.25
      },
      vat: {
        name: "VAT (Value Added Tax)",
        description: "13% standard on goods and services",
        brackets: [
          { min: 0, max: 0, rate: 0.0 }, // Exempt
          { min: 1, max: 1, rate: 0.06 }, // Services
          { min: 2, max: 2, rate: 0.09 }, // Specific goods
          { min: 3, max: 3, rate: 0.13 }  // Standard rate
        ]
      },
      consumptionTax: {
        name: "Consumption Tax",
        description: "On luxury items (e.g., tobacco, alcohol, cars)",
        rate: null // Varies by product
      },
      propertyTax: {
        name: "Property Tax",
        description: "In pilot cities, not nationwide yet",
        rate: 0.005 // Approximate in pilot areas
      },
      stampDuty: {
        name: "Stamp Duty",
        description: "On certain financial transactions",
        rate: 0.001 // Common rate
      }
    }
  },
  "au": {
    name: "Australia",
    code: "au",
    currency: "AUD",
    symbol: "A$",
    standardDeduction: {
      single: 18200,
      married: 18200
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax",
        description: "Progressive tax on personal earnings",
        brackets: [
          { min: 0, max: 18200, rate: 0.0 },
          { min: 18201, max: 45000, rate: 0.19 },
          { min: 45001, max: 120000, rate: 0.325 },
          { min: 120001, max: 180000, rate: 0.37 },
          { min: 180001, max: null, rate: 0.45 }
        ]
      },
      gst: {
        name: "GST (Goods and Services Tax)",
        description: "10% tax on most goods and services",
        rate: 0.10
      },
      capitalGains: {
        name: "Capital Gains Tax",
        description: "Tax on profit from asset sales",
        rate: 0.50 // 50% discount for assets held >12 months
      },
      propertyTax: {
        name: "Property Tax",
        description: "State-based tax on property values",
        rate: 0.0025 // Approximate average
      },
      medicareLevy: {
        name: "Medicare Levy",
        description: "Helps fund Australia's public health system",
        rate: 0.02 // 2% of taxable income
      }
    }
  },
  "de": {
    name: "Germany",
    code: "de",
    currency: "EUR",
    symbol: "€",
    standardDeduction: {
      single: 9408,
      married: 18816
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax (Einkommensteuer)",
        description: "Progressive tax on personal income",
        brackets: [
          { min: 0, max: 9408, rate: 0.0 },
          { min: 9409, max: 57051, rate: 0.14 }, // Starts at 14% and progressively increases
          { min: 57052, max: 270500, rate: 0.42 },
          { min: 270501, max: null, rate: 0.45 }
        ]
      },
      vat: {
        name: "VAT (Mehrwertsteuer)",
        description: "Value-added tax on goods and services",
        rate: 0.19 // Standard rate
      },
      capitalGains: {
        name: "Capital Gains Tax (Kapitalertragsteuer)",
        description: "On investment income and gains",
        rate: 0.25 // Plus solidarity surcharge
      },
      propertyTax: {
        name: "Property Tax (Grundsteuer)",
        description: "Annual tax on real estate ownership",
        rate: 0.0035 // Approximate average
      },
      solidarityTax: {
        name: "Solidarity Surcharge (Solidaritätszuschlag)",
        description: "Additional tax to support eastern German states",
        rate: 0.055 // 5.5% of income tax amount
      }
    }
  },
  "fr": {
    name: "France",
    code: "fr",
    currency: "EUR",
    symbol: "€",
    standardDeduction: {
      single: 10777,
      married: 21554
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax (Impôt sur le revenu)",
        description: "Progressive tax on personal income",
        brackets: [
          { min: 0, max: 10777, rate: 0.0 },
          { min: 10778, max: 27478, rate: 0.11 },
          { min: 27479, max: 78570, rate: 0.30 },
          { min: 78571, max: 168994, rate: 0.41 },
          { min: 168995, max: null, rate: 0.45 }
        ]
      },
      vat: {
        name: "VAT (TVA)",
        description: "Value-added tax on goods and services",
        rate: 0.20 // Standard rate
      },
      wealthTax: {
        name: "Real Estate Wealth Tax (IFI)",
        description: "Annual tax on real estate assets over €1.3M",
        brackets: [
          { min: 0, max: 1300000, rate: 0.0 },
          { min: 1300001, max: 2570000, rate: 0.005 },
          { min: 2570001, max: 5000000, rate: 0.01 },
          { min: 5000001, max: 10000000, rate: 0.015 },
          { min: 10000001, max: null, rate: 0.0175 }
        ]
      },
      socialTax: {
        name: "Social Taxes (Prélèvements sociaux)",
        description: "For healthcare, pensions, and other social programs",
        rate: 0.172 // Combined rate on employment income
      }
    }
  },
  "jp": {
    name: "Japan",
    code: "jp",
    currency: "JPY",
    symbol: "¥",
    standardDeduction: {
      single: 480000,
      married: 480000
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax (所得税)",
        description: "National progressive income tax",
        brackets: [
          { min: 0, max: 1950000, rate: 0.05 },
          { min: 1950001, max: 3300000, rate: 0.10 },
          { min: 3300001, max: 6950000, rate: 0.20 },
          { min: 6950001, max: 9000000, rate: 0.23 },
          { min: 9000001, max: 18000000, rate: 0.33 },
          { min: 18000001, max: 40000000, rate: 0.40 },
          { min: 40000001, max: null, rate: 0.45 }
        ]
      },
      consumptionTax: {
        name: "Consumption Tax (消費税)",
        description: "Similar to VAT/GST on goods and services",
        rate: 0.10 // Standard rate
      },
      residentTax: {
        name: "Resident Tax (住民税)",
        description: "Local tax based on income",
        rate: 0.10 // Approximate combined rate
      },
      propertyTax: {
        name: "Fixed Asset Tax (固定資産税)",
        description: "Annual tax on property ownership",
        rate: 0.014 // Standard rate
      },
      inheritanceTax: {
        name: "Inheritance Tax (相続税)",
        description: "Tax on inherited assets",
        rate: 0.55 // Maximum rate
      }
    }
  },
  "es": {
    name: "Spain",
    code: "es",
    currency: "EUR",
    symbol: "€",
    standardDeduction: {
      single: 5550,
      married: 5550
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax (IRPF)",
        description: "Progressive tax on personal income",
        brackets: [
          { min: 0, max: 12450, rate: 0.19 },
          { min: 12451, max: 20200, rate: 0.24 },
          { min: 20201, max: 35200, rate: 0.30 },
          { min: 35201, max: 60000, rate: 0.37 },
          { min: 60001, max: 300000, rate: 0.45 },
          { min: 300001, max: null, rate: 0.47 }
        ]
      },
      vat: {
        name: "VAT (IVA)",
        description: "Value-added tax on goods and services",
        rate: 0.21 // Standard rate
      },
      wealthTax: {
        name: "Wealth Tax (Impuesto sobre el Patrimonio)",
        description: "Annual tax on net assets above exemption",
        rate: 0.02 // Average rate, varies by region
      },
      propertyTax: {
        name: "Property Tax (IBI)",
        description: "Annual tax on property ownership",
        rate: 0.006 // Average rate, varies by municipality
      }
    },
    regionalTax: {
      "madrid": {
        name: "Madrid Regional Income Tax",
        rate: 0.21,
        description: "Regional component of income tax"
      },
      "catalonia": {
        name: "Catalonia Regional Income Tax",
        rate: 0.24,
        description: "Regional component of income tax"
      },
      "andalusia": {
        name: "Andalusia Regional Income Tax",
        rate: 0.235,
        description: "Regional component of income tax"
      }
    }
  },
  "br": {
    name: "Brazil",
    code: "br",
    currency: "BRL",
    symbol: "R$",
    standardDeduction: {
      single: 22847.76,
      married: 22847.76
    },
    taxTypes: {
      incomeTax: {
        name: "Income Tax (Imposto de Renda)",
        description: "Progressive tax on personal income",
        brackets: [
          { min: 0, max: 22847.76, rate: 0.0 },
          { min: 22847.77, max: 33919.80, rate: 0.075 },
          { min: 33919.81, max: 45012.60, rate: 0.15 },
          { min: 45012.61, max: 55976.16, rate: 0.225 },
          { min: 55976.17, max: null, rate: 0.275 }
        ]
      },
      consumptionTax: {
        name: "Consumption Tax (ICMS, IPI, ISS)",
        description: "Combined taxes on products and services",
        rate: 0.17 // ICMS standard rate
      },
      propertyTax: {
        name: "Urban Property Tax (IPTU)",
        description: "Annual tax on urban property ownership",
        rate: 0.01 // Average rate, varies by municipality
      },
      financialTax: {
        name: "Financial Operations Tax (IOF)",
        description: "Tax on loans, foreign exchange, securities",
        rate: 0.038 // Varies by transaction type
      }
    }
  }
};
