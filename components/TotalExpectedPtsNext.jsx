"use client";
import Link from 'next/link'
import { lowerBound } from '../services/index' 

export default function TotalExpectedPtsNext(props) {
    const { totalXPoints } = props

    return (
        <Link href={'/my-team/all-xps'} className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total xP Next Gameweek</p>
                <p className="mb-2 text-xs tracking-tight text-gray-900 dark:text-white">Click this card to get more info</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className={`${totalXPoints > lowerBound ? 'bg-blue-700' :  'bg-yellow-600'} text-xs font-medium text-blue-100 text-center p-0.5 rounded-full`} style={{width: `100%`}}>{ `Expected: ${ totalXPoints } Pts`}</div>
                </div>
                </div>
            </div>
        </Link>

    )
};