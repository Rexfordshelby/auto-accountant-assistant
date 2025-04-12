
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

serve(async (req) => {
  try {
    // Initialize Stripe with your secret key
    const stripe = new Stripe("sk_test_51RCdKmQvBO9bv1fpDy6rcnWH4GWeQDLovcSq2SSBm6srQxyLcErD4S4CAs4X8EPkjaBeewHDBj8vVIbYbtq0pt4M005oP3ssin", {
      apiVersion: "2023-10-16",
    });
    
    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No signature provided");
    }
    
    // Get the raw body
    const body = await req.text();
    
    // Verify the event
    // Note: You'll need to configure STRIPE_WEBHOOK_SECRET in your Supabase Edge Functions
    // For now, we'll use a placeholder - you should set this up in Stripe Dashboard
    const webhookSecret = "whsec_PLACEHOLDER_REPLACE_WITH_YOUR_WEBHOOK_SECRET";
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    // Handle different event types
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        // Extract user_id from customer metadata
        const userId = customer.metadata.user_id;
        
        if (!userId) {
          console.error("No user_id found in customer metadata");
          break;
        }
        
        // Determine subscription tier
        let tier = "starter";
        const items = subscription.items.data;
        if (items.length > 0) {
          const product = await stripe.products.retrieve(items[0].price.product as string);
          tier = product.metadata.tier || "starter";
        }
        
        // Update or create subscription record in database
        const { error } = await supabaseClient
          .from("subscriptions")
          .upsert({
            user_id: userId,
            status: subscription.status,
            tier: tier,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          });
        
        if (error) {
          console.error("Error updating subscription in database:", error);
        }
        break;
        
      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        const deletedCustomer = await stripe.customers.retrieve(deletedSubscription.customer as string);
        const deletedUserId = deletedCustomer.metadata.user_id;
        
        if (!deletedUserId) {
          console.error("No user_id found in customer metadata");
          break;
        }
        
        // Update subscription status to canceled
        const { error: deleteError } = await supabaseClient
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("user_id", deletedUserId);
        
        if (deleteError) {
          console.error("Error updating subscription status:", deleteError);
        }
        break;
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
