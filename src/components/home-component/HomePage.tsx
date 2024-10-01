'use client'
import React from 'react'
import './HomePage.css'
import HomeDropdown from './HomeDropdown'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
export default function HomePage() {
    return (
        <div className='flex flex-col relative'>
            <div className='h-80 main-menu'>
            </div>
            <div className='absolute top-32 w-full h-20 flex flex-col justify-center items-center space-y-2'>
                <span className='text-3xl font-bold text-white'>Ready to start looking product?</span>
                <div className='w-full flex justify-center items-center '>
                    <HomeDropdown />
                    <input
                        placeholder='Search all assets'
                        type="text"
                        className='lg:w-1/3 w-3/4 py-2 outline-none border-none h-full' />
                    <div className='h-full bg-white py-2 px-4 rounded-r'>
                        <button className="flex flex-row  space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            <Search size={20} />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col px-20 py-16'>

                <div className='flex flex-col space-y-4'>
                    <span className='font-bold text-xl'>AI helps create product images and increase creativity</span>
                    <div className='flex flex-row w-full space-x-6 '>

                        <Link href={"/tools-page"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>AI image generator</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Create images from worlds in real time
                                </span>
                                <Image
                                    src="/image/default/AIgen.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link>

                        {/* <Link href={"/"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>Designer</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Create images from worlds in real time
                                </span>
                                <Image
                                    src="/image/default/designerImg.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
