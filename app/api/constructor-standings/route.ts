import { getConstructorStandings } from '@/lib/standings'

export async function GET() {
  const standings = getConstructorStandings(10)
  return new Response(JSON.stringify(standings), {
    headers: { 'Content-Type': 'application/json' },
  })
}
