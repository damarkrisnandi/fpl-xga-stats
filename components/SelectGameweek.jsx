
"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function SelectGameweek(props) {
    const { totalXPoints, selectGameWeek, currentGameWeek, isUrlParent } = props

    const router = useRouter();

    const gameweeks = Array.from({length: currentGameWeek}, (_, i) => i + 1)

    const handleChange = (e) => {
        if (isUrlParent) {
            router.push(`all-xps/${e.target.value}`)
        } else {
            router.push(`${e.target.value}`)
        }
    }
    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                {/* <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total xP vs Points GW{ gameWeek }</p> */}
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Gameweek</label>
                <select id="countries" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {gameweeks.map((gw) => (
                        <option value={gw} selected={gw === selectGameWeek}>{ gw }</option>    
                    ))}
                </select>
                </div>
            </div>
        </div>

    )
}
