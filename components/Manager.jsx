"use client";
import Link from 'next/link'

export default function Manager(props) {
    const { team, manager } = props;
    return (
        <Link href='/my-team' className={`flex flex-col items-center justify-between 'bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex items-center w-full p-6 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow hover:bg-gray-100  dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
                <div className=''>
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ team }</p>
                    <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">{ manager }</p>
                </div>
            </div>
        </Link>

    )
}