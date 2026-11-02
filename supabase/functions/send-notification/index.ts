import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { notification_type, to_email, payload, idempotency_key } = await req.json()
    if (!notification_type || !to_email || !payload || !idempotency_key) {
      throw new Error('Missing payload variables')
    }

    // 1. Verify idempotency_key hasn't been used yet in `webhook_deliveries` or similar cache
    // 2. Hydrate email template based on `notification_type` (e.g. 'booking_confirmed', 'booking_cancelled')
    // 3. Convert timestamps in payload to the correct invitee/host timezone
    // 4. Send email via managed provider (Resend, SendGrid, Postmark) using server-side secrets
    // 5. Log delivery status

    // Mock response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification sent securely (mock)'
      }),
      {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        status: 200,
      }
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      status: 400,
    })
  }
})
