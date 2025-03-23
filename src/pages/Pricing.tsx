
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle2, Loader2 } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumbers';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  popular = false,
  tier,
  delay = 0
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { subscription, upgradeSubscription } = useSubscription();
  const [loading, setLoading] = useState(false);
  
  const isCurrentPlan = subscription?.tier === tier;
  
  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login?redirect=/pricing');
      return;
    }
    
    if (isCurrentPlan) {
      toast({
        title: "Current Plan",
        description: `You are already subscribed to the ${name} plan.`,
      });
      return;
    }
    
    setLoading(true);
    try {
      const checkoutUrl = await upgradeSubscription(tier);
      if (checkoutUrl) {
        navigate(checkoutUrl);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`relative rounded-2xl p-8 border shadow-sm animate-on-scroll hover-lift ${
        popular 
          ? "bg-black text-white border-black" 
          : "bg-white border-gray-200"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm py-1 px-3 rounded-full font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <p className={`${popular ? "text-gray-300" : "text-gray-600"} mb-4`}>{description}</p>
      <div className="my-6 flex items-end">
        <span className="text-4xl font-semibold">$</span>
        <AnimatedNumber 
          value={price} 
          className="text-5xl font-semibold" 
          formatter={(val) => val.toFixed(0)}
        />
        <span className={`${popular ? "text-gray-300" : "text-gray-500"}`}>/month</span>
      </div>
      <ul className="space-y-3 text-left mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleSubscribe}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 rounded-lg font-medium text-center transition-colors ${
          popular
            ? "bg-white text-black hover:bg-gray-100"
            : "border border-black hover:bg-black hover:text-white"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : isCurrentPlan ? (
          "Current Plan"
        ) : (
          `Subscribe to ${name}`
        )}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  useEffect(() => {
    document.title = "Pricing | Accountly";
    
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

  const calculatePrice = (basePrice) => {
    return isAnnual ? Math.round(basePrice * 0.8) : basePrice;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 animate-on-scroll visible">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-on-scroll visible" style={{ transitionDelay: '100ms' }}>
            Choose the perfect plan for your business needs with no hidden fees
          </p>
          
          <div className="flex justify-center mb-12 animate-on-scroll visible" style={{ transitionDelay: '200ms' }}>
            <div className="bg-gray-100 p-1 rounded-full flex">
              <button 
                className={`px-6 py-2 rounded-full ${!isAnnual ? 'bg-white shadow' : 'text-gray-700'}`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-full ${isAnnual ? 'bg-white shadow' : 'text-gray-700'}`}
                onClick={() => setIsAnnual(true)}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingTier
              name="Starter"
              price={calculatePrice(29)}
              description="For freelancers and small businesses"
              tier="starter"
              features={[
                "Expense tracking",
                "Basic reports",
                "Invoice creation",
                "Mobile app access",
                "Email support"
              ]}
              delay={300}
            />
            
            <PricingTier
              name="Professional"
              price={calculatePrice(79)}
              description="For growing businesses"
              tier="professional"
              features={[
                "Everything in Starter",
                "Advanced reporting",
                "Tax preparation",
                "Financial forecasting",
                "Multi-user access",
                "Priority support"
              ]}
              popular={true}
              delay={400}
            />
            
            <PricingTier
              name="Enterprise"
              price={calculatePrice(199)}
              description="For larger organizations"
              tier="enterprise"
              features={[
                "Everything in Professional",
                "Custom API integration",
                "Dedicated account manager",
                "Customizable dashboard",
                "Advanced security features",
                "Compliance reporting"
              ]}
              delay={500}
            />
          </div>
          
          <div className="mt-20 bg-gray-50 rounded-2xl p-10 text-left animate-on-scroll">
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect on your next billing cycle.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a setup fee?</h3>
                <p className="text-gray-600">No, there are no setup fees for any of our plans. You only pay the advertised monthly or annual rate.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, debit cards, and PayPal. For Enterprise plans, we can also arrange bank transfers.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Is my data safe?</h3>
                <p className="text-gray-600">Yes, we use bank-level encryption to protect your data. All information is stored on secure servers with regular backups.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
