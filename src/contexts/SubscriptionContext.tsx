import React, { createContext, useContext, useEffect, useState } from 'react';
import { SubscriptionService, Subscription, SubscriptionTier } from '@/services/SubscriptionService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  hasAccess: (tier: SubscriptionTier) => boolean;
  refresh: () => Promise<void>;
  upgradeSubscription: (tier: SubscriptionTier) => Promise<string | null>;
  cancelSubscription: () => Promise<boolean>;
  createOrUpdateSubscription: (tier: SubscriptionTier) => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const sub = await SubscriptionService.getCurrentSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      toast({
        title: "Error",
        description: "Could not load subscription details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSubscription();
  }, [user]);
  
  const hasAccess = (tier: SubscriptionTier): boolean => {
    return true;
  };
  
  const upgradeSubscription = async (tier: SubscriptionTier): Promise<string | null> => {
    try {
      return await SubscriptionService.createCheckoutSession(tier);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: "Could not create checkout session. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const cancelSubscription = async (): Promise<boolean> => {
    try {
      const success = await SubscriptionService.cancelSubscription();
      if (success) {
        await fetchSubscription();
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription will end at the current billing period.",
        });
      }
      return success;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description: "Could not cancel subscription. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const createOrUpdateSubscription = async (tier: SubscriptionTier): Promise<boolean> => {
    try {
      const success = await SubscriptionService.createOrUpdateSubscription(tier);
      if (success) {
        await fetchSubscription();
        toast({
          title: "Subscription Updated",
          description: `Your subscription has been upgraded to the ${tier} plan.`,
        });
      }
      return success;
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Error",
        description: "Could not update subscription. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const value = {
    subscription,
    isLoading,
    hasAccess,
    refresh: fetchSubscription,
    upgradeSubscription,
    cancelSubscription,
    createOrUpdateSubscription
  };
  
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
