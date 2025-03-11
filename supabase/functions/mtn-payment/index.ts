
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const mtnPrimaryKey = Deno.env.get('MTN_PRIMARY_KEY');
const mtnSecondaryKey = Deno.env.get('MTN_SECONDARY_KEY');

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
    
    console.log(`Processing MTN payment: ${amount} EUR from ${phoneNumber} (${name})`);
    
    // This would be where you'd integrate with the actual MTN Mobile Money API
    // using the mtnPrimaryKey and mtnSecondaryKey
    
    // For now, we'll simulate a successful payment
    const paymentReference = `MTN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // In a real implementation, you would:
    // 1. Call MTN API to initiate payment
    // 2. Store the transaction in a database
    // 3. Handle callbacks from MTN

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
    console.error("MTN Payment Error:", error);
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
