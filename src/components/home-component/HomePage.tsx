'use client'
import React from 'react'
import './HomePage.css'
import HomeDropdown from './HomeDropdown'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './Footer'
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
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>AI Product Builder</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Generate product images from the world in real time
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

                        <Link href={"/tools-page"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>Designer</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Edit template from your browser
                                </span>
                                <Image
                                    src="/image/default/designer-bg.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link>

                        <Link href={"/tools-page"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>Mockup generator</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Mockup generator
                                </span>
                                <Image
                                    src="/image/default/mockup-bg.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link>

                        <Link href={"/tools-page"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>Reimagine</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Reimagine
                                </span>
                                <Image
                                    src="/image/default/reimagine-bg.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link>

                        <Link href={"/tools-page"}>
                            <div className='relative flex flex-col h-56 w-56 bg-red-400 rounded-xl overflow-hidden group'>
                                <div className='absolute top-3 left-2 z-10 text-white font-bold'>Retouch</div>
                                <span className='absolute top-10 left-2 z-10 text-white text-xs font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                                    Retouch
                                </span>
                                <Image
                                    src="/image/default/retouch.jpg"
                                    alt='Image'
                                    width={300}
                                    height={300}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50' />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h4 className='text-[rgb(51,106,234)] text-[15px] text-center'>BENFITS</h4>
                    <h2 className='text-[56px] text-center'>Let’s make your ideas break through</h2>
                    <p className='text-[15px] font-semibold text-center'>Find the most up-to-date vocabulary of images, videos, signs, symbols, and fonts</p>
                </div>
                <div className='mt-[100px]'>
                    <div className=''>
                        <video src="https://fps.cdnpk.net/home/benefits/benefit-quality.mp4" width="70" height="70" class="_1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196" autoplay="" loop="" muted="" playsinline="" disableremoteplayback=""></video>                        
                        <h3 className='text-[32px]'>Best quality or nothing</h3>
                        <p>Download scroll-stopping images of the highest quality to make professional designs.</p>
                    </div>
                    <div>
                        <video src="https://fps.cdnpk.net/home/benefits/benefit-ready.mp4" width="70" height="70" class="_1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196" autoplay="" loop="" muted="" playsinline="" disableremoteplayback=""></video>
                        <h3 className='text-[32px]'>Ready-to-use everything</h3>
                        <p>Download scroll-stopping images of the highest quality to make professional designs.</p>
                    </div>
                    <div>
                        <video src="https://fps.cdnpk.net/home/benefits/benefit-content.mp4" width="70" height="70" class="_1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196" autoplay="" loop="" muted="" playsinline="" disableremoteplayback=""></video>                        
                        <h3 className='text-[32px]'>Fresh content every day</h3>
                        <p>Our library is updated on a daily basis so you can find the newest and trendiest photos and designs.</p>
                    </div>
                    <div>
                        <video src="https://fps.cdnpk.net/home/benefits/benefit-think.mp4" width="70" height="70" class="_1286nb14ku _1286nb14m6 _1286nb14ni _1286nb14ou _1286nb196" autoplay="" loop="" muted="" playsinline="" disableremoteplayback=""></video>                        
                        <h3 className='text-[32px]'>If you can think of it, you can find it</h3>
                        <p>Guaranteed search results: there’s an image and style for every project you might think of.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
