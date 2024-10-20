"use client"
import React from 'react'
import HomeDropdown from '../home-component/HomeDropdown'
import { Search } from 'lucide-react'
import './InputSearchComponent.css'
type Props = {
    keySearch: string,
    setKeySearch: React.Dispatch<React.SetStateAction<string>>,
    type: number
}


export default function InputSearchComponent(props: Props) {
    return (
        <div className={`w-full flex justify-center items-center`}>
            <div className={`${props.type === 0 ? "bg-white w-3/5 max-w-[900px]" : "bg-neutral-200 w-full"} flex justify-center items-center `}>
                <HomeDropdown type={props.type} />
                <input
                    placeholder="Search all assets"
                    type="text"
                    value={props.keySearch}
                    onChange={e => props.setKeySearch(e.target.value)}
                    className={`w-full bg-none py-2 outline-none border-none h-full input-search`}
                />
                <div className="h-full py-2 px-4 rounded-r-sm">
                    <button className="flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-700">
                        <Search size={20} />
                        <span>Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
