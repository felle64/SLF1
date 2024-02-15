import Link from 'next/link'
import SLF1 from '../../public/images/slf1.png'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">

        <img src={SLF1.src} alt="SLF1" className="h-10"/>

    </Link>
  )
}
