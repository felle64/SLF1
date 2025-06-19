import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { SEASON_ID } from '@/lib/config'

export interface DriverStanding {
  driver: string
  points: number
}

export interface ConstructorStanding {
  team: string
  points: number
}

// --- DB file selection ---------------------------------
const DB_DIR     = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases')
const DEFAULT_DB = path.join(DB_DIR, 'SLF1.db')

/** Return a season-specific DB if it exists, otherwise fallback */
function dbPathForSeason(seasonId: number): string {
  const custom = path.join(DB_DIR, `SLF1_S${seasonId}.db`)
  return fs.existsSync(custom) ? custom : DEFAULT_DB
}

// --- Driver Standings -----------------------------
export function getDriverStandings(
  limit: number = 20,
  seasonId: number = SEASON_ID
): DriverStanding[] {
  const db = new Database(dbPathForSeason(seasonId), { readonly: true })
  const stmt = db.prepare(`
    SELECT
      d.DriverName         AS driver,
      SUM(d.DriverPointsRaw) AS points
    FROM DriverSessions d
    JOIN SessionResults s ON d.SessionResultId = s.Id
    JOIN Events e         ON s.EventId         = e.Id
    WHERE e.SeasonId = ?
    GROUP BY d.DriverName
    ORDER BY points DESC
    LIMIT ?
  `)
  const rows = stmt.all(seasonId, limit) as DriverStanding[]
  db.close()
  return rows
}

// --- Constructor Standings ------------------------
export function getConstructorStandings(
  limit: number = 10,
  seasonId: number = SEASON_ID
): ConstructorStanding[] {
  const db = new Database(dbPathForSeason(seasonId), { readonly: true })
  const stmt = db.prepare(`
    SELECT
      d.TeamName            AS team,
      SUM(d.TeamPointsRaw)  AS points
    FROM DriverSessions d
    JOIN SessionResults s ON d.SessionResultId = s.Id
    JOIN Events e         ON s.EventId         = e.Id
    WHERE e.SeasonId = ?
    GROUP BY d.TeamName
    ORDER BY points DESC
    LIMIT ?
  `)
  const rows = stmt.all(seasonId, limit) as ConstructorStanding[]
  db.close()
  return rows
}
