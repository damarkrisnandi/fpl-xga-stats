'use client';
import { useState, useEffect } from 'react'

import { lowerBound } from '../services/index' 

export default function TotalExpectedPtsNext(props) {
    const { totalXPointsList } = props;
    const [width, setWidth] = useState(0);

    useEffect((props) => {
        if (!props) {
            // for (let i=0; i<10; i++) {
                setTimeout(() => {
                    setWidth(1);
                }, 1000);
            // }
        }
    })

    const maxXp = Math.max(...totalXPointsList.map(xp => xp.totalXPoints))
    const minXp = Math.min(...totalXPointsList.map(xp => xp.totalXPoints))

    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            
                <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                    <div className='w-full'>
                    <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total xP Next Gameweek until GW38</p>
                    {totalXPointsList.map(xp => (
                        <div className="w-full mb-1 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className={`${xp.totalXPoints > lowerBound ? (xp.totalXPoints === maxXp ? 'bg-fuchsia-800' : 'bg-blue-700') : (xp.totalXPoints === minXp ? 'bg-red-700' : 'bg-yellow-600')} text-xs font-medium text-blue-100 text-center p-0.5 rounded-full transition-all duration-700 
                ease-out`} style={{width: `${(((xp.totalXPoints / maxXp) * 100) - 5)*width}%`}}>{ width > 0.5 && `GW${xp.gameWeek}: ${ (xp.totalXPoints).toFixed(2) } Pts`}</div>
                        </div>
                    ))}
                    </div>
                </div>

        </div>

    )
};