
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const airtelClientId = Deno.env.get('AIRTEL_CLIENT_ID');
const airtelClientSecret = Deno.env.get('AIRTEL_CLIENT_SECRET');

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
    const { phoneNumber, amount, name } = await req.json();
    
    console.log(`Processing Airtel payment: ${amount} EUR from ${phoneNumber} (${name})`);
    
    // This would be where you'd integrate with the actual Airtel Money API
    // using the airtelClientId and airtelClientSecret
    
    // For now, we'll simulate a successful payment
    const paymentReference = `AIRTEL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // In a real implementation, you would:
    // 1. Call Airtel API to initiate payment
    // 2. Store the transaction in a database
    // 3. Handle callbacks from Airtel

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment initiated successfully",
        reference: paymentReference,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Airtel Payment Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to process payment",
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
