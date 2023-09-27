"use client"
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DataLineChart(props) {
    const {title, subtitle, categories, expecteds, points, switchDelta} = props;
    const option = {
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories,
            // labels: {
            //     show: false,
            // },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
        show: false,
        labels: {
            // formatter: function (value) {
            // return '$' + value;
            // }
        }
        },
        dataLabels: {
            enabled: true,
            // offsetX: 10,
            style: {
              cssClass: 'text-xs text-white font-medium'
            },
        },
        
      }

    const series = [
        {
            name: "Expected",
            data: expecteds,
            color: "#1A56DB",
        },
        {
            name: "Points",
            data: points,
            color: "#00A36C",
        },
    ]

    let surplus = 0
    for (let i = 0; i< categories.length; i++) {
        if (switchDelta) {
            surplus += parseFloat(expecteds[i]);
            surplus -= parseFloat(points[i]);
        } else {
            surplus += parseFloat(points[i]);
            surplus -= parseFloat(expecteds[i]);
        }
    } 
    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-200 p-4 md:p-6 mb-2">
            <div className="flex justify-between mb-5">
                <div>
                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-gray-600 pb-2">{title}</h5>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{subtitle}</p>
                </div>
                <div
                className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${surplus >= 0 ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'} text-center`}>
                    {surplus > 0 ? '+' : ''}{surplus.toFixed(2)}
                </div>
            </div>
            <ApexChart type="line" options={option} series={series} height={200} />
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
                <div className="flex justify-between items-center pt-5">
                
                {/* <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom"
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                    type="button">
                    Last 7 days
                    <svg className="w-2.5 m-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                        </li>
                    </ul>
                </div> */}
                </div>
            </div>
            </div>
    )
}