import { Plus } from 'lucide-react'
import React from 'react'
import ListProduct from './ListProduct'
import Link from 'next/link'

export default function AllProductComponent() {
    return (
        <div>
            <div className='flex justify-end'>
                <Link href={'/admin/all-product/add'} className='flex flex-row items-center bg-blue-500 font-bold text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300'>
                    <Plus className='mr-2' /> <span>Add Product</span>
                </Link>
            </div>
            <ListProduct/>
        </div>
    )
}
