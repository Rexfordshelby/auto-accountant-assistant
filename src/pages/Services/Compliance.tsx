
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
import { CheckCircle, Shield, ClipboardCheck, Scale, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Compliance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Compliance Services</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Navigate complex regulatory environments with confidence through our comprehensive compliance solutions.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Speak to a Compliance Expert</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Industry Tabs */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Industry-Specific Compliance</h2>
          <Tabs defaultValue="financial" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="data">Data Privacy</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
            </TabsList>
            <TabsContent value="financial" className="mt-6 p-6 border rounded-md">
              <h3 className="text-xl font-semibold mb-4">Financial Compliance</h3>
              <p className="mb-4">We help organizations comply with regulations like Sarbanes-Oxley, Dodd-Frank, Basel III, and AML/KYC requirements.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Financial reporting and disclosure requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Anti-money laundering (AML) compliance programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Know Your Customer (KYC) procedures</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="healthcare" className="mt-6 p-6 border rounded-md">
              <h3 className="text-xl font-semibold mb-4">Healthcare Compliance</h3>
              <p className="mb-4">Our experts ensure adherence to HIPAA, HITECH, and other healthcare-specific regulations.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Patient data protection and privacy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Healthcare billing compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Medical records management</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="data" className="mt-6 p-6 border rounded-md">
              <h3 className="text-xl font-semibold mb-4">Data Privacy Compliance</h3>
              <p className="mb-4">We help navigate GDPR, CCPA, and other data protection regulations across jurisdictions.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Data protection impact assessments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Privacy policy development and implementation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Cross-border data transfer compliance</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="employment" className="mt-6 p-6 border rounded-md">
              <h3 className="text-xl font-semibold mb-4">Employment Compliance</h3>
              <p className="mb-4">Our services ensure adherence to labor laws, workplace safety regulations, and employment practices.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Wage and hour compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Workplace discrimination prevention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>OSHA and workplace safety compliance</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="environmental" className="mt-6 p-6 border rounded-md">
              <h3 className="text-xl font-semibold mb-4">Environmental Compliance</h3>
              <p className="mb-4">We help businesses meet environmental regulations and implement sustainable practices.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Environmental impact assessments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Emissions monitoring and reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Waste management compliance</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Services */}
        <div className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/30">
          <h2 className="text-3xl font-bold text-center mb-12">Our Compliance Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ClipboardCheck className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Compliance Assessments</CardTitle>
                <CardDescription>Evaluate your current compliance posture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive evaluations to identify compliance gaps and vulnerabilities across your organization.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Policy Development</CardTitle>
                <CardDescription>Create effective compliance frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We develop tailored policies and procedures that align with regulatory requirements and business objectives.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>Identify and mitigate compliance risks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Proactive risk assessment and mitigation strategies to prevent compliance failures before they occur.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Scale className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Regulatory Reporting</CardTitle>
                <CardDescription>Accurate and timely regulatory filings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We ensure all your regulatory reports are prepared accurately and submitted on time to avoid penalties.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Compliance Training</CardTitle>
                <CardDescription>Educate your team on regulatory requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Tailored training programs to ensure your employees understand their compliance responsibilities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ClipboardCheck className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Compliance Monitoring</CardTitle>
                <CardDescription>Ongoing supervision of compliance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Continuous monitoring and testing to ensure ongoing compliance with changing regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Compliant, Stay Competitive</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our compliance experts handle the complexity of regulations so you can focus on growing your business.
            </p>
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/contact">Schedule a Compliance Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compliance;
