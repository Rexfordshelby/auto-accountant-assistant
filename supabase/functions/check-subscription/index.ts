
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("Unauthorized");
    }
    
    const user = userData.user;

    // Initialize Stripe with your secret key
    const stripe = new Stripe("sk_test_51RCdKmQvBO9bv1fpDy6rcnWH4GWeQDLovcSq2SSBm6srQxyLcErD4S4CAs4X8EPkjaBeewHDBj8vVIbYbtq0pt4M005oP3ssin", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ 
      email: user.email,
      limit: 1 
    });
    
    if (customers.data.length === 0) {
      return new Response(JSON.stringify({ 
        subscribed: false,
        tier: "free"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return new Response(JSON.stringify({ 
        subscribed: false,
        tier: "free"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get subscription details
    const subscription = subscriptions.data[0];
    
    // Map the price ID to a tier
    let tier = "free";
    
    // Extract tier information from metadata
    const items = subscription.items.data;
    if (items.length > 0) {
      const product = await stripe.products.retrieve(items[0].price.product as string);
      // Assuming you store the tier in the product metadata
      tier = product.metadata.tier || "starter";
    }
    
    return new Response(JSON.stringify({
      subscribed: true,
      tier: tier,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Error checking subscription:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
