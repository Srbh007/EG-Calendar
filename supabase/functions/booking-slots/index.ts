import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { link_id, date } = await req.json()
    if (!link_id || !date) throw new Error('Missing payload variables')

    // 1. Fetch link settings (duration, buffers, notice, horizon)
    // 2. Fetch host's configured working hours and overrides for the date range
    // 3. Call `calendar-busy` function locally to fetch normalized busy blocks for selected calendars
    // 4. Compute candidate slots by finding time intervals in working hours that do not overlap with busy blocks or buffers.

    // Mock response
    const candidateSlots = [
      '2026-10-31T09:00:00Z',
      '2026-10-31T10:00:00Z',
      '2026-10-31T11:00:00Z',
      '2026-10-31T13:00:00Z'
    ]

    return new Response(
      JSON.stringify({ success: true, slots: candidateSlots }),
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
