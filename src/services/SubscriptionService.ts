
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
    
    // First try to get the subscription from Supabase
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();
      
    if (data) {
      // Ensure tier and status are properly typed
      return {
        ...data,
        tier: data.tier as SubscriptionTier,
        status: data.status as 'active' | 'canceled' | 'past_due'
      };
    }
    
    // If no subscription in database, check with Stripe via Edge Function
    try {
      const { data: response } = await supabase.functions.invoke('check-subscription');
      
      if (response.subscribed) {
        // Create a subscription record in our database
        const subData = {
          user_id: user.id,
          tier: response.tier,
          status: 'active',
          current_period_end: response.current_period_end,
          cancel_at_period_end: response.cancel_at_period_end
        };
        
        await supabase.from('subscriptions').upsert(subData);
        
        return {
          id: '', // This will be filled in by the database
          created_at: new Date().toISOString(),
          ...subData
        };
      }
    } catch (err) {
      console.error("Error checking subscription with Stripe:", err);
    }
    
    return null;
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
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier }
      });
      
      if (error) throw error;
      return data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return null;
    }
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
  },
  
  /**
   * Create a test premium account with enterprise tier
   * For demonstration purposes only
   */
  async createPremiumTestAccount(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // 1. Create the user account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: 'Premium Test User',
            business_type: 'corporation'
          }
        }
      });
      
      if (signUpError) {
        console.error("Error creating test user:", signUpError);
        return { 
          success: false, 
          message: signUpError.message 
        };
      }
      
      if (!signUpData.user) {
        return { 
          success: false, 
          message: "Failed to create user" 
        };
      }
      
      // 2. Create a premium subscription for this user
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: signUpData.user.id,
          tier: 'enterprise', // Set to enterprise tier (highest)
          status: 'active',
          current_period_end: thirtyDaysFromNow.toISOString(),
          cancel_at_period_end: false
        });
        
      if (subscriptionError) {
        console.error("Error creating subscription:", subscriptionError);
        return { 
          success: false, 
          message: "Account created but failed to add premium subscription: " + subscriptionError.message 
        };
      }
      
      return { 
        success: true, 
        message: "Premium test account created successfully" 
      };
    } catch (error) {
      console.error("Unexpected error creating premium account:", error);
      return { 
        success: false, 
        message: `Unexpected error: ${error.message}` 
      };
    }
  }
};
