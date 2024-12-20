"use client"
import { Bell, ChevronDown, House, MessageSquare, Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { deleteAllCookies } from "@/ultils";
type Props = {
    email: string;
    role: string;
}
export default function HeadNavBar(props: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        deleteAllCookies();
        window.location.href = "/login";
    };
    return (
        <header className="w-full text-black border-b ">
            <nav className="bg-white border-gray-200 dark:bg-gray-900 flex justify-between items-center px-4 py-2">
                {/* Nút Upload */}
                {/* <button className="flex items-center bg-blue-600 text-xs font-bold text-white px-4 py-2 rounded">
                    <Upload size={16} className="mr-2" />
                    Upload File
                </button> */}
                <span></span>

                {/* Các biểu tượng bên phải */}
                <div className="flex items-center space-x-8">
                    <div className='flex items-center space-x-4'>
                        <button className="text-gray-600 hover:text-blue-500 bell">
                            <Bell size={18} />
                            <Tooltip anchorSelect=".bell" place="bottom">
                                Notification
                            </Tooltip>
                        </button>

                        <button className="text-gray-600 hover:text-blue-500 mess">
                            <MessageSquare size={18} />
                            <Tooltip anchorSelect=".mess" place="bottom">
                                Message
                            </Tooltip>
                        </button>

                        <button className="text-gray-600 hover:text-blue-500 house">
                            <House size={18} />
                            <Tooltip anchorSelect=".house" place="bottom">
                                Home
                            </Tooltip>
                        </button>
                    </div>

                    {/* Ảnh đại diện với dropdown */}
                    {(props.email && props.role) ?
                        <div className="relative ">
                            <button onClick={toggleDropdown} className="flex">
                                <div className="mr-2"> {/* Thêm khoảng cách bên phải cho hình ảnh */}
                                    <Image src="/image/default/user-default.png" alt="default" width={30} height={30} />
                                </div>
                                <div className="text-xs text-left w-20">
                                    <p className=" truncate">{props.email}</p>
                                    <p className="text-gray-400">{props.role.replace("_role", "")}</p>
                                </div>
                                <div>
                                    <ChevronDown size={14} />
                                </div>
                            </button>
                            {/* Dropdown */}
                            {isOpen && (
                                <div className="absolute z-30 right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="py-2">
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                My Attribute
                                            </a>
                                        </li>
                                        <li>
                                            <button
                                                className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        :
                        ''
                    }
                </div>
            </nav>
        </header>
    );
}
