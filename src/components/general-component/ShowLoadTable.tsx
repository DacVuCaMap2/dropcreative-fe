"use client"
import React from 'react'
type Props = {
    countRow: number
}
export default function ShowLoadTable(props: Props) {
    const loadLenght: number[] = [1, 2, 3, 4];
    return (
        <tbody>
            {loadLenght.map((num: number, index) => (
                <tr key={index} className='bg-white border-b '>
                    {Array(props.countRow) // Create an array with length equal to countRow
                        .fill(null) // Fill the array with placeholder values (doesn't matter here)
                        .map((_, index) => (
                            <th key={index}>
                                <div className="h-10 w-full px-4 flex justify-center items-center">
                                    <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                </div>
                            </th>
                        ))}
                </tr>
            ))}
        </tbody>
    )
}
