const api_url = 'https://fpl-league-theta.vercel.app/api';
const managerInfoApi = `${api_url}/entry`;
const headers = {'Content-Type': 'application/json'};

const getResult = (url: string) => {
    const result = new Promise((resolve, reject) => {
        fetch(url, { next: { revalidate: 900 } })
        .then(data => {
            data.json().then(json => {
                resolve(json)
            })
        })
        .catch(() => {
            reject('error call axios')
        })
        // axios.get(url)
        // .then(function (response) {
        //     // handle success
        //     resolve(response.data)
        // })
        // .catch(function (error) {
        //     // handle error
        //     resolve({ errMessage: error })
        // })
        // .finally(function () {
        //     // always executed
        // });
    })
    
    return result
}

export const getBootstrap = async () => await getResult(`${api_url}/bootstrap-static/`);
export const getFixtures = async () => await getResult(`${api_url}/fixtures/`);
export const getElementSummary = async (id: string) => await getResult(`${api_url}/element-summary/${id}/`);
export const getManagerInfo = async (id: string) => await getResult(`${managerInfoApi}/${id}/`);
export const getManagerHistory = async (id: string) => await getResult(`${managerInfoApi}/${id}/history/`);
export const getPicksData = async (eid: string, gw: string) => await getResult(`${managerInfoApi}/${eid}/event/${gw}/picks/`);
export const getLeagueData = async (leagueId: string, page: string) => await getResult(`https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page_standings=${page}`);

export const leagueHistory = [
    {
        seasonFrom: 2023,
        seasonUntil: 2024,
        leagueA: '633893',
        leagueB: '633913',
        leagueSuper: '633869'
    },
    {
        seasonFrom: 2024,
        seasonUntil: 2025,
        leagueA: '',
        leagueB: '',
        leagueSuper: ''
    },
]

// export const getCurrentLeague = () => {
//     const currentMonth = (new Date()).getMonth() + 1;
//     const currentYear = (new Date()).getFullYear();
//     let currentLeague = {}
//     if (currentMonth >= 8) {
//         currentLeague = leagueHistory.find(l => l.seasonFrom === currentYear)
//     } else {
//         currentLeague = leagueHistory.find(l => l.seasonUntil === currentYear)
//     }

//     return {
//         ...currentLeague
//     }
// }

export const getExpectedPoints = (element, gameWeek) => {
    let xP = 0;
    const {element_type, bonus, expected_goals_per_90, expected_assists_per_90, starts_per_90, clean_sheets_per_90} = element;
    if (element_type === 4) {
        const xPG = expected_goals_per_90 * 4;
        const xPA = expected_assists_per_90 * 3;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        xP = xPG + xPA + pMP + (bonus/gameWeek); 
    }
    if (element_type === 3) {
        const xPG = expected_goals_per_90 * 4;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 1;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek); 
    }
    if (element_type === 2) {
        const xPG = expected_goals_per_90 * 4;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 4;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek); 
    }

    if (element_type === 1) {
        const xPG = expected_goals_per_90 * 4;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 5;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek); 
    }

    return xP;
}
