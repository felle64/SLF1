import { getTracksBySeason } from '@/lib/tracks'
import { SEASON_ID } from '@/lib/config'

export async function GET() {
  const tracks = getTracksBySeason(SEASON_ID)
  return new Response(JSON.stringify(tracks), {
    headers: { 'Content-Type': 'application/json' },
  })
}
