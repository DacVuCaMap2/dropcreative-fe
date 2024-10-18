"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function AdminHome() {
    const [selectInd, setSelectInd] = useState(0);
    return (
        <div className='flex items-center justify-center text-neutral-500 '>
            <div className='flex flex-col justify-center items-center w-[900px] space-y-4 pt-20 '>
                <div className='w-full'>
                    <p className='text-left font-bold text-2xl text-neutral-700'>  WELLCOME YOU, NAM</p>
                </div>
                <div className='border rounded-2xl w-full shadow-lg'>
                    <div className='px-4 py-4 border-b'>
                        <p className='font-bold text-sm'>Start selling after a day or two with 5 steps &amp; Enjoy your first 50 orders won&apos;t be charged for the transaction fee</p>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col w-1/3 bg-gray-100 text-sm'>
                            <button onClick={()=>setSelectInd(0)} className={`w-full text-left px-4 py-4  border-blue-500 ${selectInd===0 ? "bg-blue-100 text-blue-400 border-l-4" : ""}`}>Add product</button>
                            <button onClick={()=>setSelectInd(1)} className={`w-full text-left px-4 py-4  border-blue-500 ${selectInd===1 ? "bg-blue-100 text-blue-400 border-l-4" : ""}`}>Active payment provider</button>
                            <button onClick={()=>setSelectInd(2)} className={`w-full text-left px-4 py-4  border-blue-500 ${selectInd===2 ? "bg-blue-100 text-blue-400 border-l-4" : ""}`}>Add custom domain</button>
                            <button onClick={()=>setSelectInd(3)} className={`w-full text-left px-4 py-4  border-blue-500 ${selectInd===3 ? "bg-blue-100 text-blue-400 border-l-4" : ""}`}>Install tracking</button>
                        </div>
                        {selectInd === 0 &&
                            <div className='flex flex-col w-full px-4 py-2'>
                                <div className='flex flex-row border-b text-sm space-x-2'>
                                    <div className='h-[180px] w-[300px] overflow-hidden'>
                                        <Image src={"/image/admin/addproduct3.png"} alt='image' width={500} height={500} ></Image>
                                    </div>
                                    <div>
                                        <p className='font-bold text-black'>Add your first product</p>
                                        <p>Adding products have never been easier with these 2 ways: Manually create product listings or Import AliExpress products with URL</p>
                                    </div>
                                </div>
                                <div className='flex flex-row py-2 justify-end'>
                                    <Link href={"/admin/all-product/add"} className='py-2 px-4 text-sm bg-sky-100 text-blue-500 rounded-xl border-blue-500 border hover:bg-blue-200'>Create product</Link>
                                </div>
                            </div>
                        }
                        {selectInd === 1 &&
                            <div className='flex flex-col w-full px-4 py-2 '>
                                <div className='flex flex-row border-b text-sm space-x-2'>
                                    <div className='h-[180px] w-[280px] overflow-hidden'>
                                        <Image src={"/image/admin/payment3.png"} alt='image' width={500} height={500}></Image>
                                    </div>
                                    <div>
                                        <p className='font-bold text-black'>Choose the way your customers pay for their purchases</p>
                                        <p>
                                            Set up one or more payment providers (PayPal, CardShield ) in your store to let customers pay using credit cards or PayPal
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row py-2 justify-end'>
                                    <Link href={"/admin/all-product/add"} className='py-2 px-4 text-sm bg-sky-100 text-blue-500 rounded-xl border-blue-500 border hover:bg-blue-200'>Enable Payment Provider</Link>
                                </div>
                            </div>
                        }
                        { selectInd === 2 && 
                            <div className='flex flex-col w-full px-4 py-2'>
                                <div className='flex flex-row border-b text-sm space-x-2'>
                                    <div className='h-[180px] w-[350px] overflow-hidden'>
                                        <Image src={"/image/admin/domain3.png"} alt='image' width={500} height={500}></Image>
                                    </div>
                                    <div>
                                        <p className='font-bold text-black'>Add custom domain to increase brand trust for your store</p>
                                        <p>
                                            Your domain reflects how trustworthy your store is. Plus, your buyers are able to check out their orders only after your custom domain is added & active
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row py-2 justify-end'>
                                    <Link href={"/admin/all-product/add"} className='py-2 px-4 text-sm bg-sky-100 font-bold text-sky-600 rounded-xl border-blue-500 border hover:bg-blue-200'>Add or buy a domain</Link>
                                </div>
                            </div>
                        }
                        { selectInd===3 && 
                            <div className='flex flex-col w-full px-4 py-2'>
                            <div className='flex flex-row border-b text-sm space-x-2'>
                                <div className='h-[180px] w-[200px] overflow-hidden'>
                                    <Image src={"/image/admin/tracking3.png"} alt='image' width={500} height={500}></Image>
                                </div>
                                <div>
                                    <p className='font-bold text-black'>Set up essential tracking codes to track your marketing results</p>
                                    <p>
                                        Track your store visitors behaviours & run your advertising effectively with these data collected.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-row py-2 justify-end'>
                                <Link href={"/admin/all-product/add"} className='py-2 px-4 text-sm bg-sky-100 font-bold text-sky-600 rounded-xl border-blue-500 border hover:bg-blue-200'>Install tracking</Link>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
