import SelectPosition from '../../../components/SelectPosition';
import ElementSimulateCard from '../../../components/ElementSimulateCard';
import TotalExpectedPts from '../../../components/TotalExpectedPts';
import Manager from '../../../components/Manager';
import Recomendation from '../../../components/Recomendation';
import TotalExpectedPtsNext from '../../../components/TotalExpectedPtsNext';
import { getBootstrap, getManagerInfo, getPicksData, getFixtures, getTotalXPMultiplies, managerId } from '../../../services/index';
import Image from 'next/image';

export default async function Home() {
    const bootstrap = (await getBootstrap());
    const teams = bootstrap.teams;
    const gameWeek = bootstrap.events.find(o => o.is_current).id;
    const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

    let elements = bootstrap.elements;
    const manager = await getManagerInfo(managerId)
    let picksData = await getPicksData(managerId, `${gameWeek}`);
    
    
    
    let myTeam = [];

    for (let pick of picksData.picks) {
        pick.multiplier = pick.multiplier == 0 ? 1 : pick.multiplier;
    }

    const fixtures = Object.values(await getFixtures());
    const dataCurrentTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 0, picksData, fixtures);
    const dataNextTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 1, picksData, fixtures); 
    elements = elements.map(el => { return {...el, xPFinal: getTotalXPMultiplies(bootstrap, gameWeek, 1, { picks: [
        {
            element: el.id,
            multiplier: 1
        }
    ]}, fixtures).totalXPoints}})

    const xPCurrent = dataNextTeamAndXp.totalXPoints;
    myTeam = dataNextTeamAndXp.myTeam;
    const xPNext = dataNextTeamAndXp.totalXPoints

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <Manager 
                manager={`${manager.player_first_name} ${manager.player_last_name}`}
                team={ manager.name }
            />
            {myTeam.map(element => (
            <ElementSimulateCard
                { ...element }

                teams={teams}
                gameWeek={gameWeek}
                nextGameWeek={nextGameWeek}
                elements={elements}
                picksData={picksData}
            />
            ))}
            {/* <Recomendation /> */}
        </div>
        </main>
    )
}
