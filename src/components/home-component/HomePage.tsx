'use client'
import React from 'react'
import './HomePage.css'
import HomeDropdown from './HomeDropdown'
import { Search } from 'lucide-react'
export default function HomePage() {
    return (
        <div className='flex flex-col relative'>
            <div className='h-80 main-menu'>
            </div>
            <div className='absolute top-32 w-full h-20 flex flex-col justify-center items-center space-y-2'>
                <span className='text-4xl font-bold text-white'>Ready to start looking product?</span>
                <div className='w-full flex justify-center items-center '>
                    <HomeDropdown />
                    <input
                        placeholder='Search all assets'
                        type="text"
                        className='lg:w-1/3 w-3/4 py-2 outline-none border-none h-full' />
                    <div className='h-full bg-white py-2 px-4 rounded-r'>
                        <button className="flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            <Search size={20}/>
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
