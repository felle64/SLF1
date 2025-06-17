'use client'

import React, { useEffect, useState, FormEvent } from 'react'

interface Result {
  driver: string
  race: string
  position: string
}

export default function ResultsClient() {
  const [results, setResults] = useState<Result[]>([])
  const [form, setForm] = useState<Result>({ driver: '', race: '', position: '' })

  useEffect(() => {
    fetch('/api/results')
      .then(res => {
        if (!res.ok) throw new Error('api unavailable')
        return res.json()
      })
      .then(data => {
        setResults(data)
        if (typeof window !== 'undefined') {
          localStorage.setItem('results', JSON.stringify(data))
        }
      })
      .catch(() => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('results')
          if (stored) setResults(JSON.parse(stored))
        }
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newEntry = { ...form }
    let updated = [...results, newEntry]
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      })
      const res = await fetch('/api/results')
      updated = await res.json()
    } catch (_) {
      // ignore network errors and store locally
    }
    setResults(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('results', JSON.stringify(updated))
    }
    setForm({ driver: '', race: '', position: '' })
  }

  return (
    <div>
      <ul className='mb-8'>
        {results.map((r, i) => (
          <li key={i} className='mb-2'>{`${r.race} - ${r.driver} - P${r.position}`}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <input
          className='form-input w-full text-gray-800'
          placeholder='Race name'
          value={form.race}
          onChange={e => setForm({ ...form, race: e.target.value })}
          required
        />
        <input
          className='form-input w-full text-gray-800'
          placeholder='Driver'
          value={form.driver}
          onChange={e => setForm({ ...form, driver: e.target.value })}
          required
        />
        <input
          className='form-input w-full text-gray-800'
          placeholder='Position'
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
          required
        />
        <button type='submit' className='btn text-white bg-blue-600 hover:bg-blue-700'>Upload</button>
      </form>
    </div>
  )
}
