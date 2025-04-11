
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanProps {
  name: string;
  price: number;
  tier: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
}

const Plan: React.FC<PlanProps> = ({ 
  name, 
  price, 
  tier, 
  description, 
  features, 
  popular = false,
  current = false
}) => {
  const navigate = useNavigate();
  const { subscription, upgradeSubscription } = useSubscription();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubscribe = async () => {
    if (current) {
      toast({
        title: "Current Plan",
        description: `You are already subscribed to the ${name} plan.`,
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const checkoutUrl = await upgradeSubscription(tier);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Could not generate checkout URL");
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast({
        title: "Checkout Error",
        description: "There was an error starting the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className={`${popular ? 'border-blue-500 shadow-blue-100 shadow-md' : ''}`}>
      <CardHeader>
        {popular && <Badge className="absolute right-4 top-4 bg-blue-500">Popular</Badge>}
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={feature.included ? '' : 'text-gray-400 line-through'}>{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={current ? "outline" : popular ? "default" : "secondary"}
          disabled={isLoading || current}
          onClick={handleSubscribe}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : current ? (
            "Current Plan"
          ) : (
            "Subscribe"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const SubscriptionPlans = () => {
  const { subscription } = useSubscription();
  
  const plans = [
    {
      name: "Free",
      price: 0,
      tier: "free",
      description: "Basic features for individuals",
      features: [
        { name: "Basic reporting", included: true },
        { name: "Tax calculator (basic)", included: true },
        { name: "View invoices", included: true },
        { name: "Basic expense tracking", included: true },
        { name: "Email support", included: true },
        { name: "Advanced reporting", included: false },
        { name: "Create invoices", included: false },
        { name: "Financial forecasting", included: false },
      ],
    },
    {
      name: "Starter",
      price: 29,
      tier: "starter",
      description: "Essential tools for small businesses",
      popular: true,
      features: [
        { name: "Basic reporting", included: true },
        { name: "Tax calculator (basic)", included: true },
        { name: "View invoices", included: true },
        { name: "Basic expense tracking", included: true },
        { name: "Email support", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Create invoices", included: true },
        { name: "Financial forecasting", included: false },
      ],
    },
    {
      name: "Professional",
      price: 79,
      tier: "professional",
      description: "Advanced features for growing businesses",
      features: [
        { name: "Basic reporting", included: true },
        { name: "Tax calculator (basic)", included: true },
        { name: "View invoices", included: true },
        { name: "Basic expense tracking", included: true },
        { name: "Email support", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Create invoices", included: true },
        { name: "Financial forecasting", included: true },
        { name: "Tax calculator (advanced)", included: true },
        { name: "Priority support", included: true },
      ],
    },
    {
      name: "Enterprise",
      price: 199,
      tier: "enterprise",
      description: "Complete solution for larger organizations",
      features: [
        { name: "All Professional features", included: true },
        { name: "Custom API integration", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Advanced security features", included: true },
        { name: "Custom reporting", included: true },
        { name: "Compliance assistance", included: true },
        { name: "Multi-user access", included: true },
      ],
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
      {plans.map((plan) => (
        <Plan
          key={plan.tier}
          {...plan}
          current={subscription?.tier === plan.tier}
        />
      ))}
    </div>
  );
};

export default SubscriptionPlans;
