'use client'
import { Bell, ChevronDown, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
export default function HomeHeadNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header className="w-full absolute z-30 top-30 ">
            <nav className="border-gray-200 flex justify-between items-center px-4 py-2">
                <div className='flex flex-row items-center space-x-8 text-white'>
                    <Link href={'/'}>
                        <Image
                            src="/image/logo-wh.png"
                            alt="Logo"
                            width={160} // Set an arbitrary width
                            height={0} // Set an arbitrary height
                            className="object-contain" // Use CSS to maintain aspect ratio
                        />
                    </Link>
                    <div className='flex flex-row space-x-4 text-sm items-center'>
                        <Link href={'/admin'} className='border py-2 px-4 rounded'>
                            Manager
                        </Link>
                        <Link href={'/'}>
                            Tools
                        </Link>
                        <Link href={'/'}>
                            More
                        </Link>
                    </div>
                </div>


                {/* Các biểu tượng bên phải */}
                <div className="flex items-center space-x-4">
                    {/* Nút Upload */}
                    <button className="flex items-center border text-xs font-bold text-white px-4 py-2 rounded">
                        <Upload size={16} className="mr-2" />
                        Upload File
                    </button>
                    <button className="text-white hover:text-blue-500 bell">
                        <Bell size={18} />
                        <Tooltip anchorSelect=".bell" place="bottom">
                            Notification
                        </Tooltip>
                    </button>

                    {/* Ảnh đại diện với dropdown */}
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex">
                            <div className="mr-2"> {/* Thêm khoảng cách bên phải cho hình ảnh */}
                                <Image src="/image/default/user-default.png" alt="default" width={30} height={30} />
                            </div>
                            <div className="text-xs text-left w-20 ">
                                <p className=" truncate">namvuyhinata@gmail.com</p>
                                <p className="text-gray-400">Premium</p>
                            </div>
                            <div>
                                <ChevronDown size={14} />
                            </div>
                        </button>
                        {/* Dropdown */}
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
                </div>
            </nav>
        </header>
    )
}
