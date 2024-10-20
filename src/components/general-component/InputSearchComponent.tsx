"use client"
import React from 'react'
import HomeDropdown from '../home-component/HomeDropdown'
import { Search } from 'lucide-react'
type Props = {
    keySearch:string,
    setKeySearch : React.Dispatch<React.SetStateAction<string>>,
    type:number
}


export default function InputSearchComponent(props:Props) {
    return (
        <div className="w-full flex justify-center items-center bg-neutral-400">
            <HomeDropdown />
            <input
                placeholder="Search all assets"
                type="text"
                value={props.keySearch}
                onChange={e => props.setKeySearch(e.target.value)}
                className={`${props.type===0 ? "lg:w-1/3 w-3/4" : "w-full"} py-2 outline-none border-none h-full`}
            />
            <div className="h-full py-2 px-4 rounded-r-sm">
                <button className="flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-700">
                    <Search size={20} />
                    <span>Search</span>
                </button>
            </div>
        </div>
    )
}
