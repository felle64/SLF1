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

  useEffect(() => {
    fetch('/api/db-results')
      .then(res => res.json())
      .then(setResults)
  }, [])

  const sorted = [...results].sort((a, b) => a.circuit.localeCompare(b.circuit))

  return (
    <div>
      <h2 className='font-semibold mb-4'>Sorted by track name</h2>
      <ul>
        {sorted.map((r, i) => (
          <li key={i} className='mb-2'>{`${r.circuit} - ${r.driver} - P${r.position}`}</li>
        ))}
      </ul>
    </div>
  )
}
