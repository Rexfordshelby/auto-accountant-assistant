
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SubscriptionTier } from '@/services/SubscriptionService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from 'lucide-react';
import { AuthGuard } from '@/components/AuthGuard';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createOrUpdateSubscription } = useSubscription();
  const [processing, setProcessing] = useState(true);
  
  useEffect(() => {
    document.title = "Payment Successful | Accountly";
    
    const processSubscription = async () => {
      const tier = searchParams.get('tier') as SubscriptionTier;
      
      if (!tier) {
        toast({
          title: "Error",
          description: "Missing subscription information. Please contact support.",
          variant: "destructive"
        });
        setProcessing(false);
        return;
      }
      
      try {
        const success = await createOrUpdateSubscription(tier);
        
        if (success) {
          toast({
            title: "Subscription Activated",
            description: `Your ${tier} subscription has been successfully activated.`,
          });
        } else {
          throw new Error("Could not create subscription");
        }
      } catch (error) {
        console.error("Error processing subscription:", error);
        toast({
          title: "Error",
          description: "There was a problem activating your subscription. Please contact support.",
          variant: "destructive"
        });
      } finally {
        setProcessing(false);
      }
    };
    
    processSubscription();
  }, []);
  
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow pt-28 pb-16 px-6 flex items-center justify-center">
          <div className="max-w-lg w-full text-center">
            {processing ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <h2 className="text-xl font-medium mb-2">Processing Your Subscription</h2>
                <p className="text-gray-600">Please wait while we activate your subscription...</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-semibold mb-3">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                  Thank you for your subscription! Your account has been upgraded and you now have access to premium features.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
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
              </>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default PaymentSuccess;
