import { execFileSync } from 'child_process'
import path from 'path'

export interface SessionResult {
  driver: string
  position: number
  circuit: string
  date: string
  trackId: number
}

const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')

const baseQuery =
  'SELECT d.DriverName as driver, d.Position as position, ' +
  'COALESCE(t.CircuitFullName, t.CircuitName) as circuit, s.Date as date, ' +
  't.Id as trackId ' +
  'FROM DriverSessions d ' +
  'JOIN SessionResults s ON d.SessionResultId = s.Id ' +
  'JOIN Tracks t ON s.TrackId = t.Id ' +
  'LEFT JOIN Events e ON s.EventId = e.Id'

export function getResults(sort: 'date' | 'race' | 'season' = 'date', limit = 10): SessionResult[] {

  let orderBy = 's.Date DESC'
  if (sort === 'race')
    orderBy = 'COALESCE(t.CircuitFullName, t.CircuitName) ASC'
  if (sort === 'season') orderBy = 'e.SeasonId DESC, s.Date DESC'

  const query = `${baseQuery} ORDER BY ${orderBy} LIMIT ${limit};`

  try {
    const output = execFileSync('sqlite3', ['-json', dbPath, query], {
      encoding: 'utf8',
    })
    return JSON.parse(output) as SessionResult[]
  } catch (_) {
    return []
  }
}

export function getLatestResults(limit = 10): SessionResult[] {
  return getResults('race', limit)
}

export function getResultsByTrack(trackId: number, limit = 20): SessionResult[] {
  const query = `${baseQuery} WHERE t.Id = ${trackId} ORDER BY s.Date DESC LIMIT ${limit};`
  try {
    const output = execFileSync('sqlite3', ['-json', dbPath, query], {
      encoding: 'utf8',
    })
    return JSON.parse(output) as SessionResult[]
  } catch (_) {
    return []
  }
}
