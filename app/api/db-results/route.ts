import { getResultsByTrack, getResultsBySeason } from '@/lib/sessionResults'
import { SEASON_ID } from '@/lib/config'

// Force dynamic so we can read from SQLite at request time
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse our three filters:
  const trackIdParam     = searchParams.get('trackId')
  const seasonIdParam    = searchParams.get('seasonId')
  const sessionTypeParam = searchParams.get('sessionType')

  console.log('db-results route called with params:', {
    trackId: trackIdParam,
    seasonId: seasonIdParam,
    sessionType: sessionTypeParam,
  })

  const seasonId = seasonIdParam ? Number(seasonIdParam) : SEASON_ID

  let data
  if (trackIdParam) {
    // track + season + (optional) sessionType
    data = getResultsByTrack(
      Number(trackIdParam),
      100,
      seasonId,
      sessionTypeParam ?? undefined
    )
  } else {
    // season + (optional) sessionType
    data = getResultsBySeason(
      seasonId,
      100,
      sessionTypeParam ?? undefined
    )
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
