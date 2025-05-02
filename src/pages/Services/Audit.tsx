
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CheckCircle, 
  FileSearch, 
  Shield, 
  BarChart2, 
  BookOpen, 
  ArrowRight,
  Users,
  Building,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Audit = () => {
  // Add scroll to top effect when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Audit Services</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Comprehensive audit solutions to ensure compliance, transparency, and financial integrity for your business.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Audit Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileSearch className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Financial Statement Audits</CardTitle>
                <CardDescription>Thorough examination of financial records and statements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our financial statement audits provide assurance that your financial records are accurate and comply with accounting standards, building trust with stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Compliance Audits</CardTitle>
                <CardDescription>Ensure adherence to regulations and internal policies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We verify that your operations comply with relevant laws, regulations, and internal policies to reduce risk and avoid penalties.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart2 className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Operational Audits</CardTitle>
                <CardDescription>Evaluate efficiency and effectiveness of operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our operational audits identify inefficiencies and recommend improvements to optimize your business processes and resource utilization.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Internal Audits</CardTitle>
                <CardDescription>Strengthen internal controls and governance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We help establish robust internal audit functions to continuously monitor controls, identify risks, and improve corporate governance.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Due Diligence</CardTitle>
                <CardDescription>Thorough investigation for mergers and acquisitions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our due diligence services provide comprehensive financial and operational analysis to support informed decision-making in transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileSearch className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Fraud Investigation</CardTitle>
                <CardDescription>Detect and prevent fraudulent activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We help identify, investigate, and resolve instances of fraud or financial misconduct, and implement controls to prevent future occurrences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Industry Specialization */}
        <div className="bg-gray-50 dark:bg-gray-800/20 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Industry Specialization</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Financial Services</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Specialized audit services for banks, insurance companies, investment firms, and other financial institutions, 
                    ensuring compliance with industry-specific regulations and standards.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <BadgeCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive audit solutions for healthcare providers, addressing unique challenges in revenue cycle, 
                    compliance with healthcare regulations, and third-party reimbursements.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Non-Profit Organizations</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tailored audit services for non-profits, focusing on donor fund accountability, 
                    program effectiveness, and compliance with grant requirements and tax exemption standards.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Technology & SaaS</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Specialized audit expertise for technology companies, addressing revenue recognition, 
                    intellectual property valuation, and compliance with data protection regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approach Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Audit Approach</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Planning & Risk Assessment</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We begin with a thorough understanding of your business, industry, and objectives to identify key risks and determine audit focus areas.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Internal Control Evaluation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team assesses the design and operational effectiveness of internal controls to identify strengths and weaknesses in your financial reporting processes.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Substantive Testing</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We perform detailed analysis and verification of transactions, account balances, and financial statement disclosures to ensure accuracy and completeness.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reporting & Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We deliver clear, actionable reports with practical recommendations to enhance financial reporting, compliance, and operational efficiency.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild>
                <Link to="/services/audit-methodology" className="flex items-center gap-2">
                  Learn More About Our Methodology
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to ensure your financial integrity?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of certified auditors is ready to help you maintain transparency and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link to="/contact">Contact Our Audit Team</Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-white border border-white hover:bg-blue-700" asChild>
                <Link to="/resources/audit-guide">Download Audit Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Audit;
