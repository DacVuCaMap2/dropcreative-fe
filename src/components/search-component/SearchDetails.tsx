"use client"
import GetApi from '@/api/GetApi';
import React, { useEffect, useState } from 'react'
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<number>>,
    id: any
}
export default function SearchDetails(props:Props) {
    const [isLoading, setLoading] = useState(true);
    const [productData, setProductData] = useState()
    const handleClose = () =>{
        props.setOpen(-1);
    }
    useEffect(() => {
        const fetchData = async () =>{
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/"+props.id;
            const resposne = await GetApi(url);
            console.log(resposne);
        }
        fetchData();
    })

    return (
        <div onClick={handleClose} className='bg-slate-900 bg-opacity-90 w-screen h-screen fixed top-0 left-0 z-30 flex flex-col items-center'>
            <div className='h-2 w-20 bg-black opacity-0'>
                ss
            </div>
            <div className='bg-white flex-grow w-[1250px] overflow-auto rounded-lg'>

            </div>
            <div className='h-2 w-20 bg-black opacity-0'>
                ss
            </div>
        </div>
    )
}
