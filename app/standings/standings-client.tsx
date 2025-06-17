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
  const [drivers, setDrivers] = useState<DriverStanding[]>([])
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([])

  useEffect(() => {
    fetch('/api/driver-standings')
      .then(res => res.json())
      .then(setDrivers)
    fetch('/api/constructor-standings')
      .then(res => res.json())
      .then(setConstructors)
  }, [])

  return (
    <div>
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
