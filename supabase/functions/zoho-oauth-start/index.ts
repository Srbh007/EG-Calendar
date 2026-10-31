import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const url = new URL(req.url)
    const region = url.searchParams.get('region') || 'com' // default to US region

    // Read scopes and client ID from Deno.env in real implementation
    // Region-aware endpoints logic would be here
    const zohoAuthUrl = `https://accounts.zoho.${region}/oauth/v2/auth?client_id=mock&response_type=code&scope=ZohoCalendar.calendar.ALL&redirect_uri=mock&state=mock_state&access_type=offline&prompt=consent`

    return new Response(
      JSON.stringify({ url: zohoAuthUrl }),
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
