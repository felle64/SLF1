import { promises as fs } from 'fs'
import path from 'path'

const RESULTS_PATH = path.join(process.cwd(), 'SLF1_DB', 'results.json')

export async function GET() {
  try {
    const data = await fs.readFile(RESULTS_PATH, 'utf-8')
    return new Response(data, { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    return new Response('[]', { headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(request: Request) {
  try {
    const newResult = await request.json()
    let current: any[] = []
    try {
      const data = await fs.readFile(RESULTS_PATH, 'utf-8')
      current = JSON.parse(data)
    } catch (_) {}
    current.push(newResult)
    await fs.writeFile(RESULTS_PATH, JSON.stringify(current, null, 2))
    return new Response(JSON.stringify({ status: 'ok' }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }
}
