
import { supabase } from "@/lib/supabase";

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due';
  created_at: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export const SubscriptionService = {
  /**
   * Get the current user's subscription
   */
  async getCurrentSubscription(): Promise<Subscription | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching subscription:", error);
      return null;
    }
    
    return data;
  },
  
  /**
   * Check if the current user has access to a specific feature
   */
  async hasAccess(requiredTier: SubscriptionTier): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    
    if (!subscription) return false;
    
    const tierLevels = {
      'free': 0,
      'starter': 1,
      'professional': 2,
      'enterprise': 3
    };
    
    return tierLevels[subscription.tier] >= tierLevels[requiredTier];
  },
  
  /**
   * Create a checkout session for the specified tier
   */
  async createCheckoutSession(tier: SubscriptionTier): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // This would normally call a Supabase Edge Function that creates a Stripe checkout session
    // For now, we'll mock it with a redirect URL
    const checkoutUrl = `/payment-success?tier=${tier}`;
    return checkoutUrl;
  },
  
  /**
   * Cancel the current subscription at period end
   */
  async cancelSubscription(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    const { error } = await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: true })
      .eq('user_id', user.id)
      .eq('status', 'active');
      
    return !error;
  }
};
