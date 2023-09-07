
export default function TotalExpectedPts(props) {
    const { totalXPoints, points, gameWeek } = props

    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total xP vs Points GW{ gameWeek }</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-green-700 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full" style={{width: `100%`}}>{ `Expected: ${ totalXPoints } Pts | Actual: ${ points } Pts (${points - totalXPoints >= 0 ? '+' : ''}${ (points - totalXPoints).toFixed(2) })`}</div>
                </div>
                </div>
            </div>
        </div>

    )
}
