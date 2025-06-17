import { getLatestResults } from '@/lib/sessionResults'

export async function GET() {
  const results = getLatestResults(20)
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
}
