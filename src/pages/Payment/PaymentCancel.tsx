
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Payment Cancelled | Accountly";
    
    toast({
      title: "Payment Cancelled",
      description: "Your subscription payment has been cancelled. No charges were made.",
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-3">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your subscription payment was cancelled and no charges were made to your account. If you have any questions or need assistance, please contact our support team.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => navigate('/pricing')}
            >
              Return to Pricing
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

export default PaymentCancel;
