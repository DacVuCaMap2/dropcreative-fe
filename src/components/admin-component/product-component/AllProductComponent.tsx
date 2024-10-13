import { Plus } from 'lucide-react'
import React from 'react'
import ListProduct from './ListProduct'
import Link from 'next/link'
type Props = {
    listProduct : any
}
export default function AllProductComponent(props:Props) {
    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className='flex justify-end w-full'>
                <Link href={'/admin/all-product/add'} className='flex flex-row items-center bg-blue-500 font-bold text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300'>
                    <Plus className='mr-2' /> <span>Add Product</span>
                </Link>
            </div>
            <ListProduct listProduct={props.listProduct}/>
        </div>
    )
}
