import { getTracks } from '@/lib/tracks'

export async function GET() {
  const tracks = getTracks()
  return new Response(JSON.stringify(tracks), {
    headers: { 'Content-Type': 'application/json' },
  })
}
