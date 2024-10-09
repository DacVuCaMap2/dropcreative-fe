import { Search } from 'lucide-react'
import React from 'react'

export default function ListProduct() {
    return (
        <div className='flex flex-col'>
            <div className='space-x-4 text-sm py-2 mb-4'>
                <button className='border-b-2 border-blue-500'>All</button>
                <button>Available product</button>
                <button>Unavailable products</button>
            </div>

            <div className='relative'>
                <input
                    className='w-full h-full py-2 rounded bg-neutral-200 border-none focus:outline-neutral-300 focus:outline-none focus:ring-0 pl-8 bg-transparent transition duration-200 focus:bg-white focus:shadow-lg'
                    type="text"
                    placeholder='Search product'
                />
                <Search className='absolute top-0 pl-2 text-neutral-400 h-full' />
            </div>

            <div className='text-neutral-500 text-sm'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='text-left border-b border-neutral-300'>
                            <th className='w-1/12 py-4'>
                                <input
                                    className='rounded border border-neutral-400 focus:ring-0 focus:border-neutral-500'
                                    type="checkbox"
                                />
                            </th>
                            <th className=''>PRODUCT</th>
                            <th>PRICE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}
