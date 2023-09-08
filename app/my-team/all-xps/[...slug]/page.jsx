import ElementCard from '../../../../components/ElementCard';
import TotalExpectedPts from '../../../../components/TotalExpectedPts';
import Manager from '../../../../components/Manager';
import SelectGameweek from '../../../../components/SelectGameweek';
import AllTotalXP from '../../../../components/AllTotalXP';
import { getBootstrap, getManagerInfo, getManagerHistory, getPicksData, getFixtures, getTotalXPMultiplies, managerId } from '../../../../services/index';
import Image from 'next/image';

export default async function AllXps(props) {
    const bootstrap = (await getBootstrap());
    const teams = bootstrap.teams;
    const gameWeek = bootstrap.events.find(o => o.is_current).id;
    const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

    let elements = bootstrap.elements;
    const manager = await getManagerInfo(managerId)
    const history = await getManagerHistory(managerId);
    const picksData = await getPicksData(managerId, `${parseInt(props.params.slug[0])}`);

    let myTeam = [];
    const currentHistory = history.current;

    const fixtures = Object.values(await getFixtures());
    const dataCurrentTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 0, picksData, fixtures);
    const dataXpList = []
    const select = parseInt(props.params.slug[0])
    for (let i = select - gameWeek; i <= 38 - gameWeek; i++) {
        const dataCurrentTeamAndXpNext = getTotalXPMultiplies(bootstrap, gameWeek, i, picksData, fixtures);
        const dataHist = currentHistory.find(o => o.event === gameWeek + i)
        dataXpList.push({...dataCurrentTeamAndXpNext, gameWeek: gameWeek + i, actualPts: (dataHist && dataHist.event === select  ? dataHist.points : null) });
    }
    const dataNextTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 1, picksData, fixtures); 
    const xPCurrent = dataCurrentTeamAndXp.totalXPoints;
    myTeam = dataCurrentTeamAndXp.myTeam;

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <Manager 
                manager={`${manager.player_first_name} ${manager.player_last_name}`}
                team={ manager.name }
            />
            <SelectGameweek 
                currentGameWeek={gameWeek}
                selectGameWeek={parseInt(props.params.slug[0])}
            />
            <AllTotalXP 
                totalXPointsList={dataXpList}
            />
        </div>
        </main>
    )
}
