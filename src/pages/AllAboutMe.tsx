
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Award,
  BookOpen,
  Briefcase,
  Code
} from 'lucide-react';

const AllAboutMe = () => {
  useEffect(() => {
    document.title = "About Me | Accountly";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi, I'm John Smith</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Accounting professional with a passion for building software that makes financial management easier.
              </p>
              
              <div className="flex justify-center mt-6 space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="w-full md:w-1/3">
                <img 
                  src="/placeholder.svg" 
                  alt="Portrait of John Smith" 
                  className="rounded-lg w-full object-cover aspect-square shadow-md"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <p className="mb-4">
                  I'm an accounting professional with over 10 years of experience in financial management, tax preparation, and business advisory. I've worked with businesses of all sizes, from startups to Fortune 500 companies.
                </p>
                <p className="mb-4">
                  My passion is at the intersection of accounting and technology. I believe that the right tools can transform how businesses manage their finances, making the process more efficient, insightful, and even enjoyable.
                </p>
                <p>
                  This led me to create Accountly - a platform that combines my expertise in accounting with modern technology to provide businesses with an all-in-one solution for their financial needs.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Professional Experience</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Financial Director</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">ABC Financial Services | 2018 - Present</p>
                      <p>
                        Led a team of 15 accountants and financial analysts, managing finances for clients across multiple industries. Implemented new technology solutions that reduced reporting time by 40%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Senior Accountant</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">XYZ Consulting | 2013 - 2018</p>
                      <p>
                        Managed accounting operations for 50+ clients, specializing in tax optimization and financial reporting. Recognized for developing client-specific financial models that increased profitability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Tax Consultant</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Big Four Accounting Firm | 2010 - 2013</p>
                      <p>
                        Provided tax planning and compliance services to corporate clients. Specialized in identifying tax-saving opportunities and ensuring regulatory compliance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Education & Certifications</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">MBA, Finance</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Harvard Business School | 2008 - 2010</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">BS, Accounting</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">University of Pennsylvania | 2004 - 2008</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Certified Public Accountant (CPA)</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Licensed since 2009</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Certified Financial Planner (CFP)</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Licensed since 2012</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Tax Planning</h3>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Financial Reporting</h3>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Advisory Services</h3>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Compliance</h3>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Financial Analysis</h3>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <Code className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Technology Integration</h3>
              </div>
            </div>
          </section>
          
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Have questions about accounting, tax planning, or how Accountly can help your business? I'd love to hear from you!
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8">
                Contact Me
              </Button>
            </Link>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllAboutMe;
