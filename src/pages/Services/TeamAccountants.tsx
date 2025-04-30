
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Calculator, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamAccountants = () => {
  useEffect(() => {
    document.title = "Team Accounting Services | Accountly";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 py-1 px-3 rounded-full inline-block mb-4">
              Enterprise Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Team of Accountants Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive accounting services delivered by specialized teams to handle your most complex financial needs
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full mb-16">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookkeeping">Bookkeeping</TabsTrigger>
              <TabsTrigger value="tax">Tax Services</TabsTrigger>
              <TabsTrigger value="audit">Auditing</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" /> Bookkeeping
                    </CardTitle>
                    <CardDescription>Recording day-to-day financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Transaction recording and categorization</li>
                      <li>Account reconciliation</li>
                      <li>Accounts payable and receivable</li>
                      <li>Financial data entry and organization</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" /> Tax Preparation & Planning
                    </CardTitle>
                    <CardDescription>Filing company taxes, minimizing liabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Corporate tax filing</li>
                      <li>Tax liability optimization</li>
                      <li>International tax compliance</li>
                      <li>Tax credit identification</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-blue-600" /> Auditing
                    </CardTitle>
                    <CardDescription>Internal or external reviews of financial practices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Financial statement audits</li>
                      <li>Compliance audits</li>
                      <li>Operational audits</li>
                      <li>Fraud examination</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" /> Financial Analysis & Reporting
                    </CardTitle>
                    <CardDescription>Creating comprehensive financial statements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Balance sheet preparation</li>
                      <li>Income statement analysis</li>
                      <li>Cash flow management</li>
                      <li>KPI reporting and tracking</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" /> Payroll Management
                    </CardTitle>
                    <CardDescription>Handling employee salaries and compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Payroll processing</li>
                      <li>Tax withholdings</li>
                      <li>Benefits administration</li>
                      <li>Compliance with labor regulations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600" /> Budgeting & Forecasting
                    </CardTitle>
                    <CardDescription>Helping companies plan financially for the future</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Budget preparation and monitoring</li>
                      <li>Cash flow forecasting</li>
                      <li>Financial modeling</li>
                      <li>Scenario analysis</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bookkeeping">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Professional Bookkeeping Services</h3>
                    <p className="mb-4">Our bookkeeping team maintains accurate and up-to-date records of all your financial transactions, ensuring your business always has a clear picture of its financial health.</p>
                    
                    <h4 className="font-semibold text-lg mb-2">Our Bookkeeping Services Include:</h4>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Daily transaction recording and categorization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Monthly account reconciliation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Accounts payable and receivable management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>General ledger maintenance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Financial record organization and accessibility</span>
                      </li>
                    </ul>
                    
                    <Button asChild>
                      <Link to="/contact">Schedule a Consultation</Link>
                    </Button>
                  </div>
                  
                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4">Why Choose Our Bookkeeping Services?</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-3">1</div>
                          <div>
                            <h5 className="font-medium">Accuracy and Attention to Detail</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Our team ensures every transaction is properly recorded, categorized, and reconciled.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-3">2</div>
                          <div>
                            <h5 className="font-medium">Time-Saving</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Focus on growing your business while we handle the day-to-day financial record keeping.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-3">3</div>
                          <div>
                            <h5 className="font-medium">Financial Insights</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Gain valuable insights from well-organized financial data to make better business decisions.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-3">4</div>
                          <div>
                            <h5 className="font-medium">Scalable Solutions</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Our services grow with your business, from startup to enterprise level operations.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tax">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Comprehensive Tax Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Tax Preparation</h4>
                    <p>Our tax preparation services ensure your company's tax returns are filed accurately and on time, maximizing deductions while maintaining full compliance with current tax laws.</p>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Corporate income tax returns</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Sales and use tax filings</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Property tax returns</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Payroll tax reporting</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Tax Planning</h4>
                    <p>Our strategic tax planning helps minimize your tax liability through legal methods that align with your business goals and financial situation.</p>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Tax-efficient business structure recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Timing strategies for income and deductions</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Investment tax planning</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Estate and succession planning</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-lg mb-4">International Tax Services</h4>
                  <p className="mb-4">For businesses with international operations, we provide specialized services to navigate the complexities of cross-border taxation:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>Transfer pricing compliance</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>Foreign tax credit planning</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>Global restructuring for tax efficiency</span>
                      </li>
                    </ul>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>Treaty benefit analysis</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>Global income reporting</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span> 
                        <span>VAT/GST compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button asChild size="lg" className="mt-4">
                    <Link to="/contact">Request Tax Consultation</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audit">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Professional Auditing Services</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Statement Audits</CardTitle>
                      <CardDescription>Comprehensive review of financial statements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Our team conducts thorough examinations of your financial statements to ensure they are free from material misstatements and conform to relevant accounting standards.</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Balance sheet verification</li>
                        <li>• Income statement analysis</li>
                        <li>• Cash flow statement review</li>
                        <li>• Notes and disclosures assessment</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Internal Audits</CardTitle>
                      <CardDescription>Improving internal controls and processes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Our internal audit services help identify inefficiencies, control weaknesses, and areas for improvement within your organization's operations.</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Operational efficiency assessment</li>
                        <li>• Compliance verification</li>
                        <li>• Risk management evaluation</li>
                        <li>• Process improvement recommendations</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Audits</CardTitle>
                      <CardDescription>Ensuring adherence to laws and regulations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">We verify that your organization's activities comply with applicable laws, regulations, policies, and procedures across various jurisdictions.</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Regulatory compliance reviews</li>
                        <li>• Industry-specific requirement checks</li>
                        <li>• Policy adherence verification</li>
                        <li>• Compliance program evaluation</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-lg mb-4">Specialized Audit Services</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Fraud Examination</h5>
                      <p className="text-sm mb-3">Our certified fraud examiners investigate suspicious activity, detect fraudulent transactions, and help implement preventive measures to protect your organization.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Information Systems Audits</h5>
                      <p className="text-sm mb-3">We evaluate your IT infrastructure, data security protocols, and system controls to ensure they meet industry standards and protect sensitive information.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Performance Audits</h5>
                      <p className="text-sm mb-3">Our team assesses the economy, efficiency, and effectiveness of your operations to identify opportunities for improved performance and resource utilization.</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Due Diligence</h5>
                      <p className="text-sm mb-3">For mergers and acquisitions, we provide comprehensive financial reviews to identify risks and opportunities in potential business transactions.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="mb-4">Our auditing services provide assurance to stakeholders and identify opportunities for improving your business operations.</p>
                  <Button asChild>
                    <Link to="/contact">Schedule an Audit Consultation</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reporting">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6">Financial Analysis & Reporting</h3>
                  
                  <p className="mb-8">Our team provides comprehensive financial reporting services that translate complex financial data into clear, actionable insights to drive informed decision-making.</p>
                  
                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Financial Statement Preparation</h4>
                        <p className="mb-3">We prepare accurate, timely financial statements that comply with relevant accounting standards.</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Balance sheets that clearly show assets, liabilities, and equity</li>
                          <li>• Income statements detailing revenue, expenses, and profitability</li>
                          <li>• Cash flow statements tracking the movement of funds</li>
                          <li>• Statement of changes in equity</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-green-700 dark:text-green-300 shrink-0">
                        <BarChart3 className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Performance Analysis</h4>
                        <p className="mb-3">We analyze your financial data to identify trends, strengths, weaknesses, and opportunities for improvement.</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Profitability ratio analysis</li>
                          <li>• Liquidity and solvency assessment</li>
                          <li>• Efficiency and operational metrics</li>
                          <li>• Benchmarking against industry standards</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                        <Users className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Stakeholder Reports</h4>
                        <p className="mb-3">We create tailored reports for different stakeholders to communicate financial information effectively.</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Board and executive summaries</li>
                          <li>• Investor presentations and reports</li>
                          <li>• Management dashboards</li>
                          <li>• Regulatory and compliance reporting</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
                        <TrendingUp className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Financial Insights</h4>
                        <p className="mb-3">We provide meaningful interpretations of your financial data to support strategic decision-making.</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Cost structure analysis</li>
                          <li>• Revenue stream evaluation</li>
                          <li>• Growth opportunity identification</li>
                          <li>• Risk assessment and mitigation strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-8">
                    <h4 className="font-semibold text-lg mb-3">Our Reporting Process</h4>
                    
                    <ol className="space-y-4">
                      <li className="flex items-center">
                        <span className="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">1</span>
                        <span><strong>Data Collection</strong> - We gather financial information from your systems and records</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">2</span>
                        <span><strong>Verification</strong> - We ensure accuracy and completeness of the information</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">3</span>
                        <span><strong>Analysis</strong> - We process the data to identify trends and insights</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">4</span>
                        <span><strong>Report Creation</strong> - We develop clear, tailored reports with visualizations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">5</span>
                        <span><strong>Presentation</strong> - We explain findings and answer questions</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="text-center">
                    <Button asChild size="lg">
                      <Link to="/contact">Request Financial Reporting Services</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="planning">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Budgeting & Financial Planning</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md text-blue-700 dark:text-blue-300 mr-2">
                        <Calculator className="h-5 w-5" />
                      </div>
                      Budget Development
                    </h4>
                    <p className="mb-4">Our team creates comprehensive budgets tailored to your business needs, aligning financial resources with your strategic goals.</p>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Annual operating budgets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Department and project-specific budgets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Rolling budget updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Zero-based budgeting approaches</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md text-green-700 dark:text-green-300 mr-2">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      Financial Forecasting
                    </h4>
                    <p className="mb-4">We use advanced modeling techniques to project your future financial position, helping you anticipate challenges and opportunities.</p>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Revenue and expense projections</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Cash flow forecasting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Multi-year financial models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> 
                        <span>Scenario and sensitivity analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-10">
                  <h4 className="font-semibold text-lg mb-4">Strategic Financial Planning</h4>
                  
                  <p className="mb-4">Our strategic financial planning services help align your financial activities with your long-term business goals, creating a roadmap for sustainable growth and success.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                      <h5 className="font-medium mb-2">Capital Expenditure Planning</h5>
                      <p className="text-sm">We help you evaluate potential investments in assets, equipment, and infrastructure to maximize returns and support growth initiatives.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                      <h5 className="font-medium mb-2">Debt Management Strategies</h5>
                      <p className="text-sm">Our team develops optimal debt structures and repayment plans to strengthen your balance sheet and reduce financial risk.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                      <h5 className="font-medium mb-2">Working Capital Optimization</h5>
                      <p className="text-sm">We design strategies to improve cash conversion cycles, inventory management, and accounts receivable/payable processes.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                      <h5 className="font-medium mb-2">Growth Financing Plans</h5>
                      <p className="text-sm">We help identify and evaluate the best funding options for expansion, acquisitions, and new market entry.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h4 className="font-semibold text-lg mb-4">The Accountly Advantage</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                        </svg>
                      </div>
                      <h5 className="font-medium mb-2">Industry Expertise</h5>
                      <p className="text-sm">Our specialists have deep knowledge of financial planning across diverse industries.</p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="bg-green-100 dark:bg-green-900/30 h-16 w-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                      </div>
                      <h5 className="font-medium mb-2">Advanced Analytics</h5>
                      <p className="text-sm">We leverage sophisticated tools and methodologies to deliver accurate, insightful financial plans.</p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 h-16 w-16 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                      </div>
                      <h5 className="font-medium mb-2">Real-Time Monitoring</h5>
                      <p className="text-sm">Our platform provides continuous tracking of budget performance against targets.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button asChild size="lg">
                    <Link to="/contact">Schedule Financial Planning Consultation</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Why Choose Our Team Accounting Services?</h3>
            <p className="text-lg mb-8 max-w-3xl mx-auto">Our dedicated team of specialists provides comprehensive accounting solutions tailored to businesses with complex financial needs.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle>Specialized Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access to a diverse team of specialists with deep knowledge in various accounting domains, from tax planning to financial analysis.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 dark:bg-green-900/30 h-16 w-16 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <CardTitle>Comprehensive Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>End-to-end accounting services that address all aspects of your financial operations, eliminating the need for multiple providers.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 dark:bg-purple-900/30 h-16 w-16 rounded-full flex items-center justify-center text-purple-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <CardTitle>Scalable Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Flexible services that grow with your business, from startup phase through expansion and maturity.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Ready to elevate your financial management?</h3>
                <p className="mb-6">Our team of accounting specialists is ready to help your business achieve its financial goals with comprehensive, tailored accounting services.</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link to="/contact">Schedule a Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h4 className="font-semibold mb-3">Our Commitment</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert team dedicated to your success</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tailored solutions for your industry</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proactive financial insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent communication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamAccountants;
