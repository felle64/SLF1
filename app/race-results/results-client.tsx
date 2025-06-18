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
  const [season, setSeason]     = useState<string>('3')
  const [tracks, setTracks]     = useState<Track[]>([])
  const [selected, setSelected] = useState<string>('')
  const [results, setResults]   = useState<Result[]>([])

  // Fetch tracks whenever the season changes
  useEffect(() => {
    fetch(`/api/tracks-by-season?seasonId=${season}`)
      .then(res => {
        console.log('Tracks fetch status:', res.status)
        return res.json()
      })
      .then(data => {
        console.log('Fetched tracks for season', season, data)
        setTracks(data)
      })
      .catch(err => console.error('Error fetching tracks:', err))
  }, [season])

  // Fetch results whenever the track or season changes
  useEffect(() => {
    const params = new URLSearchParams({ seasonId: season })
    if (selected) params.set('trackId', selected)

    const url = '/api/db-results?' + params.toString()
    console.log('Fetching results from:', url)

    fetch(url)
      .then(res => {
        console.log('Results fetch status:', res.status, res.statusText)
        return res.json()
      })
      .then(data => {
        console.log('Fetched results:', data)
        setResults(data)
      })
      .catch(err => console.error('Error fetching results:', err))
  }, [selected, season])

  return (
    <div>
      {/* Debug info */}
      <p className="mb-2 text-sm text-gray-500">
        Season: {season}, Track: {selected || 'all'}, Tracks loaded: {tracks.length}, Results: {results.length}
      </p>

      {/* Season selector */}
      <label className="block font-semibold mb-1">Choose season</label>
      <select
        className="form-select mb-4"
        value={season}
        onChange={e => setSeason(e.target.value)}
      >
        <option value="1">Season 1</option>
        <option value="2">Season 2</option>
        <option value="3">Season 3</option>
        {/* add more if you have more seasons */}
      </select>

      {/* Track selector */}
      <label className="block font-semibold mb-1">Choose track</label>
      <select
        className="form-select mb-4"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value="">All tracks</option>
        {tracks.map(t => (
          <option key={t.Id} value={t.Id}>{t.CircuitName}</option>
        ))}
      </select>

      {/* Results list */}
      <ul>
        {results.map((r, i) => (
          <li key={i} className="mb-2">
            {`${r.circuit} — ${r.driver} — P${r.position}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
