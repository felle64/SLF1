export const metadata = {
  title: 'SLF1 – F1 25 Racing League',
  description: 'Join Sunday League F1 25 for weekly online races and a thriving community',
}

import Image from 'next/image'
import Link from 'next/link'
import HeroImage from '@/public/images/hero-image.png'

export default function Home() {
  return (
    <>
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-6xl font-extrabold mb-6">Sunday League F1&nbsp;25</h1>
          <p className="text-xl text-gray-700 mb-8">Weekly online races with fair competition. Join drivers from across the globe.</p>
          <Link href="/league" className="btn text-white bg-red-600 hover:bg-red-700">View League Details</Link>
        </div>
        <div className="mt-12 flex justify-center">
          <Image src={HeroImage} alt="F1 car" className="rounded-lg w-full max-w-3xl" />
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <ul className="grid md:grid-cols-3 gap-6">
            <li className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Weekly Races</h3>
              <p>50% distance with dynamic weather and realistic settings.</p>
            </li>
            <li className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Friendly Community</h3>
              <p>Meet racers on Discord and enjoy close competition.</p>
            </li>
            <li className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Race Results</h3>
              <p>Upload results and follow championship standings.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Next Races</h2>
          <ul className="list-disc list-inside text-left inline-block space-y-2">
            <li>Bahrain - March 3</li>
            <li>Saudi Arabia - March 10</li>
            <li>Australia - March 17</li>
            <li>Japan - March 24</li>
          </ul>
          <div className="mt-8">
            <a href="https://discord.gg/EqrUdXfbHU" target="_blank" className="btn text-white bg-red-600 hover:bg-red-700">Join our Discord</a>
          </div>
        </div>
      </section>
    </>
  )
}
