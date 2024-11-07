"use client"
import React, { useEffect, useState } from 'react'
import "./WalletMain.css"
import { Wallet } from 'lucide-react'
import ShowLoadTable from '../general-component/ShowLoadTable'
import WalletPaypal from './WalletPaypal'
import GetApi from '@/api/GetApi'
import { message } from 'antd'
type Props = {
    balance: string;
}
export default function WalletMain(props: Props) {
    const [isOpen, setOpen] = useState(false);
    const [listHistory, setListHistory] = useState<any[]>([]);
    const handleOpenPaypal = () => {
        document.body.style.overflow = 'hidden';
        setOpen(true);
    }
    useEffect(()=>{
        const fetchData = async () =>{
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/wallet/transaction-history?page=0&size=20"
            const response = await GetApi(url);
            console.log(response);
            if (response?.error?.message && response?.error?.message === "Authentication Error Or Login session expired|revoked") {
                window.location.href="/login";
            }
            else if (response?.content) {
                setListHistory(response.content);
            }
            else{
                message.error("failed to get history from server")
            }
        }
        fetchData();
    },[])
    return (
        <div className='flex justify-center'>
            {isOpen && <WalletPaypal setOpen={setOpen} />}
            <div className='flex flex-col min-h-screen w-[1400px] py-10'>
                <div className='mb-10'>
                    <p className="text-6xl text-center font-medium">Wallet</p>
                    <p className="text-base text-gray-600 text-center font-medium">
                        Manage your wallet, transaction history
                    </p>
                </div>
                <div className='flex flex-row w-96 h-32 rounded money-card text-white py-4 px-4 space-x-4 mb-4 shadow-lg'>
                    <div className='rounded-full h-10 w-10 bg-opacity-40 bg-neutral-400 flex justify-center items-center'>
                        <Wallet size={20} />
                    </div>
                    <div className='flex flex-col w-64'>
                        <span className='text-gray-300 text-sm'>Balance</span>
                        <span className='font-bold text-3xl mb-4'>${props.balance}</span>
                        <button onClick={handleOpenPaypal} className='bg-white text-black rounded py-1 hover:bg-gray-100'>+ Deposit</button>
                    </div>
                </div>
                <div className='space-y-2'>
                    <p className='font-bold text-xl'>Transaction history</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-100 ">
                                <tr>
                                    <th className='px-6 py-3'>
                                        Invoice ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fee
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Balance
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Create At
                                    </th>

                                </tr>
                            </thead>
                            {listHistory.length > 0 ?
                                <tbody>
                                    {listHistory.map((item: any, index) => (
                                        <tr key={index}>
                                            <td className='px-6 py-3'>
                                                {item.invoiceId}
                                            </td>
                                            <td className='px-6 py-3'>
                                                {item.transactionId}
                                            </td>
                                            <td className='px-6 py-3'>${item.amount}</td>
                                            <td className='px-6 py-3'>${item.fee}</td>
                                            <td className='px-6 py-3'>${item.newBalance}</td>
                                            <td className='px-6 py-3'>{item.status}</td>
                                            <td className='px-6 py-3'>{item.description}</td>
                                            <td className='px-6 py-3'>{item.createAt}</td>
                                        </tr>
                                    ))}

                                </tbody>
                                :
                                <ShowLoadTable countRow={7} />
                            }
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
