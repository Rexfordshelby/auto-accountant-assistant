
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
  
  'advanced-reports': 'free', // Changed from 'starter' to 'free'
  'invoice-create': 'free', // Changed from 'starter' to 'free'
  'expense-tracking-advanced': 'free', // Changed from 'starter' to 'free'
  'client-management': 'free', // Changed from 'starter' to 'free'
  
  'tax-calculator-advanced': 'free', // Changed from 'professional' to 'free'
  'financial-forecasting': 'free', // Changed from 'professional' to 'free'
  'multi-user': 'free', // Changed from 'professional' to 'free'
  'priority-support': 'free', // Changed from 'professional' to 'free'
  
  'custom-api': 'free', // Changed from 'enterprise' to 'free'
  'dedicated-account-manager': 'free', // Changed from 'enterprise' to 'free'
  'compliance-reporting': 'free', // Changed from 'enterprise' to 'free'
  'advanced-security': 'free', // Changed from 'enterprise' to 'free'
};

export const SubscriptionService = {
  /**
   * Get the current user's subscription
   */
  async getCurrentSubscription(): Promise<Subscription | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // Always return an enterprise subscription for testing
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return {
      id: 'test-subscription',
      user_id: user.id,
      tier: 'enterprise', // Always return enterprise tier
      status: 'active',
      created_at: new Date().toISOString(),
      current_period_end: thirtyDaysFromNow.toISOString(),
      cancel_at_period_end: false
    };
  },
  
  /**
   * Check if the current user has access to a specific feature
   */
  async hasAccess(requiredTier: SubscriptionTier): Promise<boolean> {
    // Always return true for testing
    return true;
  },
  
  /**
   * Create a checkout session for the specified tier
   */
  async createCheckoutSession(tier: SubscriptionTier): Promise<string | null> {
    // In testing mode, simulate a successful subscription without payment
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // Automatically create a subscription record
    await this.createOrUpdateSubscription(tier);
    
    // Return the success URL directly
    return `${window.location.origin}/payment-success?tier=${tier}`;
  },
  
  /**
   * Cancel the current subscription at period end
   */
  async cancelSubscription(): Promise<boolean> {
    // Always succeed in test mode
    return true;
  },
  
  /**
   * Create or update a subscription for a user (would be called after successful payment)
   */
  async createOrUpdateSubscription(tier: SubscriptionTier): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // In test mode, we'll still create a record but it's not necessary for access
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        tier: tier,
        status: 'active',
        current_period_end: thirtyDaysFromNow.toISOString(),
        cancel_at_period_end: false
      });
      
    return !error;
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
