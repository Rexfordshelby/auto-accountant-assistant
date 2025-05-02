
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
import { CheckCircle, FileSearch, Shield, BarChart2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Audit = () => {
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

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to ensure your financial integrity?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of certified auditors is ready to help you maintain transparency and compliance.
            </p>
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/contact">Contact Our Audit Team</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Audit;
