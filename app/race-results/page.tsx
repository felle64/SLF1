export const metadata = {
  title: 'Race Results - SLF1',
  description: 'Latest race results from the database',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import ResultsClient from './results-client'

export default function RaceResults() {
  return (
    <div className='pt-32 pb-12 md:pt-40 md:pb-20 px-8'>
      <h1 className='font-bold text-3xl mb-4'>Race Results</h1>
      <ResultsClient />
    </div>
  )
}
