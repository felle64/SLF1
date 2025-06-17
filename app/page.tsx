import Image from 'next/image'
import hero from '@/public/images/hero-image.png'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Sunday League F1 25</h1>
      <Image src={hero} alt="SLF1 car" width={640} height={360} priority />
    </main>
  )
}
