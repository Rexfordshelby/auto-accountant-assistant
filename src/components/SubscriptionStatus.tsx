
import React from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';

const SubscriptionStatus = () => {
  const { subscription, cancelSubscription } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCancelSubscription = async () => {
    const confirmed = window.confirm("Are you sure you want to cancel your subscription? You'll still have access until the end of your billing period.");
    
    if (confirmed) {
      const success = await cancelSubscription();
      
      if (success) {
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription will end at the current billing period.",
        });
      } else {
        toast({
          title: "Error",
          description: "There was a problem cancelling your subscription. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>You don't have an active subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Upgrade to a paid plan to access premium features and get more from Accountly.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/pricing')}>View Plans</Button>
        </CardFooter>
      </Card>
    );
  }
  
  const endDate = new Date(subscription.current_period_end);
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Subscription</CardTitle>
          <Badge variant={subscription.cancel_at_period_end ? "destructive" : "default"}>
            {subscription.cancel_at_period_end ? "Cancelling" : "Active"}
          </Badge>
        </div>
        <CardDescription>
          {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              {subscription.cancel_at_period_end 
                ? "Your subscription will not renew" 
                : "Your subscription renews automatically"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              {subscription.cancel_at_period_end 
                ? `Access until ${formattedEndDate}` 
                : `Next billing date: ${formattedEndDate}`}
            </span>
          </div>
          
          {subscription.cancel_at_period_end && (
            <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800">
                  Your subscription will end on {formattedEndDate}. After this date, you'll lose access to premium features.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/pricing')}>
          {subscription.cancel_at_period_end ? "Reactivate" : "Change Plan"}
        </Button>
        
        {!subscription.cancel_at_period_end && (
          <Button variant="destructive" onClick={handleCancelSubscription}>
            Cancel Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionStatus;
