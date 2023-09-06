import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import TotalExpectedPts from '../../components/TotalExpectedPts';
import TotalExpectedPtsNext from '../../components/TotalExpectedPtsNext';
import { getBootstrap, getManagerInfo, getPicksData, getFixtures, getTotalXPMultiplies, managerId } from '../../services/index';
import Image from 'next/image';

export default async function Home() {
    const bootstrap = (await getBootstrap());
    const teams = bootstrap.teams;
    const gameWeek = bootstrap.events.find(o => o.is_current).id;
    const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

    let elements = bootstrap.elements;
    const manager = await getManagerInfo(managerId)
    const picksData = await getPicksData(managerId, `${gameWeek}`);
    
    
    
    let myTeam = [];



    const fixtures = Object.values(await getFixtures());
    const dataCurrentTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 0, picksData, fixtures);
    const dataNextTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 1, picksData, fixtures); 
    const xPCurrent = dataCurrentTeamAndXp.totalXPoints;
    myTeam = dataCurrentTeamAndXp.myTeam;
    const xPNext = dataNextTeamAndXp.totalXPoints

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <TotalExpectedPts 
                totalXPoints={xPCurrent.toFixed(2)}
                points={manager.summary_event_points}
            />
            <TotalExpectedPtsNext 
                totalXPoints={xPNext.toFixed(2)}
            />
            {myTeam.map(element => (
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
