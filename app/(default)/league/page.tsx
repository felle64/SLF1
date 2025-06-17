export const metadata = {
  title: 'F1 25 League - SLF1',
  description: 'Sunday League F1 25 racing events and schedule',
}

export default function F1League() {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-red-600">Sunday League F1&nbsp;25</h1>
        <p className="text-xl text-gray-700 mb-8">Join our weekly championship and race with drivers from around the world.</p>
        <a href="https://discord.gg/EqrUdXfbHU" target="_blank" className="btn text-white bg-red-600 hover:bg-red-700">Join our Discord</a>
      </div>
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-4">Race Schedule</h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li>Round 1: Bahrain - March 3</li>
          <li>Round 2: Saudi Arabia - March 10</li>
          <li>Round 3: Australia - March 17</li>
          <li>Round 4: Japan - March 24</li>
        </ul>
      </div>
    </section>
  )
}
