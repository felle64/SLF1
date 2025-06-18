import Database from 'better-sqlite3'
import path from 'path'

const DB_DIR     = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases')
const DEFAULT_DB = path.join(DB_DIR, 'SLF1.db')
const S4_DB      = path.join(DB_DIR, 'SLF1_S4.db')

function dbPathForSeason(seasonId: number): string {
  return seasonId === 3 ? S4_DB : DEFAULT_DB
}

export interface Track {
  Id: number
  CircuitName: string
}

export function getTracksBySeason(seasonId: number): Track[] {
  const db = new Database(dbPathForSeason(seasonId), { readonly: true })
  const stmt = db.prepare(`
    SELECT DISTINCT
      t.Id,
      COALESCE(t.CircuitFullName, t.CircuitName) AS CircuitName
    FROM SessionResults s
    JOIN Tracks t ON s.TrackId = t.Id
    JOIN Events e ON s.EventId = e.Id
    WHERE e.SeasonId = ?
    ORDER BY t.Id
  `)
  const rows = stmt.all(seasonId) as Track[]
  db.close()
  return rows
}

export interface SessionResult {
  driver: string
  position: number
  circuit: string
  date: string
  trackId: number
  seasonId: number
}

const baseQuery = `
  SELECT
    d.DriverName AS driver,
    d.Position   AS position,
    COALESCE(t.CircuitFullName, t.CircuitName) AS circuit,
    s.Date       AS date,
    t.Id         AS trackId,
    e.SeasonId   AS seasonId
  FROM DriverSessions d
  JOIN SessionResults s ON d.SessionResultId = s.Id
  JOIN Tracks t         ON s.TrackId = t.Id
  LEFT JOIN Events e    ON s.EventId = e.Id
`

export function getResultsByTrack(
  trackId: number,
  limit = 20,
  seasonId?: number
): SessionResult[] {
  const db = new Database(dbPathForSeason(seasonId ?? 0), { readonly: true })
  let query = `${baseQuery} WHERE t.Id = ?`
  const params: (string | number)[] = [trackId]
  if (seasonId != null) {
    query += ` AND e.SeasonId = ?`
    params.push(seasonId)
  }
  query += ` ORDER BY s.Date DESC LIMIT ?`
  params.push(limit)
  const stmt = db.prepare(query)
  const rows = stmt.all(...params) as SessionResult[]
  db.close()
  return rows
}

export function getResultsBySeason(
  seasonId: number,
  limit = 20
): SessionResult[] {
  const db = new Database(dbPathForSeason(seasonId), { readonly: true })
  const query = `
    ${baseQuery}
    WHERE e.SeasonId = ?
    ORDER BY s.Date DESC
    LIMIT ?
  `
  const stmt = db.prepare(query)
  const rows = stmt.all(seasonId, limit) as SessionResult[]
  db.close()
  return rows
}
