import { execFileSync } from 'child_process'
import path from 'path'

export interface Driver {
  Id: number
  Name: string
}

export function getDrivers(): Driver[] {
  const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
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
