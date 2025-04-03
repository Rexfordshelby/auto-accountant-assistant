
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Book, BarChart2, Code, User, Star, Coffee } from 'lucide-react';

const AllAboutMe = () => {
  useEffect(() => {
    document.title = "All About Me | Accountly";
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              About Me
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold mb-6">Accountly</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              The all-in-one accounting platform for modern businesses
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Star className="h-4 w-4" /> About
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" /> Features
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Services
              </TabsTrigger>
              <TabsTrigger value="technology" className="flex items-center gap-2">
                <Code className="h-4 w-4" /> Technology
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Team
              </TabsTrigger>
              <TabsTrigger value="story" className="flex items-center gap-2">
                <Book className="h-4 w-4" /> Story
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6 animate-fade-in">
              <div className="prose prose-lg max-w-none">
                <h2>About Accountly</h2>
                <p>
                  Accountly is a comprehensive accounting platform designed for modern businesses. Our mission is to simplify financial management through intuitive software and expert support.
                </p>
                <p>
                  Founded in 2020, we've grown to serve thousands of businesses worldwide, helping them streamline their financial operations and make better business decisions.
                </p>
                <h3>Our Vision</h3>
                <p>
                  To democratize access to professional financial tools and expertise, empowering businesses of all sizes to thrive in today's economy.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Financial Dashboard</h3>
                    <p className="text-muted-foreground">
                      Real-time overview of your financial health with customizable widgets and reports.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Expense Tracking</h3>
                    <p className="text-muted-foreground">
                      Automated expense categorization and receipt scanning for effortless record-keeping.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Tax Preparation</h3>
                    <p className="text-muted-foreground">
                      Simplified tax filing with built-in compliance checks and deadline reminders.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Invoicing</h3>
                    <p className="text-muted-foreground">
                      Professional invoice creation and automated payment tracking.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Financial Reports</h3>
                    <p className="text-muted-foreground">
                      Comprehensive reporting tools for income statements, balance sheets, and cash flow.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">AI Assistant</h3>
                    <p className="text-muted-foreground">
                      Intelligent chatbot to answer financial questions and provide insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="space-y-6 animate-fade-in">
              <div className="prose prose-lg max-w-none">
                <h2>Our Services</h2>
                <p>
                  Accountly offers a range of professional services to complement our software platform:
                </p>
                <ul>
                  <li><strong>Tax Advisory:</strong> Expert guidance on tax planning and optimization strategies.</li>
                  <li><strong>Financial Consulting:</strong> Professional advice on financial management and growth strategies.</li>
                  <li><strong>Audit Support:</strong> Assistance with preparing for and navigating financial audits.</li>
                  <li><strong>Compliance Services:</strong> Help ensuring adherence to relevant financial regulations.</li>
                  <li><strong>CFO Services:</strong> Fractional CFO support for strategic financial leadership.</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="space-y-6 animate-fade-in">
              <div className="prose prose-lg max-w-none">
                <h2>Our Technology</h2>
                <p>
                  Accountly is built on cutting-edge technology to provide a secure, reliable, and powerful platform:
                </p>
                <ul>
                  <li><strong>React & TypeScript:</strong> For a responsive and type-safe frontend experience.</li>
                  <li><strong>Tailwind CSS:</strong> Modern utility-first CSS framework for sleek UI design.</li>
                  <li><strong>Supabase:</strong> Firebase alternative with PostgreSQL database for robust backend services.</li>
                  <li><strong>AI Integration:</strong> Machine learning algorithms for intelligent financial insights.</li>
                  <li><strong>Bank-Level Security:</strong> End-to-end encryption and secure data practices.</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-1">Jane Doe</h3>
                    <p className="text-muted-foreground text-sm mb-3">CEO & Co-Founder</p>
                    <p className="text-sm">Former Big Four accountant with 15+ years experience in financial services.</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-1">John Smith</h3>
                    <p className="text-muted-foreground text-sm mb-3">CTO & Co-Founder</p>
                    <p className="text-sm">Tech entrepreneur with a background in fintech and AI solutions.</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-1">Emily Chen</h3>
                    <p className="text-muted-foreground text-sm mb-3">Head of Product</p>
                    <p className="text-sm">Product leader with experience at top SaaS companies.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="story" className="space-y-6 animate-fade-in">
              <div className="prose prose-lg max-w-none">
                <h2>Our Story</h2>
                <p>
                  Accountly was founded in 2020 by Jane Doe and John Smith, who met while working at a major accounting firm. They witnessed firsthand how small and medium-sized businesses struggled with complex accounting software that was either too basic or too complex.
                </p>
                <p>
                  Their vision was simple: create an accounting platform that combines the power of enterprise solutions with the simplicity and affordability needed by smaller businesses.
                </p>
                <p>
                  Starting with a small team of five people, Accountly has now grown to over 100 employees serving thousands of clients globally. Our journey has been marked by continuous innovation and a steadfast commitment to our customers' success.
                </p>
                <h3>Key Milestones</h3>
                <ul>
                  <li><strong>2020:</strong> Accountly founded and initial funding secured.</li>
                  <li><strong>2021:</strong> Launch of core accounting platform and first 1,000 customers.</li>
                  <li><strong>2022:</strong> Introduction of AI-powered financial insights and tax advisory services.</li>
                  <li><strong>2023:</strong> Expansion to international markets and integration with major banking platforms.</li>
                  <li><strong>2024:</strong> Launch of mobile app and enterprise solutions for larger businesses.</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to transform your financial management?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Accountly for their accounting needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AllAboutMe;
