import { execFileSync } from 'child_process'
import path from 'path'

export interface SessionResult {
  driver: string
  position: number
  circuit: string
  date: string
}

export function getLatestResults(limit = 10): SessionResult[] {
  const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
  const query = `SELECT d.DriverName as driver, d.Position as position, t.CircuitName as circuit, s.Date as date FROM DriverSessions d JOIN SessionResults s ON d.SessionResultId = s.Id JOIN Tracks t ON s.TrackId = t.Id ORDER BY s.Date DESC LIMIT ${limit};`
  try {
    const output = execFileSync('sqlite3', ['-json', dbPath, query], { encoding: 'utf8' })
    return JSON.parse(output) as SessionResult[]
  } catch (_) {
    return []
  }
}
