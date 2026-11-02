import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    // Boilerplate for OAuth state validation and authorization URL generation
    const url = new URL(req.url)

    // Read scopes and client ID from Deno.env in real implementation
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=mock&redirect_uri=mock&response_type=code&scope=calendar&state=mock_state&access_type=offline&prompt=consent`

    return new Response(
      JSON.stringify({ url: googleAuthUrl }),
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
