import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import { getBootstrap, getFixtures, getLeagueData } from '../../services/index';
import Image from 'next/image';

export default async function FilterByPosition() {
  const bootstrap = (await getBootstrap());

  let elements = bootstrap.elements;
  elements = elements.filter(o => o.element_type === 1)
  elements.sort((a, b) => b.expected_goals - a.expected_goals)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-24 w-11/12">
        {elements.map(element => (
          <ElementCard
            { ...element }
          />
        ))}
      </div>
    </main>
  )
}
