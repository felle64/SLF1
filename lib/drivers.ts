import { execFileSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { SEASON_ID } from '@/lib/config'

const DB_DIR     = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases')
const DEFAULT_DB = path.join(DB_DIR, 'SLF1.db')

function dbPathForSeason(seasonId: number): string {
  const custom = path.join(DB_DIR, `SLF1_S${seasonId}.db`)
  return fs.existsSync(custom) ? custom : DEFAULT_DB
}

export interface Driver {
  Id: number
  Name: string
}

export function getDrivers(): Driver[] {
  const dbPath = dbPathForSeason(SEASON_ID)
  try {
    const output = execFileSync(
      'sqlite3',
      ['-json', dbPath, 'SELECT Id, Name FROM Drivers ORDER BY Name;'],
      { encoding: 'utf8' }
    )
    return JSON.parse(output) as Driver[]
  } catch (_) {
    return []
  }
}
