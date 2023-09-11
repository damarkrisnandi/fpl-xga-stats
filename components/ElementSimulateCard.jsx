"use client";
import Image from "next/image";
// import Chevron from "./chevron";
import Link from 'next/link'
import { getExpectedPoints } from '../services/index.ts'

export default function ElementSimulateCard(props) {
    const {
        assists,
        bps,
        bonus,
        chance_of_playing_next_round,
        chance_of_playing_this_round,
        clean_sheets,
        clean_sheets_per_90,
        code,
        cost_change_event,
        cost_change_event_fall,
        cost_change_start,
        cost_change_start_fall,
        creativity,
        creativity_rank,
        creativity_rank_type,
        element_type,
        ep_next,
        ep_this,
        event_points,
        expected_assists,
        expected_assists_per_90,
        expected_goal_involvements,
        expected_goal_involvements_per_90,
        expected_goals,
        expected_goals_conceded,
        expected_goals_conceded_per_90,
        expected_goals_per_90,
        first_name,
        form,
        form_rank,
        form_rank_type,
        goals_conceded,
        goals_conceded_per_90,
        goals_scored,
        ict_index,
        ict_index_rank,
        ict_index_rank_type,
        id,
        influence,
        influence_rank,
        influence_rank_type,
        minutes,
        news,
        news_added,
        now_cost,
        now_cost_rank,
        now_cost_rank_type,
        own_goals,
        penalties_missed,
        penalties_order,
        penalties_saved,
        penalties_text,
        photo,
        points_per_game,
        points_per_game_rank,
        points_per_game_rank_type,
        red_cards,
        saves,
        saves_per_90,
        second_name,
        selected_by_percent,
        selected_rank,
        selected_rank_type,
        special,
        squad_number,
        starts,
        starts_per_90,
        status,
        team,
        team_code,
        threat,
        threat_rank,
        threat_rank_type,
        total_points,
        transfers_in,
        transfers_in_event,
        transfers_out,
        transfers_out_event,
        value_form,
        value_season,
        web_name,
        yellow_cards,

        // reference data
        gameWeek,
        nextGameWeek, 
        teams,
        elements,

        //data pick
        multiplier,
        xPFinal,
        picksData
        
    } = props;
    const pos = {
        1:'GKP',
        2: 'DEF',
        3: 'MID',
        4: 'FWD'
    }
    let xP = getExpectedPoints(props, gameWeek);

    const playerStatus = (multi) => {
        let status = '';
        if (multi === 1) {
            status = 'Played';
        } else if (multi === 2) {
            status = 'Captain';
        } else if (multi === 3) {
            status = 'Triple Captain'
        } else {
            status = 'Benched';
        }
        return status;
    }

    const teamShortName = (teams.find(o => o.code === team_code)).short_name

    const recomendations = [];
    elements.sort((a, b) => b.xPFinal - a.xPFinal)
    for (let el of elements) {
        if (
            el.element_type === element_type &&
            el.xPFinal * multiplier > xPFinal &&
            recomendations.length < 3 &&
            !picksData.picks.map(p => p.element).includes(el.id)
        ) {
            recomendations.push({...el, teamShortName: (teams.find(o => o.code === el.team_code)).short_name});
        }
    }

    return (
        
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex items-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5> */}
                <div className='w-full'>
                    <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white"> {first_name} {second_name} </p>
                    <p className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">{ web_name } | {teamShortName} | { pos[element_type] } | £{ (now_cost / 10).toFixed(1) }</p>
                    <p className="mb-2 tracking-tight text-gray-900 "></p>
                    {/* <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white"> { multiplier !== undefined && multiplier >= 0 ? playerStatus(multiplier) : '' } </p> */}
                    
                    <div className="flex">
                        <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${event_points - xP >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>xP {(xP).toFixed(2)}</p>
                        <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${event_points - xP >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>P {event_points}</p>                
                        <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${event_points - xP >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}> {`(${(event_points - xP) >= 0 ? '+' : ''}${(event_points - xP).toFixed(2)})`}</p>
                    </div>

                    {
                        multiplier ? (
                            <div className="flex font-semibold">
                                <p className={`mr-2 mb-2 tracking-tight text-gray-900  ${(event_points * multiplier) - xPFinal >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>&Sigma;xP {(xPFinal).toFixed(2)}</p>
                                <p className={`mr-2 mb-2 tracking-tight text-gray-900  ${(event_points * multiplier) - xPFinal >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>&Sigma;P {event_points * multiplier}</p>
                                <p className={`mr-2 mb-2 tracking-tight text-gray-900  ${(event_points * multiplier) - xPFinal >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}> {`(${(event_points * multiplier) - xPFinal >= 0 ? '+' : ''}${((event_points * multiplier) - xPFinal).toFixed(2)})`}</p>
                            </div>
                        ) : null
                    }

                    <div className="flex mb-2 text-sm justify-start items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>

                        <p className="">Recomendation</p>
                    </div>

                    {
                        recomendations
                        .map(
                            el => (
                                // <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
                                    
                                    // <div className={`flex items-center w-full p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                                        <div className='mb-2'>
                                            <p className="text-xs tracking-tight text-gray-900 dark:text-white">{ el.web_name } | { el.teamShortName } | £{ (el.now_cost / 10).toFixed(1) } | &Sigma;xP {(el.xPFinal  * multiplier).toFixed(2)} | {el.xPFinal * multiplier - xPFinal > 0 ? '+' : ''}{(el.xPFinal * multiplier - xPFinal).toFixed(2)}</p>
                                        </div>
                                    // </div>
                                // </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>

    )
}