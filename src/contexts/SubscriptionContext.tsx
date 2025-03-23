
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SubscriptionService, Subscription, SubscriptionTier } from '@/services/SubscriptionService';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  hasAccess: (tier: SubscriptionTier) => boolean;
  refresh: () => Promise<void>;
  upgradeSubscription: (tier: SubscriptionTier) => Promise<string | null>;
  cancelSubscription: () => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const sub = await SubscriptionService.getCurrentSubscription();
    setSubscription(sub);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchSubscription();
  }, [user]);
  
  const hasAccess = (tier: SubscriptionTier): boolean => {
    if (!subscription) return tier === 'free';
    
    const tierLevels = {
      'free': 0,
      'starter': 1,
      'professional': 2,
      'enterprise': 3
    };
    
    return tierLevels[subscription.tier] >= tierLevels[tier];
  };
  
  const upgradeSubscription = async (tier: SubscriptionTier): Promise<string | null> => {
    return SubscriptionService.createCheckoutSession(tier);
  };
  
  const cancelSubscription = async (): Promise<boolean> => {
    const success = await SubscriptionService.cancelSubscription();
    if (success) {
      fetchSubscription();
    }
    return success;
  };
  
  const value = {
    subscription,
    isLoading,
    hasAccess,
    refresh: fetchSubscription,
    upgradeSubscription,
    cancelSubscription
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
