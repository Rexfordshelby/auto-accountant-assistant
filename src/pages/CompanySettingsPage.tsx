
import React, { useState } from 'react';
import CompanySettings from '@/components/CompanySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CurrencySelector from '@/components/CurrencySelector';
import TaxSystemInfo from '@/components/TaxSystemInfo';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Check, FileText, Upload } from 'lucide-react';

const CompanySettingsPage = () => {
  const { currentCurrency } = useCurrency();
  const [fiscalYear, setFiscalYear] = useState("calendar");
  const [accountingMethod, setAccountingMethod] = useState("accrual");
  const [taxFilingMethod, setTaxFilingMethod] = useState("quarterly");
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, we would handle the file upload to server
      // For now, just simulate a successful upload
      setTimeout(() => {
        setFileUploaded(true);
      }, 1000);
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Company Settings</h1>
      <div className="mb-8">
        <p className="text-muted-foreground max-w-2xl">
          Manage your company profile, accounting preferences, tax settings, and more. These details will be used throughout the platform for accurate financial reports and tax calculations.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="tax">Tax Settings</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <CompanySettings />
        </TabsContent>
        
        <TabsContent value="accounting">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accounting Preferences</CardTitle>
                <CardDescription>
                  Configure how your financial data is managed and reported
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year</Label>
                    <Select value={fiscalYear} onValueChange={setFiscalYear}>
                      <SelectTrigger id="fiscal-year">
                        <SelectValue placeholder="Select fiscal year type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calendar">Calendar Year (Jan-Dec)</SelectItem>
                        <SelectItem value="april">Apr-Mar</SelectItem>
                        <SelectItem value="july">Jul-Jun</SelectItem>
                        <SelectItem value="october">Oct-Sep</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accounting-method">Accounting Method</Label>
                    <Select value={accountingMethod} onValueChange={setAccountingMethod}>
                      <SelectTrigger id="accounting-method">
                        <SelectValue placeholder="Select accounting method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash Basis</SelectItem>
                        <SelectItem value="accrual">Accrual Basis</SelectItem>
                        <SelectItem value="hybrid">Hybrid Method</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Base Currency</Label>
                    <CurrencySelector showLabel={false} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chart-of-accounts">Chart of Accounts</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="chart-of-accounts">
                        <SelectValue placeholder="Select account structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Save Accounting Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tax">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>
                  Configure tax information for your company based on your location and business type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TaxSystemInfo showDetailedInfo={true} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                    <Input id="tax-id" placeholder="Enter your tax identification number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-filing-method">Tax Filing Frequency</Label>
                    <Select value={taxFilingMethod} onValueChange={setTaxFilingMethod}>
                      <SelectTrigger id="tax-filing-method">
                        <SelectValue placeholder="Select filing frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-authority">Tax Authority</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="tax-authority">
                        <SelectValue placeholder="Select tax authority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">
                          {currentCurrency.code === 'USD' ? 'IRS (United States)' : 
                           currentCurrency.code === 'INR' ? 'GST Council (India)' : 
                           currentCurrency.code === 'GBP' ? 'HMRC (United Kingdom)' : 
                           'Default Tax Authority'}
                        </SelectItem>
                        <SelectItem value="state">State/Regional Authority</SelectItem>
                        <SelectItem value="local">Local Authority</SelectItem>
                        <SelectItem value="multiple">Multiple Authorities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-category">Business Tax Category</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="tax-category">
                        <SelectValue placeholder="Select tax category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Business</SelectItem>
                        <SelectItem value="small">Small Business</SelectItem>
                        <SelectItem value="exempt">Tax Exempt Organization</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Update Tax Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="compliance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
                <CardDescription>
                  Configure compliance settings to ensure your business meets regulatory requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-structure">Business Structure</Label>
                    <Select defaultValue="llc">
                      <SelectTrigger id="business-structure">
                        <SelectValue placeholder="Select business structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="s-corp">S Corporation</SelectItem>
                        <SelectItem value="non-profit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Financial Services</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year-end">Fiscal Year End</Label>
                    <Input type="date" id="fiscal-year-end" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reporting-standard">Financial Reporting Standard</Label>
                    <Select defaultValue="gaap">
                      <SelectTrigger id="reporting-standard">
                        <SelectValue placeholder="Select reporting standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gaap">
                          {currentCurrency.code === 'USD' ? 'US GAAP' : 
                           currentCurrency.code === 'EUR' ? 'IFRS' : 
                           currentCurrency.code === 'GBP' ? 'UK GAAP' : 
                           'GAAP'}
                        </SelectItem>
                        <SelectItem value="ifrs">IFRS</SelectItem>
                        <SelectItem value="cash">Cash Basis</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Save Compliance Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Essential Documents</CardTitle>
                <CardDescription>
                  Upload and manage important company documents for accounting and tax purposes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Articles of Incorporation</h3>
                        <p className="text-xs text-muted-foreground">Legal document establishing your business</p>
                      </div>
                      {fileUploaded ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : null}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="incorporation-doc" className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">Click to upload</span>
                          <span className="text-xs">PDF or DOCX (Max 5MB)</span>
                        </div>
                      </Label>
                      <input
                        id="incorporation-doc"
                        type="file"
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Tax Registration Certificate</h3>
                        <p className="text-xs text-muted-foreground">Official tax registration document</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="tax-doc" className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">Click to upload</span>
                          <span className="text-xs">PDF or JPEG (Max 5MB)</span>
                        </div>
                      </Label>
                      <input id="tax-doc" type="file" accept=".pdf,.jpg,.jpeg" className="hidden" />
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Financial Statements</h3>
                        <p className="text-xs text-muted-foreground">Latest audited financial statements</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="financial-doc" className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">Click to upload</span>
                          <span className="text-xs">PDF or XLSX (Max 10MB)</span>
                        </div>
                      </Label>
                      <input id="financial-doc" type="file" accept=".pdf,.xlsx" className="hidden" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Previously Uploaded Documents</h3>
                  
                  {fileUploaded ? (
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">articles-of-incorporation.pdf</p>
                          <p className="text-xs text-muted-foreground">Uploaded today</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="outline" size="sm">Replace</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground p-3 border rounded-md">
                      No documents have been uploaded yet
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Save All Documents</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySettingsPage;
