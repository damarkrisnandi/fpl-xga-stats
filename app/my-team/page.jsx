import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import TotalExpectedPts from '../../components/TotalExpectedPts';
import { getBootstrap, getManagerInfo, getPicksData, getExpectedPoints } from '../../services/index';
import Image from 'next/image';

export default async function Home() {
    const bootstrap = (await getBootstrap());
    const teams = bootstrap.teams;
    const gameWeek = bootstrap.events.find(o => o.is_current).id;
    const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

    let elements = bootstrap.elements;
    const managerId = '471950';
    const manager = await getManagerInfo(managerId)
    const picksData = await getPicksData(managerId, `${manager.current_event}`);
    // const picksFullData = [
    //     ...picksData.picks.map(
    //     (obj) => { return {...elements.find(
    //         (ref) => obj.element === ref.id
    //     ), ...obj}}
    //     )
    // ];

    // let currentPts = 0;
    // picksFullData.map(
    //     (o) => o.event_points * (o.multiplier)
    // ).forEach((n) => {
    //     currentPts += n;
    // })

    let myTeam = [];
    let totalXPoints = 0;
    for (let pick of picksData.picks) {
        if (elements.find((o) => pick.element === o.id)) {
            myTeam.push({...elements.find((o) => pick.element === o.id), multiplier: pick.multiplier})
            const xP = getExpectedPoints(elements.find((o) => pick.element === o.id), gameWeek);
            totalXPoints += xP * pick.multiplier;
        }
    }

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <TotalExpectedPts 
                totalXPoints={totalXPoints}
                points={manager.summary_event_points}
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
