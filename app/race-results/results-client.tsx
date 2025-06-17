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

  return (
    <div>
      <ul>
        {results.map((r, i) => (
          <li key={i} className='mb-2'>{`${r.date} - ${r.circuit} - ${r.driver} - P${r.position}`}</li>
        ))}
      </ul>
    </div>
  )
}
