"use client"
import React from 'react'

export default function ShowLoadTable() {
    const loadLenght: number[] = [1, 2, 3, 4];
    return (
        <tbody>
            {loadLenght.map((num: number, index) => (
                <tr key={index} className='bg-white border-b '>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                    <th>
                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        </div>
                    </th>
                </tr>
            ))}
        </tbody>
    )
}
