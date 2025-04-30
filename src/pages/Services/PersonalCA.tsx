
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Coins, Briefcase, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

const PersonalCA = () => {
  useEffect(() => {
    document.title = "Personal CA Services | Accountly";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 py-1 px-3 rounded-full inline-block mb-4">
              Personalized Accounting
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Personal Chartered Accountant Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dedicated one-on-one financial guidance and support for individuals and small businesses
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full mb-16">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tax-filing">Tax Filing</TabsTrigger>
              <TabsTrigger value="tax-saving">Tax Saving</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Why Choose a Personal CA?</CardTitle>
                    <CardDescription>Personalized attention and expert guidance for your financial needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      A Personal Chartered Accountant provides dedicated financial expertise tailored specifically to your unique situation. 
                      Unlike working with a large accounting team where you might interact with different specialists, a Personal CA builds 
                      a deep understanding of your complete financial picture over time.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          One-on-One Relationship
                        </h3>
                        <p className="text-sm">Work directly with the same CA who knows your financial history and goals.</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Holistic Financial Advice
                        </h3>
                        <p className="text-sm">Receive guidance that considers all aspects of your financial life.</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Personalized Solutions
                        </h3>
                        <p className="text-sm">Get strategies and recommendations tailored to your specific circumstances.</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Proactive Approach
                        </h3>
                        <p className="text-sm">Benefit from forward-thinking financial planning and tax strategies.</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                      <h3 className="font-semibold mb-2">Our Personal CA Commitment</h3>
                      <p className="text-sm">
                        At Accountly, our Personal CA service means you'll be matched with a dedicated chartered accountant who 
                        will be your primary point of contact for all financial matters. They'll take the time to understand your 
                        unique financial situation, goals, and challenges, providing personalized guidance every step of the way.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Key Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-blue-700 dark:text-blue-300 mr-2">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span>Income Tax Filing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded text-green-700 dark:text-green-300 mr-2">
                            <Calculator className="h-4 w-4" />
                          </div>
                          <span>Tax Saving Advice</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded text-purple-700 dark:text-purple-300 mr-2">
                            <Coins className="h-4 w-4" />
                          </div>
                          <span>Investment Planning</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded text-amber-700 dark:text-amber-300 mr-2">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <span>Loan & Credit Help</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded text-red-700 dark:text-red-300 mr-2">
                            <FileCheck className="h-4 w-4" />
                          </div>
                          <span>Regulatory Compliance</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Best For</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                          Salaried Individuals
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
                          Freelancers
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                          Small Business Owners
                        </Badge>
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30">
                          Entrepreneurs
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30">
                          High-Income Individuals
                        </Badge>
                      </div>
                      
                      <div className="mt-4">
                        <Button asChild className="w-full">
                          <Link to="/contact">Find Your CA Match</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tax-filing">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Income Tax Filing Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="mb-6">
                      Our personal CA services ensure your income tax returns are filed accurately, on time, and 
                      optimized to your specific financial situation. We handle the complexities of tax regulations 
                      so you don't have to worry.
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold mb-3">Our Tax Filing Process</h4>
                      <ol className="space-y-3">
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">1</span>
                          <span><strong>Document Collection</strong> - We help you gather all necessary financial records</span>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">2</span>
                          <span><strong>Review & Analysis</strong> - We thoroughly analyze your financial situation</span>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">3</span>
                          <span><strong>Deduction Identification</strong> - We find all eligible deductions and credits</span>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">4</span>
                          <span><strong>Return Preparation</strong> - We prepare accurate tax returns</span>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">5</span>
                          <span><strong>Review & Filing</strong> - We review with you and file on your behalf</span>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3">6</span>
                          <span><strong>Follow-up Support</strong> - We handle any notices or questions from tax authorities</span>
                        </li>
                      </ol>
                    </div>
                    
                    <Button asChild className="mt-4">
                      <Link to="/contact">Schedule Tax Filing Consultation</Link>
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">Types of Returns We Handle</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Individual Income Tax Returns</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Self-Employed & Freelancer Returns</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Small Business Owner Returns</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Rental Income Tax Reporting</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Investment Income Reporting</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Foreign Income Reporting</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Why Choose Our Tax Filing Service</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-700 dark:text-green-300 mr-3">1</div>
                            <div>
                              <h5 className="font-medium">Maximize Refunds & Minimize Liability</h5>
                              <p className="text-sm">We ensure you receive every deduction and credit you're entitled to.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-700 dark:text-green-300 mr-3">2</div>
                            <div>
                              <h5 className="font-medium">Error-Free Filing</h5>
                              <p className="text-sm">Our careful review process minimizes the risk of costly errors or audits.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-700 dark:text-green-300 mr-3">3</div>
                            <div>
                              <h5 className="font-medium">Time Saving</h5>
                              <p className="text-sm">We handle the complexities while you focus on what matters to you.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-700 dark:text-green-300 mr-3">4</div>
                            <div>
                              <h5 className="font-medium">Year-Round Support</h5>
                              <p className="text-sm">Get assistance with tax questions and planning throughout the year.</p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-lg mb-4">Regional Tax Expertise</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">United States</h5>
                      <p className="text-sm">Federal and state tax filing with expertise in various state-specific requirements.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">India</h5>
                      <p className="text-sm">Comprehensive ITR filing with GST compliance and planning for optimal tax outcomes.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">International</h5>
                      <p className="text-sm">Expertise in multi-country tax requirements for expatriates and international workers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tax-saving">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6">Tax Saving Advice</h3>
                  
                  <p className="mb-6">
                    Our Personal CA service goes beyond just filing taxes - we provide proactive strategies to legally 
                    minimize your tax burden and keep more of your hard-earned money.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Our Tax Saving Approach</h4>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-green-700 dark:text-green-300 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-lg font-medium mb-2">Personalized Assessment</h5>
                          <p className="mb-3">
                            We begin by thoroughly understanding your financial situation, income sources, 
                            investment portfolio, and financial goals to identify tax-saving opportunities specific to you.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-lg font-medium mb-2">Strategic Planning</h5>
                          <p className="mb-3">
                            We develop a customized tax-saving strategy that aligns with your financial goals, 
                            considering short-term and long-term implications to maximize your tax benefits.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full h-16 w-16 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-lg font-medium mb-2">Implementation & Monitoring</h5>
                          <p className="mb-3">
                            We help you implement recommended tax-saving strategies and continuously monitor 
                            changes in tax laws and your financial situation to adapt your plan accordingly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Tax-Advantaged Investment Strategies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Retirement account optimization (401(k), IRAs, Pension Schemes)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Tax-efficient investment selection and placement</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Capital gains planning and harvesting strategies</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Real estate investment tax planning</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Business Tax Strategies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Business structure optimization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Deduction maximization strategies</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Benefit program tax efficiency</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Tax credit identification and planning</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
                    <h4 className="font-semibold mb-4">Regional Tax Saving Expertise</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium mb-2">United States</h5>
                        <p className="text-sm mb-3">
                          Our US tax specialists help you navigate federal and state tax deductions, credits, and exemptions 
                          including mortgage interest deductions, charitable contributions, education credits, and retirement savings incentives.
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">India</h5>
                        <p className="text-sm mb-3">
                          Our experts provide guidance on Section 80C-80U deductions, HRA benefits, LTA claims, NPS investments, 
                          and other provisions under Indian tax laws to minimize your tax liability.
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">International Tax Planning</h5>
                        <p className="text-sm mb-3">
                          For those with international income or assets, we offer strategies to prevent double taxation 
                          and take advantage of tax treaties between countries.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="mb-6">
                      Our personalized tax saving advice can help you legally reduce your tax burden 
                      and keep more of your hard-earned money.
                    </p>
                    
                    <Button asChild size="lg">
                      <Link to="/contact">Schedule Tax Planning Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="investment">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Investment Planning Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="mb-6">
                      Our Personal CA investment planning services help you make informed decisions about how to 
                      grow and protect your wealth. We provide tax-efficient investment strategies tailored to 
                      your financial goals and risk tolerance.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle>Financial Goal Setting</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">
                            We help you define clear, achievable financial goals based on your priorities:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Retirement planning</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Education funding</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Home purchase</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Wealth accumulation</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Business investment</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle>Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">
                            We evaluate your risk tolerance and time horizon to determine the appropriate investment strategy:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Risk tolerance questionnaires</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Financial situation analysis</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Time horizon evaluation</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>Income stability assessment</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4">Investment Strategy Development</h4>
                      <p className="mb-4">
                        We create personalized investment strategies that align with your goals, risk profile, and tax situation:
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Asset Allocation</h5>
                          <p className="text-sm">Strategic distribution of investments across different asset classes to balance risk and return.</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Tax-Efficient Investment Selection</h5>
                          <p className="text-sm">Choosing investments with favorable tax treatment to maximize after-tax returns.</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Retirement Account Optimization</h5>
                          <p className="text-sm">Maximizing the benefits of tax-advantaged retirement accounts.</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Diversification Planning</h5>
                          <p className="text-sm">Spreading investments across various sectors and geographies to reduce risk.</p>
                        </div>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Portfolio Monitoring & Rebalancing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          We provide ongoing portfolio oversight to ensure your investments remain aligned with your goals:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Regular performance reviews</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Portfolio rebalancing recommendations</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Tax-efficient withdrawal strategies</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Strategy adjustments based on life changes</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-lg mb-4">Regional Investment Planning</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>United States</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>• 401(k) and IRA optimization</p>
                        <p>• Roth vs. Traditional account strategies</p>
                        <p>• 529 education planning</p>
                        <p>• Tax-efficient asset location</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>India</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>• ELSS and mutual fund strategies</p>
                        <p>• PPF and NPS planning</p>
                        <p>• Real estate investment planning</p>
                        <p>• SIP and lump sum investment advice</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>International</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>• Cross-border investment strategies</p>
                        <p>• Currency diversification</p>
                        <p>• International tax implications</p>
                        <p>• Offshore investment considerations</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center">
                    <p className="mb-6">
                      Our personalized investment planning services help you build and preserve wealth 
                      while optimizing your tax position.
                    </p>
                    
                    <Button asChild size="lg">
                      <Link to="/contact">Get Investment Planning Advice</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6">Regulatory Compliance Services</h3>
                  
                  <p className="mb-6">
                    Our Personal CA services ensure you stay compliant with all applicable financial regulations, 
                    helping you avoid penalties and legal issues while maintaining peace of mind.
                  </p>
                  
                  <div className="space-y-8 mb-10">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4">Comprehensive Compliance Coverage</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-2">Tax Compliance</h5>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Income tax filing deadlines</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Estimated tax payments</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Property tax obligations</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Foreign account reporting (FBAR, FATCA)</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Business Compliance</h5>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Business licenses and permits</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Sales tax collection and filing</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Payroll tax requirements</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Industry-specific regulations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Our Compliance Process</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="text-center">
                          <CardHeader>
                            <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 h-12 w-12 rounded-full flex items-center justify-center text-blue-600 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                              </svg>
                            </div>
                            <CardTitle className="text-base">Assessment</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>We evaluate your specific compliance requirements based on your financial activities and location.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                          <CardHeader>
                            <div className="mx-auto bg-green-100 dark:bg-green-900/30 h-12 w-12 rounded-full flex items-center justify-center text-green-600 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                              </svg>
                            </div>
                            <CardTitle className="text-base">Planning</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>We create a compliance calendar and process to ensure all deadlines and requirements are met.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                          <CardHeader>
                            <div className="mx-auto bg-purple-100 dark:bg-purple-900/30 h-12 w-12 rounded-full flex items-center justify-center text-purple-600 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </div>
                            <CardTitle className="text-base">Execution</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>We handle or guide you through the filing and reporting processes, ensuring accuracy and timeliness.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                    <h4 className="font-semibold mb-4">Regional Compliance Expertise</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium mb-2">United States</h5>
                        <p className="text-sm mb-2">
                          Our US specialists ensure compliance with IRS requirements, state-specific tax laws, 
                          retirement account regulations, and small business compliance obligations.
                        </p>
                        <ul className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>FBAR filing</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>1099 reporting</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>Quarterly estimated taxes</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>State tax requirements</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">India</h5>
                        <p className="text-sm mb-2">
                          Our experts ensure compliance with Indian Income Tax laws, GST requirements, 
                          TDS obligations, and other regulatory filings.
                        </p>
                        <ul className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>ITR filing</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>GST returns</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>TDS compliance</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>ROC filings</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">International Compliance</h5>
                        <p className="text-sm mb-2">
                          For individuals with international financial interests, we handle cross-border tax reporting, 
                          foreign asset disclosure, and multi-country compliance requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Benefits of Our Compliance Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                          <h5 className="font-medium mb-2 flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Penalty Avoidance
                          </h5>
                          <p className="text-sm">Prevent costly fines and penalties for non-compliance or late filings.</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                          <h5 className="font-medium mb-2 flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Peace of Mind
                          </h5>
                          <p className="text-sm">Rest easy knowing your financial affairs are properly managed and compliant.</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                          <h5 className="font-medium mb-2 flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Time Savings
                          </h5>
                          <p className="text-sm">Focus on your priorities while we handle complex compliance requirements.</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                          <h5 className="font-medium mb-2 flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Audit Protection
                          </h5>
                          <p className="text-sm">Reduce audit risks and receive support if an audit does occur.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center">
                    <Button asChild size="lg">
                      <Link to="/contact">Get Compliance Support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">How We Work With You</h3>
              
              <ol className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 h-8 w-8 rounded-full flex items-center justify-center text-green-800 dark:text-green-300 font-semibold mr-3 shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Initial Consultation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We begin with a comprehensive discussion to understand your financial situation, goals, and challenges.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 h-8 w-8 rounded-full flex items-center justify-center text-green-800 dark:text-green-300 font-semibold mr-3 shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">CA Matching</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Based on your needs, we match you with a personal chartered accountant who specializes in your specific requirements.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 h-8 w-8 rounded-full flex items-center justify-center text-green-800 dark:text-green-300 font-semibold mr-3 shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Strategy Development</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Your CA develops a personalized financial strategy addressing your tax, investment, and compliance needs.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 h-8 w-8 rounded-full flex items-center justify-center text-green-800 dark:text-green-300 font-semibold mr-3 shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Implementation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We execute the agreed-upon strategy, handling tax filings, investment recommendations, and compliance requirements.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 h-8 w-8 rounded-full flex items-center justify-center text-green-800 dark:text-green-300 font-semibold mr-3 shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold mb-1">Ongoing Support</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Your CA provides regular check-ins, updates, and adjustments to your strategy as your life and financial situation evolve.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Personal CA Services</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Attention</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Receive dedicated, one-on-one support from a CA who knows your financial story and goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expertise & Qualifications</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Work with certified professionals with extensive training and experience in personal finance and taxation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Holistic Approach</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Benefit from comprehensive financial guidance that considers all aspects of your financial life.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Accessibility</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Enjoy regular access to your CA for questions, concerns, and timely financial advice.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Confidentiality</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Trust in our strict confidentiality standards to protect your sensitive financial information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-8 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready for personalized financial guidance?</h3>
              <p className="mb-8 text-lg">
                Connect with a dedicated Personal CA who will help you navigate your financial journey with confidence.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/pricing">View Personal CA Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonalCA;
