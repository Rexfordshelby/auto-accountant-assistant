
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscriptionPlans from '../components/SubscriptionPlans';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing | Accountly";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Alert className="mb-12 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 max-w-3xl mx-auto">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Investor Demo Mode Active</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              All features are currently available for demonstration purposes. 
              In this demo, you can navigate through the subscription process without real payments.
            </AlertDescription>
          </Alert>
          
          <h1 className="text-5xl md:text-6xl font-semibold mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Choose the perfect plan for your business needs with no hidden fees
          </p>
          
          <SubscriptionPlans />
          
          <div className="mt-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-10 text-left">
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I change plans later?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect on your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a setup fee?</AccordionTrigger>
                <AccordionContent>
                  No, there are no setup fees for any of our plans. You only pay the advertised monthly rate.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support payments via Stripe.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data safe?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use bank-level encryption to protect your data. All information is stored on secure servers with regular backups and strict access controls.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I get a refund if I'm not satisfied?</AccordionTrigger>
                <AccordionContent>
                  We offer a 14-day money-back guarantee if you're not completely satisfied with our service. Contact our support team within 14 days of your purchase for a full refund.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Do you offer discounts for annual billing?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 20% discount when you choose annual billing on any of our paid plans. This discount is automatically applied when you select annual billing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
