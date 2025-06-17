import { execFileSync } from 'child_process'
import path from 'path'

export interface Track {
  CircuitName: string
}

export function getTracks(): Track[] {
  const dbPath = path.join(process.cwd(), 'SLF1_DB', 'user', 'databases', 'SLF1.db')
  try {
    const output = execFileSync(
      'sqlite3',
      ['-json', dbPath, 'SELECT CircuitName FROM Tracks;'],
      { encoding: 'utf8' }
    )
    return JSON.parse(output) as Track[]
  } catch (err) {
    return []
  }
}
