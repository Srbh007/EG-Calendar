import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('No authorization header')

    const { user_id, start_date, end_date } = await req.json()
    if (!user_id || !start_date || !end_date) throw new Error('Missing payload variables')

    // 1. Authenticate user
    // 2. Fetch all `calendar_connections` and `calendars` configured for `conflict_check`
    // 3. Make parallel provider (Google/Zoho) API calls fetching `freeBusy` intervals
    // 4. Normalize response removing private titles, mapping purely to start/end UTC intervals.

    // Mock response simulating normalized provider data
    const normalizedBusyIntervals = [
      { start: '2026-10-31T14:00:00Z', end: '2026-10-31T15:00:00Z' },
      { start: '2026-11-01T09:00:00Z', end: '2026-11-01T10:30:00Z' }
    ]

    return new Response(
      JSON.stringify({ success: true, busy: normalizedBusyIntervals }),
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
