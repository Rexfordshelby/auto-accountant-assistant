
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BookOpen, Calculator, TrendingUp, BarChart2, FileText, ChartBar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TaxSystemInfo from '@/components/TaxSystemInfo';

const Accounting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl font-bold mb-6">Professional Accounting Services</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Comprehensive accounting solutions customized for your business needs, from bookkeeping to strategic financial planning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="max-w-md">
                  <TaxSystemInfo showDetailedInfo={false} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Accounting Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Bookkeeping</CardTitle>
                <CardDescription>Accurate financial record keeping</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our comprehensive bookkeeping services ensure your financial records are accurate, up-to-date, and organized, giving you a clear picture of your financial health.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Tax Preparation</CardTitle>
                <CardDescription>Maximize returns and ensure compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our tax experts help you navigate complex tax codes to minimize tax liability while ensuring full compliance with all applicable regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>Plan for future growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our forecasting tools and expertise help you create realistic financial projections to guide strategic decision-making and growth planning.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ChartBar className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Financial Statement Preparation</CardTitle>
                <CardDescription>Clear insights into your financial position</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We prepare accurate financial statements including balance sheets, income statements, and cash flow statements that provide clear insights into your business's financial health.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart2 className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Business Advisory</CardTitle>
                <CardDescription>Strategic guidance for growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our experienced advisors provide strategic insights and recommendations to help your business navigate challenges and capitalize on growth opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Payroll Services</CardTitle>
                <CardDescription>Streamline your employee payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our comprehensive payroll services handle everything from calculating wages and tax withholdings to generating paystubs and filing required reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/30">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How often should I update my books?</AccordionTrigger>
                <AccordionContent>
                  For most businesses, we recommend weekly or bi-weekly bookkeeping to maintain accurate records and catch potential issues early. However, depending on your business volume, monthly updates may be sufficient. We'll help determine the optimal schedule for your specific needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you work with specific accounting software?</AccordionTrigger>
                <AccordionContent>
                  Yes, we're proficient with a wide range of accounting software including QuickBooks, Xero, FreshBooks, Sage, and many others. If you have a preferred system, we can adapt to it, or we can recommend the best solution for your business type and size.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between an accountant and a bookkeeper?</AccordionTrigger>
                <AccordionContent>
                  Bookkeepers primarily record and organize financial transactions, while accountants analyze, interpret, and report on that data. Accountants also provide strategic guidance, tax planning, and ensure compliance with regulatory requirements. Our team includes both professionals to provide comprehensive financial services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can you help with tax planning throughout the year?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Proactive tax planning is one of our specialties. Rather than only focusing on tax preparation at year-end, we work with clients year-round to implement strategies that minimize tax liability legally and efficiently.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do you handle client confidentiality?</AccordionTrigger>
                <AccordionContent>
                  We take confidentiality extremely seriously. All client information is protected with industry-standard security measures, and our staff adheres to strict confidentiality policies. We implement secure technology solutions and regular security audits to ensure your financial data remains private.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your financial management?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our team of experienced accountants help you streamline your finances and focus on growing your business.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-blue-700" asChild>
                <Link to="/tools/tax-calculator">Try Our Tax Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Accounting;
