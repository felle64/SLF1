import { getLatestResults, getResultsBySeason, getResultsByTrack } from '@/lib/sessionResults'
import { SEASON_ID } from '@/lib/config'


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackIdParam = searchParams.get('trackId')
  const seasonIdParam = searchParams.get('seasonId')
  const seasonId = seasonIdParam ? Number(seasonIdParam) : SEASON_ID

  let results
  if (trackIdParam) {
    results = getResultsByTrack(Number(trackIdParam), 100, seasonId)
  } else {
    results = getResultsBySeason(seasonId, 100)
  }

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
}
