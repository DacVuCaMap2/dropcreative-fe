"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import ProductCategories from './ProductCategories'
import { CardProductItem } from './CardProductItem'
import Link from 'next/link'
import './ListProduct.css'
type Props = {
    listProduct: any
}
export default function ListProduct(props: Props) {
    let listData: any[] = [];
    if (Array.isArray(props.listProduct.data)) {
        listData = props.listProduct.data;
    }
    console.log(listData);
    return (
        <div className='flex flex-col w-full space-y-2'>
            <div className='space-x-4 text-sm py-2 mb-4'>
                <button className='border-b-2 border-blue-500'>All</button>
                <button>Available product</button>
                <button>Unavailable products</button>
            </div>

            <div className='relative'>
                <input
                    className='w-full h-full py-2 rounded bg-neutral-100 border-none focus:outline-neutral-300 focus:outline-none focus:ring-0 pl-8 transition duration-200 focus:bg-white focus:shadow-lg'
                    type="text"
                    placeholder='Search product'
                />
                <Search className='absolute top-0 pl-2 text-neutral-400 h-full' />
            </div>

            <div className='text-neutral-500 text-sm w-full mt-4 mb-64 border-b border-neutral-400 pb-2 pt-4 px-2'>
                <div className='font-bold '>
                    Categories
                </div>
                <div className='overflow-auto w-full flex flex-col items-center justify-center '>
                    <div className=' max-w-[1200px] flex items-center justify-center'>
                        <ProductCategories />
                    </div>
                </div>
            </div>
            <div className='w-full pt-8 grid grid-cols-4 gap-5 px-4'>
                {listData.map((item: any, index) => (
                    <Link href={'/'} key={index}>
                        <CardProductItem product={item}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}
