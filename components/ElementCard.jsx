"use client";
import Image from "next/image";
// import Chevron from "./chevron";
import Link from 'next/link'
import { getExpectedPoints } from '../services/index.ts'

export default function ElementCard(props) {
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

        //data pick
        multiplier,
        xPFinal
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

    return (
        
        <Link href={`#`} className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex items-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5> */}
                <div className=''>
                    <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white"> {first_name} {second_name} </p>
                    <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{ web_name } | {teamShortName} | { pos[element_type] }</p>
                    <p className="mb-2 tracking-tight text-gray-900 "></p>
                    <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white"> { multiplier !== undefined && multiplier >= 0 ? playerStatus(multiplier) : '' } </p>
                    <div className="flex">
                    <p className="mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">MP {minutes}</p>
                    </div>
                    {
                        element_type != 1 ? (
                            <div className="flex">
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">xG {expected_goals}</p>
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">xA {expected_assists}</p>
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">xG90 {expected_goals_per_90}</p>
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">xA90 {expected_assists_per_90}</p>
                            </div>
                            
                        ) : null
                    }
                    {
                        element_type != 1 ? (
                            <div className="flex">
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">G {goals_scored}</p>
                                <p className="text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white">A {assists}</p>
                            </div>
                            
                        ) : null
                    }
                    {
                        element_type != 1 ? (
                            <div className="flex">
                                <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${goals_scored - expected_goals >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>G-xG {( goals_scored - expected_goals) > 0 ? '+' : ''}{(goals_scored - expected_goals).toFixed(2)}</p>
                                <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${assists - expected_assists >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>A-xA {(assists - expected_assists) > 0 ? '+' : ''}{(assists - expected_assists).toFixed(2)}</p>
                            </div>

                        ) : null
                    }
                    
                    {
                        element_type == 1 ? (
                            <div className="flex">
                                <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white`}>GC {goals_conceded}</p>
                                <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900 dark:text-white`}>GC90 {goals_conceded_per_90}</p>
                            </div>
                            
                        ) : null
                    }

                    {
                        element_type == 1 ? (
                            <div className="flex">
                                <p className={`text-xs mr-2 mb-2 tracking-tight text-gray-900  ${(expected_goals_conceded - goals_conceded) >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>xGC-GC {(expected_goals_conceded - goals_conceded) > 0 ? '+': ''}{(expected_goals_conceded - goals_conceded).toFixed(2)}</p>
                            </div>
                            
                        ) : null
                    }

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
                </div>
            </div>
        </Link>

    )
}