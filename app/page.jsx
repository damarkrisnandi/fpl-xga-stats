import SelectPosition from '../components/SelectPosition';
import ElementCard from '../components/ElementCard';
import SelectData from '../components/SelectData';
import { getBootstrap, getFixtures, getLeagueData, getExpectedPoints } from '../services/index';
import Image from 'next/image';

export default async function Home(props) {
  const bootstrap = (await getBootstrap());
  const teams = bootstrap.teams;
  const gameWeek = bootstrap.events.find(o => o.is_current).id;
  const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

  const lvTeams = [
    {label: 'All', value: null}, 
    ...teams.map(t => { 
      return { label: t.name, value: t.id }
    })
]
  const lvPosition = [
    {label: 'All', value: null},
    ...bootstrap.element_types.map(p => {
      return { label: p.singular_name, value: p.id}
    })
  ]

  let url = '?teamId=[team]'
  let elements = bootstrap.elements;
  if (props.searchParams && props.searchParams.teamId && props.searchParams.teamId !== 'All') {
    elements = elements.filter(o => o.team === parseInt(props.searchParams.teamId));
    url.replace('[team]', props.searchParams.teamId)
  } 

  url.replace('[team]', 'All')
 
  elements.sort((a, b) => getExpectedPoints(b, nextGameWeek) - getExpectedPoints(a, nextGameWeek))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-24 w-11/12">
        <SelectData 
          labelHeader={'Filter by Team'}
          labelValues={lvTeams}
          selectValue={props.searchParams ? parseInt(props.searchParams.teamId) : null}
          url={url}
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
