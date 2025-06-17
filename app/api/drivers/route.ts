import { getDrivers } from '@/lib/drivers'

export async function GET() {
  const drivers = getDrivers()
  console.log('Tracks fetched successfully:', drivers)
  return new Response(JSON.stringify(drivers), {
    headers: { 'Content-Type': 'application/json' },
  })
}
