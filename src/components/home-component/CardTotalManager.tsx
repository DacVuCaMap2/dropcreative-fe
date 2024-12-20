import { Crown, Download, Eye, Package, User } from 'lucide-react'
import React from 'react'
type Props = {
    totalManager:any
}
export default function CardTotalManager(props:Props) {
    const totalManager = props.totalManager
    return (
        <div className='flex flex-row justify-center items-center space-x-32  py-4 text-neutral-200'>
            <div className='flex flex-row justify-center items-center border-b space-x-2'>
                <div className='flex flex-col justify-center items-center'>
                    <User size={60} />
                    <span className='font-bold'>User</span>
                </div>
                <span className='font-bold text-4xl'>{totalManager.users+1880}</span>
            </div>
            <div className='flex flex-row justify-center items-center border-b space-x-2'>
                <div className='flex flex-col justify-center items-center'>
                    <Package size={60} />
                    <span className='font-bold'>Product</span>
                </div>
                <span className='font-bold text-4xl'>{totalManager.products+2610}</span>
            </div>
            <div className='flex flex-row justify-center items-center border-b space-x-2'>
                <div className='flex flex-col justify-center items-center'>
                    <Eye size={60} />
                    <span className='font-bold'>Views</span>
                </div>
                <span className='font-bold text-4xl'>{totalManager.views+2820}</span>
            </div>
            <div className='flex flex-row justify-center items-center border-b space-x-2'>
                <div className='flex flex-col justify-center items-center'>
                    <Download size={60} />
                    <span className='font-bold'>Downloads</span>
                </div>
                <span className='font-bold text-4xl'>{totalManager.downloads+1912}</span>
            </div>
            {/* <div className='flex flex-row justify-center items-center border-b space-x-2'>
                <div className='flex flex-col justify-center items-center'>
                    <Crown size={60} />
                    <span className='font-bold'>Premium</span>
                </div>
                <span className='font-bold text-4xl'>{totalManager.premiums}</span>
            </div> */}
        </div>
    )
}
