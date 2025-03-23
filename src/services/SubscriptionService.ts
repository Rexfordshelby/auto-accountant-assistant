
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

// Map features to the minimum subscription tier required
export const featureTierMap = {
  'basic-reports': 'free',
  'expense-tracking-basic': 'free',
  'invoice-view': 'free',
  'tax-calculator-basic': 'free',
  
  'advanced-reports': 'starter',
  'invoice-create': 'starter',
  'expense-tracking-advanced': 'starter',
  'client-management': 'starter',
  
  'tax-calculator-advanced': 'professional',
  'financial-forecasting': 'professional',
  'multi-user': 'professional',
  'priority-support': 'professional',
  
  'custom-api': 'enterprise',
  'dedicated-account-manager': 'enterprise',
  'compliance-reporting': 'enterprise',
  'advanced-security': 'enterprise',
};

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
    
    if (!data) return null;
    
    // Ensure tier and status are properly typed
    return {
      ...data,
      tier: data.tier as SubscriptionTier,
      status: data.status as 'active' | 'canceled' | 'past_due'
    };
  },
  
  /**
   * Check if the current user has access to a specific feature
   */
  async hasAccess(requiredTier: SubscriptionTier): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    
    if (!subscription) return requiredTier === 'free';
    
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
    
    // In a real application, this would call a Supabase Edge Function 
    // that creates a Stripe checkout session
    
    // For now, we'll mock it with a redirect URL for demo purposes
    // In production, replace this with your actual payment gateway integration
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
  },
  
  /**
   * Create or update a subscription for a user (would be called after successful payment)
   */
  async createOrUpdateSubscription(tier: SubscriptionTier): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // Check if user already has a subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    if (existingSubscription) {
      // Update existing subscription
      const { error } = await supabase
        .from('subscriptions')
        .update({
          tier,
          status: 'active',
          current_period_end: thirtyDaysFromNow.toISOString(),
          cancel_at_period_end: false
        })
        .eq('id', existingSubscription.id);
        
      return !error;
    } else {
      // Create new subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          tier,
          status: 'active',
          current_period_end: thirtyDaysFromNow.toISOString(),
          cancel_at_period_end: false
        });
        
      return !error;
    }
  }
};
