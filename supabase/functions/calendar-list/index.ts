import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('No authorization header')

    const { connection_id } = await req.json()
    if (!connection_id) throw new Error('Missing connection_id')

    // 1. Verify user session via authHeader
    // 2. Fetch connection credentials securely via service_role client
    // 3. Call Google or Zoho API based on connection.provider
    // 4. Update calendars table with discovered metadata

    // Mock response
    const mockCalendars = [
      { id: '1', name: 'Primary', is_primary: true, is_read_only: false },
      { id: '2', name: 'Holidays', is_primary: false, is_read_only: true }
    ]

    return new Response(
      JSON.stringify({ success: true, calendars: mockCalendars }),
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
