import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import { getBootstrap, getFixtures, getLeagueData, getExpectedPoints } from '../../services/index';
import Image from 'next/image';

export default async function FilterByPosition() {
  const bootstrap = (await getBootstrap());
  const teams = bootstrap.teams;
  const gameWeek = bootstrap.events.find(o => o.is_current).id;
  const nextGameWeek = bootstrap.events.find(o => o.is_next).id;


  let elements = bootstrap.elements;
  elements = elements.filter(o => o.element_type === 4)
  elements.sort((a, b) => getExpectedPoints(b, nextGameWeek) - getExpectedPoints(a, nextGameWeek))
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-24 w-11/12">
        {elements.map(element => (
          <ElementCard
            { ...element }

            teams={teams}
            gameWeek={gameWeek}
            nextGameWeek={nextGameWeek}
          />
        ))}
      </div>
    </main>
  )
}
