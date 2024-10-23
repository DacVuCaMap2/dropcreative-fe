"use client"
import { Plus } from 'lucide-react'
import React from 'react'
import ListProduct from './ListProduct'
import Link from 'next/link'
import { generalRoles } from '@/data/generalData'
type Props = {
    roleStr: any,
    accountId:any
}
export default function AllProductComponent(props: Props) {
    const roleAdmin = generalRoles[1];
    const isAdmin = props.roleStr ? props.roleStr === roleAdmin:false;
    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className='flex justify-end w-full'>
                {isAdmin ?
                    ''
                    :
                    <Link href={'/admin/all-product/add'} className='flex flex-row items-center bg-blue-500 font-bold text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300'>
                        <Plus className='mr-2' /> <span>Add Product</span>
                    </Link>
                }
            </div>
            <ListProduct isAdmin={isAdmin} accountId={props.accountId} />
        </div >
    )
}
