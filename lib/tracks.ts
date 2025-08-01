import { execFileSync } from 'child_process'
import path from 'path'

export interface Track {
  Id: number
  CircuitName: string
}

export function getTracks(): Track[] {
  const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
  try {
    const output = execFileSync(
      'sqlite3',
      ['-json', dbPath, 'SELECT Id, CircuitName FROM Tracks ORDER BY Id;'],
      { encoding: 'utf8' }
    )
    return JSON.parse(output) as Track[]
  } catch (_) {
    return []
  }
}

export function getTracksBySeason(seasonId: number): Track[] {
  const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
  const query = `
    SELECT DISTINCT
      t.Id,
      COALESCE(t.CircuitFullName, t.CircuitName) AS CircuitName
    FROM SessionResults s
    JOIN Tracks t ON s.TrackId = t.Id
    JOIN Events e ON s.EventId = e.Id
    WHERE e.SeasonId = ${seasonId}
    ORDER BY t.Id;
  `
  try {
    const output = execFileSync('sqlite3', ['-json', dbPath, query], { encoding: 'utf8' })
    return JSON.parse(output) as Track[]
  } catch (_) {
    return []
  }
}
