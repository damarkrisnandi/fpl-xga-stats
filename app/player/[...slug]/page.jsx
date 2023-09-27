import Manager from '../../../components/Manager';
import AllTotalXP from '../../../components/AllTotalXP';
import { getBootstrap, getManagerInfo, getPicksData, getFixtures, getTotalXPMultiplies, managerId, getElementSummary } from '../../../services/index';
import Image from 'next/image';
import DataLineChart from '../../../components/DataLineChart';
import TabView from '../../../components/TabView';

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

    const tabComponents = [
        {   
            tabState: 'xG-goals',
            title: 'xGvsG',
            component: (
                <DataLineChart 
                title={'xG vs Goals'}
                subtitle={`Expected Goals vs Goals Scored`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                expecteds={elementPerMatch.map(m => m.expected_goals)}
                points={elementPerMatch.map(m => m.goals_scored)}
                /> 
            )
        },
        {
            tabState: 'xA-assists',
            title: 'xAvsA',
            component: (
                <DataLineChart 
                title={'xA vs Assists'}
                subtitle={`Expected Assists vs Assists`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                expecteds={elementPerMatch.map(m => m.expected_assists)}
                points={elementPerMatch.map(m => m.assists)}
                />
            )
        },
        {
            tabState: 'xGI-GA',
            title: 'xGIvsG+A',
            component: (
                <DataLineChart 
                title={'xGI vs Goals + Assists'}
                subtitle={`xGI = xG + xA`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                expecteds={elementPerMatch.map(m => m.expected_goal_involvements )}
                points={elementPerMatch.map(m => m.assists + m.goals_scored)}
                />
            )
        }, 
        {
            tabState: 'xGC-GC',
            title: 'xGCvsGC',
            component: (
                <DataLineChart 
                title={'xGC vs Goal Conceded'}
                subtitle={`Expected Goal Conceded vs Goal Conceded`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                expecteds={elementPerMatch.map(m => m.expected_goals_conceded )}
                points={elementPerMatch.map(m => m.goals_conceded)}
                switchDelta={1}
                />
            )
        },
        {
            tabState: 'price',
            title: 'Price',
            component: (
                <DataLineChart 
                title={'Price Changes'}
                subtitle={`Player value per Gameweek based on TSB%`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                // expecteds={elementPerMatch.map(m => elementPerMatch[0].value / 10 )}
                points={elementPerMatch.map(m => m.value / 10)}
                hideExpected={true}
                />
            )
        },
        {
            tabState: 'minutes',
            title: 'MP',
            component: (
                <DataLineChart 
                title={'Minutes'}
                subtitle={`At least 60 Mins to get 2 points + cleansheet points`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                // expecteds={elementPerMatch.map(m => 60)}
                points={elementPerMatch.map(m => m.minutes)}
                hideExpected={true}
                />
            )
        },
        {
            tabState: 'selected',
            title: '%TSB',
            component: (
                <DataLineChart 
                title={'%Selected'}
                subtitle={`Percentage player selected by Managers`}
                categories={elementPerMatch.map(m => `v ${teams.find(t => t.id === m.opponent_team).short_name}`)}
                // expecteds={elementPerMatch.map(m => (m.selected*100/bootstrap.total_players).toFixed(2))}
                points={elementPerMatch.map(m => (m.selected*100/bootstrap.total_players).toFixed(2))}
                hideExpected={true}
                />
            )
        }
    ];

    // elements.sort((a, b) => (b.goals_scored - b.expected_goals) - (a.goals_scored - a.expected_goals))
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="mt-24 w-11/12">
                <Manager 
                    manager={`${element.first_name} ${element.second_name}'s StatCards`}
                    team={ element.web_name }
                />
            {/* <AllTotalXP 
                totalXPointsList={dataXpList}
                customLB={customLB}
            /> */}
            <div className="w-full">
                <TabView 
                defaultState={'xG-goals'}
                tabComponents={tabComponents}
                />
                
            </div>
        </div>
        </main>
    )
}
