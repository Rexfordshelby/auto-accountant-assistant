
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
  
  // Always grant access to all tiers during testing mode
  const hasAccess = (tier: SubscriptionTier): boolean => {
    return true; // In demo mode, always allow access
  };
  
  const upgradeSubscription = async (tier: SubscriptionTier): Promise<string | null> => {
    try {
      const checkoutUrl = await SubscriptionService.createCheckoutSession(tier);
      
      // In demo mode, if no URL is returned, we just simulate success
      if (!checkoutUrl) {
        await SubscriptionService.createOrUpdateSubscription(tier);
        await fetchSubscription();
        toast({
          title: "Demo Mode",
          description: `Your subscription has been upgraded to ${tier} in demo mode.`,
        });
      }
      
      return checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Demo Mode",
        description: "In production, this would create a real checkout session.",
      });
      
      // In demo mode, create a subscription record even if there's an error
      await SubscriptionService.createOrUpdateSubscription(tier);
      await fetchSubscription();
      
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
        title: "Demo Mode",
        description: "In production, this would cancel your real subscription.",
      });
      return true; // In demo mode, simulates success
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
        title: "Demo Mode",
        description: "In production, this would update your real subscription.",
      });
      return true; // In demo mode, simulates success
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
