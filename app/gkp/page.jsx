import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import SelectData from '../../components/SelectData';
import { getBootstrap, getFixtures, getLeagueData, getExpectedPoints } from '../../services/index';
import Image from 'next/image';

export default async function FilterByPosition(props) {
  const bootstrap = (await getBootstrap());
  const teams = bootstrap.teams;
  const gameWeek = bootstrap.events.find(o => o.is_current).id;
  const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

  let lvTeams = teams.map(t => { 
    return { label: t.name, value: t.id }
  })

  lvTeams = [{label: 'All', value: null}, ...lvTeams]

  let elements = bootstrap.elements;
  elements = elements.filter(o => o.element_type === 1)
  if (props.searchParams && props.searchParams.teamId && props.searchParams.teamId !== 'All') {
    elements = elements.filter(o => o.team === parseInt(props.searchParams.teamId))
  }
  elements.sort((a, b) => getExpectedPoints(b, nextGameWeek) - getExpectedPoints(a, nextGameWeek))
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-24 w-11/12">
        <SelectData 
          labelHeader={'Filter by Team'}
          labelValues={lvTeams}
          selectValue={null}
          url={`?teamId=[team]`}
          urlReplacer={'[team]'}
        />
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
