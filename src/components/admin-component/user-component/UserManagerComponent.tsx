"use client"
import GetApi from '@/api/GetApi';
import { message } from 'antd';
import { Crown, Download, Eye, Package, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
type TotalManager = {
    users: number,
    products: number,
    views: number,
    downloads: number,
    free: number,
    premium: number
}
export default function UserManagerComponent() {
    const [isLoading, setLoading] = useState(1);
    const loadLenght: number[] = [1, 2, 3, 4];
    const [resData, setResData] = useState<any>(null);
    const [totalManager, setTotalManager] = useState<TotalManager>({ users: 0, products: 0, views: 0, downloads: 0, free: 0, premium: 0 });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(1);
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/manager?page=1&size=1000";
            const response = await GetApi(url);
            console.log(response);
            if (response.data) {

                const totalProduct = response.data.reduce((accumulator: number, user: any) => {
                    return accumulator + user.totalProduct;
                }, 0);
                const totalView = response.data.reduce((accumulator: number, user: any) => {
                    return accumulator + user.countView;
                }, 0);
                const totalDownload = response.data.reduce((accumulator: number, user: any) => {
                    return accumulator + user.countDownload;
                }, 0);

                const tempManager: TotalManager = {
                    ...totalManager, users: response.total, products: totalProduct,
                    views: totalView, downloads: totalDownload
                };
                setResData(response);
                setTotalManager(tempManager)
            }
            if (response.error) {
                message.error("Authentication Error Or Login session expired|revoked");
                window.location.href = "/login";
            }
            setLoading(0);
        }
        fetchData();
    }, [])
    return (
        <div className='text-neutral-700'>
            <div className='mb-10'>
                <p className='font-bold text-2xl'>Manager All User</p>
            </div>

            {isLoading===0 ?
                <div className='flex flex-row justify-center items-center mb-10 space-x-32 bg-gray-100 py-4 text-neutral-700'>
                    <div className='flex flex-row justify-center items-center border-b space-x-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <User size={60} />
                            <span className='font-bold'>User</span>
                        </div>
                        <span className='font-bold text-4xl'>{totalManager.users}</span>
                    </div>
                    <div className='flex flex-row justify-center items-center border-b space-x-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <Package size={60} />
                            <span className='font-bold'>Product</span>
                        </div>
                        <span className='font-bold text-4xl'>{totalManager.products}</span>
                    </div>
                    <div className='flex flex-row justify-center items-center border-b space-x-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <Eye size={60} />
                            <span className='font-bold'>Views</span>
                        </div>
                        <span className='font-bold text-4xl'>{totalManager.views}</span>
                    </div>
                    <div className='flex flex-row justify-center items-center border-b space-x-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <Download size={60} />
                            <span className='font-bold'>Downloads</span>
                        </div>
                        <span className='font-bold text-4xl'>{totalManager.views}</span>
                    </div>
                    <div className='flex flex-row justify-center items-center border-b space-x-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <Crown size={60} />
                            <span className='font-bold'>Premium</span>
                        </div>
                        <span className='font-bold text-4xl'>{totalManager.users}</span>
                    </div>
                </div>
                :
                <div className='flex flex-row justify-center items-center mb-10 space-x-32 bg-gray-100 py-8 text-neutral-500'>
                    <ScaleLoader height={60} width={10}/>
                </div>
            }


            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 ">
                        <tr>
                            <th className='text-center'>
                                Index
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Plans
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Plans left
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Products
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Views
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Download
                            </th>
                        </tr>
                    </thead>
                    {isLoading === 1 ?
                        <tbody>
                            {loadLenght.map((num: number, index) => (
                                <tr key={index} className='bg-white border-b '>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='h-10 w-full px-4 flex justify-center items-center'>
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        :
                        <tbody>
                            {resData.data
                                .sort((a: any, b: any) => b.totalProduct - a.totalProduct) // Sắp xếp từ cao đến thấp
                                .map((user: any, index: number) => (
                                    <tr key={index} className="bg-white dark:bg-gray-800 border-b hover:bg-gray-200">
                                        <td className="px-6 py-4">
                                            {index + 1} {/* Cộng thêm 1 để đánh số bắt đầu từ 1 */}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='flex flex-row space-x-2 items-center'>
                                                <Image src={"/image/default/user-default.png"} alt='oke' height={40} width={40} />
                                                <span>{user.account.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            PREMIUM
                                        </td>
                                        <td className="px-6 py-4 text-center    ">
                                            7 days
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.totalProduct}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.countView}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.countDownload}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                    }
                </table>
            </div>
        </div>
    )
}
