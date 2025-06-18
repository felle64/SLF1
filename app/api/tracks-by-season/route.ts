// app/api/tracks-by-season/route.ts
import { SEASON_ID } from '@/lib/config'
import { getTracksBySeason } from '@/lib/sessionResults'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const seasonIdParam = searchParams.get('seasonId')
  const seasonId = seasonIdParam ? Number(seasonIdParam) : SEASON_ID

  const tracks = getTracksBySeason(seasonId)

  return new Response(JSON.stringify(tracks), {
    headers: { 'Content-Type': 'application/json' },
  })
}
