"use client"
import CategoryPixel, { FacebookPixel } from '@/model/CategoryPixel';
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
type Props = {
    listPixel: CategoryPixel[];
}

export default function PixelComponent(props: Props) {
    const listPixel = props.listPixel;
    const [listSelect, setListSelect] = useState([0, 0, 0]);
    console.log(listPixel);

    return (
        <div className='px-10 py-4 flex flex-col '>
            <div className='text-2xl font-bold mb-4'>
                Pixel Custom
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='flex flex-row space-x-4'>
                    {listPixel.map((cat: CategoryPixel, index) => (
                        <button key={index} onClick={() => setListSelect([index, listSelect[1], listSelect[2]])} className={` hover:border-gray-700 border-white border-b-2 ${listSelect[0] === index ? "border-gray-700" : ""}`}>{cat.name}</button>
                    ))}
                </div>

                <div className='flex flex-row border p-4 w-full'>
                    <div className='flex flex-col w-3/4 border-r border-gray-400'>
                        <p className='font-bold text-lg w-full border-b bg-gray-800 text-white text-center mb-4' >Facebook Pixel</p>
                        {listPixel[listSelect[0]].facebookPixels.map((item: FacebookPixel, index) => (
                            <div key={index} className='flex flex-col px-6 py-4 space-y-4'>
                                <div className='flex flex-col border p-4 text-xs space-y-2 '>
                                    <div>
                                        <label htmlFor="" className='font-bold'>Name</label>
                                        <input type="text" className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4'/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='font-bold'>Pixel facebook</label>
                                        <input type="text" className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4'/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='font-bold'>Access token</label>
                                        <input type="text" className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4' />
                                    </div>
                                </div>

                            </div>
                        ))}
                        <button className='w-full flex justify-center items-center space-x-2 py-2 border bg-gray-100 hover:bg-gray-200'>
                            <Plus />
                            <span>Add facebook pixel</span>
                        </button>

                    </div>
                    <div className='flex flex-col w-1/4'>
                        <p className='font-bold text-lg w-full border-b bg-gray-800 text-white text-center' >Account Id</p>

                        <div className='flex flex-col py-4 px-4 space-y-4'>
                            <div className='flex flex-col border p-2 text-xs space-y-2'>
                                <div>
                                    <span className='font-bold'>User: </span>
                                    <span className=''>namlsnam113@gmail.com</span>
                                </div>
                                <label htmlFor="" className='font-bold'>Account id</label>
                                <input type="text" className='bg-gray-100 border-none border-gray-300 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4' />
                            </div>
                            <button className='w-full flex justify-center items-center space-x-2 py-2 border bg-gray-100 hover:bg-gray-200'>
                                <Plus />
                                <span>Add Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
