import { getDriverStandings } from '@/lib/standings'

export async function GET() {
  const standings = getDriverStandings(20)
  return new Response(JSON.stringify(standings), {
    headers: { 'Content-Type': 'application/json' },
  })
}
