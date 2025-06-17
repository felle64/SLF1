import { getDrivers } from '@/lib/drivers'

export async function GET() {
  const drivers = getDrivers()
  return new Response(JSON.stringify(drivers), {
    headers: { 'Content-Type': 'application/json' },
  })
}
