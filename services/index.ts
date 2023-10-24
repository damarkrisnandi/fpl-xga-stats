const api_url = 'https://fpl-league-theta.vercel.app/api';
const managerInfoApi = `${api_url}/entry`;
const headers = {'Content-Type': 'application/json'};
/**
 * set manager id disini, di web fpl, klik tab 'points', lalu akan menuju ke url
 * https://fantasy.premierleague.com/entry/471950/event/4 (contoh punya saya)
 * managerId diisi 471950 as string
 */
export const managerId = '471950';
export const lowerBound = 75;

const getResult = (url: string) => {
    const result = new Promise((resolve, reject) => {
        fetch(`${url}${(url.includes('?') ? '&t=' : '?t=') + new Date().getTime()}`, { next: { revalidate: 900 } })
        .then(data => {
            data.json().then(json => {
                resolve(json)
            })
        })
        .catch(() => {
            reject('error fetch data...')
        })
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

export const getExpectedPoints = (element, gameWeek) => {
    let xP = 0;
    const {element_type, bonus, expected_goals_per_90, expected_assists_per_90, starts_per_90, clean_sheets_per_90, own_goals, expected_goals_conceded_per_90, minutes} = element;
    if (element_type === 4) {
        const xPG = expected_goals_per_90 * 4;
        const xPA = expected_assists_per_90 * 3;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        const xOG = (own_goals/gameWeek) * -1;
        xP = xPG + xPA + pMP + (bonus/gameWeek) + xOG; 
    }
    if (element_type === 3) {
        const xPG = expected_goals_per_90 * 5;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 1;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        const xOG = (own_goals/gameWeek) * -1;
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek) + xOG; 
    }
    if (element_type === 2) {
        const xPG = expected_goals_per_90 * 6;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 4;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        const xOG = (own_goals/gameWeek) * -1;
        const xGC = expected_goals_conceded_per_90 >= 2 ? -1 : 0
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek) + xOG + xGC; 
    }

    if (element_type === 1) {
        const xPG = expected_goals_per_90 * 6;
        const xPA = expected_assists_per_90 * 3;
        const xCS = clean_sheets_per_90 * 5;
        const pMP = starts_per_90 >= 0.67 ? 2 : (starts_per_90 == 0 ? 0 : 1);
        const xOG = (own_goals/gameWeek) * -1;
        const xGC = expected_goals_conceded_per_90 >= 2 ? -1 : 0
        xP = xPG + xPA + xCS + pMP + (bonus/gameWeek) + xOG + xGC; 
    }

    xP = xP * (minutes / (90 * gameWeek))

    return xP;
}

export const getTotalXPMultiplies = (bootstrap, gameWeek, deltaGW, picksData, fixtures) => {
    const currentFixtures = fixtures.filter(data => data.event === gameWeek + deltaGW);
    const haIndexData = []
    const { elements, teams } = bootstrap;
    for (let f of currentFixtures) {
        const data = {
            home: f.team_h,
            away: f.team_a,
            homeOff: teams.find(t => t.id === f.team_h).strength_attack_home,
            homeDef: teams.find(t => t.id === f.team_h).strength_defence_home,
            awayOff: teams.find(t => t.id === f.team_a).strength_attack_away,
            awayDef: teams.find(t => t.id === f.team_a).strength_defence_away,
            homeDiff: f.team_h_difficulty,
            awayDiff: f.team_a_difficulty
        }

        haIndexData.push(data);
        // console.log(teams.find(t => t.id === f.team_h).short_name, ' v ', teams.find(t => t.id === f.team_a).short_name);
    }

    const myTeam = []
    let totalXPoints = 0;
    for (let pick of picksData.picks) {
        let xPPerElement = 0;
        if (elements.find((o) => pick.element === o.id)) {
            const dataEl = elements.find((o) => pick.element === o.id);

            const xP = getExpectedPoints(dataEl, gameWeek);
            const home = haIndexData.filter(ha => ha.home === dataEl.team);
            const away = haIndexData.filter(ha => ha.away === dataEl.team);

            let haIdxValue = 1;
            if (home && home.length > 0) {
                for (let h of home) {
                    if (dataEl.element_type === 4) {
                        haIdxValue = ((1 * h.homeOff / h.awayDef) + (0 * h.homeDef / h.awayOff)) // * (4 / h.awayDiff);
                    } else if (dataEl.element_type === 3) {
                        haIdxValue = (((8/9) * h.homeOff / h.awayDef) + ((1/9) * h.homeDef / h.awayOff)) // * (4 / h.awayDiff);
                    } else if (dataEl.element_type === 2) {
                        haIdxValue = (((9/15) * h.homeOff / h.awayDef) + ((6/15) * h.homeDef / h.awayOff)) // * (4 / h.awayDiff);
                    } else if (dataEl.element_type === 1) {
                        haIdxValue = ((0 * h.homeOff / h.awayDef) + (1 * h.homeDef / h.awayOff)) // * (4 / h.awayDiff);
                    }
                    totalXPoints += xP * pick.multiplier * haIdxValue;
                    xPPerElement += xP * pick.multiplier * haIdxValue;
                }
            } 
            
            if (away && away.length > 0) {
                for (let a of away) {
                    if (dataEl.element_type === 4) {
                        haIdxValue = ((1 * a.homeOff / a.awayDef) + (0 * a.homeDef / a.awayOff)) // * (4 / a.homeDiff);
                    } else if (dataEl.element_type === 3) {
                        haIdxValue = (((8/9) * a.homeOff / a.awayDef) + ((1/9) * a.homeDef / a.awayOff)) // * (4 / a.homeDiff);
                    } else if (dataEl.element_type === 2) {
                        haIdxValue = (((9/15) * a.homeOff / a.awayDef) + ((6/15) * a.homeDef / a.awayOff)) // * (4 / a.homeDiff);
                    } else if (dataEl.element_type === 1) {
                        haIdxValue = ((0 * a.homeOff / a.awayDef) + (1 * a.homeDef / a.awayOff)) // * (4 / a.homeDiff);
                    }
                }
                totalXPoints += xP * pick.multiplier * haIdxValue;
                xPPerElement += xP * pick.multiplier * haIdxValue;
            }

            myTeam.push({...dataEl, multiplier: pick.multiplier, xPFinal: xPPerElement})

        }
    }   
    return {myTeam, totalXPoints};
}
