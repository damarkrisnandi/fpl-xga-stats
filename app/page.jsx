import SelectPosition from '../components/SelectPosition';
import ElementCard from '../components/ElementCard';
import { getBootstrap, getFixtures, getLeagueData } from '../services/index';
import Image from 'next/image';

export default async function Home() {
  const bootstrap = (await getBootstrap());

  const elements = bootstrap.elements;
  elements.sort((a, b) => b.expected_goals - a.expected_goals)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-24 w-11/12">
        <SelectPosition />
        {elements.map(element => (
          <ElementCard
            { ...element }
          />
        ))}
      </div>
    </main>
  )
}
