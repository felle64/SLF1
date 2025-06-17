'use client'

import React, { useEffect, useState } from 'react'

interface Track {
  Id: number
  CircuitName: string
}

interface Result {
  driver: string
  position: number
  circuit: string
  date: string
  trackId: number
}

export default function ResultsClient() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [selected, setSelected] = useState<string>('')
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    fetch('/api/tracks')
      .then(res => res.json())
      .then(setTracks)
  }, [])

  useEffect(() => {
    const url = selected
      ? `/api/db-results?trackId=${selected}`
      : '/api/db-results'

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched results:', data)
        setResults(data)
      });
  }, [selected])

  return (
    <div>
      <label className='block font-semibold mb-2'>Choose track</label>
      <select
        className='form-select mb-4'
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value=''>All tracks</option>
        {tracks.map(t => (
          <option key={t.Id} value={t.Id}>{t.CircuitName}</option>
        ))}
      </select>
      <ul>
        {results.map((r, i) => (
          <li key={i} className='mb-2'>
            {`${tracks.find(t => t.Id === r.trackId)?.CircuitName || 'Unknown'} - ${r.driver} - P${r.position}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
