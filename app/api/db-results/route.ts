import { getLatestResults, getResultsBySeason } from '@/lib/sessionResults'
import { SEASON_ID } from '@/lib/config'

export async function GET() {
  const results = getResultsBySeason(SEASON_ID, 20)
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
}
