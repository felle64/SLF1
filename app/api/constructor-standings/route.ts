import { getConstructorStandings } from '@/lib/standings'
import { SEASON_ID }               from '@/lib/config'

export async function GET(request: Request) {
  const params      = new URL(request.url).searchParams
  const limitParam  = params.get('limit')
  const seasonParam = params.get('seasonId')

  const limit    = limitParam  ? Number(limitParam)  : 10
  const seasonId = seasonParam ? Number(seasonParam) : SEASON_ID

  const data = getConstructorStandings(limit, seasonId)
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
