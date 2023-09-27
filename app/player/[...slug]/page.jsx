import Manager from '../../../components/Manager';
import AllTotalXP from '../../../components/AllTotalXP';
import { getBootstrap, getManagerInfo, getPicksData, getFixtures, getTotalXPMultiplies, managerId, getElementSummary } from '../../../services/index';
import Image from 'next/image';
import DataLineChart from '../../../components/DataLineChart';

export default async function Home(props) {
    const bootstrap = (await getBootstrap());
    const teams = bootstrap.teams;
    const gameWeek = bootstrap.events.find(o => o.is_current).id;
    const nextGameWeek = bootstrap.events.find(o => o.is_next).id;

    const customLB = 5;

    let elements = bootstrap.elements;
    const manager = await getManagerInfo(managerId)
    const element = elements.find(o => parseInt(props.params.slug[0]) === o.id)
    const picksData = { picks: [
        {
            element: parseInt(props.params.slug[0]),
            multiplier: 1
        }
    ]}

    let myTeam = [];

    const elementFullData = await getElementSummary(props.params.slug[0]);
    const elementPerMatch = elementFullData.history;

    const fixtures = Object.values(await getFixtures());
    const dataCurrentTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 0, picksData, fixtures);
    const dataXpList = []
    for (let i = 1; i <= 38 - gameWeek; i++) {
        const dataCurrentTeamAndXpNext = getTotalXPMultiplies(bootstrap, gameWeek, i, picksData, fixtures);
        dataXpList.push({...dataCurrentTeamAndXpNext, gameWeek: gameWeek + i});
    }
    const dataNextTeamAndXp = getTotalXPMultiplies(bootstrap, gameWeek, 1, picksData, fixtures); 
    const xPCurrent = dataCurrentTeamAndXp.totalXPoints;
    myTeam = dataCurrentTeamAndXp.myTeam;

    
    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
            <Manager 
                manager={`${element.first_name} ${element.second_name}`}
                team={ element.web_name }
            />
            {/* <AllTotalXP 
                totalXPointsList={dataXpList}
                customLB={customLB}
            /> */}
            <DataLineChart 
            title={'xG vs Goals'}
            subtitle={`${element.first_name} ${element.second_name}`}
            categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
            expecteds={elementPerMatch.map(m => m.expected_goals)}
            points={elementPerMatch.map(m => m.goals_scored)}
            />
            <DataLineChart 
            title={'xA vs Assists'}
            subtitle={`${element.first_name} ${element.second_name}`}
            categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
            expecteds={elementPerMatch.map(m => m.expected_assists)}
            points={elementPerMatch.map(m => m.assists)}
            />
            <DataLineChart 
            title={'xGI vs Goals + Assists'}
            subtitle={`${element.first_name} ${element.second_name}`}
            categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
            expecteds={elementPerMatch.map(m => m.expected_goal_involvements )}
            points={elementPerMatch.map(m => m.assists + m.goals_scored)}
            />
            <DataLineChart 
            title={'xGC vs Goal Conceded'}
            subtitle={`${element.first_name} ${element.second_name}`}
            categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
            expecteds={elementPerMatch.map(m => m.expected_goals_conceded )}
            points={elementPerMatch.map(m => m.goals_conceded)}
            switchDelta={1}
            />
            <DataLineChart 
            title={'Price Change'}
            subtitle={`${element.first_name} ${element.second_name}`}
            categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
            expecteds={elementPerMatch.map(m => m.value / 10 )}
            points={elementPerMatch.map(m => m.value / 10)}
            />
        </div>
        </main>
    )
}
