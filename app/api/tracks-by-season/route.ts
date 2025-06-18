// app/api/tracks-by-season/route.ts
import { getTracksBySeason } from '@/lib/sessionResults'
import { SEASON_ID }        from '@/lib/config'

export async function GET(req: Request) {
  const seasonId = Number(new URL(req.url).searchParams.get('seasonId') ?? SEASON_ID)
  const tracks   = getTracksBySeason(seasonId)
  return new Response(JSON.stringify(tracks), {
    headers: { 'Content-Type': 'application/json' },
  })
}
