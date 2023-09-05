import SelectPosition from '../components/SelectPosition';
import ElementCard from '../components/ElementCard';
import { getBootstrap, getFixtures, getLeagueData } from '../services/index';
import Image from 'next/image';

export default async function Home() {
  const bootstrap = (await getBootstrap());
  const teams = bootstrap.teams;
  const gameWeek = bootstrap.events.find(o => o.is_current).id;
  const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

  const elements = bootstrap.elements;
  elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
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
