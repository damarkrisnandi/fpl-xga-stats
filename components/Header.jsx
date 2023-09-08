"use client";
import { useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';


export async function getStaticProps() {
  return {
    props: {
      title: '...'
    },
  };
}

export default function HeaderMain() {
  const [open, isOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const pathname = usePathname();

  const mapHeader = new Map();
    mapHeader.set('/my-team', 'My Team');
    mapHeader.set('/my-team/all-xps', 'My Team/All xP Next-GW38');
    mapHeader.set('/', 'All');
    mapHeader.set('/fwd', 'Forward');
    mapHeader.set('/mid', 'Midfielder');
    mapHeader.set('/def', 'Defender');
    mapHeader.set('/gkp', 'GoalKeeper');

  const title = pathname ? mapHeader.get(pathname) || '' : '';
  
  return (
        

    <nav className="bg-gradient-to-br from-purple-700 to-blue-500 fixed w-full z-20 top-0 left-0 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"> */}
          <span className="self-center text-lg font-semibold whitespace-nowrap text-white dark:text-white">{ title }</span>
      </a>
      <div className="flex md:order-2">
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false"
            onClick={() => {isOpen(!open)}}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
      </div>
      <div className={`items-center justify-between ${open ? 'transition duration-300' : 'transition duration-300 hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
          <li>
            <Link className={`flex py-2 pl-3 pr-4  text-white rounded md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === 'my-team' && 'font-bold'}`} href='/my-team' onClick={() => {setSelected('my-team'); isOpen(!open)}}>My Team</Link>
          </li>
          <li>
            <Link className={`flex py-2 pl-3 pr-4  text-white rounded md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === '' && 'font-bold'}`} href='/' onClick={() => {setSelected(''); isOpen(!open)}}>All</Link>
          </li>
          <li>
            <Link className={`flex py-2 pl-3 pr-4  text-white rounded md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === 'fwd' && 'font-bold'}`} href='/fwd' onClick={() => {setSelected('fwd'); isOpen(!open)}}>Forward</Link>
          </li>
          <li>
            {/* <a href="#" className="flex py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">MOTM</a> */}
            <Link className={`flex py-2 pl-3 pr-4  text-white rounded md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === 'mid' && 'font-bold'}`} href='/mid' onClick={() => {setSelected('mid'); isOpen(!open)}}>Midfielder</Link>
          </li>
          <li>
            {/* <a href="#" className="flex py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">MOTW</a> */}
            <Link className={`flex py-2 pl-3 pr-4  text-white rounde md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === 'def' && 'font-bold'}`} href='/def' onClick={() => {setSelected('def'); isOpen(!open)}}>Defender</Link>
          </li>
          <li>
            {/* <a href="#" className="flex py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">MOTW</a> */}
            <Link className={`flex py-2 pl-3 pr-4  text-white rounde md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === 'gkp' && 'font-bold'}`} href='/gkp' onClick={() => {setSelected('gkp'); isOpen(!open)}}>GoalKeeper</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>



    )
}

function SelectLeague() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
    </svg>
  )
}