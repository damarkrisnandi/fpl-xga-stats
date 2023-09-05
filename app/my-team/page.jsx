import SelectPosition from '../../components/SelectPosition';
import ElementCard from '../../components/ElementCard';
import TotalExpectedPts from '../../components/TotalExpectedPts';
import { getBootstrap, getManagerInfo, getPicksData, getExpectedPoints, getFixtures } from '../../services/index';
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
    
    const fixtures = Object.values(await getFixtures());
    const currentFixtures = fixtures.filter(data => data.event === manager.current_event);
    const haIndexData = []
    for (let f of currentFixtures) {
        const data = {
            home: f.team_h,
            away: f.team_a,
            homeOff: teams.find(t => t.id === f.team_h).strength_attack_home,
            homeDef: teams.find(t => t.id === f.team_h).strength_defence_home,
            awayOff: teams.find(t => t.id === f.team_a).strength_attack_away,
            awayDef: teams.find(t => t.id === f.team_a).strength_defence_away
        }

        haIndexData.push(data);
        // console.log(teams.find(t => t.id === f.team_h).short_name, ' v ', teams.find(t => t.id === f.team_a).short_name);
    }

    let myTeam = [];
    let totalXPoints = 0;
    for (let pick of picksData.picks) {
        if (elements.find((o) => pick.element === o.id)) {
            const dataEl = elements.find((o) => pick.element === o.id);
            myTeam.push({...dataEl, multiplier: pick.multiplier})

            const xP = getExpectedPoints(dataEl, gameWeek);
            const home = haIndexData.find(ha => ha.home === dataEl.team);
            const away = haIndexData.find(ha => ha.away === dataEl.team);

            const defences = [1, 2];
            const attacks = [3, 4];
            let haIdxValue = 1;
            if (home) {
                const haIdx = haIndexData.find(ha => ha.home === dataEl.team);
                if (attacks.includes(dataEl.element_type)) {
                    haIdxValue = haIdx.homeOff / haIdx.awayDef;
                } else {
                    haIdxValue = haIdx.homeDef / haIdx.awayOff;
                }
            } else {
                const haIdx = haIndexData.find(ha => ha.away === dataEl.team);
                if (attacks.includes(dataEl.element_type)) {
                    haIdxValue = haIdx.awayOff / haIdx.homeDef;
                } else {
                    haIdxValue = haIdx.awayDef / haIdx.homeOff;
                }
            }
            totalXPoints += xP * pick.multiplier * haIdxValue;
        }
    }

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <TotalExpectedPts 
                totalXPoints={totalXPoints.toFixed(2)}
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
