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
  seasonId: number
  sessionType: string
}

export default function ResultsClient() {
  const [season, setSeason]           = useState<string>('6')      // default to Season 6
  const [tracks, setTracks]           = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState<string>('')
  const [sessionType, setSessionType] = useState<string>('all')    // 'all' | 'race' | 'sprint'
  const [results, setResults]         = useState<Result[]>([])

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

  // 2) Load results when season, track or sessionType changes
  useEffect(() => {
    const params = new URLSearchParams({ seasonId: season })
    if (selectedTrack) params.set('trackId', selectedTrack)
    if (sessionType !== 'all') params.set('sessionType', sessionType)

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
  }, [season, selectedTrack, sessionType])

  return (
    <div>
      {/* Debug info */}
      <p className="mb-4 text-sm text-gray-600">
        Season: {season}, Track: {selectedTrack || 'All'}, Type: {sessionType}, 
        Tracks: {tracks.length}, Results: {results.length}
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
        <option value="4">Season 4</option>
        <option value="5">Season 5</option>
        <option value="6">Season 6</option>
      </select>

      {/* Track selector */}
      <label className="block font-semibold mb-1">Choose Track</label>
      <select
        className="form-select mb-4"
        value={selectedTrack}
        onChange={e => setSelectedTrack(e.target.value)}
      >
        <option value="">All tracks</option>
        {tracks.map(t => (
          <option key={t.Id} value={t.Id}>{t.CircuitName}</option>
        ))}
      </select>

      {/* Session Type selector */}
      <label className="block font-semibold mb-1">Session Type</label>
      <select
        className="form-select mb-6"
        value={sessionType}
        onChange={e => setSessionType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="race">Grand Prix</option>
        <option value="sprint">Sprint</option>
      </select>

      {/* Results List */}
      <ul>
        {results.map((r, i) => (
          <li key={i} className="mb-2">
            {`${r.circuit} — ${r.driver} — P${r.position} (${r.sessionType})`}
          </li>
        ))}
      </ul>
    </div>
  )
}
