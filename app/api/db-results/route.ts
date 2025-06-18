import { getResultsByTrack, getResultsBySeason } from '@/lib/sessionResults'
import { SEASON_ID }                             from '@/lib/config'


export async function GET(req: Request) {
  const params   = new URL(req.url).searchParams
  const trackId  = params.get('trackId')
  const seasonId = Number(params.get('seasonId') ?? SEASON_ID)

  const data = trackId
    ? getResultsByTrack(Number(trackId), 100, seasonId)
    : getResultsBySeason(seasonId, 100)

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
