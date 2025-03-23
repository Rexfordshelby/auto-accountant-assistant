
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refresh } = useSubscription();
  
  useEffect(() => {
    document.title = "Payment Successful | Accountly";
    
    // In a real implementation, we would verify the payment with Stripe
    // and then update the subscription in the database
    
    // Refresh subscription data
    refresh();
    
    toast({
      title: "Payment Successful",
      description: `Your subscription to the ${tier} plan has been activated.`,
    });
  }, [tier]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-3">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for subscribing to our {tier} plan. Your account has been updated and you now have access to all the features included in your subscription.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
