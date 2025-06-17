import { execFileSync } from 'child_process'
import path from 'path'

export interface DriverStanding {
  driver: string
  points: number
}

export interface ConstructorStanding {
  team: string
  points: number
}

function dbPath() {
  return path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
}

export function getDriverStandings(limit = 20): DriverStanding[] {
  const query = `SELECT DriverName as driver, SUM(DriverPointsRaw) as points FROM DriverSessions GROUP BY DriverName ORDER BY points DESC LIMIT ${limit};`
  try {
    const output = execFileSync('sqlite3', ['-json', dbPath(), query], { encoding: 'utf8' })
    return JSON.parse(output) as DriverStanding[]
  } catch (_) {
    return []
  }
}

export function getConstructorStandings(limit = 10): ConstructorStanding[] {
  const query = `SELECT TeamName as team, SUM(TeamPointsRaw) as points FROM DriverSessions GROUP BY TeamName ORDER BY points DESC LIMIT ${limit};`
  try {
    const output = execFileSync('sqlite3', ['-json', dbPath(), query], { encoding: 'utf8' })
    return JSON.parse(output) as ConstructorStanding[]
  } catch (_) {
    return []
  }
}
