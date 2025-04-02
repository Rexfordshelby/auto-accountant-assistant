
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();
    
    // Log the request
    console.log(`Processing request for user ${userId}: ${message}`);
    
    // Simple rule-based responses for financial questions
    let response = "";
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("tax") && lowercaseMessage.includes("deadline")) {
      response = "The general tax filing deadline in the United States is April 15th. However, if this date falls on a weekend or holiday, it may be moved to the next business day.";
    } else if (lowercaseMessage.includes("expense") && lowercaseMessage.includes("track")) {
      response = "You can track expenses in our Expense Tracker tool. To get started, go to Tools > Expense Tracker from your dashboard. You can categorize expenses and generate reports for better financial management.";
    } else if (lowercaseMessage.includes("invoice")) {
      response = "Our platform offers invoicing functionality under the 'Invoicing' section in your dashboard. You can create, send, and track invoices for your clients. The system automatically numbers them and allows you to set payment terms.";
    } else if (lowercaseMessage.includes("report")) {
      response = "Financial reports are available in your dashboard. You can generate Profit & Loss statements, Balance Sheets, and various other reports to get insights into your financial status.";
    } else if (lowercaseMessage.includes("subscription")) {
      response = "We offer three subscription tiers: Starter, Professional, and Enterprise. Each tier provides different features and service levels. You can upgrade your subscription from the 'Subscription' tab in your account settings.";
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      response = "Hello! I'm your financial assistant. I can help you with questions about taxes, expenses, invoices, financial reports, and other accounting-related topics. How can I assist you today?";
    } else {
      response = "I'm your financial assistant and can help with questions about taxes, expenses, invoices, and financial management. Could you please provide more details about what you're looking for?";
    }
    
    // Return the response
    return new Response(
      JSON.stringify({
        response,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing request:", error.message);
    
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
