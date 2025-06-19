import { getDrivers } from '@/lib/drivers'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const drivers = getDrivers()
  console.log('Drivers fetched successfully:', drivers)
  return new Response(JSON.stringify(drivers), {
    headers: { 'Content-Type': 'application/json' },
  })
}
