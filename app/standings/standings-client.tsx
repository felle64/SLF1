'use client'

import React, { useEffect, useState, FormEvent } from 'react'

interface Standing {
  driver: string
  points: string
}

export default function StandingsClient() {
  const [standings, setStandings] = useState<Standing[]>([])
  const [form, setForm] = useState<Standing>({ driver: '', points: '' })

  useEffect(() => {
    fetch('/api/standings')
      .then(res => res.json())
      .then(setStandings)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch('/api/standings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ driver: '', points: '' })
    const res = await fetch('/api/standings')
    setStandings(await res.json())
  }

  return (
    <div>
      <ul className='mb-8'>
        {standings.map((s, i) => (
          <li key={i} className='mb-2'>{`${s.driver} - ${s.points} pts`}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <input
          className='form-input w-full text-gray-800'
          placeholder='Driver'
          value={form.driver}
          onChange={e => setForm({ ...form, driver: e.target.value })}
          required
        />
        <input
          className='form-input w-full text-gray-800'
          placeholder='Points'
          value={form.points}
          onChange={e => setForm({ ...form, points: e.target.value })}
          required
        />
        <button type='submit' className='btn text-white bg-blue-600 hover:bg-blue-700'>Upload</button>
      </form>
    </div>
  )
}
