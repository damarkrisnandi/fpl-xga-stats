"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SelectData from './SelectData'
export default function SelectGameweek(props) {
    const { totalXPoints, selectGameWeek, currentGameWeek, isUrlParent, replacer } = props

    const router = useRouter();

    const gameweeks = Array.from({length: currentGameWeek}, (_, i) => { return { label: i + 1, value: i + 1}})

    let url = '';
    if (isUrlParent) {
        url = (`all-xps/${replacer || '[param]'}`)
    } else {
        url = (`${replacer || '[param]'}`)
    }

    return (
        <SelectData 
            labelHeader={'Select a Gameweek'}
            labelValues={gameweeks}
            selectValue={selectGameWeek}
            url={url}
            urlReplacer={replacer}
        />

    )
}
