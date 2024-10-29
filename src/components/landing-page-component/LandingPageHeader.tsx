"use client"
import { Bell, ChevronDown, House, MessageSquare, Search, ShoppingCart, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
export default function LandingPageHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="w-full text-black border-b ">
            <nav className="bg-white border-gray-200 dark:bg-gray-900 flex justify-between items-center px-10 py-4">
                {/* Nút Upload */}
                <div className="flex flex-row items-center space-x-8 text-black">
                    <Link href={"/"} className='flex flex-row items-center space-x-2'>
                        <Image
                            src="/image/logo.png"
                            alt="Logo"
                            width={40} // Set an arbitrary width
                            height={0} // Set an arbitrary height
                            className="object-contain" // Use CSS to maintain aspect ratio
                        />
                        <span className='font-bold text-lg'>DEMO</span>
                    </Link>
                </div>
                <div className=' flex-row items-center justify-center space-x-6 lg:flex hidden'>
                    <Link href={'/'} className='hover:border-b border-b-neutral-800 text-neutral-600'>
                        Home
                    </Link>
                    <Link href={'/'} className='hover:border-b border-b-neutral-800 text-neutral-600'>
                        <div className='relative'>
                            <span>All Product</span>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">

                                    <ul className="py-2">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Attribute</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Link>
                    <Link href={'/'} className='hover:border-b border-b-neutral-800 text-neutral-600'>
                        Contact us
                    </Link>
                    <Link href={'/'} className='hover:border-b border-b-neutral-800 text-neutral-600'>
                        Order tracking
                    </Link>
                    <Link href={'/'} className='hover:border-b border-b-neutral-800 text-neutral-600'>
                        FAQs
                    </Link>
                </div>
                {/* Các biểu tượng bên phải */}
                <div className="flex items-center space-x-8">
                    <div className='flex items-center space-x-4'>
                        <button className="text-gray-600 hover:text-blue-500 bell">
                            <Search size={20} />
                            <Tooltip anchorSelect=".bell" place="bottom">
                                Search
                            </Tooltip>
                        </button>

                        <button className="text-gray-600 hover:text-blue-500 house">
                            <ShoppingCart size={20}/>
                            <Tooltip anchorSelect=".house" place="bottom">
                                Cart
                            </Tooltip>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}