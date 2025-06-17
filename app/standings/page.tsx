export const metadata = {
  title: 'Standings - SLF1',
  description: 'Current driver and constructor standings',
}

import StandingsClient from './standings-client'

export default function Standings() {
  return (
    <div className='pt-32 pb-12 md:pt-40 md:pb-20 px-8'>
      <h1 className='font-bold text-3xl mb-4'>Standings</h1>
      <StandingsClient />
    </div>
  )
}
