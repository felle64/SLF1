'use client'

import React, { useEffect, useState } from 'react'

interface DriverStanding {
  driver: string
  points: number
}

interface ConstructorStanding {
  team: string
  points: number
}

export default function StandingsClient() {
  const [season, setSeason]           = useState<string>('6')  // default → Season 6
  const [drivers, setDrivers]         = useState<DriverStanding[]>([])
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([])

  useEffect(() => {
    const urlDrivers      = `/api/driver-standings?seasonId=${season}`
    const urlConstructors = `/api/constructor-standings?seasonId=${season}`

    fetch(urlDrivers)
      .then(res => res.json())
      .then(setDrivers)
      .catch(console.error)

    fetch(urlConstructors)
      .then(res => res.json())
      .then(setConstructors)
      .catch(console.error)
  }, [season])

  return (
    <div>
      <label className="block font-semibold mb-2">Choose Season</label>
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

      <h2 className='font-semibold mb-2'>Driver Standings</h2>
      <ul className='mb-8'>
        {drivers.map((d, i) => (
          <li key={i} className='mb-2'>{`${d.driver} - ${d.points} pts`}</li>
        ))}
      </ul>
      <h2 className='font-semibold mb-2'>Constructor Standings</h2>
      <ul>
        {constructors.map((c, i) => (
          <li key={i} className='mb-2'>{`${c.team} - ${c.points} pts`}</li>
        ))}
      </ul>
    </div>
  )
}
