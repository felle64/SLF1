'use client'

import React, { useEffect, useState } from 'react'

interface Result {
  driver: string
  position: number
  circuit: string
  date: string
}

export default function ResultsClient() {
  const [results, setResults] = useState<Result[]>([])
  const [sort, setSort] = useState<'date' | 'race' | 'season'>('date')

  useEffect(() => {
    fetch('/api/db-results')
      .then(res => res.json())
      .then(setResults)
  }, [])

  const sorted = [...results].sort((a, b) => {
    if (sort === 'race') return a.circuit.localeCompare(b.circuit)
    if (sort === 'season') return b.date.localeCompare(a.date)
    return b.date.localeCompare(a.date)
  })

  return (
    <div>
      <label className='mr-2 font-semibold'>Sort by:</label>
      <select
        value={sort}
        onChange={e => setSort(e.target.value as 'date' | 'race' | 'season')}
        className='border rounded p-1 mb-4'
      >
        <option value='date'>Date</option>
        <option value='race'>Race</option>
        <option value='season'>Season</option>
      </select>
      <ul>
        {sorted.map((r, i) => (
          <li key={i} className='mb-2'>{`${r.date} - ${r.circuit} - ${r.driver} - P${r.position}`}</li>
        ))}
      </ul>
    </div>
  )
}
