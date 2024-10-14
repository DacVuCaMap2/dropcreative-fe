import { Plus } from 'lucide-react'
import React from 'react'
import ListProduct from './ListProduct'
import Link from 'next/link'
import { generalRoles } from '@/data/generalData'
type Props = {
    listProduct: any,
    roleStr: any
}
export default function AllProductComponent(props: Props) {
    const roleUser = generalRoles[0];
    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className='flex justify-end w-full'>
                {(props.roleStr && props.roleStr === roleUser) ?
                    <Link href={'/admin/all-product/add'} className='flex flex-row items-center bg-blue-500 font-bold text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300'>
                        <Plus className='mr-2' /> <span>Add Product</span>
                    </Link>
                    :
                    ''
                }
            </div>
            <ListProduct listProduct={props.listProduct} />
        </div >
    )
}
