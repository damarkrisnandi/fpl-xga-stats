export default function SelectPosition() {
    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2 p-3`}>
            <div className="flex">
                <div className="flex items-center mr-4">
                    <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
                <div className="flex items-center mr-4">
                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">FWD</label>
                </div>
                <div className="flex items-center mr-4">
                    <input id="inline-checked-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-checked-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">MID</label>
                </div>
                <div className="flex items-center">
                    <input disabled id="inline-disabled-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-disabled-radio" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">DEF</label>
                </div>
                <div className="flex items-center">
                    <input disabled id="inline-disabled-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="inline-disabled-radio" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">GKP</label>
                </div>
            </div>
        </div>

    )
}